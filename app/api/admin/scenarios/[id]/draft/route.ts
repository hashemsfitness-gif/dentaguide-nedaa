import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { NextResponse, NextRequest } from "next/server";

/**
 * PATCH /api/admin/scenarios/[id]/draft
 * 
 * Auto-save draft content. 
 * Debounced from the client side.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user, supabase } = await requireAdmin();
    const body = await request.json();

    // Whitelist draft columns to prevent unauthorized updates
    const allowedColumns = [
      "draft_title",
      "draft_anamnes",
      "draft_status",
      "draft_behandling",
      "draft_debitering",
      "draft_roda_flaggor",
    ];

    const updateData: Record<string, any> = {
      draft_updated_at: new Date().toISOString(),
      draft_updated_by: user.id,
    };

    for (const key of allowedColumns) {
      if (key in body) {
        updateData[key] = body[key];
      }
    }

    const { error } = await supabase
      .from("scenarios")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (response) {
    if (response instanceof Response) return response;
    console.error("[DRAFT SAVE ERROR]:", response);
    return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
  }
}
