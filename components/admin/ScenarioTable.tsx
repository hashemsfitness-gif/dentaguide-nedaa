'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Edit3, 
  Eye, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Scenario {
  id: string;
  title: string;
  scenario_code: string;
  icd_code: string | null;
  is_published: boolean;
  is_premium: boolean;
  updated_at: string;
  categories: {
    name: string;
  };
}

export default function ScenarioTable({ scenarios }: { scenarios: Scenario[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = scenarios.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                         s.scenario_code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true : 
                         filter === 'published' ? s.is_published :
                         filter === 'draft' ? !s.is_published :
                         filter === 'premium' ? s.is_premium : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-[2rem] border border-[var(--border-light)] overflow-hidden">
      <div className="p-8 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--neutral)]/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text"
              placeholder="Sök scenario eller kod..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-[var(--border-light)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-text-active)]/20 w-80 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[var(--border-light)]">
            {['all', 'published', 'draft', 'premium'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                  filter === f 
                    ? "bg-[var(--text-primary)] text-white shadow-lg" 
                    : "text-[var(--text-muted)] hover:bg-[var(--neutral)]"
                )}
              >
                {f === 'all' ? 'Alla' : f === 'published' ? 'Publicerade' : f === 'draft' ? 'Utkast' : 'Premium'}
              </button>
            ))}
          </div>
        </div>
        
        <Link 
          href="/admin/scenarios/new"
          className="bg-[var(--sidebar-text-active)] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[var(--sidebar-text-active)]/20 hover:scale-105 transition-transform"
        >
          + Nytt Scenario
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--neutral)]/10">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Scenario</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Kategori</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">ICD-10</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Uppdaterad</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)] text-right">Åtgärder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-light)]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[var(--neutral)]/30 transition-colors group">
                <td className="px-8 py-6">
                  <div>
                    <p className="font-bold text-[var(--text-primary)] group-hover:text-[var(--sidebar-text-active)] transition-colors">{s.title}</p>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{s.scenario_code}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-medium bg-[var(--neutral)] px-3 py-1.5 rounded-lg text-[var(--text-primary)]">
                    {s.categories?.name}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <code className="text-xs font-mono bg-white border border-[var(--border-light)] px-2 py-1 rounded text-[var(--text-muted)]">
                    {s.icd_code || 'N/A'}
                  </code>
                </td>
                <td className="px-8 py-6">
                  {s.is_published ? (
                    <div className="flex items-center gap-2 text-[var(--status-online)] font-bold text-[10px] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      Live
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[var(--text-muted)] font-bold text-[10px] uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      Utkast
                    </div>
                  )}
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    {format(new Date(s.updated_at), 'd MMM yyyy', { locale: sv })}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/admin/scenarios/${s.id}/edit`}
                      className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--sidebar-text-active)] transition-all"
                      title="Redigera"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                      className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                      title="Visa"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-[var(--border-light)] text-[var(--text-muted)] transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
