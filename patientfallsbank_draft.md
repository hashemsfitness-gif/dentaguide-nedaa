# DentaGuide-Pro: Patientfallsbank för Agent 16 (Simulator)

Detta dokument utgör basen för den kliniska simulatorn. Målet är att träna det kliniska resonemanget från symtom till korrekt diagnos och behandlingsåtgärd (TLV). Varje fall tar hänsyn till patienten ur ett helhetsperspektiv. (OBS: ICD-koder testas inte som en fråga, utan anges endast som administrativ bonus-info i feedbacken).

> [!IMPORTANT]
> **Patientsäkerhet gällande bilder:** Inga verkliga patientbilder används. Varje fall innehåller en specifik bildinstruktion ("Bild-prompt") som en annan AI-agent kan använda för att generera syntetiska röntgenbilder eller kliniska foton.

---

## Område 1: Akut & Trauma

### Fall 1.1: Den utslagna framtanden
**Svårighetsgrad:** Basic
**Målgrupp:** Tandläkarstudenter
**Holistiskt perspektiv:** Hantering av akut stress hos både patient och medföljande förälder.

**Anamnes (Patientens ord):**
*"Min son (9 år) ramlade på cykeln för en timme sedan. Ena framtanden flög ut! Vi la den i ett glas mjölk som de sa på 1177."*

**Klinisk Status & Fynd:**
* Allmänt: Stressad men vid god vigör, inga tecken på commotio.
* Extraoralt: Lätt svullnad över överläpp, inga sårskador.
* Intraoralt: Lucka regio 11. Alveolen är intakt vid palpation. Tanden (11) förvarad i mjölk (ca 60 min extraalveolär tid), roten ser intakt ut.

**[Bildinstruktion för AI]:** 
Skapa ett intraoralt foto av en ung patient (endast tänder och läpp syns). En lucka vid tand 11. Inga stora blödningar, men lätt rodnad i gingivan. Skapa även en syntetisk apikal röntgenbild som visar en tom alveol vid 11 utan tecken på rot- eller alveolarbensfraktur på intilliggande tänder.

**Rätt Svar & Feedback:**
* **Diagnos:** Exartikulation (Avulsion) tand 11
* **ICD-10:** S03.2 (Luxation av tand)
* **TLV-åtgärd:** 313 (Traumabehandling, reponering/fixering) + 112 (Röntgen)
* **Klinisk Feedback:** Utmärkt! Tanden har förvarats i fysiologiskt medium (mjölk) < 2 timmar. Reponering och flexibel fixering (traumaskena) i 2 veckor är golden standard enligt riktlinjerna. Missa inte att stämma av stelkrampsskyddet!

---

### Fall 1.2: Molande värk som håller mig vaken
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Smärtproblematik som påverkar sömn och allmäntillstånd.

**Anamnes (Patientens ord):**
*"Det dunkar och värker i vänster underkäke. Värktabletter hjälper inte längre och inatt kunde jag inte sova alls. Det gör extremt ont när jag dricker något varmt."*

**Klinisk Status & Fynd:**
* Allmänt: Trött, smärtpåverkad.
* Intraoralt: 36 har en stor, djup amalgamfyllning med en sekundärkariesangrepp distalt.
* Tester: Perkussionsöm ++ över 36. Kyltest: Fördröjd, kraftig smärta som dröjer kvar i flera minuter.

**[Bildinstruktion för AI]:** 
Skapa en bitewing-röntgen över vänster underkäke (kvadrant 3). Tand 36 ska ha en stor röntgentät fyllning (amalgam-liknande) och en tydlig radiolucens (karies) distalt som sträcker sig djupt mot pulpan.

**Rätt Svar & Feedback:**
* **Diagnos:** Symtomatisk pulpit
* **ICD-10:** K04.0 (Pulpit)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling) alt. 501 (Akut endodontisk behandling/Pulpaextirpation)
* **Klinisk Feedback:** Korrekt diagnos! Den ihållande smärtan efter temperatur-stimuli och dunkande värk pekar tydligt på en irreversibel pulpit. Trepanation och pulpaextirpation är indicerat för direkt smärtfrihet.

---

### Fall 1.3: Den dolda frakturen
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfarna tandläkare
**Holistiskt perspektiv:** Komplex diagnostik hos äldre, multisjuk patient.

**Anamnes (Patientens ord):**
*"Jag har fått konstigt ont när jag tuggar på höger sida. Det hugger till liksom. Sedan jag började med mina nya blodtrycksmediciner känner jag mig också så torr i munnen."*

**Klinisk Status & Fynd:**
* 46 är försedd med en äldre fullkrone-ersättning i guld.
* Inga synliga kariesangrepp. Fickdjup ua, förutom en isolerad 7mm ficka mesiolingualt på 46.
* Perkussion ua, men smärta vid belastning på specifika kuspar (Bite-test positivt).
* Röntgen: Vidgad peridontalspalt apikalt, men ingen tydlig periapikal uppklarning. J-formad radiolucens längs mesiala roten.

**[Bildinstruktion för AI]:** 
Syntetisk apikal röntgen på tand 46 med fullkrona. Visa en subtil, J-formad radiolucens ("halo-effekt") kring den mesiala roten, vilket starkt indikerar en längsgående rotfraktur. Inga riktiga patientdata.

**Rätt Svar & Feedback:**
* **Diagnos:** Längsgående rotfraktur (Longitudinal root fracture) 46
* **ICD-10:** K04.5 (Apikal parodontit - som följd av fraktur) / S02.5 (Tandfraktur)
* **TLV-åtgärd:** 401 (Tandextraktion)
* **Klinisk Feedback:** Snyggt fångat! Den isolerade djupa fickan kombinerat med J-formad uppklarning och bitsmärta är patognomont för en vertikal rotfraktur. Tanden har tyvärr en hopplös prognos och bör extraheras, beakta patientens blodtrycksmedicinering (eventuell blödningsrisk).

---

### Fall 1.4: Svullen kind och feber
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Kinden svullnade upp igår kväll och jag känner mig febrig och hängig. Det spänner jättemycket nere till höger."*

**Klinisk Status & Fynd:**
* Allmänt: Temp 38.2°C. Lätt påverkad.
* Extraoralt: Svullnad över höger mandibelrand. Mjuk och fluktuerande.
* Intraoralt: 47 är djupt karierad. Submukös svullnad buckalt regio 47. Tanden är palp- och perkussionsöm.

**[Bildinstruktion för AI]:** 
Kliniskt foto av en svullen underkäkskind (höger sida) utifrån. Intraoralt foto som visar en stor karieslesion på tand 47 och en rodnad, fluktuerande svullnad i omslagsvecket buckalt.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut apikal abscess med systemisk påverkan
* **ICD-10:** K04.7 (Periapikal abscess utan fistel)
* **TLV-åtgärd:** 302 (Incision), 501 (Trepanation), ev antibiotikarecept
* **Klinisk Feedback:** Feber och fluktuerande svullnad kräver akut dränage (trepanation + incision). Systemisk påverkan indicerar antibiotika (PcV). Mycket bra bedömning av helhetsbilden!

---

### Fall 1.5: En ilning som inte går över
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Det isar till ordentligt när jag andas in kall luft eller äter glass, men det släpper efter några sekunder."*

**Klinisk Status & Fynd:**
* Blottade tandhalsar regio 14, 15 pga felaktig borstteknik.
* Inga kariösa lesioner. Fickor 2-3mm.
* Sens-test: Ua, snabbt övergående smärta.

**[Bildinstruktion för AI]:** 
Intraoralt foto som visar överkäkens premolarer med tydliga kilformiga defekter (blottat dentin/rotcement) vid gingivalranden, lätt inflammerat tandkött pga borstskador.

**Rätt Svar & Feedback:**
* **Diagnos:** Dentinöverkänslighet (Hypersensibilitet)
* **ICD-10:** K03.8 (Annan specificerad sjukdom i tändernas hårdvävnad)
* **TLV-åtgärd:** 311 (Information/Instruktion) ev 301 (Fluorlackning)
* **Klinisk Feedback:** Enkelt och rätt. Ett typiskt fall av reversibel smärta från oskyddat dentin. Instruera patienten i atraumatisk borstteknik och applicera desensibiliserande medel.

---

### Fall 1.6: Det svullna operculumet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av lokal infektion vid frambrytande tänder och vikten av profylax.

**Anamnes (Patient 19 år):**
*"Det gör fruktansvärt ont längst bak i underkäken på höger sida. Jag kan knappt gapa och det luktar illa ur munnen."*

**Klinisk Status & Fynd:**
* Tand 48 är delvis frambruten.
* Mjukvävnaden över tanden (operculum) är kraftigt svullen, röd och pus sipprar ut vid lätt tryck.
* Lätt trismus (gapförmåga 30 mm). Ingen feber.

**[Bildinstruktion för AI]:** 
Närbild av bakersta molarområdet i underkäken. En visdomstand syns bara till hälften, täckt av en röd, svullen slemhinneflik. Man ser tecken på irritation från den motstående tanden i överkäken.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut perikoronit regio 48
* **ICD-10:** K05.22 (Akut perikoronit)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling - Spolning/Inslipning)
* **Klinisk Feedback:** Spola rent under fliken med koksaltlösning eller klorhexidin. Om motstående tand traumatiserar fliken bör den slipas av (avlastning). Antibiotika är INTE indicerat om patienten är feberfri och utan allmänpåverkan. Instruera om noggrann hygien med vinkelborste. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 1.7: Den smärtsamma blödningen (ANUG)
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare / Tandhygienister
**Holistiskt perspektiv:** Identifiering av nekrotiserande tandköttsinflammation kopplat till stress och livsstilsfaktorer.

**Anamnes (Patient 24 år):**
*"Mitt tandkött har börjat blöda jättemycket och det gör så ont att jag inte kan borsta tänderna. Det luktar också väldigt illa."*

**Klinisk Status & Fynd:**
* Nekroser (kraterformade sår) på papillerna i fronten.
* Kraftig plackansamling och spontanblödning.
* Patienten röker och har haft en mycket stressig period vid universitetet.

**[Bildinstruktion för AI]:** 
Närbild av tänderna i underkäksfronten. Tandköttspapillerna mellan tänderna ser ut att vara "bortklippta" eller kraterformade med en gråaktig beläggning (nekros). Kraftig rodnad.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut Nekrotiserande Gingivit (ANUG)
* **ICD-10:** A69.1 (Andra Vincents infektioner / ANUG)
* **TLV-åtgärd:** 301 (Mekanisk infektionssanering) + 311 (Information)
* **Klinisk Feedback:** Detta kräver försiktig mekanisk rengöring (ofta i lokalanestesi) och väteperoxid-sköljning (3%). Det är starkt kopplat till rökning, stress och bristande hygien. Vid allmänpåverkan/feber ges Metronidazol. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 1.8: Trycket bakom kindbenet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Differentialdiagnostik för att undvika onödiga endodontiska ingrepp vid sinuit.

**Anamnes (Patient 35 år):**
*"Jag har en dov värk i flera tänder i höger överkäke. Det känns som att de är för långa när jag biter ihop. Värken blir värre när jag böjer mig framåt."*

**Klinisk Status & Fynd:**
* Tänderna 15, 16, 17 är kliniskt intakta utan karies eller stora fyllningar.
* Samtliga tänder i kvadranten är lätt perkussionsömma.
* Vitalitet (kyltest) är normal på samtliga tänder.
* Patienten har varit förkyld i två veckor.

**[Bildinstruktion för AI]:** 
Röntgenbild (Panorama eller sinusbild) som visar överkäkens bihålor. Den högra bihålan (sinus maxillaris) ser "grumlig" eller vätskefylld ut jämfört med den vänstra som är svart (luftfylld).

**Rätt Svar & Feedback:**
* **Diagnos:** Akut maxillarsinuit (Bihåleinflammation)
* **ICD-10:** J01.0 (Akut maxillarsinuit)
* **TLV-åtgärd:** 107 (Kompletterande undersökning) + Rådgivning
* **Klinisk Feedback:** En klassisk differentialdiagnos till tandvärk. Smärtan refereras till tänderna p.g.a. närheten till sinusgolvet. Symtom som förvärras vid framåtböjning och perkussionsömhet på flera tänder samtidigt talar för sinuit. Behandlas med nässpray (avsvällande) och vid behov antibiotika via läkare. Rotbehandla INTE tänderna! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 1.9: Den bleka patienten
**Svårighetsgrad:** Advanced
**Målgrupp:** Tandläkare
**Holistiskt perspektiv:** Uppmärksammande av orala tecken på allvarlig systemisk sjukdom (Leukemi).

**Anamnes (Patient 12 år):**
*"Mitt tandkött har börjat svullna och blöda jättelätt sista veckan. Jag känner mig också väldigt trött och har fått massor av blåmärken på benen utan att jag slagit mig."*

**Klinisk Status & Fynd:**
* Generell gingival hyperplasi (svullet tandkött) som täcker stora delar av kronorna.
* Slemhinnorna är påfallande bleka.
* Små punktformade blödningar (petekier) i gommen.

**[Bildinstruktion för AI]:** 
Kliniskt foto av munhålan. Tandköttet ser extremt svullet och "svampigt" ut överallt, nästan lila-rött. Slemhinnan i övrigt (kind/läpp) ser mycket blek/vitaktig ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Misstänkt Leukemi (Akut myeloisk/lymfatisk leukemi)
* **ICD-10:** C95.9 (Leukemi, ospecificerad)
* **TLV-åtgärd:** AKUT REMISS till Barnklinik/Akutmottagning
* **Klinisk Feedback:** Detta är umedicinisk nödfall. Gingival hyperplasi, blekhet och petekier är starka varningssignaler för malign hematologisk sjukdom. Utför ingen tandbehandling! Ring barnakuten omedelbart för vidare utredning och blodstatus. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 1.10: Den frätande värken
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare / Studenter
**Holistiskt perspektiv:** Identifiering av iatrogena skador eller kemiska brännskador orsakade av patientens egenvård.

**Anamnes (Patient 45 år):**
*"Jag hade så ont i min tand i natt att jag la en värktablett (Aspirin) direkt mot tandköttet där det gjorde ont. Nu har jag fått ett vitt, jätteont sår där."*

**Klinisk Status & Fynd:**
* En stor, vitaktig och sårig fläck (nekros) på slemhinnan i omslagsvecket regio 46.
* Den vita ytan går delvis att skrapa bort och lämnar en blödande yta undertill.
* Patienten har en djup karies i 46 (orsaken till den ursprungliga smärtan).

**[Bildinstruktion för AI]:** 
Kliniskt foto av omslagsvecket i underkäken. En oregelbunden, vit "flaga" eller hinna täcker slemhinnan precis vid en kariesangripen tand. Det ser ut som huden har blivit "bränd".

**Rätt Svar & Feedback:**
* **Diagnos:** Kemisk brännskada (Aspirin burn / Frätskada)
* **ICD-10:** L05 (Skada orsakad av frätande ämnen)
* **TLV-åtgärd:** 301 (Sårbehandling) + Behandling av kausal faktor (Tand 46)
* **Klinisk Feedback:** Patienter försöker ibland lindra tandvärk genom att lägga tabletter lokalt, vilket orsakar en frätskada. Behandlas med expektans och lokalt skydd (t.ex. Afte-gel). Fokusera på att behandla tanden som orsakade värken från början. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

## Område 2: Endodonti

### Fall 2.1: Asymtomatisk upptäckt
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag har inga som helst besvär. Är bara här på den årliga kontrollen."*

