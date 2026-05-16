/**
 * scripts/gen-simulator-cases.ts
 *
 * Robust markdown-parser som genererar lib/data/simulatorCases.ts
 * från patientfallsbank_draft.md (single source of truth).
 *
 * KÖR:  npx tsx scripts/gen-simulator-cases.ts
 *
 * REGLER (icke förhandlingsbart):
 *  - Markdown är källan. Ingen medicinsk data hittas på, ändras eller tappas.
 *  - Filen skrivs ENDAST om alla integritetskontroller passerar
 *    (90 fall, 90 unika anamnesis, 90 unika clinicalFindings, 9 områden × 10).
 *  - ICD-10 saknas medvetet i ~35 fall (bonus-info) → fältet är valfritt,
 *    fabriceras aldrig.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'patientfallsbank_draft.md');
const OUT = join(ROOT, 'lib', 'data', 'simulatorCases.ts');

interface SimulatorCase {
  id: string;
  title: string;
  domain: string;
  domainNumber: number;
  difficulty: string;
  audience: string;
  holistic: string;
  anamnesis: string;
  clinicalFindings: string;
  imagePrompt: string;
  correctDiagnosis: string;
  icd10: string;
  tlv: string;
  feedback: string;
}

// ── Regex för dokumentstrukturen ────────────────────────────────
const RE_DOMAIN = /^##\s+Område\s+(\d+):\s*(.+?)\s*$/;
const RE_CASE = /^###\s+Fall\s+([\d.]+):\s*(.+?)\s*$/;
// Top-level fält:  **Label:** ev. inline-värde
const RE_FIELD = /^\*\*([^*]+?):\*\*\s*(.*)$/;
// Sub-bullet i "Rätt Svar & Feedback":  * **Label:** värde
const RE_SUBBULLET = /^\*\s+\*\*([^*]+?):\*\*\s*(.*)$/;
const RE_HR = /^---\s*$/;

type Section = 'none' | 'anamnesis' | 'findings' | 'image' | 'answer';

function norm(label: string): string {
  return label
    .toLowerCase()
    .replace(/[\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rensar anamnes-citatet från markdown-emfas och citattecken, behåller innehållet. */
function cleanQuote(raw: string): string {
  let s = raw.trim();
  // Ta bort omslutande *...* (italic) i upp till två lager
  for (let i = 0; i < 2; i++) {
    if (s.startsWith('*') && s.endsWith('*') && s.length > 1) {
      s = s.slice(1, -1).trim();
    }
  }
  // Ta bort omslutande raka/typografiska citattecken
  const open = ['"', '“', '”', '«'];
  const close = ['"', '”', '“', '»'];
  if (open.includes(s[0]) && close.includes(s[s.length - 1]) && s.length > 1) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function flush(
  buf: string[],
  section: Section,
  cur: Partial<SimulatorCase>,
): void {
  const text = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!text) return;
  if (section === 'anamnesis') cur.anamnesis = cleanQuote(text);
  else if (section === 'findings') cur.clinicalFindings = text;
  else if (section === 'image') cur.imagePrompt = text;
}

