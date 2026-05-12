'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { lakemedelData } from "@/lib/lakemedelData";

// ──────────────────────────────────────────────────────────────
// TERMINAL CARD — Live typewriter animation
// ──────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: '> INITIERAR KLINISK ANALYS...', color: 'text-green-400', delay: 0 },
  { text: 'Anamnes: Molande värk tand 36, spontan, nattvärk.', color: 'text-green-200', delay: 900 },
  { text: 'Status: Perkussion positiv, kyla neg.', color: 'text-green-200', delay: 2200 },
  { text: 'Röntgen: Vidgad periapikal spalt 36.', color: 'text-amber-400', delay: 3600 },
  { text: '> SÖKER I KLINISK DATABAS...', color: 'text-green-400', delay: 5100 },
  { text: 'Matchning: Pulpanekros + apikal parodontit.', color: 'text-blue-300', delay: 6200 },
  { text: '> DIAGNOSFÖRSLAG: K04.1 — Rotbehandling indicerad.', color: 'text-secondary', delay: 7600 },
];

function useTypewriter(text: string, startDelay: number, charSpeed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let timeout: ReturnType<typeof setTimeout>;
    let charIdx = 0;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        charIdx++;
        setDisplayed(text.slice(0, charIdx));
        if (charIdx >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, charSpeed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, startDelay]);

  return { displayed, done };
}

function TerminalLine({ line, globalStart }: { line: typeof TERMINAL_LINES[0], globalStart: number }) {
  const { displayed } = useTypewriter(line.text, Math.max(0, line.delay - globalStart));
  return (
    <p className={`${line.color} font-mono text-[11px] leading-relaxed min-h-[1.4em]`}>
      {displayed}
    </p>
  );
}

function TerminalCard() {
  const [epoch, setEpoch] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const totalDuration = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay + 2000;

  // Start when in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Loop: restart after full sequence
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setEpoch(e => e + 1), totalDuration + 1500);
    return () => clearTimeout(t);
  }, [started, epoch, totalDuration]);

  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#0d1117] rounded-3xl p-7 text-green-400 lg:col-span-1 lg:row-span-2 font-mono flex flex-col relative shadow-2xl overflow-hidden border border-green-900/30"
    >
      {/* Scan-line overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #00ff00 0px, transparent 1px, transparent 3px)' }}
      />

      {/* Title bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500">dentaguide-ai v2.4</span>
      </div>

      <h3 className="text-white text-2xl font-bold mb-5 tracking-tight">
        Digital Status<span className="text-green-400 text-sm font-mono ml-2 opacity-60">_</span>
      </h3>

      {/* Typewriter lines */}
      <div key={epoch} className="space-y-2.5 flex-1 overflow-hidden">
        {started && TERMINAL_LINES.map((line, i) => (
          <TerminalLine key={`${epoch}-${i}`} line={line} globalStart={0} />
        ))}
        {!started && (
          <p className="text-green-600 text-[11px]">Väntar på initiering...</p>
        )}
      </div>

      {/* Blinking cursor at bottom */}
      <div className="mt-4 flex items-center gap-1">
        <span className="text-green-400 text-[11px]">$</span>
        <span
          className="inline-block w-2 h-4 bg-green-400"
          style={{ opacity: cursor ? 1 : 0, transition: 'opacity 0.1s' }}
        />
      </div>

      <Link href="/login">
        <Button className="w-full bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-800/50 mt-4 rounded-xl text-xs tracking-widest font-mono transition-colors">
          INTERAKTIV JOURNALMALL →
        </Button>
      </Link>
    </div>
  );
}


// Scroll-följande karaktär — tänkande hjärna permanent under hela sidan
function ScrollCharacter() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.3, rotate: 5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Tillbaka till toppen"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/characters/think.gif"
        alt="DentaGuide-Pro AI — tänkande hjärna"
        className="w-24 h-24 object-contain drop-shadow-lg"
      />
    </motion.div>
  );
}

