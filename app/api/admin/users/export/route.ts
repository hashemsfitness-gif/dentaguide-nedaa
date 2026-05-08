import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { NextResponse } from "next/server";

const ALLOWED_USER_COLUMNS = [
  "id",
  "email",
  "clinic_name",
  "tier",
  "role",
  "subscription_status",
  "created_at",
  "last_sign_in_at",
];

/**
 * GET /api/admin/users/export
 * 
 * User Statistics Export (CSV)
 * Whitelist columns only — no PII besides email/clinic.
 */
export async function GET() {
  try {
    const { user, supabase } = await requireAdmin();

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select(ALLOWED_USER_COLUMNS.join(","));

    if (error) throw error;

    // Convert to CSV
    const csvHeader = ALLOWED_USER_COLUMNS.join(",") + "\n";
    const csvRows = (profiles || [])
      .map((row: any) =>
        ALLOWED_USER_COLUMNS.map((col) => {
          const val = row[col];
          if (val === null || val === undefined) return "";
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(",")
      )
      .join("\n");

    const csvContent = csvHeader + csvRows;

    // Audit log
    await logAdminAction(user.id, "admin_export", {
      type: "user_statistics",
      row_count: profiles?.length || 0,
    });

    const filename = `dentaguide-pro-users-${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (response) {
    if (response instanceof Response) return response;
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
