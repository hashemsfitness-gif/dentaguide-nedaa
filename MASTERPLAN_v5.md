# DENTAGUIDE-PRO MASTERPLAN

## Komplett Projektplan för Antigravity \& Claude Code

### Version 5.0 | Produktionsklar | Patientsäkerhetsgodkänd

\---

## 0\. PROJEKTÖVERSIKT

**DentaGuide-Pro** är ett kliniskt beslutsstöd för svenska tandläkare, byggt som SaaS-plattform. Systemet levererar evidensbaserade kliniska protokoll, journalmallar, läkemedelsstöd och diagnostikverktyg — offline-kapabelt via PWA, GDPR-säkert (PSL 2010:659), mobilfirst.

### Vad är det för slags system?

Tänk dig ett uppslagsverk på en mobiltelefon som en tandläkare kan ta fram vid patientstolen. Systemet hjälper tandläkaren att snabbt hitta rätt diagnos, behandlingsprotokoll och läkemedel. Det lagrar **inga patientuppgifter** — bara klinisk referensinformation.

### Tech-Stack

|Område|Teknik|Varför|
|-|-|-|
|Frontend|Next.js 15.2.4 + React 19 + Tailwind CSS + shadcn/ui|Snabb, mobiloptimerad|
|Backend/DB|Supabase (PostgreSQL + RLS)|Inbyggd autentisering + säkerhet|
|Betalning|Stripe|Prenumerationer + webhooks|
|Hosting|Vercel (Edge Runtime) + Strato-domän|Global CDN, snabb deploy|
|State|TanStack Query v5 + React Context|Effektiv datahämtning|
|PWA Offline|Service Workers + IndexedDB (idb v8) + @ducanh2912/next-pwa|Fungerar utan internet|
|Rate Limiting|Upstash Redis + @upstash/ratelimit|Skyddar login + API-routes|
|CI/CD|GitHub Actions (Snyk + Vitest-gate)|Automatisk säkerhetskontroll|
|Felövervakning|Sentry (@sentry/nextjs v8)|Fångar krascher i produktion|
|AI-funktioner|Anthropic Claude Opus 4.7 via @anthropic-ai/sdk|AI-journalstrukturering|
|Onboarding-mejl|Resend|Välkomstserie|
|Mobil bottom sheets|Vaul|iOS-likt mobilbeteende|
|Snabbnyckar|cmdk + react-hotkeys-hook|Power-user productivity|
|Tillgänglighet|@axe-core/react|WCAG 2.1 AA-validering|
|Design-verktyg|Stitch (källa) + Claude Code (utveckling) + UI/UX Skills (GitHub)|Färdiga designs vidareutvecklade|
|3D Interface|Claude Code + Three.js + React Three Fiber|Cinematic landing + interaktion|

### Prisplan

|Tier|Pris|Innehåll|
|-|-|-|
|Gratis|0 kr/mån|3 områden, 10 scenarier, grundtools, manuell journalmall|
|Kliniker|99 kr/mån|Allt innehåll, alla tools, bokmärken, anteckningar, AI-journal (5/dag)|
|Klinik|399 kr/mån|5 användare, admin-panel, API, analytics, AI-journal (100/dag)|

### Design-teman

