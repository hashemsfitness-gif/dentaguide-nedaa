import { createServerSupabase } from "../supabase";
import { NextResponse } from "next/server";

/**
 * requireAdmin() — Admin guard for Route Handlers (API routes).
 * 
 * - Verifies session and user authentication.
 * - Checks if the user profile has the 'admin' role.
 * - Returns the user object and supabase client if successful.
 * - Throws a Response (401 or 403) if authorization fails.
 */
export async function requireAdmin() {
  const supabase = await createServerSupabase();
  
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Response(
      JSON.stringify({ error: "Unauthorized — Login required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check admin role from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    throw new Response(
      JSON.stringify({ error: "Forbidden — Admin access required" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return { user, supabase };
}
