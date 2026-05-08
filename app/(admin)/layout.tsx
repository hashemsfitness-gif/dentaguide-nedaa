import { createServerSupabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ReactNode } from "react";

/**
 * Root Admin Layout
 * Performs server-side admin role verification as Layer 2 defense.
 */
export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabase();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check role using service role key is not needed here as we want to check
  // against the user's RLS-restricted profile, or we can use the service client
  // if we want to be absolutely sure. The plan v2 says:
  // "Hämtar profile.role med Service Role Key (server-side only)."
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    // If not admin, redirect to main dashboard
    redirect("/dashboard");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
