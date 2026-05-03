'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Inloggning misslyckades. Kontrollera dina uppgifter.');
        return;
      }
      router.push('/dashboard');
    } catch (err) {
      Sentry.captureException(err);
      setError('Ett oväntat fel uppstod. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    if (!email) { setError('Ange din e-postadress först.'); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Magic link misslyckades');
      setMagicSent(true);
    } catch (err) {
      Sentry.captureException(err);
      setError('Kunde inte skicka magic link. Försök igen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-theme="stitch-pro" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0d4a65 0%,#062f40 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#login-form" className="skip-link">Hoppa till inloggningsformulär</a>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-bento"
        style={{ maxWidth: '460px', width: '100%', padding: '3rem', position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo/hexagon-2.png" alt="DentaGuide-Pro logotyp" width={72} height={72} className="hex-logo-hero mb-4" />
          <h1 className="editorial-header text-3xl text-center" style={{ color: 'var(--primary)' }}>
            Välkommen tillbaka
          </h1>
          <p className="mt-1 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            Logga in till ditt DentaGuide-Pro-konto
          </p>
        </div>

        {/* Wave character */}
        <div className="absolute top-4 right-4" aria-hidden="true">
          <Image src="/characters/wave.gif" alt="" width={80} height={80} className="object-contain" unoptimized />
        </div>

        {/* Magic link success */}
        {magicSent && (
          <div className="mb-6 p-4 rounded-2xl text-sm" style={{ background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.3)', color: 'var(--status-ok)' }} role="status">
            ✓ Magic link skickat till {email} — kolla din e-post!
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl text-sm" style={{ background: 'rgba(193,18,31,0.08)', border: '1px solid rgba(193,18,31,0.25)', color: 'var(--status-danger)' }} role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {/* Form */}
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="din@email.se"
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Lösenord
              </label>
              <Link href="/reset-password" className="text-xs" style={{ color: 'var(--secondary)' }}>
                Glömt lösenord?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              aria-required="true"
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: 'var(--secondary)', width: '1rem', height: '1rem' }}
            />
            <label htmlFor="remember" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Kom ihåg mig
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', fontSize: '1rem' }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Loggar in…' : 'Logga in'}
          </button>
        </form>

        <button
          type="button"
          className="btn-outline"
          style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.875rem' }}
          onClick={handleMagicLink}
          disabled={loading}
        >
          Skicka magic link istället
        </button>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Inget konto?{' '}
          <Link href="/registrera" style={{ color: 'var(--secondary)', fontWeight: 600 }}>
            Registrera dig
          </Link>
        </p>

        <div className="mt-6 text-center">
          <p className="psl-footer" role="note">PSL 2010:659 — Ersätter inte kliniskt omdöme</p>
        </div>
      </motion.div>
    </div>
  );
}
