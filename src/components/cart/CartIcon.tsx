"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/hooks/useCart";
import { useHydrated } from "@/hooks/useHydrated";

export function CartIcon() {
  const count = useCartCount();
  // El store se hidrata desde localStorage: evitar mismatch SSR/cliente.
  const mounted = useHydrated();

  return (
    <Link
      href="/carrito"
      aria-label={`Carrito de compras${mounted && count > 0 ? `, ${count} piezas` : ""}`}
      className="relative inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
    >
      <ShoppingCart className="size-5" aria-hidden="true" />
      {mounted && count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-madera text-xs font-semibold text-primary-foreground"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