**Klinisk Status & Fynd:**
* 25 har en kompositfyllning. Tanden svarar ej på senstest (kyl).
* Perkussionsöm: Negativ.
* Röntgen: Apikal uppklarning ca 4x4 mm vid apex 25. Tättslutande fyllning.

**[Bildinstruktion för AI]:** 
Apikal röntgenbild över tand 25 som visar en medelstor, välavgränsad radiolucent (mörk) uppklarning vid apex. Fyllningen är stor men ser tät ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Asymtomatisk apikal parodontit
* **ICD-10:** K04.5 (Kronisk apikal parodontit)
* **TLV-åtgärd:** 501 + 502/503 (Rensning och rotfyllning)
* **Klinisk Feedback:** Klassiskt fynd vid revision. Pulpan är nekrotisk men utan akuta symtom. Rotbehandling indicerad för att undvika framtida exacerbation.

### Fall 2.2: Smärtan efter rotfyllningen (Flare-up)
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Ni påbörjade en rotfyllning på min tand för två dagar sedan. Igår började det göra oerhört ont och nu kan jag inte ens bita ihop tänderna!"*

**Klinisk Status & Fynd:**
* 16 under endodontisk behandling, tillfällig fyllning (Cavit) intakt.
* Tanden är extremt perkussionsöm och öm vid apikal palpation.
* Lätt förhöjd temp 37.8°C, men ingen märkbar extraoral svullnad.

**[Bildinstruktion för AI]:** 
Apikal röntgenbild på 16 som visar kofferdam-klammer och filar i kanalerna (arbetsbild) eller en bild med temporär fyllning utan rotfyllningsmaterial. Lätt vidgad peridontalspalt apikalt.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut periapikal exacerbation (Flare-up)
* **ICD-10:** K04.4 (Akut apikal parodontit pulparsprung)
* **TLV-åtgärd:** 301/501 (Smärtlindring, rensa om, spola)
* **Klinisk Feedback:** Flare-ups sker ibland trots god aseptik. Spola med NaOCl, applicera nytt inlägg, avlasta i bettet. Antibiotika är generellt INTE indicerat utan systemisk påverkan/svullnad. Bra jobbat!

### Fall 2.3: Den böjda MB2-kanalen
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfaren / Specialist

**Anamnes (Patientens ord):**
*"Tanden (26) blev rotfylld för ett år sedan av en annan tandläkare, men den känns fortfarande öm och som att den 'växt' i munnen."*

**Klinisk Status & Fynd:**
* 26 är rotfylld. Distal och palatinal kanal ser täta ut. Mesiobuckala roten har en rotfyllning som inte följer rotens krökning.
* Tydlig apikal radiolucens vid MB-roten. Fistelgång palatinalt som går att sondera.

**[Bildinstruktion för AI]:** 
CBCT-snitt eller avancerad apikalröntgen på tand 26 som visar en rotfyllning. En missad MB2-kanal (omedicinerad och ofylld) syns bredvid den fyllda MB1-kanalen, med en apikal lesion kring denna rot.

**Rätt Svar & Feedback:**
* **Diagnos:** Misslyckad endodontisk behandling (Kvarstående apikal parodontit pga missad MB2)
* **ICD-10:** K04.5 (Apikal parodontit)
* **TLV-åtgärd:** 504 (Revision av rotfyllning)
* **Klinisk Feedback:** Detta kräver mikroskop och specialinstrument för att lokalisera och rensa MB2-kanalen som är en vanlig orsak till misslyckade rotfyllningar i överkäksmolarer. Rätt diagnos för revision.

### Fall 2.4: Trauma med färgförändring
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Min framtand blev lite grå efter att jag fick en armbåge på den under fotbollen för ett halvår sedan. Den gör inte ont alls, men jag gillar inte färgen."*

**Klinisk Status & Fynd:**
* 21 är missfärgad (gråblå ton).
* Negativt senstest.
* Röntgen: Oblitererad pulpakavitet, ingen apikal uppklarning.

**[Bildinstruktion för AI]:** 
Kliniskt foto av överkäksfronten där tand 21 har en tydligt gråaktig missfärgning jämfört med granntänderna. Röntgenbild visar pulpaobliteration (ingen pulparumssiluett).

**Rätt Svar & Feedback:**
* **Diagnos:** Pulpanekros / Pulpaobliteration med missfärgning
* **ICD-10:** K04.1 (Nekros i pulpan)
* **TLV-åtgärd:** 501 (Rotbehandling indicerad inför internblekning)
* **Klinisk Feedback:** En oblitererad tand utan symtom och utan apikal parodontit kräver oftast ingen behandling medicinskt. Däremot kräver estetisk behandling (internblekning) att tanden rotfylls först. Rätt hanterat!

### Fall 2.5: Resorptionen
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist

**Anamnes (Patientens ord):**
*"Min tandläkare skickade mig till dig för han såg en 'rosa fläck' på min tand (11). Jag har inga besvär."*

**Klinisk Status & Fynd:**
* 11 har en synlig rosa skiftning cervikalt ("pink spot").
* Tanden är positiv på senstest.
* Röntgen: En oval, välavgränsad uppklarning inuti rotkanalen på mellersta tredjedelen, kanalens konturer försvinner i uppklarningen.

**[Bildinstruktion för AI]:** 
Intraoralt kliniskt foto: "Pink spot lesion" på tand 11 cervikalt. Röntgen: Tydlig intern rotresorption (oval radiolucens inuti kanalen) som inte har perforerat roten externt ännu.

**Rätt Svar & Feedback:**
* **Diagnos:** Intern rotresorption
* **ICD-10:** K03.3 (Patologisk rotresorption)
* **TLV-åtgärd:** 501 (Rotbehandling, omedelbar extirpation för att stoppa resorptionen)
* **Klinisk Feedback:** Den "rosa fläcken" är vaskulariserad granulationsvävnad. Eftersom resorptionen är intern och inte perforerat måste pulpan extirperas omedelbart för att rädda tanden. Snygg diagnostik!

### Fall 2.6: Sprickan som gäckar
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av diffus smärta som patienten har svårt att lokalisera, vilket kräver noggrann diagnostik för att undvika felbehandling.

**Anamnes (Patientens ord):**
*"Det hugger till som en stöt i överkäken på höger sida ibland när jag tuggar, särskilt när jag släpper bettet från någonting segt."*

**Klinisk Status & Fynd:**
* 16 har en stor MOD-amalgamfyllning.
* Perkussion: Utan anmärkning.
* Bitning på 'Tooth Slooth' ger skarp smärta vid palatinala kuspen specifikt när trycket släpps.
* Sensibilitet: Positiv (kyla), normal reaktion.

**[Bildinstruktion för AI]:** 
Intraoralt foto av tand 16 med en stor ocklusal amalgamfyllning. Belysningen visar en svag men märkbar spricklinje (infraktion) i den intakta emaljen längs den palatinala kuspen.

**Rätt Svar & Feedback:**
* **Diagnos:** Infraktion (Cracked tooth syndrome)
* **ICD-10:** S02.5 (Tandfraktur)
* **TLV-åtgärd:** 801 (Permanent krona) ev provisorisk täckning.
* **Klinisk Feedback:** Klassiskt symtom på en spricka är smärta som uppstår när bitkraften *släpper*. Eftersom pulpan fortfarande är vital är den primära åtgärden att skydda kuspen med en krona eller ett onlay för att förhindra att sprickan propagerar in i pulpan.

---

### Fall 2.7: Den höga fyllningen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter
**Holistiskt perspektiv:** Betydelsen av att noggrant kontrollera ocklusion efter restorativ terapi för att undvika iatrogen smärta.

**Anamnes (Patientens ord):**
*"Ni lagade min tand i underkäken igår. Den känns jättekonstig att bita på, som att den slår i först, och nu har den börjat värka och ömma hela tiden."*

**Klinisk Status & Fynd:**
* 46 har en nygjord kompositfyllning ocklusalt.
* Perkussion: Tydlig ömhet.
* Artikulationspapper visar en kraftig prematur kontaktpunkt ("bull's eye") på kompositen.
* Sensibilitet: Positiv, normal reaktion.

**[Bildinstruktion för AI]:** 
Intraoralt foto av tand 46 där ocklusionspapper har lämnat en stor, intensivt mörkblå markering (prematur kontakt) mitt på kompositfyllningen.

**Rätt Svar & Feedback:**
* **Diagnos:** Traumatisk ocklusion
* **ICD-10:** K07.2 (Anomalier i tandbågarnas relation/traumatisk ocklusion)
* **TLV-åtgärd:** 431 (Ocklusionsjustering)
* **Klinisk Feedback:** Ett typiskt iatrogent problem. Den höga fyllningen har orsakat en akut inflammation i periodontalligamentet (apikal parodontit pga trauma). Ocklusionsjustering löser problemet snabbt, ingen rotbehandling behövs!

---

### Fall 2.8: Smärtan i hela överkäken
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Vikten av differentialdiagnostik mellan odontogen (tänder) och icke-odontogen (bihålor) smärta.

**Anamnes (Patientens ord):**
*"Hela överkäken på höger sida värker! Det dunkar när jag går i trappor eller lutar mig fram för att knyta skorna. Dessutom är jag dunderförkyld sedan en vecka."*

**Klinisk Status & Fynd:**
* 14, 15, 16, 17 är antingen intakta eller har minimala fyllningar.
* Perkussion: Lätt ömma över *hela* högra överkäkskvadranten.
* Sensibilitet: Samtliga tänder svarar vitalt och normalt på kyla.
* Palpation: Ömhet vid tryck över höger sinus maxillaris (kindbenet).

**[Bildinstruktion för AI]:** 
Kliniskt ansiktsfoto på en patient som håller sig över höger kind/bihåla med ett smärtat, hängigt uttryck (förkylningssymtom).

**Rätt Svar & Feedback:**
* **Diagnos:** Akut sinuit (Maxillarsinuit)
* **ICD-10:** J32.0 (Akut/kronisk sinuit maxillaris)
* **TLV-åtgärd:** 112 (Röntgen för diff-diagnostik), hänvisning till läkare.
* **Klinisk Feedback:** Perkussionsömhet på flera tänder samtidigt, kombinerat med smärta vid framåtlutning och en pågående förkylning, är ett skolboksexempel på sinuit (bihåleinflammation). Undvik endodontisk behandling! Remittera/hänvisa till läkare vid behov.

---

### Fall 2.9: Isningen vid kaffet
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter
**Holistiskt perspektiv:** Hantering av pulpanära kariesangrepp och pulpabevarande behandling vid reversibel inflammation.

**Anamnes (Patientens ord):**
*"När jag dricker varmt kaffe eller äter glass ilar det till jätteskarpt i min tuggtand, men det släpper efter fem-tio sekunder."*

**Klinisk Status & Fynd:**
* 36 har kliniskt synlig djup karies distalt.
* Sensibilitet (kyla): Kraftig smärta som avklingar helt inom 10-15 sekunder.
* Perkussion: Helt utan anmärkning.
* Röntgen: Kariesangrepp som närmar sig pulpan men ingen apikal patologi (radiolucens) syns.

**[Bildinstruktion för AI]:** 
Apikal röntgenbild på tand 36 som visar en stor, mörk (radiolucent) karieslesion distalt. Kariesangreppet sträcker sig djupt in i dentinet men perforerar precis inte pulparummet. Apikalt ser rothinnorna helt normala ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Symtomatisk pulpit (tidig/reversibel fas)
* **ICD-10:** K04.0 (Pulpit)
* **TLV-åtgärd:** 403 (Permanent fyllning 3 ytor) eller stegvis excavering.
* **Klinisk Feedback:** Smärta som är kortvarig och tydligt provocerad tyder på en reversibel inflammation i pulpan. Kariesexcavering och en tät fyllning (ev. med överkappning/liner) är tillräckligt. Rotbehandling krävs inte i detta tidiga skede.

---

### Fall 2.10: Den sömnlösa natten
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Akut smärtlindring och empatiskt bemötande av en patient som lider av svår, utmattande smärta.

**Anamnes (Patientens ord):**
*"Jag har inte sovit på hela natten! Det dunkar konstant i underkäken. Alvedon och Ipren hjälper inte ett dugg och smärtan strålar upp mot örat."*

**Klinisk Status & Fynd:**
* 47 har en mycket stor, defekt amalgamfyllning med sekundärkaries.
* Sensibilitet (kyla): Extremt dröjande smärta som sitter kvar i över en minut efter testet.
* Perkussion: Lätt dunkömhet börjar utvecklas.
* Röntgen: Lätt vidgad rothinnespalt apikalt.

**[Bildinstruktion för AI]:** 
Apikal röntgen på tand 47. Stor, blockig metallfyllning (amalgam) med oregelbunden sekundärkaries under fyllningskanten. Lätt vidgad rothinnespalt vid rotspetsarna, men inget uttalat apikalt granulom ännu.

**Rätt Svar & Feedback:**
* **Diagnos:** Symtomatisk pulpit (sen/irreversibel fas)
* **ICD-10:** K04.0 (Pulpit)
* **TLV-åtgärd:** 501 (Akutrensning/Trepanation med extirpation)
* **Klinisk Feedback:** Spontan, bultande nattvärk som inte svarar på analgetika, i kombination med långvarig smärta vid kyla, indikerar en irreversibel pulpit. Akutrensning (pulpektomi) måste utföras omedelbart för att häva smärtan. Antibiotika är INTE indicerat utan feber/svullnad!

---

## Område 3: Parodontologi

### Fall 3.1: Blodet på tandborsten
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Mitt tandkött har börjat blöda jättemycket när jag borstar tänderna, särskilt i underkäken. Det svider också lite."*

**Klinisk Status & Fynd:**
* Mycket plack och tandsten lingvalt i underkäksfronten.
* Gingivan är röd, svullen och blöder kraftigt vid sondering (BOP 60%).
* Inga fickor över 3 mm. Ingen fästeförlust på röntgen.

**[Bildinstruktion för AI]:** Kliniskt foto av underkäksfronten lingvalt. Tydlig supragingival tandsten och rodnat, svullet tandkött som ser inflammerat ut längs tandhalsarna.

**Rätt Svar & Feedback:**
* **Diagnos:** Plackinducerad gingivit
* **TLV-åtgärd:** 311 (Information), 341 (Behandling av gingivit)
* **Klinisk Feedback:** Ett solklart fall av reversibel inflammation. Avsaknad av fästeförlust utesluter parodontit. Fokus ligger på att instruera patienten i optimal plackkontroll! (ICD-bonus: K05.1)

### Fall 3.2: De lösa framtänderna
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Mina framtänder där nere känns lösa när jag biter av äpplen. Dessutom tycker jag att de har blivit längre sista åren. Min pappa tappade alla sina tänder vid 50."*

**Klinisk Status & Fynd:**
* Rökare (10 cig/dag).
* Allmän fästeförlust, men värst vid 31, 41 med 6-7 mm fickor. BOP 40%. Mobilitet grad 2.
* Röntgen: Horisontell bennedbrytning, ca 50% av rotslängden saknar benstöd vid 31, 41.

**[Bildinstruktion för AI]:** Apikal röntgenbild på underkäksfronten (31, 41) som visar kraftig horisontell bennedbrytning (benkanten ligger långt under emaljcementgränsen).

**Rätt Svar & Feedback:**
* **Diagnos:** Parodontit (Grad C, Stadie III)
* **TLV-åtgärd:** 342/343 (Sjukdomsbehandling parodontit)
* **Klinisk Feedback:** Den snabba progressionen (patientens ålder kontra benförlust), rökningen och herediteten drar upp graderingen till C. Här krävs aggressiv mekanisk infektionsbehandling och starkt tobaksavvänjningsstöd. (ICD-bonus: K05.3)

