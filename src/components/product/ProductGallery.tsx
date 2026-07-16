"use client";

// Galería de imágenes de producto con swipe nativo en mobile
// (scroll-snap horizontal) y miniaturas clicleables en desktop.

import Image from "next/image";
import { useRef, useState } from "react";
import type { Producto } from "@/types";
import { cn, productoAlt } from "@/lib/utils";

interface ProductGalleryProps {
  producto: Producto;
}

export function ProductGallery({ producto }: ProductGalleryProps) {
  const [activa, setActiva] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { imagenes } = producto;

  const irA = (idx: number) => {
    setActiva(idx);
    const scroller = scrollerRef.current;
    scroller?.scrollTo({ left: scroller.clientWidth * idx, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          setActiva(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg scrollbar-none [scrollbar-width:none]"
        aria-label={`Galería de imágenes de ${producto.nombre}`}
      >
        {imagenes.map((src, idx) => (
          <div
            key={src}
            className="relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden"
          >
            <Image
              src={src}
              alt={
                idx === 0
                  ? productoAlt(producto.nombre, producto.tipoDeMadera)
                  : `${producto.nombre}, vista ${idx + 1} — Mueblería Fondar`
              }
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {imagenes.length > 1 && (
        <div className="mt-3 flex gap-2" role="tablist" aria-label="Miniaturas">
          {imagenes.map((src, idx) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={activa === idx}
              aria-label={`Ver imagen ${idx + 1} de ${imagenes.length}`}
              onClick={() => irA(idx)}
              className={cn(
                "relative aspect-[4/3] w-20 overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                activa === idx ? "border-madera" : "border-transparent",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
