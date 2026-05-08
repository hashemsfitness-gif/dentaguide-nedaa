"use client";

import React, { useState } from 'react';
import { PedScenario } from '@/lib/data/pedodonti-scenarios';

interface Props {
  scenario: PedScenario;
}

export default function ScenarioContent({ scenario }: Props) {
  const [activeTab, setActiveTab] = useState<'snabb' | 'klinik' | 'behandling' | 'journal'>('snabb');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Kopierat till urklipp!");
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Header Card */}
      <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">
               SCENARIO ID: {scenario.id}
             </span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-8 max-w-2xl">
            &ldquo;{scenario.patientQuote}&rdquo;
          </h1>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Definition</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {scenario.snabbOversikt.find(o => o.label === "Definition")?.text || "Ett kliniskt tillstånd som kräver akut bedömning och handläggning enligt fastställda pediatriska protokoll."}
              </p>
            </div>
            
            <div className="col-span-5">
              <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100 flex flex-col gap-2">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">ICD-10 KOD</span>
                <span className="text-2xl font-bold text-red-600">{scenario.icdCode}</span>
                <p className="text-xs text-red-500/70 font-bold">{scenario.title}</p>
              </div>
              <div className="mt-4 px-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Prevalens</span>
                <p className="text-xs text-slate-500 font-bold italic">Ovanligt — uppstår vid kraftigare trauma</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Floating Pill Style) */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-full p-1.5 shadow-clay border border-white/50 flex gap-1">
          {[
            { id: 'snabb', label: 'Snabböversikt' },
            { id: 'klinik', label: 'Anamnes' },
            { id: 'behandling', label: 'Status' },
            { id: 'behandling_prot', label: 'Behandling' },
            { id: 'journal', label: 'Journal' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id.startsWith('behandling') ? 'behandling' : tab.id as any)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all ${
                activeTab === (tab.id.startsWith('behandling') ? 'behandling' : tab.id)
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section: Anamnes */}
      {activeTab === 'klinik' && (
        <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Anamnes — Obligatoriska frågor</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-red-50/30 rounded-[32px] p-8 border border-red-100">
              <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Primära frågor (Kritiska)
              </h4>
              <div className="space-y-6">
                {scenario.anamnes.obligatoriska.map((item, idx) => (
                  <div key={idx} className="group">
                    <p className="text-sm font-bold text-red-800 mb-2 flex gap-2">
                      <span className="text-red-500">?</span> {item.q}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pl-4 border-l border-red-200">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/30 rounded-[32px] p-8 border border-blue-100">
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Sekundära frågor
              </h4>
              <div className="space-y-4">
                {scenario.anamnes.kompletterande.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-blue-400">●</span>
                    <span className="text-sm font-bold text-blue-800">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button className="w-full py-4 bg-[#0A2621] text-white rounded-full text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform">
                  <span className="text-lg">✔️</span> Sign Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section: Clinical Status */}
      {activeTab === 'behandling' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex justify-between items-center">
              Klinisk Status
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Findings</span>
            </h2>
            
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-6">
                <div className="rounded-3xl overflow-hidden shadow-inner border border-slate-100">
                   <img src="https://placehold.co/600x400/f8fafc/64748b?text=Clinical+Visual" alt="Clinical Status" className="w-full" />
                </div>
              </div>
              <div className="col-span-6 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Extraoral</h4>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Sårskador ansikte, svullnad, hematom, ansiktsasymmetri.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Intraoral</h4>
                  <p className="text-sm font-bold text-slate-800 mb-2">Rörligt bensegment — block rör sig som enhet.</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    Blödning ur tandköttsfickor, bettstörning, krepitationer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-clay border-l-[12px] border-l-red-800/80">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex justify-between items-center">
              Behandlingsprotokoll
              <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Specialistfall</span>
            </h2>

            <div className="space-y-6">
              {scenario.behandling.steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0 group-hover:bg-red-100 group-hover:text-red-700 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-800 mb-2">{step.split('.')[0]}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.split('.').slice(1).join('.') || "Utförs enligt specialistklinikens anvisningar."}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">#Vuxenkontakt</span>
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">#Lokalanestesi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Section: Journal */}
      {activeTab === 'journal' && (
        <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Journalmall</h2>
            <button 
              onClick={() => copyToClipboard(scenario.journal)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[11px] font-black tracking-widest uppercase shadow-lg hover:scale-105 transition-all"
            >
              Copy Template
            </button>
          </div>
          <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 font-mono text-[11px] text-slate-600 leading-[2] whitespace-pre-wrap uppercase tracking-wider">
            {scenario.journal}
          </div>
        </div>
      )}
    </div>
  );
}
  );
}
