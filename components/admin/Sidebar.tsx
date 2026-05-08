'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Pill, 
  Users, 
  CreditCard, 
  Settings, 
  BarChart3, 
  MessageSquare,
  History,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Scenarier', icon: FileText, href: '/admin/scenarios' },
  { label: 'Kategorier', icon: FolderTree, href: '/admin/categories', badge: 'Soon' },
  { label: 'Läkemedel', icon: Pill, href: '/admin/medications', badge: 'Soon' },
  { label: 'Användare', icon: Users, href: '/admin/users' },
  { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { label: 'Feedback', icon: MessageSquare, href: '/admin/feedback', badge: 'Stub' },
  { label: 'Inställningar', icon: Settings, href: '/admin/settings', badge: 'Soon' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dark-sidebar flex flex-col h-screen sticky top-0 shrink-0 overflow-y-auto">
      <div className="flex items-center gap-3 py-8 px-8 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-hexagon-dark.png"
          alt="DentaGuide-Pro Logo"
          width={32}
          height={32}
          className="w-8 h-8 rounded-lg object-cover"
          style={{ backgroundColor: '#0d4a65' }}
        />
        <div>
          <h1 className="text-lg font-serif italic text-white leading-none">
            DentaGuide<span className="text-[var(--sidebar-text-active)] font-body not-italic text-[10px] align-top ml-0.5">PRO</span>
          </h1>
          <span className="block text-[0.5rem] uppercase tracking-[0.2em] font-mono opacity-40 not-italic mt-1 text-white">
            Clinical Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const isStub = item.badge === 'Soon' || item.badge === 'Stub';

          return (
            <Link
              key={item.href}
              href={isStub ? '#' : item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-text-active)] border-l-4 border-[var(--sidebar-text-active)]" 
                  : "text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-white/5",
                isStub && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-[var(--sidebar-text-active)]" : "text-current"
                )} />
                <span className="font-medium text-sm tracking-tight">{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider",
                  item.badge === 'Soon' ? "bg-white/10 text-white/40" : "bg-[var(--sidebar-text-active)]/20 text-[var(--sidebar-text-active)]"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-white/5 mt-auto">
        <button 
          onClick={() => {/* Handle Logout */}}
          className="flex items-center gap-3 px-4 py-3 w-full text-[var(--sidebar-text)] hover:text-white transition-colors rounded-xl hover:bg-white/5"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm tracking-tight">Logga ut</span>
        </button>
      </div>
    </aside>
  );
}
