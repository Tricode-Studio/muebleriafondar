import type { Producto } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductGridProps {
  productos: Producto[];
  /** Columnas máximas en desktop: 3 (home) o 4 (catálogo con sidebar) */
  columnas?: 3 | 4;
}

export function ProductGrid({ productos, columnas = 3 }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        No encontramos piezas con esos filtros. Probá con otra combinación o{" "}
        <a href="/a-medida" className="text-madera underline">
          pedí un mueble a medida
        </a>
        .
      </p>
    );
  }

  return (
    <ul
      className={
        columnas === 4
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {productos.map((producto) => (
        <li key={producto.id}>
          <ProductCard producto={producto} />
        </li>
      ))}
    </ul>
  );
}
