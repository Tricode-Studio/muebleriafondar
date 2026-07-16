// Root layout: fuentes, metadatos globales, GA4 y schema LocalBusiness.
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteConfig } from "@/lib/cms";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://muebleriafondar.com";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, identidad } = await getSiteConfig();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.metaTitle,
      template: `%s | ${identidad.nombreMarca}`,
    },
    description: seo.metaDescription,
    openGraph: {
      type: "website",
      locale: "es_UY",
      url: SITE_URL,
      siteName: identidad.nombreMarca,
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
    },
    icons: { icon: "/favicon.ico", apple: "/logo.jpg" },
  };
}

// Schema LocalBusiness (FurnitureStore) — SEO local, definido en SEO.md.
async function localBusinessJsonLd() {
  const { contacto, identidad } = await getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: identidad.nombreMarca,
    description:
      "Muebles artesanales de madera maciza en Trinidad, Uruguay. Piezas únicas, muebles a medida y envíos a todo el país.",
    url: SITE_URL,
    telephone: contacto.telefono.replace(/\s/g, ""),
    email: contacto.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trinidad",
      addressRegion: "Flores",
      addressCountry: "UY",
    },
    sameAs: [contacto.facebook, contacto.instagram],
    hasMap:
      "https://www.google.com/maps/search/Mueblería+Fondar+Trinidad+Flores+Uruguay",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = await localBusinessJsonLd();

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
