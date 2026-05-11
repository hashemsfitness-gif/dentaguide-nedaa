export type PatientGroup = 'adult' | 'child_big' | 'child_small' | 'elderly' | 'pregnant';
export type DrugId = 'paracetamol' | 'ibuprofen' | 'pcv' | 'klindamycin' | 'artikain' | 'naproxen' | 'metronidazol' | 'morfin' | 'oxikodon' | 'amoxicillin_profylax';

export interface DoseResult {
  dose: number;
  unit: string;
  interval: string;
  maxDay: number | null;
  maxDayUnit: string;
  form: string;
  note: string;
  special: string | null;
  maxDoseWarning: boolean;
}

function contraindicated(note: string, special = 'KONTRAINDICERAT'): DoseResult {
  return { dose: 0, unit: '', interval: '', maxDay: 0, maxDayUnit: '', form: special, note, special, maxDoseWarning: true };
}

export function calculateDose(
  drug: DrugId,
  weight: number,
  group: PatientGroup,
  age?: number,
  trimester?: number
): DoseResult {
  // Artikain
  if (drug === 'artikain') {
    if ((age !== undefined && age < 4) || weight < 20 || group === 'child_small') {
      throw new Error('Artikain kontraindicerat för barn under 4 år eller <20kg. Använd lidokain.');
    }
    const maxDose = Math.round(Math.min(weight * 7, 500));
    return {
      dose: maxDose,
      unit: 'mg maxdos (7 mg/kg)',
      interval: 'Per behandlingstillfälle',
      maxDay: null,
      maxDayUnit: `= ${Math.round(maxDose / 68 * 10) / 10} ampuller à 68 mg`,
      form: 'Cylinderampull 1,8 ml',
      note: 'Maxdos adrenalin: 100 µg.',
      special: null,
      maxDoseWarning: false
    };
  }

  // Ibuprofen
  if (drug === 'ibuprofen') {
    if (group === 'pregnant' && trimester === 3) {
      throw new Error('Kontraindicerat i 3:e trimestern');
    }
    if (group === 'pregnant') {
      return contraindicated('Kontraindicerat under >16 v.');
    }
    if (group === 'elderly') {
      return contraindicated('COX-hämmare undviks till äldre över 75 år.', 'UNDVIK');
    }
    if (group === 'adult') {
      return { dose: 400, unit: 'mg', interval: 'var 6–8:e timme', maxDay: 1200, maxDayUnit: 'mg/dygn', form: '400 mg tabletter', note: 'Max 1200 mg/dag (receptfritt).', special: null, maxDoseWarning: false };
    }
    const dose = Math.min(weight * 10, 400);
    return {
      dose: dose,
      unit: 'mg (10 mg/kg)',
      interval: 'var 6–8:e timme',
      maxDay: Math.min(weight * 40, 1200),
      maxDayUnit: 'mg/dygn',
      form: weight < 20 ? 'Oral suspension' : 'Tabletter',
      note: 'Barn: 10 mg/kg per dos.',
      special: null,
      maxDoseWarning: weight * 10 > 400
    };
  }

  // Paracetamol
  if (drug === 'paracetamol') {
    if (group === 'adult' || group === 'pregnant') {
      return { dose: 1000, unit: 'mg', interval: 'var 6:e timme', maxDay: 4000, maxDayUnit: 'mg/dygn', form: '500 mg tabletter (2 st)', note: 'Förstahandsval.', special: null, maxDoseWarning: false };
    }
    if (group === 'elderly') {
      return { dose: 1000, unit: 'mg', interval: 'var 6-8:e timme', maxDay: 3000, maxDayUnit: 'mg/dygn', form: '500 mg tabletter (2 st)', note: 'Reducerad maxdos 3 g/dygn för äldre.', special: null, maxDoseWarning: false };
    }
    const dose = Math.min(weight * 15, 1000);
    return {
      dose: dose,
      unit: 'mg (15 mg/kg)',
      interval: 'var 6:e timme',
      maxDay: Math.min(weight * 60, 4000),
      maxDayUnit: 'mg/dygn',
      form: weight < 25 ? 'Oral lösning' : 'Tabletter',
      note: 'Barn: 15 mg/kg per dos.',
      special: null,
      maxDoseWarning: weight * 15 > 1000
    };
  }

  // PcV
  if (drug === 'pcv') {
    if (group === 'adult' || group === 'elderly' || group === 'pregnant') {
      return { dose: 1600, unit: 'mg', interval: '3 gånger dagligen i 5–7 dagar', maxDay: 4800, maxDayUnit: 'mg/dygn', form: '800 mg tabletter (2 st)', note: 'Förstahandsval.', special: null, maxDoseWarning: false };
    }
    const dose = Math.min(weight * 25, 1600);
    return {
      dose: dose,
      unit: 'mg (25 mg/kg)',
      interval: '3 gånger dagligen i 5–7 dagar',
      maxDay: Math.min(weight * 75, 4800),
      maxDayUnit: 'mg/dygn',
      form: weight < 20 ? 'Oral suspension (50 mg/ml)' : 'Tabletter',
      note: '25 mg/kg × 3. Källa: Tandvårdens Läkemedel 2024–2025; Strama 2024; VGR doseringstabell.',
      special: null,
      maxDoseWarning: weight * 25 > 1600
    };
  }

  // Klindamycin
  if (drug === 'klindamycin') {
    if (group === 'pregnant') {
      return {
        dose: 150,
        unit: 'mg',
        interval: '3 gånger dagligen i 5–7 dagar',
        maxDay: 450,
        maxDayUnit: 'mg/dygn',
        form: '150 mg kapslar',
        note: 'Klindamycin passerar placenta (FASS kat. B:3). Använd endast vid verifierad pc-allergi när PcV ej är möjligt — undvik om alternativ finns. Samråd med obstetriker vid längre kur. Källa: Tandvårdens Läkemedel 2024–2025; FASS.',
        special: 'GRAVIDITET — försiktighet, samråd om möjligt',
        maxDoseWarning: true
      };
    }
    if (group === 'adult' || group === 'elderly') {
      return { dose: 150, unit: 'mg', interval: '3 gånger dagligen i 5–7 dagar', maxDay: 450, maxDayUnit: 'mg/dygn', form: '150 mg kapslar', note: 'Vid pc-allergi. VGR allvarlig infektion: 600mg × 3 i 5–7 dagar — verifiera mot aktuell regional riktlinje.', special: null, maxDoseWarning: false };
    }
    const dose = Math.min(weight * 5, 150);
    return {
      dose: dose,
      unit: 'mg (5 mg/kg)',
      interval: '3 gånger dagligen i 5–7 dagar',
      maxDay: Math.min(weight * 15, 450),
      maxDayUnit: 'mg/dygn',
      form: weight < 25 ? 'Oral suspension' : 'Kapslar',
      note: '5 mg/kg × 3. Vid verifierad pc-allergi. Källa: Tandvårdens Läkemedel 2024–2025.',
      special: null,
      maxDoseWarning: weight * 5 > 150
    };
  }

  // Naproxen
  if (drug === 'naproxen') {
    if (group === 'pregnant' && trimester === 3) {
      throw new Error('Naproxen kontraindicerat i 3:e trimestern (fosterstängning av ductus arteriosus).');
    }
    if (group === 'pregnant') {
      return contraindicated('Kontraindicerat under graviditet — använd Paracetamol.', 'UNDVIK');
    }
    if (group === 'elderly') {
      return contraindicated('NSAID undviks till äldre >75 år (njurpåverkan, GI-risk). Använd Paracetamol.', 'UNDVIK');
    }
    if (group === 'adult') {
      return { dose: 500, unit: 'mg', interval: '2 gånger dagligen i 10 dagar', maxDay: 1000, maxDayUnit: 'mg/dygn', form: '500 mg tabletter', note: 'Screena kontraindikationer: Astma/NSAID-känsliga, Ulcus, Hjärtsvikt, Högt blodtryck, Njurar, Warfarin.', special: null, maxDoseWarning: false };
    }
    return contraindicated('Naproxen rekommenderas ej till barn under 12 år utan läkarordination.', 'UNDVIK');
  }

  // Metronidazol
  if (drug === 'metronidazol') {
    if (group === 'pregnant') {
      return contraindicated('Kontraindicerat trimester 1. Trimester 2–3 undviks — läkarordination krävs.');
    }
    if (group === 'adult' || group === 'elderly') {
      return { dose: 400, unit: 'mg', interval: '3 gånger dagligen i 5 dagar', maxDay: 1200, maxDayUnit: 'mg/dygn', form: '400 mg tabletter', note: 'Vid anaerob infektion / ANUG / terapisvikt. OBS: Alkohol strikt kontraindicerat under och 48h efter kuren (Antabuseffekt).', special: 'Alkohol kontraindicerat 48h efter sista dos', maxDoseWarning: false };
    }
    const dose = Math.min(weight * 7.5, 400);
    return {
      dose: dose,
      unit: 'mg (7,5 mg/kg)',
      interval: '3 gånger dagligen i 5 dagar',
      maxDay: Math.min(weight * 22.5, 1200),
      maxDayUnit: 'mg/dygn',
      form: weight < 25 ? 'Oral suspension' : 'Tabletter',
      note: 'OBS: Alkohol strikt kontraindicerat under och 48h efter kuren.',
      special: 'Alkohol kontraindicerat 48h efter sista dos',
      maxDoseWarning: weight * 7.5 > 400
    };
  }

  // Morfin (Stark opioid — narkotikaförteckning II)
  if (drug === 'morfin') {
    if (group === 'pregnant') {
      return contraindicated('Morfin passerar placenta — neonatal andningsdepression nära partus. Endast i samråd med läkare/obstetriker.', 'UNDVIK — samråd läkare');
    }
    if (group === 'child_small' || (group === 'child_big' && weight < 30)) {
      throw new Error('Morfin till barn <30 kg rekommenderas EJ inom tandvård. Kontakta barnmedicin eller specialisttandvård.');
    }
    if (group === 'elderly') {
      return {
        dose: 2.5,
        unit: 'mg per os (startvärde)',
        interval: 'var 4–6:e timme — titrera försiktigt',
        maxDay: null,
        maxDayUnit: 'Titrera individuellt — max 30 tabletter per förskrivning',
        form: 'Tablett 5 mg (delbar) eller oral lösning 2 mg/ml',
        note: 'Äldre: starta 2,5 mg pga reducerad clearance. Risk andningsdepression, konfusion, förstoppning. Rekommendera laxantia. Källa: Tandvårdens Läkemedel 2024–2025 kap. 10.',
        special: 'Narkotikarecept (förteckning II) · HSLF-FS 2021:75',
        maxDoseWarning: false
      };
    }
    if (group === 'adult') {
      return {
        dose: 5,
        unit: 'mg per os (startvärde)',
        interval: 'var 4:e timme — titrera efter effekt',
        maxDay: null,
        maxDayUnit: 'Max 30 tabletter per förskrivning',
        form: 'Tablett 5 mg (delbar) eller oral lösning 2 mg/ml',
        note: 'Endast vid svår postoperativ smärta när NSAID + paracetamol är otillräckligt. Allmäntandläkare har förskrivningsrätt (max 30 tabletter/tillfälle). Kortast möjliga duration. Kombinera alltid med paracetamol/NSAID (opioidbesparande). Källa: Tandvårdens Läkemedel 2024–2025 kap. 10.',
        special: 'Narkotikarecept (förteckning II) · HSLF-FS 2021:75',
        maxDoseWarning: false
      };
    }
    // Barn ≥30 kg: 0,2–0,3 mg/kg
    const dose = Math.round(Math.min(weight * 0.2, 10) * 10) / 10;
    return {
      dose,
      unit: 'mg per os (0,2–0,3 mg/kg)',
      interval: 'var 4–6:e timme',
      maxDay: null,
      maxDayUnit: 'Max 10 mg per dos',
      form: `Oral lösning 2 mg/ml — ${Math.round(dose / 2 * 10) / 10} ml per dos`,
      note: 'Barn >30 kg: 0,2–0,3 mg/kg per dos. Förskrivning till barn kräver specialisttandvård. Källa: Tandvårdens Läkemedel 2024–2025 kap. 10; ePed.',
      special: 'Narkotikarecept (förteckning II) · HSLF-FS 2021:75',
      maxDoseWarning: false
    };
  }

  // Oxikodon (Stark opioid — narkotikaförteckning II)
  // Indicerat vid kraftigt nedsatt njurfunktion när morfin är olämpligt.
  // Förskrivning kräver specialistkompetens i käkkirurgi.
  if (drug === 'oxikodon') {
    if (group === 'pregnant') {
      return contraindicated('Oxikodon passerar placenta — neonatal andningsdepression. Endast i samråd med läkare.', 'UNDVIK — samråd läkare');
    }
    if (group === 'child_small' || group === 'child_big') {
      throw new Error('Oxikodon till barn rekommenderas EJ inom tandvård. Kräver specialisttandvård.');
    }
    if (group === 'elderly') {
      return {
        dose: 5,
        unit: 'mg per os (startvärde)',
        interval: 'var 4–6:e timme — titrera försiktigt',
        maxDay: null,
        maxDayUnit: 'Titrera individuellt',
        form: 'OxyNorm 5 mg kapsel eller oral lösning 5 mg/ml (1 ml per dos)',
        note: 'Äldre: starta lågt och titrera. Indicerat vid kraftigt nedsatt njurfunktion när morfin är olämpligt. Targiniq (oxikodon + naloxon) föredras vid >1 dos — minskar förstoppning. Förskrivning kräver specialistkompetens i käkkirurgi. Källa: Tandvårdens Läkemedel 2024–2025 kap. 10.',
        special: 'Narkotikarecept (förteckning II) · Specialistkompetens käkkirurgi · HSLF-FS 2021:75',
        maxDoseWarning: false
      };
    }
    // Adult
    return {
      dose: 5,
      unit: 'mg per os (startvärde)',
      interval: 'var 4–6:e timme',
      maxDay: null,
      maxDayUnit: 'Titrera individuellt',
      form: 'OxyNorm 5 mg kapsel eller oral lösning 5 mg/ml (1 ml per dos)',
      note: 'Indicerat vid kraftigt nedsatt njurfunktion när morfin är olämpligt. Targiniq (oxikodon + naloxon) föredras vid >1 dos — minskar förstoppning. Förskrivning kräver specialistkompetens i käkkirurgi. Källa: Tandvårdens Läkemedel 2024–2025 kap. 10.',
      special: 'Narkotikarecept (förteckning II) · Specialistkompetens käkkirurgi · HSLF-FS 2021:75',
      maxDoseWarning: false
    };
  }

  // Amoxicillin engångsprofylax (endokardit / sinuskommunikation)
  // Källa: Tandvårdens Läkemedel 2024–2025; ESC Riktlinjer 2023.
  if (drug === 'amoxicillin_profylax') {
    if (group === 'pregnant') {
      return {
        dose: 2000,
        unit: 'mg engångsdos',
        interval: '60 min före ingrepp',
        maxDay: 2000,
        maxDayUnit: 'mg (engångsdos)',
        form: '500 mg tabletter (4 st) eller 1000 mg (2 st)',
        note: 'Amoxicillin är förstahandsval — säker under graviditet. Endast vid striktt indikation (endokarditprofylax). Källa: Tandvårdens Läkemedel 2024–2025; ESC 2023.',
        special: 'Engångsprofylax · 60 min före ingrepp',
        maxDoseWarning: false
      };
    }
    if (group === 'adult' || group === 'elderly') {
      return {
        dose: 2000,
        unit: 'mg engångsdos',
        interval: '60 min före ingrepp',
        maxDay: 2000,
        maxDayUnit: 'mg (engångsdos)',
        form: '500 mg tabletter (4 st) eller 1000 mg (2 st)',
        note: 'Engångsdos 60 minuter före ingreppet. Indicerat vid endokarditrisk eller sinuskommunikation till frisk bihåla vid extraktion. Källa: Tandvårdens Läkemedel 2024–2025; ESC 2023; Strama 2024.',
        special: 'Engångsprofylax · 60 min före ingrepp',
        maxDoseWarning: false
      };
    }
    // Barn: 50 mg/kg engångsdos, max 2 g
    const dose = Math.min(weight * 50, 2000);
    return {
      dose,
      unit: 'mg engångsdos (50 mg/kg)',
      interval: '60 min före ingrepp',
      maxDay: dose,
      maxDayUnit: 'mg (engångsdos, max 2 g)',
      form: weight < 25 ? 'Oral suspension (50 mg/ml)' : 'Tabletter',
      note: 'Barn: 50 mg/kg engångsdos (max 2 g) 60 minuter före ingreppet. Källa: Tandvårdens Läkemedel 2024–2025; ESC 2023.',
      special: 'Engångsprofylax · 60 min före ingrepp',
      maxDoseWarning: false
    };
  }

  return { dose: 0, unit: '', interval: '', maxDay: 0, maxDayUnit: '', form: '', note: 'Implementering saknas', special: null, maxDoseWarning: false };
}
