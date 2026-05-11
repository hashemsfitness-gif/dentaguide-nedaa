import { describe, test, expect } from 'vitest';
import { calculateDose } from '../lib/dosering';

describe('Paracetamol', () => {
  test('barn 20kg → 200-300mg/dos', () => {
    const result = calculateDose('paracetamol', 20, 'child_big');
    expect(result.dose).toBeGreaterThanOrEqual(200);
    expect(result.dose).toBeLessThanOrEqual(300);
  });
  
  test('äldre → max 3000mg/dag', () => {
    const result = calculateDose('paracetamol', 70, 'elderly');
    expect(result.maxDay).toBe(3000);
  });
});

describe('Artikain', () => {
  test('barn <4 år → kasta error', () => {
    expect(() => calculateDose('artikain', 15, 'child_small', 3))
      .toThrow('Artikain kontraindicerat för barn under 4 år eller <20kg. Använd lidokain.');
  });
  
  test('barn <20kg → kasta error', () => {
    expect(() => calculateDose('artikain', 18, 'child_big', 5))
      .toThrow('Artikain kontraindicerat för barn under 4 år eller <20kg. Använd lidokain.');
  });
});

describe('Ibuprofen', () => {
  test('gravid trimester 3 → kasta error', () => {
    expect(() => calculateDose('ibuprofen', 70, 'pregnant', undefined, 3))
      .toThrow('Kontraindicerat');
  });

  test('max barn 1200mg/dag', () => {
    const result = calculateDose('ibuprofen', 50, 'child_big');
    expect(result.maxDay).toBe(1200);
  });
});

describe('PcV', () => {
  test('barn 20kg → 500mg/dos (25 mg/kg × 20 = 500)', () => {
    const result = calculateDose('pcv', 20, 'child_big');
    expect(result.dose).toBe(500);
    expect(result.unit).toContain('25 mg/kg');
  });

  test('barn 10kg → 250mg/dos (25 mg/kg × 10 = 250)', () => {
    const result = calculateDose('pcv', 10, 'child_big');
    expect(result.dose).toBe(250);
  });

  test('barn 40kg → 1000mg/dos (25 mg/kg × 40 = 1000)', () => {
    const result = calculateDose('pcv', 40, 'child_big');
    expect(result.dose).toBe(1000);
  });

  test('barn 80kg → maxas vid 1600mg (vuxen-tak)', () => {
    const result = calculateDose('pcv', 80, 'child_big');
    expect(result.dose).toBe(1600);
    expect(result.maxDoseWarning).toBe(true);
  });

  test('vuxen → 1600mg × 3 = 4800mg/dag', () => {
    const result = calculateDose('pcv', 70, 'adult');
    expect(result.maxDay).toBe(4800);
    expect(result.dose).toBe(1600);
  });

  test('gravid → 1600mg × 3 (säker under graviditet)', () => {
    const result = calculateDose('pcv', 65, 'pregnant');
    expect(result.dose).toBe(1600);
  });

  test('äldre → 1600mg × 3', () => {
    const result = calculateDose('pcv', 70, 'elderly');
    expect(result.dose).toBe(1600);
  });
});

describe('Klindamycin', () => {
  test('barn 20kg → 100mg/dos (5 mg/kg × 20 = 100)', () => {
    const result = calculateDose('klindamycin', 20, 'child_big');
    expect(result.dose).toBe(100);
    expect(result.unit).toContain('5 mg/kg');
  });

  test('barn 30kg → 150mg/dos (5 mg/kg × 30 = 150)', () => {
    const result = calculateDose('klindamycin', 30, 'child_big');
    expect(result.dose).toBe(150);
  });

  test('vuxen → 150mg × 3', () => {
    const result = calculateDose('klindamycin', 70, 'adult');
    expect(result.dose).toBe(150);
    expect(result.maxDay).toBe(450);
  });

  test('gravid → 150mg × 3 men med försiktighetsvarning (passerar placenta)', () => {
    const result = calculateDose('klindamycin', 65, 'pregnant');
    expect(result.dose).toBe(150);
    expect(result.maxDoseWarning).toBe(true);
    expect(result.special).toContain('GRAVIDITET');
    expect(result.note).toContain('passerar placenta');
  });
});

