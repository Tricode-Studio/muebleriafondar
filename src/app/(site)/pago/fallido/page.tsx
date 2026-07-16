// /pago/fallido — Error en el pago: mensaje empático + reintento + WhatsApp.
import type { Metadata } from "next";
import Link from "next/link";
import { HeartCrack } from "lucide-react";
import { getSiteConfig } from "@/lib/cms";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hubo un problema con el pago",
  robots: { index: false },
};

export default async function PagoFallidoPage() {
  const { contacto } = await getSiteConfig();
  const whatsappUrl = `https://wa.me/${contacto.telefonoWhatsapp.replace(/\D/g, "")}?${new URLSearchParams(
    {
      text: "¡Hola! Tuve un problema al pagar en la web y quiero completar mi compra.",
    },
  ).toString()}`;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <HeartCrack className="size-16 text-vendido" aria-hidden="true" />
      <h1 className="mt-6 text-3xl sm:text-4xl">No pudimos procesar el pago</h1>
      <p className="mt-4 text-muted-foreground">
        Tranquilo: no se realizó ningún cargo y tu pieza sigue en el carrito.
        A veces pasa por un rechazo del banco o un corte de conexión — podés
        intentarlo de nuevo cuando quieras.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="min-h-12 bg-madera hover:bg-madera/90">
          <Link href="/carrito">Reintentar el pago</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-12">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Resolverlo por WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
