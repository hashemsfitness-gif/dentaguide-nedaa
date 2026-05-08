"use client";

import { useState } from "react";

export function FerruleKalkylator() {
  const [mm, setMm] = useState<string>("");

  const parsed = mm !== "" ? parseFloat(mm) : null;

  const result =
    parsed !== null
      ? parsed >= 2
        ? {
            ok: true,
            text: "✓ Ferrule OK (≥ 2mm) — Krona möjlig",
            sub: "Tillräcklig tandsubstans för ferrule-effekten.",
          }
        : {
            ok: false,
            text: "✗ Ferrule otillräcklig (< 2mm)",
            sub: "Kontraindicerat att cementera. Kronförlängning eller extraktion krävs.",
          }
      : null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-black/8 shadow-sm">
      <p
        className="text-[9px] font-mono text-[#CC5833] uppercase tracking-[0.15em] mb-2"
        aria-label="Verktyg: Ferrule-validator"
      >
        Ferrule-Validator
      </p>

      <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
        Minst <strong>2mm</strong> supragingivalt frisk tandsubstans krävs (ferrule-effekten). Mät runt hela omkretsen.
      </p>

      <div className="flex gap-2 items-center mb-3">
        <label htmlFor="ferrule-input" className="sr-only">
          Supragingivalt mätt i mm
        </label>
        <input
          id="ferrule-input"
          type="number"
          value={mm}
          onChange={(e) => setMm(e.target.value)}
          placeholder="mm"
          className="w-20 text-center text-base font-mono font-bold bg-[#f7f2ee] border border-black/10 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC5833]/30"
          step="0.5"
          min="0"
          max="15"
          aria-label="Ferrule mätvärde i millimeter"
        />
        <span className="text-xs text-gray-500 font-medium">mm supragingivalt</span>
      </div>

      {result && (
        <div
          className={`rounded-xl p-3 text-sm font-bold ${
            result.ok
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="status"
          aria-live="polite"
          aria-label={`Ferrule-resultat: ${result.text}`}
        >
          {result.text}
        </div>
      )}

      {result && !result.ok && (
        <p className="text-[11px] text-red-700 mt-2 leading-relaxed font-medium">
          → {result.sub}
        </p>
      )}

      {result && result.ok && (
        <p className="text-[11px] text-green-700 mt-2 leading-relaxed font-medium">
          → {result.sub}
        </p>
      )}

      {mm === "" && (
        <p className="text-[10px] text-gray-400 mt-3 font-mono">
          Ange mätvärde ovan för bedömning.
        </p>
      )}
    </div>
  );
}
