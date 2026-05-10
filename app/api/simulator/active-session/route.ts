import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── MOCK SESSION FALLBACK ────────────────────────────────
    if (process.env.SUPABASE_SERVICE_ROLE_KEY?.includes('din-service-role') || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ session: null });
    }

    const supabase = await createServerSupabase();
    // ... original code

    const { data: session, error } = await supabase
      .from('simulator_sessions')
      .select('id, started_at, completed_cases')
      .eq('user_id', profile.id)
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json({ session: session || null });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/active-session' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
