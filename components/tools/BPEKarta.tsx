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

function getScoreStyle(score: BPEScore): React.CSSProperties {
  switch (score) {
    case 0:
      return {
        background: "rgba(45,106,79,0.1)",
        color: "#2D6A4F",
        borderColor: "rgba(45,106,79,0.3)",
      };
    case 1:
      return {
        background: "rgba(45,106,79,0.15)",
        color: "#2D6A4F",
        borderColor: "rgba(45,106,79,0.5)",
      };
    case 2:
      return {
        background: "rgba(224,123,57,0.12)",
        color: "#CC5833",
        borderColor: "rgba(224,123,57,0.4)",
      };
    case 3:
      return {
        background: "rgba(224,123,57,0.2)",
        color: "#CC5833",
        borderColor: "#CC5833",
      };
    case 4:
      return {
        background: "rgba(193,18,31,0.12)",
        color: "#C1121F",
        borderColor: "#C1121F",
        borderStyle: "dashed",
      };
    case "X":
      return {
        background: "var(--bg-main, #F7F2EE)",
        color: "var(--text-muted, #7A7572)",
        borderColor: "var(--border-light, #EFEAE6)",
      };
    default:
      return {
        background: "var(--surface, #FCF9F8)",
        color: "var(--text-muted, #7A7572)",
        borderColor: "var(--border-light, #EFEAE6)",
      };
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

  if (max === 4) return { text: "Specialistremiss indicerat — ficka >5.5mm", color: "var(--status-danger, #C1121F)" };
  if (max === 3) return { text: "Komplex behandling — SRP + re-evaluering", color: "var(--status-warning, #E07B39)" };
  if (max === 2) return { text: "Basal parodontalbehandling — tandstenssanering", color: "#B45309" };
  if (max <= 1) return { text: "Basal munhygieninstruktion", color: "var(--status-ok, #2D6A4F)" };
  return { text: "Fyll i alla sextanter för tolkning", color: "var(--text-muted, #7A7572)" };
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
    const scoreStyle = getScoreStyle(score);

    return (
      <div key={s.id} className="relative flex flex-col items-center gap-1 w-full">
        <button
          onClick={() => setActiveSelector(isActive ? null : s.id)}
          aria-label={`${s.label} — ${s.teeth} — BPE ${score ?? "ej angiven"}`}
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: 12,
            borderWidth: 2,
            borderStyle: scoreStyle.borderStyle || "solid",
            borderColor: scoreStyle.borderColor,
            background: scoreStyle.background,
            color: scoreStyle.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: 700,
            fontSize: 20,
            transition: "all 200ms cubic-bezier(.16,1,.3,1)",
            boxShadow: isActive ? "0 0 0 2px var(--bg-main), 0 0 0 4px var(--secondary)" : "none",
            cursor: "pointer",
          }}
          className="hover:scale-105"
        >
          {score !== null ? String(score) : "?"}
        </button>
        <span className="text-[10px] font-mono text-gray-500 text-center leading-tight">
          {s.teeth}
        </span>

        {isActive && (
          <div
            className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 z-20 rounded-xl p-2 min-w-[130px] animate-in fade-in duration-200 slide-in-from-top-1"
            style={{
              background: "var(--surface, #FCF9F8)",
              border: "1px solid var(--border-light, #EFEAE6)",
              boxShadow: "0 10px 25px -5px rgba(9,27,20,0.15), 0 8px 16px -6px rgba(9,27,20,0.1)",
            }}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {SCORES.map((sc) => {
                const scStyle = getScoreStyle(sc);
                return (
                  <button
                    key={String(sc)}
                    onClick={() => setScore(s.id, sc)}
                    style={{
                      borderRadius: 8,
                      padding: "6px 0",
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono, monospace)",
                      border: `1px solid ${scStyle.borderColor || "transparent"}`,
                      background: scStyle.background,
                      color: scStyle.color,
                      cursor: "pointer",
                      transition: "transform 150ms, scale 150ms",
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    {String(sc)}
                  </button>
                );
              })}
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
          {[0, 1, 2, 3, 4].map((n) => {
            const style = getScoreStyle(n as BPEScore);
            return (
              <span
                key={n}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 9,
                  fontFamily: "var(--font-mono, monospace)",
                  padding: "2px 6px",
                  borderRadius: 99,
                  background: style.background,
                  color: style.color,
                  border: `1px solid ${style.borderColor || "transparent"}`,
                }}
              >
                {n}
              </span>
            );
          })}
          {(() => {
            const styleX = getScoreStyle("X");
            return (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 9,
                  fontFamily: "var(--font-mono, monospace)",
                  padding: "2px 6px",
                  borderRadius: 99,
                  background: styleX.background,
                  color: styleX.color,
                  border: `1px solid ${styleX.borderColor || "transparent"}`,
                }}
              >
                X
              </span>
            );
          })()}
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
