import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase';
import { claude, CLAUDE_MODEL } from '@/lib/claude';
import { validateJournal, detectPiiInInput } from '@/lib/journal-validator';
import { getAiLimiter, checkRateLimit, rateLimitHeaders } from '@/lib/ratelimit';

export const runtime = 'edge';

const generateRequestSchema = z.object({
  inputText: z.string()
    .min(10, 'För kort text')
    .max(2000, 'Max 2000 tecken tillåtna'),
  context: z.object({
    age: z.number().optional(),
    isAcute: z.boolean().optional(),
  }).optional(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();

    const tier = profile?.tier || 'free';

    if (tier === 'free') {
      return NextResponse.json(
        { error: 'Premium required' },
        { status: 403 }
      );
    }

    const limiter = getAiLimiter(tier as 'kliniker' | 'klinik');
    if (limiter) {
      const result = await checkRateLimit(limiter, user.id);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          {
            status: 429,
            headers: rateLimitHeaders(result),
          }
        );
      }
    }

    const body = await req.json();
    const validationResult = generateRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { inputText } = validationResult.data;

    if (detectPiiInInput(inputText)) {
      return NextResponse.json(
        {
          error: 'PII detected',
          message: 'Personuppgifter (personnummer/samordningsnummer) hittades i inmatningen. Använd platshållare som [Patient] istället.',
        },
        { status: 400 }
      );
    }

    const systemPrompt = `Du är AI-assistent som STRUKTURERAR journalanteckningar för svenska tandläkare.
ABSOLUTA REGLER:
1. HITTAR ALDRIG på medicinska fakta — strukturerar BARA tandläkarens text
2. Saknad info -> '[ej angivet]' eller '[behöver kompletteras]'
3. TLV/doser från tandläkarens text — annars '[verifiera kod]'
4. ALDRIG personuppgifter — använd [Patient], [PNR]
5. Output: ENBART JSON, ingen text före/efter, inga code fences
6. ICD-koder visas ALDRIG i journaltext (anamnes/status/behandling/uppfoljning/anmarkningar) — endast i diagnos.icd_kod
7. Antibiotika: PcV (1,6 g × 3) är förstahandsval. Klindamycin (150 mg × 3) vid pc-allergi. Amoxicillin endast vid endokarditprofylax (ESC 2023)
8. Använd ALDRIG ord som "ungefär", "cirka", "vanligtvis", "brukar", "troligtvis", "förmodligen" — strukturera bara fakta från tandläkarens text
JSON-struktur: anamnes, status, diagnos {trolig, icd_kod, differentialdiagnoser}, behandling {atgard, lokalanestesi, lakemedel, tlv_koder}, uppfoljning, roda_flaggor_observerade (array), anmarkningar (string)`;

    const startTime = Date.now();

    const response = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2500,
      temperature: 0,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Strukturera följande text till en JSON-journal:\n\n${inputText}`,
        },
      ],
    });

    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    const messageContent = response.content[0].type === 'text' ? response.content[0].text : '';
    const cleanJson = messageContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    const { valid, issues, warnings, data: journalData, flags } = validateJournal(cleanJson);

    const inputTokens = response.usage?.input_tokens ?? 0;
    const outputTokens = response.usage?.output_tokens ?? 0;

    const serviceSupabase = createServiceSupabase();
    const logInsert = await serviceSupabase.from('ai_journal_logs').insert({
      user_id: user.id,
      model: CLAUDE_MODEL,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_tokens: inputTokens + outputTokens,
      prompt_summary: inputText.substring(0, 100),
      output_length: cleanJson.length,
      output_json: valid ? journalData : null,
      validation_passed: valid,
      validation_errors: issues,
      pii_detected: flags.piiDetected,
      fabrication_detected: flags.fabricationDetected,
      icd_code_in_output: flags.icdInJournalText,
      response_time_ms: responseTimeMs,
      status: valid ? 'completed' : 'failed',
      error_message: valid ? null : 'Validation failed',
      edits_made: false,
      user_approved: null,
    }).select('id').single();

    const logId = logInsert.data?.id ?? null;

    if (!valid) {
      return NextResponse.json({
        error: 'Validation failed',
        issues,
        warnings,
        partialData: journalData,
        logId,
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      data: journalData,
      warnings,
      logId,
    });

  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: { route: 'api/journalmall/generera' },
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
