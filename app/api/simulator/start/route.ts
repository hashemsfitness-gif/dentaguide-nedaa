import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import { checkRateLimit, simulatorSessionLimiter, rateLimitHeaders } from '@/lib/ratelimit';
import { selectCases } from '@/lib/simulator/case-selector';
import { logSimulatorEvent } from '@/lib/simulator/audit';
import * as Sentry from '@sentry/nextjs';

const startSchema = z.object({
  difficulty: z.enum(['basic', 'standard', 'advanced']),
  categoryIds: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit
    const limitResult = await checkRateLimit(simulatorSessionLimiter, profile.id);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitHeaders(limitResult) }
      );
    }

    const body = await req.json();
    const validated = startSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input', details: validated.error.errors }, { status: 400 });
    }

    const { difficulty, categoryIds } = validated.data;
    const supabase = await createServerSupabase();

    // Select cases
    const isPremiumUser = profile.tier !== 'free' || profile.role === 'admin';
    const { scenarios, fallbackUsed, warningMessage } = await selectCases(supabase, {
      difficulty,
      categoryIds,
      isPremiumUser,
      count: 5,
    });

    const scenarioIds = scenarios.map(s => s.id);

    // Create session
    const { data: session, error: sessionError } = await supabase
      .from('simulator_sessions')
      .insert({
        user_id: profile.id,
        difficulty,
        category_filter: categoryIds,
        scenario_ids: scenarioIds,
        status: 'in_progress'
      })
      .select('id')
      .single();

    if (sessionError) throw sessionError;

    // Audit
    await logSimulatorEvent(supabase, profile.id, 'simulator_started', {
      session_id: session.id,
      difficulty,
      category_ids: categoryIds,
      fallback_used: fallbackUsed
    });

    // Return scenarios without "correct" answers
    // We only return what's needed for the case presentation
    const { data: fullScenarios, error: fetchError } = await supabase
      .from('scenarios')
      .select('id, title, slug, patient_quote, anamnes, status_section, category_id, categories(slug, area)')
      .in('id', scenarioIds);

    if (fetchError) throw fetchError;

    // Maintain the order from scenarioIds
    const orderedScenarios = scenarioIds.map(id => {
      const s: any = fullScenarios.find(fs => fs.id === id);
      if (!s) return null;
      return {
        ...s,
        category_slug: s.categories?.slug || 'allmant'
      };
    }).filter(Boolean);

    return NextResponse.json({
      sessionId: session.id,
      scenarios: orderedScenarios,
      fallbackUsed,
      warningMessage
    });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/start' } });
    return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
  }
}