### Fall 3.3: Svullnaden runt implantatet
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfarna/Specialister

**Anamnes (Patientens ord):**
*"Tandköttet runt min skruv i underkäken (46) smakar illa och ibland kommer det lite gult var. Jag fick implantatet för 5 år sedan."*

**Klinisk Status & Fynd:**
* Ficka på 8 mm distalt om implantat 46. Rikligt med pus vid sondering (BOP+ och Pus+).
* Röntgen: Kraterformig bennedbrytning runt implantatets coronala tredjedel. 3 blottade gängor.

**[Bildinstruktion för AI]:** Apikal röntgen på ett fixtur-implantat regio 46. Tydlig skålformig ("krater") bennedbrytning kring implantathalsen ner till 3:e eller 4:e gängan.

**Rätt Svar & Feedback:**
* **Diagnos:** Peri-implantit
* **TLV-åtgärd:** 342/343 (Mekanisk behandling) ev kirurgi
* **Klinisk Feedback:** Varbildning och radiologisk benförlust >2mm bekräftar peri-implantit. Behandlingen är svår och kräver mekanisk rengöring, ibland kombinerat med öppen lambåkirurgi om den slutna läkningen uteblir. (ICD-bonus: T85.9)

### Fall 3.4: Plötslig smärta och lukt
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Hela min mun gör extremt ont sen i förrgår. Jag vågar knappt borsta. Min tjej säger att jag luktar hemskt från munnen. Jag har varit väldigt stressad på jobbet."*

**Klinisk Status & Fynd:**
* Kraftig foetor ex ore (dålig andedräkt).
* Interdentalpapillerna i underkäksfronten är nekrotiska (utstansade, "kraterformiga") och täckta av ett gråvitt pseudomembran.
* Smärtpåverkad och har svårt att gapa stort.

**[Bildinstruktion för AI]:** Kliniskt foto av underkäksfronten. Papillerna mellan tänderna är 'avklippta' och nekrotiska med en gråaktig yta. Rött och lättblödande tandkött runtomkring.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut Nekrotiserande Ulcerös Gingivit (ANUG)
* **TLV-åtgärd:** 341 (Akut behandling) + klorhexidinsköljning
* **Klinisk Feedback:** Stress, dålig OH och rökning är klassiska triggers för ANUG. Smärtan är det primära symtomet. Behandlas initialt med skonsam debridering och klorhexidin 0,12% tills smärtan tillåter ordentlig djuprengöring. (ICD-bonus: A69.1)

### Fall 3.5: Läkemedlets biverkning
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Mitt tandkött har svullnat upp och blivit så stort att det nästan täcker mina tänder! Jag började ta en ny medicin för mitt höga blodtryck för ett halvår sedan."*

**Klinisk Status & Fynd:**
* Kraftig, fast och fibrös överväxt av gingivan i hela munnen. Inga sår, men rodnad vid plackansamlingar.
* Patienten står på Amlodipin (kalciumflödeshämmare).

**[Bildinstruktion för AI]:** Kliniskt foto där tandköttet är kraftigt förstorat, ljust rosa och fibröst. Det sväller upp över tändernas kronor, särskilt mellan tänderna (papillhyperplasi).

**Rätt Svar & Feedback:**
* **Diagnos:** Läkemedelsinducerad gingival hyperplasi
* **TLV-åtgärd:** 311, 341 (Mekanisk plackkontroll) och läkarremiss
* **Klinisk Feedback:** Vissa blodtrycksmediciner (kalciumantagonister) och antiepileptika kan orsaka gingival överväxt, vilket förvärras av plack. Perfekt munhygien krävs, och vid svåra fall kontaktas läkare för eventuellt byte av preparat. (ICD-bonus: K06.1)

### Fall 3.6: Den dunkande fickan
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av akut exacerbation i en redan sjuk parodontal vävnad och vikten av korrekt differentialdiagnostik mot endodontiskt ursprung.

**Anamnes (Patientens ord):**
*"Det bultar i tandköttet bredvid min hörntand nere till höger. Tanden känns också lite lös och som att den blivit för hög när jag biter."*

**Klinisk Status & Fynd:**
* 43 har en lokaliserad, röd och utspänd svullnad i den fästa gingivan (lateralt om roten, inte apikalt i omslagsvecket).
* PPD (Fickdjup): 7 mm ficka på den distobuckala ytan.
* Rikligt med pus tränger fram ur fickan vid lätt tryck på svullnaden.
* Sensibilitet: Positiv (svarar normalt på kyla).

**[Bildinstruktion för AI]:** 
Intraoralt foto av 43. En svullnad som liknar en liten röd "finne" (abscess) buktar ut från tandköttet vid sidan av roten. Gult var (pus) syns vid tandhalsen. Apikal röntgen visar bennedbrytning längs rotytan men INGEN periapikal radiolucens vid rotspetsen.

**Rätt Svar & Feedback:**
* **Diagnos:** Parodontal abscess (utan fistel)
* **ICD-10:** K05.20 (Parodontal abscess)
* **TLV-åtgärd:** 341 (Behandling av parodontal sjukdom, akut) / Dränage via fickan.
* **Klinisk Feedback:** Positiv sensibilitet utesluter ofta en primär endodontisk abscess. Svullnadens placering lateralt om roten bekräftar parodontalt ursprung. Behandlingen går ut på akut mekaniskt dränage via den parodontala fickan och spolning. Antibiotika sätts INTE in såvida inte feber eller systemisk påverkan föreligger.

---

### Fall 3.7: Smärtan längst bak
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Förebyggande av allvarliga infektionsspridningar i munbotten och svalg.

**Anamnes (Patientens ord):**
*"Jag har så fruktansvärt ont längst bak i underkäken på vänster sida. Det är svullet, smakar illa och jag kan knappt gapa ordentligt för att äta."*

**Klinisk Status & Fynd:**
* 38 är delvis frambruten. En kraftigt rodnad, svullen slemhinneflik (operculum) täcker den distala delen av kronan.
* Antagonisten (28) biter rakt ner i den svullna fliken i underkäken.
* Gapförmåga: Nedsatt till ca 30 mm (lätt trismus).
* Palpation: Ömhet submandibulärt, men ingen feber eller sväljningssvårigheter (dysfagi).

**[Bildinstruktion för AI]:** 
Kliniskt foto av vänster underkäke längst bak. En delvis frambruten visdomstand (38) där en kraftigt eldröd och svullen gingivalvävnad (operculum) täcker halva tanden.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut perikoronit
* **ICD-10:** K05.22 (Akut perikoronit)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling mindre), ev 401 (Extraktion av antagonist 28).
* **Klinisk Feedback:** Akut perikoronit hanteras i första hand med noggrann lokal rengöring (spolning under fliken). Vid tydligt antagonisttrauma är extraktion av den erupterade överkäkstanden (28 i detta fall) en mycket effektiv akutåtgärd. Undvik att extrahera 38 (den felande tanden) i det akuta inflammationsskedet pga spridnings- och anestesirisker.

---

### Fall 3.8: Popcornskalet
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter
**Holistiskt perspektiv:** Att alltid överväga iatrogena eller traumatiska orsaker (främmande kropp) vid plötsliga, extremt lokaliserade besvär hos i övrigt friska patienter.

**Anamnes (Patientens ord):**
*"Jag var på bio i fredags, och nu har jag fått jätteont i tandköttet mellan två tänder i överkäken. Det spränger hela tiden!"*

**Klinisk Status & Fynd:**
* Lokaliserad, intensiv rodnad och svullnad i interdentalpapillen mellan 15 och 16.
* Inga kariösa lesioner. Inga generella parodontala fickor (resterande bett har friska förhållanden).
* Vid försiktig sondering approximalt fås kraftig blödning och något hårt krapande känns strax under tandköttskanten.

**[Bildinstruktion för AI]:** 
Intraoralt foto av papillen mellan 15 och 16 som är illröd, svullen och står ut från tänderna. Ett litet halvt genomskinligt-gult skal (ett popcornskal) sticker upp någon millimeter ur tandköttsfickan.

**Rätt Svar & Feedback:**
* **Diagnos:** Främmande kropps-gingivit (Främmande kropp i parodontiet)
* **ICD-10:** T18.0 (Främmande kropp i munnen) alt K05.0.
* **TLV-åtgärd:** 301 (Sjukdomsbehandling mindre).
* **Klinisk Feedback:** En "foreign body" (som ett popcornskal, en hård tandborstborst eller nagelbit) kan orsaka en snabb och intensiv lokal parodontal reaktion. Behandlingen är extremt tacksam: ta bort orsaken med pincett eller scaler och spola rent. Läkning sker nästan omedelbart.

---

### Fall 3.9: Barnets smärtsamma blåsor
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare / Studenter
**Holistiskt perspektiv:** Hantering av smärtsamma virusinfektioner hos barn där adekvat vätskeintag och föräldrastöd är den kritiska faktorn.

**Anamnes (Patientens ord, förälder):**
*"Min treåriga dotter vill varken äta eller dricka. Hon gråter oavbrutet, har feber och hennes tandkött är alldeles svullet och rött."*

**Klinisk Status & Fynd:**
* Allmänpåverkan, feber (38.5°C), patienten dreglar pga sväljsmärta.
* Kraftigt erytematös och svullen gingiva i hela bettet.
* Små, spruckna blåsor (ulcerationer med röd halo) på både den fästa gingivan, läpparna och tungan.
* Ömma submandibulära lymfkörtlar.

**[Bildinstruktion för AI]:** 
Intraoralt foto av en treåring. Tandköttet är eldrött och svullet. Många små sår/blåsor är spridda över både det fastsittande tandköttet, den rörliga slemhinnan och läpparnas insida.

**Rätt Svar & Feedback:**
* **Diagnos:** Primär herpetisk gingivostomatit
* **ICD-10:** B00.2 (Herpetisk gingivostomatit)
* **TLV-åtgärd:** Ingen specifik TLV förutom basundersökning. Info och symtomlindring.
* **Klinisk Feedback:** Herpesengagemang involverar både rörlig och fast slemhinna (till skillnad från afte). Skriv absolut inte ut antibiotika! Fokus är symtomatisk behandling: ex. lidokainviskös för smärtlindring strax före måltid, samt att säkerställa att barnet får i sig vätska (isglass är ett bra tips) för att undvika dehydrering.

---

### Fall 3.10: Den blödande skruven
**Svårighetsgrad:** Basic
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Förebyggande av implantatförlust genom tidig upptäckt och reversibel inflammationsbehandling.

**Anamnes (Patientens ord):**
*"Det blöder lite när jag använder mellanrumsborsten runt implantatet jag fick förra året. Det gör inte direkt ont, men det känns irriterat."*

**Klinisk Status & Fynd:**
* Implantatkrona på plats i regio 24.
* Mjukvävnaden (mukosan) runt implantatet är lätt rodnad och svullen.
* BOP: Positiv (tydlig blödning vid varsam sondering med plastsonde).
* Fickdjup: 3-4 mm. Ingen varbildning (pus).
* Röntgen: Benkanten ligger i nivå med första gängan, helt oförändrad i jämförelse med 1-årsbilden.

**[Bildinstruktion för AI]:** 
Kliniskt foto av ett implantat på plats 24 (med en porslinskrona). Mjukvävnaden precis runt implantatets hals är mörkröd. Röntgenbild bredvid visar perfekt bennivå runt implantatfixturen utan någon krater eller radiologisk benförlust.

**Rätt Svar & Feedback:**
* **Diagnos:** Peri-implantär mukosit
* **ICD-10:** T85.9 (Ospecificerad komplikation...)
* **TLV-åtgärd:** 341 (Sjukdomsbehandling, rengöring).
* **Klinisk Feedback:** Blödning vid sondering utan radiologisk benförlust diagnostiseras som peri-implantär mukosit. Detta tillstånd är reversibelt, i princip motsvarigheten till gingivit fast på ett implantat. Noggrann mekanisk depuration (med titan-, plast- eller tefloninstrument) och instruktion i optimerad interdental rengöring är behandlingen.

---

## Område 4: Protetik

### Fall 4.1: Den kluvna fyllningen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag bet i en hård brödkant och det knakade till. Nu har halva tanden gått sönder (26), men det gör inte ont alls."*

**Klinisk Status & Fynd:**
* 26 har haft en stor MOD-amalgamfyllning. Hela palatinala kuspen är nu frakturerad ända ner till gingivalranden.
* Tanden svarar normalt på kyltest. Ingen apikal patologi.

**[Bildinstruktion för AI]:** Intraoralt foto. Tand 26 (överkäksmolar) har en stor silverfyllning, men den inre halvan av tanden (palatinala väggen) är helt avbruten. 

**Rätt Svar & Feedback:**
* **Diagnos:** Tandfraktur, omfattande substansförlust
* **TLV-åtgärd:** 801 (Permanent krona, t.ex. zirkonia eller MK)
* **Klinisk Feedback:** Med en så massiv substansförlust där en bärande kusp försvunnit är en vanlig fyllning sällan långsiktig. En protetisk krona krävs för att krama om och skydda kvarvarande kusp från att spricka. (ICD-bonus: S02.5)

### Fall 4.2: Bron som lossnade
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Min treledsbro (15-17) som jag fick för sju år sedan hoppade loss när jag åt kola igår. Jag har den med mig i en påse."*

**Klinisk Status & Fynd:**
* Bron är intakt, inga porslinsflisor saknas. Insidan av brons stöd är rena.
* Stödtänderna (15, 17) är vitala och saknar sekundärkaries.

**[Bildinstruktion för AI]:** Kliniskt foto. En lucka i munnen vid 16, bredvid står preppade (nedslipade) tänder vid 15 och 17. En liten bild infälld på en metallkeramisk bro som hålls i en pincett.

**Rätt Svar & Feedback:**
* **Diagnos:** Retentionsförlust (Kliniskt intakta stöd och intakt konstruktion)
* **TLV-åtgärd:** 811 (Recementering av fast protetik)
* **Klinisk Feedback:** Det mest konservativa och korrekta här är att rengöra tänderna och bron noggrant (blästring), och därefter recementera med ett kraftigt cement (t.ex. resinmodifierat glasjonomercement). Kontrollera ocklusionen efteråt! (ICD-bonus: T85.6)

### Fall 4.3: Det försvunna bettet
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfarna/Specialister inom oral protetik

**Anamnes (Patientens ord):**
*"Mina tänder har blivit så korta och jämna. Min fru säger att jag gnisslar tänder fruktansvärt högt på nätterna. Jag skäms lite när jag ler nu."*

**Klinisk Status & Fynd:**
* Generell kraftig attrition i båda käkarna.
* Emaljen är borta ocklusalt/incisalt och dentinet ligger exponerat. Betthöjden (OVD) är sänkt med uppskattningsvis 3-4 mm.
* Klagar på spänningshuvudvärk. 

**[Bildinstruktion för AI]:** Frontalt kliniskt foto där patienten biter ihop. Framtänderna i både under- och överkäken är extremt nedslitna (nästan hälften av längden borta) med platta, gula dentinytor exponerade i skären.

