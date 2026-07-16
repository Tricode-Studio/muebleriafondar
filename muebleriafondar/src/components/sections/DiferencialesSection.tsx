import { Gem, TreePine, Truck } from "lucide-react";

const diferenciales = [
  {
    icono: TreePine,
    titulo: "Madera maciza real",
    texto:
      "Nada de aglomerado ni melamina: eucaliptus, pino, guatambú y lapacho de verdad, con veta visible y durabilidad que se hereda.",
  },
  {
    icono: Gem,
    titulo: "Piezas únicas",
    texto:
      "Ningún mueble se repite. Cada pieza artesanal tiene su carácter propio — comprás algo que nadie más va a tener.",
  },
  {
    icono: Truck,
    titulo: "Envíos a todo Uruguay",
    texto:
      "Desde Trinidad, Flores, llegamos a cualquier rincón del país. El costo del envío se coordina por WhatsApp.",
  },
];

export function DiferencialesSection() {
  return (
    <section aria-labelledby="diferenciales-titulo" className="bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="diferenciales-titulo" className="text-center text-3xl sm:text-4xl">
          Por qué elegir Fondar
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {diferenciales.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo} className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
                <Icono className="size-7 text-musgo" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
