"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { lakemedelData, DrugData } from '@/lib/lakemedelData';
import { cn } from '@/lib/utils';
import * as Sentry from '@sentry/nextjs';

const CATEGORIES = [
  { id: 'alla', label: 'Alla grupper' },
  { id: 'antikoagulantia', label: 'Blodförtunnande' },
  { id: 'bisfosfonat', label: 'Bisfosfonater' },
  { id: 'cancer', label: 'Cancer' },
  { id: 'immunsuppression', label: 'Immunsuppression' },
  { id: 'hjarta', label: 'Hjärta/Kärl' },
  { id: 'psykiatri', label: 'Psykiatri' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'ovrigt', label: 'Övrigt' }
];

export function LakemedelSearch() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('alla');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    try {
      return lakemedelData.filter(d => {
        const matchCat = activeCat === 'alla' || d.cat === activeCat;
        const searchLow = query.toLowerCase();
        const matchQuery = !query || 
          d.name.toLowerCase().includes(searchLow) || 
          d.examples.toLowerCase().includes(searchLow) ||
          d.indikation.toLowerCase().includes(searchLow) ||
          d.tags.some(t => t.toLowerCase().includes(searchLow));
        
        return matchCat && matchQuery;
      });
    } catch (error) {
      Sentry.captureException(error);
      return [];
    }
  }, [query, activeCat]);

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
          <input 
            placeholder="Sök läkemedel, indikation eller substans..." 
            className="w-full pl-10 pr-4 py-3 text-lg rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0E3B52] focus:border-transparent transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              activeCat === cat.id 
                ? "bg-[#0E3B52] text-white border-[#0E3B52] shadow-sm" 
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            )}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="text-sm font-medium text-slate-500">
        Visar {filteredData.length} läkemedelsgrupper
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredData.map(drug => (
          <DrugCard 
            key={drug.id} 
            drug={drug} 
            isExpanded={expandedId === drug.id}
            onToggle={() => setExpandedId(expandedId === drug.id ? null : drug.id)}
          />
        ))}
        {filteredData.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed rounded-xl border-slate-200 bg-slate-50">
            <p className="text-lg text-slate-500 font-medium">Inga läkemedel hittades som matchar din sökning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DrugCard({ drug, isExpanded, onToggle }: { drug: DrugData, isExpanded: boolean, onToggle: () => void }) {
  const getRiskColor = (risk: string) => {
    if (risk.includes('HÖG')) return 'bg-[#C1121F] text-white border-red-700';
    if (risk.includes('MEDEL')) return 'bg-[#E07B39] text-white border-orange-600';
    return 'bg-[#2D6A4F] text-white border-emerald-700';
  };

  const getBehandlingIcon = (typ: string) => {
    switch(typ) {
      case 'ok': return <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />;
      case 'caution': return <AlertTriangle className="w-5 h-5 text-[#E07B39]" />;
      case 'avoid': return <XCircle className="w-5 h-5 text-[#C1121F]" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const getRowColor = (typ: string) => {
    switch(typ) {
      case 'red': return 'bg-red-50 border-l-4 border-[#C1121F] text-red-900';
      case 'yellow': return 'bg-orange-50 border-l-4 border-[#E07B39] text-orange-900';
      case 'green': return 'bg-emerald-50 border-l-4 border-[#2D6A4F] text-emerald-900';
      case 'blue': return 'bg-blue-50 border-l-4 border-blue-500 text-blue-900';
      default: return 'bg-slate-50 border-l-4 border-slate-300';
    }
  };

  return (
    <div className={cn(
      "rounded-xl border transition-all duration-200 bg-white",
      isExpanded ? "shadow-md ring-1 ring-slate-200 border-slate-300" : "border-slate-200 hover:border-[#0E3B52]/30 shadow-sm"
    )}>
      <div 
        className="p-5 cursor-pointer flex items-start justify-between hover:bg-slate-50/50 rounded-xl"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold text-[#0E3B52]">{drug.name}</h3>
            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md border", getRiskColor(drug.risk))}>
              Risk: {drug.risk}
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-3 font-medium">{drug.examples}</p>
          <div className="flex flex-wrap gap-2">
            {drug.summary.map((s, i) => (
              <span key={i} className={cn(
                "text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 border",
                s.includes('❌') ? "bg-red-50 text-red-700 border-red-200" : 
                s.includes('⚠️') ? "bg-orange-50 text-orange-700 border-orange-200" : 
                "bg-emerald-50 text-emerald-700 border-emerald-200"
              )}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vänster kolumn */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E3B52]"></span> Behandling & Åtgärder
                </h4>
                <div className="space-y-3">
                  {drug.behandlingar.map((b, i) => (
                    <div key={i} className="flex gap-3 items-start bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                      <div className="mt-0.5">{getBehandlingIcon(b.typ)}</div>
                      <div>
                        <strong className="block text-sm text-slate-900 mb-1">{b.label}</strong>
                        <p className="text-sm text-slate-600 leading-relaxed">{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {drug.interaktioner.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span> Kliniska Interaktioner
                  </h4>
                  <div className="space-y-2">
                    {drug.interaktioner.map((ia, i) => (
                      <div key={i} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded",
                            ia.klass === 'D' ? "bg-[#C1121F] text-white" : "bg-[#E07B39] text-white"
                          )}>
                            Klass {ia.klass}
                          </span>
                          <strong className="text-sm text-slate-900">{ia.lm}</strong>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{ia.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Höger kolumn */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E07B39]"></span> Viktigt att veta
                </h4>
                <div className="space-y-2">
                  {drug.viktigt.map((v, i) => (
                    <div key={i} className={cn("p-3.5 rounded-r-lg text-sm font-medium shadow-sm", getRowColor(v.typ))}>
                      {v.text}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Indikation</h4>
                <p className="text-sm text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">{drug.indikation}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Källa</h4>
                <p className="text-xs text-slate-500 font-mono bg-slate-200/50 p-2.5 rounded-lg border border-slate-200">{drug.kalla}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