|Område|Tema|
|-|-|
|Endodonti, Parodontologi, Protetik, Oralmedicin, Käkkirurgi, Bettfysiologi|**Nocturne Clinical** (iOS Glassy, Tech Blue #0E3B52)|
|Pedodonti (alla 4 underdelar), Ortodonti|**Warm Pediatric** (Beige/Cream, Claymorphism)|

\---

## 1\. AGENT-ARKITEKTUR — SEKVENTIELL DEPLOYMENT

**Totalt: 17 specialistagenter** som körs **en i taget**, i strikt ordning.

> \*\*Varför en i taget?\*\* Parallell körning orsakar Git merge-konflikter och gör att agenter skriver över varandras arbete. Sekventiell körning garanterar ett stabilt, fungerande bygge.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FAS 0 — Foundation                              │
│  Manuellt setuparbete + grundkomponenter + säkerhet                 │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│                     FAS 1A — Medicinsk Kärna                        │
│  AGENT 10 — Läkemedelsreferens + Antibiotikastöd + Dosering         │
│  (TDD obligatoriskt — patientsäkerhetskritisk)                      │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│                     FAS 1B — Övriga Verktyg                         │
│  AGENT 11 — Parodontologi-klassificerare                            │
│  AGENT 12A — Manuell Journalmallgenerator                           │
│  AGENT 12B — AI-assisterad Journalmall (Claude Opus 4.7)            │
│  AGENT 13 — Traumaguide (flowcharts primära + permanenta)           │
│  AGENT 14 — Debiteringsstöd (TLV)                                   │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│                     FAS 2 — Kliniskt Innehåll                       │
│  AGENT 01 — Landing + PWA + sitemap + onboarding                    │
│  AGENT 02 — Endodonti (SCENARIO 01–08)                              │
│  AGENT 03 — Parodontologi (6 scenarier)                             │
│  AGENT 04 — Protetik \& Bettfunktion (SCENARIO 15–21)                │
│  AGENT 05 — Oralmedicin (SCENARIO 35–40)                            │
│  AGENT 06 — Käkkirurgi (SCENARIO 07, 21–25, 27)                     │
│  AGENT 07 — Bettfysiologi/TMD (KIR-26, BETT-28-34)                  │
│  AGENT 08 — Pedodonti (4 SIDOR: Trauma/Akut/Munslemhinna/Beteende)  │
│  AGENT 09 — Ortodonti (ORT-01, ORT-10–16 + Riktlinjer)              │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│                     FAS 3 — Administration \& Utbildning             │
│  AGENT 15 — Admin Dashboard \& Analytics                             │
│  AGENT 16 — Simulator \& Fortbildning (med svårighetsgrader)         │
└─────────────────────────────────────────────────────────────────────┘
```

### Vad varje fas producerar

**FAS 0** → Projektet finns, databasen är skapad och seedad med kategorier, gemensamma komponenter är byggda (ScenarioLayout, RodaFlaggor, loading.tsx, error.tsx, not-found.tsx × 3, CommandPalette, ScenarioHotkeys), middleware.ts skyddar premium-routes, next.config.ts konfigurerar Sentry + PWA, CI/CD-pipeline är aktiv, CLAUDE.md är skriven, design-tokens är i globals.css, sync-script för HTML→Supabase är klart.

**FAS 1A** → Doseringskalkylatorn, läkemedelsreferensen och antibiotikastödet är byggda och testade med TDD. Alla maxdoser är maskinellt garanterade.

**FAS 1B** → Alla fem kliniska verktyg är klara och incheckade i Git. AI-journalmallen fungerar med Anthropic Claude Opus 4.7 + valideringslager mot fabricering och personuppgifter.

**FAS 2** → Alla nio kliniska sidor är byggda. Offline-PWA är aktiv. robots.txt och sitemap.xml skyddar admin-panelen från sökmotorer. Logout-flödet fungerar. Onboarding-flödet (3-mejl-serie + tutorial-overlay + checklista) är aktivt.

**FAS 3** → Admin-panelen och utbildningssimulator med svårighetsgrader är klara. JSON-export för innehåll fungerar. Systemet är redo för beta-test och lansering.

\---

## 2\. DESIGN SYSTEM

### 2A. Nocturne Clinical — Agent 02–07 (Tech Blue)

Används för: Endodonti, Parodontologi, Protetik, Oralmedicin, Käkkirurgi, Bettfysiologi.

> \*\*Viktigt:\*\* Design-tokens definieras i `app/globals.css` — det finns ingen separat `design-system/MASTER.md`. Agenter refererar alltid till Sektion 2 i detta dokument och till `globals.css`. Agenter ska ALDRIG skapa eller söka efter en fil med det namnet.

```css
/\* app/globals.css — Nocturne Clinical tokens \*/

/\* Primärfärger \*/
--tech-blue: #0E3B52;
--tech-blue-dark: #091B14;
--clay: #CC5833;
--clay-active: #C53A19;
--clay-glow: rgba(197, 58, 25, 0.35);

/\* Bakgrunder \*/
--bg-center: #F7F2EE;
--bg-sidebar: #F7F4F2;
--bg-glass: rgba(255,255,255,0.40);

/\* Effekter \*/
--blur: 24px;
--grain-opacity: 0.035;
--shadow-deep: 0 30px 60px -12px rgba(9,27,20,0.12);
--shadow-glow: 0 0 20px rgba(14,59,82,0.30);

/\* Typografi \*/
--font-headline: 'Cormorant Garamond', serif;
--font-body: 'Plus Jakarta Sans', sans-serif;
--font-mono: 'Space Grotesk', monospace;

/\* Former \*/
--radius-card: 2rem;
--radius-pill: 9999px;
--radius-btn: 1rem;
```

### Tre-kolumnslayout (identisk för alla Nocturne-sidor)

```
┌────────────┬──────────────────────────────────────┬──────────────────┐
│ VÄNSTER    │ CENTER                               │ HÖGER            │
│ SIDEBAR    │ PANEL                                │ SIDEBAR          │
│ 256px      │ flex-grow                            │ 288px            │
│            │                                      │                  │
│ Scenario-  │ \[Sticky flik-nav]                    │ Dosage Calc      │
│ lista med  │  Snabböversikt | Anamnes | Status |  │ ────────────     │
│ akut-märk  │  Behandling | Diagnos | Journal      │ Tidskritiskt     │
│ (röd prick)│                                      │ ────────────     │
│            │ \[Scenario-header: ICD + Citat]       │ Röda Flaggor     │
│ \[Aktiv]    │                                      │ ────────────     │
│ scenario   │ ┌──────────────────────────────┐     │ Diff.Diagnoser   │
│ markeras   │ │ ⚠️ RÖDA FLAGGOR              │     │ ────────────     │
│ med mörk   │ │ ALLTID SYNLIG — ALDRIG DÖLJ  │     │ Kliniska         │
│ bakgrund   │ └──────────────────────────────┘     │ Anteckningar     │
│            │ \[Anamnes] \[Status] \[Behandling]      │ (sparas per user)│
│            │ \[Debitering] \[Journal-mall]          │                  │
└────────────┴──────────────────────────────────────┴──────────────────┘
\[FAB — "Skriv under protokoll" — Centrerat längst ner]
```

### RodaFlaggor-komponenten — absolut regel

```tsx
// components/scenario/RodaFlaggor.tsx
// ALDRIG placera denna bakom accordion eller dölj-knapp.
// Den ska synas direkt utan att användaren klickar.

<div className="bg-red-50/40 border border-red-200/50 rounded-2xl p-5">
  <div className="flex items-center gap-3 mb-4">
    <span className="text-red-600 text-xl">⚠️</span>
    <h4 className="uppercase tracking-widest font-bold text-red-800 text-xs">
      Röda Flaggor — Agera omedelbart
    </h4>
  </div>
  <ul className="space-y-2">
    {rodaFlaggor.map(flagga => (
      <li key={flagga.text} className="flex gap-2 text-red-900/80 text-xs leading-snug">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
        <span>{flagga.text}</span>
      </li>
    ))}
  </ul>
</div>
```

### 2B. Warm Pediatric — Agent 08–09 (Beige/Cream)

Används för: Pedodonti och Ortodonti.

**Nunito-font import:** I `app/(dashboard)/pedodonti/layout.tsx` och `app/(dashboard)/ortodonti/layout.tsx` ska fonten importeras med:

```typescript
import { Nunito } from 'next/font/google';
const nunito = Nunito({ subsets: \['latin'], weight: \['400','600','700','800'] });
```

Använd ALDRIG en `<link>`-tagg för fonter i Next.js 15 — använd alltid `next/font/google`.

```css
/\* app/globals.css — Warm Pediatric tokens (tillagda under Nocturne tokens) \*/
--pediatric-primary: #5C3D2E;
--pediatric-accent: #E8A87C;
--pediatric-soft: #F5E6D3;
--pediatric-green: #7FB069;
--pediatric-yellow: #FFD166;
--bg-pediatric: #FEFAF5;
--bg-card-pediatric: rgba(255,248,240,0.70);
--radius-card-pediatric: 3rem;
--radius-btn-pediatric: 2rem;
```

### Skillnad mot Nocturne Clinical

* Inga mörka tekniska toner — varmt och inbjudande
* Illustrerade ikonografier (tand-maskot, smiley)
* Pastellfärgade kategori-badges
* Mjukare skuggor (Claymorphism)
* Fjäderbaserade animationer (spring-physics via CSS transitions)

### 2C. Globala tillgänglighets-CSS

```css
/\* Reduce motion-stöd \*/
@media (prefers-reduced-motion: reduce) {
  \*, \*::before, \*::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/\* Skip-to-main-content \*/
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0E3B52;
  color: white;
  padding: 8px 16px;
  z-index: 100;
}
.skip-link:focus { top: 0; }

/\* Screen reader only \*/
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/\* Focus-visible globalt \*/
\*:focus-visible {
  outline: 2px solid #0E3B52;
  outline-offset: 2px;
  border-radius: 4px;
}
```

\---

## 3\. EXAKTA NPM-VERSIONER

> Använd alltid dessa exakta versioner. Andra versioner kan orsaka kompatibilitetsproblem.

```json
{
  "name": "dentaguide-pro",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test",
    "sync-scenarios": "tsx scripts/sync-scenarios.ts"
  },
  "dependencies": {
    "next": "15.2.4",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@supabase/supabase-js": "2.45.4",
    "@supabase/ssr": "0.5.2",
    "stripe": "16.12.0",
    "@stripe/stripe-js": "4.8.0",
    "@tanstack/react-query": "5.62.7",
    "idb": "8.0.1",
    "@ducanh2912/next-pwa": "10.2.9",
    "@upstash/ratelimit": "2.0.4",
    "@upstash/redis": "1.34.3",
    "three": "0.169.0",
    "@react-three/fiber": "8.17.10",
    "@react-three/drei": "9.115.0",
    "tailwindcss": "3.4.15",
    "lucide-react": "0.460.0",
    "@tiptap/react": "2.10.2",
    "@tiptap/starter-kit": "2.10.2",
    "zod": "3.23.8",
    "@sentry/nextjs": "8.0.0",
    "@anthropic-ai/sdk": "0.32.1",
    "vaul": "1.0.0",
    "cmdk": "1.0.4",
    "react-hotkeys-hook": "4.6.1",
    "resend": "4.0.1",
    "jsdom": "25.0.1"
  },
  "devDependencies": {
    "typescript": "5.6.3",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "@types/node": "^20",
    "@types/jsdom": "21.1.7",
    "vitest": "2.1.8",
    "@testing-library/react": "16.0.1",
    "@testing-library/user-event": "14.5.2",
    "playwright": "1.49.0",
    "@playwright/test": "1.49.0",
    "eslint": "9.15.0",
    "eslint-config-next": "15.2.4",
    "supabase": "2.0.0",
    "@axe-core/react": "4.10.0",
    "tsx": "4.19.2"
  },
  "overrides": {
    "react": "19.0.0",
    "react-dom": "19.0.0"
  }
}
```

> \*\*`overrides`-blocket\*\* tvingar `@testing-library/react` och andra dev-paket att använda React 19 istället för att dra in en äldre version, vilket annars orsakar TypeScript-konflikter vid `npm run build`.

### Viktiga kompatibilitetsnoteringar

|Problem|Lösning|
|-|-|
|Next.js 15 + React 19: `use()` hook|Alltid wrappa i `<Suspense>`|
|TanStack Query v5 vs v4|Använd `{ queryKey: \[...], queryFn: () => ... }` syntax|
|shadcn/ui|Installera komponent för komponent: `npx shadcn@latest add button`|
|Three.js r169 + React Three Fiber|Använd `@react-three/drei` för helpers|
|workbox vs @ducanh2912/next-pwa|Använd ALLTID @ducanh2912/next-pwa — workbox är inkompatibel med App Router|
|@testing-library/react + React 19|Löst via `overrides` i package.json|

\---

## 4\. DATABAS-SCHEMA

> \*\*AI-INSTRUKTION:\*\* Läs `supabase/migrations/0001\_init.sql` för hela schemat. Databasändringar görs med CLI: `supabase migration new \[namn]` → redigera → `supabase db push`. Skapa ALDRIG tabeller direkt i koden.

### Tabellöversikt

|Tabell|Syfte|
|-|-|
|`profiles`|Utökar auth.users med plan\_tier, roll och Stripe-koppling + onboarding-fält|
|`categories`|Odontologiska kategorier (Endodonti, Parodontologi, etc.) med parent\_slug för pedodonti-undersidor|
|`scenarios`|Kärntabellen — kliniska scenarier med ICD-koder, difficulty, tab\_section|
|`scenario\_versions`|Versionshistorik — sparas automatiskt vid varje uppdatering|
|`bookmarks`|Tandläkarens sparade favorit-scenarier|
|`clinical\_notes`|Egna anteckningar per scenario, max 10 000 tecken|
|`tools`|Metadata om kliniska verktyg|
|`analytics\_events`|Händelselogg för admin-analytics|
|`ai\_journal\_logs`|Logg för AI-journalmallar (fakturering, audit, kvotkontroll)|

### 

## **-- Användarfeedback per scenario**

CREATE TABLE feedback\_entries (

&#x20; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&#x20; user\_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

&#x20; scenario\_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,

&#x20; feedback\_type TEXT NOT NULL CHECK (feedback\_type IN ('thumbs\_up','thumbs\_down','error\_report','suggestion')),

&#x20; rating SMALLINT CHECK (rating IN (-1, 1)),

&#x20; message TEXT CHECK (length(message) <= 2000),

&#x20; status TEXT DEFAULT 'new' CHECK (status IN ('new','reviewing','resolved','dismissed')),

&#x20; admin\_response TEXT,

&#x20; resolved\_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

&#x20; resolved\_at TIMESTAMPTZ,

&#x20; created\_at TIMESTAMPTZ DEFAULT now()

);

CREATE INDEX idx\_feedback\_scenario ON feedback\_entries(scenario\_id, created\_at DESC);

CREATE INDEX idx\_feedback\_status ON feedback\_entries(status) WHERE status = 'new';

ALTER TABLE feedback\_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users\_own\_feedback" ON feedback\_entries FOR INSERT WITH CHECK (user\_id = auth.uid());

CREATE POLICY "users\_view\_own" ON feedback\_entries FOR SELECT USING (user\_id = auth.uid());



## **-- Modererade kommentarer från andra tandläkare**

CREATE TABLE scenario\_comments (

&#x20; id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

&#x20; user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

&#x20; scenario\_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,

&#x20; content TEXT NOT NULL CHECK (length(content) BETWEEN 10 AND 1000),

&#x20; is\_approved BOOLEAN DEFAULT false,

&#x20; is\_flagged BOOLEAN DEFAULT false,

&#x20; approved\_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

&#x20; approved\_at TIMESTAMPTZ,

&#x20; upvotes INTEGER DEFAULT 0,

&#x20; created\_at TIMESTAMPTZ DEFAULT now()

);

CREATE INDEX idx\_comments\_scenario ON scenario\_comments(scenario\_id, is\_approved, created\_at DESC);

ALTER TABLE scenario\_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "approved\_comments\_visible" ON scenario\_comments FOR SELECT USING (is\_approved = true);

CREATE POLICY "users\_create\_comments" ON scenario\_comments FOR INSERT WITH CHECK (user\_id = auth.uid());



## **-- Användarstatistik (aggregerad)**

CREATE TABLE user\_statistics (

&#x20; user\_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,

&#x20; total\_scenarios\_viewed INTEGER DEFAULT 0,

&#x20; total\_journals\_generated INTEGER DEFAULT 0,

&#x20; total\_ai\_journals\_generated INTEGER DEFAULT 0,

&#x20; total\_dosering\_calculations INTEGER DEFAULT 0,

&#x20; total\_bookmarks INTEGER DEFAULT 0,

&#x20; estimated\_time\_saved\_minutes INTEGER DEFAULT 0,

&#x20; most\_used\_scenarios JSONB DEFAULT '\[]'::jsonb,

&#x20; most\_referenced\_drugs JSONB DEFAULT '\[]'::jsonb,

&#x20; last\_calculated\_at TIMESTAMPTZ DEFAULT now()

);

ALTER TABLE user\_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users\_own\_stats" ON user\_statistics FOR ALL USING (user\_id = auth.uid());



### **-- Aggregeringsfunktion (kallas av Vercel Cron varje natt)**

CREATE OR REPLACE FUNCTION recalculate\_user\_statistics(target\_user\_id UUID)

RETURNS VOID AS $$

DECLARE

&#x20; scenarios\_viewed INTEGER;

&#x20; journals\_count INTEGER;

&#x20; ai\_journals\_count INTEGER;

&#x20; bookmarks\_count INTEGER;

&#x20; time\_saved INTEGER;

&#x20; top\_scenarios JSONB;

BEGIN

&#x20; SELECT COUNT(\*) INTO scenarios\_viewed

&#x20;   FROM analytics\_events

&#x20;   WHERE user\_id = target\_user\_id AND event\_type = 'scenario\_view';

&#x20; 

&#x20; SELECT COUNT(\*) INTO journals\_count

&#x20;   FROM analytics\_events

&#x20;   WHERE user\_id = target\_user\_id AND event\_type = 'journal\_generated';

&#x20; 

&#x20; SELECT COUNT(\*) INTO ai\_journals\_count

&#x20;   FROM ai\_journal\_logs

&#x20;   WHERE user\_id = target\_user\_id AND was\_approved = true;

&#x20; 

&#x20; SELECT COUNT(\*) INTO bookmarks\_count

&#x20;   FROM bookmarks WHERE user\_id = target\_user\_id;

&#x20; 

&#x20; -- Tid sparad: 5 min per manuell journal + 7 min per AI-journal

&#x20; time\_saved := (journals\_count \* 5) + (ai\_journals\_count \* 7);

&#x20; 

&#x20; -- Top 10 mest använda scenarier

&#x20; SELECT jsonb\_agg(s) INTO top\_scenarios FROM (

&#x20;   SELECT scenario\_id, COUNT(\*) as views

&#x20;   FROM analytics\_events

&#x20;   WHERE user\_id = target\_user\_id AND event\_type = 'scenario\_view'

&#x20;   GROUP BY scenario\_id ORDER BY views DESC LIMIT 10

&#x20; ) s;

&#x20; 

&#x20; **INSERT INTO user\_statistics (user\_id, total\_scenarios\_viewed, total\_journals\_generated,**

&#x20;   total\_ai\_journals\_generated, total\_bookmarks, estimated\_time\_saved\_minutes,

&#x20;   most\_used\_scenarios, last\_calculated\_at)

&#x20; VALUES (target\_user\_id, scenarios\_viewed, journals\_count, ai\_journals\_count,

&#x20;   bookmarks\_count, time\_saved, COALESCE(top\_scenarios, '\[]'::jsonb), now())

&#x20; ON CONFLICT (user\_id) DO UPDATE SET

&#x20;   total\_scenarios\_viewed = EXCLUDED.total\_scenarios\_viewed,

&#x20;   total\_journals\_generated = EXCLUDED.total\_journals\_generated,

&#x20;   total\_ai\_journals\_generated = EXCLUDED.total\_ai\_journals\_generated,

&#x20;   total\_bookmarks = EXCLUDED.total\_bookmarks,

&#x20;   estimated\_time\_saved\_minutes = EXCLUDED.estimated\_time\_saved\_minutes,

&#x20;   most\_used\_scenarios = EXCLUDED.most\_used\_scenarios,

&#x20;   last\_calculated\_at = EXCLUDED.last\_calculated\_at;

END;

$$ LANGUAGE plpgsql SECURITY DEFINER;







### Profiles-tabellen (komplett)

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full\_name TEXT,
  clinic\_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin')),
  plan\_tier TEXT DEFAULT 'free' CHECK (plan\_tier IN ('free','kliniker','klinik')),
  stripe\_customer\_id TEXT,
  subscription\_status TEXT DEFAULT 'inactive',
  onboarding\_completed BOOLEAN DEFAULT false,
  onboarding\_tasks JSONB DEFAULT '{}'::jsonb,
  welcome\_email\_sent\_at TIMESTAMPTZ,
  day3\_email\_sent\_at TIMESTAMPTZ,
  day7\_email\_sent\_at TIMESTAMPTZ,
  created\_at TIMESTAMPTZ DEFAULT now(),
  updated\_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx\_profiles\_day3\_pending ON profiles(created\_at)
  WHERE day3\_email\_sent\_at IS NULL;
CREATE INDEX idx\_profiles\_day7\_pending ON profiles(created\_at)
  WHERE day7\_email\_sent\_at IS NULL;
```

### Scenarios-tabellen (komplett)

```sql
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  category\_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  scenario\_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  difficulty TEXT DEFAULT 'standard' CHECK (difficulty IN ('basic','standard','advanced')),
  tab\_section TEXT,
  is\_acute BOOLEAN DEFAULT false,
  is\_premium BOOLEAN DEFAULT false,
  icd\_code TEXT,
  patient\_quote TEXT,
  anamnes TEXT,
  status\_findings TEXT,
  trolig\_diagnos TEXT,
  differentialdiagnoser TEXT\[],
  behandling TEXT,
  debitering TEXT,
  roda\_flaggor JSONB,
  viktiga\_punkter JSONB,
  kallor JSONB,
  search\_vector TSVECTOR,
  created\_at TIMESTAMPTZ DEFAULT now(),
  updated\_at TIMESTAMPTZ DEFAULT now()
);
```

### Övriga tabeller

```sql
CREATE TABLE clinical\_notes (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scenario\_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 10000),
  updated\_at TIMESTAMPTZ DEFAULT now(),
  created\_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user\_id, scenario\_id)
);

CREATE TABLE ai\_journal\_logs (
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),
  user\_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scenario\_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
  input\_text TEXT NOT NULL CHECK (length(input\_text) <= 2000),
  output\_journal JSONB NOT NULL,
  was\_approved BOOLEAN DEFAULT false,
  was\_edited BOOLEAN DEFAULT false,
  tokens\_used INTEGER,
  cost\_usd DECIMAL(10, 6),
  created\_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx\_ai\_journal\_logs\_user ON ai\_journal\_logs(user\_id, created\_at DESC);
ALTER TABLE ai\_journal\_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users\_own\_logs" ON ai\_journal\_logs FOR ALL USING (user\_id = auth.uid());
```

### Seed-data (supabase/seed.sql)

Fas 0-agenten skapar seed-data med alla 12 kategorier (8 huvud + 4 pedodonti-underkategorier):

