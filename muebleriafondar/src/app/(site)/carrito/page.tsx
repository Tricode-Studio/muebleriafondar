// /carrito — Revisión de piezas + inicio de checkout MercadoPago.
import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito de compras",
  description:
    "Revisá las piezas únicas de tu carrito y finalizá tu compra con MercadoPago. Envíos a todo Uruguay.",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl sm:text-4xl">Tu carrito</h1>
      <CartView />
    </div>
  );
}
