import { z } from 'zod';

export const aiJournalSchema = z.object({
  anamnes: z.string().min(1, "Anamnes saknas"),
  status: z.string().min(1, "Status saknas"),
  diagnos: z.object({
    trolig: z.string().min(1, "Trolig diagnos saknas"),
    icd_kod: z.string().optional(),
    differentialdiagnoser: z.array(z.string()).default([]),
  }),
  behandling: z.object({
    atgard: z.string().min(1, "Åtgärd saknas"),
    lokalanestesi: z.string().optional(),
    lakemedel: z.string().optional(),
    tlv_koder: z.array(z.string()).default([]),
  }),
  uppfoljning: z.string().min(1, "Uppföljning saknas"),
  roda_flaggor_observerade: z.array(z.string()),
  anmarkningar: z.string(),
});

export type AIJournalOutput = z.infer<typeof aiJournalSchema>;

const PERSONNUMMER_REGEX = /\b\d{6,8}[-+]?\d{4}\b/;
const ICD_REGEX = /\b[A-TV-Z]\d{2}(?:\.\d{1,2})?\b/;

const FABRICATION_KEYWORDS = [
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

interface DrugRule {
  pattern: RegExp;
  expected: RegExp;
  warning: string;
}

const DRUG_RULES: DrugRule[] = [
  {
    pattern: /\b(pcv|kåvepenin|fenoximetylpenicillin)\b/i,
    expected: /1[\s,.]?6\s*g\s*[x×]\s*3|1600\s*mg\s*[x×]\s*3/i,
    warning: 'PcV-dosering avviker från rekommenderad 1,6 g × 3 (Strama 2024).',
  },
  {
    pattern: /\bklindamycin\b/i,
    expected: /150\s*mg\s*[x×]\s*3/i,
    warning: 'Klindamycin-dosering avviker från rekommenderad 150 mg × 3 (Strama 2024).',
  },
];

const AMOXICILLIN_FORBIDDEN_REGEX = /\bamoxicillin\b/i;
const AMOXICILLIN_ALLOWED_CONTEXT_REGEX = /(profylax|endokardit|esc\s*riktlinjer)/i;

export interface ValidationResult {
  valid: boolean;
  issues: string[];
  warnings: string[];
  data: AIJournalOutput | null;
  flags: {
    piiDetected: boolean;
    fabricationDetected: boolean;
    icdInJournalText: boolean;
    forbiddenAmoxicillin: boolean;
  };
}

function collectIcdInForbiddenFields(data: AIJournalOutput): string[] {
  const found: string[] = [];
  const fields: Array<{ label: string; value: string | undefined }> = [
    { label: 'anamnes', value: data.anamnes },
    { label: 'status', value: data.status },
    { label: 'uppfoljning', value: data.uppfoljning },
    { label: 'anmarkningar', value: data.anmarkningar },
    { label: 'behandling.atgard', value: data.behandling.atgard },
    { label: 'behandling.lokalanestesi', value: data.behandling.lokalanestesi },
    { label: 'behandling.lakemedel', value: data.behandling.lakemedel },
  ];
  for (const f of fields) {
    if (f.value && ICD_REGEX.test(f.value)) {
      found.push(f.label);
    }
  }
  return found;
}

export function validateJournal(jsonString: string): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const flags = {
    piiDetected: false,
    fabricationDetected: false,
    icdInJournalText: false,
    forbiddenAmoxicillin: false,
  };

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    return {
      valid: false,
      issues: ['Ogiltig JSON'],
      warnings: [],
      data: null,
      flags,
    };
  }

  const result = aiJournalSchema.safeParse(parsed);
  if (!result.success) {
    result.error.errors.forEach((err) => {
      issues.push(`${err.path.join('.')}: ${err.message}`);
    });
  }

  if (PERSONNUMMER_REGEX.test(jsonString)) {
    flags.piiDetected = true;
    issues.push('Personnummer hittades i journaltexten.');
  }

  const lowerJson = jsonString.toLowerCase();
  for (const keyword of FABRICATION_KEYWORDS) {
    if (lowerJson.includes(keyword)) {
      flags.fabricationDetected = true;
      issues.push(`Otillåtet uttryck hittades (fabricering): "${keyword}"`);
    }
  }

  if (result.success) {
    const icdFields = collectIcdInForbiddenFields(result.data);
    if (icdFields.length > 0) {
      flags.icdInJournalText = true;
      issues.push(`ICD-kod hittades i journaltext (otillåtet): ${icdFields.join(', ')}`);
    }

    const lakemedel = result.data.behandling.lakemedel ?? '';
    const atgard = result.data.behandling.atgard ?? '';
    const combined = `${lakemedel} ${atgard}`;

    if (AMOXICILLIN_FORBIDDEN_REGEX.test(combined) && !AMOXICILLIN_ALLOWED_CONTEXT_REGEX.test(combined)) {
      flags.forbiddenAmoxicillin = true;
      issues.push('Amoxicillin är ej förstahandsval i Sverige. Använd PcV (fenoximetylpenicillin). Endast tillåtet vid endokarditprofylax.');
    }

    for (const rule of DRUG_RULES) {
      if (rule.pattern.test(combined) && !rule.expected.test(combined)) {
        warnings.push(rule.warning);
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    data: result.success ? result.data : null,
    flags,
  };
}

export function detectPiiInInput(text: string): boolean {
  return PERSONNUMMER_REGEX.test(text);
}