```sql
INSERT INTO categories (name, slug, icon, theme, order\_index, parent\_slug) VALUES
  -- Vuxen-områden (Nocturne Clinical)
  ('Endodonti', 'endodonti', 'tooth', 'clinical', 1, NULL),
  ('Parodontologi', 'parodontologi', 'layers', 'clinical', 2, NULL),
  ('Protetik \& Bettfunktion', 'protetik', 'shield', 'clinical', 3, NULL),
  ('Oralmedicin', 'oralmedicin', 'activity', 'clinical', 4, NULL),
  ('Käkkirurgi', 'kirurgi', 'scissors', 'clinical', 5, NULL),
  ('Bettfysiologi \& TMD', 'bettfysiologi', 'zap', 'clinical', 6, NULL),

  -- Barn-områden (Warm Pediatric)
  ('Pedodonti', 'pedodonti', 'star', 'pediatric', 7, NULL),
    ('Pedodonti — Trauma', 'pedodonti-trauma', 'shield-alert', 'pediatric', 7.1, 'pedodonti'),
    ('Pedodonti — Akut', 'pedodonti-akut', 'siren', 'pediatric', 7.2, 'pedodonti'),
    ('Pedodonti — Munslemhinna', 'pedodonti-munslemhinna', 'heart-pulse', 'pediatric', 7.3, 'pedodonti'),
    ('Pedodonti — Beteende \& Sedering', 'pedodonti-beteende', 'smile', 'pediatric', 7.4, 'pedodonti'),

  ('Ortodonti', 'ortodonti', 'git-branch', 'pediatric', 8, NULL);
```

### Sökfunktionen

Söker i: `title`, `icd\_code`, `patient\_quote`, `trolig\_diagnos`, `anamnes`, `behandling`

### Row Level Security (RLS)

* Gratis-användare ser bara scenarier med `is\_premium = false`
* Premium-användare ser allt
* Användare ser bara egna bookmarks och anteckningar
* Adminrollen (`role = 'admin'`) krävs för scenario\_versions

\---

## 5\. MAPPSTRUKTUR

```
dentaguide-pro/
│
├── CLAUDE.md                               ← GRUNDLAG
├── .env.local                              ← ALDRIG committas
├── .gitignore                              ← .env.local, node\_modules/, .next/
├── package.json                            ← Exakta versioner
├── next.config.ts                          ← Sentry-wrapper + PWA-config
├── middleware.ts                           ← Skyddar premium-routes server-side
├── vercel.json                             ← Cron-jobb config
│
├── content/
│   └── scenarios/
│       ├── endodonti/
│       │   └── värk\_och\_smärta\_2026-01.html
│       ├── parodontologi/
│       │   └── akut-parod\_2026-01.html
│       ├── protetik/
│       │   └── protetik\_och\_bettfunktion\_2026-01.html
│       ├── oralmedicin/
│       │   └── oralmedicin\_2026-01.html
│       ├── kirurgi/
│       │   └── kirurgi\_2026-01.html
│       ├── bettfysiologi/
│       │   └── bettfysiologi\_2026-01.html
│       ├── pedodonti/
│       │   ├── trauma\_primära\_pedo\_41-44\_2026-01.html
│       │   ├── trauma\_permanent\_pedo\_45-48\_2026-01.html
│       │   ├── ped-akut\_2026-01.html
│       │   ├── ped-oralmedicin\_2026-01.html
│       │   └── ped-beteende-sed\_2026-01.html
│       ├── ortodonti/
│       │   └── ortodonti\_2026-01.html
│       └── verktyg/
│           ├── journalmall\_v8\_2026-01.html
│           ├── dosering\_2026-01.html
│           ├── antibiotika\_2026-01.html
│           ├── lakemedelsreferens\_2026-01.html
│           ├── parod\_klassifikation\_2026-01.html
│           ├── flowchart\_primara\_2026-01.html
│           └── flowchart\_permanenta\_2026-01.html
│
├── supabase/
│   ├── migrations/
│   │   ├── 0001\_init.sql
│   │   ├── 0002\_onboarding.sql
│   │   └── 0003\_ai\_journal\_logs.sql
│   └── seed.sql
│
├── scripts/
│   └── sync-scenarios.ts                   ← HTML→Supabase sync
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml                       ← Snyk + Vitest-gate
│
├── public/
│   ├── manifest.json
│   └── icons/                              ← App-ikoner 192px + 512px
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx                       ← Global 404
│   ├── robots.ts
│   ├── sitemap.ts
│   │
│   ├── (public)/
│   │   ├── page.tsx                        ← Landningssida
│   │   ├── pricing/page.tsx
│   │   ├── login/page.tsx
│   │   └── registrera/page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx                   ← Dashboard 404
│   │   ├── dashboard/page.tsx

│       ├── statistik/page.tsx                ← Mina statistik
│   │   │
│   │   ├── endodonti/\[scenario]/page.tsx
│   │   ├── parodontologi/\[scenario]/page.tsx
│   │   ├── protetik/\[scenario]/page.tsx
│   │   ├── oralmedicin/\[scenario]/page.tsx
│   │   ├── kirurgi/\[scenario]/page.tsx
│   │   ├── bettfysiologi/\[scenario]/page.tsx
│   │   │
│   │   ├── pedodonti/                      ← Agent 08 (4 sidor!)
│   │   │   ├── layout.tsx                  ← Nunito-font
│   │   │   ├── page.tsx                    ← Översikt med 4 kort
│   │   │   ├── trauma/
│   │   │   │   ├── page.tsx                ← Flikar: Primära | Permanenta
│   │   │   │   └── \[scenario]/page.tsx
│   │   │   ├── akut/
│   │   │   │   ├── page.tsx
│   │   │   │   └── \[scenario]/page.tsx
│   │   │   ├── munslemhinna/
│   │   │   │   ├── page.tsx
│   │   │   │   └── \[scenario]/page.tsx
│   │   │   └── beteende/
│   │   │       ├── page.tsx
│   │   │       └── \[scenario]/page.tsx
│   │   │
│   │   ├── ortodonti/                      ← Agent 09
│   │   │   ├── layout.tsx                  ← Nunito-font
│   │   │   ├── page.tsx
│   │   │   ├── riktlinjer/page.tsx         ← Diagnoser \& riktlinjer
│   │   │   └── \[scenario]/page.tsx
│   │   │
│   │   ├── simulator/page.tsx              ← Agent 16
│   │   │
│   │   └── tools/
│   │       ├── lakemedel/page.tsx          ← Agent 10
│   │       ├── antibiotika/page.tsx        ← Agent 10
│   │       ├── dosering/page.tsx           ← Agent 10
│   │       ├── parod-klassificering/page.tsx ← Agent 11
│   │       ├── journalmall/
│   │       │   ├── page.tsx                ← Översikt med 2 val
│   │       │   ├── manuell/page.tsx        ← Agent 12A
│   │       │   └── ai-assisterad/page.tsx  ← Agent 12B
│   │       ├── traumaguide/
│   │       │   ├── page.tsx                ← Agent 13 översikt
│   │       │   ├── primara/page.tsx
│   │       │   └── permanenta/page.tsx
│   │       └── debitering/page.tsx         ← Agent 14
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       ├── not-found.tsx               ← Admin 404
│   │       ├── dashboard/page.tsx          ← Agent 15
│   │       ├── scenarios/page.tsx
│   │       ├── users/page.tsx
│   │       └── analytics/page.tsx

&#x20;   │       ├── feedback/page.tsx             ← Hantera feedback

&#x20;   │       ├── kommentarer/page.tsx          ← Moderera kommentarer
│   │
│   └── api/
│       ├── health/route.ts
│       ├── sync/route.ts
│       ├── auth/
│       │   └── logout/route.ts
│       ├── webhooks/
│       │   └── stripe/route.ts             ← Hanterar 4 events
│       ├── journalmall/
│       │   └── generera/route.ts           ← AI-journal endpoint
│       ├── admin/
│       │   └── export/route.ts             ← JSON-export
│       └── cron/
│           └── send-onboarding-emails/route.ts



│       ├── feedback/

│       │   ├── submit/route.ts

│       │   └── list/route.ts

│       ├── comments/

│       │   ├── create/route.ts

│       │   ├── upvote/route.ts

│       │   └── flag/route.ts

│       ├── statistics/

│       │   └── me/route.ts

│       └── cron/

│           └── recalculate-statistics/route.ts
│
├── components/
│   ├── scenario/
│   │   ├── ScenarioLayout.tsx
│   │   ├── RodaFlaggor.tsx                 ← ALLTID SYNLIG
│   │   ├── RodaFlaggorMobile.tsx           ← Bottom sheet på mobil
│   │   ├── AnamnesBlock.tsx
│   │   ├── StatusBlock.tsx
│   │   ├── BehandlingBlock.tsx
│   │   ├── DebiteringBlock.tsx
│   │   ├── JournalBlock.tsx
│   │   ├── ClinicalNotes.tsx
│   │   └── PremiumLock.tsx
│   ├── tools/
│   │   ├── LakemedelSearch.tsx
│   │   ├── AntibiotikaTool.tsx
│   │   ├── DoseringKalkylator.tsx
│   │   ├── ParodKlassificerare.tsx
│   │   ├── ManuellJournalmall.tsx
│   │   ├── AIJournalmallAgent.tsx
│   │   ├── TraumaGuide.tsx
│   │   └── DebiteringsStod.tsx
│   ├── shortcuts/
│   │   ├── CommandPalette.tsx              ← Cmd+K
│   │   ├── ScenarioHotkeys.tsx             ← J/K/C/B
│   │   └── ShortcutsCheatsheet.tsx         ← ?-modal
│   ├── onboarding/
│   │   ├── TutorialOverlay.tsx
│   │   └── OnboardingChecklist.tsx
│   └── admin/
│       ├── StatsCards.tsx
│       ├── UserTable.tsx
│       ├── ScenarioEditor.tsx
│       └── VersionHistory.tsx



│   ├── feedback/

│   │   ├── FeedbackButtons.tsx           ← Tumme upp/ner

│   │   ├── ErrorReportModal.tsx          ← "Rapportera fel"

│   │   ├── SuggestionForm.tsx            ← Förbättringsförslag

│   │   └── ScenarioComments.tsx          ← Modererade kommentarer

│   ├── statistics/

│   │   ├── StatsOverview.tsx             ← Mina statistik-dashboard

│   │   ├── TopScenariosWidget.tsx

│   │   ├── TopDrugsWidget.tsx

│   │   └── TimeSavedWidget.tsx
│
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── ratelimit.ts                        ← Upstash Redis
│   ├── offline-db.ts                       ← IndexedDB med idb
│   ├── sync.ts                             ← Background Sync API
│   ├── auth.ts
│   ├── claude.ts                           ← Anthropic SDK-wrapper
│   ├── journal-validator.ts                ← AI-output validering
│   └── email.ts                            ← Resend-integration
│
└── \_\_tests\_\_/
    ├── dosering.test.ts
    └── journal-validator.test.ts
```

\---

## 6\. FAS 0 — LEVERANS (KOMPLETT LISTA)

Fas 0 utförs av den första Antigravity-agenten och producerar följande filer. Ingen annan agent får starta innan alla dessa är incheckade i Git.

### Fas 0-agenten levererar 27 filer:

1. `next.config.ts` — Sentry-wrapper + PWA-konfiguration
2. `middleware.ts` — Skyddar `/dashboard/\*` och `/admin/\*`
3. `app/globals.css` — Alla design-tokens (Nocturne + Pediatric + tillgänglighet)
4. `app/layout.tsx` — Root layout med fonts, Sentry, QueryProvider, skip-link
5. `app/loading.tsx` + `app/error.tsx` — Globala states
6. `app/not-found.tsx` — Global 404
7. `app/robots.ts` — Blockerar /admin/ från sökmotorer
8. `app/sitemap.ts` — Sitemap för publika sidor
9. `app/(dashboard)/layout.tsx` — Tre-kolumnslayout
10. `app/(dashboard)/loading.tsx` + `app/(dashboard)/error.tsx`
11. `app/(dashboard)/not-found.tsx` — Dashboard 404
12. `app/(admin)/not-found.tsx` — Admin 404
13. `components/scenario/ScenarioLayout.tsx` — Delas av alla kliniska agenter
14. `components/scenario/RodaFlaggor.tsx` — Delas av alla kliniska agenter
15. `components/scenario/RodaFlaggorMobile.tsx` — Bottom sheet på mobil
16. `components/scenario/PremiumLock.tsx`
17. `components/shortcuts/CommandPalette.tsx` — Cmd+K-sökning
18. `components/shortcuts/ScenarioHotkeys.tsx` — J/K/C/B-tangenter
19. `components/shortcuts/ShortcutsCheatsheet.tsx` — ?-modal
20. `supabase/migrations/0001\_init.sql` — Komplett schema
21. `supabase/migrations/0002\_onboarding.sql` — Onboarding-fält
22. `supabase/seed.sql` — Alla 12 kategorier
23. `lib/supabase.ts` + `lib/auth.ts`
24. `lib/ratelimit.ts` — Upstash Redis-konfiguration
25. `lib/email.ts` — Resend-integration
26. `app/api/auth/logout/route.ts` — Logout-endpoint
27. `scripts/sync-scenarios.ts` — HTML→Supabase sync
28. `.github/workflows/ci-cd.yml` — Pipeline
29. `CLAUDE.md` — Grundlag
30. &#x20;supabase/migrations/0004\_feedback\_system.sql    ← Feedback-system
31. &#x20;supabase/migrations/0005\_user\_statistics.sql    ← Statistik

