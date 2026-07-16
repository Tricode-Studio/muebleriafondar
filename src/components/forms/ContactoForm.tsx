"use client";

// Formulario de consulta general — redirige a WhatsApp con el mensaje armado.

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buildContactoWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactoSchema = z.object({
  nombre: z.string().min(2, "Contanos tu nombre"),
  email: z.string().email("Ingresá un email válido"),
  mensaje: z.string().min(10, "Contanos en qué te podemos ayudar"),
  website: z.string().optional(), // honeypot
});

type ContactoFormValues = z.infer<typeof contactoSchema>;

export function ContactoForm() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactoFormValues>({ resolver: zodResolver(contactoSchema) });

  const onSubmit = (values: ContactoFormValues) => {
    if (values.website) return;
    window.open(
      buildContactoWhatsAppUrl(values),
      "_blank",
      "noopener,noreferrer",
    );
    trackEvent("whatsapp_click", { origen: "contacto" });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div
        role="status"
        className="rounded-lg border border-musgo/30 bg-card p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-10 text-musgo" aria-hidden="true" />
        <h3 className="mt-3 text-xl">¡Mensaje listo!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Se abrió WhatsApp con tu consulta. Te respondemos a la brevedad.
        </p>
        <Button
          variant="outline"
          className="mt-5 min-h-11"
          onClick={() => setEnviado(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-lg border border-border bg-card p-6 sm:p-8"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contacto-website">No completar este campo</label>
        <input
          id="contacto-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contacto-nombre">Nombre *</Label>
        <Input
          id="contacto-nombre"
          autoComplete="name"
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? "contacto-nombre-error" : undefined}
          {...register("nombre")}
        />
        {errors.nombre && (
          <p id="contacto-nombre-error" className="text-sm text-destructive">
            {errors.nombre.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contacto-email">Email *</Label>
        <Input
          id="contacto-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contacto-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="contacto-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contacto-mensaje">Mensaje *</Label>
        <Textarea
          id="contacto-mensaje"
          rows={5}
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? "contacto-mensaje-error" : undefined}
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p id="contacto-mensaje-error" className="text-sm text-destructive">
            {errors.mensaje.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full bg-madera hover:bg-madera/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Abriendo WhatsApp...
          </>
        ) : (
          "Enviar por WhatsApp"
        )}
      </Button>
    </form>
  );
}
