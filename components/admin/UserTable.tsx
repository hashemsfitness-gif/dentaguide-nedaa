'use client';

import { useState } from 'react';
import { 
  Search, 
  Download, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Crown,
  Building2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  tier: 'free' | 'kliniker' | 'klinik';
  role: 'user' | 'admin';
  subscription_status: string;
  created_at: string;
  last_sign_in_at: string | null;
}

const TIER_ICONS = {
  free: UserIcon,
  kliniker: Crown,
  klinik: Building2,
};

const TIER_LABELS = {
  free: 'Free',
  kliniker: 'Kliniker',
  klinik: 'Klinik / Grupp',
};

export default function UserTable({ users: initialUsers }: { users: UserProfile[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const filtered = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleTierChange = async (userId: string, newTier: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/tier`, {
        method: 'PATCH',
        body: JSON.stringify({ tier: newTier }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, tier: newTier as any } : u));
      } else {
        alert('Kunde inte ändra tier.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      window.location.href = '/api/admin/users/export';
    } finally {
      setTimeout(() => setIsExporting(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-[var(--border-light)] overflow-hidden">
      <div className="p-8 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--neutral)]/30">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input 
            type="text"
            placeholder="Sök på namn eller e-post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white border border-[var(--border-light)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-text-active)]/20 w-80 transition-all"
          />
        </div>

        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="bg-[var(--text-primary)] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[var(--text-primary)]/20 hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporterar...' : 'Exportera CSV'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--neutral)]/10">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Användare</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Tier</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Registrerad</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)]">Senast inloggad</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-light)] text-right">Åtgärder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-light)]">
            {filtered.map((u) => {
              const TierIcon = TIER_ICONS[u.tier] || UserIcon;
              return (
                <tr key={u.id} className="hover:bg-[var(--neutral)]/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--neutral)] flex items-center justify-center text-[var(--text-muted)] font-bold">
                        {u.full_name?.[0] || u.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                          {u.full_name || 'Namn saknas'}
                          {u.role === 'admin' && <Shield className="w-3 h-3 text-[var(--sidebar-text-active)]" title="Admin" />}
                        </p>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={u.tier}
                      onChange={(e) => handleTierChange(u.id, e.target.value)}
                      className={cn(
                        "text-xs font-bold px-3 py-1.5 rounded-lg border-2 bg-transparent focus:outline-none transition-all cursor-pointer",
                        u.tier === 'klinik' ? "border-[var(--sidebar-text-active)]/30 text-[var(--sidebar-text-active)]" :
                        u.tier === 'kliniker' ? "border-[var(--card-border-subs)]/30 text-[var(--card-border-subs)]" :
                        "border-[var(--border-light)] text-[var(--text-muted)]"
                      )}
                    >
                      <option value="free">Free</option>
                      <option value="kliniker">Kliniker</option>
                      <option value="klinik">Klinik</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        u.subscription_status === 'active' ? "bg-[var(--status-online)]" : "bg-[var(--status-warning)]"
                      )} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                        {u.subscription_status || 'Free'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      {format(new Date(u.created_at), 'd MMM yyyy', { locale: sv })}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      {u.last_sign_in_at ? format(new Date(u.last_sign_in_at), 'd MMM HH:mm', { locale: sv }) : 'Aldrig'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-[var(--border-light)] text-[var(--text-muted)] transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
