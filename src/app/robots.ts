import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrito", "/pago/", "/api/"],
    },
    sitemap: "https://muebleriafondar.com/sitemap.xml",
  };
}