function parse(md: string): SimulatorCase[] {
  const lines = md.split(/\r?\n/);
  const cases: SimulatorCase[] = [];

  let domain = '';
  let domainNumber = 0;
  let cur: Partial<SimulatorCase> | null = null;
  let section: Section = 'none';
  let buf: string[] = [];

  const closeCase = () => {
    if (!cur) return;
    flush(buf, section, cur);
    buf = [];
    section = 'none';
    cases.push({
      id: cur.id ?? '',
      title: cur.title ?? '',
      domain,
      domainNumber,
      difficulty: cur.difficulty ?? '',
      audience: cur.audience ?? '',
      holistic: cur.holistic ?? '',
      anamnesis: cur.anamnesis ?? '',
      clinicalFindings: cur.clinicalFindings ?? '',
      imagePrompt: cur.imagePrompt ?? '',
      correctDiagnosis: cur.correctDiagnosis ?? '',
      icd10: cur.icd10 ?? '',
      tlv: cur.tlv ?? '',
      feedback: cur.feedback ?? '',
    });
    cur = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, '');

    const mDomain = line.match(RE_DOMAIN);
    if (mDomain) {
      closeCase();
      domainNumber = parseInt(mDomain[1], 10);
      domain = mDomain[2].trim();
      continue;
    }

    const mCase = line.match(RE_CASE);
    if (mCase) {
      closeCase();
      cur = { id: mCase[1].trim(), title: mCase[2].trim() };
      section = 'none';
      buf = [];
      continue;
    }

    if (!cur) continue;

    if (RE_HR.test(line)) {
      flush(buf, section, cur);
      buf = [];
      section = 'none';
      continue;
    }

    // Sub-bullet i answer-sektionen (måste testas före RE_FIELD)
    if (section === 'answer') {
      const mSub = line.match(RE_SUBBULLET);
      if (mSub) {
        const key = norm(mSub[1]);
        const val = mSub[2].trim();
        if (key.startsWith('diagnos')) cur.correctDiagnosis = val;
        else if (key.startsWith('icd')) cur.icd10 = val;
        else if (key.startsWith('tlv')) cur.tlv = val;
        else if (key.includes('feedback')) cur.feedback = val;
        continue;
      }
      // Fortsättningsrad på senaste feedback-meningen
      if (line.trim() && !RE_FIELD.test(line) && cur.feedback) {
        cur.feedback = `${cur.feedback} ${line.trim()}`.trim();
        continue;
      }
    }

    const mField = line.match(RE_FIELD);
    if (mField) {
      // Ny top-level-etikett → stäng pågående multiline-sektion
      flush(buf, section, cur);
      buf = [];
      section = 'none';

      const key = norm(mField[1]);
      const inline = mField[2].trim();

      if (key.startsWith('svårighetsgrad')) {
        cur.difficulty = inline;
      } else if (key.startsWith('målgrupp')) {
        cur.audience = inline;
      } else if (key.startsWith('holistiskt')) {
        cur.holistic = inline;
      } else if (key.startsWith('anamnes')) {
        section = 'anamnesis';
        if (inline) buf.push(inline);
      } else if (key.startsWith('klinisk status') || key.startsWith('status & fynd') || key === 'status') {
        section = 'findings';
        if (inline) buf.push(inline);
      } else if (key.startsWith('bildinstruktion') || key.includes('bild')) {
        section = 'image';
        if (inline) buf.push(inline);
      } else if (key.startsWith('rätt svar')) {
        section = 'answer';
      }
      continue;
    }

    // Vanlig innehållsrad → tillhör aktiv multiline-sektion
    if (section === 'anamnesis' || section === 'findings' || section === 'image') {
      buf.push(line);
    }
  }

  closeCase();
  return cases;
}

