"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * ScenarioHotkeys — Keyboard shortcuts for scenario navigation.
 *
 * J — Next scenario
 * K — Previous scenario
 * C — Copy journal text to clipboard
 * B — Toggle bookmark on active scenario
 * ? — Show shortcuts cheatsheet
 */

interface ScenarioHotkeysProps {
  /** Current scenario index in the list */
  currentIndex: number;
  /** Total number of scenarios */
  totalScenarios: number;
  /** Array of scenario slugs for navigation */
  scenarioSlugs: string[];
  /** Base path for scenarios (e.g., "/dashboard/endodonti") */
  basePath: string;
  /** Current scenario ID for bookmarking */
  scenarioId: string;
  /** Callback to copy journal text */
  onCopyJournal?: () => void;
  /** Callback to toggle bookmark */
  onToggleBookmark?: () => void;
  /** Callback to show cheatsheet */
  onShowCheatsheet?: () => void;
}

export function ScenarioHotkeys({
  currentIndex,
  totalScenarios,
  scenarioSlugs,
  basePath,
  onCopyJournal,
  onToggleBookmark,
  onShowCheatsheet,
}: ScenarioHotkeysProps) {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  }, []);

  // ── J — Next scenario ──────────────────────────────────────
  useHotkeys(
    "j",
    () => {
      if (currentIndex < totalScenarios - 1) {
        const nextSlug = scenarioSlugs[currentIndex + 1];
        router.push(`${basePath}/${nextSlug}`);
        showNotification("Nästa scenario →");
      } else {
        showNotification("Sista scenariot");
      }
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: false,
    }
  );

  // ── K — Previous scenario ──────────────────────────────────
  useHotkeys(
    "k",
    () => {
      if (currentIndex > 0) {
        const prevSlug = scenarioSlugs[currentIndex - 1];
        router.push(`${basePath}/${prevSlug}`);
        showNotification("← Föregående scenario");
      } else {
        showNotification("Första scenariot");
      }
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: false,
    }
  );

  // ── C — Copy journal text ──────────────────────────────────
  useHotkeys(
    "c",
    () => {
      if (onCopyJournal) {
        try {
          onCopyJournal();
          showNotification("📋 Journal kopierad");
        } catch {
          showNotification("❌ Kunde inte kopiera");
        }
      }
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: false,
    }
  );

  // ── B — Toggle bookmark ────────────────────────────────────
  useHotkeys(
    "b",
    () => {
      if (onToggleBookmark) {
        try {
          onToggleBookmark();
          showNotification("🔖 Bokmärke uppdaterat");
        } catch {
          showNotification("❌ Kunde inte bokmärka");
        }
      }
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: false,
    }
  );

  // ── ? — Show cheatsheet ────────────────────────────────────
  useHotkeys(
    "shift+/",
    () => {
      if (onShowCheatsheet) {
        onShowCheatsheet();
      }
    },
    {
      enabled: true,
      preventDefault: true,
      enableOnFormTags: false,
    }
  );

  return (
    <>
      {/* Toast notification */}
      {notification && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="status"
          aria-live="polite"
        >
          {notification}
        </div>
      )}
    </>
  );
}
