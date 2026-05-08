/**
 * lib/simulator/category-colors.ts
 * 
 * Maps clinical categories to their specific design tokens.
 */

export const CATEGORY_ACCENT: Record<string, string> = {
  endodonti:                '#CC5833',  // Stitch Pro default (Terrakotta)
  parodontologi:            '#CC5833',
  protetik:                 '#CC5833',
  oralmedicin:              '#5B21B6',  // Agent 05 override (Lila)
  kakkirurgi:               '#B45309',  // Agent 06 override (Amber)
  bettfysiologi:            '#0D9488',  // Agent 07 override (Teal)
  pedodonti:                '#1E3028',  // Pediatric Moss
  'pedodonti-trauma':       '#1E3028',
  'pedodonti-akut':         '#1E3028',
  'pedodonti-munslemhinna': '#1E3028',
  'pedodonti-beteende':     '#1E3028',
  ortodonti:                '#1E3028',
  allmant:                  '#0E3B52',  // Tech Blue
};

export const CATEGORY_ICON: Record<string, string> = {
  endodonti:     'tooth',
  parodontologi: 'layers',
  protetik:      'shield',
  oralmedicin:   'medical_services',
  kakkirurgi:    'content_cut',
  bettfysiologi: 'psychology',
  pedodonti:     'child_care',
  ortodonti:     'architecture',
  allmant:       'school',
};

export function getCategoryAccent(slug: string): string {
  return CATEGORY_ACCENT[slug] ?? '#CC5833';
}

export function getCategoryIcon(slug: string): string {
  return CATEGORY_ICON[slug] ?? 'clinical_notes';
}
