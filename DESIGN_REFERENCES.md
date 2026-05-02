# DENTAGUIDE-PRO — DESIGN REFERENCES
## Mappning av Stitch-designs till agenter och sidor

> **Detta dokument berättar för varje agent EXAKT vilken Stitch-design de ska använda som referens.**
> **Bifoga detta + relevant HTML-källkod till varje agent.**

---

## 📋 STITCH-DESIGN-INVENTORY

Jag har analyserat dessa 8 Stitch-koder från projektet:

| Kod | Sidtyp | Tema | Stitch node-id |
|:---:|:-------|:-----|:---------------|
| **A** | Vuxen scenario (Perikoronit) | Stitch Pro | `a5ae8e3c3ed84e54a27c1d84acffc8ac` |
| **B** | Pediatric trauma (Replantation) | Pediatric | `b7dffac983544829be80ec619dba78c8` |
| **C** | Pediatric trauma flowchart | Pediatric | `e3497dfd7fb34b3cba5857207ee63f46` |
| **D** | Pediatric scenario (Alveolarfraktur) | Pediatric | `fd3de073e8644905b6c7e964a5d41638` |
| **E** | Global Research Feed | Stitch Pro | `81c046fa702c4db995bf82c9f6e6aedc` |
| **F** | Feedback & Insights | Stitch Pro | `32257e776b1d4eb6bfe40de0508644d1` |
| **G** | Features-översikt (Command Center) | Stitch Pro | `327b0cd0a0f341468f8814d5c9edea66` |
| **H** | Scenario Management (table) | Stitch Pro | `fdd8ae564a3d4278b3e9b9f5ee710db9` |
| **I** | Admin Dashboard (analytics) | Stitch Admin | `6dab4797a624431690361a65d3237626` |

---

## 🎯 AGENT → STITCH-DESIGN MAPPNING

### Fas 0 — Foundation
**Använd:** Inga Stitch-referenser (bygger bara grundkomponenter)
**Tema-tokens:** Skapa alla 3 teman i globals.css

---

### Agent 01 — Landing + Auth + Onboarding
**Stitch-referens:** Egen unik design (kombinera A + G)
**Tema:** `stitch-pro`
**Filer som bifogas:**
- DESIGN_SYSTEM_v2.md
- Stitch-kod G (Command Center) — för dashboard-layout efter inlogg
- Stitch-kod A (Perikoronit) — för "Hur det ser ut"-preview

**Specifik design:**
- Hero: Mörk header-gradient (`#0d4a65 → #062f40`)
- 3D tand med Three.js i hero
- Glass-bento cards för features
- Pricing: 3 kolumner, Stitch Pro design
- Dashboard efter inlogg: G-mönstret (sidebar + grid)

---

### Agent 02 — Endodonti
**Stitch-referens:** **Kod A (Perikoronit)** — SAMMA STRUKTUR EXAKT
**Tema:** `stitch-pro`
**Filer som bifogas:**
- DESIGN_SYSTEM_v2.md
- Stitch-kod A
- värk_och_smärta_html_JUSTERAD.html (medicinsk källa)

**Layout exakt enligt Kod A:**
- Header: blue-gradient med "Tandguide" logo + nav
- Vänster sidebar (320px): Scenario-lista (morphic cards, aktivt = mörk)
- Center: Editorial header + tabs + 6 sektioner i bento-grid
  1. SNABBÖVERSIKT (orange icon)
  2. ANAMNES (2-col grid: Funktionell + Systemisk)
  3. STATUS (Inspektion + Mätning med progress-bar)
  4. DIAGNOS (2-col: Radiologi + RÖDA FLAGGOR i röd box)
  5. BEHANDLING (4 ALT-kort A/B/C/D + Farmakologi-section)
  6. JOURNAL (mono-textarea + TLV-koder grid)
- Höger sidebar (320px):
  - **TOOLS:** Antibiotikastöd, Farmaka, Journalmallgenerator
  - **DIFFERENTIALDIAGNOSER:** Dropdown-knappar
  - **KLINISKA ANTECKNINGAR:** Beige box
  - **KLINISK VARNINGSSIGNAL:** Röd box

