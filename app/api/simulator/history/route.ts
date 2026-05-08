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

    const supabase = await createServerSupabase();

    const { data: history, error } = await supabase
      .from('simulator_sessions')
      .select('*')
      .eq('user_id', profile.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ history });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/history' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
