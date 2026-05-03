import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import * as Sentry from '@sentry/nextjs';

/**
 * app/api/cron/send-onboarding-emails/route.ts
 * Körs dagligen via Vercel Cron (vercel.json: "0 8 * * *")
 * Skickar välkomst- och uppföljningsmejl via Resend
 */

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function daysBetween(date1: Date, date2: Date): number {
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

/* ── Email templates ── */

function welcomeEmail(name: string) {
  return {
    subject: 'Välkommen till DentaGuide-Pro! 🦷',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#091b14">
        <img src="https://dentaguide-pro.se/logo/hexagon-2.png" alt="DentaGuide-Pro" width="60" style="margin-bottom:24px" />
        <h1 style="font-size:28px;font-weight:700;margin-bottom:12px">Välkommen, ${name}! 👋</h1>
        <p style="font-size:16px;line-height:1.6;color:#424845">
          Ditt konto är nu aktiverat. Här är tre saker du kan göra direkt:
        </p>
        <ol style="font-size:15px;line-height:1.8;color:#424845">
          <li>Sök bland <strong>82 kliniska scenarier</strong> med Cmd+K</li>
          <li>Prova <strong>doskalkylatorn</strong> i sidebar:en</li>
          <li>Ladda ner appen på din telefon (PWA)</li>
        </ol>
        <a href="https://dentaguide-pro.se/dashboard" style="display:inline-block;margin-top:24px;padding:14px 32px;background:#CC5833;color:white;border-radius:9999px;text-decoration:none;font-weight:700">
          Öppna DentaGuide-Pro →
        </a>
        <p style="margin-top:32px;font-size:11px;color:#9CA39F">
          PSL 2010:659 — DentaGuide-Pro ersätter inte kliniskt omdöme.
        </p>
      </div>
    `,
  };
}

function day3Email(name: string) {
  return {
    subject: 'Tips: Prova AI-journalen i DentaGuide-Pro 📝',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#091b14">
        <img src="https://dentaguide-pro.se/logo/hexagon-2.png" alt="DentaGuide-Pro" width="60" style="margin-bottom:24px" />
        <h1 style="font-size:24px;font-weight:700;margin-bottom:12px">Hej ${name} 👋</h1>
        <p style="font-size:16px;line-height:1.6;color:#424845">
          Har du provat <strong>AI-journalen</strong>? Den strukturerar dina anteckningar till korrekta journaltexter på under 5 minuter.
        </p>
        <p style="font-size:15px;line-height:1.6;color:#424845">
          Uppgradera till Kliniker-planen för att låsa upp AI-journalen (5 journaler/dag).
        </p>
        <a href="https://dentaguide-pro.se/pricing" style="display:inline-block;margin-top:24px;padding:14px 32px;background:#CC5833;color:white;border-radius:9999px;text-decoration:none;font-weight:700">
          Se alla funktioner →
        </a>
        <p style="margin-top:32px;font-size:11px;color:#9CA39F">
          PSL 2010:659 — DentaGuide-Pro ersätter inte kliniskt omdöme.
        </p>
      </div>
    `,
  };
}

function day7Email(name: string) {
  return {
    subject: 'En vecka med DentaGuide-Pro — hur går det? 🌟',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#091b14">
        <img src="https://dentaguide-pro.se/logo/hexagon-2.png" alt="DentaGuide-Pro" width="60" style="margin-bottom:24px" />
        <h1 style="font-size:24px;font-weight:700;margin-bottom:12px">Hej ${name}! 🎉</h1>
        <p style="font-size:16px;line-height:1.6;color:#424845">
          Du har nu använt DentaGuide-Pro i en vecka. Vi hoppas att det har gjort din kliniska vardag enklare!
        </p>
        <p style="font-size:15px;line-height:1.6;color:#424845">
          Kom ihåg: Du har <strong>30 dagars gratis provperiod</strong> på Kliniker-planen.
          Prova alla 82 scenarier och AI-journalen utan kostnad.
        </p>
        <a href="https://dentaguide-pro.se/pricing" style="display:inline-block;margin-top:24px;padding:14px 32px;background:#CC5833;color:white;border-radius:9999px;text-decoration:none;font-weight:700">
          Starta provperiod →
        </a>
        <p style="margin-top:16px;font-size:14px;color:#424845">
          Feedback? Svara direkt på det här mailet — vi läser allt! 💙
        </p>
        <p style="margin-top:32px;font-size:11px;color:#9CA39F">
          PSL 2010:659 — DentaGuide-Pro ersätter inte kliniskt omdöme.
        </p>
      </div>
    `,
  };
}

/* ── Route handler ── */

export async function GET(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization');
    const expected = `Bearer ${process.env.CRON_SECRET}`;
    if (authHeader !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    let sent = 0;
    let errors = 0;

    // Fetch all profiles that need emails
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, created_at, welcome_sent, day3_sent, day7_sent')
      .eq('welcome_sent', false)
      .or('day3_sent.eq.false,day7_sent.eq.false');

    if (profilesError) throw profilesError;
    if (!profiles || profiles.length === 0) {
      return NextResponse.json({ message: 'Inga mejl att skicka', sent: 0 });
    }

    for (const profile of profiles) {
      const createdAt = new Date(profile.created_at);
      const daysSince = daysBetween(createdAt, now);
      const name = profile.full_name?.split(' ')[0] ?? 'tandläkare';

      try {
        // Welcome email — samma dag
        if (!profile.welcome_sent && daysSince === 0) {
          const { subject, html } = welcomeEmail(name);
          await resend.emails.send({
            from: 'DentaGuide-Pro <hej@dentaguide-pro.se>',
            to: profile.email,
            subject,
            html,
          });
          await supabase.from('profiles').update({ welcome_sent: true }).eq('id', profile.id);
          sent++;
        }

        // Day 3 email
        if (!profile.day3_sent && daysSince === 3) {
          const { subject, html } = day3Email(name);
          await resend.emails.send({
            from: 'DentaGuide-Pro <hej@dentaguide-pro.se>',
            to: profile.email,
            subject,
            html,
          });
          await supabase.from('profiles').update({ day3_sent: true }).eq('id', profile.id);
          sent++;
        }

        // Day 7 email
        if (!profile.day7_sent && daysSince === 7) {
          const { subject, html } = day7Email(name);
          await resend.emails.send({
            from: 'DentaGuide-Pro <hej@dentaguide-pro.se>',
            to: profile.email,
            subject,
            html,
          });
          await supabase.from('profiles').update({ day7_sent: true }).eq('id', profile.id);
          sent++;
        }
      } catch (err) {
        errors++;
        Sentry.captureException(err, {
          extra: { profileId: profile.id, email: profile.email },
        });
      }
    }

    return NextResponse.json({
      message: 'Cron klar',
      sent,
      errors,
      processed: profiles.length,
    });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json(
      { error: 'Internt serverfel', detail: String(err) },
      { status: 500 }
    );
  }
}
