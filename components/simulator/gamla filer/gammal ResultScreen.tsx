'use client';

import React from 'react';
import { Grade } from '@/lib/simulator/scoring';
import { cn } from '@/lib/utils';

interface ResultScreenProps {
  totalScore: number;
  maxScore: number;
  grade: Grade;
  results: any[];
  onRestart: () => void;
}

export function ResultScreen({ totalScore, maxScore, grade, results, onRestart }: ResultScreenProps) {
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  const gradeColors: Record<Grade, string> = {
    'A': 'bg-green-500',
    'B': 'bg-emerald-500',
    'C': 'bg-yellow-500',
    'D': 'bg-orange-500',
    'F': 'bg-red-500',
  };

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto animate-in fade-in zoom-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold sim-title-gradient">Pass slutfört!</h1>
        <p className="text-xl text-black/60 font-medium">Bra jobbat, här är din kliniska sammanställning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Ring */}
        <div className="md:col-span-1 glass-bento p-10 flex flex-col items-center justify-center gap-6 shadow-xl">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#CC5833" />
                  <stop offset="100%" stopColor="#5B21B6" />
                </linearGradient>
              </defs>
              <circle
                cx="80" cy="80" r="74"
                fill="none" stroke="currentColor" strokeWidth="10"
                className="text-black/5"
              />
              <circle
                cx="80" cy="80" r="74"
                fill="none" stroke="url(#scoreGradient)" strokeWidth="10"
                strokeDasharray={465}
                strokeDashoffset={465 - (465 * percentage) / 100}
                className="transition-all duration-1500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{percentage}%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Total</span>
            </div>
          </div>
          
          <div className={cn(
            "px-8 py-2 rounded-full text-white text-3xl font-black shadow-lg",
            gradeColors[grade]
          )}>
            {grade}
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="md:col-span-2 glass-bento p-8 shadow-xl overflow-hidden">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Fall för fall</h3>
            <div className="space-y-3">
              {results.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/5 rounded-2xl group hover:bg-black/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {i + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{res.user_diagnosis || "Ej besvarat"}</span>
                      <span className="text-[10px] font-mono text-black/40 uppercase">{res.user_icd || "K??.?"}</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-secondary">
                    {res.total_case_score} <span className="text-[10px] font-medium text-black/30">p</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="btn-primary px-12 py-5 text-base shadow-xl"
        >
          Starta nytt pass
        </button>
        <button
          onClick={() => window.location.href = '/simulator/historik'}
          className="btn-outline px-12 py-5 text-base border-black/10 hover:bg-black/5"
        >
          Se historik
        </button>
      </div>
    </div>
  );
}
