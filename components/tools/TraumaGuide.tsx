"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Copy, 
  ArrowLeft,
  Clock
} from 'lucide-react';

/* ── KLINISK DATA (VERBATIM) ─────────────────────────────────── */

const PRIMARA_STEPS = {
  's0': {
    num: 1,
    title: '🚨 Huvudskada?',
    desc: 'Medvetslöshet? Kräkningar? Nacksmärta? Slog barnet i huvudet?',
    options: [
      { label: '✅ Nej — barnet är alert', color: 'green', nextId: 's1' },
      { label: '🚨 Ja — misstänkt huvudskada', color: 'red', resultId: 'rem' }
    ]
  },
  's1': {
    num: 2,
    title: '🦷 Vad ser du?',
    options: [
      { label: 'Tanden sitter kvar', desc: 'Rörlig / snett / intryckt', color: 'blue', nextId: 's2a' },
      { label: 'Tanden helt ute', desc: 'Exartikulation', color: 'red', nextId: 's2b' },
      { label: 'En bit har gått av', desc: 'Fraktur', color: 'amber', nextId: 's2c' }
    ]
  },
  's2a': {
    num: 3,
    title: 'Rörlighet, position, perkussion?',
    options: [
      { label: 'Rörlig, rätt plats, öm', desc: 'Subluxation / Konkussion', color: 'green', nextId: 's-konk' },
      { label: 'Tryckt snett eller dragen utåt', desc: 'Lateral luxation / Extrusion', color: 'amber', nextId: 's-bett' },
      { label: 'Intryckt i benet (kortare/osynlig)', desc: 'Intrusion', color: 'red', nextId: 's-intru' },
      { label: 'Flera tänder + ben rör sig som block', desc: 'Alveolarutskottsfraktur', color: 'red', resultId: 'alv' }
    ]
  },
  's-konk': {
    num: 4,
    title: 'Har tanden ökad rörlighet?',
    options: [
      { label: 'Ja — ökad rörlighet', desc: '→ Subluxation', color: 'blue', resultId: 'sublux' },
      { label: 'Nej — normal rörlighet', desc: '→ Konkussion', color: 'green', resultId: 'konk' }
    ]
  },
  's-bett': {
    num: 4,
    title: '⚠️ Bettstörning? Apex buckalt eller palatinalt?',
    desc: 'Kan barnet bita ihop? Kontrollera apex-riktning på röntgen (minst 2 projektioner).',
    options: [
      { label: 'Ingen bettstörning + apex buckalt', desc: 'Bort från anlaget', color: 'green', resultId: 'avvakta' },
      { label: 'Liten bettstörning', desc: 'Kan lösas med slipning', color: 'blue', resultId: 'slipa' },
      { label: 'Stor bettstörning', desc: 'Ej slipbar', color: 'amber', resultId: 'ex-bett' },
      { label: 'Apex palatinalt', desc: 'Mot permanenta anlaget', color: 'red', resultId: 'ex-apex' }
    ]
  },
  's-intru': {
    num: 4,
    title: '📷 Vart pekar apex?',
    options: [
      { label: 'Apex buckalt', desc: 'Bort från anlaget → avvakta', color: 'green', resultId: 'intru-b' },
      { label: 'Apex palatinalt', desc: 'Mot anlaget → extraktion', color: 'red', resultId: 'intru-p' }
    ]
  },
  's2b': {
    num: 3,
    title: 'Hittades tanden? Hostar barnet?',
    principle: '⛔ MJÖLKTÄNDER REPLANTERAS ALDRIG',
    options: [
      { label: '✅ Tanden hittad — ingen hosta', color: 'green', resultId: 'exart-ok' },
      { label: '🚨 Tanden EJ hittad + hosta / andningsbesvär', color: 'red', resultId: 'asp' },
      { label: '⚠️ Tanden EJ hittad, ingen hosta — behöver röntgen', color: 'amber', resultId: 'exart-rtg' }
    ]
  },
  's2c': {
    num: 3,
    title: 'Vad ser du?',
    desc: 'Palpera ALLTID läpparna — tandfragment kan vara inbäddade!',
    options: [
      { label: 'Spricka / liten emaljbit av', desc: 'Infraktion / Emaljfraktur', color: 'green', resultId: 'infrak' },
      { label: 'Dentin blottat, INGEN röd punkt', desc: 'Okomplicerad kronfraktur', color: 'blue', resultId: 'frak-ok' },
      { label: 'Röd punkt / blödning i frakturyta', desc: 'Komplicerad (pulpablotta)', color: 'amber', resultId: 'frak-komp' },
      { label: 'Fraktur under tandköttet', desc: 'Kronrotfraktur', color: 'amber', resultId: 'kronrot' },
      { label: 'Kronan intakt men extremt rörlig', desc: 'Rotfraktur (rtg bekräftar)', color: 'red', resultId: 'rotfrak' },
      { label: 'Flera tänder + ben rör sig', desc: 'Alveolarutskottsfraktur', color: 'red', resultId: 'alv' }
    ]
  }
};

