// POST /api/checkout — Crea la preferencia de MercadoPago Checkout Pro.
// El precio SIEMPRE se toma del servidor (lib/cms.ts), nunca del cliente.
// Devuelve la URL de redirección al checkout (init_point).

import { NextResponse } from "next/server";
import { z } from "zod";
import { getProducto } from "@/lib/cms";
import { getPreferenceClient } from "@/lib/mp";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const checkoutSchema = z.object({
  items: z
    .array(z.object({ slug: z.string().min(1) }))
    .min(1, "El carrito está vacío"),
});

export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, { limit: 10 }).ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Esperá un momento e intentá de nuevo." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos de carrito inválidos." },
      { status: 400 },
    );
  }

  // Resolver cada ítem contra la fuente de datos del servidor.
  const productos = await Promise.all(
    parsed.data.items.map((i) => getProducto(i.slug)),
  );

  const inexistentes = parsed.data.items.filter((_, idx) => !productos[idx]);
  if (inexistentes.length > 0) {
    return NextResponse.json(
      { error: "Algunos productos ya no existen en el catálogo." },
      { status: 400 },
    );
  }

  // Race condition: piezas únicas — si alguna se vendió entre que se agregó
  // al carrito y este checkout, devolvemos 409 con los slugs vendidos para
  // que el cliente las remueva y avise al usuario.
  const vendidos = productos.filter((p) => p!.estado === "VENDIDO");
  if (vendidos.length > 0) {
    return NextResponse.json(
      {
        error: "Algunas piezas ya fueron vendidas.",
        vendidos: vendidos.map((p) => ({ slug: p!.slug, nombre: p!.nombre })),
      },
      { status: 409 },
    );
  }

  const preferenceClient = getPreferenceClient();
  if (!preferenceClient) {
    return NextResponse.json(
      {
        error:
          "Los pagos online todavía no están habilitados. Escribinos por WhatsApp para coordinar tu compra.",
      },
      { status: 503 },
    );
  }

  const origin = new URL(req.url).origin;

  try {
    const preference = await preferenceClient.create({
      body: {
        items: productos.map((p) => ({
          id: p!.id,
          title: p!.nombre,
          description: `${p!.tipoDeMadera} · ${p!.dimensiones}`,
          picture_url: p!.imagenes[0],
          category_id: p!.categoria,
          quantity: 1, // piezas únicas: cantidad siempre 1
          unit_price: p!.precio,
          currency_id: "UYU",
        })),
        // external_reference lleva los IDs para que el webhook pueda marcar
        // las piezas como VENDIDAS al confirmarse el pago.
        external_reference: JSON.stringify(productos.map((p) => p!.id)),
        back_urls: {
          success: `${origin}/pago/exitoso`,
          pending: `${origin}/pago/pendiente`,
          failure: `${origin}/pago/fallido`,
        },
        auto_return: "approved",
        notification_url: `${origin}/api/webhooks/mp`,
        statement_descriptor: "MUEBLERIA FONDAR",
      },
    });

    return NextResponse.json({ initPoint: preference.init_point });
  } catch (error) {
    console.error("[checkout] Error creando preferencia MP:", error);
    return NextResponse.json(
      { error: "No pudimos iniciar el pago. Intentá de nuevo en unos minutos." },
      { status: 502 },
    );
  }
}
