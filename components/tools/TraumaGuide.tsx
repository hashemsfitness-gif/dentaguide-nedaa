"use client";

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, RotateCcw, Copy, Clock } from 'lucide-react';

interface StepOption {
  label: string;
  desc?: string;
  color: string;
  nextId?: string;
  resultId?: string;
}

interface StepData {
  num: number;
  title: string;
  desc?: string;
  principle?: string;
  options: StepOption[];
}

// --- DATA: PRIMÄRA TÄNDER ---
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
  'sublux': { color: 'blue', title: '📋 Subluxation', description: 'Ökad rörlighet, ej displacerad. Avvakta. Skonkost + klorhexidin 0,12 % 2 ggr/dag. Kontroll: 1 v, 4 v, 3 mån. God prognos.' },
  'avvakta': { color: 'green', title: '✅ Avvakta — observation', description: 'Ingen bettstörning + apex buckalt. Skonkost 1–2 v. Klorhexidinbaddning. Kontroll: 1 v, 4 v, 3 mån, 6 mån. Försäkringsanmälan.' },
  'slipa': { color: 'blue', title: '🔧 Ocklusionsjustering — slipa', description: 'Liten bettstörning → slipa störande kontakt med diamantborr. Kontrollera att barnet kan bita ihop normalt. Skonkost + klorhexidin.' },
  'ex-bett': { color: 'amber', title: '⚠️ Extraktion — stor bettstörning', description: 'Ocklusionsstörning ej lösbar med slipning. Extraktion i LA (beräkna barnvikt!). Hemostas. Postop-instruktioner till förälder. Försäkringsanmälan.' },
  'ex-apex': { color: 'red', title: '🚨 Extraktion — apex mot anlaget', description: 'Apex displacerat palatinalt → risk för skada på permanent tandanlag. Extraktion krävs. Använd ALDRIG apikalt tryck nära anlag. Försäkringsanmälan.' },
  'intru-b': { color: 'green', title: '✅ Intrusion — avvakta reeruption', description: 'Apex buckalt (bort från anlag). Avvakta spontan reeruption 1–6 månader. Kontroll var 4:e vecka. Om ingen reeruption 6 mån → extraktion. Försäkringsanmälan.' },
  'intru-p': { color: 'red', title: '🚨 Intrusion — extraktion krävs', description: 'Apex palatinalt (mot anlag). Hög risk för skada på permanent tandanlag. Extraktion. Försäkringsanmälan.' },
  'exart-ok': { color: 'red', title: '🚨 Exartikulation — ALDRIG replantation', description: 'Replanteras ALDRIG. Spolning koksalt, hemostas med kompress. Lugnande info, kontroll 1 vecka. Info till förälder: permanent anlag kan visa skada vid 6–7 år (hypomineralisering, formavvikelse). Försäkringsanmälan ALLTID.' },
  'asp': { color: 'red', title: '🚨 MISSTÄNKT ASPIRATION — AKUT REMISS', description: 'Tand ej hittad + hosta/andningsbesvär → AKUT remiss barnakut/sjukhus för lungröntgen. Vid stridor/andnöd: RING 112.' },
  'exart-rtg': { color: 'amber', title: '⚠️ Tand ej hittad — röntga omedelbart', description: 'Röntga för att utesluta total intrusion (tand uppslagen i benet). Om tom alveol på rtg = exartikulation bekräftad (replanteras aldrig). Om tand syns i benet = total intrusion → bedöm apex-riktning.' },
  'infrak': { color: 'green', title: '✅ Infraktion / Emaljfraktur', description: 'Ingen eller minimal substansförlust. Slipa eventuella vassa kanter. Ingen annan åtgärd krävs. Uppföljning vid ordinarie revision. Utmärkt prognos.' },
  'frak-ok': { color: 'blue', title: '📋 Okomplicerad kronfraktur', description: 'Dentin blottat utan pulpablotta. Slipa/runda vassa kanter. Palpera läpp (tandfragment?). Om stort dentinsår + kooperativt barn: GIC-förband. Fluorlack. Kontroll 4 v.' },
  'frak-komp': { color: 'amber', title: '⚠️ Komplicerad kronfraktur — pulpablotta', description: 'Litet/okooperativt barn (<3–4 år): EXTRAKTION är förstahandsval — tvinga aldrig smärtsam behandling.\nKooperativt äldre barn + vital tand + <24 h: partiell pulpotomi (Cvek) med Ca(OH)₂ eller MTA.\n>24 h eller nekrotisk pulpa: extraktion.' },
  'kronrot': { color: 'amber', title: '⚠️ Kronrotfraktur', description: 'Fraktur genom emalj, dentin och rotcement. Oftast dålig prognos i primära bettet. Avlägsna löst fragment. Extraktion rekommenderas i de flesta fall. Lämna djupt apikalt fragment (resorberas). Försäkringsanmälan.' },
  'rotfrak': { color: 'red', title: '🔴 Rotfraktur', description: 'Kronan kan se intakt ut men är extremt rörlig. Röntgen (2 vinklar) bekräftar frakturlinje i roten.\n\nÅtgärd: Extrahera koronalt fragment. LÄMNA apikalt fragment om det sitter djupt — att gräva efter det riskerar skada på permanenta anlaget. Resorberas spontant. Kontroll 1 mån + 1 år.' },
  'alv': { color: 'red', title: '🚨 Alveolarutskottsfraktur — Specialistfall', description: 'Rörligt bensegment med 2–4 tänder som enhet. Kraftig blödning.\n\nAkut: Reponering + flexibel splint 4 v (om möjligt). Små barn 1–3 år: splintning ofta omöjlig → skonkost/flytande föda + sårvård.\n\nRemittera till pedodontist/käkkirurg. Försäkringsanmälan.' }
};

