import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * lib/ratelimit.ts — Upstash Redis rate limiters
 * 4 limiters: login (5/min), API (100/min), AI (5-100/day), webhook (30/min)
 */

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "ratelimit:login",
  analytics: true,
});

export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  prefix: "ratelimit:api",
  analytics: true,
});

export const aiJournalRatelimitKliniker = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "24 h"),
  prefix: "ratelimit:ai:kliniker",
  analytics: true,
});

export const aiJournalRatelimitKlinik = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "24 h"),
  prefix: "ratelimit:ai:klinik",
  analytics: true,
});

export const webhookLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  prefix: "ratelimit:webhook",
  analytics: true,
});

export const simulatorSessionLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  prefix: "ratelimit:sim:session",
  analytics: true,
});

export const simulatorAnswerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 m"),
  prefix: "ratelimit:sim:answer",
  analytics: true,
});

// Manuell journalmall — gratis-användare har 4/dag, premium obegränsat.
// API-routen /api/journalmall/manuell/check anropas av klienten innan
// generering för att räkna förbrukning + ge kvoten.
export const manuellJournalFreeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, "24 h"),
  prefix: "ratelimit:journal:manuell:free",
  analytics: true,
});

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<RateLimitResult> {
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

export function getAiLimiter(tier: "free" | "kliniker" | "klinik"): Ratelimit | null {
  if (tier === "free") return null;
  return tier === "kliniker" ? aiJournalRatelimitKliniker : aiJournalRatelimitKlinik;
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };
}
