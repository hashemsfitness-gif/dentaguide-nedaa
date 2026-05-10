'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const kliniskaScenarier = [
  { href: '/endodonti', label: 'Endodonti', icon: '🦷' },
  { href: '/parodontologi', label: 'Parodontologi', icon: '🩸' },
  { href: '/bettfysiologi', label: 'Bettfysiologi / TMD', icon: '🦴' },
  { href: '/protetik', label: 'Protetik', icon: '👑' },
  { href: '/kakkirurgi', label: 'Käkkirurgi', icon: '⚕️' },
  { href: '/oralmedicin', label: 'Oralmedicin', icon: '💊' },
  { href: '/pedodonti', label: 'Pedodonti', icon: '🧒' },
  { href: '/ortodonti', label: 'Ortodonti', icon: '🔧' },
];

const kliniskaVerktyg = [
  { href: '/tools/lakemedel', label: 'Läkemedelsreferens', icon: '📋' },
  { href: '/tools/antibiotika', label: 'Antibiotikastöd', icon: '🧬' },
  { href: '/tools/dosering', label: 'Doseringskalkylatorn', icon: '⚖️' },
  { href: '/tools/parod-klassificering', label: 'Parod-klassificering', icon: '📊' },
  { href: '/tools/journalmall', label: 'Journalmall', icon: '📝' },
  { href: '/tools/traumaguide', label: 'Traumaguiden', icon: '🚨' },
  { href: '/tools/debitering', label: 'Debiteringsstöd', icon: '🧾' },
];

const linkClass = (active: boolean) =>
  `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
    active
      ? 'bg-primary/10 text-primary font-medium'
      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
  }`;

interface NavItem { href: string; label: string; icon: string }

function NavSection({ label, items, activeBase }: { label: string; items: NavItem[]; activeBase: string }) {
  return (
    <div>
      <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
        {label}
      </p>
      <ul className="space-y-0.5">
        {items.map(({ href, label: itemLabel, icon }) => {
          const full = `/dashboard${href}`;
          const active = activeBase === full || activeBase.startsWith(`${full}/`);
          return (
            <li key={href}>
              <Link href={full} className={linkClass(active)} aria-current={active ? 'page' : undefined}>
                <span className="text-base leading-none" aria-hidden="true">{icon}</span>
                {itemLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col border-r border-border bg-sidebar overflow-y-auto"
      aria-label="Sidopanel — Navigation"
    >
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <Image
            src="/logo/logo-hexagon-dark.png"
            alt="DentaGuide-Pro logotyp"
            width={32}
            height={32}
            className="rounded-md"
          />
          <h1 className="text-base font-semibold text-sidebar-foreground group-hover:text-primary transition-colors">
            DentaGuide-Pro
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-5 overflow-y-auto" aria-label="Huvudnavigation">
        <NavSection label="Kliniska scenarier" items={kliniskaScenarier} activeBase={pathname} />
        <NavSection label="Kliniska verktyg" items={kliniskaVerktyg} activeBase={pathname} />

        <div>
          <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Utbildning
          </p>
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/dashboard/simulator"
                className={linkClass(pathname === '/dashboard/simulator')}
                aria-current={pathname === '/dashboard/simulator' ? 'page' : undefined}
              >
                <span className="text-base leading-none" aria-hidden="true">🎓</span>
                Simulator
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
          <p className="text-xs font-semibold text-primary mb-1">Kliniker-plan</p>
          <p className="text-[11px] text-sidebar-foreground/60 mb-2">
            Lås upp alla 82 scenarier
          </p>
          <Link
            href="/pricing"
            className="block w-full text-center text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-md px-3 py-1.5 transition-colors"
          >
            Uppgradera →
          </Link>
        </div>
      </div>
    </aside>
  );
}
