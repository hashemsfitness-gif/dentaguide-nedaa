/**
 * lib/simulator/audit.ts
 * 
 * Logging simulator events for analytics.
 */

import { SupabaseClient } from '@supabase/supabase-js';

export type SimulatorEventType = 
  | 'simulator_started'
  | 'simulator_case_completed'
  | 'simulator_session_completed'
  | 'simulator_session_abandoned'
  | 'leaderboard_opt_in_changed';

export async function logSimulatorEvent(
  supabase: SupabaseClient,
  userId: string,
  eventType: SimulatorEventType,
  metadata: any = {}
) {
  const { error } = await supabase.from('analytics_events').insert({
    user_id: userId,
    event_type: eventType,
    event_data: metadata,
    created_at: new Date().toISOString()
  });

  if (error) {
    console.error(`[Audit] Failed to log ${eventType}:`, error);
  }
}
