import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Precios siempre en UYU con Intl.NumberFormat (convención del proyecto).
const formatterUYU = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

export function formatPrecio(n: number): string {
  return formatterUYU.format(n);
}

// Alt text SEO para imágenes de producto:
// "[nombre] — [material] — Mueblería Fondar"
export function productoAlt(nombre: string, tipoDeMadera: string): string {
  return `${nombre} en madera de ${tipoDeMadera.toLowerCase()} — Mueblería Fondar`;
}
