import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getRouteRequirement, isFreeAccessible } from "@/lib/feature-access";

/**
 * Middleware — allowlist + freemium-modell.
 *
 * Publika (ingen login):
 *   - / (landing), /login, /registrera, /pricing, /om-oss, /reset-password
 *   - /403, /404
 *   - /api/auth/*, /api/webhooks/*, /api/cron/*
 *   - Free-tier feature paths (lib/feature-access.ts) — första scenariot
 *     per område + utvalda verktyg
 *
 * Login + UI-tier-check (sidan visar PremiumGate-modal vid behov):
 *   - Övriga kliniska scenarier
 *   - Bettfysiologi, Ortodonti
 *   - AI-journal, Dosering, Debitering, Läkemedel
 *
 * Endast login (auth-gate, oberoende av tier):
 *   - /dashboard, /simulator/*
 *
 * /admin/* kräver dessutom role = 'admin'.
 */

const PUBLIC_PATHS = new Set<string>([
  "/",
  "/login",
  "/registrera",
  "/pricing",
  "/om-oss",
  "/reset-password",
  "/premium-required",
  "/403",
  "/404",
]);

const PUBLIC_API_PREFIXES = [
  "/api/auth/",
  "/api/webhooks/",
  "/api/cron/",
  "/api/journalmall/manuell/check", // free-tier rate-limit endpoint
];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (isFreeAccessible(pathname)) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublic(pathname)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isSuperUser = user.email === 'nedaakh95se@gmail.com';

  // Admin check körs först (kräver role-fält)
  if (pathname.startsWith("/admin")) {
    if (isSuperUser) return supabaseResponse;
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (!profile || profile.role !== "admin") {
      return NextResponse.rewrite(new URL("/403", request.url));
    }
    return supabaseResponse;
  }

  // Premium tier-check för premium-routes (DEAKTIVERAD UNDER TEST)
  /*
  const requirement = getRouteRequirement(pathname);
  if (requirement === "premium") {
    if (isSuperUser) return supabaseResponse;
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    const isPremium =
      profile?.tier === "kliniker" || profile?.tier === "klinik";
    if (!isPremium) {
      const gateUrl = new URL("/premium-required", request.url);
      gateUrl.searchParams.set("from", pathname);
      return NextResponse.rewrite(gateUrl);
    }
  }
  */

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static, _next/image (static files & image optimization)
     * - favicon.ico
     * - Public file extensions (svg, png, jpg, mp4, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
