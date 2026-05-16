# Product

## Register

product

## Users

Legitimerade svenska tandläkare och tandläkarstudenter, använt **vid patientstolen** under pågående patientmöte:

- **AT-tandläkare** — vill ha evidensbaserade riktlinjer snabbt tillgängliga utan att byta kontext mitt i en behandling.
- **Specialister** — behöver snabb, pålitlig referens vid sällsynta diagnoser och differentialdiagnostik.
- **Tandläkarstudenter** — tränar kliniskt resonemang i simulatorn (3 svårighetsgrader) inför klinikövningar.
- **Kliniker / kliniknätverk** — vill standardisera arbetsflöden och journalskrivning över flera användare.

Kontexten är tidspressad och kliniskt ansvarsfull: användaren har en patient i stolen, fattar beslut med medicinskt och juridiskt ansvar (PSL 2010:659), ofta på mobil eller liten skärm, ibland i akuta situationer. Det primära jobbet är att gå från symtom till säker, evidensförankrad åtgärd på sekunder, inte minuter.

## Product Purpose

DentaGuide-Pro är ett kliniskt beslutsstöd för svensk tandvård: 82 strukturerade scenarier över alla odontologiska områden, interaktiva verktyg (dosering, antibiotikastöd, parodontologi-klassificering, journalmallar, traumaguide, debitering), AI-assisterad journalstrukturering och en utbildningssimulator.

Produkten existerar för att kapa tiden mellan symtom och beslut och för att höja patientsäkerheten genom evidensförankrade, alltid synliga beslutsunderlag. Den lagrar ingen patientdata (mallbaserat, GDPR/PSL). Den är den primära ytan; marknadsföringslandingen finns men appen är produkten.

Framgång: användaren får rätt kliniskt svar utan att lämna patientmötet, litar på underlaget eftersom evidensen syns, och slipper administrativ friktion.

## Brand Personality

Tre ord: **saklig, evidensförankrad, lugnt självsäker.**

Rösten är en erfaren legitimerad kollega vid stolen, inte en säljare: exakt, trygg, koncis, aldrig uppskruvad eller hypande. Copy är på svensk klinisk fackton. Auktoritet utan arrogans, lugn under tidspress. Personligheten ska kännas specifik för svensk tandvård byggd av tandläkare, inte som en generisk produktröst.

## Anti-references

Gränssnittet ska uttryckligen **inte**:

- **Se ut som en generisk SaaS-mall.** Inga lila gradienter, hero-metric-mallar, oändliga identiska ikon-kort-rutnät eller "modern startup"-känsla. Det ska kännas specifikt för svensk klinisk tandvård.
- **Kännas som en steril sjukhusjournal.** Inte kall, grå-blå, tabelltung EPJ/landstings-estetik. Kliniskt trovärdigt utan att kännas som ett 90-talssystem.
- **Vara en lekfull konsument-app.** Inte gamifierad, emoji-tung eller barnslig (undantag: pediatric-spåret är medvetet varmare). Det är ett professionellt beslutsstöd för legitimerad personal.
- **Vara överdesignad eller långsam.** Inga tunga 3D-effekter, glas-överallt eller animationer som står i vägen vid akuta situationer. Snabbhet och läsbarhet vid stolen går före visuell show. Måttstock: "lagom fin" (referens: nuvarande landingpage + den nya simulator-designen).

Best-in-class-referens för den kliniska inre ytan: **Linear** — tät informationsarkitektur, snabb, tangentbord-först, inga onödiga effekter.

## Design Principles

1. **Beslut före dekoration.** Varje skärm optimeras för tid-till-beslut vid stolen. Inget får stylas eller animeras så att ett akut kliniskt svar fördröjs.
2. **Editorial ram, klinisk kärna.** Hybriden: den varumärkesbärande editorial-shellen (nav, landing, ramverk) signalerar förtroende och auktoritet; inuti scenarier och verktyg vinner densitet och läsbarhet över uttryck.
3. **Evidens är synlig auktoritet.** Källor, röda flaggor, dosgränser och PSL-ansvaret är alltid synliga, aldrig dekorativa eller gömda bakom interaktion. UI:t förtjänar kliniskt förtroende genom att visa sin grund.
4. **Bevara och höj.** Befintliga områdesdesigner (t.ex. parodontologi) förfinas, ersätts inte. Konsekvens kommer från en delad struktur (ScenarioPage) lagd över bevarat medicinskt innehåll — nolltolerans dataförlust.
5. **Kollega, inte säljare.** Röst och copy talar som en erfaren legitimerad kollega: saklig, lugn, ingen marknadsföringsinflation, ingen konsument-app-lekfullhet.

## Accessibility & Inclusion

- **WCAG 2.1 AA** som mål: text/bakgrund-kontrast ≥ 4.5:1, synlig fokus-outline, aria-labels på ikoniska kontroller, semantisk HTML, alltid synlig skip-link. Lighthouse Accessibility ≥ 95.
- **Reducerad rörelse:** respektera `prefers-reduced-motion` — kritiskt eftersom verktyget används i akuta lägen.
- **Mobil-first** ned till iPhone SE (375px); sticky sökfält och röda flaggor alltid synliga på liten skärm; bottom sheets för iOS-likt mobilbeteende.
- **Offline:** PWA + IndexedDB — cachelagrade scenarier ska fungera utan internet.
- Verifieras löpande med @axe-core/react i utveckling.
