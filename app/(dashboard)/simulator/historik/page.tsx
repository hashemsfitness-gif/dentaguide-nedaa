'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SimulatorLayout } from '@/components/simulator/SimulatorLayout';
import { gradeFromScore } from '@/lib/simulator/scoring';
import { cn } from '@/lib/utils';

export default function HistorikPage() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['simulator-history'],
    queryFn: async () => {
      const res = await fetch('/api/simulator/history'); // We'll need this route
      if (!res.ok) throw new Error('Failed to fetch history');
      return res.json();
    }
  });

  return (
    <SimulatorLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold sim-title-gradient">Min Historik</h1>
            <p className="text-sm text-black/40 font-medium uppercase tracking-widest">Dina slutförda simulator-pass</p>
          </div>
          <button 
            onClick={() => window.location.href = '/simulator'}
            className="btn-primary py-3 px-8 text-xs font-bold tracking-widest uppercase"
          >
            Nytt pass
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="animate-pulse h-24 bg-black/5 rounded-2xl" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {sessions?.history?.map((session: any) => {
              const grade = gradeFromScore(session.total_score, session.max_possible_score);
              return (
                <div key={session.id} className="glass-bento p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all border-l-8 border-black/5">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg",
                      grade === 'A' ? 'bg-green-500' : grade === 'F' ? 'bg-red-500' : 'bg-secondary'
                    )}>
                      {grade}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold">
                        {session.difficulty} • {session.total_score} / {session.max_possible_score} p
                      </div>
                      <div className="text-[10px] font-medium text-black/40 uppercase">
                        {new Date(session.completed_at).toLocaleDateString()} • {session.total_cases} fall
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-black/5 hover:bg-black/10 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </button>
                </div>
              );
            })}

            {(!sessions?.history || sessions.history.length === 0) && (
              <div className="glass-bento p-20 text-center space-y-4 border-dashed border-2 border-black/10">
                <div className="text-4xl">📉</div>
                <p className="text-sm font-medium text-black/40">Du har inte slutfört några pass än.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </SimulatorLayout>
  );
}
