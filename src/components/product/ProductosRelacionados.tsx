// Piezas relacionadas: misma categoría, excluye la actual, máximo 3.
import { getProductos } from "@/lib/cms";
import type { Producto } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

interface ProductosRelacionadosProps {
  producto: Producto;
}

export async function ProductosRelacionados({
  producto,
}: ProductosRelacionadosProps) {
  const relacionados = (
    await getProductos({ categoria: producto.categoria })
  )
    .filter((p) => p.id !== producto.id)
    .slice(0, 3);

  if (relacionados.length === 0) return null;

  return (
    <section aria-labelledby="relacionados-titulo" className="mt-16">
      <h2 id="relacionados-titulo" className="mb-6 text-2xl">
        Otras piezas de {producto.categoria.toLowerCase()}
      </h2>
      <ProductGrid productos={relacionados} />
    </section>
  );
}
