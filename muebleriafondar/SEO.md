# SEO.md — Estrategia SEO · Mueblería Fondar

## Palabras clave primarias

| Keyword | Intención | Volumen estimado UY |
|---|---|---|
| muebles de madera maciza Uruguay | Transaccional + informacional | Medio |
| mueblería Trinidad Flores Uruguay | Local + navegacional | Bajo (nicho) |
| muebles artesanales Uruguay | Transaccional | Medio |
| comprar muebles online Uruguay | Transaccional | Medio-alto |
| muebles a medida Uruguay | Transaccional | Medio |

---

## Palabras clave secundarias / long tail

- "muebles de eucaliptus Uruguay"
- "muebles de guatambú Uruguay"
- "muebles únicos artesanales"
- "mueblería interior Uruguay"
- "mesa de madera maciza Uruguay"
- "ropero madera maciza Uruguay"
- "muebles de madera reciclada Uruguay"
- "mueblería que envía a todo el país Uruguay"
- "presupuesto mueble a medida Uruguay"
- "muebles de living madera maciza"
- "cama madera maciza Uruguay"
- "escritorio madera maciza Uruguay"
- "muebles de jardín madera Uruguay"
- "muebles artesanales Flores Uruguay"

---

## SEO local

**Ciudad objetivo:** Trinidad, departamento de Flores, Uruguay

**Términos geográficos a integrar naturalmente en el contenido:**
- "Trinidad, Flores"
- "interior del Uruguay"
- "interior del país"
- "envíos a todo Uruguay"
- "envíos a todo el país"

**Schema markup LocalBusiness** (implementar en el layout raíz como JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Mueblería Fondar",
  "description": "Muebles artesanales de madera maciza en Trinidad, Uruguay. Piezas únicas, muebles a medida y envíos a todo el país.",
  "url": "https://muebleriafondar.com",
  "telephone": "+59891009547",
  "email": "guillermodeoliveira76@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Trinidad",
    "addressRegion": "Flores",
    "addressCountry": "UY"
  },
  "sameAs": [
    "https://www.facebook.com/p/Muebleria-Fondar-100057589143316/",
    "https://www.instagram.com/muebleria.fondar/"
  ],
  "openingHoursSpecification": [],
  "hasMap": "https://www.google.com/maps/search/Mueblería+Fondar+Trinidad+Flores+Uruguay"
}
```

**NAP consistente en todo el sitio** (footer, /contacto, schema):
- Nombre: Mueblería Fondar
- Ciudad: Trinidad, Flores, Uruguay
- Teléfono: +598 91 009 547

---

## Estructura semántica por página

### `/` — Home
- **H1:** "Muebles de Madera Maciza en Uruguay" *(o variante: "Piezas únicas hechas para durar")*
- **H2s:**
  - "Nuestro catálogo" (sección de productos destacados)
  - "Por qué elegir Fondar" (sección de diferenciales)
  - "Lo que dicen nuestros clientes" (testimonios)
  - "¿Querés un mueble a tu medida?" (banner CTA)
- **Meta title:** `Mueblería Fondar | Muebles de Madera Maciza en Trinidad, Uruguay`
- **Meta description:** `Mueblería artesanal en Trinidad, Flores. Muebles únicos de madera maciza, diseños a medida y envíos a todo Uruguay. Cada pieza es irrepetible.`
- **OG image:** foto hero del sitio (ambiente cálido con mueble protagonista)

### `/productos` — Catálogo
- **H1:** "Catálogo de Muebles Artesanales"
- **H2s:** por categoría — "Living", "Comedor", "Dormitorio", "Jardín", "Decoración", "Oficina"
- **Meta title:** `Catálogo de Muebles de Madera Maciza | Mueblería Fondar`
- **Meta description:** `Explorá nuestro catálogo de muebles únicos en madera maciza. Disponibles para compra online con envíos a todo Uruguay. Trinidad, Flores.`

### `/productos/[slug]` — Detalle de producto (generado dinámicamente)
- **H1:** nombre del producto (ej: "Mesa de comedor en eucaliptus macizo")
- **Meta title:** `[Nombre del producto] | Mueblería Fondar — Madera Maciza Uruguay`
- **Meta description:** descripción del producto + tipo de madera + "pieza única" + precio
- **Schema markup Product:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[nombre]",
  "description": "[descripcion]",
  "brand": { "@type": "Brand", "name": "Mueblería Fondar" },
  "material": "[tipoDeMadera]",
  "offers": {
    "@type": "Offer",
    "price": "[precio]",
    "priceCurrency": "UYU",
    "availability": "https://schema.org/[InStock|SoldOut]",
    "seller": { "@type": "Organization", "name": "Mueblería Fondar" }
  }
}
```
- **OG image:** primera imagen del producto

