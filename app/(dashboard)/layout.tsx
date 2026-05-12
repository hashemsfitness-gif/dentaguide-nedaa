import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | DentaGuide-Pro",
  },
};

/**
 * app/(dashboard)/layout.tsx — Three-column dashboard layout
 *
 * Desktop:  [Sidebar 260px] [Main Content 1fr] [Right Panel 300px]
 * Tablet:   [Sidebar 220px] [Main Content 1fr] [Right Panel 260px]
 * Mobile:   Full-width single column with mobile nav
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr_300px] min-h-screen">
      {/* ── Left Sidebar (navigation + categories) ─────────────── */}
      <DashboardSidebar />

      {/* ── Main Content Area ──────────────────────────────────── */}
      <div className="flex flex-col min-h-screen overflow-y-auto">
        {/* Sticky search bar */}
        <div className="sticky-search px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Öppna meny"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Search — Cmd+K trigger */}
            <div className="flex-1 max-w-lg">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-input rounded-lg border border-border hover:border-ring transition-colors"
                aria-label="Sök scenarier (Cmd+K)"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Sök scenarier, verktyg...</span>
                <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>

        {/* PSL disclaimer specific to dashboard */}
        <footer
          className="psl-disclaimer mx-4 lg:mx-6 mb-4"
          role="contentinfo"
        >
          <p>
            <strong>⚠️ PSL 2010:659</strong> — Ersätter inte kliniskt omdöme.
            Varje rekommendation måste granskas av legitimerad tandläkare.
          </p>
        </footer>
      </div>

      {/* ── Right Panel (red flags, tools, context) ────────────── */}
      <DashboardRightPanel />
    </div>
  );
}
