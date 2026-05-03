'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─────────────────────────────────────────
   Scroll-following character
───────────────────────────────────────── */
function ScrollCharacter() {
  const { scrollYProgress } = useScroll();
  const [src, setSrc] = useState('/characters/wave.gif');
  const [show, setShow] = useState(false);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    return scrollYProgress.on('change', (v) =>
      setSrc(v < 0.5 ? '/characters/wave.gif' : '/characters/hug.jpg')
    );
  }, [scrollYProgress, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          aria-label="Scrolla till toppen"
          className="fixed bottom-6 right-6 z-40 border-0 bg-transparent p-0 cursor-pointer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
          whileHover={{ scale: 1.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image
            src={src}
            alt="DentaGuide karaktär"
            width={120}
            height={120}
            className="drop-shadow-xl object-contain"
            unoptimized
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const testimonials = [
  { q: 'Sparar mig 30 minuter per dag.', name: 'Dr. Anna L.', role: 'AT-tandläkare, Göteborg' },
  { q: 'Strama-riktlinjerna alltid till hands.', name: 'Dr. Erik J.', role: 'Folktandvården, Stockholm' },
  { q: 'AI-journalen är revolutionerande.', name: 'Dr. Maria K.', role: 'Privatklinik, Malmö' },
];

const plans = [
  {
    name: 'Gratis', price: '0', features: ['3 områden (10 scenarier)', 'Manuell journalmall', 'Doseringskalkylator'],
    cta: 'Kom igång gratis', href: '/registrera', featured: false,
  },
  {
    name: 'Kliniker', price: '99', features: ['Alla 82 scenarier', 'AI-journal (5/dag)', 'Alla verktyg', 'Email-support'],
    cta: 'Prova 30 dagar gratis', href: '/pricing', featured: true,
  },
  {
    name: 'Klinik', price: '399', features: ['5 användare', 'AI-journal (100/dag)', 'Admin-panel', 'Prioriterad support'],
    cta: 'Kontakta oss', href: '/pricing', featured: false,
  },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function LandingPage() {
  const featuresRef = useRef<HTMLElement>(null);

  return (
    <div data-theme="stitch-pro">
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Skip link */}
      <a href="#main-content" className="skip-link">Hoppa till innehåll</a>

      {/* ══════════════ HEADER ══════════════ */}
      <header className="public-header">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="DentaGuide-Pro">
            <Image src="/logo/hexagon-2.png" alt="" width={40} height={40} className="hex-logo-nav" aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'white', fontSize: '1.3rem', fontWeight: 600 }}>
              DentaGuide-Pro
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
            <button
              className="nav-link-light bg-transparent border-0 cursor-pointer"
              onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Funktioner
            </button>
            <Link href="/pricing" className="nav-link-light">Priser</Link>
            <Link href="/login" className="nav-link-light">Logga in</Link>
          </nav>

          {/* CTA */}
          <Link href="/registrera">
            <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
              Kom igång gratis
            </button>
          </Link>
        </div>
      </header>

      {/* ══════════════ MAIN ══════════════ */}
      <main id="main-content">

        {/* ── HERO ── */}
        <section className="landing-hero" aria-labelledby="hero-heading">
          {/* Sparkles */}
          {[
            { top: '25%', right: '14%', delay: '0s', dur: '2.5s' },
            { top: '40%', right: '9%', delay: '0.9s', dur: '3.2s' },
            { top: '60%', right: '17%', delay: '1.5s', dur: '2.8s' },
            { top: '72%', right: '7%', delay: '0.3s', dur: '3.5s' },
          ].map((s, i) => (
            <div
              key={i}
              className="sparkle"
              aria-hidden="true"
              style={{ top: s.top, right: s.right, ['--delay' as string]: s.delay, ['--duration' as string]: s.dur }}
            />
          ))}

          <div className="max-w-7xl mx-auto px-6 w-full py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

              {/* Left 60% */}
              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
                  <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Certifieringar">
                    {['Strama 2024', 'FASS', 'NAG/SKR', 'PSL 2010:659'].map((b) => (
                      <span key={b} className="trust-badge" role="listitem">{b}</span>
                    ))}
                  </div>

                  <h1
                    id="hero-heading"
                    className="editorial-header text-white mb-6 leading-tight"
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
                  >
                    Kliniskt beslutsstöd som tänker med dig
                  </h1>

                  <p className="mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', maxWidth: '500px' }}>
                    82 evidensbaserade scenarier. AI-journalstöd. Allt direkt vid patientstolen.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/registrera">
                      <button className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}>
                        Starta gratis
                      </button>
                    </Link>
                    <button
                      className="btn-outline-white"
                      onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Se demo
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right 40% */}
              <div className="lg:col-span-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                  className="relative"
                >
                  <Image
                    src="/logo/hexagon-2.png"
                    alt="DentaGuide-Pro logotyp"
                    width={300}
                    height={300}
                    className="hex-logo-hero"
                    priority
                  />
                  {/* Wave character */}
                  <div className="absolute -bottom-2 -right-2">
                    <Image
                      src="/characters/wave.gif"
                      alt="DentaGuide vinkar välkommen"
                      width={150}
                      height={150}
                      className="drop-shadow-xl object-contain"
                      unoptimized
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ANIMATED LOGO VIDEO ── */}
        <section className="logo-video-section" aria-label="DentaGuide i rörelse">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8"
            >
              <h2 className="editorial-header text-3xl mb-3" style={{ color: 'var(--primary)' }}>
                Designat för kliniken
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Snabbt, intuitivt och alltid redo — precis som du behöver det.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="logo-video-wrapper"
            >
              <video
                src="/logo/logo-animated.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Animerad DentaGuide-Pro logotyp"
              />
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section ref={featuresRef} id="features" className="features-section" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 id="features-heading" className="editorial-header text-4xl mb-4" style={{ color: 'var(--primary)' }}>
                Allt du behöver. Inget du inte behöver.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Byggd av tandläkare, för tandläkare.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
                className="feature-card"
              >
                <span className="feature-number" aria-label="82">82</span>
                <h3 className="text-xl font-bold mt-2 mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                  Kliniska scenarier
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Evidensbaserade beslutsstöd för alla vanliga situationer.
                </p>
                <div className="mt-6 flex justify-end" aria-hidden="true">
                  <Image src="/characters/think.gif" alt="" width={80} height={80} unoptimized className="opacity-90" />
                </div>
              </motion.div>

              {/* Card 2 – featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="feature-card feature-card-featured"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="feature-number">5 min</span>
                  <span className="badge" style={{ background: 'rgba(204,88,51,0.12)', color: '#CC5833', borderColor: 'rgba(204,88,51,0.3)' }}>
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                  AI-journal
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  AI-strukturerar dina anteckningar till standardiserade journaltexter.
                </p>
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(249,247,242,0.9)', border: '1px solid rgba(226,232,240,0.8)' }}>
                  <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    <span style={{ color: 'var(--secondary)' }}>Status:</span> Akut pulpit UL6<br />
                    <span style={{ color: 'var(--secondary)' }}>Åtgärd:</span> Pulpaextirpation utförd<br />
                    <span style={{ color: 'var(--secondary)' }}>Nästa:</span> Rotfyllning bokas
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="feature-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0d4a65,#062f40)' }}>
                    <span className="text-2xl" role="img" aria-label="Mobil">📱</span>
                  </div>
                  <span className="badge" style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}>PWA Offline</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                  Mobil-först
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Fungerar offline direkt vid stolen. Installera som app på din telefon.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials-section" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="testimonials-heading" className="editorial-header text-4xl mb-3" style={{ color: 'var(--primary)' }}>
                Tandläkare älskar DentaGuide
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="testimonial-card"
                >
                  <div className="flex gap-1 mb-3" aria-label="5 stjärnor">
                    {[...Array(5)].map((_, j) => <span key={j} aria-hidden="true" style={{ color: '#C9A84C' }}>★</span>)}
                  </div>
                  <p className="mb-4" style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>"{t.q}"</p>
                  <footer>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.name}</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.role}</p>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING PREVIEW ── */}
        <section className="pricing-section" aria-labelledby="pricing-heading">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="pricing-heading" className="editorial-header text-4xl mb-3" style={{ color: 'var(--primary)' }}>
                Enkla priser
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>Börja gratis — uppgradera när du är redo.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`price-card${plan.featured ? ' price-card-featured' : ''}`}
                >
                  {plan.featured && (
                    <div className="text-center mb-3">
                      <span className="badge" style={{ background: 'rgba(204,88,51,0.12)', color: '#CC5833' }}>Mest populär</span>
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="editorial-header text-4xl" style={{ color: plan.featured ? 'var(--secondary)' : 'var(--primary)' }}>
                      {plan.price}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> kr/mån</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--status-ok)' }} aria-hidden="true">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className="block">
                    <button className={plan.featured ? 'btn-primary' : 'btn-outline'} style={{ width: '100%' }}>
                      {plan.cta}
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pricing" style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Se alla priser och funktioner →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="cta-section" aria-labelledby="cta-heading">
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <Image
                  src="/characters/hug.jpg"
                  alt="DentaGuide kramar dig välkommen"
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-2xl"
                  style={{ borderRadius: '50%' }}
                  unoptimized
                />
              </div>
              <h2 id="cta-heading" className="editorial-header text-white mb-4" style={{ fontSize: '2.6rem' }}>
                Redo att modernisera din klinik?
              </h2>
              <p className="mb-8" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem' }}>
                Kom igång gratis idag — ingen kreditkortsinformation krävs.
              </p>
              <Link href="/registrera">
                <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '1.1rem 2.8rem' }}>
                  Starta gratis idag
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="public-footer" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Image src="/logo/hexagon-2.png" alt="" width={28} height={28} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'white', fontSize: '1rem' }}>
                DentaGuide-Pro
              </span>
            </div>
            <nav aria-label="Sidfotslänkar" className="flex flex-wrap gap-6">
              {[['Om', '/om'], ['Kontakt', '/kontakt'], ['Integritet', '/integritet'], ['Villkor', '/villkor']].map(([label, href]) => (
                <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t pt-4 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="psl-footer" role="note">
              PSL 2010:659 — DentaGuide-Pro är ett beslutsstöd och ersätter inte kliniskt omdöme
            </p>
            <p className="mt-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              © 2026 DentaGuide-Pro. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll character */}
      <ScrollCharacter />
    </div>
  );
}
