import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import LogoutButton from '@/components/landing/LogoutButton';
import ScrollCompanion from '@/components/landing/ScrollCompanion';
import '../(public)/landing.css';

export const metadata = {
  title: 'Premium krävs | DentaGuide-Pro',
};

function safeFrom(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) raw = raw[0];
  if (!raw) return '/';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  return raw;
}

function readableFeatureFromPath(path: string): string {
  if (path.startsWith('/tools/dosering')) return 'DoseringKalkylator';
  if (path.startsWith('/tools/lakemedel')) return 'Läkemedelskort';
  if (path.startsWith('/tools/debitering')) return 'Debiteringsstöd';
  if (path.startsWith('/tools/journalmall/ai-assisterad')) return 'AI-Journalmall';
  if (path.startsWith('/bettfysiologi')) return 'Bettfysiologi';
  if (path.startsWith('/ortodonti')) return 'Ortodonti';
  if (path.startsWith('/simulator')) return 'Klinisk Simulator';
  // Klinisk scenario inom område
  const m = path.match(/^\/([a-z]+)\/([a-z-]+)/);
  if (m) return `${m[1].charAt(0).toUpperCase() + m[1].slice(1)} · ${m[2].replace(/-/g, ' ')}`;
  return 'Premium-funktion';
}

export default async function PremiumRequiredPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  const fromPath = safeFrom(params.from);
  const featureLabel = readableFeatureFromPath(fromPath);

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div data-theme="stitch-pro" className="bg-surface text-ink min-h-screen flex flex-col">
      <div className="noise-overlay" aria-hidden="true" />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/72 border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
            <span className="font-display text-[22px] tracking-tight">
              DentaGuide<span className="ed-italic text-secondary">·Pro</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-[14px] font-medium text-ink/70 hover:text-ink">
                  Översikt
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="text-[14px] font-medium text-ink/70 hover:text-ink">
                Logga in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* HERO + gate */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-[640px] w-full">
          <div className="bg-white rounded-[28px] shadow-deep border border-border-light overflow-hidden">
            <div className="bg-gradient-to-br from-header-from to-header-to text-white px-10 pt-10 pb-12 relative overflow-hidden">
              <div
                className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
                aria-hidden
              />
              <div className="relative z-10">
                <span className="font-mono text-[10px] tracking-widest2 uppercase text-secondary-container/90">
                  Premium krävs
                </span>
                <h1 className="font-display text-[44px] md:text-[56px] leading-[1.02] mt-3">
                  <span className="ed-italic text-secondary-container">{featureLabel}</span>
                </h1>
                <p className="text-white/72 text-[15px] leading-relaxed mt-4 max-w-[460px]">
                  Den här funktionen ingår i <strong className="text-white">Kliniker</strong>-prenumerationen.
                  Få full åtkomst till alla 82 scenarier, AI-journalmall, Doseringskalkylator och fler verktyg.
                </p>
              </div>
            </div>

            <div className="px-10 py-9">
              <ul className="space-y-3 text-[14px] text-ink/75 mb-9">
                <li className="flex gap-3">
                  <span className="text-status-ok mt-0.5">✓</span> Alla 8 domäner · 82 scenarier
                </li>
                <li className="flex gap-3">
                  <span className="text-status-ok mt-0.5">✓</span> AI-journalmall + alla verktyg
                </li>
                <li className="flex gap-3">
                  <span className="text-status-ok mt-0.5">✓</span> Bokmärken &amp; egna anteckningar
                </li>
                <li className="flex gap-3">
                  <span className="text-status-ok mt-0.5">✓</span> 14 dagars provperiod utan kort
                </li>
              </ul>

              <div className="flex flex-col gap-3">
                <Link href="/pricing" className="btn-accent justify-center w-full">
                  Se prisplanerna <span aria-hidden>→</span>
                </Link>
                {isLoggedIn ? (
                  <Link href="/dashboard" className="btn-ghost justify-center w-full">
                    Tillbaka till översikt
                  </Link>
                ) : (
                  <Link
                    href={`/login?redirect=${encodeURIComponent(fromPath)}`}
                    className="btn-ghost justify-center w-full"
                  >
                    Har du redan konto? Logga in
                  </Link>
                )}
                <Link href="/" className="text-center text-[12px] text-ink/50 hover:text-ink mt-2">
                  ← Tillbaka till start
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] text-ink/45 leading-relaxed max-w-[460px] mx-auto">
            PSL 2010:659 — DentaGuide-Pro är ett kliniskt beslutsstöd och ersätter inte legitimerad tandläkares
            medicinska bedömning.
          </p>
        </div>
      </main>

      <ScrollCompanion />
    </div>
  );
}
