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
    const dose = Math.min(weight * 12.5, 1600);
    return {
      dose: dose,
      unit: 'mg (12,5 mg/kg)',
      interval: '3 gånger dagligen i 5–7 dagar',
      maxDay: Math.min(weight * 37.5, 4800),
      maxDayUnit: 'mg/dygn',
      form: weight < 20 ? 'Oral suspension' : 'Tabletter',
      note: '12,5 mg/kg × 3',
      special: null,
      maxDoseWarning: weight * 12.5 > 1600
    };
  }

  // Klindamycin
  if (drug === 'klindamycin') {
    if (group === 'adult' || group === 'elderly' || group === 'pregnant') {
      return { dose: 150, unit: 'mg', interval: '3 gånger dagligen i 5–7 dagar', maxDay: 450, maxDayUnit: 'mg/dygn', form: '150 mg kapslar', note: 'Vid pc-allergi. VGR allvarlig infektion: 600mg × 3 i 5–7 dagar — verifiera mot aktuell regional riktlinje.', special: null, maxDoseWarning: false };
    }
    const dose = Math.min(weight * 6, 150);
    return {
      dose: dose,
      unit: 'mg (6 mg/kg)',
      interval: '3 gånger dagligen i 5–7 dagar',
      maxDay: Math.min(weight * 18, 450),
      maxDayUnit: 'mg/dygn',
      form: weight < 25 ? 'Oral suspension' : 'Kapslar',
      note: '6 mg/kg × 3. Vid pc-allergi.',
      special: null,
      maxDoseWarning: weight * 6 > 150
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

  return { dose: 0, unit: '', interval: '', maxDay: 0, maxDayUnit: '', form: '', note: 'Implementering saknas', special: null, maxDoseWarning: false };
}
