"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import type { RedFlag } from "./ScenarioLayout";

/**
 * RodaFlaggorMobile — Vaul bottom sheet for mobile red flags.
 *
 * KLINISK SÄKERHETSREGEL:
 * Röda flaggor måste ALLTID vara tillgängliga — på mobil via en
 * alltid synlig flytande knapp (FAB) som öppnar Vaul-bottom sheet.
 */

interface RodaFlaggorMobileProps {
  flags: RedFlag[];
  isPediatric?: boolean;
}

export function RodaFlaggorMobile({
  flags,
  isPediatric = false,
}: RodaFlaggorMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (flags.length === 0) return null;

  const criticalCount = flags.filter((f) => f.severity === "critical").length;

  return (
    <div className={`xl:hidden ${isPediatric ? "theme-pediatric" : ""}`}>
      {/* Floating Action Button — always visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
          criticalCount > 0
            ? "bg-red-flag-icon text-white animate-pulse"
            : "bg-clinical-warning text-white"
        }`}
        aria-label={`Visa röda flaggor (${flags.length} varningar)`}
        aria-haspopup="dialog"
        type="button"
      >
        <svg
          className="w-5 h-5"
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
        <span className="text-sm font-semibold">{flags.length}</span>
      </button>

      {/* Vaul Bottom Sheet */}
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-background max-h-[85vh]"
            aria-label="Röda flaggor"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 px-4 pb-3 border-b border-border">
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
              <Drawer.Title className="text-base font-bold text-red-flag-text">
                Röda flaggor
              </Drawer.Title>
              <span
                className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-flag-icon text-white text-xs font-bold"
                aria-label={`${flags.length} varningar`}
              >
                {flags.length}
              </span>
            </div>

            {/* Scrollable flag list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <Drawer.Description className="sr-only">
                Lista med kliniska varningar som alltid ska beaktas
              </Drawer.Description>

              {flags.map((flag) => (
                <div
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
                        className="text-lg flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        🚨
                      </span>
                    ) : (
                      <span
                        className="text-lg flex-shrink-0 mt-0.5"
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
                </div>
              ))}

              {/* Safety note */}
              <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                Röda flaggor visas ALLTID — kontrollera före behandlingsbeslut.
              </p>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
