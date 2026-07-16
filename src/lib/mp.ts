// lib/mp.ts — Cliente MercadoPago · SOLO SERVER-SIDE
// MP_ACCESS_TOKEN nunca llega al cliente: este módulo solo se importa desde
// API routes. El frontend interactúa con MercadoPago únicamente a través de
// POST /api/checkout (que devuelve la URL del Checkout Pro).

import "server-only";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

export function getMercadoPagoClient(): MercadoPagoConfig | null {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return null;
  return new MercadoPagoConfig({ accessToken });
}

export function getPreferenceClient(): Preference | null {
  const client = getMercadoPagoClient();
  return client ? new Preference(client) : null;
}

export function getPaymentClient(): Payment | null {
  const client = getMercadoPagoClient();
  return client ? new Payment(client) : null;
}
