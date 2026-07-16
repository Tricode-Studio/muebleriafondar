"use client";

// Vista completa del carrito. Maneja:
//  - Hidratación del store persistido (evita mismatch SSR).
//  - Race condition: al montar y antes del checkout verifica si alguna pieza
//    pasó a VENDIDO; si ocurre, alerta visible y remoción automática.
//  - Confirmación explícita antes de redirigir a MercadoPago.

import Link from "next/link";
import { AlertTriangle, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useHydrated } from "@/hooks/useHydrated";
import { trackEvent } from "@/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export function CartView() {
  const items = useCart((s) => s.items);
  const removeFromCart = useCart((s) => s.removeFromCart);

  const mounted = useHydrated();
  const [aviso, setAviso] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  // Verifica contra el servidor si alguna pieza del carrito ya se vendió.
  // Devuelve true si el carrito quedó modificado.
  const verificarDisponibilidad = useCallback(async (): Promise<boolean> => {
    const slugs = useCart.getState().items.map((i) => i.producto.slug);
    if (slugs.length === 0) return false;

    try {
      const res = await fetch(
        `/api/productos/estado?slugs=${encodeURIComponent(slugs.join(","))}`,
      );
      if (!res.ok) return false;
      const { estados } = (await res.json()) as {
        estados: { slug: string; estado: string | null }[];
      };

      const vendidos = useCart
        .getState()
        .items.filter((i) =>
          estados.some(
            (e) => e.slug === i.producto.slug && e.estado !== "DISPONIBLE",
          ),
        );

      if (vendidos.length > 0) {
        vendidos.forEach((i) => removeFromCart(i.producto.id));
        setAviso(
          `${vendidos.map((i) => `"${i.producto.nombre}"`).join(", ")} ya ${
            vendidos.length > 1 ? "fueron vendidas" : "fue vendida"
          } y ${vendidos.length > 1 ? "se quitaron" : "se quitó"} del carrito. ` +
            "Son piezas únicas, pero podemos hacer una similar para vos.",
        );
        return true;
      }
    } catch {
      // Sin conexión no bloqueamos la vista; el checkout revalida en el server.
    }
    return false;
  }, [removeFromCart]);

  useEffect(() => {
    if (!mounted) return;
    // Diferido para no bloquear el primer paint tras la hidratación.
    const id = setTimeout(() => void verificarDisponibilidad(), 0);
    return () => clearTimeout(id);
  }, [mounted, verificarDisponibilidad]);

  const iniciarCheckout = async () => {
    setError(null);
    setProcesando(true);
    try {
      // Última verificación antes de crear la preferencia.
      const huboCambios = await verificarDisponibilidad();
      if (huboCambios) {
        setConfirmando(false);
        return;
      }

      const slugs = useCart.getState().items.map((i) => ({
        slug: i.producto.slug,
      }));
      if (slugs.length === 0) return;

      trackEvent("begin_checkout", { items: slugs.length });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: slugs }),
      });
      const data = await res.json();

      if (res.status === 409 && data.vendidos) {
        // El servidor detectó piezas vendidas: sincronizamos el carrito.
        await verificarDisponibilidad();
        setConfirmando(false);
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "No pudimos iniciar el pago. Intentá de nuevo.");
        return;
      }

      window.location.href = data.initPoint;
    } catch {
      setError("No pudimos conectar con el servidor. Revisá tu conexión.");
    } finally {
      setProcesando(false);
    }
  };

  if (!mounted) {
    // Placeholder estable durante la hidratación del store persistido.
    return (
      <div className="h-40 animate-pulse rounded-lg border border-border bg-card" />
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center">
        {aviso && (
          <Alert className="mb-6 border-vendido/40 text-left">
            <AlertTriangle className="text-vendido" />
            <AlertTitle>Una pieza ya encontró su hogar</AlertTitle>
            <AlertDescription>
              {aviso}{" "}
              <Link href="/a-medida" className="text-madera underline">
                Pedila a medida
              </Link>
              .
            </AlertDescription>
          </Alert>
        )}
        <ShoppingBag
          className="mx-auto size-12 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-2xl">Tu carrito está vacío</h2>
        <p className="mt-2 text-muted-foreground">
          Cada pieza del catálogo es única — cuando encuentres la tuya, sumala
          acá.
        </p>
        <Button asChild className="mt-6 min-h-12 bg-madera hover:bg-madera/90">
          <Link href="/productos">Ver catálogo de muebles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {aviso && (
          <Alert className="border-vendido/40">
            <AlertTriangle className="text-vendido" />
            <AlertTitle>Una pieza ya encontró su hogar</AlertTitle>
            <AlertDescription>
              {aviso}{" "}
              <Link href="/a-medida" className="text-madera underline">
                Pedila a medida
              </Link>
              .
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle />
            <AlertTitle>No pudimos iniciar el pago</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.producto.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        {confirmando ? (
          <div className="rounded-lg border border-madera/40 bg-card p-6">
            <h2 className="text-xl">¿Confirmás tu compra?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Te vamos a redirigir a MercadoPago para completar el pago de{" "}
              {items.length} {items.length === 1 ? "pieza única" : "piezas únicas"}.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                onClick={iniciarCheckout}
                disabled={procesando}
                className="min-h-12 bg-madera hover:bg-madera/90"
              >
                {procesando ? "Preparando el pago..." : "Sí, ir a pagar"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setConfirmando(false)}
                disabled={procesando}
                className="min-h-11"
              >
                Volver al carrito
              </Button>
            </div>
          </div>
        ) : (
          <CartSummary
            onCheckout={() => setConfirmando(true)}
            procesando={procesando}
          />
        )}
      </div>
    </div>
  );
}