**Rätt Svar & Feedback:**
* **Diagnos:** Omfattande tandslitage (Attrition) med sänkt betthöjd
* **TLV-åtgärd:** Generell betthöjning (kombination av kronor 801 och ev direkta fyllningar), + 813 (Bettskena postoperativt)
* **Klinisk Feedback:** Ett mycket komplext fall! Innan permanent protetik utförs måste den nya betthöjden testas ut, oftast med en bettskena (Dahl-principen) eller temporära komposituppbyggnader. Först därefter görs kronor. Glöm inte skyddande skena för natten! (ICD-bonus: K03.0)

### Fall 4.4: Det spruckna leendet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Jag har en porslinskrona på framtanden (11). Förra veckan bet jag i en gaffel av misstag och nu har en stor bit porslin lossnat på framsidan. Det ser bedrövligt ut!"*

**Klinisk Status & Fynd:**
* 11 MK-krona (metallkeramik). Fasadporslinet har frakturerat incisalt/buckalt, den underliggande metallhättan lyser igenom.
* Tanden är rotfylld och försedd med pelare. Ingen apikal patologi.

**[Bildinstruktion för AI]:** Intraoralt foto på överkäksfronten. Tand 11 är en krona där en bit av den vita ytan (porslinet) har flisats av så att en mörkgrå silveryta (metall) blottats under.

**Rätt Svar & Feedback:**
* **Diagnos:** Fraktur i protetisk konstruktion (Chipping)
* **TLV-åtgärd:** 801 (Ny krona) alt reparation (reparation kan göras akut, men ny krona är permanent lösning)
* **Klinisk Feedback:** Att reparera porslin mot metall i munnen med komposit ger sällan ett estetiskt och hållbart resultat i längden, särskilt inte i fronten. Rekommendationen är att separera och göra om kronan, gärna helkeramisk denna gång. (ICD-bonus: T85.6)

### Fall 4.5: Protesen som skär in
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag fick min nya helprotes i underkäken för en vecka sedan, men jag kan inte ha den i! Det skaver så fruktansvärt långt bak på höger sida."*

**Klinisk Status & Fynd:**
* Ett decimeterstort decubitussår (trycksår) i omslagsvecket lingvalt i regio 47.
* Protesbasen i det området känns översträckt och vass vid palpation.

**[Bildinstruktion för AI]:** Intraoralt foto i underkäken (utan protes). Ett tydligt, röd-vitt trycksår (ulceration) i slemhinnan långt bak vid höger tungbas.

**Rätt Svar & Feedback:**
* **Diagnos:** Decubitus (Trycksår) orsakat av avtagbar protes
* **TLV-åtgärd:** 814 (Justering/Korrigering av protes)
* **Klinisk Feedback:** Klassiskt problem vid protesutlämning. Använd tryckpasta (Pressure Indicator Paste) på protesens insida, sätt den på plats, och slipa därefter exakt där slemhinnan lyser igenom pastan. Informera patienten om att såret läker på några dagar. (ICD-bonus: K06.2)

### Fall 4.6: Det lossnade provisoriet
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter
**Holistiskt perspektiv:** Tidsfaktorn och materialkunskap vid provisoriska ersättningar.

**Anamnes (Patientens ord):**
*"Jag var här i förrgår och slipade för en ny krona. Igår kväll när jag åt kola så lossnade plasttanden ni satte dit. Den är hel och jag har med den i en ask."*

**Klinisk Status & Fynd:**
* Preparerad tand 36. Preparationen är intakt och ren, inga frakturer.
* Gingivan kring preparationsgränsen är blek och frisk.
* Det medhavda bis-akrylatprovisoriet är helt. Passar perfekt på preparationen vid inprovning.

**[Bildinstruktion för AI]:** 
Intraoralt foto. En preparerad (nedslipad) molar i underkäken (36) med frisk omgivande gingiva. Bredvid, i en pincett, hålls en vit, tandformad plastkrona (provisorium).

**Rätt Svar & Feedback:**
* **Diagnos:** Lossnad temporär ersättning
* **ICD-10:** Z46.3 (Justering tandprotes) / K08.5
* **TLV-åtgärd:** 103 (Akut undersökning) alt debiteras ej (ingår ofta i kronarvodet).
* **Klinisk Feedback:** När provisoriet är helt och lossnade nyligen (ingen elongering/tandvandring har hunnit ske) är behandlingen enkel recementering. Viktigt materialval: Ska den permanenta kronan BONDAS (t.ex. e-max) måste ett EUGENOLFRITT temporärt cement (t.ex. TempBond NE) användas, då eugenol hämmar härdningen av permanent kompositcement!

---

### Fall 4.7: Den glappande skruven
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Differentiering mellan teknisk (lossnad skruv) och biologisk (implantatförlust) komplikation.

**Anamnes (Patientens ord):**
*"Min implantattand i överkäken (24) som jag fick för ett halvår sedan har börjat glappa. Den rör sig lite när jag vickar på den med tungan, men det gör inte ont alls."*

**Klinisk Status & Fynd:**
* Skruvre retinerad implantatkrona regio 24.
* Kronan är lätt mobil (rotation/tippning möjlig), men inga ljud (klickande/skrapande) vid perkussion.
* Röntgen (Apikal): En tydlig spalt syns mellan implantatfixturen och distansen. Benkanten ligger intakt runt fixturens hals. Fixturen i benet verkar orubblig.

**[Bildinstruktion för AI]:** 
Röntgenbild på ett implantat (regio 24). Fixturen sitter fint i benet. Ovanpå fixturen sitter en distans/krona, men det finns ett tydligt mörkt streck (en spalt/glipa) mellan kronan och fixturen, vilket indikerar att skruven gängat upp sig.

**Rätt Svar & Feedback:**
* **Diagnos:** Lossnad implantatskruv (Teknisk komplikation)
* **ICD-10:** T85.6 (Mekanisk komplikation av tandimplantat)
* **TLV-åtgärd:** 897 (Åtgärdande av tekniska implantatkomplikationer)
* **Klinisk Feedback:** Brist på smärta och en radiologisk spalt indikerar en skruvlossning, inte en fixturförlust. Åtgärd: Borra upp täckfyllningen (kompositen), nå skruven, inspektera att den inte är deformerad, och momentdra den med rätt torque (Ncm) enligt tillverkarens instruktioner (verifiera i journalen vilket system det är!).

---

### Fall 4.8: Tanden inuti kronan
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfarna
**Holistiskt perspektiv:** Bedömning av 'Ferrule' (omkramningsyta) och tandens långsiktiga överlevnad.

**Anamnes (Patientens ord):**
*"Min stifttand (12) trillade plötsligt ut när jag åt frukost. Hela metallpinnen och porslinet sitter ihop."*

**Klinisk Status & Fynd:**
* Kronan (MK) har lossnat. Inuti kronan sitter en gjuten pelare fast.
* Kvar i munnen (regio 12) finns en rotrest. Frakturen är horisontell och ligger i nivå med gingivan labialt, men 2 mm subgingivalt palatinalt.
* Sond passerar över rotkanten; ingen vertikal rotfraktur kan palperas. Rotfyllningen ser tät ut på röntgen (4 mm guttaperka kvar apikalt).

**[Bildinstruktion för AI]:** 
Kliniskt foto av överkäksfronten. Vid 12 finns bara en rotöppning (hål med en orange prick av guttaperka i mitten) precis i nivå med tandköttet. I en pincett bredvid syns en porslinskrona där en lång metallpelare (stift) sticker ut ur botten.

**Rätt Svar & Feedback:**
* **Diagnos:** Kronrotfraktur (Fraktur av stödtand/pelare)
* **ICD-10:** S02.5 (Kron-rotfraktur) alt K08.5
* **TLV-åtgärd:** Extraktion (701) ELLER Gingivektomi/Kronförlängning (404) + Ny pelare/krona.
* **Klinisk Feedback:** En svår bedömning. För att en ny pelare/krona ska hålla krävs en "ferrule-effekt" — minst 1.5-2 mm frisk tandsubstans runtom för kronan att krama om. Ligger frakturen djupt subgingivalt måste man antingen göra en kirurgisk kronförlängning, ortodontisk extrudering, eller extrahera och ersätta med implantat/bro.

---

### Fall 4.9: Den knäckta protesen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter
**Holistiskt perspektiv:** Analys av varför en protes går sönder för att undvika framtida recidiv.

**Anamnes (Patientens ord):**
*"Jag tappade min överkäksprotes i handfatet när jag tvättade den imorse, och den sprack rakt itu!"*

**Klinisk Status & Fynd:**
* Helprotes i överkäken, frakturerad i två halvor exakt längs mittlinjen.
* Frakturytorna är rena. När de hålls ihop passar de perfekt (ingen passformsdefekt).
* Patienten är helt tandlös i ÖK, och bär en äldre helprotes i UK. Slemhinnan i ÖK är frisk, utan decubitus.

**[Bildinstruktion för AI]:** 
Foto av en rosa akrylhelprotes för överkäken som ligger på en servett, spräckt i två exakta halvor rakt genom den rosa gommen. Delarna passar ihop utan att småbitar saknas.

**Rätt Svar & Feedback:**
* **Diagnos:** Protesfraktur (Slagfraktur)
* **ICD-10:** Z46.3 (Justering tandprotes) / K08.5
* **TLV-åtgärd:** 824 (Laga protes, avtryck behövs ej)
* **Klinisk Feedback:** Eftersom protesen tappats (slagfraktur) och delarna passar exakt, kan den skickas direkt till tandtekniker för reparation med kallakrylat utan att ett nytt avtryck behöver tas i munnen. (Hade den gått sönder i munnen vid tuggning hade det varit en utmattningsfraktur, vilket skvallrar om dålig passform = rebasering hade krävts).

---

### Fall 4.10: Zirkoniakronan på vift
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Materialkunskap vid recementering av modern höghållfast keramik.

**Anamnes (Patientens ord):**
*"Min nya, helvita krona på kindtanden (46) som jag fick för två månader sedan släppte plötsligt när jag tuggade segt godis."*

**Klinisk Status & Fynd:**
* Monolitisk zirkoniakrona regio 46 har lossnat intakt.
* Preparerad tand (46) är vital, ren och utan frakturer. Preparationshöjden (retentionscylindern) är dock ganska låg (ca 3 mm).
* Inuti kronan finns ett tunt lager transparent kompositcement kvar.

**[Bildinstruktion för AI]:** 
Kliniskt foto av en liten, helt vit (opak/monolitisk) krona. Insidan av kronan är ren. Tanden i munnen (46) är nedslipad men ser mycket "kort/låg" ut, vilket indikerar dålig mekanisk retention.

**Rätt Svar & Feedback:**
* **Diagnos:** Retentionsförlust av zirkoniakrona
* **ICD-10:** T85.6 (Mekanisk komplikation av tandersättning)
* **TLV-åtgärd:** 811 (Recementering)
* **Klinisk Feedback:** Zirkonia kan ibland cementeras med traditionellt cement (typ fosfatcement) om preparationen är retentiv (>4 mm hög). Här är preparationen låg, och konventionellt cement räcker inte. Kronan måste sandblästras med aluminiumoxid inuti (för mikromekanisk retention), primas (med t.ex. MDP-primer) och därefter BONDAS fast med ett resincement för att säkerställa att den sitter kvar.

---

## Område 5: Oralmedicin

### Fall 5.1: Blåsan som svider
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag får alltid såna här vita blåsor på insidan av läppen när jag stressar mycket. Det svider som eld när jag äter citrusfrukter."*

**Klinisk Status & Fynd:**
* Ett 4 mm stort, runt sår i slemhinnan på insidan av underläppen. 
* Centralt gulvit fibringräns med en tydlig röd, inflammerad halo (ring) runtomkring. Palpationsöm.

**[Bildinstruktion för AI]:** (Denna bild har genererats i systemet - en tydlig afte-blåsa med gulvitt centrum och illröd ring på underläppens insida).

**Rätt Svar & Feedback:**
* **Diagnos:** Recidiverande aftös stomatit (Afte / Minor aphthous ulcer)
* **TLV-åtgärd:** 311 (Information) ev recept på lindrande salva (t.ex. Andolex/Aftamed)
* **Klinisk Feedback:** Mycket vanligt. Aftösa sår är självläkande inom 10-14 dagar. Behandlingen är enbart symtomatisk. Rådgivning att byta till Zendium (sls-fri tandkräm) kan minska frekvensen. (ICD-bonus: K12.0)

### Fall 5.2: Det vita nätverket
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Min tandhygienist sa att jag hade vita streck i kinderna för ett år sedan. Nu har det börjat svida lite när jag äter stark mat."*

**Klinisk Status & Fynd:**
* Bilaterala, nätformiga vitaktiga striae (Wickhams striae) i kindslemhinnan.
* På höger sida finns även ett litet rött, erosivt område centralt i nätverket. Lätt palpationsömhet.

**[Bildinstruktion för AI]:** Kliniskt foto av insidan på en kind. Slemhinnan har ett spindelnätsliknande vitt mönster (striae). I mitten av nätet finns ett rödare, något irriterat område.

**Rätt Svar & Feedback:**
* **Diagnos:** Oral Lichen Planus (Retikulär med erosivt inslag)
* **TLV-åtgärd:** 301 (Biopsi om oklar/för diagnos) + Symtomatisk behandling (kortisonsalva)
* **Klinisk Feedback:** Lichen är en kronisk autoimmun reaktion. Den erosiva formen kräver övervakning då det finns en marginell premalign potential. Vid besvär (svida) skrivs lokalt verkande kortison (t.ex. Dermovat) ut. (ICD-bonus: L43.8)

### Fall 5.3: Såret som aldrig läker
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfarna / Oralmedicinare

**Anamnes (Patientens ord):**
*"Jag har haft ett skavsår på sidan av tungan i över två månader nu. Jag trodde det var från en tand, men det försvinner inte och har börjat blöda lite ibland. Jag har rökt i 40 år."*

**Klinisk Status & Fynd:**
* En ca 1,5 cm stor sårnad på tungans laterala rand.
* Kanterna är upphöjda, vallartade och hårda vid palpation (indurerade). Inga uppenbart vassa tänder i området. 
* Svullen, oöm lymfkörtel palperas submandibulärt.

**[Bildinstruktion för AI]:** Kliniskt foto av tungans sida. Ett oregelbundet, djupare sår med hårda, upphöjda vallartade kanter. Rött i botten med vissa vita stråk. 

**Rätt Svar & Feedback:**
* **Diagnos:** Misstänkt Skivepitelcancer
* **TLV-åtgärd:** SVF-remiss (Standardiserat vårdförlopp) till Käkkirurg / ÖNH OMEDELBART
* **Klinisk Feedback:** En indurerad ulceration som suttit i >3 veckor utan förklaring, särskilt hos en rökare, SKA alltid handläggas som misstänkt malignitet. Skicka remiss enligt SVF samma dag, ta INTE egen biopsi på allmänpraktik i detta skede. Livsviktig bedömning! (ICD-bonus: C02.3)

### Fall 5.4: Den vita beläggningen
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Jag avslutade precis en tung penicillinkur för min lunginflammation. Nu känns munnen brännande, och det ser ut som att jag har keso på tungan och i gommen."*

**Klinisk Status & Fynd:**
* Mjuka, vita, plack-liknande beläggningar över hela gommen och tungryggen.
* Beläggningarna GÅR att skrapa bort med en spatel, vilket lämnar en ilsket röd och lätt blödande yta.

**[Bildinstruktion för AI]:** Kliniskt foto av en gom. Kraftiga vita "ostiga" beläggningar utspridda över slemhinnan. På ett ställe har det skrapats bort och avslöjar en ilsket röd yta.

