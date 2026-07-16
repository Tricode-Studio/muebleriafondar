// data/config.ts — Singletons del sitio (MVP)
// Fase 2: estos objetos viven como settings del tenant en Tricode CMS
// (keys: "hero", "identidad", "contacto", "seo-global").

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  hero: {
    titulo: "Muebles de madera maciza, hechos para durar",
    subtitulo:
      "Artesanía en madera maciza desde Trinidad, Flores. Piezas únicas y muebles a medida con envíos a todo Uruguay.",
    imagenFondo:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    ctaPrimarioTexto: "Ver catálogo",
    ctaSecundarioTexto: "Muebles a medida",
  },
  identidad: {
    nombreMarca: "Mueblería Fondar",
    tagline: "Estilo & Calidad Natural",
    logoUrl: "/logo.jpg",
    colorPrimario: "#6B4226",
    colorAcento: "#3A4A2E",
  },
  contacto: {
    telefono: "+598 91 009 547",
    telefonoWhatsapp: "+59891035868",
    email: "guillermodeoliveira76@gmail.com",
    direccion: "Trinidad, departamento de Flores",
    ciudad: "Trinidad, Flores, Uruguay",
    horarios: "Lunes a viernes de 9 a 18 h · Sábados de 9 a 13 h",
    instagram: "https://www.instagram.com/muebleria.fondar/",
    facebook: "https://www.facebook.com/p/Muebleria-Fondar-100057589143316/",
  },
  seo: {
    metaTitle:
      "Mueblería Fondar | Muebles de Madera Maciza en Trinidad, Uruguay",
    metaDescription:
      "Mueblería artesanal en Trinidad, Flores. Muebles únicos de madera maciza, diseños a medida y envíos a todo Uruguay. Cada pieza es irrepetible.",
    ogImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
  },
};
