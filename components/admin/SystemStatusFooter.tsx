'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ServiceStatus = 'operational' | 'degraded' | 'unknown' | 'none';

interface StatusData {
  supabase: ServiceStatus;
  stripe: ServiceStatus;
  sentry: ServiceStatus;
  vercel: ServiceStatus;
  checked_at: string;
}

const STATUS_COLORS: Record<ServiceStatus, string> = {
  operational: 'bg-[var(--status-online)]',
  degraded: 'bg-[var(--status-warning)]',
  unknown: 'bg-[var(--text-muted)]',
  none: 'bg-transparent',
};

export default function SystemStatusFooter() {
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/admin/system-status');
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
        }
      } catch (err) {
        console.error('Failed to fetch system status:', err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <footer className="h-10 bg-[var(--footer-bg)] px-8 flex items-center justify-between text-[var(--footer-text)] text-[10px] uppercase tracking-widest font-mono z-40 fixed bottom-0 left-[240px] right-0 border-t border-white/5">
      <div className="flex items-center gap-6">
        <StatusItem name="Supabase" status={status.supabase} />
        <StatusItem name="Vercel" status={status.vercel} />
        <StatusItem name="Stripe" status={status.stripe} />
        <StatusItem name="Sentry" status={status.sentry} />
      </div>
      
      <div className="flex items-center gap-4 opacity-60">
        <span>DentaGuide-Pro V5.0.0</span>
        <span>•</span>
        <span>© 2026 Clinical Intelligence Engine</span>
      </div>
    </footer>
  );
}

function StatusItem({ name, status }: { name: string; status: ServiceStatus }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_COLORS[status])} />
      <span className="opacity-80">{name}</span>
      <span className={cn(
        "font-bold",
        status === 'operational' ? "text-[var(--status-online)]" : "text-[var(--status-warning)]"
      )}>
        {status === 'operational' ? 'Online' : status.toUpperCase()}
      </span>
    </div>
  );
}
