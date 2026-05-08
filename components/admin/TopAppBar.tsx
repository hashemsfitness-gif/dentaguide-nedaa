'use client';

import { Search, Bell, ExternalLink, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function TopAppBar() {
  const pathname = usePathname();
  
  // Simple breadcrumb logic
  const paths = pathname?.split('/').filter(Boolean) || [];
  
  return (
    <header className="h-20 border-b border-[var(--border-light)] bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <nav className="flex items-center text-sm font-medium text-[var(--text-muted)] gap-2">
          {paths.map((path, i) => (
            <div key={path} className="flex items-center gap-2">
              <span className="capitalize">{path}</span>
              {i < paths.length - 1 && <span className="opacity-40">/</span>}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Trigger */}
        <button 
          className="flex items-center gap-3 px-4 py-2 bg-[var(--neutral)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all border border-transparent hover:border-[var(--border-medium)] w-64 group"
          onClick={() => window.dispatchEvent(new CustomEvent('open-admin-search'))}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">Sök...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[var(--border-light)] opacity-60 group-hover:opacity-100 transition-opacity">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-4 border-l border-[var(--border-light)] pl-6">
          <Link 
            href="/dashboard" 
            target="_blank"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Live Site
          </Link>
          
          <button className="relative text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--sidebar-text-active)] rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 ml-2 group cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-bold text-[var(--text-primary)] leading-none">Admin</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-wider font-mono">Master Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary-container)]/20 transition-transform group-hover:scale-105">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
