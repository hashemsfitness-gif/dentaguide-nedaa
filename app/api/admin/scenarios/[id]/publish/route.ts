import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { validateScenarioDraft } from "@/lib/admin/scenario-validators";
import { NextResponse, NextRequest } from "next/server";

/**
 * POST /api/admin/scenarios/[id]/publish
 * 
 * Publishes draft content to live columns.
 * Creates a new entry in scenario_versions.
 * Performs clinical validation (ICD/PNR checks).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user, supabase } = await requireAdmin();

    // 1. Fetch the draft content
    const { data: scenario, error: fetchError } = await supabase
      .from("scenarios")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    // 2. Clinical Validation
    const validation = validateScenarioDraft(scenario);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 3. Prepare Live Update
    // Note: Some fields like 'title' exist in both. 
    // We map draft_* to live columns.
    const liveUpdate = {
      title: scenario.draft_title || scenario.title,
      anamnes: scenario.draft_anamnes || scenario.anamnes,
      status_section: scenario.draft_status || scenario.status_section,
      behandling: scenario.draft_behandling || scenario.behandling,
      debitering: scenario.draft_debitering || scenario.debitering,
      red_flags: scenario.draft_roda_flaggor || scenario.red_flags,
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Clear draft fields? Plan v2 says "nollställ draft_*"
      draft_title: null,
      draft_anamnes: null,
      draft_status: null,
      draft_behandling: null,
      draft_debitering: null,
      draft_roda_flaggor: null,
      draft_updated_at: null,
      draft_updated_by: null,
    };

    // 4. Update Live Table
    // Trigger in DB will automatically create scenario_versions entry because content changed.
    // Wait, the plan v2 says: "Ny rad i scenario_versions skapas BARA vid publish eller manuellt Spara version."
    // Our DB trigger in 0001_init.sql creates a version BEFORE UPDATE.
    // This matches the requirement if we only update live columns here.
    
    const { error: updateError } = await supabase
      .from("scenarios")
      .update(liveUpdate)
      .eq("id", id);

    if (updateError) throw updateError;

    // 5. Audit Log
    await logAdminAction(user.id, "admin_publish", {
      scenario_id: id,
      title: scenario.title,
    });

    return NextResponse.json({ success: true });
  } catch (response) {
    if (response instanceof Response) return response;
    console.error("[PUBLISH ERROR]:", response);
    return NextResponse.json({ error: "Failed to publish scenario" }, { status: 500 });
  }
}
