'use client';

import React, { useState } from 'react';
import { DifficultySelector } from './DifficultySelector';
import { CategoryChips } from './CategoryChips';
import { ResumeBanner } from './ResumeBanner';

interface StartScreenProps {
  onStart: (difficulty: 'basic' | 'standard' | 'advanced', categoryIds: string[]) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [difficulty, setDifficulty] = useState<'basic' | 'standard' | 'advanced'>('standard');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold sim-title-gradient leading-tight">
          Simulator & Fortbildning
        </h1>
        <p className="text-xl text-black/60 font-medium">
          Vässa din kliniska blick genom 5 simulerade patientfall.
        </p>
      </div>

      <ResumeBanner />

      <div className="glass-bento p-10 space-y-10">
        <div className="space-y-6">
          <label className="text-sm font-bold uppercase tracking-widest text-black/40">
            Välj svårighetsgrad
          </label>
          <DifficultySelector selected={difficulty} onChange={setDifficulty} />
        </div>

        <div className="space-y-6">
          <label className="text-sm font-bold uppercase tracking-widest text-black/40">
            Fokusområden (Valfritt)
          </label>
          <CategoryChips selected={categoryIds} onChange={setCategoryIds} />
        </div>

        <button
          onClick={() => onStart(difficulty, categoryIds)}
          className="w-full btn-primary py-6 text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          Starta 5 cases
        </button>
      </div>
    </div>
  );
}
