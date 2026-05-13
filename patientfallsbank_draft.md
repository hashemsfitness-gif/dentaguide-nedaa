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
*Samtliga 45 patientfall för Simulator Agent 16 är nu strukturerade och klara för integration.*
