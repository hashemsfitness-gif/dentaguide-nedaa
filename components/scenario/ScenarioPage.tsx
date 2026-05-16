"use client";

/**
 * <ScenarioPage> — DELAD 3-kolumns klinisk scenario-layout.
 *
 * Gäller alla vuxenområden (endodonti, parodontologi, protetik,
 * käkkirurgi, bettfysiologi, oralmedicin). EJ pedodonti/ortodonti.
 *
 * REN PRESENTATION. Ingen medicinsk data, ingen rubrik, ingen
 * definition skapas, ändras eller tappas här. Varje områdes
 * [slug]/page.tsx normaliserar sin data till `NormalizedScenario`
 * och passar in — noll dataförlust.
 *
 * Design "Layered Reference":
 *  - Vänster: timeline-rail med dot-spine + scenario-kort
 *  - Mitten: soft hero-header → sliding-pill tabs → kort-stack
 *  - Höger: kliniska verktyg + differential-shortcuts + infografik
 *  - Röda flaggor: alltid synliga (compact i höger-rail som standard)
 *  - Inga sido-stripe-kanter, minimal emoji.
 *  - Role-tokens (CSS-variabler --bg / --text / --border) → dual-mode-redo.
 *
 * @see app/(clinical)/parodontologi/[slug]/page.tsx för normaliserings-
 *      pattern — alla områden mappar sin scenario-data till
 *      NormalizedScenario på samma sätt.
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

/** Klinisk infografik (per scenario, valfritt). Ersätter "Kliniska
 * anteckningar"-blocket i höger-railen när present. */
export type ScenarioInfografik = {
  /** URL till bilden — t.ex. /infografik/infografik-gingivit.png */
  src: string;
  alt: string;
  title: string;
  caption: string;
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

  /** Kvar i typen för bakåtkompatibilitet men renderas EJ i designen —
   * ersatt av `infografik`. Inget data tappas (fältet får finnas i
   * area-data utan att brytas), det visas bara inte. */
  kliniskaAnteckningar?: string;

  /** Klinisk infografik som visas i höger-railen. */
  infografik?: ScenarioInfografik;

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

/* ── Små återanvändbara delar ─────────────────────────────────── */

function Mono({
  children,
  color,
  size = 10,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <span
      className="font-mono"
      style={{
        fontSize: size,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontWeight: 700,
        color: color || "var(--text-muted)",
      }}
    >
      {children}
    </span>
  );
}

function SubLabel({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontWeight: 700,
        color: color || "var(--text-muted)",
        margin: "0 0 8px 0",
      }}
    >
      {children}
    </p>
  );
}

function Bullets({
  items,
  accent,
}: {
  items: string[];
  accent?: boolean;
}) {
  return (
    <ul
      className="grid"
      role="list"
      style={{ listStyle: "none", padding: 0, margin: 0, gap: 8 }}
    >
      {items.map((s, i) => (
        <li
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 12,
            fontSize: 14.5,
            lineHeight: 1.55,
            color: "var(--text-secondary)",
            fontWeight: 500,
          }}
        >
          <span
            aria-hidden
            style={{
              marginTop: 9,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: accent ? "var(--secondary)" : "var(--border-medium)",
              boxShadow: accent ? "0 0 0 3px rgba(204,88,51,0.10)" : "none",
              flexShrink: 0,
            }}
          />
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

function Stack({
  id,
  children,
  accent = false,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  accent?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="scen-stack"
      style={{
        background: "var(--bg-card-solid, #fff)",
        borderRadius: 28,
        padding: 28,
        marginBottom: 18,
        border: "1px solid var(--border-light)",
        boxShadow:
          "0 1px 0 #fff, 0 8px 24px -16px rgba(9,27,20,0.10), 0 2px 8px -4px rgba(9,27,20,0.05)",
        position: "relative",
        transition: "transform 320ms cubic-bezier(.16,1,.3,1), box-shadow 320ms",
      }}
    >
      {accent && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--secondary)",
            opacity: 0.6,
          }}
        />
      )}
      {children}
    </section>
  );
}

/* ── Höger-rails röda flaggor (compact) ────────────────────────── */

