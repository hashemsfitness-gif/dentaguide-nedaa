"use client";

import type { RedFlag } from "./ScenarioLayout";

/**
 * RodaFlaggor — ALWAYS visible red flags panel (desktop sidebar).
 *
 * KLINISK SÄKERHETSREGEL:
 * Röda flaggor får ALDRIG gömmas bakom accordion, collapse, eller scroll.
 * De måste ALLTID vara synliga för tandläkaren.
 */

interface RodaFlaggorProps {
  flags: RedFlag[];
  isPediatric?: boolean;
}

export function RodaFlaggor({ flags, isPediatric = false }: RodaFlaggorProps) {
  if (flags.length === 0) return null;

  return (
    <div
      className={`sticky top-4 space-y-3 ${
        isPediatric ? "theme-pediatric" : ""
      }`}
      role="alert"
      aria-live="polite"
      aria-label="Röda flaggor — kliniska varningar"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-red-flag-icon flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-sm font-bold text-red-flag-text uppercase tracking-wider">
          Röda flaggor
        </h3>
        <span
          className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-flag-icon text-white text-xs font-bold"
          aria-label={`${flags.length} varningar`}
        >
          {flags.length}
        </span>
      </div>

      {/* Flag list — ALWAYS expanded, never collapsible */}
      <ul className="space-y-2" aria-label="Lista med röda flaggor">
        {flags.map((flag) => (
          <li
            key={flag.id}
            className={`red-flag-panel ${
              flag.severity === "critical"
                ? "border-red-flag-icon"
                : "border-red-flag-border"
            }`}
          >
            <div className="flex items-start gap-2">
              {flag.severity === "critical" ? (
                <span
                  className="text-red-flag-icon text-lg flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  🚨
                </span>
              ) : (
                <span
                  className="text-clinical-warning text-lg flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ⚠️
                </span>
              )}
              <div>
                <h4
                  className={`text-sm font-semibold ${
                    flag.severity === "critical"
                      ? "text-red-flag-text"
                      : "text-clinical-warning"
                  }`}
                >
                  {flag.title}
                </h4>
                <p className="text-xs text-red-flag-text/80 mt-1 leading-relaxed">
                  {flag.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Safety note */}
      <p className="text-xs text-muted-foreground italic border-t border-red-flag-border pt-2">
        Röda flaggor visas ALLTID — kontrollera före behandlingsbeslut.
      </p>
    </div>
  );
}
