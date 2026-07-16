// types/index.ts — Tipos del dominio · Mueblería Fondar
// Espejo exacto del modelo de datos definido en DATA.md.
// Los nombres de campo coinciden 1:1 con los ContentField del Tricode CMS.

// ─── Enums ───────────────────────────────────────────────────────────────────

export type EstadoProducto = "DISPONIBLE" | "VENDIDO";

export type CategoriaProducto =
  | "Living"
  | "Comedor"
  | "Dormitorio"
  | "Jardín"
  | "Decoración"
  | "Oficina";

export type TipoDeMadera =
  | "Eucaliptus"
  | "Pino"
  | "Guatambú"
  | "Lapacho"
  | "Reciclada";

// ─── Colecciones ─────────────────────────────────────────────────────────────

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaProducto;
  tipoDeMadera: TipoDeMadera;
  precio: number; // UYU
  imagenes: string[]; // URLs públicas — primera = principal
  estado: EstadoProducto;
  dimensiones: string;
  destacado: boolean;
  notas?: string;
}

export interface Categoria {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagenPortada: string; // URL pública
  orden: number;
}

export interface Testimonio {
  id: string;
  nombre: string;
  texto: string;
  ciudad: string;
  productoReferencia?: string; // slug del producto
  orden: number;
}

// ─── Singletons ──────────────────────────────────────────────────────────────

export interface HeroConfig {
  titulo: string;
  subtitulo: string;
  imagenFondo: string; // URL pública
  ctaPrimarioTexto: string;
  ctaSecundarioTexto: string;
}

export interface IdentidadConfig {
  nombreMarca: string;
  tagline: string;
  logoUrl: string; // URL pública
  colorPrimario: string; // hex
  colorAcento: string; // hex
}

export interface ContactoConfig {
  telefono: string;
  telefonoWhatsapp: string; // formato +598... sin espacios
  email: string;
  direccion: string;
  ciudad: string;
  horarios: string;
  instagram: string; // URL
  facebook: string; // URL
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  ogImage: string; // URL pública
}

export interface SiteConfig {
  hero: HeroConfig;
  identidad: IdentidadConfig;
  contacto: ContactoConfig;
  seo: SeoConfig;
}

// ─── Carrito ─────────────────────────────────────────────────────────────────

export interface CartItem {
  producto: Producto;
  // cantidad siempre = 1: son piezas únicas
}

// ─── Formulario de presupuesto ────────────────────────────────────────────────

export interface PresupuestoPayload {
  nombre: string;
  email: string;
  telefono?: string;
  tipoMueble: string;
  tipoDeMadera: string;
  medidasAproximadas?: string;
  servicioArmado: "Si" | "No" | "No sé";
  descripcion: string;
  productoReferencia?: {
    slug: string;
    nombre: string;
  };
  origen: "web-a-medida";
  fechaEnvio: string; // ISO 8601, generado en servidor
}

// ─── Filtros ─────────────────────────────────────────────────────────────────

export interface FiltrosProducto {
  categoria?: CategoriaProducto;
  tipoDeMadera?: TipoDeMadera;
  soloDisponibles?: boolean;
}
