// POST /api/presupuestos — Registra un presupuesto de mueble a medida en el CMS.
// Diseñado para fallo silencioso: si el CMS no está configurado o falla,
// responde ok:false pero NUNCA con error — el flujo de WhatsApp del usuario
// no depende de este registro.

import { NextResponse } from "next/server";
import { z } from "zod";
import { submitPresupuesto } from "@/lib/cms";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const presupuestoSchema = z.object({
  nombre: z.string().min(2).max(120),
  email: z.string().email(),
  telefono: z.string().max(30).optional(),
  tipoMueble: z.string().min(1).max(60),
  tipoDeMadera: z.string().min(1).max(60),
  medidasAproximadas: z.string().max(200).optional(),
  servicioArmado: z.enum(["Si", "No", "No sé"]),
  descripcion: z.string().min(10).max(2000),
  productoReferencia: z
    .object({ slug: z.string().max(120), nombre: z.string().max(200) })
    .optional(),
  // Honeypot: los bots lo completan, los humanos no lo ven.
  website: z.string().optional(),
});

export async function POST(req: Request) {
  if (!rateLimit(`presupuestos:${clientIp(req)}`, { limit: 5 }).ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = presupuestoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { website, ...datos } = parsed.data;
  if (website) {
    // Honeypot activado: respondemos ok para no dar señal al bot.
    return NextResponse.json({ ok: true });
  }

  const resultado = await submitPresupuesto({
    ...datos,
    origen: "web-a-medida",
    fechaEnvio: new Date().toISOString(), // ISO 8601, generado en servidor
  });

  return NextResponse.json(resultado);
}
