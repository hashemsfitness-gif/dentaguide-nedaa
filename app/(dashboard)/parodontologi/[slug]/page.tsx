"use client";

import { use, useState, useEffect, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { parodontoloiScenarier } from "@/lib/data/parodontologi-scenarios";
import BPEKarta from "@/components/tools/BPEKarta";

/* ─── Scenario list for left sidebar ───────────────────── */
const SCENARIO_NAV = [
  { slug: "gingivit-parodontit", id: "VARK-11-PAROD", quote: "Det blöder när jag borstar och tandköttet ömmar", title: "Gingivit / Parodontit" },
  { slug: "perikoronit", id: "VARK-05-PERI", quote: "Ont längst bak i käken / svårt att gapa", title: "Perikoronit" },
  { slug: "parodontal-abscess", id: "VARK-12-PARAB", quote: "Det bultar i tandköttet, tanden känns lös/hög", title: "Parodontal Abscess" },
  { slug: "anug-herpes", id: "VARK-11-GING", quote: "Det svider, blöder och luktar illa i munnen", title: "ANUG / Herpes" },
  { slug: "periimplantit", id: "VARK-13-IMPL", quote: "Det gör ont runt implantatet, det blöder och gungar", title: "Periimplantit" },
  { slug: "furkationsdiagnostik", id: "PARO-26-FK", quote: "Tandläkaren hittade ett djupt hål under molaren", title: "Furkationspåverkan" },
];

/* ─── Tab definitions ───────────────────────────────────── */
const TABS = [
  { id: "s-snabb", label: "Snabb-Översikt", icon: "⚡" },
  { id: "s-anamnes", label: "Anamnes", icon: "❓" },
  { id: "s-status", label: "Status", icon: "🔬" },
  { id: "s-diagnos", label: "Diagnos-tik", icon: "📋" },
  { id: "s-behandling", label: "Behand-ling", icon: "⚙️" },
  { id: "s-journal", label: "Journal", icon: "📝" },
];

/* ─── Tool buttons (static — same for all scenarios) ───── */
const VERKTYG = [
  { label: "Antibiotikastöd", href: "/tools/antibiotika" },
  { label: "Farmaka", href: "/tools/lakemedel" },
  { label: "Journalmallgenerator", href: "/tools/journal" },
];

export default function ParodontoloiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const scenario = parodontoloiScenarier[slug];
  const router = useRouter();

  if (!scenario) notFound();

  const [activeTab, setActiveTab] = useState("s-snabb");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandBPE, setExpandBPE] = useState(false);
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

  const copyJournal = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (err) {
        Sentry.captureException(err);
      }
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  /* First critical red flag for sidebar */
  const criticalFlag = scenario.redFlags.find((f) => f.severity === "critical");

  return (
    <div data-theme="stitch-pro" className="relative" style={{ background: "#f7f2ee", minHeight: "100vh" }}>
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
          <Link href="/parodontologi" className="text-sm text-white font-semibold border-b border-white/50 pb-0.5">
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
            <div className="w-7 h-7 rounded-full bg-[#CC5833] flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">
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
          aria-label="Scenariolista — Parodontologi"
        >
          <div className="px-4 mb-4">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Scenario Selection</p>
            <h2 className="font-display italic text-xl text-[#091B14]">Clinical Protocols</h2>
          </div>

          <nav className="px-3 space-y-2" aria-label="Parodontologi-scenarier">
            {SCENARIO_NAV.map((s) => {
              const isActive = s.slug === slug;
              return (
                <Link key={s.slug} href={`/parodontologi/${s.slug}`}>
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
        </aside>

        {/* ── CENTER CONTENT ────────────────────────────────── */}
        <main
          className="flex-1 lg:ml-[220px] lg:mr-[260px] overflow-y-auto px-6 py-6 pb-20"
          aria-label={`Kliniskt scenario: ${scenario.title}`}
        >
          {/* Scenario Header Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-5">
            <p className="text-xs font-mono text-[#CC5833] uppercase tracking-[0.15em] mb-3">
              {scenario.title.toUpperCase()}
            </p>
            <h1 className="font-display italic text-3xl md:text-4xl text-[#091B14] leading-tight">
              &ldquo;{scenario.patientUtsaga}&rdquo;
            </h1>
          </div>

          {/* Tab Pills */}
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Scenariosektioner">
            {TABS.map(({ id, label, icon }) => (
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
            ))}
          </div>

          {/* ── SNABB-ÖVERSIKT ──────────────────────────────── */}
          <section id="s-snabb" className="bg-white rounded-3xl p-7 shadow-sm mb-4" aria-labelledby="heading-snabb">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  scenario.isAcute ? "bg-orange-100" : "bg-blue-50"
                }`}
                aria-hidden="true"
              >
                <span className="text-xl">{scenario.isAcute ? "⚡" : "📋"}</span>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#CC5833] uppercase tracking-widest mb-1">
                  {scenario.id}
                </p>
                <h2 id="heading-snabb" className="font-display italic text-2xl text-[#091B14]">
                  Scenario: {scenario.title}
                </h2>
              </div>
            </div>

            {scenario.isAcute && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex gap-3 items-start">
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
              <p className="font-mono text-sm text-[#091B14] font-medium">{scenario.icdCode}</p>
            </div>
          </section>

          {/* ── ANAMNES ─────────────────────────────────────── */}
          <section id="s-anamnes" className="bg-white rounded-3xl p-7 shadow-sm mb-4" aria-labelledby="heading-anamnes">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">❓</span>
              </div>
              <h2 id="heading-anamnes" className="font-display italic text-2xl text-[#091B14]">
                Anamnes – Obligatoriska frågor
              </h2>
            </div>

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
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#CC5833] mb-4">Systemisk påverkan</h3>
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

            {scenario.anamnes.riskfaktorer && (
              <div className="mt-4 bg-amber-50/80 rounded-2xl p-4 border border-amber-200/60">
                <h3 className="font-bold text-xs uppercase tracking-wide text-amber-800 mb-2">Riskfaktorer</h3>
                <div className="flex flex-wrap gap-2">
                  {scenario.anamnes.riskfaktorer.map((r, i) => (
                    <span key={i} className="text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ── STATUS ──────────────────────────────────────── */}
          <section id="s-status" className="bg-white rounded-3xl p-7 shadow-sm mb-4" aria-labelledby="heading-status">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">🔬</span>
              </div>
              <h2 id="heading-status" className="font-display italic text-2xl text-[#091B14]">
                Status – Inspektion & Undersökning
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50/80 rounded-2xl p-5">
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-3">🔍 Inspektion</h3>
                <ul className="space-y-2" role="list">
                  {scenario.status.inspektion.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm font-medium text-[#091B14]">
                      <span className="text-[#CC5833] opacity-50 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {scenario.status.palpation && (
                  <div className="bg-gray-50/80 rounded-2xl p-5 flex gap-3">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">👆</span>
                    <div>
                      <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-1">Palpation</h3>
                      <p className="text-sm font-medium text-[#091B14]">{scenario.status.palpation}</p>
                    </div>
                  </div>
                )}
                {scenario.status.perkussion && (
                  <div className="bg-gray-50/80 rounded-2xl p-5 flex gap-3">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">🔨</span>
                    <div>
                      <h3 className="font-bold text-xs uppercase tracking-wide text-[#091B14] mb-1">Perkussion</h3>
                      <p className="text-sm font-medium text-[#091B14]">{scenario.status.perkussion}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BPE inline for relevant scenarios */}
            {scenario.showBPE && scenario.status.bpe && (
              <div className="mt-4 border border-[#CC5833]/20 rounded-2xl p-5 bg-orange-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#091B14]">BPE-screening</span>
                    <span className="badge badge-icd text-[9px]">WHO-sond</span>
                  </div>
                  <button
                    onClick={() => setExpandBPE(!expandBPE)}
                    className="text-xs font-mono text-[#CC5833] hover:text-[#a84429] transition-colors"
                    aria-expanded={expandBPE}
                    aria-controls="bpe-karta-inline"
                  >
                    {expandBPE ? "Dölj karta ▲" : "Öppna karta ▼"}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-3">{scenario.status.bpe.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-green-50 rounded-xl p-3">
                    <span className="font-bold text-green-800 block mb-1">Normalt</span>
                    <span className="text-green-700">{scenario.status.bpe.normalt}</span>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3">
                    <span className="font-bold text-red-800 block mb-1">Patologiskt</span>
                    <span className="text-red-700">{scenario.status.bpe.patologiskt}</span>
                  </div>
                </div>
                {expandBPE && (
                  <div id="bpe-karta-inline" className="mt-4 bg-white rounded-2xl p-4 border border-gray-100">
                    <BPEKarta />
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ── DIAGNOSTIK + RÖDA FLAGGOR ───────────────────── */}
          <section id="s-diagnos" className="mb-4 grid md:grid-cols-2 gap-4" aria-labelledby="heading-diagnos">
            <div className="bg-white rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-sm">📋</span>
                </div>
                <h2 id="heading-diagnos" className="font-display italic text-xl text-[#091B14]">Diagnostik</h2>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Kriterier / Indikation</p>
                <p className="text-sm font-medium text-[#091B14] bg-gray-50/80 rounded-2xl p-4 leading-relaxed">
                  {scenario.diagnostik.kriterier}
                </p>
              </div>

              {scenario.diagnostik.rtg && (
                <div className="mb-4 bg-gray-50/80 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#091B14] mb-2">📸 Radiologiska fynd</p>
                  <ul className="space-y-1.5" role="list">
                    {scenario.diagnostik.rtg.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm font-medium text-[#091B14]">
                        <span className="text-[#CC5833] opacity-40 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scenario.diagnostik.klassifikation && (
                <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-800 mb-2">Klassifikation</p>
                  <p className="text-xs font-medium text-blue-900 leading-relaxed whitespace-pre-line">
                    {scenario.diagnostik.klassifikation}
                  </p>
                </div>
              )}
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
                      <span className="text-sm" aria-hidden="true">{flag.severity === "critical" ? "🔴" : "🟡"}</span>
                      <span className="font-bold text-sm text-white">{flag.title}</span>
                    </div>
                    <p className="text-sm text-white/85 leading-relaxed pl-6">{flag.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Uteslutningskriterier */}
          <div className="bg-red-50/70 rounded-2xl p-5 border border-red-100 mb-4">
            <h3 className="font-bold text-xs uppercase tracking-wide text-red-800 mb-3">⛔ Uteslutningskriterier / Differentiering</h3>
            <ul className="space-y-2" role="list">
              {scenario.diagnostik.uteslut.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm font-medium text-red-900/80">
                  <span className="text-red-400 opacity-60 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── BEHANDLINGSPROTOKOLL ─────────────────────────── */}
          <section id="s-behandling" className="bg-white rounded-3xl p-7 shadow-sm mb-4" aria-labelledby="heading-beh">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">⚙️</span>
              </div>
              <h2 id="heading-beh" className="font-display italic text-2xl text-[#091B14]">Behandlingsprotokoll</h2>
            </div>

            {scenario.behandling.varning && (
              <div className="mb-5 bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-2xl">
                <p className="font-bold text-amber-800 uppercase tracking-wide text-xs mb-1">Klinisk Varning</p>
                <p className="text-sm text-amber-900 font-medium leading-relaxed">{scenario.behandling.varning}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {scenario.behandling.alternativ.map((alt, i) => (
                <div key={i} className="relative overflow-hidden bg-gray-50/80 rounded-2xl p-5 border border-white hover-lift">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC5833] to-[#E07B39]" aria-hidden="true" />
                  <h3 className="font-bold text-sm text-[#091B14] mb-2 mt-1">{alt.title}</h3>

                  {alt.specialist && (
                    <span className="inline-block badge badge-warning mb-2">Specialistindikation</span>
                  )}

                  {alt.indikation && (
                    <p className="text-xs text-gray-500 mb-3 bg-white/80 px-2 py-1 rounded-lg inline-block">
                      Indikation: {alt.indikation}
                    </p>
                  )}

                  <ol className="space-y-2 mb-4" role="list">
                    {alt.metod.map((m, j) => (
                      <li key={j} className="flex gap-2.5 text-sm font-medium text-[#091B14]">
                        <span className="text-[#CC5833] font-mono text-xs mt-0.5 flex-shrink-0">{j + 1}.</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>

                  {(alt.tid || alt.koder) && (
                    <div className="mt-auto pt-3 border-t border-black/5 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
                      {alt.tid && <span className="bg-white px-2 py-1 rounded-lg shadow-sm border border-black/5">⏱️ {alt.tid}</span>}
                      {alt.koder && <span className="bg-white px-2 py-1 rounded-lg shadow-sm border border-black/5">💳 {alt.koder}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {scenario.behandling.antibiotika && (
              <div className="mt-4 bg-blue-50/60 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-sm text-[#091B14] mb-2 flex items-center gap-2">
                  <span aria-hidden="true">💊</span> Antibiotika / Farmakologi
                </h3>
                <p className="text-sm font-medium text-[#091B14] leading-relaxed whitespace-pre-line">
                  {scenario.behandling.antibiotika}
                </p>
              </div>
            )}

            {scenario.behandling.lokalbehandling && (
              <div className="mt-3 bg-green-50/60 rounded-2xl p-4 border border-green-100">
                <h3 className="font-bold text-xs uppercase tracking-wide text-green-800 mb-2">Lokalbehandling</h3>
                <p className="text-sm font-medium text-green-900">{scenario.behandling.lokalbehandling}</p>
              </div>
            )}
          </section>

          {/* ── UPPFÖLJNING + DIFFERENTIALDIAGNOSER ─────────── */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-display italic text-xl text-[#091B14] mb-4 flex items-center gap-2">
                <span aria-hidden="true">📊</span> Uppföljning
              </h2>
              <p className="text-sm font-medium text-[#091B14]/80 whitespace-pre-line leading-relaxed">
                {scenario.uppfoljning.text}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-display italic text-xl text-[#091B14] mb-4 flex items-center gap-2">
                <span aria-hidden="true">🔍</span> Differentialdiagnoser
              </h2>
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
          </div>

          {/* ── JOURNAL ─────────────────────────────────────── */}
          <section id="s-journal" className="bg-white rounded-3xl p-7 shadow-sm mb-4" aria-labelledby="heading-journal">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-sm">📝</span>
              </div>
              <h2 id="heading-journal" className="font-display italic text-2xl text-[#091B14]">
                Dokumentation (Journalmallar)
              </h2>
            </div>
            <div className="space-y-5">
              {scenario.journal.map((mall, i) => (
                <div key={i}>
                  <h3 className="font-bold text-xs uppercase tracking-wide text-gray-400 mb-2 ml-1">
                    {mall.titel}
                  </h3>
                  <div className="journal-box">
                    <button
                      className="copy-btn"
                      onClick={() => copyJournal(mall.text, i)}
                      aria-label={`Kopiera ${mall.titel}`}
                    >
                      {copiedIndex === i ? "✓ Kopierad" : "Kopiera"}
                    </button>
                    {mall.text}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PSL footer */}
          <div className="text-center pt-4">
            <span className="psl-footer">
              PSL 2010:659 — Beslutsstöd ersätter inte kliniskt omdöme. Granskas av legitimerad tandläkare.
            </span>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR — Static tools + Dynamic content ── */}
        <aside
          className="hidden lg:flex flex-col fixed right-0 top-20 bottom-0 w-[260px] overflow-y-auto no-scrollbar py-6 px-5 space-y-6"
          style={{ background: "#f7f2ee", borderLeft: "1px solid rgba(0,0,0,0.06)" }}
          aria-label="Kliniska verktyg och kontext"
        >
          {/* KLINISKA VERKTYG — Static for all parodontologi scenarios */}
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Kliniska Verktyg</p>
            <div className="space-y-2">
              {VERKTYG.map((v) => (
                <Link key={v.label} href={v.href}>
                  <div className="w-full flex items-center justify-between bg-[#1E3028] text-white rounded-full px-4 py-3 text-sm font-medium hover:bg-[#2a4038] transition-colors cursor-pointer">
                    <span>{v.label}</span>
                    <span className="text-white/50" aria-hidden="true">›</span>
                  </div>
                </Link>
              ))}

              {/* BPE-karta button for relevant scenarios */}
              {scenario.showBPE && (
                <button
                  onClick={() => {
                    setExpandBPE(true);
                    scrollTo("s-status");
                  }}
                  className="w-full flex items-center justify-between bg-[#0E3B52] text-white rounded-full px-4 py-3 text-sm font-medium hover:bg-[#1a5070] transition-colors"
                >
                  <span>BPE-karta</span>
                  <span className="text-white/50" aria-hidden="true">›</span>
                </button>
              )}

              <Link href="/tools/parodklassifikation">
                <div className="w-full flex items-center justify-between bg-[#1E3028] text-white rounded-full px-4 py-3 text-sm font-medium hover:bg-[#2a4038] transition-colors cursor-pointer">
                  <span>Parod-klassificerare</span>
                  <span className="text-white/50" aria-hidden="true">›</span>
                </div>
              </Link>
            </div>
          </div>

          {/* DIFFERENTIALDIAGNOSER — Dynamic per scenario */}
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

          {/* KLINISKA ANTECKNINGAR — Dynamic per scenario */}
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Kliniska Anteckningar</p>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              {scenario.kliniskaAnteckningar}
            </p>
          </div>

          {/* KLINISK VARNINGSSIGNAL — Dynamic: first critical flag */}
          {criticalFlag && (
            <div>
              <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span aria-hidden="true">▲</span> Klinisk Varningssignal
              </p>
              <p className="text-xs text-red-600 font-medium leading-relaxed">
                <strong>{criticalFlag.title}:</strong> {criticalFlag.description.split("→")[0].trim()}.
              </p>
            </div>
          )}

          {/* PSL mini */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-[9px] text-gray-400 leading-relaxed">
              PSL 2010:659 — Beslutsstöd, ej kliniskt omdöme.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
