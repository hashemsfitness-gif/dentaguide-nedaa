# HANDOFF — DentaGuide-Pro: Design & Navigation (nästa chatt)

> Ge denna fil till nästa chatt. Den beskriver exakt status, kritiska fel och
> arbetsordning. Öppna Claude Code i `dentaguide-pro`-mappen.

## 0. Förutsättningar

- `impeccable`-skill är installerad projektgemensamt (`.claude/skills/impeccable`).
  Använd `/impeccable` som standard för all design/struktur/layout.
- **Kör `/impeccable document` först** → genererar `DESIGN.md` (saknas; bara
  `DESIGN_SYSTEM_v2.md` + `DESIGN_REFERENCES.md` finns). `PRODUCT.md` saknas
  också → `/impeccable teach` skapar den.
- Testfas: ALLA gates avstängda (allt öppet). Sök `DEAKTIVERAD UNDER TEST` /
  superuser-bypass i `middleware.ts`, `lib/feature-access.ts`, `lib/ratelimit.ts`.
  **Återaktivera FÖRST som allra sista steg (Fas D).**

## 1. 🔴 KRITISKT FEL — fixa först (Fas A)

**Patientfallsbanken (simulatorns hjärna) är trasig och frånkopplad.**

- Källa `patientfallsbank_draft.md` (1993 rader, 90 fall, 9 områden) = **intakt & korrekt**.
- Genererad `lib/data/simulatorCases.ts` = **korrupt**:
  - Endast 45 av 90 fall
  - `clinicalFindings`: 1 unik (Fall 1.1 kopierad till ALLA 45)
  - `anamnesis`: 9 unika (en per Område, inte per fall)
  - `imagePrompt`: dokumentets header-text, inte per-fall
- `simulatorCases.ts` importeras **ingenstans**. Simulatorn läser från Supabase
  `scenarios`-tabellen via `lib/simulator/case-selector.ts` →
  `/api/simulator/start`. Hjärnan är alltså bortkopplad.

**Åtgärd (ingen dataförlust — markdown är källa):**
1. Skriv `scripts/gen-simulator-cases.ts` — robust parser av markdown.
   Struktur: `## Område N:` , `### Fall X.Y:` , `**Svårighetsgrad:**` ,
   `**Anamnes...:**` , `**Klinisk Status & Fynd:**` ,
   `**Rätt Svar & Feedback:**` (Diagnos/ICD-10/TLV-åtgärd/Klinisk Feedback).
2. Regenerera `lib/data/simulatorCases.ts` — verifiera 90 fall, 90 unika
   anamnesis/clinicalFindings (diffa mot markdown).
3. Wire:a in: rekommendation = `/api/simulator/start` läser `simulatorCases.ts`
   direkt (markdown = single source of truth, ingen Supabase-drift). Alternativ
   = sync-script till `scenarios`-tabellen.

## 2. Arbetsordning

| Fas | Innehåll | Status |
|:---|:---|:---:|
| A | Fixa + wire:a patientfallsbank (KRITISKT) | ⏳ |
| B | Navigation: testa varje rutt i `LOCAL_NAVIGATOR.md` | ⏳ |
| C | Designkonsistens via `ScenarioPage` + impeccable | ⏳ |
| D | Återaktivera premium-gränser (SISTA, separat) | ⏳ |

## 3. Vad som redan är byggt (klart)

- **AppShell** (`components/landing/AppShell.tsx`) — delad editorial nav+footer.
  `(clinical)/layout.tsx` + `(dashboard)/layout.tsx` använder den. Ingen dubbelnav.
- **Landing** (`app/(public)/page.tsx`) — ny editorial-design, auth-aware.
- **Dashboard** (`app/dashboard/page.tsx`) — egen editorial-vy.
- **Freemium-infra** (avstängd i test): `FeatureLink`, `PremiumGate`-modal,
  `TierBadge`, `/premium-required`, `lib/feature-access.ts`.
- **Rate-limit-kod** Manuell journalmall 4/dag (`/api/journalmall/manuell/check`
  + `ManuellQuotaBanner`) — bypassad i test.
- **`components/scenario/ScenarioPage.tsx`** — delad editorial scenario-layout.
  **Byggd men EJ applicerad.** Nästa: normalisera varje områdes data → denna.

## 4. Designkonsistens (Fas C) — exakt scope

Tillämpa `ScenarioPage.tsx` på `[slug]/page.tsx` i dessa områden så struktur,
färg och knappfördelning är identisk:
- `app/(clinical)/endodonti/[slug]/page.tsx`
- `app/(clinical)/parodontologi/[slug]/page.tsx`
- `app/(clinical)/protetik/[slug]/page.tsx`
- `app/(clinical)/kakkirurgi/[slug]/page.tsx`
- `app/(clinical)/bettfysiologi/[slug]/page.tsx`
- `app/(clinical)/oralmedicin/[slug]/page.tsx`

**EJ** pedodonti / ortodonti (egna `stitch-pediatric`-teman, behåll).

Datakällor (olika fältnamn per område — normalisering krävs):
`lib/data/{endodonti,parodontologi,protetik,kakkirurgi,bettfysiologi,oralmedicin}-scenarios.ts`
- endodonti: `anamnes.obligatoriska[{fraga,forvantatSvar}]`
- övriga: `anamnes.obligatoriska[{q,a}]`

`Simulator Prototype.html` (Claude Design) ska integreras i
`components/simulator/*` — ny design för start/case/feedback/result.

## 5. Begränsningar (icke förhandlingsbart)

- **Nolltolerans dataförlust:** medicinsk data i tools/scenarier/journal
  bevaras 100% intakt. `ScenarioPage` är ren presentation.
- **Håll öppet:** inga premium-gränser förrän Fas D (separat sista steg).
- Beskriv ändring + varför INNAN du gör den.

## 6. Snabbstart nästa chatt

```
1. npm run dev   (verifiera localhost:3000)
2. Läs denna fil + patientfallsbank_draft.md
3. /impeccable document   (skapa DESIGN.md)
4. Börja Fas A (parser)
```
