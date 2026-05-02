# 🦷 DentaGuide-Pro

> **Kliniskt beslutsstöd för svenska tandläkare** — evidensbaserade protokoll, journalmallar, läkemedelsstöd och AI-driven journalstrukturering vid patientstolen.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-Subscriptions-635BFF?logo=stripe)](https://stripe.com)
[![Anthropic](https://img.shields.io/badge/Anthropic-Claude_Opus_4.7-D97757)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)
[![PSL](https://img.shields.io/badge/PSL_2010:659-Compliant-success)](#)

---

## Innehåll

- [Översikt](#översikt)
- [Funktioner](#funktioner)
- [Tech-stack](#tech-stack)
- [Arkitektur](#arkitektur)
- [Snabbstart](#snabbstart)
- [Miljövariabler](#miljövariabler)
- [Databas-schema](#databas-schema)
- [Säkerhet & Compliance](#säkerhet--compliance)
- [Testning](#testning)
- [Deployment](#deployment)
- [Snabbnyckar](#snabbnyckar)
- [Roadmap](#roadmap)
- [Bidra](#bidra)
- [Licens & Disclaimer](#licens--disclaimer)

---

## Översikt

**DentaGuide-Pro** är en SaaS-plattform som hjälper svenska tandläkare att fatta evidensbaserade kliniska beslut snabbt — direkt vid patientstolen. Systemet kombinerar en strukturerad scenariodatabas (82 kliniska scenarier över 12 områden) med interaktiva verktyg för dosering, antibiotikaval, parodontologi-klassifikation, traumahantering och journalskrivning (manuell + AI-assisterad).

### Målgrupp

- AT-tandläkare som vill ha evidensbaserade riktlinjer i fickan
- Specialister som behöver snabb referens vid sällsynta diagnoser
- Studenter som tränar inför klinikövningar (Simulator)
- Tandläkarkliniker som vill standardisera arbetsflöden (Klinik-tier)

### Värde

- **Tid sparad**: ~30 min/dag genom snabb sökning + journalmallar
- **Patientsäkerhet**: TDD-testade dosgränser, validerad AI-output, alltid synliga röda flaggor
- **Evidensbaserat**: Alla rekommendationer härledda från Strama 2024, FASS, NAG/SKR, EFP/AAP 2018, DC/TMD 2014
- **GDPR-säkert**: Ingen patientdata lagras (PSL 2010:659)
- **Offline-kapabelt**: PWA + IndexedDB — fungerar utan internet

---

## Funktioner

### 🦷 Kliniska scenarier (82 totalt)

| Område | Antal | Nyckelfunktioner |
| :--- | :---: | :--- |
| Endodonti | 8 | Pulpit, abscess, cracked tooth, flare-up |
| Parodontologi | 6 | Gingivit, perikoronit, abscess, NUG, perimplantit |
| Protetik & Bettfunktion | 7 | Krona, implantat, protes, porslinsfraktur |
| Oralmedicin | 6 | Aftösa sår, candidos, MRONJ, **MISSTÄNKT MALIGNITET** |
| Käkkirurgi | 7 | Alveolit, blödning, sinuskomm., parestesi |
| Bettfysiologi/TMD | 6 | DC/TMD 2014 — luxation, myalgi, closed lock |
| **Pedodonti — Trauma** | 8 | Primära + permanenta tänder (2 flikar) |
| **Pedodonti — Akut** | 10 | MIH, pulpit, cellulit, postextraktionsblödning |
| **Pedodonti — Munslemhinna** | 13 | Herpes, afte, ANUG, koagulationsrubbning |
| **Pedodonti — Beteende** | 3 | Tandvårdsrädsla, sederingsproblem |
| Ortodonti | 8+1 | Lös bracket, vass tråd, retainerproblem, riktlinjer |

### 🛠 Kliniska verktyg

- **Doseringskalkylatorn** — Viktbaserad, med absoluta maxdos-spärrar (TDD-testade)
- **Antibiotikastöd** — Strama 2024-baserat beslutsträd (PcV/Klindamycin/Metronidazol)
- **Läkemedelsreferens** — 8 grupper med Janusmed-interaktioner (klass C/D)
- **Parodontologi-klassificerare** — EFP/AAP 2018 Stadium I-IV + Grad A-C
- **Manuell journalmall** — Interaktiva platshållare ([nr], [Ja/Nej], [Artikain...])
- **AI-assisterad journalmall** — Anthropic Claude Opus 4.7 med fabricerings-validator
- **Traumaguide** — Dental Trauma Guide-protokoll med tidskritiska timers
- **Debiteringsstöd** — TLV-koder 100-900 (HSLF-FS 2025:68)

### 📊 Användarfunktioner

- **Bokmärken** — Spara favoritscenarier
- **Egna anteckningar** — Per scenario (max 10 000 tecken)
- **Statistik-dashboard** — Mest använda scenarier, mest sparade läkemedel, tid sparad
- **Feedback-system** — Tumme upp/ner, rapportera fel, föreslå förbättringar
- **Modererade kommentarer** — Diskussion mellan tandläkare per scenario
- **Simulator** — 3 svårighetsgrader (basic/standard/advanced) för utbildning
- **Snabbnyckar** — Cmd+K, J/K, C, B för power-användare

### 📱 Mobil & Tillgänglighet

- **Mobilfirst** — Fungerar perfekt på iPhone SE (375px)
- **Bottom sheets** — Vaul för iOS-likt mobilbeteende
- **Sticky sökfält** — Alltid synligt vid akuta situationer
- **PWA offline** — Cachelagrade scenarier fungerar utan internet
- **WCAG 2.1 AA** — Lighthouse Accessibility ≥ 95
- **Reduce motion** — Respekterar systeminställningar

### 👨‍💼 Admin-funktioner

- **Live dashboard** — MRR, aktiva users, top scenarios
- **Scenario-editor** — TipTap WYSIWYG + versionshistorik (1-klicks rollback)
- **Användarhantering** — Manuell tier-ändring, CSV-export
- **Analytics** — Heatmaps, KPI-trend, tool-användning
- **Innehåll-export** — JSON-dump för disaster recovery
- **Feedback-moderering** — Hantera tumme/rapporter/förslag
- **Kommentar-moderering** — Godkänn/avvisa diskussioner

---

## Tech-stack

| Lager | Teknik | Version |
| :--- | :--- | :--- |
| Frontend | Next.js (App Router) | 15.2.4 |
| UI | React | 19.0 |
| Styling | Tailwind CSS + shadcn/ui | 3.4.15 |
| Språk | TypeScript | 5.6.3 |
| Databas | Supabase (PostgreSQL + RLS) | 2.45.4 |
| Autentisering | Supabase Auth (JWT, httpOnly cookies) | 0.5.2 |
| Betalning | Stripe (Subscriptions + webhooks) | 16.12.0 |
| State management | TanStack Query | 5.62.7 |
| AI | Anthropic Claude Opus 4.7 | 0.32.1 |
| Rate limiting | Upstash Redis | 2.0.4 |
| Mejl | Resend | 4.0.1 |
| PWA | @ducanh2912/next-pwa + idb | 10.2.9 |
| 3D Hero | Three.js + React Three Fiber | r169 |
| Mobil | Vaul (bottom sheets) | 1.0.0 |
| Snabbnyckar | cmdk + react-hotkeys-hook | 1.0.4 |
| Validering | Zod | 3.23.8 |
| Felövervakning | Sentry | 8.0.0 |
| Testning | Vitest + Playwright | 2.1.8 / 1.49.0 |
| Tillgänglighet | @axe-core/react | 4.10.0 |
| Hosting | Vercel (Edge Runtime) | — |
| Domän | Strato (DNS → Vercel) | — |
| CI/CD | GitHub Actions + Snyk | — |

---

## Arkitektur

### 17 specialistagenter — sekventiell deployment

```
FAS 0  → Foundation: databas, middleware, komponenter, CI/CD
FAS 1A → Agent 10: Läkemedel + Antibiotika + Dosering (TDD-baserad)
FAS 1B → Agent 11-14: Parod-klassificerare, Journalmall (manuell + AI), Trauma, Debitering
FAS 2  → Agent 01-09: Landing + 9 kliniska sidor + onboarding
FAS 3  → Agent 15-16: Admin Dashboard + Simulator
```

### Design-teman

- **Nocturne Clinical** (Tech Blue #0E3B52) — vuxen-områden (6 sidor)
- **Warm Pediatric** (Beige/Cream + Claymorphism) — barn-områden (Pedodonti × 4 + Ortodonti)

### Säkerhetslager

```
Request → middleware.ts (auth + role check)
       → Rate limiting (Upstash Redis)
       → Server Component (Supabase RLS)
       → API Route (Zod validation)
       → External API (Stripe / Anthropic)
       → Sentry (felfångst)
```

### Datalager

```
Supabase (Master)
  ↓
HTML-källor (content/scenarios/[område]/) — versionerade per månad
  ↓
sync-scenarios.ts → upsert via scenario_code
  ↓
PostgreSQL (RLS-skyddad)
  ↓
IndexedDB (klient — offline-cache)
```

---

## Snabbstart

### 1. Klona och installera

```bash
git clone https://github.com/[ditt-namn]/dentaguide-pro.git
cd dentaguide-pro
npm install
```

### 2. Skapa molnkonton

- Supabase: https://supabase.com (gratis tier räcker till start)
- Stripe: https://stripe.com (test mode först)
- Vercel: https://vercel.com
- Upstash: https://upstash.com (gratis tier)
- Resend: https://resend.com
- Anthropic: https://console.anthropic.com (kräver kortbetalning, ~$5 minimum)

### 3. Konfigurera miljövariabler

```bash
cp .env.example .env.local
# Fyll i alla nycklar från ovanstående konton
```

### 4. Kör databas-migrationer

```bash
supabase login
supabase link --project-ref [ditt-supabase-projekt]
supabase db push
```

Eller manuellt via Supabase Dashboard → SQL Editor → kör i ordning:
- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_onboarding.sql`
- `supabase/migrations/0003_ai_journal_logs.sql`
- `supabase/migrations/0004_feedback_system.sql`
- `supabase/migrations/0005_user_statistics.sql`
- `supabase/seed.sql`

### 5. Synka HTML-scenarier

```bash
npx tsx scripts/sync-scenarios.ts
```

### 6. Starta lokalt

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

### 7. Kör tester

```bash
npm test           # Vitest unit-tester
npm run test:e2e   # Playwright E2E
```

---

## Miljövariabler

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_KLINIKER=
STRIPE_PRICE_KLINIK=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Anthropic (AI-journalmall)
ANTHROPIC_API_KEY=

# Resend (Onboarding-mejl)
RESEND_API_KEY=

# Sentry (Felövervakning)
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

# Cron secret
CRON_SECRET=

# App
NEXT_PUBLIC_APP_URL=https://din-domän.se
```

---

## Databas-schema

### Centrala tabeller

| Tabell | Syfte |
| :--- | :--- |
| `profiles` | Användarprofil — utökar auth.users med tier, role, Stripe-koppling, onboarding |
| `categories` | Odontologiska kategorier (12 totalt — 8 huvud + 4 pedodonti-subkat) |
| `scenarios` | 82 kliniska scenarier med ICD-koder, anamnes, status, behandling |
| `scenario_versions` | Versionshistorik (auto-skapad vid varje uppdatering) |
| `bookmarks` | Användares sparade scenarier |
| `clinical_notes` | Egna anteckningar per scenario (max 10 000 tecken) |
| `analytics_events` | Händelselogg för admin-analytics |
| `ai_journal_logs` | AI-journalmallar — fakturering, audit, kvotkontroll |
| `feedback_entries` | Tumme upp/ner, rapportera fel, förslag |
| `scenario_comments` | Modererade diskussioner |
| `user_statistics` | Aggregerad statistik per användare |

### Row Level Security (RLS)

Alla tabeller har RLS-policies aktiva:
- Free-användare ser bara `is_premium = false` scenarier
- Premium-användare ser allt
- Användare ser bara egna bookmarks/anteckningar/feedback
- Admin (`role = 'admin'`) krävs för scenario_versions och analytics_events

---

## Säkerhet & Compliance

### GDPR & PSL 2010:659

- ✅ **Ingen patientdata lagras** — all journaltext är mallbaserad med [platshållare]
- ✅ **Fotnot på varje klinisk sida**: "PSL 2010:659 — Ersätter inte kliniskt omdöme"
- ✅ **AI-validator avvisar personnummer** — regex `/\d{6,8}[-+]?\d{4}/`
- ✅ **DPA-avtal** — Supabase, Anthropic, Stripe, Resend
- ✅ **Audit log** — analytics_events spårar admin-edits
- ✅ **Right to be forgotten** — CASCADE delete vid kontoradering

### Säkerhetsåtgärder

- 🔒 **Middleware** skyddar `/dashboard` och `/admin` server-side
- 🔒 **Stripe webhooks** signaturvalideras alltid
- 🔒 **Rate limiting** via Upstash Redis (login: 5/min, AI: 5–100/dag)
- 🔒 **JWT i httpOnly cookies** — aldrig localStorage
- 🔒 **HTTPS påtvingat** (Vercel default)
- 🔒 **Inga hemligheter i Git** — `.env.local` i `.gitignore`
- 🔒 **Snyk-scanning** vid varje PR (CI/CD)

### Klinisk säkerhet

- 🦷 **TDD-testade dosgränser** — Artikain-spärr för barn <4 år eller <20kg
- 🦷 **Alltid synliga röda flaggor** — aldrig bakom accordion
- 🦷 **AI fabriceringsvalidator** — blockerar "enligt min erfarenhet"-mönster
- 🦷 **Obligatorisk granskning** — tandläkare måste godkänna AI-output innan sparning
- 🦷 **NotebookLM-källverifiering** — alla fakta härledda från godkända källor

### Källor

| Källa | Användning |
| :--- | :--- |
| Tandvårdens Läkemedel 2024–2025 (NAG/SKR) | Dosering, antibiotika |
| FASS.se | Preparatinformation |
| Strama 2024 | Antibiotikaindikationer |
| Janusmed | Interaktionsklassificering |
| Socialstyrelsen NR Tandvård 2022 | Riktlinjer + ICD-10-SE |
| HSLF-FS 2016:34 | Förskrivningsrätt narkotika |
| HSLF-FS 2025:68 | TLV-debiteringskoder |
| EFP/AAP 2018 | Parodontitklassifikation |
| DC/TMD 2014 | TMD-diagnostik |
| Dental Trauma Guide | Traumaprotokoll |
| ESC Riktlinjer 2023 | Endokarditprofylax |
| Internetodontologi.se | Svenska kliniska riktlinjer |

---

## Testning

### Unit-tester (Vitest)

```bash
npm test
```

**Kritiska tester:**
- `__tests__/dosering.test.ts` — Alla preparat × patientgrupper
- `__tests__/journal-validator.test.ts` — AI-output validering

**Test-kriterier:**
- ✅ Paracetamol barn 20kg → 200-300mg/dos
- ❌ Artikain barn 15kg → kasta error (under 20kg-spärren)
- ❌ Artikain barn 3 år → kasta error (under 4 år)
- ❌ Ibuprofen gravid trimester 3 → kasta error
- ✅ Paracetamol äldre → max 3000mg/dag
- ❌ AI-journal med personnummer → ogiltig
- ❌ AI-journal med "enligt min erfarenhet" → ogiltig

### E2E-tester (Playwright)

```bash
npm run test:e2e
```

**Test-flöden:**
- Registrering → välkomstmail → onboarding-tutorial
- Login → bokmärk scenario → generera journal
- Stripe checkout → premium-aktivering
- Offline-läge → cachelagrade scenarier visas
- Cmd+K → CommandPalette → navigera

### Tillgänglighet

```bash
# Lokalt
npm run dev
# Öppna Chrome DevTools → Lighthouse → Accessibility audit
# Mål: ≥ 95
```

---

## Deployment

### Vercel (rekommenderat)

```bash
# Första gången
vercel --prod

# Push till main → auto-deploy via GitHub Actions
git push origin main
```

### Cron-jobb

Konfigureras i `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/cron/send-onboarding-emails", "schedule": "0 9 * * *" },
    { "path": "/api/cron/recalculate-statistics", "schedule": "0 3 * * *" }
  ]
}
```

### Domänkoppling (Strato)

1. Vercel → Settings → Domains → Add custom domain
2. Kopiera DNS-records (A + CNAME)
3. Strato DNS-panel → lägg till records
4. Vänta 15–60 min för SSL

### Backup-strategi

| Lager | Vad | Frekvens | Återställning |
| :--- | :--- | :--- | :--- |
| Lager 1 | Supabase auto-backup | Dagligen 02:00 CET | 5–15 min |
| Lager 2 | GitHub (kod + HTML) | Vid varje push | Omedelbart |
| Lager 3 | Admin JSON-export | Manuell | < 1 min |

---

## Snabbnyckar

| Tangent | Funktion |
| :--- | :--- |
| `Cmd+K` / `Ctrl+K` | Öppna global sökning (CommandPalette) |
| `J` | Nästa scenario |
| `K` | Föregående scenario |
| `C` | Kopiera journal |
| `B` | Bokmärk aktivt scenario |
| `?` | Visa snabbnyckel-cheatsheet |
| `G + D` | Gå till Dashboard |
| `G + S` | Gå till Simulator |
| `G + T` | Gå till Tools-meny |
| `Esc` | Stäng modal |

---

## Roadmap

### ✅ Lansering (v1.0)
- 82 kliniska scenarier
- 8 kliniska verktyg
- AI-journalmall (Claude Opus 4.7)
- PWA offline
- WCAG 2.1 AA
- Mobil-optimerat (Vaul + sticky sökfält)
- Onboarding-flöde (3 mejl + tutorial + checklista)

### 🟠 Månad 1 (P1)
- Användarfeedback (tumme, rapportera fel, förslag)
- Modererade scenario-kommentarer
- Statistik-dashboard (`/dashboard/statistik`)
- A/B-test pricing

### 🟡 Månad 2-3 (P2)
- Print-vänlig CSS + PDF-export
- Service Worker pre-caching av topp-10
- Mörkt läge
- Mobil-app (Capacitor)
- Klinik admin-panel (bjud in kollegor)

### 🟢 Månad 4-6 (P3)
- Röststyrd journalinmatning
- Foto-uppladdning för intern referens
- Slack/Teams-integration
- API för Klinik-tier
- Engelsk översättning (i18n)

### 🔵 År 2+ (P4)
- AI-symtomchecker
- Bilddiagnostik AI (röntgen)
- Internationella riktlinjer
- Tandhygienist-modul
- Tandläkarstuderande-tier

Se `LANSERINGS_CHECKLISTA.md` för fullständig roadmap.

---

## Bidra

> **OBS:** DentaGuide-Pro är ett proprietärt projekt. Bidrag accepteras endast från godkända kliniska granskare och utvecklingsteamet.

### För kliniska granskare

1. Kontakta `klinisk-granskning@dentaguide-pro.se`
2. Få tillgång till NotebookLM-chatten för ditt område
3. Granska scenarier mot godkända källor
4. Rapportera avvikelser via admin-panelen

### För utvecklare

1. Forka repot (kräver godkännande)
2. Skapa feature-branch: `git checkout -b feature/min-feature`
3. Följ `CLAUDE.md`-regler:
   - 100% komplett kod (inga platshållare)
   - Alla try/catch + Sentry.captureException()
   - TDD för doseringslogik
   - WCAG 2.1 AA-compliance
4. Kör `npm test && npm run build` innan PR
5. Skapa pull request med beskrivande titel

---

## Licens & Disclaimer

### Licens

```
© DentaGuide-Pro. All rights reserved.
Proprietary software — får ej kopieras, distribueras eller modifieras
utan skriftligt tillstånd.
```

### Klinisk disclaimer

> ⚠️ **PSL 2010:659 — Ersätter inte kliniskt omdöme**
>
> DentaGuide-Pro är ett **beslutsstödssystem** och ersätter inte kvalificerad klinisk bedömning.
> Varje rekommendation måste granskas och godkännas av legitimerad tandläkare innan klinisk användning.
> Användaren är ensam ansvarig för slutliga behandlingsbeslut.
>
> Systemet lagrar **ingen patientdata** — alla journaltexter är mallbaserade med [platshållare].
> Användning sker i enlighet med Patientsäkerhetslagen (PSL 2010:659) och Dataskyddsförordningen (GDPR).

### AI-disclaimer

> ⚠️ **AI-genererat innehåll**
>
> AI-funktioner (journalstrukturering via Anthropic Claude Opus 4.7) producerar **utkast** som
> tandläkaren MÅSTE granska och verifiera innan sparning. Systemet inkluderar valideringslager mot:
> - Fabricering av medicinska fakta ("enligt min erfarenhet"-mönster)
> - Personuppgifter (personnummer, namn)
> - Otillåtna ICD-koder i journaltext
>
> Trots dessa skyddslager kan AI-output innehålla fel. Kontrollera alltid kliniskt.

### Teknisk support

- **Buggrapporter:** [GitHub Issues](https://github.com/[ditt-namn]/dentaguide-pro/issues) (privat)
- **Klinisk feedback:** Via app → "Rapportera fel"-knapp på varje scenario
- **Användarsupport:** support@dentaguide-pro.se
- **Säkerhetsincidenter:** security@dentaguide-pro.se (PGP-nyckel på begäran)

### Versionshistorik

| Version | Datum | Beskrivning |
| :--- | :--- | :--- |
| 5.0 | 2026 | Komplett produktionsklar masterplan med 17 agenter, AI-journal, feedback-system |
| 4.0 | 2026 | Lade till Claude Opus 4.7 AI-integration, Vaul mobile, cmdk |
| 3.2 | 2026 | 18 granskningskorrigeringar, Stripe webhook 4 events, middleware.ts |
| 3.0 | 2025 | 16 sekventiella agenter, Nocturne + Warm Pediatric design |
| 2.0 | 2025 | Initial Next.js-version |
| 1.0 | 2024 | HTML-baserad prototyp |

---

**Stack:** Next.js 15.2.4 · React 19 · Supabase · Stripe · Anthropic Claude Opus 4.7 · Vercel
**Design:** Nocturne Clinical · Warm Pediatric · Stitch · Claude Code · Three.js
**Compliance:** PSL 2010:659 · GDPR · WCAG 2.1 AA · HIPAA-equivalent (där tillämpligt)

*Byggt med ❤️ för svenska tandläkare av en legitimerad tandläkare.*
