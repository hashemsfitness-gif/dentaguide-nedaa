'use client';

import { useState, useCallback, useEffect } from 'react';

export function useFlipAnimation() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const flip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const reset = useCallback(() => {
    setIsFlipped(false);
  }, []);

  return {
    isFlipped,
    flip,
    reset,
    prefersReducedMotion
  };
}
