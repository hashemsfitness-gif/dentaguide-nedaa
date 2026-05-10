# 📝 ARBETSGUIDE — Dokumentera NotebookLM-svar

**Målgrupp:** Dig, när du verifierar kliniska fakta från NotebookLM
**Tid per fråga:** 5–10 minuter
**När:** Varje gång du behöver verifiera något innan kod skrivs

---

## Snabbversion (memorera denna)

1. Hitta frågan → ställ den i NotebookLM
2. Kopiera svaret verbatim → klistra in i `_MALL.md`
3. Spara med beskrivande namn i rätt mapp
4. Lägg till rad i `INDEX.md`
5. Commit till Git
6. Hänvisa till filen i kod/prompt

---

## Steg-för-steg

### STEG 1 — Identifiera frågan

Du stöter på något som behöver verifiering:
- "Vilken dos morfin för postoperativ vuxen?"
- "Är Klindamycin 150 mg × 3 korrekt enligt Strama 2024?"
- "ICD-kod för aftösa sår vs traumatisk decubitus?"

**Tumregel:** Om du inte kan citera exakt källa och sidnummer på rak arm
→ du behöver dokumentera det.

### STEG 2 — Öppna rätt NotebookLM-chatt

Du har separata NotebookLM-chattar per område (läkemedel, parodontologi osv).
Öppna den som matchar din fråga.

Om du inte har en NotebookLM-chatt för området än:
1. Skapa ny chatt i NotebookLM
2. Ladda upp alla relevanta källor (PDF:er, Word-dokument)
3. Döp chatten tydligt, t.ex. "Granskning läkemedel 2025"

### STEG 3 — Ställ frågan

Skriv frågan som en fullständig mening. Inte "morfin dos?" utan:

> "Vilken dos morfin rekommenderas för vuxna vid svår postoperativ
> tandvärk enligt Tandvårdens Läkemedel 2024–2025?"

NotebookLM ger bättre svar på kompletta frågor.

### STEG 4 — Kopiera svaret EXAKT

Markera hela NotebookLM-svaret, inklusive:
- All löpande text
- Alla citat (med citattecken)
- Alla källhänvisningar som NotebookLM visar
- Alla fotnoter

Kopiera → Ctrl+C / Cmd+C.

**Redigera INGET.** Även om NotebookLM skrev något konstigt — kopiera
det ändå. Du dokumenterar vad NotebookLM sa, inte vad det borde ha sagt.

### STEG 5 — Öppna `_MALL.md` och fyll i

1. Öppna `notebooklm-källor/_MALL.md`
2. "Spara som..." → döp filen beskrivande:
   - **Bra:** `morfin-postoperativ-vuxen.md`
   - **Dåligt:** `fråga1.md`, `svar-2025-01-10.md`
3. Fyll i mallens fält:

```markdown
# Morfin — dos för vuxna vid postoperativ tandvärk

**Område:** läkemedel
**Skapad:** 2025-01-10
**Senast uppdaterad:** 2025-01-10
**NotebookLM-chatt:** "Granskning läkemedel 2025"
**Status:** ☑ Verifierad

---

## Källor som NotebookLM använt

- `källor/tandvårdens-läkemedel-2024-kap10-opioider.pdf` — sida 127–128
- `källor/HSLF-FS-2016-34-förskrivningsrätt.pdf` — §3

---

## Frågan som ställdes

> Vilken dos morfin rekommenderas för vuxna vid svår postoperativ
> tandvärk enligt Tandvårdens Läkemedel 2024–2025?

---

## Svar från NotebookLM (verbatim)

[KLISTRA IN HELA SVARET HÄR — OFÖRÄNDRAT]

---

## Beslut för DentaGuide-Pro

- **Visas:** Ja, men med tydlig varning
- **Var:** Dosering-kalkylator, dropdown "Morfin"
- **Varningar att visa:**
  - "❌ Svaga opioider rekommenderas EJ inom tandvård (Tandvårdens Läkemedel 2024)"
  - "❌ Kräver narkotikarecept (förteckning II) — dokumentera indikation"
  - "⚠️ Risk: andningsdepression, sedering, förstoppning, beroende"
- **Källhänvisning som visas till användaren:**
  "Källa: Tandvårdens Läkemedel 2024–2025, kap. 10; FASS Morfin Meda"

---

## Kopplingar i koden

- Relevant fil: `app/(dashboard)/tools/dosering/page.tsx`
- Relevant funktion: `morfin.calc()`
- Test: `__tests__/dosering.test.ts`

---

## Anmärkningar

Morfin är undantagsfall i tandvård. Används endast när NSAID+paracetamol
(kombinerat) är otillräckligt. Förskrivning kräver dokumenterad indikation
enligt HSLF-FS 2016:34.

---

## Granskningshistorik

| Datum | Granskare | Ändring |
| :--- | :--- | :--- |
| 2025-01-10 | [Ditt namn] | Skapad |
```

