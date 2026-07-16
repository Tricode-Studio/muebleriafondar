// /pago/exitoso — Confirmación de pago aprobado.
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LimpiarCarrito } from "./LimpiarCarrito";

export const metadata: Metadata = {
  title: "¡Compra confirmada!",
  robots: { index: false },
};

export default function PagoExitosoPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <LimpiarCarrito />
      <CheckCircle2 className="size-16 text-musgo" aria-hidden="true" />
      <h1 className="mt-6 text-3xl sm:text-4xl">¡Tu compra fue confirmada!</h1>
      <p className="mt-4 text-muted-foreground">
        Gracias por elegir una pieza única de Mueblería Fondar. En breve nos
        comunicamos por WhatsApp para coordinar el envío a cualquier punto del
        país.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="min-h-12 bg-madera hover:bg-madera/90">
          <Link href="/productos">Ver más productos</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-12">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
