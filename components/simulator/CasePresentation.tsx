'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CasePresentationProps {
  scenario: {
    patient_quote: string;
    anamnes: string;
    status_section: string;
    category_slug: string;
  };
}

export function CasePresentation({ scenario }: CasePresentationProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 🟢 Instruction Banner */}
      <div className="glass-bento p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary animate-pulse">info</span>
        <p className="text-sm font-bold text-primary/80 uppercase tracking-wide">
          Instruktion: Analysera fallen nedan. Ställ diagnos och ange korrekt ICD-10 kod för att gå vidare.
        </p>
      </div>

      {/* 🗣️ Patient Quote */}
      <div className="text-center py-8 px-4 bg-white/40 rounded-[40px] border border-white/60 shadow-inner">
        <span className="text-4xl text-black/20 block mb-2 font-serif">“</span>
        <h2 className="text-3xl md:text-5xl font-display italic font-medium leading-tight text-black/80 max-w-4xl mx-auto">
          {scenario.patient_quote || "Jag har ont i en tand..."}
        </h2>
        <span className="text-4xl text-black/20 block mt-2 font-serif text-right">”</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📋 Anamnes */}
        <section className="glass-bento p-10 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl">history_edu</span>
          </div>
          
          <div className="flex items-center gap-3 text-black/40">
            <span className="material-symbols-outlined">person_search</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Patienthistorik / Anamnes</h3>
          </div>
          
          <div 
            className="text-lg leading-relaxed text-black/70 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: scenario.anamnes }}
          />
        </section>

        {/* 🦷 Kliniska Fynd */}
        <section className="glass-bento p-10 space-y-6 relative overflow-hidden group border-l-4 border-primary">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl">clinical_notes</span>
          </div>

          <div className="flex items-center gap-3 text-primary/60">
            <span className="material-symbols-outlined">visibility</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Klinisk Status & Fynd</h3>
          </div>
          
          <div 
            className="text-lg leading-relaxed text-black/70 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: scenario.status_section }}
          />
        </section>
      </div>
    </div>
  );
}
