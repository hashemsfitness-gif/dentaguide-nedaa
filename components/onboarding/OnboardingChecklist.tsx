'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import * as Sentry from '@sentry/nextjs';

/**
 * OnboardingChecklist — Sidebar-widget med 4 tasks och progress-bar.
 * Hämtar onboarding-status från /api/onboarding/status
 * Kollapserbar (default expanderad).
 */

interface Task {
  id: string;
  label: string;
  description: string;
  done: boolean;
}

const DEFAULT_TASKS: Task[] = [
  { id: 'search', label: 'Sök ditt första scenario', description: 'Tryck Cmd+K och sök "akut"', done: false },
  { id: 'bookmark', label: 'Bokmärk ett scenario', description: 'Klicka ⭐ på ett scenario du gillar', done: false },
  { id: 'tool', label: 'Testa ett verktyg', description: 'Prova doskalkylatorn i sidebar', done: false },
  { id: 'profile', label: 'Fyll i din profil', description: 'Lägg till klinik och specialitet', done: false },
];

export default function OnboardingChecklist() {
  const [expanded, setExpanded] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/onboarding/status');
        if (!res.ok) throw new Error('Kunde inte hämta onboarding-status');
        const data = await res.json();
        if (data.tasks) {
          setTasks((prev) =>
            prev.map((t) => ({ ...t, done: Boolean(data.tasks[t.id]) }))
          );
        }
      } catch (err) {
        Sentry.captureException(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  const doneCount = tasks.filter((t) => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);
  const allDone = doneCount === tasks.length;

  if (allDone) return null;

  return (
    <div
      className="glass-bento"
      style={{ padding: '1.25rem', marginBottom: '1rem' }}
      role="complementary"
      aria-label="Kom igång-checklista"
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between bg-transparent border-0 cursor-pointer p-0"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-controls="onboarding-list"
      >
        <div className="flex items-center gap-2">
          <Image src="/characters/think.gif" alt="" width={40} height={40} unoptimized aria-hidden="true" />
          <div className="text-left">
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
              Kom igång
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {doneCount} av {tasks.length} klara
            </p>
          </div>
        </div>
        <span
          aria-hidden="true"
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            transition: 'transform 0.3s',
            display: 'inline-block',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Progress bar */}
      <div
        className="mt-3 rounded-full overflow-hidden"
        style={{ height: '6px', background: 'var(--border-light)', marginBottom: expanded ? '1rem' : 0 }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${progress}% slutförd`}
      >
        <motion.div
          style={{ height: '100%', background: 'var(--secondary)', borderRadius: '9999px' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Task list */}
      <AnimatePresence>
        {expanded && (
          <motion.ul
            id="onboarding-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-2"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {loading ? (
              <li style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.5rem 0' }}>
                Laddar…
              </li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 p-2 rounded-xl"
                  style={{
                    background: task.done ? 'rgba(45,106,79,0.06)' : 'transparent',
                    transition: 'background 0.3s',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${task.done ? 'var(--status-ok)' : 'var(--border-medium)'}`,
                      background: task.done ? 'var(--status-ok)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      fontSize: '0.65rem',
                      color: 'white',
                      transition: 'all 0.3s',
                    }}
                  >
                    {task.done ? '✓' : ''}
                  </span>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: task.done ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: task.done ? 'line-through' : 'none',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {task.label}
                    </p>
                    {!task.done && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
