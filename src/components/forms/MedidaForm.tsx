"use client";

// Formulario de muebles a medida — react-hook-form + Zod.
// Al enviar ejecuta DOS acciones en paralelo:
//   1. Abre WhatsApp con el mensaje pre-construido (visible para el usuario).
//   2. POST a /api/presupuestos → registro en CMS (transparente, fallo silencioso).

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const tiposMueble = [
  "Mesa",
  "Silla",
  "Ropero",
  "Estante",
  "Cama",
  "Mesa de luz",
  "Escritorio",
  "Otro",
] as const;

const tiposMadera = [
  "Eucaliptus",
  "Pino",
  "Guatambú",
  "Madera reciclada",
  "No sé / me asesorás",
] as const;

const medidaSchema = z.object({
  nombre: z.string().min(2, "Contanos tu nombre completo"),
  email: z.string().email("Ingresá un email válido"),
  telefono: z.string().optional(),
  tipoMueble: z.string().min(1, "Elegí un tipo de mueble"),
  tipoDeMadera: z.string().min(1, "Elegí un tipo de madera"),
  medidasAproximadas: z.string().optional(),
  servicioArmado: z.enum(["Si", "No", "No sé"], {
    message: "Contanos si necesitás armado",
  }),
  descripcion: z
    .string()
    .min(10, "Contanos un poco más sobre el mueble que imaginás"),
  website: z.string().optional(), // honeypot — los humanos no lo ven
});

type MedidaFormValues = z.infer<typeof medidaSchema>;

interface MedidaFormProps {
  productoReferencia?: { slug: string; nombre: string };
}

export function MedidaForm({ productoReferencia }: MedidaFormProps) {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MedidaFormValues>({
    resolver: zodResolver(medidaSchema),
    defaultValues: { servicioArmado: undefined },
  });

  const onSubmit = async (values: MedidaFormValues) => {
    if (values.website) return; // honeypot activado: no hacer nada

    const payload = {
      nombre: values.nombre,
      email: values.email,
      telefono: values.telefono || undefined,
      tipoMueble: values.tipoMueble,
      tipoDeMadera: values.tipoDeMadera,
      medidasAproximadas: values.medidasAproximadas || undefined,
      servicioArmado: values.servicioArmado,
      descripcion: values.descripcion,
      productoReferencia,
    };

    // 1. WhatsApp — sincrónico dentro del gesto del usuario para que el
    //    navegador no bloquee la ventana emergente.
    window.open(buildWhatsAppUrl(payload), "_blank", "noopener,noreferrer");
    trackEvent("whatsapp_click", { origen: "a-medida" });

    // 2. Registro en CMS — transparente; si falla, el flujo no se interrumpe.
    try {
      await fetch("/api/presupuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fallo silencioso por diseño.
    }

    trackEvent("presupuesto_enviado", { tipo_mueble: values.tipoMueble });
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div
        role="status"
        className="rounded-lg border border-musgo/30 bg-card p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-12 text-musgo" aria-hidden="true" />
        <h3 className="mt-4 text-2xl">¡Consulta enviada!</h3>
        <p className="mt-2 text-muted-foreground">
          Se abrió WhatsApp con tu consulta. Si no se abrió, revisá que tu
          navegador no haya bloqueado la ventana emergente. Te respondemos a la
          brevedad con tu presupuesto sin cargo.
        </p>
        <Button
          variant="outline"
          className="mt-6 min-h-11"
          onClick={() => setEnviado(false)}
        >
          Enviar otra consulta
        </Button>
      </div>
    );
  }

  const errorClase = "text-sm text-destructive";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-lg border border-border bg-card p-6 sm:p-8"
    >
      {productoReferencia && (
        <p className="rounded-md bg-secondary px-4 py-3 text-sm">
          Consultando por una pieza similar a:{" "}
          <strong>{productoReferencia.nombre}</strong>
        </p>
      )}

      {/* Honeypot anti-spam: oculto para humanos, visible para bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo *</Label>
          <Input
            id="nombre"
            autoComplete="name"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            {...register("nombre")}
          />
          {errors.nombre && (
            <p id="nombre-error" className={errorClase}>
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorClase}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono (opcional)</Label>
        <Input
          id="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="ej: 099 123 456"
          {...register("telefono")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tipoMueble">Tipo de mueble *</Label>
          <Controller
            name="tipoMueble"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="tipoMueble"
                  className="w-full min-h-11"
                  aria-invalid={Boolean(errors.tipoMueble)}
                  aria-describedby={
                    errors.tipoMueble ? "tipoMueble-error" : undefined
                  }
                >
                  <SelectValue placeholder="Elegí una opción" />
                </SelectTrigger>
                <SelectContent>
                  {tiposMueble.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tipoMueble && (
            <p id="tipoMueble-error" className={errorClase}>
              {errors.tipoMueble.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoDeMadera">Tipo de madera *</Label>
          <Controller
            name="tipoDeMadera"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="tipoDeMadera"
                  className="w-full min-h-11"
                  aria-invalid={Boolean(errors.tipoDeMadera)}
                  aria-describedby={
                    errors.tipoDeMadera ? "tipoDeMadera-error" : undefined
                  }
                >
                  <SelectValue placeholder="Elegí una opción" />
                </SelectTrigger>
                <SelectContent>
                  {tiposMadera.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tipoDeMadera && (
            <p id="tipoDeMadera-error" className={errorClase}>
              {errors.tipoDeMadera.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medidasAproximadas">Medidas aproximadas (opcional)</Label>
        <Input
          id="medidasAproximadas"
          placeholder="ej: 150cm de ancho, 80cm de alto"
          {...register("medidasAproximadas")}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          ¿Necesitás servicio de armado? *
        </legend>
        <Controller
          name="servicioArmado"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-5"
              aria-describedby={
                errors.servicioArmado ? "servicioArmado-error" : undefined
              }
            >
              {(["Si", "No", "No sé"] as const).map((opcion) => (
                <div key={opcion} className="flex items-center gap-2">
                  <RadioGroupItem value={opcion} id={`armado-${opcion}`} />
                  <Label htmlFor={`armado-${opcion}`} className="font-normal">
                    {opcion === "Si" ? "Sí" : opcion}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.servicioArmado && (
          <p id="servicioArmado-error" className={errorClase}>
            {errors.servicioArmado.message}
          </p>
        )}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Referencia visual o descripción *</Label>
        <Textarea
          id="descripcion"
          rows={5}
          placeholder="Contanos cómo es el mueble que imaginás: estilo, uso, espacio donde va..."
          aria-invalid={Boolean(errors.descripcion)}
          aria-describedby={errors.descripcion ? "descripcion-error" : undefined}
          {...register("descripcion")}
        />
        {errors.descripcion && (
          <p id="descripcion-error" className={errorClase}>
            {errors.descripcion.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="min-h-12 w-full bg-madera text-base hover:bg-madera/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Enviando consulta...
          </>
        ) : (
          "Pedir presupuesto por WhatsApp"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Al enviar se abre WhatsApp con tu consulta pre-armada. Presupuesto sin
        cargo y sin compromiso.
      </p>
    </form>
  );
}