**Höger-sidebar tools för Endodonti:**
```html
<!-- TOOL: Antibiotikastöd -->
<!-- TOOL: Doseringskalkylator -->
<!-- TOOL: Journalmallgenerator -->
<!-- DIFFERENTIALDIAGNOSER: Pulpit, Apikal parodontit, Cracked tooth, Dentinhypersensibilitet -->
```

---

### Agent 03 — Parodontologi
**Stitch-referens:** Kod A (samma layout)
**Tema:** `stitch-pro`

**Höger-sidebar tools för Parodontologi:**
```html
<!-- TOOL: Parod-klassificerare (EFP/AAP 2018) -->
<!-- TOOL: BPE-karta (6 sextanter) -->
<!-- TOOL: Antibiotikastöd -->
<!-- TOOL: Behandlingstrappa -->
<!-- DIFFERENTIALDIAGNOSER: Gingivit, Parodontit, ANUG, Perimplantit -->
```

---

### Agent 04 — Protetik
**Stitch-referens:** Kod A
**Tema:** `stitch-pro`

**Höger-sidebar tools för Protetik:**
```html
<!-- TOOL: Implantat-torque-kalkylator -->
<!-- TOOL: Ferrule-effekten validator (≥2mm) -->
<!-- TOOL: Material-bibliotek -->
<!-- DIFFERENTIALDIAGNOSER: Krona, Implantat, Protes, Porslinsfraktur -->
```

---

### Agent 05 — Oralmedicin
**Stitch-referens:** Kod A med LILA accent
**Tema:** `stitch-pro` med override `--accent-primary: #5B21B6`

**Specifik:**
- ICD K12.0 vs K13.1 highlightas tydligt
- BIOPSI-VARNING vid icke-läkande sår (röd alert)

**Höger-sidebar tools för Oralmedicin:**
```html
<!-- TOOL: SVF-remiss-generator -->
<!-- TOOL: Kortikosteroid-stödschema -->
<!-- TOOL: MRONJ-riskbedömning -->
<!-- DIFFERENTIALDIAGNOSER: Aftösa, Lichen, Candidos, MISSTÄNKT MALIGNITET -->
```

---

### Agent 06 — Käkkirurgi
**Stitch-referens:** Kod A med AMBER accent
**Tema:** `stitch-pro` med override `--accent-primary: #B45309`

**Höger-sidebar tools för Käkkirurgi:**
```html
<!-- TOOL: Postop-blödning-protokoll -->
<!-- TOOL: Sinuskommunikation-flow -->
<!-- TOOL: Antibiotikastöd -->
<!-- DIFFERENTIALDIAGNOSER: Alveolit, Sinuskomm, Parestesi, Tuberfraktur -->
```

---

### Agent 07 — Bettfysiologi
**Stitch-referens:** Kod A med TEAL accent
**Tema:** `stitch-pro` med override `--accent-primary: #0D9488`

**Höger-sidebar tools för Bettfysiologi:**
```html
<!-- TOOL: DC/TMD-screening (3 frågor) -->
<!-- TOOL: VAS-skala (0-10) -->
<!-- TOOL: Muskel-palpationsguide -->
<!-- DIFFERENTIALDIAGNOSER: Myalgi, Artrit, Closed lock, Diskförskjutning -->
```

---

### Agent 08 — Pedodonti (4 SIDOR + översikt)
**Stitch-referenser:** **Kod B + C + D** (kombinera)
**Tema:** `stitch-pediatric`

#### 8.1 Pedodonti-översikt (`/pedodonti`)
**Layout enligt Kod D (Alveolarfraktur):**
- Glass-panel header
- 4 stora cards (Trauma / Akut / Munslemhinna / Beteende)
- Atmospheric orbs i bakgrund
- Dot-pattern bg

#### 8.2 Pedodonti Trauma (`/pedodonti/trauma`)
**Layout enligt Kod C (flowchart):**
- 2 flikar: Primära tänder | Permanenta tänder
- Bento-grid med 4 trauma-typer (Avulsion, Intrusion, Fracture, Extrusion)
- Critical Windows-sidebar (höger): timeline med kritiska tider
- Follow-up Protocol-card (mörkgrön)

