/**
 * lib/simulator/tlv-parser.ts
 * 
 * Extracts TLV codes (100-900) from text fields.
 */

export function parseTlvCodes(debiteringText: string | null): string[] {
  if (!debiteringText) return [];

  // Refined regex to match 3-digit codes between 100 and 999
  // avoiding year-like numbers or doses if possible by boundary checks
  const regex = /(?<![\d-])\b(1\d{2}|[2-9]\d{2})\b(?![\d-])/g;
  const matches = debiteringText.match(regex);

  if (!matches) return [];

  // Deduplicate and sort
  const codes = [...new Set(matches)];
  
  // Optional: Whitelist filtering if we had a list of valid codes.
  // For now, we accept any 100-999.
  
  return codes.sort();
}