describe('Amoxicillin profylax', () => {
  test('vuxen → 2000mg engångsdos 60 min före', () => {
    const result = calculateDose('amoxicillin_profylax', 70, 'adult');
    expect(result.dose).toBe(2000);
    expect(result.interval).toContain('60 min');
    expect(result.special).toContain('Engångsprofylax');
  });

  test('äldre → 2000mg engångsdos', () => {
    const result = calculateDose('amoxicillin_profylax', 75, 'elderly');
    expect(result.dose).toBe(2000);
  });

  test('barn 20kg → 1000mg engångsdos (50 mg/kg × 20)', () => {
    const result = calculateDose('amoxicillin_profylax', 20, 'child_big');
    expect(result.dose).toBe(1000);
    expect(result.unit).toContain('50 mg/kg');
  });

  test('barn 50kg → maxas vid 2000mg (50 × 50 = 2500 → cap 2000)', () => {
    const result = calculateDose('amoxicillin_profylax', 50, 'child_big');
    expect(result.dose).toBe(2000);
  });

  test('gravid → 2000mg engångsdos (säker under graviditet)', () => {
    const result = calculateDose('amoxicillin_profylax', 65, 'pregnant');
    expect(result.dose).toBe(2000);
  });
});

describe('Naproxen', () => {
  test('vuxen → 500mg × 2', () => {
    const result = calculateDose('naproxen', 70, 'adult');
    expect(result.dose).toBe(500);
    expect(result.maxDay).toBe(1000);
  });

  test('gravid trimester 3 → kasta error', () => {
    expect(() => calculateDose('naproxen', 65, 'pregnant', undefined, 3))
      .toThrow('Naproxen kontraindicerat i 3:e trimestern');
  });

  test('gravid (ej trimester 3) → kontraindicerat', () => {
    const result = calculateDose('naproxen', 65, 'pregnant', undefined, 2);
    expect(result.maxDoseWarning).toBe(true);
    expect(result.dose).toBe(0);
  });

  test('barn → kontraindicerat', () => {
    const result = calculateDose('naproxen', 30, 'child_big');
    expect(result.maxDoseWarning).toBe(true);
    expect(result.dose).toBe(0);
  });

  test('äldre → kontraindicerat', () => {
    const result = calculateDose('naproxen', 70, 'elderly');
    expect(result.maxDoseWarning).toBe(true);
    expect(result.dose).toBe(0);
  });
});

describe('Morfin', () => {
  test('vuxen → 5mg startvärde per os', () => {
    const result = calculateDose('morfin', 70, 'adult');
    expect(result.dose).toBe(5);
    expect(result.special).toContain('HSLF-FS 2021:75');
  });

  test('äldre → 2,5mg startvärde (reducerad clearance)', () => {
    const result = calculateDose('morfin', 70, 'elderly');
    expect(result.dose).toBe(2.5);
  });

  test('barn ≤30 kg → kasta error (specialisttandvård)', () => {
    expect(() => calculateDose('morfin', 25, 'child_big', 8))
      .toThrow('Morfin till barn <30 kg rekommenderas EJ inom tandvård');
  });

  test('barn >30 kg → 0,2 mg/kg', () => {
    const result = calculateDose('morfin', 40, 'child_big', 12);
    expect(result.dose).toBe(8);
  });

  test('gravid → kontraindicerat', () => {
    const result = calculateDose('morfin', 65, 'pregnant');
    expect(result.maxDoseWarning).toBe(true);
    expect(result.dose).toBe(0);
  });
});

describe('Oxikodon', () => {
  test('vuxen → 5mg startvärde (indicerat vid nedsatt njurfunktion)', () => {
    const result = calculateDose('oxikodon', 70, 'adult');
    expect(result.dose).toBe(5);
    expect(result.note).toContain('nedsatt njurfunktion');
  });

  test('äldre ≥75 år → INTE kontraindicerat (5mg startvärde)', () => {
    const result = calculateDose('oxikodon', 70, 'elderly');
    expect(result.dose).toBe(5);
    expect(result.maxDoseWarning).toBe(false);
  });

  test('barn → kasta error (specialisttandvård)', () => {
    expect(() => calculateDose('oxikodon', 30, 'child_big', 10))
      .toThrow('Oxikodon till barn rekommenderas EJ inom tandvård');
  });

  test('special-fältet anger specialistkompetens käkkirurgi', () => {
    const result = calculateDose('oxikodon', 70, 'adult');
    expect(result.special).toContain('käkkirurgi');
    expect(result.special).toContain('HSLF-FS 2021:75');
  });
});

describe('Metronidazol', () => {
  test('vuxen → 400mg × 3 i 5 dagar', () => {
    const result = calculateDose('metronidazol', 70, 'adult');
    expect(result.dose).toBe(400);
    expect(result.maxDay).toBe(1200);
    expect(result.special).toContain('Alkohol');
  });

  test('gravid → kontraindicerat', () => {
    const result = calculateDose('metronidazol', 65, 'pregnant');
    expect(result.maxDoseWarning).toBe(true);
    expect(result.dose).toBe(0);
  });

  test('barn 20kg → 150mg/dos (7.5 mg/kg)', () => {
    const result = calculateDose('metronidazol', 20, 'child_big');
    expect(result.dose).toBe(150);
    expect(result.maxDay).toBe(450);
  });
});