// --- DATA: PERMANENTA TÄNDER ---
const PERMANENTA_STEPS = {
  's0': {
    num: 1,
    title: '🚨 Huvudskada?',
    desc: 'Medvetslöshet? Kräkningar? Nacksmärta?',
    options: [
      { label: '✅ Nej — patienten är alert', color: 'green', nextId: 's1' },
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
    desc: 'Testa sensibilitet (referensvärde). Röntga (uteslut rotfraktur).',
    options: [
      { label: 'Normal rörlighet, perkussionsöm', desc: 'Konkussion', color: 'green', nextId: 's-konk' },
      { label: 'Ökad rörlighet, ej displacerad', desc: 'Subluxation', color: 'blue', resultId: 'sublux' },
      { label: 'Tanden ser längre ut (dragen utåt)', desc: 'Extrusion', color: 'amber', nextId: 's-extru' },
      { label: 'Tryckt snett, kan vara låst', desc: 'Lateral luxation', color: 'amber', nextId: 's-lat' },
      { label: 'Intryckt i benet (kortare/osynlig)', desc: 'Intrusion', color: 'red', nextId: 's-intru' },
      { label: 'Flera tänder + ben rör sig som block', desc: 'Alveolarutskottsfraktur', color: 'red', resultId: 'alv' }
    ]
  },
  's-konk': {
    num: 4,
    title: 'Röntgen normal? (uteslut rotfraktur)',
    options: [
      { label: 'Ja — normal röntgenbild', desc: '→ Konkussion bekräftad', color: 'green', resultId: 'konk' },
      { label: 'Frakturlinje synlig i roten', desc: '→ Rotfraktur!', color: 'amber', resultId: 'rotfrak' }
    ]
  },
  's-extru': {
    num: 4,
    title: 'Rotutvecklingsstadium?',
    desc: 'Röntgen: öppet eller slutet apex?',
    options: [
      { label: 'Öppet apex', desc: 'Chans till revaskularisering', color: 'green', resultId: 'extru-open' },
      { label: 'Slutet apex', desc: 'Nekros förväntas → endo', color: 'amber', resultId: 'extru-closed' }
    ]
  },
  's-lat': {
    num: 4,
    title: 'Rotutvecklingsstadium?',
    options: [
      { label: 'Öppet apex', desc: 'Chans till revaskularisering', color: 'green', resultId: 'lat-open' },
      { label: 'Slutet apex', desc: 'Nekros sannolikt → endo', color: 'amber', resultId: 'lat-closed' }
    ]
  },
  's-intru': {
    num: 4,
    title: '⚠️ Allvarligast luxationstyp. Rotutveckling + intrusionsgrad?',
    options: [
      { label: 'Öppet apex', desc: 'Avvakta spontan reeruption 2–4 mån', color: 'green', resultId: 'intru-open' },
      { label: 'Slutet apex + intrusion < 7 mm', desc: 'Ortodontisk extrusion', color: 'amber', resultId: 'intru-closed-mild' },
      { label: 'Slutet apex + intrusion > 7 mm', desc: 'Kirurgisk repositionering', color: 'red', resultId: 'intru-closed-severe' }
    ]
  },
  's2b': {
    num: 3,
    title: 'Bekräfta: är det en permanent tand?',
    desc: 'Mjölktand replanteras ALDRIG. Kontrollera!',
    principle: '🚨 REPLANTATION SÅ FORT SOM MÖJLIGT — Varje minut räknas!',
    options: [
      { label: 'Ja — permanent tand', desc: '→ REPLANTATION', color: 'red', nextId: 's-avuls-exart' }, // Navigates to custom UI block
      { label: 'Nej — det är en mjölktand', desc: '→ Aldrig replantation', color: 'amber', resultId: 'mjolk-fel' }
    ]
  },
  's-avuls': { // Will jump here from custom UI
    num: 4,
    title: 'Extraoral tid + förvaringsmedium',
    desc: 'Hur länge? Hur förvarad?',
    options: [
      { label: '< 60 min, förvarad fuktigt (mjölk/saliv/koksalt)', desc: 'God prognos', color: 'green', nextId: 's-apex-avuls' },
      { label: '< 60 min, förvarad torrt', desc: 'Blötlägg koksalt 20 min → replantera', color: 'amber', nextId: 's-apex-avuls' },
      { label: '> 60 min, förvarad fuktigt', desc: 'PDL skadat, replantera ändå', color: 'amber', nextId: 's-apex-avuls' },
      { label: '> 60 min, torrt', desc: 'Dålig prognos, replantera ändå', color: 'red', nextId: 's-apex-avuls' }
    ]
  },
  's-apex-avuls': {
    num: 5,
    title: 'Rotutvecklingsstadium?',
    options: [
      { label: 'Öppet apex', desc: 'Monitorera revaskularisering', color: 'green', resultId: 'avuls-open' },
      { label: 'Slutet apex', desc: 'Rotbehandling inom 7–14 d', color: 'amber', resultId: 'avuls-closed' }
    ]
  },
  's2c': {
    num: 3,
    title: 'Vad ser du i frakturytan?',
    desc: 'Palpera ALLTID läpparna — tandfragment kan vara inbäddade! Har patienten med sig fragmentet?',
    options: [
      { label: 'Spricka utan substansförlust', desc: 'Infraktion', color: 'green', resultId: 'infrak' },
      { label: 'Emalj av, inget dentin blottat', desc: 'Emaljfraktur', color: 'green', resultId: 'emalj' },
      { label: 'Dentin blottat, INGEN röd punkt', desc: 'Okomplicerad kronfraktur', color: 'blue', resultId: 'frak-ok' },
      { label: 'Röd punkt / blödning i frakturyta', desc: 'Komplicerad (pulpablotta)', color: 'amber', nextId: 's-cvek' },
      { label: 'Fraktur under tandköttet', desc: 'Kronrotfraktur', color: 'amber', resultId: 'kronrot' },
      { label: 'Kronan intakt men extremt rörlig', desc: 'Rotfraktur (rtg bekräftar)', color: 'amber', resultId: 'rotfrak' },
      { label: 'Flera tänder + ben rör sig', desc: 'Alveolarutskottsfraktur', color: 'red', resultId: 'alv' }
    ]
  },
  's-cvek': {
    num: 4,
    title: 'Är Cvek (partiell pulpotomi) möjlig?',
    desc: 'Krav: vital pulpa (blödning), < 24 h sedan skada, ej symtomgivande.',
    options: [
      { label: 'Ja — vital, < 24 h, kooperativ', desc: '→ Cvek med MTA/Biodentine', color: 'green', resultId: 'cvek-ok' },
      { label: 'Nej — nekrotisk / > 24 h / symtom', desc: '→ Endodonti / Extraktion', color: 'red', resultId: 'cvek-nej' }
    ]
  }
};

const RESULTS_PERMANENTA = {
  'rem': { color: 'red', title: '🚨 AKUT REMISS — Sjukhus/Barnakut', description: 'Tandbehandling väntar. Om utslagen tand: skicka den med i mjölk!' },
  'konk': { color: 'green', title: '✅ Konkussion', description: 'Normal rörlighet, perkussionsöm, normal röntgenbild. Avvakta. Skonkost 1–2 v. Sensibilitet: registrera referensvärde.\nKontroll: 1 v, 3 v, 3 mån, 6 mån. Utmärkt prognos.' },
  'sublux': { color: 'blue', title: '📋 Subluxation', description: 'Ökad rörlighet, ej displacerad. Avvakta. Skonkost 2 v. Klorhexidin 0,12 %. Ev. flexibel splint 2 v (komfort).\nKontroll: 1 v, 4 v, 3 mån. God prognos.' },
  'extru-open': { color: 'green', title: '✅ Extrusion — öppet apex', description: 'Reponera försiktigt (digitalt tryck). Flexibel splint 2 v. Öppet apex: chans till revaskularisering — monitorera sensibilitet.\nKontroll: 2 v (splintborttagning), 4 v, 3 mån, 6 mån, 1 år.' },
  'extru-closed': { color: 'amber', title: '⚠️ Extrusion — slutet apex', description: 'Reponera försiktigt. Flexibel splint 2 v. Slutet apex: pulpanekros förväntas → planera endodontisk behandling.\nKontroll: 2 v (splint + endo-start), 4 v, 3 mån, 6 mån, 1 år.' },
  'lat-open': { color: 'green', title: '✅ Lateral luxation — öppet apex', description: 'Reponering: lösgör från palatinalt med fingertryck/tång. Flexibel splint 4 v. Öppet apex: avvakta, chans till revaskularisering.\nMonitorera sensibilitet noggrant. Kontroll: 2 v, 4 v (splint bort), 3 mån, 6 mån, 1 år.' },
  'lat-closed': { color: 'amber', title: '⚠️ Lateral luxation — slutet apex', description: 'Reponering under LA. Flexibel splint 4 v. Slutet apex: pulpanekros sannolikt → planera endodontisk behandling.\nHög risk för extern rotresorption. Kontroll: 2 v, 4 v, 3 mån, 6 mån, 1 år, årligen 5 år.' },
  'intru-open': { color: 'green', title: '✅ Intrusion — öppet apex: avvakta', description: 'Avvakta spontan reeruption (förväntas inom 2–4 månader). Om ingen reeruption → ortodontisk extrusion.\nMonitorera sensibilitet. Om nekros → endodonti.' },
  'intru-closed-mild': { color: 'amber', title: '⚠️ Intrusion < 7 mm — ortodontisk extrusion', description: 'Slutet apex + intrusion < 7 mm: ortodontisk extrusion rekommenderas. Flexibel splint 4 v efter extrusion.\nEndodonti inom 2–3 v (nekros förväntas). Hög risk för resorption.' },
  'intru-closed-severe': { color: 'red', title: '🚨 Intrusion > 7 mm — kirurgisk repositionering', description: 'Slutet apex + intrusion > 7 mm: kirurgisk repositionering under LA. Flexibel splint 4 v.\nEndodonti inom 2–3 v. Mycket hög risk för extern rotresorption. Intensiv uppföljning.' },
  'avuls-open': { color: 'green', title: '✅ Replantation — öppet apex', description: 'Tanden replanterad. Flexibel splint 2 v. Antibiotika: PcV. Klorhexidin 2 ggr/dag.\nÖppet apex: monitorera revaskularisering — sensibilitetstest vid varje kontroll.\nOm nekros utvecklas → apexifikation/endodonti.\nKontroll: 2 v, 4 v, 3 mån, 6 mån, 1 år, årligen 5 år.' },
  'avuls-closed': { color: 'amber', title: '⚠️ Replantation — slutet apex', description: 'Tanden replanterad. Flexibel splint 2 v. Antibiotika: PcV.\nSlutet apex: ROTBEHANDLING inom 7–14 dagar (nekros förväntas).\nCa(OH)₂ som intrakanal-medikament 1 mån → definitiv rotfyllning.\nKontroll: 2 v, 4 v, 3 mån, 6 mån, 1 år, årligen 5 år.\nFörsäkringsanmälan ALLTID.' },
  'mjolk-fel': { color: 'amber', title: '⚠️ Mjölktand — ALDRIG replantation', description: 'Mjölktänder replanteras aldrig. Risk för skada på permanent anlag. Se flödesschema för primära tänder.\nSpolning, hemostas. Försäkringsanmälan.' },
  'infrak': { color: 'green', title: '✅ Infraktion', description: 'Spricka i emaljen utan substansförlust. Synlig vid transilluminering. Ingen åtgärd krävs.\nRegistrera sensibilitet (referensvärde). Uppföljning vid ordinarie revision.' },
  'emalj': { color: 'green', title: '✅ Emaljfraktur', description: 'Förlust av emalj utan dentinblotta. Slipa eventuella vassa kanter. Ev. komposit vid estetisk zon.\nUtmärkt prognos.' },
  'frak-ok': { color: 'blue', title: '📋 Okomplicerad kronfraktur (emalj + dentin)', description: 'Dentin blottat utan pulpablotta. Sensibilitet positiv.\nFragment medtaget → bonding (adhesiv + flödbar komposit).\nFragment saknas → komposituppbyggnad.\nAlternativ: GIC som temporärt förband.\nPalpera läpp (fragment?). Kontroll: 3–4 v, 3 mån, 1 år.\nGod prognos (1–6 % nekrosrisk).' },
  'cvek-ok': { color: 'green', title: '✅ Komplicerad kronfraktur — Cvek-pulpotomi', description: 'Partiell pulpotomi (Cvek) = förstahandsval. Kofferdam obligatorisk.\n1. Avlägsna 1–2 mm inflammerad pulpa med roserande borr under spolning.\n2. Hemostas med steril koksaltpellet.\n3. Täck med MTA / Biodentine.\n4. Temporär GIC → återbesök 24–48 h för slutlig komposit.\nSärskilt viktigt vid öppet apex (bevara vitalitet → rotutveckling).\nKontroll: 4 v, 3 mån, 6 mån, 1 år.' },
  'cvek-nej': { color: 'red', title: '🔴 Komplicerad kronfraktur — Cvek EJ möjlig', description: 'Pulpa nekrotisk, symtomgivande eller > 24 h sedan skada.\nÖppet apex: apexifikation med MTA (specialist).\nSlutet apex: konventionell endodonti.\nOm tanden ej restaurerbar: extraktion.\nRemittera vid osäkerhet.' },
  'kronrot': { color: 'amber', title: '⚠️ Kronrotfraktur', description: 'Fraktur genom emalj, dentin och rotcement. Avlägsna löst fragment.\nBedöm restaurerbarhet:\n— Ytlig fraktur: GIC/komposit.\n— Djup fraktur: ortodontisk/kirurgisk extrusion + endo + krona.\n— Hopplös prognos: extraktion.\nOfta komplex behandling — överväg remiss.' },
  'rotfrak': { color: 'amber', title: '⚠️ Rotfraktur', description: 'Kronan rörlig men ser intakt ut. Röntgen (2+ vinklar) bekräftar frakturlinje.\nReponera koronalt fragment om displacerat. Flexibel splint:\n— Apikal/mellersta tredjedelen: 4 v.\n— Cervikala tredjedelen: 4 månader.\nMonitorera sensibilitet. Om nekros → endo BARA av koronalt fragment.\nPrognos: apikal fraktur bäst, cervikal sämst.' },
  'alv': { color: 'red', title: '🚨 Alveolarutskottsfraktur', description: 'Rörligt bensegment med flera tänder. Kraftig blödning, bettstörning.\nReponering under LA. Flexibel splint 4 v. Kontrollera ocklusion.\nAntibiotika vid indikation. Monitorera sensibilitet alla tänder i segmentet.\nVid misstanke om käkbensfraktur: remiss käkkirurg.\nKontroll: 1 v, 4 v, 3 mån, 6 mån, 1 år.' }
};

// UI Components
function TraumaResultCard({ result, onReset }: { result: any, onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const getColors = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-100/50 border-red-500/30 text-red-900';
      case 'blue': return 'bg-blue-100/50 border-blue-500/30 text-blue-900';
      case 'green': return 'bg-emerald-100/50 border-emerald-500/30 text-emerald-900';
      case 'amber': return 'bg-amber-100/50 border-amber-500/30 text-amber-900';
      default: return 'bg-gray-100/50 border-gray-500/30 text-gray-900';
    }
  };

  const copyToClipboard = () => {
    const text = `${result.title}\n\n${result.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 rounded-2xl border ${getColors(result.color)} animate-in fade-in slide-in-from-bottom-4`}>
      <h3 className="text-xl font-bold mb-3">{result.title}</h3>
      <div className="space-y-3 mb-6">
        {result.description.split('\n').map((line: string, i: number) => (
          <p key={i} className="leading-relaxed opacity-90">{line}</p>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-black/10 text-sm opacity-80 mb-6 flex flex-col gap-1">
        <div>📋 Försäkringsanmälan ALLTID</div>
        <div>📅 Boka uppföljning</div>
        <div>📝 Dokumentera i journal</div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 border border-black/10 rounded-xl font-medium transition-colors"
        >
          <Copy className="w-4 h-4" />
          {copied ? '✅ Kopierat!' : 'Kopiera text'}
        </button>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Börja om
        </button>
      </div>
    </div>
  );
}

function StepButton({ option, onClick }: { option: any, onClick: () => void }) {
  const getColors = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300';
      case 'blue': return 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300';
      case 'green': return 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300';
      case 'amber': return 'border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300';
      default: return 'border-gray-200 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`p-4 text-left border rounded-xl bg-white/40 backdrop-blur-sm transition-all duration-200 ${getColors(option.color)}`}
    >
      <div className="font-semibold text-[0.95rem]">{option.label}</div>
      {option.desc && <div className="text-xs opacity-70 mt-1 font-medium">{option.desc}</div>}
    </button>
  );
}

// MAIN COMPONENTS

export function TraumaGuidePrimara() {
  const [history, setHistory] = useState<string[]>(['s0']);
  const [resultId, setResultId] = useState<string | null>(null);

  const currentStepId = history[history.length - 1];
  const step = PRIMARA_STEPS[currentStepId as keyof typeof PRIMARA_STEPS] as StepData;
  const result = resultId ? RESULTS_PRIMARA[resultId as keyof typeof RESULTS_PRIMARA] : null;

  const handleOptionClick = (option: any) => {
    if (option.resultId) {
      setResultId(option.resultId);
    } else if (option.nextId) {
      setHistory([...history, option.nextId]);
    }
  };

  const handleBack = () => {
    if (resultId) {
      setResultId(null);
    } else if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const handleReset = () => {
    setHistory(['s0']);
    setResultId(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center">
        <strong className="text-red-600 text-sm">⚠️ GRUNDPRINCIP: Primära tänder ska ALDRIG reponeras med kraft eller replanteras. Mål: smärtfrihet + skydda permanenta anlaget.</strong>
      </div>

      <div className="flex items-center justify-between mb-6">
        {history.length > 1 || resultId ? (
          <button onClick={handleBack} className="flex items-center text-sm font-medium text-[#0E3B52]/70 hover:text-[#0E3B52] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Tillbaka
          </button>
        ) : <div />}
        <button onClick={handleReset} className="flex items-center text-sm font-medium text-[#0E3B52]/70 hover:text-[#0E3B52] transition-colors">
          <RotateCcw className="w-4 h-4 mr-1" /> Börja om
        </button>
      </div>

      {result ? (
        <TraumaResultCard result={result} onReset={handleReset} />
      ) : (
        <div className="glass-bento bg-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[#0E3B52] text-white flex items-center justify-center font-bold text-xs">
              {step.num}
            </div>
            <div className="text-xs font-bold tracking-wider text-[#0E3B52]/50 uppercase">Steg {step.num}</div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E3B52] mb-2">{step.title}</h2>
          {step.desc && <p className="text-[#0E3B52]/70 text-sm mb-6">{step.desc}</p>}
          {step.principle && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-bold border border-red-200 mb-6">
              {step.principle}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {step.options.map((opt, i) => (
              <StepButton key={i} option={opt} onClick={() => handleOptionClick(opt)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TraumaGuidePermanenta() {
  const [history, setHistory] = useState<string[]>(['s0']);
  const [resultId, setResultId] = useState<string | null>(null);

  const currentStepId = history[history.length - 1];
  const isCustomExartikulation = currentStepId === 's-avuls-exart';
  const step = !isCustomExartikulation ? PERMANENTA_STEPS[currentStepId as keyof typeof PERMANENTA_STEPS] as StepData : null;
  const result = resultId ? RESULTS_PERMANENTA[resultId as keyof typeof RESULTS_PERMANENTA] : null;

  const handleOptionClick = (option: any) => {
    if (option.resultId) {
      setResultId(option.resultId);
    } else if (option.nextId) {
      setHistory([...history, option.nextId]);
    }
  };

  const handleBack = () => {
    if (resultId) {
      setResultId(null);
    } else if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const handleReset = () => {
    setHistory(['s0']);
    setResultId(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center">
        <strong className="text-red-600 text-sm">⚠️ GRUNDPRINCIP: Utslagen permanent tand = HYPERAKUT replantation. Öppet apex = bevara vitalitet (Cvek). Tid är avgörande.</strong>
      </div>

      <div className="flex items-center justify-between mb-6">
        {history.length > 1 || resultId ? (
          <button onClick={handleBack} className="flex items-center text-sm font-medium text-[#0E3B52]/70 hover:text-[#0E3B52] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Tillbaka
          </button>
        ) : <div />}
        <button onClick={handleReset} className="flex items-center text-sm font-medium text-[#0E3B52]/70 hover:text-[#0E3B52] transition-colors">
          <RotateCcw className="w-4 h-4 mr-1" /> Börja om
        </button>
      </div>

      {result ? (
        <TraumaResultCard result={result} onReset={handleReset} />
      ) : isCustomExartikulation ? (
        <div className="glass-bento bg-white/50 border-red-200">
          <div className="bg-red-600 text-white p-4 -mt-8 -mx-10 rounded-t-2xl mb-6 flex items-center justify-center gap-3">
            <Clock className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-wider">AGERA NU — &lt; 60 MINUTER</h2>
          </div>
          
          <div className="space-y-4 mb-8 text-[#0E3B52]">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
              <p>Håll tanden i <strong>KRONAN</strong> (aldrig roten)</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
              <p>Skölj 10 sek fysiologisk koksalt om smutsig (aldrig scrubba)</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
              <p className="font-bold">Replantation OMEDELBART</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
              <p>Annars förvara: Mjölk &gt; Koksalt &gt; Saliv &gt; (ALDRIG vatten)</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
              <p>Splint 2 veckor flexibel</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">6</div>
              <p>Antibiotika PcV 25mg/kg × 3 i 7 dagar (barn) / 1,6g × 3 (vuxen)</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">7</div>
              <p>Stelkrampsstatus</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">8</div>
              <p>Endo 7-10 dagar post replantation (vid slutet apex)</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">9</div>
              <p>RTG: 4v, 3mån, 6mån, 1år, 2år, 5år</p>
            </div>
          </div>
          
          <button 
            onClick={() => setHistory([...history, 's-avuls'])}
            className="w-full p-4 bg-[#CC5833] hover:bg-[#CC5833]/90 text-white font-bold rounded-xl flex items-center justify-center transition-colors"
          >
            Vidare till detaljerat apex-beslut <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      ) : step ? (
        <div className="glass-bento bg-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[#0E3B52] text-white flex items-center justify-center font-bold text-xs">
              {step.num}
            </div>
            <div className="text-xs font-bold tracking-wider text-[#0E3B52]/50 uppercase">Steg {step.num}</div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0E3B52] mb-2">{step.title}</h2>
          {step.desc && <p className="text-[#0E3B52]/70 text-sm mb-6">{step.desc}</p>}
          {step.principle && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-bold border border-red-200 mb-6">
              {step.principle}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {step.options.map((opt, i) => (
              <StepButton key={i} option={opt} onClick={() => handleOptionClick(opt)} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