function RedFlagsRail({ flags }: { flags: ScenarioRedFlag[] }) {
  if (!flags?.length) return null;
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label="Röda flaggor — kliniska varningar"
      style={{
        background: "linear-gradient(135deg, #FFF8F8 0%, #FFF1F1 100%)",
        border: "1px solid #FEE2E2",
        borderRadius: 22,
        padding: 14,
        boxShadow: "0 4px 12px -6px rgba(153,27,27,0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ color: "#991B1B" }}
        >
          <path
            d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#991B1B",
          }}
        >
          Röda flaggor ({flags.length})
        </span>
      </div>
      <ul
        role="list"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {flags.map((f) => (
          <li
            key={f.id}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                marginTop: 6,
                background:
                  f.severity === "critical"
                    ? "var(--status-danger)"
                    : "var(--status-warning)",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {f.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p
        className="font-mono"
        style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: "1px solid #FEE2E2",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontStyle: "normal",
        }}
      >
        Kontrollera före behandlingsbeslut.
      </p>
    </div>
  );
}

/* ── Infografik-kort (höger-rail) + Lightbox ───────────────────── */

function InfografikCard({ infografik }: { infografik: ScenarioInfografik }) {
  const [open, setOpen] = useState(false);
  if (!infografik) return null;

  return (
    <>
      <div
        role="figure"
        aria-label={infografik.alt}
        style={{
          background: "#fff",
          border: "1px solid var(--border-light)",
          borderRadius: 32,
          overflow: "hidden",
          boxShadow:
            "0 12px 32px -16px rgba(9,27,20,0.18), 0 4px 12px rgba(9,27,20,0.04)",
          position: "relative",
          transition: "transform 320ms cubic-bezier(.16,1,.3,1), box-shadow 320ms",
        }}
      >
        <div
          style={{
            padding: "14px 16px 10px 16px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--secondary)",
                margin: "0 0 6px 0",
              }}
            >
              Klinisk infografik
            </p>
            <p
              className="font-display"
              style={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 1.3,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {infografik.title}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label={`Visa infografik: ${infografik.title}`}
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            margin: 0,
            border: "none",
            borderTop: "1px solid var(--border-light)",
            cursor: "zoom-in",
            background: "#fff",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={infografik.src}
            alt={infografik.alt}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(14,59,82,0.92)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              boxShadow: "0 4px 12px rgba(9,27,20,0.25)",
            }}
          >
            ⤢
          </span>
        </button>
        <p
          style={{
            margin: 0,
            padding: "10px 16px 14px 16px",
            fontSize: 11,
            color: "var(--text-muted)",
            lineHeight: 1.5,
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span>{infografik.caption}</span>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--secondary)",
              whiteSpace: "nowrap",
            }}
          >
            Klicka →
          </span>
        </p>
      </div>
      {open && <InfografikLightbox infografik={infografik} onClose={() => setOpen(false)} />}
    </>
  );
}

