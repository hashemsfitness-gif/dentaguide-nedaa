import Link from 'next/link';

const snabbverktyg = [
  { href: '/dashboard/tools/dosering', label: 'Doseringskalkylatorn', icon: '⚖️' },
  { href: '/dashboard/tools/antibiotika', label: 'Antibiotikastöd', icon: '🧬' },
  { href: '/dashboard/tools/traumaguide', label: 'Traumaguiden', icon: '🚨' },
  { href: '/dashboard/tools/journalmall', label: 'Journalmall', icon: '📝' },
];

export default function DashboardRightPanel() {
  return (
    <aside
      className="hidden xl:flex flex-col border-l border-border bg-sidebar overflow-y-auto"
      aria-label="Sidopanel — Klinisk kontext"
    >
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground uppercase tracking-wider">
          Klinisk kontext
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-5">
        {/* Tom-vy när inget scenario är valt */}
        <div className="rounded-lg border border-dashed border-border p-4 text-center">
          <p className="text-2xl mb-2" aria-hidden="true">🦷</p>
          <p className="text-xs font-medium text-sidebar-foreground/80 mb-1">
            Välj ett scenario
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Röda flaggor och klinisk kontext visas här när du öppnar ett scenario.
          </p>
        </div>

        {/* Snabbverktyg */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 mb-2">
            Snabbverktyg
          </p>
          <ul className="space-y-1">
            {snabbverktyg.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PSL-påminnelse */}
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-[10px] font-semibold text-amber-800 mb-1"><span aria-hidden="true">⚠️</span> PSL 2010:659</p>
          <p className="text-[10px] text-amber-700 leading-relaxed">
            Ersätter inte kliniskt omdöme. Varje rekommendation måste granskas av legitimerad tandläkare.
          </p>
        </div>
      </div>
    </aside>
  );
}
