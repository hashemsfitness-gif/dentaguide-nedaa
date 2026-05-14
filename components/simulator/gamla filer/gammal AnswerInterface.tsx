'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnswerInterfaceProps {
  onSubmit: (data: {
    userDiagnosis: string;
    userIcd: string;
    userTlvCodes: string[];
    timeTakenSeconds: number;
  }) => void;
  isSubmitting: boolean;
  categoryId?: string;
}

export function AnswerInterface({ onSubmit, isSubmitting, categoryId }: AnswerInterfaceProps) {
  const [diagnosis, setDiagnosis] = useState('');
  const [icd, setIcd] = useState('');
  const [tlv, setTlv] = useState('');
  const [tlvList, setTlvList] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [startTime] = useState(Date.now());

  // Diagnosis autocomplete
  useEffect(() => {
    if (diagnosis.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/simulator/diagnoses?q=${diagnosis}${categoryId ? `&categoryId=${categoryId}` : ''}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    }, 300);
    return () => clearTimeout(timer);
  }, [diagnosis, categoryId]);

  const handleAddTlv = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (tlv && !tlvList.includes(tlv)) {
      setTlvList([...tlvList, tlv]);
      setTlv('');
    }
  };

  const removeTlv = (code: string) => {
    setTlvList(tlvList.filter(c => c !== code));
  };

  const handleConfirm = () => {
    if (!diagnosis || !icd) return;
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    onSubmit({
      userDiagnosis: diagnosis,
      userIcd: icd,
      userTlvCodes: tlvList,
      timeTakenSeconds: timeTaken,
    });
  };

  const isValid = diagnosis.length > 2 && icd.length >= 3;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 z-40 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto glass-panel p-8 shadow-2xl pointer-events-auto border-t-4 border-secondary animate-in slide-in-from-bottom-full duration-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Diagnosis */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Diagnos</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Trolig diagnos..."
              className="w-full bg-black/5 border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden z-50">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setDiagnosis(s); setSuggestions([]); }}
                    className="w-full text-left p-3 text-xs font-medium hover:bg-black/5 transition-colors border-b border-black/5 last:border-none"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ICD-10 */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">ICD-10 Kod</label>
            <input
              type="text"
              value={icd}
              onChange={(e) => setIcd(e.target.value.toUpperCase())}
              placeholder="Ex: K05.2"
              className="w-full bg-black/5 border-none rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-secondary/20 transition-all uppercase"
            />
          </div>

          {/* TLV / Åtgärd */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Åtgärdskoder (TLV)</label>
            <form onSubmit={handleAddTlv} className="flex gap-2">
              <input
                type="text"
                value={tlv}
                onChange={(e) => setTlv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                placeholder="Ex: 401"
                className="w-full bg-black/5 border-none rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-secondary/20 transition-all"
              />
              <button 
                type="submit"
                className="bg-black/5 hover:bg-black/10 p-4 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </form>
            {tlvList.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tlvList.map((code) => (
                  <span key={code} className="badge bg-black/5 text-[10px] py-1 pl-3 pr-1 flex items-center gap-1 group">
                    {code}
                    <button onClick={() => removeTlv(code)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="flex justify-end mt-8 border-t border-black/5 pt-6">
          <button
            onClick={handleConfirm}
            disabled={!isValid || isSubmitting}
            className={cn(
              "btn-primary px-12 py-4 flex items-center gap-3 text-sm font-bold tracking-widest uppercase",
              (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed grayscale"
            )}
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            )}
            Bekräfta & Se facit
          </button>
        </div>
      </div>
    </div>
  );
}
