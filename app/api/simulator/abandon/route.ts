import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import { logSimulatorEvent } from '@/lib/simulator/audit';
import * as Sentry from '@sentry/nextjs';

const abandonSchema = z.object({
  sessionId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = abandonSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { sessionId } = validated.data;
    const supabase = await createServerSupabase();

    const { error } = await supabase
      .from('simulator_sessions')
      .update({ status: 'abandoned' })
      .eq('id', sessionId)
      .eq('user_id', profile.id);

    if (error) throw error;

    await logSimulatorEvent(supabase, profile.id, 'simulator_session_abandoned', {
      session_id: sessionId
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/abandon' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