**Rätt Svar & Feedback:**
* **Diagnos:** Pseudomembranös Candidos (Oral svampinfektion)
* **TLV-åtgärd:** 301 (Odling om osäker) + Recept på Antimykotika (t.ex. Mycostatin)
* **Klinisk Feedback:** Antibiotikabehandling slår ut normalfloran och låter svampen (Candida) växa till. Att det går att skrapa bort är klassiskt för den pseudomembranösa varianten. Skriv ut antimykotiskt munskölj och råd om noggrann renhållning (exklusive att skrapa sönder slemhinnan!). (ICD-bonus: B37.0)

### Fall 5.5: Landskapstungan
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Min tunga byter mönster hela tiden! Ibland ser det ut som en karta. Det gör inte ont, men det ser väldigt märkligt ut."*

**Klinisk Status & Fynd:**
* Tungryggen uppvisar flertalet röda, depapillerade områden som omges av markerade, lätt upphöjda gul-vita zoner (kanter).
* Lesionerna migrerar över tid.

**[Bildinstruktion för AI]:** Kliniskt foto av en utsträckt tunga. Mönstret liknar en karta med röda, släta "öar" som omringas av vita, vågiga gränser.

**Rätt Svar & Feedback:**
* **Diagnos:** Lingua Geographica (Benign migrerande glossit)
* **TLV-åtgärd:** 311 (Information/Lugnande besked)
* **Klinisk Feedback:** En helt ofarlig, medfödd/idiopatisk variant av tungans utseende. Ingen behandling krävs förutom att upplysa och lugna patienten. Kan svida vid stark mat, i så fall undviks triggerfödan. (ICD-bonus: K14.1)

---

### Fall 5.6: Feber och blåsor
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Bedömning av allmäntillstånd vid akut oral virusinfektion och vikten av nutrition hos barn.

**Anamnes (Förälders ord):**
*"Min 3-årige son har haft 39 grader feber i två dagar. Han gråter oavbrutet, vägrar äta eller dricka, och hela hans mun verkar vara full av blåsor."*

**Klinisk Status & Fynd:**
* Ilsket röd och svullen gingiva.
* Multipla brustna blåsor och ytliga, gulaktiga sår spridda över rörlig slemhinna, palatum durum och gingiva. 
* Krustabildning på läpparna. Barnet verkar slött (tecken på dehydrering).

**[Bildinstruktion för AI]:** 
Kliniskt foto av ett litet barns mun. Kraftigt rodnat och svullet tandkött (gingivit). Flera små gulaktiga sår med röda kanter spridda över både läppar, tunga och i gommen.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut Primär Herpetisk Gingivostomatit (HSV-1)
* **ICD-10:** B00.2
* **TLV-åtgärd:** 311 (Information/Rådgivning) + Recept på Ytanestetika
* **Klinisk Feedback:** En extremt smärtsam förstagångsinfektion. Kritiskt här är att säkerställa vätskeintaget så barnet inte dehydreras! Förskriv ytanestetika (Lidokain gel) att pensla försiktigt före måltid. Informera om smittorisk. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 5.7: Den röda plattan
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist / Erfaren
**Holistiskt perspektiv:** Tidig upptäckt av premaligna slemhinneförändringar (erytroplaki) där det ruttna syns men inte känns.

**Anamnes (Patientens ord):**
*"Jag har haft lite sveda under tungan i en månad. Jag snusar en dosa om dagen och tar gärna ett par öl på kvällen, men annars är jag frisk."*

**Klinisk Status & Fynd:**
* I munbotten (sublingualt) syns en intensivt röd, oregelbunden och sammetsliknande förändring, ca 15 mm i diameter.
* Inga öppna sår. Vid palpation känns ytan lätt stum jämfört med omgivande vävnad.
* Inga palpabla lymfkörtlar.

**[Bildinstruktion för AI]:** 
Kliniskt foto av munbotten under tungan. En intensivt röd, välavgränsad och sammetsliknande fläck (erytroplaki) ligger tätt mot slemhinnan. Inga uppenbara sår.

**Rätt Svar & Feedback:**
* **Diagnos:** Erytroplaki (Malignitetssuspekt)
* **ICD-10:** K13.7 (Andra förändringar i munslemhinnan) / Z03.1
* **TLV-åtgärd:** SVF-remiss OMEDELBART till Käkkirurg/ÖNH
* **Klinisk Feedback:** Erytroplakier är de farligaste förändringarna i munslemhinnan; över 50% visar grav dysplasi eller invasiv skivepitelcancer vid biopsi. Du ska INTE ta biopsin själv, skicka direkt enligt SVF (Standardiserat vårdförlopp)! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 5.8: Det växande tandköttet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Läkemedelsbiverkningars direkta manifestation intraoralt och interprofessionell samverkan.

**Anamnes (Patientens ord):**
*"Tandköttet växer helt vilt! Det täcker ju nästan tänderna och jag har jättesvårt att borsta rent. Jag fick en ny medicin för mitt blodtryck för sex månader sedan."*

**Klinisk Status & Fynd:**
* Kraftig, generaliserad förstoring av gingivan, framförallt i underkäksfronten.
* Vävnaden är fast, lobulerad och blekrosa. 
* Pseudofickor på upp till 6-7 mm. Minimal blödning vid sondering (BOP).

**[Bildinstruktion för AI]:** 
Intraoralt foto frontalt. Tandköttet är extremt bulligt och växer upp långt över tandkronorna, så att bara hälften av tänderna är synliga. Tandköttet är blekrosa och knöligt, inte ilsket rött.

**Rätt Svar & Feedback:**
* **Diagnos:** Läkemedelsinducerad gingival överväxt (DIGO)
* **ICD-10:** K06.1
* **TLV-åtgärd:** 341 (Parodontal behandling/Depuration) + Läkarkontakt
* **Klinisk Feedback:** Klassiskt för kalciumflödeshämmare (t.ex. Amlodipin) eller antiepileptika (Fenytoin). Kausal behandling är att kontakta behandlande läkare för eventuellt preparatbyte. Under tiden krävs rigorös infektionskontroll och depuration från din sida. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 5.9: Blixten i ansiktet
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfaren
**Holistiskt perspektiv:** Differentialdiagnostik mellan odontogen tandvärk och neurologisk smärta för att undvika överbehandling.

**Anamnes (Patientens ord):**
*"Det hugger till som en extrem elektrisk stöt i min hörntand (43) när jag sminkar kinden. Smärtan är helt fruktansvärd, jag rycker till, men den försvinner helt efter ett par sekunder."*

**Klinisk Status & Fynd:**
* Tand 43 är intakt, kariesfri, positiv vid kyla och oöm för perkussion.
* Lätt, fjäderlätt beröring av huden på höger kind (triggerzon) utlöser genast en ny blixtrande smärtattack som får patienten att stelna till.

**[Bildinstruktion för AI]:** 
(Ingen specifik klinisk bild behövs för neuralgi, men en bild av en helt frisk och kariesfri underkäksfront kan visas, eller en bild utifrån där patienten med ångest döljer kinden).

**Rätt Svar & Feedback:**
* **Diagnos:** Trigeminusneuralgi (Klassisk)
* **ICD-10:** G50.0
* **TLV-åtgärd:** Remiss till läkare (Neurolog eller Smärtklinik)
* **Klinisk Feedback:** En typisk klinisk fälla där patienten ibland ber om extraktion av "den onda tanden". Närvaron av en extraoral triggerzon och smärtans karaktär (elektrisk, kortvarig stöt) pekar direkt på neuralgi. Behandlas farmakologiskt av läkare (ofta Karbamazepin). Rör inte tanden! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 5.10: Smärtan i tentaperioden
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av akuta parodontala/gingivala infektioner drivna av livsstilsfaktorer.

**Anamnes (Patientens ord):**
*"Jag har suttit och pluggat dygnet runt inför en tenta. Nu har jag extremt ont i tandköttet, det smakar järn och blöder bara jag tittar på det. Jag har rökt mycket mer än vanligt de senaste veckorna."*

**Klinisk Status & Fynd:**
* Interdentalpapillerna i underkäksfronten är utstansade/inverterade (avhuggna).
* Papillerna är täckta av ett gråvitt pseudomembranöst lager (nekros).
* Kraftig spontanblödning, uttalad foetor ex ore (dålig andedräkt) och patienten är subfebril.

**[Bildinstruktion för AI]:** 
Närbild på underkäksfrontens tandkött. Papillerna (tandköttstopparna mellan tänderna) saknas, ser "avhuggna" ut, och är täckta av ett gråvitt klet. Runtom är gingivan ilsket röd och det blöder ymnigt.

**Rätt Svar & Feedback:**
* **Diagnos:** Nekrotiserande gingivit (NG / ANUG)
* **ICD-10:** K05.10
* **TLV-åtgärd:** 341 (Försiktig akut debridering) + Klorhexidin
* **Klinisk Feedback:** Stress, sömnbrist och rökning är kardinalfaktorer. Akutbehandla med extremt varsam, ytlig rengöring (exempelvis med bomullspellets dränkta i väteperoxid) och förskriv klorhexidinsköljning. Ordinera rökstopp och boka in akut återbesök! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

## Område 6: Käkkirurgi

### Fall 6.1: Den förstörda tanden
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Min tand (24) sprack förra året. Nu har hela kronan smulat sönder och bara roten är kvar. Det gör inte ont."*

**Klinisk Status & Fynd:**
* 24: Endast rötter kvar i gingivalnivå. Mjuk karies i rotytan.
* Röntgen: Ingen apikal parodontit. Raka, koniska rötter.

**[Bildinstruktion för AI]:** Intraoralt foto. En rotrest (utan krona) syns precis i tandköttskanten i överkäkens premolarområde. Tandköttet runtom är lätt rött.

**Rätt Svar & Feedback:**
* **Diagnos:** Karies (Omfattande substansförlust) / Radix relicta
* **TLV-åtgärd:** 401 (Enkel tandextraktion)
* **Klinisk Feedback:** En asymtomatisk rotrest med omöjlig protetisk prognos bör extraheras. En enkel extraktion med hävel räcker oftast här. (ICD-bonus: K02.9)

### Fall 6.2: Visdomstanden som bråkar
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Jag får ont längst bak i underkäken (höger sida) varannan månad. Det svullnar upp och smakar var. Nu har jag svårt att öppna munnen helt."*

**Klinisk Status & Fynd:**
* 48 är semi-retinerad (halvt frambrottad). En rodnad, svullen slemhinneflik (operculum) täcker distala halvan av kronan. Pus tränger fram vid palpation.
* Inskränkt gapförmåga (trismus).
* Röntgen: 48 är mesio-angulerad. Rötterna är färdigbildade och ligger nära canalis mandibulae.

**[Bildinstruktion för AI]:** Panorama- eller apikalröntgen. Tand 48 lutar framåt (mesio-angulerad) mot tand 47. Slemhinnan täcker halva tanden.

**Rätt Svar & Feedback:**
* **Diagnos:** Perikoronit
* **TLV-åtgärd:** 402/403 (Operativt avlägsnande av retinerad tand) alt 302 (Spolning initialt)
* **Klinisk Feedback:** Återkommande perikoroniter är den absolut vanligaste indikationen för borttagande av visdomständer. Pga anguleringen och benomslutningen krävs ett operativt ingrepp. (ICD-bonus: K05.2)

### Fall 6.3: Benet som ligger bart
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist / Käkkirurg

**Anamnes (Patientens ord):**
*"Du drog ut min tand (36) för sex månader sedan. Det har fortfarande inte läkt och nu ser jag något hårt, vitt nere i hålet. Jag får Prolia mot min benskörhet."*

**Klinisk Status & Fynd:**
* Ett ca 1x1 cm stort område med exponerat, nekrotiskt ben i regio 36.
* Runtomkring är slemhinnan svullen och smärtande.
* Medicinering: Prolia (Denosumab) s.c. 2 ggr/år.

**[Bildinstruktion för AI]:** Intraoralt foto i underkäken. En defekt i tandköttet där man tydligt ser ett skrovligt, gult/vitt dött ben sticka fram. Rött och infekterat runtom.

**Rätt Svar & Feedback:**
* **Diagnos:** MRONJ (Läkemedelsrelaterad osteonekros i käken)
* **TLV-åtgärd:** SVF-remiss / Remiss till Käkkirurg (Konservativ/kirurgisk behandling)
* **Klinisk Feedback:** Patienter på antiresorptiv behandling (Prolia) löper hög risk för osteonekros vid extraktion. Förebyggande bedömning innan extraktion är avgörande. Kräver specialistvård (avlägsnande av sekvester, spoldränage). (ICD-bonus: M27.8)

### Fall 6.4: Blödningen som inte slutar
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Jag fick dra en tand imorse. Nu ikväll blöder det fortfarande jättemycket från hålet. Jag tar Eliquis för hjärtat."*

**Klinisk Status & Fynd:**
* Patienten har en stor "leverkoagel" (mörk, geléartad klump) i alveolen. När den tas bort sipprar färskt blod från botten av alveolen.
* Medicinering: Eliquis (DOAK).

**[Bildinstruktion för AI]:** Kliniskt foto (närbild). En nyligen dragen tand där hålet (alveolen) svämmar över av en mörkröd, blank blodkoagel ("leverkoagel") som rinner över på intilliggande tänder.

**Rätt Svar & Feedback:**
* **Diagnos:** Postoperativ blödning (Iatrogen/Sekundär)
* **TLV-åtgärd:** 302 (Kirurgisk sårbehandling: spongostan + sutur)
* **Klinisk Feedback:** Hos patienter med antikoagulantia ska extraktioner alltid avslutas med lokal hemostas (Spongostan + suturering). Behandling nu: Sug rent koaglet, tvätta, applicera hemostatikum och suturera tätt. Komprimera i 30 min. (ICD-bonus: T81.0)

### Fall 6.5: Det tomma hålet
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag drog ut en tand (46) för tre dagar sedan. Det slutade göra ont först, men nu har jag en dunkande värk som sprider sig till örat. Det smakar riktigt illa."*

**Klinisk Status & Fynd:**
* Alveolen saknar blodkoagel ("tomt hål").
* Benväggarna i alveolen är exponerade och extremt känsliga vid beröring med sond. Dålig andedräkt.

**[Bildinstruktion för AI]:** Intraoralt foto av en extraktionsalveol. Istället för en mörk blodpropp är hålet grått/vitt och tomt, benväggarna syns inuti hålet.

**Rätt Svar & Feedback:**
* **Diagnos:** Alveolarosteit (Dry socket / Alveolit)
* **TLV-åtgärd:** 302 (Akut behandling) alt 311 (Information/Spolning)
* **Klinisk Feedback:** Koaglet har brutits ner i förtid. Smärtan är extrem. Behandlingen går ut på att lindra smärtan genom spolning med klorhexidin och applicering av smärtstillande inlägg (t.ex. Alveogyl/Terracortril-polymyxin B). (ICD-bonus: K10.3)

---

### Fall 6.6: Bubblorna i alveolen
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Bedömning av oroantral kommunikation och viktiga hemgångsråd för att undvika sinuit.

**Anamnes (Patientens ord):**
*"Du drog precis ut min kindtand i överkäken (16). Nu när jag andas känns det som att det pyser eller bubblar i hålet där tanden satt."*

**Klinisk Status & Fynd:**
* Alveol 16 efter extraktion. Tanden hade långa rötter med nära relation till sinus.
* Valsalvas test utförs (patienten blåser mot stängd näsa): Tydliga luftbubblor och ett pysande ljud hörs från alveolen.
* Ingen rotrest synlig på röntgen.

