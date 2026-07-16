import Link from "next/link";
import { getProductosDestacados } from "@/lib/cms";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

export async function ProductosDestacadosSection() {
  const destacados = await getProductosDestacados();

  return (
    <section
      aria-labelledby="destacados-titulo"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="mb-8 text-center">
        <h2 id="destacados-titulo" className="text-3xl sm:text-4xl">
          Nuestro catálogo
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Piezas únicas en madera maciza, hechas a mano en Trinidad. Las
          vendidas también cuentan: podemos hacer una similar para vos.
        </p>
      </div>

      <ProductGrid productos={destacados} />

      <div className="mt-10 text-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="min-h-12 border-madera text-madera hover:bg-madera hover:text-primary-foreground"
        >
          <Link href="/productos">Ver catálogo completo de muebles</Link>
        </Button>
      </div>
    </section>
  );
}
