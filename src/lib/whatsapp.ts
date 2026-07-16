// lib/whatsapp.ts — Construcción de URLs de WhatsApp
// Todos los campos pasan por encodeURIComponent (vía URLSearchParams) para
// evitar inyección en la URL.

import type { PresupuestoPayload } from "@/types";
import { siteConfig } from "@/data/config";

const WHATSAPP_NUMBER = siteConfig.contacto.telefonoWhatsapp.replace(/\D/g, "");

function waUrl(mensaje: string): string {
  const params = new URLSearchParams({ text: mensaje });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

export function buildWhatsAppUrl(
  data: Omit<PresupuestoPayload, "origen" | "fechaEnvio">,
): string {
  const lineas = [
    "¡Hola Mueblería Fondar! Quiero pedir un presupuesto de mueble a medida.",
    "",
    `*Nombre:* ${data.nombre}`,
    `*Email:* ${data.email}`,
    ...(data.telefono ? [`*Teléfono:* ${data.telefono}`] : []),
    `*Tipo de mueble:* ${data.tipoMueble}`,
    `*Tipo de madera:* ${data.tipoDeMadera}`,
    ...(data.medidasAproximadas
      ? [`*Medidas aproximadas:* ${data.medidasAproximadas}`]
      : []),
    `*Servicio de armado:* ${data.servicioArmado}`,
    "",
    `*Descripción:* ${data.descripcion}`,
    ...(data.productoReferencia
      ? [
          "",
          `*Producto de referencia:* ${data.productoReferencia.nombre} (${data.productoReferencia.slug})`,
        ]
      : []),
  ];
  return waUrl(lineas.join("\n"));
}

export function buildContactoWhatsAppUrl(data: {
  nombre: string;
  email: string;
  mensaje: string;
}): string {
  const lineas = [
    "¡Hola Mueblería Fondar! Les escribo desde la web.",
    "",
    `*Nombre:* ${data.nombre}`,
    `*Email:* ${data.email}`,
    "",
    data.mensaje,
  ];
  return waUrl(lineas.join("\n"));
}
