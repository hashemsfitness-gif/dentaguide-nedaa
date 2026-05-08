'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

export function LeaderboardWidget() {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const res = await fetch('/api/simulator/leaderboard');
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      return res.json();
    }
  });

  const toggleOptIn = useMutation({
    mutationFn: async (val: boolean) => {
      const res = await fetch('/api/profile/leaderboard-opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optIn: val }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });

  if (isLoading) return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  if (!data?.userClinic) return null;

  return (
    <div className="glass-bento p-8 space-y-6 shadow-xl">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-sm font-bold uppercase tracking-widest">Klinikens Leaderboard</h3>
          <p className="text-[10px] font-medium text-black/40 uppercase">{data.userClinic}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-black/30 uppercase">Dela resultat</span>
          <button
            onClick={() => toggleOptIn.mutate(!data.userOptIn)}
            className={cn(
              "w-10 h-5 rounded-full relative transition-all duration-300",
              data.userOptIn ? "bg-secondary" : "bg-black/10"
            )}
          >
            <div className={cn(
              "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300",
              data.userOptIn ? "right-1" : "left-1"
            )} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {data.leaderboard?.map((user: any, i: number) => (
          <div 
            key={user.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl transition-all",
              i === 0 ? "bg-secondary/5 border border-secondary/10" : "bg-black/5"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold w-4 text-black/30">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name[0]}
              </div>
              <span className="text-xs font-bold">{user.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-bold text-secondary">{user.avgScore} <span className="text-[10px] font-medium text-black/30">p avg</span></div>
                <div className="text-[8px] font-bold text-black/30 uppercase">{user.sessionCount} pass</div>
              </div>
              {i === 0 && <span className="material-symbols-outlined text-tertiary-gold text-[18px]">workspace_premium</span>}
            </div>
          </div>
        ))}

        {(!data.leaderboard || data.leaderboard.length === 0) && (
          <div className="text-center py-8 text-xs font-medium text-black/30 italic">
            Ingen har delat sina resultat än.<br/>Bli först genom att aktivera toggle!
          </div>
        )}
      </div>
    </div>
  );
}
