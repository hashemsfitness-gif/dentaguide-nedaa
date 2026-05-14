/**
 * lib/simulator/scoring.ts
 * Betygsättning och grade-beräkning för simulatorsessioner.
 * All poängsättningslogik samlas här — inte i page.tsx eller komponenter.
 */

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface ScoreResult {
  diagnosis: number;
  icd: number;
  tlv: number;
  total: number;
}

/**
 * Räkna ut betygsgrad baserat på procent av maxpoäng.
 * A ≥ 90 % · B ≥ 80 % · C ≥ 70 % · D ≥ 60 % · F < 60 %
 */
export function calculateGrade(percentage: number): Grade {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

/**
 * Poängsätter ett svar mot korrekt lösning.
 *
 * Diagnospoäng (0–40):
 *   40 = exakt matchning (case-insensitive)
 *   20 = partiell matchning (ett svar innehåller det andra)
 *    0 = fel
 *
 * ICD-poäng (0–30):
 *   30 = exakt matchning (t.ex. "K04.0" === "K04.0")
 *   15 = prefixmatchning på 3 tecken (t.ex. "K04" för "K04.0")
 *    0 = fel
 *
 * TLV-poäng (0–30):
 *   10 per korrekt kod, max 30
 */
export function scoreAnswer(params: {
  userDiagnosis: string;
  userIcd: string;
  userTlvCodes: string[];
  correctDiagnosis: string;
  correctIcd: string;
  correctTlvCodes: string[];
}): ScoreResult {
  // ── Diagnos ───────────────────────────────────────────────
  const userDiag = params.userDiagnosis.toLowerCase().trim();
  const corrDiag = params.correctDiagnosis.toLowerCase().trim();

  let diagnosisScore = 0;
  if (userDiag === corrDiag) {
    diagnosisScore = 40;
  } else if (
    userDiag.length >= 4 &&
    (corrDiag.includes(userDiag) || userDiag.includes(corrDiag))
  ) {
    diagnosisScore = 20;
  }

  // ── ICD-10 ───────────────────────────────────────────────
  const userIcd = params.userIcd.toUpperCase().trim();
  const corrIcd = params.correctIcd.toUpperCase().trim();

  let icdScore = 0;
  if (userIcd === corrIcd) {
    icdScore = 30;
  } else if (userIcd.length >= 3 && corrIcd.startsWith(userIcd.substring(0, 3))) {
    icdScore = 15;
  }

  // ── TLV-åtgärdskoder ─────────────────────────────────────
  const corrSet = new Set(params.correctTlvCodes.map(c => c.trim()));
  const matches = params.userTlvCodes.filter(c => corrSet.has(c.trim())).length;
  const tlvScore = Math.min(30, matches * 10);

  const total = diagnosisScore + icdScore + tlvScore;

  return {
    diagnosis: diagnosisScore,
    icd: icdScore,
    tlv: tlvScore,
    total,
  };
}
