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

  // ── Refresh session (IMPORTANT: must call before getUser) ─────
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // ── Protected route: /dashboard/* ─────────────────────────────
  if (pathname.startsWith("/dashboard")) {
    if (userError || !user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return supabaseResponse;
  }

  // ── Protected route: /admin/* ─────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (userError || !user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      // Return 403 forbidden page
      const forbiddenUrl = new URL("/403", request.url);
      return NextResponse.rewrite(forbiddenUrl);
    }

    return supabaseResponse;
  }

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
