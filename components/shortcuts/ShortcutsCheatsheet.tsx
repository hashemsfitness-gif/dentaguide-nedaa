"use client";

import { useEffect, useState } from "react";

/**
 * ShortcutsCheatsheet — Modal showing all keyboard shortcuts.
 * Opens with ? key.
 */

interface Shortcut {
  key: string;
  description: string;
  category: string;
}

const SHORTCUTS: Shortcut[] = [
  // Global
  { key: "⌘K / Ctrl+K", description: "Öppna global sökning", category: "Global" },
  { key: "?", description: "Visa snabbnyckel-guide", category: "Global" },
  { key: "Esc", description: "Stäng modal/popup", category: "Global" },

  // Navigation
  { key: "G → D", description: "Gå till Dashboard", category: "Navigation" },
  { key: "G → S", description: "Gå till Simulator", category: "Navigation" },
  { key: "G → T", description: "Gå till Verktyg", category: "Navigation" },

  // Scenario
  { key: "J", description: "Nästa scenario", category: "Scenario" },
  { key: "K", description: "Föregående scenario", category: "Scenario" },
  { key: "C", description: "Kopiera journaltext", category: "Scenario" },
  { key: "B", description: "Bokmärk aktivt scenario", category: "Scenario" },
];

interface ShortcutsCheatsheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsCheatsheet({
  isOpen,
  onClose,
}: ShortcutsCheatsheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  // Group shortcuts by category
  const grouped = SHORTCUTS.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    },
    {} as Record<string, Shortcut[]>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-51 w-[min(480px,calc(100vw-2rem))] glass-card overflow-hidden shadow-2xl border border-border"
        role="dialog"
        aria-modal="true"
        aria-label="Snabbnyckel-guide"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            ⌨️ Snabbnyckel-guide
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Stäng snabbnyckel-guide"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-6">
          {Object.entries(grouped).map(([category, shortcuts]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <li
                    key={shortcut.key}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="text-sm text-foreground">
                      {shortcut.description}
                    </span>
                    <kbd className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground min-w-fit">
                      {shortcut.key}
                    </kbd>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            Tryck <kbd className="rounded border border-border px-1 font-mono">?</kbd> för att visa/stänga denna guide
          </p>
        </div>
      </div>
    </>
  );
}
