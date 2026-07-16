# PROMPT.md — Mueblería Fondar · E-Commerce

Actuá como un desarrollador Next.js 15 senior con experiencia en e-commerce,
diseño de UI y arquitectura de datos para CMS. Tu tarea es construir el sitio
web completo de Mueblería Fondar, una mueblería uruguaya especializada en muebles
de madera maciza ubicada en Trinidad, departamento de Flores. El sitio es un
e-commerce con catálogo de piezas únicas + sección de muebles a medida.

---

## NEGOCIO Y OBJETIVO

Mueblería Fondar fabrica y vende muebles artesanales de madera maciza. Cada pieza
es única: cuando se vende, el producto NO se elimina ni se oculta del catálogo —
se marca como "VENDIDO" y aparece con un CTA "¿Te gustó? Pedí uno similar" que
deriva al formulario de muebles a medida. Este mecanismo es central al modelo de
negocio: los productos vendidos siguen siendo escaparate e impulsan pedidos
personalizados.

Objetivos del sitio:
1. Automatizar ventas online del catálogo disponible (producto → carrito → pago).
2. Capturar consultas de muebles a medida (formulario → WhatsApp + registro en CMS).
3. Posicionar la marca en Trinidad/Flores y en búsquedas de madera maciza Uruguay.

Tagline: "Estilo & Calidad Natural"
Teléfono WhatsApp (definitivo): +59891035868

---

## STACK

- Framework: Next.js 15 (App Router)
- Estilos: Tailwind CSS 4
- Componentes UI: shadcn/ui
- Estado del carrito: Zustand 5 (persistido en localStorage)
- Validación de formularios: react-hook-form + Zod
- Pasarela de pagos: MercadoPago Checkout Pro (Uruguay)
- Fuentes: Playfair Display (headings) + Inter (cuerpo) vía next/font
- Fuente de datos: módulo único `lib/cms.ts` con datos locales en MVP,
  preparado para conectar al CMS real sin reescribir componentes

