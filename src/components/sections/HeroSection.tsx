import Image from "next/image";
import Link from "next/link";
import type { HeroConfig } from "@/types";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  hero: HeroConfig;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden">
      <Image
        src={hero.imagenFondo}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center text-white sm:px-6">
        <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {hero.titulo}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">
          {hero.subtitulo}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="min-h-12 w-full bg-madera px-8 text-base hover:bg-madera/90 sm:w-auto"
          >
            <Link href="/productos">{hero.ctaPrimarioTexto}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-h-12 w-full border-white bg-transparent px-8 text-base text-white hover:bg-white hover:text-foreground sm:w-auto"
          >
            <Link href="/a-medida">{hero.ctaSecundarioTexto}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
