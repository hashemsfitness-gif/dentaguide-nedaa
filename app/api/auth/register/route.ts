import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/\d/, 'Lösenordet måste innehålla minst ett nummer.'),
  name: z.string().min(1).max(120),
  klinik: z.string().max(120).optional().default(''),
  specialist: z.string().max(80).optional().default(''),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Ogiltiga uppgifter', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { email, password, name, klinik, specialist } = parsed.data;

    const supabase = await createServerSupabase();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('user already')) {
        return NextResponse.json(
          { error: 'En användare med denna e-postadress finns redan.' },
          { status: 409 }
        );
      }
      Sentry.captureException(error, { tags: { route: '/api/auth/register' } });
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (data.user && (klinik || specialist)) {
      const service = createServiceSupabase();
      await service
        .from('profiles')
        .update({
          clinic_name: klinik || null,
          specialization: specialist || null,
        })
        .eq('id', data.user.id);
    }

    return NextResponse.json(
      {
        success: true,
        requiresEmailConfirmation: !data.session,
        message: data.session
          ? 'Konto skapat — du är inloggad.'
          : 'Konto skapat. Kontrollera din e-post för verifieringslänk.',
      },
      { status: 201 }
    );
  } catch (error) {
    Sentry.captureException(error, { tags: { route: '/api/auth/register' } });
    return NextResponse.json(
      { error: 'Internt serverfel' },
      { status: 500 }
    );
  }
}
