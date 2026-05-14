'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function ResumeBanner() {
  const router = useRouter();
  
  const { data } = useQuery({
    queryKey: ['active-session'],
    queryFn: async () => {
      const res = await fetch('/api/simulator/active-session'); // We'll need this route
      if (!res.ok) return null;
      return res.json();
    }
  });

  if (!data?.session) return null;

  return (
    <div className="glass-bento p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-secondary shadow-xl animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined">restart_alt</span>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold">Fortsätt där du slutade</h4>
          <p className="text-xs text-black/50 font-medium">
            Du har en pågående session ({data.session.completed_cases + 1}/5 cases) från {new Date(data.session.started_at).toLocaleDateString()}.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/simulator?session=${data.session.id}`)}
          className="btn-primary py-3 px-8 text-xs font-bold tracking-widest uppercase"
        >
          Fortsätt session
        </button>
      </div>
    </div>
  );
}
