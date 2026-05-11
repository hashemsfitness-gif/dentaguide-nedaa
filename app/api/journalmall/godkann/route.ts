import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase';
import { aiJournalSchema, validateJournal } from '@/lib/journal-validator';

export const runtime = 'edge';

const godkannRequestSchema = z.object({
  logId: z.string().uuid(),
  decision: z.enum(['approve', 'reject']),
  finalData: aiJournalSchema.optional(),
  editsMade: z.boolean().default(false),
  acknowledgedResponsibility: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = godkannRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { logId, decision, finalData, editsMade, acknowledgedResponsibility } = parsed.data;

    if (decision === 'approve' && !acknowledgedResponsibility) {
      return NextResponse.json(
        {
          error: 'Responsibility not acknowledged',
          message: 'Du måste bekräfta granskningsansvar (PSL 2010:659) för att godkänna.',
        },
        { status: 400 }
      );
    }

    if (decision === 'approve' && finalData) {
      const revalidate = validateJournal(JSON.stringify(finalData));
      if (!revalidate.valid) {
        return NextResponse.json(
          {
            error: 'Validation failed on final data',
            issues: revalidate.issues,
          },
          { status: 422 }
        );
      }
    }

    const service = createServiceSupabase();
    const { data: existing, error: fetchError } = await service
      .from('ai_journal_logs')
      .select('id, user_id, user_approved_at')
      .eq('id', logId)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Log not found' }, { status: 404 });
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (existing.user_approved_at) {
      return NextResponse.json(
        { error: 'Log already finalized — immutable audit (PSL 2010:659)' },
        { status: 409 }
      );
    }

    const updatePayload: Record<string, unknown> = {
      user_approved: decision === 'approve',
      user_approved_at: new Date().toISOString(),
      edits_made: editsMade,
    };

    if (decision === 'approve' && finalData) {
      updatePayload.output_json = finalData;
    }

    const { error: updateError } = await service
      .from('ai_journal_logs')
      .update(updatePayload)
      .eq('id', logId);

    if (updateError) {
      Sentry.captureException(updateError, {
        tags: { route: 'api/journalmall/godkann' },
      });
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, decision });

  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: { route: 'api/journalmall/godkann' },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
