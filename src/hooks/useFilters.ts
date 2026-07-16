// hooks/useFilters.ts — Estado de filtros del catálogo (/productos)
"use client";

import { useMemo, useState } from "react";
import type {
  CategoriaProducto,
  FiltrosProducto,
  Producto,
  TipoDeMadera,
} from "@/types";

export function useFilters(productos: Producto[]) {
  const [categoria, setCategoria] = useState<CategoriaProducto | undefined>();
  const [tipoDeMadera, setTipoDeMadera] = useState<TipoDeMadera | undefined>();
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const filtros: FiltrosProducto = { categoria, tipoDeMadera, soloDisponibles };

  const productosFiltrados = useMemo(
    () =>
      productos.filter((p) => {
        if (categoria && p.categoria !== categoria) return false;
        if (tipoDeMadera && p.tipoDeMadera !== tipoDeMadera) return false;
        // Nunca ocultar VENDIDOS automáticamente: solo el toggle explícito.
        if (soloDisponibles && p.estado !== "DISPONIBLE") return false;
        return true;
      }),
    [productos, categoria, tipoDeMadera, soloDisponibles],
  );

  const limpiarFiltros = () => {
    setCategoria(undefined);
    setTipoDeMadera(undefined);
    setSoloDisponibles(false);
  };

  const hayFiltrosActivos =
    Boolean(categoria) || Boolean(tipoDeMadera) || soloDisponibles;

  return {
    filtros,
    productosFiltrados,
    categoria,
    setCategoria,
    tipoDeMadera,
    setTipoDeMadera,
    soloDisponibles,
    setSoloDisponibles,
    limpiarFiltros,
    hayFiltrosActivos,
  };
}
