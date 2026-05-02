"use client";

import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Copy, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, Info } from "lucide-react";

type SjukdomsTyp = "gingivit" | "parodontit" | null;
type PlackAssoc = "ja" | "nej" | null;

interface ClinicalData {
  cal: number | "";
  fickdjup: number | "";
  benforlust: number | "";
  lostTeeth: number | "";
  
  // Komplexitetsfaktorer (Stadium IV)
  tuggfunktion: boolean;
  bitKollaps: boolean;
  flaring: boolean;
  mindreAn10mm: boolean;
  flerAn20TanderKvar: boolean; // >= 20 tänder kvar
}

interface RiskData {
  rokning: "0" | "lt10" | "gt10" | null;
  diabetes: "normal" | "kontrollerad" | "okontrollerad" | null;
  blProgression: "lt0.25" | "0.25-1.0" | "gt1.0" | null;
}

export default function ParodKlassificerare() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Step 1 State
  const [sjukdom, setSjukdom] = useState<SjukdomsTyp>(null);
  const [plackAssoc, setPlackAssoc] = useState<PlackAssoc>(null);
  
  // Step 2 State
  const [clinical, setClinical] = useState<ClinicalData>({
    cal: "",
    fickdjup: "",
    benforlust: "",
    lostTeeth: "",
    tuggfunktion: false,
    bitKollaps: false,
    flaring: false,
    mindreAn10mm: false,
    flerAn20TanderKvar: false,
  });

  // Step 3 State
  const [risk, setRisk] = useState<RiskData>({
    rokning: null,
    diabetes: null,
    blProgression: null,
  });

  // Live Summary Data
  const [stadium, setStadium] = useState<string>("");
  const [grad, setGrad] = useState<string>("");
  
  // Calculate Stadium
  useEffect(() => {
    try {
      if (sjukdom !== "parodontit") {
        setStadium("");
        return;
      }
      
      const cal = Number(clinical.cal) || 0;
      const fickdjup = Number(clinical.fickdjup) || 0;
      const bl = Number(clinical.benforlust) || 0;
      const lost = Number(clinical.lostTeeth) || 0;
      
      const isComplex = clinical.tuggfunktion || clinical.bitKollaps || clinical.flaring || clinical.mindreAn10mm || clinical.flerAn20TanderKvar;

      let currentStad = "I";
      
      // Basic checks based on CAL, Fickdjup, BL
      if (cal >= 5 || bl >= 33 || fickdjup >= 6 || lost >= 5) {
        currentStad = "III";
      } else if (cal >= 3 || bl >= 15 || fickdjup >= 5 || lost >= 1) {
        currentStad = "II";
      } else if (cal >= 1 || bl > 0 || fickdjup >= 1) {
        currentStad = "I";
      } else {
        currentStad = "I"; // default if empty
      }

      // Upgrade to IV based on complex factors
      if (currentStad === "III" && isComplex) {
        currentStad = "IV";
      }
      
      setStadium(currentStad);
    } catch (err) {
      Sentry.captureException(err);
    }
  }, [clinical, sjukdom]);

  // Calculate Grade
  useEffect(() => {
    try {
      if (sjukdom !== "parodontit") {
        setGrad("");
        return;
      }

      let currentGrad = "A";

      // Grade B triggers
      if (
        risk.blProgression === "0.25-1.0" || 
        risk.rokning === "lt10" || 
        risk.diabetes === "kontrollerad"
      ) {
        currentGrad = "B";
      }

      // Grade C triggers
      if (
        risk.blProgression === "gt1.0" || 
        risk.rokning === "gt10" || 
        risk.diabetes === "okontrollerad"
      ) {
        currentGrad = "C";
      }

      setGrad(currentGrad);
    } catch (err) {
      Sentry.captureException(err);
    }
  }, [risk, sjukdom]);

  const copyToClipboard = () => {
    try {
      let text = "";
      if (sjukdom === "gingivit") {
        text = `Diagnos: Gingivit\nAssocierad med plack: ${plackAssoc === "ja" ? "Ja" : "Nej"}\n`;
        text += plackAssoc === "ja" 
          ? `Behandling: OHI, tandstensborttagning. Kontroll om 3 månader.` 
          : `Behandling: Remiss oral medicin / läkarkontakt för bedömning av bakomliggande systemisk sjukdom/läkemedel/hormonell påverkan.`;
      } else if (sjukdom === "parodontit") {
        text = `Diagnos: Parodontit Stadium ${stadium}, Grad ${grad}\n`;
        text += `Kliniska mätvärden:\n`;
        text += `- CAL: ${clinical.cal} mm\n`;
        text += `- Fickdjup: ${clinical.fickdjup} mm\n`;
        text += `- Benförlust: ${clinical.benforlust} %\n`;
        text += `- Förlorade tänder (pga parodontit): ${clinical.lostTeeth}\n`;
        
        let riskfaktorer = [];
        if (risk.rokning === "lt10") riskfaktorer.push("Rökning <10 cig/dag");
        if (risk.rokning === "gt10") riskfaktorer.push("Rökning >10 cig/dag");
        if (risk.diabetes === "kontrollerad") riskfaktorer.push("Diabetes (kontrollerad)");
        if (risk.diabetes === "okontrollerad") riskfaktorer.push("Diabetes (okontrollerad, HbA1c >= 7%)");
        
        if (riskfaktorer.length > 0) {
          text += `Riskfaktorer: ${riskfaktorer.join(", ")}\n`;
        }

        const isSpecialistRemiss = stadium === "III" || stadium === "IV";
        text += `\nBehandlingsplan:\n`;
        text += `- OHI och depuration\n`;
        text += isSpecialistRemiss ? `- Indikation för remiss till parodontolog föreligger\n` : `- Kontinuerlig uppföljning inom allmäntandvården\n`;
      }
      
      navigator.clipboard.writeText(text);
      alert("Journaltext kopierad!");
    } catch (err) {
      Sentry.captureException(err);
      alert("Kunde inte kopiera texten.");
    }
  };

  const renderStepHeader = (currentStep: number, title: string, desc: string) => (
    <div className="mb-8 border-b border-white/20 pb-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="badge font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#CC5833]/10 text-[#CC5833]">
          STEG 0{currentStep}
        </span>
        <h2 className="text-2xl font-serif italic text-[#0E3B52]">{title}</h2>
      </div>
      <p className="text-[#0E3B52]/70">{desc}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Wizard Area */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Progress Bar */}
        <div className="glass-bento p-4 flex justify-between items-center bg-white/60">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  step === s 
                    ? "bg-[#CC5833] text-white border-[#CC5833] shadow-lg" 
                    : step > s 
                      ? "bg-[#0E3B52] text-white border-[#0E3B52]" 
                      : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              {s < 4 && (
                <div className={`h-1 w-12 sm:w-24 mx-2 rounded ${step > s ? "bg-[#0E3B52]" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Wizard Steps */}
        <div className="glass-bento min-h-[500px] flex flex-col justify-between">
          
          {/* STEP 1: Gingivit / Parodontit */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderStepHeader(1, "Sjukdomstyp", "Bestäm initial diagnos och plack-association.")}
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-3">
                    Föreligger fästeförlust på &gt;2 icke-angränsande tänder?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => { setSjukdom("parodontit"); setPlackAssoc(null); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all hover-lift ${sjukdom === "parodontit" ? "border-[#CC5833] bg-[#CC5833]/5 ring-2 ring-[#CC5833]/20" : "border-white/60 bg-white/40"}`}
                    >
                      <h3 className="font-bold text-[#0E3B52]">Ja — Parodontit</h3>
                      <p className="text-xs text-[#0E3B52]/70 mt-1">Fortsätt till stadium- och gradbestämning.</p>
                    </button>
                    <button
                      onClick={() => setSjukdom("gingivit")}
                      className={`p-4 rounded-xl border-2 text-left transition-all hover-lift ${sjukdom === "gingivit" ? "border-[#CC5833] bg-[#CC5833]/5 ring-2 ring-[#CC5833]/20" : "border-white/60 bg-white/40"}`}
                    >
                      <h3 className="font-bold text-[#0E3B52]">Nej — Gingivit</h3>
                      <p className="text-xs text-[#0E3B52]/70 mt-1">Ingen klinisk fästeförlust föreligger.</p>
                    </button>
                  </div>
                </div>

                {sjukdom === "gingivit" && (
                  <div className="animate-in fade-in duration-300 mt-6 p-6 rounded-2xl bg-[#0E3B52]/5 border border-[#0E3B52]/10">
                    <label className="block text-sm font-semibold text-[#0E3B52] mb-3">
                      Är gingiviten plack-associerad?
                    </label>
                    <div className="flex gap-4 mb-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="plack" checked={plackAssoc === "ja"} onChange={() => setPlackAssoc("ja")} className="w-4 h-4 text-[#CC5833] focus:ring-[#CC5833]" />
                        <span className="text-sm font-medium">Ja, plack-associerad</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="plack" checked={plackAssoc === "nej"} onChange={() => setPlackAssoc("nej")} className="w-4 h-4 text-[#CC5833] focus:ring-[#CC5833]" />
                        <span className="text-sm font-medium">Nej, icke-plack-associerad</span>
                      </label>
                    </div>

                    {plackAssoc === "ja" && (
                      <div className="roda-flaggor-soft p-4 rounded-xl">
                        <h4 className="font-bold text-[#059669] mb-1">Behandlingsprotokoll</h4>
                        <ul className="text-sm space-y-1 text-[#064e3b]">
                          <li>Oral hygieninstruktion (OHI)</li>
                          <li>Tandstensborttagning / Depuration</li>
                          <li>Återbesök / Kontroll om 3 månader</li>
                        </ul>
                      </div>
                    )}

                    {plackAssoc === "nej" && (
                      <div className="roda-flaggor p-4 rounded-xl">
                        <h4 className="font-bold text-white mb-1">Kräver Medicinsk Bedömning</h4>
                        <p className="text-sm text-white/90 mb-2">Kan vara orsakad av systemisk sjukdom, läkemedel eller hormonella förändringar.</p>
                        <ul className="text-sm space-y-1 text-white">
                          <li>Remiss till oral medicin / parodontolog</li>
                          <li>Rekommendera läkarkontakt</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Stadium (I-IV) */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              {renderStepHeader(2, "Kliniska Mätvärden (Stadium)", "Fyll i värsta uppmätta värden för bettet för att fastställa stadium.")}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Klinisk fästeförlust (CAL) mm</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="T.ex. 4" 
                    value={clinical.cal}
                    onChange={(e) => setClinical({...clinical, cal: e.target.value === "" ? "" : Number(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 transition-all bg-white/50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Stadium I (1-2), II (3-4), III/IV (≥5)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Sonderingsdjup (PPD) mm</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="T.ex. 6" 
                    value={clinical.fickdjup}
                    onChange={(e) => setClinical({...clinical, fickdjup: e.target.value === "" ? "" : Number(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 transition-all bg-white/50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Stadium I (≤4), II (≤5), III/IV (≥6)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Radiografisk benförlust %</label>
                  <input 
                    type="number" 
                    min="0" max="100"
                    placeholder="T.ex. 35" 
                    value={clinical.benforlust}
                    onChange={(e) => setClinical({...clinical, benforlust: e.target.value === "" ? "" : Number(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 transition-all bg-white/50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Stadium I (&lt;15), II (15-33), III/IV (≥33)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Förlorade tänder pga parodontit</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="T.ex. 2" 
                    value={clinical.lostTeeth}
                    onChange={(e) => setClinical({...clinical, lostTeeth: e.target.value === "" ? "" : Number(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 transition-all bg-white/50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Stadium III (≤4), IV (≥5)</p>
                </div>
              </div>

              <div className="bg-[#0E3B52]/5 rounded-xl p-5 border border-[#0E3B52]/10">
                <h4 className="font-bold text-[#0E3B52] mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#CC5833]" />
                  Komplexitetsfaktorer (Stadium IV-indikatorer)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "tuggfunktion", label: "Påverkad tuggfunktion" },
                    { id: "bitKollaps", label: "Bettkollaps" },
                    { id: "flaring", label: "Flaring / Drifting" },
                    { id: "mindreAn10mm", label: "<10mm interokklusalt utrymme" },
                    { id: "flerAn20TanderKvar", label: "≥20 tänder kvar (behov av komplex rehab)" },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                      <input 
                        type="checkbox" 
                        checked={clinical[item.id as keyof ClinicalData] as boolean}
                        onChange={(e) => setClinical({...clinical, [item.id]: e.target.checked})}
                        className="w-5 h-5 text-[#CC5833] rounded focus:ring-[#CC5833]"
                      />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Grad (A-C) */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              {renderStepHeader(3, "Riskfaktorer (Grad)", "Välj riskfaktorer för att bestämma progressionsgraden.")}
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-3">Rökning (Cigaretter / dag)</label>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setRisk({...risk, rokning: "0"})} className={`pill-button ${risk.rokning === "0" ? "active" : ""}`}>Icke-rökare</button>
                    <button onClick={() => setRisk({...risk, rokning: "lt10"})} className={`pill-button ${risk.rokning === "lt10" ? "active" : ""}`}>&lt; 10 / dag</button>
                    <button onClick={() => setRisk({...risk, rokning: "gt10"})} className={`pill-button ${risk.rokning === "gt10" ? "active" : ""}`}>≥ 10 / dag</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-3">Diabetes (HbA1c)</label>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setRisk({...risk, diabetes: "normal"})} className={`pill-button ${risk.diabetes === "normal" ? "active" : ""}`}>Ingen / Normal</button>
                    <button onClick={() => setRisk({...risk, diabetes: "kontrollerad"})} className={`pill-button ${risk.diabetes === "kontrollerad" ? "active" : ""}`}>Kontrollerad (&lt;7%)</button>
                    <button onClick={() => setRisk({...risk, diabetes: "okontrollerad"})} className={`pill-button ${risk.diabetes === "okontrollerad" ? "active" : ""}`}>Okontrollerad (≥7%)</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-3">Benförlust Progression (Radiografiskt över 5 år)</label>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setRisk({...risk, blProgression: "lt0.25"})} className={`p-4 rounded-xl border text-left transition-all ${risk.blProgression === "lt0.25" ? "border-[#CC5833] bg-[#CC5833]/10" : "border-gray-200 bg-white/50"}`}>
                      <span className="font-bold block text-[#0E3B52]">Grad A</span>
                      <span className="text-sm text-gray-600">Ingen progression eller &lt;0.25 mm/år</span>
                    </button>
                    <button onClick={() => setRisk({...risk, blProgression: "0.25-1.0"})} className={`p-4 rounded-xl border text-left transition-all ${risk.blProgression === "0.25-1.0" ? "border-[#CC5833] bg-[#CC5833]/10" : "border-gray-200 bg-white/50"}`}>
                      <span className="font-bold block text-[#0E3B52]">Grad B</span>
                      <span className="text-sm text-gray-600">0.25 - 1.0 mm progression/år</span>
                    </button>
                    <button onClick={() => setRisk({...risk, blProgression: "gt1.0"})} className={`p-4 rounded-xl border text-left transition-all ${risk.blProgression === "gt1.0" ? "border-[#CC5833] bg-[#CC5833]/10" : "border-gray-200 bg-white/50"}`}>
                      <span className="font-bold block text-[#0E3B52]">Grad C</span>
                      <span className="text-sm text-gray-600">&gt; 1.0 mm progression/år ELLER snabb klinisk försämring</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Resultat-kort */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              {renderStepHeader(4, "Klassifikation & Behandling", "Granska resultatet och kopiera journaltexten.")}
              
              <div className="bg-[#1E3028] rounded-2xl p-6 text-white mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CC5833] opacity-20 rounded-bl-full blur-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-sm font-mono text-[#B6CBC0] mb-2 uppercase tracking-widest">EFP/AAP 2018 KLASSIFIKATION</h3>
                  {sjukdom === "parodontit" ? (
                    <div className="text-4xl md:text-5xl font-serif italic mb-6">
                      Parodontit <br className="hidden md:block"/> Stadium {stadium}, Grad {grad}
                    </div>
                  ) : (
                    <div className="text-4xl font-serif italic mb-6">
                      Gingivit <span className="text-xl ml-2 font-sans not-italic text-[#B6CBC0]">({plackAssoc === "ja" ? "Plack-associerad" : "Icke-plack-associerad"})</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                    <div>
                      <h4 className="font-bold text-[#CC5833] mb-2 text-sm uppercase">Rekommendation</h4>
                      <p className="text-sm text-[#B6CBC0] leading-relaxed">
                        {sjukdom === "gingivit" && plackAssoc === "ja" && "Behandla med OHI och depuration. Utvärdera efter 3 månader."}
                        {sjukdom === "gingivit" && plackAssoc === "nej" && "Remiss för utredning av systemiska orsaker rekommenderas starkt."}
                        {sjukdom === "parodontit" && (stadium === "I" || stadium === "II") && "Behandling inom allmäntandvården. OHI, kausal behandling, stödbehandling."}
                        {sjukdom === "parodontit" && (stadium === "III" || stadium === "IV") && "Avancerad behandling krävs. Överväg remiss till parodontolog. Kausal och ev. kirurgisk parodontal terapi."}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#CC5833] mb-2 text-sm uppercase">Riskprofil</h4>
                      <ul className="text-sm text-[#B6CBC0] space-y-1 list-disc ml-4">
                        {risk.rokning === "gt10" && <li>Hög risk: Rökning</li>}
                        {risk.diabetes === "okontrollerad" && <li>Hög risk: Okontrollerad diabetes</li>}
                        {clinical.tuggfunktion && <li>Nedsatt tuggfunktion noterat</li>}
                        {!risk.rokning && !risk.diabetes && <li className="list-none italic">Inga specifika högriskfaktorer valda</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="journal-box mt-8">
                <button 
                  onClick={copyToClipboard}
                  className="copy-btn hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Copy size={14} /> Kopiera text
                </button>
                <div className="font-mono text-sm text-gray-700 whitespace-pre-wrap mt-2">
                  {sjukdom === "parodontit" && `Diagnos: Parodontit Stadium ${stadium}, Grad ${grad}\n\nKliniska mätvärden:\n- CAL: ${clinical.cal || "-"} mm\n- Fickdjup: ${clinical.fickdjup || "-"} mm\n- Benförlust: ${clinical.benforlust || "-"} %\n- Förlorade tänder (pga parodontit): ${clinical.lostTeeth || "-"}\n\nBehandlingsplan:\n- OHI och depuration\n${(stadium === "III" || stadium === "IV") ? "- Indikation för remiss till parodontolog föreligger" : "- Uppföljning inom allmäntandvården"}`}
                  {sjukdom === "gingivit" && `Diagnos: Gingivit\nAssocierad med plack: ${plackAssoc === "ja" ? "Ja" : "Nej"}\n\nBehandling:\n${plackAssoc === "ja" ? "OHI, tandstensborttagning. Kontroll om 3 månader." : "Remiss oral medicin / läkarkontakt för bedömning av systemisk orsak."}`}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="mt-12 flex justify-between items-center border-t border-gray-200/60 pt-6">
            <button
              onClick={() => setStep(Math.max(1, step - 1) as 1|2|3|4)}
              className={`morphic-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-[#0E3B52] ${step === 1 ? "invisible" : ""}`}
            >
              <ChevronLeft size={18} /> Tillbaka
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(Math.min(4, step + 1) as 1|2|3|4)}
                disabled={step === 1 && sjukdom === null}
                className="morphic-button-dark px-8 py-3 rounded-xl flex items-center gap-2 font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Nästa Steg <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setStep(1);
                  setSjukdom(null);
                  setPlackAssoc(null);
                  setClinical({ cal: "", fickdjup: "", benforlust: "", lostTeeth: "", tuggfunktion: false, bitKollaps: false, flaring: false, mindreAn10mm: false, flerAn20TanderKvar: false });
                  setRisk({ rokning: null, diabetes: null, blProgression: null });
                }}
                className="morphic-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-gray-600 hover:text-red-600"
              >
                Börja om
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar (Summary & Context) */}
      <div className="glass-sidebar !static !w-full !h-auto lg:!h-[calc(100vh-120px)] rounded-3xl p-6 hidden lg:block sticky top-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0E3B52]/10">
          <Info className="text-[#CC5833]" size={24} />
          <h3 className="font-serif italic text-xl text-[#0E3B52] font-bold">Sammanfattning</h3>
        </div>

        <div className="space-y-6">
          <div className="bg-white/60 p-4 rounded-xl border border-white">
            <p className="text-xs font-mono text-[#CC5833] uppercase font-bold mb-1">Vald Sjukdomstyp</p>
            <p className="font-medium text-[#0E3B52] capitalize">{sjukdom || "Ej vald"}</p>
          </div>

          {sjukdom === "parodontit" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-[#1E3028] p-5 rounded-xl border border-white text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#CC5833] opacity-20 rounded-bl-full blur-xl" />
                <p className="text-xs font-mono text-[#B6CBC0] uppercase font-bold mb-1 relative z-10">Aktiv Klassificering</p>
                <p className="text-2xl font-serif italic text-white relative z-10">
                  {stadium ? `Stadium ${stadium}` : "Inget Stadium"}
                  {grad && <span className="ml-2 text-[#CC5833]">Grad {grad}</span>}
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-xl border border-white">
                <p className="text-xs font-mono text-gray-500 uppercase font-bold mb-3">Viktiga Mätvärden</p>
                <div className="space-y-2 text-sm text-[#0E3B52]">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="opacity-70">CAL:</span>
                    <span className="font-medium">{clinical.cal || "0"} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="opacity-70">PPD:</span>
                    <span className="font-medium">{clinical.fickdjup || "0"} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="opacity-70">Benförlust:</span>
                    <span className="font-medium">{clinical.benforlust || "0"} %</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="roda-flaggor-soft p-4 rounded-xl mt-8 border-2 border-orange-200 bg-orange-50">
            <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
              <AlertTriangle size={16} /> Klinisk Varning
            </h4>
            <p className="text-xs text-orange-700 leading-relaxed">
              Utvärdera alltid patientens compliance och systemiska hälsa innan parodontalkirurgi eller avancerad protetik inleds. Patienter i Stadium IV bör utredas för protetiskt behandlingsbehov efter sjukdomskontroll.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