### `/a-medida` — Muebles personalizados
- **H1:** "Muebles a Medida en Uruguay"
- **H2s:**
  - "Diseñamos lo que imaginás"
  - "Elegí tu madera"
  - "¿Cómo funciona?"
- **Meta title:** `Muebles a Medida en Uruguay | Mueblería Fondar`
- **Meta description:** `Diseñamos tu mueble ideal en madera maciza. Elegís el tipo de madera, medidas y terminación. Presupuesto sin cargo. Trinidad, Flores, Uruguay.`

### `/nosotros`
- **H1:** "Nuestra historia" (o "Quiénes somos en Mueblería Fondar")
- **Meta title:** `Quiénes Somos | Mueblería Fondar — Trinidad, Uruguay`
- **Meta description:** `Conocé la historia de Mueblería Fondar, mueblería artesanal de madera maciza en Trinidad, Flores. Piezas únicas con calidad natural.`

### `/contacto`
- **H1:** "Contacto"
- **Meta title:** `Contacto | Mueblería Fondar — Trinidad, Flores, Uruguay`
- **Meta description:** `Contactate con Mueblería Fondar. Estamos en Trinidad, Flores, Uruguay. Hacemos envíos a todo el país.`

---

## Contenido mínimo por sección (home)

| Sección | Contenido mínimo requerido para SEO |
|---|---|
| Hero | H1 con keyword primaria + texto visible de apoyo (no solo en imagen) |
| Productos destacados | Nombres de productos con keywords de material y categoría en texto real |
| Diferenciales | Mencionar "madera maciza", "piezas únicas", "envíos a todo Uruguay" como texto HTML indexable |
| Testimonios | Mínimo 3, con ciudad del cliente mencionada en texto real |
| Banner a medida | Copy que incluya "a medida" y "Uruguay" en texto indexable |
| Footer | NAP completo (nombre, ciudad, teléfono) en texto real |

---

## Reglas de implementación SEO

1. **Todo el contenido clave debe ser texto HTML real**, no embebido en imágenes.
2. **Alt texts de imágenes de producto:** descriptivos y específicos.
   Formato: "[tipo de mueble] de [material] [detalle distintivo] — Mueblería Fondar"
   Ejemplo: "Mesa ratona de eucaliptus macizo con patas torneadas — Mueblería Fondar"
3. **Alt texts de imágenes decorativas:** `alt=""` (vacío).
4. **URLs de productos:** `/productos/[slug]` donde el slug describe el producto
   en kebab-case. Ejemplo: `mesa-comedor-eucaliptus-6-personas`. Nunca `/productos/123`.
5. **Links internos:** siempre descriptivos. "Ver catálogo de muebles" en lugar
   de "click aquí" o "ver más".
6. **Precios en texto:** siempre visibles como texto HTML (no solo en imágenes),
   formateados en UYU con `Intl.NumberFormat`.
7. **Schema JSON-LD:** implementado como `<script type="application/ld+json">` en
   el `<head>`, no como atributos en el HTML.
8. **Canonical tags:** en todas las páginas de producto para evitar duplicados
   si hay filtros que generan URLs con query params.
