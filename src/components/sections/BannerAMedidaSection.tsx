import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BannerAMedidaSection() {
  return (
    <section aria-labelledby="banner-medida-titulo" className="bg-musgo">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white sm:px-6">
        <h2 id="banner-medida-titulo" className="text-3xl sm:text-4xl">
          ¿Querés un mueble a tu medida?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Diseñamos el mueble que imaginás, con la madera que elegís y las
          medidas exactas de tu espacio. Presupuesto sin cargo, con envíos a
          todo Uruguay.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 min-h-12 bg-white px-8 text-base text-musgo hover:bg-white/90"
        >
          <Link href="/a-medida">Pedir presupuesto sin cargo</Link>
        </Button>
      </div>
    </section>
  );
}
