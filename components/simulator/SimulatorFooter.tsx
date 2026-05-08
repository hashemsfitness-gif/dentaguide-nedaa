'use client';

import React from 'react';

export function SimulatorFooter() {
  return (
    <footer className="w-full py-6 px-4 border-t border-black/5 bg-white/30 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-black/50 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          PSL 2010:659 — Ersätter inte kliniskt omdöme
        </div>
        <div className="text-center md:text-right">
          Simulatorn är ett utbildningsverktyg för DentaGuide-Pro
        </div>
      </div>
    </footer>
  );
}
