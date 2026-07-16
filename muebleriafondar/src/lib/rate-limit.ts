// lib/rate-limit.ts — Rate limiting básico en memoria para API routes sensibles.
// Suficiente para el MVP en un solo proceso. Si el sitio escala a múltiples
// instancias, migrar a un store compartido (Redis/Upstash).

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  bucket.count += 1;
  return { ok: bucket.count <= limit };
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
