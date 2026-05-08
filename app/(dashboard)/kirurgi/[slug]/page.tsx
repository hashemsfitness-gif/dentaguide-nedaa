"use client";

import { use, useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { kirurgiScenarier, KirurgiScenarioData } from "@/lib/data/kirurgi-scenarios";
import { ScenarioLayout, RedFlag } from "@/components/scenario/ScenarioLayout";
import PostopBloedning from "@/components/tools/PostopBloedning";

/* ─── SIDEBAR COMPONENTS ────────────────────────────────── */

const SidebarSection = ({ title, children, icon }: { title: string, children: React.ReactNode, icon?: string }) => (
  <div className="space-y-3">
    <h4 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h4>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const MorphicButton = ({ children, onClick, active }: { children: React.ReactNode, onClick?: () => void, active?: boolean }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all duration-300 flex items-center justify-between group ${
      active 
        ? "bg-primary text-white shadow-lg" 
        : "bg-[#1E1B4B] text-white/90 hover:bg-primary/20 border border-white/10"
    }`}
  >
    <span className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      {children}
    </span>
    <span className={`transition-transform duration-300 ${active ? "rotate-90" : "group-hover:translate-x-1"}`}>
      {active ? "▼" : "→"}
    </span>
  </button>
);

const SinusProtocol = () => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-2 space-y-3 animate-in fade-in slide-in-from-top-2">
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-[#D97706] uppercase tracking-tight">Handläggning efter storlek:</p>
      <div className="space-y-3">
        <div className="p-2 rounded-lg bg-black/20 border border-white/5">
          <p className="text-[11px] text-white/90 font-bold mb-1">{"< 2 mm"}</p>
          <p className="text-[10px] text-white/60 leading-relaxed">Spontat koagel + Kryssutur. Snytförbud 14d.</p>
        </div>
        <div className="p-2 rounded-lg bg-black/20 border border-white/5">
          <p className="text-[11px] text-white/90 font-bold mb-1">2 - 5 mm</p>
          <p className="text-[10px] text-white/60 leading-relaxed">Suturering av gingiva + Koagel/Spongostan.</p>
        </div>
        <div className="p-2 rounded-lg bg-black/20 border border-white/5 border-l-red-500/50 border-l-2">
          <p className="text-[11px] text-white/90 font-bold mb-1">{"> 5 mm"}</p>
          <p className="text-[10px] text-white/60 leading-relaxed">Kollagen-förband + Remiss Käkkirurg (Plastik).</p>
        </div>
      </div>
    </div>
  </div>
);

const SCENARIO_NAV = [
  { slug: "alveolit", id: "KIR-07", quote: "Värken kom tillbaka efter 3 dagar och smakar illa.", title: "Alveolit" },
  { slug: "postop-bloedning", id: "KIR-21", quote: "Det slutar inte blöda efter tandutdragningen.", title: "Blödning", isAcute: true },
  { slug: "sinuskommunikation", id: "KIR-22", quote: "Det bubblar i såret när jag andas / vatten i näsan.", title: "Sinus", isAcute: true },
  { slug: "postop-infektion", id: "KIR-23", quote: "Svullnat upp igen och feber 3-4 dagar efter ingrepp.", title: "Infektion", isAcute: true },
  { slug: "dislocerad-rot", id: "KIR-24", quote: "Roten försvann plötsligt upp i bihålan eller munbotten.", title: "Dislocerad Rot" },
  { slug: "parestesi-dysestesi", id: "KIR-25", quote: "Bedövningen släpper inte / Det sticker i läppen.", title: "Parestesi", isAcute: true },
  { slug: "tuberfraktur", id: "KIR-27", quote: "Benfragment lossnar vid extraktion av sista molar i ÖK.", title: "Tuberfraktur", isAcute: true },
];

const TABS = [
  { id: "s-snabb", label: "Snabb-Översikt", icon: "⚡" },
  { id: "s-anamnes", label: "Anamnes", icon: "❓" },
  { id: "s-status", label: "Status", icon: "🔬" },
  { id: "s-behandling", label: "Behand-ling", icon: "⚙️" },
  { id: "s-journal", label: "Journal", icon: "📝" },
];

export default function KirurgiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const scenario = kirurgiScenarier[slug];

  if (!scenario) notFound();

  const [activeTab, setActiveTab] = useState("s-snabb");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [slug]);

  const scrollTo = (id: string) => {
    try {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const copyJournal = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const kirurgiSidebar = (
    <div className="space-y-8 p-1">
      {/* SEKTION 1: Kliniska Verktyg */}
      <SidebarSection title="Kliniska Verktyg" icon="⚡">
        <MorphicButton 
          active={activeTool === "bloeding"} 
          onClick={() => setActiveTool(activeTool === "bloeding" ? null : "bloeding")}
        >
          Postop Blödning Protocol
        </MorphicButton>
        {activeTool === "bloeding" && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-2 animate-in fade-in slide-in-from-top-2">
            <PostopBloedning />
          </div>
        )}

        <MorphicButton 
          active={activeTool === "sinus"} 
          onClick={() => setActiveTool(activeTool === "sinus" ? null : "sinus")}
        >
          Sinusprotokoll
        </MorphicButton>
        {activeTool === "sinus" && <SinusProtocol />}

        <Link href="/tools/antibiotika" className="block">
          <MorphicButton>Antibiotikastöd</MorphicButton>
        </Link>

        <Link href="/tools/dosering" className="block">
          <MorphicButton>Doseringskalkylator</MorphicButton>
        </Link>
      </SidebarSection>

      {/* SEKTION 2: Klinisk Anteckning */}
      <SidebarSection title="Klinisk Anteckning">
        <div className="p-4 rounded-2xl bg-[#F5F1EA] border border-[#E8E1D5] shadow-inner">
          <p className="text-xs font-medium text-primary/80 leading-relaxed italic">
            &ldquo;{scenario.kliniskAnteckning || "Inga specifika anteckningar för detta scenario."}&rdquo;
          </p>
        </div>
      </SidebarSection>

      {/* SEKTION 3: Differentialdiagnoser */}
      <SidebarSection title="Differentialdiagnoser">
        <div className="space-y-2">
          {scenario.diffDiagnoser.map((diff, i) => (
            <MorphicButton key={i} onClick={() => scrollTo("s-snabb")}>
              {diff.namn}
            </MorphicButton>
          ))}
        </div>
      </SidebarSection>

      {/* SEKTION 4: Klinisk Varningssignal */}
      {scenario.redFlags.length > 0 && (
        <SidebarSection title="Klinisk Varningssignal">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 shadow-sm space-y-2">
            {scenario.redFlags.slice(0, 2).map((flag) => (
              <div key={flag.id} className="flex gap-2 items-start">
                <span className="text-sm">⚠️</span>
                <p className="text-xs font-bold leading-tight">
                  {flag.title}: <span className="font-medium opacity-80">{flag.description}</span>
                </p>
              </div>
            ))}
          </div>
        </SidebarSection>
      )}

      {/* SEKTION 5: PSL 2010:659 fotnot */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-[9px] font-mono text-muted-foreground leading-relaxed uppercase opacity-60">
          PSL 2010:659 — Beslutsstödssystem. Ersätter inte kliniskt omdöme. Baserat på Internetodontologi & Strama 2024.
        </p>
      </div>
    </div>
  );

  return (
    <div 
      data-theme="stitch-pro" 
      className="flex pt-20" 
      style={{ minHeight: "calc(100vh - 80px)" } as React.CSSProperties}
    >
      {/* ── LEFT SIDEBAR ───────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-[240px] bg-[#f7f2ee] border-r border-black/5 overflow-y-auto no-scrollbar pt-6">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Scenario Selection</p>
          <h2 className="font-display italic text-xl text-primary">Käkkirurgi</h2>
        </div>
        <nav className="px-3 space-y-2 pb-10">
          {SCENARIO_NAV.map((nav) => (
            <Link key={nav.slug} href={`/kirurgi/${nav.slug}`}>
              <div className={`rounded-xl p-3 cursor-pointer transition-all duration-200 border ${
                slug === nav.slug 
                  ? "bg-primary text-white border-primary shadow-md" 
                  : "bg-white/70 hover:bg-white border-transparent hover:shadow-sm"
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <p className={`text-[9px] font-mono uppercase tracking-widest ${slug === nav.slug ? "text-white/60" : "text-muted-foreground"}`}>
                    {nav.id}
                  </p>
                  {nav.isAcute && (
                    <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${slug === nav.slug ? "ring-2 ring-white/30" : ""}`} />
                  )}
                </div>
                <p className={`text-xs font-bold leading-tight mb-1 ${slug === nav.slug ? "text-white" : "text-primary"}`}>
                  "{nav.quote}"
                </p>
                <p className={`text-[10px] ${slug === nav.slug ? "text-white/70" : "text-muted-foreground"}`}>
                  {nav.title}
                </p>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <main className="flex-1 lg:ml-[240px] px-4 py-6 pb-32 w-full overflow-x-hidden">
        <ScenarioLayout
          category="Käkkirurgi"
          categoryEmoji="🔪"
          title={scenario.title}
          icdCode={scenario.icdCode}
          redFlags={scenario.redFlags}
          userHasPremium={true}
          rightSidebar={kirurgiSidebar}
        >
          <div className="space-y-12 mt-8">
            {/* Sticky Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-b border-black/5 sticky top-0 z-30 bg-white/80 backdrop-blur rounded-t-2xl">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab.id ? "bg-[#B45309] text-white" : "hover:bg-black/5 text-muted-foreground"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Patient Case Card */}
            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm">
              <p className="text-[10px] font-mono text-[#B45309] uppercase tracking-widest mb-2 font-bold italic">Patienten säger:</p>
              <h2 className="font-display italic text-2xl text-primary leading-tight">
                &ldquo;{scenario.patientUtsaga}&rdquo;
              </h2>
            </div>

            {/* Snabb-Översikt */}
            <section id="s-snabb" className="scroll-mt-32">
              <h3 className="font-display italic text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center text-sm not-italic">⚡</span>
                Snabb-Översikt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenario.snabbOversikt.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-black/5 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-[#B45309] uppercase tracking-widest block mb-1">{item.label}</span>
                    <p className="text-sm font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Anamnes */}
            <section id="s-anamnes" className="scroll-mt-32">
              <h3 className="font-display italic text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center text-sm not-italic">❓</span>
                Anamnes
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest mb-4">Obligatoriska frågor</h4>
                  <div className="space-y-4">
                    {scenario.anamnes.obligatoriska.map((q, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-lg bg-black/5 border border-black/5">
                        <div className="flex-1">
                          <p className="text-xs font-bold text-primary mb-1">Q: {q.q}</p>
                          <p className="text-xs text-muted-foreground italic">A: {q.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {scenario.anamnes.kompletterande.length > 0 && (
                  <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                    <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest mb-3">Kompletterande utredning</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scenario.anamnes.kompletterande.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-muted-foreground">
                          <span className="text-[#B45309] mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Status */}
            <section id="s-status" className="scroll-mt-32">
              <h3 className="font-display italic text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center text-sm not-italic">🔬</span>
                Status & Kliniska Fynd
              </h3>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest mb-4">Inspektion</h4>
                  <ul className="space-y-3">
                    {scenario.status.inspektion.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/5 border border-black/5 text-sm font-medium">
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-mono text-[#B45309] shrink-0 border border-black/5">{i+1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Behandling */}
            <section id="s-behandling" className="scroll-mt-32">
              <h3 className="font-display italic text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center text-sm not-italic">⚙️</span>
                Behandlingsprotokoll
              </h3>
              <div className="space-y-6">
                {scenario.behandling.varning && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h4 className="text-xs font-bold text-red-900 uppercase tracking-wide mb-1 font-mono">Varning / Krav</h4>
                      <p className="text-xs font-medium text-red-800 leading-relaxed">{scenario.behandling.varning}</p>
                    </div>
                  </div>
                )}
                {scenario.behandling.alternativ.map((alt, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-6xl font-display italic text-[#B45309]">0{i+1}</span>
                    </div>
                    <h4 className="text-sm font-bold text-primary mb-1">{alt.title}</h4>
                    {alt.indikation && <p className="text-[10px] text-muted-foreground italic mb-4 font-mono bg-black/5 inline-block px-1 rounded">Indikation: {alt.indikation}</p>}
                    <ul className="space-y-2 mt-4">
                      {alt.metod.map((m, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs font-medium leading-relaxed">
                          <span className="text-[#B45309] mt-1">✓</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Journalmallar */}
            <section id="s-journal" className="scroll-mt-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display italic text-2xl text-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center text-sm not-italic">📝</span>
                  Journalmallar
                </h3>
              </div>
              <div className="space-y-6">
                {scenario.journal.map((j, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute inset-0 bg-[#B45309]/5 rounded-2xl scale-[1.02] -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">{j.titel}</h4>
                        <button
                          onClick={() => copyJournal(j.text, i)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            copiedIndex === i ? "bg-green-500 text-white shadow-lg" : "bg-[#B45309] text-white hover:scale-105 active:scale-95"
                          }`}
                        >
                          {copiedIndex === i ? "Kopierat!" : "Kopiera text"}
                        </button>
                      </div>
                      <pre className="text-xs font-medium text-primary/80 leading-relaxed whitespace-pre-wrap font-sans bg-black/5 p-4 rounded-xl border border-black/5">
                        {j.text}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ScenarioLayout>
      </main>
    </div>
  );
}