Variables de entorno (declarar desde el día uno aunque estén vacías):
```
NEXT_PUBLIC_TRICODE_API_BASE_URL=
NEXT_PUBLIC_TRICODE_TENANT_SLUG=
NEXT_PUBLIC_MP_PUBLIC_KEY=
MP_ACCESS_TOKEN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## MODELO DE DATOS

Todo el contenido proviene del módulo `lib/cms.ts`. Los componentes NUNCA
hardcodean contenido: siempre consumen este módulo. Está diseñado para que
cuando se conecte el CMS real, el cambio sea interno al módulo, no una
reescritura de componentes.

### Singletons (settings del tenant)

**hero**
- `titulo`: string
- `subtitulo`: string
- `imagenFondo`: string (URL pública)
- `ctaPrimarioTexto`: string
- `ctaSecundarioTexto`: string

**identidad**
- `nombreMarca`: string
- `tagline`: string
- `logoUrl`: string (URL pública)
- `colorPrimario`: string (hex)
- `colorAcento`: string (hex)

**contacto**
- `telefono`: string
- `telefonoWhatsapp`: string (formato +598...)
- `email`: string
- `direccion`: string
- `ciudad`: string
- `horarios`: string
- `instagram`: string (URL)
- `facebook`: string (URL)

**seoGlobal**
- `metaTitle`: string
- `metaDescription`: string
- `ogImage`: string (URL pública)

### Colección: Productos
Slug CMS: `productos` | Módulo: `CATALOG`

Cada mueble es una pieza irrepetible. Campos:
- `id`: string — identificador único estable (nunca el índice del array)
- `slug`: string — kebab-case, para URL `/productos/[slug]`
- `nombre`: string
- `descripcion`: string (LONG_TEXT)
- `categoria`: "Living" | "Comedor" | "Dormitorio" | "Jardín" | "Decoración" | "Oficina"
- `tipoDeMadera`: "Eucaliptus" | "Pino" | "Guatambú" | "Lapacho" | "Reciclada"
- `precio`: number (pesos uruguayos, UYU)
- `imagenes`: string[] (URLs públicas — primera imagen es la principal)
- `estado`: "DISPONIBLE" | "VENDIDO"
- `dimensiones`: string (ej: "Largo 120cm × Ancho 80cm × Alto 75cm")
- `destacado`: boolean (aparece en grilla del home)
- `notas?`: string (detalles de terminación, tratamiento de madera)

### Colección: Categorías
Slug CMS: `categorias` | Módulo: `CATALOG`
- `id`: string
- `slug`: string
- `nombre`: string
- `descripcion`: string
- `imagenPortada`: string (URL pública)
- `orden`: number

### Colección: Testimonios
Slug CMS: `testimonios` | Módulo: `MARKETING`
- `id`: string
- `nombre`: string
- `texto`: string (LONG_TEXT)
- `ciudad`: string
- `productoReferencia?`: string (slug del producto)
- `orden`: number

### Presupuestos (endpoint de entrada — no es colección editable)
Se envían vía `POST /api/v1/public/:tenantSlug/presupuestos`. Payload:
- `nombre`: string
- `email`: string
- `telefono?`: string
- `tipoMueble`: string
- `tipoDeMadera`: string
- `medidasAproximadas?`: string
- `servicioArmado`: "Si" | "No" | "No sé"
- `descripcion`: string
- `productoReferencia?`: { slug: string; nombre: string }
- `origen`: "web-a-medida"
- `fechaEnvio`: string (ISO 8601, generado en servidor)

---

## PÁGINAS Y RUTAS

### `/` — Home
- Hero visual con imagen de ambiente cálido, H1 con keyword primaria y dos CTAs:
  "Ver catálogo" y "Muebles a medida".
- Grilla de productos destacados (máx. 6, incluyendo VENDIDOS con badge).
- Sección "Por qué Fondar": 3 diferenciales — Madera maciza, Piezas únicas,
  Envíos a todo Uruguay.
- Testimonios de clientes (mínimo 3, con ciudad del cliente).
- Banner de llamada a la sección de muebles a medida.

### `/productos` — Catálogo completo
- Filtro por categoría, tipo de madera y estado (sidebar en desktop, drawer en mobile).
- Toggle: "Mostrar todos" / "Solo disponibles".
- Grid responsive de tarjetas de producto (1 col mobile, 2 tablet, 3-4 desktop).
- Productos VENDIDOS se muestran con overlay de badge "VENDIDO" + botón
  "¿Te gustó? Pedí uno similar" que abre `/a-medida` con el slug y nombre del
  producto pre-llenados en el campo oculto `productoReferencia`.
- Productos DISPONIBLES tienen botón "Agregar al carrito".

### `/productos/[slug]` — Detalle de producto
- Galería de imágenes con swipe en mobile (`aspect-ratio: 4/3`).
- Nombre, descripción, tipo de madera, dimensiones, precio formateado en UYU.
- Si estado = DISPONIBLE: botón "Agregar al carrito" prominente.
- Si estado = VENDIDO: badge "VENDIDO" + texto "Esta pieza ya encontró su hogar.
  Pero podemos hacer una igual para vos." + CTA "Quiero uno similar" →
  `/a-medida` con `productoReferencia` pre-llenado.
- Productos relacionados (misma categoría, máx. 3, excluye el actual).
- Schema markup `Product` con `offers` (disponible/agotado), `material`, `brand`.

### `/a-medida` — Muebles personalizados
Introducción: "Diseñamos el mueble que imaginás, con la madera que elegís."

Formulario (react-hook-form + Zod):
- Nombre completo (TEXT, required)
- Email (TEXT, required)
- Teléfono (TEXT, optional)
- Tipo de mueble (SELECT: Mesa, Silla, Ropero, Estante, Cama, Mesa de luz,
  Escritorio, Otro)
- Tipo de madera (SELECT: Eucaliptus, Pino, Guatambú, Madera reciclada,
  No sé / me asesorás)
- Medidas aproximadas (TEXT, optional, placeholder "ej: 150cm de ancho, 80cm de alto")
- ¿Necesitás servicio de armado? (RADIO: Sí / No / No sé)
- Referencia visual o descripción (LONG_TEXT, required)
- Campo oculto `productoReferencia`: { slug, nombre } — se pre-llena cuando
  el usuario llega desde un producto VENDIDO
- Honeypot anti-spam (campo oculto para bots)

Al enviar, el handler ejecuta DOS acciones en paralelo:

1. WHATSAPP (acción visible para el usuario):
   Construir mensaje con todos los campos y abrir:
   `https://wa.me/59891035868?text=...` (URL-encoded)

