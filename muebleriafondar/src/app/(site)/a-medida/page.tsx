// /a-medida — Muebles personalizados: intro + formulario dual (WhatsApp + CMS).
// Si llega ?producto=<slug> desde una pieza VENDIDA, pre-llena la referencia.
import type { Metadata } from "next";
import { Hammer, MessageCircle, Ruler, TreePine } from "lucide-react";
import { getProducto } from "@/lib/cms";
import { MedidaForm } from "@/components/forms/MedidaForm";

export const metadata: Metadata = {
  title: { absolute: "Muebles a Medida en Uruguay | Mueblería Fondar" },
  description:
    "Diseñamos tu mueble ideal en madera maciza. Elegís el tipo de madera, medidas y terminación. Presupuesto sin cargo. Trinidad, Flores, Uruguay.",
  alternates: { canonical: "/a-medida" },
};

const pasos = [
  {
    icono: MessageCircle,
    titulo: "Contanos tu idea",
    texto:
      "Completá el formulario con lo que imaginás. Una foto de referencia o una descripción alcanzan para arrancar.",
  },
  {
    icono: Ruler,
    titulo: "Te presupuestamos sin cargo",
    texto:
      "Te respondemos por WhatsApp con el presupuesto y los tiempos. Sin compromiso.",
  },
  {
    icono: Hammer,
    titulo: "Lo hacemos a mano",
    texto:
      "Fabricamos tu pieza en madera maciza en nuestro taller de Trinidad y la enviamos a todo el país.",
  },
];

const maderas = [
  {
    nombre: "Eucaliptus",
    texto: "Veta marcada y tonos cálidos. Nuestra madera insignia.",
  },
  {
    nombre: "Pino",
    texto: "Liviano y noble, ideal para dormitorios y estanterías.",
  },
  {
    nombre: "Guatambú",
    texto: "Clara y de grano fino, perfecta para espacios luminosos.",
  },
  {
    nombre: "Madera reciclada",
    texto: "Tablas con historia real, irrepetibles por definición.",
  },
];

export default async function AMedidaPage(props: PageProps<"/a-medida">) {
  const searchParams = await props.searchParams;
  const slugRef = typeof searchParams.producto === "string" ? searchParams.producto : undefined;

  // Referencia validada contra el catálogo (no confiar en el query param).
  const productoRef = slugRef ? await getProducto(slugRef) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl">Muebles a Medida en Uruguay</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Diseñamos el mueble que imaginás, con la madera que elegís. Medidas
          exactas, terminación a elección y envíos a todo el país.
        </p>
      </header>

      <section aria-labelledby="como-funciona" className="mt-14">
        <h2 id="como-funciona" className="text-center text-2xl sm:text-3xl">
          ¿Cómo funciona?
        </h2>
        <ol className="mx-auto mt-8 grid max-w-4xl gap-8 sm:grid-cols-3">
          {pasos.map(({ icono: Icono, titulo, texto }, idx) => (
            <li key={titulo} className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
                <Icono className="size-6 text-musgo" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg">
                {idx + 1}. {titulo}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="elegi-madera" className="mt-14">
        <h2 id="elegi-madera" className="text-center text-2xl sm:text-3xl">
          Elegí tu madera
        </h2>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {maderas.map((m) => (
            <li
              key={m.nombre}
              className="rounded-lg border border-border bg-card p-5 text-center"
            >
              <TreePine className="mx-auto size-6 text-madera" aria-hidden="true" />
              <h3 className="mt-2 text-base font-semibold">{m.nombre}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="formulario-titulo" className="mx-auto mt-14 max-w-2xl">
        <h2 id="formulario-titulo" className="text-center text-2xl sm:text-3xl">
          Diseñamos lo que imaginás
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Completá el formulario y te contactamos por WhatsApp con tu
          presupuesto sin cargo.
        </p>
        <div className="mt-8">
          <MedidaForm
            productoReferencia={
              productoRef
                ? { slug: productoRef.slug, nombre: productoRef.nombre }
                : undefined
            }
          />
        </div>
      </section>
    </div>
  );
}
