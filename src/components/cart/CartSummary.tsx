"use client";

import { Loader2, Lock } from "lucide-react";
import { formatPrecio } from "@/lib/utils";
import { useCartTotal } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  onCheckout: () => void;
  procesando: boolean;
}

export function CartSummary({ onCheckout, procesando }: CartSummaryProps) {
  const total = useCartTotal();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl">Resumen</h2>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>Subtotal</span>
        <span className="text-lg font-semibold">{formatPrecio(total)}</span>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        Hacemos envíos a todo el país. El costo se coordina por WhatsApp luego
        de tu compra.
      </p>
      <Button
        onClick={onCheckout}
        disabled={procesando}
        size="lg"
        className="mt-6 min-h-12 w-full bg-madera text-base hover:bg-madera/90"
      >
        {procesando ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Preparando el pago...
          </>
        ) : (
          <>
            <Lock aria-hidden="true" />
            Finalizar compra
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Pago seguro con MercadoPago
      </p>
    </div>
  );
}
