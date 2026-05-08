"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, PhoneCall, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Steg 1: Kompression",
    description: "Bita hårt på fuktade gaskompresser i 20 minuter.",
    action: "Kontrollera nu",
  },
  {
    id: 2,
    title: "Steg 2: Kontroll",
    description: "Har blödningen upphört? Om nej, gå vidare.",
    action: "Fortsatt blödning?",
  },
  {
    id: 3,
    title: "Steg 3: Hemostas",
    description: "Sutur (kryssutur), Bensax eller Cyklokapron lokalt.",
    action: "Åtgärd utförd",
  },
  {
    id: 4,
    title: "Steg 4: Mediciner",
    description: "Kontrollera Waran/NOAK. Extra försiktighet krävs.",
    action: "Läkemedel kollade",
  },
  {
    id: 5,
    title: "Steg 5: Svikt",
    description: "Vid fortsatt blödning trots åtgärder -> Remiss/112.",
    action: "Remittera/Ring",
  },
];

export default function PostopBloedning() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((s) => s !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
      if (id < steps.length) setActiveStep(id + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-primary/70">
          Blödningsprotokoll
        </h3>
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = activeStep === step.id;

          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                isCompleted
                  ? "bg-green-50/50 border-green-200/50 opacity-70"
                  : isActive
                  ? "bg-white border-[#B45309] shadow-sm"
                  : "bg-white/40 border-black/5 hover:border-[#B45309]/30"
              }`}
            >
              <div className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          isActive ? "border-[#B45309] text-[#B45309]" : "border-muted-foreground/30 text-muted-foreground/30"
                        }`}>
                          {step.id}
                        </div>
                      )}
                      <h4 className={`text-xs font-bold truncate ${
                        isActive ? "text-[#B45309]" : "text-primary"
                      }`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                {isActive && !isCompleted && (
                  <div className="mt-2 pt-2 border-t border-[#B45309]/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#B45309] uppercase tracking-tighter">
                      {step.action}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#B45309]" />
                  </div>
                )}
              </div>

              {isActive && !isCompleted && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B45309]" />
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-red-900 mb-0.5 uppercase tracking-tight">Akut svikt?</h4>
            <p className="text-[11px] text-red-800/80 leading-snug">
              Vid utebliven hemostas trots fullföljt protokoll: <strong>Ring 112</strong> eller remittera direkt till VC/Sjukhus.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
