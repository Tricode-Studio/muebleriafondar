// hooks/useHydrated.ts — Detecta si ya ocurrió la hidratación en el cliente.
// Necesario porque el carrito se persiste en localStorage: el primer render
// del cliente debe coincidir con el SSR y recién después mostrar el estado real.
"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // snapshot en cliente
    () => false, // snapshot en servidor
  );
}
