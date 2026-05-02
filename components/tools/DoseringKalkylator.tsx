"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, CheckCircle2, Copy, AlertOctagon, Info } from 'lucide-react';
import { calculateDose, DrugId, PatientGroup, DoseResult } from '@/lib/dosering';
import { cn } from '@/lib/utils';
import * as Sentry from '@sentry/nextjs';

const OPIOID_CRITERIA = [
  "NSAID + Paracetamol maxdos prövats, otillräckligt",
  "Kausal tandvårdsåtgärd genomförd/ej möjlig",
  "Smärtorsak diagnosticerad och journalförd",
  "Ingen opioidöverkänslighet/beroende",
  "Ingen andningsdepression/svår astma/MAOI",
  "Ingen samtidig bensodiazepinbehandling",
  "Max 30 tabletter",
  "Dokumentation + uppföljning journalförd"
];

const DRUGS: { id: DrugId, name: string, type: 'analgetika' | 'antibiotika' | 'anestesi' | 'opioid' }[] = [
  { id: 'paracetamol', name: 'Paracetamol', type: 'analgetika' },
  { id: 'ibuprofen', name: 'Ibuprofen', type: 'analgetika' },
  { id: 'naproxen', name: 'Naproxen', type: 'analgetika' },
  { id: 'pcv', name: 'PcV (Kåvepenin)', type: 'antibiotika' },
  { id: 'klindamycin', name: 'Klindamycin', type: 'antibiotika' },
  { id: 'amoxicillin_profylax', name: 'Amoxicillin (Profylax)', type: 'antibiotika' },
  { id: 'artikain', name: 'Artikain', type: 'anestesi' },
  { id: 'morfin', name: 'Morfin', type: 'opioid' },
  { id: 'oxikodon', name: 'Oxikodon', type: 'opioid' }
];

const PATIENT_GROUPS: { id: PatientGroup, label: string }[] = [
  { id: 'adult', label: 'Vuxen (Standard)' },
  { id: 'child_big', label: 'Barn (Större)' },
  { id: 'child_small', label: 'Barn (Litet)' },
  { id: 'elderly', label: 'Äldre (>75 år)' },
  { id: 'pregnant', label: 'Gravid/Ammande' }
];

