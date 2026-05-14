import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase';
import LogoutButton from '@/components/landing/LogoutButton';
import ScrollCompanion from '@/components/landing/ScrollCompanion';
import { PremiumGateProvider, FeatureLink } from '@/components/landing/PremiumGate';
import { TierBadge } from '@/components/landing/TierBadge';
import {
  DOMAIN_FEATURES,
  TOOL_FEATURES,
  SIMULATOR_FEATURES,
} from '@/lib/feature-access';
import '../(public)/landing.css';

export const metadata = {
  title: 'Översikt | DentaGuide-Pro',
};

const KLINISKA_OMRADEN = [
  { n: '01', title: 'Endodonti', href: '/endodonti', desc: 'Värk, pulpit & rotbehandling.' },
  { n: '02', title: 'Parodontologi', href: '/parodontologi', desc: 'Parodontit & peri-implantit.' },
  { n: '03', title: 'Protetik', href: '/protetik', desc: 'Bettfunktion & rekonstruktioner.' },
  { n: '04', title: 'Käkkirurgi', href: '/kakkirurgi', desc: 'Extraktioner & kirurgi.' },
  { n: '05', title: 'Bettfysiologi', href: '/bettfysiologi', desc: 'TMD & funktionsstörningar.' },
  { n: '06', title: 'Oralmedicin', href: '/oralmedicin', desc: 'MRONJ, slemhinna & SVF.' },
  { n: '07', title: 'Pedodonti', href: '/pedodonti', desc: 'Barn- och ungdomstandvård.' },
  { n: '08', title: 'Ortodonti', href: '/ortodonti', desc: 'Interception & bedömning.' },
];

const VERKTYG = [
  { icon: '📝', title: 'AI-Journalmall', href: '/tools/journalmall/ai-assisterad', tag: 'AI' },
  { icon: '📋', title: 'Manuell Journalmall', href: '/tools/journalmall/manuell', tag: 'Manuell' },
  { icon: '💰', title: 'Debitering', href: '/tools/debitering', tag: 'Ekonomi' },
  { icon: '🦠', title: 'AntibiotikaTool', href: '/tools/antibiotika', tag: 'Strama 2024' },
  { icon: '💊', title: 'DoseringKalkylator', href: '/tools/dosering', tag: 'Farmakologi' },
  { icon: '📦', title: 'Läkemedelskort', href: '/tools/lakemedel', tag: 'Referens' },
  { icon: '🦷', title: 'ParodKlassificerare', href: '/tools/parod-klassificering', tag: 'Parod' },
  { icon: '🚑', title: 'TraumaGuide', href: '/tools/traumaguide', tag: 'Akut' },
];

