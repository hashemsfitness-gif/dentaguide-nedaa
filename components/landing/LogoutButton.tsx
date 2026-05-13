'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';

export default function LogoutButton({
  variant = 'link',
  label = 'Logga ut',
}: {
  variant?: 'link' | 'ghost-white';
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      Sentry.captureException(err);
    } finally {
      router.refresh();
      router.push('/');
      setLoading(false);
    }
  }

  const baseClasses =
    variant === 'ghost-white'
      ? 'btn-ghost-white'
      : 'text-[14px] font-medium text-ink/70 hover:text-ink transition-colors';

  return (
    <button onClick={handleLogout} disabled={loading} className={baseClasses}>
      {loading ? 'Loggar ut…' : label}
    </button>
  );
}
