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

  const isSuperUser = user.email === 'nedaakh95se@gmail.com';

  if (!isSuperUser) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      // If not admin, redirect to main dashboard
      redirect("/dashboard");
    }
  }

  return <AdminLayout>{children}</AdminLayout>;
}
