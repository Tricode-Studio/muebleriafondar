// data/testimonios.ts — Testimonios de clientes (MVP)
// Fase 2: ContentType slug "testimonios", módulo MARKETING en Tricode CMS.

import type { Testimonio } from "@/types";

export const testimonios: Testimonio[] = [
  {
    id: "test-001",
    nombre: "María González",
    texto:
      "La mesa de comedor superó lo que esperaba. Se nota la madera de verdad apenas la tocás: el peso, la veta, todo. Llegó perfecta a Montevideo y el armado fue muy simple.",
    ciudad: "Montevideo",
    productoReferencia: "mesa-comedor-eucaliptus-6-personas",
    orden: 1,
  },
  {
    id: "test-002",
    nombre: "Carlos Méndez",
    texto:
      "Les pedí un escritorio a medida porque necesitaba medidas muy puntuales para un espacio chico. Me asesoraron con la madera, me mandaron fotos del avance y quedó exactamente como lo imaginé.",
    ciudad: "Trinidad",
    orden: 2,
  },
  {
    id: "test-003",
    nombre: "Lucía Ferreira",
    texto:
      "Compré la estantería de madera reciclada y es la protagonista del living. Cada tabla es distinta, tiene una historia. No existe otra igual y eso no tiene precio.",
    ciudad: "Durazno",
    productoReferencia: "estanteria-madera-reciclada-cinco-estantes",
    orden: 3,
  },
  {
    id: "test-004",
    nombre: "Federico Silva",
    texto:
      "Atención de primera. Consulté por WhatsApp un sábado y me respondieron al toque. El banco de jardín aguantó todo el invierno afuera y está impecable.",
    ciudad: "Flores",
    productoReferencia: "banco-jardin-eucaliptus-tratado",
    orden: 4,
  },
];
