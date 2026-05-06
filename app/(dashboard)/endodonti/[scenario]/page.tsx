"use client";

import { use, useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { ScenarioLayout } from "@/components/scenario/ScenarioLayout";
import { allEndodontiScenarios } from "./data";

const SECTIONS = [
  { id: "s-snabb", label: "⚡ Snabb Översikt" },
  { id: "s-anamnes", label: "❓ Anamnes" },
  { id: "s-status", label: "🔬 Status" },
  { id: "s-behandling", label: "🔧 Behandling" },
  { id: "s-journal", label: "📝 Journal" },
];

export default function EndodontiScenarioPage({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario: slug } = use(params);
  const scenario = allEndodontiScenarios[slug];

  if (!scenario) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState("s-snabb");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyJournal = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ScenarioLayout
      title={scenario.title}
      icdCode={scenario.icdCode}
      category="Endodonti"
      categoryEmoji="🦷"
      redFlags={scenario.redFlags}
      isPremium={false}
      userHasPremium={true}
      isPediatric={false}
    >
      <div className="space-y-8 pb-20">

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`pill-button${activeTab === id ? " active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Snabböversikt */}
        <section id="s-snabb" className="glass-bento p-6">
          <h2 className="text-2xl mb-4 font-display italic text-primary flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">⚡</span>
            Scenario: {scenario.title}
          </h2>

          <div className="space-y-4">
            {scenario.isAcute && (
              <div className="bg-red-50/80 border border-red-200 text-red-800 p-4 rounded-xl flex gap-3 items-start">
                <span className="text-xl mt-0.5">🚨</span>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide">Akut Scenario</h4>
                  <p className="text-sm">Observera röda flaggor och handlägg skyndsamt.</p>
                </div>
              </div>
            )}

            <div className="grid gap-3 mt-4">
              {scenario.snabbOversikt.map((item: any, i: number) => (
                <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-black/5 pb-3 last:border-0">
                  <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground min-w-[140px] pt-0.5">{item.label}:</span>
                  <span className="text-base text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anamnes */}
        <section id="s-anamnes" className="glass-bento p-6">
          <h2 className="text-2xl mb-6 font-display italic text-primary flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">2</span>
            Anamnes – Obligatoriska frågor
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 rounded-xl p-5 border border-white/80">
              <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-4">Obligatoriska frågor</h3>
              <ul className="space-y-4">
                {scenario.anamnes.obligatoriska.map((item: any, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <p className="font-medium text-foreground">{item.q}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 font-mono bg-black/5 inline-block px-2 py-0.5 rounded">Riktmärke: {item.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {scenario.anamnes.kompletterande && (
              <div className="bg-white/60 rounded-xl p-5 border border-white/80">
                <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-4">Kompletterande frågor</h3>
                <ul className="space-y-3">
                  {scenario.anamnes.kompletterande.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-foreground font-medium">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Status */}
        <section id="s-status" className="glass-bento p-6">
          <h2 className="text-2xl mb-6 font-display italic text-primary flex items-center gap-2">
            <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">👁️</span>
            Status – Inspektion & Undersökning
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-xl p-5 border border-white/80 flex gap-3">
              <span className="text-2xl">🧊</span>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Sensibilitet</h4>
                <p className="font-medium text-foreground">{scenario.status.sensibilitet}</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-5 border border-white/80 flex gap-3">
              <span className="text-2xl">🔨</span>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Perkussion</h4>
                <p className="font-medium text-foreground">{scenario.status.perkussion}</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-5 border border-white/80 flex gap-3">
              <span className="text-2xl">👆</span>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Palpation</h4>
                <p className="font-medium text-foreground">{scenario.status.palpation}</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-5 border border-white/80 flex gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Inspektion</h4>
                <ul className="font-medium text-foreground space-y-1">
                  {scenario.status.inspektion.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary opacity-50">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostik */}
        <section className="glass-bento p-6">
          <h2 className="text-2xl mb-6 font-display italic text-primary flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">📋</span>
            Diagnostik
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Kriterier / Indikation</h4>
              <p className="text-lg font-medium text-primary bg-white/40 p-4 rounded-xl">{scenario.diagnostik.kriterier}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-5 border border-white/80">
                <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-3">📸 Radiologiska fynd</h4>
                <ul className="space-y-2 font-medium">
                  {scenario.diagnostik.rtg.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary opacity-50">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                <h4 className="font-bold text-sm uppercase tracking-wide text-red-800 mb-3">⛔ Uteslutningskriterier</h4>
                <ul className="space-y-2 font-medium text-red-900/80">
                  {scenario.diagnostik.uteslut.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-red-500 opacity-50">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Behandling */}
        <section id="s-behandling" className="glass-bento p-6">
          <h2 className="text-2xl mb-6 font-display italic text-primary flex items-center gap-2">
            <span className="bg-orange-100 text-secondary w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">⚙️</span>
            Behandlingsprotokoll
          </h2>

          {scenario.behandling.varning && (
            <div className="mb-6 bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <p className="font-bold text-amber-800 uppercase tracking-wide text-xs mb-1">Klinisk Varning</p>
              <p className="text-amber-900 font-medium">{scenario.behandling.varning}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {scenario.behandling.alternativ.map((alt: any, i: number) => (
              <div key={i} className="bg-white/70 rounded-2xl p-6 border border-white shadow-sm hover-lift relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-orange-300" />
                <h3 className="font-bold text-lg text-primary mb-2">{alt.title}</h3>

                {alt.indikation && (
                  <p className="text-sm text-muted-foreground mb-4 font-medium bg-black/5 inline-block px-2 py-1 rounded">
                    Indikation: {alt.indikation}
                  </p>
                )}

                <ol className="space-y-3 font-medium text-primary/90 mt-2 mb-6">
                  {alt.metod.map((m: string, j: number) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-secondary font-mono text-sm mt-0.5">{j + 1}.</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto pt-4 border-t border-black/5 flex flex-wrap gap-3 items-center text-xs font-mono text-muted-foreground">
                  {alt.tid && <span className="bg-white px-2 py-1 rounded shadow-sm border border-black/5 flex items-center gap-1">⏱️ {alt.tid}</span>}
                  {alt.koder && <span className="bg-white px-2 py-1 rounded shadow-sm border border-black/5 flex items-center gap-1">💳 {alt.koder}</span>}
                </div>
              </div>
            ))}
          </div>

          {scenario.behandling.antibiotika && (
            <div className="mt-4 bg-white/60 rounded-xl p-5 border border-white/80">
              <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-2 flex items-center gap-2">
                💊 Antibiotika / Farmaka
              </h4>
              <p className="font-medium text-foreground">{scenario.behandling.antibiotika}</p>
            </div>
          )}
        </section>

        {/* Uppföljning & Differentialdiagnoser */}
        <section className="grid md:grid-cols-2 gap-8">
          {scenario.uppfoljning && (
            <div className="glass-bento p-6">
              <h2 className="text-xl mb-4 font-display italic text-primary flex items-center gap-2">
                <span className="text-lg not-italic">📊</span> Uppföljning
              </h2>
              <p className="font-medium text-primary/80 whitespace-pre-line leading-relaxed">
                {scenario.uppfoljning.text}
              </p>
            </div>
          )}

          {scenario.diffDiagnoser && (
            <div className="glass-bento p-6">
              <h2 className="text-xl mb-4 font-display italic text-primary flex items-center gap-2">
                <span className="text-lg not-italic">🔍</span> Differentialdiagnoser
              </h2>
              <ul className="space-y-4">
                {scenario.diffDiagnoser.map((diff: any, i: number) => (
                  <li key={i} className="border-b border-black/5 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground">{diff.namn}</span>
                      {diff.kod !== "-" && <span className="font-mono text-xs bg-black/5 px-2 py-0.5 rounded text-muted-foreground">{diff.kod}</span>}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Skillnad: {diff.skillnad}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Journal */}
        <section id="s-journal" className="glass-bento p-6">
          <h2 className="text-2xl mb-6 font-display italic text-primary flex items-center gap-2">
            <span className="text-xl not-italic">📝</span>
            Dokumentation (Journalmallar)
          </h2>

          <div className="space-y-6">
            {scenario.journal.map((mall: any, i: number) => (
              <div key={i}>
                <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-2 ml-1">{mall.titel}</h4>
                <div className="journal-box">
                  <button
                    className="copy-btn hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                    onClick={() => copyJournal(mall.text, i)}
                  >
                    {copiedIndex === i ? "✓ Kopierad" : "Kopiera"}
                  </button>
                  {mall.text}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </ScenarioLayout>
  );
}
