"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function DCTMDScreening() {
  const [answers, setAnswers] = useState<boolean[]>([false, false, false]);

  const toggleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };

  const isPositive = answers.some((a) => a === true);

  const questions = [
    {
      id: "S1",
      text: "Har du haft smärta i tinning, käkled eller käke en gång i veckan eller mer under de senaste 3 månaderna?",
    },
    {
      id: "S2",
      text: "Har du haft smärta som förändras när du gapar eller tuggar en gång i veckan eller mer under de senaste 3 månaderna?",
    },
    {
      id: "S3",
      text: "Har du haft låsningar eller fastnat med käken så att du inte kunnat gapa stort?",
    },
  ];

  return (
    <div className="glass-bento p-4 flex flex-col gap-4 border-l-4 border-l-[#0D9488] bg-white/20 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#0D9488]" />
          DC/TMD Screening (3Q)
        </h3>
        {isPositive ? (
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">
            POSITIV
          </span>
        ) : (
          <span className="text-[10px] font-bold text-[#0D9488] bg-[#0D9488]/5 px-2 py-0.5 rounded border border-[#0D9488]/10">
            NEGATIV
          </span>
        )}
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => toggleAnswer(idx)}
            className={`w-full text-left p-3 rounded-lg border transition-all flex gap-3 ${
              answers[idx]
                ? "bg-red-50/50 border-red-200 ring-1 ring-red-100"
                : "bg-white/50 border-black/5 hover:border-[#0D9488]/30"
            }`}
          >
            <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              answers[idx] ? "bg-red-500 border-red-500" : "bg-white border-black/10"
            }`}>
              {answers[idx] && <CheckCircle2 className="w-3 h-3 text-white" />}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold text-muted-foreground">FRÅGA {q.id}</span>
              <p className="text-xs font-medium leading-relaxed">{q.text}</p>
            </div>
          </button>
        ))}
      </div>

      {isPositive && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium text-amber-800 leading-tight">
            Vid positiv screening rekommenderas fördjupad DC/TMD-undersökning (smärtteckning, palpation, rörelseomfång).
          </p>
        </div>
      )}
    </div>
  );
}
