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
