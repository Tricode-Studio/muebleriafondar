// Home — hero, destacados, diferenciales, testimonios y banner a medida.
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/cms";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductosDestacadosSection } from "@/components/sections/ProductosDestacadosSection";
import { DiferencialesSection } from "@/components/sections/DiferencialesSection";
import { TestimoniosSection } from "@/components/sections/TestimoniosSection";
import { BannerAMedidaSection } from "@/components/sections/BannerAMedidaSection";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteConfig();
  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const { hero } = await getSiteConfig();

  return (
    <>
      <HeroSection hero={hero} />
      <ProductosDestacadosSection />
      <DiferencialesSection />
      <TestimoniosSection />
      <BannerAMedidaSection />
    </>
  );
}
