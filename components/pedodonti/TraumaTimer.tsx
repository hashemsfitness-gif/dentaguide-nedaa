"use client";

import React, { useState, useEffect } from 'react';

export default function TraumaTimer() {
  const [minutesLeft, setMinutesLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (isActive && minutesLeft > 0) {
      interval = setInterval(() => {
        setMinutesLeft((prev) => prev - 1);
      }, 60000); // Update every minute for simplicity
    } else if (minutesLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, minutesLeft]);

  const resetTimer = () => {
    setMinutesLeft(60);
    setIsActive(false);
    setStartTime(Date.now());
  };

  const getColor = () => {
    if (minutesLeft > 45) return "bg-green-500";
    if (minutesLeft > 15) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-clay">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
          ⏱️
        </div>
        <h3 className="text-lg font-bold text-slate-800">Trauma-klocka</h3>
      </div>

      <div className="text-center mb-4">
        <div className={`inline-block px-6 py-3 rounded-2xl font-black text-3xl text-white shadow-inner mb-2 ${getColor()} transition-colors duration-500`}>
          {minutesLeft} min
        </div>
        <p className="text-[11px] text-slate-500 font-medium">Kvar till 60-minutersgränsen</p>
      </div>

      <div className="space-y-2">
        {!isActive && minutesLeft === 60 ? (
          <button 
            onClick={() => setIsActive(true)}
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform"
          >
            STARTA TIDEN
          </button>
        ) : (
          <button 
            onClick={resetTimer}
            className="w-full py-2 bg-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-300 transition-colors"
          >
            NOLLSTÄLL
          </button>
        )}
      </div>

      <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
        <h4 className="text-[10px] font-bold text-red-700 uppercase mb-1">Kritiska regler:</h4>
        <ul className="text-[9px] text-red-600 space-y-1 list-disc pl-3">
          <li><strong>Permanenta tänder:</strong> Replantera inom 60 min för god prognos.</li>
          <li><strong>Primära tänder:</strong> <span className="font-bold underline">ALDRIG</span> replantera.</li>
        </ul>
      </div>

      <p className="text-[9px] text-slate-400 mt-4 italic text-center">
        Tiden räknas från olyckstillfället.
      </p>
    </div>
  );
}
