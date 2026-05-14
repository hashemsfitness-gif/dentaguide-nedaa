import Link from 'next/link';
import Image from 'next/image';
import { Zap, Layers, Crown, Scissors, Activity, FlaskConical } from 'lucide-react';
import { createServerSupabase } from '@/lib/supabase';
import TerminalDemo from '@/components/landing/TerminalDemo';
import InstitutionsMarquee from '@/components/landing/InstitutionsMarquee';
import ScrollCompanion from '@/components/landing/ScrollCompanion';
import ToolsStack from '@/components/landing/ToolsStack';
import LogoutButton from '@/components/landing/LogoutButton';
import { PremiumGateProvider, FeatureLink } from '@/components/landing/PremiumGate';
import { TierBadge } from '@/components/landing/TierBadge';
import { DOMAIN_FEATURES, SIMULATOR_FEATURES, TOOL_FEATURES } from '@/lib/feature-access';
import './landing.css';

export const metadata = {
  title: 'DentaGuide-Pro — Kliniskt beslutsstöd',
  description:
    'Evidensbaserade protokoll, interaktiva guider och realtidsstöd för anamnes, diagnostik och behandlingsplanering — utvecklat med och för svensk tandvård.',
};

const DOMAINS = [
  { n: '01', icon: Zap,          img: '/characters/Endodonti ikon landingpage.png',          title: 'Endodonti',     desc: 'Värk & smärta — akut endodonti, pulpit och differentialdiagnostik vid orofacial smärta.', href: '/endodonti' },
  { n: '02', icon: Layers,       img: '/characters/parodontologi ikon landingpage.png',       title: 'Parodontologi', desc: 'Systematiska behandlingsplaner för parodontit och peri-implantit enligt EFP/AAP 2018.', href: '/parodontologi' },
  { n: '03', icon: Crown,        img: '/characters/protetik ikon landingpage.png',             title: 'Protetik',      desc: 'Bettfunktion — fast och avtagbar protetik med tydliga indikationsgränser.', href: '/protetik' },
  { n: '04', icon: Scissors,     img: '/characters/Käkkirurgi ikon landingpange.png',          title: 'Käkkirurgi',    desc: 'Benfysiologi, extraktioner och postoperativt omhändertagande med riskstratifiering.', href: '/kakkirurgi' },
  { n: '05', icon: Activity,     img: '/characters/bettfysiologi ikon landingpage.png',        title: 'Bettfysiologi', desc: 'TMD, tuggapparat och smärthantering — stegvis behandlingsalgoritm.', href: '/bettfysiologi' },
  { n: '06', icon: FlaskConical, img: '/characters/oral medicin ikon landingpage.png',         title: 'Oralmedicin',   desc: 'Slemhinna & MRONJ — munslemhinnesjukdomar, MRONJ-risk samt SVF-remisser.', href: '/oralmedicin' },
];

const DRUGS = [
  { cat: 'Antikoagulantia', name: 'Warfarin', desc: 'INR-kontroll inom 24 h före kirurgi. Kontakta ordinerande läkare vid INR > 3,5.', risk: 'HÖG RISK', riskTone: 'danger' as const, href: '/tools/lakemedel#waran' },
  { cat: 'Antikoagulantia', name: 'NOAK', desc: 'Apixaban, rivaroxaban, dabigatran. Standardiserat uppehåll vid större kirurgi.', risk: 'MEDEL', riskTone: 'warning' as const, href: '/tools/lakemedel#noak' },
  { cat: 'Antiresorptiva', name: 'Bisfosfonater', desc: 'Riskbedömning för MRONJ före extraktion. IV-administration kräver konsultation.', risk: 'MRONJ', riskTone: 'danger' as const, href: '/tools/lakemedel#bisfosfonat' },
  { cat: 'Hjärt & kärl', name: 'Betablockerare', desc: 'Lokalanestetika med adrenalin: max 2 carpuler. Beakta interaktion vid hypertoni.', risk: 'MEDEL', riskTone: 'warning' as const, href: '/tools/lakemedel#betablockerare' },
  { cat: 'Psykofarmaka', name: 'SSRI & SNRI', desc: 'Ökad blödningsbenägenhet. Munttorrhetspåverkan — anpassa kariesriskbedömning.', risk: 'MEDEL', riskTone: 'warning' as const, href: '/tools/lakemedel#antidepressiva' },
];

