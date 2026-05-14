/**
 * lib/simulator/category-colors.ts
 * Accentfärger och Material Symbols-ikoner per klinisk domän.
 * Används av CategoryChips, ProgressBar och CasePresentation.
 */

export const CATEGORY_ACCENT: Record<string, string> = {
  endodonti:       '#CC5833', // secondary/clay
  parodontologi:   '#2D6A4F', // status-ok/forest
  protetik:        '#0E3B52', // primary/tech-blue
  oralmedicin:     '#C9A84C', // tertiary-gold
  kirurgi:         '#5B21B6', // violet
  bettfysiologi:   '#0D9488', // teal
  pedodonti:       '#E07B39', // status-warning/warm
  ortodonti:       '#3B82F6', // blue-500
};

export const CATEGORY_ICON: Record<string, string> = {
  endodonti:      'dentistry',
  parodontologi:  'layers',
  protetik:       'shield',
  oralmedicin:    'clinical_notes',
  kirurgi:        'content_cut',
  bettfysiologi:  'electric_bolt',
  pedodonti:      'child_care',
  ortodonti:      'linear_scale',
};

/**
 * Returnerar accentfärg för en domän-slug.
 * Faller tillbaka på DentaGuide-Pro secondary (#CC5833).
 */
export function getCategoryAccent(slug: string): string {
  return CATEGORY_ACCENT[slug] ?? '#CC5833';
}

/**
 * Returnerar Material Symbols-ikonnamn för en domän-slug.
 */
export function getCategoryIcon(slug: string): string {
  return CATEGORY_ICON[slug] ?? 'dentistry';
}
