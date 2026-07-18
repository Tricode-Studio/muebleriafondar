import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";
import type { ContactoConfig, IdentidadConfig } from "@/types";

interface FooterProps {
  contacto: ContactoConfig;
  identidad: IdentidadConfig;
}

export function Footer({ contacto, identidad }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {/* Marca */}
        <div>
          <p className="font-heading text-xl font-semibold">
            {identidad.nombreMarca}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {identidad.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Muebles artesanales de madera maciza desde Trinidad, Flores.
            Piezas únicas con envíos a todo Uruguay.
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Enlaces del sitio">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Navegación
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/productos" className="hover:text-madera hover:underline">
                Catálogo de muebles de madera maciza
              </Link>
            </li>
            <li>
              <Link href="/a-medida" className="hover:text-madera hover:underline">
                Muebles a medida en Uruguay
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-madera hover:underline">
                Nuestra historia
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-madera hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* NAP — consistente con /contacto y el schema LocalBusiness */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-madera" aria-hidden="true" />
              {contacto.ciudad}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-madera" aria-hidden="true" />
              <a href={`tel:${contacto.telefono.replace(/\s/g, "")}`} className="hover:underline">
                {contacto.telefono}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-madera" aria-hidden="true" />
              <a href={`mailto:${contacto.email}`} className="hover:underline break-all">
                {contacto.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <a
              href={contacto.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Mueblería Fondar"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-accent"
            >
              <InstagramIcon />
            </a>
            <a
              href={contacto.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Mueblería Fondar"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-accent"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {identidad.nombreMarca} — Trinidad,
            Flores, Uruguay. Envíos a todo el país.
          </p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.tricode.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-madera hover:underline"
            >
              Tricode.Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
