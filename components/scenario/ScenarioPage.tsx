"use client";

/**
 * <ScenarioPage> — DELAD 3-kolumns klinisk scenario-layout.
 *
 * Gäller alla vuxenområden (endodonti, parodontologi, protetik,
 * käkkirurgi, bettfysiologi, oralmedicin). EJ pedodonti/ortodonti.
 *
 * Ren presentation. Varje områdes [slug]/page.tsx normaliserar sin
 * data till `NormalizedScenario` och passar in — ingen medicinsk data
 * skapas, ändras eller tappas här (noll dataförlust).
 *
 * Design: DESIGN.md "Kollegan vid stolen".
 *  - Editorial ram (AppShell ger nav+footer — denna komponent har
 *    INGEN egen header → ingen dubbelnav), klinisk tät kärna.
 *  - En accent (terrakotta via --secondary). Område = ikon/etikett.
 *  - Role-tokens (CSS-variabler --bg / --text / --border) → dual-mode-redo.
 *  - Inga sido-stripe-kanter, minimal emoji.
 *  - Röda flaggor ALLTID synliga, aldrig bakom flik/accordion.
 */

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import * as Sentry from "@sentry/nextjs";

/* ── Datakontrakt (superset — får aldrig tappa ett områdesfält) ── */

export type ScenarioRedFlag = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning";
};

export type NormalizedScenario = {
  areaHref: string; // /parodontologi
  areaLabel: string; // Parodontologi
  areaIcon?: ReactNode; // område = ikon/etikett, ALDRIG egen färg

  id: string; // scenario-kod, t.ex. VARK-11-PAROD
  title: string;
  patientUtsaga?: string;
  icdCode?: string;
  isAcute?: boolean;
  category?: string;

  /** Vänster scenario-nav inom området. */
  nav: Array<{ slug: string; id: string; quote: string; title: string }>;

  snabbOversikt?: Array<{ label: string; value: string }>;

  anamnes?: {
    obligatoriska?: Array<{ fraga: string; forvantatSvar?: string }>;
    kompletterande?: string[];
    riskfaktorer?: string[];
  };

  status?: {
    inspektion?: string[];
    palpation?: string;
    perkussion?: string;
    sensibilitet?: string;
    bpe?: { description: string; normalt: string; patologiskt: string };
    /** Valfri inline-widget (t.ex. <BPEKarta/>) som expanderas i status. */
    bpeWidget?: ReactNode;
  };

  diagnostik?: {
    kriterier?: string;
    rtg?: string[];
    klassifikation?: string;
    uteslut?: string[];
  };

  redFlags?: ScenarioRedFlag[];

  behandling?: {
    varning?: string;
    alternativ?: Array<{
      title: string;
      indikation?: string;
      metod?: string[];
      tid?: string;
      koder?: string;
      specialist?: boolean;
    }>;
    antibiotika?: string;
    lokalbehandling?: string;
  };

  uppfoljning?: { text?: string };

  diffDiagnoser?: Array<{ namn: string; kod?: string; skillnad?: string }>;

  journal?: Array<{ titel: string; text: string }>;

  kliniskaAnteckningar?: string;

  /** Höger-railens kliniska verktyg (område-/scenariospecifika). */
  verktyg?: Array<{ label: string; href: string; tone?: "primary" | "blue" }>;
};

/* ── Sektioner i läsflödet (mono-eyebrow, ingen dekor-emoji) ───── */

const TABS = [
  { id: "s-snabb", num: "00", label: "Översikt" },
  { id: "s-anamnes", num: "01", label: "Anamnes" },
  { id: "s-status", num: "02", label: "Status" },
  { id: "s-diagnos", num: "03", label: "Diagnostik" },
  { id: "s-behandling", num: "04", label: "Behandling" },
  { id: "s-journal", num: "05", label: "Journal" },
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-mono text-[11px] tracking-widest2 uppercase mb-2 font-bold"
      style={{ color: "var(--secondary)" }}
    >
      {children}
    </p>
  );
}