// ── Integritetskontroller ───────────────────────────────────────
function verify(cases: SimulatorCase[]): string[] {
  const errors: string[] = [];
  const EXPECTED = 90;

  if (cases.length !== EXPECTED) {
    errors.push(`Förväntade ${EXPECTED} fall, fick ${cases.length}.`);
  }

  const byDomain = new Map<number, number>();
  for (const c of cases) byDomain.set(c.domainNumber, (byDomain.get(c.domainNumber) ?? 0) + 1);
  if (byDomain.size !== 9) errors.push(`Förväntade 9 områden, fick ${byDomain.size}.`);
  for (const [d, n] of [...byDomain.entries()].sort((a, b) => a[0] - b[0])) {
    if (n !== 10) errors.push(`Område ${d} har ${n} fall (förväntade 10).`);
  }

  const required: (keyof SimulatorCase)[] = [
    'id', 'title', 'domain', 'difficulty', 'audience',
    'anamnesis', 'clinicalFindings', 'imagePrompt',
    'correctDiagnosis', 'tlv', 'feedback',
  ];
  for (const c of cases) {
    for (const f of required) {
      if (!String(c[f] ?? '').trim()) {
        errors.push(`Fall ${c.id}: tomt obligatoriskt fält "${f}".`);
      }
    }
    const d = c.difficulty.toLowerCase();
    if (!['basic', 'standard', 'advanced'].includes(d)) {
      errors.push(`Fall ${c.id}: oväntad svårighetsgrad "${c.difficulty}".`);
    }
  }

  const uniq = (vals: string[]) => new Set(vals.map((v) => v.trim())).size;
  const anamUniq = uniq(cases.map((c) => c.anamnesis));
  const findUniq = uniq(cases.map((c) => c.clinicalFindings));
  // Tillåt ett fåtal naturliga dubbletter, men fånga "kopierad till alla"-korruptionen.
  if (anamUniq < EXPECTED - 3) {
    errors.push(`Endast ${anamUniq} unika anamnesis (förväntade ~${EXPECTED}). Möjlig korruption.`);
  }
  if (findUniq < EXPECTED - 3) {
    errors.push(`Endast ${findUniq} unika clinicalFindings (förväntade ~${EXPECTED}). Möjlig korruption.`);
  }
  // imagePrompt får aldrig vara dokumentets header
  for (const c of cases) {
    if (/utgör basen för den kliniska simulatorn/i.test(c.imagePrompt)) {
      errors.push(`Fall ${c.id}: imagePrompt innehåller dokumentets header (korruption).`);
    }
  }

  return errors;
}

// ── Skriv TS-fil ────────────────────────────────────────────────
function emit(cases: SimulatorCase[]): string {
  const header = `// AUTOGENERERAD — ändra INTE för hand.
// Källa: patientfallsbank_draft.md  ·  Generator: scripts/gen-simulator-cases.ts
// Kör \`npx tsx scripts/gen-simulator-cases.ts\` för att regenerera.
// Markdown är single source of truth — ingen medicinsk data hittas på eller tappas.

export interface SimulatorCase {
  id: string;
  title: string;
  domain: string;
  domainNumber: number;
  difficulty: "Basic" | "Standard" | "Advanced" | string;
  audience: string;
  holistic: string;
  anamnesis: string;
  clinicalFindings: string;
  imagePrompt: string;
  correctDiagnosis: string;
  icd10: string;
  tlv: string;
  feedback: string;
}

export const simulatorCases: SimulatorCase[] = `;
  return `${header}${JSON.stringify(cases, null, 2)};\n\nexport default simulatorCases;\n`;
}

// ── Main ────────────────────────────────────────────────────────
function main() {
  const md = readFileSync(SRC, 'utf8');
  const cases = parse(md);
  const errors = verify(cases);

  const byDomain = new Map<string, number>();
  for (const c of cases) byDomain.set(`${c.domainNumber}. ${c.domain}`, (byDomain.get(`${c.domainNumber}. ${c.domain}`) ?? 0) + 1);

  console.log('── Patientfallsbank: parsing-rapport ──────────────────');
  console.log(`Fall totalt:            ${cases.length}`);
  console.log(`Områden:                ${byDomain.size}`);
  for (const [d, n] of [...byDomain.entries()]) console.log(`  ${d.padEnd(28)} ${n} fall`);
  console.log(`Unika anamnesis:        ${new Set(cases.map((c) => c.anamnesis.trim())).size}`);
  console.log(`Unika clinicalFindings: ${new Set(cases.map((c) => c.clinicalFindings.trim())).size}`);
  console.log(`Fall med ICD-10:        ${cases.filter((c) => c.icd10.trim()).length} (resten saknar medvetet)`);
  console.log('───────────────────────────────────────────────────────');

  if (errors.length) {
    console.error(`\n❌ ${errors.length} integritetsfel — filen skrivs INTE:`);
    for (const e of errors) console.error(`   • ${e}`);
    process.exit(1);
  }

  writeFileSync(OUT, emit(cases), 'utf8');
  console.log(`\n✅ Skrev ${cases.length} fall → ${OUT.replace(ROOT, '.')}`);
}

main();
