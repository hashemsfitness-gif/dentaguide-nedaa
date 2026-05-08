"use client";

import React, { useState, useMemo } from 'react';
import { pedodontiScenarios, PedCategory, PedScenario } from '@/lib/data/pedodonti-scenarios';
import ScenarioContent from '@/components/pedodonti/ScenarioContent';
import PediatricDosering from '@/components/pedodonti/PediatricDosering';
import TraumaTimer from '@/components/pedodonti/TraumaTimer';
import AbuseScreening from '@/components/pedodonti/AbuseScreening';

export default function PedodontiPage() {
  const [selectedCategory, setSelectedCategory] = useState<PedCategory>("Trauma - Primära");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>("sc41");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: PedCategory[] = [
    "Trauma - Primära",
    "Trauma - Permanenta",
    "Akut - Smärta & Infektion",
    "Munslemhinna & System",
    "Beteende & Sedering",
    "Akut Ortodonti"
  ];

  const filteredScenarios = useMemo(() => {
    return Object.entries(pedodontiScenarios).filter(([key, s]) => {
      const matchesCategory = s.category === selectedCategory;
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.patientQuote.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentScenario = pedodontiScenarios[selectedScenarioKey] || pedodontiScenarios["sc41"];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-nunito p-8" data-theme="stitch-pediatric">
      {/* Top Navigation Bar (Like Image) */}
      <div className="max-w-[1800px] mx-auto flex justify-between items-center mb-12 px-4">
        <div className="flex items-center gap-2">
           <h1 className="text-3xl font-display italic text-slate-800">Pedodonti Workspace</h1>
        </div>
        <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
           <span className="text-slate-800 border-b-2 border-red-500 pb-1 cursor-pointer">Diagnostic</span>
           <span className="hover:text-slate-600 cursor-pointer">Research</span>
           <span className="hover:text-slate-600 cursor-pointer">Archives</span>
        </div>
        <div className="flex items-center gap-6 text-slate-400">
           <span className="cursor-pointer">🔍</span>
           <span className="cursor-pointer">🔔</span>
           <span className="cursor-pointer">⚙️</span>
           <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://placehold.co/100x100/slate/white?text=DR" alt="User" />
           </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-10">
        
        {/* COLUMN 1: Clinical Scenarios List (2.5/12) */}
        <div className="col-span-3 space-y-10">
          <div>
            <h2 className="text-xl font-display italic text-slate-800 mb-2">Clinical Scenarios</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Pediatric Trauma Host</p>
            
            {/* Category Selector (Pills) */}
            <div className="flex flex-col gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                      ? 'text-red-500 bg-red-50/50' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredScenarios.map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenarioKey(key)}
                  className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                    selectedScenarioKey === key 
                      ? 'bg-[#0E2C4B] text-white shadow-xl scale-[1.02]' 
                      : 'hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedScenarioKey === key ? 'bg-white/10' : 'bg-slate-100'
                  }`}>
                    <span className="text-xs">{scenario.isAcute ? '🩹' : '🦷'}</span>
                  </div>
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-0.5 ${
                      selectedScenarioKey === key ? 'text-blue-300' : 'text-slate-400'
                    }`}>
                      {scenario.id}
                    </span>
                    <h4 className="text-xs font-bold leading-tight">{scenario.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button className="w-full py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform">
             Hem Gäst
          </button>
        </div>

        {/* COLUMN 2: Scenario Engine (6/12) */}
        <div className="col-span-6">
           <ScenarioContent scenario={currentScenario} />
        </div>

        {/* COLUMN 3: Clinical Tools (3.5/12) */}
        <div className="col-span-3 space-y-8">
          <PediatricDosering />
          
          <div className="bg-white rounded-[32px] p-8 shadow-clay border border-white/50">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                   ⏱️
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trauma Timer</h3>
             </div>
             <TraumaTimer />
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-clay border border-white/50">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                   🚨
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Röda Flaggor</h3>
             </div>
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                   <p className="text-[11px] text-slate-600 leading-relaxed">
                      Medvetslöshet/kräkning — misstänk hjärnskakning.
                   </p>
                </div>
                <div className="flex gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                   <p className="text-[11px] text-slate-600 leading-relaxed">
                      Käkbensfraktur — kontakta AKUT.
                   </p>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden shadow-clay border border-white/50 p-1">
             <AbuseScreening />
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
