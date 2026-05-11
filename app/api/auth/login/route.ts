import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { createServerSupabase } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Ogiltiga uppgifter' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const supabase = await createServerSupabase();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
        return NextResponse.json(
          { error: 'Fel e-post eller lösenord.' },
          { status: 401 }
        );
      }
      if (msg.includes('email not confirmed')) {
        return NextResponse.json(
          { error: 'E-postadressen är inte verifierad. Kontrollera din inkorg.' },
          { status: 403 }
        );
      }
      Sentry.captureException(error, { tags: { route: '/api/auth/login' } });
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, user: { id: data.user.id, email: data.user.email } },
      { status: 200 }
    );
  } catch (error) {
    Sentry.captureException(error, { tags: { route: '/api/auth/login' } });
    return NextResponse.json(
      { error: 'Internt serverfel' },
      { status: 500 }
    );
  }
}