function RiskBadge({ tone, label }: { tone: 'danger' | 'warning'; label: string }) {
  const toneClass =
    tone === 'danger'
      ? 'text-status-danger bg-status-danger/15 border-status-danger/30'
      : 'text-status-warning bg-status-warning/15 border-status-warning/30';
  return (
    <span className={`font-mono text-[13px] tracking-widest2 uppercase border rounded-full px-3 py-1 ${toneClass}`}>
      {label}
    </span>
  );
}

export default async function LandingPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  let isPremium = false;
  if (user) {
    if (user.email === 'nedaakh95se@gmail.com') {
      isPremium = true;
    } else {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single();
      isPremium = profile?.tier === 'kliniker' || profile?.tier === 'klinik';
    }
  }

  const primaryCTAHref = isLoggedIn ? '/dashboard' : '/registrera';
  const primaryCTALabel = isLoggedIn ? 'Till dashboard' : 'Kom igång';
  const journalHref = '/tools/journalmall'; // free — manuell-mall är gratis
  // Pedodonti är gratis (öppnar första scenariot)
  const pedoHref = '/pedodonti';
  // Simulator-spåret är premium — FeatureLink hanterar gate vid klick
  const simulatorHref = '/simulator';
  const simulatorHistoryHref = '/simulator/historik';
  const simulatorLeaderboardHref = '/simulator/leaderboard';

  return (
    <PremiumGateProvider isLoggedIn={isLoggedIn} isPremium={true}>
    <div data-theme="stitch-pro" className="bg-surface text-ink min-h-screen">
      <div className="noise-overlay" aria-hidden="true" />

      {/* ============== NAV ============== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/72 border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[82px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
            <span className="font-display text-[25px] tracking-tight">
              DentaGuide<span className="ed-italic text-secondary">·Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9 text-[16px] font-medium text-ink/70">
            <a href="#domaner" className="hover:text-ink transition-colors">Domäner</a>
            <a href="#verktyg" className="hover:text-ink transition-colors">Verktyg</a>
            <a href="#farmakologi" className="hover:text-ink transition-colors">Farmakologi</a>
            <a href="#priser" className="hover:text-ink transition-colors">Pris</a>
            <Link href="/om-oss" className="hover:text-ink transition-colors">Klinisk data</Link>
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hidden sm:inline text-[16px] font-medium text-ink/70 hover:text-ink mr-3">
                  Översikt
                </Link>
                <LogoutButton />
                <Link href="/dashboard" className="btn-accent text-[16px] py-[10px] px-5">
                  Till dashboard <span aria-hidden>→</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline text-[16px] font-medium text-ink/70 hover:text-ink mr-3">
                  Logga in
                </Link>
                <Link href="/registrera" className="btn-accent text-[16px] py-[10px] px-5">
                  Kom igång <span aria-hidden>→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section
        id="top"
        className="relative overflow-hidden hero-atmos hero-grid bg-gradient-to-br from-header-from via-[#093d54] to-[#04222f] text-white"
      >
        <div className="relative max-w-[1280px] mx-auto px-8 pt-24 pb-28 z-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 items-end">
            {/* Vänster */}
            <div>
              <h1 className="font-display font-medium text-white text-[68px] md:text-[88px] leading-[0.96]">
                Rätt beslut,<br />
                <span className="ed-italic text-secondary-container">direkt i kliniken.</span>
              </h1>
              <p className="mt-8 max-w-[560px] text-[18px] leading-[1.65] text-white/72">
                Strukturerade protokoll, evidensbaserade guider och <span className="text-secondary-container font-bold">kliniskt stöd i realtid</span> — designat för den svenska tandvårdens vardag.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={primaryCTAHref} className="btn-accent">
                  {isLoggedIn ? primaryCTALabel : 'Starta provperiod'} <span aria-hidden>→</span>
                </Link>
                <a href="#verktyg" className="btn-ghost-white">Se klinisk demo</a>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-8 max-w-[420px] pt-8 border-t border-white/10">
                <div>
                  <div className="font-display ed-italic text-white text-[26px] leading-tight">Evidensbaserat</div>
                  <div className="mt-2 font-mono text-[13px] tracking-widest2 uppercase text-white/55">Nationella riktlinjer</div>
                </div>
                <div>
                  <div className="font-display ed-italic text-white text-[26px] leading-tight">Alltid tillgängligt</div>
                  <div className="mt-2 font-mono text-[13px] tracking-widest2 uppercase text-white/55">Webb &amp; mobil</div>
                </div>
              </div>
            </div>

            {/* Höger: animerad logo */}
            <div className="relative flex items-start justify-center min-h-[460px] pt-2 lg:-mt-10">
              <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                <div
                  className="w-[460px] h-[460px] rounded-full opacity-40 blur-[110px]"
                  style={{ background: 'radial-gradient(circle, #CC5833 0%, transparent 65%)' }}
                />
              </div>
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="hex-logo-hero relative w-full max-w-[460px] aspect-square overflow-hidden rounded-[28px]">
                  <video
                    src="/logo/logo-animated.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-label="DentaGuide-Pro animerad logotyp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INSTITUTIONER ============== */}
      <InstitutionsMarquee />

      {/* ============== KLINISKA DOMÄNER ============== */}
      <section id="domaner" className="relative bg-neutral">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <header className="mb-20 max-w-[760px]">
            <div className="eyebrow mb-6">Kliniska domäner</div>
            <h2 className="font-display text-ink text-[64px] md:text-[80px] leading-[1.00]">
              <span className="ed-italic">En sammanhängande klinik.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOMAINS.map((d) => {
              const tier = DOMAIN_FEATURES[d.href] ?? 'premium';
              return (
                <FeatureLink
                  key={d.n}
                  href={d.href}
                  tier={tier}
                  label={d.title}
                  className="ed-card block group"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-[88px] flex items-center justify-start">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={d.img}
                        alt={d.title}
                        className="max-h-full max-w-[140px] w-auto object-contain drop-shadow-[0_8px_16px_rgba(9,27,20,0.15)] group-hover:scale-105 transition-transform duration-500 origin-left"
                      />
                    </div>
                    <TierBadge tier={tier} />
                  </div>
                  <h3 className="font-display text-[34px] leading-tight mb-4">{d.title}</h3>
                  <p className="text-[14px] text-ink/65 leading-relaxed">{d.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-secondary font-mono text-[13px] tracking-widest2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {tier === 'free' ? 'Öppna' : 'Se Premium'} <span aria-hidden>→</span>
                  </span>
                </FeatureLink>
              );
            })}

            {/* 07 + 08 bredkort */}
            <Link
              href={pedoHref}
              className="ed-card md:col-span-2 lg:col-span-3 text-white border-0 hover:border-pediatric-warm/30 relative overflow-hidden group mt-24 md:mt-40"
              style={{ backgroundColor: 'rgb(5, 40, 55)' }}
            >
              <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center relative z-10">
                <div>
                  <div className="mb-5">
                    <span className="font-mono text-[13px] tracking-widest2 uppercase text-white/40">Pediatric spår</span>
                  </div>
                  <h3 className="font-display text-[44px] leading-[1.05] mb-5">
                    <span className="text-white">Pedodonti</span> <span className="ed-italic text-pediatric-warm">&amp; Ortodonti</span>
                  </h3>
                  <p className="text-[15px] text-white/72 leading-relaxed max-w-[460px] mb-7">
                    Barn & ungdom — eget spår. Särskilt anpassade riktlinjer för beteendehantering,
                    interceptiv ortodonti och åldersanpassade läkemedelsdoser.
                  </p>
                  <span className="inline-flex items-center gap-3 text-pediatric-warm font-mono text-[14px] tracking-widest2 uppercase group-hover:gap-5 transition-all">
                    Utforska spåret <span aria-hidden>→</span>
                  </span>
                </div>
                <div className="relative h-[280px] md:h-[320px] flex items-end justify-center">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-72 h-72 rounded-full opacity-40 blur-3xl"
                      style={{ background: 'radial-gradient(circle, #fbbf8a 0%, transparent 70%)' }}
                    />
                  </div>
                  <div className="relative z-10 w-full h-full overflow-hidden" style={{ maxWidth: '420px', margin: '0 auto' }}>
                    <video
                      src="/characters/pedodonti_boy animerad.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Pedodonti animerad karaktär"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        transform: 'scale(1.5)',
                        transformOrigin: 'center 20%',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -right-32 -top-32 w-[400px] h-[400px] rounded-full bg-pediatric-warm/10 blur-3xl pointer-events-none" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== LIVE-DEMO (TERMINAL + SOP) ============== */}
      <section className="relative bg-[#e7ede9]">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <header className="max-w-[720px] mx-auto text-center flex flex-col items-center mb-16">
            <div className="font-mono text-secondary font-bold text-[18px] tracking-widest uppercase mb-5">
              Kliniskt beslutstöd · realtid
            </div>
            <h2 className="font-display text-ink text-[50px] leading-[1.05]">
              Från första symtom till diagnos <span className="ed-italic whitespace-nowrap">&amp; säker behandling</span><br />
              — <span className="text-secondary font-bold">direkt i stolen.</span>
            </h2>
          </header>

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-7">
            <TerminalDemo targetHref={journalHref} />

            {/* SOP / Steg */}
            <div className="bg-white rounded-[24px] p-10 border border-border-light shadow-clay flex flex-col">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[13px] tracking-widest2 uppercase text-ink/45">Protokoll (SOP)</span>
                <span className="font-mono text-[13px] tracking-widest2 uppercase text-secondary">Trauma · steg 2/4</span>
              </div>
              <h3 className="font-display text-[34px] mb-9">
                Strukturerat <span className="ed-italic">flöde.</span>
              </h3>

              <ol className="flex-1 space-y-1.5">
                <li className="grid grid-cols-[28px_1fr_auto] gap-4 items-center py-4 px-4 -mx-4 rounded-2xl">
                  <span className="w-6 h-6 rounded-full bg-status-ok text-white flex items-center justify-center text-xs">✓</span>
                  <span className="text-[15px] text-ink/45 line-through">Klinisk anamnes och trauma-typ</span>
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-ink/40">02:14</span>
                </li>
                <li className="grid grid-cols-[28px_1fr_auto] gap-4 items-center py-4 px-4 -mx-4 rounded-2xl bg-secondary/5 border border-secondary/20">
                  <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">●</span>
                  <span className="text-[15px] text-secondary font-semibold">Klinisk status — mobilitet, perkussion</span>
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-secondary">pågår</span>
                </li>
                <li className="grid grid-cols-[28px_1fr_auto] gap-4 items-center py-4 px-4 -mx-4 rounded-2xl">
                  <span className="w-6 h-6 rounded-full border border-ink/20" />
                  <span className="text-[15px] text-ink/75">Röntgenologisk undersökning</span>
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-ink/40">~ 4 min</span>
                </li>
                <li className="grid grid-cols-[28px_1fr_auto] gap-4 items-center py-4 px-4 -mx-4 rounded-2xl">
                  <span className="w-6 h-6 rounded-full border border-ink/20" />
                  <span className="text-[15px] text-ink/75">Preliminär diagnos & uppföljning</span>
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-ink/40">~ 3 min</span>
                </li>
              </ol>

              <div className="mt-8 -mx-3 rounded-2xl bg-dark-bg text-white px-6 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary-container font-display ed-italic text-xl">★</div>
                <div>
                  <div className="font-mono text-[13px] tracking-widest2 uppercase text-white/55">Evidens</div>
                  <div className="text-[15px] font-semibold">Verifierat mot nationella riktlinjer.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-dark-bg/95 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-clay-lg">
              <span className="pulse-dot" />
              <span className="font-mono text-[13px] tracking-widest2 uppercase text-white/85">Systemet är online</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-mono text-[13px] tracking-widest2 uppercase text-white/60">v 2.0 · 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== VERKTYGSINDEX ============== */}
      <section id="verktyg" className="relative bg-surface">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <header className="max-w-[800px] mx-auto text-center flex flex-col items-center mb-20">
            <div className="font-mono text-secondary font-bold text-[18px] tracking-widest uppercase mb-5">Kliniska verktyg</div>
            <h2 className="font-display text-ink text-[54px] leading-[1.02] mb-6">
              En smidigare <span className="ed-italic">arbetsdag.</span>
            </h2>
            <p className="text-[18px] leading-[1.6] text-ink/65 text-balance">
              Interaktiva beslutsstödsverktyg utvecklade för att <strong className="text-secondary font-bold text-[19px]">kapa administrativ tid</strong>. Oavsett om det gäller barntrauma, svårbedömd protetik eller dosering — <strong className="text-secondary font-bold text-[19px]">svaret finns ett klick bort</strong>. Öppna, använd och återgå till patienten.
            </p>
          </header>

          <ToolsStack />

          {/* Simulator-spår (premium) */}
          <div className="mt-16 grid md:grid-cols-3 gap-5">
            <FeatureLink
              href={simulatorHref}
              tier={SIMULATOR_FEATURES[simulatorHref] ?? 'premium'}
              label="Klinisk Simulator"
              className="group block bg-gradient-to-br from-primary to-dark-bg text-white rounded-[24px] p-8 md:col-span-2 relative overflow-hidden"
            >
              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 items-end">
                <div>
                  <div className="font-mono text-[13px] tracking-widest2 uppercase text-secondary-container/90 mb-4 flex items-center gap-3">
                    Simulator · 3 svårighetsgrader <TierBadge tier="premium" />
                  </div>
                  <h3 className="font-display text-white text-[32px] mb-3">
                    Träna kliniskt resonemang<br />
                    <span className="ed-italic text-secondary-container">på riktiga fall.</span>
                  </h3>
                  <p className="text-white/65 text-[14px] max-w-md leading-relaxed">
                    Realtidspoäng, feedback per beslut och en personlig kunskapskurva.
                  </p>
                </div>
                <span className="btn-accent group-hover:translate-x-1 transition-transform">
                  Starta simulator <span aria-hidden>→</span>
                </span>
              </div>
              <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-secondary/15 blur-3xl" />
            </FeatureLink>
            <div className="grid grid-rows-2 gap-5">
              <FeatureLink
                href={simulatorHistoryHref}
                tier={SIMULATOR_FEATURES[simulatorHistoryHref] ?? 'premium'}
                label="Min historik"
                className="group bg-white rounded-[24px] border border-border-light p-6 hover:border-secondary/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[13px] tracking-widest2 uppercase text-ink/45 mb-2 flex items-center gap-2">Statistik <TierBadge tier="premium" /></div>
                  <div className="font-display text-[22px]">Min historik</div>
                </div>
                <div className="text-[14px] text-ink/55 mt-3 group-hover:text-secondary transition-colors">Tidigare resultat →</div>
              </FeatureLink>
              <FeatureLink
                href={simulatorLeaderboardHref}
                tier={SIMULATOR_FEATURES[simulatorLeaderboardHref] ?? 'premium'}
                label="Leaderboard"
                className="group bg-white rounded-[24px] border border-border-light p-6 hover:border-secondary/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[13px] tracking-widest2 uppercase text-ink/45 mb-2 flex items-center gap-2">Ranking <TierBadge tier="premium" /></div>
                  <div className="font-display text-[22px]">Leaderboard</div>
                </div>
                <div className="text-[14px] text-ink/55 mt-3 group-hover:text-secondary transition-colors">Jämför poäng →</div>
              </FeatureLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============== VISION / MÅL ============== */}
      <section className="bg-white border-y border-border-light">
        <div className="max-w-[1080px] mx-auto px-8 py-32 text-center">
          <div className="eyebrow justify-center mb-8 inline-flex">Vårt kliniska mål</div>
          <p className="pull-quote text-[44px] md:text-[56px] text-ink leading-[1.08] max-w-[920px] mx-auto">
            Att tiden mellan symtom och diagnos ska gå från minuter till sekunder. Det handlar inte om mer teknik — det handlar om att du ska <span className="text-secondary">slippa byta kontext</span> mitt i ett patientmöte.
          </p>
        </div>
      </section>

      {/* ============== FARMAKOLOGI ============== */}
      <section id="farmakologi" className="relative bg-dark-bg text-white">
        <div className="max-w-[1280px] mx-auto px-8 py-32">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="eyebrow eyebrow--light mb-5">Farmakologiskt stöd</div>
              <h2 className="font-display text-white text-[54px] leading-[1.02]">
                Dosering & interaktion<br />
                <span className="ed-italic text-secondary-container">på en blick.</span>
              </h2>
            </div>
            <p className="text-white/60 text-[15px] max-w-[420px] leading-relaxed">
              Snabbreferens för läkemedel som påverkar dental praxis — koagulation, immunsuppression, antiresorptiva.
            </p>
          </header>

          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-10 -mx-8 px-8 snap-x">
            {DRUGS.map((d) => (
              <FeatureLink
                key={d.name}
                href={d.href}
                tier={TOOL_FEATURES['/tools/lakemedel'] ?? 'premium'}
                label={d.name}
                className="drug-card snap-start group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-secondary">{d.cat}</span>
                  <RiskBadge tone={d.riskTone} label={d.risk} />
                </div>
                <h4 className="font-display text-white text-[28px] mb-3">{d.name}</h4>
                <p className="text-[15px] text-white/70 leading-relaxed">{d.desc}</p>
                <footer className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[13px] tracking-widest2 uppercase text-white/45 flex items-center gap-2">
                    Klinisk data <TierBadge tier="premium" />
                  </span>
                  <span className="text-white/40 group-hover:text-secondary transition-colors">→</span>
                </footer>
              </FeatureLink>
            ))}
            <FeatureLink
              href="/tools/lakemedel"
              tier={TOOL_FEATURES['/tools/lakemedel'] ?? 'premium'}
              label="Läkemedelskort"
              className="drug-card snap-start flex flex-col justify-center items-center text-center"
            >
              <div className="font-display ed-italic text-secondary-container text-[40px] leading-none mb-3">+42</div>
              <p className="text-white/65 text-[15px] mb-5">läkemedel i full databas</p>
              <span className="text-secondary-container font-mono text-[13px] tracking-widest2 uppercase">
                Visa alla →
              </span>
            </FeatureLink>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section id="priser" className="bg-neutral relative">
        <div className="max-w-[1180px] mx-auto px-8 py-32">
          <header className="text-center max-w-[640px] mx-auto mb-16">
            <div className="eyebrow justify-center inline-flex mb-5">Abonnemang</div>
            <h2 className="font-display text-ink text-[54px] leading-[1.02]">
              En plan för<br /><span className="ed-italic">varje klinik.</span>
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Gratis */}
            <article className="price-card-v2 flex flex-col">
              <div className="font-mono text-[13px] tracking-widest2 uppercase text-ink/45 mb-2">Enskild</div>
              <div className="font-display text-[28px] mb-1">Gratis</div>
              <div className="mt-6 mb-8 flex items-baseline gap-2">
                <span className="font-display ed-italic text-[56px] leading-none">0</span>
                <span className="text-ink/55 text-[14px]">kr / mån</span>
              </div>
              <ul className="text-[14px] text-ink/75 space-y-3 mb-10 flex-1">
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> 3 domäner · 10 scenarier</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> Manuell journalmall</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> Doseringskalkylator (basic)</li>
                <li className="flex gap-3 text-ink/35"><span className="mt-0.5">—</span> AI-journal</li>
                <li className="flex gap-3 text-ink/35"><span className="mt-0.5">—</span> Premium-verktyg</li>
              </ul>
              <Link href="/registrera" className="btn-ghost justify-center w-full">Kom igång gratis</Link>
            </article>

            {/* Professionell */}
            <article className="price-card-v2 price-card-v2--featured flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[13px] font-mono tracking-widest2 uppercase px-4 py-1 rounded-full">
                Mest populär
              </div>
              <div className="font-mono text-[13px] tracking-widest2 uppercase text-white/55 mb-2">Professionell</div>
              <div className="font-display text-[28px] mb-1">Kliniker</div>
              <div className="mt-6 mb-8 flex items-baseline gap-2">
                <span className="font-display ed-italic text-[56px] leading-none text-secondary-container">99</span>
                <span className="text-white/65 text-[14px]">kr / mån</span>
              </div>
              <ul className="text-[14px] text-white/85 space-y-3 mb-10 flex-1">
                <li className="flex gap-3"><span className="text-secondary-container mt-0.5">✓</span> Alla domäner · 82 scenarier</li>
                <li className="flex gap-3"><span className="text-secondary-container mt-0.5">✓</span> AI-journal (5/dag)</li>
                <li className="flex gap-3"><span className="text-secondary-container mt-0.5">✓</span> Alla verktyg & agenter</li>
                <li className="flex gap-3"><span className="text-secondary-container mt-0.5">✓</span> Bokmärken & anteckningar</li>
                <li className="flex gap-3"><span className="text-secondary-container mt-0.5">✓</span> E-postsupport</li>
              </ul>
              <Link href="/pricing" className="btn-accent justify-center w-full">Starta 14-dagars provperiod</Link>
            </article>

            {/* Klinik */}
            <article className="price-card-v2 flex flex-col">
              <div className="font-mono text-[13px] tracking-widest2 uppercase text-ink/45 mb-2">Kliniknätverk</div>
              <div className="font-display text-[28px] mb-1">Klinik</div>
              <div className="mt-6 mb-8 flex items-baseline gap-2">
                <span className="font-display ed-italic text-[56px] leading-none">399</span>
                <span className="text-ink/55 text-[14px]">kr / mån</span>
              </div>
              <ul className="text-[14px] text-ink/75 space-y-3 mb-10 flex-1">
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> Allt i Kliniker</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> 5 användare per klinik</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> AI-journal (100/dag)</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> Admin-panel & analytics</li>
                <li className="flex gap-3"><span className="text-status-ok mt-0.5">✓</span> Prioriterad support</li>
              </ul>
              <Link href="/pricing" className="btn-ghost justify-center w-full">Kontakta sälj</Link>
            </article>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="bg-gradient-to-br from-header-from to-header-to text-white relative overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="max-w-[920px] mx-auto px-8 py-32 text-center relative z-10">
          <div className="eyebrow eyebrow--light justify-center inline-flex mb-6">Börja idag</div>
          <h2 className="font-display text-white text-[56px] md:text-[68px] leading-[1.02] mb-8">
            Säkrare flöden.<br />
            <span className="ed-italic text-secondary-container">Snabbare beslut.</span>
          </h2>
          <p className="text-white/70 text-[18px] leading-relaxed max-w-[560px] mx-auto mb-10">
            Prova hela plattformen i 14 dagar utan kort. Ingen installation — fungerar direkt i webbläsaren.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={isLoggedIn ? '/dashboard' : '/registrera'} className="btn-accent">
              {isLoggedIn ? 'Till dashboard' : 'Starta provperiod'} <span aria-hidden>→</span>
            </Link>
            <Link href="/pricing" className="btn-ghost-white">Se prisplanerna</Link>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer id="riktlinjer" className="bg-dark-surface text-white/70">
        <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-10">
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo/logo-hexagon-dark.png" alt="DentaGuide-Pro" className="brand-logo" />
                <span className="font-display text-[22px] text-white">
                  DentaGuide<span className="ed-italic text-secondary">·Pro</span>
                </span>
              </div>
              <p className="text-[14px] leading-relaxed max-w-[360px] text-white/60">
                Nästa generations kliniska beslutsstöd för svensk tandvård. Utvecklat av tandläkare, för tandläkare.
              </p>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-mono tracking-widest2 uppercase mb-5">Plattform</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="#verktyg" className="hover:text-white transition-colors">Verktyg</a></li>
                <li><a href="#domaner" className="hover:text-white transition-colors">Domäner</a></li>
                <li><Link href={simulatorHref} className="hover:text-white transition-colors">Simulator</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pris</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-mono tracking-widest2 uppercase mb-5">Klinisk data</h4>
              <ul className="space-y-3 text-[14px]">
                <li><Link href="/om-oss" className="hover:text-white transition-colors">Strama 2024</Link></li>
                <li><Link href="/om-oss" className="hover:text-white transition-colors">EFP/AAP 2018</Link></li>
                <li><Link href="/om-oss" className="hover:text-white transition-colors">HSLF-FS 2025:68</Link></li>
                <li><Link href="/om-oss" className="hover:text-white transition-colors">Källförteckning</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[13px] font-mono tracking-widest2 uppercase mb-5">Konto</h4>
              <ul className="space-y-3 text-[14px]">
                {isLoggedIn ? (
                  <>
                    <li><Link href="/dashboard" className="hover:text-white transition-colors">Översikt</Link></li>
                    <li><Link href="/dashboard/profile" className="hover:text-white transition-colors">Profil</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/login" className="hover:text-white transition-colors">Logga in</Link></li>
                    <li><Link href="/registrera" className="hover:text-white transition-colors">Registrera</Link></li>
                  </>
                )}
                <li><Link href="/pricing" className="hover:text-white transition-colors">Prisplaner</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-12 mb-16">
            <Image
              src="/characters/wave-alt.gif"
              alt=""
              width={140}
              height={140}
              className="w-[140px] h-[140px] object-contain mb-4 drop-shadow-lg hover:scale-105 transition-transform"
              unoptimized
            />
            <p className="font-display ed-italic text-white text-[32px] md:text-[40px] leading-[1.1]">
              Tand & hjärna — alltid på din sida.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-[14px]">
            <p>© 2026 DentaGuide-Pro. Med ensamrätt.</p>
            <div className="flex flex-wrap gap-6">
              <Link href="/om-oss" className="hover:text-white transition-colors">Integritet (GDPR)</Link>
              <Link href="/om-oss" className="hover:text-white transition-colors">Patientdatalagen</Link>
              <span className="flex items-center gap-2"><span className="pulse-dot" /> Drift: operativ</span>
            </div>
          </div>

          <p className="mt-10 text-center text-[13px] text-white/35 max-w-[760px] mx-auto leading-relaxed">
            DentaGuide-Pro är ett kliniskt beslutsstöd och ersätter inte legitimerad tandläkares medicinska bedömning.
            Allt innehåll är avsett som stöd vid klinisk beslutsfattning och ska vägas mot patientens individuella
            förutsättningar. Enligt Patientsäkerhetslagen (PSL 2010:659) bär den legitimerade yrkesutövaren det
            slutliga ansvaret för vårdbeslut.
          </p>
        </div>
      </footer>

      <ScrollCompanion />
    </div>
    </PremiumGateProvider>
  );
}
