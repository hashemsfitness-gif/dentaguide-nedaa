/**
 * Clinical validation logic for scenario publishing.
 * Prevents ICD-10 codes and Personal Identity Numbers (PNR) from being published in journal text.
 */

// Matches ICD-10-SE pattern: One letter followed by 2 digits, optionally a dot and 1-2 more digits.
// Example: K05.2, S02.5
export const ICD_REGEX = /[A-Z]\d{2}\.\d{1,2}/;

// Matches Swedish Personal Identity Numbers (PNR): YYYYMMDD-XXXX or YYMMDD-XXXX
export const PNR_REGEX = /\d{6,8}[-+]?\d{4}/;

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

/**
 * validateScenarioContent() — Checks for prohibited patterns in scenario text.
 */
export function validateScenarioContent(content: string): ValidationResult {
  if (!content) return { isValid: true };

  if (ICD_REGEX.test(content)) {
    return {
      isValid: false,
      error: "ICD-koder får inte finnas i journaltext eller kliniska beskrivningar (förutom i avsedda fält).",
    };
  }

  if (PNR_REGEX.test(content)) {
    return {
      isValid: false,
      error: "Personnummer detekterat i texten. Ingen patientdata får lagras.",
    };
  }

  return { isValid: true };
}

/**
 * validateScenarioDraft() — Validates all relevant draft fields.
 */
export function validateScenarioDraft(draft: Record<string, any>): ValidationResult {
  const fieldsToValidate = [
    "draft_anamnes",
    "draft_status",
    "draft_behandling",
    "draft_debitering",
  ];

  for (const field of fieldsToValidate) {
    const content = draft[field];
    if (typeof content === "string") {
      const result = validateScenarioContent(content);
      if (!result.isValid) return result;
    }
  }

  // Special check for red flags if acute
  if (draft.is_acute && (!draft.draft_roda_flaggor || (Array.isArray(draft.draft_roda_flaggor) && draft.draft_roda_flaggor.length === 0))) {
    return {
      isValid: false,
      error: "Akuta scenarier måste ha röda flaggor definierade.",
    };
  }

  return { isValid: true };
}
