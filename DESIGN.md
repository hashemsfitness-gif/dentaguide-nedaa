---
name: DentaGuide-Pro
description: Kliniskt beslutsstöd för svensk tandvård — editorial ram, klinisk kärna
colors:
  tech-blue: "#0E3B52"
  deep-green: "#1E3028"
  terracotta: "#CC5833"
  terracotta-light: "#FF7E55"
  neutral-sand: "#F9F7F2"
  surface-cream: "#FCF9F8"
  pro-bg: "#F7F2EE"
  ink: "#091B14"
  header-from: "#0D4A65"
  header-to: "#062F40"
  dark-surface: "#0F1A14"
  dark-bg: "#062F40"
  status-ok: "#2D6A4F"
  status-warning: "#E07B39"
  status-danger: "#C1121F"
  tertiary-gold: "#C9A84C"
  pediatric-warm: "#FFB59F"
  pediatric-soft: "#FFDBD0"
  border-light: "#E5E3DF"
  border-medium: "#D1CEC9"
  red-flag: "#DC2626"
typography:
  display:
    fontFamily: "Newsreader, Cormorant Garamond, serif"
    fontSize: "clamp(2rem, 5vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  display-italic:
    fontFamily: "Newsreader, Cormorant Garamond, serif"
    fontSize: "clamp(2rem, 5vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Newsreader, Cormorant Garamond, serif"
    fontSize: "clamp(1.3rem, 2vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, Space Grotesk, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  card: "22px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
components:
  button-accent:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.surface-cream}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
    typography: "{typography.body}"
  button-accent-hover:
    backgroundColor: "{colors.terracotta-light}"
    textColor: "{colors.surface-cream}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-ghost:
    backgroundColor: "{colors.surface-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
  input:
    backgroundColor: "{colors.surface-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    typography: "{typography.body}"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.terracotta}"
    typography: "{typography.label}"
  red-flag-banner:
    backgroundColor: "{colors.red-flag}"
    textColor: "{colors.surface-cream}"
    rounded: "{rounded.2xl}"
    padding: "32px"
---

# Design System: DentaGuide-Pro

## 1. Overview

**Creative North Star: "Kollegan vid stolen"**

DentaGuide-Pro beter sig som en betrodd överkollega som räcker dig svaret mitt i ett patientmöte: saklig, lugn, snabb, utan en sekunds teatraliska effekter. Allt visuellt tjänar ett enda mål — tid från symtom till säkert beslut, mätt i sekunder. Det editoriala uttrycket (Newsreader-display, en italic-signatur, mono-eyebrows) finns för att kollegan ska kännas erfaren och trovärdig, inte för att imponera. Ramen är redaktionell; kärnan, där kliniska data läses, är tät, läsbar och rörelsefattig som ett välbyggt verktyg (referens: Linear).

Systemet förkastar uttryckligen fyra saker. **Generisk SaaS-mall:** inga lila gradienter, hero-metric-block eller oändliga identiska ikon-kort-rutnät. **Steril sjukhusjournal:** ingen kall grå-blå, tabelltung EPJ-estetik från 90-talet. **Lekfull konsument-app:** ingen gamification, emoji-dekor eller barnslighet på vuxenytor (pediatric-spåret är medvetet, kontrollerat varmare). **Överdesignad eller långsam:** inga tunga 3D-lager, glas-överallt eller animationer som står i vägen i ett akut läge. Måttstock: "lagom fin" — nivån på nuvarande landingpage och den nya simulator-designen.

Paletten är jordnära och varm-neutral: en djup tech-blå auktoritet, en enda terrakotta-accent, och en cream-yta som aldrig är ren vit. Typografin bär hierarkin; färg används sparsamt och med avsikt.

**Key Characteristics:**
- Editorial ram, klinisk kärna: uttryck utåt, densitet inåt.
- En accent (terrakotta), använd sällan och med mening.
- Cream-ytor, aldrig rent vitt eller rent svart.
- Två lägen (ljust + mörkt) för hela sajten; terrakotta-accent och röd flagga är konstanta i båda.
- Platt vid vila; mjuk lyft endast som svar på interaktion.
- Evidens, röda flaggor och PSL-ansvar är alltid synliga, aldrig dekorativa.
- Snabbhet och läsbarhet slår alltid visuell show.

## 2. Colors

En jordnära, varm-neutral palett: en mörk blå auktoritet, en enda terrakotta-accent, kliniska statusfärger och en cream-bas som aldrig tippar över i rent vitt.

