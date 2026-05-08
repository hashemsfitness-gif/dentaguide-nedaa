"use client";

import { useState } from "react";

export function ImplantatTorque() {
  const [copied, setCopied] = useState(false);

  const SYSTEM_NOTE = "Implantatskruv åtdragen enligt tillverkarens IFU. Torque-värde: [XX] Ncm. Skruvhål förslutet med teflon + komposit.";

  const systems = [
    { system: "Nobel Biocare", range: "15–35 Ncm (varierar per produkt)" },
    { system: "Straumann (BLT)", range: "35 Ncm" },
    { system: "Astra Tech EV", range: "25 Ncm" },
    { system: "Dentsply Sirona", range: "20–35 Ncm" },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SYSTEM_NOTE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-black/8 shadow-sm">
      <p
        className="text-[9px] font-mono text-[#CC5833] uppercase tracking-[0.15em] mb-3"
        aria-label="Verktyg: Implantat Torque"
      >
        Implantat Torque
      </p>

      {/* Warning — always visible */}
      <div
        className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4"
        role="alert"
        aria-label="Klinisk varning — torque"
      >
        <p className="text-xs font-bold text-red-800">
          ⚠️ Verifiera ALLTID mot tillverkarens IFU
        </p>
        <p className="text-[11px] text-red-700 mt-1 leading-relaxed">
          Generella värden kan skada implantatet permanent. Kontrollera journalen för implantatsystem.
        </p>
      </div>

      {/* Reference values */}
      <p
        className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2"
        aria-hidden="true"
      >
        Vanliga system (kontrollera IFU)
      </p>
      <ul className="space-y-1.5 mb-4" role="list" aria-label="Referensvärden — kontrollera alltid IFU">
        {systems.map(({ system, range }) => (
          <li
            key={system}
            className="flex items-center justify-between border-b border-black/5 pb-1.5 last:border-0"
          >
            <span className="text-xs text-gray-600">{system}</span>
            <span className="text-[10px] font-mono text-[#0E3B52]/70 font-semibold">
              {range}
            </span>
          </li>
        ))}
      </ul>

      {/* Copy journal note */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 bg-[#f7f2ee] hover:bg-[#efe9e3] transition-colors rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0E3B52] border border-black/8"
        aria-label="Kopiera journalanteckning för torque"
      >
        <span aria-hidden="true">{copied ? "✓" : "📋"}</span>
        {copied ? "Kopierat!" : "Kopiera journalanteckning"}
      </button>
    </div>
  );
}