2. REGISTRO EN CMS (transparente para el usuario):
   POST a la API route interna `/api/presupuestos`, que a su vez llama a
   `POST /api/v1/public/:tenantSlug/presupuestos` con el payload completo.
   Si `NEXT_PUBLIC_TRICODE_TENANT_SLUG` está vacío, la API route falla
   silenciosamente — NO interrumpe el flujo. WhatsApp se abre igual.

En fase 2 estos registros alimentan la bandeja de entrada del panel Tricode
sin migración de datos ni cambios en el formulario.

### `/carrito` — Carrito de compras
- Lista de productos con imagen, nombre, precio formateado, botón eliminar.
- Subtotal visible.
- Nota de envío: "Hacemos envíos a todo el país. El costo se coordina por
  WhatsApp luego de tu compra."
- CTA "Finalizar compra" → llama a `POST /api/checkout` y redirige al checkout MP.
- El carrito solo admite productos DISPONIBLES (cantidad = 1 por ítem, son piezas únicas).
- Al abrir el carrito o iniciar checkout: verificar que ningún producto haya
  pasado a VENDIDO (race condition). Si ocurre: alerta visible y eliminación
  automática del ítem antes de continuar.

### `/nosotros` — Historia y marca
- Historia de la mueblería: artesanía, Trinidad, madera maciza.
- Valores: calidad natural, piezas únicas, atención personalizada.
- Mención de ubicación en Trinidad, Flores y envíos a todo Uruguay.

### `/contacto`
- Datos de contacto completos (teléfono, email, dirección, horarios).
- Formulario de consulta general (Nombre, Email, Mensaje) → redirige a WhatsApp.
- Links a Instagram y Facebook.

### `/pago/exitoso` — Confirmación de pago OK
Mensaje de éxito claro + CTA "Ver más productos" o "Volver al inicio".

### `/pago/pendiente` — Pago en proceso
Explicación de próximos pasos + CTA de contacto si tiene dudas.

### `/pago/fallido` — Error en pago
Mensaje empático + CTA de reintento y/o contacto por WhatsApp.

---

## INTEGRACIÓN CON MERCADOPAGO

- Usar MercadoPago Checkout Pro (redirect o modal).
- El frontend llama a `POST /api/checkout` que crea la preferencia con el SDK
  server-side usando `MP_ACCESS_TOKEN`.
- `MP_ACCESS_TOKEN` NUNCA en el cliente ni en el bundle del frontend.
- Manejar webhooks en `POST /api/webhooks/mp` para actualizar estado de productos.
- Al confirmar pago exitoso: marcar los productos del pedido como VENDIDOS.
- Los productos en el carrito son piezas únicas: cantidad siempre = 1 por ítem.
- Race condition: si un producto pasa a VENDIDO entre que se agrega al carrito y
  se inicia el checkout, mostrar alerta y removerlo antes de procesar el pago.

---

## UI/UX Y DISEÑO

