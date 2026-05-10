# UPPGIFT: Skapa kunskapsbas-struktur för NotebookLM-källor

Du ska skapa en mappstruktur och mallfiler för DentaGuide-Pro:s
kunskapsbas. Detta är en kontrollerad samling av kliniska källor
(PDF, Word, bilder) plus dokumenterade frågor/svar från NotebookLM.

VIKTIGT:
- Skapa ENDAST mappar och mallfiler enligt specifikation nedan
- Lägg INTE till några påhittade källor eller filnamn
- Lägg INTE till exempelinnehåll i frågor-svar-mappar (de ska vara tomma)
- Ändra INGEN befintlig kod i projektet
- När du är klar — rapportera vad du skapat

---

## STRUKTUR ATT SKAPA

I projektets rotmapp, skapa följande:

```
notebooklm-källor/
├── README.md
├── _MALL.md
│
├── läkemedel/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── oralmedicin/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── parodontologi/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── endodonti/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── kirurgi/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── protetik/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── bettfysiologi/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
├── pedodonti/
│   ├── INDEX.md
│   ├── källor/.gitkeep
│   └── frågor-svar/.gitkeep
│
└── ortodonti/
    ├── INDEX.md
    ├── källor/.gitkeep
    └── frågor-svar/.gitkeep
```

`.gitkeep` är tomma filer — de gör att tomma mappar ändå syncas till Git.

---

## INNEHÅLL: notebooklm-källor/README.md

```markdown
# NotebookLM-källor — Kunskapsbas för DentaGuide-Pro

Denna mapp är den **enda godkända källan** för kliniska fakta i projektet.
Alla agenter (Antigravity, Claude Code, framtida AI-moduler) MÅSTE
verifiera kliniska påståenden mot denna mapp innan kod skrivs eller
innehåll publiceras.

## Struktur per område

Varje odontologiskt område har en egen mapp med följande innehåll:

- **INDEX.md** — innehållsförteckning över allt material i området
- **källor/** — originalkällor (PDF, Word, bilder, skärmdumpar)
- **frågor-svar/** — dokumenterade NotebookLM-svar i markdown-format

## Arbetsflöde

1. **Identifiera fråga** som behöver klinisk verifiering
2. **Ställ frågan i NotebookLM** mot relevant källa
3. **Kopiera svaret** verbatim till en ny `.md`-fil i rätt
   `frågor-svar/`-mapp
4. **Använd mallen** `_MALL.md` som utgångspunkt
5. **Lägg till entry** i områdets `INDEX.md`
6. **Hänvisa till filen** i kod-kommentarer och commits

## Områden

| Område | Mapp | Primära källor |
| :--- | :--- | :--- |
| Läkemedel & dosering | `läkemedel/` | Tandvårdens Läkemedel 2024–2025, FASS, Janusmed |
| Oralmedicin | `oralmedicin/` | Socialstyrelsen NR Tandvård 2022, Internetodontologi |
| Parodontologi | `parodontologi/` | EFP/AAP 2018, Strama |
| Endodonti | `endodonti/` | ESE Position Statements |
| Käkkirurgi | `kirurgi/` | Internetodontologi, lokala riktlinjer |
| Protetik | `protetik/` | Tillverkar-IFU, Internetodontologi |
| Bettfysiologi | `bettfysiologi/` | DC/TMD 2014 |
| Pedodonti | `pedodonti/` | Dental Trauma Guide, Socialstyrelsen |
| Ortodonti | `ortodonti/` | Internetodontologi |

## Regler

- **Inga påhittade källor** — endast dokument du faktiskt har och har läst
- **Filnamn ska vara begripliga** — t.ex.
  `tandvårdens-läkemedel-2024-kap10.pdf`, inte `dokument1.pdf`
- **NotebookLM-svar ska kopieras verbatim** — ingen omformulering
- **Källhänvisning alltid** — varje frågesvar måste ange exakt vilken
  källa NotebookLM byggt sitt svar på
- **Versionshantering** — om en källa uppdateras, behåll den gamla
  versionen i `källor/arkiv/` och dokumentera ändringen

## Vid uppdatering

När en källa uppdateras eller en ny tillkommer:
1. Lägg till filen i rätt `källor/`-mapp
2. Uppdatera områdets `INDEX.md`
3. Granska om befintliga `frågor-svar/`-filer påverkas
4. Vid ändrad rekommendation — uppdatera frågesvaret och datera om

## GDPR & PSL 2010:659

- Inga patientdata i denna mapp någonsin
- Inga skärmdumpar med journalnummer eller personnummer
- Källor är endast lärobok-, riktlinje- och regelverksmaterial
```

---

## INNEHÅLL: notebooklm-källor/_MALL.md

