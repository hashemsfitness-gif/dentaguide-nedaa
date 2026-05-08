"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ortodontiScenarios } from '@/lib/data/ortodonti-scenarios';

export default function OrtScenarioSidebar() {
  const pathname = usePathname();
  const scenarios = Object.values(ortodontiScenarios);

  const categories = ["Akut Ortodonti", "Retention", "Karies & Slemhinna"];

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-[40px] p-8 border border-white shadow-clay flex flex-col h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-display italic text-slate-800 mb-2">Ortodonti Scenarios</h2>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Agent 09 Workspace</p>

      <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {categories.map(cat => (
          <div key={cat} className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">{cat}</h4>
            <div className="space-y-1">
              {scenarios.filter(s => s.category === cat).map(scenario => {
                const isActive = pathname.includes(scenario.slug);
                return (
                  <Link
                    key={scenario.slug}
                    href={`/ortodonti/${scenario.slug}`}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-[24px] transition-all group border-2 ${
                      isActive
                        ? 'bg-[#0E2C4B] border-[#0E2C4B] text-white shadow-xl scale-[1.02]'
                        : 'bg-white border-transparent hover:border-slate-100 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/10' : 'bg-slate-50'
                    }`}>
                      <span className="text-sm">{getScenarioEmoji(scenario.slug)}</span>
                    </div>
                    <div className="flex-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${
                        isActive ? 'text-blue-300' : 'text-slate-400'
                      }`}>
                        {scenario.id}
                      </span>
                      <h4 className="text-[11px] font-bold leading-tight tracking-tight">{scenario.title}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="space-y-3 pt-4 border-t border-slate-100">
           <Link
             href="/ortodonti/riktlinjer"
             className={`w-full text-left flex items-center gap-4 p-4 rounded-[24px] transition-all group border-2 ${
               pathname.includes('riktlinjer')
                 ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02]'
                 : 'bg-white border-transparent hover:border-slate-100 hover:shadow-md'
             }`}
           >
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
               pathname.includes('riktlinjer') ? 'bg-white/10' : 'bg-blue-50'
             }`}>
               <span className="text-sm">📑</span>
             </div>
             <div className="flex-1">
               <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${
                 pathname.includes('riktlinjer') ? 'text-blue-300' : 'text-blue-400'
               }`}>
                 DIAG
               </span>
               <h4 className="text-[11px] font-bold leading-tight tracking-tight">Interceptiva Riktlinjer</h4>
             </div>
           </Link>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
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
