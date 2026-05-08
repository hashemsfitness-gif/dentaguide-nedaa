'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  difficulty: string;
  accentColor?: string;
}

export function ProgressBar({ current, total, difficulty, accentColor = '#CC5833' }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="sticky top-0 z-50 w-full pt-4 pb-8 bg-transparent pointer-events-none">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-panel p-4 flex flex-col gap-3 pointer-events-auto shadow-xl">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            <div className="flex items-center gap-4">
              <span className="text-black">Case {current} av {total}</span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span>Svårighetsgrad: {difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span className="tabular-nums">00:00</span>
            </div>
          </div>
          
          <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-700 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}40`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
