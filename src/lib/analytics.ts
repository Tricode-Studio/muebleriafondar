// lib/analytics.ts — Eventos de Google Analytics 4
// Los eventos se disparan solo si NEXT_PUBLIC_GA_MEASUREMENT_ID está definido
// y gtag está cargado. Nunca rompen el flujo si GA no está configurado.

type GAEvent =
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "whatsapp_click"
  | "presupuesto_enviado"
  | "producto_vendido_cta";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: GAEvent,
  params?: Record<string, string | number>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", event, params ?? {});
}
