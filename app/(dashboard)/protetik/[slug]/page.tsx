"use client";

import { use, useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { protetikScenarier } from "@/lib/data/protetik-scenarios";
import { ImplantatTorque } from "@/components/tools/ImplantatTorque";
import { FerruleKalkylator } from "@/components/tools/FerruleKalkylator";

/* ─── Scenario nav ──────────────────────────────────────── */
const SCENARIO_NAV = [
  { slug: "lossnad-tillfallig-krona", id: "PROT-15-PROV", quote: "Min tillfälliga krona har trillat loss", title: "Lossnad tillfällig krona" },
  { slug: "implantat-komplikation", id: "PROT-16-IMPKOMP", quote: "Min implantattand sitter löst / glappar", title: "Implantat-komplikation" },
  { slug: "fraktur-stodtand", id: "PROT-17-FRAKPEL", quote: "Kronan har lossnat och tanden sitter kvar inuti", title: "Fraktur av stödtand" },
  { slug: "tryckssar-protesstomatit", id: "PROT-18-DECUB", quote: "Protesen skaver och det gör ont när jag äter", title: "Trycksår / Protesstomatit" },
  { slug: "fraktur-protes", id: "PROT-19-PROFRAK", quote: "Min protes har gått sönder", title: "Fraktur av avtagbar protes" },
  { slug: "porslinsfraktur", id: "PROT-20-CHIP", quote: "En bit av porslinet har lossnat", title: "Porslinsfraktur" },
  { slug: "lossnad-krona", id: "PROT-21-LOSSKR", quote: "Min krona har trillat loss", title: "Lossnad permanent krona / bro" },
];

/* ─── Tabs ──────────────────────────────────────────────── */
const TABS = [
  { id: "s-snabb", label: "Snabb-Översikt", icon: "⚡" },
  { id: "s-anamnes", label: "Anamnes", icon: "❓" },
  { id: "s-status", label: "Status", icon: "🔬" },
  { id: "s-behandling", label: "Behand-ling", icon: "⚙️" },
  { id: "s-material", label: "Materialval", icon: "🦷" },
  { id: "s-journal", label: "Journal", icon: "📝" },
];

/* ─── Static tools available on all protetik scenarios ─── */
const STATIC_VERKTYG = [
  { label: "Journalmallgenerator", href: "/tools/journal" },
  { label: "Doseringskalkylator", href: "/tools/dosering" },
];

/* ─── Protetik clinical notes per scenario ─────────────── */
const KLINISKA_ANTECKNINGAR: Record<string, string> = {
  "lossnad-tillfallig-krona": "Temp-cement ALLTID — aldrig permanent cement för provisorium. Eugenolfritt cement obligatoriskt om permanent ska bondas.",
  "implantat-komplikation": "⚠️ Verifiera torque mot tillverkarens IFU — aldrig generella värden. Svalgskydd vid arbete med lösa komponenter.",
  "fraktur-stodtand": "Ferrule-effekt ≥ 2mm. Subgingival fraktur = extraktion. ALDRIG acceptera 1,5mm.",
  "tryckssar-protesstomatit": "Sår ska läka inom 14 dagar. Induration = malignitetssignal → remiss omedelbart.",
  "fraktur-protes": "Sticky-wax för fixering — INTE superlim. Rebasering om protesen vickade, annars bryts den igen.",
  "porslinsfraktur": "Kontrollera implantatkronans rörlighet INNAN reparation. Bruxism → bettskena indicerad.",
  "lossnad-krona": "⚠️ ASPIRATIONSANAMNES ALLTID FÖRST. Zirkonia: Ivoclean + Monobond Plus + Variolink. MK: Zinkfosfat.",
};

export default function ProtetikScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const scenario = protetikScenarier[slug];

  if (!scenario) notFound();

  const [activeTab, setActiveTab] = useState("s-snabb");
  const [copiedJournal, setCopiedJournal] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Scroll-sync: active tab follows visible section */
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

  const copyJournal = async () => {
    try {
      await navigator.clipboard.writeText(scenario.journal.malltext);
      setCopiedJournal(true);
      setTimeout(() => setCopiedJournal(false), 2000);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = scenario.journal.malltext;
        ta.style.cssText = "position:fixed;opacity:0;";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopiedJournal(true);
        setTimeout(() => setCopiedJournal(false), 2000);
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  };

  const criticalFlag = scenario.redFlags.find((f) => f.severity === "critical");
  const hasImplantatTorque = scenario.verktyg.includes("implantat-torque");
  const hasFerruleKalk = scenario.verktyg.includes("ferrule-kalkylator");
  const hasMaterialval = !!scenario.materialval;
  const kliniskAnteckning = KLINISKA_ANTECKNINGAR[slug] ?? scenario.kliniskaAnteckningar;

  return (
    <div
      data-theme="stitch-pro"
      className="relative"
      style={{ background: "#f7f2ee", minHeight: "100vh" }}
    >
      <div className="noise-overlay" />

      {/* ══ TOP HEADER ══════════════════════════════════════════ */}
      <header className="header-gradient fixed top-0 left-0 right-0 z-50 flex items-center px-6 gap-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="font-display italic text-white text-xl tracking-tight">Tandguide</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 flex-1" aria-label="Huvudnavigation">
          <Link href="/tools" className="text-sm text-white/60 hover:text-white transition-colors font-medium">
            Diagnostic Hub
          </Link>
          <Link href="/protetik" className="text-sm text-white font-semibold border-b border-white/50 pb-0.5">
            Patient Records
          </Link>
          <Link href="/admin" className="text-sm text-white/60 hover:text-white transition-colors font-medium">
            Clinical Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <button aria-label="Notifieringar" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button aria-label="Inställningar" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
            <span className="text-sm text-white font-medium">Dr. Tandläkare</span>
            <div
              className="w-7 h-7 rounded-full bg-[#CC5833] flex items-center justify-center text-white text-xs font-bold"
              aria-hidden="true"
            >
              T
            </div>
          </div>
        </div>
      </header>

      {/* ══ 3-COLUMN BODY ══════════════════════════════════════ */}
      <div className="flex pt-20" style={{ minHeight: "calc(100vh - 80px)" }}>

        {/* ── LEFT SIDEBAR — Scenario List ──────────────────── */}
        <aside
          className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-[220px] overflow-y-auto no-scrollbar"
          style={{ background: "#f7f2ee", borderRight: "1px solid rgba(0,0,0,0.06)", paddingTop: "1.5rem", paddingBottom: "2rem" }}
          aria-label="Scenariolista — Protetik & Bettfunktion"
        >
          <div className="px-4 mb-4">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Scenario Selection</p>
            <h2 className="font-display italic text-xl text-[#091B14]">Clinical Protocols</h2>
          </div>

          <nav className="px-3 space-y-2" aria-label="Protetik-scenarier">
            {SCENARIO_NAV.map((s) => {
              const isActive = s.slug === slug;
              return (
                <Link key={s.slug} href={`/protetik/${s.slug}`}>
                  <div
                    className={`rounded-2xl p-3.5 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-[#1E3028] shadow-md"
                        : "bg-white/70 hover:bg-white hover:shadow-sm"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <p className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${isActive ? "text-white/40" : "text-gray-400"}`}>
                      {s.id}
                    </p>
                    <p className={`text-sm font-semibold leading-tight mb-1 ${isActive ? "text-white" : "text-[#091B14]"}`}>
                      &ldquo;{s.quote}&rdquo;
                    </p>
                    <p className={`text-xs ${isActive ? "text-white/50" : "text-gray-400"}`}>
                      {s.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 mt-4">
            <Link
              href="/protetik"
              className="flex items-center gap-2 text-xs font-mono text-[#CC5833] hover:text-[#a84429] transition-colors"
            >
              <span aria-hidden="true">+</span> Alla scenarier
            </Link>
          </div>
        </aside>

        {/* ── CENTER CONTENT ────────────────────────────────── */}
        <main
          className="flex-1 lg:ml-[220px] lg:mr-[260px] overflow-y-auto px-6 py-6 pb-20"
          aria-label={`Kliniskt scenario: ${scenario.name}`}
        >
          {/* Scenario Header Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-5">
            <p className="text-xs font-mono text-[#CC5833] uppercase tracking-[0.15em] mb-3">
              PROTETIK &amp; BETTFUNKTION
            </p>
            <h1 className="font-display italic text-3xl md:text-4xl text-[#091B14] leading-tight">
              &ldquo;{scenario.patientUtsaga}&rdquo;
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="badge badge-icd" aria-label={`ICD-10-SE: ${scenario.icd}`}>
                {scenario.icd}
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                {scenario.scId}
              </span>
              {scenario.isAcute && (
                <span className="badge badge-acute" aria-label="Akut scenario">AKUT</span>
              )}
            </div>
          </div>

          {/* Tab Pills */}
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Scenariosektioner">
            {TABS.map(({ id, label, icon }) => {
              if (id === "s-material" && !hasMaterialval) return null;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls={id}
                  onClick={() => scrollTo(id)}
                  className={`pill-button text-xs${activeTab === id ? " active" : ""}`}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* ── SNABB-ÖVERSIKT ──────────────────────────────── */}
          <section
            id="s-snabb"
            className="bg-white rounded-3xl p-7 shadow-sm mb-4"
            aria-labelledby="heading-snabb"
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  scenario.isAcute ? "bg-orange-100" : "bg-blue-50"
                }`}
                aria-hidden="true"
              >
                <span className="text-xl">{scenario.isAcute ? "⚡" : "👑"}</span>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#CC5833] uppercase tracking-widest mb-1">
                  {scenario.scId}
                </p>
                <h2 id="heading-snabb" className="font-display italic text-2xl text-[#091B14]">
                  Scenario: {scenario.name}
                </h2>
              </div>
            </div>

            {scenario.isAcute && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex gap-3 items-start" role="alert">
                <span className="text-red-500 text-lg mt-0.5" aria-hidden="true">🚨</span>
                <div>
                  <p className="font-bold text-red-800 text-sm uppercase tracking-wide">Akut scenario</p>
                  <p className="text-red-700 text-sm">Observera röda flaggor — handlägg skyndsamt.</p>
                </div>
              </div>
            )}

            <div className="border-l-4 border-[#CC5833] pl-4 mb-6">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Patientens Utsaga</p>
              <p className="font-display italic text-xl text-[#091B14]">&ldquo;{scenario.patientUtsaga}&rdquo;</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {scenario.snabbOversikt.map((item, i) => (
                <div key={i} className="bg-gray-50/80 rounded-2xl p-4">
                  <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">{item.label}:</p>
                  <p className="text-sm font-medium text-[#091B14] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">ICD-10-SE</p>
              <p className="font-mono text-sm text-[#091B14] font-medium">{scenario.icd}</p>
            </div>
          </section>

          {/* ── ANAMNES ─────────────────────────────────────── */}
          <section
            id="s-anamnes"
            className="bg-white rounded-3xl p-7 shadow-sm mb-4"
            aria-labelledby="heading-anamnes"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">❓</span>
              </div>
              <h2 id="heading-anamnes" className="font-display italic text-2xl text-[#091B14]">
                Anamnes – Obligatoriska frågor
              </h2>
            </div>

            {scenario.anamnes.varning && (
              <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl" role="alert">
                <p className="text-sm font-bold text-red-800 leading-relaxed">{scenario.anamnes.varning}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-4">Funktionell påverkan</h3>
                <ul className="space-y-4" role="list">
                  {scenario.anamnes.obligatoriska
                    .filter((_, i) => i < Math.ceil(scenario.anamnes.obligatoriska.length / 2))
                    .map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#CC5833] mt-1 flex-shrink-0" aria-hidden="true">•</span>
                        <div>
                          <p className="font-semibold text-sm text-[#091B14]">{item.q}</p>
                          <p className="text-xs text-gray-500 mt-0.5 font-mono bg-gray-50 px-2 py-0.5 rounded inline-block">
                            Riktmärke: {item.a}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#CC5833] mb-4">Systemisk / Protetisk historik</h3>
                <ul className="space-y-4" role="list">
                  {scenario.anamnes.obligatoriska
                    .filter((_, i) => i >= Math.ceil(scenario.anamnes.obligatoriska.length / 2))
                    .map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#CC5833] mt-1 flex-shrink-0" aria-hidden="true">•</span>
                        <div>
                          <p className="font-semibold text-sm text-[#091B14]">{item.q}</p>
                          <p className="text-xs text-gray-500 mt-0.5 font-mono bg-gray-50 px-2 py-0.5 rounded inline-block">
                            Riktmärke: {item.a}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {scenario.anamnes.kompletterande.length > 0 && (
              <div className="mt-6 bg-gray-50/80 rounded-2xl p-4">
                <h3 className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-3">Kompletterande frågor</h3>
                <ul className="space-y-2" role="list">
                  {scenario.anamnes.kompletterande.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm font-medium text-[#091B14]">
                      <span className="text-gray-300 mt-0.5" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── STATUS ──────────────────────────────────────── */}
          <section
            id="s-status"
            className="bg-white rounded-3xl p-7 shadow-sm mb-4"
            aria-labelledby="heading-status"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">🔬</span>
              </div>
              <h2 id="heading-status" className="font-display italic text-2xl text-[#091B14]">
                Status – Inspektion &amp; Undersökning
              </h2>
            </div>

            <div className="bg-gray-50/80 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-3">🔍 Inspektion</h3>
              <ul className="space-y-2.5" role="list">
                {scenario.status.inspektion.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm font-medium text-[#091B14]">
                    <span className="text-[#CC5833] opacity-50 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra status panels (e.g. protesinspektions-checklista) */}
            {scenario.status.extra?.map((panel, i) => (
              <div key={i} className="bg-blue-50/60 rounded-2xl p-5 mb-4 border border-blue-100">
                <h3 className="font-bold text-xs uppercase tracking-wide text-blue-900 mb-3">{panel.title}</h3>
                <ul className="space-y-2" role="list">
                  {panel.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm font-medium text-blue-900/80">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Ferrule-validator inline for sc17 */}
            {scenario.status.ferrule && (
              <div className="border border-[#CC5833]/20 rounded-2xl p-5 bg-orange-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-sm text-[#091B14]">Ferrule-krav</span>
                  <span className="badge badge-icd text-[9px]">Kritisk regel</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-green-50 rounded-xl p-3">
                    <span className="font-bold text-green-800 block mb-1">Krav</span>
                    <span className="text-green-700">{scenario.status.ferrule.kravet}</span>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3">
                    <span className="font-bold text-red-800 block mb-1">Kontraindikation</span>
                    <span className="text-red-700">{scenario.status.ferrule.kontraindikation}</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ── DIAGNOSTIK + RÖDA FLAGGOR ───────────────────── */}
          <section
            id="s-diagnos"
            className="mb-4 grid md:grid-cols-2 gap-4"
            aria-labelledby="heading-diagnos"
          >
            {/* Differentialdiagnoser */}
            <div className="bg-white rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-sm">🔍</span>
                </div>
                <h2 id="heading-diagnos" className="font-display italic text-xl text-[#091B14]">Differentialdiagnoser</h2>
              </div>
              <ul className="space-y-3" role="list">
                {scenario.diffDiagnoser.map((diff, i) => (
                  <li key={i} className="border-b border-black/5 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-[#091B14]">{diff.namn}</span>
                      {diff.kod !== "-" && (
                        <span className="font-mono text-[9px] bg-black/5 px-1.5 py-0.5 rounded text-gray-400">
                          {diff.kod}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-500">Skillnad: {diff.skillnad}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* RÖDA FLAGGOR — ALLTID synliga, aldrig bakom accordion */}
            <div className="roda-flaggor" role="alert" aria-label="Röda flaggor — klinisk varning">
              <h3 className="font-body font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <span aria-hidden="true">🚩</span> Röda Flaggor
              </h3>
              <ul className="space-y-4" role="list">
                {scenario.redFlags.map((flag) => (
                  <li key={flag.id} className="border-b border-white/20 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm" aria-hidden="true">
                        {flag.severity === "critical" ? "🔴" : "🟡"}
                      </span>
                      <span className="font-bold text-sm text-white">{flag.title}</span>
                    </div>
                    <p className="text-sm text-white/85 leading-relaxed pl-6">{flag.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── BEHANDLINGSPROTOKOLL ─────────────────────────── */}
          <section
            id="s-behandling"
            className="bg-white rounded-3xl p-7 shadow-sm mb-4"
            aria-labelledby="heading-beh"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">⚙️</span>
              </div>
              <h2 id="heading-beh" className="font-display italic text-2xl text-[#091B14]">
                Behandlingsprotokoll
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {scenario.behandling.map((alt, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden bg-gray-50/80 rounded-2xl p-5 border border-white hover-lift"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC5833] to-[#E07B39]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <span className="text-[10px] font-mono font-bold text-[#CC5833] uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-full">
                      {alt.alt}
                    </span>
                    {alt.specialist && (
                      <span className="badge badge-warning text-[9px]">Specialist</span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-[#091B14] mb-2">{alt.title}</h3>

                  {alt.indikation && (
                    <p className="text-xs text-gray-500 mb-3 bg-white/80 px-2 py-1 rounded-lg">
                      Indikation: {alt.indikation}
                    </p>
                  )}

                  <ol className="space-y-2 mb-4" role="list">
                    {alt.steg.map((step, j) => (
                      <li key={j} className="flex gap-2.5 text-sm font-medium text-[#091B14]">
                        <span className="text-[#CC5833] font-mono text-xs mt-0.5 flex-shrink-0">
                          {j + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  {alt.koder && (
                    <div className="mt-auto pt-3 border-t border-black/5">
                      <span className="text-xs font-mono text-gray-400 bg-white px-2 py-1 rounded-lg shadow-sm border border-black/5">
                        💳 {alt.koder}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Uppföljning */}
            {scenario.uppfoljning.length > 0 && (
              <div className="mt-5 bg-blue-50/60 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-sm text-[#091B14] mb-3 flex items-center gap-2">
                  <span aria-hidden="true">📊</span> Uppföljning
                </h3>
                <ul className="space-y-2" role="list">
                  {scenario.uppfoljning.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm font-medium text-blue-900/80">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── MATERIALVAL ──────────────────────────────────── */}
          {hasMaterialval && scenario.materialval && (
            <section
              id="s-material"
              className="bg-white rounded-3xl p-7 shadow-sm mb-4"
              aria-labelledby="heading-material"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-sm">🦷</span>
                </div>
                <h2 id="heading-material" className="font-display italic text-2xl text-[#091B14]">
                  Materialval &amp; Cementering
                </h2>
              </div>

              {scenario.materialval.intro && (
                <div className="mb-5 bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-2xl">
                  <p className="text-sm font-medium text-amber-900 leading-relaxed">
                    {scenario.materialval.intro}
                  </p>
                </div>
              )}

              {scenario.materialval.eugenolRegel && (
                <div className="mb-5 bg-red-50/80 rounded-2xl p-4 border border-red-200" role="note">
                  <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">
                    ⚠️ Eugenol-regel
                  </p>
                  <p className="text-sm text-red-900 font-medium leading-relaxed">
                    {scenario.materialval.eugenolRegel}
                  </p>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse" aria-label="Materialval per konstruktionstyp">
                  <thead>
                    <tr className="border-b-2 border-[#CC5833]/20">
                      <th className="text-left p-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Permanent Ersättning
                      </th>
                      <th className="text-left p-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Material / Förbehandling
                      </th>
                      <th className="text-left p-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Temporärt Cement
                      </th>
                      <th className="text-left p-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Notering
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenario.materialval.alternativ.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="p-3 font-semibold text-[#091B14]">{row.kategori}</td>
                        <td className="p-3 text-gray-700">{row.material}</td>
                        <td className="p-3 text-gray-700 font-mono text-xs">{row.cement}</td>
                        <td
                          className={`p-3 text-xs font-bold ${
                            row.notering?.includes("ALDRIG") || row.notering?.includes("EJ")
                              ? "text-red-700"
                              : "text-gray-500"
                          }`}
                        >
                          {row.notering}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── JOURNAL ─────────────────────────────────────── */}
          <section
            id="s-journal"
            className="bg-white rounded-3xl p-7 shadow-sm mb-4"
            aria-labelledby="heading-journal"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">📝</span>
              </div>
              <h2 id="heading-journal" className="font-display italic text-2xl text-[#091B14]">
                Dokumentation (Journalmall)
              </h2>
            </div>

            <div className="journal-box" aria-label="Journalmall — klinisk dokumentation">
              <button
                className="copy-btn"
                onClick={copyJournal}
                aria-label="Kopiera journalmall till urklipp"
              >
                {copiedJournal ? "✓ Kopierad" : "Kopiera"}
              </button>
              {scenario.journal.malltext}
            </div>

            {/* TLV-koder */}
            <div className="mt-5 bg-gray-50/80 rounded-2xl p-5">
              <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-3">
                💳 Debiteringskoder (TLV)
              </h3>
              <dl className="space-y-2">
                {scenario.journal.tlvKoder.map((k) => (
                  <div key={k.kod} className="flex gap-3 items-start">
                    <dt className="font-mono font-bold text-sm text-[#CC5833] w-14 flex-shrink-0">
                      {k.kod}
                    </dt>
                    <dd className="text-sm text-[#091B14] font-medium">{k.beskrivning}</dd>
                  </div>
                ))}
              </dl>
              {scenario.journal.tlvNotering && (
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">{scenario.journal.tlvNotering}</p>
              )}
            </div>
          </section>

          {/* PSL footer */}
          <div className="text-center pt-4">
            <span className="psl-footer">
              PSL 2010:659 — Beslutsstöd ersätter inte kliniskt omdöme. Granskas av legitimerad tandläkare.
            </span>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR — Protetik-specific ───────────── */}
        <aside
          className="hidden lg:flex flex-col fixed right-0 top-20 bottom-0 w-[260px] overflow-y-auto no-scrollbar py-6 px-5 space-y-5"
          style={{ background: "#f7f2ee", borderLeft: "1px solid rgba(0,0,0,0.06)" }}
          aria-label="Kliniska verktyg och protetisk kontext"
        >
          {/* KLINISKA VERKTYG — Static tools */}
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Kliniska Verktyg</p>
            <div className="space-y-2">
              {/* Protetik-specific inline tools */}
              {hasImplantatTorque && (
                <div className="mb-2">
                  <ImplantatTorque />
                </div>
              )}
              {hasFerruleKalk && (
                <div className="mb-2">
                  <FerruleKalkylator />
                </div>
              )}

              {/* Static links */}
              {STATIC_VERKTYG.map((v) => (
                <Link key={v.label} href={v.href}>
                  <div className="w-full flex items-center justify-between bg-[#1E3028] text-white rounded-full px-4 py-3 text-sm font-medium hover:bg-[#2a4038] transition-colors cursor-pointer">
                    <span>{v.label}</span>
                    <span className="text-white/50" aria-hidden="true">›</span>
                  </div>
                </Link>
              ))}

              {/* Materialval shortcut if applicable */}
              {hasMaterialval && (
                <button
                  onClick={() => scrollTo("s-material")}
                  className="w-full flex items-center justify-between bg-[#0E3B52] text-white rounded-full px-4 py-3 text-sm font-medium hover:bg-[#1a5070] transition-colors"
                  aria-label="Gå till Materialval"
                >
                  <span>Cementval</span>
                  <span className="text-white/50" aria-hidden="true">›</span>
                </button>
              )}
            </div>
          </div>

          {/* DIFFERENTIALDIAGNOSER */}
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Differentialdiagnoser</p>
            <div className="space-y-2">
              {scenario.diffDiagnoser.map((diff) => (
                <button
                  key={diff.namn}
                  onClick={() => scrollTo("s-diagnos")}
                  className="w-full flex items-center justify-between bg-[#1E3028] text-white rounded-full px-4 py-2.5 text-xs font-medium hover:bg-[#2a4038] transition-colors text-left"
                  aria-label={`Differentialdiagnos: ${diff.namn}`}
                >
                  <span className="truncate">{diff.namn.split("(")[0].trim()}</span>
                  <span className="text-white/50 flex-shrink-0 ml-2" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* KLINISKA ANTECKNINGAR */}
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Kliniska Anteckningar</p>
            <div className="bg-[#fdf6ee] rounded-2xl p-4 border border-[#CC5833]/15">
              <p className="text-xs text-gray-700 leading-relaxed font-medium">{kliniskAnteckning}</p>
            </div>
          </div>

          {/* KLINISK VARNINGSSIGNAL */}
          {criticalFlag && (
            <div>
              <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span aria-hidden="true">▲</span> Klinisk Varningssignal
              </p>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4" role="alert">
                <p className="text-xs text-red-700 font-medium leading-relaxed">
                  <strong>{criticalFlag.title}:</strong>{" "}
                  {criticalFlag.description.split("→")[0].trim()}.
                </p>
              </div>
            </div>
          )}

          {/* PSL mini */}
          <div className="pt-2 border-t border-gray-200">
            <span className="psl-footer text-[9px]">
              📋 Beslutsstöd — ej kliniskt omdöme. PSL 2010:659.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
