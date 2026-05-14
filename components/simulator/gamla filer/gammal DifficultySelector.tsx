'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DifficultySelectorProps {
  selected: 'basic' | 'standard' | 'advanced';
  onChange: (d: 'basic' | 'standard' | 'advanced') => void;
}

export function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  const difficulties = [
    { id: 'basic', label: 'Basic', desc: 'Vanliga fall & tydlig status', color: '#0D9488' },
    { id: 'standard', label: 'Standard', desc: 'Varierad klinik & diff-diagnoser', color: '#CC5833' },
    { id: 'advanced', label: 'Advanced', desc: 'Komplexa fall & TLV-fokus', color: '#5B21B6' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {difficulties.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className={cn(
            "morphic-button p-6 flex flex-col gap-2 transition-all border-2",
            selected === d.id 
              ? "border-current shadow-lg scale-105" 
              : "border-transparent opacity-70 hover:opacity-100"
          )}
          style={{ color: selected === d.id ? d.color : 'inherit' }}
        >
          <span className="text-lg font-bold">{d.label}</span>
          <span className="text-xs font-medium opacity-60 leading-relaxed">{d.desc}</span>
        </button>
      ))}
    </div>
  );
}