const RESULTS_PRIMARA = {
  'rem': { color: 'red', title: '🚨 REMISS BARNAKUT — OMEDELBART', description: 'Tandbehandling väntar. Stabilisera barnet först.' },
  'konk': { color: 'green', title: '✅ Konkussion', description: 'Normal rörlighet, perkussionsöm. Avvakta. Skonkost 1–2 v. Kontroll: 1 v, 3 v, 3 mån. Utmärkt prognos — mycket liten risk för nekros.' },
  'sublux': { color: 'blue', title: '✅ Subluxation', description: 'Ökad rörlighet men ej dislokerad. Avvakta. Skonkost 1–2 v. Kontroll: 1 v, 3 v, 3 mån. Låg risk för nekros.' },
  'avvakta': { color: 'green', title: '✅ Avvakta spontan eruption', description: 'Låt tanden erumpera själv. Kontrollera noga (kliniskt + rtg) inom 1 v, 3 v, 3 mån. Skonkost.' },
  'slipa': { color: 'blue', title: '✅ Slipa bort bettstörning', description: 'Slipa försiktigt på tanden som stör bettet. Kontroll 1 v, 3 v, 3 mån. Skonkost.' },
  'ex-bett': { color: 'red', title: '🚨 Extraktion — bettstörning', description: 'Tanden stör bettet och kan ej slipas. Extraktion rekommenderas för att undvika trauma mot permanenta anlaget.' },
  'ex-apex': { color: 'red', title: '🚨 Extraktion — apex mot anlag', description: 'Tanden är dislokerad mot det permanenta anlaget. Extraktion krävs för att minimera skaderisken på anlaget.' },
  'intru-b': { color: 'green', title: '✅ Avvakta — apex buckalt', description: 'Tanden pekar bort från anlaget. God chans till spontan re-eruption (oftast inom 6 mån). Kontroll 1 v, 3 v, 3 mån.' },
  'intru-p': { color: 'red', title: '🚨 Extraktion — apex palatinalt', description: 'Tanden är intryckt mot det permanenta anlaget. Extraktion rekommenderas för att skydda anlaget.' },
  'exart-ok': { color: 'green', title: '✅ Avvakta — tanden är ute', description: 'Tanden återhittad. Sätt ALDRIG tillbaka den. Röntgen för att utesluta rötter/intrusion. Kontrollera permanenta anlagets eruption senare.' },
  'asp': { color: 'red', title: '🚨 REMISS AKUTEN — ASPIRATION?', description: 'Misstänkt aspiration av tand/fragment. Kräv omedelbar medicinsk bedömning (lungröntgen).' },
  'exart-rtg': { color: 'amber', title: '⚠️ Röntgen krävs', description: 'Tanden ej hittad. Måste utesluta att den är total-intruderad (helt intryckt i benet).' },
  'infrak': { color: 'green', title: '✅ Avvakta', description: 'Ingen behandling krävs. Eventuellt kontroll av sensibilitet senare.' },
  'frak-ok': { color: 'blue', title: '✅ Täck dentin', description: 'Täck blottat dentin med komposit/glasjonomer för att minska sensibilitet. Kontroll 3 v, 3 mån.' },
  'frak-komp': { color: 'red', title: '🚨 Pulpotomi eller Extraktion', description: 'Pulpablotta. Hos barn väljs oftast extraktion p.g.a. svårighet att utföra endodonti, men partiell pulpotomi kan övervägas.' },
  'kronrot': { color: 'red', title: '🚨 Extraktion', description: 'Fraktur sträcker sig under bennivå. Tanden kan ej räddas på ett hållbart sätt i primära bettet.' },
  'rotfrak': { color: 'amber', title: '⚠️ Avvakta eller Extraktion', description: 'Om den koronala delen ej stör bettet: låt sitta. Annars: extrahera koronala delen, lämna rotspetsen (den resorberas oftast).' },
  'alv': { color: 'red', title: '🚨 Reponering och Fixering', description: 'Hela benblocket rör sig. Reponera manuellt och fixera (splint) i 4 veckor. Remiss till specialist rekommenderas.' }
};

