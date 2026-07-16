import type { MetadataRoute } from "next";
import { getProductos } from "@/lib/cms";

const SITE_URL = "https://muebleriafondar.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await getProductos();

  const estaticas: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/productos`, priority: 0.9 },
    { url: `${SITE_URL}/a-medida`, priority: 0.9 },
    { url: `${SITE_URL}/nosotros`, priority: 0.5 },
    { url: `${SITE_URL}/contacto`, priority: 0.5 },
  ];

  return [
    ...estaticas,
    ...productos.map((p) => ({
      url: `${SITE_URL}/productos/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
