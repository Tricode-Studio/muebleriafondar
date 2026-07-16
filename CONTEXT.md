# CONTEXT.md — Mueblería Fondar · E-Commerce

## Descripción
E-commerce + landing de marca para Mueblería Fondar, mueblería artesanal de
madera maciza ubicada en Trinidad, departamento de Flores, Uruguay. El sitio
automatiza ventas online del catálogo y captura consultas de muebles a medida.

Diferencial central: cada mueble es una pieza única. Los productos vendidos
NO se ocultan — se marcan como VENDIDO y se convierten en referencia para nuevos
encargos personalizados, impulsando la sección de muebles a medida.

## Objetivo de negocio principal
1. Venta directa online: producto → carrito → MercadoPago Checkout Pro.
2. Captación de consultas a medida: formulario → WhatsApp + registro en CMS.
3. Posicionamiento SEO local (Trinidad, Flores) y nacional (madera maciza Uruguay).

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Estilos | Tailwind CSS 4 |
| Componentes UI | shadcn/ui |
| Estado global | Zustand 5 (carrito, persistido en localStorage) |
| Formularios | react-hook-form + Zod |
| Pagos | MercadoPago Checkout Pro |
| Fuentes | Playfair Display (headings) + Inter (cuerpo) vía next/font |
| Datos (MVP) | Archivos locales en `/data/`, consumidos via `lib/cms.ts` |
| Datos (prod) | Tricode CMS — misma interfaz, cero reescritura |

---

## Estructura de carpetas

```
src/
├── app/
│   ├── (site)/                          # Grupo de rutas públicas
│   │   ├── layout.tsx                   # Navbar + Footer + schema LocalBusiness
│   │   ├── page.tsx                     # Home
│   │   ├── productos/
│   │   │   ├── page.tsx                 # Catálogo con filtros
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Detalle de producto
│   │   ├── a-medida/
│   │   │   └── page.tsx                 # Formulario de muebles a medida
│   │   ├── carrito/
│   │   │   └── page.tsx                 # Carrito + inicio de checkout
│   │   ├── nosotros/
│   │   │   └── page.tsx                 # Historia y marca
│   │   ├── contacto/
│   │   │   └── page.tsx                 # Contacto general
│   │   └── pago/
│   │       ├── exitoso/page.tsx         # Confirmación de pago OK
│   │       ├── pendiente/page.tsx       # Pago en proceso
│   │       └── fallido/page.tsx         # Error en pago
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts                 # Crea preferencia MercadoPago (server-side)
│   │   ├── presupuestos/
│   │   │   └── route.ts                 # Registra presupuesto en CMS (fallo silencioso)
│   │   └── webhooks/
│   │       └── mp/route.ts              # Recibe notificaciones de MercadoPago
│   ├── layout.tsx                       # Root layout (fuentes, GA, metadatos globales)
│   └── globals.css                      # Design tokens CSS, reset, tipografía base
├── components/
│   ├── ui/                              # shadcn/ui + componentes genéricos custom
│   ├── layout/
│   │   ├── Navbar.tsx                   # Sticky, logo, links, ícono carrito con contador
│   │   └── Footer.tsx                   # Links, contacto, redes, schema
│   ├── sections/                        # Secciones de páginas completas
│   │   ├── HeroSection.tsx
│   │   ├── ProductosDestacadosSection.tsx
│   │   ├── DiferencialesSection.tsx
│   │   ├── TestimoniosSection.tsx
│   │   └── BannerAMedidaSection.tsx
│   ├── product/
│   │   ├── ProductCard.tsx              # Tarjeta con lógica DISPONIBLE/VENDIDO
│   │   ├── ProductGrid.tsx              # Grilla responsive de ProductCards
│   │   ├── ProductFilters.tsx           # Filtros sidebar (desktop) / drawer (mobile)
│   │   ├── ProductGallery.tsx           # Galería con swipe en mobile
│   │   └── ProductosRelacionados.tsx
│   ├── forms/
│   │   ├── MedidaForm.tsx               # Formulario de cotización a medida
│   │   └── ContactoForm.tsx             # Formulario de contacto general
│   └── cart/
│       ├── CartIcon.tsx                 # Ícono con badge contador en Navbar
│       ├── CartItem.tsx                 # Item individual en vista /carrito
│       └── CartSummary.tsx              # Resumen + CTA de checkout
├── lib/
│   ├── cms.ts                           # ÚNICA fuente de datos — 7 funciones exportadas
│   ├── mp.ts                            # Cliente MercadoPago (solo server-side)
│   ├── whatsapp.ts                      # buildWhatsAppUrl(data) → string
│   └── utils.ts                         # formatPrecio(), cn(), helpers
├── data/
│   ├── productos.ts                     # 10 productos de ejemplo tipados
│   ├── categorias.ts
│   ├── testimonios.ts
│   └── config.ts                        # Singletons: hero, contacto, seo, identidad
├── hooks/
│   ├── useCart.ts                       # Zustand store + hook de carrito
│   └── useFilters.ts                    # Estado de filtros del catálogo
└── types/
    └── index.ts                         # Todos los tipos del dominio
```

---

## Páginas y vistas

| Ruta | Propósito en el flujo |
|---|---|
| `/` | Marca, trust, productos destacados, entrada al catálogo y a medida |
| `/productos` | Catálogo completo con filtros por categoría, madera y estado |
| `/productos/[slug]` | Detalle individual: galería, info, lógica DISPONIBLE/VENDIDO |
| `/a-medida` | Formulario de cotización → WhatsApp + registro CMS |
| `/carrito` | Revisión de ítems + inicio de checkout MercadoPago |
| `/nosotros` | Historia, valores, ubicación |
| `/contacto` | Datos de contacto + formulario general |
| `/pago/exitoso` | Confirmación de compra exitosa |
| `/pago/pendiente` | Pago en proceso (ej: transferencia bancaria) |
| `/pago/fallido` | Error en pago + opciones de reintento y contacto |

