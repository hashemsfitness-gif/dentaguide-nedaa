import { requireAdmin } from "@/lib/auth/admin-guard";
import { NextResponse, NextRequest } from "next/server";

/**
 * GET /api/admin/search?q=...
 * 
 * Global search for the admin dashboard (Cmd+K).
 * Searches scenarios, categories, and user profiles.
 */
export async function GET(request: NextRequest) {
  try {
    const { supabase } = await requireAdmin();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const [scenarios, categories, profiles] = await Promise.all([
      supabase
        .from("scenarios")
        .select("id, title, slug, scenario_code")
        .or(`title.ilike.%${query}%,scenario_code.ilike.%${query}%`)
        .limit(5),
      supabase
        .from("categories")
        .select("id, name, slug")
        .ilike("name", `%${query}%`)
        .limit(3),
      supabase
        .from("profiles")
        .select("id, email, full_name")
        .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
        .limit(5),
    ]);

    const results = [
      ...(scenarios.data || []).map((s) => ({
        type: "scenario",
        id: s.id,
        title: s.title,
        url: `/admin/scenarios/${s.id}/edit`,
        subtitle: s.scenario_code,
      })),
      ...(categories.data || []).map((c) => ({
        type: "category",
        id: c.id,
        title: c.name,
        url: `/admin/categories`, // Categories page is a stub/placeholder
        subtitle: "Kategori",
      })),
      ...(profiles.data || []).map((p) => ({
        type: "user",
        id: p.id,
        title: p.full_name || p.email,
        url: `/admin/users`,
        subtitle: p.email,
      })),
    ];

    return NextResponse.json({ results });
  } catch (response) {
    if (response instanceof Response) return response;
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
