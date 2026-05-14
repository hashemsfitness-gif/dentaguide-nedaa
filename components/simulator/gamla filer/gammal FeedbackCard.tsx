'use client';

import React, { useEffect } from 'react';
import { useFlipAnimation } from '@/hooks/useFlipAnimation';
import { ScoreBreakdown } from './ScoreBreakdown';
import { cn } from '@/lib/utils';

interface FeedbackCardProps {
  feedback: {
    scores: {
      diagnosis: number;
      icd: number;
      tlv: number;
      total: number;
    };
    correct: {
      trolig_diagnos: string;
      icd_code: string;
      differentialdiagnoser: string[];
      tlvCodes: string[];
      kallor: any;
    };
  };
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackCard({ feedback, onNext, isLast }: FeedbackCardProps) {
  const { isFlipped, flip, prefersReducedMotion } = useFlipAnimation();

  // Auto-flip after a delay
  useEffect(() => {
    const timer = setTimeout(flip, 800);
    return () => clearTimeout(timer);
  }, [flip]);

  return (
    <div className="max-w-2xl mx-auto h-[500px] flip-container animate-in fade-in zoom-in duration-500">
      <div className="flip-inner h-full" data-flipped={isFlipped}>
        
        {/* Front: Score Summary */}
        <div className="flip-front glass-bento p-12 flex flex-col items-center justify-center gap-8 shadow-2xl bg-white/60">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96" cy="96" r="88"
                fill="none" stroke="currentColor" strokeWidth="12"
                className="text-black/5"
              />
              <circle
                cx="96" cy="96" r="88"
                fill="none" stroke="currentColor" strokeWidth="12"
                strokeDasharray={552}
                strokeDashoffset={552 - (552 * feedback.scores.total) / 100}
                className="text-secondary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{feedback.scores.total}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Poäng</span>
            </div>
          </div>
          <ScoreBreakdown scores={feedback.scores} />
        </div>

        {/* Back: Correct Answers & Reality */}
        <div className="flip-back glass-bento p-10 flex flex-col gap-6 shadow-2xl bg-white/80 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Rätt Diagnos</label>
              <div className="text-xl font-bold leading-tight">{feedback.correct.trolig_diagnos}</div>
              {feedback.correct.differentialdiagnoser?.length > 0 && (
                <div className="text-xs text-black/50 font-medium italic">
                  Diff-diagnoser: {feedback.correct.differentialdiagnoser.join(', ')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">ICD-10</label>
                <div className="text-lg font-mono font-bold">{feedback.correct.icd_code}</div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Åtgärder</label>
                <div className="flex flex-wrap gap-2">
                  {feedback.correct.tlvCodes?.map(c => (
                    <span key={c} className="badge bg-secondary/10 text-secondary border-secondary/20">{c}</span>
                  ))}
                  {(!feedback.correct.tlvCodes || feedback.correct.tlvCodes.length === 0) && (
                    <span className="text-sm font-medium opacity-40">Inga koder</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-black/5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Vetenskapligt underlag</label>
              <div className="space-y-2">
                {feedback.correct.kallor?.map((source: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-black/5 rounded-xl text-xs font-medium leading-relaxed">
                    <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">menu_book</span>
                    {source.name}
                  </div>
                ))}
                {(!feedback.correct.kallor || feedback.correct.kallor.length === 0) && (
                   <div className="text-xs font-medium opacity-40 italic">Inga specifika källor angivna.</div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className="mt-auto btn-primary py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
          >
            {isLast ? "Visa Resultat" : "Nästa fall"}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
}
