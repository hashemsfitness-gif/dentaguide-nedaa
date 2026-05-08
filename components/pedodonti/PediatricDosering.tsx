"use client";

import React, { useState, useEffect } from 'react';

const DOSAGE_GUIDE = {
  paracetamol: {
    name: "Paracetamol (Alvedon/Panodil)",
    mgPerKg: 15,
    maxMg: 1000,
    interval: "4-6 timmar",
    maxPerDay: "4 doser"
  },
  ibuprofen: {
    name: "Ibuprofen (Ipren/Nurofen)",
    mgPerKg: 7.5,
    maxMg: 400,
    interval: "6-8 timmar",
    maxPerDay: "3 doser",
    warning: "Ej vid blödarsjuka eller vattkoppor."
  },
  amoxicillin_endo: {
    name: "Amoxicillin (Endokarditprofylax)",
    mgPerKg: 50,
    maxMg: 2000,
    interval: "Engångsdos",
    timing: "60 min före ingrepp"
  }
};

export default function PediatricDosering() {
  const [weight, setWeight] = useState<number>(25);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const calculated = Object.entries(DOSAGE_GUIDE).map(([key, config]) => {
      const dose = Math.min(weight * config.mgPerKg, config.maxMg);
      return {
        key,
        ...config,
        calculatedDose: Math.round(dose)
      };
    });
    setResults(calculated);
  }, [weight]);

  return (
    <div className="bg-[#0E2C4B] rounded-[32px] overflow-hidden shadow-clay">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
           🧮
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Dosage Calc</h3>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Vikt (kg)</label>
          <div className="relative">
             <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-2xl font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          {results.map((res) => (
            <div key={res.key} className="p-6 bg-white/5 rounded-[24px] border border-white/10 group hover:bg-white/10 transition-all">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.name.split(' ')[0]}</span>
                <span className="text-2xl font-black text-white">{res.calculatedDose} <span className="text-sm font-bold text-slate-400">mg</span></span>
              </div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">(~{res.mgPerKg}mg/kg)</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-black/20 border-t border-white/5 text-center">
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
          Verifiera alltid i FASS — Agent 10 Doseringshjälp
        </p>
      </div>
    </div>
  );
}
