"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Sentry from "@sentry/nextjs";
import { 
  Copy, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  RotateCcw, 
  ChevronRight,
  FileText,
  Activity,
  History
} from "lucide-react";

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

  const rawBonePct = Number(sev.bonePct);
  const rawAge = Number(patient.age);
  const bonePct = isNaN(rawBonePct) ? 0 : Math.max(0, Math.min(100, rawBonePct));
  const age = isNaN(rawAge) ? 1 : Math.max(1, Math.min(125, rawAge));

  if (sev.bonePct !== "" && patient.age !== "" && age > 0) {
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

function OptBtn({ value, current, onClick, children, fullWidth = false }: {
  value: string | boolean; current: string | boolean | null; onClick: () => void; children: React.ReactNode; fullWidth?: boolean;
}) {
  const isSelected = current === value;
  return (
    <motion.button
      whileHover={{ scale: 1.015, x: 2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      aria-pressed={isSelected}
      className={`p-3 rounded-ds-xl border-2 text-left transition-all text-sm font-bold shadow-ds-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 relative overflow-hidden ${
        isSelected
          ? "border-secondary bg-secondary/[0.07] text-secondary ring-1 ring-secondary font-extrabold shadow-accent/5"
          : "border-border-light bg-surface text-ink/70 hover:border-border-medium hover:text-ink hover:shadow-ds-md focus:border-border-medium"
      } ${fullWidth ? "w-full" : ""}`}
    >
      {isSelected && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-r-md pointer-events-none" />
      )}
      <div className="flex items-center justify-between">
        <span className="leading-tight">{children}</span>
        {isSelected && <CheckCircle2 size={14} className="shrink-0 ml-2 text-secondary" aria-hidden="true" />}
      </div>
    </motion.button>
  );
}

function ToggleRow({ checked, onChange, label, sub }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 p-3 rounded-ds-xl border-2 cursor-pointer transition-all w-full text-left shadow-ds-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 ${
        checked ? "border-secondary bg-secondary/5" : "border-border-light bg-surface hover:border-border-medium focus:border-border-medium"
      }`}
    >
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
        checked ? "bg-secondary border-secondary text-white" : "border-border-medium bg-surface"
      }`}>
        {checked && <CheckCircle2 size={12} aria-hidden="true" />}
      </div>
      <div className="flex-1">
        <span className={`text-sm font-bold block leading-tight ${checked ? "text-secondary" : "text-ink"}`}>
          {label}
        </span>
        {sub && <span className="block text-[10px] text-ink/40 font-medium mt-0.5">{sub}</span>}
      </div>
    </motion.button>
  );
}

function Card({ num, title, desc, children }: {
  num: number; title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border-light rounded-ds-2xl p-8 shadow-ds-sm hover:shadow-ds-md transition-all flex flex-col h-full group">
      <div className="mb-6 pb-4 border-b border-neutral/10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono font-bold w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center shadow-accent/20 shadow-lg">
            {num}
          </span>
          <h2 className="text-xl font-display italic text-primary font-bold tracking-tight group-hover:text-secondary transition-colors">{title}</h2>
        </div>
        <p className="text-xs text-ink/50 font-medium leading-relaxed">{desc}</p>
      </div>
      <div className="space-y-6 flex-1">{children}</div>
    </div>
  );
}

