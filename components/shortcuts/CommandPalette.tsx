"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

/**
 * CommandPalette — Global search via Cmd+K (cmdk).
 *
 * Search scenarios, tools, and navigation.
 * Opens with Cmd+K or Ctrl+K.
 */

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  href: string;
  category: "scenario" | "tool" | "navigation";
}

// Static navigation items — scenarios will be fetched dynamically
const NAVIGATION_ITEMS: CommandItem[] = [
  {
    id: "nav-dashboard",
    title: "Dashboard",
    subtitle: "Översikt",
    icon: "🏠",
    href: "/dashboard",
    category: "navigation",
  },
  {
    id: "nav-simulator",
    title: "Simulator",
    subtitle: "Träning och övning",
    icon: "🎮",
    href: "/dashboard/simulator",
    category: "navigation",
  },
  {
    id: "nav-bookmarks",
    title: "Bokmärken",
    subtitle: "Sparade scenarier",
    icon: "🔖",
    href: "/dashboard/bokmarken",
    category: "navigation",
  },
  {
    id: "nav-notes",
    title: "Anteckningar",
    subtitle: "Dina kliniska anteckningar",
    icon: "📝",
    href: "/dashboard/anteckningar",
    category: "navigation",
  },
  {
    id: "nav-statistics",
    title: "Statistik",
    subtitle: "Användningsstatistik",
    icon: "📊",
    href: "/dashboard/statistik",
    category: "navigation",
  },
  {
    id: "nav-settings",
    title: "Inställningar",
    subtitle: "Kontoinställningar",
    icon: "⚙️",
    href: "/dashboard/installningar",
    category: "navigation",
  },
];

const TOOL_ITEMS: CommandItem[] = [
  {
    id: "tool-dosering",
    title: "Doseringskalkylatorn",
    subtitle: "Viktbaserad dosering med maxdos-spärrar",
    icon: "💊",
    href: "/dashboard/verktyg/dosering",
    category: "tool",
  },
  {
    id: "tool-antibiotika",
    title: "Antibiotikastöd",
    subtitle: "Strama 2024-baserat beslutsträd",
    icon: "🦠",
    href: "/dashboard/verktyg/antibiotika",
    category: "tool",
  },
  {
    id: "tool-lakemedel",
    title: "Läkemedelsreferens",
    subtitle: "8 grupper med Janusmed-interaktioner",
    icon: "💉",
    href: "/dashboard/verktyg/lakemedel",
    category: "tool",
  },
  {
    id: "tool-parod",
    title: "Parodontologi-klassificerare",
    subtitle: "EFP/AAP 2018 Stadium I-IV",
    icon: "🔬",
    href: "/dashboard/verktyg/parodontologi",
    category: "tool",
  },
  {
    id: "tool-journal-manuell",
    title: "Journalmall (manuell)",
    subtitle: "Interaktiva platshållare",
    icon: "📋",
    href: "/dashboard/verktyg/journal-manuell",
    category: "tool",
  },
  {
    id: "tool-journal-ai",
    title: "AI-journalmall",
    subtitle: "Claude Opus 4.7 med fabriceringsvalidator",
    icon: "🤖",
    href: "/dashboard/verktyg/journal-ai",
    category: "tool",
  },
  {
    id: "tool-trauma",
    title: "Traumaguide",
    subtitle: "Dental Trauma Guide med tidskritiska timers",
    icon: "🚨",
    href: "/dashboard/verktyg/trauma",
    category: "tool",
  },
  {
    id: "tool-debitering",
    title: "Debiteringsstöd",
    subtitle: "TLV-koder 100-900",
    icon: "💰",
    href: "/dashboard/verktyg/debitering",
    category: "tool",
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Toggle with Cmd+K / Ctrl+K ──────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Focus input when opened ─────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      router.push(href);
    },
    [router]
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Command dialog */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[min(640px,calc(100vw-2rem))] z-51">
        <Command
          className="glass-card overflow-hidden shadow-2xl border border-border"
          label="Global sökning"
          shouldFilter={true}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-4 border-b border-border">
            <svg
              className="w-4 h-4 text-muted-foreground flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Command.Input
              ref={inputRef}
              value={search}
              onValueChange={setSearch}
              placeholder="Sök scenarier, verktyg, navigering..."
              className="flex-1 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              aria-label="Sökfält"
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-border px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              Inga resultat hittades.
            </Command.Empty>

            {/* Navigation */}
            <Command.Group
              heading="Navigation"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.subtitle || ""}`}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm cursor-pointer hover:bg-accent data-[selected=true]:bg-accent transition-colors"
                >
                  <span className="text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Tools */}
            <Command.Group
              heading="Verktyg"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
            >
              {TOOL_ITEMS.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.subtitle || ""}`}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm cursor-pointer hover:bg-accent data-[selected=true]:bg-accent transition-colors"
                >
                  <span className="text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1 py-0.5 font-mono">↑↓</kbd>
                navigera
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1 py-0.5 font-mono">↵</kbd>
                öppna
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1 py-0.5 font-mono">ESC</kbd>
              stäng
            </span>
          </div>
        </Command>
      </div>
    </>
  );
}
