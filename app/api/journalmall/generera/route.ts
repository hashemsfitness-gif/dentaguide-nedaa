import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { claude, CLAUDE_MODEL } from '@/lib/claude';
import { validateJournal } from '@/lib/journal-validator';
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
    const supabase = await createClient();
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
            headers: rateLimitHeaders(result)
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

    const systemPrompt = `Du är AI-assistent som STRUKTURERAR journalanteckningar för svenska tandläkare.
ABSOLUTA REGLER:
1. HITTAR ALDRIG på medicinska fakta — strukturerar BARA tandläkarens text
2. Saknad info -> '[ej angivet]' eller '[behöver kompletteras]'
3. TLV/doser från tandläkarens text — annars '[verifiera kod]'
4. ALDRIG personuppgifter — använd [Patient], [PNR]
5. Output: ENBART JSON, ingen text före/efter, inga code fences
-VIKTIGT: ICD-koder visas ALDRIG i journaltext — bara i scenario-översikt.
JSON-struktur: anamnes, status, diagnos {trolig, icd_kod, differentialdiagnoser}, behandling {atgard, lokalanestesi, lakemedel, tlv_koder}, uppfoljning, roda_flaggor_observerade, anmarkningar`;

    const startTime = Date.now();

    const response = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      temperature: 0,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Strukturera följande text till en JSON-journal:\n\n${inputText}`
        }
      ]
    });

    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    const messageContent = response.content[0].type === 'text' ? response.content[0].text : '';
    const cleanJson = messageContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    const { valid, issues, data: journalData } = validateJournal(cleanJson);

    // Save log
    await supabase.from('ai_journal_logs').insert({
      user_id: user.id,
      prompt_summary: inputText.substring(0, 100) + '...',
      output_length: cleanJson.length,
      validation_passed: valid,
      validation_errors: issues,
      pii_detected: issues.some(i => i.includes('Personnummer')),
      fabrication_detected: issues.some(i => i.includes('Otillåtet uttryck')),
      icd_code_in_output: issues.some(i => i.includes('ICD')), // We don't have ICD check in validator yet, but standard log
      response_time_ms: responseTimeMs,
      status: valid ? 'completed' : 'failed',
      error_message: valid ? null : 'Validation failed'
    });

    if (!valid) {
      return NextResponse.json({
        error: 'Validation failed',
        issues,
        partialData: journalData,
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      data: journalData,
    });

  } catch (error: any) {
    console.error('AI Journal generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
