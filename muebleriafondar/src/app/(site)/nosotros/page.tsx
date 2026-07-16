// /nosotros — Historia, valores y ubicación.
import type { Metadata } from "next";
import Link from "next/link";
import { Gem, HeartHandshake, Leaf } from "lucide-react";
import { getSiteConfig } from "@/lib/cms";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Quiénes Somos | Mueblería Fondar — Trinidad, Uruguay" },
  description:
    "Conocé la historia de Mueblería Fondar, mueblería artesanal de madera maciza en Trinidad, Flores. Piezas únicas con calidad natural.",
  alternates: { canonical: "/nosotros" },
};

const valores = [
  {
    icono: Leaf,
    titulo: "Calidad natural",
    texto:
      "Trabajamos exclusivamente madera maciza: eucaliptus, pino, guatambú, lapacho y madera reciclada. Nada de aglomerado ni melamina.",
  },
  {
    icono: Gem,
    titulo: "Piezas únicas",
    texto:
      "No hay producción en serie. Cada mueble sale una sola vez del taller, con la veta y el carácter que esa madera trajo.",
  },
  {
    icono: HeartHandshake,
    titulo: "Atención personalizada",
    texto:
      "Somos un taller de escala humana: te asesoramos con la madera, las medidas y la terminación, de persona a persona.",
  },
];

export default async function NosotrosPage() {
  const { contacto } = await getSiteConfig();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl sm:text-4xl">Nuestra historia</h1>

      <div className="mt-6 space-y-5 leading-relaxed text-foreground/90">
        <p>
          Mueblería Fondar nació en Trinidad, departamento de Flores, en el
          corazón del interior del Uruguay, con una convicción simple: los
          muebles de verdad se hacen con madera de verdad.
        </p>
        <p>
          Por eso trabajamos exclusivamente madera maciza. Cada tabla que entra
          al taller tiene su veta, sus nudos y su historia — y nuestro oficio
          es respetarla. No fabricamos en serie: cada mesa, cada ropero y cada
          estantería es una pieza única que sale una sola vez de nuestras
          manos, hecha para durar generaciones.
        </p>
        <p>
          Con el tiempo, esa forma de trabajar nos llevó cada vez más a los
          muebles a medida: piezas pensadas junto al cliente, con el tipo de
          madera que elige, las medidas exactas de su espacio y la terminación
          que imagina. Es la parte del oficio que más disfrutamos — convertir
          una idea en un mueble con carácter propio.
        </p>
        <p>
          Aunque el taller está en Trinidad, la artesanía de Flores llega a
          cualquier rincón del país: hacemos envíos a todo Uruguay y
          coordinamos cada entrega de forma personalizada.
        </p>
      </div>

      <section aria-labelledby="valores-titulo" className="mt-14">
        <h2 id="valores-titulo" className="text-2xl sm:text-3xl">
          Lo que nos define
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {valores.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo}>
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <Icono className="size-6 text-musgo" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg">{titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="ubicacion-titulo"
        className="mt-14 rounded-lg border border-border bg-card p-8 text-center"
      >
        <h2 id="ubicacion-titulo" className="text-2xl">
          Estamos en {contacto.ciudad}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Visitanos en el taller o escribinos: hacemos envíos a todo el país y
          te asesoramos sin compromiso.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="min-h-12 bg-madera hover:bg-madera/90">
            <Link href="/productos">Ver catálogo de muebles</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-12">
            <Link href="/contacto">Contactanos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