function Card({
  id,
  eyebrow,
  title,
  children,
  labelledBy,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="rounded-[22px] p-6 md:p-8 mb-4"
      style={{
        background: "var(--bg-card-solid, #fff)",
        border: "1px solid var(--border-light)",
      }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          id={labelledBy}
          className="font-display ed-italic text-[24px] md:text-[28px] leading-tight mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Bullets({
  items,
  tone = "muted",
}: {
  items: string[];
  tone?: "muted" | "accent";
}) {
  return (
    <ul className="space-y-1.5" role="list">
      {items.map((s, i) => (
        <li
          key={i}
          className="text-[15px] leading-relaxed flex gap-2.5 font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          <span
            aria-hidden
            className="mt-[7px] h-[5px] w-[5px] rounded-full flex-shrink-0"
            style={{
              background:
                tone === "accent" ? "var(--secondary)" : "var(--text-muted)",
            }}
          />
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-mono text-[11px] tracking-widest2 uppercase mb-2 font-bold"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

/* ── Huvudkomponent ───────────────────────────────────────────── */

export default function ScenarioPage({
  scenario,
}: {
  scenario: NormalizedScenario;
}) {
  const [activeTab, setActiveTab] = useState<string>("s-snabb");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandBPE, setExpandBPE] = useState(false);
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
      { rootMargin: "-20% 0px -60% 0px" },
    );
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [scenario.id]);

  const scrollTo = (id: string) => {
    try {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const criticalFlag = scenario.redFlags?.find((f) => f.severity === "critical");
  const half = scenario.anamnes?.obligatoriska
    ? Math.ceil(scenario.anamnes.obligatoriska.length / 2)
    : 0;

  return (
    <div
      className="flex"
      style={{ background: "var(--bg-main)", minHeight: "calc(100vh - 76px)" }}
    >
      {/* ── VÄNSTER: scenario-nav inom området ─────────────────── */}
      <aside
        className="hidden lg:flex flex-col sticky top-[76px] w-[260px] flex-shrink-0 self-start max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar py-6"
        style={{ borderRight: "1px solid var(--border-light)" }}
        aria-label={`Scenariolista — ${scenario.areaLabel}`}
      >
        <div className="px-4 mb-4">
          <p
            className="font-mono text-[11px] tracking-widest2 uppercase mb-1 font-bold"
            style={{ color: "var(--text-muted)" }}
          >
            {scenario.areaLabel}
          </p>
          <h2
            className="font-display ed-italic text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            Kliniska protokoll
          </h2>
        </div>
        <nav className="px-3 space-y-1.5" aria-label={`${scenario.areaLabel}-scenarier`}>
          {scenario.nav.map((s) => {
            const isActive = s.id === scenario.id || s.slug === scenario.id;
            return (
              <Link key={s.slug} href={`${scenario.areaHref}/${s.slug}`}>
                <div
                  className="rounded-2xl p-3.5 cursor-pointer transition-colors duration-200"
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    background: isActive
                      ? "var(--primary)"
                      : "var(--bg-card-solid, #fff)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <p
                    className="font-mono text-[11px] uppercase tracking-widest mb-0.5 font-bold"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.8)"
                        : "var(--secondary)",
                    }}
                  >
                    {s.id}
                  </p>
                  <p
                    className="text-sm font-bold leading-tight mb-1"
                    style={{ color: isActive ? "#fff" : "var(--text-primary)" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="text-xs italic"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.7)"
                        : "var(--text-muted)",
                    }}
                  >
                    &ldquo;{s.quote}&rdquo;
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── MITTEN: läsflöde ───────────────────────────────────── */}
      <main
        className="flex-1 min-w-0 px-4 md:px-8 py-6 pb-24"
        aria-label={`Kliniskt scenario: ${scenario.title}`}
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] mb-5 font-mono uppercase tracking-widest2">
          <Link
            href={scenario.areaHref}
            className="transition-colors hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            {scenario.areaLabel}
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{scenario.title}</span>
        </nav>

        {/* Header-kort */}
        <div
          className="rounded-[22px] p-7 md:p-9 mb-4"
          style={{
            background: "var(--bg-card-solid, #fff)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {scenario.areaIcon && (
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg"
                style={{ color: "var(--secondary)", background: "rgba(204,88,51,0.08)" }}
              >
                {scenario.areaIcon}
              </span>
            )}
            <span
              className="font-mono text-[11px] tracking-widest2 uppercase font-bold"
              style={{ color: "var(--secondary)" }}
            >
              {scenario.areaLabel} · {scenario.id}
            </span>
            {scenario.isAcute && (
              <span
                className="font-mono text-[11px] tracking-widest2 uppercase rounded-full px-2.5 py-0.5 font-bold"
                style={{
                  color: "var(--status-danger)",
                  background: "rgba(193,18,31,0.10)",
                  border: "1px solid rgba(193,18,31,0.30)",
                }}
              >
                Akut
              </span>
            )}
          </div>
          <h1
            className="font-display ed-italic text-[30px] md:text-[42px] leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            {scenario.title}
          </h1>
          {scenario.patientUtsaga && (
            <p
              className="mt-4 text-[17px] italic leading-relaxed max-w-[640px]"
              style={{ color: "var(--text-secondary)" }}
            >
              &ldquo;{scenario.patientUtsaga}&rdquo;
            </p>
          )}
          {scenario.icdCode && (
            <p
              className="mt-4 pt-4 font-mono text-[12px]"
              style={{
                color: "var(--text-secondary)",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>ICD-10-SE </span>
              {scenario.icdCode}
            </p>
          )}
        </div>

        {/* Sektions-pills */}
        <div
          className="flex flex-wrap gap-2 mb-5 sticky top-[76px] z-10 py-2 -mx-1 px-1"
          style={{ background: "var(--bg-main)" }}
          role="tablist"
          aria-label="Scenariosektioner"
        >
          {TABS.map(({ id, num, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={id}
              onClick={() => scrollTo(id)}
              className="font-mono text-[11px] tracking-widest2 uppercase rounded-full px-3.5 py-2 transition-colors"
              style={{
                background:
                  activeTab === id ? "var(--secondary)" : "transparent",
                color: activeTab === id ? "#fff" : "var(--text-muted)",
                border:
                  activeTab === id
                    ? "1px solid var(--secondary)"
                    : "1px solid var(--border-light)",
              }}
            >
              {num} · {label}
            </button>
          ))}
        </div>





        {/* 00 · Snabböversikt */}
        {scenario.snabbOversikt && scenario.snabbOversikt.length > 0 && (
          <Card
            id="s-snabb"
            eyebrow="00 · Översikt"
            title={`Scenario: ${scenario.title}`}
            labelledBy="h-snabb"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {scenario.snabbOversikt.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <SubLabel>{item.label}</SubLabel>
                  <p
                    className="text-[14px] leading-relaxed font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* RÖDA FLAGGOR — flyttade efter översikten, subtilare design */}
        {scenario.redFlags && scenario.redFlags.length > 0 && (
          <section
            className="rounded-[22px] p-6 md:p-7 mb-6 border-2"
            role="alert"
            aria-label="Röda flaggor — klinisk varning"
            style={{
              background: "#FFF8F8",
              borderColor: "#FEE2E2",
              boxShadow: "0 4px 12px rgba(153,27,27,0.04)",
            }}
          >
            <h2 
              className="font-body font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: "#991B1B" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Kliniska varningssignaler
            </h2>
            <ul className="space-y-3" role="list">
              {scenario.redFlags.map((flag) => (
                <li
                  key={flag.id}
                  className="pb-3 border-b border-red-50 last:border-0 last:pb-0"
                >
                  <p 
                    className="font-bold text-sm mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {flag.title}
                  </p>
                  <p 
                    className="text-[14px] leading-relaxed font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {flag.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 01 · Anamnes */}
        {scenario.anamnes && (
          <Card id="s-anamnes" eyebrow="01 · Anamnes" title="Anamnes" labelledBy="h-anamnes">
            {scenario.anamnes.obligatoriska &&
              scenario.anamnes.obligatoriska.length > 0 && (
                <div className="mb-6">
                  <SubLabel>Obligatoriska frågor</SubLabel>
                  <div className="grid md:grid-cols-2 gap-3">
                    {scenario.anamnes.obligatoriska.map((q, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4"
                        style={{
                          background: "var(--bg-main)",
                          border: "1px solid var(--border-light)",
                          borderTop:
                            i < half
                              ? "1px solid var(--border-light)"
                              : "1px solid var(--border-light)",
                        }}
                      >
                        <p
                          className="font-semibold text-[14px] mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {q.fraga}
                        </p>
                        {q.forvantatSvar && (
                          <p
                            className="text-[13px] italic font-medium"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Riktmärke: {q.forvantatSvar}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {scenario.anamnes.kompletterande &&
              scenario.anamnes.kompletterande.length > 0 && (
                <div className="mb-5">
                  <SubLabel>Kompletterande</SubLabel>
                  <Bullets items={scenario.anamnes.kompletterande} />
                </div>
              )}
            {scenario.anamnes.riskfaktorer &&
              scenario.anamnes.riskfaktorer.length > 0 && (
                <div>
                  <SubLabel>Riskfaktorer</SubLabel>
                  <div className="flex flex-wrap gap-2">
                    {scenario.anamnes.riskfaktorer.map((r, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium rounded-full px-2.5 py-1"
                        style={{
                          color: "var(--status-warning)",
                          background: "rgba(224,123,57,0.10)",
                          border: "1px solid rgba(224,123,57,0.25)",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </Card>
        )}

        {/* 02 · Status */}
        {scenario.status && (
          <Card id="s-status" eyebrow="02 · Status" title="Klinisk status" labelledBy="h-status">
            <div className="grid md:grid-cols-2 gap-4">
              {scenario.status.inspektion &&
                scenario.status.inspektion.length > 0 && (
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <SubLabel>Inspektion</SubLabel>
                    <Bullets items={scenario.status.inspektion} tone="accent" />
                  </div>
                )}
              <div className="space-y-4">
                {scenario.status.palpation && (
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <SubLabel>Palpation</SubLabel>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {scenario.status.palpation}
                    </p>
                  </div>
                )}
                {scenario.status.perkussion && (
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <SubLabel>Perkussion</SubLabel>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {scenario.status.perkussion}
                    </p>
                  </div>
                )}
                {scenario.status.sensibilitet && (
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <SubLabel>Sensibilitet</SubLabel>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {scenario.status.sensibilitet}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {scenario.status.bpe && (
              <div
                className="mt-4 rounded-2xl p-5"
                style={{
                  background: "rgba(204,88,51,0.05)",
                  border: "1px solid rgba(204,88,51,0.20)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    BPE-screening
                  </span>
                  {scenario.status.bpeWidget && (
                    <button
                      onClick={() => setExpandBPE(!expandBPE)}
                      className="font-mono text-xs transition-colors"
                      style={{ color: "var(--secondary)" }}
                      aria-expanded={expandBPE}
                      aria-controls="bpe-karta-inline"
                    >
                      {expandBPE ? "Dölj karta" : "Öppna karta"}
                    </button>
                  )}
                </div>
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {scenario.status.bpe.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div
                    className="rounded-xl p-3"
                    style={{
                      background: "rgba(45,106,79,0.08)",
                      border: "1px solid rgba(45,106,79,0.20)",
                    }}
                  >
                    <span
                      className="font-bold block mb-1"
                      style={{ color: "var(--status-ok)" }}
                    >
                      Normalt
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {scenario.status.bpe.normalt}
                    </span>
                  </div>
                  <div
                    className="rounded-xl p-3"
                    style={{
                      background: "rgba(193,18,31,0.06)",
                      border: "1px solid rgba(193,18,31,0.18)",
                    }}
                  >
                    <span
                      className="font-bold block mb-1"
                      style={{ color: "var(--status-danger)" }}
                    >
                      Patologiskt
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {scenario.status.bpe.patologiskt}
                    </span>
                  </div>
                </div>
                {expandBPE && scenario.status.bpeWidget && (
                  <div
                    id="bpe-karta-inline"
                    className="mt-4 rounded-2xl p-4"
                    style={{
                      background: "var(--bg-card-solid, #fff)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    {scenario.status.bpeWidget}
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* 03 · Diagnostik */}
        {scenario.diagnostik && (
          <Card id="s-diagnos" eyebrow="03 · Diagnostik" title="Diagnostik" labelledBy="h-diagnos">
            {scenario.diagnostik.kriterier && (
              <div className="mb-4">
                <SubLabel>Kriterier / Indikation</SubLabel>
                <p
                  className="text-sm leading-relaxed rounded-xl p-4"
                  style={{
                    color: "var(--text-secondary)",
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {scenario.diagnostik.kriterier}
                </p>
              </div>
            )}
            {scenario.diagnostik.rtg && scenario.diagnostik.rtg.length > 0 && (
              <div className="mb-4">
                <SubLabel>Radiologiska fynd</SubLabel>
                <Bullets items={scenario.diagnostik.rtg} tone="accent" />
              </div>
            )}
            {scenario.diagnostik.klassifikation && (
              <div
                className="mb-4 rounded-xl p-4"
                style={{
                  background: "rgba(14,59,82,0.05)",
                  border: "1px solid rgba(14,59,82,0.15)",
                }}
              >
                <SubLabel>Klassifikation</SubLabel>
                <p
                  className="text-xs leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {scenario.diagnostik.klassifikation}
                </p>
              </div>
            )}
            {scenario.diagnostik.uteslut &&
              scenario.diagnostik.uteslut.length > 0 && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(193,18,31,0.05)",
                    border: "1px solid rgba(193,18,31,0.15)",
                  }}
                >
                  <SubLabel>Uteslutningskriterier / Differentiering</SubLabel>
                  <Bullets items={scenario.diagnostik.uteslut} />
                </div>
              )}
          </Card>
        )}

        {/* 04 · Behandling */}
        {scenario.behandling && (
          <Card id="s-behandling" eyebrow="04 · Behandling" title="Behandlingsprotokoll" labelledBy="h-beh">
            {scenario.behandling.varning && (
              <div
                className="mb-5 rounded-xl p-4"
                style={{
                  background: "rgba(224,123,57,0.10)",
                  border: "1px solid rgba(224,123,57,0.30)",
                }}
              >
                <SubLabel>Klinisk varning</SubLabel>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {scenario.behandling.varning}
                </p>
              </div>
            )}
            {scenario.behandling.alternativ &&
              scenario.behandling.alternativ.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {scenario.behandling.alternativ.map((alt, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5"
                      style={{
                        background: "var(--bg-main)",
                        border:
                          i === 0
                            ? "1px solid rgba(204,88,51,0.35)"
                            : "1px solid var(--border-light)",
                      }}
                    >
                      <h3
                        className="font-display text-[17px] mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {alt.title}
                      </h3>
                      {alt.specialist && (
                        <span
                          className="inline-block font-mono text-[10px] tracking-widest2 uppercase rounded-full px-2.5 py-0.5 mb-2"
                          style={{
                            color: "var(--status-warning)",
                            background: "rgba(224,123,57,0.12)",
                          }}
                        >
                          Specialistindikation
                        </span>
                      )}
                      {alt.indikation && (
                        <p
                          className="text-xs mb-3"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span className="font-mono uppercase tracking-widest2">
                            Indikation:{" "}
                          </span>
                          {alt.indikation}
                        </p>
                      )}
                      {alt.metod && alt.metod.length > 0 && (
                        <ol className="space-y-2 mb-3" role="list">
                          {alt.metod.map((m, j) => (
                            <li
                              key={j}
                              className="flex gap-2.5 text-sm leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <span
                                className="font-mono text-xs mt-0.5 flex-shrink-0"
                                style={{ color: "var(--secondary)" }}
                              >
                                {j + 1}.
                              </span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                      {(alt.tid || alt.koder) && (
                        <div
                          className="mt-3 pt-3 flex flex-wrap gap-2 font-mono text-[11px]"
                          style={{
                            borderTop: "1px solid var(--border-light)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {alt.tid && <span>Tid: {alt.tid}</span>}
                          {alt.koder && (
                            <span style={{ color: "var(--text-secondary)" }}>
                              Koder: {alt.koder}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            {scenario.behandling.antibiotika && (
              <div
                className="mt-4 rounded-2xl p-5"
                style={{
                  background: "rgba(14,59,82,0.05)",
                  border: "1px solid rgba(14,59,82,0.15)",
                }}
              >
                <SubLabel>Antibiotika / Farmakologi</SubLabel>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {scenario.behandling.antibiotika}
                </p>
              </div>
            )}
            {scenario.behandling.lokalbehandling && (
              <div
                className="mt-3 rounded-2xl p-4"
                style={{
                  background: "rgba(45,106,79,0.06)",
                  border: "1px solid rgba(45,106,79,0.18)",
                }}
              >
                <SubLabel>Lokalbehandling</SubLabel>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {scenario.behandling.lokalbehandling}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Uppföljning + Differentialdiagnoser */}
        {(scenario.uppfoljning?.text ||
          (scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0)) && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {scenario.uppfoljning?.text && (
              <div
                className="rounded-[22px] p-6"
                style={{
                  background: "var(--bg-card-solid, #fff)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <Eyebrow>06 · Uppföljning</Eyebrow>
                <h2
                  className="font-display ed-italic text-[20px] mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Uppföljning
                </h2>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {scenario.uppfoljning.text}
                </p>
              </div>
            )}
            {scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0 && (
              <div
                className="rounded-[22px] p-6"
                style={{
                  background: "var(--bg-card-solid, #fff)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <Eyebrow>07 · Alternativ</Eyebrow>
                <h2
                  className="font-display ed-italic text-[20px] mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Differentialdiagnoser
                </h2>
                <ul className="space-y-3" role="list">
                  {scenario.diffDiagnoser.map((d, i) => (
                    <li
                      key={i}
                      className="pb-2.5 last:pb-0"
                      style={{
                        borderBottom:
                          i < (scenario.diffDiagnoser?.length ?? 0) - 1
                            ? "1px solid var(--border-light)"
                            : "none",
                      }}
                    >
                      <div className="flex items-center justify-between mb-0.5 gap-2">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {d.namn}
                        </span>
                        {d.kod && d.kod !== "-" && (
                          <span
                            className="font-mono text-[10px] rounded px-1.5 py-0.5 flex-shrink-0"
                            style={{
                              color: "var(--text-muted)",
                              background: "var(--bg-main)",
                            }}
                          >
                            {d.kod}
                          </span>
                        )}
                      </div>
                      {d.skillnad && (
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Skillnad: {d.skillnad}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 05 · Journal */}
        {scenario.journal && scenario.journal.length > 0 && (
          <Card id="s-journal" eyebrow="05 · Dokumentation" title="Journalmallar" labelledBy="h-journal">
            <div className="space-y-5">
              {scenario.journal.map((mall, i) => (
                <div key={i}>
                  <SubLabel>{mall.titel}</SubLabel>
                  <div
                    className="relative rounded-xl p-5 font-mono text-[12px] leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: "#D1CEC9",
                      color: "#1a1a1a",
                      border: "1px solid #BAB7B2",
                    }}
                  >
                    <button
                      className="absolute top-3 right-3 font-mono text-[10px] tracking-widest2 uppercase rounded px-2.5 py-1 transition-colors"
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        color: "#1a1a1a",
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                      onClick={() => copyJournal(mall.text, i)}
                      aria-label={`Kopiera ${mall.titel}`}
                    >
                      {copiedIndex === i ? "Kopierad" : "Kopiera"}
                    </button>
                    {mall.text}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* PSL-footer */}
        <p
          className="mt-8 text-center font-mono text-[10px] tracking-widest2 uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          PSL 2010:659 — Beslutsstöd ersätter inte kliniskt omdöme. Granskas av
          legitimerad tandläkare.
        </p>
      </main>

      {/* ── HÖGER: kontextuella verktyg ────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col sticky top-[76px] w-[280px] flex-shrink-0 self-start max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar py-6 px-5 space-y-6"
        style={{ borderLeft: "1px solid var(--border-light)" }}
        aria-label="Kliniska verktyg och kontext"
      >
        {scenario.verktyg && scenario.verktyg.length > 0 && (
          <div>
            <SubLabel>Kliniska verktyg</SubLabel>
            <div className="space-y-4">
              {scenario.verktyg.map((v) => (
                <Link key={v.label} href={v.href}>
                  <div
                    className="w-full group flex items-center justify-between rounded-full px-5 py-4 text-sm font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                    }}
                  >
                    <span>{v.label}</span>
                    <span 
                      aria-hidden 
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      ›
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0 && (
          <div>
            <SubLabel>Differentialdiagnoser</SubLabel>
            <div className="space-y-1.5">
              {scenario.diffDiagnoser.map((d) => (
                <button
                  key={d.namn}
                  onClick={() => scrollTo("s-diagnos")}
                  className="w-full group flex items-center justify-between rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                  }}
                  aria-label={`Differentialdiagnos: ${d.namn}`}
                >
                  <span className="truncate">{d.namn.split("(")[0].trim()}</span>
                  <span
                    aria-hidden
                    className="flex-shrink-0 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    ›
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {scenario.kliniskaAnteckningar && (
          <div>
            <SubLabel>Kliniska anteckningar</SubLabel>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {scenario.kliniskaAnteckningar}
            </p>
          </div>
        )}

        {criticalFlag && (
          <div>
            <p
              className="font-mono text-[10px] tracking-widest2 uppercase mb-2"
              style={{ color: "var(--status-danger)" }}
            >
              Klinisk varningssignal
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--status-danger)" }}
            >
              <strong>{criticalFlag.title}:</strong>{" "}
              {criticalFlag.description.split("→")[0].trim()}.
            </p>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border-light)" }} className="pt-3">
          <p
            className="text-[9px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            PSL 2010:659 — Beslutsstöd, ej kliniskt omdöme.
          </p>
        </div>
      </aside>
    </div>
  );
}
