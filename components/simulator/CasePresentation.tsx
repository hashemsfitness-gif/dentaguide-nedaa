'use client';

import React from 'react';

interface CasePresentationProps {
  scenario: {
    patient_quote: string;
    anamnes: string;
    status_section: string;
  };
}

export function CasePresentation({ scenario }: CasePresentationProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center py-12 px-4">
        <h2 className="text-4xl md:text-5xl font-display italic font-medium leading-tight text-black/80 max-w-4xl mx-auto">
          &rdquo;{scenario.patient_quote || "Jag har ont i en tand..."}&rdquo;
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-bento p-8 space-y-4 border-l-8 border-secondary/20">
          <div className="flex items-center gap-3 text-secondary">
            <span className="material-symbols-outlined">person_search</span>
            <h3 className="text-sm font-bold uppercase tracking-widest">Anamnes</h3>
          </div>
          <div 
            className="text-base leading-relaxed text-black/70 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: scenario.anamnes }}
          />
        </div>

        <div className="glass-bento p-8 space-y-4 border-l-8 border-primary/20">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined">clinical_notes</span>
            <h3 className="text-sm font-bold uppercase tracking-widest">Kliniska fynd</h3>
          </div>
          <div 
            className="text-base leading-relaxed text-black/70 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: scenario.status_section }}
          />
        </div>
      </div>
    </div>
  );
}
