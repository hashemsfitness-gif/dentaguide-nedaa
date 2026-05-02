import { z } from 'zod';

export const aiJournalSchema = z.object({
  anamnes: z.string().min(1, "Anamnes saknas"),
  status: z.string().min(1, "Status saknas"),
  diagnos: z.object({
    trolig: z.string().min(1, "Trolig diagnos saknas"),
    icd_kod: z.string().optional(),
    differentialdiagnoser: z.array(z.string()).optional(),
  }),
  behandling: z.object({
    atgard: z.string().min(1, "Åtgärd saknas"),
    lokalanestesi: z.string().optional(),
    lakemedel: z.string().optional(),
    tlv_koder: z.array(z.string()).optional(),
  }),
  uppfoljning: z.string().min(1, "Uppföljning saknas"),
  roda_flaggor_observerade: z.array(z.string()).optional(),
  anmarkningar: z.string().optional(),
});

export type AIJournalOutput = z.infer<typeof aiJournalSchema>;

const PERSONNUMMER_REGEX = /\d{6,8}[-+]?\d{4}/;

const FABRICATION_KEYWORDS = [
  'enligt min erfarenhet',
  'jag rekommenderar',
  'i de flesta fall',
  'jag skulle rekommendera',
];

export function validateJournal(jsonString: string): { valid: boolean; issues: string[]; data: AIJournalOutput | null } {
  let parsed: any;
  const issues: string[] = [];

  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    return { valid: false, issues: ["Ogiltig JSON"], data: null };
  }

  const result = aiJournalSchema.safeParse(parsed);
  if (!result.success) {
    result.error.errors.forEach(err => {
      issues.push(`${err.path.join('.')}: ${err.message}`);
    });
  }

  if (PERSONNUMMER_REGEX.test(jsonString)) {
    issues.push("Personnummer hittades i journaltexten.");
  }

  const lowerJson = jsonString.toLowerCase();
  for (const keyword of FABRICATION_KEYWORDS) {
    if (lowerJson.includes(keyword)) {
      issues.push(`Otillåtet uttryck hittades (fabricering): "${keyword}"`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    data: result.success ? result.data : null,
  };
}
