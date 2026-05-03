import { getDB } from './offline-db';
import * as Sentry from '@sentry/nextjs';

/**
 * lib/sync.ts — Background sync queue processor
 * Handles offline → online syncing with retry logic
 */

let syncInProgress = false;

export async function processSyncQueue(): Promise<void> {
  if (typeof navigator === 'undefined') return;
  if (syncInProgress || !navigator.onLine) return;
  syncInProgress = true;

  try {
    const db = await getDB();
    const queue = await db.getAll('sync-queue');

    if (queue.length === 0) return;

    for (const item of queue) {
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });

        if (res.ok) {
          await db.delete('sync-queue', item.id!);
        } else if (item.retry_count >= 3) {
          await db.delete('sync-queue', item.id!);
          Sentry.captureMessage('Sync item failed after 3 retries', {
            level: 'warning',
            extra: { item },
          });
        } else {
          await db.put('sync-queue', {
            ...item,
            retry_count: item.retry_count + 1,
          });
        }
      } catch (err) {
        Sentry.captureException(err, { extra: { syncItem: item } });
      }
    }
  } catch (err) {
    Sentry.captureException(err);
  } finally {
    syncInProgress = false;
  }
}

export function initSync(): void {
  if (typeof window === 'undefined') return;

  // Sync when coming back online
  window.addEventListener('online', () => {
    processSyncQueue().catch((err) => Sentry.captureException(err));
  });

  // Sync when tab becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      processSyncQueue().catch((err) => Sentry.captureException(err));
    }
  });

  // Periodic sync every 30 minutes (only when tab is active)
  setInterval(() => {
    if (!document.hidden) {
      processSyncQueue().catch((err) => Sentry.captureException(err));
    }
  }, 30 * 60 * 1000);

  // Initial sync on load
  if (navigator.onLine) {
    processSyncQueue().catch((err) => Sentry.captureException(err));
  }
}
