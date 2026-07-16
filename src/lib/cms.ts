// lib/cms.ts — ÚNICA fuente de datos del sitio
//
// Ningún componente importa de /data/ directamente: todo pasa por este módulo.
// Implementación MVP: lee los archivos locales de /data/.
// Fase 2 (Tricode CMS): solo cambia la implementación interna de cada función
// por fetch a los endpoints públicos del CMS — los componentes no se tocan.
//
// Endpoints del CMS real:
//   GET  /api/v1/public/:tenantSlug/content-types/productos/entries
//   GET  /api/v1/public/:tenantSlug/content-types/categorias/entries
//   GET  /api/v1/public/:tenantSlug/content-types/testimonios/entries
//   GET  /api/v1/public/:tenantSlug/landing-config
//   POST /api/v1/public/:tenantSlug/presupuestos
//
// Nota: en el CMS solo las entries con status PUBLISHED salen por la API
// pública; el filtrado por status es responsabilidad del CMS, no de este módulo.

import type {
  Categoria,
  FiltrosProducto,
  PresupuestoPayload,
  Producto,
  SiteConfig,
  Testimonio,
} from "@/types";
import { productos } from "@/data/productos";
import { categorias } from "@/data/categorias";
import { testimonios } from "@/data/testimonios";
import { siteConfig } from "@/data/config";

const TRICODE_API_BASE_URL = process.env.NEXT_PUBLIC_TRICODE_API_BASE_URL;
const TRICODE_TENANT_SLUG = process.env.NEXT_PUBLIC_TRICODE_TENANT_SLUG;

// Estado mutable en memoria para el MVP: permite que el webhook de MercadoPago
// marque piezas como VENDIDAS sin CMS. No persiste entre reinicios del server —
// en fase 2 esto se reemplaza por un PATCH a la entry del CMS.
const vendidosEnMemoria = new Set<string>();

function conEstadoActual(p: Producto): Producto {
  return vendidosEnMemoria.has(p.id) ? { ...p, estado: "VENDIDO" } : p;
}

// ─── Productos ───────────────────────────────────────────────────────────────

export async function getProductos(
  filtros?: FiltrosProducto,
): Promise<Producto[]> {
  let resultado = productos.map(conEstadoActual);

  if (filtros?.categoria) {
    resultado = resultado.filter((p) => p.categoria === filtros.categoria);
  }
  if (filtros?.tipoDeMadera) {
    resultado = resultado.filter(
      (p) => p.tipoDeMadera === filtros.tipoDeMadera,
    );
  }
  if (filtros?.soloDisponibles) {
    resultado = resultado.filter((p) => p.estado === "DISPONIBLE");
  }
  return resultado;
}

export async function getProducto(slug: string): Promise<Producto | null> {
  const producto = productos.find((p) => p.slug === slug);
  return producto ? conEstadoActual(producto) : null;
}

export async function getProductosDestacados(): Promise<Producto[]> {
  // Máximo 6 en la grilla del home — incluye VENDIDOS (son escaparate).
  return productos.filter((p) => p.destacado).map(conEstadoActual).slice(0, 6);
}

// ─── Catálogo ────────────────────────────────────────────────────────────────

export async function getCategorias(): Promise<Categoria[]> {
  return [...categorias].sort((a, b) => a.orden - b.orden);
}

export async function getTestimonios(): Promise<Testimonio[]> {
  return [...testimonios].sort((a, b) => a.orden - b.orden);
}

// ─── Config del sitio (singletons) ───────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfig;
}

// ─── Presupuestos (escritura hacia el CMS) ───────────────────────────────────

export async function submitPresupuesto(
  data: PresupuestoPayload,
): Promise<{ ok: boolean }> {
  // Fallo silencioso por diseño: si el tenant no está configurado, el flujo
  // del usuario (apertura de WhatsApp) no se interrumpe jamás.
  if (!TRICODE_API_BASE_URL || !TRICODE_TENANT_SLUG) {
    return { ok: false };
  }

  try {
    const res = await fetch(
      `${TRICODE_API_BASE_URL}/public/${TRICODE_TENANT_SLUG}/presupuestos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

// ─── Mutación de estado (webhook MercadoPago) ────────────────────────────────

export async function marcarProductosVendidos(ids: string[]): Promise<void> {
  // MVP: marca en memoria. Fase 2: PATCH a las entries del CMS
  // (PATCH /api/v1/.../content-types/productos/entries/:id → estado: VENDIDO).
  for (const id of ids) {
    vendidosEnMemoria.add(id);
  }
}