### next.config.ts

```typescript
import { withSentryConfig } from '@sentry/nextjs';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: \[
      {
        urlPattern: /^https:\\/\\/fonts\\.(googleapis|gstatic)\\.com\\/.\*/i,
        handler: 'CacheFirst',
        options: { cacheName: 'google-fonts', expiration: { maxAgeSeconds: 365 \* 24 \* 60 \* 60 } }
      },
      {
        urlPattern: /^https:\\/\\/.\*\\.supabase\\.co\\/rest\\/.\*/i,
        handler: 'NetworkFirst',
        options: { cacheName: 'supabase-api', networkTimeoutSeconds: 5 }
      }
    ]
  }
})({});

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY\_ORG,
  project: process.env.SENTRY\_PROJECT,
});
```

### middleware.ts (Den viktigaste säkerhetsfilen)

```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT\_PUBLIC\_SUPABASE\_URL!,
    process.env.NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY!,
    { cookies: { get: (n) => request.cookies.get(n)?.value, set: (n, v, o) => response.cookies.set(n, v, o), remove: (n, o) => response.cookies.delete({ name: n, ...o }) } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (path.startsWith('/dashboard') \&\& !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (path.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url));
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: \['/dashboard/:path\*', '/admin/:path\*'],
};
```

### lib/ratelimit.ts (komplett med AI-rate limiters)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const loginRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
});

export const apiRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
});

export const aiJournalRatelimitKliniker = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  analytics: true,
  prefix: 'ai\_journal\_kliniker',
});

export const aiJournalRatelimitKlinik = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '24 h'),
  analytics: true,
  prefix: 'ai\_journal\_klinik',
});
```

### app/api/auth/logout/route.ts

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT\_PUBLIC\_SUPABASE\_URL!,
    process.env.SUPABASE\_SERVICE\_ROLE\_KEY!,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }
  );

  await supabase.auth.signOut();

  const response = NextResponse.redirect('/login');
  response.cookies.delete('sb-access-token');
  response.cookies.delete('sb-refresh-token');
  return response;
}
```

### app/robots.ts

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: \[
      { userAgent: '\*', allow: '/', disallow: \['/admin/', '/api/'] },
    ],
    sitemap: `${process.env.NEXT\_PUBLIC\_APP\_URL}/sitemap.xml`,
  };
}
```

### app/loading.tsx + app/error.tsx + app/not-found.tsx

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-\[#F7F2EE]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-\[#0E3B52] border-t-transparent animate-spin" />
        <p className="text-sm font-mono text-\[#0E3B52]/60 uppercase tracking-widest">Laddar...</p>
      </div>
    </div>
  );
}

// app/error.tsx
'use client';
import \* as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, \[error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h2 className="font-serif italic text-2xl text-\[#0E3B52]">Något gick fel</h2>
      <p className="text-sm text-\[#0E3B52]/60">Felet har rapporterats automatiskt.</p>
      <button onClick={reset} className="px-6 py-2 bg-\[#0E3B52] text-white rounded-full text-sm">
        Försök igen
      </button>
    </div>
  );
}

// app/not-found.tsx
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-\[#F7F2EE]">
      <div className="max-w-md text-center space-y-6 p-8">
        <h1 className="font-serif italic text-7xl text-\[#0E3B52]">404</h1>
        <h2 className="text-2xl font-bold text-\[#0E3B52]">Sidan hittades inte</h2>
        <p className="text-\[#0E3B52]/60">Sidan du letade efter finns inte längre eller har flyttats.</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-\[#0E3B52]/40" />
          <input type="search" placeholder="Sök efter scenario..." className="w-full pl-10 pr-4 py-3 rounded-full border border-\[#0E3B52]/20 bg-white" />
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-6 py-2 bg-\[#0E3B52] text-white rounded-full text-sm">Tillbaka till start</Link>
          <Link href="/dashboard" className="px-6 py-2 border border-\[#0E3B52] text-\[#0E3B52] rounded-full text-sm">Till mitt dashboard</Link>
        </div>
      </div>
    </div>
  );
}
```

\---

## 7\. AGENT-SPECIFIKATIONER — FAS 1A (AGENT 10)

### AGENT 10 — Läkemedelsreferens + Antibiotikastöd + Doseringskalkylatorn

**TDD-KRAV:** RED-GREEN-REFACTOR för ALL doseringslogik. Skriv failing tests FÖRST. Ingen doseringslogik utan test.

#### 10A — Läkemedelsreferens (8 läkemedelsgrupper)

**Sida:** `/app/(dashboard)/tools/lakemedel/page.tsx`

|cat|Innehåller|
|-|-|
|antikoagulantia|Waran, NOAK (Xarelto/Eliquis/Pradaxa), Trombyl, Klopidogrel|
|bisfosfonat|Alendronsyra, Zoledronat, Denosumab (Prolia/Xgeva)|
|cancer|Cytostatika, Immunterapi (checkpoint-hämmare), Strålbehandling|
|immunsuppression|Ciklosporin, Kortikosteroider, Metotrexat, HIV-läkemedel|
|hjarta|Betablockerare, Kalciumantagonister, ACE-hämmare, Digoxin|
|psykiatri|SSRI, Litium, MAOI, Antiepileptika (Lamotrigin/Valproat)|
|diabetes|Insulin, Metformin, SGLT-2-hämmare, GLP-1-agonister|
|ovrigt|Östrogen, Bisfosfonater (osteoporos), Kortison (inhalation)|

**Waran-specifika regler:**

* Sätt ALDRIG ut utan läkarkontakt
* Kontrollera INR inom 72h före ingrepp
* Enkel extraktion OK vid INR ≤ 3,5
* Klass D-interaktion med Metronidazol (↑INR) — UNDVIK kombination

#### 10B — Antibiotikastöd (Strama 2024)

```
Fråga 1: Profylax eller behandling?
│
├── PROFYLAX:
│   └── Amoxicillin 2g engångsdos (barn: 50mg/kg, max 2g)
│       OBS: Endokarditprofylax (ESC 2023) = MYCKET BEGRÄNSAD indikation.
│       Ges bara till: mekanisk hjärtklaff, genomgången endokardit,
│       specifika medfödda hjärtfel.
│
└── BEHANDLING:
    │
    Fråga 2: Penicillinallergi?
    ├── NEJ → PcV 1,6g × 3 i 5–7 dagar
    └── JA  → Klindamycin 150mg × 3 i 5–7 dagar
    │
    Fråga 3: Svår infektion? (cellulit, spridning, feber >38.5°C)
    ├── SVÅR, ingen allergi → PcV + Metronidazol
    └── SVÅR, allergi       → Klindamycin 600mg engångsdos (VGR)

ALDRIG: Amoxicillin är INTE förstahandsval i svensk allmäntandvård.
```

**Interaktioner (Janusmed):**

|Kombination|Klass|Åtgärd|
|-|-|-|
|Metronidazol + Waran|D (UNDVIK)|Välj annat antibiotikum|
|Klindamycin + Warfarin|C (Försiktighet)|Täta INR-kontroller|
|NSAID + Waran|C (Försiktighet)|Paracetamol är säkrare|

#### 10C — Doseringskalkylatorn

**DOSGRÄNSER — Absoluta tak (TDD-testade):**

|Preparat|Barn: dos|Barn: max/dag|Vuxen: dos|Vuxen: max/dag|
|-|-|-|-|-|
|Paracetamol|10–15 mg/kg|60mg/kg, max 4000mg|1000mg|4000mg (äldre: 3000mg)|
|Ibuprofen|4–10 mg/kg|400mg/dos, 1200mg/dag|400mg|1200mg|
|PcV|25 mg/kg|1600mg/dos|1600mg|4800mg/dag|
|Klindamycin|5 mg/kg|150mg/dos|150mg|450mg/dag|
|Artikain|7 mg/kg|500mg totalt|7 mg/kg|500mg totalt|
|Amoxicillin (profylax)|50 mg/kg|2000mg engångsdos|2000mg|Engångsdos|

> \*\*Artikain-spärr:\*\* Kontraindicerat barn under 4 år ELLER under 20kg. Systemet ska visa felmeddelande och spärra beräkningen helt vid dessa värden.

**Opioid-inklusionschecklista — 8 krav:**
Alla måste bockas av. UI visar grön/röd status i realtid.

1. NSAID + Paracetamol i maxdos prövats och otillräckligt
2. Kausal tandvårdsåtgärd genomförd eller ej möjlig
3. Känd smärtorsak diagnosticerad och journalförd
4. Ingen känd opioidöverkänslighet eller -beroende
5. Ingen andningsdepression, svår astma eller MAOI
6. Ingen samtidig bensodiazepinbehandling
7. Max 30 tabletter förskrivs
8. Indikation + uppföljningsplan dokumenterad i journal (Oxikodon: specialistkompetens oral kirurgi — HSLF-FS 2016:34)

\---

## 8\. AGENT-SPECIFIKATIONER — FAS 1B (AGENT 11–14)

### AGENT 11 — Parodontologi-klassificerare (EFP/AAP 2018)

```
Steg 1: Gingivit eller Parodontit?
├── GINGIVIT → Plack-associerad / Icke-plack-associerad → Resultat
└── PARODONTIT → Steg 2

Steg 2: Stadium (allvarlighetsgrad)
├── Stadium I:   CAL 1–2mm, BL <15%, fickdjup ≤4mm
├── Stadium II:  CAL 3–4mm, BL 15–33%, fickdjup ≤5mm
├── Stadium III: CAL ≥5mm, BL ≥33%, fickdjup ≥6mm
└── Stadium IV:  Stadium III + komprometterad tuggfunktion

Steg 3: Grad (progressionshastighet)
├── Grad A: Ingen evidens för progression (≤0.25mm BL/år)
├── Grad B: Måttlig progression (0.25–1mm BL/år)
└── Grad C: Snabb progression (>1mm BL/år), rökning, diabetes

Steg 4: Resultat-kort med copy-knapp för journaltext
```

### AGENT 12A — Manuell Journalmallgenerator

**Interaktiva platshållare:**

|Platshållartext|Typ|UI|
|-|-|-|
|`\[nr]`|tooth|Klickbar FDI-tandkarta|
|`\[nr–nr]`|tooth-multi|Flervals-tandkarta|
|`\[Ja/Nej]`|bool|Ja/Nej-knappar|
|`\[Artikain 40mg/ml...]`|anesthesia|Dropdown|
|`\[Mandibulär blockad / Infiltration]`|la-type|Knappar|
|`\[ml]`|volume|Dropdown + fritext|
|`\[datum]`|text|Fritextfält|

Söklägen: Diagnos/ICD | Behandling | Symptom | Allt
Remiss-panel: Genereras automatiskt, kopieras som ren text (ingen HTML).

### AGENT 12B — AI-assisterad Journalmall (Anthropic Claude Opus 4.7)

**Server-side endpoint:** `app/api/journalmall/generera/route.ts`

**Premium-gating:**

* Free-tier → 403 + PremiumLock-komponent
* Kliniker → 5 anrop/dag (Upstash Redis)
* Klinik → 100 anrop/dag (Upstash Redis)

**Systemprompt — absoluta regler:**

1. HITTAR ALDRIG på medicinska fakta
2. Saknad info → "\[ej angivet]" eller "\[behöver kompletteras]"
3. ICD/TLV/doser från tandläkarens text — annars "\[verifiera kod]"
4. ALDRIG personuppgifter — använd \[Patient], \[PNR]
5. Output: ENBART JSON

**JSON-struktur:**

```json
{
  "anamnes": "...",
  "status": "...",
  "diagnos": {
    "trolig": "...",
    "icd\_kod": "\[hänvisas till scenario-översikt]",
    "differentialdiagnoser": \[]
  },
  "behandling": {
    "atgard": "...",
    "lokalanestesi": "...",
    "lakemedel": "...",
    "tlv\_koder": \[]
  },
  "uppfoljning": "...",
  "roda\_flaggor\_observerade": \[],
  "anmarkningar": "..."
}
```

**Validator (lib/journal-validator.ts):**

* Zod-schema för struktur
* Regex för PERSONNUMMER `/\\d{6,8}\[-+]?\\d{4}/`
* Anti-fabrication-sökord: "enligt min erfarenhet", "jag rekommenderar", "i de flesta fall", "ungefär", "cirka"

**UI-flöde (4 steg):**

1. INMATNING — textarea max 2000 tecken + räknare
2. LADDNING — skeleton + roterande texter
3. RESULTAT — split-vy (originaltext + 7 expanderbara kort)
4. GODKÄNNANDE — 3 knappar (Acceptera+kopiera / Acceptera+spara / Förkasta)

**Obligatorisk fotnot (alltid synlig):**
"⚠️ AI-genererat utkast. Tandläkaren är ansvarig för att granska och verifiera all information INNAN journalanteckningen sparas eller används kliniskt. PSL 2010:659 — Ersätter inte kliniskt omdöme."

### AGENT 13 — Traumaguide

