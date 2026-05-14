'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreBreakdownProps {
  scores: {
    diagnosis: number;
    icd: number;
    tlv: number;
  };
}

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  const items = [
    { label: 'Diagnos', value: scores.diagnosis, max: 40 },
    { label: 'ICD-10', value: scores.icd, max: 30 },
    { label: 'Åtgärder', value: scores.tlv, max: 30 },
  ];

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const percentage = (item.value / item.max) * 100;
        let color = 'bg-status-danger';
        if (percentage >= 100) color = 'bg-status-ok';
        else if (percentage > 0) color = 'bg-status-warning';

        return (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-black/40">
              <span>{item.label}</span>
              <span>{item.value} / {item.max}</span>
            </div>
            <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-1000 delay-500", color)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
