# DENTAGUIDE-PRO — DESIGN SYSTEM v2.0
## Master design specification — gäller alla 17 agenter

> **Detta dokument ersätter alla tidigare design-specifikationer i MASTERPLAN_v5.md Sektion 2.**
> **Bifoga detta dokument + globals_v2.css till VARJE agent från och med Fas 1A.**

---

## 1. KÄRNFILOSOFI

DentaGuide-Pro använder ett **enhetligt designsystem** med **tre teman**:

| Tema | Används av | Visuellt språk |
|:-----|:-----------|:---------------|
| **Stitch Pro** (vuxen) | Endodonti, Parodontologi, Protetik, Oralmedicin, Käkkirurgi, Bettfysiologi, alla Tools | Tech Blue + Terrakotta, glass-bento, editorial italic |
| **Stitch Pediatric** (barn) | Pedodonti × 4 sidor, Ortodonti | Beige/Cream, claymorphism, mjukare former, varm palett |
| **Stitch Admin** | Admin Dashboard, Analytics, Scenario Management | Mörkgrön sidebar, stat-pill-cards, live-feed |

**Gemensam grund:** Alla teman delar typografi (Newsreader/Cormorant + Plus Jakarta Sans + IBM Plex Mono), accentfärg (#CC5833), border-radius-skala och spacing.

---

## 2. FÄRGPALETT

### 2.1 Primära färger (gemensamma)

```
Primary (Tech Blue):  #0E3B52    /* Huvudfärg, knappar, branding */
Primary Container:    #1E3028    /* Mörkgrön — sidebars, headers */
Secondary:            #CC5833    /* Terrakotta — accent, CTA */
Secondary Container:  #FF7E55    /* Ljusare terrakotta — hover */
Neutral:              #F9F7F2    /* Bakgrunder, ytor */
Surface:              #FCF9F8    /* Kort, paneler */
```

### 2.2 Status-färger (gemensamma)

```
OK / Success:      #2D6A4F    /* Grön — godkänt */
Warning:           #E07B39    /* Orange — försiktighet */
Danger / Error:    #C1121F    /* Röd — kontraindikation */
Info:              #0E3B52    /* Blå — neutral information */
Tertiary (gold):   #C9A84C    /* Gold — accent, fritext */
```

### 2.3 Tema-specifika färger

#### Stitch Pro (vuxen)
```
Header gradient:   #0d4a65 → #062f40    /* Mörk blå header */
Background:        #f7f2ee                /* Off-white huvudbakgrund */
Card:              rgba(255,255,255,0.45) /* Glass-bento */
Accent line:       #FF7E55                /* Orange accent border-left */
```

#### Stitch Pediatric (barn)
```
Background:        #FCF9F8                 /* Cream bakgrund */
Sidebar:           #F6F3F2 / #1E3028      /* Beige eller mörkgrön */
Soft accent:       #FFB59F                /* Pastellrosa */
Warm primary:      #1E3028                /* Djupgrön (varm) */
Dot pattern:       rgba(30,48,40,0.035)   /* Subtle radial dots */
```

#### Stitch Admin
```
Sidebar bg:        #1E3028                 /* Mörkgrön (helmörk) */
Sidebar text:      #B6CBC0                 /* Ljusgrön ton */
Sidebar active:    #FF7E55 / #FCF9F8      /* Terrakotta + vit */
Stat card border:  Mix av neutral, secondary, tertiary, ok */
Status bar:        #1E3028 (mörk footer)
```

---

## 3. TYPOGRAFI

### 3.1 Font-familjer

```css
/* Display / Headlines */
--font-display: 'Newsreader', 'Cormorant Garamond', serif;
/* Använd för: rubriker, scenario-namn, editorial italic */

/* Body / UI */
--font-body: 'Plus Jakarta Sans', sans-serif;
/* Använd för: brödtext, knappar, navigation, formulär */

/* Mono / Labels */
--font-mono: 'IBM Plex Mono', 'Space Grotesk', monospace;
/* Använd för: ICD-koder, doser, scenario-IDs, uppercase labels */
```

### 3.2 Skala

```
text-xs:    0.75rem (12px)    /* Labels, badges */
text-sm:    0.875rem (14px)   /* Brödtext sekundär */
text-base:  1rem (16px)       /* Brödtext primär */
text-lg:    1.125rem (18px)   /* Underrubriker */
text-xl:    1.25rem (20px)    /* H4 */
text-2xl:   1.5rem (24px)     /* H3 */
text-3xl:   2rem (32px)       /* H2 */
text-4xl:   2.5rem (40px)     /* H1 */
text-5xl:   3rem (48px)       /* Display */
```

### 3.3 Vikt-konventioner

```
Light (300):     Sällan, endast subtil text
Regular (400):   Brödtext
Medium (500):    UI-element, knappar
Semibold (600):  Labels, accent-text
Bold (700):      Rubriker, kritiska element
Extrabold (800): Hero-rubriker (sparsamt)
```

### 3.4 Editorial italic (signatur-stil)

Headlines i Newsreader/Cormorant **italic** används för att ge "editorial" känsla:

```css
.editorial-header {
  font-family: 'Newsreader', serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
}
```

**Används för:** scenario-namn, sektionsrubriker, sidtitlar.

---

## 4. SPACING & FORM

### 4.1 Border-radius

```
--radius-sm:    8px       /* Mindre element */
--radius-md:    12px      /* Knappar, input */
--radius-lg:    16px      /* Cards */
--radius-xl:    24px      /* Stora paneler */
--radius-2xl:   2rem      /* Glass-bento */
--radius-3xl:   3rem      /* Hero-element */
--radius-pill:  9999px    /* Pills, badges, avatars */
```

**Default:** `1rem` (16px) — alla element ärver detta om inget annat anges.

### 4.2 Spacing-skala

```
--space-xs:    0.5rem (8px)
--space-sm:    1rem (16px)
--space-md:    1.5rem (24px)
--space-lg:    2rem (32px)
--space-xl:    3rem (48px)
--space-2xl:   4rem (64px)
```

### 4.3 Layout-grids

**Tre-kolumns layout (vuxen scenarier):**
```
Sidebar vänster:  320px (fast)
Huvudinnehåll:    1fr (flytande)
Sidebar höger:    320px (fast)
```

**Två-kolumns layout (admin, pediatric):**
```
Sidebar:          240px–280px (fast)
Innehåll:         1fr (flytande)
```

---

## 5. KOMPONENTER

### 5.1 Glass-bento (signatur-card)

Den centrala komponenten — används för ALLA innehållsblock.

```css
.glass-bento {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04);
  border-radius: 1.5rem;
  padding: 2.5rem;
}

.glass-bento-dark {
  background: rgba(9, 27, 20, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 1.5rem;
}
```

### 5.2 Pill-button (tabs, navigation, badges)

```css
.pill-button {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 10px 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.pill-button.active {
  background: #CC5833;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(204, 88, 51, 0.4);
  font-weight: 700;
}
```

### 5.3 Morphic-button (mjuka 3D-knappar)

```css
.morphic-button {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 16px -4px rgba(0,0,0,0.06), 
              inset 0 1px 2px rgba(255,255,255,0.9);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.morphic-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px -5px rgba(0,0,0,0.1);
}

.morphic-button-dark {
  background: linear-gradient(145deg, #0d4a65, #062f40);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
}
```

### 5.4 Header (mörk gradient)

```css
.header-gradient {
  background: linear-gradient(135deg, #0d4a65 0%, #062f40 100%);
  backdrop-filter: blur(24px);
  color: white;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.header-gradient .logo {
  font-family: 'Cormorant Garamond', 'Newsreader', serif;
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
```

### 5.5 Sidebar (vänster + höger)

```css
.glass-sidebar {
  background: rgba(247, 244, 242, 0.85);
  backdrop-filter: blur(25px) saturate(180%);
  border-right: 1px solid rgba(255,255,255,0.1);
  width: 320px;
  position: fixed;
  height: calc(100vh - 80px);
}

.dark-sidebar {
  background: #1E3028;
  color: #B6CBC0;
  width: 240px;
  border-right-radius: 3rem;
}

.dark-sidebar a.active {
  background: rgba(252, 249, 248, 0.1);
  color: #FF7E55;
  border-left: 4px solid #FF7E55;
  border-radius: 0 9999px 9999px 0;
}
```

### 5.6 Röda flaggor (ALLTID synlig)

**KRITISKT:** Röda flaggor får ALDRIG döljas bakom accordion på vuxen scenarier.

```css
.roda-flaggor {
  background: #DC2626;        /* Solid röd för maximal synlighet */
  color: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
}

.roda-flaggor h4 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.roda-flaggor li::before {
  content: '●';
  color: white;
  margin-right: 0.75rem;
}
```

**Alternativ — soft variant** (för pediatric):
```css
.roda-flaggor-soft {
  background: rgba(254, 242, 242, 1);
  border: 2px solid #DC2626;
  color: #7F1D1D;
}
```

### 5.7 Badges (scenario-IDs, status-tags)

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(241, 245, 249, 0.8);
  color: #475569;
  border: 1px solid rgba(226, 232, 240, 0.8);
  font-family: 'IBM Plex Mono', monospace;
}

