import { createServiceSupabase } from "../supabase";

export type AdminEventType = 
  | "admin_publish" 
  | "admin_rollback" 
  | "admin_tier_change" 
  | "admin_export"
  | "admin_draft_save";

/**
 * logAdminAction() — Logs an administrative action to analytics_events.
 * Uses service role to ensure logging works regardless of user RLS permissions.
 */
export async function logAdminAction(
  adminId: string,
  eventType: AdminEventType,
  metadata: Record<string, any> = {}
) {
  const supabase = createServiceSupabase();

  const { error } = await supabase.from("analytics_events").insert({
    user_id: adminId,
    event_type: eventType,
    event_data: metadata,
  });

  if (error) {
    console.error(`[AUDIT ERROR] Failed to log ${eventType}:`, error);
    // Note: We don't throw here to avoid breaking the main operation
    // but in a production environment, you might want more robust error handling.
  }
}