const PERMANENTA_STEPS = {
  's0': {
    num: 1,
    title: '🚨 Huvudskada?',
    desc: 'Medvetslöshet? Kräkningar? Nacksmärta? Slog barnet i huvudet?',
    options: [
      { label: '✅ Nej — alert', color: 'green', nextId: 's1' },
      { label: '🚨 Ja — misstänkt huvudskada', color: 'red', resultId: 'rem' }
    ]
  },
  's1': {
    num: 2,
    title: '🦷 Vad ser du?',
    options: [
      { label: 'Tanden sitter kvar', desc: 'Rörlig / snett / intryckt', color: 'blue', nextId: 's2a' },
      { label: 'Tanden helt ute', desc: 'Exartikulation', color: 'red', nextId: 's2b' },
      { label: 'En bit har gått av', desc: 'Fraktur', color: 'amber', nextId: 's2c' }
    ]
  },
  's2a': {
    num: 3,
    title: 'Rörlighet, position, perkussion?',
    options: [
      { label: 'Rörlig, rätt plats, öm', desc: 'Subluxation / Konkussion', color: 'green', nextId: 's-konk' },
      { label: 'Tryckt snett eller dragen utåt', desc: 'Lateral luxation / Extrusion', color: 'amber', nextId: 's-lux' },
      { label: 'Intryckt i benet (kortare/osynlig)', desc: 'Intrusion', color: 'red', nextId: 's-intru' },
      { label: 'Flera tänder + ben rör sig som block', desc: 'Alveolarutskottsfraktur', color: 'red', resultId: 'alv' }
    ]
  },
  's-konk': {
    num: 4,
    title: 'Har tanden ökad rörlighet?',
    options: [
      { label: 'Ja — ökad rörlighet', desc: '→ Subluxation', color: 'blue', resultId: 'sublux' },
      { label: 'Nej — normal rörlighet', desc: '→ Konkussion', color: 'green', resultId: 'konk' }
    ]
  },
  's-lux': {
    num: 4,
    title: '⚠️ Bettstörning?',
    desc: 'Kan patienten bita ihop ordentligt?',
    options: [
      { label: 'Ja — tanden stör bettet', desc: 'Reponering krävs', color: 'red', resultId: 'repo-fix' },
      { label: 'Nej — inget bettfel', color: 'green', resultId: 'fix' }
    ]
  },
  's-intru': {
    num: 4,
    title: 'Hur djupt är tanden intryckt?',
    options: [
      { label: '< 3 mm', desc: 'Vänta på re-eruption (<17 år) eller dra ut ortodontiskt', color: 'green', resultId: 'intru-liten' },
      { label: '3 - 7 mm', desc: 'Ortodontisk eller kirurgisk reponering', color: 'amber', resultId: 'intru-mellan' },
      { label: '> 7 mm', desc: 'Kirurgisk reponering omedelbart', color: 'red', resultId: 'intru-stor' }
    ]
  },
  's2b': {
    num: 3,
    title: '🚨 EXARTIKULATION — AGERA NU!',
    principle: 'Varje minut räknas för att rädda tanden. Målet är replantation OMEDELBART.',
    options: [
      { label: '✅ Tanden är redan replanterad', color: 'green', resultId: 'exart-re' },
      { label: '⚠️ Tanden är ute (i mjölk/saliv/fysiologiskt)', color: 'blue', resultId: 'exart-media' },
      { label: '🚨 Tanden är torr (> 60 minuter)', color: 'red', resultId: 'exart-torr' }
    ]
  },
  's2c': {
    num: 3,
    title: 'Vad ser du?',
    desc: 'Palpera ALLTID läpparna — tandfragment kan vara inbäddade!',
    options: [
      { label: 'Spricka / liten emaljbit av', desc: 'Infraktion / Emaljfraktur', color: 'green', resultId: 'infrak' },
      { label: 'Dentin blottat, INGEN röd punkt', desc: 'Okomplicerad kronfraktur', color: 'blue', resultId: 'frak-ok' },
      { label: 'Röd punkt / blödning i frakturyta', desc: 'Komplicerad (pulpablotta)', color: 'red', resultId: 'frak-komp' },
      { label: 'Kronan intakt men extremt rörlig', desc: 'Rotfraktur (rtg bekräftar)', color: 'red', resultId: 'rotfrak' }
    ]
  }
};

