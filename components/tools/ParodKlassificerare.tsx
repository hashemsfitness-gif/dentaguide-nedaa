"use client";

import React, { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { Copy, AlertTriangle, Info, CheckCircle2, RotateCcw } from "lucide-react";

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

function OptBtn({ value, current, onClick, children }: {
  value: string; current: string | null; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl border-2 text-left transition-all text-sm font-medium w-full ${
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
      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 cursor-pointer transition-all w-full text-left ${
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

function Card({ num, title, desc, children }: {
  num: number; title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="glass-bento p-5 flex flex-col">
      <div className="mb-4 pb-3 border-b border-white/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold w-6 h-6 rounded-full bg-[#CC5833] text-white flex items-center justify-center font-mono">
            {num}
          </span>
          <h2 className="text-base font-serif italic text-[#0E3B52] font-bold">{title}</h2>
        </div>
        <p className="text-xs text-[#0E3B52]/70 leading-snug">{desc}</p>
      </div>
      <div className="space-y-4 flex-1">{children}</div>
    </div>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2">
      <p className="text-[10px] font-bold text-[#CC5833] uppercase tracking-wider">{children}</p>
      {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
    </div>
  );
}

export default function ParodKlassificerare() {
  const [inclusion, setInclusion]   = useState<InclusionData>(EMPTY_INCLUSION);
  const [patient, setPatient]       = useState<PatientData>(EMPTY_PATIENT);
  const [severity, setSeverity]     = useState<SeverityData>(EMPTY_SEVERITY);
  const [complexity, setComplexity] = useState<ComplexityData>(EMPTY_COMPLEXITY);
  const [gradeData, setGradeData]   = useState<GradeData>(EMPTY_GRADE);
  const [extentData, setExtentData] = useState<ExtentData>(EMPTY_EXTENT);

  const { stage, reasons: stageReasons } = calcStage(severity, complexity);
  const { grade, reasons: gradeReasons } = calcGrade(gradeData, patient, severity, extentData);
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
    setInclusion(EMPTY_INCLUSION);
    setPatient(EMPTY_PATIENT);
    setSeverity(EMPTY_SEVERITY);
    setComplexity(EMPTY_COMPLEXITY);
    setGradeData(EMPTY_GRADE);
    setExtentData(EMPTY_EXTENT);
  }

  // Auto bone-age ratio display
  const ratioBlock = (() => {
    if (severity.bonePct === "" || patient.age === "") {
      return (
        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500">
          ⏳ Fyll i ålder + benförlust % för automatisk kvot-beräkning.
        </div>
      );
    }
    const ratio = Number(severity.bonePct) / Number(patient.age);
    let cls = "bg-green-50 border-green-500 text-green-800";
    let icon = "✅"; let gradeTxt = "Grad A";
    if (ratio >= 0.25 && ratio <= 1.0) { cls = "bg-amber-50 border-amber-400 text-amber-800"; icon = "⚠️"; gradeTxt = "Grad B"; }
    if (ratio > 1.0)                   { cls = "bg-red-50 border-red-500 text-red-800";       icon = "🔴"; gradeTxt = "Grad C"; }
    return (
      <div className={`p-2.5 rounded-xl border-l-4 text-xs ${cls}`}>
        <p className="font-bold uppercase tracking-wider mb-0.5">Benförlust/ålder-kvot</p>
        {icon} {ratio.toFixed(2)} ({severity.bonePct}% / {patient.age}år) → <strong>{gradeTxt}</strong>
      </div>
    );
  })();

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-6">

      {/* ── RIGHT STICKY RESULT PANEL ── (flexbox sticky — follows scroll reliably) */}
      <aside className="order-first lg:order-last w-full lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-4 lg:h-fit">
        <div className="glass-sidebar !static !w-full !h-auto rounded-3xl p-5">
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#0E3B52]/10">
            <div className="flex items-center gap-2">
              <Info className="text-[#CC5833]" size={20} />
              <h3 className="font-serif italic text-lg text-[#0E3B52] font-bold">Klassifikation</h3>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
              title="Återställ alla fält"
              type="button"
            >
              <RotateCcw size={12} /> Återställ
            </button>
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
                <p className="text-sm text-gray-400 italic">Fyll i kort 1–6 för klassifikation</p>
              )}
            </div>

            {/* Inclusion status */}
            {(inclusion.bop !== null || inclusion.pocket !== null) && (
              <div className={`p-2.5 rounded-xl border-l-4 text-xs ${
                inclusionOk
                  ? "bg-green-50 border-green-500 text-green-800"
                  : inclusion.bop !== null && inclusion.pocket !== null
                    ? "bg-amber-50 border-amber-500 text-amber-800"
                    : "bg-gray-50 border-gray-300 text-gray-600"
              }`}>
                {inclusionOk
                  ? <><strong>✅ Inklusion uppfylld</strong></>
                  : inclusion.bop !== null && inclusion.pocket !== null
                    ? <><strong>⚠️ Inklusion EJ uppfylld</strong> — Möjligen gingivit eller lokal parodontit.</>
                    : <span>Inklusionsscreening pågår…</span>
                }
              </div>
            )}

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
              <div className="flex justify-between text-xs text-gray-400"><span>A</span><span>B</span><span>C</span></div>
            </div>

            {/* Extent */}
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/60 border border-white">
              <span className="text-xs font-bold text-gray-500 uppercase">Utbredning</span>
              <span className="text-sm font-semibold text-[#0E3B52]">{extentLabel}</span>
            </div>

            {/* Support interval */}
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/60 border border-white">
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
                <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-semibold text-[#CC5833] hover:text-[#0E3B52] transition-colors" type="button">
                  <Copy size={12} /> Kopiera
                </button>
              </div>
              <div className="font-mono text-xs text-gray-600 whitespace-pre-wrap bg-white/50 p-3 rounded-xl border border-gray-100">
                {buildJournal()}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-orange-50 border-l-4 border-orange-300 text-xs text-orange-700 flex gap-2">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Utvärdera alltid patientens compliance och systemiska hälsa. Stadium IV → utred protetiskt behandlingsbehov efter sjukdomskontroll.</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── LEFT GRID OF CARDS ── */}
      <section className="flex-1 min-w-0 grid grid-cols-1 xl:grid-cols-2 gap-5 content-start">

        {/* CARD 1 — Inklusion */}
        <Card num={1} title="Inklusionsscreening" desc="Båda kriterier krävs. Minst 2 icke-angränsande tänder. Visdomständer (18,28,38,48) exkluderas.">
          <div>
            <FieldLabel hint="Föreligger BoP på >2 icke-angränsande tänder?">Kriterium 1 — BoP</FieldLabel>
            <div className="flex flex-col gap-2">
              <OptBtn value="yes" current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "yes" })}>✅ Ja — &gt;2 icke-angränsande tänder</OptBtn>
              <OptBtn value="no"  current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "no"  })}>⛔ Nej</OptBtn>
            </div>
          </div>
          <div>
            <FieldLabel hint="PPD ≥4mm med BoP eller CAL på >2 approximala ytor?">Kriterium 2 — Approximala fickor</FieldLabel>
            <div className="flex flex-col gap-2">
              <OptBtn value="yes" current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "yes" })}>✅ Ja — &gt;2 approximala ytor</OptBtn>
              <OptBtn value="no"  current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "no"  })}>⛔ Nej</OptBtn>
            </div>
          </div>
        </Card>

        {/* CARD 2 — Svårighetsgrad */}
        <Card num={2} title="Svårighetsgrad" desc="Välj det VÄRSTA uppmätta värdet för hela bettet (CAL + benförlust + tandförlust).">
          <div>
            <FieldLabel>Klinisk fästeförlust (CAL) — värsta site</FieldLabel>
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
            <FieldLabel hint="Andel av rotlängd">Radiografisk benförlust</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "1", label: "<15% (koronal 1/3) → Stadie I" },
                { val: "2", label: "15–33% → Stadie II" },
                { val: "3", label: ">33% (överstiger koronal 1/3) → Stadie III/IV" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={severity.bone} onClick={() => setSeverity({ ...severity, bone: o.val as SeverityData["bone"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>Tandförlust p.g.a. parodontit</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "0", label: "Ingen tandförlust" },
                { val: "3", label: "≤ 4 tänder förlorade → Stadie III" },
                { val: "4", label: "≥ 5 tänder förlorade → Stadie IV" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={severity.toothloss} onClick={() => setSeverity({ ...severity, toothloss: o.val as SeverityData["toothloss"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="Värsta tanden, % av rotlängd. Används för Grade-kvot.">Benförlust % (för Grade)</FieldLabel>
            <input type="number" min="0" max="100" placeholder="t.ex. 30"
              value={severity.bonePct}
              onChange={(e) => setSeverity({ ...severity, bonePct: e.target.value === "" ? "" : Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1.5">Kvot = benförlust% / ålder. &lt;0.25 → A · 0.25–1.0 → B · &gt;1.0 → C</p>
          </div>
        </Card>

        {/* CARD 3 — Komplexitet */}
        <Card num={3} title="Komplexitet" desc="PPD, angulära defekter, furkation + Stadie IV-faktorer (kryssa allt som gäller).">
          <div>
            <FieldLabel>Max PPD — djupaste fickan</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "1", label: "≤ 4 mm → Stadie I" },
                { val: "2", label: "≤ 5 mm → Stadie II" },
                { val: "3", label: "≥ 6 mm → Stadie III" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={complexity.ppd} onClick={() => setComplexity({ ...complexity, ppd: o.val as ComplexityData["ppd"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>Angulära bendefekter</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "0", label: "Inga ≥ 3 mm" },
                { val: "3", label: "≥ 3 mm → Stadie III" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={complexity.angular} onClick={() => setComplexity({ ...complexity, angular: o.val as ComplexityData["angular"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel>Furkation (värst drabbad)</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "0",  label: "Ingen / Grad I (< 1/3 bredd)" },
                { val: "3",  label: "Grad II (partiell) → Stadie III" },
                { val: "3b", label: "Grad III (genomgående) → Stadie III" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={complexity.furk} onClick={() => setComplexity({ ...complexity, furk: o.val as ComplexityData["furk"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="Minst ett kryss → Stadie IV">Stadie IV-faktorer</FieldLabel>
            <div className="space-y-2">
              <ToggleRow checked={complexity.chew}  onChange={(v) => setComplexity({ ...complexity, chew: v  })} label="Nedsatt tuggfunktion" />
              <ToggleRow checked={complexity.mob}   onChange={(v) => setComplexity({ ...complexity, mob: v   })} label="Tandmobilitet ≥ Grad 2" sub="Horisontell rörlighet > 1 mm" />
              <ToggleRow checked={complexity.bite}  onChange={(v) => setComplexity({ ...complexity, bite: v  })} label="Bettkollaps" />
              <ToggleRow checked={complexity.drift} onChange={(v) => setComplexity({ ...complexity, drift: v })} label="Tandvandring / fläktning" />
              <ToggleRow checked={complexity.few}   onChange={(v) => setComplexity({ ...complexity, few: v   })} label="< 20 tänder / < 10 antagonistpar" />
            </div>
          </div>
        </Card>

        {/* CARD 4 — Utbredning & hygien */}
        <Card num={4} title="Utbredning & hygien" desc="Andel tänder med parodontit + munhygienstatus (BoP% + plack%).">
          <div>
            <FieldLabel>Utbredning</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "lok", label: "Lokaliserad — < 30% av tänderna" },
                { val: "gen", label: "Generaliserad — ≥ 30% av tänderna" },
                { val: "mol", label: "Molar/Incisiv-mönster → indikerar Grad C" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={extentData.extent} onClick={() => setExtentData({ ...extentData, extent: o.val as ExtentData["extent"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel hint="Hälsa: ≤ 10%">BoP %</FieldLabel>
              <input type="number" min="0" max="100" placeholder="t.ex. 45"
                value={extentData.bop}
                onChange={(e) => setExtentData({ ...extentData, bop: e.target.value === "" ? "" : Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
              />
            </div>
            <div>
              <FieldLabel hint="Cervikala 1/3">Plack %</FieldLabel>
              <input type="number" min="0" max="100" placeholder="t.ex. 35"
                value={extentData.plaque}
                onChange={(e) => setExtentData({ ...extentData, plaque: e.target.value === "" ? "" : Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
              />
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-green-50 border-l-4 border-green-500 text-xs text-green-800">
            ✅ Stödbehandling: <strong>A:</strong> 7–12 mån · <strong>B:</strong> 5–6 mån · <strong>C:</strong> 3–4 mån
          </div>
        </Card>

        {/* CARD 5 — Progression / Prognosgradering */}
        <Card num={5} title="Progression / Prognosgradering (Grad A–C)" desc="Direkt bevis väger tyngst. Saknas data → använd indirekt bedömning + kvot.">
          <div>
            <FieldLabel hint="Äldre journaldata/röntgen över 5 år">Direkt bevis</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "none", label: "Saknas / Inte tillämpbart" },
                { val: "A",    label: "Ingen progression över 5 år → Grad A" },
                { val: "B",    label: "< 2 mm över 5 år → Grad B" },
                { val: "C",    label: "≥ 2 mm över 5 år → Grad C" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: o.val as GradeData["direct"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="Förhållande mellan plack/tandsten och stödjevävnadsförlust">Case phenotype</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "A", label: "A — Stor plack/tandsten men liten förlust" },
                { val: "B", label: "B — Plack och förlust korrelerar" },
                { val: "C", label: "C — Stor förlust trots lite plack (snabb progression)" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={gradeData.phenotype} onClick={() => setGradeData({ ...gradeData, phenotype: o.val as GradeData["phenotype"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          {ratioBlock}
        </Card>

        {/* CARD 6 — Rökning & Diabetes (riskfaktorer) */}
        <Card num={6} title="Rökning & diabetes" desc="Modifierande riskfaktorer som uppgraderar Grade. Ålder + antal tänder används för Grade-kvot.">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Ålder</FieldLabel>
              <input type="number" min="10" max="99" placeholder="t.ex. 45"
                value={patient.age}
                onChange={(e) => setPatient({ ...patient, age: e.target.value === "" ? "" : Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
              />
            </div>
            <div>
              <FieldLabel hint="Exkl. visdomständer">Kvarv. tänder</FieldLabel>
              <input type="number" min="0" max="28" placeholder="t.ex. 24"
                value={patient.teeth}
                onChange={(e) => setPatient({ ...patient, teeth: e.target.value === "" ? "" : Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-[#CC5833] focus:ring-2 focus:ring-[#CC5833]/20 bg-white/50 text-sm"
              />
            </div>
          </div>
          <div>
            <FieldLabel hint="<10/dag → minst Grad B · ≥10/dag → Grad C">Rökning</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: "none",  label: "Icke-rökare" },
                { val: "lt10",  label: "< 10 cig/dag" },
                { val: "ge10",  label: "≥ 10 cig/dag" },
                { val: "snus",  label: "Snus / e-cig" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={patient.smoking} onClick={() => setPatient({ ...patient, smoking: o.val as PatientData["smoking"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="<53 mmol/mol → minst Grad B · ≥53 → Grad C">Diabetes (HbA1c)</FieldLabel>
            <div className="flex flex-col gap-2">
              {[
                { val: "none",         label: "Ingen diabetes" },
                { val: "controlled",   label: "HbA1c < 53 mmol/mol (< 7%)" },
                { val: "uncontrolled", label: "HbA1c ≥ 53 mmol/mol (≥ 7%)" },
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={patient.diabetes} onClick={() => setPatient({ ...patient, diabetes: o.val as PatientData["diabetes"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
