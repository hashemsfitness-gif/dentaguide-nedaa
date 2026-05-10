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

    // Rate limit (Bypass in mock mode)
    const isMockMode = process.env.SUPABASE_SERVICE_ROLE_KEY?.includes('din-service-role') || !process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!isMockMode) {
      const limitResult = await checkRateLimit(simulatorSessionLimiter, profile.id);
      if (!limitResult.success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429, headers: rateLimitHeaders(limitResult) }
        );
      }
    }

    const body = await req.json();
    const validated = startSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input', details: validated.error.errors }, { status: 400 });
    }

    const { difficulty, categoryIds } = validated.data;

    // ── MOCK DATA FOR TESTING (Force if DB might be empty) ────────
    const mockScenarios = [
      { 
        id: 'mock-1', 
        title: 'Akut Perikoronit (38)', 
        slug: 'mock-1', 
        patient_quote: 'Det är jättesvullat längst bak i underkäken och jag kan knappt gapa.', 
        anamnes: '<p>24-årig kvinna, tidigare frisk. Söker akut för tilltagande värk och svullnad i vänster underkäke sedan 2 dagar. Svårigheter att gapa och svälja.</p><ul><li><strong>Allmäntillstånd:</strong> Feber 38.2°C.</li><li><strong>Rökning:</strong> Nej.</li></ul>', 
        status_section: '<p><strong>Extraoralt:</strong> Palpabel ömhet och lätt svullnad submandibulärt på vänster sida.</p><p><strong>Intraoralt:</strong> Kraftig rodnad och svullnad vid operculum över delvis frambruten 38. Pus kan exprimeras vid lätt tryck. Gapförmåga 22 mm (Trismus).</p>', 
        category_slug: 'kakkirurgi', 
        category_id: 'cat-1' 
      },
      { 
        id: 'mock-2', 
        title: 'Symptomatisk Apikal Parodontit', 
        slug: 'mock-2', 
        patient_quote: 'Det dunkar i tanden och den känns för hög när jag biter ihop.', 
        anamnes: '<p>45-årig man. Tand 46 tidigare rotfylld för 5 år sedan. Nu molande värk som övergått i bultande smärta. Kan ej tugga på höger sida.</p>', 
        status_section: '<p><strong>Kliniskt:</strong> Tand 46 är extremt perkussions- och apikalöm. Ingen rörlighet. Lätt svullnad i buckala omslagsvecket.</p><p><strong>Röntgen:</strong> Periapikal uppklarning kring båda rötterna på 46. Rotfyllning ser tät ut men slutar 3mm från apex.</p>', 
        category_slug: 'endodonti', 
        category_id: 'cat-2' 
      },
      { 
        id: 'mock-3', 
        title: 'Grav Parodontit (Stadium III)', 
        slug: 'mock-3', 
        patient_quote: 'Mina framtänder har börjat flytta på sig och det blöder när jag borstar.', 
        anamnes: '<p>58-årig rökare (20 cig/dag). Har ej varit hos tandläkare på 10 år. Upplever att tänderna känns "lösa".</p>', 
        status_section: '<p><strong>Kliniskt:</strong> Generell blödning vid sondering (BOP > 60%). PUS från flera fickor. Mobilitet grad 2 på 11, 21.</p><p><strong>Fickdjup:</strong> Flertalet fickor 6-9 mm, framförallt approximalt i molarregionen.</p>', 
        category_slug: 'parodontologi', 
        category_id: 'cat-3' 
      },
      { 
        id: 'mock-4', 
        title: 'Oral Lichen Planus', 
        slug: 'mock-4', 
        patient_quote: 'Det svider i kinderna när jag äter kryddig mat eller dricker juice.', 
        anamnes: '<p>62-årig kvinna. Besvären har kommit och gått under ett halvår. Medicinerar för hypertoni.</p>', 
        status_section: '<p><strong>Intraoralt:</strong> Bilateralt i buckalslemhinnan ses retikulära vita teckningar (Wickhams striae) blandat med erytematösa områden. Inga sår för tillfället.</p>', 
        category_slug: 'oralmedicin', 
        category_id: 'cat-4' 
      },
      { 
        id: 'mock-5', 
        title: 'Alveolit (Dry Socket)', 
        slug: 'mock-5', 
        patient_quote: 'Värken var borta i två dagar efter utdragningen, men nu är den tillbaka och värre än någonsin!', 
        anamnes: '<p>Tand 48 extraherades kirurgiskt för 4 dagar sedan. Initialt god läkning, men sedan igår kväll intensiv bultande smärta som strålar mot örat.</p>', 
        status_section: '<p><strong>Intraoralt:</strong> Alveolen efter 48 är tom på koagel. Blottat ben syns i botten. Illaluktande foetor ex ore. Ingen feber eller lymfadenit.</p>', 
        category_slug: 'kakkirurgi', 
        category_id: 'cat-5' 
      },
    ];

    // For this test phase, we ALWAYS return mock data if the DB connection might fail
    // or if we want a guaranteed result for the user.
    if (process.env.SUPABASE_SERVICE_ROLE_KEY?.includes('din-service-role') || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({
        sessionId: 'mock-session-id',
        scenarios: mockScenarios
      });
    }

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
