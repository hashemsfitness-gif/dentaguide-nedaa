import { validateJournal } from '../lib/journal-validator';
import { describe, it, expect } from 'vitest';

describe('Journal Validator', () => {
  const validJournal = {
    anamnes: "Patient kom akut med värk i 26.",
    status: "Perkussionsöm 26. Kyla neg.",
    diagnos: {
      trolig: "Symptomatisk apikal parodontit",
      icd_kod: "K04.4"
    },
    behandling: {
      atgard: "Trepanation och rensning.",
      lokalanestesi: "Artikain 1.8ml",
      tlv_koder: ["501"]
    },
    uppfoljning: "Åter om 1v."
  };

  it('Accepterar giltig journal', () => {
    const { valid, issues, data } = validateJournal(JSON.stringify(validJournal));
    expect(valid).toBe(true);
    expect(issues.length).toBe(0);
    expect(data?.anamnes).toBe("Patient kom akut med värk i 26.");
  });

  it('Avvisar journal med personnummer', () => {
    const invalidData = { ...validJournal, anamnes: "Patient 19900101-1234 kom in." };
    const { valid, issues } = validateJournal(JSON.stringify(invalidData));
    expect(valid).toBe(false);
    expect(issues).toContain("Personnummer hittades i journaltexten.");
  });

  it('Avvisar AI-fabricering', () => {
    const invalidData = { ...validJournal, anmarkningar: "Enligt min erfarenhet brukar detta läka." };
    const { valid, issues } = validateJournal(JSON.stringify(invalidData));
    expect(valid).toBe(false);
    expect(issues).toContain('Otillåtet uttryck hittades (fabricering): "enligt min erfarenhet"');
  });

  it('Accepterar [verifiera]-platshållare', () => {
    const dataWithPlaceholder = { ...validJournal, behandling: { atgard: "[verifiera kod] 501" } };
    const { valid } = validateJournal(JSON.stringify(dataWithPlaceholder));
    expect(valid).toBe(true); // Placeholder is fine, only personnummer/fabrication is blocked
  });
});