function FieldLabel({ children, hint, htmlFor, info }: { children: React.ReactNode; hint?: string; htmlFor?: string; info?: string }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-1.5 mb-1">
        <label htmlFor={htmlFor} className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest2 block cursor-pointer">
          {children}
        </label>
        {info && <InfoTooltip text={info} />}
      </div>
      {hint && <p className="text-xs text-ink/40 font-medium leading-tight">{hint}</p>}
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        aria-label="Visa definition"
        className={`p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
          isOpen 
            ? "bg-secondary/20 text-secondary scale-110" 
            : "bg-neutral text-ink/40 hover:bg-secondary/10 hover:text-secondary hover:scale-105"
        }`}
      >
        <Info size={11} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 p-3 bg-primary/80 backdrop-blur-md border border-white/20 text-surface text-[10px] font-medium leading-relaxed rounded-ds-xl z-50 shadow-ds-2xl pointer-events-none text-left"
          >
            <div className="relative z-10">{text}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/80 rotate-45 -translate-y-1.5 border-r border-b border-white/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
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
    if (complexity.mob)   ivF.push("Tandmobilitet ≥ Grad 2");
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

  const ratioBlock = (() => {
    if (severity.bonePct === "" || patient.age === "") {
      return (
        <div className="p-4 rounded-ds-xl bg-neutral/50 border border-border-light text-xs text-ink/40 font-medium italic">
          ⏳ Fyll i ålder + benförlust % för automatisk kvot-beräkning.
        </div>
      );
    }
    const ratio = Number(severity.bonePct) / Number(patient.age);
    let cls = "bg-status-ok/5 border-status-ok/20 text-status-ok";
    let icon = "✅"; let gradeTxt = "Grad A";
    if (ratio >= 0.25 && ratio <= 1.0) { cls = "bg-status-warning/5 border-status-warning/20 text-status-warning"; icon = "⚠️"; gradeTxt = "Grad B"; }
    if (ratio > 1.0)                   { cls = "bg-status-danger/5 border-status-danger/20 text-status-danger";       icon = "🔴"; gradeTxt = "Grad C"; }
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-4 rounded-ds-xl border-2 text-xs font-bold ${cls}`}
      >
        <p className="text-[10px] font-mono uppercase tracking-widest2 mb-1 opacity-70 text-current">Benförlust/ålder-kvot</p>
        <div className="flex items-center gap-2 text-sm font-body">
          {icon} {ratio.toFixed(2)} ({severity.bonePct}% / {patient.age}år) → {gradeTxt}
        </div>
      </motion.div>
    );
  })();

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
      <section className="flex-1 min-w-0 grid grid-cols-1 xl:grid-cols-2 gap-8 content-start">
        <Card num={1} title="Inklusionsscreening" desc="Båda kriterier krävs. Minst 2 icke-angränsande tänder. Visdomständer exkluderas.">
          <div>
            <FieldLabel hint="Föreligger BoP på >2 icke-angränsande tänder?">Kriterium 1 — BoP</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <OptBtn value="yes" current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "yes" })}>Ja — &gt;2 approximala ytor</OptBtn>
              <OptBtn value="no"  current={inclusion.bop} onClick={() => setInclusion({ ...inclusion, bop: "no"  })}>Nej</OptBtn>
            </div>
          </div>
          <div>
            <FieldLabel hint="PPD ≥4mm med BoP eller CAL på >2 approximala ytor?">Kriterium 2 — Approximala fickor</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <OptBtn value="yes" current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "yes" })}>Ja — &gt;2 approximala ytor</OptBtn>
              <OptBtn value="no"  current={inclusion.pocket} onClick={() => setInclusion({ ...inclusion, pocket: "no"  })}>Nej</OptBtn>
            </div>
          </div>
        </Card>

        <Card num={2} title="Svårighetsgrad" desc="Välj det VÄRSTA uppmätta värdet för hela bettet (CAL + benförlust + tandförlust).">
          <div>
            <FieldLabel info="Clinical Attachment Loss: Avståndet från emalj-cementgränsen (CEJ) till fickans botten.">Klinisk fästeförlust (CAL)</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ val: "1", label: "1–2 mm" }, { val: "2", label: "3–4 mm" }, { val: "3", label: "≥ 5 mm" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={severity.cal} onClick={() => setSeverity({ ...severity, cal: o.val as SeverityData["cal"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="Andel av rotlängd">Radiografisk benförlust</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ val: "1", label: "< 15%" }, { val: "2", label: "15–33%" }, { val: "3", label: "> 33%" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={severity.bone} onClick={() => setSeverity({ ...severity, bone: o.val as SeverityData["bone"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="Tandförlust p.g.a. parodontit">Tandförlust</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ val: "0", label: "Ingen" }, { val: "3", label: "≤ 4 tänder" }, { val: "4", label: "≥ 5 tänder" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={severity.toothloss} onClick={() => setSeverity({ ...severity, toothloss: o.val as SeverityData["toothloss"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
        </Card>

        <Card num={3} title="Komplexitet" desc="PPD, angulära defekter, furkation + Stadie IV-faktorer (kryssa allt som gäller).">
          <div>
            <FieldLabel info="Probing Pocket Depth: Avståndet från tandköttskanten till fickans botten vid sondering.">Max PPD — djupaste fickan</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ val: "1", label: "≤ 4 mm" }, { val: "2", label: "≤ 5 mm" }, { val: "3", label: "≥ 6 mm" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={complexity.ppd} onClick={() => setComplexity({ ...complexity, ppd: o.val as ComplexityData["ppd"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel info="Vertikal benförlust längs en tandsida som skapar en 'ficka' i käkbenet.">Angulära bendefekter</FieldLabel>
              <div className="grid grid-cols-1 gap-2">
                <OptBtn value="0" current={complexity.angular} onClick={() => setComplexity({ ...complexity, angular: "0" })}>Inga / &lt; 3 mm</OptBtn>
                <OptBtn value="3" current={complexity.angular} onClick={() => setComplexity({ ...complexity, angular: "3" })}>≥ 3 mm</OptBtn>
              </div>
            </div>
            <div>
              <FieldLabel>Furkationsinvolvering<InfoTooltip text="Benförlust mellan rötterna på en flerrotig tand (t.ex. molarer). Grad I-III." /></FieldLabel>
              <div className="grid grid-cols-1 gap-2">
                <OptBtn value="0" current={complexity.furk} onClick={() => setComplexity({ ...complexity, furk: "0" })}>Ingen / Grad I</OptBtn>
                <OptBtn value="3" current={complexity.furk} onClick={() => setComplexity({ ...complexity, furk: "3" })}>Grad II</OptBtn>
                <OptBtn value="3b" current={complexity.furk} onClick={() => setComplexity({ ...complexity, furk: "3b" })}>Grad III</OptBtn>
              </div>
            </div>
          </div>
          <div>
            <FieldLabel hint="Minst ett kryss → Stadie IV">Stadie IV-faktorer</FieldLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ToggleRow checked={complexity.chew}  onChange={(v) => setComplexity({ ...complexity, chew: v  })} label="Nedsatt tuggfunktion" />
              <ToggleRow checked={complexity.mob}   onChange={(v) => setComplexity({ ...complexity, mob: v   })} label="Tandmobilitet ≥ Grad 2" />
              <ToggleRow checked={complexity.bite}  onChange={(v) => setComplexity({ ...complexity, bite: v  })} label="Bettkollaps" />
              <ToggleRow checked={complexity.drift} onChange={(v) => setComplexity({ ...complexity, drift: v })} label="Tandvandring / fläktning" />
              <ToggleRow checked={complexity.few}   onChange={(v) => setComplexity({ ...complexity, few: v   })} label="< 20 tänder / < 10 antagonistpar" />
            </div>
          </div>
        </Card>

        <Card num={4} title="Utbredning & hygien" desc="Andel tänder med parodontit + munhygienstatus (BoP% + plack%).">
          <div>
            <FieldLabel>Utbredning</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <OptBtn value="lok" current={extentData.extent} onClick={() => setExtentData({ ...extentData, extent: "lok" })}>Lokaliserad (&lt; 30%)</OptBtn>
              <OptBtn value="gen" current={extentData.extent} onClick={() => setExtentData({ ...extentData, extent: "gen" })}>Generaliserad (≥ 30%)</OptBtn>
              <OptBtn value="mol" current={extentData.extent} onClick={() => setExtentData({ ...extentData, extent: "mol" })}>Molar/Incisiv-mönster</OptBtn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>BoP %</FieldLabel>
              <input type="number" placeholder="t.ex. 45" value={extentData.bop} onChange={(e) => setExtentData({ ...extentData, bop: e.target.value === "" ? "" : Math.max(0, Math.min(100, Number(e.target.value))) })} className="w-full p-3 rounded-ds-xl border-2 border-border-light focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface text-sm font-bold outline-none transition-all" />
            </div>
            <div>
              <FieldLabel>Plack %</FieldLabel>
              <input type="number" placeholder="t.ex. 35" value={extentData.plaque} onChange={(e) => setExtentData({ ...extentData, plaque: e.target.value === "" ? "" : Math.max(0, Math.min(100, Number(e.target.value))) })} className="w-full p-3 rounded-ds-xl border-2 border-border-light focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface text-sm font-bold outline-none transition-all" />
            </div>
          </div>
          {grade && (
            <div className="p-4 rounded-ds-2xl bg-primary/5 border border-primary/10 text-primary font-bold text-sm flex items-center gap-2">
              <Activity size={18} className="text-secondary" />
              Stödbehandling: {supportInterval}
            </div>
          )}
        </Card>

        <Card num={5} title="Progression / Prognosgradering" desc="Direkt bevis väger tyngst. Saknas data → använd indirekt bedömning + kvot.">
          <div>
            <FieldLabel>Direkt bevis</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <OptBtn value="none" current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: "none" })}>Saknas data</OptBtn>
              <OptBtn value="A" current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: "A" })}>Ingen prog. (5 år)</OptBtn>
              <OptBtn value="B" current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: "B" })}>&lt; 2 mm (5 år)</OptBtn>
              <OptBtn value="C" current={gradeData.direct} onClick={() => setGradeData({ ...gradeData, direct: "C" })}>≥ 2 mm (5 år)</OptBtn>
            </div>
          </div>
          <div>
            <FieldLabel>Fenotyp (indirekt bedömning)</FieldLabel>
            <div className="grid grid-cols-3 gap-2">
              {[{ val: "A", label: "Grad A" }, { val: "B", label: "Grad B" }, { val: "C", label: "Grad C" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={gradeData.phenotype} onClick={() => setGradeData({ ...gradeData, phenotype: o.val as GradeData["phenotype"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
        </Card>

        <Card num={6} title="Rökning & diabetes" desc="Modifierande riskfaktorer som uppgraderar Grade. Ålder + antal tänder används för Grade-kvot.">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel htmlFor="paro-age">Ålder</FieldLabel>
              <input id="paro-age" type="number" placeholder="t.ex. 45" value={patient.age} onChange={(e) => setPatient({ ...patient, age: e.target.value === "" ? "" : Math.max(1, Math.min(125, Number(e.target.value))) })} className="w-full p-3 rounded-ds-xl border-2 border-border-light focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface text-sm font-bold outline-none transition-all" />
            </div>
            <div>
              <FieldLabel htmlFor="paro-bone-pct" hint="Värsta site, %">Benförlust %</FieldLabel>
              <input id="paro-bone-pct" type="number" placeholder="t.ex. 30" value={severity.bonePct} onChange={(e) => setSeverity({ ...severity, bonePct: e.target.value === "" ? "" : Math.max(0, Math.min(100, Number(e.target.value))) })} className="w-full p-3 rounded-ds-xl border-2 border-border-light focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface text-sm font-bold outline-none transition-all" />
            </div>
          </div>
          {ratioBlock}
          <div>
            <FieldLabel hint="<10/dag → Grad B · ≥10/dag → Grad C">Rökning</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              {[{ val: "none", label: "Icke-rökare" }, { val: "lt10", label: "< 10 cig/dag" }, { val: "ge10", label: "≥ 10 cig/dag" }, { val: "snus", label: "Snus / e-cig" }].map(o => (
                <OptBtn key={o.val} value={o.val} current={patient.smoking} onClick={() => setPatient({ ...patient, smoking: o.val as PatientData["smoking"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel hint="HbA1c < 53 → Grad B · ≥ 53 → Grad C">Diabetes</FieldLabel>
            <div className="grid grid-cols-1 gap-2">
              {[
                { val: "none", label: "Ingen diabetes" },
                { val: "controlled", label: "HbA1c < 53 mmol/mol (Grad B)" },
                { val: "uncontrolled", label: "HbA1c ≥ 53 mmol/mol (Grad C)" }
              ].map(o => (
                <OptBtn key={o.val} value={o.val} current={patient.diabetes} onClick={() => setPatient({ ...patient, diabetes: o.val as PatientData["diabetes"] })}>{o.label}</OptBtn>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <aside id="result-panel" className="w-full lg:w-[380px] lg:flex-shrink-0 lg:sticky lg:top-4 lg:h-fit">
        <div className="bg-surface border border-border-light rounded-ds-2xl p-6 shadow-ds-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[60px] pointer-events-none" />
          
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral/10 relative z-10">
            <div className="flex items-center gap-2">
              <Activity className="text-secondary" size={22} />
              <h3 className="font-display italic text-xl text-primary font-bold">Klassifikation</h3>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-ink/30 hover:text-status-danger transition-colors bg-neutral/50 px-3 py-1.5 rounded-ds-pill tracking-widest2 uppercase"
              type="button"
            >
              <RotateCcw size={14} /> Återställ
            </button>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="text-center p-6 rounded-ds-xl bg-gradient-to-tr from-primary via-primary to-primary-container text-surface shadow-ds-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 pointer-events-none" />
              <p className="text-[10px] font-mono text-surface/40 uppercase tracking-widest2 mb-2 relative z-10">EFP/AAP 2018</p>
              <AnimatePresence mode="wait">
                {stage > 0 && grade ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display italic text-2xl font-bold leading-tight relative z-10 tracking-tight"
                  >
                    {extentData.extent ? getExtentLabel(extentData.extent).split(" ")[0] + " p" : "P"}arodontit<br />
                    stadie {toRoman(stage)} grad {grade}
                  </motion.div>
                ) : (
                  <motion.p 
                    key="empty"
                    className="text-sm text-surface/40 italic relative z-10"
                  >
                    Fyll i kort 1–6 för klassifikation
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-neutral/30 p-4 rounded-ds-xl border border-border-light">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono font-bold text-ink/30 uppercase tracking-widest2">Stadie</span>
                <span className="font-display font-bold text-primary text-lg">{stage > 0 ? toRoman(stage) : "—"}</span>
              </div>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`flex-1 h-3 rounded-ds-pill transition-all duration-500 ${stage >= i ? ["", "bg-status-ok", "bg-status-warning", "bg-status-warning", "bg-status-danger"][i] : "bg-surface border border-border-light"}`} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono font-bold text-ink/20"><span>I</span><span>II</span><span>III</span><span>IV</span></div>
            </div>

            <div className="bg-neutral/30 p-4 rounded-ds-xl border border-border-light">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono font-bold text-ink/30 uppercase tracking-widest2">Grad</span>
                <span className="font-display font-bold text-primary text-lg">{grade ? grade : "—"}</span>
              </div>
              <div className="flex gap-2 mb-2">
                {(["A", "B", "C"] as const).map((g, i) => (
                  <div key={g} className={`flex-1 h-3 rounded-ds-pill transition-all duration-500 ${grade && ["A", "B", "C"].indexOf(grade) >= i ? ["bg-status-ok", "bg-status-warning", "bg-status-danger"][i] : "bg-surface border border-border-light"}`} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono font-bold text-ink/20"><span>A</span><span>B</span><span>C</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-neutral/30 rounded-ds-lg border border-border-light text-center">
                <span className="block text-[8px] font-mono font-bold text-ink/30 uppercase mb-1 tracking-widest2">Utbredning</span>
                <span className="text-xs font-bold text-primary">{extentLabel}</span>
              </div>
              <div className="p-3 bg-neutral/30 rounded-ds-lg border border-border-light text-center">
                <span className="block text-[8px] font-mono font-bold text-ink/30 uppercase mb-1 tracking-widest2">Stödbehandling</span>
                <span className="text-xs font-bold text-secondary">{supportInterval}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono font-bold text-ink/30 uppercase tracking-widest2">Journalmall</span>
                <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors bg-secondary/5 px-4 py-2 rounded-ds-xl" type="button">
                  <Copy size={14} /> Kopiera
                </button>
              </div>
              <div className="font-mono text-[10px] text-ink/60 whitespace-pre-wrap bg-neutral/30 p-4 rounded-ds-xl border border-border-light leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                {buildJournal()}
              </div>
            </div>

            <div className="p-4 bg-status-warning/10 rounded-ds-xl border border-status-warning/20 flex items-start gap-3">
              <AlertTriangle size={16} className="text-status-warning shrink-0 mt-0.5" />
              <p className="text-[10px] text-status-warning/80 font-medium leading-normal">
                Utvärdera alltid patientens compliance och systemiska hälsa. Stadie IV kräver ofta tvärfacklig bedömning.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Floating Mobile Action Bar */}
      <AnimatePresence>
        {stage > 0 && grade && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
          >
            <div className="bg-primary text-surface p-4 rounded-ds-2xl shadow-ds-xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[8px] font-mono text-surface/40 uppercase tracking-widest2 mb-0.5">Diagnos</p>
                <p className="text-sm font-display italic font-bold">
                   {toRoman(stage)}: {grade} — {getExtentLabel(extentData.extent)}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => document.getElementById('result-panel')?.scrollIntoView({ behavior: 'smooth' })}
                  className="p-2 bg-white/10 rounded-ds-lg text-surface hover:bg-white/20 transition-colors"
                >
                  <Activity size={18} />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-surface rounded-ds-pill font-bold text-xs"
                >
                  <Copy size={14} /> Kopiera
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
