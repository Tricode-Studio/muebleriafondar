"use client";

// Tras un pago aprobado: vacía el carrito local y registra el evento GA.
import { useEffect } from "react";

import { useCart } from "@/hooks/useCart";
import { trackEvent } from "@/lib/analytics";

export function LimpiarCarrito() {
  useEffect(() => {
    const { items, clearCart } = useCart.getState();
    if (items.length > 0) {
      trackEvent("purchase", {
        value: items.reduce((acc, i) => acc + i.producto.precio, 0),
        currency: "UYU",
        items: items.length,
      });
      clearCart();
    }
  }, []);

  return null;
}
