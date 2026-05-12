"use client";

import React from 'react';
import { ortodontiRiktlinjer } from '@/lib/data/ortodonti-scenarios';
import OrtScenarioSidebar from '@/components/ortodonti/OrtScenarioSidebar';
import Link from 'next/link';

export default function RiktlinjerPage() {
  const { title, sections } = ortodontiRiktlinjer;

  return (
    <div className="min-h-screen font-nunito p-8">
      {/* Top Breadcrumb / Navigation */}
      <div className="max-w-[1800px] mx-auto flex justify-between items-center mb-12 px-4">
        <div className="flex items-center gap-4">
           <Link href="/ortodonti" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
             ←
           </Link>
           <h1 className="text-3xl font-display italic text-slate-800">Ortodonti Workspace</h1>
        </div>
        <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
           <Link href="/ortodonti" className="hover:text-slate-600">Dashboard</Link>
           <Link href="/ortodonti/los-bracket" className="hover:text-slate-600">Clinical Engine</Link>
           <span className="text-slate-800 border-b-2 border-blue-500 pb-1 cursor-pointer">Guidelines</span>
        </div>
        <div className="flex items-center gap-6 text-slate-400">
           <span className="cursor-pointer">🔍</span>
           <span className="cursor-pointer">🔔</span>
           <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://placehold.co/100x100/slate/white?text=A9" alt="Agent 09" />
           </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-10">
        
        {/* COLUMN 1: Sidebar (3/12) */}
        <div className="col-span-3 sticky top-8 h-fit">
          <OrtScenarioSidebar />
        </div>

        {/* COLUMN 2 & 3: Guidelines Content (9/12) */}
        <div className="col-span-9 space-y-12 pb-20">
          <div className="bg-white rounded-[40px] p-12 shadow-clay border border-white/50">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">{title}</h1>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              Interceptiv ortodonti syftar till att identifiera och åtgärda bettavvikelser i ett tidigt skede för att förhindra framtida komplikationer eller förenkla senare behandling.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50 relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Prio {section.prio}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ICD: {section.icd}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">{section.title}</h2>
                  </div>
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">
                    📑
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Bakgrund & Indikation</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {section.background}
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> Diagnostiska Kriterier
                      </h4>
                      <ul className="space-y-3">
                        {section.diagnostics.map((d, i) => (
                          <li key={i} className="text-xs text-slate-600 font-bold leading-relaxed flex gap-2">
                            <span className="text-blue-400">•</span> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100">
                      <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Rekommenderad Åtgärd</h4>
                      <p className="text-sm font-bold text-slate-700 leading-relaxed">
                        {section.action}
                      </p>
                      {section.followUp && (
                        <p className="mt-4 text-[11px] text-emerald-700 font-black uppercase tracking-wider italic">
                          Uppföljning: {section.followUp}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Journalmall</h4>
                      <div className="bg-slate-900 rounded-3xl p-6 text-emerald-400 font-mono text-[10px] leading-relaxed relative group/journal">
                        <button 
                          onClick={() => navigator.clipboard.writeText(section.journal)}
                          className="absolute top-4 right-4 opacity-0 group-hover/journal:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest"
                        >
                          Kopiera
                        </button>
                        {section.journal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
