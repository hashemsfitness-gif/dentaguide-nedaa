"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

type BPEScore = 0 | 1 | 2 | 3 | 4 | "X" | null;

interface SextantDef {
  id: string;
  teeth: string;
  label: string;
  jaw: "upper" | "lower";
}

const SEXTANTS: SextantDef[] = [
  { id: "UR", teeth: "17–14", label: "Övre Höger", jaw: "upper" },
  { id: "UF", teeth: "13–23", label: "Övre Front", jaw: "upper" },
  { id: "UL", teeth: "24–27", label: "Övre Vänster", jaw: "upper" },
  { id: "LR", teeth: "47–44", label: "Undre Höger", jaw: "lower" },
  { id: "LF", teeth: "43–33", label: "Undre Front", jaw: "lower" },
  { id: "LL", teeth: "34–37", label: "Undre Vänster", jaw: "lower" },
];

const SCORES: Array<BPEScore> = [0, 1, 2, 3, 4, "X"];

function getScoreColor(score: BPEScore): string {
  switch (score) {
    case 0: return "bg-green-500 text-white";
    case 1: return "bg-green-400 text-white";
    case 2: return "bg-yellow-400 text-gray-900";
    case 3: return "bg-orange-400 text-white";
    case 4: return "bg-red-500 text-white";
    case "X": return "bg-gray-400 text-white";
    default: return "bg-gray-200 text-gray-500";
  }
}

function getScoreBorder(score: BPEScore): string {
  switch (score) {
    case 0: return "border-green-500";
    case 1: return "border-green-400";
    case 2: return "border-yellow-400";
    case 3: return "border-orange-400";
    case 4: return "border-red-500";
    case "X": return "border-gray-400";
    default: return "border-gray-300";
  }
}

function getScoreLabel(score: BPEScore): string {
  switch (score) {
    case 0: return "Frisk — ingen blödning, inga fickor";
    case 1: return "Blödning vid sondering (BOP +)";
    case 2: return "Calculus — ficka <3.5mm";
    case 3: return "Ficka 3.5–5.5mm — komplex behandling";
    case 4: return "Ficka >5.5mm — specialistremiss";
    case "X": return "Utesluten sextant (<2 tänder)";
    default: return "Ej registrerad";
  }
}

function getInterpretation(scores: Record<string, BPEScore>): {
  text: string;
  color: string;
} {
  const values = Object.values(scores).filter((s) => s !== null && s !== "X") as number[];
  const max = values.length > 0 ? Math.max(...values) : -1;

  if (max === 4) return { text: "Specialistremiss indicerat — ficka >5.5mm", color: "text-red-600" };
  if (max === 3) return { text: "Komplex behandling — SRP + re-evaluering", color: "text-orange-600" };
  if (max === 2) return { text: "Basal parodontalbehandling — tandstenssanering", color: "text-yellow-700" };
  if (max <= 1) return { text: "Basal munhygieninstruktion", color: "text-green-700" };
  return { text: "Fyll i alla sextanter för tolkning", color: "text-gray-500" };
}

export default function BPEKarta() {
  const [scores, setScores] = useState<Record<string, BPEScore>>({
    UR: null, UF: null, UL: null,
    LR: null, LF: null, LL: null,
  });
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const setScore = (sextantId: string, score: BPEScore) => {
    setScores((prev) => ({ ...prev, [sextantId]: score }));
    setActiveSelector(null);
  };

  const copyResult = async () => {
    const upper = [scores.UR, scores.UF, scores.UL].map((s) => (s === null ? "–" : String(s)));
    const lower = [scores.LR, scores.LF, scores.LL].map((s) => (s === null ? "–" : String(s)));
    const text =
      `BPE-registrering:\n` +
      `Överkäke:  [${upper.join("] [")}]\n` +
      `Underkäke: [${lower.join("] [")}]\n` +
      `Tolkning: ${getInterpretation(scores).text}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      Sentry.captureException(err);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const interpretation = getInterpretation(scores);
  const upperSextants = SEXTANTS.filter((s) => s.jaw === "upper");
  const lowerSextants = SEXTANTS.filter((s) => s.jaw === "lower");

  const renderSextant = (s: SextantDef) => {
    const score = scores[s.id];
    const isActive = activeSelector === s.id;
    return (
      <div key={s.id} className="relative flex flex-col items-center gap-1">
        <button
          onClick={() => setActiveSelector(isActive ? null : s.id)}
          aria-label={`${s.label} — ${s.teeth} — BPE ${score ?? "ej angiven"}`}
          className={`
            w-full aspect-square rounded-xl border-2 flex items-center justify-center
            font-mono font-bold text-xl transition-all duration-200
            ${score !== null ? getScoreColor(score) + " " + getScoreBorder(score) : "bg-gray-100 border-gray-300 text-gray-400"}
            ${isActive ? "ring-2 ring-offset-1 ring-[#CC5833]" : "hover:scale-105"}
          `}
        >
          {score !== null ? String(score) : "?"}
        </button>
        <span className="text-[10px] font-mono text-gray-500 text-center leading-tight">
          {s.teeth}
        </span>

        {isActive && (
          <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-20 bg-white border border-gray-200 rounded-xl shadow-xl p-2 min-w-[120px]">
            <div className="grid grid-cols-3 gap-1.5">
              {SCORES.map((sc) => (
                <button
                  key={String(sc)}
                  onClick={() => setScore(s.id, sc)}
                  className={`
                    rounded-lg py-1.5 text-sm font-bold transition-all
                    ${getScoreColor(sc)}
                    hover:scale-105 active:scale-95
                  `}
                >
                  {String(sc)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">BPE-karta</span>
        <button
          onClick={copyResult}
          className="text-xs font-mono text-[#CC5833] hover:text-[#a84429] transition-colors"
          aria-label="Kopiera BPE-resultat"
        >
          {copied ? "✓ Kopierat" : "Kopiera"}
        </button>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">ÖVERKÄKE</div>
        <div className="grid grid-cols-3 gap-2">
          {upperSextants.map(renderSextant)}
        </div>
        <div className="border-t border-dashed border-gray-300 my-2" />
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">UNDERKÄKE</div>
        <div className="grid grid-cols-3 gap-2">
          {lowerSextants.map(renderSextant)}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className={`inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full ${getScoreColor(n as BPEScore)}`}>
              {n}
            </span>
          ))}
          <span className={`inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full ${getScoreColor("X")}`}>X</span>
        </div>
        <p className={`text-xs font-medium ${interpretation.color} leading-tight`}>
          {interpretation.text}
        </p>
      </div>

      {Object.values(scores).some((s) => s !== null) && (
        <button
          onClick={() => setScores({ UR: null, UF: null, UL: null, LR: null, LF: null, LL: null })}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Återställ
        </button>
      )}

      <div className="text-[9px] text-gray-400 leading-relaxed border-t border-gray-100 pt-2">
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {SCORES.filter((s) => s !== "X").map((sc) => (
            <span key={String(sc)}>
              <strong>{String(sc)}</strong>: {getScoreLabel(sc).split("—")[1]?.trim().split(" ").slice(0, 3).join(" ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