export function DoseringKalkylator() {
  const [drug, setDrug] = useState<DrugId>('paracetamol');
  const [group, setGroup] = useState<PatientGroup>('adult');
  const [weight, setWeight] = useState<number | ''>(70);
  const [age, setAge] = useState<number | ''>('');
  
  const [result, setResult] = useState<DoseResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Opioid state
  const [checklist, setChecklist] = useState<boolean[]>(new Array(8).fill(false));

  useEffect(() => {
    // Reset checklist when drug changes
    if (DRUGS.find(d => d.id === drug)?.type !== 'opioid') {
      setChecklist(new Array(8).fill(false));
    }
    calculate();
  }, [drug, group, weight, age, checklist]);

  const calculate = () => {
    try {
      setErrorMsg(null);
      setResult(null);

      const parsedWeight = typeof weight === 'number' ? weight : parseFloat(weight);
      const parsedAge = typeof age === 'number' ? age : (age ? parseFloat(age) : undefined);

      if (!parsedWeight || isNaN(parsedWeight) || parsedWeight <= 0) {
        return;
      }

      // If opioid, check checklist
      const isOpioid = DRUGS.find(d => d.id === drug)?.type === 'opioid';
      if (isOpioid) {
        if (!checklist.every(Boolean)) {
          // don't calculate until checklist is full
          return;
        }
      }

      const res = calculateDose(drug, parsedWeight, group, parsedAge, undefined);
      setResult(res);
      
    } catch (err: any) {
      Sentry.captureException(err);
      setErrorMsg(err.message || 'Ett fel uppstod vid beräkningen');
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Läkemedel: ${DRUGS.find(d => d.id === drug)?.name}
Dosering: ${result.dose} ${result.unit}
Intervall: ${result.interval}
Form: ${result.form}
Vikt: ${weight} kg, Grupp: ${PATIENT_GROUPS.find(g => g.id === group)?.label}
OBS: ${result.note}`;
    navigator.clipboard.writeText(text);
    alert('Kopierat till urklipp!');
  };

  const isOpioid = DRUGS.find(d => d.id === drug)?.type === 'opioid';
  const checklistComplete = checklist.every(Boolean);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left column: Inputs */}
        <div className="md:col-span-5 p-6 bg-slate-50 border-r border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-[#0E3B52]" />
            <h2 className="text-xl font-bold text-[#0E3B52]">Parametrar</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Patientgrupp</label>
              <select 
                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0E3B52]"
                value={group}
                onChange={(e) => setGroup(e.target.value as PatientGroup)}
              >
                {PATIENT_GROUPS.map(g => (
                  <option key={g.id} value={g.id}>{g.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vikt (kg)</label>
                <input 
                  type="number"
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0E3B52]"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                />
              </div>
              {(group === 'child_small' || group === 'child_big') && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ålder (år)</label>
                  <input 
                    type="number"
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0E3B52]"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="0"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Läkemedel</label>
              <select 
                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0E3B52]"
                value={drug}
                onChange={(e) => setDrug(e.target.value as DrugId)}
              >
                <optgroup label="Analgetika">
                  {DRUGS.filter(d => d.type === 'analgetika').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </optgroup>
                <optgroup label="Antibiotika">
                  {DRUGS.filter(d => d.type === 'antibiotika').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </optgroup>
                <optgroup label="Lokalanestesi">
                  {DRUGS.filter(d => d.type === 'anestesi').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </optgroup>
                <optgroup label="Opioider">
                  {DRUGS.filter(d => d.type === 'opioid').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {/* Right column: Results */}
        <div className="md:col-span-7 p-6">
          <div className="h-full flex flex-col">
            
            {/* Opioid Checklist */}
            {isOpioid && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                <div className={cn(
                  "p-4 rounded-xl border-2 transition-colors duration-300",
                  checklistComplete ? "border-[#2D6A4F] bg-emerald-50" : "border-[#C1121F] bg-red-50"
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    {checklistComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
                    ) : (
                      <AlertOctagon className="w-5 h-5 text-[#C1121F]" />
                    )}
                    <h3 className={cn("font-bold", checklistComplete ? "text-[#2D6A4F]" : "text-[#C1121F]")}>
                      Säkerhetschecklista Opioider (HSLF-FS 2016:34)
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">
                    Alla kriterier måste vara uppfyllda innan doseringsförslag visas. Oxikodon kräver dessutom specialistkompetens inom oral kirurgi.
                  </p>
                  <div className="space-y-2">
                    {OPIOID_CRITERIA.map((crit, idx) => (
                      <label key={idx} className="flex items-start gap-2 cursor-pointer hover:bg-white/50 p-1.5 rounded">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 text-[#0E3B52] rounded focus:ring-[#0E3B52]"
                          checked={checklist[idx]}
                          onChange={(e) => {
                            const newCheck = [...checklist];
                            newCheck[idx] = e.target.checked;
                            setChecklist(newCheck);
                          }}
                        />
                        <span className="text-sm font-medium text-slate-800">{crit}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-[#C1121F]/10 border-l-4 border-[#C1121F] p-4 rounded-r-lg mb-4 animate-in fade-in zoom-in">
                <div className="flex gap-3 items-start">
                  <AlertOctagon className="w-6 h-6 text-[#C1121F] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#C1121F]">Klinisk Kontraindikation</h4>
                    <p className="text-[#C1121F] font-medium">{errorMsg}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Result Display */}
            {result && !errorMsg ? (
              <div className="bg-white border-2 border-[#0E3B52]/10 rounded-xl p-6 flex-1 shadow-sm relative overflow-hidden animate-in fade-in">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Calculator className="w-32 h-32 text-[#0E3B52]" />
                </div>
                
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Beräknad Dosering</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">DOS</span>
                    <div className="text-3xl font-black text-[#0E3B52]">
                      {result.dose} <span className="text-lg font-bold text-slate-500">{result.unit}</span>
                    </div>
                  </div>
                  {result.maxDay && (
                    <div>
                      <span className="block text-xs font-bold text-slate-400 mb-1">MAXDOS/DYGN</span>
                      <div className="text-2xl font-bold text-slate-700">
                        {result.maxDay} <span className="text-sm font-semibold text-slate-500">{result.maxDayUnit}</span>
                      </div>
                    </div>
                  )}
                  {!result.maxDay && result.maxDayUnit && (
                    <div className="col-span-2">
                       <span className="block text-xs font-bold text-slate-400 mb-1">MAXMÄNGD</span>
                       <div className="text-xl font-bold text-slate-700">{result.maxDayUnit}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-sm font-medium">
                  <div className="flex gap-3 border-t border-slate-100 pt-4">
                    <span className="w-24 text-slate-500">Intervall:</span>
                    <span className="text-slate-900">{result.interval}</span>
                  </div>
                  <div className="flex gap-3 border-t border-slate-100 pt-4">
                    <span className="w-24 text-slate-500">Form:</span>
                    <span className="text-slate-900">{result.form}</span>
                  </div>
                  <div className="flex gap-3 border-t border-slate-100 pt-4 pb-4">
                    <span className="w-24 text-slate-500">Klinisk Info:</span>
                    <span className="text-slate-900 leading-relaxed">
                      {result.maxDoseWarning && (
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-bold mb-2">
                          <AlertTriangle className="w-3 h-3" /> Maxdos uppnådd
                        </span>
                      )}
                      <br />
                      {result.note}
                    </span>
                  </div>
                </div>

                {(!isOpioid || checklistComplete) && (
                  <button 
                    onClick={handleCopy}
                    className="w-full mt-auto py-3 bg-[#0E3B52] hover:bg-[#0E3B52]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Copy className="w-4 h-4" /> Kopiera till journal
                  </button>
                )}
              </div>
            ) : (
              !errorMsg && (!isOpioid || !checklistComplete) && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <Calculator className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium">
                    {isOpioid 
                      ? "Fyll i checklistan för att se dosering" 
                      : "Fyll i vikt för att beräkna dos"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
