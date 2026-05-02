"use client";

import { type ReactNode } from "react";
import { RodaFlaggor } from "./RodaFlaggor";
import { RodaFlaggorMobile } from "./RodaFlaggorMobile";
import { PremiumLock } from "./PremiumLock";

/**
 * ScenarioLayout — Standard layout for clinical scenario pages.
 *
 * Features:
 * - Header with scenario title, ICD code, category badge
 * - Main content area (anamnes, status, behandling tabs)
 * - Red flags panel (ALWAYS visible — desktop: sidebar, mobile: Vaul bottom sheet)
 * - PSL disclaimer footer
 * - Premium content gating
 *
 * ICD-koder visas BARA i scenario-översikt — ALDRIG i journal/AI-output
 */

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning";
}

export interface ScenarioLayoutProps {
  /** Scenario title */
  title: string;
  /** ICD-10-SE code — ONLY shown in overview, NEVER in journal output */
  icdCode?: string;
  /** Category name (e.g., "Endodonti", "Pedodonti — Trauma") */
  category: string;
  /** Category emoji for visual distinction */
  categoryEmoji?: string;
  /** Red flags — ALWAYS visible, never behind accordion */
  redFlags: RedFlag[];
  /** Whether this is premium content */
  isPremium?: boolean;
  /** Whether the user has premium access */
  userHasPremium?: boolean;
  /** Whether this is a pediatric scenario (uses Warm Pediatric theme) */
  isPediatric?: boolean;
  /** Main content */
  children: ReactNode;
}

export function ScenarioLayout({
  title,
  icdCode,
  category,
  categoryEmoji = "🦷",
  redFlags,
  isPremium = false,
  userHasPremium = false,
  isPediatric = false,
  children,
}: ScenarioLayoutProps) {
  const isLocked = isPremium && !userHasPremium;
  const themeClass = isPediatric ? "theme-pediatric" : "";

  return (
    <div className={themeClass}>
      <article
        className="space-y-6"
        aria-label={`Kliniskt scenario: ${title}`}
      >
        {/* ── Scenario Header ──────────────────────────────────── */}
        <header className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground"
              aria-label={`Kategori: ${category}`}
            >
              <span aria-hidden="true">{categoryEmoji}</span>
              {category}
            </span>

            {isPremium && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-premium-gold/20 text-premium-gold"
                aria-label="Premium-innehåll"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground">{title}</h1>

          {/* ICD code — ONLY in scenario overview, NEVER in journal/AI-output */}
          {icdCode && (
            <p
              className="text-xs font-mono text-muted-foreground"
              aria-label={`ICD-10-SE: ${icdCode}`}
            >
              ICD-10-SE: {icdCode}
            </p>
          )}
        </header>

        {/* ── Main Content + Red Flags Grid ────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr,320px] gap-6">
          {/* Main content */}
          <div className="min-w-0">
            {isLocked ? (
              <PremiumLock scenarioTitle={title} />
            ) : (
              children
            )}
          </div>

          {/* Red flags — ALWAYS visible on desktop (right column) */}
          <div className="hidden xl:block" aria-label="Röda flaggor">
            <RodaFlaggor flags={redFlags} isPediatric={isPediatric} />
          </div>
        </div>

        {/* Red flags — Mobile bottom sheet (always accessible via FAB) */}
        <RodaFlaggorMobile flags={redFlags} isPediatric={isPediatric} />

        {/* ── PSL Disclaimer ───────────────────────────────────── */}
        <footer className="psl-disclaimer" role="contentinfo">
          <p>
            <strong>⚠️ PSL 2010:659</strong> — Ersätter inte kliniskt omdöme.
            Varje rekommendation måste granskas och godkännas av legitimerad
            tandläkare innan klinisk användning.
          </p>
        </footer>
      </article>
    </div>
  );
}
