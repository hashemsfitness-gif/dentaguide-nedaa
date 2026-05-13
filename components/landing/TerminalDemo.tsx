'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type StreamLine = {
  text: string;
  cls: string;
  speed: number;
  pre?: number;
  prompt?: boolean;
};

const LINES: StreamLine[] = [
  { text: '> INITIERAR KLINISK ANALYS...', cls: 'text-emerald-400', speed: 22 },
  { text: 'Anamnes: molande värk tand 36, spontan, nattvärk.', cls: 'text-emerald-100/80', speed: 14, pre: 350 },
  { text: 'Status: perkussion positiv, kyla neg, el.test neg.', cls: 'text-emerald-100/80', speed: 14, pre: 250 },
  { text: 'Röntgen: vidgad periapikal spalt 36.', cls: 'text-amber-300', speed: 14, pre: 280 },
  { text: '> SÖKER I KLINISK DATABAS...', cls: 'text-emerald-400 mt-3', speed: 22, pre: 500 },
  { text: 'Matchning: pulpanekros + apikal parodontit (n = 12).', cls: 'text-sky-300', speed: 14, pre: 600 },
  { text: '> KORSREFERENS · STRAMA 2024 · LMV-DATABAS', cls: 'text-emerald-400', speed: 18, pre: 350 },
  { text: '▸ DIAGNOSFÖRSLAG: K04.1 — Rotbehandling indicerad.', cls: 'text-[#FF7E55] font-semibold mt-3', speed: 20, pre: 500 },
  { text: '▸ ANTIBIOTIKA: ej indicerat (Strama 2024).', cls: 'text-[#FF7E55] font-semibold', speed: 18, pre: 300 },
  { text: '$', cls: 'text-emerald-100/60 pt-2', speed: 0, pre: 400, prompt: true },
];

export default function TerminalDemo({ targetHref }: { targetHref: string }) {
  const streamRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = streamRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStarted(true);
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const stream = streamRef.current;
    if (!stream) return;

    let cancelled = false;

    function makeCursor() {
      const c = document.createElement('span');
      c.className = 'terminal-cursor ml-1';
      return c;
    }

    function typeLine(line: StreamLine): Promise<void> {
      return new Promise((resolve) => {
        if (cancelled || !stream) return resolve();
        const p = document.createElement('p');
        p.className = line.cls;
        stream.appendChild(p);
        if (line.prompt) {
          p.textContent = line.text + ' ';
          p.appendChild(makeCursor());
          setTimeout(resolve, 200);
          return;
        }
        const cursor = makeCursor();
        p.appendChild(cursor);
        let i = 0;
        const iv = setInterval(() => {
          if (cancelled) {
            clearInterval(iv);
            return resolve();
          }
          i++;
          p.textContent = line.text.slice(0, i);
          p.appendChild(cursor);
          if (i >= line.text.length) {
            clearInterval(iv);
            cursor.remove();
            resolve();
          }
        }, line.speed);
      });
    }

    async function run() {
      while (!cancelled) {
        if (!stream) return;
        stream.innerHTML = '';
        for (const line of LINES) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, line.pre || 0));
          if (cancelled) return;
          await typeLine(line);
        }
        await new Promise((r) => setTimeout(r, 2400));
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [started]);

  return (
    <div className="terminal">
      <div className="relative z-10 flex items-center justify-between mb-7">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[9px] tracking-widest2 uppercase text-emerald-200/40">
          dentaguide-ai · v2.4
        </span>
      </div>

      <h3 className="relative z-10 text-white font-display text-[24px] mb-6">
        Digital status<span className="text-emerald-400 font-mono text-sm ml-2 opacity-60">_</span>
      </h3>

      <div
        ref={streamRef}
        className="relative z-10 space-y-2.5 text-[12px] leading-relaxed min-h-[260px]"
      />

      <Link
        href={targetHref}
        className="relative z-10 mt-7 inline-flex items-center justify-between w-full bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-800/50 rounded-xl px-5 py-3 transition-colors"
      >
        <span className="text-emerald-200 text-[11px] tracking-widest2 font-mono">
          ÖPPNA INTERAKTIV JOURNALMALL
        </span>
        <span className="text-emerald-300" aria-hidden>→</span>
      </Link>
    </div>
  );
}