**[Bildinstruktion för AI]:** 
Kliniskt foto av en extraktionsalveol i överkäken. Inuti det blodiga hålet syns små luftbubblor som bildas när patienten andas, vilket tyder på en öppning till bihålan.

**Rätt Svar & Feedback:**
* **Diagnos:** Sinuskommunikation (Oroantral kommunikation)
* **ICD-10:** T81.8 (Komplikation till kirurgiskt ingrepp)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling - Suturering)
* **Klinisk Feedback:** En klassisk komplikation vid extraktion i ÖK-molaren. Åtgärd: Lägg en tät kryssutur för att hålla koaglet på plats. Viktigast är hemgångsråden: SNYTFÖRBUD i 14 dagar (minska trycket) och nässpray (Nezeril) för att hålla bihålan ventilerad. Antibiotikaprofylax (Amimox) ges ofta vid säkerställd kommunikation. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 6.7: Den "för långa" bedövningen
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfaren / AT-tandläkare
**Holistiskt perspektiv:** Identifiering och hantering av nervpåverkan efter kirurgiskt trauma.

**Anamnes (Patientens ord):**
*"Det har gått två dagar sedan ni opererade bort min visdomstand i underkäken (48), men bedövningen har fortfarande inte släppt i halva läppen och hakan. Det sticker och pirrar lite grann."*

**Klinisk Status & Fynd:**
* Operationsområdet 48 ser fint ut, ingen kraftig svullnad eller tecken på infektion.
* Sensibilitetstest med trubbig sond: Patienten har nedsatt känsel (hypestesi) i höger sida av underläppen och hakan. Tungan har normal känsel.
* Röntgen (preoperativt) visade att rötterna på 48 låg i direkt kontakt med mandibularkanalen.

**[Bildinstruktion för AI]:** 
En schematisk bild av ansiktet där området för N. alveolaris inferior (halva hakan och underläppen) är markerat med en skuggning för att indikera känselbortfall.

**Rätt Svar & Feedback:**
* **Diagnos:** Nervpåverkan (Parestesi/Hypestesi av N. alveolaris inferior)
* **ICD-10:** T81.8 (Komplikation till ingrepp)
* **TLV-åtgärd:** 301 (Kartläggning och rådgivning)
* **Klinisk Feedback:** Nervpåverkan beror ofta på mekaniskt trauma eller tryck från hematom/ödem efter visdomstansoperation. Kartlägg utbredningen noggrant i journalen. Informera patienten om att det oftast är reversibelt men kan ta månader. Varna för bitskador och brännskador (kaffe) då skyddsreflexen saknas! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 6.8: Benet som rör sig
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av oavsiktlig benfraktur vid molar-extraktion i överkäken.

**Anamnes (Patientens ord):**
*"Jag kände hur det knäppte till i hela käken när du tog i med tången för att dra ut min sista tand (28). Nu känns det som att en stor bit av benet följer med tanden."*

**Klinisk Status & Fynd:**
* Vid luxation av 28 (ÖK-molar) rör sig hela benpartiet bakom tanden (Tuber maxillae) synkront med tanden.
* Frakturen verkar omfatta hela tubern.
* Kraftigt motstånd och tecken på att en stor benbit är på väg att lossna.

**[Bildinstruktion för AI]:** 
Kliniskt foto eller illustration. En extraktionstång greppar en visdomstand i överkäken, och man ser tydligt hur slemhinnan och benet bakom tanden (tuber-området) lyfter/rör sig i ett stycke.

**Rätt Svar & Feedback:**
* **Diagnos:** Tuberfraktur
* **ICD-10:** S02.4 (Fraktur på överkäken/alveolarutskottet)
* **TLV-åtgärd:** 301 (Reponering) alt 401/404 (Extraktion med plastik)
* **Klinisk Feedback:** STOPP! Om du känner att hela tubern rör sig ska du inte fortsätta bryta, då riskerar du en massiv blödning och stor sinuskommunikation. Om frakturen är stor: Reponera tanden/benet, stabilisera (ev. splinta) och låt läka i 4-6 veckor innan tanden tas ut operativt. Om den är liten: Lossa försiktigt från mjukvävnaden och ta ut fragmentet. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 6.9: Roten som försvann
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfaren / Specialist
**Holistiskt perspektiv:** Krishantering vid dislocerad rot och vikten av att inte "leta i blindo".

**Anamnes (Patientens ord):**
*"Hoppsan, nu slant du med instrumentet. Jag hörde ett litet klick och nu säger du att roten är borta? Jag känner inget speciellt."*

**Klinisk Status & Fynd:**
* Under försök att avlägsna en palatinal rotspets på 26 (ÖK-molar) försvann fragmentet plötsligt från sikte.
* Alveolen är tom. Valsalvas test är positivt.
* Röntgen (apikalbild) visar att rotfragmentet nu ligger fritt inuti sinus maxillaris, en bit ovanför alveolen.

**[Bildinstruktion för AI]:** 
Röntgenbild (apikal) av överkäken. Alveolen efter en tand syns, men ovanför benkanten, inuti det mörka bihålerummet, ligger en liten tydlig vit rotspets.

**Rätt Svar & Feedback:**
* **Diagnos:** Dislocerad rot till sinus maxillaris
* **ICD-10:** T81.8 (Komplikation vid ingrepp)
* **TLV-åtgärd:** Remiss till Käkkirurg
* **Klinisk Feedback:** Gräv aldrig i blindo! Det trycker bara roten djupare. Bekräfta läget med röntgen. Stäng kommunikationen initialt med en sutur, sätt in antibiotika/nässpray och remittera till käkkirurg för avlägsnande (Caldwell-Luc). En rot som lämnas kvar i sinus orsakar nästan alltid kronisk sinuit. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 6.10: Den bultande värken dag 3
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter / AT-tandläkare
**Holistiskt perspektiv:** Differentiering mellan normal postop-smärta och alveolit.

**Anamnes (Patientens ord):**
*"Jag drog ut en tand för tre dagar sedan. Det kändes bra först, men igår började det bulta och värka något fruktansvärt. Det smakar riktigt illa i munnen också."*

**Klinisk Status & Fynd:**
* Extraktionsalveol regio 46. Blodkoaglet saknas helt (tom alveol).
* Grått, nekrotiskt ben är synligt i botten. Ingen svullnad, ingen feber, ingen pus vid palpation.
* Extrem smärta när man nuddar benet med en sond.

**[Bildinstruktion för AI]:** 
Foto av en "dry socket". Ett hål i tandköttet där man ser grått/gult ben istället för en mörk blodlever. Tandköttet runtomkring är rodnat.

**Rätt Svar & Feedback:**
* **Diagnos:** Alveolit (Dry Socket)
* **ICD-10:** K10.3 (Alveolit i käkarna)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling - Spolning och tamponad)
* **Klinisk Feedback:** En läkningsstörning (fibrinolys) där koaglet lösts upp. Behandling: Spola försiktigt rent med koksalt. Skrapa ALDRIG (det sprider infektionen djupare i benet!). Applicera en tamponad med Terracortril-Polymyxin B och Xylocain för omedelbar smärtlindring. Självläkande men kräver symtomlindring. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

## Område 7: Bettfysiologi

### Fall 7.1: God morgon-huvudvärken
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*"Jag vaknar ofta med en molande huvudvärk över tinningarna. Det känns som att mina käkmuskler är trötta på morgonen."*

**Klinisk Status & Fynd:**
* Tänderna i fronten uppvisar incisala slitageskador (attrition).
* Måttlig ömhet vid palpation av m. masseter och m. temporalis bilateralt.
* Käkleden är ua. Gapförmåga ua.

**[Bildinstruktion för AI]:** Kliniskt foto av patientens tänder. Fronttänderna i uk är nedslitna till en jämn, platt linje.

**Rätt Svar & Feedback:**
* **Diagnos:** Sömnbruxism med myalgi
* **TLV-åtgärd:** 813 (Stabiliseringsskena)
* **Klinisk Feedback:** Klassiska symtom på nattlig tandgnissling/pressning. En hård stabiliseringsskena (bettskena) i överkäken avlastar musklerna och skyddar tänderna mot ytterligare slitage. (ICD-bonus: F45.8 / K08.8)

### Fall 7.2: Svårt att tugga
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Det gör väldigt ont i mina kinder när jag tuggar seg mat eller pratar länge. Smärtan strålar ibland upp mot öronen."*

**Klinisk Status & Fynd:**
* Kraftig ömhet i m. masseter och m. pterygoideus medialis. Smärtan reproduceras vid provokation (tugga på spatel).
* Gapförmåga 35 mm (smärtbegränsad). Mjukt end-feel.

**[Bildinstruktion för AI]:** (Behövs ej bild, klinisk manifestation bygger på anamnes).

**Rätt Svar & Feedback:**
* **Diagnos:** Myofasciell smärta
* **TLV-åtgärd:** 311 (Käkmuskelgymnastik/Information) ev 813
* **Klinisk Feedback:** Muskelsmärta från överbelastning. Initial behandling består av rådgivning, egenvård (rörelseträning, värme, mjuk kost) och eventuellt en bettskena om symtomen är nattligt relaterade. (ICD-bonus: M79.1)

### Fall 7.3: Skrapet i örat
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist/Erfaren

**Anamnes (Patientens ord):**
*"Sedan några år tillbaka låter det som knarrande kramsnö i vänster öra när jag tuggar. Det gör ont när jag äter hårda äpplen."*

**Klinisk Status & Fynd:**
* Tydliga krepitationer (knarrande/grusigt ljud) palperas i vänster käkled vid gapning och stängning.
* Smärta från vänster käkled (artralgi). Långsamt progressiv minskning av gapförmågan.

**[Bildinstruktion för AI]:** CBCT/Panorama-bild av käkleden (processus condylaris). Ledhuvudet är tillplattat och uppvisar subkondrala cystor och osteofyter ("näbb-bildning").

**Rätt Svar & Feedback:**
* **Diagnos:** Artros i käkleden (Degenerativ ledsjukdom)
* **TLV-åtgärd:** 311 (Rörelseträning/Information), ev bettskena, ev NSAID
* **Klinisk Feedback:** Krepitationer = bendestruktion/artros. Behandlingen syftar till smärtlindring och bibehållen rörlighet, inte till att 'bota' leden. Kirurgi är mycket sällsynt och endast sista utvägen. (ICD-bonus: M19.9)

### Fall 7.4: Knäppet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patientens ord):**
*"Käken klickar högt på höger sida varje gång jag öppnar munnen stort för att äta en hamburgare. Ingen smärta alls, men det är störande."*

**Klinisk Status & Fynd:**
* Palpabelt och hörbart klickljud ("knäpp") från höger TMJ vid ca 25 mm gapning. Vid stängning hörs ett svagare klick.
* Ingen smärta från led eller muskulatur. Normal gapförmåga (45 mm).

**[Bildinstruktion för AI]:** (Behövs ej).

**Rätt Svar & Feedback:**
* **Diagnos:** Diskomplacering med återgång
* **TLV-åtgärd:** 311 (Information/Lugnande besked)
* **Klinisk Feedback:** En diskomplacering MED återgång (därav klicket när disken hamnar rätt) SOM ÄR asymtomatisk kräver ingen behandling. Undvik extrema gapningar. Rätt handlagt att avvakta! (ICD-bonus: K07.6)

### Fall 7.5: Låsningen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patientens ord):**
*(Patienten kommer in akut och pekar på munnen, kan inte prata tydligt eftersom munnen är öppen).* *"Jah gaapahd fhhör shtoort oh nnnu fåår jähj innte ihhoop dään!"*

**Klinisk Status & Fynd:**
* Patienten sitter med öppen mun (maxgap). Underkäken är framskjuten.
* Hård, muskulär spasm. Patienten är panikslagen.

**[Bildinstruktion för AI]:** (Behövs ej - kliniskt självklart).

**Rätt Svar & Feedback:**
* **Diagnos:** Akut käkluxation (Bilateral)
* **TLV-åtgärd:** 302 (Akut reponering)
* **Klinisk Feedback:** Kondylerna har glidit framför tuberkulum articulare och fastnat. Reponering genom "Hippokrates manöver" (tummar på molarerna, pressa neråt och bakåt). Efteråt: mjuk kost och gapa försiktigt! (ICD-bonus: S03.0)

---

### Fall 7.6: Fastnat i gäspningen
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av akuta käkledsluxationer och vikten av snabb reponering för att minska patientens ångest och muskelspasm.

**Anamnes (Patientens ord):**
*"Jag satt och gäspade stort framför TV:n, och plötsligt sa det 'klonk' och nu kan jag inte stänga munnen! Det gör jätteont och jag kan inte prata ordentligt."*

**Klinisk Status & Fynd:**
* Patienten sitter med öppen mun och kan inte stänga. Hakan pekar rakt fram (bilateral luxation).
* Tomma ledskålar kan palperas framför tragus. Kondylerna känns som bulor framför ledkullen.
* Kraftig muskelspänning i m. masseter.

**[Bildinstruktion för AI]:** 
Profilbild av en patient som sitter med munnen fixerad i vidöppet läge. Man kan se en tydlig fördjupning precis framför örat där ledhuvudet normalt ska sitta.

**Rätt Svar & Feedback:**
* **Diagnos:** Käkledsluxation (Bilateral)
* **ICD-10:** S03.0 (Käkledsluxation)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling - Reponering)
* **Klinisk Feedback:** Akut åtgärd krävs! Använd Hippokrates metod: Tummar inlindade i kompresser på molarerna, tryck kraftigt NEDÅT och sedan BAKÅT för att få kondylen under ledkullen. Tips: Om det sitter hårt, ge 5 mg Diazepam (Stesolid) p.o. först för att bryta spasmen (kolla kontraindikationer!). *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 7.7: Käken som slog bakut
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Förståelse för hur intraartikulärt ödem påverkar ocklusionen och vikten av att inte slipa på tänderna i onödan.

**Anamnes (Patientens ord):**
*"Jag fick en smäll mot hakan under en fotbollsmatch igår. Nu gör det jätteont framför vänster öra och när jag biter ihop känns det som att tänderna bara tar i på vänster sida längst bak. På höger sida når de inte varandra alls!"*

**Klinisk Status & Fynd:**
* Palpationsömhet lateralt över vänster käkled.
* Gapförmågan är inskränkt till 32 mm p.g.a. smärta.
* Bettanalys: Prematurkontakt på molarerna på vänster sida (ipsilateral kontakt). Tydligt öppet bett på höger sida. Inga tecken på collumfraktur (kan föra käken åt sidorna).

**[Bildinstruktion för AI]:** 
Intraoral bild som visar patientens bett. På vänster sida (där smärtan sitter) tar tänderna ihop, men på höger sida syns en tydlig glipa mellan över- och underkäkens tänder.

**Rätt Svar & Feedback:**
* **Diagnos:** Traumatisk Artrit med intraartikulärt ödem
* **ICD-10:** M26.6 (Käkledsbesvär/Traumatisk artrit)
* **TLV-åtgärd:** 301 (Rådgivning och exspektans)
* **Klinisk Feedback:** Svullnaden inuti leden (ödemet) trycker ner ledhuvudet, vilket ger den ensidiga molarprematurkontakten. SLIPA ALDRIG på tänderna nu! Bettet återgår när svullnaden lägger sig. Ordinera skonkost och NSAID (Naproxen/Ibuprofen) i 10 dagar för att dämpa inflammationen. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 7.8: Den falska tandvärken
**Svårighetsgrad:** Advanced
**Målgrupp:** Erfaren
**Holistiskt perspektiv:** Differentialdiagnostik mellan dental och muskulär smärta för att undvika onödiga rotbehandlingar.

