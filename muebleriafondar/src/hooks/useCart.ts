// hooks/useCart.ts — Store del carrito (Zustand 5, persistido en localStorage)
// Cada ítem es una pieza única: cantidad siempre = 1, sin duplicados.
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Producto } from "@/types";

interface CartStore {
  items: CartItem[];
  addToCart: (producto: Producto) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (producto) => {
        // Solo piezas DISPONIBLES y que no estén ya en el carrito.
        if (producto.estado !== "DISPONIBLE") return;
        if (get().items.some((i) => i.producto.id === producto.id)) return;
        set((state) => ({ items: [...state.items, { producto }] }));
      },
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.producto.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "fondar-cart" },
  ),
);

// Selectores computados
export const useCartTotal = () =>
  useCart((s) => s.items.reduce((acc, i) => acc + i.producto.precio, 0));

export const useCartCount = () => useCart((s) => s.items.length);