#### 8.3 Pedodonti Akut, Munslemhinna, Beteende
**Layout enligt Kod D:**
- Vänster sidebar: Scenario-lista grupperad per kategori
- Center: bento-grid med scenarier
- Höger sidebar: Tools per kategori

**Höger-sidebar tools för Pedodonti:**
```html
<!-- TOOL: Pediatrisk dosering (vikt-baserad) -->
<!-- TOOL: Trauma-timer (replantation < 60 min) -->
<!-- TOOL: Beteende-skala (Frankl) -->
<!-- TOOL: Sederingsguide -->
<!-- BARNMISSHANDEL-SCREENING: Alltid synlig -->
```

---

### Agent 09 — Ortodonti
**Stitch-referens:** Kod D (pediatric layout)
**Tema:** `stitch-pediatric`

**Höger-sidebar tools för Ortodonti:**
```html
<!-- TOOL: Wax-instruktion (bild-baserad) -->
<!-- TOOL: Apparatur-troubleshooting -->
<!-- TOOL: Kontakta-ortodontist-CTA -->
<!-- TOOL: Livsmedelslista (undvik med apparatur) -->
```

---

### Agent 10 — Läkemedel + Antibiotika + Dosering
**Stitch-referens:** Kod A (för layout) + custom dosage-widget från Kod D höger-sidebar
**Tema:** `stitch-pro`

**Specifik design för dosering-sida:**
- Tabs: VUXEN | BARN
- Vikt-slider med live-preview
- Dosage-card (mörkgrön, från Kod D höger-sidebar):
  ```
  REKOMMENDERAD REGIM
  Penvii (Fenoximetylpenicillin)
  1.6g × 3 /dygn
  BEHANDLINGSTID: 5-7 DAGAR
  ```
- Strama-riktlinjer-box (beige)
- Opioid-checklista som accordion (8 kriterier)

---

### Agent 11 — Parodontologi-klassificerare
**Stitch-referens:** Kod A (centrala layout) + steg-för-steg-flow från Kod B
**Tema:** `stitch-pro`

**Specifik:**
- 4 steg som tydligt numrerade cards (01, 02, 03, 04 från Kod B)
- Progress-bar i header
- Sammanfattnings-panel som uppdateras live

---

### Agent 12A — Manuell journalmall
**Stitch-referens:** Kod A för layout, journal-box från Kod A nederdel
**Tema:** `stitch-pro`

**Layout:**
- Vänster: Form med interaktiva platshållare
- Höger: Live-preview i journal-box (mono-text)
- Bottom: Copy-knapp + TLV-koder grid

---

### Agent 12B — AI-journalmall
**Stitch-referens:** Kod A + AI-summary-box från Kod E (research)
**Tema:** `stitch-pro`

**Specifik:**
- Steg 1: Inmatning (textarea max 2000 tecken)
- Steg 2: Skeleton-loading
- Steg 3: Resultat — split view:
  - Vänster: Original transkription
  - Höger: 7 strukturerade kort (Anamnes, Status, etc.)
- AI-summary-box: mörkgrön highlight (från Kod E rad 138-145)
- Bottom: 3 godkännande-knappar

---

### Agent 13 — Traumaguide
**Stitch-referens:** **Kod B (Replantation)** EXAKT
**Tema:** `stitch-pediatric`

**Layout enligt Kod B:**
- Phase I: Identification (toggle Mjölktänder vs Permanenta)
- Bento-grid (3-col) för 4 skadetyper:
  - Avulsion (col-span-2)
  - Intrusion (col-span-1)
  - Fracture (col-span-1)
  - Extrusion (col-span-2)
- Höger sidebar:
  - Critical Windows (timeline)
  - Follow-up Protocol (mörkgrön card)
  - On-Call Support

---

### Agent 14 — Debiteringsstöd
**Stitch-referens:** Kod H (Scenario Management table)
**Tema:** `stitch-pro`

**Layout enligt Kod H:**
- Filter-bar (sök + dropdowns)
- Glass-card table med:
  - Kod | Beskrivning | Pris | Patientandel | Kombinationsstatus
- Bottom: System health-cards

---

