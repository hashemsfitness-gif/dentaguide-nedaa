# AUDIT: AIJournalmallAgent — Klinisk säkerhetsgranskning

Du är klinisk säkerhetsgranskare för DentaGuide-Pro. Du ska göra en
fullständig audit av AI-journalmallsmodulen INNAN den lanseras till
användare. Detta är den enskilt största risk-komponenten i projektet —
felaktig output kan leda till patientskada och PSL 2010:659-ansvar.

LÄS FÖRST:
- CLAUDE.md (grundlag)
- MEMORY.md (kliniska regler — ALDRIG bryta)
- final_MASTERPLAN_v5_komplett.md (Sektion 8, Agent 12B)
- final_LANSERINGS_CHECKLISTA2.md (sektion C — Klinisk säkerhet)
- notebooklm-källor/ (om mappen finns — annars notera att den saknas)

VIKTIGT: Du SKRIVER INGEN KOD i denna audit. Du läser, granskar och
rapporterar. Eventuella fixar görs i separat session efter mitt beslut.

---

## OMFATTNING — 4 LAGER

Du auditerar dessa filer/komponenter:

1. **Validator** — lib/journal-validator.ts + __tests__/journal-validator.test.ts
2. **Systemprompt** — app/api/journalmall/generera/route.ts
3. **UI-godkännandeflöde** — components/tools/AIJournalmallAgent.tsx
   och app/(dashboard)/tools/journalmall/ai-assisterad/page.tsx
4. **Logging & spårbarhet** — ai_journal_logs-tabellen + INSERT-logik

För varje lager: identifiera filerna, läs dem, gör checklistan nedan,
rapportera fynd som ✅ PASS / ⚠️ VARNING / ❌ FAIL med exakt rad-referens.

---

## LAGER 1 — VALIDATOR (lib/journal-validator.ts)

Granska att validatorn blockerar farlig output. Kontrollera:

### 1.1 Personnummer-detektion
- [ ] Regex `/\d{6,8}[-+]?\d{4}/` finns och körs på all output
- [ ] Regex fångar både YYMMDD-XXXX och YYYYMMDD-XXXX
- [ ] Regex fångar samordningsnummer (dag +60)
- [ ] Validatorn returnerar tydligt fel — ingen "tyst" passering
- [ ] Test i journal-validator.test.ts som verifierar blockering

### 1.2 Anti-fabricerings-fraser
Verifiera att DESSA blockeras (case-insensitive):
- [ ] "enligt min erfarenhet"
- [ ] "jag rekommenderar"
- [ ] "i de flesta fall"
- [ ] "ungefär"
- [ ] "cirka"
- [ ] "vanligtvis"
- [ ] "brukar"
- [ ] "troligtvis" / "förmodligen"

### 1.3 ICD-kod-läckage i journaltext
KRITISK REGEL från MEMORY.md: ICD-koder ALDRIG i journal-malltext.
- [ ] Regex `/[A-Z]\d{2}\.\d{1,2}/` körs på `anamnes`, `status`,
      `behandling`, `uppfoljning`, `anmarkningar` — och blockerar match
- [ ] ICD-kod TILLÅTS endast i `diagnos.icd_kod`-fältet
- [ ] Test som verifierar: K05.2 i behandling → FAIL,
      K05.2 i diagnos.icd_kod → PASS

### 1.4 Zod-schema
- [ ] Schema matchar JSON-strukturen i Sektion 8 (Masterplan)
- [ ] Alla 7 fält obligatoriska (anamnes, status, diagnos, behandling,
      uppfoljning, roda_flaggor_observerade, anmarkningar)
- [ ] `roda_flaggor_observerade` är array (även om tom)
- [ ] `differentialdiagnoser` är array
- [ ] `tlv_koder` är array
- [ ] Validator avvisar med tydligt felmeddelande vid schema-mismatch

### 1.5 Doser och preparat
- [ ] Validatorn flaggar PcV-doser ≠ "1.6g × 3" som warning
- [ ] Validatorn flaggar Klindamycin-doser ≠ "150mg × 3" som warning
- [ ] Validatorn flaggar "Amoxicillin" som förstahand → FAIL
      (regel: Amoxicillin EJ förstahandsval Sverige)
- [ ] Test-täckning för alla tre

