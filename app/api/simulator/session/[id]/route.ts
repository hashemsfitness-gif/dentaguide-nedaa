import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import * as Sentry from '@sentry/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionId = params.id;
    const supabase = await createServerSupabase();

    // Fetch session
    const { data: session, error: sessionError } = await supabase
      .from('simulator_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', profile.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Fetch results so far
    const { data: results, error: resultsError } = await supabase
      .from('simulator_case_results')
      .select('*')
      .eq('session_id', sessionId)
      .order('case_order', { ascending: true });

    if (resultsError) throw resultsError;

    // Fetch scenarios
    const { data: scenarios, error: scenariosError } = await supabase
      .from('scenarios')
      .select('id, title, slug, patient_quote, anamnes, status_section, category_id, categories(slug, area)')
      .in('id', session.scenario_ids);

    if (scenariosError) throw scenariosError;

    // Maintain order
    const orderedScenarios = session.scenario_ids.map((id: string) => {
      const s: any = scenarios.find((fs: any) => fs.id === id);
      if (!s) return null;
      return {
        ...s,
        category_slug: s.categories?.slug || 'allmant'
      };
    }).filter(Boolean);

    return NextResponse.json({
      session,
      results,
      scenarios: orderedScenarios
    });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/session/[id]' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
