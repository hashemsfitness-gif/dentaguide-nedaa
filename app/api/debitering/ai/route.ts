import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { claude, CLAUDE_MODEL } from '@/lib/claude';
import { getAiLimiter, checkRateLimit, rateLimitHeaders } from '@/lib/ratelimit';

export const runtime = 'edge';

const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.string(),
    content: z.string()
  })).min(1),
  system: z.string().optional(),
  temperature: z.number().optional().default(0),
  max_tokens: z.number().optional().default(1500)
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
        { error: 'Premium required for AI features' },
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
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { messages, system, temperature, max_tokens } = validationResult.data;

    const response = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens,
      temperature,
      system: system || '',
      messages: messages as any
    });

    const messageContent = response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({
      success: true,
      content: messageContent,
    });

  } catch (error: any) {
    console.error('AI Debitering generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
