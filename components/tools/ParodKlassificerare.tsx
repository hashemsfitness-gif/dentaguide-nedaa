"use client";

import React, { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { Copy, AlertTriangle, ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";

interface InclusionData {
  bop: "yes" | "no" | null;
  pocket: "yes" | "no" | null;
}

interface PatientData {
  age: number | "";
  teeth: number | "";
  smoking: "none" | "lt10" | "ge10" | "snus" | null;
  diabetes: "none" | "controlled" | "uncontrolled" | null;
}

interface SeverityData {
  cal: "1" | "2" | "3" | null;
  bone: "1" | "2" | "3" | null;
  toothloss: "0" | "3" | "4" | null;
  bonePct: number | "";
}

interface ComplexityData {
  ppd: "1" | "2" | "3" | null;
  angular: "0" | "3" | null;
  furk: "0" | "3" | "3b" | null;
  chew: boolean;
  mob: boolean;
  bite: boolean;
  drift: boolean;
  few: boolean;
}

interface GradeData {
  direct: "none" | "A" | "B" | "C" | null;
  phenotype: "A" | "B" | "C" | null;
}

interface ExtentData {
  extent: "lok" | "gen" | "mol" | null;
  bop: number | "";
  plaque: number | "";
}

interface Reason {
  txt: string;
  level: number;
}

function toRoman(n: number): string {
  return ["—", "I", "II", "III", "IV"][n] || "—";
}

function calcStage(sev: SeverityData, comp: ComplexityData): { stage: number; reasons: Reason[] } {
  let stage = 0;
  const reasons: Reason[] = [];

  if (sev.cal) {
    const s = Number(sev.cal);
    if (s > stage) { stage = s; reasons.push({ txt: `CAL: ${["", "1–2mm → Stadie I", "3–4mm → Stadie II", "≥5mm → Stadie III+"][s]}`, level: s }); }
    else { reasons.push({ txt: `CAL bidrar till Stadie ${toRoman(s)} (ej uppgradering)`, level: 0 }); }
  }

  if (sev.bone) {
    const s = Number(sev.bone);
    if (s > stage) { stage = s; reasons.push({ txt: `Benförlust: ${["", "<15% → Stadie I", "15–33% → Stadie II", ">33% → Stadie III+"][s]}`, level: s }); }
    else { reasons.push({ txt: `Benförlust bidrar till Stadie ${toRoman(s)}`, level: 0 }); }
  }

  if (sev.toothloss && sev.toothloss !== "0") {
    const s = parseInt(sev.toothloss);
    if (s > stage) { stage = s; reasons.push({ txt: sev.toothloss === "3" ? "≤4 tänder förlorade → Stadie III" : "≥5 tänder förlorade → Stadie IV", level: s }); }
  } else if (sev.toothloss === "0") {
    reasons.push({ txt: "Ingen tandförlust p.g.a. parodontit", level: 0 });
  }

  if (comp.ppd) {
    const s = Number(comp.ppd);
    if (s > stage) { stage = s; reasons.push({ txt: `PPD: ${["", "≤4mm → Stadie I", "≤5mm → Stadie II", "≥6mm → Stadie III+"][s]}`, level: s }); }
    else { reasons.push({ txt: `PPD bidrar till Stadie ${toRoman(s)}`, level: 0 }); }
  }

  if (comp.angular === "3") {
    if (3 > stage) stage = 3;
    reasons.push({ txt: "Angulära bendefekter ≥3mm → Stadie III", level: 3 });
  }

  if (comp.furk === "3" || comp.furk === "3b") {
    if (3 > stage) stage = 3;
    reasons.push({ txt: comp.furk === "3" ? "Furkation Grad II → Stadie III" : "Furkation Grad III → Stadie III", level: 3 });
  }

  const ivFactors: string[] = [];
  if (comp.chew)  ivFactors.push("Nedsatt tuggfunktion");
  if (comp.mob)   ivFactors.push("Tandmobilitet ≥ Grad 2");
  if (comp.bite)  ivFactors.push("Bettkollaps");
  if (comp.drift) ivFactors.push("Tandvandring/fläktning");
  if (comp.few)   ivFactors.push("<20 kvarv. tänder / <10 antagonistpar");

  if (ivFactors.length > 0) {
    stage = 4;
    reasons.push({ txt: `Stadie IV: ${ivFactors.join(", ")}`, level: 4 });
  }

  if ((sev.cal || sev.bone || comp.ppd) && stage < 1) stage = 1;

  return { stage, reasons };
}

function calcGrade(
  gradeData: GradeData,
  patient: PatientData,
  sev: SeverityData,
  ext: ExtentData
): { grade: "A" | "B" | "C" | null; reasons: Reason[]; boneAgeRatio: number | null } {
  let gradeNum = 0;
  const reasons: Reason[] = [];
  let boneAgeRatio: number | null = null;

  if (gradeData.direct && gradeData.direct !== "none") {
    const dMap: Record<string, number> = { A: 1, B: 2, C: 3 };
    const d = dMap[gradeData.direct];
    if (d > gradeNum) gradeNum = d;
    const dTxt: Record<string, string> = { A: "Ingen progression → Grad A", B: "<2mm 5år → Grad B", C: "≥2mm 5år → Grad C" };
    reasons.push({ txt: `Direkt bevis: ${dTxt[gradeData.direct]}`, level: d });
  }

  const bonePct = Number(sev.bonePct);
  const age = Number(patient.age);
  if (sev.bonePct !== "" && !isNaN(bonePct) && patient.age !== "" && !isNaN(age) && age > 0) {
    boneAgeRatio = bonePct / age;
    let ratioGrade = 0;
    if (boneAgeRatio < 0.25)                              ratioGrade = 1;
    else if (boneAgeRatio >= 0.25 && boneAgeRatio <= 1.0) ratioGrade = 2;
    else if (boneAgeRatio > 1.0)                          ratioGrade = 3;
    if (ratioGrade > gradeNum) gradeNum = ratioGrade;
    const ratioLbl = ["", "Grad A", "Grad B", "Grad C"][ratioGrade];
    reasons.push({ txt: `Benförlust/ålder: ${bonePct}%/${age}år = ${boneAgeRatio.toFixed(2)} → ${ratioLbl}`, level: ratioGrade });
  }

  if (gradeData.phenotype) {
    const p = { A: 1, B: 2, C: 3 }[gradeData.phenotype];
    if (p > gradeNum) gradeNum = p;
    reasons.push({ txt: `Case phenotype: Grad ${gradeData.phenotype}`, level: p });
  }

  if (patient.smoking === "lt10" && gradeNum < 2) { gradeNum = 2; reasons.push({ txt: "Rökning <10/dag → uppgraderar till minst Grad B", level: 2 }); }
  if (patient.smoking === "ge10" && gradeNum < 3) { gradeNum = 3; reasons.push({ txt: "Rökning ≥10/dag → uppgraderar till Grad C", level: 3 }); }
  if (patient.smoking === "snus") reasons.push({ txt: "Snus/e-cig → notera som riskfaktor", level: 0 });
  if (patient.diabetes === "controlled"   && gradeNum < 2) { gradeNum = 2; reasons.push({ txt: "Diabetes HbA1c <7% → minst Grad B", level: 2 }); }
  if (patient.diabetes === "uncontrolled" && gradeNum < 3) { gradeNum = 3; reasons.push({ txt: "Diabetes HbA1c ≥7% → Grad C", level: 3 }); }

  if (ext.extent === "mol" && gradeNum < 3) {
    gradeNum = 3;
    reasons.push({ txt: "Molar/incisiv-mönster → indikerar Grad C", level: 3 });
  }

  const grade = gradeNum > 0 ? (["A", "B", "C"] as const)[gradeNum - 1] : null;
  return { grade, reasons, boneAgeRatio };
}

function getExtentLabel(extent: string | null): string {
  return { lok: "Lokaliserad", gen: "Generaliserad", mol: "Molar/Incisiv-mönster" }[extent ?? ""] ?? "—";
}

function getSupportInterval(grade: string | null): string {
  return { A: "7–12 månader", B: "5–6 månader", C: "3–4 månader" }[grade ?? ""] ?? "—";
}

const EMPTY_INCLUSION: InclusionData  = { bop: null, pocket: null };
const EMPTY_PATIENT: PatientData      = { age: "", teeth: "", smoking: null, diabetes: null };
const EMPTY_SEVERITY: SeverityData    = { cal: null, bone: null, toothloss: null, bonePct: "" };
const EMPTY_COMPLEXITY: ComplexityData = { ppd: null, angular: null, furk: null, chew: false, mob: false, bite: false, drift: false, few: false };
const EMPTY_GRADE: GradeData          = { direct: null, phenotype: null };
const EMPTY_EXTENT: ExtentData        = { extent: null, bop: "", plaque: "" };

export default function ParodKlassificerare() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [inclusion, setInclusion]   = useState<InclusionData>(EMPTY_INCLUSION);
  const [patient, setPatient]       = useState<PatientData>(EMPTY_PATIENT);
  const [severity, setSeverity]     = useState<SeverityData>(EMPTY_SEVERITY);
  const [complexity, setComplexity] = useState<ComplexityData>(EMPTY_COMPLEXITY);
  const [gradeData, setGradeData]   = useState<GradeData>(EMPTY_GRADE);
  const [extentData, setExtentData] = useState<ExtentData>(EMPTY_EXTENT);

  const { stage, reasons: stageReasons } = calcStage(severity, complexity);
  const { grade, reasons: gradeReasons, boneAgeRatio } = calcGrade(gradeData, patient, severity, extentData);
  const extentLabel    = getExtentLabel(extentData.extent);
  const supportInterval = getSupportInterval(grade);
  const inclusionOk    = inclusion.bop === "yes" && inclusion.pocket === "yes";
  const allReasons     = [...stageReasons, ...gradeReasons];

  function buildJournal(): string {
    const today    = new Date().toLocaleDateString("sv-SE");
    const stageTxt = stage > 0 ? toRoman(stage) : "—";
    const gradeTxt = grade ?? "—";

    const smokeTxt: Record<string, string> = { none: "Icke-rökare", lt10: "Rökare <10 cig/dag", ge10: "Rökare ≥10 cig/dag", snus: "Snus/e-cig" };
    const diabTxt:  Record<string, string> = { none: "Ingen diabetes", controlled: "Diabetes, HbA1c <53 mmol/mol", uncontrolled: "Diabetes, HbA1c ≥53 mmol/mol" };
    const calLbl:   Record<string, string> = { "1": "1–2mm (Stadie I)", "2": "3–4mm (Stadie II)", "3": "≥5mm (Stadie III/IV)" };
    const boneLbl:  Record<string, string> = { "1": "<15% (Stadie I)", "2": "15–33% (Stadie II)", "3": ">33% (Stadie III/IV)" };
    const tlLbl:    Record<string, string> = { "0": "Ingen", "3": "≤4 tänder", "4": "≥5 tänder" };
    const ppdLbl:   Record<string, string> = { "1": "≤4mm", "2": "≤5mm", "3": "≥6mm" };
    const furkLbl:  Record<string, string> = { "0": "Ingen/Grad I", "3": "Grad II", "3b": "Grad III" };

    const ivF: string[] = [];
    if (complexity.chew)  ivF.push("Nedsatt tuggfunktion");
    if (complexity.mob)   ivF.push("Mobilitet ≥ Grad 2");
    if (complexity.bite)  ivF.push("Bettkollaps");
    if (complexity.drift) ivF.push("Tandvandring");
    if (complexity.few)   ivF.push("<20 tänder");

    const bopTxt  = extentData.bop  !== "" ? extentData.bop  + "%" : "Ej angivet";
    const plaqTxt = extentData.plaque !== "" ? extentData.plaque + "%" : "Ej angivet";

    const diagnosPrefix = extentData.extent ? extentLabel.split(" ")[0] + " p" : "P";

    return `PARODONTAL KLASSIFIKATION — ${today}

DIAGNOS:
${diagnosPrefix}arodontit stadie ${stageTxt} grad ${gradeTxt}

SVÅRIGHETSGRAD:
  CAL (djupaste site): ${severity.cal ? calLbl[severity.cal] : "Ej angiven"}
  Radiografisk benförlust: ${severity.bone ? boneLbl[severity.bone] : "Ej angiven"}
  Tandförlust (paro-orsakad): ${severity.toothloss !== null ? (tlLbl[severity.toothloss] ?? "—") : "Ej angiven"}

KOMPLEXITET:
  Max PPD: ${complexity.ppd ? ppdLbl[complexity.ppd] : "Ej angivet"}
  Angulära bendefekter: ${complexity.angular === "3" ? "Ja, ≥3mm" : "Nej"}
  Furkation: ${complexity.furk ? furkLbl[complexity.furk] : "Ej registrerad"}
  Stadie IV-faktorer: ${ivF.length ? ivF.join(", ") : "Inga"}

RISKFAKTORER:
  Rökning: ${patient.smoking ? smokeTxt[patient.smoking] : "Ej angivet"}
  Diabetes: ${patient.diabetes ? diabTxt[patient.diabetes] : "Ej angivet"}

MUNHYGIENSTATUS:
  BoP: ${bopTxt}
  Plackindex: ${plaqTxt}

UTBREDNING: ${extentLabel}

STÖDBEHANDLINGSINTERVALL: ${supportInterval}

Ansvarig tandläkare: _______________`;
  }

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(buildJournal());
      alert("Journaltext kopierad!");
    } catch (err) {
      Sentry.captureException(err);
      alert("Kunde inte kopiera texten.");
    }
  }

  function resetAll() {
    setStep(0);
    setInclusion(EMPTY_INCLUSION);
    setPatient(EMPTY_PATIENT);
    setSeverity(EMPTY_SEVERITY);
    setComplexity(EMPTY_COMPLEXITY);
    setGradeData(EMPTY_GRADE);
    setExtentData(EMPTY_EXTENT);
  }

  function OptBtn({ value, current, onClick, children }: {
    value: string; current: string | null; onClick: () => void; children: React.ReactNode;
  }) {
    return (
      <button
        onClick={onClick}
        className={`p-3 rounded-xl border-2 text-left transition-all text-sm font-medium w-full ${
          current === value
            ? "border-[#CC5833] bg-[#CC5833]/10 text-[#0E3B52] font-bold"
            : "border-gray-200 bg-white/50 text-gray-700 hover:border-[#CC5833]/50"
        }`}
      >
        {children}
      </button>
    );
  }

  function ToggleRow({ checked, onChange, label, sub }: {
    checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string;
  }) {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all w-full text-left ${
          checked ? "border-[#CC5833] bg-[#CC5833]/10" : "border-gray-200 bg-white/50 hover:border-[#CC5833]/50"
        }`}
      >
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
          checked ? "bg-[#CC5833] border-[#CC5833] text-white" : "border-gray-300 bg-white"
        }`}>
          {checked && <CheckCircle2 size={12} />}
        </div>
        <span className="text-sm font-medium text-gray-700 flex-1 text-left">
          {label}
          {sub && <span className="block text-xs text-gray-500 font-normal">{sub}</span>}
        </span>
      </button>
    );
  }

  const stepLabels = ["Inklusion", "Patient", "Svårighetsgrad", "Komplexitet", "Progression", "Utbredning"];
  const nextLabels = ["Nästa: Patientuppgifter", "Nästa: Svårighetsgrad", "Nästa: Komplexitet", "Nästa: Progression", "Nästa: Utbredning", ""];

  function renderHeader(title: string, desc: string) {
    return (
      <div className="mb-6 pb-4 border-b border-white/20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#CC5833]/10 text-[#CC5833] font-mono uppercase tracking-wider">
            {step === 0 ? "Inklusion" : `Steg ${step} av 5`}
          </span>
          <h2 className="text-xl font-serif italic text-[#0E3B52]">{title}</h2>
        </div>
        <p className="text-sm text-[#0E3B52]/70">{desc}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* ── WIZARD ── */}
      <div className="lg:col-span-2 space-y-6">

        {/* Progress bar */}
        <div className="glass-bento p-4 flex items-center bg-white/60 overflow-x-auto gap-0">
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                step === s
                  ? "bg-[#CC5833] text-white border-[#CC5833] shadow"
                  : step > s
                    ? "bg-[#0E3B52] text-white border-[#0E3B52]"
                    : "bg-white text-gray-400 border-gray-200"
              }`}>
                {step > s ? <CheckCircle2 size={13} /> : s === 0 ? "✦" : s}
              </div>
              {s < 5 && (
                <div className={`h-1 w-6 sm:w-10 mx-1 rounded ${step > s ? "bg-[#0E3B52]" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
          <div className="ml-3 text-xs text-gray-400 hidden sm:block font-medium">{stepLabels[step]}</div>
        </div>

        {/* Wizard card */}
        <div className="glass-bento min-h-[500px] flex flex-col justify-between">

          {/* STEP 0 — Inklusion */}
          {step === 0 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Inklusionsscreening", "Minimikriteria för parodontit-klassifikation. Båda kriterier måste vara uppfyllda.")}

              <div className="p-4 mb-6 rounded-xl bg-blue-50 border-l-4 border-blue-500 text-blue-800 text-sm">
                Klassifikationen kräver fästeförlust på <strong>minst 2 icke-angränsande tänder</strong>. Visdomständer (18, 28, 38, 48) exkluderas alltid.
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-1">Kriterium 1 — Blödning vid sondering (BoP)</p>
                  <p className="text-xs text-gray-500 mb-3">Föreligger BoP på mer än 2 icke-angränsande tänder? Angränsande grannständer räknas ej.</p>
                  <div className="flex flex-col gap-2">
                    <OptBtn value="yes" current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "yes" })}>✅ Ja — BoP på &gt;2 icke-angränsande tänder</OptBtn>
                    <OptBtn value="no"  current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "no"  })}>⛔ Nej — Kriteriet ej uppfyllt</OptBtn>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-1">Kriterium 2 — Approximala fickor</p>
                  <p className="text-xs text-gray-500 mb-3">Finns fickor (PPD ≥ 4 mm med BoP, eller CAL) på mer än 2 approximala ytor på icke-angränsande tänder?</p>
                  <div className="flex flex-col gap-2">
                    <OptBtn value="yes" current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "yes" })}>✅ Ja — Fickor på &gt;2 approximala ytor, icke-angränsande tänder</OptBtn>
                    <OptBtn value="no"  current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "no"  })}>⛔ Nej — Kriteriet ej uppfyllt</OptBtn>
                  </div>
                </div>

                {inclusion.bop !== null && inclusion.pocket !== null && (
                  <div className={`p-4 rounded-xl border-l-4 text-sm ${
                    inclusionOk
                      ? "bg-green-50 border-green-500 text-green-800"
                      : "bg-amber-50 border-amber-500 text-amber-800"
                  }`}>
                    {inclusionOk
                      ? <><strong>✅ Minimikriterierna är uppfyllda.</strong> Fortsätt till nästa steg för fullständig klassifikation.</>
                      : <><strong>⚠️ Minimikriterierna är EJ uppfyllda.</strong> Möjliga diagnoser: Gingivit eller lokal parodontit.</>
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 1 — Patientuppgifter */}
          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Patientuppgifter & Riskfaktorer", "Ange patientens ålder och modifierande faktorer. Dessa påverkar Grade-bedömningen.")}

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Grunduppgifter</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Patientens ålder</label>
                      <p className="text-xs text-gray-400 mb-1">Används för benförlust/ålder-kvot</p>
                      <input type="number" min="10" max="99" placeholder="t.ex. 45"
                        value={patient.age}
                        onChange={(e) => setPatient({ ...patient, age: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Antal kvarv. tänder</label>
                      <p className="text-xs text-gray-400 mb-1">Exkl. visdomständer</p>
                      <input type="number" min="0" max="28" placeholder="t.ex. 24"
                        value={patient.teeth}
                        onChange={(e) => setPatient({ ...patient, teeth: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Rökning</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: "none",  label: "Icke-rökare" },
                      { val: "lt10",  label: "< 10 cigaretter/dag" },
                      { val: "ge10",  label: "≥ 10 cigaretter/dag" },
                      { val: "snus",  label: "Snusare / e-cig" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={patient.smoking} onClick={() => setPatient({ ...patient, smoking: o.val as PatientData["smoking"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Rökning &lt;10 cig/dag → minst Grad B. Rökning ≥10 cig/dag → Grad C. Snus/e-cig noteras som riskfaktor.</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Diabetes (HbA1c)</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "none",         label: "Ingen diabetes / normalt blodsocker" },
                      { val: "controlled",   label: "Diabetes — HbA1c < 53 mmol/mol (< 7%)" },
                      { val: "uncontrolled", label: "Diabetes — HbA1c ≥ 53 mmol/mol (≥ 7%)" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={patient.diabetes} onClick={() => setPatient({ ...patient, diabetes: o.val as PatientData["diabetes"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">HbA1c &lt;53 mmol/mol → minst Grad B. HbA1c ≥53 mmol/mol → Grad C.</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-400 text-xs text-amber-800">
                  <strong>Övriga riskfaktorer:</strong> Kalciumkanalblockerare, cyklosporin A och viss epilepsimediciering kan ge läkemedelsinducerad gingival överväxt. Koagulationshämmande kan påverka behandlingen.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Svårighetsgrad */}
          {step === 2 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Svårighetsgrad — Fästeförlust & Benförlust", "Anger sjukdomens allvarlighetsgrad. Välj det VÄRSTA uppmätta värdet för hela bettet.")}

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Klinisk fästeförlust (CAL) — värsta approximala site</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "1", label: "1–2 mm → Stadie I" },
                      { val: "2", label: "3–4 mm → Stadie II" },
                      { val: "3", label: "≥ 5 mm → Stadie III/IV" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={severity.cal} onClick={() => setSeverity({ ...severity, cal: o.val as SeverityData["cal"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Radiografisk benförlust — andel av rotlängd</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "1", label: "Koronal 1/3 — <15% → Stadie I" },
                      { val: "2", label: "Koronal 1/3 — 15–33% → Stadie II" },
                      { val: "3", label: "Överstiger koronal 1/3 — >33% → Stadie III/IV" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={severity.bone} onClick={() => setSeverity({ ...severity, bone: o.val as SeverityData["bone"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Tandförlust p.g.a. parodontit</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "0", label: "Ingen tandförlust p.g.a. parodontit" },
                      { val: "3", label: "≤ 4 tänder förlorade → Stadie III" },
                      { val: "4", label: "≥ 5 tänder förlorade → Stadie IV" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={severity.toothloss} onClick={() => setSeverity({ ...severity, toothloss: o.val as SeverityData["toothloss"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-2">Benförlust för Grade-beräkning</p>
                  <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Benförlust värsta tanden — % av rotlängd</label>
                  <p className="text-xs text-gray-400 mb-2">Används för benförlust/ålder-kvot. T.ex. 30 = 30%</p>
                  <input type="number" min="0" max="100" placeholder="t.ex. 30"
                    value={severity.bonePct}
                    onChange={(e) => setSeverity({ ...severity, bonePct: e.target.value === "" ? "" : Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">Kvot = benförlust% / ålder. &lt;0.25 → Grad A &nbsp;|&nbsp; 0.25–1.0 → Grad B &nbsp;|&nbsp; &gt;1.0 → Grad C</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Komplexitet */}
          {step === 3 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Komplexitetsfaktorer", "Faktorer som kan uppgradera stadiet. Kryssa i allt som gäller för patienten.")}

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Maximalt sonderingsdjup (PPD) — djupaste fickan</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "1", label: "PPD ≤ 4 mm → Stadie I-komplexitet" },
                      { val: "2", label: "PPD ≤ 5 mm → Stadie II-komplexitet" },
                      { val: "3", label: "PPD ≥ 6 mm → Stadie III-komplexitet" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={complexity.ppd} onClick={() => setComplexity({ ...complexity, ppd: o.val as ComplexityData["ppd"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Angulära bendefekter</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "0", label: "Inga angulära bendefekter ≥ 3 mm" },
                      { val: "3", label: "Angulära bendefekter ≥ 3 mm → Stadie III" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={complexity.angular} onClick={() => setComplexity({ ...complexity, angular: o.val as ComplexityData["angular"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Furkationsinvolvering (värst drabbad tand)</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "0",  label: "Ingen / Grad I — Horisontell förlust < 1/3 av tandens bredd" },
                      { val: "3",  label: "Grad II — Partiell genomträngning (> 1/3 men ej genomgående) → Stadie III" },
                      { val: "3b", label: "Grad III — Genomgående förlust → Stadie III" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={complexity.furk} onClick={() => setComplexity({ ...complexity, furk: o.val as ComplexityData["furk"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-2">Stadie IV-komplexitet</p>
                  <div className="p-3 mb-3 rounded-xl bg-amber-50 border-l-4 border-amber-400 text-xs text-amber-800">
                    Minst ett av dessa kriterier → Stadie IV, utöver Stadie III-komplexiteten.
                  </div>
                  <div className="space-y-2">
                    <ToggleRow checked={complexity.chew}  onChange={(v) => setComplexity({ ...complexity, chew: v  })} label="Nedsatt tuggfunktion"                          sub="Patienten rapporterar tydlig nedsatt förmåga att tugga" />
                    <ToggleRow checked={complexity.mob}   onChange={(v) => setComplexity({ ...complexity, mob: v   })} label="Tandmobilitet ≥ Grad 2"                        sub="Horisontell rörlighet > 1 mm" />
                    <ToggleRow checked={complexity.bite}  onChange={(v) => setComplexity({ ...complexity, bite: v  })} label="Bettkollaps"                                    sub="Vertikaldimensionen reducerad" />
                    <ToggleRow checked={complexity.drift} onChange={(v) => setComplexity({ ...complexity, drift: v })} label="Tandvandring / Fläktning"                      sub="Märkbar förändring av tändernas läge" />
                    <ToggleRow checked={complexity.few}   onChange={(v) => setComplexity({ ...complexity, few: v   })} label="< 20 kvarvarande tänder / < 10 antagonistpar"  sub="Kraftigt reducerat bett" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 — Progression / Grade */}
          {step === 4 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Progressionsbedömning (Grad A–C)", "Välj det starkaste tillgängliga beviset för progressionshastighet. Direkt bevis väger tyngst.")}

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-2">Direkt bevis på progression (dokumenterade data)</p>
                  <div className="p-3 mb-3 rounded-xl bg-blue-50 border-l-4 border-blue-400 text-xs text-blue-800">
                    Välj om du har tillgång till äldre journaldata / röntgenbilder som visar progression över 5 år. Om ej tillgängligt → välj "Saknas".
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "none", label: "Saknas / Inte tillämpbart" },
                      { val: "A",    label: "Ingen CAL/benförlust dokumenterad över 5 år → Grad A" },
                      { val: "B",    label: "< 2 mm CAL/benförlust över 5 år → Grad B" },
                      { val: "C",    label: "≥ 2 mm CAL/benförlust över 5 år → Grad C" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: o.val as GradeData["direct"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-2">Indirekt bedömning — Case Phenotype</p>
                  <div className="p-3 mb-3 rounded-xl bg-blue-50 border-l-4 border-blue-400 text-xs text-blue-800">
                    Förhållandet mellan mängden plack/tandsten och graden av stödjevävnadsförlust. Välj det alternativ som bäst beskriver patienten.
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "A", label: "Grad A (möjlig) — Stor mängd plack/tandsten men liten stödjevävnadsförlust. Plack förklarar ej sjukdomen." },
                      { val: "B", label: "Grad B (möjlig) — Mängd plack/tandsten och sjukdomstecken korrelerar väl med stödjevävnadsförlusten." },
                      { val: "C", label: "Grad C (möjlig) — Stödjevävnadsförlust stor i förhållande till plack/tandsten. Snabb progression misstänks. Ev. molar/incisiv-lokalisation." },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={gradeData.phenotype} onClick={() => setGradeData({ ...gradeData, phenotype: o.val as GradeData["phenotype"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                {/* Bone-age ratio auto-display */}
                {(() => {
                  if (severity.bonePct === "" || patient.age === "") {
                    return (
                      <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500">
                        ⏳ Fyll i ålder (Steg 1) och benförlust % (Steg 2) för automatisk beräkning av benförlust/ålder-kvot.
                      </div>
                    );
                  }
                  const ratio = Number(severity.bonePct) / Number(patient.age);
                  let cls = "bg-green-50 border-green-500 text-green-800";
                  let icon = "✅"; let gradeTxt = "Grad A";
                  if (ratio >= 0.25 && ratio <= 1.0) { cls = "bg-amber-50 border-amber-400 text-amber-800"; icon = "⚠️"; gradeTxt = "Grad B"; }
                  if (ratio > 1.0)                   { cls = "bg-red-50 border-red-500 text-red-800";       icon = "🔴"; gradeTxt = "Grad C"; }
                  return (
                    <div className={`p-3 rounded-xl border-l-4 text-sm ${cls}`}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1">Beräknad benförlust/ålder-kvot</p>
                      {icon} Kvot: {ratio.toFixed(2)} ({severity.bonePct}% / {patient.age} år) → <strong>{gradeTxt}</strong>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* STEP 5 — Utbredning */}
          {step === 5 && (
            <div className="animate-in fade-in duration-500">
              {renderHeader("Utbredning", "Hur stor andel av tänderna uppvisar parodontit (BoP + stödjevävnadsförlust)?")}

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Sjukdomens utbredning</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { val: "lok", label: "Lokaliserad — < 30% av tänderna affekterade" },
                      { val: "gen", label: "Generaliserad — ≥ 30% av tänderna affekterade" },
                      { val: "mol", label: "Molar/Incisiv-mönster — Specifikt utbredningsmönster som kan indikera Grad C" },
                    ].map(o => (
                      <OptBtn key={o.val} value={o.val} current={extentData.extent} onClick={() => setExtentData({ ...extentData, extent: o.val as ExtentData["extent"] })}>{o.label}</OptBtn>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#CC5833] uppercase tracking-wider mb-3">Blödning vid sondering (BoP) — totalt</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0E3B52] mb-1">BoP%</label>
                      <p className="text-xs text-gray-400 mb-1">Gräns parodontal hälsa: ≤ 10% BoP</p>
                      <input type="number" min="0" max="100" placeholder="t.ex. 45"
                        value={extentData.bop}
                        onChange={(e) => setExtentData({ ...extentData, bop: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0E3B52] mb-1">Plackindex (%)</label>
                      <p className="text-xs text-gray-400 mb-1">% av tandytor med plack i cervikala 1/3</p>
                      <input type="number" min="0" max="100" placeholder="t.ex. 35"
                        value={extentData.plaque}
                        onChange={(e) => setExtentData({ ...extentData, plaque: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-green-50 border-l-4 border-green-500 text-sm text-green-800">
                  ✅ Baserat på Grade ges stödbehandlingsintervall: <strong>Grad A:</strong> 7–12 mån &nbsp;|&nbsp; <strong>Grad B:</strong> 5–6 mån &nbsp;|&nbsp; <strong>Grad C:</strong> 3–4 mån
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-400 text-sm text-amber-800">
                  ⚠️ Diagnos på tandnivå: Tänder med BoP och stödjevävnadsförlust → Parodontit. Tänder med BoP men utan stödjevävnadsförlust → Gingivit. Tänder utan BoP → Frisk.
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex justify-between items-center border-t border-gray-200/60 pt-6">
            <button
              onClick={() => setStep(Math.max(0, step - 1) as 0 | 1 | 2 | 3 | 4 | 5)}
              className={`morphic-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-[#0E3B52] ${step === 0 ? "invisible" : ""}`}
            >
              <ChevronLeft size={18} /> Tillbaka
            </button>

            {step < 5 ? (
              <button
                onClick={() => setStep(Math.min(5, step + 1) as 0 | 1 | 2 | 3 | 4 | 5)}
                disabled={step === 0 && !inclusionOk}
                className="morphic-button-dark px-8 py-3 rounded-xl flex items-center gap-2 font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {nextLabels[step]} <ChevronRight size={18} />
              </button>
            ) : (
              <button onClick={resetAll} className="morphic-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-gray-600 hover:text-red-600">
                Återställ &amp; börja om
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="glass-sidebar !static !w-full !h-auto lg:!h-[calc(100vh-120px)] rounded-3xl p-6 hidden lg:block sticky top-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0E3B52]/10">
          <Info className="text-[#CC5833]" size={24} />
          <h3 className="font-serif italic text-xl text-[#0E3B52] font-bold">Klassifikation</h3>
        </div>

        <div className="space-y-4">

          {/* Full classification */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[#CC5833]/10 to-[#0E3B52]/5 border border-[#CC5833]/20">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">EFP/AAP 2018</p>
            {stage > 0 && grade ? (
              <p className="font-serif italic text-[#0E3B52] text-base font-bold leading-snug">
                {extentData.extent ? getExtentLabel(extentData.extent).split(" ")[0] + " p" : "P"}arodontit<br />
                stadie {toRoman(stage)} grad {grade}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Fyll i stegen för att generera klassifikation</p>
            )}
          </div>

          {/* Stadium meter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stadie</span>
              <span className="font-serif font-bold text-[#0E3B52] text-sm">{stage > 0 ? `Stadie ${toRoman(stage)}` : "—"}</span>
            </div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`flex-1 h-2 rounded transition-all ${stage >= i ? ["", "bg-green-500", "bg-amber-500", "bg-orange-500", "bg-red-500"][i] : "bg-gray-200"}`} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400"><span>I</span><span>II</span><span>III</span><span>IV</span></div>
          </div>

          {/* Grade meter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grad</span>
              <span className="font-serif font-bold text-[#0E3B52] text-sm">{grade ? `Grad ${grade}` : "—"}</span>
            </div>
            <div className="flex gap-1 mb-1">
              {(["A", "B", "C"] as const).map((g, i) => (
                <div key={g} className={`flex-1 h-2 rounded transition-all ${grade && ["A", "B", "C"].indexOf(grade) >= i ? ["bg-green-500", "bg-amber-500", "bg-red-500"][i] : "bg-gray-200"}`} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400"><span>A (Låg)</span><span>B (Måttlig)</span><span>C (Hög)</span></div>
          </div>

          {/* Extent */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-white/60 border border-white">
            <span className="text-xs font-bold text-gray-500 uppercase">Utbredning</span>
            <span className="text-sm font-semibold text-[#0E3B52]">{extentLabel}</span>
          </div>

          {/* Support interval */}
          <div className="flex justify-between items-center p-3 rounded-xl bg-white/60 border border-white">
            <span className="text-xs font-bold text-gray-500 uppercase">Stödbehandling</span>
            <span className="text-sm font-semibold text-[#CC5833]">{supportInterval}</span>
          </div>

          {/* Reasoning chain */}
          {allReasons.length > 0 && (
            <div className="border-t border-gray-200 pt-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beslutskedja</p>
              <div className="space-y-1">
                {allReasons.map((r, i) => {
                  const dotColor = ["bg-gray-300", "bg-green-500", "bg-amber-500", "bg-orange-500", "bg-red-500"][Math.min(r.level, 4)];
                  return (
                    <div key={i} className="flex gap-2 items-start text-xs text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${dotColor}`} />
                      <span>{r.txt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Journal */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Journalmall</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-semibold text-[#CC5833] hover:text-[#0E3B52] transition-colors">
                <Copy size={12} /> Kopiera
              </button>
            </div>
            <div className="font-mono text-xs text-gray-600 whitespace-pre-wrap bg-white/50 p-3 rounded-xl border border-gray-100 max-h-44 overflow-y-auto">
              {buildJournal()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-orange-50 border-l-4 border-orange-300 text-xs text-orange-700 flex gap-2">
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
            <span>Utvärdera alltid patientens compliance och systemiska hälsa. Stadium IV → utred protetiskt behandlingsbehov efter sjukdomskontroll.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