const RESULTS_PERMANENTA = {
  'rem': { color: 'red', title: '🚨 REMISS BARNAKUT — OMEDELBART', description: 'Tandbehandling väntar. Stabilisera patienten först.' },
  'konk': { color: 'green', title: '✅ Konkussion', description: 'Normal rörlighet, perkussionsöm. Ingen fixering. Kontroll 2 v, 4 v, 6-8 v, 6 mån, 1 år.' },
  'sublux': { color: 'blue', title: '✅ Subluxation', description: 'Ökad rörlighet. Fixering valfritt (vid obehag). Kontroll 2 v, 4 v, 6-8 v, 6 mån, 1 år.' },
  'repo-fix': { color: 'red', title: '🚨 Reponera och Fixera', description: 'Reponera manuellt under lokalanestesi. Fixera (flexibel splint) i 2 veckor (4 veckor vid alveolarfraktur). Kontroll 2 v, 4 v, 6-8 v, 6 mån, 1 år.' },
  'fix': { color: 'blue', title: '✅ Fixera', description: 'Fixera (flexibel splint) i 2 veckor. Kontroll 2 v, 4 v, 6-8 v, 6 mån, 1 år.' },
  'intru-liten': { color: 'green', title: '✅ Avvakta spontan eruption', description: 'Gäller patienter < 17 år med öppet apex. Kontrollera noga var 1-2 vecka. Om ingen rörelse efter 3 veckor → ortodontiskt framdragande.' },
  'intru-mellan': { color: 'amber', title: '⚠️ Ortodontisk/Kirurgisk reponering', description: 'Dra fram tanden ortodontiskt (långsamt) eller reponera kirurgiskt. Fixera i 4 veckor.' },
  'intru-stor': { color: 'red', title: '🚨 Kirurgisk reponering', description: 'Reponera kirurgiskt omedelbart och fixera i 4 veckor. Hög risk för ankyloos.' },
  'exart-re': { color: 'green', title: '✅ Redan på plats', description: 'Rengör område, verifiera läge med rtg. Fixera i 2 veckor. Antibiotika (Amimox/Doxyferm). Kontrollera stelkrampsskydd.' },
  'exart-media': { color: 'blue', title: '✅ Replantera OMEDELBART', description: 'Håll i kronan, skölj tanden 10 sek i koksalt om smutsig. Replantera direkt. Fixera 2 veckor. Antibiotika. Kontrollera stelkrampsskydd.' },
  'exart-torr': { color: 'red', title: '🚨 Replantera (dålig prognos)', description: 'Tanden har varit torr >60 min. PDL-celler är döda. Blötlägg i fluorlösning före replantation. Hög risk för resorption/ankylos.' },
  'infrak': { color: 'green', title: '✅ Avvakta', description: 'Ingen akut åtgärd. Eventuellt slipning/polering.' },
  'frak-ok': { color: 'blue', title: '✅ Bonding / Komposit', description: 'Limma fast fragment om det finns, annars komposit. Kontroll 6-8 v, 1 år.' },
  'frak-komp': { color: 'red', title: '🚨 Partiell pulpotomi (Cvek)', description: 'Bevara pulpan! Rengör med koksalt/klorhexidin. Partiell pulpotomi med kalciumhydroxid/MTA. Täck med komposit.' },
  'rotfrak': { color: 'red', title: '🚨 Reponera och Fixera', description: 'Reponera koronala fragmentet om dislokerat. Fixera i 4 veckor (vid apikal fraktur) eller upp till 4 månader (vid cervikal fraktur).' },
  'alv': { color: 'red', title: '🚨 Reponering och Fixering', description: 'Hela benblocket rör sig. Reponera manuellt och fixera (splint) i 4 veckor.' }
};

/* ── KOMPONENTER ────────────────────────────────────────────── */

