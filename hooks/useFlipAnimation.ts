'use client';

import { useState, useCallback } from 'react';

interface UseFlipAnimationReturn {
  isFlipped: boolean;
  flip: () => void;
  reset: () => void;
  prefersReducedMotion: boolean;
}

/**
 * useFlipAnimation
 * Styr CSS 3D-flip-animationen på FeedbackCard.
 * Respekterar prefers-reduced-motion.
 */
export function useFlipAnimation(): UseFlipAnimationReturn {
  const [isFlipped, setIsFlipped] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const flip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const reset = useCallback(() => {
    setIsFlipped(false);
  }, []);

  return { isFlipped, flip, reset, prefersReducedMotion };
}
