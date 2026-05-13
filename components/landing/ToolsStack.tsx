'use client';

import { FeatureLink } from '@/components/landing/PremiumGate';
import { TierBadge } from '@/components/landing/TierBadge';
import { TOOL_FEATURES, type FeatureTier } from '@/lib/feature-access';

type Tool = {
  n: string;
  title: string;
  desc: string;
  path: string;
  tag: string;
  bg: 'white' | 'neutral' | 'dark' | 'dark-accent';
  accent: 'secondary' | 'ink' | 'ok' | 'warning' | 'violet' | 'teal' | 'danger';
};

const TOOLS: Tool[] = [
  { n: '01', title: 'AI-Journalmall', desc: 'Automatisk journaltext via AI — snabb, strukturerad och HSLF-FS 2025:68-kompatibel.', path: '/tools/journalmall/ai-assisterad', tag: 'AI', bg: 'white', accent: 'secondary' },
  { n: '02', title: 'Manuell Journalmall', desc: 'Välj behandling och fyll i en färdig klinisk journalmall direkt.', path: '/tools/journalmall/manuell', tag: 'Manuell', bg: 'neutral', accent: 'ink' },
  { n: '03', title: 'Debitering', desc: 'AI-assisterat debiteringsstöd — taxekoder och åtgärdskoder enligt gällande taxa.', path: '/tools/debitering', tag: 'Ekonomi', bg: 'white', accent: 'ok' },
  { n: '04', title: 'AntibiotikaTool', desc: 'Beslutsträd för antibiotikaförskrivning enligt Strama 2024 — undvik resistensutveckling.', path: '/tools/antibiotika', tag: 'Strama 2024', bg: 'dark', accent: 'warning' },
  { n: '05', title: 'DoseringKalkylator', desc: 'Farmakologisk dosering baserat på ålder, vikt och riskprofil. Interaktionsvarningar i realtid.', path: '/tools/dosering', tag: 'Farmakologi', bg: 'white', accent: 'violet' },
  { n: '06', title: 'Läkemedelskort', desc: 'Snabbreferens för vanliga läkemedel — warfarin, NOAK, bisfosfonater och fler.', path: '/tools/lakemedel', tag: 'Referens', bg: 'neutral', accent: 'ink' },
  { n: '07', title: 'ParodKlassificerare', desc: 'EFP/AAP 2018-klassificering baserat på fickdjup, fästenivåförlust och röntgenfynd.', path: '/tools/parod-klassificering', tag: 'Parodontologi', bg: 'white', accent: 'teal' },
  { n: '08', title: 'TraumaGuide', desc: 'Kliniska protokoll för tandtrauma — primära och permanenta tänder. Akut beslutsstöd.', path: '/tools/traumaguide', tag: 'Akut', bg: 'dark-accent', accent: 'danger' },
];

function tierFor(path: string): FeatureTier {
  return TOOL_FEATURES[path] ?? 'premium';
}

const BG_STYLES: Record<Tool['bg'], { card: string; border: string; num: string; title: string; desc: string; path: string; arrow: string }> = {
  white: { card: 'bg-white text-ink', border: 'border-border-light', num: 'text-ink/15', title: 'text-ink', desc: 'text-ink/65', path: 'text-ink/45', arrow: 'text-ink/40' },
  neutral: { card: 'bg-[#f1ede6] text-ink', border: 'border-[#e4dfd5]', num: 'text-ink/15', title: 'text-ink', desc: 'text-ink/65', path: 'text-ink/45', arrow: 'text-ink/40' },
  dark: { card: 'bg-[#0d2733] text-white', border: 'border-white/10', num: 'text-white/15', title: 'text-white', desc: 'text-white/70', path: 'text-white/45', arrow: 'text-white/55' },
  'dark-accent': { card: 'bg-gradient-to-br from-primary to-dark-bg text-white', border: 'border-white/10', num: 'text-pediatric-warm/30', title: 'text-white', desc: 'text-white/72', path: 'text-white/50', arrow: 'text-pediatric-warm' },
};

const ACCENT_STYLES: Record<Tool['accent'], string> = {
  secondary: 'text-secondary bg-secondary/10 border-secondary/25',
  ink: 'text-ink/65 bg-ink/5 border-ink/15',
  ok: 'text-status-ok bg-status-ok/10 border-status-ok/25',
  warning: 'text-status-warning bg-status-warning/15 border-status-warning/35',
  violet: 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/30',
  teal: 'text-teal-300 bg-teal-700/15 border-teal-300/30',
  danger: 'text-[#FF7E55] bg-[#FF7E55]/10 border-[#FF7E55]/30',
};

const TOP_BASE = 96;
const TOP_STEP = 14;

export default function ToolsStack() {
  return (
    <div className="max-w-[960px] mx-auto" style={{ paddingBottom: '18vh' }}>
      {TOOLS.map((t, i) => {
        const styles = BG_STYLES[t.bg];
        const accentColors =
          t.bg === 'dark' || t.bg === 'dark-accent'
            ? 'text-[#FF7E55] bg-white/10 border-white/15'
            : ACCENT_STYLES[t.accent];
        const top = TOP_BASE + i * TOP_STEP;
        const isLast = i === TOOLS.length - 1;

        const tier = tierFor(t.path);
        return (
          <div
            key={t.n}
            style={{
              position: 'sticky',
              top: `${top}px`,
              zIndex: i + 1,
              marginBottom: isLast ? 0 : '34vh',
            }}
          >
            <FeatureLink href={t.path} tier={tier} label={t.title} className="block group">
              <article
                className={`rounded-[36px] p-10 md:p-16 border ${styles.card} ${styles.border} shadow-deep transition-transform duration-300 group-hover:-translate-y-1`}
              >
                <header className="flex items-baseline justify-between mb-10">
                  <span className={`font-display ed-italic ${styles.num} text-[80px] md:text-[120px] leading-none`}>
                    {t.n}
                  </span>
                  <div className="flex items-center gap-3">
                    <TierBadge tier={tier} />
                    <span className={`text-[10px] md:text-[11px] font-mono tracking-widest2 uppercase border rounded-full px-3 py-1 ${accentColors}`}>
                      {t.tag}
                    </span>
                  </div>
                </header>
                <h3 className={`font-display ${styles.title} text-[40px] md:text-[58px] leading-[1.02] mb-6`}>
                  {t.title}
                </h3>
                <p className={`text-[15px] md:text-[18px] ${styles.desc} leading-relaxed max-w-[640px] mb-10`}>
                  {t.desc}
                </p>
                <footer className={`flex items-center justify-between border-t pt-6 ${styles.border}`}>
                  <code className={`font-mono text-[11px] md:text-[12px] tracking-wide ${styles.path}`}>
                    {t.path}
                  </code>
                  <span className={`font-mono text-[11px] tracking-widest2 uppercase flex items-center gap-3 ${styles.arrow} group-hover:gap-5 transition-all`}>
                    {tier === 'free' ? 'Öppna' : 'Se Premium'} <span aria-hidden>→</span>
                  </span>
                </footer>
              </article>
            </FeatureLink>
          </div>
        );
      })}
    </div>
  );
}
