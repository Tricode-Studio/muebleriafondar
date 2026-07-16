// /productos — Catálogo completo con filtros por categoría, madera y estado.
import type { Metadata } from "next";
import { getCategorias, getProductos } from "@/lib/cms";
import { CatalogoClient } from "./CatalogoClient";

export const metadata: Metadata = {
  title: { absolute: "Catálogo de Muebles de Madera Maciza | Mueblería Fondar" },
  description:
    "Explorá nuestro catálogo de muebles únicos en madera maciza. Disponibles para compra online con envíos a todo Uruguay. Trinidad, Flores.",
  alternates: { canonical: "/productos" },
};

export default async function ProductosPage() {
  const [productos, categorias] = await Promise.all([
    getProductos(),
    getCategorias(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl">Catálogo de Muebles Artesanales</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Cada pieza es única, hecha a mano en madera maciza en Trinidad,
          Flores. Las piezas vendidas siguen a la vista: si te enamorás de una,
          la hacemos similar a tu medida.
        </p>
      </header>

      <CatalogoClient productos={productos} categorias={categorias} />
    </div>
  );
}
