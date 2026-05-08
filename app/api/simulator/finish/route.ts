import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import { logSimulatorEvent } from '@/lib/simulator/audit';
import { gradeFromScore } from '@/lib/simulator/scoring';
import * as Sentry from '@sentry/nextjs';

const finishSchema = z.object({
  sessionId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = finishSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { sessionId } = validated.data;
    const supabase = await createServerSupabase();

    // Get session and results
    const { data: session, error: sessionError } = await supabase
      .from('simulator_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', profile.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const { data: results, error: resultsError } = await supabase
      .from('simulator_case_results')
      .select('*, scenarios(category_id)')
      .eq('session_id', sessionId);

    if (resultsError) throw resultsError;

    // Calculate final grade
    const grade = gradeFromScore(session.total_score, session.max_possible_score);

    // Audit
    await logSimulatorEvent(supabase, profile.id, 'simulator_session_completed', {
      session_id: sessionId,
      total_score: session.total_score,
      grade
    });

    return NextResponse.json({
      session,
      results,
      grade
    });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/finish' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
