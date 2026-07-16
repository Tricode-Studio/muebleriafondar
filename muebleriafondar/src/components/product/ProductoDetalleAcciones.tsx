"use client";

// Bloque de acciones del detalle de producto según estado:
//  DISPONIBLE → "Agregar al carrito" prominente.
//  VENDIDO    → badge + celebración + CTA "Quiero uno similar" → /a-medida.

import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import type { Producto } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useHydrated } from "@/hooks/useHydrated";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductoDetalleAccionesProps {
  producto: Producto;
}

export function ProductoDetalleAcciones({
  producto,
}: ProductoDetalleAccionesProps) {
  const addToCart = useCart((s) => s.addToCart);
  const enCarrito = useCart((s) =>
    s.items.some((i) => i.producto.id === producto.id),
  );
  const mounted = useHydrated();

  if (producto.estado === "VENDIDO") {
    return (
      <div className="rounded-lg border border-vendido/30 bg-secondary/50 p-5">
        <Badge className="bg-vendido text-white font-semibold tracking-wide">
          VENDIDO
        </Badge>
        <p className="mt-3 text-sm leading-relaxed">
          Esta pieza ya encontró su hogar. Pero podemos hacer una igual para
          vos, con la madera y las medidas que quieras.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-4 min-h-12 w-full bg-madera text-base hover:bg-madera/90"
        >
          <Link
            href={`/a-medida?producto=${producto.slug}`}
            onClick={() =>
              trackEvent("producto_vendido_cta", {
                item_id: producto.id,
                item_name: producto.nombre,
              })
            }
          >
            Quiero uno similar
          </Link>
        </Button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(producto);
    trackEvent("add_to_cart", {
      item_id: producto.id,
      item_name: producto.nombre,
      value: producto.precio,
      currency: "UYU",
    });
  };

  if (mounted && enCarrito) {
    return (
      <div className="space-y-2">
        <Button
          size="lg"
          disabled
          className="min-h-12 w-full bg-musgo text-base"
        >
          <Check aria-hidden="true" /> Ya está en tu carrito
        </Button>
        <Button asChild variant="outline" size="lg" className="min-h-12 w-full">
          <Link href="/carrito">Ir al carrito y finalizar compra</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAdd}
      size="lg"
      className="min-h-12 w-full bg-madera text-base hover:bg-madera/90"
    >
      <ShoppingCart aria-hidden="true" /> Agregar al carrito
    </Button>
  );
}
