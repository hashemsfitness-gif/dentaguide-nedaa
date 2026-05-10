'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import * as Sentry from '@sentry/nextjs';

const STRIPE_PRICE_KLINIKER = process.env.NEXT_PUBLIC_STRIPE_PRICE_KLINIKER ?? '';
const STRIPE_PRICE_KLINIK = process.env.NEXT_PUBLIC_STRIPE_PRICE_KLINIK ?? '';

async function startCheckout(priceId: string) {
  try {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    if (!res.ok) throw new Error('Checkout misslyckades');
    const { url } = await res.json();
    window.location.href = url;
  } catch (err) {
    Sentry.captureException(err);
    alert('Något gick fel. Försök igen eller kontakta support.');
  }
}

const faqs = [
  { q: 'Kan jag avbryta när som helst?', a: 'Ja, månadsvis uppsägning utan bindningstid. Du behåller åtkomst till periodens slut.' },
  { q: 'Lagras patientdata?', a: 'Nej. DentaGuide-Pro är mallbaserat. All text du skriver stannar på din enhet (PSL 2010:659).' },
  { q: 'Vad händer om jag uppgraderar mitt-i-månaden?', a: 'Du får en pro-rated faktura — du betalar bara för de dagar du använder premiumfunktioner.' },
  { q: 'Erbjuder ni klinikrabatter?', a: 'Ja. Kontakta oss för grupper om 10+ användare och få skräddarsytt erbjudande.' },
  { q: 'Är AI:n verifierad?', a: 'Ja. Alla AI-utdata är validerade mot Strama 2024, FASS och NotebookLM-källor.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          style={{
            fontSize: '1.2rem',
            color: 'var(--secondary)',
            transition: 'transform 0.3s',
            display: 'inline-block',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="accordion-content">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div data-theme="stitch-pro">
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#pricing-main" className="skip-link">Hoppa till innehåll</a>

      {/* Header */}
      <header className="public-header">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="DentaGuide-Pro startsida">
            <Image src="/logo/logo-hexagon-dark.png" alt="" width={40} height={40} className="hex-logo-nav" aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'white', fontSize: '1.3rem', fontWeight: 600 }}>
              DentaGuide-Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
            <Link href="/#features" className="nav-link-light">Funktioner</Link>
            <Link href="/login" className="nav-link-light">Logga in</Link>
          </nav>
          <Link href="/registrera">
            <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>Kom igång gratis</button>
          </Link>
        </div>
      </header>

      <main id="pricing-main" className="pricing-section" style={{ paddingTop: '5rem' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-4"
          >
            <h1 className="editorial-header" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)' }}>
              Välj din plan
            </h1>
            <p className="mt-3" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              30 dagars gratis provperiod på alla betalda planer. Ingen kreditkort krävs.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

            {/* Gratis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="price-card"
            >
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>Gratis</h2>
              <div className="mb-6">
                <span className="editorial-header text-5xl" style={{ color: 'var(--primary)' }}>0</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> kr/mån</span>
              </div>
              <ul className="mb-8 space-y-3" aria-label="Inkluderat i gratis">
                {[
                  { t: '3 områden (10 scenarier)', ok: true },
                  { t: 'Manuell journalmall', ok: true },
                  { t: 'Doseringskalkylator (basic)', ok: true },
                  { t: 'AI-journal', ok: false },
                  { t: 'Premium-verktyg', ok: false },
                ].map((f) => (
                  <li key={f.t} className="flex items-center gap-2 text-sm" style={{ color: f.ok ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    <span style={{ color: f.ok ? 'var(--status-ok)' : 'var(--text-muted)' }} aria-hidden="true">{f.ok ? '✓' : '✗'}</span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <Link href="/registrera" className="block">
                <button className="btn-outline" style={{ width: '100%' }}>Kom igång gratis</button>
              </Link>
            </motion.div>

            {/* Kliniker – featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="price-card price-card-featured"
              style={{ transform: 'translateY(-8px)' }}
            >
              <div className="text-center mb-3">
                <span className="badge" style={{ background: 'rgba(204,88,51,0.12)', color: '#CC5833' }}>Mest populär</span>
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>Kliniker</h2>
              <div className="mb-6">
                <span className="editorial-header text-5xl" style={{ color: 'var(--secondary)' }}>99</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> kr/mån</span>
              </div>
              <ul className="mb-8 space-y-3" aria-label="Inkluderat i Kliniker">
                {[
                  'Alla 12 områden (82 scenarier)',
                  'AI-journal (5/dag)',
                  'Alla verktyg',
                  'Bokmärken & anteckningar',
                  'Email-support',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--status-ok)' }} aria-hidden="true">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => startCheckout(STRIPE_PRICE_KLINIKER)}
                aria-label="Starta provperiod Kliniker"
              >
                Starta provperiod
              </button>
            </motion.div>

            {/* Klinik */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="price-card"
            >
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>Klinik</h2>
              <div className="mb-6">
                <span className="editorial-header text-5xl" style={{ color: 'var(--primary)' }}>399</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> kr/mån</span>
              </div>
              <ul className="mb-8 space-y-3" aria-label="Inkluderat i Klinik">
                {[
                  'Allt i Kliniker',
                  '5 användare per klinik',
                  'AI-journal (100/dag)',
                  'Admin-panel',
                  'Prioriterad support',
                  'API-åtkomst (kommer)',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--status-ok)' }} aria-hidden="true">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="btn-outline"
                style={{ width: '100%' }}
                onClick={() => startCheckout(STRIPE_PRICE_KLINIK)}
                aria-label="Starta provperiod Klinik"
              >
                Kontakta oss
              </button>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <Image src="/characters/think.gif" alt="" width={50} height={50} unoptimized aria-hidden="true" />
              <h2 className="editorial-header text-3xl" style={{ color: 'var(--primary)' }}>Vanliga frågor</h2>
            </div>
            <div className="max-w-2xl">
              {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </motion.div>

          {/* PSL */}
          <div className="mt-16 pb-16 text-center">
            <p className="psl-footer" role="note">PSL 2010:659 — Ersätter inte kliniskt omdöme</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="public-footer" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="psl-footer" role="note">
            PSL 2010:659 — DentaGuide-Pro är ett beslutsstöd och ersätter inte kliniskt omdöme
          </p>
          <p className="mt-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
            © 2026 DentaGuide-Pro. Alla rättigheter förbehållna.
          </p>
        </div>
      </footer>
    </div>
  );
}
