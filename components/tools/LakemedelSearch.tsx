"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle2, XCircle, Activity, BookOpen } from 'lucide-react';
import { lakemedelData, DrugData } from '@/lib/lakemedelData';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showOnboard, setShowOnboard] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('dg_onboard_lakemedel') !== 'done') {
      setShowOnboard(true);
    }
  }, []);

  const dismissOnboard = () => {
    setShowOnboard(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dg_onboard_lakemedel', 'done');
    }
  };

  const filteredData = useMemo(() => {
    try {
      const searchLow = query.trim().toLowerCase();
      return lakemedelData.filter(d => {
        const matchCat = activeCat === 'alla' || d.cat === activeCat;
        if (!searchLow) return matchCat;

        // Perform clean normalized search with defensive sanitization
        const matchQuery = 
          (d.name && d.name.toLowerCase().includes(searchLow)) || 
          (d.examples && d.examples.toLowerCase().includes(searchLow)) ||
          (d.indikation && d.indikation.toLowerCase().includes(searchLow)) ||
          (d.tags && Array.isArray(d.tags) && d.tags.some(t => t && t.toLowerCase().includes(searchLow)));
        
        return matchCat && matchQuery;
      });
    } catch (error) {
      Sentry.captureException(error);
      return [];
    }
  }, [query, activeCat]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="space-y-6"
    >
      <AnimatePresence>
        {showOnboard && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-7 rounded-ds-2xl bg-secondary/[0.04] border border-secondary/20 flex gap-5 items-start relative overflow-hidden shadow-none"
          >
            <div className="p-3 bg-secondary/10 rounded-ds-xl text-secondary shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="flex-1 pr-6">
              <h4 className="text-base font-bold text-ink mb-2">Välkommen till Läkemedelsguiden</h4>
              <p className="text-sm text-ink/70 leading-relaxed font-medium max-w-[72ch]">
                Sök efter substans, preparat eller indikation för att se kliniska riktlinjer vid tandvård. Filtrera efter kategori för snabbare överblick. Kom ihåg att alltid verifiera patientens fullständiga hälsostatus innan ingrepp påbörjas.
              </p>
              <button 
                onClick={dismissOnboard} 
                className="mt-4 text-xs font-black uppercase tracking-wider text-secondary bg-secondary/10 hover:bg-secondary/15 transition-all px-4 py-2.5 rounded-ds-xl"
              >
                Kom igång
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Filter Container */}
      <div className="bg-surface/50 backdrop-blur-sm border border-border-light rounded-ds-2xl p-6 md:p-7 shadow-ds-sm space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5" style={{ color: '#0d4a65' }} />
          </div>
          <input 
            type="text"
            placeholder="Sök läkemedel, indikation eller substans..." 
            className="w-full pl-11 pr-4 py-3.5 text-base rounded-ds-xl border border-[#0d4a65]/30 focus:border-[#0d4a65] focus:ring-2 focus:ring-[#0d4a65]/10 bg-surface text-ink font-semibold placeholder-ink/30 outline-none transition-all shadow-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-ink/40 hover:text-[#0d4a65] transition-colors"
            >
              Rensa
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1.5">
          {CATEGORIES.map(cat => {
            const isSelected = activeCat === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm transition-all border focus:outline-none focus:ring-2 focus:ring-[#0d4a65]/20 flex items-center gap-1.5",
                  isSelected 
                    ? "bg-[#0d4a65] text-white border-[#0d4a65] shadow-md shadow-[#0d4a65]/20 font-bold" 
                    : "bg-surface text-ink/70 border-border-light hover:bg-neutral/40 hover:border-border-medium hover:text-ink font-semibold"
                )}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.label}
                {isSelected && <span className="font-sans leading-none">&rarr;</span>}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-ink/50 uppercase tracking-widest2">
        <span>Kliniska riktlinjer</span>
        <span className="bg-neutral/70 px-3 py-1.5 rounded-ds-lg font-extrabold">
          {filteredData.length} {filteredData.length === 1 ? 'grupp' : 'grupper'} hittade
        </span>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredData.map(drug => (
            <DrugCard 
              key={drug.id} 
              drug={drug} 
              isExpanded={expandedId === drug.id}
              onToggle={() => setExpandedId(expandedId === drug.id ? null : drug.id)}
            />
          ))}
        </AnimatePresence>

        {filteredData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-6 border-2 border-dashed rounded-ds-2xl border-border-light bg-surface/50"
          >
            <div className="p-4 bg-secondary/5 rounded-full w-fit mx-auto mb-4 border border-secondary/10">
              <AlertTriangle className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-base font-bold text-ink mb-1">Inga läkemedel hittades</h3>
            <p className="text-xs text-ink/40 max-w-sm mx-auto font-medium">
              Försök söka efter en annan substans, handelsnamn eller indikation (t.ex. &quot;INR&quot; eller &quot;Eliquis&quot;).
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function DrugCard({ drug, isExpanded, onToggle }: { drug: DrugData, isExpanded: boolean, onToggle: () => void }) {
  
  const getRiskStyles = (risk: string) => {
    if (risk.includes('HÖG')) {
      return 'bg-red-500/10 text-red-600 border border-red-500/20';
    }
    if (risk.includes('MEDEL')) {
      return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
    }
    return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
  };

  const getBehandlingIcon = (typ: string) => {
    switch(typ) {
      case 'ok': return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'caution': return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'avoid': return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
      default: return <Info className="w-5 h-5 text-ink/40 shrink-0" />;
    }
  };

  const getRowColor = (typ: string) => {
    switch(typ) {
      case 'red': return 'bg-red-500/[0.04] border border-red-500/10 text-red-950 font-semibold';
      case 'yellow': return 'bg-amber-500/[0.04] border border-amber-500/10 text-amber-950 font-semibold';
      case 'green': return 'bg-emerald-500/[0.04] border border-emerald-500/10 text-emerald-950 font-semibold';
      case 'blue': return 'bg-blue-500/[0.04] border border-blue-500/10 text-blue-950 font-semibold';
      default: return 'bg-neutral/40 border border-border-light text-ink/80';
    }
  };

  return (
    <motion.div 
      layout="position"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 12px 30px -10px rgba(13, 74, 101, 0.15)",
        borderColor: "rgba(13, 74, 101, 0.3)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={cn(
        "rounded-ds-2xl border bg-surface relative overflow-hidden transition-colors duration-300",
        isExpanded 
          ? "border-[#0d4a65]/40 shadow-ds-md" 
          : "border-border-light shadow-ds-sm"
      )}
    >
      {/* Interactive header block */}
      <div 
        className="p-6 md:p-7 cursor-pointer flex items-start justify-between hover:bg-neutral/20 transition-all"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3.5 mb-3 flex-wrap">
            <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-primary leading-none">{drug.name}</h3>
            <span className={cn("text-[11px] font-mono px-3 py-1 rounded-ds-md leading-relaxed tracking-wider font-extrabold border shadow-none", getRiskStyles(drug.risk))}>
              RISK: {drug.risk}
            </span>
          </div>
          <p className="text-sm font-sans tracking-wide text-ink/80 leading-relaxed mb-3.5"><span className="font-mono text-xs uppercase font-extrabold text-ink/40 mr-2">Handelsnamn:</span>{drug.examples}</p>
          
          {/* Action highlights - Stacked Premium Guidelines */}
          <div className="flex flex-col gap-2 mt-4 max-w-[540px]">
            {drug.summary.map((s, i) => (
              <span key={i} className={cn(
                "text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1.5 bg-secondary/[0.06] text-secondary border border-secondary/20 rounded-ds-pill flex items-center text-left shadow-none"
              )}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <motion.div 
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-2 rounded-full hover:bg-neutral/50 text-ink/40 transition-colors shrink-0 mt-0.5"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Expanded panel with Framer Motion height transition */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-5 md:px-8 md:pb-8 md:pt-6 border-t border-border-light/70 bg-neutral/10 rounded-b-ds-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Vänster kolumn */}
                <div className="space-y-7">
                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-secondary mb-3.5 flex items-center gap-1.5">
                      <Activity size={12} /> Behandling &amp; Åtgärder
                    </h4>
                    <div className="space-y-3.5">
                      {drug.behandlingar.map((b, i) => (
                        <div key={i} className="flex gap-3.5 items-start bg-surface p-5 rounded-ds-xl border border-border-light/70 shadow-none hover:shadow-ds-sm hover:border-secondary/25 hover:-translate-y-0.5 transition-all duration-300">
                          <div className="mt-0.5 shrink-0">{getBehandlingIcon(b.typ)}</div>
                          <div>
                            <strong className="block text-sm font-bold text-ink mb-1">{b.label}</strong>
                            <p className="text-sm text-ink leading-relaxed font-medium max-w-[65ch]">{b.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {drug.interaktioner.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-red-500 mb-3.5 flex items-center gap-1.5">
                        <AlertTriangle size={12} /> Kliniska Interaktioner
                      </h4>
                      <div className="space-y-3">
                        {drug.interaktioner.map((ia, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "bg-surface p-5 rounded-ds-xl border shadow-none",
                              ia.klass === 'D' ? "border-red-500/20 bg-red-500/[0.01]" : "border-amber-500/20 bg-amber-500/[0.01]"
                            )}
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className={cn(
                                "text-[10px] font-mono font-black px-2 py-0.5 rounded-ds-md",
                                ia.klass === 'D' ? "bg-red-500 text-surface" : "bg-amber-500 text-surface"
                              )}>
                                KLASS {ia.klass}
                              </span>
                              <strong className="text-sm font-bold text-ink">{ia.lm}</strong>
                            </div>
                            <p className="text-sm text-ink leading-relaxed font-medium max-w-[65ch]">{ia.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Höger kolumn */}
                <div className="space-y-7">
                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-amber-600 mb-3.5 flex items-center gap-1.5">
                      <Info size={12} /> Viktigt att veta
                    </h4>
                    <div className="space-y-2.5">
                      {drug.viktigt.map((v, i) => (
                        <div key={i} className={cn("px-5 py-4 rounded-ds-xl text-sm leading-relaxed shadow-none border max-w-[65ch]", getRowColor(v.typ))}>
                          {v.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-ink/70 mb-2 flex items-center gap-1.5">
                      <BookOpen size={12} /> Indikation
                    </h4>
                    <p className="text-sm text-ink bg-surface p-5 rounded-ds-xl border border-border-light/70 shadow-none leading-relaxed font-medium max-w-[65ch]">
                      {drug.indikation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-[0.18em] text-ink/65 mb-2">Källa</h4>
                    <div className="text-xs text-ink/80 font-mono leading-relaxed bg-surface p-5 rounded-ds-xl border border-border-light/70 shadow-none break-words">
                      <span className="text-[10px] uppercase font-bold text-ink/40 block mb-1">Referens &amp; Källa:</span>
                      {drug.kalla}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
