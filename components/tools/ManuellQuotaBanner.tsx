'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Quota =
  | { unlimited: true }
  | { unlimited: false; allowed: boolean; remaining: number; limit: number; reset: number; message?: string }
  | { loading: true }
  | { error: true };

export default function ManuellQuotaBanner() {
  const [quota, setQuota] = useState<Quota>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/journalmall/manuell/check', { method: 'POST' })
      .then(async (r) => {
        const data = await r.json();
        if (cancelled) return;
        if (data.unlimited) setQuota({ unlimited: true });
        else
          setQuota({
            unlimited: false,
            allowed: !!data.allowed,
            remaining: data.remaining ?? 0,
            limit: data.limit ?? 4,
            reset: data.reset ?? 0,
            message: data.message,
          });
      })
      .catch(() => {
        if (!cancelled) setQuota({ error: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if ('loading' in quota || 'error' in quota) return null;
  if (quota.unlimited) {
    return (
      <div className="max-w-4xl mx-auto mb-6 rounded-2xl border border-status-ok/20 bg-status-ok/5 px-5 py-3 flex items-center gap-3 text-[13px]">
        <span className="font-mono text-[10px] tracking-widest2 uppercase border border-status-ok/30 bg-status-ok/15 text-status-ok rounded-full px-2.5 py-0.5">
          Premium
        </span>
        <span className="text-ink/75">Obegränsad åtkomst till Manuell journalmall.</span>
      </div>
    );
  }

  if (!quota.allowed) {
    return (
      <div className="max-w-4xl mx-auto mb-6 rounded-2xl border border-status-danger/25 bg-status-danger/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-status-danger text-lg">⛔</span>
          <div className="flex-1">
            <p className="font-semibold text-ink text-[14px] mb-1">
              Dagsgränsen är förbrukad (4/4)
            </p>
            <p className="text-[13px] text-ink/65 leading-relaxed">
              {quota.message ?? 'Du har använt dagens 4 gratis-mallar.'} Kvoten återställs om{' '}
              {formatReset(quota.reset)}.
            </p>
            <Link
              href="/pricing"
              className="mt-3 inline-flex btn-accent text-[13px] py-2 px-4"
            >
              Uppgradera till Kliniker <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-6 rounded-2xl border border-secondary/20 bg-secondary/5 px-5 py-3 flex items-center justify-between gap-4 flex-wrap text-[13px]">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest2 uppercase border border-secondary/30 bg-secondary/15 text-secondary rounded-full px-2.5 py-0.5">
          Gratis
        </span>
        <span className="text-ink/75">
          <strong>{quota.remaining}</strong> av <strong>{quota.limit}</strong> mallar kvar idag.
        </span>
      </div>
      <Link href="/pricing" className="text-secondary font-semibold text-[12px] underline">
        Uppgradera för obegränsat →
      </Link>
    </div>
  );
}

function formatReset(resetMs: number): string {
  const ms = resetMs - Date.now();
  if (ms <= 0) return 'nu';
  const hours = Math.ceil(ms / 3_600_000);
  if (hours <= 1) return 'mindre än en timme';
  return `ca ${hours} timmar`;
}