```markdown
# [Frågans titel — kort och beskrivande]

**Område:** [t.ex. läkemedel / oralmedicin / parodontologi]
**Skapad:** YYYY-MM-DD
**Senast uppdaterad:** YYYY-MM-DD
**NotebookLM-chatt:** [namn på chatten i NotebookLM]
**Status:** ☐ Utkast | ☐ Verifierad | ☐ Aktiv

---

## Källor som NotebookLM använt

Lista exakt vilka filer i `källor/`-mappen som svaret bygger på:

- `källor/[filnamn].pdf` — sida X–Y
- `källor/[filnamn].pdf` — kapitel Z

---

## Frågan som ställdes

> [Klistra in den exakta frågan du ställde i NotebookLM]

---

## Svar från NotebookLM (verbatim)

[Klistra in hela svaret från NotebookLM här, oförändrat.
Inkludera alla citat, sidhänvisningar och fotnoter.]

---

## Beslut för DentaGuide-Pro

Hur ska detta visas/användas i appen?

- **Visas:** [Ja / Nej / Med varning]
- **Var:** [t.ex. dosering-kalkylator, scenario VARK-05-PERI]
- **Varningar att visa:** [lista konkret vad som måste stå]
- **Källhänvisning som visas till användaren:** [exakt text]

---

## Kopplingar i koden

- Relevant fil: [t.ex. `app/(dashboard)/tools/dosering/page.tsx`]
- Relevant funktion: [t.ex. `morfin.calc()`]
- Test: [t.ex. `__tests__/dosering.test.ts`]

---

## Anmärkningar

[Eventuella kliniska kommentarer, tveksamheter, eller saker att
följa upp vid nästa granskning]

---

## Granskningshistorik

| Datum | Granskare | Ändring |
| :--- | :--- | :--- |
| YYYY-MM-DD | [Namn] | Skapad |
```

---

## INNEHÅLL: INDEX.md per område

För VARJE område, skapa en `INDEX.md` med exakt denna struktur.
Anpassa områdesnamnet i rubriken.

```markdown
# [Områdesnamn] — Innehållsförteckning

**Område:** [t.ex. Läkemedel & dosering]
**Senast uppdaterad:** YYYY-MM-DD
**Antal källor:** 0
**Antal frågor-svar:** 0

---

## Primära källor

Originaldokument som bildar grunden för detta område.
Filerna ligger i `källor/`-mappen.

| Filnamn | Typ | Utgåva | Användning |
| :--- | :--- | :--- | :--- |
| _(tomt — fyll på när källor laddas upp)_ | | | |

---

## Frågor och svar

Dokumenterade NotebookLM-svar.
Filerna ligger i `frågor-svar/`-mappen.

| Fil | Fråga | Status | Senast verifierad |
| :--- | :--- | :--- | :--- |
| _(tomt — fyll på när frågor dokumenteras)_ | | | |

---

## Aktuella riktlinjer

Vilka externa riktlinjer/regelverk gäller för detta område?

- _(t.ex. "Tandvårdens Läkemedel 2024–2025 (NAG/SKR)")_
- _(t.ex. "FASS 2025")_

---

## Att granska härnäst

Lista frågor som behöver dokumenteras men inte hunnits med:

- [ ] _(exempel: "Verifiera Klindamycin-dos vid svår infektion")_
- [ ] _(exempel: "Bekräfta NSAID-restriktion vid SGLT-2-hämmare")_

---

## Anmärkningar

[Eventuella områdesspecifika kommentarer]
```

---

## NÄR DU ÄR KLAR

Rapportera tillbaka enligt detta format:

```
═══════════════════════════════════════════════════════
KUNSKAPSBAS-STRUKTUR SKAPAD
═══════════════════════════════════════════════════════

Skapade mappar: 9 (läkemedel, oralmedicin, parodontologi,
                   endodonti, kirurgi, protetik, bettfysiologi,
                   pedodonti, ortodonti)

Skapade filer:
- notebooklm-källor/README.md ✅
- notebooklm-källor/_MALL.md ✅
- 9 × INDEX.md ✅
- 18 × .gitkeep (för att bevara tomma mappar) ✅

Total filer skapade: 29

NÄSTA STEG FÖR ANVÄNDAREN:
1. Ladda upp originalkällor (PDF/Word/bilder) i respektive
   källor/-mapp
2. När en fråga uppstår — kopiera _MALL.md, döp till
   beskrivande filnamn, fyll i från NotebookLM
3. Uppdatera respektive INDEX.md med nya entries
═══════════════════════════════════════════════════════
```

---

## REGLER

1. Skapa ENDAST det som specificerats. Inga "bonusfiler" eller exempel.
2. Använd EXAKT filnamn och mappnamn som listats — inkl. svenska tecken.
3. Lägg INTE till påhittat innehåll i mallfilerna.
4. Rör INGEN befintlig kod eller annan struktur i projektet.
5. Om en fil redan finns med samma namn — STOPP, fråga användaren.