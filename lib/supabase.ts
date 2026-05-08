import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

/**
 * lib/supabase.ts — Supabase client creation utilities
 *
 * - createClientSupabase(): Browser-side client (client components)
 * - createServerSupabase(): Server-side client (server components, route handlers)
 * - createServiceSupabase(): Service role client (admin operations, no RLS)
 *
 * Auth uses httpOnly cookies — NEVER localStorage.
 */

// ── Database types (placeholder — generate with `supabase gen types`) ──
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          tier: "free" | "kliniker" | "klinik";
          role: "user" | "admin";
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          stripe_price_id: string | null;
          stripe_current_period_end: string | null;
          onboarding_step: number;
          onboarding_completed: boolean;
          tutorial_completed: boolean;
          checklist: Record<string, boolean>;
          specialization: string | null;
          clinic_name: string | null;
          years_experience: number | null;
          preferred_areas: string[];
          created_at: string;
          updated_at: string;
          last_sign_in_at: string | null;
        };
        Insert: Partial<{
          id: string;
          email: string;
          full_name: string;
          avatar_url: string;
          tier: "free" | "kliniker" | "klinik";
          role: "user" | "admin";
        }>;
        Update: Partial<{
          full_name: string;
          avatar_url: string;
          tier: "free" | "kliniker" | "klinik";
          role: "user" | "admin";
          specialization: string;
          clinic_name: string;
          years_experience: number;
          preferred_areas: string[];
          onboarding_step: number;
          onboarding_completed: boolean;
          tutorial_completed: boolean;
          checklist: Record<string, boolean>;
        }>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          emoji: string;
          area: string;
          display_order: number;
          is_pediatric: boolean;
          scenario_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      scenarios: {
        Row: {
          id: string;
          category_id: string;
          scenario_code: string;
          title: string;
          slug: string;
          icd_code: string | null;
          definition: string | null;
          anamnes: string | null;
          status_section: string | null;
          diagnostik: string | null;
          behandling: string | null;
          uppfoljning: string | null;
          komplikationer: string | null;
          red_flags: Array<{
            id: string;
            title: string;
            description: string;
            severity: "critical" | "warning";
          }>;
          references_text: string | null;
          sources: Array<{ name: string; url?: string }>;
          is_premium: boolean;
          display_order: number;
          is_published: boolean;
          view_count: number;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          scenario_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          scenario_id: string;
        };
      };
      clinical_notes: {
        Row: {
          id: string;
          user_id: string;
          scenario_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
      };
      ai_journal_logs: {
        Row: {
          id: string;
          user_id: string;
          scenario_id: string | null;
          model: string;
          input_tokens: number;
          output_tokens: number;
          total_tokens: number;
          estimated_cost_cents: number;
          validation_passed: boolean;
          pii_detected: boolean;
          fabrication_detected: boolean;
          icd_code_in_output: boolean;
          user_approved: boolean | null;
          status: string;
          created_at: string;
        };
      };
    };
  };
};

// ── Browser client (for Client Components) ──────────────────

export function createClientSupabase() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ── Server client (for Server Components & Route Handlers) ──

export async function createServerSupabase() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}

// ── Service role client (for admin operations — bypasses RLS) ──

export function createServiceSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
