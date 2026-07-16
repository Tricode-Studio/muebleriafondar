// /pago/pendiente — Pago en proceso (ej: transferencia o efectivo).
import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pago en proceso",
  robots: { index: false },
};

export default function PagoPendientePage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <Clock className="size-16 text-madera" aria-hidden="true" />
      <h1 className="mt-6 text-3xl sm:text-4xl">Tu pago está en proceso</h1>
      <p className="mt-4 text-muted-foreground">
        Algunos medios de pago (como transferencia o pago en efectivo) demoran
        un poco en acreditarse. Apenas MercadoPago nos confirme el pago, te
        contactamos por WhatsApp para coordinar el envío.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        No necesitás hacer nada más. Si tenés dudas, escribinos y lo vemos
        juntos.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="min-h-12 bg-madera hover:bg-madera/90">
          <Link href="/contacto">Contactanos</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-12">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