function InfografikLightbox({
  infografik,
  onClose,
}: {
  infografik: ScenarioInfografik;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={infografik.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(9,27,20,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(900px, 95vw)",
          maxHeight: "95vh",
          overflow: "auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          cursor: "auto",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Stäng infografik"
          style={{
            position: "sticky",
            top: 12,
            marginLeft: "auto",
            marginRight: 12,
            display: "block",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 2,
          }}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={infografik.src}
          alt={infografik.alt}
          style={{ display: "block", width: "100%", height: "auto", marginTop: -36 }}
        />
      </div>
    </div>
  );
}

/* ── Journal (papper-stil) ─────────────────────────────────────── */

function JournalPaper({
  mall,
  index,
  onCopy,
  copied,
}: {
  mall: { titel: string; text: string };
  index: number;
  onCopy: (text: string, idx: number) => void;
  copied: boolean;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <SubLabel>{mall.titel}</SubLabel>
      <div
        className="font-mono"
        style={{
          position: "relative",
          background: "#ffffff",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 27px, rgba(9,27,20,0.05) 27px 28px)",
          color: "var(--text-primary)",
          fontSize: 12,
          lineHeight: "28px",
          borderRadius: 22,
          padding: "22px 22px 22px 28px",
          whiteSpace: "pre-wrap",
          border: "1px solid var(--border-light)",
          boxShadow: "0 10px 30px -15px rgba(9,27,20,0.12)",
        }}
      >
        <button
          onClick={() => onCopy(mall.text, index)}
          aria-label={`Kopiera ${mall.titel}`}
          className="font-mono"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: "rgba(0,0,0,0.04)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
            borderRadius: 6,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {copied ? "Kopierad" : "Kopiera"}
        </button>
        {mall.text}
      </div>
    </div>
  );
}

/* ── Huvudkomponent ────────────────────────────────────────────── */

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

  return (
    <div
      className="scenario-page"
      style={{
        background: "linear-gradient(180deg, var(--bg-main) 0%, #FCF9F8 100%)",
        minHeight: "calc(100vh - 76px)",
        display: "grid",
        gridTemplateColumns: "260px minmax(0,1fr) 280px",
      }}
    >
      {/* ── VÄNSTER: timeline-rail ─────────────────────────────── */}
      <aside
        className="hidden lg:block sticky top-[76px] self-start max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar"
        aria-label={`Scenariolista — ${scenario.areaLabel}`}
        style={{
          borderRight: "1px solid var(--border-light)",
          padding: "32px 0",
          position: "sticky",
        }}
      >
        <div style={{ padding: "0 24px 18px 24px" }}>
          <p
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {scenario.areaLabel}
          </p>
          <h2
            className="font-display ed-italic"
            style={{
              fontSize: 20,
              color: "var(--text-primary)",
              letterSpacing: "-0.015em",
              margin: 0,
            }}
          >
            Kliniska protokoll
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 30,
              top: 6,
              bottom: 6,
              width: 1,
              background: "var(--border-light)",
            }}
          />
          <nav
            aria-label={`${scenario.areaLabel}-scenarier`}
            style={{ display: "grid", gap: 4, padding: "4px 16px" }}
          >
            {scenario.nav.map((s) => {
              const isActive = s.id === scenario.id || s.slug === scenario.id;
              return (
                <Link
                  key={s.slug}
                  href={`${scenario.areaHref}/${s.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: 8,
                    padding: "12px 10px 12px 4px",
                    borderRadius: 22,
                    textDecoration: "none",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(204,88,51,0.10) 0%, rgba(204,88,51,0.04) 100%)"
                      : "transparent",
                    border: `1px solid ${isActive ? "rgba(204,88,51,0.35)" : "transparent"}`,
                    boxShadow: isActive
                      ? "0 2px 8px -3px rgba(204,88,51,0.18)"
                      : "none",
                    transition:
                      "background 220ms, border-color 220ms, box-shadow 220ms, transform 220ms",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: isActive ? "var(--secondary)" : "#fff",
                      border: `2px solid ${isActive ? "var(--secondary)" : "var(--border-medium)"}`,
                      marginTop: 4,
                      marginLeft: 7,
                      boxShadow: isActive ? "0 0 0 4px rgba(204,88,51,0.12)" : "none",
                      transition: "box-shadow 220ms, background 220ms",
                    }}
                  />
                  <span>
                    <span
                      className="font-mono"
                      style={{
                        display: "block",
                        fontSize: 9.5,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: isActive ? "var(--secondary)" : "var(--text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      {s.id}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 13.5,
                        fontWeight: 700,
                        lineHeight: 1.25,
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        marginBottom: 3,
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      className="ed-italic"
                      style={{
                        display: "block",
                        fontSize: 11.5,
                        color: "var(--text-muted)",
                        lineHeight: 1.35,
                      }}
                    >
                      &ldquo;{s.quote}&rdquo;
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── MITTEN: läsflöde ───────────────────────────────────── */}
      <main
        className="px-4 md:px-8 py-7 pb-24 min-w-0"
        aria-label={`Kliniskt scenario: ${scenario.title}`}
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-4"
          aria-label="Brödsmulor"
        >
          <Link
            href={scenario.areaHref}
            className="font-mono transition-colors hover:opacity-70"
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            {scenario.areaLabel}
          </Link>
          <Mono>/</Mono>
          <Mono color="var(--text-secondary)">{scenario.title}</Mono>
        </nav>

        {/* HEADER — soft hero */}
        <header
          style={{
            position: "relative",
            background:
              "linear-gradient(135deg, #fff 0%, #FCF9F8 100%)",
            border: "1px solid var(--border-light)",
            borderRadius: 34,
            padding: 36,
            marginBottom: 18,
            overflow: "hidden",
            boxShadow: "0 1px 0 #fff, 0 12px 32px -16px rgba(9,27,20,0.12)",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 280,
              height: 280,
              background:
                "radial-gradient(circle, rgba(204,88,51,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: -100,
              left: -60,
              width: 240,
              height: 240,
              background:
                "radial-gradient(circle, rgba(14,59,82,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              {scenario.areaIcon && (
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    color: "var(--secondary)",
                    background: "rgba(204,88,51,0.10)",
                    border: "1px solid rgba(204,88,51,0.20)",
                  }}
                >
                  {scenario.areaIcon}
                </span>
              )}
              <Mono color="var(--secondary)">{scenario.areaLabel}</Mono>
              <Mono>·</Mono>
              <Mono color="var(--text-secondary)">{scenario.id}</Mono>
              {scenario.isAcute && (
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--status-danger)",
                    background: "rgba(193,18,31,0.10)",
                    border: "1px solid rgba(193,18,31,0.30)",
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  Akut
                </span>
              )}
            </div>
            <h1
              className="font-display ed-italic"
              style={{
                letterSpacing: "-0.022em",
                fontSize: "clamp(32px, 4.2vw, 46px)",
                lineHeight: 1.02,
                color: "var(--text-primary)",
                margin: 0,
                maxWidth: "85%",
              }}
            >
              {scenario.title}
            </h1>
            {scenario.patientUtsaga && (
              <p
                className="ed-italic"
                style={{
                  marginTop: 18,
                  maxWidth: 640,
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    color: "var(--secondary)",
                    fontSize: 24,
                    marginRight: 4,
                    verticalAlign: "-3px",
                  }}
                >
                  &ldquo;
                </span>
                {scenario.patientUtsaga}
                <span
                  aria-hidden
                  style={{
                    color: "var(--secondary)",
                    fontSize: 24,
                    marginLeft: 4,
                    verticalAlign: "-3px",
                  }}
                >
                  &rdquo;
                </span>
              </p>
            )}
            {scenario.icdCode && (
              <p
                className="font-mono"
                style={{
                  marginTop: 22,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border-light)",
                  fontSize: 11.5,
                  color: "var(--text-secondary)",
                }}
              >
                <Mono>ICD-10-SE</Mono>
                <span style={{ marginLeft: 8 }}>{scenario.icdCode}</span>
              </p>
            )}
          </div>
        </header>

        {/* TABS — sliding pills, precis innan översikt */}
        <div
          role="tablist"
          aria-label="Scenariosektioner"
          className="sticky top-[76px] z-[5]"
          style={{
            display: "inline-flex",
            flexWrap: "nowrap",
            gap: 3,
            background: "#fff",
            padding: 4,
            borderRadius: 999,
            border: "1px solid var(--border-light)",
            boxShadow: "0 2px 8px -4px rgba(9,27,20,0.06)",
            marginBottom: 18,
          }}
        >
          {TABS.map(({ id, label }) => {
            const on = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                aria-controls={id}
                onClick={() => scrollTo(id)}
                style={{
                  padding: "6px 11px",
                  borderRadius: 999,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: on ? "#fff" : "var(--text-secondary)",
                  background: on ? "var(--secondary)" : "transparent",
                  boxShadow: on
                    ? "0 4px 10px -3px rgba(204,88,51,0.45)"
                    : "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 280ms cubic-bezier(.16,1,.3,1)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 00 · Översikt */}
        {scenario.snabbOversikt && scenario.snabbOversikt.length > 0 && (
          <Stack id="s-snabb" accent labelledBy="h-snabb">
            <Mono color="var(--secondary)">00 · Översikt</Mono>
            <h2
              id="h-snabb"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Scenario: {scenario.title}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: 14,
              }}
            >
              {scenario.snabbOversikt.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FCF9F8",
                    borderRadius: 22,
                    padding: 16,
                    border: "1px solid var(--border-light)",
                    transition: "transform 240ms, box-shadow 240ms",
                  }}
                >
                  <SubLabel color="var(--secondary)">{item.label}</SubLabel>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Stack>
        )}

        {/* 01 · Anamnes */}
        {scenario.anamnes && (
          <Stack id="s-anamnes" accent labelledBy="h-anamnes">
            <Mono color="var(--secondary)">01 · Anamnes</Mono>
            <h2
              id="h-anamnes"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Anamnes
            </h2>

            {scenario.anamnes.obligatoriska &&
              scenario.anamnes.obligatoriska.length > 0 && (
                <>
                  <SubLabel color="var(--secondary)">Obligatoriska frågor</SubLabel>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    {scenario.anamnes.obligatoriska.map((q, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#FCF9F8",
                          border: "1px solid var(--border-light)",
                          borderRadius: 22,
                          padding: 16,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 24,
                            height: 1,
                            background: "var(--secondary)",
                            opacity: 0.5,
                          }}
                        />
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "var(--text-primary)",
                            margin: "0 0 4px 0",
                            lineHeight: 1.35,
                          }}
                        >
                          {q.fraga}
                        </p>
                        {q.forvantatSvar && (
                          <p
                            className="ed-italic"
                            style={{
                              fontSize: 12.5,
                              color: "var(--text-muted)",
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            Riktmärke: {q.forvantatSvar}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

            {scenario.anamnes.kompletterande &&
              scenario.anamnes.kompletterande.length > 0 && (
                <>
                  <SubLabel color="var(--secondary)">Kompletterande</SubLabel>
                  <div style={{ marginBottom: 20 }}>
                    <Bullets items={scenario.anamnes.kompletterande} />
                  </div>
                </>
              )}

            {scenario.anamnes.riskfaktorer &&
              scenario.anamnes.riskfaktorer.length > 0 && (
                <>
                  <SubLabel color="var(--secondary)">Riskfaktorer</SubLabel>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {scenario.anamnes.riskfaktorer.map((r, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "6px 14px",
                          borderRadius: 999,
                          color: "var(--status-warning)",
                          background: "rgba(224,123,57,0.10)",
                          border: "1px solid rgba(224,123,57,0.25)",
                          boxShadow: "0 2px 6px -2px rgba(224,123,57,0.20)",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </>
              )}
          </Stack>
        )}

        {/* 02 · Status */}
        {scenario.status && (
          <Stack id="s-status" accent labelledBy="h-status">
            <Mono color="var(--secondary)">02 · Status</Mono>
            <h2
              id="h-status"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Klinisk status
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {scenario.status.inspektion &&
                scenario.status.inspektion.length > 0 && (
                  <div
                    style={{
                      background: "#FCF9F8",
                      border: "1px solid var(--border-light)",
                      borderRadius: 22,
                      padding: 16,
                    }}
                  >
                    <SubLabel color="var(--secondary)">Inspektion</SubLabel>
                    <Bullets items={scenario.status.inspektion} accent />
                  </div>
                )}
              {scenario.status.palpation && (
                <div
                  style={{
                    background: "#FCF9F8",
                    border: "1px solid var(--border-light)",
                    borderRadius: 22,
                    padding: 16,
                  }}
                >
                  <SubLabel color="var(--secondary)">Palpation</SubLabel>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {scenario.status.palpation}
                  </p>
                </div>
              )}
              {scenario.status.perkussion && (
                <div
                  style={{
                    background: "#FCF9F8",
                    border: "1px solid var(--border-light)",
                    borderRadius: 22,
                    padding: 16,
                  }}
                >
                  <SubLabel color="var(--secondary)">Perkussion</SubLabel>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {scenario.status.perkussion}
                  </p>
                </div>
              )}
              {scenario.status.sensibilitet && (
                <div
                  style={{
                    background: "#FCF9F8",
                    border: "1px solid var(--border-light)",
                    borderRadius: 22,
                    padding: 16,
                  }}
                >
                  <SubLabel color="var(--secondary)">Sensibilitet</SubLabel>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {scenario.status.sensibilitet}
                  </p>
                </div>
              )}
            </div>

            {scenario.status.bpe && (
              <div
                style={{
                  marginTop: 14,
                  background:
                    "linear-gradient(135deg, rgba(204,88,51,0.04) 0%, rgba(204,88,51,0.02) 100%)",
                  border: "1px solid rgba(204,88,51,0.20)",
                  borderRadius: 26,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--text-primary)",
                    }}
                  >
                    BPE-screening
                  </span>
                  {scenario.status.bpeWidget && (
                    <button
                      onClick={() => setExpandBPE(!expandBPE)}
                      className="font-mono"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--secondary)",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                      aria-expanded={expandBPE}
                      aria-controls="bpe-karta-inline"
                    >
                      {expandBPE ? "Dölj karta" : "Öppna karta"}
                    </button>
                  )}
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-secondary)",
                    margin: "0 0 12px 0",
                    lineHeight: 1.5,
                  }}
                >
                  {scenario.status.bpe.description}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(45,106,79,0.06)",
                      border: "1px solid rgba(45,106,79,0.18)",
                      borderRadius: 22,
                      padding: 14,
                    }}
                  >
                    <Mono color="var(--status-ok)" size={9}>
                      Normalt
                    </Mono>
                    <p
                      style={{
                        margin: "6px 0 0 0",
                        fontSize: 12.5,
                        color: "var(--text-secondary)",
                        lineHeight: 1.45,
                      }}
                    >
                      {scenario.status.bpe.normalt}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "rgba(193,18,31,0.05)",
                      border: "1px solid rgba(193,18,31,0.18)",
                      borderRadius: 22,
                      padding: 14,
                    }}
                  >
                    <Mono color="var(--status-danger)" size={9}>
                      Patologiskt
                    </Mono>
                    <p
                      style={{
                        margin: "6px 0 0 0",
                        fontSize: 12.5,
                        color: "var(--text-secondary)",
                        lineHeight: 1.45,
                      }}
                    >
                      {scenario.status.bpe.patologiskt}
                    </p>
                  </div>
                </div>
                {expandBPE && scenario.status.bpeWidget && (
                  <div
                    id="bpe-karta-inline"
                    style={{
                      marginTop: 16,
                      background: "var(--bg-card-solid, #fff)",
                      border: "1px solid var(--border-light)",
                      borderRadius: 22,
                      padding: 16,
                    }}
                  >
                    {scenario.status.bpeWidget}
                  </div>
                )}
              </div>
            )}
          </Stack>
        )}

        {/* 03 · Diagnostik */}
        {scenario.diagnostik && (
          <Stack id="s-diagnos" accent labelledBy="h-diagnos">
            <Mono color="var(--secondary)">03 · Diagnostik</Mono>
            <h2
              id="h-diagnos"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Diagnostik
            </h2>
            {scenario.diagnostik.kriterier && (
              <div style={{ marginBottom: 16 }}>
                <SubLabel color="var(--secondary)">Kriterier / Indikation</SubLabel>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    background: "#FCF9F8",
                    border: "1px solid var(--border-light)",
                    borderRadius: 22,
                    padding: 14,
                    margin: 0,
                  }}
                >
                  {scenario.diagnostik.kriterier}
                </p>
              </div>
            )}
            {scenario.diagnostik.rtg && scenario.diagnostik.rtg.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <SubLabel color="var(--secondary)">Radiologiska fynd</SubLabel>
                <Bullets items={scenario.diagnostik.rtg} accent />
              </div>
            )}
            {scenario.diagnostik.klassifikation && (
              <div
                style={{
                  marginBottom: 16,
                  background:
                    "linear-gradient(135deg, rgba(14,59,82,0.06) 0%, rgba(14,59,82,0.03) 100%)",
                  border: "1px solid rgba(14,59,82,0.15)",
                  borderRadius: 22,
                  padding: 14,
                }}
              >
                <SubLabel color="var(--primary)">Klassifikation</SubLabel>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {scenario.diagnostik.klassifikation}
                </p>
              </div>
            )}
            {scenario.diagnostik.uteslut &&
              scenario.diagnostik.uteslut.length > 0 && (
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(193,18,31,0.05) 0%, rgba(193,18,31,0.02) 100%)",
                    border: "1px solid rgba(193,18,31,0.15)",
                    borderRadius: 22,
                    padding: 14,
                  }}
                >
                  <SubLabel color="var(--status-danger)">
                    Uteslutningskriterier / Differentiering
                  </SubLabel>
                  <Bullets items={scenario.diagnostik.uteslut} />
                </div>
              )}
          </Stack>
        )}

        {/* 04 · Behandling */}
        {scenario.behandling && (
          <Stack id="s-behandling" accent labelledBy="h-beh">
            <Mono color="var(--secondary)">04 · Behandling</Mono>
            <h2
              id="h-beh"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Behandlingsprotokoll
            </h2>
            {scenario.behandling.varning && (
              <div
                style={{
                  marginBottom: 18,
                  background:
                    "linear-gradient(135deg, rgba(224,123,57,0.12) 0%, rgba(224,123,57,0.06) 100%)",
                  border: "1px solid rgba(224,123,57,0.30)",
                  borderRadius: 22,
                  padding: 16,
                }}
              >
                <SubLabel color="var(--status-warning)">Klinisk varning</SubLabel>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.55,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {scenario.behandling.varning}
                </p>
              </div>
            )}
            {scenario.behandling.alternativ &&
              scenario.behandling.alternativ.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {scenario.behandling.alternativ.map((alt, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        background: "#fff",
                        border:
                          i === 0
                            ? "1px solid rgba(204,88,51,0.35)"
                            : "1px solid var(--border-light)",
                        borderRadius: 28,
                        padding: 20,
                        boxShadow:
                          i === 0
                            ? "0 8px 24px -12px rgba(204,88,51,0.20), 0 2px 6px -3px rgba(9,27,20,0.05)"
                            : "0 4px 12px -8px rgba(9,27,20,0.08), 0 1px 3px -1px rgba(9,27,20,0.04)",
                        transition:
                          "transform 280ms cubic-bezier(.16,1,.3,1), box-shadow 280ms",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 12,
                          marginBottom: 10,
                        }}
                      >
                        <span
                          className="font-display ed-italic"
                          style={{
                            fontSize: 26,
                            color: "var(--secondary)",
                            lineHeight: 1,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className="font-display"
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            color: "var(--text-primary)",
                            margin: 0,
                            lineHeight: 1.3,
                            flex: 1,
                          }}
                        >
                          {alt.title}
                        </h3>
                      </div>
                      {alt.specialist && (
                        <span
                          className="font-mono"
                          style={{
                            display: "inline-block",
                            fontSize: 9,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            color: "var(--status-warning)",
                            background: "rgba(224,123,57,0.12)",
                            borderRadius: 999,
                            padding: "3px 10px",
                            marginBottom: 10,
                          }}
                        >
                          Specialistindikation
                        </span>
                      )}
                      {alt.indikation && (
                        <p
                          style={{
                            fontSize: 12.5,
                            color: "var(--text-muted)",
                            margin: "0 0 12px 0",
                            lineHeight: 1.5,
                          }}
                        >
                          <Mono size={9}>Indikation</Mono>
                          <span style={{ marginLeft: 6 }}>{alt.indikation}</span>
                        </p>
                      )}
                      {alt.metod && alt.metod.length > 0 && (
                        <ol
                          role="list"
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: "0 0 12px 0",
                            display: "grid",
                            gap: 8,
                          }}
                        >
                          {alt.metod.map((m, j) => (
                            <li
                              key={j}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "auto 1fr",
                                gap: 10,
                                fontSize: 13.5,
                                lineHeight: 1.5,
                                color: "var(--text-secondary)",
                              }}
                            >
                              <span
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  background: "rgba(204,88,51,0.10)",
                                  color: "var(--secondary)",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: 1,
                                }}
                              >
                                {j + 1}
                              </span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                      {(alt.tid || alt.koder) && (
                        <div
                          className="font-mono"
                          style={{
                            paddingTop: 12,
                            marginTop: 6,
                            borderTop: "1px solid var(--border-light)",
                            display: "flex",
                            gap: 14,
                            flexWrap: "wrap",
                            fontSize: 11,
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
                style={{
                  marginTop: 14,
                  background:
                    "linear-gradient(135deg, rgba(14,59,82,0.06) 0%, rgba(14,59,82,0.03) 100%)",
                  border: "1px solid rgba(14,59,82,0.15)",
                  borderRadius: 26,
                  padding: 18,
                }}
              >
                <SubLabel color="var(--primary)">Antibiotika / Farmakologi</SubLabel>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--text-secondary)",
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {scenario.behandling.antibiotika}
                </p>
              </div>
            )}
            {scenario.behandling.lokalbehandling && (
              <div
                style={{
                  marginTop: 14,
                  background:
                    "linear-gradient(135deg, rgba(45,106,79,0.08) 0%, rgba(45,106,79,0.03) 100%)",
                  border: "1px solid rgba(45,106,79,0.18)",
                  borderRadius: 26,
                  padding: 16,
                }}
              >
                <SubLabel color="var(--status-ok)">Lokalbehandling</SubLabel>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {scenario.behandling.lokalbehandling}
                </p>
              </div>
            )}
          </Stack>
        )}

        {/* Uppföljning + Differentialdiagnoser */}
        {(scenario.uppfoljning?.text ||
          (scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0)) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 18,
            }}
          >
            {scenario.uppfoljning?.text && (
              <Stack>
                <Mono color="var(--secondary)">06 · Uppföljning</Mono>
                <h2
                  className="font-display ed-italic"
                  style={{
                    margin: "10px 0 12px 0",
                    fontSize: 20,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Uppföljning
                </h2>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {scenario.uppfoljning.text}
                </p>
              </Stack>
            )}
            {scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0 && (
              <Stack>
                <Mono color="var(--secondary)">07 · Alternativ</Mono>
                <h2
                  className="font-display ed-italic"
                  style={{
                    margin: "10px 0 12px 0",
                    fontSize: 20,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Differentialdiagnoser
                </h2>
                <ul
                  role="list"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  {scenario.diffDiagnoser.map((d, i, arr) => (
                    <li
                      key={i}
                      style={{
                        paddingBottom: 10,
                        marginBottom: 10,
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--border-light)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 8,
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 13.5,
                            color: "var(--text-primary)",
                          }}
                        >
                          {d.namn}
                        </span>
                        {d.kod && d.kod !== "-" && (
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 10,
                              color: "var(--text-muted)",
                              background: "#FCF9F8",
                              padding: "2px 6px",
                              borderRadius: 4,
                              flexShrink: 0,
                            }}
                          >
                            {d.kod}
                          </span>
                        )}
                      </div>
                      {d.skillnad && (
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            margin: 0,
                            lineHeight: 1.45,
                          }}
                        >
                          Skillnad: {d.skillnad}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </Stack>
            )}
          </div>
        )}

        {/* 05 · Journal */}
        {scenario.journal && scenario.journal.length > 0 && (
          <Stack id="s-journal" accent labelledBy="h-journal">
            <Mono color="var(--secondary)">05 · Dokumentation</Mono>
            <h2
              id="h-journal"
              className="font-display ed-italic"
              style={{
                margin: "10px 0 18px 0",
                fontSize: 24,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              Journalmallar
            </h2>
            {scenario.journal.map((mall, i) => (
              <JournalPaper
                key={i}
                mall={mall}
                index={i}
                onCopy={copyJournal}
                copied={copiedIndex === i}
              />
            ))}
          </Stack>
        )}

        {/* PSL-footer */}
        <p
          className="font-mono"
          style={{
            marginTop: 30,
            textAlign: "center",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          PSL 2010:659 — Beslutsstöd ersätter inte kliniskt omdöme. Granskas av
          legitimerad tandläkare.
        </p>
      </main>

      {/* ── HÖGER: kontextuella verktyg ────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col sticky top-[76px] self-start max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar"
        aria-label="Kliniska verktyg och kontext"
        style={{
          padding: "32px 22px 32px 18px",
          gap: 22,
        }}
      >
        {scenario.verktyg && scenario.verktyg.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: 28,
              border: "1px solid var(--border-light)",
              padding: 16,
              boxShadow: "0 1px 0 #fff, 0 4px 12px -6px rgba(9,27,20,0.06)",
            }}
          >
            <Mono>Kliniska verktyg</Mono>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              {scenario.verktyg.map((v) => (
                <Link
                  key={v.label}
                  href={v.href}
                  className="scen-toolbtn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--primary)",
                    color: "#fff",
                    borderRadius: 26,
                    padding: "10px 14px",
                    fontSize: 12.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow:
                      "0 4px 12px -6px rgba(14,59,82,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
                    transition: "transform 260ms, box-shadow 260ms",
                  }}
                >
                  <span>{v.label}</span>
                  <span
                    aria-hidden
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    ›
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: 28,
              border: "1px solid var(--border-light)",
              padding: 16,
              boxShadow: "0 1px 0 #fff, 0 4px 12px -6px rgba(9,27,20,0.06)",
            }}
          >
            <Mono>Differentialdiagnoser</Mono>
            <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
              {scenario.diffDiagnoser.map((d) => (
                <button
                  key={d.namn}
                  onClick={() => scrollTo("s-diagnos")}
                  className="scen-diff"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 10,
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 22,
                    background: "#FCF9F8",
                    border: "1px solid var(--border-light)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "transform 220ms, background 220ms",
                  }}
                  aria-label={`Differentialdiagnos: ${d.namn}`}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--secondary)",
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.namn.split("(")[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* INFOGRAFIK — ersätter "Kliniska anteckningar" */}
        {scenario.infografik && <InfografikCard infografik={scenario.infografik} />}

        {/* RÖDA FLAGGOR — alltid synliga, compact i höger-rail */}
        {scenario.redFlags && scenario.redFlags.length > 0 && (
          <RedFlagsRail flags={scenario.redFlags} />
        )}

        <div
          style={{
            borderTop: "1px solid var(--border-light)",
            paddingTop: 12,
          }}
        >
          <p
            style={{
              fontSize: 9,
              lineHeight: 1.55,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            PSL 2010:659 — Beslutsstöd, ej kliniskt omdöme.
          </p>
        </div>
      </aside>

      {/* ── Hover-states + scroll-fade-in (rikt-läge) ──────────── */}
      <style jsx>{`
        .scen-stack {
          animation: scen-fade-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes scen-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scen-stack:hover {
          transform: translateY(-2px);
          box-shadow: 0 1px 0 #fff,
            0 16px 36px -16px rgba(9, 27, 20, 0.16);
        }
        .scen-toolbtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(14, 59, 82, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .scen-diff:hover {
          background: #fff;
          transform: translateX(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .scen-stack,
          .scen-stack:hover,
          .scen-toolbtn:hover,
          .scen-diff:hover {
            animation: none;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
