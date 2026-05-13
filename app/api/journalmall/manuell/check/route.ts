import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { checkRateLimit, manuellJournalFreeLimiter } from "@/lib/ratelimit";
import * as Sentry from "@sentry/nextjs";

/**
 * POST /api/journalmall/manuell/check
 *
 * Räknar och returnerar kvot för Manuell journalmall.
 *
 * - Premium-tier ('kliniker' eller 'klinik'): obegränsat → { unlimited: true }
 * - Gratis-tier (inloggad eller anonym via IP): 4/dag
 * - Returnerar 429 om kvoten är slut
 *
 * Klienten ska anropa endpointen *innan* en mall genereras/sparas, så
 * att räknaren bara ökar vid faktisk användning.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Premium-koll
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("tier")
        .eq("id", user.id)
        .single();
      const isPremium =
        profile?.tier === "kliniker" || profile?.tier === "klinik";
      if (isPremium) {
        return NextResponse.json({ unlimited: true });
      }
    }

    // Gratis: identifiera via user-id om inloggad, annars IP
    const identifier =
      user?.id ??
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "anonymous";

    const result = await checkRateLimit(manuellJournalFreeLimiter, identifier);

    if (!result.success) {
      return NextResponse.json(
        {
          allowed: false,
          unlimited: false,
          limit: result.limit,
          remaining: 0,
          reset: result.reset,
          message:
            "Dagsgränsen för Manuell journalmall (4/dag) är förbrukad. Uppgradera till Kliniker för obegränsad åtkomst.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json({
      allowed: true,
      unlimited: false,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: "/api/journalmall/manuell/check" },
    });
    // Vid fel — släpp igenom hellre än att blockera klinikern
    return NextResponse.json({ allowed: true, unlimited: false, fallback: true });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST" },
    { status: 405 }
  );
}
