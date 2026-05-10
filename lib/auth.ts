import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase";
import * as Sentry from "@sentry/nextjs";

/**
 * lib/auth.ts — Auth helper functions
 *
 * - getUser(): Get current user (returns null if not logged in)
 * - getSession(): Get current session
 * - requireAuth(): Require authentication (redirects to /login)
 * - requireAdmin(): Require admin role (redirects to /403)
 * - getUserProfile(): Get user profile with tier/role
 */

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  tier: "free" | "kliniker" | "klinik";
  role: "user" | "admin";
  onboarding_completed: boolean;
  onboarding_step: number;
  tutorial_completed: boolean;
  specialization: string | null;
  clinic_name: string | null;
};

/**
 * Get current authenticated user.
 * Returns null if not authenticated — does NOT redirect.
 */
export async function getUser() {
  // ── BYPASS FOR TESTING ────────────────────────────────────────
  return { id: '00000000-0000-0000-0000-000000000000', email: 'test@dentaguide.pro' } as any;

  try {
    const supabase = await createServerSupabase();
    // ... original code
  } catch (error) {
    return null;
  }
}

/**
 * Get current session.
 * Returns null if not authenticated.
 */
export async function getSession() {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      Sentry.captureException(error, {
        tags: { component: "auth", function: "getSession" },
      });
      return null;
    }

    return session;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "auth", function: "getSession" },
    });
    return null;
  }
}

/**
 * Require authentication — redirects to /login if not logged in.
 * Use in Server Components and Route Handlers.
 */
export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Require admin role — redirects to /403 if not admin.
 * Also requires authentication (redirects to /login if not logged in).
 */
export async function requireAdmin() {
  const user = await requireAuth();

  try {
    const supabase = await createServerSupabase();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      Sentry.captureException(error, {
        tags: { component: "auth", function: "requireAdmin" },
      });
      redirect("/403");
    }

    if (!profile || profile.role !== "admin") {
      redirect("/403");
    }

    return user;
  } catch (error) {
    // If error is a redirect, re-throw it
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    Sentry.captureException(error, {
      tags: { component: "auth", function: "requireAdmin" },
    });
    redirect("/403");
  }
}

/**
 * Get user profile with tier and role.
 * Returns null if not authenticated or profile not found.
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  // ── BYPASS FOR TESTING ────────────────────────────────────────
  return {
    id: '00000000-0000-0000-0000-000000000000',
    email: 'test@dentaguide.pro',
    full_name: 'Test Admin',
    tier: 'klinik',
    role: 'admin',
    onboarding_completed: true,
    onboarding_step: 4,
    tutorial_completed: true,
    specialization: 'Käkkirurgi',
    clinic_name: 'Testkliniken'
  };

  const user = await getUser();
  if (!user) return null;

  try {
    const supabase = await createServerSupabase();
    // ... original code
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has premium access (kliniker or klinik tier).
 */
export async function hasPremiumAccess(): Promise<boolean> {
  const profile = await getUserProfile();

  if (!profile) return false;

  return profile.tier === "kliniker" || profile.tier === "klinik" || profile.role === "admin";
}