### Paleta de colores
- Fondo principal: blanco hueso (#FAFAF7)
- Acento madera: marrón cálido (#6B4226)
- Acento natural: verde musgo oscuro (#3A4A2E)
- Texto principal: casi negro (#1C1A17)
- Badge VENDIDO: terracota (#B85C38) con texto blanco
- Superficies/cards: blanco puro (#FFFFFF) con sombra sutil

### Tipografía
- Headings: Playfair Display (serif elegante — Google Fonts vía next/font)
- Cuerpo: Inter (sans-serif limpia — Google Fonts vía next/font)
- Contraste mínimo WCAG AA (4.5:1) verificado en todos los textos

### Componentes clave
- Tarjeta de producto: imagen con `aspect-ratio: 4/3`, nombre, precio,
  badge de estado y botón de acción correspondiente.
- Badge VENDIDO: overlay semitransparente sobre la imagen de la tarjeta.
- Navbar: sticky, con logo, links principales e ícono de carrito con badge contador.
- Footer: links, redes sociales, datos de contacto y schema LocalBusiness.

### Interacción
- Hover en tarjetas: scale sutil + sombra (respeta `prefers-reduced-motion`).
- Transiciones suaves con propósito, nunca decorativas por sí solas.
- Sin animaciones que bloqueen el render principal.
- Áreas táctiles mínimo 44×44px en mobile.
- Sin scroll horizontal en ningún viewport.

---

## REQUISITOS DEL BASELINE — TODOS OBLIGATORIOS

### Responsive / Mobile-first
- Diseñar primero para móvil y escalar hacia arriba.
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px).
- Grid de productos: 1 col mobile, 2 tablet, 3-4 desktop.
- Imágenes con `object-fit: cover` dentro de contenedores con dimensiones explícitas.
- Sin scroll horizontal en ningún viewport.

### Accesibilidad (a11y)
- HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Un solo `<h1>` por página; jerarquía sin saltos (h1 → h2 → h3).
- `alt` descriptivo en imágenes de producto:
  ej: "Mesa ratona de eucaliptus macizo con patas torneadas — Mueblería Fondar"
- `alt=""` en imágenes puramente decorativas.
- Contraste mínimo WCAG AA (4.5:1) verificado.
- Navegación completa por teclado con foco visible.
- Labels asociados a todos los inputs. `aria-label` en íconos sin texto.
- Mensajes de error de formulario accesibles (asociados al input con `aria-describedby`).

### Metadatos y SEO técnico
- `<title>` único por página:
  - Home: "Mueblería Fondar | Muebles de Madera Maciza en Trinidad, Uruguay"
  - Catálogo: "Catálogo de Muebles | Mueblería Fondar"
  - Producto: "[Nombre del producto] | Mueblería Fondar"
  - A medida: "Muebles a Medida en Uruguay | Mueblería Fondar"
- `<meta name="description">` relevante por página.
- Open Graph completo: `og:title`, `og:description`, `og:image`, `og:url`.
- `lang="es"` en el `<html>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Favicon en múltiples formatos (basado en el logo circular de Fondar).

### Performance
- Imágenes con `next/image` (optimización, lazy loading, WebP automático).
- Dimensiones explícitas en todas las imágenes para evitar CLS.
- Fuentes con `next/font` (preload automático, `font-display: swap`).
- Sin recursos bloqueantes en el render inicial.

### Buenas prácticas de código
- Componentes reutilizables y pequeños.
- Variables CSS / design tokens en `globals.css` para colores, tipografía y
  espaciado — usarlos consistentemente en lugar de valores hardcodeados.
- Separación clara:
  - UI genérica → `/components/ui`
  - Secciones de página → `/components/sections`
  - Lógica de negocio → `/lib`
- Imports absolutos desde `src/` (configurar en `tsconfig.json`).
- Sin estilos inline salvo casos justificados.
- Precios siempre formateados con `Intl.NumberFormat` en UYU.

### SEO local
- Keywords geográficas integradas naturalmente en el contenido:
  "Trinidad, Flores", "interior de Uruguay", "envíos a todo Uruguay".
- Schema markup `LocalBusiness` de tipo `FurnitureStore` en el layout raíz:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Mueblería Fondar",
    "description": "Muebles artesanales de madera maciza en Trinidad, Uruguay",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Trinidad",
      "addressRegion": "Flores",
      "addressCountry": "UY"
    },
    "telephone": "+59891009547",
    "url": "https://muebleriafondar.com"
  }
  ```
- Schema markup `Product` en páginas de producto individual.
- NAP consistente en footer, `/contacto` y schema.

### SEO semántico — keywords a integrar naturalmente
Primarias:
- "muebles de madera maciza Uruguay"
- "mueblería Trinidad Flores"
- "muebles artesanales Uruguay"
- "comprar muebles online Uruguay"
- "muebles a medida Uruguay"

Secundarias:
- "muebles de eucaliptus Uruguay"
- "muebles únicos artesanales"
- "mueblería interior Uruguay"
- "mesa de madera maciza Uruguay"
- "muebles de madera reciclada Uruguay"

### E-commerce / Pagos
- Validación robusta en cliente (Zod + react-hook-form) y servidor (Zod en API routes).
- `MP_ACCESS_TOKEN` NUNCA en el cliente.
- Estados claros de carga, error y éxito en todo el flujo de compra.
- Confirmación explícita antes de finalizar compra.
- Feedback visual en cada paso del checkout.

### Formularios
- Validación en tiempo real con mensajes de error claros y accesibles.
- Estado de carga al enviar (spinner, botón deshabilitado durante el envío).
- Feedback de éxito explícito después de cada acción.
- Honeypot anti-spam en formularios públicos.
- Todos los labels asociados a sus inputs.

### Seguridad
- Variables de entorno para todas las claves. Nunca en el código fuente.
- Sanitización de inputs antes de usarlos en URLs (especialmente en el mensaje
  de WhatsApp: `encodeURIComponent` en todos los campos).
- Headers de seguridad en `next.config.js`:
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- Rate limiting básico en API routes sensibles (`/api/checkout`, `/api/presupuestos`).

### Analítica
Preparar estructura para Google Analytics 4 con eventos clave:
- `add_to_cart` — producto agregado al carrito
- `begin_checkout` — inicio de checkout en MP
- `purchase` — pago confirmado por webhook
- `whatsapp_click` — apertura de WhatsApp desde cualquier CTA
- `presupuesto_enviado` — formulario de muebles a medida enviado exitosamente
- `producto_vendido_cta` — click en "Quiero uno similar" en producto VENDIDO

Variable de entorno: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## CAPA DE DATOS — lib/cms.ts

Implementar las siguientes funciones exportadas (todas async, con los tipos
correspondientes de `types/index.ts`):

```typescript
// Productos
export async function getProductos(filtros?: FiltrosProducto): Promise<Producto[]>
export async function getProducto(slug: string): Promise<Producto | null>
export async function getProductosDestacados(): Promise<Producto[]>

// Catálogo
export async function getCategorias(): Promise<Categoria[]>
export async function getTestimonios(): Promise<Testimonio[]>

// Config del sitio (singletons)
export async function getSiteConfig(): Promise<SiteConfig>

// Presupuestos (escritura hacia el CMS)
export async function submitPresupuesto(
  data: PresupuestoPayload
): Promise<{ ok: boolean }>
// Si NEXT_PUBLIC_TRICODE_TENANT_SLUG está vacío → retorna { ok: false }
// silenciosamente, sin lanzar error. El flujo del usuario no se interrumpe.
```

Implementación inicial: cada función importa de los archivos en `/data/`.
El módulo está diseñado para que cuando se conecte el CMS real, el cambio
sea únicamente la implementación interna, sin tocar ningún componente consumidor.

Endpoints del CMS real (para documentar en comentarios dentro del módulo):
```
GET  /api/v1/public/:tenantSlug/content-types/productos/entries
GET  /api/v1/public/:tenantSlug/content-types/categorias/entries
GET  /api/v1/public/:tenantSlug/content-types/testimonios/entries
GET  /api/v1/public/:tenantSlug/landing-config
POST /api/v1/public/:tenantSlug/presupuestos
```

---

## OUTPUT ESPERADO

Entregá en este orden:

1. **`types/index.ts`** — todos los tipos TypeScript del dominio
2. **`data/productos.ts`** — 10 productos de ejemplo tipados (mix de categorías,
   tipos de madera, algunos VENDIDOS, algunos DISPONIBLES, algunos destacados)
3. **`data/categorias.ts`**, **`data/testimonios.ts`**, **`data/config.ts`**
4. **`lib/cms.ts`** — módulo único de acceso a datos con las 7 funciones
5. **`lib/whatsapp.ts`** — función `buildWhatsAppUrl(data: PresupuestoPayload): string`
6. **`lib/utils.ts`** — `formatPrecio(n: number): string`, `cn()`, helpers
7. **Estructura de carpetas completa** con árbol comentado
8. **`globals.css`** — design tokens CSS, reset, tipografía base
9. **Layout principal** (`app/layout.tsx` y `app/(site)/layout.tsx`) con
   Navbar, Footer y schema LocalBusiness
10. **`components/product/ProductCard.tsx`** — tarjeta con lógica DISPONIBLE/VENDIDO
11. **`components/product/ProductGrid.tsx`** y **`ProductFilters.tsx`**
12. **`app/(site)/productos/page.tsx`** — catálogo con filtros completo
13. **`app/(site)/productos/[slug]/page.tsx`** — detalle de producto completo
14. **`app/(site)/a-medida/page.tsx`** — con `MedidaForm` y lógica dual (WhatsApp + CMS)
15. **`app/(site)/carrito/page.tsx`** — con hook de Zustand y lógica de race condition
16. **`app/api/checkout/route.ts`** — crea preferencia MercadoPago (server-side)
17. **`app/api/presupuestos/route.ts`** — registra presupuesto en CMS (falla silencioso)
18. **`app/api/webhooks/mp/route.ts`** — recibe notificaciones de MercadoPago
19. **Páginas de retorno de pago**: `/pago/exitoso`, `/pago/pendiente`, `/pago/fallido`
20. **`next.config.js`** — con headers de seguridad configurados
21. **`.env.example`** — todas las variables documentadas con descripción
