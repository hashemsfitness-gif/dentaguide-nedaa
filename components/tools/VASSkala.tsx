"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

export default function VASSkala() {
  const [value, setValue] = useState(0);

  const getColor = (v: number) => {
    if (v === 0) return "text-muted-foreground";
    if (v <= 3) return "text-green-600";
    if (v <= 6) return "text-amber-500";
    return "text-red-600";
  };

  const getLabel = (v: number) => {
    if (v === 0) return "Ingen smärta";
    if (v <= 3) return "Mild smärta";
    if (v <= 6) return "Moderat smärta";
    if (v <= 9) return "Svår smärta";
    return "Värsta tänkbara";
  };

  const getBgColor = (v: number) => {
    if (v === 0) return "bg-slate-100";
    if (v <= 3) return "bg-green-100";
    if (v <= 6) return "bg-amber-100";
    return "bg-red-100";
  };

  return (
    <div className="glass-bento p-4 flex flex-col gap-4 border-l-4 border-l-[#0D9488] bg-white/20 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#0D9488]" />
          VAS-Skala (0–10)
        </h3>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getBgColor(value)} ${getColor(value)} transition-colors`}>
          {getLabel(value)}
        </div>
      </div>

      <div className="flex flex-col gap-6 py-2">
        <div className="relative h-12 flex items-center justify-center">
          <span className={`text-5xl font-display italic transition-all duration-300 ${getColor(value)}`}>
            {value}
          </span>
          <span className="absolute bottom-0 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Visual Analogue Scale
          </span>
        </div>

        <div className="px-2">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
          />
          <div className="flex justify-between mt-2 px-1 text-[10px] font-mono text-muted-foreground font-bold">
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 h-1 rounded-full overflow-hidden opacity-30 mt-1">
        <div className="bg-green-500" />
        <div className="bg-amber-500" />
        <div className="bg-red-500" />
      </div>
    </div>
  );
}