**Anamnes (Patientens ord):**
*"Jag har en sån fruktansvärd, bultande värk i mina tänder i överkäken på höger sida. Det känns som att det sitter i alla kindtänderna. Det värker också upp mot tinningen. Jag kan inte sova på nätterna."*

**Klinisk Status & Fynd:**
* Tänderna 14, 15, 16, 17 är intakta, kariesfria och har normal sensibilitet och perkussion. Inga apikala förändringar på röntgen.
* Vid palpation av främre kanten på m. temporalis (vid tinningen och ner mot processus coronoideus) strålar smärtan direkt ner i tänderna i överkäken.
* Patienten pressar tänder under stressiga perioder.

**[Bildinstruktion för AI]:** 
En anatomisk bild som visar m. temporalis och hur smärtan från muskelns senfäste (processus coronoideus) refereras/strålar ner som "tandvärk" till överkäkens tänder.

**Rätt Svar & Feedback:**
* **Diagnos:** Temporalistendinit (Refererad muskelvärk)
* **ICD-10:** M79.1 (Myalgi)
* **TLV-åtgärd:** 301 (Diagnostisk blockad) / 302 (Rörelseträning)
* **Klinisk Feedback:** En klassisk "fälla"! Lägg en diagnostisk lokalanestesi vid temporalissenans fäste. Om "tandvärken" försvinner är orsaken muskulär. Rotbehandla INTE tänderna! Behandling: Rörelseträning (töjning), skonkost och ev. bettskena. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 7.9: Låsningen på morgonen
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Igenkänning av akut diskförskjutning utan återgång och dess kliniska kännetecken.

**Anamnes (Patientens ord):**
*"Jag vaknade i morse och kunde plötsligt inte gapa! Det tog bara stopp. Jag har haft knäppningar i käken förut men nu är de helt borta, istället tar det bara stopp när jag försöker öppna munnen."*

**Klinisk Status & Fynd:**
* Maxgap: 24 mm med ett tydligt "hårt stopp" (Hard end-feel).
* Vid gapförsök devierar (drar) underkäken åt höger sida (deflektion).
* Patienten kan föra underkäken åt vänster sida men inte åt höger.

**[Bildinstruktion för AI]:** 
Frontal bild av en patient som försöker gapa så stort som möjligt. Man ser att gapet är litet och att hakan drar tydligt åt ena sidan (höger i detta fall) istället för att gå rakt ner.

**Rätt Svar & Feedback:**
* **Diagnos:** Akut Käkledslåsning (Diskförskjutning utan återgång)
* **ICD-10:** K07.6 (Käkledsbesvär)
* **TLV-åtgärd:** 301 (Manuell distraktion) / 302 (Rörelseträning)
* **Klinisk Feedback:** Disken har lagt sig framför ledhuvudet och blockerar translationen på höger sida. Därav deflektionen åt den sjuka sidan. Försök med manuell distraktion (töjning) för att "låsa upp" leden. Ordinera flitig rörelseträning för att tänja ut ligamenten över tid. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 7.10: Den familiariska smärtan
**Svårighetsgrad:** Standard
**Målgrupp:** Studenter / AT-tandläkare
**Holistiskt perspektiv:** Användning av DC/TMD-kriterier för att diagnostisera orofacial smärta.

**Anamnes (Patientens ord):**
*"Det värker och ömmar i mina kinder, mest på morgonen när jag vaknar. Det gör ont när jag tuggar hårt bröd och ibland känns det som att det strålar mot öronen."*

**Klinisk Status & Fynd:**
* Gapförmåga: 42 mm (normal) men med viss smärta vid maxgap.
* Palpation: Kraftig ömhet över m. masseter bilat vid 1 kg tryck. Patienten bekräftar: "Ja, det är exakt den smärtan jag känner på morgonen" (Familiar pain).
* Även lätt ömhet lateralt över käklederna vid 0,5 kg tryck.

**[Bildinstruktion för AI]:** 
Klinisk bild som visar en tandläkare som palperar m. masseter på en patient. Patienten ser ut att reagera på trycket men gapet ser i övrigt symmetriskt ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Myalgi och Artralgi (TMD-smärta)
* **ICD-10:** M79.1 (Myalgi) + M25.5 (Artralgi)
* **TLV-åtgärd:** 302 (Information & Rörelseträning) + ev. 804 (Bettskena)
* **Klinisk Feedback:** Enenligt DC/TMD krävs att smärtan är "familiar" (igenkännbar) för diagnos. Behandla i första hand med lugnande besked, skonkost och rörelseträning (töjningsövningar). Om besvären kvarstår är en stabiliseringsskena indicerad (Prio 4). *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

## Område 8: Pedodonti

### Fall 8.1: Det svarta hålet
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Medföljande förälder):**
*"Leo (5 år) klagar ibland när han dricker kall mjölk. Jag såg ett stort svart hål i tanden längst bak."*

**Klinisk Status & Fynd:**
* 75 har en stor, öppen kariesskada ocklusalt. Pulpan är inte blottad.
* Leo är glad men lite sprattlig i stolen (Kooperationsgrad: God-acceptabel).
* Röntgen: Karies i dentin, pulpan ej involverad.

**[Bildinstruktion för AI]:** Intraoralt foto i underkäken hos ett barn. Tand 75 (mjölkmolar) har en mycket tydlig svart/mörkbrun hålighet på tuggytan.

**Rätt Svar & Feedback:**
* **Diagnos:** Primärkaries i primär tand
* **TLV-åtgärd:** Fyllning (barntaxa / F-tandvård)
* **Klinisk Feedback:** Vid öppen karies på en 5-åring med smärta vid kyla är pulpan sannolikt vital. Exkavering (gärna med handinstrument för barnets skull) och en glasjonomer- eller kompositfyllning är indicerat för att hålla tanden symptomfri tills den tappas vid 10 års ålder. (ICD-bonus: K02.1)

### Fall 8.2: Den känsliga sexårstanden
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patienten 7 år):**
*"Det isar jättemycket när jag borstar där bak! Det gör till och med ont när jag andas in kall luft."*

**Klinisk Status & Fynd:**
* Nyerupterad 36 och 46. Emaljen på båda är missfärgad, gul-brun, oregelbunden och porös.
* Incisiverna i överkäken uppvisar vita, opaka fläckar.
* Patienten ryggar tillbaka starkt vid försiktig blästring. Ingen karies.

**[Bildinstruktion för AI]:** Intraoralt foto av en nyligen frambruten sexårsmolar (tand 36). Tuggytan är inte vit, utan kraterformad, porös och gul/brun-fläckig pga emaljstörning.

**Rätt Svar & Feedback:**
* **Diagnos:** Molar-Incisor Hypomineralisation (MIH)
* **TLV-åtgärd:** Förebyggande/desensibiliserande (Fluorlack, glasjonmer-täckförband)
* **Klinisk Feedback:** MIH är en systemisk emaljstörning. Tänderna är extremt hypersensibla pga hypomineralisationen. Att borsta är plågsamt, vilket snabbt leder till karies. Täck de defekta ytorna med glasjonomer (GIC) för att stoppa smärtan och förhindra nedbrytning. (ICD-bonus: K00.4)

### Fall 8.3: Ohanterlig rädsla
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist / Barntandläkare

**Anamnes (Föräldern):**
*"Elsa (4 år) gråter hysteriskt bara vi går in i väntrummet. Hon har haft tandvärk hela veckan i tanden på höger sida."*

**Klinisk Status & Fynd:**
* Elsa vägrar sätta sig i stolen, skriker okontrollerat.
* Snabb inspektion visar djup karies på 84 med en synlig svullnad i gingivan (fistel).
* Akut behov av extraktion.

**[Bildinstruktion för AI]:** (Ej bild).

**Rätt Svar & Feedback:**
* **Diagnos:** Djup karies med apikal parodontit + Behandlingsomognad / Dental rädsla
* **TLV-åtgärd:** Remiss till specialisttandvård (Pedodonti) för extraktion under sedering/lustgas/narkos.
* **Klinisk Feedback:** Hos ett omedgörligt och rädd, litet barn med behov av ett invasivt ingrepp (extraktion) är tvång fel väg att gå. Farmakologisk beteendehantering (lustgas, Midazolam eller narkos) krävs för att utföra behandlingen patientsäkert utan att traumatisera barnet för livet. (ICD-bonus: K04.7 / Z71.8)

### Fall 8.4: Mjölktanden som försvann
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Förälder):**
*"Min 3-åring hoppade i soffan och slog i bordet. Ena framtanden trillade ur helt och ligger här i handen."*

**Klinisk Status & Fynd:**
* Tand 51 är exartikulerad (utslagen).
* Alveolen blöder lätt, inga andra tecken på mjukvävnadstrauma.
* Tanden (mjölktand) ser hel ut och är ren.

**[Bildinstruktion för AI]:** (Se Akut/Trauma).

**Rätt Svar & Feedback:**
* **Diagnos:** Exartikulation av primär tand
* **TLV-åtgärd:** Undersökning + Rådgivning (Ingen reponering)
* **Klinisk Feedback:** Rätt! En utslagen primär tand (mjölktand) ska ALDRIG sättas tillbaka (reponeras) pga den enorma risken att skada det underliggande permanenta tandanlaget. Rengör, ge smärtstillande och informera föräldrarna. (ICD-bonus: S03.2)

### Fall 8.5: Den blåa bulan
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Förälder):**
*"Mitt barn (7 år) har fått en mörkblå, mjuk bula i tandköttet längst bak där en ny tand verkar vara på väg. Den gör inte ont, men ser otäck ut."*

**Klinisk Status & Fynd:**
* En blåaktig, fluktuerande svullnad över alveolarutskottet regio 36 (där sexårstanden är på väg att eruptera).
* Barnet är opåverkat.

**[Bildinstruktion för AI]:** Kliniskt foto av barntandkött. Där en tand ska spricka fram syns en upphöjd, mörkt blå/lila mjuk vätske-bula ("blåmärke").

**Rätt Svar & Feedback:**
* **Diagnos:** Eruptionscysta / Eruptionshematom
* **TLV-åtgärd:** Expektans (Lugnande information)
* **Klinisk Feedback:** En blödning i follikelsäcken runt en erupterande tand skapar detta utseende. Det spricker av sig självt när tanden bryter fram. Ingen kirurgi behövs. (ICD-bonus: K09.0)

---

### Fall 8.6: Det bultande mjölktandsdiket
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av irreversibel pulpit i mjölkbettet och vikten av smärtfri behandling.

**Anamnes (Medföljande förälder):**
*"Min dotter (4 år) har inte kunnat sova i natt. Hon gråter och håller sig för kinden. Hon vill inte ens dricka sin välling."*

**Klinisk Status & Fynd:**
* Tand 74 har en djup kariesdefekt ocklusalt-distalt.
* Patienten är mycket öm för perkussion. Ingen fistel eller svullnad synlig ännu.
* Barnet är trött och har låg kooperationströskel p.g.a. smärtan.

**[Bildinstruktion för AI]:** 
En klinisk bild av en 4-åring som ser ledsen ut. Man ser tand 74 i underkäken med ett stort kariesangrepp. Tandköttet runt omkring ser normalt ut (ingen abscess).

**Rätt Svar & Feedback:**
* **Diagnos:** Akut irreversibel pulpit i mjölktand
* **ICD-10:** K04.01 (Irreversibel pulpit)
* **TLV-åtgärd:** 401 (Enkel extraktion)
* **Klinisk Feedback:** Vid irreversibel pulpit (nattsmärta/spontansmärta) i en mjölktand är extraktion förstahandsvalet. Vitalbehandling har dålig prognos här. Var noga med adekvat bedövning (LA) och ytanestesi för att inte traumatisera barnet. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 8.7: Finne på tandköttet
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Sanering av infektionsfokus i mjölkbettet för att skydda permanenta anlag.

**Anamnes (Medföljande förälder):**
*"Vi upptäckte en liten 'finne' ovanför en av tänderna i överkäken på vår 5-åring. Det kommer ut lite var om man trycker på den, men han verkar inte ha så jätteont nu."*

**Klinisk Status & Fynd:**
* Tand 64 är kraftigt kariesangripen.
* En fistelöppning finns buckalt i omslagsvecket regio 64.
* Ingen feber eller extraoral svullnad.

**[Bildinstruktion för AI]:** 
Kliniskt foto av överkäken hos ett barn. Ovanför en kariesangripen mjölkmolar syns en tydlig röd upphöjning (fistel) på tandköttet.

**Rätt Svar & Feedback:**
* **Diagnos:** Dentoalveolär abscess med fistel (Nekrotisk mjölktand)
* **ICD-10:** K04.6 (Periapikal abscess med fistel)
* **TLV-åtgärd:** 401 (Extraktion)
* **Klinisk Feedback:** En infekterad mjölktand med fistel ska extraheras. Infektionen ligger mycket nära det permanenta anlaget (6:an eller premolaren) och kan störa dess mineralisering (Turners tand). Antibiotika är INTE indicerat vid lokal fistel utan feber/allmänpåverkan (följ STRAMA). *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 8.8: När tanden sprids i ansiktet
**Svårighetsgrad:** Standard (Akut)
**Målgrupp:** Tandläkare / Studenter
**Holistiskt perspektiv:** Identifiering av spridd odontogen infektion (cellulit) och livshotande risker hos barn.

**Anamnes (Medföljande förälder):**
*"Hela hans vänstra kind har svullnat upp under dagen. Han har 38,5 graders feber och vill bara ligga ner. Han kan knappt gapa för att visa tänderna."*

**Klinisk Status & Fynd:**
* Kraftig extraoral svullnad på vänster kind. Barnet är påtagligt allmänpåverkat.
* Trismus (kraftigt begränsat gap).
* Svullnaden engagerar nästan nedre ögonlocket.

**[Bildinstruktion för AI]:** 
Porträtt av ett barn med en tydlig, stor asymmetri i ansiktet. Ena kinden är röd och kraftigt svullen, och ögat på den sidan ser lite mer hopklämt ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Cellulit (Spridd odontogen infektion)
* **ICD-10:** L03.2 (Cellulit i ansiktet)
* **TLV-åtgärd:** Akut remiss till Barnakut/Käkkirurg
* **Klinisk Feedback:** AKUT! Detta är ett potentiellt livshotande tillstånd hos barn p.g.a. snabb spridning. Vid feber, trismus och extraoral svullnad krävs ofta IV-antibiotika. Ring in remissen direkt till närmaste barnklinik/käkkirurgi. Sätt in PcV (Kåvepenin 12,5 mg/kg x 3) omedelbart om dröjsmål sker. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 8.9: Pyspunka i alveolen
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av blödning efter ingrepp hos barn och vikten av lugnande bemötande.

**Anamnes (Medföljande förälder):**
*"Vi drog ut en tand för två timmar sedan, och nu slutar det inte blöda. Det ser ut som en stor mörk geléklump i hela munnen på honom och han är jätterädd."*

**Klinisk Status & Fynd:**
* Efter extraktion av en mjölkmolar har ett s.k. leverkoagel (stort ineffektivt koagel) bildats ovanpå såret.
* Det blöder/sipprar underifrån koaglet.
* Barnet är oroligt men cirkulatoriskt stabilt.

**[Bildinstruktion för AI]:** 
Närbild av en extraktionsalveol i underkäken på ett barn. Över såret ligger en stor, mörkröd/svart geléaktig massa som ser ut att svälla ut.

