"use client";

import React, { useState } from 'react';

export default function AbuseScreening() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    mechanism: false,
    delay: false,
    behavior: false,
    history: false
  });

  const allChecked = Object.values(checked).every(v => v);

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-clay">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-lg">
          🛡️
        </div>
        <h3 className="text-lg font-bold text-slate-800">Säkerhets-check</h3>
      </div>

      <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 mb-4">
        <p className="text-[11px] text-amber-800 leading-tight">
          <strong>Mandat:</strong> Vid misstanke om barnmisshandel har tandvårdspersonal 
          <span className="font-bold"> anmälningsskyldighet</span> enligt SoL 14 kap 1§.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'mechanism', label: 'Stämmer skadans mekanism med berättelsen?' },
          { id: 'delay', label: 'Har vård sökts utan oskäligt dröjsmål?' },
          { id: 'behavior', label: 'Verkar barnets beteende adekvat?' },
          { id: 'history', label: 'Inga tidigare oförklarade skador?' }
        ].map((item) => (
          <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={checked[item.id]}
              onChange={() => setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
            />
            <span className="text-[11px] text-slate-600 group-hover:text-slate-800 transition-colors">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {Object.values(checked).some(v => !v) && (
        <div className="mt-4 p-2 bg-red-100 border border-red-200 rounded-lg animate-pulse">
          <p className="text-[10px] text-red-700 font-bold text-center">
             TVEKSAMHET? Kontakta socialjour för konsultation.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-2">
        <button className="w-full py-2 bg-slate-800 text-white rounded-xl text-[11px] font-bold shadow-lg hover:bg-slate-900 transition-colors">
          RIKTLINJER VID ORO
        </button>
        <button className="w-full py-2 bg-white/50 text-slate-600 rounded-xl text-[11px] font-bold border border-slate-200 hover:bg-white transition-colors">
          LÄS MER (PSL 2010:659)
        </button>
      </div>
    </div>
  );
}
