import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { NextResponse } from "next/server";

/**
 * GET /api/admin/export
 * 
 * Clinical Content Export (JSON)
 * Excludes user data, for disaster recovery.
 */
export async function GET() {
  try {
    const { user, supabase } = await requireAdmin();

    const [scenarios, categories] = await Promise.all([
      supabase.from("scenarios").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("display_order", { ascending: true }),
    ]);

    const exportData = {
      exported_at: new Date().toISOString(),
      version: "1.0",
      data: {
        scenarios: scenarios.data || [],
        categories: categories.data || [],
      },
    };

    // Audit log
    await logAdminAction(user.id, "admin_export", {
      type: "clinical_content",
      scenario_count: scenarios.data?.length || 0,
      category_count: categories.data?.length || 0,
    });

    const filename = `dentaguide-pro-clinical-export-${new Date().toISOString().split("T")[0]}.json`;

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (response) {
    if (response instanceof Response) return response;
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
