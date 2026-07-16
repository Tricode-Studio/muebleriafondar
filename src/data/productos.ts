// data/productos.ts — Productos de ejemplo (MVP)
// En fase 2 esta colección vive en Tricode CMS (ContentType slug: "productos",
// módulo CATALOG) y se consume vía lib/cms.ts sin tocar componentes.
// Las imágenes son placeholders de Unsplash — reemplazar por fotos reales
// del storage del tenant.

import type { Producto } from "@/types";

export const productos: Producto[] = [
  {
    id: "prod-001",
    slug: "mesa-comedor-eucaliptus-6-personas",
    nombre: "Mesa de comedor en eucaliptus macizo",
    descripcion:
      "Mesa de comedor para seis personas en eucaliptus macizo de una sola pieza. La veta natural de la madera queda a la vista, con terminación en aceite natural que resalta los tonos cálidos. Ideal para comedores amplios que buscan una pieza con carácter propio.",
    categoria: "Comedor",
    tipoDeMadera: "Eucaliptus",
    precio: 38500,
    imagenes: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=80",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 180cm × Ancho 90cm × Alto 76cm",
    destacado: true,
    notas: "Terminación en aceite natural. Patas desmontables para el envío.",
  },
  {
    id: "prod-002",
    slug: "mesa-ratona-eucaliptus-patas-torneadas",
    nombre: "Mesa ratona de eucaliptus con patas torneadas",
    descripcion:
      "Mesa ratona baja en eucaliptus macizo con patas torneadas a mano. Una pieza única para el living: los nudos de la madera son parte del diseño, no un defecto. Superficie lijada al agua y sellada con cera natural.",
    categoria: "Living",
    tipoDeMadera: "Eucaliptus",
    precio: 14900,
    imagenes: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    ],
    estado: "VENDIDO",
    dimensiones: "Largo 110cm × Ancho 60cm × Alto 45cm",
    destacado: true,
    notas: "Cera natural de abejas. Cada pata torneada individualmente.",
  },
  {
    id: "prod-003",
    slug: "ropero-pino-macizo-dos-puertas",
    nombre: "Ropero de pino macizo de dos puertas",
    descripcion:
      "Ropero de dos puertas en pino macizo con barral interior y estante superior. Construcción tradicional con encastres a la vista. Lustrado en tono miel que envejece con nobleza.",
    categoria: "Dormitorio",
    tipoDeMadera: "Pino",
    precio: 29800,
    imagenes: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 120cm × Ancho 55cm × Alto 190cm",
    destacado: true,
  },
  {
    id: "prod-004",
    slug: "cama-dos-plazas-lapacho",
    nombre: "Cama de dos plazas en lapacho",
    descripcion:
      "Cama de dos plazas en lapacho macizo, una de las maderas más duras y durables del litoral. Respaldo de tablas anchas con veta pronunciada. Pensada para durar generaciones.",
    categoria: "Dormitorio",
    tipoDeMadera: "Lapacho",
    precio: 45200,
    imagenes: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 200cm × Ancho 160cm × Alto 95cm",
    destacado: true,
    notas: "Incluye sistema de encastre reforzado. No incluye colchón.",
  },
  {
    id: "prod-005",
    slug: "estanteria-madera-reciclada-cinco-estantes",
    nombre: "Estantería de madera reciclada de cinco estantes",
    descripcion:
      "Estantería abierta construida con madera reciclada de demolición. Cada tabla tiene su historia: clavos viejos, marcas de uso y tonos irrepetibles. Estructura reforzada con escuadras de hierro.",
    categoria: "Living",
    tipoDeMadera: "Reciclada",
    precio: 18700,
    imagenes: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=80",
    ],
    estado: "VENDIDO",
    dimensiones: "Largo 90cm × Ancho 30cm × Alto 180cm",
    destacado: true,
    notas: "Madera de demolición tratada contra insectos y humedad.",
  },
  {
    id: "prod-006",
    slug: "escritorio-guatambu-cajonera",
    nombre: "Escritorio de guatambú con cajonera",
    descripcion:
      "Escritorio en guatambú macizo con cajonera de tres cajones. Madera clara de grano fino, ideal para espacios de trabajo luminosos. Corredera de madera tradicional, sin herrajes plásticos.",
    categoria: "Oficina",
    tipoDeMadera: "Guatambú",
    precio: 26400,
    imagenes: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 140cm × Ancho 70cm × Alto 78cm",
    destacado: true,
  },
  {
    id: "prod-007",
    slug: "banco-jardin-eucaliptus-tratado",
    nombre: "Banco de jardín en eucaliptus tratado",
    descripcion:
      "Banco de exterior en eucaliptus macizo con tratamiento para intemperie. Diseño simple y robusto, pensado para el jardín, la galería o el frente de la casa. Tornillería de acero inoxidable.",
    categoria: "Jardín",
    tipoDeMadera: "Eucaliptus",
    precio: 11200,
    imagenes: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 150cm × Ancho 55cm × Alto 85cm",
    destacado: false,
    notas: "Doble mano de protector para exterior. Apto intemperie.",
  },
  {
    id: "prod-008",
    slug: "mesa-luz-pino-un-cajon",
    nombre: "Mesa de luz de pino con un cajón",
    descripcion:
      "Mesa de luz compacta en pino macizo con cajón y estante inferior. Terminación natural mate. Un clásico que acompaña cualquier dormitorio sin competir con la cama.",
    categoria: "Dormitorio",
    tipoDeMadera: "Pino",
    precio: 7800,
    imagenes: [
      "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Largo 45cm × Ancho 38cm × Alto 60cm",
    destacado: false,
  },
  {
    id: "prod-009",
    slug: "perchero-pie-madera-reciclada",
    nombre: "Perchero de pie en madera reciclada",
    descripcion:
      "Perchero de pie hecho con vigas recicladas de una casona de Trinidad. Cinco ganchos de hierro forjado. Una pieza de decoración con historia real del interior del país.",
    categoria: "Decoración",
    tipoDeMadera: "Reciclada",
    precio: 6500,
    imagenes: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80",
    ],
    estado: "VENDIDO",
    dimensiones: "Base 40cm × 40cm × Alto 175cm",
    destacado: false,
    notas: "Ganchos de hierro forjado por herrero local.",
  },
  {
    id: "prod-010",
    slug: "juego-sillas-comedor-guatambu-x4",
    nombre: "Juego de cuatro sillas de comedor en guatambú",
    descripcion:
      "Juego de cuatro sillas de comedor en guatambú macizo con asiento anatómico tallado. Respaldo curvo de una sola pieza. Livianas, firmes y cómodas — el complemento ideal para una mesa de madera maciza.",
    categoria: "Comedor",
    tipoDeMadera: "Guatambú",
    precio: 22000,
    imagenes: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80",
    ],
    estado: "DISPONIBLE",
    dimensiones: "Cada silla: Ancho 45cm × Profundidad 50cm × Alto 90cm",
    destacado: false,
    notas: "Se venden como juego de 4. Asiento tallado a mano.",
  },
];
