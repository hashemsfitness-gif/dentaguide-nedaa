import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { NextResponse, NextRequest } from "next/server";

/**
 * POST /api/admin/scenarios/[id]/rollback
 * 
 * Rolls back a scenario to a specific version.
 * Request body should contain { version_id: string }.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { version_id } = await request.json();
    const { user, supabase } = await requireAdmin();

    if (!version_id) {
      return NextResponse.json({ error: "Version ID is required" }, { status: 400 });
    }

    // 1. Fetch the version snapshot
    const { data: version, error: versionError } = await supabase
      .from("scenario_versions")
      .select("content_snapshot")
      .eq("id", version_id)
      .eq("scenario_id", id)
      .single();

    if (versionError || !version) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    const snapshot = version.content_snapshot as any;

    // 2. Prepare Live Update from Snapshot
    const rollbackUpdate = {
      title: snapshot.title,
      icd_code: snapshot.icd_code,
      definition: snapshot.definition,
      anamnes: snapshot.anamnes,
      status_section: snapshot.status_section,
      diagnostik: snapshot.diagnostik,
      behandling: snapshot.behandling,
      uppfoljning: snapshot.uppfoljning,
      komplikationer: snapshot.komplikationer,
      red_flags: snapshot.red_flags,
      is_premium: snapshot.is_premium,
      updated_at: new Date().toISOString(),
    };

    // 3. Update Live Table
    // This will trigger another version creation (the rollback itself becomes a version)
    const { error: updateError } = await supabase
      .from("scenarios")
      .update(rollbackUpdate)
      .eq("id", id);

    if (updateError) throw updateError;

    // 4. Audit Log
    await logAdminAction(user.id, "admin_rollback", {
      scenario_id: id,
      version_id: version_id,
      title: snapshot.title,
    });

    return NextResponse.json({ success: true });
  } catch (response) {
    if (response instanceof Response) return response;
    console.error("[ROLLBACK ERROR]:", response);
    return NextResponse.json({ error: "Failed to rollback scenario" }, { status: 500 });
  }
}