### 1.6 Test-coverage
- [ ] __tests__/journal-validator.test.ts existerar
- [ ] Minst ett test per regel ovan (1.1–1.5)
- [ ] Tester körs i CI/CD (verifiera .github/workflows/ci-cd.yml)

**Rapportformat lager 1:**
```
LAGER 1 — VALIDATOR
✅ 1.1 Personnummer: [rad-ref + bedömning]
⚠️ 1.2 Anti-fabricering: [vilka fraser saknas]
❌ 1.3 ICD-läckage: [exakt vad som fattas]
...
```

---

## LAGER 2 — SYSTEMPROMPT (app/api/journalmall/generera/route.ts)

Granska att systempromten är tillräckligt strikt och att efterlevnad
verifieras tekniskt — inte bara via instruktion till modellen.

### 2.1 Strikthet i systemprompt
- [ ] "HITTAR ALDRIG på medicinska fakta" finns ordagrant
- [ ] "[ej angivet]" / "[behöver kompletteras]" specificeras som
      enda tillåtna placeholder vid saknad info
- [ ] "ALDRIG personuppgifter — använd [Patient], [PNR]" finns
- [ ] "Output: ENBART JSON" finns och hanteras (parse fångar fel)
- [ ] Regel om att ICD/TLV/doser endast kommer från användarens text

### 2.2 Teknisk efterlevnad
Det räcker INTE med instruktioner i prompten. Verifiera att:
- [ ] Output går genom validator INNAN den returneras till klient
- [ ] Validator-fail → 422 med tydligt felmeddelande, INTE retry-loop
- [ ] Personnummer i input → 400 INNAN anropet till Claude API
- [ ] Input >2000 tecken → 400 (Zod-validering på input)

### 2.3 Modellval och parametrar
- [ ] Modell: claude-opus-4-7 (eller senare) — INTE Haiku/Sonnet
- [ ] temperature ≤ 0.3 (låg kreativitet för medicinsk text)
- [ ] max_tokens satt explicit (rimligt 2000–3000)

### 2.4 Auth & rate limiting
- [ ] Supabase auth-check innan anrop
- [ ] plan_tier === 'free' → 403 (returnera PremiumLock-data)
- [ ] aiJournalRatelimitKliniker: 5/24h verifierad
- [ ] aiJournalRatelimitKlinik: 100/24h verifierad
- [ ] Rate limit-överträdelse → 429 med retry-after

### 2.5 Felhantering
- [ ] try/catch runt Claude API-anrop
- [ ] Sentry.captureException() vid fel
- [ ] Aldrig logga input-text till Sentry (kan innehålla PHI)
- [ ] Användarvänligt felmeddelande, inga stack traces läcker

---

## LAGER 3 — UI-GODKÄNNANDEFLÖDE

Granska komponenten components/tools/AIJournalmallAgent.tsx +
sidan app/(dashboard)/tools/journalmall/ai-assisterad/page.tsx.

KRITISK REGEL: Tandläkaren MÅSTE granska före save. Aldrig auto-save.

### 3.1 4-stegsflödet (enligt Masterplan)
- [ ] STEG 1 INMATNING: textarea max 2000 tecken + räknare
- [ ] STEG 2 LADDNING: skeleton + progress
- [ ] STEG 3 RESULTAT: split-vy med originaltext + 7 expanderbara kort
- [ ] STEG 4 GODKÄNNANDE: 3 knappar (Godkänn / Redigera / Förkasta)

### 3.2 Granskningstvång
- [ ] Ingen "Spara"-knapp utan föregående godkännande
- [ ] Checkbox: "Jag har granskat och tar ansvar för innehållet"
      MÅSTE vara ikryssad innan godkänn-knapp aktiveras
- [ ] Checkbox-text refererar till PSL 2010:659
- [ ] Användaren ser ORIGINALTEXT bredvid AI-output (split-vy)
- [ ] Varje fält i AI-output kan redigeras innan godkännande

### 3.3 Obligatorisk fotnot
Verifiera att denna text visas på sidan (verbatim eller motsvarande):
"⚠️ AI-genererat utkast. Tandläkaren är ansvarig för att granska och
verifiera all information INNAN journalanteckningen sparas eller
används kliniskt. PSL 2010:659 — Ersätter inte kliniskt omdöme."
- [ ] Texten finns och är synlig (ej dold bakom accordion)
- [ ] Texten visas på BÅDE inmatnings- och resultatsidan

