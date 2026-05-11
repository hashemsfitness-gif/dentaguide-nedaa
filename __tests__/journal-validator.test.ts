import { validateJournal, detectPiiInInput } from '../lib/journal-validator';
import { describe, it, expect } from 'vitest';

const baseJournal = {
  anamnes: 'Patient kom akut med värk i 26.',
  status: 'Perkussionsöm 26. Kyla neg.',
  diagnos: {
    trolig: 'Symptomatisk apikal parodontit',
    icd_kod: 'K04.4',
    differentialdiagnoser: [],
  },
  behandling: {
    atgard: 'Trepanation och rensning.',
    lokalanestesi: 'Artikain 1.8ml',
    lakemedel: 'PcV 1,6 g x 3 i 7 dagar',
    tlv_koder: ['501'],
  },
  uppfoljning: 'Åter om 1v.',
  roda_flaggor_observerade: [],
  anmarkningar: '',
};

describe('Journal Validator — schema', () => {
  it('Accepterar giltig journal', () => {
    const { valid, issues, data } = validateJournal(JSON.stringify(baseJournal));
    expect(valid).toBe(true);
    expect(issues.length).toBe(0);
    expect(data?.anamnes).toBe(baseJournal.anamnes);
  });

  it('Avvisar journal som saknar roda_flaggor_observerade', () => {
    const { roda_flaggor_observerade, ...incomplete } = baseJournal;
    const { valid, issues } = validateJournal(JSON.stringify(incomplete));
    expect(valid).toBe(false);
    expect(issues.some(i => i.includes('roda_flaggor_observerade'))).toBe(true);
  });

  it('Avvisar journal som saknar anmarkningar', () => {
    const { anmarkningar, ...incomplete } = baseJournal;
    const { valid, issues } = validateJournal(JSON.stringify(incomplete));
    expect(valid).toBe(false);
    expect(issues.some(i => i.includes('anmarkningar'))).toBe(true);
  });

  it('Avvisar ogiltig JSON', () => {
    const { valid, issues } = validateJournal('inte json');
    expect(valid).toBe(false);
    expect(issues).toContain('Ogiltig JSON');
  });
});

describe('Journal Validator — PII', () => {
  it('Avvisar personnummer 12-siffrigt format', () => {
    const data = { ...baseJournal, anamnes: 'Patient 19900101-1234 kom in.' };
    const { valid, issues, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.piiDetected).toBe(true);
    expect(issues).toContain('Personnummer hittades i journaltexten.');
  });

  it('Avvisar personnummer 10-siffrigt format', () => {
    const data = { ...baseJournal, anamnes: 'Patient 900101-1234 kom in.' };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.piiDetected).toBe(true);
  });

  it('Avvisar samordningsnummer (dag +60)', () => {
    const data = { ...baseJournal, anamnes: 'Patient 900161-1234 kom in.' };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.piiDetected).toBe(true);
  });

  it('detectPiiInInput hittar PII i råtext', () => {
    expect(detectPiiInInput('Patient 19900101-1234')).toBe(true);
    expect(detectPiiInInput('Patient utan PII')).toBe(false);
  });
});

describe('Journal Validator — fabriceringsfraser', () => {
  const phrases = [
    'enligt min erfarenhet',
    'jag rekommenderar',
    'jag skulle rekommendera',
    'i de flesta fall',
    'ungefär',
    'cirka',
    'vanligtvis',
    'brukar',
    'troligtvis',
    'förmodligen',
  ];

  for (const phrase of phrases) {
    it(`blockerar "${phrase}"`, () => {
      const data = { ...baseJournal, anmarkningar: `Detta ${phrase} läker bra.` };
      const { valid, issues, flags } = validateJournal(JSON.stringify(data));
      expect(valid).toBe(false);
      expect(flags.fabricationDetected).toBe(true);
      expect(issues.some(i => i.includes(phrase))).toBe(true);
    });
  }
});

describe('Journal Validator — ICD-läckage', () => {
  it('Tillåter ICD i diagnos.icd_kod', () => {
    const { valid } = validateJournal(JSON.stringify(baseJournal));
    expect(valid).toBe(true);
  });

  it('Blockerar K04.4 i behandling.atgard', () => {
    const data = {
      ...baseJournal,
      behandling: { ...baseJournal.behandling, atgard: 'Trepanation enligt K04.4' },
    };
    const { valid, issues, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.icdInJournalText).toBe(true);
    expect(issues.some(i => i.includes('behandling.atgard'))).toBe(true);
  });

  it('Blockerar ICD i anamnes', () => {
    const data = { ...baseJournal, anamnes: 'Patient med K05.2 sedan länge' };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.icdInJournalText).toBe(true);
  });

  it('Blockerar ICD i status', () => {
    const data = { ...baseJournal, status: 'Status: K04.4 bekräftat' };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.icdInJournalText).toBe(true);
  });

  it('Blockerar ICD i anmarkningar', () => {
    const data = { ...baseJournal, anmarkningar: 'Se K05.2.' };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.icdInJournalText).toBe(true);
  });
});

describe('Journal Validator — dos/preparat', () => {
  it('Blockerar Amoxicillin som förstahand', () => {
    const data = {
      ...baseJournal,
      behandling: { ...baseJournal.behandling, lakemedel: 'Amoxicillin 750 mg x 2' },
    };
    const { valid, issues, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(false);
    expect(flags.forbiddenAmoxicillin).toBe(true);
    expect(issues.some(i => i.toLowerCase().includes('amoxicillin'))).toBe(true);
  });

  it('Tillåter Amoxicillin vid endokarditprofylax', () => {
    const data = {
      ...baseJournal,
      behandling: {
        ...baseJournal.behandling,
        lakemedel: 'Amoxicillin 2 g (endokarditprofylax enligt ESC riktlinjer 2023)',
      },
    };
    const { valid, flags } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(true);
    expect(flags.forbiddenAmoxicillin).toBe(false);
  });

  it('Varnar vid PcV-dos avvikande från 1,6 g × 3', () => {
    const data = {
      ...baseJournal,
      behandling: { ...baseJournal.behandling, lakemedel: 'PcV 800 mg x 2' },
    };
    const { valid, warnings } = validateJournal(JSON.stringify(data));
    expect(valid).toBe(true);
    expect(warnings.some(w => w.includes('PcV'))).toBe(true);
  });

  it('Varnar vid Klindamycin avvikande från 150 mg × 3', () => {
    const data = {
      ...baseJournal,
      behandling: { ...baseJournal.behandling, lakemedel: 'Klindamycin 300 mg x 4' },
    };
    const { warnings } = validateJournal(JSON.stringify(data));
    expect(warnings.some(w => w.includes('Klindamycin'))).toBe(true);
  });

  it('Ingen varning vid korrekt PcV-dos', () => {
    const { warnings } = validateJournal(JSON.stringify(baseJournal));
    expect(warnings.length).toBe(0);
  });
});
