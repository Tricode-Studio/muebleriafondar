// GET /api/productos/estado?slugs=a,b,c — Estado actual de un conjunto de piezas.
// Lo usa /carrito al abrirse para detectar piezas que pasaron a VENDIDO
// mientras estaban en el carrito (race condition).

import { NextResponse } from "next/server";
import { getProducto } from "@/lib/cms";

export async function GET(req: Request) {
  const slugsParam = new URL(req.url).searchParams.get("slugs") ?? "";
  const slugs = slugsParam.split(",").filter(Boolean).slice(0, 50);

  const estados = await Promise.all(
    slugs.map(async (slug) => {
      const p = await getProducto(slug);
      return { slug, estado: p?.estado ?? null };
    }),
  );

  return NextResponse.json({ estados });
}
