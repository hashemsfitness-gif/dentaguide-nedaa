'use client';

import { cn } from '@/lib/utils';

type StatVariant = 'users' | 'subs' | 'scenarios' | 'mrr';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  variant: StatVariant;
  trend?: 'up' | 'down' | 'stable';
}

const VARIANT_STYLES: Record<StatVariant, string> = {
  users: 'border-[var(--card-border-users)]',
  subs: 'border-[var(--card-border-subs)]',
  scenarios: 'border-[var(--card-border-scenarios)]',
  mrr: 'border-[var(--card-border-mrr)]',
};

export default function StatCard({ label, value, delta, variant, trend }: StatCardProps) {
  return (
    <div className={cn(
      "stat-card-pill group",
      VARIANT_STYLES[variant]
    )}>
      <div className="flex flex-col items-center justify-center">
        <span className="stat-label mb-2">{label}</span>
        <h3 className="stat-value">{value}</h3>
        {delta && (
          <div className={cn(
            "stat-trend mt-3 flex items-center gap-1 font-bold",
            trend === 'up' ? "text-[var(--status-online)]" : 
            trend === 'down' ? "text-[var(--status-danger)]" : 
            "text-[var(--text-muted)]"
          )}>
            <span>{delta}</span>
            {trend === 'up' && <span className="text-xs">↑</span>}
            {trend === 'down' && <span className="text-xs">↓</span>}
          </div>
        )}
      </div>
      
      {/* Decorative corner element */}
      <div className={cn(
        "absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-40 group-hover:scale-150 transition-transform",
        VARIANT_STYLES[variant].replace('border-', 'bg-')
      )} />
    </div>
  );
}