### STEG 6 — Spara filen i rätt mapp

Spara i: `notebooklm-källor/[område]/frågor-svar/[filnamn].md`

Exempel:
- `notebooklm-källor/läkemedel/frågor-svar/morfin-postoperativ-vuxen.md`
- `notebooklm-källor/oralmedicin/frågor-svar/icd-aftösa-vs-traumatisk.md`
- `notebooklm-källor/parodontologi/frågor-svar/stadium-grad-klassifikation.md`

### STEG 7 — Uppdatera INDEX.md

Öppna `notebooklm-källor/[område]/INDEX.md` och lägg till en rad
i tabellen "Frågor och svar":

```markdown
| Fil | Fråga | Status | Senast verifierad |
| :--- | :--- | :--- | :--- |
| morfin-postoperativ-vuxen.md | Dos morfin vuxna postop | ☑ Verifierad | 2025-01-10 |
```

Uppdatera även "Antal frågor-svar: 1" högst upp.

### STEG 8 — Commit till Git

```bash
git add notebooklm-källor/
git commit -m "Källa: Morfin dos vuxna enligt Tandvårdens Läkemedel 2024"
git push
```

Detta sparar din dokumentation permanent. Om du behöver bevisa var
en rekommendation kom ifrån om sex månader — här är den.

### STEG 9 — Hänvisa i kod/prompt

När du nu skriver kod eller prompt som använder detta fakta:

**I kod-kommentar:**
```typescript
// Dos enligt notebooklm-källor/läkemedel/frågor-svar/morfin-postoperativ-vuxen.md
const morfin_adult_dose = 5; // mg per os startvärde
```

**I Antigravity-prompt:**
```
Implementera Morfin-dosering enligt befintlig kod i
NA-jus dosering-analgetik-antibiotika.html.

KÄLLA: Verifiera mot notebooklm-källor/läkemedel/frågor-svar/
morfin-postoperativ-vuxen.md innan du ändrar något.
```

Nu har både du och Claude/Antigravity en spårbar källa.

---

## Vanliga frågor

**Q: Måste jag dokumentera ALLT?**
Nej. Dokumentera när:
- Dos/preparat/protokoll som ska visas i appen
- Kontroversiell eller lättmisstolkad info
- Något som ändrats nyligen (nya riktlinjer)
- Du är osäker och vill dubbelkolla

Behöver inte dokumenteras: självklarheter typ "ibuprofen är NSAID"
eller "PcV är penicillin".

**Q: Vad om NotebookLM ger olika svar vid olika tillfällen?**
Då dokumenterar du båda. Skapa två filer:
- `fråga-X-svar-2025-01-10.md`
- `fråga-X-svar-2025-01-15.md`

I beslutsdelen förklarar du vilket svar du valde och varför.

**Q: Vad om jag hittar ett fel i ett gammalt dokumenterat svar?**
Uppdatera filen:
1. Ändra innehållet
2. Uppdatera "Senast uppdaterad"-datum
3. Lägg till rad i "Granskningshistorik"-tabellen
4. Commit med meddelande: "Uppdatering: [vad som ändrats]"

**Q: Måste jag verkligen kopiera verbatim? Kan jag sammanfatta?**
Nej. Kopiera exakt. Poängen är att du ska kunna visa "det här är
exakt vad NotebookLM sa baserat på källa X". Om du sammanfattar
förlorar du spårbarheten.

**Q: Filnamn — engelska eller svenska?**
Svenska. Filnamn: `morfin-dos-vuxen.md`, inte `morphine-adult-dose.md`.
Claude läser svenska utan problem.

**Q: Vad om jag inte har NotebookLM-chatt för området?**
Skapa en. Ta 10 minuter, ladda upp alla PDF:er du har för det
området, döp chatten tydligt. Sen är det klart för framtida frågor.

---

## Checklista varje gång

- [ ] Frågan ställd i NotebookLM
- [ ] Svar kopierat verbatim (inklusive citat + källor)
- [ ] `_MALL.md` sparad med beskrivande filnamn
- [ ] Alla fält ifyllda (inga tomma "TODO"-rutor)
- [ ] Fil sparad i rätt `frågor-svar/`-mapp
- [ ] Rad tillagd i `INDEX.md`
- [ ] Committed till Git med tydligt meddelande
- [ ] Refererad i kod/prompt där den används

När alla bockar är satta → du är klar. Nästa fråga.

---

## Tips för effektivitet

- **Dokumentera direkt, inte "senare"** — du glömmer annars
- **Ha `_MALL.md` alltid öppen** — spara som ny fil varje gång
- **Använd beskrivande filnamn** — du hittar dem lättare
- **Commit ofta** — ett dokument per commit, tydligt meddelande
- **Granska INDEX.md varje vecka** — saknas något du använt?

---

**Sist uppdaterad:** 2025-01-10
**Version:** 1.0