### Primary
- **Tech-blå auktoritet** (#0E3B52): Branding, mörka hero-ytor, primär struktur, rubrik-ink på ljus botten. Bär förtroendet utan att skrika.
- **Djupgrön behållare** (#1E3028): Mörka sidofält, headers, pediatric/admin-bottnar. En lugn, nästan svart grön snarare än en kall neutral.

### Secondary
- **Terrakotta** (#CC5833): Den enda accenten. CTA, eyebrows, aktiva tillstånd, hover-kanter, fokus. Dess sällsynthet är poängen.
- **Terrakotta ljus** (#FF7E55): Endast hover/aktiv-steg av accenten och varma highlights på mörk botten.

### Tertiary
- **Tertiär guld** (#C9A84C): Sparsamt — fritext/utmärkelse-markering, admin-charts. Aldrig som andra-accent på kliniska ytor.

### Neutral
- **Cream-yta** (#FCF9F8): Standardyta för cards och paneler. Den ersätter rent vitt.
- **Pro-botten** (#F7F2EE): Huvudbakgrund i Stitch Pro (vuxen + tools).
- **Sand-neutral** (#F9F7F2): Sektionsväxling, lugna band.
- **Ink** (#091B14): Brödtext och rubriker på ljus botten. Ersätter rent svart. Sekundär text = ink vid 70% opacitet, dämpad = 40%.
- **Border ljus / medium** (#E5E3DF / #D1CEC9): Hårfina 1px-kanter och avdelare. Standardkanten är ljus.
- **Header-gradient** (#0D4A65 → #062F40) och **mörka ytor** (#0F1A14 / #062F40): Hero, footer, mörka CTA-band, inverterade simulator/feedback-ytor.

### Status & Safety
- **OK grön** (#2D6A4F), **Varning orange** (#E07B39), **Fara röd** (#C1121F): Klinisk status. Alltid med ord, aldrig enbart färg (färgblindhet).
- **Röd flagga** (#DC2626): Solid, hög-synlig varningsyta för kontraindikationer. Egen, starkare röd än statusfärgerna.

### Pediatric (kontrollerat avvikande)
- **Pediatric varm / mjuk** (#FFB59F / #FFDBD0): Endast i pedodonti/ortodonti-spåret. Värmen är medveten och avgränsad, aldrig spilld in på vuxenytor.

### Dark & Light Modes
Hela sajten har två lägen (väljbart av användaren, t.ex. `data-mode="light|dark"` ovanpå `data-theme`). De delar samma tokens; bara yt- och text-rollerna inverteras. Accent och säkerhet är konstanta.

- **Ljust läge (standard):** Yta = cream (#FCF9F8), botten = pro-botten (#F7F2EE), text = ink (#091B14 / 70% / 40%), kant = #E5E3DF.
- **Mörkt läge:** Botten = #0F1A14, kort/yta = en aning ljusare ink-grön (≈ #15241C), text = cream (#FCF9F8 / 72% / 45%), kant = vit vid 8–14% opacitet. Skuggor blir nästan osynliga — djup byggs av yt-ljushet, inte skugga.
- **Konstant i båda:** Terrakotta-accent (#CC5833/#FF7E55) och röd flagga (#DC2626) ändras aldrig — de måste klara ≥4.5:1 mot både cream och #0F1A14 (verifiera; ljusa statusfärger något i mörkt läge vid behov).
- Pediatric behåller sin värme men följer samma ljus/mörk-inversion.

### Named Rules
**The Two-Mode Rule.** Varje yta, text och kant definieras via en roll-token (yta/text/kant), aldrig ett hårdkodat hex i komponenten. Då räcker det att invertera rollerna för mörkt läge. En komponent som hårdkodar `#FCF9F8` är trasig i mörkt läge per definition.

**The Constant-Signal Rule.** Accent (terrakotta) och röd flagga byter aldrig värde mellan lägena. Deras igenkänning är en säkerhetsfunktion; kontrasten måste hålla ≥4.5:1 i båda.

**The One Accent Rule.** Terrakotta (#CC5833) är den enda accenten och ska täcka ≤10% av en vuxenyta. Dess sällsynthet ÄR signalen. Behöver något "stå ut" och terrakotta redan är använt: lös det med typografisk vikt eller storlek, inte en andra färg.

**The No-Pure-Neutrals Rule.** Aldrig `#fff` eller `#000`. Ljusa ytor är cream (#FCF9F8), text är ink (#091B14). Varje neutral lutar mot varumärkets jordton.

**The Color-Plus-Word Rule.** Klinisk status (ok/varning/fara) får aldrig kommuniceras enbart med färg. Alltid färg + ord/ikon — WCAG och färgblindhet är icke förhandlingsbart i ett beslutsstöd.

## 3. Typography

**Display Font:** Newsreader (fallback Cormorant Garamond, serif)
**Body Font:** Plus Jakarta Sans (fallback sans-serif)
**Label/Mono Font:** IBM Plex Mono (fallback Space Grotesk, monospace)

**Character:** En redaktionell serif som ger erfarenhet och lugn auktoritet, satt mot en neutral, mycket läsbar sans för täta kliniska data, med en mono-röst för koder, doser och eyebrows. Newsreader i *italic* är systemets signatur — den "talande kollegan".

### Hierarchy
- **Display** (Newsreader 700, clamp(2rem, 5vw, 5.5rem), lh 1.02, ls −0.02em): Hero- och sidtitlar. Sparsamt.
- **Display Italic** (Newsreader *italic* 500, ls −0.015em): Signaturfraser — den editoriala "rösten" i titlar, pull-quotes, scenario-namn. Aldrig hela stycken.
- **Title** (Newsreader 700, clamp(1.3rem, 2vw, 2.1rem), lh 1.15): Sektions- och kort-rubriker.
- **Body** (Plus Jakarta Sans 400, 1rem på 18px rot, lh 1.65): All brödtext och klinisk data. Radlängd maximalt 65–75ch i löptext.
- **Label** (IBM Plex Mono 600, ~0.72rem, ls 0.22em, VERSALER): Eyebrows, koder (ICD/TLV), doser, scenario-ID, status-pills. Den "kliniska" mikrotypografin.

### Named Rules
**The Italic-Is-Voice Rule.** Newsreader italic används bara där systemet "talar" som kollega (signaturfraser, scenario-namn, pull-quotes). Det är aldrig dekoration och aldrig löptext.

**The Mono-Means-Data Rule.** IBM Plex Mono uppercase betyder "maskinläsbar klinisk fakta eller etikett" (kod, dos, eyebrow, status). Använd den aldrig för prosa — då tappar den sin signalfunktion.

## 4. Elevation

Systemet är platt vid vila och lyfter mjukt först som svar på interaktion. Djup byggs av tonal lagring (cream-yta mot pro-botten, hårfina kanter) snarare än tunga skuggor. Skuggorna är låg-opacitet och tonade mot varumärket (grön/blå-svart), aldrig en hård grå drop-shadow. Glaseffekter (`glass-bento`) existerar men är reserverade och får aldrig bli standardytan, särskilt inte i den täta kliniska kärnan.

### Shadow Vocabulary
- **Vilo-lyft / clay** (`box-shadow: 0 8px 24px rgba(30,48,40,0.06)`): Mjuk bädd under cards som behöver lätt separation i vila.
- **Hover-lyft** (`box-shadow: 0 16px 40px rgba(9,27,20,0.08)`, ofta med `translateY(-3px)`): Standard kort-hover. Diffus, varm, aldrig hård.
- **Accent-glow** (`box-shadow: 0 8px 16px -4px rgba(204,88,51,0.40)`): Endast under terrakotta CTA-knappar.
- **Deep** (`box-shadow: 0 30px 60px -12px rgba(9,27,20,0.18)`): Endast lyfta mörka ytor (featured pricing, terminal, modaler).

### Named Rules
**The Flat-By-Default Rule.** Ytor är platta i vila. En skugga får bara dyka upp som svar på tillstånd (hover, fokus, lyft modal). Om ett kort har en tung skugga i vila är skuggan fel, inte ljuset.

**The Tinted-Shadow Rule.** Skuggor tonas mot ink/grön-svart vid låg opacitet. Aldrig `rgba(0,0,0,0.2+)` rå svart.

## 5. Components

Genomgående känsla: **förfinad återhållsamhet**. Platt vid vila, hårfina 1px-kanter, generös inre luft, mjuk lyft först vid hover, terrakotta sparsamt. Den editoriala ramen (nav, landing, dashboard-shell) får mer luft; den kliniska kärnan (scenarier, verktyg, simulator) komprimerar luften för täthet och snabbhet — samma språk, tätare takt.

### Buttons
- **Shape:** Helt rundade pillerknappar (radius 9999px).
- **Primär (accent):** Terrakotta botten, cream text, padding 14px 26px, vikt 600, accent-glow. Hover: terrakotta-ljus + `translateY(-1px)` + lätt brightness, 0.2s.
- **Ghost:** Transparent/cream, ink-text, 1px kant `rgba(9,27,20,0.18)`; hover skiftar kant och text till terrakotta. Vit-variant (`btn-ghost-white`) på mörka band.
- **Fokus:** Synlig 2px terrakotta-outline, aldrig enbart färgskifte.

### Chips / Pills
- **Style:** Mono uppercase (label-typografi), pill-form, lugn cream/transparent botten med 1px kant.
- **State:** Vald = terrakotta fyllning + cream text. Ovald = dämpad ink, ingen fyllning. Filter kontra status skiljs av kontext, inte av en andra färg.

### Cards / Containers
- **Corner Style:** 22px (`card`) som standard editorial-kort; 28px för pricing, 16–24px för täta kliniska paneler.
- **Background:** Cream-yta (#FCF9F8). Aldrig rent vitt. Mörka varianter på #0C2230/#062F40 för featured/inverterade ytor.
- **Shadow Strategy:** Flat-By-Default. Vilo = ingen eller `clay`. Hover = hover-lyft + `translateY(-3px)`.
- **Border:** Hårfin 1px `#E5E3DF`. Hover får skifta till `rgba(204,88,51,0.35)`. En valfri 1px **topp**-hairline-gradient (transparent→terrakotta→transparent) vid hover är tillåten signatur. Sido-stripe-kanter (border-left/right >1px som färgaccent) är förbjudna.
- **Internal Padding:** 32px editorial; 16–24px klinisk kärna. Aldrig kapslade kort.

### Inputs / Fields
- **Style:** Cream botten, 1px `#E5E3DF` kant, radius 12px, body-typografi, padding 12px 16px.
- **Focus:** 2px terrakotta-ring/kant-skifte (inte glow). Tydlig, lugn.
- **Error / Disabled:** Fel = `#C1121F` kant + meddelandetext (alltid ord, aldrig bara röd kant). Disabled = dämpad ink, ingen accent.

### Navigation
- Sticky topp, `backdrop-blur`, halvtransparent cream/vit botten, 1px botten-kant `rgba(0,0,0,0.05)`. Logotyp i display-serif med terrakotta `·Pro`-signatur. Länkar i body 14–16px, ink 70% → ink vid hover. Primär CTA = accent-knapp. En tier/info-rad direkt under nav i terrakotta 10%-ton. Mobil: kollapsad, röda flaggor och sök förblir synliga.

### Signature Component — Röda flaggor
Solid `#DC2626`-yta, cream text, radius 2rem, 32px padding, hög-synlig skugga. **Får aldrig döljas bakom accordion på vuxenscenarier.** Pediatric får använda mjuk variant (ljus röd botten, 2px röd kant, mörk röd text) men aldrig gömma informationen. Detta är en patientsäkerhetskomponent, inte en stil.

## 6. Do's and Don'ts

### Do:
- **Do** behåll terrakotta som enda accent, ≤10% av en vuxenyta (The One Accent Rule).
- **Do** använd cream (#FCF9F8) för ytor och ink (#091B14) för text — aldrig rent vitt/svart.
- **Do** håll kort platta i vila; lyft (`translateY(-3px)` + diffus tonad skugga) endast vid hover.
- **Do** låt typografin bära hierarkin: Newsreader display/italic för röst, Plus Jakarta Sans för data, IBM Plex Mono uppercase för koder/eyebrows.
- **Do** håll röda flaggor, källor, doser och PSL-ansvar alltid synliga, aldrig bakom interaktion.
- **Do** komprimera luften i den kliniska kärnan (scenarier/verktyg) för snabb skanning vid stolen; ge den editoriala ramen mer luft.
- **Do** definiera ytor/text/kant via roll-tokens så att ljust ↔ mörkt läge bara är en inversion (The Two-Mode Rule); verifiera ≥4.5:1 i båda lägena.
- **Do** respektera `prefers-reduced-motion` och håll alla transitions ≤0.4s, ease-out, ingen bounce.

### Don't:
- **Don't** bygg en generisk SaaS-mall: inga lila gradienter, hero-metric-block eller oändliga identiska ikon-kort-rutnät.
- **Don't** låt det kännas som en steril sjukhusjournal: ingen kall grå-blå, tabelltung 90-tals-EPJ-estetik.
- **Don't** gör det till en lekfull konsument-app: ingen gamification, emoji-dekor eller barnslighet på vuxenytor (pediatric är ett kontrollerat undantag).
- **Don't** överdesigna eller sakta ner: inga tunga 3D-lager, glas-överallt eller animationer som blockerar ett akut beslut.
- **Don't** använd `border-left`/`border-right` >1px som färgad accent-stripe på kort, listrader eller callouts. Använd hel kant, bakgrundston, ledande siffra/ikon, eller inget.
- **Don't** använd `background-clip: text`-gradienttext. En solid färg; betoning via vikt/storlek.
- **Don't** gör glas (`glass-bento`) till standardyta, särskilt inte i den täta kliniska kärnan.
- **Don't** kommunicera klinisk status med enbart färg — alltid färg + ord.
- **Don't** rör medicinsk data när du arbetar med design. Presentation ändras; scenarier/doser/journal/patientfall är oföränderliga och härleds från HTML/markdown-källorna. Noll dataförlust.
