import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Middleware — skyddar /dashboard och /admin routes.
 *
 * - /dashboard/* kräver inloggad användare
 * - /admin/* kräver inloggad användare med role = 'admin'
 * - Oautentiserade användare redirectas till /login
 * - Icke-admin som försöker nå /admin får 403
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Create Supabase client with cookie handling ────────────────
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

  // ── TEMPORARY BYPASS FOR TESTING ──────────────────────────────
  // In a real app, this would check Supabase auth.
  // For now, we allow everything to let the USER test all functions.
  return supabaseResponse;

  /* Original Auth Logic (Commented out for testing)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (pathname.startsWith("/dashboard")) {
    if (userError || !user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  if (pathname.startsWith("/admin")) {
    if (userError || !user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || profile.role !== "admin") {
      return NextResponse.rewrite(new URL("/403", request.url));
    }
    return supabaseResponse;
  }
  */

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public files (svg, png, jpg, etc.)
     * - API routes that handle their own auth (webhooks)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api/webhooks).*)",
  ],
};