.badge.icd {
  background: rgba(204, 88, 51, 0.1);
  color: #CC5833;
  font-weight: 600;
}

.correction-badge {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffcc80;
}
```

### 5.8 Stat cards (admin dashboard)

```css
.stat-card-pill {
  background: white;
  border: 2px solid var(--card-border-color, #9CA39F);
  border-radius: 2rem;       /* Pill-shape */
  padding: 2rem;
  text-align: center;
  position: relative;
}

.stat-card-pill .value {
  font-family: 'Newsreader', serif;
  font-style: italic;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

.stat-card-pill .label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9CA39F;
  margin-bottom: 0.5rem;
}
```

### 5.9 Journal-box (mono-text för kopiering)

```css
.journal-box {
  background: rgba(248, 250, 252, 0.6);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  white-space: pre-wrap;
  position: relative;
}

.journal-box .copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 4px 12px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
}
```

---

## 6. EFFEKTER & DETALJER

### 6.1 Noise overlay (signatur)

Subtil texture på alla sidor:

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

### 6.2 Atmospheric orbs (pediatric)

Mjuka gradient-orbar som bakgrund:

```css
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  z-index: -1;
  animation: drift 25s infinite alternate ease-in-out;
}

@keyframes drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(100px, 100px) scale(1.2); }
}
```

### 6.3 Active-glow

```css
.active-glow {
  box-shadow: 0 0 20px rgba(14, 59, 82, 0.3);
}
```

### 6.4 Hover-lift (cards)

```css
.hover-lift {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-lift:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 40px 80px -15px rgba(9, 27, 20, 0.15);
}
```

### 6.5 Dot-pattern background (pediatric)

```css
body[data-theme="stitch-pediatric"] {
  background-color: #FCF9F8;
  background-image: radial-gradient(#1E302808 1px, transparent 0);
  background-size: 24px 24px;
  background-attachment: fixed;
}
```

---

## 7. RESPONSIV DESIGN

### 7.1 Breakpoints

```
sm:   640px    /* Mobil landscape */
md:   768px    /* Tablet */
lg:   1024px   /* Laptop */
xl:   1280px   /* Desktop */
2xl:  1536px   /* Stor skärm */
```

### 7.2 Mobil-anpassningar

På `<md`:
- Sidebars blir bottom-sheets (Vaul) eller hamburger-meny
- Tre-kolumns layout blir en-kolumn
- Sticky bottom-nav appears
- Röda flaggor stays at top, alltid synliga
- Cards får full bredd
- `text-3xl` blir `text-2xl`

---

## 8. TEMA-VAL PER AGENT

| Agent | Tema | Specifik design-not |
|:------|:-----|:--------------------|
| **Agent 01** Landing | Stitch Pro | Hero med 3D tand (Three.js) |
| **Agent 02** Endodonti | Stitch Pro | Standard glass-bento layout |
| **Agent 03** Parodontologi | Stitch Pro | + BPE-karta i höger sidebar |
| **Agent 04** Protetik | Stitch Pro | + Implantat-torque widget |
| **Agent 05** Oralmedicin | Stitch Pro | LILA accent (#5B21B6) istället för terrakotta |
| **Agent 06** Käkkirurgi | Stitch Pro | AMBER accent (#B45309) |
| **Agent 07** Bettfysiologi | Stitch Pro | TEAL accent (#0D9488) |
| **Agent 08** Pedodonti | **Stitch Pediatric** | Beige/cream, claymorphism, atmospheric orbs |
| **Agent 09** Ortodonti | **Stitch Pediatric** | Identisk med Agent 08 |
| **Agent 10** Lakemedel/Antibiotika/Dosering | Stitch Pro | + Dosage calculator widget |
| **Agent 11** Parod-klassifikation | Stitch Pro | Beslutsträd-layout |
| **Agent 12A** Manuell journal | Stitch Pro | Split-view (form + preview) |
| **Agent 12B** AI-journal | Stitch Pro | Som 12A + AI-summary box (mörkgrön highlight) |
| **Agent 13** Traumaguide | Stitch Pro | Steg-för-steg flowchart |
| **Agent 14** Debitering | Stitch Pro | Tabell-layout |
| **Agent 15** Admin Dashboard | **Stitch Admin** | Mörk sidebar, stat-pills, live-feed |
| **Agent 16** Simulator | Stitch Pro | Card-flip-animationer |

---

## 9. TILLGÄNGLIGHET (WCAG 2.1 AA)

- Kontrast: alla text/bg-kombinationer ≥ 4.5:1
- Focus: synlig outline (`outline: 2px solid #CC5833`)
- aria-labels på alla ikoniska knappar
- Reduce motion: respektera `prefers-reduced-motion`
- Skip-link: alltid synlig vid focus
- Screen-reader: semantiska HTML-taggar

---

## 10. INSTRUKTION TILL AGENTER

I VARJE agent-prompt, lägg till:

```
DESIGN-INSTRUKTION:
Bifogade filer:
- DESIGN_SYSTEM_v2.md (designsystem)
- globals_v2.css (CSS-tokens, redan i projektet)
- DESIGN_REFERENCES.md (Stitch-mappning)

Använd `<div data-theme="stitch-pro">` (eller `stitch-pediatric` / `stitch-admin`) 
som wrapper på root-elementet.

Hämta ALLA färger, fonter och komponenter från globals.css custom properties.
Bygg INTE egna färger eller fonter — använd tokens.

För scenariesidan, följ layout-mönstret från Stitch-referensen som anges i
DESIGN_REFERENCES.md för din agent.

Höger-sidebar SKA innehålla kontextuella verktyg per scenariotyp 
(specificerat i DESIGN_REFERENCES.md).
```

---

*DesignSystem v2.0 — DentaGuide-Pro*
*Ersätter: alla designreferenser i MASTERPLAN_v5.md Sektion 2*
*Datum: 2026-05-02*
