"use client";

import React from 'react';
import Link from 'next/link';
import { ortodontiScenarios } from '@/lib/data/ortodonti-scenarios';

export default function OrtodontiPage() {
  const scenarios = Object.values(ortodontiScenarios);

  return (
    <div className="min-h-screen font-nunito p-8">
      {/* Hero Header */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 backdrop-blur-md p-10 rounded-[40px] border border-white shadow-clay">
          <div>
            <h1 className="text-4xl font-display italic text-slate-800 mb-2">Ortodonti Workspace</h1>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Agent 09 — Barn & Ungdom</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/ortodonti/riktlinjer"
              className="px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.05] active:scale-95 transition-all"
            >
              Interceptiva Riktlinjer
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Scenarios */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <Link 
            key={scenario.slug}
            href={`/ortodonti/${scenario.slug}`}
            className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-[32px] border border-white shadow-clay hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors">
                {getScenarioEmoji(scenario.slug)}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                {scenario.id}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {scenario.title}
            </h3>
            <p className="text-sm text-slate-500 italic mb-6 line-clamp-2">
              "{scenario.patientQuote}"
            </p>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className={`text-[10px] font-black uppercase tracking-widest ${scenario.isAcute ? 'text-red-500' : 'text-blue-500'}`}>
                {scenario.isAcute ? 'Akut Åtgärd' : 'Planerat Besök'}
              </span>
              <span className="text-slate-300 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .shadow-clay {
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(255, 255, 255, 1) inset;
        }
      `}</style>
    </div>
  );
}

function getScenarioEmoji(slug: string) {
  switch (slug) {
    case 'los-bracket': return '🔩';
    case 'vass-trad': return '✂️';
    case 'losnad-retainer': return '🦷';
    case 'apparatbrott': return '🧩';
    case 'smarta-ortodonti': return '😖';
    case 'sar-apparat': return '🩹';
    case 'hypersensibilitet-ortodonti': return '❄️';
    case 'retention-problem': return '🔒';
    case 'trauma-overbett': return '🚨';
    default: return '🦷';
  }
}
