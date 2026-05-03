import { openDB, DBSchema, IDBPDatabase } from 'idb';

/**
 * lib/offline-db.ts — IndexedDB via idb v8
 * Tre stores: scenarios, sync-meta, sync-queue
 */

interface DentaGuideDB extends DBSchema {
  scenarios: {
    key: string;
    value: {
      id: string;
      slug: string;
      title: string;
      content: unknown;
      cached_at: number;
    };
    indexes: { 'by-slug': string };
  };
  'sync-meta': {
    key: string;
    value: {
      key: string;
      last_sync: number;
      version: string;
    };
  };
  'sync-queue': {
    key: number;
    value: {
      id?: number;
      action: 'create' | 'update' | 'delete';
      resource: string;
      data: unknown;
      retry_count: number;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<DentaGuideDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<DentaGuideDB>> {
  if (!dbPromise) {
    dbPromise = openDB<DentaGuideDB>('dentaguide-pro', 1, {
      upgrade(db) {
        const scenarioStore = db.createObjectStore('scenarios', { keyPath: 'id' });
        scenarioStore.createIndex('by-slug', 'slug');

        db.createObjectStore('sync-meta', { keyPath: 'key' });

        db.createObjectStore('sync-queue', {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    });
  }
  return dbPromise;
}

export async function getCachedScenario(slug: string) {
  try {
    const db = await getDB();
    return await db.getFromIndex('scenarios', 'by-slug', slug);
  } catch (error) {
    console.error('[offline-db] getCachedScenario:', error);
    return null;
  }
}

export async function cacheScenario(scenario: {
  id: string;
  slug: string;
  title: string;
  content: unknown;
}) {
  try {
    const db = await getDB();
    await db.put('scenarios', { ...scenario, cached_at: Date.now() });
  } catch (error) {
    console.error('[offline-db] cacheScenario:', error);
  }
}

export async function getAllCachedScenarios() {
  try {
    const db = await getDB();
    return await db.getAll('scenarios');
  } catch (error) {
    console.error('[offline-db] getAllCachedScenarios:', error);
    return [];
  }
}

export async function removeCachedScenario(id: string) {
  try {
    const db = await getDB();
    await db.delete('scenarios', id);
  } catch (error) {
    console.error('[offline-db] removeCachedScenario:', error);
  }
}

export async function queueSyncAction(action: {
  action: 'create' | 'update' | 'delete';
  resource: string;
  data: unknown;
}) {
  try {
    const db = await getDB();
    await db.add('sync-queue', { ...action, retry_count: 0 });
  } catch (error) {
    console.error('[offline-db] queueSyncAction:', error);
  }
}

export async function getSyncMeta(key: string) {
  try {
    const db = await getDB();
    return await db.get('sync-meta', key);
  } catch (error) {
    console.error('[offline-db] getSyncMeta:', error);
    return null;
  }
}

export async function setSyncMeta(key: string, version: string) {
  try {
    const db = await getDB();
    await db.put('sync-meta', { key, last_sync: Date.now(), version });
  } catch (error) {
    console.error('[offline-db] setSyncMeta:', error);
  }
}
