"use client";

// Filtros del catálogo: sidebar en desktop, drawer (Sheet) en mobile.
// El estado vive en useFilters (hooks/useFilters.ts) y lo controla el padre.

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Categoria, CategoriaProducto, TipoDeMadera } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const maderas: TipoDeMadera[] = [
  "Eucaliptus",
  "Pino",
  "Guatambú",
  "Lapacho",
  "Reciclada",
];

export interface ProductFiltersProps {
  categorias: Categoria[];
  categoria?: CategoriaProducto;
  setCategoria: (c?: CategoriaProducto) => void;
  tipoDeMadera?: TipoDeMadera;
  setTipoDeMadera: (m?: TipoDeMadera) => void;
  soloDisponibles: boolean;
  setSoloDisponibles: (v: boolean) => void;
  limpiarFiltros: () => void;
  hayFiltrosActivos: boolean;
}

function FiltrosContenido(props: ProductFiltersProps) {
  const {
    categorias,
    categoria,
    setCategoria,
    tipoDeMadera,
    setTipoDeMadera,
    soloDisponibles,
    setSoloDisponibles,
    limpiarFiltros,
    hayFiltrosActivos,
  } = props;

  const opcionClase = (activa: boolean) =>
    cn(
      "w-full rounded-md px-3 py-2 text-left text-sm min-h-11 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring",
      activa
        ? "bg-madera text-primary-foreground font-medium hover:bg-madera/90"
        : "text-foreground/80",
    );

  return (
    <div className="space-y-6">
      {/* Toggle disponibles */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Disponibilidad</legend>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="solo-disponibles"
            checked={soloDisponibles}
            onChange={(e) => setSoloDisponibles(e.target.checked)}
            className="size-4 accent-(--madera)"
          />
          <Label htmlFor="solo-disponibles" className="text-sm font-normal">
            {soloDisponibles ? "Solo disponibles" : "Mostrar todos"}
          </Label>
        </div>
      </fieldset>

      <Separator />

      {/* Categorías */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Categoría</legend>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => setCategoria(undefined)}
              aria-pressed={!categoria}
              className={opcionClase(!categoria)}
            >
              Todas
            </button>
          </li>
          {categorias.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() =>
                  setCategoria(
                    categoria === cat.nombre
                      ? undefined
                      : (cat.nombre as CategoriaProducto),
                  )
                }
                aria-pressed={categoria === cat.nombre}
                className={opcionClase(categoria === cat.nombre)}
              >
                {cat.nombre}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <Separator />

      {/* Tipo de madera */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Tipo de madera</legend>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => setTipoDeMadera(undefined)}
              aria-pressed={!tipoDeMadera}
              className={opcionClase(!tipoDeMadera)}
            >
              Todas
            </button>
          </li>
          {maderas.map((madera) => (
            <li key={madera}>
              <button
                type="button"
                onClick={() =>
                  setTipoDeMadera(tipoDeMadera === madera ? undefined : madera)
                }
                aria-pressed={tipoDeMadera === madera}
                className={opcionClase(tipoDeMadera === madera)}
              >
                {madera}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {hayFiltrosActivos && (
        <Button variant="ghost" onClick={limpiarFiltros} className="w-full">
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}

export function ProductFilters(props: ProductFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        aria-label="Filtros del catálogo"
        className="hidden w-56 shrink-0 lg:block"
      >
        <FiltrosContenido {...props} />
      </aside>

      {/* Drawer mobile */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="min-h-11">
              <SlidersHorizontal aria-hidden="true" />
              Filtros
              {props.hayFiltrosActivos && (
                <span
                  className="ml-1 size-2 rounded-full bg-madera"
                  aria-label="Hay filtros activos"
                />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtrar catálogo</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-8">
              <FiltrosContenido {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
