// /contacto — NAP completo + formulario de consulta general → WhatsApp.
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { getSiteConfig } from "@/lib/cms";
import { ContactoForm } from "@/components/forms/ContactoForm";

export const metadata: Metadata = {
  title: { absolute: "Contacto | Mueblería Fondar — Trinidad, Flores, Uruguay" },
  description:
    "Contactate con Mueblería Fondar. Estamos en Trinidad, Flores, Uruguay. Hacemos envíos a todo el país.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
  const { contacto } = await getSiteConfig();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl sm:text-4xl">Contacto</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Escribinos por el medio que te quede más cómodo. Respondemos rápido y
        hacemos envíos a todo Uruguay.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Datos de contacto — NAP consistente con footer y schema */}
        <section aria-labelledby="datos-contacto">
          <h2 id="datos-contacto" className="text-2xl">
            Mueblería Fondar
          </h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-madera" aria-hidden="true" />
              <div>
                <p className="font-semibold">Dirección</p>
                <p className="text-muted-foreground">{contacto.ciudad}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-madera" aria-hidden="true" />
              <div>
                <p className="font-semibold">Teléfono</p>
                <a
                  href={`tel:${contacto.telefono.replace(/\s/g, "")}`}
                  className="text-muted-foreground hover:text-madera hover:underline"
                >
                  {contacto.telefono}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-madera" aria-hidden="true" />
              <div>
                <p className="font-semibold">Email</p>
                <a
                  href={`mailto:${contacto.email}`}
                  className="break-all text-muted-foreground hover:text-madera hover:underline"
                >
                  {contacto.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-madera" aria-hidden="true" />
              <div>
                <p className="font-semibold">Horarios</p>
                <p className="text-muted-foreground">{contacto.horarios}</p>
              </div>
            </li>
          </ul>

          <h3 className="mt-8 text-lg">Seguinos en redes</h3>
          <div className="mt-3 flex gap-3">
            <a
              href={contacto.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm hover:border-madera"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
            <a
              href={contacto.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm hover:border-madera"
            >
              <FacebookIcon className="size-4" />
              Facebook
            </a>
          </div>
        </section>

        {/* Formulario general */}
        <section aria-labelledby="form-contacto">
          <h2 id="form-contacto" className="text-2xl">
            Envianos tu consulta
          </h2>
          <div className="mt-6">
            <ContactoForm />
          </div>
        </section>
      </div>
    </div>
  );
}
