import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase';
import LogoutButton from './LogoutButton';
import ScrollCompanion from './ScrollCompanion';

/**
 * AppShell — delad editorial-shell (nav + footer + scroll-companion)
 * som alla inloggade och kliniska sidor använder.
 *
 * Server component → läser auth + tier en gång på serversidan och
 * renderar rätt nav (utloggad / inloggad gratis / inloggad premium).
 *
 * @param children sidans innehåll
 * @param variant
 *   - 'default' = ljus surface (kliniska sidor, verktyg)
 *   - 'dark'    = mörk dark-bg (för sidor med inverterad palette)
 */
export default async function AppShell({
  children,
  variant = 'default',
  compactFooter = false,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'dark';
  compactFooter?: boolean;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  let isPremium = false;
  let role: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier, role')
      .eq('id', user.id)
      .single();
    isPremium = profile?.tier === 'kliniker' || profile?.tier === 'klinik';
    role = profile?.role ?? null;
  }

  const bgClass = variant === 'dark' ? 'bg-dark-bg text-white' : 'bg-surface text-ink';

  return (
    <div data-theme="stitch-pro" className={`${bgClass} min-h-screen flex flex-col`}>
      <div className="noise-overlay" aria-hidden="true" />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/72 border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
            <span className="font-display text-[22px] tracking-tight text-ink">
              DentaGuide<span className="ed-italic text-secondary">·Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[14px] font-medium text-ink/70">
            <Link href="/" className="hover:text-ink transition-colors">Start</Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="hover:text-ink transition-colors">Översikt</Link>
            )}
            <Link href="/#domaner" className="hover:text-ink transition-colors">Områden</Link>
            <Link href="/#verktyg" className="hover:text-ink transition-colors">Verktyg</Link>
            <Link href="/pricing" className="hover:text-ink transition-colors">Pris</Link>
            {role === 'admin' && (
              <Link href="/admin/dashboard" className="hover:text-ink transition-colors">Admin</Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <LogoutButton />
                <Link href="/dashboard" className="btn-accent text-[14px] py-[10px] px-5">
                  Översikt <span aria-hidden>→</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline text-[14px] font-medium text-ink/70 hover:text-ink mr-3">
                  Logga in
                </Link>
                <Link href="/registrera" className="btn-accent text-[14px] py-[10px] px-5">
                  Kom igång <span aria-hidden>→</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {!isLoggedIn && (
          <div className="bg-secondary/10 border-t border-secondary/15 text-ink/75 text-[12px] text-center px-4 py-1.5 font-mono tracking-wide">
            ✨ Testa gratis-funktionerna direkt — eller{' '}
            <Link href="/pricing" className="text-secondary font-semibold underline">
              starta provperiod
            </Link>{' '}
            för Premium.
          </div>
        )}

        {isLoggedIn && !isPremium && (
          <div className="bg-secondary/10 border-t border-secondary/15 text-ink/75 text-[12px] text-center px-4 py-1.5 font-mono tracking-wide">
            Du är på <strong className="text-ink">Gratis</strong>-tier.{' '}
            <Link href="/pricing" className="text-secondary font-semibold underline">
              Uppgradera till Kliniker
            </Link>{' '}
            för full åtkomst.
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {compactFooter ? (
        <footer className="bg-dark-surface text-white/70">
          <div className="max-w-[1280px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
              <span className="font-display text-[18px] text-white">
                DentaGuide<span className="ed-italic text-secondary">·Pro</span>
              </span>
            </div>
            <p className="text-[11px] text-white/40 max-w-[520px] text-center md:text-right leading-relaxed">
              PSL 2010:659 — Ersätter inte kliniskt omdöme. Varje rekommendation måste granskas av legitimerad
              tandläkare.
            </p>
          </div>
        </footer>
      ) : (
        <footer className="bg-dark-surface text-white/70">
          <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-10">
            <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
                  <span className="font-display text-[20px] text-white">
                    DentaGuide<span className="ed-italic text-secondary">·Pro</span>
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed max-w-[340px] text-white/55">
                  Nästa generations kliniska beslutsstöd för svensk tandvård. Utvecklat av tandläkare, för tandläkare.
                </p>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-mono tracking-widest2 uppercase mb-4">Plattform</h4>
                <ul className="space-y-2.5 text-[13px]">
                  <li><Link href="/#verktyg" className="hover:text-white">Verktyg</Link></li>
                  <li><Link href="/#domaner" className="hover:text-white">Områden</Link></li>
                  <li><Link href={isLoggedIn ? '/simulator' : '/login?redirect=/simulator'} className="hover:text-white">Simulator</Link></li>
                  <li><Link href="/pricing" className="hover:text-white">Pris</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-mono tracking-widest2 uppercase mb-4">Klinisk data</h4>
                <ul className="space-y-2.5 text-[13px]">
                  <li><Link href="/om-oss" className="hover:text-white">Strama 2024</Link></li>
                  <li><Link href="/om-oss" className="hover:text-white">EFP/AAP 2018</Link></li>
                  <li><Link href="/om-oss" className="hover:text-white">HSLF-FS 2025:68</Link></li>
                  <li><Link href="/om-oss" className="hover:text-white">Källförteckning</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[10px] font-mono tracking-widest2 uppercase mb-4">Konto</h4>
                <ul className="space-y-2.5 text-[13px]">
                  {isLoggedIn ? (
                    <>
                      <li><Link href="/dashboard" className="hover:text-white">Översikt</Link></li>
                      <li><Link href="/pricing" className="hover:text-white">Prisplaner</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link href="/login" className="hover:text-white">Logga in</Link></li>
                      <li><Link href="/registrera" className="hover:text-white">Registrera</Link></li>
                      <li><Link href="/pricing" className="hover:text-white">Prisplaner</Link></li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px]">
              <p>© 2026 DentaGuide-Pro. Med ensamrätt.</p>
              <div className="flex flex-wrap gap-5">
                <Link href="/om-oss" className="hover:text-white">Integritet (GDPR)</Link>
                <Link href="/om-oss" className="hover:text-white">Patientdatalagen</Link>
                <span className="flex items-center gap-2"><span className="pulse-dot" /> Drift: operativ</span>
              </div>
            </div>

            <p className="mt-8 text-center text-[11px] text-white/35 max-w-[760px] mx-auto leading-relaxed">
              DentaGuide-Pro är ett kliniskt beslutsstöd och ersätter inte legitimerad tandläkares medicinska
              bedömning. Enligt Patientsäkerhetslagen (PSL 2010:659) bär den legitimerade yrkesutövaren det
              slutliga ansvaret för vårdbeslut.
            </p>
          </div>
        </footer>
      )}

      <ScrollCompanion />
    </div>
  );
}
