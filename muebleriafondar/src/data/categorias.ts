// data/categorias.ts — Categorías del catálogo (MVP)
// Fase 2: ContentType slug "categorias", módulo CATALOG en Tricode CMS.

import type { Categoria } from "@/types";

export const categorias: Categoria[] = [
  {
    id: "cat-001",
    slug: "living",
    nombre: "Living",
    descripcion:
      "Mesas ratonas, estanterías y muebles de living en madera maciza.",
    imagenPortada:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    orden: 1,
  },
  {
    id: "cat-002",
    slug: "comedor",
    nombre: "Comedor",
    descripcion: "Mesas y sillas de comedor artesanales, hechas para durar.",
    imagenPortada:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=80",
    orden: 2,
  },
  {
    id: "cat-003",
    slug: "dormitorio",
    nombre: "Dormitorio",
    descripcion: "Camas, roperos y mesas de luz en madera maciza.",
    imagenPortada:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    orden: 3,
  },
  {
    id: "cat-004",
    slug: "jardin",
    nombre: "Jardín",
    descripcion: "Muebles de exterior tratados para la intemperie.",
    imagenPortada:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    orden: 4,
  },
  {
    id: "cat-005",
    slug: "decoracion",
    nombre: "Decoración",
    descripcion: "Piezas únicas de decoración con historia propia.",
    imagenPortada:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80",
    orden: 5,
  },
  {
    id: "cat-006",
    slug: "oficina",
    nombre: "Oficina",
    descripcion: "Escritorios y muebles de trabajo en madera noble.",
    imagenPortada:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
    orden: 6,
  },
];
