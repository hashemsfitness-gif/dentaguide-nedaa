import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";

/**
 * lib/email.ts — Resend integration
 * Templates: welcome, onboarding series (3 emails), password reset
 */

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "DentaGuide-Pro <noreply@dentaguide-pro.se>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://dentaguide-pro.se";

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<SendEmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: { component: "email" },
        extra: { to, subject },
      });
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { component: "email" },
      extra: { to, subject },
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ── Welcome Email ───────────────────────────────────────────

export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<SendEmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #061E2B; color: #E2E8F0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #0A2D3F; border-radius: 16px; padding: 40px; border: 1px solid #145A7A;">
    <h1 style="color: #38A1D4; font-size: 24px; margin: 0 0 16px;">🦷 Välkommen till DentaGuide-Pro!</h1>
    <p>Hej ${name || "kollega"},</p>
    <p>Tack för att du valde DentaGuide-Pro — ditt kliniska beslutsstöd vid patientstolen.</p>
    <p>Kom igång direkt:</p>
    <ul style="padding-left: 20px;">
      <li>📋 82 kliniska scenarier</li>
      <li>💊 Doseringskalkylatorn med maxdos-spärrar</li>
      <li>🤖 AI-assisterad journalstrukturering</li>
      <li>⌨️ Snabbkommandon (Cmd+K för sökning)</li>
    </ul>
    <a href="${APP_URL}/dashboard" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #1A7AA3; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Öppna Dashboard →</a>
    <hr style="border: none; border-top: 1px solid #145A7A; margin: 24px 0;">
    <p style="font-size: 12px; color: #6BBDE3;">⚠️ PSL 2010:659 — DentaGuide-Pro ersätter inte kliniskt omdöme.</p>
  </div>
</body>
</html>`;

  return sendEmail(to, "Välkommen till DentaGuide-Pro! 🦷", html);
}

// ── Onboarding Email 1 (Day 1) ──────────────────────────────

export async function sendOnboardingEmail1(
  to: string,
  name: string
): Promise<SendEmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #061E2B; color: #E2E8F0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #0A2D3F; border-radius: 16px; padding: 40px; border: 1px solid #145A7A;">
    <h1 style="color: #38A1D4; font-size: 24px; margin: 0 0 16px;">Tips #1: Hitta rätt scenario snabbt</h1>
    <p>Hej ${name || "kollega"},</p>
    <p>Visste du att du kan söka bland alla 82 scenarier med <strong>Cmd+K</strong> (Mac) eller <strong>Ctrl+K</strong> (Windows)?</p>
    <p>Prova att söka på "pulpit", "alveolit" eller "trauma" för att hitta relevanta scenarier direkt.</p>
    <a href="${APP_URL}/dashboard" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #1A7AA3; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Testa nu →</a>
    <hr style="border: none; border-top: 1px solid #145A7A; margin: 24px 0;">
    <p style="font-size: 12px; color: #6BBDE3;">⚠️ PSL 2010:659 — Ersätter inte kliniskt omdöme.</p>
  </div>
</body>
</html>`;

  return sendEmail(to, "Tips: Hitta rätt scenario på sekunder ⚡", html);
}

// ── Onboarding Email 2 (Day 3) ──────────────────────────────

export async function sendOnboardingEmail2(
  to: string,
  name: string
): Promise<SendEmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #061E2B; color: #E2E8F0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #0A2D3F; border-radius: 16px; padding: 40px; border: 1px solid #145A7A;">
    <h1 style="color: #38A1D4; font-size: 24px; margin: 0 0 16px;">Tips #2: AI-journalskrivning</h1>
    <p>Hej ${name || "kollega"},</p>
    <p>Spara tid med vår AI-assisterade journalstrukturering. Skriv in din kliniska observation och få ett strukturerat journalutkast — komplett med anamnes, status och behandling.</p>
    <p><strong>Viktig:</strong> AI-utkastet måste alltid granskas av dig innan sparning.</p>
    <a href="${APP_URL}/dashboard/verktyg/journal-ai" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #1A7AA3; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Testa AI-journal →</a>
    <hr style="border: none; border-top: 1px solid #145A7A; margin: 24px 0;">
    <p style="font-size: 12px; color: #6BBDE3;">⚠️ PSL 2010:659 — Ersätter inte kliniskt omdöme.</p>
  </div>
</body>
</html>`;

  return sendEmail(to, "Spara 30 min/dag med AI-journal 🤖", html);
}

// ── Onboarding Email 3 (Day 7) ──────────────────────────────

export async function sendOnboardingEmail3(
  to: string,
  name: string
): Promise<SendEmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #061E2B; color: #E2E8F0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #0A2D3F; border-radius: 16px; padding: 40px; border: 1px solid #145A7A;">
    <h1 style="color: #38A1D4; font-size: 24px; margin: 0 0 16px;">Uppgradera till Premium 🌟</h1>
    <p>Hej ${name || "kollega"},</p>
    <p>Du har nu använt DentaGuide-Pro i en vecka! Med Premium får du:</p>
    <ul style="padding-left: 20px;">
      <li>Alla 82 kliniska scenarier</li>
      <li>100 AI-journaler per dag</li>
      <li>Avancerad dosering och antibiotikastöd</li>
      <li>Simulator för utbildning</li>
    </ul>
    <a href="${APP_URL}/priser" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #D4A745; color: #061E2B; text-decoration: none; border-radius: 8px; font-weight: 700;">Se priser →</a>
    <hr style="border: none; border-top: 1px solid #145A7A; margin: 24px 0;">
    <p style="font-size: 12px; color: #6BBDE3;">⚠️ PSL 2010:659 — Ersätter inte kliniskt omdöme.</p>
  </div>
</body>
</html>`;

  return sendEmail(to, "Lås upp alla funktioner — 14 dagars gratis 🌟", html);
}

// ── Password Reset Email ────────────────────────────────────

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<SendEmailResult> {
  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #061E2B; color: #E2E8F0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #0A2D3F; border-radius: 16px; padding: 40px; border: 1px solid #145A7A;">
    <h1 style="color: #38A1D4; font-size: 24px; margin: 0 0 16px;">Återställ lösenord</h1>
    <p>Du har begärt att återställa ditt lösenord för DentaGuide-Pro.</p>
    <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #1A7AA3; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Återställ lösenord →</a>
    <p style="font-size: 13px; color: #A3D6EF;">Länken är giltig i 1 timme. Om du inte begärde detta kan du ignorera mejlet.</p>
  </div>
</body>
</html>`;

  return sendEmail(to, "Återställ ditt lösenord — DentaGuide-Pro", html);
}