### Agent 15 — Admin Dashboard
**Stitch-referens:** **Kod I + Kod H + Kod F** (kombinera)
**Tema:** `stitch-admin`

#### 15.1 `/admin/dashboard` (Kod I)
**Layout enligt Kod I:**
- Mörk sidebar (#1E3028) med:
  - Cormorant italic logo "Tandguide"
  - Nav: Dashboard, Scenarios, Categories, Medications, Users, Subscriptions, Settings
- TopAppBar: breadcrumb + sök + notifications
- Stats-grid (4 kort):
  - Total Users (1247)
  - Active Subs (342)
  - Scenarios (9)
  - MRR (34,891 kr)
- Charts:
  - Growth Dynamics (bar chart)
  - Subscription Mix (donut)
  - Clinical Insights (mörk card)
- Activity Feed (höger): Live events
- Status-footer: Supabase, Vercel, Stripe online-indikatorer

#### 15.2 `/admin/scenarios` (Kod H)
**Layout enligt Kod H:**
- Editorial header + "Nytt scenario"-knapp
- Filter-bar
- Glass-card table med Title | Category | ICD | Urgency | Status | Updated | Actions
- System health-section nederst

#### 15.3 `/admin/feedback` (Kod F)
**Layout enligt Kod F:**
- Hero: "Feedback & Quality Insights"
- Submit-section (textarea + tagga-knappar)
- Dashboard-grid:
  - Clinical Impact bar chart
  - Recent Community Feedback (avatar + thumbs)
- Höger sidebar: Top Contributors + Latest SOP Updates

---

### Agent 16 — Simulator
**Stitch-referens:** Kod A för layout + flip-animationer
**Tema:** `stitch-pro`

**Specifik:**
- Card-flip-animation vid "Visa svar"
- Progress-bar (5 cases)
- Resultatskärm: Stat cards (poäng) från Kod I

---

## 🎨 OVERRIDE-MÖNSTER

För att ändra accent per område utan att ändra hela temat:

```html
<div data-theme="stitch-pro" style="--accent-primary: #5B21B6;">
  <!-- Oralmedicin med lila accent -->
</div>

<div data-theme="stitch-pro" style="--accent-primary: #B45309;">
  <!-- Käkkirurgi med amber accent -->
</div>
```

---

## 📦 BIFOGA-CHECKLISTA PER AGENT

För varje agent, bifoga ALLTID:
1. ✅ DESIGN_SYSTEM_v2.md
2. ✅ DESIGN_REFERENCES.md (denna fil)
3. ✅ MASTERPLAN_v5.md
4. ✅ Relevant Stitch-HTML-kod (se mappning ovan)
5. ✅ Medicinsk HTML-källfil (från `html-sources/`)

**Exempel — Agent 02 (Endodonti):**
- DESIGN_SYSTEM_v2.md
- DESIGN_REFERENCES.md
- MASTERPLAN_v5.md
- Stitch-kod A (Perikoronit)
- värk_och_smärta_html_JUSTERAD.html

---

## 🚫 VAD AGENTERNA INTE FÅR GÖRA

1. ❌ Bygga egna färger (använd CSS-tokens)
2. ❌ Använda andra fonter (Newsreader/Plus Jakarta Sans/IBM Plex Mono only)
3. ❌ Ta innehåll från Stitch-koderna (det är BARA design-referens)
4. ❌ Ändra layout-struktur (följ Stitch-mönstret exakt)
5. ❌ Hoppa över höger-sidebar (varje scenariotyp har specifika tools)

---

## ✅ VAD AGENTERNA SKA GÖRA

1. ✅ Hämta medicinsk info från `html-sources/[område].html`
2. ✅ Använda layout-struktur från angiven Stitch-kod
3. ✅ Använda CSS-tokens från globals.css
4. ✅ Lägga till `data-theme`-attribut på root
5. ✅ Inkludera höger-sidebar-tools enligt denna fil
6. ✅ ALLTID visa röda flaggor (aldrig dölj bakom accordion)
7. ✅ Lägga till "PSL 2010:659"-fotnot

---

*DESIGN_REFERENCES v1.0 — DentaGuide-Pro*
*Bifoga med DESIGN_SYSTEM_v2.md till varje agent*
