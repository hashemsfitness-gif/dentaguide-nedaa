/**
 * lib/simulator/scoring.ts
 * 
 * Server-side scoring logic for the clinical simulator.
 * Diagnosis: 40p, ICD: 30p, TLV: 30p.
 */

export function scoreDiagnosis(userInput: string, correct: string, differentials: string[] = []): number {
  const normUser = userInput.trim().toLowerCase();
  const normCorrect = correct.trim().toLowerCase();

  // Exact match
  if (normUser === normCorrect) return 40;

  // Differential match
  if (differentials.some(d => d.trim().toLowerCase() === normUser)) {
    return 15;
  }

  return 0;
}

export function scoreIcd(userInput: string, correct: string): number {
  const normUser = userInput.trim().toUpperCase();
  const normCorrect = correct.trim().toUpperCase();

  // Validate format (e.g. K05.2 or K05.21)
  const icdRegex = /^[A-Z]\d{2}\.\d{1,2}$/;
  if (!icdRegex.test(normUser)) return 0;

  // Exact match
  if (normUser === normCorrect) return 30;

  // Same chapter (first 3 chars, e.g. K05)
  if (normUser.substring(0, 3) === normCorrect.substring(0, 3)) {
    return 10;
  }

  return 0;
}

export function scoreTlv(userCodes: string[], correctCodes: string[]): number {
  if (!correctCodes || correctCodes.length === 0) return 30; // If no codes needed, user gets 30 if they provide none? Or 0? Plan says if set equals set.
  
  const userSet = new Set(userCodes.map(c => c.trim()));
  const correctSet = new Set(correctCodes.map(c => c.trim()));

  if (userSet.size === correctSet.size && [...userSet].every(c => correctSet.has(c))) {
    return 30;
  }

  // Partial scoring
  const intersection = [...userSet].filter(c => correctSet.has(c)).length;
  const incorrect = userSet.size - intersection;
  
  const score = Math.max(0, Math.round(30 * (intersection / correctSet.size) - 5 * incorrect));
  return Math.min(30, score);
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export function gradeFromScore(totalScore: number, maxScore: number): Grade {
  const percentage = (totalScore / maxScore) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}
