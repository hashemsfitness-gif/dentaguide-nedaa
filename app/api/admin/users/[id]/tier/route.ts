import { requireAdmin } from "@/lib/auth/admin-guard";
import { logAdminAction } from "@/lib/admin/audit";
import { NextResponse, NextRequest } from "next/server";

/**
 * PATCH /api/admin/users/[id]/tier
 * 
 * Manually change a user's subscription tier.
 * Request body should contain { tier: "free" | "kliniker" | "klinik" }.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { tier } = await request.json();
    const { user, supabase } = await requireAdmin();

    const allowedTiers = ["free", "kliniker", "klinik"];
    if (!allowedTiers.includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // 1. Fetch current tier for audit log
    const { data: targetProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("tier, email")
      .eq("id", id)
      .single();

    if (fetchError || !targetProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Update Tier
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        tier: tier,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) throw updateError;

    // 3. Audit Log
    await logAdminAction(user.id, "admin_tier_change", {
      target_user_id: id,
      target_email: targetProfile.email,
      old_tier: targetProfile.tier,
      new_tier: tier,
    });

    return NextResponse.json({ success: true });
  } catch (response) {
    if (response instanceof Response) return response;
    console.error("[TIER CHANGE ERROR]:", response);
    return NextResponse.json({ error: "Failed to change user tier" }, { status: 500 });
  }
}
