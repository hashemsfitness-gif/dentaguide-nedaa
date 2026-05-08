"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PedScenario } from '@/lib/data/pedodonti-scenarios';

interface Props {
  scenario: PedScenario;
}

export default function ScenarioContent({ scenario }: Props) {
  const [activeTab, setActiveTab] = useState<string>('snabb');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const TABS = [
    { id: 'snabb', label: 'Översikt', icon: '⚡' },
    { id: 'anamnes', label: 'Anamnes', icon: '❓' },
    { id: 'status', label: 'Status', icon: '🔬' },
    { id: 'behandling', label: 'Behandling', icon: '🔧' },
    { id: 'journal', label: 'Journal', icon: '📝' }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [scenario.id]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Kopierat till urklipp!");
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Top Header Card */}
      <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">
               SCENARIO ID: {scenario.id}
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
             <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
               {scenario.category}
             </span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-8 max-w-2xl">
            &ldquo;{scenario.patientQuote}&rdquo;
          </h1>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Beskrivning</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {scenario.snabbOversikt.find(o => o.label === "Definition" || o.label === "Mål")?.text || "Kliniskt protokoll för pediatrisk handläggning."}
              </p>
            </div>
            
            <div className="col-span-5">
              <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100 flex flex-col gap-2">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">ICD-10 KOD</span>
                <span className="text-2xl font-bold text-red-600">{scenario.icdCode}</span>
                <p className="text-xs text-red-500/70 font-bold">{scenario.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-4 z-40 flex justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-full p-2 shadow-clay border border-white/50 flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all flex items-center gap-2 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTIONS ────────────────────────────────────────── */}

      {/* Section: Snabböversikt */}
      <section id="snabb" className="scroll-mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-xl shadow-sm">⚡</div>
          <h2 className="text-2xl font-bold text-slate-800">Snabböversikt</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {scenario.snabbOversikt.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-8 shadow-clay border border-white/50">
              <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">{item.label}</h4>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Anamnes */}
      <section id="anamnes" className="scroll-mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl shadow-sm">❓</div>
          <h2 className="text-2xl font-bold text-slate-800">Anamnes — Frågeställning</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-[40px] p-8 shadow-clay border border-white/50">
            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Obligatoriska frågor (Kritiska)
            </h4>
            <div className="space-y-6">
              {scenario.anamnes.obligatoriska.map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 group">
                  <p className="text-sm font-black text-slate-800 mb-2 flex gap-2">
                    <span className="text-blue-500">?</span> {item.q}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-blue-200">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-clay border border-white/50">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> Kompletterande utredning
            </h4>
            <div className="space-y-4">
              {scenario.anamnes.kompletterande.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl">
                  <span className="text-blue-400">●</span>
                  <span className="text-xs font-bold text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Status */}
      <section id="status" className="scroll-mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl shadow-sm">🔬</div>
          <h2 className="text-2xl font-bold text-slate-800">Status & Kliniska Fynd</h2>
        </div>
        
        <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-6">
              <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">Inspektion / Palpation</h4>
              <div className="space-y-4">
                {scenario.status.inspektion.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-6 space-y-8">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Viktiga kliniska fynd</h4>
                <div className="space-y-3">
                  {scenario.status.kliniskaFynd?.map((fynd, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <span className="text-indigo-400">🔍</span>
                      <span className="text-xs font-bold text-slate-600 italic">{fynd}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Behandling */}
      <section id="behandling" className="scroll-mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl shadow-sm">🔧</div>
          <h2 className="text-2xl font-bold text-slate-800">{scenario.behandling.title}</h2>
        </div>

        <div className="space-y-6">
          {scenario.behandling.warning && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-[32px] flex gap-4 items-start shadow-sm">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-1">Viktig instruktion / Varning</h4>
                <p className="text-sm font-bold text-red-900 leading-relaxed">{scenario.behandling.warning}</p>
              </div>
            </div>
          )}

          {scenario.behandling.steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 items-start p-8 bg-white rounded-[40px] shadow-clay border border-white/50 group hover:scale-[1.01] transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg shadow-emerald-200">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                  {step.split(':')[0]}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {step.split(':').slice(1).join(':') || step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Journal */}
      <section id="journal" className="scroll-mt-32 space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 text-xl shadow-sm">📝</div>
          <h2 className="text-2xl font-bold text-slate-800">Klinisk Journalföring</h2>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-clay border border-white/50">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Journalmall (Klicka för att kopiera)</h4>
            <button 
              onClick={() => copyToClipboard(scenario.journal)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[11px] font-black tracking-widest uppercase shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Kopiera Mall
            </button>
          </div>
          <div className="bg-slate-50 rounded-[32px] p-10 border border-slate-100 font-mono text-[11px] text-slate-600 leading-[2.2] whitespace-pre-wrap uppercase tracking-wider relative group">
            <div className="absolute top-4 right-4 text-[10px] font-black text-slate-300 group-hover:text-slate-400 transition-colors uppercase tracking-widest">
              Standardprotokoll
            </div>
            {scenario.journal}
          </div>
        </div>
      </section>

      {/* Sources Footer */}
      <div className="pt-20 border-t border-slate-100 flex flex-col items-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Referenser & Evidens</p>
        <div className="flex flex-wrap justify-center gap-3">
          {scenario.kallor.map((kalla, idx) => (
            <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
              {kalla}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
