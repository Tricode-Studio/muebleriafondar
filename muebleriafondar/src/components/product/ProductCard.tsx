"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import type { Producto } from "@/types";
import { formatPrecio, productoAlt } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useHydrated } from "@/hooks/useHydrated";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const addToCart = useCart((s) => s.addToCart);
  const enCarrito = useCart((s) =>
    s.items.some((i) => i.producto.id === producto.id),
  );
  const mounted = useHydrated();

  const vendido = producto.estado === "VENDIDO";

  const handleAdd = () => {
    addToCart(producto);
    trackEvent("add_to_cart", {
      item_id: producto.id,
      item_name: producto.nombre,
      value: producto.precio,
      currency: "UYU",
    });
  };

  return (
    <Card className="card-hover flex h-full flex-col overflow-hidden py-0 gap-0">
      <Link
        href={`/productos/${producto.slug}`}
        className="relative block aspect-[4/3] overflow-hidden focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Image
          src={producto.imagenes[0]}
          alt={productoAlt(producto.nombre, producto.tipoDeMadera)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {vendido && (
          <span className="absolute inset-0 flex items-start justify-end bg-foreground/35 p-3">
            <Badge className="bg-vendido text-white text-xs font-semibold tracking-wide">
              VENDIDO
            </Badge>
          </span>
        )}
      </Link>

      <CardContent className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium tracking-wide text-musgo uppercase">
          {producto.categoria} · {producto.tipoDeMadera}
        </p>
        <h3 className="font-heading text-lg leading-snug">
          <Link
            href={`/productos/${producto.slug}`}
            className="hover:text-madera focus-visible:outline-2 focus-visible:outline-ring"
          >
            {producto.nombre}
          </Link>
        </h3>
        <p className="mt-auto pt-1 text-lg font-semibold text-madera">
          {formatPrecio(producto.precio)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {vendido ? (
          <Button
            asChild
            variant="outline"
            className="w-full min-h-11 border-madera text-madera hover:bg-madera hover:text-primary-foreground"
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
              ¿Te gustó? Pedí uno similar
            </Link>
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            disabled={mounted && enCarrito}
            className="w-full min-h-11 bg-madera hover:bg-madera/90"
          >
            {mounted && enCarrito ? (
              <>
                <Check aria-hidden="true" /> En el carrito
              </>
            ) : (
              <>
                <ShoppingCart aria-hidden="true" /> Agregar al carrito
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
