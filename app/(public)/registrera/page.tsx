'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';

const specialistOptions = [
  { value: '', label: 'Välj (valfri)' },
  { value: 'at', label: 'AT-tandläkare' },
  { value: 'allman', label: 'Allmäntandläkare' },
  { value: 'specialist-endodonti', label: 'Specialist — Endodonti' },
  { value: 'specialist-oralsurgery', label: 'Specialist — Oral kirurgi' },
  { value: 'specialist-parodontologi', label: 'Specialist — Parodontologi' },
  { value: 'specialist-ortodonti', label: 'Specialist — Ortodonti' },
  { value: 'specialist-pedodonti', label: 'Specialist — Pedodonti' },
  { value: 'specialist-protetik', label: 'Specialist — Protetik' },
];

function PasswordStrength({ password }: { password: string }) {
  const hasMin = password.length >= 8;
  const hasNum = /\d/.test(password);
  const strength = [hasMin, hasNum].filter(Boolean).length;
  const colors = ['transparent', '#E07B39', '#2D6A4F'];
  const labels = ['', 'Svagt', 'Starkt'];
  return (
    <div className="mt-2 flex items-center gap-2">
      {[0, 1].map((i) => (
        <div key={i} style={{ height: '4px', flex: 1, borderRadius: '9999px', background: i < strength ? colors[strength] : 'var(--border-light)', transition: 'background 0.3s' }} />
      ))}
      <span style={{ fontSize: '0.7rem', color: colors[strength] || 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: '3rem' }}>
        {labels[strength]}
      </span>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    klinik: '',
    specialist: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ange en giltig e-postadress.';
    if (form.password.length < 8) e.password = 'Lösenordet måste ha minst 8 tecken.';
    if (!/\d/.test(form.password)) e.password = 'Lösenordet måste innehålla minst ett nummer.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Lösenorden matchar inte.';
    if (!form.name.trim()) e.name = 'Ange ditt fullständiga namn.';
    if (!form.acceptTerms) e.acceptTerms = 'Du måste godkänna villkoren.';
    if (!form.acceptPrivacy) e.acceptPrivacy = 'Du måste godkänna integritetspolicyn.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          klinik: form.klinik,
          specialist: form.specialist,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ form: data.error ?? 'Registrering misslyckades.' });
        return;
      }
      router.push('/dashboard?onboarding=true');
    } catch (err) {
      Sentry.captureException(err);
      setErrors({ form: 'Ett oväntat fel uppstod. Försök igen.' });
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field: string) => ({
    borderColor: errors[field] ? 'var(--status-danger)' : undefined,
  });

  return (
    <div data-theme="stitch-pro" style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0d4a65 0%,#062f40 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#register-form" className="skip-link">Hoppa till registreringsformulär</a>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-bento"
        style={{ maxWidth: '520px', width: '100%', padding: '3rem', position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo/hexagon-2.png" alt="DentaGuide-Pro" width={64} height={64} className="hex-logo-hero mb-4" />
          <h1 className="editorial-header text-3xl text-center" style={{ color: 'var(--primary)' }}>
            Skapa konto
          </h1>
          <p className="mt-1 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            Kom igång gratis — inga kortuppgifter krävs
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 rounded-2xl text-sm" style={{ background: 'rgba(193,18,31,0.08)', border: '1px solid rgba(193,18,31,0.25)', color: 'var(--status-danger)' }} role="alert" aria-live="assertive">
            {errors.form}
          </div>
        )}

        <form id="register-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="reg-email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>E-postadress *</label>
            <input id="reg-email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className="form-input" style={inputStyle('email')} placeholder="din@email.se" aria-describedby={errors.email ? 'email-err' : undefined} />
            {errors.email && <p id="email-err" className="mt-1 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.email}</p>}
          </div>

          {/* Namn */}
          <div className="mb-4">
            <label htmlFor="reg-name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Fullständigt namn *</label>
            <input id="reg-name" type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} className="form-input" style={inputStyle('name')} placeholder="Dr. Förnamn Efternamn" />
            {errors.name && <p className="mt-1 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.name}</p>}
          </div>

          {/* Lösenord */}
          <div className="mb-4">
            <label htmlFor="reg-password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Lösenord * <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>(min 8 tecken, 1 nummer)</span></label>
            <input id="reg-password" type="password" required minLength={8} value={form.password} onChange={(e) => set('password', e.target.value)} className="form-input" style={inputStyle('password')} placeholder="••••••••" />
            <PasswordStrength password={form.password} />
            {errors.password && <p className="mt-1 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.password}</p>}
          </div>

          {/* Bekräfta lösenord */}
          <div className="mb-4">
            <label htmlFor="reg-confirm" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Bekräfta lösenord *</label>
            <input id="reg-confirm" type="password" required value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} className="form-input" style={inputStyle('confirmPassword')} placeholder="••••••••" />
            {errors.confirmPassword && <p className="mt-1 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.confirmPassword}</p>}
          </div>

          {/* Klinik (valfri) */}
          <div className="mb-4">
            <label htmlFor="reg-klinik" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Klinik <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(valfri)</span></label>
            <input id="reg-klinik" type="text" value={form.klinik} onChange={(e) => set('klinik', e.target.value)} className="form-input" placeholder="Din kliniksnamn" />
          </div>

          {/* Specialist (valfri) */}
          <div className="mb-6">
            <label htmlFor="reg-specialist" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Specialistexamen <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(valfri)</span></label>
            <select
              id="reg-specialist"
              value={form.specialist}
              onChange={(e) => set('specialist', e.target.value)}
              className="form-input"
              style={{ appearance: 'auto' }}
            >
              {specialistOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Terms */}
          <div className="mb-3 flex items-start gap-3">
            <input id="terms" type="checkbox" checked={form.acceptTerms} onChange={(e) => set('acceptTerms', e.target.checked)} style={{ accentColor: 'var(--secondary)', marginTop: '2px', width: '1rem', height: '1rem', flexShrink: 0 }} aria-required="true" />
            <label htmlFor="terms" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Jag godkänner{' '}
              <Link href="/villkor" target="_blank" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>användarvillkoren</Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="mb-3 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.acceptTerms}</p>}

          <div className="mb-6 flex items-start gap-3">
            <input id="privacy" type="checkbox" checked={form.acceptPrivacy} onChange={(e) => set('acceptPrivacy', e.target.checked)} style={{ accentColor: 'var(--secondary)', marginTop: '2px', width: '1rem', height: '1rem', flexShrink: 0 }} aria-required="true" />
            <label htmlFor="privacy" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Jag godkänner{' '}
              <Link href="/integritet" target="_blank" style={{ color: 'var(--secondary)', textDecoration: 'underline' }}>integritetspolicyn</Link>
            </label>
          </div>
          {errors.acceptPrivacy && <p className="mb-3 text-xs" style={{ color: 'var(--status-danger)' }} role="alert">{errors.acceptPrivacy}</p>}

          <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1rem' }} disabled={loading} aria-busy={loading}>
            {loading ? 'Skapar konto…' : 'Skapa konto gratis'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Har du redan ett konto?{' '}
          <Link href="/login" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Logga in</Link>
        </p>

        <div className="mt-6 text-center">
          <p className="psl-footer" role="note">PSL 2010:659 — Ersätter inte kliniskt omdöme</p>
        </div>
      </motion.div>
    </div>
  );
}
