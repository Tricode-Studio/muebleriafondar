# Mueblería Fondar — E-Commerce

Sitio e-commerce + landing de marca para Mueblería Fondar, mueblería artesanal
de madera maciza en Trinidad, Flores, Uruguay. Catálogo de piezas únicas con
compra online (MercadoPago Checkout Pro) y captación de consultas de muebles a
medida (WhatsApp + registro en Tricode CMS).

Especificaciones completas: [PROMPT.md](PROMPT.md) · [CONTEXT.md](CONTEXT.md) ·
[DATA.md](DATA.md) · [BRAND.md](BRAND.md) · [SEO.md](SEO.md)

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Zustand 5** — carrito persistido en localStorage (`fondar-cart`)
- **react-hook-form + Zod** — formularios con validación cliente y servidor
- **MercadoPago Checkout Pro** — pagos (server-side only)
- **Playfair Display + Inter** vía next/font

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar credenciales
npm run dev                  # http://localhost:3000
npm run build                # build de producción
npm run lint
```

## Estructura

```
src/
├── app/
│   ├── (site)/              # Rutas públicas (Navbar + Footer)
│   │   ├── page.tsx         # Home
│   │   ├── productos/       # Catálogo + detalle [slug]
│   │   ├── a-medida/        # Formulario de cotización
│   │   ├── carrito/         # Carrito + checkout
│   │   ├── nosotros/        # Historia y marca
│   │   ├── contacto/        # Contacto general
│   │   └── pago/            # Retornos MP: exitoso | pendiente | fallido
│   ├── api/
│   │   ├── checkout/        # Crea preferencia MercadoPago (server-side)
│   │   ├── presupuestos/    # Registra presupuesto en CMS (fallo silencioso)
│   │   ├── productos/estado # Verificación de race condition del carrito
│   │   └── webhooks/mp/     # Notificaciones de MercadoPago
│   ├── layout.tsx           # Fuentes, metadatos, GA4, schema LocalBusiness
│   └── globals.css          # Design tokens (paleta Fondar de BRAND.md)
├── components/
│   ├── ui/                  # shadcn/ui
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Secciones del home
│   ├── product/             # ProductCard, Grid, Filters, Gallery...
│   ├── forms/               # MedidaForm, ContactoForm
│   ├── cart/                # CartIcon, CartItem, CartSummary, CartView
│   └── analytics/           # GoogleAnalytics (GA4)
├── data/                    # Datos locales del MVP (productos, config...)
├── hooks/                   # useCart (Zustand), useFilters, useHydrated
├── lib/
│   ├── cms.ts               # ÚNICA fuente de datos — ver abajo
│   ├── mp.ts                # Cliente MercadoPago (solo server)
│   ├── whatsapp.ts          # Construcción de URLs wa.me
│   ├── rate-limit.ts        # Rate limiting básico de API routes
│   └── utils.ts             # formatPrecio (UYU), cn(), helpers
└── types/                   # Tipos del dominio (espejo de DATA.md)
```

## Arquitectura clave

- **`lib/cms.ts` es la única fuente de datos.** Ningún componente importa de
  `/data/` directamente. Al conectar el Tricode CMS real (fase 2), solo cambia
  la implementación interna del módulo.
- **Los productos VENDIDOS no se ocultan** — muestran badge y CTA
  "¿Te gustó? Pedí uno similar" que deriva a `/a-medida` con la referencia
  pre-llenada.
- **El formulario a medida ejecuta doble acción:** abre WhatsApp (visible) y
  registra el presupuesto en el CMS (transparente, fallo silencioso).
- **Piezas únicas:** cantidad siempre 1 por ítem. El carrito verifica al abrir
  y antes del checkout si alguna pieza pasó a VENDIDO (race condition).
- **`MP_ACCESS_TOKEN` nunca llega al cliente** — el checkout se crea en
  `/api/checkout` con precios tomados del servidor.

## Variables de entorno

Ver [.env.example](.env.example). Todas pueden quedar vacías en el MVP: el
sitio degrada con mensajes amigables (pagos deshabilitados, CMS silencioso,
GA sin cargar).
