"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { formatPrecio, productoAlt } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const removeFromCart = useCart((s) => s.removeFromCart);
  const { producto } = item;

  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
      <Link
        href={`/productos/${producto.slug}`}
        className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-md sm:w-36"
      >
        <Image
          src={producto.imagenes[0]}
          alt={productoAlt(producto.nombre, producto.tipoDeMadera)}
          fill
          sizes="144px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-heading text-base leading-snug sm:text-lg">
          <Link href={`/productos/${producto.slug}`} className="hover:text-madera">
            {producto.nombre}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {producto.tipoDeMadera} · Pieza única
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="font-semibold text-madera">
            {formatPrecio(producto.precio)}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(producto.id)}
            aria-label={`Eliminar ${producto.nombre} del carrito`}
            className="min-h-11 text-muted-foreground hover:text-destructive"
          >
            <Trash2 aria-hidden="true" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
