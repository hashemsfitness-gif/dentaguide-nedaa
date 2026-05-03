'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * TutorialOverlay — 4-stegs onboarding overlay
 * Visas när user_metadata.has_seen_tutorial === false
 */

const steps = [
  {
    title: 'Sök ett scenario',
    description:
      'Använd Cmd+K (eller Ctrl+K) för att snabbsöka bland 82 scenarier direkt från tangentbordet.',
    target: '[data-tutorial="search"]',
    character: '/characters/wave.gif',
    icon: '🔍',
  },
  {
    title: 'Bokmärk favoriter',
    description:
      'Spara scenarier du ofta använder med ⭐-knappen. Dina bokmärken synkas automatiskt.',
    target: '[data-tutorial="bookmark"]',
    character: '/characters/think.gif',
    icon: '⭐',
  },
  {
    title: 'Använd verktyg',
    description:
      'Doseringskalkylator, antibiotikastöd och AI-journal finns i sidebar:en — alltid ett klick bort.',
    target: '[data-tutorial="tools"]',
    character: '/characters/think.gif',
    icon: '🛠️',
  },
  {
    title: 'Klar!',
    description:
      'Kom ihåg: PSL 2010:659 — DentaGuide-Pro är ett beslutsstöd och ersätter inte kliniskt omdöme.',
    target: '[data-tutorial="footer"]',
    character: '/characters/hug.jpg',
    icon: '🎉',
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
}

export default function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(9, 27, 20, 0.7)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
      >
        <motion.div
          className="glass-bento"
          style={{ maxWidth: '480px', width: '100%', padding: '3rem', position: 'relative' }}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
          key={step}
        >
          {/* Character */}
          <div className="absolute -top-14 -right-2" aria-hidden="true">
            <Image
              src={current.character}
              alt=""
              width={96}
              height={96}
              className="object-contain drop-shadow-lg"
              unoptimized
            />
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mb-6" role="list" aria-label="Steg">
            {steps.map((_, i) => (
              <div
                key={i}
                role="listitem"
                aria-label={i === step ? `Steg ${i + 1} (nuvarande)` : `Steg ${i + 1}`}
                style={{
                  height: '4px',
                  flex: 1,
                  borderRadius: '9999px',
                  background: i <= step ? 'var(--secondary, #CC5833)' : 'var(--border-light, #E5E3DF)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>

          <p className="badge mb-4" aria-live="polite">
            Steg {step + 1} av {steps.length}
          </p>

          <div className="text-4xl mb-4" aria-hidden="true">{current.icon}</div>

          <h2
            id="tutorial-title"
            className="editorial-header text-3xl mb-4"
            style={{ color: 'var(--primary)' }}
          >
            {current.title}
          </h2>

          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {current.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            {step > 0 && (
              <button
                className="btn-outline"
                onClick={() => setStep((s) => s - 1)}
                aria-label="Föregående steg"
              >
                Tillbaka
              </button>
            )}
            <button
              className="btn-primary"
              onClick={() => (isLast ? onComplete() : setStep((s) => s + 1))}
              aria-label={isLast ? 'Avsluta tutorial' : 'Nästa steg'}
            >
              {isLast ? 'Klar! 🎉' : 'Nästa →'}
            </button>
          </div>

          {/* Skip */}
          {!isLast && (
            <div className="text-center mt-4">
              <button
                className="text-xs"
                style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={onComplete}
                aria-label="Hoppa över tutorial"
              >
                Hoppa över
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
