// Layout del grupo de rutas públicas: Navbar sticky + contenido + Footer.
import { getSiteConfig } from "@/lib/cms";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { identidad, contacto } = await getSiteConfig();

  return (
    <>
      <Navbar
        nombreMarca={identidad.nombreMarca}
        logoUrl={identidad.logoUrl}
      />
      <main className="flex-1">{children}</main>
      <Footer contacto={contacto} identidad={identidad} />
    </>
  );
}
