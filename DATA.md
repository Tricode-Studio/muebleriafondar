# DATA.md — Modelo de datos · Mueblería Fondar

> Este documento es la especificación de contenido del sitio. Es la fuente de
> verdad para implementar los archivos en `/data/` y para provisionar el tenant
> real en Tricode CMS cuando llegue el momento — sin renombrar nada.

---

## Singletons (settings del tenant)

Contenido único del sitio. No son colecciones — son un objeto de configuración.
En el CMS real van como `settings` del tenant, no como `ContentType`.

### `hero`
Contenido del hero del home.

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | TEXT | Ej: "Muebles únicos, hechos para durar" |
| `subtitulo` | TEXT | Ej: "Artesanía en madera maciza desde Trinidad, Uruguay" |
| `imagenFondo` | TEXT (URL) | Imagen de ambiente para el fondo del hero |
| `ctaPrimarioTexto` | TEXT | Ej: "Ver catálogo" |
| `ctaSecundarioTexto` | TEXT | Ej: "Muebles a medida" |

### `identidad`
Datos de marca del sitio.

| Campo | Tipo | Descripción |
|---|---|---|
| `nombreMarca` | TEXT | "Mueblería Fondar" |
| `tagline` | TEXT | "Estilo & Calidad Natural" |
| `logoUrl` | TEXT (URL) | URL pública del logo |
| `colorPrimario` | TEXT | Hex del color principal (#6B4226) |
| `colorAcento` | TEXT | Hex del color de acento (#3A4A2E) |

### `contacto`
Datos de contacto del negocio.

| Campo | Tipo | Descripción |
|---|---|---|
| `telefono` | TEXT | "+598 91 009 547" |
| `telefonoWhatsapp` | TEXT | "+59891035868" (formato internacional, sin espacios) |
| `email` | TEXT | "guillermodeoliveira76@gmail.com" |
| `direccion` | TEXT | Dirección física en Trinidad |
| `ciudad` | TEXT | "Trinidad, Flores, Uruguay" |
| `horarios` | LONG_TEXT | Horarios de atención |
| `instagram` | TEXT (URL) | "https://www.instagram.com/muebleria.fondar/" |
| `facebook` | TEXT (URL) | "https://www.facebook.com/p/Muebleria-Fondar-100057589143316/" |

### `seoGlobal`
Metadatos globales del sitio.

| Campo | Tipo | Descripción |
|---|---|---|
| `metaTitle` | TEXT | "Mueblería Fondar \| Muebles de Madera Maciza en Trinidad, Uruguay" |
| `metaDescription` | TEXT | Descripción global del sitio para SEO |
| `ogImage` | TEXT (URL) | Imagen Open Graph por defecto |

---

## Colecciones (Content Types)

### Productos
**Slug CMS:** `productos` | **Módulo:** `CATALOG`

Cada entrada representa un mueble individual. Dado que son piezas únicas,
cada entrada es irrepetible. El campo `estado` controla la disponibilidad
para compra sin ocultar la pieza del catálogo.

| Campo | Tipo CMS | TypeScript | Descripción |
|---|---|---|---|
| `id` | TEXT | `string` | ID único estable. Nunca el índice del array. |
| `slug` | TEXT | `string` | URL-safe, kebab-case. Estable — nunca cambiar post-publicación. |
| `nombre` | TEXT | `string` | Nombre descriptivo de la pieza. |
| `descripcion` | LONG_TEXT | `string` | Descripción artesanal con material y detalles. |
| `categoria` | TEXT | `CategoriaProducto` | Ver enum. |
| `tipoDeMadera` | TEXT | `TipoDeMadera` | Ver enum. |
| `precio` | NUMBER | `number` | En pesos uruguayos (UYU). |
| `imagenes` | JSON | `string[]` | Array de URLs públicas. Primera = imagen principal. |
| `estado` | TEXT | `EstadoProducto` | `"DISPONIBLE"` \| `"VENDIDO"` |
| `dimensiones` | TEXT | `string` | Ej: "Largo 120cm × Ancho 80cm × Alto 75cm" |
| `destacado` | BOOLEAN | `boolean` | Aparece en la grilla del home si es `true`. |
| `notas` | LONG_TEXT | `string \| undefined` | Detalles de terminación, tratamiento de madera. Opcional. |

**Nota sobre imágenes:** el campo `imagenes` es `JSON` con un array de URLs
`TEXT`. No usar `MEDIA` (ID de archivo) — con URLs el admin puede pegar
imágenes directamente desde el storage del tenant sin pasos adicionales.

**Status del CMS:** solo las entries con `status: "PUBLISHED"` salen por
la API pública. Las entries en `DRAFT` o `ARCHIVED` son invisibles al frontend.

**Enums:**
```typescript
type CategoriaProducto =
  | "Living" | "Comedor" | "Dormitorio"
  | "Jardín" | "Decoración" | "Oficina"

type TipoDeMadera =
  | "Eucaliptus" | "Pino" | "Guatambú" | "Lapacho" | "Reciclada"

type EstadoProducto = "DISPONIBLE" | "VENDIDO"
```

---

### Categorías
**Slug CMS:** `categorias` | **Módulo:** `CATALOG`

Categorías de navegación del catálogo. Se usan en los filtros y en la
organización visual del catálogo.

| Campo | Tipo CMS | TypeScript | Descripción |
|---|---|---|---|
| `id` | TEXT | `string` | ID único estable. |
| `slug` | TEXT | `string` | Kebab-case. Ej: `living`, `comedor`. |
| `nombre` | TEXT | `string` | Ej: "Living", "Comedor". |
| `descripcion` | TEXT | `string` | Breve descripción para SEO y UI. |
| `imagenPortada` | TEXT (URL) | `string` | Imagen representativa de la categoría. |
| `orden` | NUMBER | `number` | Orden de aparición en filtros y navegación. |

---

### Testimonios
**Slug CMS:** `testimonios` | **Módulo:** `MARKETING`

Testimonios de clientes. Se muestran en el home y pueden relacionarse con
un producto específico.

| Campo | Tipo CMS | TypeScript | Descripción |
|---|---|---|---|
| `id` | TEXT | `string` | ID único estable. |
| `nombre` | TEXT | `string` | Nombre del cliente. |
| `texto` | LONG_TEXT | `string` | El testimonio completo. |
| `ciudad` | TEXT | `string` | Ciudad del cliente. Ej: "Montevideo", "Trinidad". |
| `productoReferencia` | TEXT | `string \| undefined` | Slug del producto comprado. Opcional. |
| `orden` | NUMBER | `number` | Orden de aparición. |

---

## Presupuestos (endpoint de entrada — no es colección editable)

No es un `ContentType` del CMS — es un endpoint de recepción de datos operativos.
El frontend envía el formulario de muebles a medida a este endpoint.
En el panel Tricode aparecerá como bandeja de entrada en fase 2.

**Endpoint:** `POST /api/v1/public/:tenantSlug/presupuestos`

**Payload enviado:**

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | `string` | Nombre completo del solicitante. |
| `email` | `string` | Email de contacto. |
| `telefono` | `string \| undefined` | Teléfono opcional. |
| `tipoMueble` | `string` | Valor del SELECT del formulario. |
| `tipoDeMadera` | `string` | Valor del SELECT del formulario. |
| `medidasAproximadas` | `string \| undefined` | Campo libre, opcional. |
| `servicioArmado` | `"Si" \| "No" \| "No sé"` | Respuesta del radio button. |
| `descripcion` | `string` | Descripción libre del mueble deseado. |
| `productoReferencia` | `{ slug: string; nombre: string } \| undefined` | Producto de referencia si viene desde un VENDIDO. |
| `origen` | `"web-a-medida"` | Literal — identifica la fuente en el panel Tricode. |
| `fechaEnvio` | `string` | ISO 8601, generado en el servidor (`/api/presupuestos`). |

---

## Distribución de datos

| Componente / Vista | Datos consumidos |
|---|---|
| Home — Hero | singleton `hero` |
| Home — Productos destacados | colección `productos` filtrada por `destacado: true` |
| Home — Testimonios | colección `testimonios` ordenada por `orden` |
| Home — Banner CTA | singleton `hero` (ctaSecundarioTexto) |
| Catálogo `/productos` | colección `productos` + colección `categorias` |
| Detalle `/productos/[slug]` | un item de `productos` por slug + `productos` relacionados |
| Formulario `/a-medida` | singleton `contacto` (telefonoWhatsapp) |
| Carrito `/carrito` | Zustand store (en memoria/localStorage, no CMS) |
| Nosotros `/nosotros` | singleton `contacto` + contenido estático |
| Contacto `/contacto` | singleton `contacto` |
| Navbar | singleton `identidad` (logo, nombre) |
| Footer | singleton `contacto` + singleton `identidad` |
| Schema LocalBusiness | singleton `contacto` + singleton `identidad` |
| Schema Product | item de `productos` (en detalle de producto) |
| SEO global | singleton `seoGlobal` |

---

## Mapeo directo a Tricode CMS

Al provisionar el tenant real, crear exactamente lo siguiente — sin renombrar
campos ni slugs. Este documento es el spec; el CMS lo implementa tal cual.

| Este DATA.md | ContentType en CMS | Módulo CMS |
|---|---|---|
| Colección `productos` | ContentType slug: `productos` | `CATALOG` |
| Colección `categorias` | ContentType slug: `categorias` | `CATALOG` |
| Colección `testimonios` | ContentType slug: `testimonios` | `MARKETING` |
| Singleton `hero` | Setting key: `hero` del tenant | — |
| Singleton `identidad` | Setting key: `identidad` del tenant | — |
| Singleton `contacto` | Setting key: `contacto` del tenant | — |
| Singleton `seoGlobal` | Setting key: `seo-global` del tenant | — |
| Endpoint presupuestos | `POST /presupuestos` (ya existe en el CMS) | — |

Los `key` de `ContentField` en el CMS = los nombres de campo de este documento
(camelCase). Sin conversión, sin renombrado.

---

## Esquema tipado — TypeScript completo

```typescript
// types/index.ts

// ─── Enums ───────────────────────────────────────────────────────────────────

export type EstadoProducto = "DISPONIBLE" | "VENDIDO"

export type CategoriaProducto =
  | "Living"
  | "Comedor"
  | "Dormitorio"
  | "Jardín"
  | "Decoración"
  | "Oficina"

export type TipoDeMadera =
  | "Eucaliptus"
  | "Pino"
  | "Guatambú"
  | "Lapacho"
  | "Reciclada"

// ─── Colecciones ─────────────────────────────────────────────────────────────

export interface Producto {
  id: string
  slug: string
  nombre: string
  descripcion: string
  categoria: CategoriaProducto
  tipoDeMadera: TipoDeMadera
  precio: number                 // UYU
  imagenes: string[]             // URLs públicas — primera = principal
  estado: EstadoProducto
  dimensiones: string
  destacado: boolean
  notas?: string
}

export interface Categoria {
  id: string
  slug: string
  nombre: string
  descripcion: string
  imagenPortada: string          // URL pública
  orden: number
}

export interface Testimonio {
  id: string
  nombre: string
  texto: string
  ciudad: string
  productoReferencia?: string    // slug del producto
  orden: number
}

// ─── Singletons ──────────────────────────────────────────────────────────────

export interface HeroConfig {
  titulo: string
  subtitulo: string
  imagenFondo: string            // URL pública
  ctaPrimarioTexto: string
  ctaSecundarioTexto: string
}

export interface IdentidadConfig {
  nombreMarca: string
  tagline: string
  logoUrl: string                // URL pública
  colorPrimario: string          // hex
  colorAcento: string            // hex
}

export interface ContactoConfig {
  telefono: string
  telefonoWhatsapp: string       // formato +598... sin espacios
  email: string
  direccion: string
  ciudad: string
  horarios: string
  instagram: string              // URL
  facebook: string               // URL
}

export interface SeoConfig {
  metaTitle: string
  metaDescription: string
  ogImage: string                // URL pública
}

export interface SiteConfig {
  hero: HeroConfig
  identidad: IdentidadConfig
  contacto: ContactoConfig
  seo: SeoConfig
}

// ─── Carrito ─────────────────────────────────────────────────────────────────

export interface CartItem {
  producto: Producto
  // cantidad siempre = 1: son piezas únicas
}

// ─── Formulario de presupuesto ────────────────────────────────────────────────

export interface PresupuestoPayload {
  nombre: string
  email: string
  telefono?: string
  tipoMueble: string
  tipoDeMadera: string
  medidasAproximadas?: string
  servicioArmado: "Si" | "No" | "No sé"
  descripcion: string
  productoReferencia?: {
    slug: string
    nombre: string
  }
  origen: "web-a-medida"
  fechaEnvio: string             // ISO 8601, generado en servidor
}

// ─── Filtros ─────────────────────────────────────────────────────────────────

export interface FiltrosProducto {
  categoria?: CategoriaProducto
  tipoDeMadera?: TipoDeMadera
  soloDisponibles?: boolean
}
```
