"use client";

// Orquestador cliente del catálogo: filtros (sidebar/drawer) + grilla.
// Recibe los datos ya resueltos por el server component de la página.

import type { Categoria, Producto } from "@/types";
import { useFilters } from "@/hooks/useFilters";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";

interface CatalogoClientProps {
  productos: Producto[];
  categorias: Categoria[];
}

export function CatalogoClient({ productos, categorias }: CatalogoClientProps) {
  const {
    productosFiltrados,
    categoria,
    setCategoria,
    tipoDeMadera,
    setTipoDeMadera,
    soloDisponibles,
    setSoloDisponibles,
    limpiarFiltros,
    hayFiltrosActivos,
  } = useFilters(productos);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <ProductFilters
        categorias={categorias}
        categoria={categoria}
        setCategoria={setCategoria}
        tipoDeMadera={tipoDeMadera}
        setTipoDeMadera={setTipoDeMadera}
        soloDisponibles={soloDisponibles}
        setSoloDisponibles={setSoloDisponibles}
        limpiarFiltros={limpiarFiltros}
        hayFiltrosActivos={hayFiltrosActivos}
      />

      <div className="flex-1">
        <p className="mb-4 text-sm text-muted-foreground" role="status">
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "pieza" : "piezas"}
          {hayFiltrosActivos && " con los filtros aplicados"}
        </p>
        <ProductGrid productos={productosFiltrados} columnas={4} />
      </div>
    </div>
  );
}
