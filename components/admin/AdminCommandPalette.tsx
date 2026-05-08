'use client';

import { Command } from 'cmdk';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  FileText, 
  Users, 
  FolderTree, 
  Settings, 
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Listen for custom open event or keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    
    const handleOpenEvent = () => setOpen(true);

    document.addEventListener('keydown', down);
    window.addEventListener('open-admin-search', handleOpenEvent);
    
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-admin-search', handleOpenEvent);
    };
  }, []);

  // Search logic
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const onSelect = useCallback((url: string) => {
    setOpen(false);
    router.push(url);
  }, [router]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global sökning"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/40 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-[var(--border-light)] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-8 border-b border-[var(--border-light)] bg-[var(--neutral)]/30">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <Command.Input
            autoFocus
            placeholder="Sök scenario, kod, kategori eller användare..."
            value={query}
            onValueChange={setQuery}
            className="flex-1 px-4 py-8 text-lg font-medium text-[var(--text-primary)] focus:outline-none bg-transparent placeholder:text-[var(--text-muted)]/50"
          />
          {isLoading && (
            <div className="w-5 h-5 border-2 border-[var(--sidebar-text-active)] border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          <Command.Empty className="p-8 text-center">
            <p className="text-[var(--text-muted)] font-medium">Inga resultat hittades för "{query}"</p>
          </Command.Empty>

          {results.length > 0 && (
            <Command.Group heading="Sökresultat" className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              {results.map((item) => (
                <Command.Item
                  key={`${item.type}-${item.id}`}
                  onSelect={() => onSelect(item.url)}
                  className="flex items-center justify-between p-4 rounded-2xl cursor-pointer aria-selected:bg-[var(--neutral)] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] group-aria-selected:text-[var(--sidebar-text-active)] transition-colors">
                      {item.type === 'scenario' ? <FileText className="w-5 h-5" /> : 
                       item.type === 'user' ? <Users className="w-5 h-5" /> : 
                       <FolderTree className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{item.title}</p>
                      <p className="text-xs text-[var(--text-muted)] font-medium">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-aria-selected:opacity-100 -translate-x-2 group-aria-selected:translate-x-0 transition-all" />
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Snabbnavigering" className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-4">
            <NavItem onSelect={() => onSelect('/admin/dashboard')} icon={LayoutDashboard} label="Admin Dashboard" />
            <NavItem onSelect={() => onSelect('/admin/scenarios')} icon={FileText} label="Hantera Scenarier" />
            <NavItem onSelect={() => onSelect('/admin/users')} icon={Users} label="Användarhantering" />
            <NavItem onSelect={() => onSelect('/admin/settings')} icon={Settings} label="Systeminställningar" />
          </Command.Group>
        </Command.List>

        <div className="p-4 bg-[var(--neutral)]/30 border-t border-[var(--border-light)] flex items-center justify-center gap-6">
          <Kbd label="↑↓" desc="Navigera" />
          <Kbd label="↵" desc="Välj" />
          <Kbd label="ESC" desc="Stäng" />
        </div>
      </div>
    </Command.Dialog>
  );
}

function NavItem({ onSelect, icon: Icon, label }: { onSelect: () => void, icon: any, label: string }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer aria-selected:bg-[var(--neutral)] transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] group-aria-selected:text-[var(--sidebar-text-active)] transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-bold text-[var(--text-primary)]">{label}</p>
    </Command.Item>
  );
}

function Kbd({ label, desc }: { label: string, desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <kbd className="px-1.5 py-0.5 bg-white border border-[var(--border-light)] rounded text-[10px] font-mono font-bold text-[var(--text-muted)] shadow-sm">
        {label}
      </kbd>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] opacity-60">{desc}</span>
    </div>
  );
}