function StepOption({ label, desc, color, onClick }) {
  const colorMap = {
    green: "border-green-100 hover:border-green-300 bg-green-50/50 hover:bg-green-50",
    blue: "border-blue-100 hover:border-blue-300 bg-blue-50/50 hover:bg-blue-50",
    amber: "border-amber-100 hover:border-amber-300 bg-amber-50/50 hover:bg-amber-50",
    red: "border-red-100 hover:border-red-300 bg-red-50/50 hover:bg-red-50"
  };

  const textMap = {
    green: "text-green-900",
    blue: "text-blue-900",
    amber: "text-amber-900",
    red: "text-red-900"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden ${colorMap[color] || ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <span className={`block font-bold text-base mb-0.5 ${textMap[color] || ""}`}>{label}</span>
          {desc && <span className="block text-sm opacity-60 font-medium">{desc}</span>}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 0.4, x: 0 }}
        >
          <ChevronRight className={`w-5 h-5 ${textMap[color] || ""}`} />
        </motion.div>
      </div>
    </motion.button>
  );
}

function ResultCard({ result, onRestart }) {
  const [copied, setCopied] = useState(false);
  const isRed = result.color === 'red';
  const bgColor = isRed ? 'bg-red-50 border-2 border-red-100' : 'bg-white border border-[var(--border-light)]';
  const textColor = isRed ? 'text-red-900' : 'text-[var(--text-primary)]';
  const iconBg = isRed ? 'bg-red-100' : 'bg-[#0E3B52]/10';

  const handleCopy = () => {
    const text = `${result.title}\n\n${result.description}\n\nKälla: DentaGuide-Pro Traumaguide`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative ${bgColor}`}>
      {isRed && (
        <motion.div 
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 rounded-bl-[100px] pointer-events-none" 
        />
      )}
      
      <div className="relative z-10">
        <div className="mb-6">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}
          >
            {isRed ? (
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ delay: 0.5, duration: 0.5, repeat: 1 }}
              >
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </motion.div>
            ) : (
              <Check className="w-8 h-8 text-[#0E3B52]" />
            )}
          </motion.div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isRed ? 'text-red-600' : 'text-[#0E3B52]/60'}`}>
            {isRed ? 'Akut rekommendation' : 'Klinisk uppföljning'}
          </span>
        </div>
        
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
          {result.title}
        </h2>
        
        <p className={`text-lg leading-relaxed mb-8 opacity-90 font-medium ${isRed ? 'text-red-900/70' : 'text-[var(--text-secondary)]'}`}>
          {result.description}
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onRestart}
            className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all ${
              isRed 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200' 
                : 'bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90 shadow-lg shadow-[var(--secondary)]/10'
            }`}
          >
            <RotateCcw className="w-5 h-5" /> Börja om
          </button>
          
          <button 
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold transition-all relative overflow-hidden ${
              isRed 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span 
                  key="copied"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" /> Kopierat!
                </motion.span>
              ) : (
                <motion.span 
                  key="copy"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-5 h-5" /> Kopiera råd till journal
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}

function TraumaGuideFlow({ variant }) {
  const [currentId, setCurrentId] = useState('s0');
  const [path, setPath] = useState([]); // Håller reda på ID:n i historiken
  const [direction, setDirection] = useState(0); // 1 för framåt, -1 för bakåt
  
  const isPrimara = variant === 'primara';
  const steps = isPrimara ? PRIMARA_STEPS : PERMANENTA_STEPS;
  const results = isPrimara ? RESULTS_PRIMARA : RESULTS_PERMANENTA;
  
  const step = steps[currentId];
  const isResult = !step && results[currentId];
  const result = isResult ? results[currentId] : null;

  const handleOptionClick = (nextId, resultId) => {
    setDirection(1);
    setPath([...path, currentId]);
    if (resultId) setCurrentId(resultId);
    else if (nextId) setCurrentId(nextId);
  };

  const handleBack = () => {
    if (path.length === 0) return;
    setDirection(-1);
    const newPath = [...path];
    const prevId = newPath.pop();
    setPath(newPath);
    setCurrentId(prevId);
  };

  const handleJumpTo = (stepId, index) => {
    setDirection(-1);
    const newPath = path.slice(0, index);
    setPath(newPath);
    setCurrentId(stepId);
  };

  const handleRestart = () => {
    setDirection(-1);
    setPath([]);
    setCurrentId('s0');
  };

  return (
    <div className="w-full">
      {/* Visual Breadcrumb Stepper */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
        <button 
          onClick={handleRestart}
          title="Starta om guiden"
          className={`flex items-center shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border hover:scale-105 active:scale-95 ${
            currentId === 's0' 
              ? 'bg-[var(--secondary)] text-white border-[var(--secondary)]' 
              : 'bg-white text-[var(--text-secondary)] border-[var(--border-light)]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 mr-2" /> Start
        </button>
        
        {path.map((id, idx) => {
          const s = steps[id];
          if (!s) return null;
          return (
            <React.Fragment key={id}>
              <ChevronRight className="w-4 h-4 text-[var(--border-medium)] shrink-0" />
              <button 
                onClick={() => handleJumpTo(id, idx)}
                title={`Hoppa tillbaka till steg ${s.num}`}
                className="flex items-center shrink-0 px-4 py-2 rounded-full text-xs font-bold bg-white text-[var(--text-secondary)] border border-[var(--border-light)] shadow-sm hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all hover:scale-105 active:scale-95"
              >
                Steg {s.num}
              </button>
            </React.Fragment>
          );
        })}
        
        {!isResult && currentId !== 's0' && (
          <>
            <ChevronRight className="w-4 h-4 text-[var(--border-medium)] shrink-0" />
            <div className="flex items-center shrink-0 px-4 py-2 rounded-full text-xs font-bold bg-[var(--secondary)] text-white border border-[var(--secondary)] shadow-md shadow-[var(--secondary)]/20 animate-in zoom-in-95">
              Steg {step.num}
            </div>
          </>
        )}
      </div>

      {/* Hero / Question Section */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction}>
          {!isResult ? (
            <motion.div 
              key={currentId}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[var(--border-light)] rounded-[32px] p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-[var(--secondary)]">
                <span className="w-6 h-6 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center font-bold text-[8px] mr-1">
                  {step.num}
                </span>
                Kliniskt beslutsstöd / Traumaguide
              </div>
              
              <h1 className="font-display italic text-3xl font-medium tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
                {step.title}
              </h1>
              
              {step.desc && (
                <p className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed mb-8 opacity-80">
                  {step.desc}
                </p>
              )}

              {step.principle && (
                <div className="flex items-start gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl mb-8">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-900 text-sm mb-1 uppercase tracking-wide">Viktig princip</h4>
                    <p className="text-red-800 text-sm leading-relaxed font-bold">{step.principle}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8">
                {step.options.map((opt, i) => (
                  <StepOption 
                    key={i}
                    label={opt.label}
                    desc={opt.desc}
                    color={opt.color}
                    onClick={() => handleOptionClick(opt.nextId, opt.resultId)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 pt-6 border-t border-[var(--border-light)]">
                <button 
                  onClick={handleBack}
                  disabled={path.length === 0}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    path.length === 0 
                      ? 'opacity-0 pointer-events-none' 
                      : 'text-[var(--text-secondary)] hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Föregående steg
                </button>
                <button 
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#CC5833] hover:bg-[#CC5833]/5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Börja om
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultCard result={result} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Urgent Checklist — Only for Permanent Exarticulation */}
      <AnimatePresence>
        {!isPrimara && currentId === 's2b' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 bg-red-50 border-2 border-red-100 rounded-[32px] p-8 text-red-900 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-display italic font-bold uppercase tracking-wide text-red-800">Checklista: Akut exartikulation</h3>
            </div>
            <motion.ul 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
              className="space-y-3"
            >
              {[
                'Rör INTE roten — håll endast i kronan.',
                'Om smutsig: skölj 10 sek i kallt vatten / koksalt.',
                'Replantera omedelbart — tryck tanden på plats.',
                'Låt patienten bita på en kompress.',
                'Sök tandläkare direkt.'
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  className="flex items-start gap-4 bg-white/50 p-4 rounded-2xl border border-red-100/50"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-red-700">{i+1}</span>
                  </div>
                  <span className="font-medium leading-tight">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TraumaGuidePrimara() {
  return <TraumaGuideFlow variant="primara" />;
}

export function TraumaGuidePermanenta() {
  return <TraumaGuideFlow variant="permanenta" />;
}
