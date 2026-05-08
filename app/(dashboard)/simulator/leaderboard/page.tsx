'use client';

import React from 'react';
import { SimulatorLayout } from '@/components/simulator/SimulatorLayout';
import { LeaderboardWidget } from '@/components/simulator/LeaderboardWidget';

export default function LeaderboardPage() {
  return (
    <SimulatorLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold sim-title-gradient text-center">Klinik-toppen</h1>
          <p className="text-sm text-black/40 font-medium uppercase tracking-widest text-center">
            Se hur du står dig mot dina kollegor i klinisk diagnostik.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <LeaderboardWidget />
        </div>
        
        <div className="max-w-xl mx-auto glass-bento p-8 space-y-4 bg-black/5 text-center">
          <span className="material-symbols-outlined text-secondary">info</span>
          <p className="text-xs text-black/50 font-medium leading-relaxed">
            Leaderboarden visar genomsnittlig poäng per pass slutfört under de senaste 30 dagarna. 
            För att synas här måste du ha angett en klinik i din profil och valt att dela dina resultat.
          </p>
        </div>
      </div>
    </SimulatorLayout>
  );
}