### 3.4 Premium-lock för free-tier
- [ ] Free-användare ser PremiumLock-komponent, inte inmatningsfält
- [ ] CTA: "Uppgradera till Kliniker (5 anrop/dag)" eller
      "Klinik (100 anrop/dag)"
- [ ] Kontroll sker SERVER-SIDE (middleware), inte bara klient

### 3.5 Mobiloptimering
- [ ] Touch-targets ≥ 44x44px på alla knappar
- [ ] Split-vy fungerar på mobil (växlar till tabbed view <768px)
- [ ] Kopiera-knapp fungerar på iOS Safari
- [ ] Granskningscheckbox ej dold under tangentbord

### 3.6 Tillgänglighet (WCAG 2.1 AA)
- [ ] aria-label på alla interaktiva element
- [ ] Felmeddelanden via aria-describedby
- [ ] Tab-navigering följer logisk ordning
- [ ] Focus-indicators tydliga
- [ ] Skärmläsare läser AI-genererad output korrekt

---

## LAGER 4 — LOGGING & SPÅRBARHET

Granska ai_journal_logs-tabellen och INSERT-logiken.

### 4.1 Tabellstruktur
Verifiera att tabellen har dessa kolumner:
- [ ] id, user_id, scenario_id (FK)
- [ ] input_text (krypterad eller hashad — ALDRIG plaintext PHI)
- [ ] output_json
- [ ] validator_passed (boolean)
- [ ] was_approved (boolean) — för audit
- [ ] approved_at (timestamptz)
- [ ] edits_made (boolean — om användaren redigerade före godkänn)
- [ ] created_at

### 4.2 RLS-policies
- [ ] Användare ser ENDAST egna logs
- [ ] Admin (role='admin') kan se alla för audit
- [ ] INSERT går endast via service-role från API-route
- [ ] UPDATE blockerad efter approved_at är satt (immutable audit)

### 4.3 INSERT-logik
- [ ] Loggas BÅDE vid validator-fail OCH success
- [ ] Loggas BÅDE vid godkänn OCH förkast
- [ ] was_approved=true sätts BARA när användaren klickat "Godkänn"
- [ ] Tidsstämpel sätts server-side (DEFAULT now()), ej från klient

### 4.4 Retention & GDPR
- [ ] CASCADE delete vid kontoradering verifierad
- [ ] Retention-policy dokumenterad (förslagsvis 12 mån)
- [ ] Möjlighet att exportera egna logs (Right to data portability)

---

## SAMMANFATTANDE RAPPORT

Avsluta med exakt detta format:

```
═══════════════════════════════════════════════════════
AUDIT-RESULTAT: AIJournalmallAgent
═══════════════════════════════════════════════════════

LAGER 1 — Validator:        X PASS / Y VARNING / Z FAIL
LAGER 2 — Systemprompt:     X PASS / Y VARNING / Z FAIL
LAGER 3 — UI-flöde:         X PASS / Y VARNING / Z FAIL
LAGER 4 — Logging:          X PASS / Y VARNING / Z FAIL

KRITISKA FYND (måste åtgärdas före lansering):
1. [Fil:rad] Beskrivning
2. ...

VARNINGAR (åtgärdas inom 2 veckor efter lansering):
1. ...

GO / NO-GO-REKOMMENDATION:
[ ] GO — modulen är säker att lansera
[ ] NO-GO — minst ett kritiskt fynd måste åtgärdas först

MOTIVERING:
[2–3 meningar]

NÄSTA STEG:
[Lista konkreta åtgärder, prioriterade]
═══════════════════════════════════════════════════════
```

---

## REGLER FÖR DENNA AUDIT

1. Skriv INGEN kod. Endast läsning, granskning, rapport.
2. Ange ALLTID rad-referens (fil:rad) vid fynd.
3. Antag INTE att något fungerar — verifiera i koden.
4. Om en fil inte hittas → markera som FAIL ("fil saknas").
5. Om test-coverage är otillräcklig → FAIL, inte VARNING.
6. Klinisk säkerhet > teknisk elegans. Vid tvekan → FAIL.
7. När audit är klar — vänta på mitt beslut innan eventuella fixar.