const SIMULATOR = [
  { title: 'Klinisk Simulator', href: '/simulator', desc: 'Träna på kliniska fall i 3 svårighetsgrader.', tag: 'Interaktiv' },
  { title: 'Min Historik', href: '/simulator/historik', desc: 'Tidigare resultat och utveckling.', tag: 'Statistik' },
  { title: 'Leaderboard', href: '/simulator/leaderboard', desc: 'Jämför poäng med andra kliniker.', tag: 'Ranking' },
];

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login?redirect=/dashboard');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, tier, role')
    .eq('id', user.id)
    .single();

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'kollega';
  const isSuperUser = user.email === 'nedaakh95se@gmail.com';
  const tierLabel = isSuperUser ? 'Klinik (Admin)' :
    profile?.tier === 'klinik' ? 'Klinik' : profile?.tier === 'kliniker' ? 'Kliniker' : 'Gratis';
  const isPremium = isSuperUser || profile?.tier === 'kliniker' || profile?.tier === 'klinik';

  return (
    <PremiumGateProvider isLoggedIn={true} isPremium={true}>
    <div data-theme="stitch-pro" className="bg-surface text-ink min-h-screen">
      <div className="noise-overlay" aria-hidden="true" />

      {/* NAV (samma som landing) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/72 border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
            <span className="font-display text-[22px] tracking-tight">
              DentaGuide<span className="ed-italic text-secondary">·Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[14px] font-medium text-ink/70">
            <Link href="/dashboard" className="text-ink">Översikt</Link>
            <a href="#omraden" className="hover:text-ink transition-colors">Områden</a>
            <a href="#verktyg" className="hover:text-ink transition-colors">Verktyg</a>
            <a href="#simulator" className="hover:text-ink transition-colors">Simulator</a>
              {(profile?.role === 'admin' || isSuperUser) && (
              <Link href="/admin/dashboard" className="hover:text-ink transition-colors">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LogoutButton />
            <Link href="/" className="hidden sm:inline btn-ghost text-[14px] py-[10px] px-5">
              Till start <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO — personlig välkomst */}
      <section className="relative overflow-hidden hero-atmos hero-grid bg-gradient-to-br from-header-from via-[#093d54] to-[#04222f] text-white">
        <div className="relative max-w-[1280px] mx-auto px-8 pt-20 pb-20 z-10">
          <div className="flex items-center gap-3 mb-7">
            <span className="status-pill">
              <span className="pulse-dot" /> Inloggad
            </span>
            <span className="status-pill hidden md:inline-flex">Tier · {tierLabel}</span>
          </div>

          <h1 className="font-display font-medium text-white text-[52px] md:text-[72px] leading-[0.98]">
            Välkommen tillbaka,<br />
            <span className="ed-italic text-secondary-container">{displayName}.</span>
          </h1>
          <p className="mt-7 max-w-[560px] text-[17px] leading-[1.65] text-white/72">
            Välj ett kliniskt område eller öppna ett verktyg direkt. Allt finns härifrån — sökbart och redo.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="#omraden" className="btn-accent">
              Utforska områden <span aria-hidden>→</span>
            </Link>
            <Link href="/tools/journalmall" className="btn-ghost-white">
              Öppna journalmall
            </Link>
          </div>
        </div>
      </section>

      {/* KLINISKA OMRÅDEN */}
      <section id="omraden" className="relative bg-neutral">
        <div className="max-w-[1280px] mx-auto px-8 py-24">
          <header className="mb-12 max-w-[760px]">
            <div className="eyebrow mb-5">Kliniska områden</div>
            <h2 className="font-display text-ink text-[44px] md:text-[56px] leading-[1.02]">
              Åtta domäner<br />
              <span className="ed-italic">på din sida.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {KLINISKA_OMRADEN.map((d) => {
              const tier = DOMAIN_FEATURES[d.href] ?? 'premium';
              return (
                <FeatureLink
                  key={d.n}
                  href={d.href}
                  tier={tier}
                  label={d.title}
                  className="ed-card block group"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-display ed-italic text-secondary text-[36px] leading-none">{d.n}</span>
                    <TierBadge tier={tier} />
                  </div>
                  <h3 className="font-display text-[26px] leading-tight mb-3">{d.title}</h3>
                  <p className="text-[13px] text-ink/65 leading-relaxed">{d.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-secondary font-mono text-[11px] tracking-widest2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {tier === 'free' ? 'Öppna' : 'Se Premium'} <span aria-hidden>→</span>
                  </span>
                </FeatureLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* KLINISKA VERKTYG */}
      <section id="verktyg" className="relative bg-surface">
        <div className="max-w-[1280px] mx-auto px-8 py-24">
          <header className="mb-12 max-w-[760px]">
            <div className="eyebrow mb-5">Verktyg</div>
            <h2 className="font-display text-ink text-[44px] md:text-[56px] leading-[1.02]">
              För det dagliga<br />
              <span className="ed-italic">arbetsflödet.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERKTYG.map((t) => {
              const tier = TOOL_FEATURES[t.href] ?? 'premium';
              return (
                <FeatureLink key={t.href} href={t.href} tier={tier} label={t.title} className="group block">
                  <article className="bg-white border border-border-light rounded-[20px] p-6 h-full flex flex-col hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 shadow-clay">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl" aria-hidden>{t.icon}</span>
                      <TierBadge tier={tier} />
                    </div>
                    <h4 className="font-display text-[20px] leading-tight mb-2 text-ink">{t.title}</h4>
                    <div className="font-mono text-[10px] tracking-widest2 uppercase text-ink/45 mb-2">{t.tag}</div>
                    <span className="mt-auto text-secondary font-mono text-[11px] tracking-widest2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      {tier === 'free' ? 'Öppna' : 'Se Premium'} →
                    </span>
                  </article>
                </FeatureLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulator" className="relative bg-[#e7ede9]">
        <div className="max-w-[1280px] mx-auto px-8 py-24">
          <header className="mb-12 max-w-[760px]">
            <div className="eyebrow mb-5">Simulator</div>
            <h2 className="font-display text-ink text-[44px] md:text-[56px] leading-[1.02]">
              Träna kliniskt resonemang<br />
              <span className="ed-italic">på riktiga fall.</span>
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-5">
            {SIMULATOR.map((s) => {
              const tier = SIMULATOR_FEATURES[s.href] ?? 'premium';
              return (
                <FeatureLink
                  key={s.href}
                  href={s.href}
                  tier={tier}
                  label={s.title}
                  className="group bg-white rounded-[24px] border border-border-light p-7 hover:border-secondary/40 transition-all hover:-translate-y-1 shadow-clay flex flex-col"
                >
                  <div className="font-mono text-[10px] tracking-widest2 uppercase text-ink/45 mb-3 flex items-center gap-2">
                    {s.tag} <TierBadge tier={tier} />
                  </div>
                  <h3 className="font-display text-[26px] mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[14px] text-ink/65 leading-relaxed flex-1">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-secondary font-mono text-[11px] tracking-widest2 uppercase">
                    {tier === 'free' ? 'Starta' : 'Se Premium'} <span aria-hidden>→</span>
                  </span>
                </FeatureLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER (komprimerad) */}
      <footer className="bg-dark-surface text-white/70">
        <div className="max-w-[1280px] mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
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

      <ScrollCompanion />
    </div>
    </PremiumGateProvider>
  );
}