```
Steg 1: Tandtyp (Primär / Permanent)
Steg 2: Skadetyp (Fraktur / Luxation / Avulsion)
Steg 3: Specifik skada (beslutsträd)
Steg 4: Behandlingsprotokoll + splint-tid + uppföljning + prognos
```

**Tidskritiska gränser (röd banner när dessa passeras):**

|Situation|Gräns|
|-|-|
|Avulsion permanent — replantation|< 60 min (KRITISKT)|
|Cvek pulpotomi efter exponering|< 24 timmar|
|Luxation — splint-tid|2 veckor (flexibel splint)|
|Alveolarfraktur — splint-tid|4 veckor|

**HTML-källor:**

* `flowchart\_primara\_tander.html` (primära tänder)
* `flowchart\_permanenta\_tander.html` (permanenta tänder)

**PRIMÄR TAND avulsion:** ALDRIG replantation (skadar permanent tandknopp).

### AGENT 14 — Debiteringsstöd (HSLF-FS 2025:68)

|Kodserien|Innehåll|
|-|-|
|100-serien|Undersökning, röntgen, hälsobedömning, remisser|
|200-serien|Hälsofrämjande: tandsten, fluorid, fissurförsegling|
|300-serien|Sjukdomsbehandling: parodontal, akut smärta, infektioner|
|400-serien|Kirurgi: extraktion, implantat, lambåkirurgi, biopsier|
|500-serien|Rotbehandling: pulpabehandling, rotfyllning|
|600-serien|Bettfysiologi: bettskenor, ocklusionsanalys|
|700-serien|Reparativa åtgärder: fyllningar, komposit|
|800-serien|Protetik: kronor, broar, proteser, implantatöverbyggnad|
|900-serien|Tandreglering: ortodontiska åtgärder, retainrar|

> \*\*ALLTID visa:\*\* "Koder och referenspriser verifieras mot TLV kusp.tlv.se. Koder kan ändras — kontrollera alltid aktuell lista."

\---

## 9\. AGENT-SPECIFIKATIONER — FAS 2 (AGENT 01–09)

### AGENT 01 — Landing Page, PWA Offline, robots, sitemap \& onboarding

**Ansvar:** Landningssida + PWA + sökmotorskydd + onboarding-flöde

**Sidor:**

* `/app/(public)/page.tsx` — Cinematic landing med Three.js-tand
* `/app/(public)/pricing/page.tsx` — Transparent tier-jämförelse
* `/app/(public)/login/page.tsx` — Supabase Auth
* `/app/(public)/registrera/page.tsx` — Registrering
* `app/sitemap.ts` — Publika sidor

**PWA-cachingstrategi:**

```
Statiska assets (JS, CSS, ikoner) → CacheFirst (långa TTL)
Google Fonts                      → CacheFirst (1 år)
Supabase API-anrop                → NetworkFirst (5s timeout → fallback IndexedDB)
App Shell (HTML-skelet)           → StaleWhileRevalidate
```

**Background Sync-protokoll:**

```typescript
// lib/sync.ts
// 1. Hämta 'last-sync' från IndexedDB meta-store
// 2. SELECT \* FROM scenarios WHERE updated\_at > \[last-sync]
// 3. Spara i IndexedDB
// 4. Uppdatera 'last-sync' till now()
```

**Onboarding-flöde:**

* Välkomstmail direkt vid registrering (Resend)
* Tutorial-overlay vid första dashboard-visning (4 steg)
* Onboarding-checklista i sidebar (4 tasks: first\_search, first\_bookmark, first\_journal, try\_dosing)
* Day3-mejl: "5 sätt Tandguide kan spara dig 30 min/dag"
* Day7-mejl: "Är du redo för Premium? 50% första månaden-kod"
* Vercel Cron körs dagligen kl 09:00 CET

### AGENT 02 — Endodonti / Värk \& Smärta

**HTML-källa:** `värk\_och\_smärta\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical
**Antal scenarier:** 8

|Scenario-kod|Patient-citat|Trolig diagnos|
|-|-|-|
|SCENARIO 01|"Det ilar/hugger vid kyla \& sött"|Reversibel pulpit / dentinhypersensibilitet|
|SCENARIO 02|"Bultande spontanvärk / Nattsmärta"|Irreversibel pulpit|
|SCENARIO 03|"Det gör ont att bita ihop / Tanden känns hög"|Apikal parodontit|
|SCENARIO 04|"Svullnad, ömt och varmt"|Akut apikal abscess|
|SCENARIO 05|"Det ilar till när jag biter"|Cracked tooth syndrome|
|SCENARIO 06|"Tanden känns för hög"|Postoperativ kontakt|
|SCENARIO 07|"Ilar vid kyla \& borstning"|Dentinhypersensibilitet|
|SCENARIO 08|"Det gör ondare nu än innan ni rotfyllde!"|Postendo-smärta (flare-up)|

**Röda flaggor (ALLTID synliga):**

* Dysfagi → Remiss sjukhus omedelbart
* Trismus < 20mm → Käkkirurg AKUT
* Cellulit + feber >38.5°C → Sjukhus
* Spridning till djupa spatier → Kirurg AKUT

### AGENT 03 — Parodontologi

**HTML-källa:** `akut-parod\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical
**Antal scenarier:** 6

|Scenario-kod|Patient-citat|Trolig diagnos|
|-|-|-|
|VARK-11-PAROD|"Det blöder när jag borstar och tandköttet ömmar"|Gingivit / parodontit|
|VARK-05-PERI|"Ont längst bak i käken / svårt att gapa"|Perikoronit|
|VARK-12-PARAB|"Det bultar i tandköttet, tanden känns lös/hög"|Parodontal abscess|
|VARK-11-GING|"Det svider, blöder och luktar illa i munnen"|NUG / ANUG|
|VARK-13-IMPL|"Det blöder och varar runt implantatet"|Perimplantit / Mukosit|
|PARO-26-FK|"Något sitter fast mellan tänderna / Det gör ont"|Främmande kropp / impaktion|

**Höger sidebar:** BPE-karta, länk till Parod-klassificeraren (Agent 11), behandlingstrappa, PcV-doser.

### AGENT 04 — Protetik \& Bettfunktion

