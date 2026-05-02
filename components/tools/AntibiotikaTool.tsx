"use client";

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Info, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuestionStep = 'q1' | 'q2' | 'q3' | 'result';
type Indication = 'profylax' | 'behandling' | null;
type YesNo = 'ja' | 'nej' | null;

export function AntibiotikaTool() {
  const [step, setStep] = useState<QuestionStep>('q1');
  const [indication, setIndication] = useState<Indication>(null);
  const [allergy, setAllergy] = useState<YesNo>(null);
  const [severe, setSevere] = useState<YesNo>(null);

  const reset = () => {
    setStep('q1');
    setIndication(null);
    setAllergy(null);
    setSevere(null);
  };

  const getResult = () => {
    if (indication === 'profylax') {
      if (allergy === 'ja') {
        return {
          preparat: 'Klindamycin',
          dos: '600 mg',
          duration: 'Engångsdos',
          tid: '60 minuter före ingrepp',
          info: 'Profylax för riskpatient med verifierad penicillinallergi.',
          interaktioner: [
            { lm: 'Erytromycin', klass: 'D', text: 'Antagonism — kombinera ej.' },
            { lm: 'Muskelavslappnande', klass: 'C', text: 'Förstärkt effekt.' }
          ]
        };
      } else {
        return {
          preparat: 'Amoxicillin',
          dos: '2 g',
          duration: 'Engångsdos',
          tid: '60 minuter före ingrepp',
          info: 'Standardprofylax för riskpatient.',
          interaktioner: [
            { lm: 'Allopurinol', klass: 'C', text: 'Ökad risk för exantem.' },
            { lm: 'Waran', klass: 'C', text: 'Möjlig INR-stegring.' }
          ]
        };
      }
    } else { // Behandling
      if (allergy === 'ja') {
        const isSevere = severe === 'ja';
        return {
          preparat: 'Klindamycin',
          dos: isSevere ? '300 mg × 3' : '150 mg × 3',
          duration: '5–7 dagar',
          tid: 'Ta tabletten med ett halvt glas vatten i upprätt läge',
          info: `Behandling vid penicillinallergi. ${isSevere ? 'Högre dos vid svår infektion.' : ''} Observera C. difficile-risk.`,
          interaktioner: [
            { lm: 'Erytromycin', klass: 'D', text: 'Antagonism — kombinera ej.' }
          ]
        };
      } else {
        if (severe === 'ja') {
          return {
            preparat: 'PcV (Fenoximetylpenicillin) + ev. Metronidazol',
            dos: 'PcV 1,6 g × 3 (+ Metro 400 mg × 3)',
            duration: '5–7 dagar',
            tid: 'PcV tas på fastande mage',
            info: 'Svår infektion. Lägg till Metronidazol vid terapisvikt eller allvarlig infektion med anaerob misstanke. Överväg remiss!',
            interaktioner: [
              { lm: 'Alkohol (Metronidazol)', klass: 'D', text: 'Antabuseffekt. Strikt alkoholstopp.' },
              { lm: 'Waran (Metronidazol)', klass: 'D', text: 'Kraftig INR-stegring. Undvik.' }
            ]
          };
        } else {
          return {
            preparat: 'PcV (Fenoximetylpenicillin)',
            dos: '1,6 g × 3',
            duration: '5–7 dagar',
            tid: 'Tas helst på tom mage (1h före eller 2h efter mat)',
            info: 'Förstahandsval vid odontogen infektion.',
            interaktioner: [
              { lm: 'Metotrexat', klass: 'C', text: 'Ökad metotrexatnivå.' },
              { lm: 'Waran', klass: 'C', text: 'Möjlig INR-stegring, kontrollera.' }
            ]
          };
        }
      }
    }
  };

  const progress = step === 'q1' ? 33 : step === 'q2' ? 66 : step === 'q3' ? 100 : 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-[#0E3B52] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" /> Strama Beslutsstöd
          </h2>
          {step !== 'q1' && (
            <button onClick={reset} className="text-slate-300 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
              <RotateCcw className="w-4 h-4" /> Börja om
            </button>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-8">
        {step === 'q1' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-bold text-[#0E3B52] mb-2">Vad är indikationen?</h3>
            <p className="text-slate-600 mb-8">Välj om det gäller förebyggande syfte eller behandling av pågående infektion.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <button 
                onClick={() => { setIndication('profylax'); setStep('q2'); }}
                className="flex flex-col items-start p-6 rounded-xl border-2 border-slate-200 hover:border-[#0E3B52] hover:bg-slate-50 transition-all text-left"
              >
                <span className="text-xl font-bold text-[#0E3B52] mb-2">Profylax</span>
                <span className="text-sm text-slate-500">Engångsdos för riskpatienter inför invasiva ingrepp.</span>
              </button>
              <button 
                onClick={() => { setIndication('behandling'); setStep('q2'); }}
                className="flex flex-col items-start p-6 rounded-xl border-2 border-slate-200 hover:border-[#0E3B52] hover:bg-slate-50 transition-all text-left"
              >
                <span className="text-xl font-bold text-[#0E3B52] mb-2">Behandling</span>
                <span className="text-sm text-slate-500">Pågående infektion med allmänpåverkan eller spridningsrisk.</span>
              </button>
            </div>
          </div>
        )}

        {step === 'q2' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep('q1')} className="text-sm text-slate-500 mb-4 hover:text-[#0E3B52] flex items-center gap-1">
              &larr; Tillbaka
            </button>
            <h3 className="text-2xl font-bold text-[#0E3B52] mb-2">Har patienten en äkta penicillinallergi?</h3>
            <div className="bg-orange-50 border-l-4 border-[#E07B39] p-4 mb-8 rounded-r-lg">
              <p className="text-sm text-orange-900 font-medium">
                <AlertCircle className="w-4 h-4 inline mr-1 -mt-0.5" />
                Äkta typ-1 allergi innebär urtikaria (nässelutslag), anafylaxi, angioödem eller andningssvårigheter i samband med pc-intag. Magbesvär är INTE en allergi.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <button 
                onClick={() => { 
                  setAllergy('ja'); 
                  if (indication === 'profylax') setStep('result');
                  else setStep('q3'); 
                }}
                className="flex items-center justify-between p-5 rounded-xl border-2 border-slate-200 hover:border-[#E07B39] hover:bg-orange-50 transition-all text-left"
              >
                <span className="text-lg font-bold text-slate-800">Ja, verifierad allergi</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button 
                onClick={() => { 
                  setAllergy('nej'); 
                  if (indication === 'profylax') setStep('result');
                  else setStep('q3'); 
                }}
                className="flex items-center justify-between p-5 rounded-xl border-2 border-slate-200 hover:border-[#2D6A4F] hover:bg-emerald-50 transition-all text-left"
              >
                <span className="text-lg font-bold text-slate-800">Nej, tål penicillin</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {step === 'q3' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setStep('q2')} className="text-sm text-slate-500 mb-4 hover:text-[#0E3B52] flex items-center gap-1">
              &larr; Tillbaka
            </button>
            <h3 className="text-2xl font-bold text-[#0E3B52] mb-2">Är infektionen svår?</h3>
            <p className="text-slate-600 mb-8">Föreligger kraftig allmänpåverkan, feber >38°C, eller risk för spridning (ex. svullnad mot munbotten/svalg, trismus)?</p>
            <div className="grid gap-4 md:grid-cols-2">
              <button 
                onClick={() => { setSevere('ja'); setStep('result'); }}
                className="flex items-center justify-between p-5 rounded-xl border-2 border-slate-200 hover:border-[#C1121F] hover:bg-red-50 transition-all text-left"
              >
                <span className="text-lg font-bold text-slate-800">Ja, svår infektion</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button 
                onClick={() => { setSevere('nej'); setStep('result'); }}
                className="flex items-center justify-between p-5 rounded-xl border-2 border-slate-200 hover:border-[#2D6A4F] hover:bg-emerald-50 transition-all text-left"
              >
                <span className="text-lg font-bold text-slate-800">Nej, okomplicerad</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {step === 'result' && (() => {
          const res = getResult();
          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CheckCircle2 className="w-24 h-24 text-emerald-600" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">Rekommendation</h3>
                <div className="text-3xl font-bold text-[#0E3B52] mb-2">{res?.preparat}</div>
                <div className="flex flex-wrap gap-4 text-emerald-900 font-medium">
                  <div className="bg-white px-3 py-1.5 rounded-md border border-emerald-100 shadow-sm">
                    <span className="text-slate-500 text-xs block mb-0.5 uppercase tracking-wider">Dosering</span>
                    {res?.dos}
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-md border border-emerald-100 shadow-sm">
                    <span className="text-slate-500 text-xs block mb-0.5 uppercase tracking-wider">Duration</span>
                    {res?.duration}
                  </div>
                </div>
                <p className="mt-4 text-emerald-800 text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  {res?.info} <br />{res?.tid}
                </p>
              </div>

              {res?.interaktioner && res.interaktioner.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#C1121F]" /> Viktiga interaktioner (Klass C/D)
                  </h4>
                  <div className="space-y-2">
                    {res.interaktioner.map((ia, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded",
                          ia.klass === 'D' ? "bg-[#C1121F] text-white" : "bg-[#E07B39] text-white"
                        )}>
                          Klass {ia.klass}
                        </span>
                        <div>
                          <span className="font-semibold text-slate-800">{ia.lm}</span>
                          <span className="text-slate-600 text-sm ml-2">— {ia.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={reset}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Starta ny bedömning
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