**Rätt Svar & Feedback:**
* **Diagnos:** Postextraktionsblödning (Leverkoagel)
* **ICD-10:** T81.0 (Blödning som komplikation)
* **TLV-åtgärd:** 301 (Sjukdomsbehandlande åtgärd - Hemostas)
* **Klinisk Feedback:** Ta bort leverkoaglet med en fuktad kompress (det hindrar kontraktion av kärlen). Låt patienten bita på en ny, hårt rullad kompress indränkt i Cyklokapron (Tranexamsyra) i 20-30 minuter. Suturera vid behov. Lugna föräldrarna om att "blod i saliv ser ut som mer än det är". *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 8.10: Den känsliga nya tanden (MIH)
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare / Studenter
**Holistiskt perspektiv:** Strategisk planering för barn med grav MIH och differentialdiagnostik.

**Anamnes (Patient 8 år):**
*"Den nya tanden här bak gör så ont när jag borstar den. Jag vågar knappt äta glass längre. Den ser helt gul ut i spegeln."*

**Klinisk Status & Fynd:**
* Tand 36 (första permanenta molaren) har stora brungula fläckar och emaljen har börjat "smula sönder" ocklusalt (Post-eruptivt sönderfall).
* Extremt känslig för blästring (hypersensibilitet).
* Ingen karies men emaljen är porös.

**[Bildinstruktion för AI]:** 
Närbild av en 6-årsmolar (36). Tanden är inte vit utan har stora opaka områden i gult och brunt. En del av emaljen på tuggytan ser ut att saknas (kraterformat).

**Rätt Svar & Feedback:**
* **Diagnos:** Molar-Incisor Hypomineralisation (MIH) - Grav grad
* **ICD-10:** K00.4 (Störningar i tandbildningen)
* **TLV-åtgärd:** 302 (Fluorlackning) / 800 (Stålkrona) / Remiss Ortodontist
* **Klinisk Feedback:** MIH-tänder är ofta svåra att bedöva p.g.a. kronisk inflammation i pulpan. Vid gravt sönderfall är en prefabricerad stålkrona (SSC) en utmärkt permanent lösning. Vid extremt dålig prognos: Konsultera ortodontist för planerad extraktion vid ca 8-9 års ålder (när 7:an börjar mineralisera sin bifurkation). *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---


## Område 9: Ortodonti

### Fall 9.1: Trångt i underkäken
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patient 14 år):**
*"Mina framtänder i underkäken ligger huller om buller och jag tycker det ser fult ut."*

**Klinisk Status & Fynd:**
* Alla permanenta tänder är frambrutna.
* Trångställning ca 4 mm i underkäksfronten. Tänderna överlappar varandra.
* Normal sagitell (Klass I), vertikal och transversal relation.

**[Bildinstruktion för AI]:** Kliniskt foto underkäksfront. Framtänderna (incisiverna) står oregelbundet, roterade och överlappar varandra ("trångt").

**Rätt Svar & Feedback:**
* **Diagnos:** Trångställning i uk-front
* **TLV-åtgärd:** Ortodontisk bedömning/Remiss (Fast apparatur)
* **Klinisk Feedback:** Ett vanligt estetiskt klagomål. Hos en patient där all tillväxt i käkarna stannat av är fast apparatur (räls) med eller utan extraktioner behandlingsalternativet. (ICD-bonus: K07.3)

### Fall 9.2: Käken växer snett
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patient 8 år):**
*(På rutinkontroll märker du att underkäken glider åt sidan när barnet biter ihop).*

**Klinisk Status & Fynd:**
* Unilateralt korsbett på höger sida.
* Vid sammanbitning sker en tvångsföring (glidning) av underkäken 2 mm åt höger.

**[Bildinstruktion för AI]:** Kliniskt foto framifrån vid sammanbitning. Överkäkens molarer på en sida biter innanför underkäkens molarer (korsbett) och mittlinjen i uk är förskjuten åt det hållet.

**Rätt Svar & Feedback:**
* **Diagnos:** Unilateralt korsbett med tvångsföring
* **TLV-åtgärd:** Interceptiv ortodonti (T.ex. Expansionsplåt/Quad Helix)
* **Klinisk Feedback:** Ett korsbett med tvångsföring MÅSTE behandlas tidigt (växelbettet) för att förhindra att underkäken växer asymmetriskt permanent. Käkexpansion i överkäken bryter tvångsföringen. (ICD-bonus: K07.2)

### Fall 9.3: Att bita av en tråd
**Svårighetsgrad:** Advanced
**Målgrupp:** Specialist (Ortodontist/Käkkirurg)

**Anamnes (Patient 22 år):**
*"Jag kan inte bita av tejp eller trådar med framtänderna. Jag kan inte ens bita av en skiva ost på mackan."*

**Klinisk Status & Fynd:**
* Cirkulärt öppet bett. Endast de allra bakersta molarerna har kontakt vid sammanbitning.
* Frontalt avstånd på 6 mm mellan över- och underkäkens incisiver vertikalt.
* Långt ansikte, brant underkäksvinkel.

**[Bildinstruktion för AI]:** Frontalt foto på tänder som biter ihop. Tänderna längst bak rör vid varandra, men framtänderna har ett stort glapp (springa) mellan sig vertikalt, man kan sticka in ett finger mellan dem.

**Rätt Svar & Feedback:**
* **Diagnos:** Skeletalt frontalt öppet bett
* **TLV-åtgärd:** Ortognatkirurgi + Ortodonti
* **Klinisk Feedback:** Hos en vuxen patient med ett extremt skeletalt öppet bett räcker inte enbart tandreglering för att stänga bettet stabilt. En kombinerad behandling med käkkirurgi (t.ex. Le Fort I-osteotomi) och fast apparatur är nödvändig. (ICD-bonus: K07.2)

### Fall 9.4: Hörntanden som fastnade
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare

**Anamnes (Patient 10 år):**
*(Rutinkontroll).*

**Klinisk Status & Fynd:**
* 53 (primär hörntand) sitter kvar, stabil.
* Palpation i omslagsvecket saknar buktning för 13 (den permanenta hörntanden saknas palpatoriskt).
* Röntgen: 13 ligger palatinalt och ektopiskt, överlappar halva roten på 12.

**[Bildinstruktion för AI]:** Panorama-röntgen eller apikalbild i fronten. Man ser den permanenta hörntanden (13) som ligger snett ("på tvären") inuti käkbenet högt upp och pekar mot roten på den lilla framtanden (12).

**Rätt Svar & Feedback:**
* **Diagnos:** Ektopisk eruption av tand 13 (Risk för rotresorption på 12)
* **TLV-åtgärd:** Extraktion av 53 (Interceptiv åtgärd) och uppföljning
* **Klinisk Feedback:** En felriktad (ektopisk) hörntand palatinalt har risk att resorbera roten på intilliggande incisiver. Att dra ut mjölkhörntanden (53) ger den permanenta tanden chansen att normalisera sin erupionsväg spontant. (ICD-bonus: K00.6)

### Fall 9.5: Gluggen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter

**Anamnes (Patient 8 år):**
*"Mamma tycker att jag har en så stor glugg mellan framtänderna."*

**Klinisk Status & Fynd:**
* Diastema mediale på 3 mm mellan 11 och 21.
* Läppbandet (frenulum) fäster lågt ner mellan tänderna och går över papillen till gommen.
* Sidotänderna (lateralerna) har precis börjat eruptera.

**[Bildinstruktion för AI]:** Kliniskt foto frontalt. En tydlig "glugg" (mellanrum) mellan de stora framtänderna (centralerna). En tjock sträng (läppbandet) syns fästa högt uppifrån och ner mellan tänderna.

**Rätt Svar & Feedback:**
* **Diagnos:** Diastema mediale
* **TLV-åtgärd:** Expektans (Vänta på hörntändernas frambrott)
* **Klinisk Feedback:** "Ugly duckling"-stadiet! När de permanenta hörntänderna bryter fram vid 11-12 års ålder stängs utrymmet ofta spontant. Ingen behandling (och ingen frenulotomi) behövs i detta skede. Lugna föräldrarna! (ICD-bonus: K07.3)

---

### Fall 9.6: Den vassa tråden
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter / AT-tandläkare
**Holistiskt perspektiv:** Hantering av akuta ortodontiska besvär i allmäntandvården och sårvård.

**Anamnes (Patient 15 år):**
*"Min tandställning sticker mig i kinden så att det blöder. Det gör jätteont när jag pratar eller äter. Jag fick den spänd igår."*

**Klinisk Status & Fynd:**
* Bågänden distalt om tand 36 har glidit ut ur tuben och sticker ut ca 3 mm.
* Tydligt sår (ulceration) på insidan av kinden vid sårstället.

**[Bildinstruktion för AI]:** 
Närbild av de bakre tänderna i underkäken med tandställning. Längst bak sticker en tunn metalltråd ut rakt in i slemhinnan, som är röd och irriterad.

**Rätt Svar & Feedback:**
* **Diagnos:** Vass bågände med ulceration
* **ICD-10:** Z46.4 (Anpassning av apparatur) + S00.5 (Ytlig skada i munhåla)
* **TLV-åtgärd:** 107 (Kompletterande undersökning) / 301 (Sjukdomsbehandling - Klippning)
* **Klinisk Feedback:** Klipp av den utstickande tråden med en distalkap eller en kraftig tång. Slipa vid behov till änden så den inte är vass. Ordinera sköljning med Klorhexidin (0,12%) för såret och ge ortodontiskt vax som skydd. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 9.7: Tråden bakom tänderna har släppt
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Vikten av stabil retention för att förhindra recidiv och kännedom om bondningsteknik.

**Anamnes (Patient 19 år):**
*"Jag känner med tungan att tråden bakom mina framtänder i underkäken har lossnat på ena sidan. Jag slutade med min tandställning för ett år sedan."*

**Klinisk Status & Fynd:**
* Den bondade retainern (tråden) har lossnat från kompositen på tand 43.
* Tråden ligger lös och skaver lite mot tungan. Inga tänder har hunnit flytta sig ännu.

**[Bildinstruktion för AI]:** 
Insidan (lingualt) av underkäksfronten. En tunn ståltråd sitter fast på de flesta tänder, men vid hörntanden (43) ser man att tråden hänger fritt och kompositklumpen är borta eller sprucken.

**Rätt Svar & Feedback:**
* **Diagnos:** Lossnad bondad retainer
* **ICD-10:** Z46.4 (Anpassning av apparatur)
* **TLV-åtgärd:** 301 (Sjukdomsbehandling - Fastlimning)
* **Klinisk Feedback:** Detta är bråttom! Utan retainer flyttar sig tänderna snabbt tillbaka (recidiv). Rengör tråden, etsa och bonda fast den igen med ett flytande kompositmaterial. Om tråden är deformerad eller tänderna flyttat sig krävs kontakt med ortodontist för ny retainer. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 9.8: De vita fläckarna
**Svårighetsgrad:** Standard
**Målgrupp:** Studenter / Tandhygienister
**Holistiskt perspektiv:** Identifiering av demineralisering (White Spot Lesions) p.g.a. bristande hygien under ortodonti.

**Anamnes (Patient 16 år):**
*"Jag tog precis av min räls, men nu har jag fått fula vita fyrkanter på tänderna där 'plattorna' satt. Går det att borsta bort?"*

**Klinisk Status & Fynd:**
* Vita, kritaktiga opaka fläckar runt de tidigare bracketfästena på tänderna 13-23.
* Slemhinnan är lätt inflammerad (gingivit). Patienten har haft svårt med hygienen under behandlingstiden.

**[Bildinstruktion för AI]:** 
Kliniskt foto av överkäksfronten. Mitt på tänderna finns ljusa, kritvita "ramar" eller fläckar som kontrasterar mot den normala emaljen.

**Rätt Svar & Feedback:**
* **Diagnos:** White Spot Lesions (Initialkaries/Demineralisering)
* **ICD-10:** K02.0 (Emaljkaries/Initialkaries)
* **TLV-åtgärd:** 311/312 (Information om munhygien/Fluorlackning)
* **Klinisk Feedback:** Dessa fläckar är tecken på demineralisering p.g.a. plackansamling runt brackets. De går inte att "borsta bort" men kan remineraliseras med högdosfluor (Duraphat-lackning och tandkräm). Vid grava fall kan ICON-behandling (infiltration) eller komposit behövas senare, men avvakta minst 6 månader för spontan läkning. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 9.9: Glömd nattskena
**Svårighetsgrad:** Standard
**Målgrupp:** AT-tandläkare
**Holistiskt perspektiv:** Hantering av borttappad apparatur och patientansvar vid retention.

**Anamnes (Patient 17 år):**
*"Jag tappade bort min plastskena (Essix) på semestern för två veckor sedan. Nu när jag fick en ny känns det som att den inte passar, det spänner jättemycket."*

**Klinisk Status & Fynd:**
* Patienten har en ny Essix-skena men den "rider" på incisiverna och går inte ner helt i botten.
* Lätt rotation syns på tand 11 som inte fanns i journalen vid avslut.

**[Bildinstruktion för AI]:** 
En genomskinlig plastskena som sitter på tänderna i överkäken, men man ser tydligt att det finns ett luftrum mellan skenans botten och tändernas skär (den "bottnar" inte).

**Rätt Svar & Feedback:**
* **Diagnos:** Recidiv p.g.a. utebliven retention
* **ICD-10:** K07.3 (Tandställningsfel/Recidiv)
* **TLV-åtgärd:** Remiss Ortodontist
* **Klinisk Feedback:** Redan efter två veckor utan skena kan tänderna börja vandra tillbaka. Om skenan inte passar ska man INTE tvinga ner den, det kan skada rötterna. Remittera till ortodontist för bedömning om tänderna behöver flyttas tillbaka med fast apparatur eller om en ny skena kan räcka. *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---

### Fall 9.10: Att suga på tummen
**Svårighetsgrad:** Basic
**Målgrupp:** Studenter / Tandhygienister
**Holistiskt perspektiv:** Identifiering av vanebetingade bettavvikelser och vikten av tidig prevention.

**Anamnes (Medföljande förälder):**
*"Min 6-åring suger fortfarande på tummen när hon ska sova. Vi har märkt att hennes framtänder ser lite konstiga ut."*

**Klinisk Status & Fynd:**
* Frontalt öppet bett på ca 4 mm. Tänderna når inte varandra vid sammanbitning.
* V-formad överkäksbåge och tendens till korsbett distalt.
* Patienten suger aktivt på tummen under undersökningen.

**[Bildinstruktion för AI]:** 
Kliniskt foto framifrån på ett barn i tidigt växelbett. Framtänderna i överkäken är tippade framåt och når inte ner till underkäkens tänder, vilket skapar ett runt hål mellan dem mitt i fronten.

**Rätt Svar & Feedback:**
* **Diagnos:** Sugovaneskapat öppet bett
* **ICD-10:** K07.2 (Avvikelse i bettrelation)
* **TLV-åtgärd:** Information & Rådgivning (Vanestopp)
* **Klinisk Feedback:** Det viktigaste här är att sluta med sugovanan! Om barnet slutar suga på tummen/nappen innan 7-8 års ålder (innan permanenta incisiver är helt frambrutna) stänger sig det öppna bettet ofta spontant. Ingen tandställning behövs i detta skede, bara motivation! *(Not: I simulatorn kommer detta anpassas som Flervalsalternativ)*.

---
*Samtliga 90 patientfall för Simulator Agent 16 är nu strukturerade och klara för integration.*