**HTML-källa:** `protetik\_och\_bettfunktion\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical
**Antal scenarier:** 7

|Scenario-kod|Patient-citat|
|-|-|
|SCENARIO 15|"Min tillfälliga krona har trillat loss"|
|SCENARIO 16|"Min implantattand sitter löst / glappar"|
|SCENARIO 17|"Kronan har lossnat och tanden sitter kvar inuti"|
|SCENARIO 18|"Protesen skaver och det gör ont när jag äter"|
|SCENARIO 19|"Min protes har gått sönder"|
|SCENARIO 20|"En bit av porslinet har lossnat"|
|SCENARIO 21|"Min krona har trillat loss"|

**Kritiska regler:**

* Ferrule-effekten: ≥ 2mm — aldrig acceptera 1,5mm
* Implantat-torque: "Verifiera mot tillverkarens IFU" (alltid)
* Protesstomatit: antifungal + hygieninstruktion (aldrig bara ett av dem)

### AGENT 05 — Oralmedicin

**HTML-källa:** `oralmedicin\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical (Lila accent #5B21B6)
**Antal scenarier:** 6

|Scenario-kod|Patient-citat|Klinisk fokus|
|-|-|-|
|SCENARIO 35|"Det svider och jag har fått blåsor/sår i munnen"|Aftösa sår / herpes / herpetisk gingivostomatit|
|SCENARIO 36|"Det svider i gommen och tungan är röd"|Akut erytematös candidos / lichen / atrofisk glossit|
|SCENARIO 37|"Ett sår som inte läker, en knöl som växer"|**MISSTÄNKT MALIGNITET** — biopsi obligatorisk + SVF-remiss|
|SCENARIO 38|"Svullet tandkött eller blottlagt ben"|MRONJ / osteonekros / pyogent granulom|
|SCENARIO 39|"Akut smärta, blödning och 'avhuggna' papiller"|NUG/NUP vuxen|
|SCENARIO 40|"Det bränner eller hugger – men tanden ser frisk ut"|Trigeminusneuralgi / BMS / Herpes Zoster|

**Röda flaggor:**

* SCENARIO 37: Icke-läkande sår > 3 veckor → BIOPSI OBLIGATORISK + SVF-remiss
* SCENARIO 38: MRONJ → Kontakta onkolog INNAN ingrepp
* SCENARIO 40: BMS atypisk → Neurologisk utredning

**ICD-koder — ej förhandlingsbara:**

* K12.0 = Aftösa sår (ALDRIG K13.1)
* K13.1 = Traumatisk decubitus (ALDRIG K12.0)

### AGENT 06 — Käkkirurgi

**HTML-källa:** `kirurgi\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical (Amber/guld-accent #B45309)
**Antal scenarier:** 7 (icke-sekventiella)

|Scenario-kod|Titel|
|-|-|
|SCENARIO 07|Alveolit (Dry Socket)|
|SCENARIO 21|Postoperativ blödning|
|SCENARIO 22|Sinuskommunikation|
|SCENARIO 23|Postoperativ infektion|
|SCENARIO 24|Dislocerad tand/rot|
|SCENARIO 25|Nervpåverkan (Parestesi)|
|SCENARIO 27|Tuberfraktur|

> \*\*OBS:\*\* Scenario-numreringen är medvetet icke-sekventiell — den följer en större överordnad numrering där andra nummer tillhör andra HTML-filer. Bevara den exakt.

### AGENT 07 — Bettfysiologi / TMD

**HTML-källa:** `bettfysiologi\_html\_JUSTERAD.html`
**Tema:** Nocturne Clinical (Teal-accent #0D9488)
**Antal scenarier:** 6 (DC/TMD 2014-baserade)

|Scenario-kod|Titel|
|-|-|
|KIR-26|Käkledsluxation|
|BETT-28|Akut Myalgi \& Artralgi|
|BETT-29|Akut Käkledslåsning (Closed Lock)|
|BETT-30|Traumatisk Artrit|
|BETT-32|Muskelspasm \& Temporalistendinit|
|BETT-34|Käkledsartrit \& Artralgi|

**Kritisk klinisk regel (BETT-34):**

* Käkledsartrit = ipsilateral molarprematurkontakt + KONTRALATERALT öppet bett
* Ipsilateralt öppet bett = FELVÄNT — visa varning

**Höger sidebar:** TMD-screening (3 DC/TMD-frågor), VAS-skala (0–10), muskel-palpationsguide.

### AGENT 08 — Pedodonti (4 SEPARATA SIDOR — BARN-TEMA)

**Tema:** Warm Pediatric — helt annorlunda än alla vuxen-sidor
**Font:** Nunito via `next/font/google` i `pedodonti/layout.tsx`

KRITISKT: Pedodonti är inte en sida — det är **4 separata sidor** + en översiktssida.

#### 8A. Översiktssida — `app/(dashboard)/pedodonti/page.tsx`

```
┌───────────────────┬───────────────────┐
│  🩹 TRAUMA        │  🚨 AKUT          │
│  8 scenarier      │  10 scenarier     │
│  (primära + perm) │                   │
├───────────────────┼───────────────────┤
│  💛 MUNSLEMHINNA  │  😊 BETEENDE      │
│  \& SYSTEMSJUKD.   │  \& SEDERING       │
│  13 scenarier     │  3 scenarier      │
└───────────────────┴───────────────────┘
```

#### 8B. TRAUMA — `app/(dashboard)/pedodonti/trauma/`

UI: En sida med 2 flikar — **Primära tänder** | **Permanenta tänder**

**Primära tänder (Flik 1):**

|Scenario-kod|Patient-citat|
|-|-|
|SCENARIO 41|"Tanden sitter snett / är lös / har försvunnit upp" (Luxation)|
|SCENARIO 42|"Tanden har slagits ut helt och hållet" (Exartikulation — ALDRIG replantera)|
|SCENARIO 43|"En bit av tanden har gått av" (Kronfraktur)|
|SCENARIO 44|"Tanden är väldigt lös och går av under tandköttet" (Rotfraktur)|

**Permanenta tänder (Flik 2):**

|Scenario-kod|Patient-citat|
|-|-|
|SCENARIO 45|"Hela tandköttspartiet och flera tänder rör sig tillsammans" (Alveolarfraktur)|
|SCENARIO 46|"Barnet har slagit av en bit av den nya framtanden" (Kronfraktur)|
|SCENARIO 47|"Tanden fick en smäll och är jätteöm vid beröring" (Konkussion)|
|SCENARIO 48|"Hela tanden är löst eller utslaget" (Exartikulation — < 60 min!)|

**OBLIGATORISK BARNMISSHANDEL-SCREENING vid alla trauma-scenarier:**

> "Stämmer skadans mekanism med barnets ålder och historia?"
> Vid tvivel: Kontakta socialjour. Konfrontera ALDRIG misstänkt förövare.

#### 8C. AKUT — `app/(dashboard)/pedodonti/akut/`

**HTML-källa:** `ped-akut\_uppdaterad.html`
**Antal scenarier:** 10

|Scenario-kod|Titel|
|-|-|
|SCENARIO 39|MIH (Hypomineralisering)|
|SCENARIO 50|Djup karies mjölktand — Selektiv exkavering|
|SCENARIO 51|Akut pulpit mjölktand — Extraktion|
|SCENARIO 52|Pulpit ung permanent tand — Pulpotomi/Apexogenes (MTA)|
|SCENARIO 53|Abscess mjölktand|
|SCENARIO 54|Cellulit / Spridd infektion|
|SCENARIO 55|Perikoronit hos barn|
|SCENARIO 56|Postextraktionsblödning|
|SCENARIO 57|Spontan gingival blödning|
|SCENARIO 58|Systemisk risk / Leukemi|

#### 8D. MUNSLEMHINNA \& SYSTEMSJUKDOMAR — `app/(dashboard)/pedodonti/munslemhinna/`

**HTML-källa:** `ped-oralmedicin\_uppdaterad.html`
**Antal scenarier:** 13

|Scenario-kod|Titel|
|-|-|
|SCENARIO 57|Traumatisk mjukdelsblödning|
|SCENARIO 59|Eruptionscysta / Hematom|
|SCENARIO 60|Ektopisk eruption av 6-årsmolar|
|SCENARIO 61|Natal / Neonatal tand|
|SCENARIO 65|Primär herpetisk gingivostomatit|
|SCENARIO 66|Aftös stomatit (Afte)|
|SCENARIO 67|ANUG hos barn (Varning!)|
|SCENARIO 68|Mucocele (Slemcysta)|
|SCENARIO 69|Brännskada \& Iatrogent bitsår|
|SCENARIO 70|Koagulationsrubbning|
|SCENARIO 71|Onkologipatienten|
|SCENARIO 72|Medfött hjärtfel (Endokarditrisk)|
|SCENARIO 73|Diabetes (Hypoglykemi)|

#### 8E. BETEENDE \& SEDERING — `app/(dashboard)/pedodonti/beteende/`

**HTML-källa:** `ped-beteende-sed\_uppdaterad.html`
**Antal scenarier:** 3

|Scenario-kod|Titel|
|-|-|
|SCENARIO 62|Akut tandvårdsrädsla \& vägran|
|SCENARIO 63|Bedövningssvikt vid inflammerad tand|
|SCENARIO 64|Akut situation under sedering/lustgas|

### AGENT 09 — Ortodonti (BARN-TEMA)

**HTML-källa:** `ortodonti\_uppdaterad.html`
**Tema:** Warm Pediatric (identiskt med Agent 08)
**Font:** Nunito via `next/font/google`
**Antal scenarier:** 8 + 1 riktlinjer-sida

|Scenario-kod|Titel|
|-|-|
|ORT-01|Eruptionsstörning hörntänder ÖK|
|RIKTLINJER|Diagnoser och riktlinjer (separat referenssida)|
|SCENARIO ORT-10|"En metallbit har lossnat från tandställningen"|
|SCENARIO ORT-11|"Metalltråden sticker ut och skär i kinden"|
|SCENARIO ORT-12|"Tråden bakom tänderna har lossnat"|
|SCENARIO ORT-13|"Min plastskena har gått sönder"|
|SCENARIO ORT-14|"Tandställningen har gjort ett sår i kinden som inte läker"|
|SCENARIO ORT-15|"Vita fläckar har uppstått runt brackets — är det karies?"|
|ORT-16|Akut trauma p.g.a. stort överbett|

**Riktlinjer-sidan:** En egen route `/ortodonti/riktlinjer` med diagnoser och riktlinjer för ortodontisk behandling i Sverige (extrahera från HTML).

\---

## SCENARIO-RÄKNING (TOTALT 82 SCENARIER)

|Område|Antal|HTML-fil|
|-|:-:|-|
|Endodonti|8|värk\_och\_smärta\_html\_JUSTERAD.html|
|Parodontologi|6|akut-parod\_html\_JUSTERAD.html|
|Protetik \& Bettfunktion|7|protetik\_och\_bettfunktion\_html\_JUSTERAD.html|
|Oralmedicin|6|oralmedicin\_html\_JUSTERAD.html|
|Käkkirurgi|7|kirurgi\_html\_JUSTERAD.html|
|Bettfysiologi/TMD|6|bettfysiologi\_html\_JUSTERAD.html|
|Pedodonti — Trauma primära|4|trauma\_primära\_pedo\_41-44\_uppdaterad.html|
|Pedodonti — Trauma permanenta|4|trauma\_permanent\_pedo\_45-48\_uppdaterad.html|
|Pedodonti — Akut|10|ped-akut\_uppdaterad.html|
|Pedodonti — Munslemhinna|13|ped-oralmedicin\_uppdaterad.html|
|Pedodonti — Beteende \& sedering|3|ped-beteende-sed\_uppdaterad.html|
|Ortodonti|8 (+1)|ortodonti\_uppdaterad.html|
|**TOTALT**|**82**||

\---

## VERKTYG — KÄLLFILER

|Verktyg|HTML-källa|Agent|
|-|-|-|
|Doseringskalkylatorn|NA-jus\_dosering-analgetik-antibiotika.html|Agent 10|
|Antibiotikaguide|NA-jus-antibiotikaguide\_-dos-beslut.html|Agent 10|
|Läkemedelsreferens|NA-jus-lakemedelsreferens\_-beaktas.html|Agent 10|
|Parod-klassifikation|NA-jus-parod\_klassifikation.html|Agent 11|
|Manuell journalmall|journalmall-v8\_sist.html|Agent 12A|
|AI-journalmall|(genereras med Anthropic Claude Opus 4.7)|Agent 12B|
|Traumaguide primära|flowchart\_primara\_tander.html|Agent 13|
|Traumaguide permanenta|flowchart\_permanenta\_tander.html|Agent 13|

\---

## OBLIGATORISK PÅMINNELSE FÖR ALLA AGENTER

**Lägg till i början av varje agent-prompt:**

```
⚠️ KOM IHÅG: Du ska extrahera och använda ALLA information från de bifogade HTML-filerna
— inte bara sammanfattningen som står här, utan hela detaljer och text med NOLL tolerans
för dataförlust eller sammanfattning. Varje scenario har fullständig anamnes, status,
behandling, röda flaggor, differentialdiagnoser, journal-mallar och källor som MÅSTE
bevaras exakt som i HTML-filen.

GRANSKNINGSKÄLLA NotebookLM:
Innan du skriver en rad kod — verifiera ALL klinisk information mot NotebookLM-chatten
för \[aktuellt område]. Om något är oklart, sök ENDAST i chattens källorlista.
Hitta ALDRIG på medicinska fakta.

ICD-VISNINGSREGEL: ICD-10-koder får ENDAST visas i scenario-översikt.
ALDRIG i journal-mallar, AI-output, remisser eller copy-clipboard.
Se CLAUDE.md sektion "ICD-10-KODER — VISNINGSREGEL" för detaljer.

MOBILOPTIMERING: Sökfält fixerat sticky, röda flaggor som bottom sheet (Vaul),
touch-targets ≥44x44px, hamburgar-meny <768px.

TILLGÄNGLIGHET: aria-labels, focus-visible, kontrast 4.5:1, reduce motion respekteras.
```

\---

## 10\. AGENT-SPECIFIKATIONER — FAS 3 (AGENT 15–16)

### AGENT 15 — Admin Dashboard \& Analytics

**Design:** Mörk sidebar (#1E3028 Moss) + Clay-accent statistik-kort
**Kräver:** `role = 'admin'` — kontrolleras av middleware.ts (inte bara i layout)

|Sida|Funktion|
|-|-|
|/admin/dashboard|Users, MRR, Active Subs, Published Scenarios, Live Feed|
|/admin/scenarios|TipTap-editor, publicera/avpublicera, versionshistorik + 1-klicks rollback|
|/admin/users|tier, status, Stripe-koppling, manuell tier-ändring|
|/admin/analytics|Top Scenarios heatmap, KPI-trend|

**JSON-Export (Disaster Recovery):**

```typescript
// app/api/admin/export/route.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerClient(/\* ... \*/);

  const \[scenarios, categories, tools] = await Promise.all(\[
    supabase.from('scenarios').select('\*'),
    supabase.from('categories').select('\*'),
    supabase.from('tools').select('\*'),
  ]);

  const exportData = {
    exported\_at: new Date().toISOString(),
    version: '1.0',
    data: { scenarios: scenarios.data, categories: categories.data, tools: tools.data },
  };

  const filename = `dentaguide-pro-export-${new Date().toISOString().split('T')\[0]}.json`;

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
```

### AGENT 16 — Simulator \& Fortbildning

**Sida:** `/app/(dashboard)/simulator/page.tsx`

**Svårighetsgrader (hämtas från `difficulty`-kolumnen i scenarios):**

|Nivå|Målgrupp|Vad som visas|
|-|-|-|
|basic|Tandläkarstudenter|Anamnes + tydliga symtom, vanliga diagnoser|
|standard|AT-tandläkare|Anamnes + subtila fynd, differentialdiagnoser|
|advanced|Specialist|Komplexa cases, ovanliga presentationer|

**Logik:**

1. Användaren väljer svårighetsgrad
2. Slumpa scenario ur rätt difficulty-nivå
3. Visa anamnes + patientcitat
4. Användaren väljer: diagnos + ICD-kod + TLV-kod
5. Poängsättning (40+30+30 = 100p/case)
6. Feedback med korrekt svar + källhänvisning

> Ingen AI-genererad klinisk fakta i feedbacken. Enbart data ur Supabase-databasen (godkänd referenslitteratur).

\---

## 11\. STRIPE-INTEGRATION

**Webhook på `/api/webhooks/stripe/route.ts` — hanterar 4 event-typer:**

```typescript
// Validera ALLTID signaturen — returnera 400 om ogiltig

switch (event.type) {

  case 'checkout.session.completed':
    // Uppdatera plan\_tier till 'kliniker' eller 'klinik'
    // Sätt subscription\_status = 'active'
    break;

  case 'invoice.payment\_failed':
    // Sätt subscription\_status = 'past\_due'
    // Skicka e-post via Resend
    // Ge 7 dagars grace period innan nedgradering
    break;

  case 'customer.subscription.updated':
    // Hantera plan-byten (kliniker ↔ klinik)
    // Uppdatera plan\_tier baserat på Stripe price ID
    break;

  case 'customer.subscription.deleted':
    // Återställ till plan\_tier = 'free'
    // Sätt subscription\_status = 'cancelled'
    break;
}
```

\---

## 12\. SÄKERHETSREGLER (CLAUDE.md GRUNDLAG)

Dessa regler gäller utan undantag för alla 17 agenter.

```
OUTPUT-REGLER:
✓ ALDRIG platshållare: // rest of code, // fortsättning, // TODO
✓ 100% komplett kod levereras vid varje svar
✓ Inga utelämnade kodblock

SÄKERHETSREGLER:
✓ Inga hemligheter i koden — ALLTID i .env.local
✓ .env.local finns i .gitignore — kontrollera ALLRA FÖRST
✓ Stripe webhooks MÅSTE signaturvalideras
✓ Premium-innehåll kontrolleras av middleware.ts server-side — ALDRIG bara i frontend
✓ Rate limiting via lib/ratelimit.ts på login + API-routes
✓ JWT: access-token 1h + refresh-token 7 dagar, lagras i httpOnly-cookie
✓ Logout rensar httpOnly-cookie + invaliderar refresh-token i Supabase
✓ ALDRIG logga tokens, lösenord, kortuppgifter eller PII

FELHANTERING:
✓ ALL asynkron logik (Supabase-anrop, offline-sync, Stripe, Anthropic) i try/catch-block
✓ Använd Sentry.captureException() för felrapportering
✓ Inga tysta krascher — alla fel loggas

GDPR OCH PATIENTSÄKERHET:
✓ Ingen patientdata lagras — PSL 2010:659
✓ Journaltexter är mallbaserade med \[platshållare]
✓ Fotnot på varje sida: "PSL 2010:659 — Ersätter inte kliniskt omdöme"
✓ IndexedDB-data hämtas ENBART från Supabase

DESIGN:
✓ Design-tokens definieras i globals.css — det finns INGEN design-system/MASTER.md
✓ Referera alltid till Sektion 2 i detta dokument och globals.css

DATABASÄNDRINGAR:
✓ ALLTID Supabase-migrationsfil via CLI
✓ ALDRIG råa SQL-queries direkt i koden
✓ Kommando: supabase migration new \[namn]

KONTRAINDIKATIONER:
✓ Röd = absolut kontraindikation
✓ Gul = relativ kontraindikation

ICD-10-KODER — VISNINGSREGEL:
✓ ICD-10-koder får ENDAST visas i scenario-översikt
✓ ALDRIG i journal-mallar (12A eller 12B), remisser eller copy-clipboard
✓ I AI-output: använd "\[diagnos enligt scenario]" istället
✓ Granskning innan commit: regex /\[A-Z]\\d{2}\\.\\d{1,2}/ ska INTE matcha journaltext

AI-INTEGRATION:
✓ AI-funktioner använder Anthropic Claude via lib/claude.ts
✓ API-nyckel BARA i .env.local: ANTHROPIC\_API\_KEY
✓ Rate limiting via lib/ratelimit.ts (kliniker: 5/dag, klinik: 100/dag)
✓ All AI-output måste granskas av tandläkare innan sparning
✓ ALDRIG skicka patientdata till AI — bara klinisk kontext

GRANSKNINGSKÄLLA NotebookLM:
✓ Varje kliniskt område har en dedikerad NotebookLM-chatt med godkända källor
✓ Verifiera ALLA kliniska fakta mot NotebookLM-chatten innan kod skrivs
✓ Sök ENDAST i chattens källorlista vid oklarhet
✓ ALDRIG hitta på klinisk information

HTML-VERSIONSHANTERING:
✓ Filnamnsformat: \[område]\_YYYY-MM.html
✓ Agenter använder ALLTID senaste filen
✓ Gamla versioner sparas (raderas aldrig)
✓ Vid uppdatering: kör `npx tsx scripts/sync-scenarios.ts`

MOBILOPTIMERING:
✓ Sökfält sticky position på mobil
✓ Röda flaggor som bottom sheet (Vaul) på mobil
✓ Touch-targets ≥ 44x44px
✓ Hamburgar-meny < 768px

TILLGÄNGLIGHET (WCAG 2.1 AA):
✓ aria-labels på alla interaktiva element
✓ Tangentbordsnavigering fungerar
✓ Kontrast-ratio ≥ 4.5:1
✓ Focus-indicators tydliga
✓ Reduce motion respekteras
✓ Lighthouse Accessibility-poäng ≥ 95

SNABBNYCKAR:
✓ Cmd+K / Ctrl+K → Global sökning (cmdk)
✓ J/K → Nästa/föregående scenario
✓ C → Kopiera journal
✓ B → Bokmärka aktivt scenario
✓ ? → Snabbnyckel-cheatsheet
```

\---

## 13\. MILJÖVARIABLER — KOMPLETT LISTA

```bash
# Supabase
NEXT\_PUBLIC\_SUPABASE\_URL=
NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=
SUPABASE\_SERVICE\_ROLE\_KEY=

# Stripe
STRIPE\_SECRET\_KEY=
NEXT\_PUBLIC\_STRIPE\_PUBLISHABLE\_KEY=
STRIPE\_WEBHOOK\_SECRET=
STRIPE\_PRICE\_KLINIKER=
STRIPE\_PRICE\_KLINIK=

# Upstash Redis (Rate limiting)
UPSTASH\_REDIS\_REST\_URL=
UPSTASH\_REDIS\_REST\_TOKEN=

# Sentry
SENTRY\_DSN=
SENTRY\_ORG=
SENTRY\_PROJECT=
SENTRY\_AUTH\_TOKEN=

# Resend (Onboarding-mejl)
RESEND\_API\_KEY=

# Anthropic (Agent 12B AI-journalmall)
ANTHROPIC\_API\_KEY=

# Cron secret (Vercel Cron-jobs)
CRON\_SECRET=

# App
NEXT\_PUBLIC\_APP\_URL=https://din-domän.se
```

\---

## 14\. KLINISKA KÄLLHÄNVISNINGAR

Alla kliniska rekommendationer ska härledas från dessa källor. Ingen agent får fabricera klinisk fakta.

|Källa|Används för|
|-|-|
|Tandvårdens Läkemedel 2024–2025 (NAG/SKR)|Dosering, antibiotika, LA, sedering|
|FASS.se|Preparatspecifik info, kontraindikationer|
|Strama 2024|Antibiotikaindikationer, behandlingslängder|
|Janusmed (janusmed.se)|Interaktionsklassificering klass C och D|
|Socialstyrelsen NR Tandvård 2022|Nationella riktlinjer, ICD-10-SE|
|HSLF-FS 2016:34|Tandläkares förskrivningsrätt (narkotika)|
|HSLF-FS 2025:68|TLV-debiteringskoder (100–900-serien)|
|EFP/AAP 2018|Parodontitklassifikation Stadium/Grad|
|DC/TMD 2014|Diagnostiska kriterier för TMD|
|VGR Riktlinje antiresorptiva 2024|Bisfosfonater, MRONJ|
|Internetodontologi.se|Svenska kliniska riktlinjer (standardkälla)|
|Dental Trauma Guide|Traumaprotokoll primära och permanenta tänder|
|ESC Riktlinjer 2023|Endokarditprofylax, hjärtpatienter|
|SSTH|Antikoagulantia och tandvård|

\---

## 15\. SLO (Service Level Objectives)

```
Tillgänglighet:  99,9% (max 8,7 timmar nere per år)
Söktid:          < 200ms (kritiskt vid akutsituationer)
Sidladdning:     < 1,5s på 4G mobil
Felfrekvens:     < 0,1% av sidladdningar
API-svar:        < 200ms (p95)
Login-attempts:  Max 5 per minut per IP (rate limited)
AI-anrop kliniker: 5/dag
AI-anrop klinik:   100/dag
```

**Health check:** `GET /api/health` → 200 OK | 503 Degraded

\---

## 16\. KPI-MÅL (År 1)

|Mål|Tidsgräns|
|-|-|
|50 betalande användare|Vecka 12|
|200 registrerade användare|Månad 3|
|4,5 / 5 i betyg (beta-test)|Före lansering|
|Laddningstid < 1,5s|Dag 1|
|100% mobilanpassning|Dag 1|
|Lighthouse Accessibility ≥ 95|Dag 1|
|0 GDPR-incidenter|Alltid|

\---

## 17\. VERSIONSHANTERING FÖR HTML-KÄLLOR

**Mappstruktur:** `content/scenarios/\[område]/`
**Filnamnsformat:** `\[område]\_\[YYYY-MM].html`

**Sync-script (scripts/sync-scenarios.ts):**

```typescript
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { JSDOM } from 'jsdom';

const supabase = createClient(
  process.env.NEXT\_PUBLIC\_SUPABASE\_URL!,
  process.env.SUPABASE\_SERVICE\_ROLE\_KEY!
);

async function findLatestHtml(dir: string): Promise<string> {
  const files = await fs.readdir(dir);
  const htmlFiles = files.filter(f => f.endsWith('.html')).sort().reverse();
  if (htmlFiles.length === 0) throw new Error(`Inga HTML-filer i ${dir}`);
  return path.join(dir, htmlFiles\[0]);
}

async function extractScenarios(htmlPath: string) {
  const html = await fs.readFile(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  // Extrahera scenarier per HTML-strukturen
  return \[];
}

async function syncToSupabase(categorySlug: string, scenarios: any\[]) {
  for (const scenario of scenarios) {
    await supabase.from('scenarios').upsert({
      ...scenario,
      updated\_at: new Date().toISOString(),
    }, { onConflict: 'scenario\_code' });
  }
}

const areas = \['endodonti', 'parodontologi', 'protetik', 'oralmedicin',
               'kirurgi', 'bettfysiologi', 'pedodonti', 'ortodonti'];

for (const area of areas) {
  const dir = `content/scenarios/${area}`;
  const latest = await findLatestHtml(dir);
  console.log(`Synkar ${area} från ${latest}`);
  const scenarios = await extractScenarios(latest);
  await syncToSupabase(area, scenarios);
}

console.log('✅ Sync komplett');
```

**Vid uppdatering:**

1. Lägg till ny fil med dagens datum: `värk\_och\_smärta\_2026-05.html`
2. Behåll gamla filer (radera aldrig — audit trail)
3. Kör sync-script: `npx tsx scripts/sync-scenarios.ts`
4. Verifiera i Supabase Dashboard
5. Commit + push

\---

## 18\. BACKUP-STRATEGI

### Tre lager av backup

|Lager|Vad|Frekvens|Återställningstid|
|-|-|-|-|
|**Lager 1**|Supabase auto-backup|Dagligen (2:00 CET)|5–15 min|
|**Lager 2**|GitHub (kod + HTML)|Vid varje push|Omedelbart|
|**Lager 3**|Admin JSON-export|Manuell|< 1 min|

### Disaster Recovery Plan

**Scenario A: Innehåll förstört av admin-misstag**

1. Använd Admin → Versionshistorik (TipTap rollback)
2. Per scenario: 1-klicks återställning till tidigare version

**Scenario B: Hela databasen korrupt**

1. Supabase Dashboard → Restore latest backup
2. Verifiera kategorier och scenario-räkning

**Scenario C: Total katastrof (inget fungerar)**

1. Skapa nytt Supabase-projekt
2. Kör 0001\_init.sql + seed.sql från GitHub
3. Importera senaste JSON-export via admin-panelen
4. Uppdatera `.env.local` med nya nycklar
5. Deploya till Vercel

\---

## 19\. ONBOARDING-FLÖDE

### Välkomstmail-serie (Resend)

**Mejl 1 — Direkt vid registrering:**

* Ämne: "Välkommen till DentaGuide-Pro 🦷"
* Innehåll: Bekräfta konto, länk till dashboard, första-stegen-checklista

**Mejl 2 — Dag 3:**

* Ämne: "5 sätt DentaGuide-Pro kan spara dig 30 minuter per dag"
* Innehåll: Tips om sökning, journalmall, bokmärken

**Mejl 3 — Dag 7:**

* Ämne: "Är du redo för Premium?"
* Innehåll: Visa premium-funktioner, AI-journalmall, 50% första månaden-kod

### Tutorial-overlay (4 steg)

```typescript
const STEPS = \[
  { target: '#search-bar', title: 'Snabb sökning', description: 'Sök efter diagnos, ICD-kod eller symptom...' },
  { target: '#sidebar-categories', title: '8 odontologiska områden', description: 'Välj område här eller bläddra...' },
  { target: '#bookmark-button', title: 'Spara som bokmärke', description: 'Markera scenarier du använder ofta...' },
  { target: '#journal-tool', title: 'Journalmall-generator', description: 'Skapa journaltexter med interaktiva platshållare eller AI.' },
];
```

### Onboarding-checklista i sidebar

```typescript
const TASKS = \[
  { id: 'first\_search', label: 'Sök efter ditt första scenario' },
  { id: 'first\_bookmark', label: 'Spara ett scenario som bokmärke' },
  { id: 'first\_journal', label: 'Generera din första journaltext' },
  { id: 'try\_dosing', label: 'Testa doseringskalkylatorn' },
];
```

### Vercel Cron (vercel.json)

```json
{
  "crons": \[{
    "path": "/api/cron/send-onboarding-emails",
    "schedule": "0 9 \* \* \*"
  }]
}
```

\---

## 20\. MOBILOPTIMERING

```
1. SÖKFÄLT FIXERAT (mobil < 768px):
   position: sticky; top: 0; z-index: 40;
   Bakgrund: bg-white/90 backdrop-blur-md

2. RÖDA FLAGGOR — Bottom sheet på mobil:
   Komponent: components/scenario/RodaFlaggorMobile.tsx
   Använd Vaul (npm install vaul)
   Kan ej missas — fixed med röd indikator-prick

3. KOPIERA-KNAPPAR:
   Min-storlek: 44x44px (Apple HIG-standard)
   Tap-target padding: minst 12px runt

4. BOTTOM SHEET-PATTERN:
   Använd Vaul istället för centrerade modaler på mobil
   Detekteras via window.matchMedia('(max-width: 768px)')

5. HAMBURGAR-MENY (< 768px):
   Sidebar kollapsar till hamburgar-ikon
   Slide-in från vänster vid klick

6. TOUCH-VÄNLIGT:
   Inga hover-only states
   Active-state visar tydlig feedback

7. SCROLL-OPTIMERING:
   overflow-scrolling: touch
   scroll-behavior: smooth
```

**Vaul-användning:**

```tsx
import { Drawer } from 'vaul';
<Drawer.Root>
  <Drawer.Trigger>Visa röda flaggor</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
    <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl">
      {/\* Innehåll \*/}
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

\---

## 21\. TILLGÄNGLIGHET (WCAG 2.1 AA)

```
1. ARIA-LABELS:
   <button aria-label="Stäng modal">×</button>
   <input aria-label="Sök efter scenario" />

2. TANGENTBORDSNAVIGERING:
   Tab-ordning logisk (top-to-bottom, left-to-right)
   Inga fokuserbara element utanför viewport (tabIndex={-1})
   Skip-to-main-content-länk högst upp

3. KONTRAST-RATIO ≥ 4.5:1:
   Normal text: 4.5:1 minimum
   Stor text (18pt+): 3:1 minimum
   Verktyg: axe DevTools, Lighthouse

4. FOCUS-INDICATORS:
   focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-\[#0E3B52]
   ALDRIG outline: none utan ersättning

5. SCREEN READER-STÖD:
   <main>, <nav>, <article>, <section> — semantisk HTML
   <h1> till <h6> i logisk ordning
   <span className="sr-only"> för dold text till skärmläsare

6. REDUCE MOTION:
   @media (prefers-reduced-motion: reduce) {
     animation-duration: 0.01ms !important;
   }

7. FÄRGER ENSAM:
   Information ALDRIG kommuniceras med endast färg
   Ikon + text + färg tillsammans

8. FORMULÄR:
   <label> kopplade till <input> via htmlFor/id
   Felmeddelanden via aria-describedby
   Required-fält markerade med aria-required="true"
```

**Validering innan commit:**

* Kör Lighthouse → Accessibility-poäng ≥ 95
* Testa med Tab-tangenten
* Testa med VoiceOver (Mac: Cmd+F5) eller NVDA (Windows)
* Kör axe DevTools → 0 fel

**axe-core integration i dev:**

```typescript
if (process.env.NODE\_ENV === 'development') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

\---

## 22\. SNABBNYCKAR (POWER-USER)

|Tangent|Funktion|
|-|-|
|`Cmd+K` / `Ctrl+K`|Öppna global sökning (cmdk-modal)|
|`Esc`|Stäng modaler / dialoger|
|`J`|Nästa scenario i listan|
|`K`|Föregående scenario|
|`C`|Kopiera journal (när scenario är öppet)|
|`B`|Bokmärka aktivt scenario|
|`?`|Visa snabbnyckel-cheatsheet|
|`G + D`|Gå till Dashboard|
|`G + S`|Gå till Simulator|
|`G + T`|Gå till Tools-meny|

**CommandPalette (cmdk):**

```tsx
'use client';
import { Command } from 'cmdk';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const \[open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' \&\& (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, \[]);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global sökning">
      <Command.Input placeholder="Sök efter scenario, verktyg eller åtgärd..." autoFocus />
      <Command.List>
        <Command.Empty>Inga resultat hittades.</Command.Empty>
        <Command.Group heading="Snabb navigation">
          <Command.Item onSelect={() => router.push('/dashboard')}>🏠 Dashboard</Command.Item>
          <Command.Item onSelect={() => router.push('/simulator')}>🎯 Simulator</Command.Item>
          <Command.Item onSelect={() => router.push('/tools/journalmall')}>📝 Journalmall</Command.Item>
          <Command.Item onSelect={() => router.push('/tools/dosering')}>💊 Dosering</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
```

\---

## 23\. AGENT-PROMPT MALL

```
Du är \[AGENT-NAMN] för DentaGuide-Pro — ett kliniskt beslutsstöd för svenska tandläkare.

DITT ANSVARSOMRÅDE: \[Exakt vilka filer och sidor]

VIKTIGT: Kontrollera att föregående agents kod är incheckad i Git innan du börjar.

STRIKTA REGLER — Läs CLAUDE.md i projektets rotmapp:
1. Databas: Läs supabase/migrations/0001\_init.sql — skapa ALDRIG tabeller direkt
2. Komponenter: Hämta ScenarioLayout, RodaFlaggor etc. via mem-search — bygg ALDRIG om dem
3. Design: Följ CSS-tokens i app/globals.css och Sektion 2 i masterplanen
4. Output: 100% komplett kod — inga platshållare, inga utelämnade block
5. Felhantering: ALL asynkron logik i try/catch + Sentry.captureException()
6. Rate limiting: Använd lib/ratelimit.ts på alla login- och auth-routes
7. Fotnot varje sida: "PSL 2010:659 — Ersätter inte kliniskt omdöme"
8. Databas-ändringar: supabase migration new \[namn] — aldrig direkt SQL i koden
9. ICD-koder visas BARA i scenario-översikt — ALDRIG i journal/AI-output
10. Mobiloptimering + tillgänglighet WCAG 2.1 AA — alltid

STACK: Next.js 15.2.4, React 19, Tailwind CSS, Supabase, TypeScript

DINA SCENARIER: \[Lista från Sektion 9 ovan]

KLINISKA REGLER: \[Specificerade regler för ditt område från Sektion 9]

GRANSKNINGSKÄLLA: NotebookLM-chatten "\[granskning aktuellt område]"

När du är klar: Checka in med beskrivande commit-meddelande.
```

# \## 24. ANVÄNDARFEEDBACK-SYSTEM



**### 24.1 Tre typer av feedback per scenario**



| Typ | UI | Användarflöde |

| :--- | :--- | :--- |

| Tumme upp/ner | Två ikoner i scenario-header | Klick → INSERT i feedback\_entries → toast "Tack!" |

| Rapportera fel | Knapp "⚠️ Rapportera fel" | Modal med textarea + kategori-dropdown |

| Föreslå förbättring | Knapp "💡 Föreslå förbättring" | Formulär med textarea + valfri kontakt |

| Kommentarer | Sektion längst ner på scenario-sida | Inläggning kräver login + admin-godkännande |



**### 24.2 FeedbackButtons-komponent**



```tsx

// components/feedback/FeedbackButtons.tsx

'use client';

import { useState } from 'react';

import { ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb } from 'lucide-react';



export default function FeedbackButtons({ scenarioId, userId }: { scenarioId: string; userId: string }) {

&#x20; const \[voted, setVoted] = useState<'up' | 'down' | null>(null);

&#x20; const \[showErrorModal, setShowErrorModal] = useState(false);

&#x20; const \[showSuggestionModal, setShowSuggestionModal] = useState(false);



&#x20; async function vote(type: 'thumbs\_up' | 'thumbs\_down') {

&#x20;   try {

&#x20;     const res = await fetch('/api/feedback/submit', {

&#x20;       method: 'POST',

&#x20;       headers: { 'Content-Type': 'application/json' },

&#x20;       body: JSON.stringify({

&#x20;         scenario\_id: scenarioId,

&#x20;         feedback\_type: type,

&#x20;         rating: type === 'thumbs\_up' ? 1 : -1,

&#x20;       }),

&#x20;     });

&#x20;     if (res.ok) {

&#x20;       setVoted(type === 'thumbs\_up' ? 'up' : 'down');

&#x20;     }

&#x20;   } catch (e) { /\* Sentry-loggat i route.ts \*/ }

&#x20; }



&#x20; return (

&#x20;   <div className="flex items-center gap-2">

&#x20;     <button

&#x20;       onClick={() => vote('thumbs\_up')}

&#x20;       aria-label="Bra scenario"

&#x20;       className={`p-2 rounded-full ${voted === 'up' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}

&#x20;     >

&#x20;       <ThumbsUp className="w-4 h-4" />

&#x20;     </button>

&#x20;     <button

&#x20;       onClick={() => vote('thumbs\_down')}

&#x20;       aria-label="Behöver förbättring"

&#x20;       className={`p-2 rounded-full ${voted === 'down' ? 'bg-red-100 text-red-700' : 'text-gray-500'}`}

&#x20;     >

&#x20;       <ThumbsDown className="w-4 h-4" />

&#x20;     </button>

&#x20;     <button

&#x20;       onClick={() => setShowErrorModal(true)}

&#x20;       aria-label="Rapportera fel"

&#x20;       className="text-xs text-red-700 flex items-center gap-1 px-3 py-1 hover:underline"

&#x20;     >

&#x20;       <AlertTriangle className="w-3 h-3" /> Rapportera fel

&#x20;     </button>

&#x20;     <button

&#x20;       onClick={() => setShowSuggestionModal(true)}

&#x20;       aria-label="Föreslå förbättring"

&#x20;       className="text-xs text-blue-700 flex items-center gap-1 px-3 py-1 hover:underline"

&#x20;     >

&#x20;       <Lightbulb className="w-3 h-3" /> Föreslå förbättring

&#x20;     </button>

&#x20;   </div>

&#x20; );

}

```



**### 24.3 API-route för feedback-submission**



```typescript

// app/api/feedback/submit/route.ts

import { NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import { cookies } from 'next/headers';

import \* as Sentry from '@sentry/nextjs';

import { z } from 'zod';



const FeedbackSchema = z.object({

&#x20; scenario\_id: z.string().uuid(),

&#x20; feedback\_type: z.enum(\['thumbs\_up','thumbs\_down','error\_report','suggestion']),

&#x20; rating: z.union(\[z.literal(1), z.literal(-1)]).optional(),

&#x20; message: z.string().max(2000).optional(),

});



export async function POST(req: Request) {

&#x20; try {

&#x20;   const body = await req.json();

&#x20;   const parsed = FeedbackSchema.safeParse(body);

&#x20;   if (!parsed.success) {

&#x20;     return NextResponse.json({ error: 'Ogiltig input' }, { status: 400 });

&#x20;   }



&#x20;   const cookieStore = cookies();

&#x20;   const supabase = createServerClient(

&#x20;     process.env.NEXT\_PUBLIC\_SUPABASE\_URL!,

&#x20;     process.env.NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY!,

&#x20;     { cookies: { get: (n) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }

&#x20;   );

&#x20;   const { data: { user } } = await supabase.auth.getUser();

&#x20;   if (!user) return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 });



&#x20;   const { error } = await supabase.from('feedback\_entries').insert({

&#x20;     user\_id: user.id,

&#x20;     ...parsed.data,

&#x20;   });

&#x20;   if (error) throw error;



&#x20;   return NextResponse.json({ ok: true });

&#x20; } catch (error) {

&#x20;   Sentry.captureException(error);

&#x20;   return NextResponse.json({ error: 'Internt fel' }, { status: 500 });

&#x20; }

}

```



**### 24.4 Admin-vy för feedback (`/admin/feedback`)**



\- Lista alla feedback-entries med status='new'

\- Filter per typ (tumme/error/suggestion)

\- Knappar: "Markera lös", "Avvisa", "Svara"

\- Kombinera med scenario-länk för kontext



**### 24.5 Kommentar-moderering (`/admin/kommentarer`)**



\- Lista alla kommentarer med `is\_approved = false`

\- Förhandsgranskning + godkänn/avvisa-knappar

\- "Flagga för granskning" om misstänkt innehåll

\- Audit-log: vem godkände, när





# \## 25. STATISTIK FÖR ENSKILD ANVÄNDARE



**### 25.1 Sida `/dashboard/statistik`**



Översikt med 4 widgets:



| Widget | Visar |

| :--- | :--- |

| TimeSavedWidget | Total tid sparad (min) — beräknas: 5min/journal + 7min/AI-journal |

| TopScenariosWidget | Top 10 mest visade scenarier (med klickbar länk) |

| TopDrugsWidget | Top 10 mest refererade läkemedel |

| StatsOverview | Totala räknare: views, journals, AI-journals, bookmarks |



**### 25.2 Tidssparat-beräkning**



| Aktivitet | Estimerad tid sparad |

| :--- | :--- |

| Manuell journalmall genererad | 5 minuter |

| AI-journal genererad och godkänd | 7 minuter (5 min skrivande + 2 min strukturering) |

| Doseringskalkyl utförd | 1 minut |

| Scenario öppnat (snabbåtkomst) | 30 sekunder |



**### 25.3 Aggregering — Vercel Cron**



```typescript

// app/api/cron/recalculate-statistics/route.ts

import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';



export async function GET(req: Request) {

&#x20; // Verifiera CRON\_SECRET

&#x20; const authHeader = req.headers.get('authorization');

&#x20; if (authHeader !== `Bearer ${process.env.CRON\_SECRET}`) {

&#x20;   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

&#x20; }



&#x20; const supabase = createClient(

&#x20;   process.env.NEXT\_PUBLIC\_SUPABASE\_URL!,

&#x20;   process.env.SUPABASE\_SERVICE\_ROLE\_KEY!

&#x20; );



&#x20; // Hämta alla aktiva användare

&#x20; const { data: users } = await supabase

&#x20;   .from('profiles')

&#x20;   .select('id')

&#x20;   .neq('subscription\_status', 'cancelled');



&#x20; // Recalculate per user

&#x20; for (const user of users || \[]) {

&#x20;   await supabase.rpc('recalculate\_user\_statistics', { target\_user\_id: user.id });

&#x20; }



&#x20; return NextResponse.json({ ok: true, processed: users?.length || 0 });

}

```



**### 25.4 Cron-schedule i vercel.json**



```json

{

&#x20; "crons": \[

&#x20;   { "path": "/api/cron/send-onboarding-emails", "schedule": "0 9 \* \* \*" },

&#x20;   { "path": "/api/cron/recalculate-statistics", "schedule": "0 3 \* \* \*" }

&#x20; ]

}

```



**### 25.5 StatsOverview-komponent**



```tsx

// components/statistics/StatsOverview.tsx

'use client';

import { useEffect, useState } from 'react';

import { Clock, FileText, BookmarkIcon, Eye } from 'lucide-react';



export default function StatsOverview() {

&#x20; const \[stats, setStats] = useState<any>(null);



&#x20; useEffect(() => {

&#x20;   fetch('/api/statistics/me').then(r => r.json()).then(setStats);

&#x20; }, \[]);



&#x20; if (!stats) return <div className="animate-pulse h-32 bg-gray-100 rounded-2xl" />;



&#x20; const cards = \[

&#x20;   { icon: Clock, label: 'Tid sparad', value: `${Math.floor(stats.estimated\_time\_saved\_minutes / 60)}h ${stats.estimated\_time\_saved\_minutes % 60}min`, color: 'text-green-700' },

&#x20;   { icon: FileText, label: 'Journaler genererade', value: stats.total\_journals\_generated + stats.total\_ai\_journals\_generated, color: 'text-blue-700' },

&#x20;   { icon: Eye, label: 'Scenarier visade', value: stats.total\_scenarios\_viewed, color: 'text-purple-700' },

&#x20;   { icon: BookmarkIcon, label: 'Bokmärken', value: stats.total\_bookmarks, color: 'text-amber-700' },

&#x20; ];



&#x20; return (

&#x20;   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

&#x20;     {cards.map(c => (

&#x20;       <div key={c.label} className="bg-white rounded-2xl p-4 shadow-sm">

&#x20;         <c.icon className={`w-5 h-5 mb-2 ${c.color}`} />

&#x20;         <p className="text-xs uppercase tracking-widest text-gray-500">{c.label}</p>

&#x20;         <p className="text-2xl font-bold mt-1">{c.value}</p>

&#x20;       </div>

&#x20;     ))}

&#x20;   </div>

&#x20; );

}

```



\---

*© DentaGuide-Pro. All rights reserved.
PSL 2010:659 — Ersätter inte kliniskt omdöme.
Stack: Next.js 15.2.4 + Supabase + Stripe + Vercel
Design: Nocturne Clinical + Warm Pediatric + Stitch + Claude Code
Version 5.0 — Produktionsklar*

