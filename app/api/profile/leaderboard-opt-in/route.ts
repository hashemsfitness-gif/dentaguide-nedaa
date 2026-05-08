import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import * as Sentry from '@sentry/nextjs';

const optInSchema = z.object({
  optIn: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = optInSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { optIn } = validated.data;
    const supabase = await createServerSupabase();

    const { error } = await supabase
      .from('profiles')
      .update({ leaderboard_opt_in: optIn })
      .eq('id', profile.id);

    if (error) throw error;

    return NextResponse.json({ success: true });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/profile/leaderboard-opt-in' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
