-- ══════════════════════════════════════════════════════════════
-- seed.sql — DentaGuide-Pro Seed Data
-- All 12 categories (8 main + 4 pediatric subcategories)
-- ══════════════════════════════════════════════════════════════

INSERT INTO categories (name, slug, description, emoji, area, display_order, is_pediatric) VALUES

-- ── Main Categories (8) ─────────────────────────────────────

(
  'Endodonti',
  'endodonti',
  'Pulpiter, abscesser, cracked tooth, flare-up och rotbehandling. 8 kliniska scenarier med evidensbaserade protokoll.',
  '🦷',
  'endodonti',
  1,
  FALSE
),
(
  'Parodontologi',
  'parodontologi',
  'Gingivit, perikoronit, parodontal abscess, NUG/NUP och perimplantit. EFP/AAP 2018 klassifikation.',
  '🔬',
  'parodontologi',
  2,
  FALSE
),
(
  'Protetik & Bettfunktion',
  'protetik',
  'Kronor, implantat, proteser, porslinsfraktur och bettrehabilitering. 7 kliniska scenarier.',
  '🏗️',
  'protetik',
  3,
  FALSE
),
(
  'Oralmedicin',
  'oralmedicin',
  'Aftösa sår, oral candidos, MRONJ, lichen planus och misstänkt malignitet. 6 kliniska scenarier.',
  '🩺',
  'oralmedicin',
  4,
  FALSE
),
(
  'Käkkirurgi',
  'kakkirurgi',
  'Alveolit, postextraktionsblödning, sinuskommunikation, parestesi och käkfrakturer. 7 scenarier.',
  '🔪',
  'kakkirurgi',
  5,
  FALSE
),
(
  'Bettfysiologi / TMD',
  'bettfysiologi',
  'DC/TMD 2014 — käkledsluxation, myalgi, diskdisplacering (med/utan reduktion), closed lock. 6 scenarier.',
  '🧠',
  'bettfysiologi',
  6,
  FALSE
),
(
  'Ortodonti',
  'ortodonti',
  'Lös bracket, vass tråd, retainerproblem, ortodontiska riktlinjer. 8+1 scenarier.',
  '📐',
  'ortodonti',
  11,
  FALSE
),

-- ── Pediatric Subcategories (4) ─────────────────────────────
-- Uses Warm Pediatric theme (Beige/Cream + Claymorphism)

(
  'Pedodonti — Trauma',
  'pedodonti-trauma',
  'Traumahantering för primära och permanenta tänder. Luxationer, avulsioner, frakturer. 8 scenarier med 2 flikar.',
  '🚑',
  'pedodonti_trauma',
  7,
  TRUE
),
(
  'Pedodonti — Akut',
  'pedodonti-akut',
  'MIH, pulpit hos barn, cellulit, postextraktionsblödning och akuta tillstånd. 10 scenarier.',
  '🆘',
  'pedodonti_akut',
  8,
  TRUE
),
(
  'Pedodonti — Munslemhinna',
  'pedodonti-munslemhinna',
  'Herpes simplex, aftösa sår, ANUG, koagulationsrubbning och munslemhinneförändringar hos barn. 13 scenarier.',
  '👄',
  'pedodonti_munslemhinna',
  9,
  TRUE
),
(
  'Pedodonti — Beteende',
  'pedodonti-beteende',
  'Tandvårdsrädsla, sederingsproblem och beteendehantering vid pediatrisk tandvård. 3 scenarier.',
  '🧒',
  'pedodonti_beteende',
  10,
  TRUE
),

-- ── General/Cross-cutting ───────────────────────────────────

(
  'Allmänt',
  'allmant',
  'Tvärsgående riktlinjer, endokarditprofylax (ESC 2023), antikoagulantia-hantering och allmänna protokoll.',
  '📚',
  'allmant',
  12,
  FALSE
)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  area = EXCLUDED.area,
  display_order = EXCLUDED.display_order,
  is_pediatric = EXCLUDED.is_pediatric,
  updated_at = NOW();