---

## Flujos de conversión

### Flujo primario — Compra directa
```
Home → /productos → /productos/[slug] (DISPONIBLE)
  → Agregar al carrito → /carrito → Checkout MercadoPago
  → /pago/exitoso
```

### Flujo secundario — Mueble a medida (desde producto vendido)
```
/productos o /productos/[slug] (VENDIDO)
  → "Quiero uno similar" [slug + nombre pre-llenados]
  → /a-medida → Envío
  → WhatsApp abierto con mensaje pre-construido
  + POST silencioso a CMS (registro del presupuesto)
```

### Flujo terciario — Mueble a medida (entrada directa)
```
Home CTA "Muebles a medida" → /a-medida → Envío → WhatsApp + CMS
```

---

## Decisiones de arquitectura

### Productos VENDIDOS permanecen visibles
`estado: "VENDIDO"` modela la unicidad de cada pieza. El frontend renderiza el
badge y el CTA alternativo. Nunca filtrar automáticamente VENDIDOS del catálogo;
solo el toggle explícito del usuario puede ocultarlos.

### lib/cms.ts como única fuente de datos
Ningún componente importa datos directamente de `/data/`. Toda la lógica de
acceso a datos vive en `lib/cms.ts`. Cuando se conecte el Tricode CMS real,
solo cambia la implementación interna del módulo — los componentes no se tocan.

### Dual action en formulario de muebles a medida
El envío del formulario ejecuta en paralelo:
1. Apertura de WhatsApp con mensaje pre-construido (acción visible).
2. POST a `/api/presupuestos` → CMS (acción transparente, fallo silencioso).
Esto garantiza que desde el día uno cada lead queda registrado en el CMS,
listo para la bandeja de entrada del panel Tricode en fase 2.

### MercadoPago — solo server-side
`MP_ACCESS_TOKEN` vive únicamente en el servidor. El cliente llama a
`/api/checkout` que devuelve la URL de preferencia. El access token nunca
aparece en el bundle del cliente.

### Carrito local (Zustand + localStorage)
No hay autenticación de usuarios en el MVP. El carrito vive en el cliente.
Cada ítem tiene cantidad = 1 (son piezas únicas). Al abrir el carrito o
iniciar checkout se verifica si algún producto pasó a VENDIDO (race condition):
si ocurre, se alerta al usuario y se elimina el ítem antes de continuar.

---

## Estado global — Zustand (useCart)

```typescript
interface CartStore {
  items: CartItem[]                          // { producto: Producto }[]
  addToCart: (producto: Producto) => void    // Solo si DISPONIBLE y no está ya
  removeFromCart: (id: string) => void
  clearCart: () => void
  cartTotal: number                          // computed
  itemCount: number                          // computed
}
```

El store se persiste en localStorage con la clave `fondar-cart`.

---

## Integraciones

### MercadoPago Checkout Pro
- API route `POST /api/checkout` crea la preferencia con el SDK server-side.
- Webhook `POST /api/webhooks/mp` actualiza estado de productos al confirmar pago.
- Páginas de retorno: `/pago/exitoso`, `/pago/pendiente`, `/pago/fallido`.
- Documentación: https://developers.mercadopago.com

### WhatsApp
- Redirección via `https://wa.me/59891035868?text=...` (URL-encoded).
- Mensaje construido por `lib/whatsapp.ts → buildWhatsAppUrl(data)`.
- Número definitivo: +59891035868

### Tricode CMS — Presupuestos (fase 1 activa)
- `POST /api/v1/public/:tenantSlug/presupuestos` — registra cada consulta a medida.
- Si el tenant no está configurado: fallo silencioso, sin interrumpir el flujo.
- En fase 2: estos registros aparecen en la bandeja de entrada del panel Tricode.

### Tricode CMS — Catálogo (fase 2, roadmap)
- `GET /api/v1/public/:tenantSlug/content-types/productos/entries`
- `GET /api/v1/public/:tenantSlug/content-types/categorias/entries`
- `GET /api/v1/public/:tenantSlug/content-types/testimonios/entries`
- `GET /api/v1/public/:tenantSlug/landing-config`
- Ver DATA.md para el modelo completo de content types.

---

## Convenciones

- Archivos de ruta: kebab-case. Componentes: PascalCase.
- Imports absolutos desde `src/` configurados en `tsconfig.json` (`@/*`).
- Precios siempre en UYU, formateados con `Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' })`.
- Slugs: kebab-case estable (ej: `mesa-ratona-eucaliptus-01`). Nunca cambiar
  un slug una vez publicado (es el ID de routing y de idempotencia con el CMS).
- Imágenes: siempre vía `next/image` con `alt` descriptivo.
- Colores: siempre desde las variables CSS de `globals.css`, nunca valores
  hardcodeados en componentes.
- Errores de formulario: siempre asociados al input con `aria-describedby`.

---

## Variables de entorno

```bash
# Tricode CMS
NEXT_PUBLIC_TRICODE_API_BASE_URL=     # URL base del CMS (ej: https://api.tricode.app/api/v1)
NEXT_PUBLIC_TRICODE_TENANT_SLUG=      # Slug del tenant de Fondar en el CMS

# MercadoPago
NEXT_PUBLIC_MP_PUBLIC_KEY=            # Clave pública MP (cliente)
MP_ACCESS_TOKEN=                      # Access token MP — SOLO SERVER-SIDE, nunca exponer

# Analítica
NEXT_PUBLIC_GA_MEASUREMENT_ID=        # ID de Google Analytics 4 (ej: G-XXXXXXXXXX)
```
