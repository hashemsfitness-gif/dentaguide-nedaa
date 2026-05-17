# DentaGuide-Pro — Persistent Memory
> Claude Code läser denna fil automatiskt varje session.

## Stack
Next.js 15.2.4 · React 19 · TypeScript strict · Supabase · Stripe
Vercel · Tailwind CSS · shadcn/ui · Framer Motion · Recharts

## Design — 3 Teman

### Stitch Pro (Agent 02-07, 16)
- Primary: #0E3B52 · Secondary: #CC5833 · Bg: #f7f2ee
- Header: gradient #0d4a65 → #062f40
- Fonts: Newsreader italic (h1-h3), Plus Jakarta Sans (body), IBM Plex Mono (labels)
- Klasser: glass-bento, morphic-button, morphic-button-dark, pill-button
- Layout: 3 kolumner (sidebar 320px + center + sidebar 320px)
- Accent-overrides: Oralmedicin #5B21B6 · Käkkirurgi #B45309 · Bettfysiologi #0D9488

### Stitch Pediatric (Agent 08-09)
- Bg: #FCF9F8 cream · Atmospheric orbs · Glass header (EJ mörk gradient)
- data-theme="stitch-pediatric" · Nunito font

### Stitch Admin (Agent 15)
- Sidebar: #1E3028 · Stat-pill cards · data-theme="stitch-admin"

## Kliniska regler (ALDRIG bryta)
1. ICD-koder ALDRIG i journal-malltext
2. PcV = 1.6g × 3 i 5-7 dagar (aldrig 2g)
3. Klindamycin = 150mg × 3 (aldrig 300mg) · Svår = 600mg engångsdos (VGR)
4. Amoxicillin = EJ förstahandsval Sverige
5. Röda flaggor ALLTID synliga — ALDRIG bakom accordion
6. PSL 2010:659-fotnot på varje klinisk sida
7. Barnmisshandel-screening vid alla pedodonti-trauma
8. Replantation: ALDRIG primär tand · Permanent < 60 min

## Agenter — Status
- Agent 01: Landing ✅
- Agent 02: Endodonti ⏳ (AGENT_02_PROMPT.md klar)
- Agent 03: Parodontologi ⏳ (AGENT_03_PROMPT.md klar)
- Agent 04: Protetik ⏳ (AGENT_04_PROMPT.md klar)
- Agent 05: Oralmedicin ⏳ (AGENT_05_PROMPT.md klar)
- Agent 06: Käkkirurgi ⏳ (AGENT_06_PROMPT.md klar)
- Agent 07: Bettfysiologi ⏳ (AGENT_07_PROMPT.md klar)
- Agent 08: Pedodonti ⏳ (AGENT_08_PROMPT.md klar)
- Agent 09: Ortodonti ⏳ (AGENT_09_PROMPT.md klar)
- Agent 15: Admin ⏳ (AGENT_15_PROMPT.md klar)
- Agent 16: Simulator ⏳ (AGENT_16_PROMPT.md klar)

## HTML-källfiler (i content/)
värk_och_smärta_html_JUSTERAD.html
akut-parod_html_JUSTERAD.html
protetik_och_bettfunktion_html_JUSTERAD.html
oralmedicin_html_JUSTERAD.html
kirurgi_html_JUSTERAD.html
bettfysiologi_html_JUSTERAD.html
trauma_primara_pedo_41-44_uppdaterad.html
trauma_permanent_pedo_45-48_uppdaterad.html
ped-akut_uppdaterad.html
ped-oralmedicin_uppdaterad.html
ped-beteende-sed_uppdaterad.html
ortodonti_uppdaterad.html
