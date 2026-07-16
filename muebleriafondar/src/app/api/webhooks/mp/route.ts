// POST /api/webhooks/mp — Notificaciones de MercadoPago.
// Al confirmarse un pago (status: approved) marca las piezas del pedido como
// VENDIDAS. Siempre responde 200 rápido: MercadoPago reintenta ante errores.

import { NextResponse } from "next/server";
import { getPaymentClient } from "@/lib/mp";
import { marcarProductosVendidos } from "@/lib/cms";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const body = await req.json().catch(() => ({}) as Record<string, unknown>);

    // MP puede notificar por query params (?type=payment&data.id=...) o body.
    const type = url.searchParams.get("type") ?? (body as { type?: string }).type;
    const dataId =
      url.searchParams.get("data.id") ??
      (body as { data?: { id?: string | number } }).data?.id;

    if (type !== "payment" || !dataId) {
      return NextResponse.json({ received: true });
    }

    const paymentClient = getPaymentClient();
    if (!paymentClient) {
      return NextResponse.json({ received: true });
    }

    // Verificar el pago contra la API de MP (nunca confiar en el body crudo).
    const payment = await paymentClient.get({ id: String(dataId) });

    if (payment.status === "approved" && payment.external_reference) {
      const ids: string[] = JSON.parse(payment.external_reference);
      await marcarProductosVendidos(ids);
      console.info("[webhook mp] Piezas marcadas como VENDIDAS:", ids);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook mp] Error procesando notificación:", error);
    // 200 igual: el estado se reconcilia en el próximo reintento de MP.
    return NextResponse.json({ received: true });
  }
}
