"use client";

import React from 'react';
import { RedFlag, BillingCode } from '@/lib/data/ortodonti-scenarios';

interface Props {
  redFlags: RedFlag[];
  billingCodes: BillingCode[];
}

export default function OrtRightPanel({ redFlags, billingCodes }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Red Flags Section - ALWAYS VISIBLE */}
      <div className="bg-white rounded-[32px] p-8 shadow-clay border border-white/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
            🚨
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Röda Flaggor</h3>
        </div>
        <div className="space-y-6">
          {redFlags.map((flag) => (
            <div key={flag.id} className="flex gap-4 p-4 rounded-2xl bg-red-50/50 border border-red-100">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                flag.severity === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <div>
                <h5 className="text-[11px] font-black text-red-800 uppercase tracking-wide mb-1">{flag.title}</h5>
                <p className="text-[10px] text-red-600 leading-relaxed font-medium">
                  {flag.description}
                </p>
              </div>
            </div>
          ))}
          {redFlags.length === 0 && (
            <p className="text-[11px] text-slate-400 italic text-center py-4">Inga specifika varningsflaggor.</p>
          )}
        </div>
      </div>

      {/* Billing Codes Section */}
      <div className="bg-white rounded-[32px] p-8 shadow-clay border border-white/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
            💳
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Debiteringsstöd</h3>
        </div>
        <div className="space-y-3">
          {billingCodes.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
              <span className="text-[11px] font-black text-emerald-700 whitespace-nowrap">{item.code}</span>
              <span className="text-[10px] text-slate-600 font-medium leading-tight text-right">{item.description}</span>
            </div>
          ))}
          {billingCodes.length === 0 && (
            <p className="text-[11px] text-slate-400 italic text-center py-4">Inga specifika koder angivna.</p>
          )}
        </div>
      </div>

      {/* Priority Scale Reference */}
      <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
            ⭐
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prioritet (NR)</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Hög Prioritet</span>
            <span className="font-black text-emerald-400">Prio 1–3</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Medel Prioritet</span>
            <span className="font-black text-amber-400">Prio 4–6</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Låg Prioritet</span>
            <span className="font-black text-red-400">Prio 7–9</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400">Icke-göra</span>
            <span className="font-black text-red-600">Prio 10</span>
          </div>
        </div>
        <p className="mt-6 text-[9px] text-slate-500 leading-relaxed italic border-t border-white/10 pt-4">
          Socialstyrelsens Nationella Riktlinjer för tandvård 2022.
        </p>
      </div>
    </div>
  );
}