const featuredDrugs = lakemedelData.filter(d =>
  ['waran', 'noak', 'bisfosfonat', 'betablockerare', 'antidepressiva'].includes(d.id)
);

export default function LandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-dark-bg text-slate-100 font-body selection:bg-secondary selection:text-white">
      {/* BACKGROUND GRAIN OVERLAY — intern SVG via globals.css .noise-overlay */}
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-dark-bg/80 border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo-hexagon-dark.png"
              alt="DentaGuide-Pro Logo"
              width={44}
              height={44}
              className="w-11 h-11 rounded-xl object-cover"
              style={{ backgroundColor: '#0d4a65' }}
            />
            <span className="font-serif italic text-2xl tracking-wide text-white">
              DentaGuide<span className="text-secondary font-body not-italic text-sm align-top ml-1">PRO</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#verktyg" className="hover:text-secondary transition-colors">Verktyg</Link>
            <Link href="#priser" className="hover:text-secondary transition-colors">Priser</Link>
            <Link href="/om-oss" className="hover:text-secondary transition-colors">Klinisk Data</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Logga in</Link>
            <Button className="bg-secondary hover:bg-accent-hover text-white rounded-full px-6 border-none">
              Kom igång
            </Button>
          </div>
        </div>
      </header>

      <main ref={containerRef}>
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-header-from to-dark-bg">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Vänster Kolumn: Text & Stats */}
              <div className="space-y-10 z-10">
                <h1 className="font-serif text-5xl md:text-7xl leading-tight text-white">
                  Klinisk precision <br />
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="italic inline-block relative bg-gradient-to-r from-secondary via-accent-light to-secondary bg-[length:200%_auto] bg-clip-text text-transparent"
                  >
                    när det gäller.
                  </motion.span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                  Effektivisera ditt kliniska arbetsflöde med evidensbaserade protokoll, interaktiva guider och realtidsstöd anpassat för modern svensk tandvård.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button className="bg-secondary hover:bg-accent-hover text-white rounded-full px-8 py-6 text-lg border-none shadow-lg shadow-secondary/20">
                    Utforska plattformen
                  </Button>
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Se Demo
                  </Button>
                </div>

                {/* Stats Rad — baserade på implementerade agenter (16 st) + kliniska verktyg */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <p className="text-3xl font-bold text-white">16</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Kliniska agenter</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">7</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Odontologiska domäner</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">Strama</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Synkade riktlinjer 2024</p>
                  </div>
                </div>
              </div>

              {/* Höger Kolumn: Animerad Logga */}
              <div className="relative flex justify-center items-center z-10">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/10 bg-header-from/50 shadow-2xl group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                  >
                    <source src="/logo/logo-animated.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MARQUEE TICKER */}
        <div className="w-full bg-secondary py-4 overflow-hidden flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="inline-flex text-white font-bold tracking-widest text-sm uppercase"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex">
                <span className="mx-8">• PULPIT</span>
                <span className="mx-8">• PARODONTIT</span>
                <span className="mx-8">• TMD-BEHANDLING</span>
                <span className="mx-8">• MRONJ</span>
                <span className="mx-8">• STRAMA 2024</span>
                <span className="mx-8">• TRAUMAGUIDE</span>
                <span className="mx-8">• ANTIBIOTIKA</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= SEKTION: KLINISKA DOMÄNER ================= */}
        <section id="verktyg" className="py-32 bg-neutral text-dark-bg">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Kliniska domäner</h2>
              <p className="text-slate-500 text-lg">Fullständig process för alla odontologiska discipliner. Från anamnes till komplex protetik.</p>
            </div>

            {/* Grid med de 7 kliniska domänerna (6 i grid + Pedodonti-breddkort) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[
                { icon: "🦷", title: "Värk & smärta", desc: "Endodontiska akutflöden och svår smärtlindring." },
                { icon: "🩸", title: "Parodontal sjukdom", desc: "Systematiska behandlingsplaner för parodontit och peri-implantit." },
                { icon: "🎯", title: "Protetik", desc: "Bettfunktion och protetiska rekonstruktioner." },
                { icon: "🛠", title: "Kirurgi", desc: "Benfysiologi, extraktioner och postoperativt omhändertagande." },
                { icon: "🧠", title: "Bettfysiologi", desc: "Funktionsstörningar, tuggapparaten och smärthantering." },
                { icon: "🔬", title: "Oralmedicin", desc: "Munslemhinnesjukdomar, MRONJ-riskbedömning och SVF-remisser.", accent: "#5B21B6" },
                { icon: "📏", title: "Ortodonti", desc: "Interceptionella och ortodontiska bedömningar i allmäntandvård.", pediatric: true }
              ].map((domain, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all group cursor-pointer ${domain.pediatric
                      ? 'bg-surface border-pediatric-warm hover:border-accent-light'
                      : domain.accent
                        ? 'bg-white border-slate-100 hover:border-[#5B21B6]/30'
                        : 'bg-white border-slate-100 hover:border-secondary/30'
                    }`}
                >
                  <div className="text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform origin-left">{domain.icon}</div>
                  <h3 className="font-display text-2xl mb-2 text-dark-bg">{domain.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{domain.desc}</p>
                  {domain.accent && (
                    <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border" style={{ borderColor: domain.accent + '40', color: domain.accent, background: domain.accent + '10' }}>
                      Agent 05
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Det breda Pedodonti-kortet med 3D-karaktär */}
            <div className="bg-primary-container rounded-3xl p-0 overflow-hidden flex flex-col md:flex-row relative group hover:shadow-xl transition-all border border-primary-container">
              <div className="p-10 md:p-14 md:w-1/2 flex flex-col justify-center text-white z-10">
                <span className="bg-accent-light text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-6">Uppgraderad</span>
                <h3 className="font-serif text-4xl mb-4 text-white">Pedodonti &amp; Ungdom</h3>
                <p className="text-pediatric-soft text-sm leading-relaxed mb-8 max-w-sm opacity-90">
                  Särskilt anpassade riktlinjer för barn- och ungdomsthandvård med fokus på beteendehantering och interceptiv ortodonti.
                </p>
                <Link href="/pedodonti" className="text-pediatric-warm font-bold text-sm tracking-wide flex items-center gap-2 hover:gap-4 transition-all">
                  LÄS MER <span>→</span>
                </Link>
              </div>

              {/* Höger: Sömlöst integrerad 3D-karaktär med animation */}
              <div
                className="md:w-1/2 relative flex items-end justify-center overflow-hidden"
                style={{ minHeight: '280px', backgroundColor: '#1E3028' }}
              >
                {/* Gradient vänster kant — exakt kortets färg */}
                <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #1E3028, transparent)' }} />
                {/* Gradient botten */}
                <div className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #1E3028 10%, transparent)' }} />
                {/* Varmt glödsken bakom pojken */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 rounded-full opacity-15 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #fbbf8a 0%, transparent 70%)' }} />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/characters/pedodonti_boy.png"
                  alt="Pedodonti och Ortodonti Karaktär"
                  className="relative z-20 w-96 h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 16px rgba(251,191,138,0.12))',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEKTION: BENTO GRID (VERKTYG) ================= */}
        <section className="py-24 bg-[#e8efec]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[250px]">
              {/* Vänster kolumn (Diagnoshjälp & Riktlinjer) */}
              <div className="flex flex-col gap-6">
                {/* Diagnoshjälp med think.gif — klickbar & synlig */}
                <Link href="/tools/journalmall" className="block flex-1">
                  <div className="bg-slate-50 rounded-3xl p-7 h-full relative border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-secondary transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-2xl text-[#0E3B52] mb-1 font-bold">Diagnoshjälp</h3>
                        <p className="text-sm text-slate-600">Kognitivt beslutsstöd i realtid.</p>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/characters/think.gif"
                        alt="Tänkande AI"
                        className="w-14 h-14 object-contain opacity-90 group-hover:scale-110 transition-transform"
                      />
                    </div>

                    <div className="bg-white p-4 rounded-xl border-2 border-slate-200 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Input-symtom</p>
                        <p className="text-base font-medium text-slate-400 mt-1 italic">Skriv ett symtom...</p>
                      </div>
                      <span className="text-red-500 font-bold text-2xl animate-pulse">!</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-3 text-right font-medium group-hover:text-secondary transition-colors">Öppna journalmall →</p>
                  </div>
                </Link>
              {/* Synkade Riktlinjer */}
              <div className="bg-white rounded-full p-6 flex items-center justify-between border border-slate-200 shadow-sm hover:border-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-bold text-dark-bg">Synkade Riktlinjer</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">Uppdaterad idag 08:45</span>
              </div>
            </div>

            {/* Mitten: Digital Status — LIVE TYPEWRITER */}
            <TerminalCard />

            {/* Höger kolumn (SOP & Trauma) */}
            <div className="bg-white rounded-3xl p-8 lg:row-span-2 border border-slate-200 shadow-sm flex flex-col">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">PROTOKOLL (SOP)</p>
              <h3 className="font-display text-3xl text-dark-bg mb-8">SOP <span className="italic text-slate-400">&</span> Trauma</h3>

              <div className="space-y-4 flex-1">
                {[
                  { text: "Klinisk anamnes och trauma-typ", done: true },
                  { text: "Klinisk status (inkl. mobilitet)", done: false, active: true },
                  { text: "Röntgenologisk undersökning", done: false },
                  { text: "Preliminär diagnos & uppföljning", done: false },
                ].map((step, i) => (
                  <div key={i} className={`flex items-start gap-4 p-3 rounded-xl transition-colors ${step.active ? 'bg-red-50 border border-red-100' : ''}`}>
                    <div className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white ${step.done ? 'bg-green-500' : step.active ? 'bg-red-500' : 'border-2 border-slate-300'}`}>
                      {step.done ? '✓' : step.active ? '!' : ''}
                    </div>
                    <span className={`text-sm ${step.done ? 'text-slate-400 line-through' : step.active ? 'text-red-700 font-medium' : 'text-slate-600'}`}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-header-from text-white p-4 rounded-2xl flex items-center gap-4 mt-6 cursor-pointer hover:bg-dark-bg transition-colors">
                <span className="text-2xl">★</span>
                <p className="text-xs font-semibold leading-tight">EVIDENSBASERAT BESLUTSSTÖD. VERIFIERAT ENLIGT NATIONELLA RIKTLINJER.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STACKED SCROLL-CARDS — sticky siblings = stacking effect */}
      <section className="bg-dark-bg relative">
        <div className="container mx-auto px-6">
          <div className="text-center pt-32 pb-24">
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Ett flöde för <span className="text-secondary italic">hela processen.</span>
            </h2>
          </div>

          {/* ⚠️ ALLA KORT MÅSTE VARA SYSKON I SAMMA CONTAINER för sticky-stacking */}
          <div className="max-w-4xl mx-auto" style={{ paddingBottom: '30vh' }}>

            {/* CARD 01 — sticky top-24, z-1 */}
            <div className="sticky top-24 z-[1]" style={{ marginBottom: '60vh' }}>
              <Link href="/tools/parod-klassificering">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-12 md:p-16 rounded-[40px] shadow-xl border border-slate-100 group cursor-pointer hover:shadow-2xl hover:border-secondary/30 transition-shadow"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-light text-slate-200">01</span>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Parodontologi</span>
                  </div>
                  <h3 className="font-display text-5xl text-dark-bg mb-6">ParodKlassificerare</h3>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                    Automatiskt bedömningsstöd för EFP/AAP 2018. Beräknar stadieindelning och gradering baserat på dina fickdjupsmätningar och röntgenfynd.
                  </p>
                  <span className="mt-6 inline-block text-secondary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">Öppna verktyget →</span>
                </motion.div>
              </Link>
            </div>

            {/* CARD 02 — sticky top-28, z-2 glider ovanpå kort 01 */}
            <div className="sticky top-28 z-[2]" style={{ marginBottom: '60vh' }}>
              <Link href="/tools/antibiotika">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 p-12 md:p-16 rounded-[40px] shadow-xl border border-slate-200 group cursor-pointer hover:shadow-2xl hover:border-secondary/30 transition-shadow"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-light text-slate-300">02</span>
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Strama 2024</span>
                  </div>
                  <h3 className="font-display text-5xl text-dark-bg mb-6">AntibiotikaTool</h3>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                    Interaktivt beslutsträd för antibiotikaförskrivning. Säkerställer att dina ordinationer följer nationella riktlinjer och undviker resistensutveckling.
                  </p>
                  <span className="mt-6 inline-block text-secondary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">Öppna verktyget →</span>
                </motion.div>
              </Link>
            </div>

            {/* CARD 03 — sticky top-32, z-3 glider ovanpå kort 02 */}
            <div className="sticky top-32 z-[3]" style={{ marginBottom: '60vh' }}>
              <Link href="/tools/dosering">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl border border-slate-200 group cursor-pointer hover:shadow-2xl hover:border-secondary/30 transition-shadow"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-light text-slate-300">03</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Farmakologi</span>
                  </div>
                  <h3 className="font-display text-5xl text-dark-bg mb-6">DoseringKalkylator</h3>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                    Exakt farmakologisk dosering baserat på patientens ålder, vikt och medicinska riskprofil. Interaktionsvarningar för säker behandling.
                  </p>
                  <span className="mt-6 inline-block text-secondary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">Öppna verktyget →</span>
                </motion.div>
              </Link>
            </div>

            {/* CARD 04 — sticky top-36, z-4 glider ovanpå alla tre */}
            <div className="sticky top-36 z-[4]">
              <Link href="/tools/journalmall">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-header-from p-12 md:p-16 rounded-[40px] shadow-2xl border border-dark-bg text-white group cursor-pointer hover:border-secondary/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl font-light text-white/20">04</span>
                    <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Administration</span>
                  </div>
                  <h3 className="font-serif text-5xl mb-6">AI-Journal &amp; Debitering</h3>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
                    Strukturerad automatiserad journalföring med integrerat HSLF-FS 2025:68-kompatibelt debiteringsstöd.
                  </p>
                  <Button className="bg-secondary hover:bg-accent-hover text-white rounded-full px-8 py-6 pointer-events-none">
                    Utforska Verktygen
                  </Button>
                </motion.div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ALLA FUNKTIONER — klickbart grid */}
      <section id="alla-funktioner" className="py-32 bg-dark-bg relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-white">Alla funktioner <span className="text-secondary italic">— klicka & utforska.</span></h2>
            <p className="text-slate-400 mt-4 text-lg">Varje verktyg är byggt för det kliniska arbetsflödet.</p>
          </div>

          {/* ── KLINISKA VERKTYG ── */}
          <div className="mb-12">
            <p className="text-[11px] text-secondary font-bold uppercase tracking-widest mb-6">Kliniska verktyg</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📝', title: 'AI-Journalmall', desc: 'Automatisk journaltext via AI — snabb, strukturerad och HSLF-FS-kompatibel.', href: '/dashboard/tools/journalmall/ai-assisterad', tag: 'AI', tagColor: 'bg-secondary' },
                { icon: '📋', title: 'Manuell Journalmall', desc: 'Välj behandling och fyll i en färdig klinisk journalmall direkt.', href: '/dashboard/tools/journalmall/manuell', tag: 'Manuell', tagColor: 'bg-slate-600' },
                { icon: '💰', title: 'Debitering', desc: 'AI-assisterat debiteringsstöd — taxekoder och åtgärdskoder enligt gällande taxa.', href: '/dashboard/tools/debitering', tag: 'Ekonomi', tagColor: 'bg-emerald-700' },
                { icon: '🦠', title: 'AntibiotikaTool', desc: 'Beslutsträd för antibiotikaförskrivning enligt Strama 2024.', href: '/dashboard/tools/antibiotika', tag: 'Strama 2024', tagColor: 'bg-amber-700' },
                { icon: '💊', title: 'DoseringKalkylator', desc: 'Farmakologisk dosering baserat på ålder, vikt och riskprofil med interaktionsvarningar.', href: '/dashboard/tools/dosering', tag: 'Farmakologi', tagColor: 'bg-violet-700' },
                { icon: '📦', title: 'Läkemedelskort', desc: 'Snabbreferens för vanliga läkemedel — warfarin, NOAK, bisfosfonater m.fl.', href: '/dashboard/tools/lakemedel', tag: 'Referens', tagColor: 'bg-slate-600' },
                { icon: '🦷', title: 'ParodKlassificerare', desc: 'EFP/AAP 2018-klassificering av parodontit baserat på fickdjup och röntgenfynd.', href: '/dashboard/tools/parod-klassificering', tag: 'Parodontologi', tagColor: 'bg-teal-700' },
                { icon: '🚑', title: 'TraumaGuide', desc: 'Kliniska protokoll för tandtrauma — primära och permanenta tänder.', href: '/dashboard/tools/traumaguide', tag: 'Akut', tagColor: 'bg-red-700' },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group block">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:bg-white/10 hover:border-secondary/50 hover:-translate-y-1 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{tool.icon}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${tool.tagColor}`}>{tool.tag}</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{tool.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{tool.desc}</p>
                    <span className="text-secondary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Öppna →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── KLINISKA AGENTER ── */}
          <div className="mb-12">
            <p className="text-[11px] text-secondary font-bold uppercase tracking-widest mb-6">Kliniska agenter</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '🦷', title: 'Endodonti', desc: 'Värk, pulpit & rotbehandling.', href: '/dashboard/endodonti' },
                { icon: '🩸', title: 'Parodontologi', desc: 'Parodontit & peri-implantit.', href: '/dashboard/parodontologi' },
                { icon: '🎯', title: 'Protetik', desc: 'Bettfunktion & rekonstruktioner.', href: '/dashboard/protetik' },
                { icon: '🛠', title: 'Käkkirurgi', desc: 'Extraktioner & kirurgi.', href: '/dashboard/kakkirurgi' },
                { icon: '🧠', title: 'Bettfysiologi', desc: 'TMD & funktionsstörningar.', href: '/dashboard/bettfysiologi' },
                { icon: '🔬', title: 'Oralmedicin', desc: 'MRONJ, slemhinna & SVF.', href: '/dashboard/oralmedicin' },
                { icon: '🧒', title: 'Pedodonti', desc: 'Barn- och ungdomstandvård.', href: '/dashboard/pedodonti' },
                { icon: '📏', title: 'Ortodonti', desc: 'Interception & bedömning.', href: '/dashboard/ortodonti' },
              ].map((agent) => (
                <Link key={agent.href} href={agent.href} className="group block">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full flex flex-col hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-200">
                    <span className="text-2xl mb-3">{agent.icon}</span>
                    <h4 className="text-white font-bold mb-1">{agent.title}</h4>
                    <p className="text-slate-400 text-sm flex-1">{agent.desc}</p>
                    <span className="text-slate-500 text-xs mt-3 group-hover:text-secondary transition-colors">Öppna →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── SIMULATOR ── */}
          <div>
            <p className="text-[11px] text-secondary font-bold uppercase tracking-widest mb-6">Simulator</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🎮', title: 'Klinisk Simulator', desc: 'Träna på kliniska fall i 3 svårighetsgrader — få poäng och feedback i realtid.', href: '/dashboard/simulator', tag: 'Interaktiv', big: true },
                { icon: '📊', title: 'Min Historik', desc: 'Se dina tidigare simulatorresultat och kunskapsutveckling.', href: '/dashboard/simulator/historik', tag: 'Statistik' },
                { icon: '🏆', title: 'Leaderboard', desc: 'Jämför dina poäng med andra kliniker på plattformen.', href: '/dashboard/simulator/leaderboard', tag: 'Ranking' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className={`group block ${item.big ? 'md:col-span-1' : ''}`}>
                  <div className="bg-gradient-to-br from-secondary/20 to-dark-surface border border-secondary/30 rounded-2xl p-6 h-full flex flex-col hover:border-secondary hover:-translate-y-1 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-secondary border border-secondary/40">{item.tag}</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.desc}</p>
                    <span className="text-secondary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Starta →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FARMAKOLOGISKT STÖD */}
      <section className="py-24 bg-dark-surface text-white border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12">
            <h2 className="font-serif text-4xl mb-4 text-white">Farmakologiskt stöd</h2>
            <p className="text-slate-400 text-lg">Snabbt åtkomlig dosering och interaktionsvarning för dental praxis.</p>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-6 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredDrugs.map((drug) => (
              <div
                key={drug.id}
                className="group min-w-[320px] bg-white/5 border border-white/10 p-8 rounded-[24px] snap-start transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-secondary hover:shadow-accent cursor-pointer flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <span className="text-[10px] text-secondary font-bold tracking-widest uppercase mb-4 block">
                    {drug.cat}
                  </span>
                  <h4 className="text-2xl font-bold mb-3 text-white">{drug.name}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {drug.risk && (
                      <span className={`font-bold mr-2 ${drug.risk.includes('HÖG') ? 'text-red-400' : 'text-yellow-400'}`}>
                        [{drug.risk}]
                      </span>
                    )}
                    {drug.summary[0]?.replace(/^[❌⚠️✓]\s*/, '')}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/10 transition-colors duration-300 group-hover:border-secondary/30">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest group-hover:text-white transition-colors">
                    Klinisk Data
                  </span>
                  <span className="text-slate-500 group-hover:text-secondary group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRISSÄTTNING */}
      <section id="priser" className="py-32 bg-neutral">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl text-dark-bg mb-4">Prisplaner för kliniken</h2>
            <p className="text-slate-500">Välj den nivå som passar din verksamhet. Skalbart från den enskilda kliniken till den stora kedjan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            <div className="bg-white p-10 rounded-[30px] border border-slate-200 text-center shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enskild</span>
              <h3 className="font-display text-3xl text-dark-bg my-2">Gratis</h3>
              <div className="my-6">
                <span className="text-5xl font-bold text-dark-bg">0 kr</span>
                <span className="text-slate-500 text-sm"> / mån</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> 3 områden (10 scenarier)</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Manuell journalmall</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Doseringskalkylator (basic)</li>
                <li className="flex items-center gap-3"><span className="text-slate-300">✗</span> AI-journal</li>
                <li className="flex items-center gap-3"><span className="text-slate-300">✗</span> Premium-verktyg</li>
              </ul>
              <Link href="/registrera"><Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-600 hover:bg-slate-50">Kom igång gratis</Button></Link>
            </div>

            <div className="bg-dark-surface p-10 rounded-[30px] border border-secondary/50 text-center shadow-2xl relative transform scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Mest populär</div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Professionell</span>
              <h3 className="font-serif text-3xl text-white my-2">Kliniker</h3>
              <div className="my-6">
                <span className="text-5xl font-bold text-white">99 kr</span>
                <span className="text-slate-400 text-sm"> / mån</span>
              </div>
              <ul className="text-sm text-slate-300 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-3"><span className="text-secondary">✓</span> Alla 12 områden (82 scenarier)</li>
                <li className="flex items-center gap-3"><span className="text-secondary">✓</span> AI-journal (5/dag)</li>
                <li className="flex items-center gap-3"><span className="text-secondary">✓</span> Alla verktyg</li>
                <li className="flex items-center gap-3"><span className="text-secondary">✓</span> Bokmärken & anteckningar</li>
                <li className="flex items-center gap-3"><span className="text-secondary">✓</span> Email-support</li>
              </ul>
              <Link href="/pricing"><Button className="w-full bg-secondary hover:bg-accent-hover text-white rounded-full">Starta provperiod</Button></Link>
            </div>

            <div className="bg-white p-10 rounded-[30px] border border-slate-200 text-center shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kliniknätverk</span>
              <h3 className="font-display text-3xl text-dark-bg my-2">Klinik</h3>
              <div className="my-6">
                <span className="text-5xl font-bold text-dark-bg">399 kr</span>
                <span className="text-slate-500 text-sm"> / mån</span>
              </div>
              <ul className="text-sm text-slate-600 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Allt i Kliniker</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> 5 användare per klinik</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> AI-journal (100/dag)</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Admin-panel</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Prioriterad support</li>
              </ul>
              <Link href="/pricing"><Button variant="outline" className="w-full rounded-full border-slate-300 text-slate-600 hover:bg-slate-50">Kontakta Sälj</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </main>

      {/* FOOTER */ }
  <footer className="bg-dark-surface pt-20 pb-10 border-t border-white/10 text-slate-400">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-hexagon-dark.png" alt="Logo" width={24} height={24} className="w-6 h-6 rounded-lg object-cover" style={{ backgroundColor: '#0d4a65' }} />
            <span className="font-display italic text-xl text-white">DentaGuide<span className="text-secondary font-body not-italic text-xs align-top ml-1">PRO</span></span>
          </div>
          <p className="text-sm max-w-sm mb-6 leading-relaxed">
            Nästa generations kliniska beslutsstöd för tandvården. Utvecklat av tandläkare, för tandläkare.
            Säkerställer evidensbaserade skadefria flöden.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Plattform</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/login" className="hover:text-white transition-colors">Verktyg</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Prismodell</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Klinisk API</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Nyhetsbrev</h4>
          <p className="text-xs mb-4">Håll dig uppdaterad med de senaste kliniska riktlinjerna.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Din e-post" className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-secondary" />
            <Button className="bg-secondary hover:bg-accent-hover text-white rounded-full px-4">Prenumerera</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs">
        <p>© 2026 DentaGuide-Pro. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/login" className="hover:text-white transition-colors">Integritetspolicy (GDPR)</Link>
          <Link href="/login" className="hover:text-white transition-colors">Patientdatalagen (PDL)</Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>System Status: Operativ</span>
          </div>
        </div>
      </div>
      {/* PSL 2010:659 — Patientsäkerhetslag */}
      <p className="mt-6 text-center text-[10px] text-slate-600 max-w-3xl mx-auto leading-relaxed">
        ⚖️ DentaGuide-Pro är ett kliniskt beslutsstöd och ersätter inte legitimerad tandläkares medicinska bedömning.
        Allt innehåll är avsett som stöd vid klinisk beslutsfattning och ska alltid vägas mot patientens individuella förutsättningar.
        Enligt Patientsäkerhetslagen (PSL 2010:659) bär den legitimerade yrkesutövaren alltid det slutliga ansvaret för vårdbeslut.
      </p>
    </div>
  </footer>

  {/* SCROLL-FÖLJANDE KARAKTÄR */ }
  <ScrollCharacter />
    </div >
  );
}