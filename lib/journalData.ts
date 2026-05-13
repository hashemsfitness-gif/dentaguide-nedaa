export type Mall = {
  id: string;
  label: string;
  behandlingTag: string;
  followup: string;
  text: string;
};

export type ExtraAtgard = {
  id: string;
  label: string;
  text: string;
};

export type Scenario = {
  id: string;
  icd: string;
  name: string;
  cat: string;
  scId: string;
  symptom: string[];
  behandling: string[];
  varning: string | null;
  mallar: Mall[];
  extraAtgard: ExtraAtgard[];
  lakemedel: string | null;
  remissSpec: string | null;
};

export const journalScenarios: Scenario[] = [
// ── ENDODONTI ──
{id:'vark01',icd:'K04.0',name:'Pulpit (tidig fas)',cat:'Endodonti',scId:'VARK-01-REV',
 symptom:['ilning','kyla','sött','kortvarig smärta','provocerad smärta'],
 behandling:['fyllning','kariesexkavering','komposit','Ca(OH)₂'],varning:null,
 mallar:[
  {id:'m1',label:'Alt A — Permanent fyllning',behandlingTag:'fyllning',followup:'Kontroll vid symtomkvarstående eller försämring.',
   text:`Diagnos: Pulpit (tidig fas) tand [nr].

Anamnes: Ilningssymtom vid kyla och sötsaker sedan [tidsperiod]. Provocerad, kortvarig smärta. Spontansmärta saknas. Senaste analgetika: [datum/tid].

Status:
- Tand [nr]: Karies synlig, [lokalisation]
- Kyla-test: Kraftig positiv reaktion, snabb regression (<15 sek)
- Perkussion: u.a.
- Palpation: u.a.

Rtg: Approximal kariesskada tand [nr], ca [mm] från pulpakavum. Periapikalt status u.a.

Bedömning: Pulpit (tidig fas) tand [nr] — vital pulpa, kariesnära men ej exponerad.

Samtycke: Pat. informerad om diagnos, föreslagen behandling, alternativ (stegvis exkavering), risker (postoperativ ilning, övergående känslighet, risk för pulpaexponering) samt prognos. Muntligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]
[ ] Intraligamentär komplettering
[ ] Ingen LA

Material använt:
- Kofferdam (Hygenic) + klammer [nr]
- Ultra Etch 37% (selektiv etsning emalj)
- Adhese Universal Vivapen (universaladhesiv)
- Liner: [Vitrebond / Dycal Ca(OH)₂] mot pulpagolv
- Komposit Filtek Supreme / Ceram.x Spectra, nyans [A2/A3]
- Polering: Sof-Lex / kompositpolerare

Utförande:
- Kofferdam applicerat
- Kariesexkavering tand [nr] selektivt — eftersträvar pulpaskydd
- Liner placerad mot djupaste partiet
- Skikteknik, ljushärdning 20 sek/lager
- Ocklusionskontroll + artikulationspapper, justering vid behov

Information om eventuella efterbesvär: Övergående ilning vid kyla/söt under 2–4 veckor är normalt. Vid spontansmärta, nattvärk eller tilltagande besvär >2 veckor — kontakta kliniken (kan indikera utveckling mot irreversibel pulpit).

Uppföljning: Kontroll vid symtomkvarstående eller försämring. Annars rutinkontroll nästa undersökning.`},
  {id:'m2',label:'Alt B — Stegvis excavering',behandlingTag:'stegvis excavering',followup:'Återbesök om 6–12 månader för steg 2.',
   text:`Diagnos: Pulpit (tidig fas) tand [nr], djup kariesskada nära pulpa.

Anamnes: Djupgående kariesskada med rtg-närhet till pulpakavum. Ilningar vid kyla. Ingen rapporterad spontansmärta.

Status: Djup karies tand [nr], rtg-avstånd <1 mm till pulpa. Kyla-test positiv, snabb regression. Perkussion u.a.

Bedömning: Pulpit (tidig fas) med risk för pulpaexponering vid komplett exkavering — stegvis exkavering valt enligt SBU för att bevara pulpan.

Samtycke: Pat. informerad om tvåstegsprocedur (Steg 1 idag, Steg 2 om 6–12 mån), risk för pulpaexponering, övergång till rotbehandling vid komplikation samt prognos. Muntligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]
[ ] Ingen LA

Material använt:
- Kofferdam (Hygenic)
- Excavator + rosenborr lågvarv
- Ca(OH)₂ (Life / Dycal) mot pulpanärmaste dentin
- Alt. Biodentine vid mycket djup defekt
- Glasjonomer (GC Fuji IX / Ketac Molar) som tätande provisorium

Utförande:
- Kofferdam applicerat
- Partiell exkavering — mjuk karies avlägsnad i periferi, hård kariespellucid dentin lämnad mot pulpa
- Ca(OH)₂ direkt på pulpanärmaste dentin
- Glasjonomer-tätning, ocklusionskontroll

Information om eventuella efterbesvär: Lätt ilning i 1–2 veckor är förväntat. Spontansmärta, nattvärk eller smärta vid bett indikerar progression — kontakta kliniken omedelbart.

Uppföljning: Återbesök [6–12 månader] för rtg-kontroll och steg 2 (definitiv restauration).`}],
 extraAtgard:[{id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under hela behandlingen.'},{id:'okkontroll',label:'Ocklusionskontroll',text:'Ocklusion kontrollerad och justerad — u.a.'},{id:'remiss',label:'Remiss — Endodontist (vid komplikation)',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning av tand [nr] efter försämring från reversibel till irreversibel pulpit.
Anamnes: Initialt reversibel pulpit, behandlad [datum] med [direkt fyllning / stegvis exk.]. Nu utvecklat spontansmärta/nattvärk.
Status: Kyla-test [dröjande/negativ]. Perkussion [pos/neg]. Rtg: [fynd].
Tidigare åtgärd: [Komposit / Stegvis exk. steg 1] tand [nr] [datum].
Önskar bedömning av: Indikation för rotbehandling.
Prioritet: Snar (inom 1–2 veckor).

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg v.b. (kortvarigt postoperativt).',remissSpec:'Endodontist'},

{id:'vark02',icd:'K04.0 / K04.1',name:'Pulpit (sen fas) / Pulpanekros',cat:'Endodonti',scId:'VARK-02-IRR',
 symptom:['spontansmärta','nattvärk','bultande','värk'],
 behandling:['rotbehandling','RCT','akutrensning','trepanation','extraktion','exstirpation'],varning:null,
 mallar:[
  {id:'m1',label:'Alt A — Akutrensning / Pulpektomi',behandlingTag:'rotbehandling RCT',followup:'Återbesök om 1–2 veckor för definitiv rotfyllning.',
   text:`Diagnos: Pulpit (sen fas) / pulpanekros tand [nr].

Anamnes: Spontan, bultande smärta i tand [nr] sedan [tid]. Nattvärk: [Ja/Nej]. Stör nattsömnen: [Ja/Nej]. Tidigare endodonti i tanden: [Ja/Nej].

Status:
- Kyla-test: [Kraftig dröjande reaktion / Negativ respons]
- Perkussion: Positiv (betöm)
- Palpation: [Apikalt öm / u.a.]
- Klinisk inspektion: [Djup karies / Befintlig fyllning / Krona]

Medicinsk anamnes: Antikoagulantia [Nej/Ja: ]. Bisfosfonater [Nej/Ja]. Allergi: [Nej/Ja].

Rtg: Djupgående karies/restauration nära pulpakavum. Rothinnespalt [normal/vidgad]. Periapikal radioluceens: [Nej / Ja, ca X mm].

Bedömning: Pulpit (sen fas) / pulpanekros tand [nr] — endodontisk behandling indicerad.

Samtycke: Pat. informerad om diagnos, föreslagen RCT över 2–3 besök, alternativ (extraktion + protetisk ersättning), risker (instrumentfraktur, perforation, missfärgning, postop smärta, behandlingens duration, kostnad) samt prognos (85–95% framgång vid komplett RCT). Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]
[ ] Intraligamentär komplettering (Mandibularblockad + buckal infiltration)
[ ] Ytanestesi (Xylocain salva 5%)

Material använt:
- Kofferdam (Hygenic) + klammer [nr]
- Gates Glidden / ProGlider för coronal flaring
- WaveOne Gold / ProTaper Gold filsystem
- Apex locator (Propex Pixi / Root ZX)
- NaOCl 3% (≥20 ml/kanal), EDTA 17% (slutspolning 1 min)
- Ca(OH)₂-pasta (UltraCal XS) som mellanlägg
- Sterilt papperspoint för torkning
- Provisorisk tätning: Cavit / IRM (≥4 mm)

Utförande (Akutrensning):
- Kofferdam applicerat
- Trepanation tand [nr] via [ocklusal / palatinal] access
- Exstirpation av pulpavävnad
- Arbetslängd fastställd med apex locator + bekräftande rtg: [mm]
- Mekanisk preparation till storlek [25/.06 / 30/.04 …]
- Riklig irrigation NaOCl 3% mellan filar
- Slutspolning EDTA 17%, NaOCl, koksalt
- Torkning med sterila papperspoints
- Ca(OH)₂-inlägg till arbetslängd
- Provisorisk tätning (Cavit/IRM)

Information om eventuella efterbesvär: Ömhet vid bett och perkussion förväntat i 2–3 dagar (även upp till 1 vecka). Använd Ibuprofen 400 mg + Paracetamol 1 g vid behov. AKUT kontakt vid: tilltagande svullnad, feber, allmänpåverkan eller om provisoriet lossnar.

Uppföljning: Återbesök [1–2 veckor] för definitiv rotfyllning. Slutkontroll med periapikal rtg om 6 + 12 månader.`},
  {id:'m2',label:'Alt B — Extraktion',behandlingTag:'extraktion',followup:'Protetisk uppföljning planeras.',
   text:`Diagnos: Pulpit (sen fas) / pulpanekros tand [nr] — tanden ej restaureringsbar.

Anamnes: Spontansmärta, nattvärk. Tanden bedömd ej restaureringsbar pga [omfattande karies under befintlig krona / djup vertikal fraktur / otillräcklig kvarvarande tandsubstans].

Medicinsk anamnes: Antikoagulantia [Nej/Ja, INR: ]. Bisfosfonater/Denosumab [Nej/Ja]. Allergi: [Nej/Ja]. Hjärtsjukdom: [Nej/Ja].

Bedömning: Tand [nr] ej bevarbar — extraktion valt.

Samtycke: Pat. informerad om diagnos, extraktion som föreslagen behandling, alternativ (rotbehandling om bevarbart, ingen åtgärd), risker (blödning, infektion, alveolit, parestesi vid 38/48, sinuskommunikation vid 17/27, restrot, käkfraktur), postoperativt förlopp samt protetiska ersättningsalternativ (implantat/bro/protes). Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin (vid kardiell risk), [ml]
[ ] Ytanestesi (Xylocain salva 5%)

Material använt:
- Luxator/elevator (Bein / Couplands)
- Extraktionstång [nr]
- Skarp curette
- Koksaltspolning
- Spongostan / CollaPlug vid behov
- Vicryl 4-0 vid behov
- Bettamponad

Utförande:
- Syndesmotomi
- Luxation med luxator
- Extraktion tand [nr] u.a.
- Alveolinspektion + curettage av granulom
- Spolning koksalt
- Hemostas (bra koagel) / [Spongostan + sutur]
- Bettamponad 20 min

Information om eventuella efterbesvär: Blödning första 30 min är normal — pressa kompress. Postoperativ smärta 1–3 dagar — Paracetamol + Ibuprofen v.b. Svullnad kulminerar dag 2–3. Mjuk/kall kost 24 h, undvik tobaksrökning, ej spola/skölja första dygnet, undvik fysisk ansträngning 24 h. Kontakta vid: kraftig blödning som ej stillas, tilltagande smärta efter dag 3 (alveolit), feber, parestesi, sinussymtom.

Uppföljning: Sårkontroll om 7–10 dagar. Protetisk planering enligt önskemål.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (feber/svullnad)',text:'Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Kontraindikationer kontrollerade u.a.'},{id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under behandlingen.'},{id:'remiss',label:'Remiss — Endodontist',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning för komplicerad RCT tand [nr] / retreatment / kirurgisk endodonti.
Anamnes: [Symtomdebut, smärtkaraktär, tidigare endo, terapiresistens].
Status: Kyla-test [neg]. Perkussion [pos]. Rtg: [fynd, ev. kalkning, kröking, periapikal radioluceens].
Tidigare åtgärd: [Akutrensning utförd / Provisorium på plats sedan datum].
Önskar bedömning av: [Genomförande av RCT / Apikalkirurgi / Bevarandeprognos].
Prioritet: [Snar / Rutin].

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg + Paracetamol 1 g v.b. PcV vid systemisk påverkan.',remissSpec:'Endodontist'},

{id:'vark03',icd:'K04.4',name:'Akut Apikal Parodontit (AAP)',cat:'Endodonti',scId:'VARK-03-AAP',
 symptom:['bitöm','perkussionsöm','förhöjd tand','tuggsmärta'],
 behandling:['rotbehandling','trepanation','ocklusionsjustering','extraktion'],varning:null,
 mallar:[
  {id:'m1',label:'Alt A — Akutrensning (pulpanekros)',behandlingTag:'rotbehandling trepanation',followup:'Återbesök om 7–14 dagar för definitiv rotfyllning.',
   text:`Diagnos: Akut apikal parodontit tand [nr] sekundärt till pulpanekros.

Anamnes: Tuggsmärta tand [nr] sedan [tid]. Tanden upplevs som "förhöjd". Ingen spontansmärta. Ingen feber. Tidigare rotbehandling: [Ja/Nej]. Medicinsk anamnes: Antikoagulantia [Nej/Ja]. Allergi: [Nej/Ja].

Status:
- Kyla-test: Negativ
- Perkussion: Tydlig positiv (betöm)
- Palpation: Apikalt öm i omslagsvecket
- Ingen synlig svullnad
- Klinisk inspektion: [Djup karies / Befintlig fyllning / Krona]

Rtg: Vidgad rothinnespalt tand [nr]. Periapikal radioluceens: [Nej / Ja, ca X mm].

Bedömning: Akut apikal parodontit sekundär till pulpanekros tand [nr].

Samtycke: Pat. informerad om diagnos, föreslagen RCT över 2 besök, alternativ (extraktion), risker, prognos (~85% framgång) samt kostnad. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]
[ ] Intraligamentär komplettering

Material använt:
- Kofferdam (Hygenic) + klammer [nr]
- WaveOne Gold / ProTaper Gold filsystem
- Apex locator
- NaOCl 3%, EDTA 17%
- UltraCal XS (Ca(OH)₂) som mellanlägg
- Cavit / IRM som provisorisk tätning

Utförande:
- Kofferdam applicerat
- Trepanation tand [nr]
- Exstirpation av nekrotisk pulpa
- Varsam rensning [1/2/3] kanaler — UNDVIKER överinstrumentering över apex
- Arbetslängd: [mm] (apex locator + bekräftande rtg)
- Riklig spolning NaOCl 3% (>20 ml)
- Ca(OH)₂-inlägg till arbetslängd
- Cavit-tätning ≥4 mm

Information om eventuella efterbesvär: Ömhet vid bett kan kvarstå 2–5 dagar och kan initialt förvärras (postop flare-up). Analgetika: Ibuprofen 400 mg + Paracetamol 1 g v.b. AKUT kontakt vid svullnad, feber eller allmänpåverkan.

Uppföljning: Återbesök [7–14 dagar] för definitiv rotfyllning. Slutkontroll 6 + 12 månader (rtg).`},
  {id:'m2',label:'Alt C — Ocklusionsjustering (iatrogen)',behandlingTag:'ocklusionsjustering slipning',followup:'Telefonuppföljning om 3 dagar.',
   text:`Diagnos: Akut apikal parodontit tand [nr] — iatrogen orsak (prematur kontakt).

Anamnes: Tuggömhet tand [nr] sedan ny fyllning/krona [datum]. Inga nekrostecken.

Status: Kyla-test positiv (vital). Perkussion positiv. Prematur kontakt identifierad med artikulationspapper.

Bedömning: Iatrogen apikal irritation — tanden vital, endodontisk åtgärd ej indicerad.

Samtycke: Pat. informerad om sannolik orsak, åtgärd och förväntat förlopp. Muntligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml]
[ ] Ingen LA (oftast onödigt)

Material använt:
- Artikulationspapper (Bausch 40 µm)
- Diamantborr/karbidfräs för slipning
- Sof-Lex/polerare
- Duraphat fluorlack 22 600 ppm

Utförande:
- Identifiering av prematur kontakt med artikulationspapper i [centrik / laterotrusion / protrusion]
- Selektiv slipning tand [nr], polering
- Fluorlack applicerat

Information om eventuella efterbesvär: Lätt övergående ilning från slipningen 1–2 dagar. Tuggömheten avtar inom 3–5 dagar. Vid kvarstående/förvärrade symtom — återbesök.

Uppföljning: Telefonuppföljning om 3 dagar. Åter vid försämring.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (systemisk påverkan)',text:'Fenoximetylpenicillin 1,6 g × 3 i 5–7 dagar vid systemisk påverkan.'},{id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat.'},{id:'remiss',label:'Remiss — Endodontist',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning för fortsatt endodontisk behandling tand [nr] med apikal radioluceens / terapiresistens.
Anamnes: AAP debut [datum], akutrensning utförd [datum]. Kvarstående/återkommande symtom.
Status: Perkussion [pos/neg]. Rtg: Periapikal radioluceens [storlek].
Tidigare åtgärd: Akutrensning + Ca(OH)₂ + provisorium tand [nr].
Önskar bedömning av: Definitiv RCT / apikalkirurgi.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg + Paracetamol 1 g v.b.',remissSpec:'Endodontist'},

{id:'vark04',icd:'K04.6 / K04.7',name:'Odontogen Abscess',cat:'Endodonti',scId:'VARK-04-ABS',
 symptom:['svullnad','abscess','feber','fluktuation','pus'],
 behandling:['incision','dränage','I&D','extraktion','trepanation','antibiotika'],
 varning:'⚠️ Kontakta AKUT vid: försämrad svullnad, andningssvårigheter, ökad feber → sjukhus.',
 mallar:[
  {id:'m1',label:'Alt A — I&D + Kausal behandling',behandlingTag:'incision dränage I&D',followup:'Återbesök om 2–3 dagar för dränborttagning.',
   text:`Diagnos: Odontogen periapikal abscess tand [nr].

Anamnes: Svullnad [lokalisation] sedan [tid]. Smärta, temp [°C]. Tuggsvårigheter. Ingen dysfagi. Ingen andningspåverkan. Allmäntillstånd: [opåverkad / lätt påverkad]. Mediciner: [Antikoagulation / Immunosuppression / Diabetes]. Allergi: [Nej / Ja].

Extraoralt:
- Svullnad [lokalisation], ca [cm]
- Hud: [Rodnad / varm / fluktuation: ja/nej]
- Lymfkörtlar: [Normala / Submandibulära förstorade och ömma]
- Gapförmåga: [mm] (normalt >35 mm)
- Temp: [°C], Puls: [/min]

Intraoralt:
- Svullnad vestibulär regio tand [nr]
- Fluktuation: [Ja/Nej]
- Kyla-test: Negativ
- Perkussion: Kraftigt positiv
- Fistel: [Nej / Ja, lokalisation]

Rtg: Periapikal radioluceens tand [nr], ca [mm].

Bedömning: Odontogen periapikal abscess tand [nr] — incision & dränage + kausal åtgärd indicerat.

Samtycke: Pat. informerad om diagnos, incision & dränage som akutåtgärd, kausal behandling (RCT eller extraktion), antibiotikaindikation enligt Strama, risker (blödning, ärrbildning, parestesi, spridning) samt prognos. Skriftligt samtycke inhämtat. Information om spridningstecken given.

Anestesi (välj alternativ):
[ ] Ytanestesi: Xylocain salva 5% / Lidokain spray
[ ] Septocaine 4% med adrenalin 1:200 000 — ledningsblockad (ej infiltration i infekterad vävnad pga sänkt pH), [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — ledningsblockad, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin — ledningsblockad, [ml]
[ ] Mepivakain 3% utan adrenalin (vid kardiell risk)

Material använt:
- Skalpell #11 / #15
- Sårhake / mosquito för stump dissektion
- Koksaltspolning + 10 ml-spruta
- Gummidrän (Penrose) eller cigarettdrän
- Vicryl 4-0 för fixering
- Vid kausal extraktion: luxator + extraktionstång
- Vid trepanation: kofferdam + endo-utrustning enligt vark02
- Klorhexidin 0,2% spolning

Utförande:
1. Ytanestesi + ledningsblockad
2. Incision i fluktuerande område (vestibulärt / palatinalt)
3. Stump dissektion till abscesshåla — purulent dränage
4. Spolning koksalt + klorhexidin
5. Gummidrän inlagt och suturerat
6. Kausal åtgärd: [Extraktion tand [nr] / Trepanation + Ca(OH)₂ + provisorium]

Antibiotika (Strama 2024): Ej indicerat vid lokal svullnad utan systemisk påverkan. Vid feber, trismus, allmänpåverkan: Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Svullnad och smärta avtar väsentligt inom 24–48 h. Sårsekretion via dränet är normal under 1–2 dygn. Feber ska normaliseras inom 24–48 h. Mjuk kost, god munhygien, klorhexidinsköljning 0,2% × 2/dag i 7 dagar. AKUT kontakt vid: försämrad svullnad, ökande trismus, andningssvårigheter, sväljsvårigheter, ögonsvullnad, ökad feber → sjukhusvård.

Uppföljning: Återbesök 2–3 dagar (dränborttagning, läkningskontroll). Definitiv RCT eller protetisk uppföljning enligt plan.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (systemisk påverkan)',text:'Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: klindamycin 150 mg × 3.'},{id:'akutremiss',label:'Akutremiss sjukhus (spridning)',text:'AKUT remiss utfärdad till sjukhus — spridningstecken (trismus/ögon/svalg).'},{id:'remiss',label:'Remiss — Käkkirurg (spridning eller fascialt engagemang)',text:`AKUT REMISS TILL KÄKKIRURGISKA KLINIKEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Akut omhändertagande av odontogen abscess med spridningstecken.
Anamnes: Smärta + svullnad regio [XX] sedan [tid]. Feber [°C]. Trismus.
Status: Extraoral svullnad [lokalisation], gapförmåga [mm], temp [°C], puls [/min].
[Sväljsvårigheter / ögonsvullnad / Ludwigs angina-misstanke / Mediastinit-risk].
Tidigare åtgärd: I&D [datum], antibiotika [PcV/Klindamycin] insatt [datum].
Önskar bedömning av: Sjukhusvård, intravenös antibiotika, ev. utvidgad kirurgisk dränering.
Prioritet: AKUT — telefonkontakt tagen [datum/tid] med jourhavande käkkirurg.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD], kl. [HH:MM]`}],
 lakemedel:'Ibuprofen 400–600 mg × 3. Kåvepenin 1,6 g × 3 vid systemisk påverkan.',remissSpec:'Käkkirurg'},

{id:'vark08',icd:'K04.4',name:'Postendodontisk Flare-up',cat:'Endodonti',scId:'VARK-08-FLARE',
 symptom:['flare-up','förhöjd tand','öm','träningsvärk','postop smärta'],
 behandling:['ocklusionsjustering','information','analgetika'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Flare-up utan abscess',behandlingTag:'information ocklusionsjustering',followup:'Telefonuppföljning om 3 dagar.',
   text:`Diagnos: Postendodontisk flare-up (akut apikal parodontit efter RCT) tand [nr].

Anamnes: Rotbehandling/akutrensning genomförd för [X] dagar sedan på tand [nr]. Nu kraftig tuggömhet och upplevelse av "förhöjd" tand. Ingen feber. Ingen extraoral svullnad. Smärtnivå VAS [X]/10.

Status:
- Ingen synlig eller palperbar svullnad
- Perkussion: Kraftigt öm
- Provisoriet [sitter kvar / är högt i okklusion]
- Inga spridningstecken

Rtg (apikalbild [nr]): Rotfyllning/inlägg [adekvat / med överskott / kort]. Rothinnespalt: [Normal / Vidgad].

Bedömning: Flare-up — mekanisk retning / ödem efter rensning. Inga abscesstecken.

Samtycke: Pat. informerad om normalt postendo-förlopp, prognos (avtar 2–5 dagar), åtgärder och varningstecken. Muntligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000, [ml] (vid bettjustering med smärta)
[ ] Ytanestesi: Xylocain salva 5%
[ ] Ingen LA (oftast onödigt)

Material använt:
- Artikulationspapper (Bausch 40 µm)
- Diamantfräs/karbidfräs lågvarv för ocklusionsjustering
- Polerare (Sof-Lex / kompositpolerare)
- Vid provisorieproblem: ny Cavit / IRM

Utförande:
- Verifiering att provisoriet sitter kvar
- Identifiering av prematura kontakter i centrik + sidoreorenser
- Selektiv slipning av provisorium/tand så tanden tas ur okklusion
- Polering

Information om eventuella efterbesvär: Tuggömheten avtar väsentligt inom 2–5 dagar — beskrivs ofta som "träningsvärk i benet". Analgetika: Ibuprofen 400 mg + Paracetamol 1 g v.b. AKUT kontakt vid: tilltagande svullnad, feber, allmänpåverkan, om provisoriet lossnar.

Antibiotika: Ej indicerat (Strama) vid avsaknad av systemiska tecken.

Uppföljning: Telefonuppföljning om 3 dagar. Återbesök för definitiv RCT enligt ursprunglig plan. Åter omedelbart vid försämring.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (om indikation)',text:'Fenoximetylpenicillin 1,6 g × 3 i 5–7 dagar vid systemisk påverkan.'},{id:'remiss',label:'Remiss — Endodontist (terapiresistent flare-up)',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning av terapiresistent flare-up tand [nr] trots adekvat akutrensning.
Anamnes: RCT/akutrensning [datum]. Postop flare-up [datum]. Persisterande/ökande symtom trots ocklusionsjustering och analgetika.
Status: Perkussion [pos]. Inga abscesstecken kliniskt. Rtg: [fynd].
Tidigare åtgärd: Akutrensning [datum], ocklusionsjustering [datum].
Önskar bedömning av: Ev. reinstrumentering, längdjustering, retreatment.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg + Paracetamol 1 g v.b.',remissSpec:'Endodontist'},
// ── PARODONTOLOGI ──
{id:'vark11p',icd:'K05.1 / K05.3',name:'Gingivit & Parodontit',cat:'Parodontologi',scId:'VARK-11-PAROD',
 symptom:['blödande tandkött','röd gingiva','fickor','parodontit','gingivit'],
 behandling:['depuration','scaling','munhygieninstruktion'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Gingivit / Parodontit (EFP/AAP 2018)',behandlingTag:'depuration scaling',followup:'Läkningskontroll om 2 veckor (gingivit) / 6–8 veckor (parodontit efter steg 2).',
   text:`Diagnos: Kronisk gingivit alt. parodontit Stadium [I/II/III/IV] Grad [A/B/C] enligt EFP/AAP 2018.

Anamnes: Pat söker för blödande tandkött vid borstning. Ingen akut smärta. Röker: [Antal cig/dag eller Nej]. Diabetes: [Ja, HbA1c / Nej]. Stress, kost, ärftlighet: [...].

Status:
- Gingiva: [Generellt rodnad och ödematös / Lokalt regio XX]
- BoP (Blödning vid sondering): [>30% / 10–30% / <10%]
- PPD (Fickdjup): [Generellt 2–3 mm / Fickor ≥4 mm regio XX / ≥6 mm regio XX]
- CAL (Fästeförlust): [Normal / Förlust noterad regio XX, X mm]
- Furkationer: [u.a. / Grad I–III regio XX]
- Mobilitet: [u.a. / Grad I–III tand XX]
- Plackindex: [%]

Rtg (BW + helstatus): [Intakt bennivå / Marginal benförlust XX% regio XX / Vertikala bendefekter regio XX].

Bedömning: Plackinducerad [gingivit / parodontit Stadium X Grad Y] till följd av bristfällig approximal rengöring [+ riskfaktorer: rökning/diabetes].

Samtycke: Pat. informerad om diagnos, sjukdomens kronisk-recidiverande karaktär, behandlingens 4 steg (EFP S3), risker (gingivalretraktion, isning, övergående blödning), nödvändigheten av egen daglig munhygien och stödbehandling, samt prognos. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ — vid djupare scaling):
[ ] Ytanestesi: Oraqix (lidokain/prilokain gel) — sub­gingivalt applicerat
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration regio [XX], [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]
[ ] Ingen LA (supragingival depuration)

Material använt:
- Ultraljudsscaler (EMS Piezon / Cavitron) + spetsar PS/PI
- Hand-curett Gracey [#1-2, 7-8, 11-12, 13-14] / Mini-Five
- Probe (UNC-15 / WHO-621)
- Furkationssond Nabers
- Polering: profylaxpasta + gummikopp / pulverpolering (Airflow/glycin)
- Mellanrumsborste TePe storlek [0/1/2…]
- Klorhexidin 0,2% (Hexident) för slutsköljning

Utförande (Steg 1 + 2 EFP):
- Patientundervisning om biofilm, etiologi och egenvård
- Borsttekniksinstruktion (modifierad Bass + mellanrumsborste/floss)
- Riskfaktorintervention (tobaksrådgivning, diabetesinformation)
- Supragingival depuration hela bett
- [Subgingival scaling (Steg 2) regio XX — full mouth disinfection alt. kvadrantvis]
- Polering, fluorlackning Duraphat 22 600 ppm

Information om eventuella efterbesvär: Lätt ömhet och blödning från tandköttet 1–3 dagar är förväntat. Isning kan tilltäfälligt öka pga gingivalretraktion — använd Sensodyne/Elmex Sensitive. Risk för övergående gingivalretraktion ("svarta trianglar"). Vid kraftig blödning, smärta eller svullnad — kontakta kliniken.

Uppföljning: Re-evaluation 6–8 veckor efter Steg 2 (omsondering hela bett). Vid kvarvarande fickor ≥5 mm med BoP eller djupa vertikala defekter — remiss parodontist (Steg 3). Stödbehandling (SPT) var 3–6 mån.`}],
 extraAtgard:[{id:'klorhex',label:'Klorhexidinsköljning',text:'Klorhexidin 0,2% sköljning × 2 i 2 veckor ordinerat.'},{id:'remiss_par',label:'Remiss parodontist',text:'Remiss utfärdad till parodontist för fortsatt behandling.'},{id:'remiss',label:'Remiss — Parodontist',text:`REMISS TILL SPECIALIST I PARODONTOLOGI

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning och behandling av parodontit Stadium [III/IV] Grad [B/C], terapiresistent / komplicerad.
Anamnes: Diagnostik och initial steg 1–2 utförd [datum]. Riskfaktorer: rökning [pkt-år], diabetes [HbA1c], ärftlighet.
Status: BoP [%], PPD ≥5 mm regio [XX], CAL [mm] regio [XX], furkationer grad [II/III] regio [XX], mobilitet grad [II/III] tand [XX].
Rtg-fynd: Marginal benförlust [%] generellt, vertikala bendefekter regio [XX].
Tidigare åtgärd: Steg 1 (etiologisk) + Steg 2 (subgingival scaling) genomförda [datum]. Re-evaluation [datum].
Önskar bedömning av: Indikation Steg 3 (kirurgisk parodontit­behandling / regenerativ åtgärd).
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Klorhexidin 0,2% sköljning. Ibuprofen 400 mg v.b. första 1–2 dagar.',remissSpec:'Parodontist'},

{id:'vark05',icd:'K05.2',name:'Perikoronit',cat:'Parodontologi',scId:'VARK-05-PERI',
 symptom:['perikoronit','operculum','visdomstand','svullnad','trismus'],
 behandling:['spolning','rengöring','extraktion antagonist','antibiotika'],
 varning:'Antibiotika EJ indicerat vid okomplicerad perikoronit utan systemisk påverkan (Strama).',
 mallar:[
  {id:'m1',label:'Mall — Perikoronit',behandlingTag:'spolning rengöring',followup:'Återbesök om 3–5 dagar för kontroll.',
   text:`Diagnos: Akut perikoronit tand [38/48].
Orsak: Partiell eruption [+ antagonist tand [28/18] biter på operkulet].

Anamnes: Smärta regio [38/48] sedan [tid]. Sväljsvårigheter: [Nej]. Gapsvårigheter: [Ja, lätt trismus / Nej]. Feber: [Nej / Ja: °C]. Dålig smak: [Ja/Nej]. Tidigare episoder: [Ja/Nej]. Allmäntillstånd: [opåverkad].

Status:
- Operculum [38/48]: Svullnad och rodnad [+ pus vid palpation]
- Gapförmåga: [mm] (normalt >35 mm)
- Antagonist [28/18] biter på operkulet: [Ja/Nej]
- Lymfkörtlar: [u.a. / Submandibulära ömma]
- Inga spridningstecken extraoralt

Rtg (OPG): Tand [38/48] [angulation], Pell & Gregory klass [I/II/III, A/B/C]. Avstånd till canalis mandibularis: [mm].

Bedömning: Akut perikoronit tand [38/48]. Pell & Gregory klass [...].

Samtycke: Pat. informerad om diagnos, akutbehandling, planerad extraktion i kallt skede, alternativ (operkulektomi), risker (parestesi n. alveolaris inf., svullnad, blödning, alveolit) samt prognos. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ytanestesi: Xylocain salva 5% / Lidokain spray
[ ] Septocaine 4% med adrenalin 1:200 000 — mandibularblockad + buckal infiltration, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — mandibularblockad, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]

Material använt:
- 10 ml-spruta + trubbig spolnål
- Koksalt + H₂O₂ 3% (alt. enbart koksalt)
- Klorhexidin 0,2% (Hexident)
- Curett för debridering under operculum
- Vid extraktion av antagonist: luxator + extraktionstång

Utförande:
- Ytanestesi + ev. ledningsblockad
- Riklig spolning under operculum med koksalt + H₂O₂ 3%
- Varsam mekanisk debridering med curett
- Slutspolning klorhexidin 0,2%
[- Extraktion antagonist tand [28/18] för avlastning]

Antibiotika (Strama): EJ indicerat vid okomplicerad perikoronit utan systemisk påverkan. Vid feber, trismus, allmänpåverkan eller spridningstecken: PcV 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Smärtan avtar väsentligt inom 24–48 h. Lätt blödning från operculum 1–2 dagar är normalt. Klorhexidin 0,2% sköljning × 2 i 5–7 dagar. Spolning hemma med koksalt + 10 ml-spruta. Analgetika: Ibuprofen 400 mg + Paracetamol 1 g v.b. AKUT kontakt vid: tilltagande svullnad, ökande trismus, sväljsvårigheter, feber.

Information: Definitiv extraktion av tand [38/48] planeras i kallt skede ca 1–2 veckor efter symtomfrihet.

Uppföljning: Återbesök 3–5 dagar för kontroll. Planera operationstid för extraktion.`}],
 extraAtgard:[{id:'antagonist',label:'Antagonist extraherad',text:'Extraktion av antagonist [28/18] utförd för avlastning.'},{id:'antibiotika',label:'Antibiotika (systemisk)',text:'PcV 1,6 g × 3 i 5–7 dagar ordinerat.'},{id:'remiss',label:'Remiss — Käkkirurg (komplicerad visdomständer)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Extraktion av tand [38/48] med komplicerad anatomi efter genomgången perikoronit.
Anamnes: Akut perikoronit [datum], akutbehandling utförd. Recidiv. Önskar definitiv extraktion.
Status: Pell & Gregory klass [IIB/IIC/IIIC], djup retention. Avstånd till canalis mandibularis [mm].
Rtg: OPG bifogad. [Ev. CBCT bifogad — kanalen i nära relation till rötter].
Tidigare åtgärd: Akutbehandling perikoronit [datum] med spolning + [antibiotika].
Önskar bedömning av: Operativ extraktion under [LA/sedering/narkos].
Prioritet: Snar (inom 4–6 veckor).

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Klorhexidin 0,2% sköljning. Ibuprofen 400 mg + Paracetamol 1 g v.b.',remissSpec:'Käkkirurg'},

{id:'vark12',icd:'K05.20 / K05.21',name:'Parodontal Abscess',cat:'Parodontologi',scId:'VARK-12-PARAB',
 symptom:['parodontal abscess','svullnad','hög tand','pus','ficka'],
 behandling:['dränage','spolning','antibiotika'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Parodontal abscess',behandlingTag:'dränage spolning',followup:'Återbesök om 3–5 dagar. Parodontal sanering planeras.',
   text:`Diagnos: Akut parodontal abscess tand [nr].

Anamnes: Svullnad och smärta tand [nr] sedan [tid]. Tanden känns "förhöjd". Feber: [Nej / Ja: °C]. Dålig smak: [Ja/Nej]. Tidigare parodontit: [Ja/Nej]. Allmäntillstånd: [opåverkad].

Status:
- Kyla-test: Positiv (vital tand) — talar emot endo-orsak
- Svullnad: Lokal fluktuerande svullnad [buckalt / lateralt / palatinalt] på roten
- Pus: Tömmer sig vid sondering [Ja/Nej]
- Fickdjup: [X] mm vid abscess­lokalisationen
- Mobilitet: [Grad I/II/III]
- BoP: [Pos/Neg]

Rtg: Marginal benförlust ca [X]%. Ingen apikal destruktion (talar emot endo-orsak).

Bedömning: Parodontal abscess tand [nr] — vital pulpa utesluter primärt endo-orsak.

Samtycke: Pat. informerad om diagnos, akutbehandling via dränage genom fickan, planerad subgingival sanering, ev. antibiotika, risker (bestående gingivalretraktion, övergående mobilitet, blödning) samt prognos. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ytanestesi: Oraqix (lidokain/prilokain) subgingivalt
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration regio [XX], [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin (infekterad vävnad), [ml]

Material använt:
- Curett Gracey [#11-12, 13-14] för dränage
- Probe (UNC-15)
- 10 ml-spruta + trubbig spolnål
- Koksalt + klorhexidin 0,2%
- Artikulationspapper för bettjustering

Utförande:
- LA enligt val ovan
- Försiktig instrumentering med curett genom fickan — dränage etableras
- Riklig spolning koksalt + klorhexidin
- Mekanisk subgingival debridering där access medger
- Ocklusionsjustering vid prematur kontakt
- Information om hemvård

Antibiotika: Indicerat vid systemisk påverkan (feber, allmäntillstånd, lymfkörtelpåverkan): PcV 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Smärta avtar väsentligt inom 24 h. Lätt blödning från fickan 1–2 dagar är normalt. Tanden kan kännas övergående lös pga avlastat ödem — normaliseras inom 1 vecka. Klorhexidin 0,2% sköljning × 2 i 7 dagar. Risk för bestående gingivalretraktion lokalt — använd Sensodyne v.b. Analgetika: Ibuprofen 400 mg + Paracetamol 1 g v.b. AKUT kontakt vid: tilltagande svullnad, feber, allmänpåverkan.

Uppföljning: Återbesök 3–5 dagar för läkningskontroll. Subgingival scaling + parodontal sanering planeras inom 1–2 veckor. Re-evaluation 6–8 veckor.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika',text:'PcV 1,6 g × 3 i 5–7 dagar. Vid allergi: klindamycin 150 mg × 3.'},{id:'remiss',label:'Remiss — Parodontist',text:`REMISS TILL SPECIALIST I PARODONTOLOGI

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning av tand [nr] efter recidiverande parodontal abscess i kontext av parodontit Stadium [III/IV].
Anamnes: Akut abscess [datum] omhändertagen lokalt. Recidiv inom [tid]. Underliggande parodontit Stadium [X] Grad [Y].
Status: PPD [mm] regio [XX], mobilitet [grad], furkation [grad], CAL [mm]. BoP [%].
Rtg: Marginal benförlust [%], vertikal defekt regio [XX].
Tidigare åtgärd: Dränage [datum] + [antibiotika]. Steg 1–2 EFP genomförd.
Önskar bedömning av: Tandprognos, ev. kirurgisk behandling eller extraktion.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg + Paracetamol 1 g v.b. PcV vid systemisk påverkan.',remissSpec:'Parodontist'},

{id:'vark11g',icd:'A69.1 / K05.10',name:'Nekrotiserande Gingivit (ANUG/NG)',cat:'Parodontologi',scId:'VARK-11-GING',
 symptom:['ANUG','nekrotiserad','spontanblödning','foetor','pseudomembran','papiller'],
 behandling:['debridering','depuration','klorhexidin','metronidazol'],
 varning:'Sällsynt — utred alltid immunbrist (leukemi, neutropeni, HIV) hos barn.',
 mallar:[
  {id:'m1',label:'Mall — ANUG / Nekrotiserande gingivit',behandlingTag:'debridering klorhexidin',followup:'Återbesök om 2–3 dagar. Parodontal sanering planeras.',
   text:`Diagnos: Akut nekrotiserande ulcerös gingivit (ANUG/NG).

Anamnes: Intensiv gingival smärta och spontanblödning sedan [tid]. Röker: [X] cig/dag. Stress: [Ja/Nej]. Feber: [Nej / Ja: °C]. Allmäntillstånd: [påverkad / opåverkad]. Hos barn/ungdom — utred alltid immunbrist (leukemi, neutropeni, HIV).

Status:
- Gingiva: Nekrotiska, "inverterade" (utstansade) papiller regio [XX–YY]
- Pseudomembran (gråvit hinna) synlig
- Kraftig kontaktblödning
- Tydlig foetor ex ore
- Lymfkörtlar: [Normala / Ömma submandibulära]
- Smärtnivå VAS [X]/10

Bedömning: Akut nekrotiserande gingivit — riskfaktorer: rökning, stress, malnutrition, immunsuppression.

Samtycke: Pat. informerad om diagnos, akutbehandling (varsam debridering + antiseptika), behov av metronidazol vid allmänpåverkan, riskfaktorer (rökning/stress), behov av immunutredning hos barn, samt långsiktig parodontal sanering. Skriftligt samtycke inhämtat. Information om rökstopp given.

Anestesi (välj alternativ):
[ ] Ytanestesi: Xylocain salva 5% / Oraqix
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration vid behov, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin, [ml]

Material använt:
- Xylocain salva 5% / Oraqix
- Bomullspellets indränkta H₂O₂ 3%
- Ultraljudsscaler på låg effekt
- Klorhexidin 0,2% (Hexident)
- Mjuk tandborste (TePe Select Compact Soft)

Utförande:
- Ytanestesi applicerat 2–3 min
- Varsam rengöring av nekrotiskt material med H₂O₂-pellets
- Supragingival depuration (ULTRALJUD på låg effekt, inte djup subgingival i akutskede)
- Slutspolning klorhexidin 0,2%

Antibiotika: Indicerat vid feber, allmänpåverkan eller lymfkörtelengagemang — Metronidazol (Flagyl) 400 mg × 3 i 5–7 dagar. Vid graviditet/alkoholintag — annan terapi via läkare. OBS: Disulfiramreaktion vid alkohol.

Information om eventuella efterbesvär: Symtomatisk förbättring inom 24–48 h. Vävnaderna återbyggs över 2–4 veckor — den karakteristiska "kratrade" gingivakanten kan kvarstå. Använd mjuk tandborste, klorhexidin 0,2% sköljning × 2 i 10–14 dagar. Mjuk, näringsrik kost. Rökstopp starkt rekommenderat (försvårar läkning). Stresshantering. AKUT kontakt vid: tilltagande feber, kraftig svullnad, allmänpåverkan.

Uppföljning: Återbesök 2–3 dagar för kontroll. Definitiv subgingival sanering när akut fas lugnat sig (1–2 veckor). Hos barn/immunosupprimerad: blodstatus + remiss läkare.`}],
 extraAtgard:[{id:'metronidazol',label:'Metronidazol',text:'Metronidazol (Flagyl) 400 mg × 3 i 5–7 dagar ordinerat.'},{id:'remiss_barnmed',label:'Remiss barnmedicin (immunutredning)',text:'Akut remiss utfärdad till barnmedicin för blodstatus och immunutredning.'},{id:'remiss',label:'Remiss — Läkare/VC (immunutredning vid ovanlig presentation)',text:`REMISS TILL LÄKARE / VÅRDCENTRAL

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Utredning av eventuell underliggande immundefekt vid recidiverande/atypisk ANUG hos [barn/ungdom/vuxen utan typiska riskfaktorer].
Anamnes: ANUG-diagnos [datum]. Frånvaro av klassiska riskfaktorer (icke-rökare, ingen påvisbar stress, väl­nutrierad).
Status: Generell nekrotiserande gingivit. Submandibulära lymfkörtlar [u.a./ömma]. Allmäntillstånd: [opåverkad/påverkad].
Önskar utredning av: Blodstatus (Hb, LPK, diff, TPK), CRP, HIV-test (efter samtycke), ev. immunglobuliner.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Klorhexidin 0,2%. Metronidazol 400 mg × 3 vid allmänpåverkan.',remissSpec:'Läkare/VC'},
// ── BETTFYSIOLOGI ──
{id:'kir26',icd:'S03.0',name:'Käkledsluxation',cat:'Bettfysiologi',scId:'KIR-26-LUX',
 symptom:['käkledsluxation','öppen mun','kan inte stänga','käke låst'],
 behandling:['reponering','Hippokrates','diazepam'],
 varning:'Premedicinering Diazepam 5 mg — kontraindikationer (myasthenia, sömnapné, leversjukdom, graviditet) måste screeneras. Ledsagare måste ordnas.',
 mallar:[
  {id:'m1',label:'Mall — Manuell reponering (Hippokrates)',behandlingTag:'reponering Hippokrates',followup:'Återbesök vid recidiv. Remiss käkkirurg vid återkommande luxationer.',
   text:`Diagnos: Käkledsluxation [bilateral / unilateral sin/dx].

Anamnes: Käken låste sig i öppet läge i samband med [gäspning / tandbehandling / kraftigt gap]. Smärta föreligger. Patienten kan inte stänga munnen. Tidigare luxationer: [Ja, antal / Nej — förstagång].

Medicinsk anamnes: Myasthenia gravis [Nej]. Sömnapné [Nej]. Leversjukdom [Nej]. Graviditet [Nej]. Bensodiazepinöverkänslighet [Nej]. Allergi: [Nej/Ja].

Status:
- Tomma ledskålar palperas framför tragus
- Öppet bett, ingen ocklusion
- Hakan [central / devierar mot [sida]]
- Gapförmåga fixerad i öppet läge
- Bilateral / unilateral: [...]

Bedömning: Akut käkledsluxation [bilateral / unilateral [sin/dx]] — kondylen framför eminentia articularis.

Samtycke: Pat. informerad om diagnos, manuell reponering enligt Hippokrates, ev. premedicinering med Diazepam, risker (recidiv, kortvarig smärta vid reponering, risk för käkledsdiskskada, vid premedicinering: andningsdämpning, dåsighet, körförbud 24 h), samt vikten av ledsagare. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ingen anestesi (vanligt vid akut förstagångsluxation)
[ ] Premedicinering: Diazepam 5 mg p.o. — KI screenade. Ledsagare ordnad. Körförbud 24 h.
[ ] Septocaine 4% med adrenalin 1:200 000 — intraartikulärt vid stark smärta, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — intramuskulärt m. masseter bilat, [ml]
[ ] Mepivakain 3% utan adrenalin

Material använt:
- Tjocka kompresser eller dental rulle (skydd för operatörens tummar)
- Handskar (operatörsskydd)
- Stol med stöd för patientens nacke
- Artikulationspapper för efterkontroll
- [Vid premedicinering: Diazepam 5 mg tabl.]

Utförande (Hippokrates-tekniken):
- Patient sitter med stöd för nacken
- Operatörens tummar (kompressskyddade) placeras intraoralt på molarregionerna bilat
- Övriga fingrar håller mandibeln extraoralt
- Nedåt + bakåt-tryck på molarerna — kondylen passerar eminentia
- Hörbar "klick" — reposition bekräftad
- Ocklusionskontroll — normal ocklusion uppnådd

Information om eventuella efterbesvär: Lätt smärta i käkleden 3–7 dagar är normal. Skonkost 1–2 veckor — undvik hårda, sega livsmedel. Undvik stora gaprörelser (begränsa till 20 mm). Håll emot hakan med handen vid gäspning. Sov på rygg/sida — undvik bukläge. Analgetika: Ibuprofen 400–600 mg + Paracetamol 1 g v.b. AKUT kontakt vid: ny luxation, kraftig smärta, oförmåga att stänga munnen.

Uppföljning: Åter vid recidiv. Remiss käkkirurg vid återkommande luxationer (≥3 episoder) för eminektomi-bedömning (Prio 3).`}],
 extraAtgard:[{id:'diazepam',label:'Diazepam given (premedicinering)',text:'Diazepam 5 mg p.o. given preoperativt. Ledsagare ordnad.'},{id:'remiss_kak',label:'Remiss käkkirurg (recidiv)',text:'Remiss utfärdad till käkkirurg för eminektomi-bedömning.'},{id:'remiss',label:'Remiss — Käkkirurg (recidiverande luxation)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning för operativ åtgärd (eminektomi/eminens-augmentation) vid recidiverande käkledsluxation.
Anamnes: Tidigare ≥3 episoder av käkledsluxation, senast [datum]. Manuella reponeringar utförda lokalt.
Status: Vid avlastat tillstånd — käkled palperas u.a. Hypermobilitet vid gapning, klick.
Tidigare åtgärd: Manuell reponering [datum × n]. Information om beteendemodifikation.
Önskar bedömning av: Operativ behandling (eminektomi enligt Myrhaug/eminens-augmentation).
Prioritet: Rutin (Prio 3).

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400–600 mg v.b. Paracetamol 1 g v.b.',remissSpec:'Käkkirurg'},

{id:'bett28',icd:'M79.1 / M25.5 / K07.6',name:'Akut Myalgi & Artralgi',cat:'Bettfysiologi',scId:'BETT-28-MYALGI',
 symptom:['käksmärta','myalgi','artralgi','tuggmuskel','tuggsmärta','TMD'],
 behandling:['bettskena','NSAID','information','rörelseträning'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Akut myalgi / artralgi (DC/TMD)',behandlingTag:'NSAID bettskena information',followup:'Telefonuppföljning om 2 veckor. Återbesök för bettskena.',
   text:`Diagnos: Myalgi tuggmuskulatur + artralgi käkled [sin/dx] enligt DC/TMD 2014.

Anamnes: Smärta i [sida] käke sedan [tid], förvärras vid tuggning, gäspning och tal. Utlösande: [Stress / Bruxism nattetid / Långvarig gapning / Trauma]. Tidigare episoder: [Ja/Nej]. 3TQ-screening: Smärta [Ja]. Påverkad funktion [Ja/Nej]. Knäppning [Ja/Nej]. Medicinsk anamnes: NSAID-KI (astma, ulcus, hjärtsvikt, blödningsrisk) screenade u.a.

Status (DC/TMD Axis I):
- Maxgap aktivt: [XX] mm [smärtfritt / med smärta]
- Maxgap passivt: [XX] mm
- Lateralrörelse: hö [mm] / vä [mm]
- Palpation m. masseter [sida]: Kraftig ömhet med igenkänd smärta (familiar pain) [Ja/Nej]
- Palpation m. temporalis [sida]: [Öm/u.a.]
- Palpation laterala Polen käkled [sida]: [Öm/u.a.]
- Käkledsljud: [Klick / Krepitation / u.a.]
- Tänder: Perkussion u.a., kyla-test u.a.

Bedömning: Akut käkfunktionsstörning (myalgi + artralgi) — icke-odontogen orsak. DC/TMD-kriterier uppfyllda.

Samtycke: Pat. informerad om diagnos, god prognos, multimodal behandling (information + egenvård + NSAID + bettskena), alternativ (sjukgymnastik, KBT vid kronisk smärta), risker av NSAID samt vikten av belastningsreduktion. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ingen LA (oftast onödigt)
[ ] Ytanestesi: Xylocain salva 5% vid intraartikulär injektion
[ ] Septocaine 4% med adrenalin 1:200 000 — diagnostisk infiltration vid behov, [ml]
[ ] Mepivakain 3% utan adrenalin — vid kardiell risk, [ml]

Material använt:
- Probe / mätsticka för gapmätning
- Smärtskala (VAS 0–10)
- Skriftlig egenvårdsinstruktion
- Hot-/cold-pack (info om hemmabruk)
- Receptblock: Ibuprofen 400 mg / Naproxen 500 mg

Utförande:
- Patientundervisning om muskuloskeletal orsak och god prognos (>80% blir bra inom 3 månader)
- Belastningsreduktion: skonkost (mjuk/mosad), undvik tuggummi, undvik stora gaprörelser
- Rörelseträningsinstruktion: lätta töjningsövningar 3 × dagligen, avslappning
- Stresshantering, kortare arbetspass
- NSAID: Ibuprofen 400 mg × 3 i 7–10 dagar / Naproxen 500 mg × 2 i 10 dagar
- Värme lokalt över muskler 15–20 min × 2/dag

Information om eventuella efterbesvär: Symtomatisk förbättring förväntad inom 2–4 veckor med egenvård + NSAID. Vid kvarstående symtom efter 4–6 veckor — bettskena planeras (Michigan stabilisering ÖK). NSAID-biverkningar: magbesvär (ta med mat), risk för blödning, sällsynt allergi. AKUT kontakt vid: plötslig oförmåga att stänga munnen, kraftig svullnad framför örat, feber, hörselnedsättning.

Uppföljning: Telefonuppföljning om 2 veckor. Återbesök för bettskena vid kvarstående symtom efter 4–6 veckor. Vid kronicitet (>3 månader) — remiss bettfysiolog.`}],
 extraAtgard:[{id:'bettskena',label:'Bettskena planeras',text:'Michigan-bettskena planeras vid nästa besök.'},{id:'remiss',label:'Remiss — Bettfysiolog (kronisk TMD)',text:`REMISS TILL SPECIALIST I BETTFYSIOLOGI

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning av kronisk myalgi/artralgi enligt DC/TMD — terapiresistens trots egenvård, NSAID och bettskena.
Anamnes: Smärtdebut [datum]. Behandlat med information + NSAID + Michigan-bettskena under [tid]. Otillräcklig effekt. Smärtinverkan på funktion/sömn/livskvalitet.
Status: 3TQ pos. Maxgap [mm]. Palpationsömhet bilat masseter/temporalis med familiar pain. Käkleder: [klick/krepitation]. Axis II-screening: [GCPS, JFLS, PHQ-4].
Tidigare åtgärd: Information, egenvård, NSAID [preparat × tid], Michigan-bettskena från [datum].
Önskar bedömning av: Multimodal behandling — fysioterapi, KBT, ev. botulinumtoxin.
Prioritet: Rutin.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ibuprofen 400 mg × 3 eller Naproxen 500 mg × 2 i 7–10 dagar.',remissSpec:'Bettfysiolog'},

{id:'bett29',icd:'K07.6',name:'Akut Käkledslåsning (Closed Lock)',cat:'Bettfysiologi',scId:'BETT-29-CLOSED',
 symptom:['closed lock','käklåsning','diskförskjutning','inskränkt gapförmåga','deflektion'],
 behandling:['manuell distraktion','upplåsning','NSAID','rörelseträning'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Akut closed lock',behandlingTag:'manuell distraktion upplåsning',followup:'Återbesök om 2 veckor. Remiss vid kvarstående låsning.',
   text:`Diagnos: Diskförskjutning utan återgång (closed lock) käkled [sin/dx] enligt DC/TMD 2014.

Anamnes: [Vaknade med / Plötslig debut för X dagar sedan] inskränkt gapförmåga. Tidigare knäppningar som nu upphört (typisk anamnes). Smärta framför örat. Smärtnivå VAS [X]/10. Påverkad funktion (tal, tuggning): [Ja/Nej]. Medicinsk anamnes: NSAID-KI screenade u.a.

Status (DC/TMD):
- Deflektion åt [hö/vä] vid gapning (mot den låsta sidan)
- Maxgap aktivt: [XX] mm (hård end-feel) [normalt ≥40 mm]
- Lateralrörelse mot motsatt sida: [reducerad]
- Käkledsljud: [Ingen knäppning — talar för permanent diskförskjutning]
- Palpationsöm laterala Polen käkled [sida]
- Tänder u.a. (perk. / kyla u.a.)

Bedömning: Akut closed lock — diskförskjutning utan återgång käkled [sida].

Samtycke: Pat. informerad om diagnos, mekanismen, försök till manuell distraktion, gynnsam långtidsprognos (>80% adaptation utan kirurgi), risker (kortvarig smärtökning, ev. tillfällig öppen bite), alternativ (artrocentes hos käkkirurg) samt behandlingstid. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ingen LA (försök i första hand)
[ ] Septocaine 4% med adrenalin 1:200 000 — intraartikulärt vid stark smärta, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — IA-injektion, [ml]
[ ] Mepivakain 3% utan adrenalin
[ ] Vid manuell distraktion: ingen LA krävs vanligtvis

Material använt:
- Gapsticka / mätsticka
- Tummeskydd (kompresser/gummi)
- Receptblock: Naproxen 500 mg / Ibuprofen 400 mg
- Skriftlig egenvårdsinstruktion (TheraBite-rörelseschema)

Utförande:
- Patient informerad om proceduren och beredd
- Manuell distraktion: tummarna på molarregionerna bilat, övriga fingrar på mandibel extraoralt
- Distraktion + protrusion + translatorisk rörelse — försök "fånga" disken
- Manuell distraktion (upplåsning) prövad [med/utan effekt]
- Vid framgång: bekräftande gapmätning + bettkontroll
- Vid utebliven effekt: information om alternativa åtgärder, NSAID + rörelseträning

Information om eventuella efterbesvär: Lätt smärta i käkleden 3–7 dagar är normalt även efter framgångsrik distraktion. Använd skonkost 1–2 veckor — undvik hårda livsmedel och stora gaprörelser. Rörelseträning enligt instruktion 3 × dagligen (passiv/aktiv töjning). NSAID Naproxen 500 mg × 2 / Ibuprofen 400 mg × 3 i 7–10 dagar. Värme lokalt 15–20 min × 2/dag. Vid utebliven förbättring inom 2 veckor — remiss för artrocentes. AKUT kontakt vid: plötslig stark smärta, ny knäppning som inte återkommer, ändrad bett.

Uppföljning: Återbesök 2 veckor. Vid kvarstående låsning → Remiss bettfysiolog/käkkirurg för artrocentes.`}],
 extraAtgard:[{id:'remiss_bett',label:'Remiss bettfysiolog/käkkirurg',text:'Remiss utfärdad till bettfysiolog/käkkirurg för artrocentes.'},{id:'remiss',label:'Remiss — Käkkirurg (artrocentes)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning för artrocentes käkled [sida] vid persisterande closed lock.
Anamnes: Akut closed lock debut [datum]. Manuell distraktion utförd lokalt [datum] utan effekt. NSAID + rörelseträning under [tid]. Kvarstående inskränkt gapförmåga och smärta.
Status: Maxgap [mm], deflektion åt [sida], hård end-feel. Palpationsöm laterala Polen.
Rtg/MRT: [OPG bifogad / MR rekommenderas].
Tidigare åtgärd: Manuell distraktion, NSAID, rörelseträningsinstruktion.
Önskar bedömning av: Artrocentes med kortison/hyaluronsyra-injektion.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Naproxen 500 mg × 2 / Ibuprofen 400 mg × 3 i 7–10 dagar.',remissSpec:'Käkkirurg'},

{id:'bett34',icd:'K07.6 / M25.5',name:'Käkledsartrit & Artralgi',cat:'Bettfysiologi',scId:'BETT-34-ARTRIT',
 symptom:['artrit','artralgi','tänder passar inte ihop','ökat bett','ödem'],
 behandling:['NSAID','naproxen','information','bettskena'],
 varning:'SLIPA ALDRIG på tänder vid reversibel bettförändring — bettet återgår spontant.',
 mallar:[
  {id:'m1',label:'Mall — Käkledsartrit / artralgi (icke-traumatisk)',behandlingTag:'NSAID information',followup:'Kontakt vid kvarstående symtom efter kur. Bettskena vid behov.',
   text:`Diagnos: Akut käkledsartrit / artralgi käkled [sin/dx] enligt DC/TMD 2014.

Anamnes: Smärta framför örat [sida] uppstod efter [överbelastning vid långt tandvårdsbesök / kraftigt gap / akut myalgi]. Upplever att "tänderna inte passar ihop" — främst på den sjuka sidan. Smärtnivå VAS [X]/10. Medicinsk anamnes: NSAID-KI (astma, hjärtsvikt, ulcus, blödningsrisk) screenade u.a.

Status:
- Gapförmåga: [XX] mm, smärtbegränsad
- Palpationsöm lateralt/posteriort käkled [sida]
- Bett: Ipsilateral molarprematurkontakt [sida] + kontralateralt öppet bett (sekundärt till intraartikulärt ödem)
- Inga frakturindikationer
- Tänder: u.a. (perkussion / kyla u.a.)

Bedömning: Akut käkledsartrit / artralgi med intraartikulärt ödem — REVERSIBEL bettförändring.

Samtycke: Pat. informerad om diagnos, REVERSIBEL bettförändring, NSAID-behandling, ev. bettskena, vikten av belastningsreduktion och risker av NSAID. Tydlig information om att INGEN bettslipning kommer göras. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ingen LA (huvudregel)
[ ] Septocaine 4% med adrenalin 1:200 000 — intraartikulärt, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — IA-injektion, [ml]

Material använt:
- Gapsticka för mätning
- VAS-skala
- Receptblock: Naproxen 500 mg
- Skriftlig egenvårdsinstruktion
- Hot-/cold-packsinformation

Utförande:
- Information: Bettförändringen är REVERSIBEL — normaliseras vid läkning
- **INGEN BETTSLIPNING** — bettet återgår spontant inom 1–3 veckor
- Skonkost (mjuk/mosad) och käkvila
- Naproxen 500 mg × 2 i 10 dagar [KI screenade u.a.]
- Lokal värme/kyla efter eget val 15–20 min × 2/dag
- Lätt rörelseträning (passiv töjning) efter akut fas

Information om eventuella efterbesvär: Smärta avtar väsentligt inom 5–10 dagar. Bettet normaliseras inom 1–3 veckor i takt med att ödemet går tillbaka — vänta ut. NSAID-biverkningar: magbesvär (ta med mat), risk för blödning. Vid kvarstående bettförändring >4 veckor — återbesök. AKUT kontakt vid: feber, kraftig svullnad framför örat, hörselnedsättning, syresvårigheter.

Uppföljning: Telefonkontakt vid kvarstående symtom efter Naproxen-kur. Bettskena (Michigan ÖK) vid recidiv eller bruxism­-anamnes. Remiss bettfysiolog vid kronicitet.`}],
 extraAtgard:[{id:'bettskena',label:'Bettskena planeras',text:'Michigan-bettskena planeras.'},{id:'remiss',label:'Remiss — Bettfysiolog (kronisk artralgi)',text:`REMISS TILL SPECIALIST I BETTFYSIOLOGI

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning av kronisk käkledsartralgi >3 månader — terapiresistens trots NSAID och egenvård.
Anamnes: Akut artralgi [datum]. Behandlad med Naproxen + skonkost. Symtomen recidiverar/persisterar.
Status: Maxgap [mm], palpationsöm käkled [sida]. Bett: [normaliserat / kvarvarande störning].
Tidigare åtgärd: NSAID-kur, skonkostsinstruktion, ev. bettskena.
Önskar bedömning av: Vidare diagnostik (MR), intraartikulär kortison-injektion, multimodal behandling.
Prioritet: Rutin.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Naproxen 500 mg × 2 i 10 dagar. Kontraindikationer screenade.',remissSpec:'Bettfysiolog'},

{id:'bett30',icd:'M26.6',name:'Traumatisk Artrit',cat:'Bettfysiologi',scId:'BETT-30-TRAUMA',
 symptom:['traumatisk artrit','slag mot käken','tänder passar inte','kyla'],
 behandling:['NSAID','naproxen','kyla','skonkost'],
 varning:'SLIPA ALDRIG på tänder vid reversibel bettförändring.',
 mallar:[
  {id:'m1',label:'Mall — Traumatisk käkledsartrit',behandlingTag:'NSAID kyla skonkost',followup:'Uppföljning om 2 veckor.',
   text:`Diagnos: Akut traumatisk käkledsartrit [sin/dx].

Anamnes: [Slag mot hakan / Extremt hårt bett / Fall / Misshandel] [igår/för X dagar sedan]. Tänderna upplevs inte passa ihop. Smärtnivå VAS [X]/10. Medvetslöshet/amnesi: [Nej / Ja → remiss sjukhus]. Stelkrampsvaccin: [aktuell]. Medicinsk anamnes: NSAID-KI screenade u.a.

Status:
- Gapförmåga: [XX] mm, smärtbegränsad
- Palpationsöm lateralt/posteriort käkled [sida]
- Bett: Ipsilateral molarprematurkontakt och kontralateralt öppet bett
- Extraoralt: [Hematom haka/kind, ev. skrubbsår]
- Intraoralt: [Inga tand-/slemhinneskador / fynd dokumenterat]
- Inga kliniska frakturindikationer

Rtg (OPG ± käkledsprojektion alt. CBCT): Ingen synlig fraktur. Kondyl-positioner [u.a.].

Bedömning: Akut traumatisk artrit med intraartikulärt ödem — REVERSIBEL bettförändring. Kondylfraktur utesluten radiologiskt.

Samtycke: Pat. informerad om diagnos, REVERSIBEL bettförändring (1–3 veckor), behandling med kyla + NSAID + skonkost, vikten av att INGEN bettslipning utförs, risker av NSAID samt nödvändigheten av rtg-uppföljning. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ingen LA (huvudregel)
[ ] Mepivakain 3% utan adrenalin — vid IA-injektion / hematomtömning, [ml]

Material använt:
- Gapsticka för mätning
- Ispack / kall kompress
- Receptblock: Naproxen 500 mg
- Skriftlig egenvård
- [Stelkrampsvaccin-vid behov]

Utförande:
- Information: Bettförändringen är reversibel — **SLIPA EJ på tänderna**
- Kyla lokalt (ispack omsluten i tyg) max 15 min × 3–4 gånger/dag de första 48 h
- Flytande / mosad kost strikt i 1–2 veckor
- Naproxen 500 mg × 2 i 10 dagar [KI screenade u.a.]
- Lätt passiv töjning efter akut fas (>1 vecka)

Information om eventuella efterbesvär: Smärtan avtar väsentligt inom 5–10 dagar. Bettet normaliseras inom 1–3 veckor i takt med att ödemet absorberas — VÄNTA UT. Trauma-relaterade hematom byter färg gulgrönt under läkning. NSAID-biverkningar: magbesvär. AKUT kontakt vid: tilltagande smärta, ny bettförändring, feber, ändrad eller försämrad gapförmåga, ihållande hörselnedsättning eller dysfunktion. Vid trauma-anamnes hos barn/utsatt person: ifrågasätt orsak och anmäl vid behov.

Uppföljning: Återbesök 2 veckor med rtg-kontroll (kondyl-läge). Vid kvarstående bettförändring efter 4 veckor — remiss käkkirurg för CT/MRT.`}],
 extraAtgard:[{id:'remiss',label:'Remiss — Käkkirurg (misstänkt kondylfraktur)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Misstänkt kondylfraktur / persisterande traumatisk käkledsbesvär efter trauma [datum].
Anamnes: Trauma [beskrivning]. Behandlad konservativt med skonkost + NSAID + kyla under [tid]. Kvarstående bettstörning / smärta / gapnedsättning.
Status: Maxgap [mm], bettavvikelse [persisterar/normaliseras]. Palpationsöm lateralt käkled [sida]. [Knäppning / krepitation: ja/nej].
Rtg: OPG [datum] — [fynd]. [CT/MRT rekommenderas].
Tidigare åtgärd: Skonkost, kyla, Naproxen 500 mg × 2 [duration].
Önskar bedömning av: Kondylfrakturdiagnostik och ev. operativ åtgärd.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],lakemedel:'Naproxen 500 mg × 2 i 10 dagar. Paracetamol 1 g v.b.',remissSpec:'Käkkirurg'},
// ── KIRURGI ──
{id:'vark07',icd:'K10.3',name:'Alveolit (Dry Socket)',cat:'Kirurgi',scId:'VARK-07-ALV',
 symptom:['alveolit','dry socket','bultande smärta','dålig smak','post-extraktion'],
 behandling:['spolning','tamponad','Terracortril'],
 varning:'Aldrig skrapa alveolen — försiktig spolning ENDAST.',
 mallar:[
  {id:'m1',label:'Mall — Alveolit',behandlingTag:'tamponad spolning',followup:'Återbesök om 2–3 dagar för byte av tamponad.',
   text:`Diagnos: Alveolit (dry socket) regio [XX].

Anamnes: Extraktion av tand [XX] utförd för [2–4] dagar sedan. Tilltagande bultande smärta från och med dag [2–3] postoperativt. Dålig smak i munnen. Ingen feber. Ingen svullnad. Ingen parestesi. Riskfaktorer: [Rökning/Östrogen-p-piller/Lokal anestesi med vasokonstriktor/Trauma vid extraktion].

Status:
- Alveol [XX]: Koagel saknas. Blottat intraalveolärt ben synligt
- Rodnad gingivalkant
- [Matrester i alveolen]
- Ingen svullnad, ingen pus, ingen fluktuation — osteomyelit/infektion utesluts
- Lymfkörtlar u.a.

Bedömning: Alveolit (dry socket) regio [XX] — fibrinolys av koagel utan sekundär infektion.

Samtycke: Pat. informerad om diagnos (vanlig komplikation 1–5% av extraktioner, högre vid 38/48), åtgärd (spolning + tamponad), undvikande av kurettage, smärtlindring samt prognos (smärtfrihet inom 24 h, läkning 7–10 dagar). Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Ytanestesi: Xylocain salva 5% direkt i alveolen — oftast tillräckligt
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration vid stark smärta, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — buckal infiltration, [ml]
[ ] Mepivakain 3% utan adrenalin
[ ] Ingen LA (ytanestesi räcker)

Material använt:
- 10 ml-spruta + trubbig spolnål
- Steril koksalt (NaCl 0,9%)
- Bomullspellets / gas-strips
- Alvogyl (eugenol-iodoform-butamben) ELLER:
- Terracortril (tetracyklin/hydrokortison) + Xylocain salva 5% (1:1)
- Pincett anatomisk

Utförande:
- VARSAM spolning av alveolen med koksalt — INGEN kurettage av friskt ben
- Lätt avlägsnande av synliga matrester
- Torkning med bomullspellet
- Tamponad applicerad: Alvogyl / Terracortril + Xylocain-salva 5% (1:1) packad löst i alveolen
- Omedelbar smärtlindring bekräftad av patienten (dramatisk effekt typisk)

Antibiotika (Strama): EJ indicerat vid ren alveolit utan infektion (ingen pus, ingen feber).

Information om eventuella efterbesvär: Dramatisk smärtlindring förväntas inom 30 min — kan dock kvarstå viss molande värk 1–2 dagar. Tamponaden lossnar vanligen spontant inom 3–5 dagar — då har vävnaden börjat granulera. Använd skonkost, ej röka, ej spola/skölja kraftigt, mjuk borstning runt alveolen. Klorhexidin 0,2% sköljning × 2/dag i 7 dagar. Analgetika: Paracetamol 1 g + Ibuprofen 400 mg v.b. [KI screenade u.a.]. AKUT kontakt vid: tilltagande svullnad, feber, allmänpåverkan, parestesi.

Uppföljning: Återbesök 2–3 dagar för byte av tamponad. Total läkning 7–14 dagar. Vid utebliven smärtlindring eller försämring — utvidgad utredning (rtg, ev. osteomyelit-misstanke).`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (vid infektion)',text:'Antibiotika ej indicerat vid ren alveolit utan infektion.'},{id:'remiss',label:'Remiss — Käkkirurg (atypisk/terapiresistent alveolit)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning vid terapiresistent / atypisk alveolit regio [XX] — misstänkt osteomyelit eller MRONJ.
Anamnes: Extraktion tand [XX] [datum]. Alveolit diagnostiserad [datum], multipla tamponadbyten utan tillräcklig effekt. Persisterande smärta + foetor.
Medicinering: [Bisfosfonater / Denosumab / Kortikosteroider / Strålbehandling — duration].
Status: Blottat ben regio [XX] >2 veckor. Lymfkörtlar [u.a./palperbara]. Inga frakturtecken.
Rtg: OPG bifogad — [fynd, sekvester, periostalreaktion].
Tidigare åtgärd: Spolning + tamponad × [n], analgetika.
Önskar bedömning av: Osteomyelit / MRONJ-diagnostik, ev. sekvesterotomi.
Prioritet: Snar.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Paracetamol + Ibuprofen v.b. Klorhexidin 0,2% sköljning.',remissSpec:'Käkkirurg'},

{id:'kir21',icd:'T81.0',name:'Postoperativ Blödning',cat:'Kirurgi',scId:'KIR-21-BLOD',
 symptom:['blödning','post-extraktion','leverkoagel','antikoagulantia'],
 behandling:['hemostas','sutur','Surgicel','Spongostan','Cyklokapron','kryssutur'],
 varning:'EJ NSAID/Ibuprofen till blödande patient. Mepivakain UTAN adrenalin.',
 mallar:[
  {id:'m1',label:'Mall — Postoperativ blödning',behandlingTag:'hemostas sutur',followup:'Kontakta omgående vid ny blödning.',
   text:`Diagnos: Postoperativ blödning regio [XX].

Anamnes: Extraktion tand [XX] [datum]. Ihållande/recidiverande blödning sedan dess, varar mer än 1 h trots kompression hemma. Allmäntillstånd: [opåverkad / lätt påverkad]. Yrsel/svimningskänsla [Nej/Ja]. Mediciner: [Waran (INR senast: [X.X]) / Eliquis / Xarelto / Pradaxa / NOAK / ASA 75 mg / Klopidogrel / Ingen medicinering]. Senaste dos av antikoagulantium: [datum/tid]. Känd koagulationsrubbning: [Nej / von Willebrand / Hemofili]. Allergi: [Nej/Ja].

Status:
- Vitalparametrar: BT [/], puls [/min], saturation [%]
- Riklig blödning från [mjukvävnadskanten / alveolen / koagel] regio [XX]
- Stort leverkoagel ("liver clot") avlägsnat
- Inga abscesstecken

Bedömning: Postoperativ blödning regio [XX] [primär / sekundär — pga koagel-lossning / lokal infektion / antikoagulantia / okänd].

Samtycke: Pat. informerad om diagnos, hemostatisk åtgärd (sutur + lokala hemostatika), kompression, instruktion om undvikande av NSAID, ev. recept Cyklokapron, samt risker vid kvarstående blödning (akut sjukhusvård). Skriftligt samtycke inhämtat.

Anestesi (välj alternativ — UNDVIK adrenalin-baserade när möjligt):
[ ] Mepivakain 3% UTAN adrenalin — förstahandsval, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin — andrahandsval (mild vasokonstriktion), [ml]
[ ] Ytanestesi: Xylocain salva 5%
[ ] Septocaine / Xylocain Dental med adrenalin — UNDVIKS (rebound-blödning)

Material använt:
- Sug + kompresser
- Pincett, sax
- Spongostan (gelatinsvamp) ELLER Surgicel (oxiderad cellulosa) ELLER CollaPlug
- Cyklokapron-lösning 100 mg/ml för kompresser
- Vicryl 4-0 / 5-0 för kryssutur
- Steril 10 ml-spruta + koksalt
- [Recept Cyklokapron munskölj]
- [Vid behov: BT-mätare / Pulsoximeter]

Utförande:
- Sugning av blod, avlägsnande av leverkoagel
- Infiltration Mepivakain 3% UTAN adrenalin
- Identifiering av blödningskälla
- [Surgicel / Spongostan / CollaPlug] applicerat i alveol
- Vicryl 4-0 kryssutur över alveol — komprimerar Surgicel
- Kompression med kompress dränkt i Cyklokapron 100 mg/ml under 20–30 min
- Resultat: Blödning stillad (torr) vid hemgång — bekräftat efter 30 min

Information om eventuella efterbesvär: Det är NORMALT att saliven är blodtonad i flera timmar — det betyder INTE ny blödning. Hög huvudända i natt (extra kudde). Undvik fysisk ansträngning, varma drycker, alkohol och rökning i 24 h. UNDVIK NSAID/Ibuprofen — använd PARACETAMOL 1 g v.b. Cyklokapron munskölj 100 mg/ml × 4/dag i 5–7 dagar (skölj 2 min, svälj ej). Kompression med kompress vid hemma-blödning: kraftig bett i 20 min utan att titta. AKUT kontakt vid: ihållande blödning som ej stillas av 20 min kompression, yrsel, svimning, blek/kallsvettig.

Uppföljning: Telefonkontroll dag 1. Återbesök vid behov. Suturtagning 7–10 dagar (om icke-resorberbar sutur). Kontakta omgående vid ny blödning.`}],
 extraAtgard:[{id:'cyklokapron',label:'Cyklokapron munskölj utfärdat',text:'Recept Cyklokapron munskölj utfärdat (100 mg/ml × 4/dag i 5–7 dagar).'},{id:'remiss_koag',label:'Remiss vid koagulationsrubbning',text:'Remiss utfärdad till koagulationscentrum.'},{id:'remiss',label:'Remiss — Akutmottagning/koagulationscentrum',text:`AKUT REMISS / KONTAKT MED KOAGULATIONSCENTRUM

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Postoperativ blödning regio [XX] som ej responderar på lokala åtgärder.
Anamnes: Extraktion [datum]. Recidiverande/persisterande blödning trots [sutur + Surgicel + Cyklokapron + kompression × n]. Tecken på blodförlust: yrsel, blek, takykardi.
Medicinering: [Waran (INR [X.X]) / NOAK / dubbel trombocythämning / okänd koagulopati].
Status: BT [/], puls [/min], saturation [%]. Pågående blödning regio [XX].
Tidigare åtgärd: [Suturer × n, Surgicel × n, Cyklokapron lokalt/systemiskt].
Önskar bedömning av: Akut hemostas, ev. transfusion, koagulationsutredning, reversal av antikoagulantium.
Prioritet: AKUT — telefon­kontakt tagen [datum/tid].

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD], kl. [HH:MM]`}],
 lakemedel:'Paracetamol 1 g v.b. EJ NSAID. Cyklokapron munskölj.',remissSpec:'Käkkirurg'},

{id:'kir22',icd:'T81.8 / J34.8',name:'Sinuskommunikation',cat:'Kirurgi',scId:'KIR-22-SINUS',
 symptom:['sinuskommunikation','sinus','Valsalva','luftpassage'],
 behandling:['sutur','Rehrmann','plastik','antibiotika','Nezeril'],
 varning:'⚠️ SNYTFÖRBUD 14 dagar. Nysning med ÖPPEN mun. Inga sugrör.',
 mallar:[
  {id:'m1',label:'Alt A — Liten (<2 mm) + sutur',behandlingTag:'sutur',followup:'Återbesök om 1–2 veckor för suturtagning.',
   text:`Diagnos: Sinuskommunikation regio [XX] — liten (<2 mm), uppkommen vid extraktion av tand [XX].

Anamnes: Pågående extraktion / nyligen utförd extraktion av tand [16/17/26/27]. Allergi: [Nej/Ja]. Tidigare sinusbesvär: [Nej/Ja]. Rökning: [Nej/Ja].

Status:
- Valsalvas test: Positivt (luftpassage bekräftad) / Bubblor synliga i alveol vid utandning
- Kommunikation: <2 mm i diameter
- Inga rotrester palpabla i alveolen
- Inga sinussymtom

Rtg (OPG/periapikal): Ingen rot kvarliggande i sinus. Sinus maxillaris [pneumatiserad / fri från slemhinneförtjockning].

Bedömning: Liten sinuskommunikation regio [XX] — konservativ behandling (suturering) indicerad.

Samtycke: Pat. informerad om diagnos, åtgärd (sutur + Spongostan), antibiotikaprofylax, nasalt avsvällande, SNYTFÖRBUD 14 dagar, vikten av efterlevnad, risker (kvarstående kommunikation som kräver kirurgisk slutning) samt prognos. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — buckal + palatinal infiltration, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin

Material använt:
- Spongostan (gelatinsvamp) — placeras i koronala delen av alveol, EJ tryckas ner mot sinus
- Vicryl 4-0 för kryssutur över alveol
- Pincett anatomisk + nålhållare
- Receptblock: PcV 1,6 g, Nezeril nässpray
- Skriftlig efterinstruktion

Utförande:
- LA enligt val
- Försiktig placering av Spongostan i koronala 2/3 av alveolen (EJ ner mot sinus)
- Vicryl 4-0 kryssutur över alveol — spänningsfri primärslutning
- Verifiering: ny Valsalva — [negativ / fortsatt liten luftpassage]

Antibiotika: Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Lätt blodig sekretion från näsan på samma sida i några dagar är NORMALT. Mild huvudvärk/sinustryck kan förekomma. Strikt iakttagande av nedanstående regler är AVGÖRANDE för läkning:
- **SNYTFÖRBUD 14 DAGAR** — snyta absolut inte
- Nysning med ÖPPEN mun (om möjligt)
- Inga sugrör, ingen rökning, ingen ballonsblåsning
- Undvik flygresa 2 veckor
- Inga kraftiga övertryck (gym, dykning, bastu)
- Nezeril nässpray (xylometazolin) × 3/dag i 7 dagar
- AKUT kontakt vid: ökad sekretion av illaluktande pus, feber, ökad svullnad, andningssvårigheter, vätska som rinner från näsa vid drickande

Uppföljning: Återbesök 1–2 veckor för suturtagning + Valsalva-kontroll. Vid kvarstående kommunikation — remiss käkkirurg för Rehrmann-plastik.`},
  {id:'m2',label:'Alt B — Stor (>2 mm) + Rehrmann/remiss',behandlingTag:'Rehrmann plastik',followup:'Suturtagning om 1–2 veckor. Läkningskontroll.',
   text:`Diagnos: Sinuskommunikation regio [XX] — stor (>2 mm) uppkommen vid extraktion av tand [XX].

Anamnes: Vid extraktion noterad stor sinuskommunikation. Allergi: [Nej/Ja]. Tidigare sinusbesvär: [Nej/Ja]. Rökning: [Nej/Ja].

Status:
- Valsalvas test: Positivt med tydlig luftpassage
- Kommunikation: ≥2 mm
- Inga rotrester palpabla
- Inga sinussymtom

Rtg (OPG/CBCT): Ingen rot i sinus / [fynd]. Sinus maxillaris [pneumatiserad].

Bedömning: Stor sinuskommunikation regio [XX] — kräver primär slutning med plastik (Rehrmann) eller akut remiss käkkirurg.

Samtycke: Pat. informerad om diagnos, kirurgisk slutning (Rehrmann lambå), alternativ (palatinal lambå, BFP-lambå hos käkkirurg), risker (vestibulumdjupningsförlust, lambådehiscens, behov av ytterligare kirurgi, kronisk sinuit vid utebliven slutning), SNYTFÖRBUD samt prognos. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — buckal + palatinal + periostal infiltration, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]

Material använt:
- Skalpell #15
- Periostraspatorium (Molt / Prichard)
- Sax (Metzenbaum) för försiktig mobilisering av periost
- Nålhållare + pincett
- Vicryl 4-0 (slemhinna) + Vicryl 5-0 (lambåkant)
- Spongostan / CollaPlug i alveol
- Saksprutor + koksalt

Utförande (Rehrmann buckal lambå):
- Marginalsnitt + 2 vertikala snitt buckalt regio [XX]
- Fullt mobiliserad mukoperiostal lambå
- Försiktig periostincision för att förlänga lambån
- Spongostan placerat i koronala alveol
- Spänningsfri slutning mot palatinal vävnad med Vicryl 4-0
- Verifiering: Valsalva negativ
- Alternativ: Temporär tamponad + AKUT remiss käkkirurg vid otillräcklig kompetens

Antibiotika: Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Mer postoperativ svullnad än normal extraktion — kulminerar dag 2–3. Vestibulumdjupningsförändring vanlig efter Rehrmann (förlust av sulkusdjup). Risk för temporär hyposthesi i operationsområdet. Strikt SNYTFÖRBUD 14 dagar + alla regler enligt liten kommunikation. Skonkost mjuk/mosad 2 veckor. Klorhexidin 0,2% sköljning × 2 i 14 dagar. Nezeril nässpray × 3/dag i 7 dagar. Analgetika: Paracetamol 1 g + Ibuprofen 400 mg v.b. AKUT kontakt vid: ökad svullnad efter dag 3, feber, pus, lambådehiscens, andningssvårigheter.

Uppföljning: Sårkontroll 7 dagar. Suturtagning 10–14 dagar (om icke-resorberbar). Läkningskontroll 4 veckor. Vid otillräcklig läkning — remiss käkkirurg.`}],
 extraAtgard:[{id:'akutremiss_kak',label:'Akutremiss käkkirurg',text:'Akut remiss utfärdad till käkkirurg.'},{id:'remiss',label:'Remiss — Käkkirurg (Rehrmann eller utebliven läkning)',text:`REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Sinuskommunikation regio [XX] — kräver kirurgisk slutning.
Anamnes: Extraktion tand [XX] [datum]. Sinuskommunikation [storlek] noterad. [Sutur + Spongostan utförd / Större kommunikation där lokal kompetens otillräcklig].
Status: Valsalvas test positivt. Kommunikation ca [mm]. Inga rotrester palpabla.
Rtg: OPG bifogad. Sinus [pneumatiserad, slemhinneförtjockning].
Tidigare åtgärd: [Spongostan + kryssutur / Akut temporär tamponad]. PcV + Nezeril insatta.
Önskar bedömning av: Operativ slutning (Rehrmann / palatinal lambå / BFP-lambå) inom 7–14 dagar.
Prioritet: Snar — risk för kronisk sinuit / oroantral fistel.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Kåvepenin 1,6 g × 3 i 5–7 dagar. Nezeril nässpray 7 dagar.',remissSpec:'Käkkirurg'},

{id:'kir23',icd:'T81.4',name:'Postoperativ Infektion',cat:'Kirurgi',scId:'KIR-23-INFEK',
 symptom:['postoperativ infektion','svullnad','feber','pus','abscess'],
 behandling:['incision','dränage','antibiotika','gummidrän'],
 varning:'LA: Mandibularblockad — EJ infiltration vid lågt pH i infekterad vävnad.',
 mallar:[
  {id:'m1',label:'Mall — Postoperativ sårinfektion',behandlingTag:'incision dränage',followup:'Återbesök om 2 dagar för dranborttagning.',
   text:`Diagnos: Postoperativ sårinfektion regio [XX].

Anamnes: Extraktion av tand [XX] för [3–7] dagar sedan. Tilltagande svullnad, feber [38.X°C] och allmänpåverkan från och med dag [3–5] postoperativt. Sväljsvårigheter [Nej/Ja]. Andningspåverkan [Nej/Ja]. Medicinsk anamnes: Diabetes [Nej/Ja], immunosuppression [Nej/Ja], allergi [Nej/Ja].

Status:
- Vitalparametrar: BT [/], puls [/min], temp [°C], saturation [%]
- Extraoralt: Svullnad och rodnad [lokalisation], ca [cm]. Hud [varm, rodnad]
- Intraoralt: Svullnad och rodnad i omslagsveck regio [XX]
- Fluktuerande abscess [Ja/Nej]
- Pus [sipprar / tömmer sig] från alveolen
- Trismus: [Nej / Ja, gapförmåga X mm]
- Lymfkörtlar: [u.a. / Submandibulära förstorade och ömma]
- Inga spridningstecken till djupare halsutrymmen

Rtg (OPG/periapikal): [Inga rotrester / Rotfragment regio XX / Sekvester].

Bedömning: Postoperativ sårinfektion regio [XX] — incision & dränage + antibiotika indicerat.

Samtycke: Pat. informerad om diagnos, åtgärd (incision & dränage + systemisk antibiotika), risker (blödning, parestesi, ärrbildning, spridning) samt akutsignaler. Skriftligt samtycke inhämtat.

Anestesi (välj alternativ — UNDVIK infiltration i infekterad vävnad pga lågt pH):
[ ] Septocaine 4% med adrenalin 1:200 000 — mandibularblockad / regional, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — mandibularblockad, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin — mandibularblockad, [ml]
[ ] Mepivakain 3% utan adrenalin — vid kardiell risk
[ ] Ytanestesi (Xylocain salva 5%) som komplement

Material använt:
- Skalpell #11
- Sårhake / mosquito (stump dissektion)
- 10 ml-spruta + koksalt
- Klorhexidin 0,2%
- Gummidrän (Penrose / cigarettdrän)
- Vicryl 4-0 för fixering av drän
- [Vid sekvester: kurett / luxator]

Utförande:
- Mandibularblockad / regional LA (ej infiltration i infekterad vävnad)
- Incision i omslagsvecket regio [XX]
- Stump dissektion till abscesshåla — purulent dränage
- Riklig spolning koksalt + klorhexidin
- [Avlägsnande av sekvester/rotrester vid behov]
- Gummidrän inlagt och fixerat med 1 Vicryl-sutur

Antibiotika: Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Vid pc-allergi: Klindamycin 150 mg × 3 i 5–7 dagar. Vid utebliven förbättring 48–72 h — överväg byte/tillägg av Metronidazol (Flagyl) 400 mg × 3.

Information om eventuella efterbesvär: Symtomatisk förbättring (feber, svullnad) förväntas inom 24–48 h efter dränage + antibiotika. Drän kan sippra blodig sekretion 1–2 dagar — normal. Klorhexidin 0,2% sköljning × 2/dag i 10 dagar. Mjuk kost. Värme/kyla efter eget val. Analgetika: Ibuprofen 400 mg + Paracetamol 1 g v.b. [KI screenade]. AKUT kontakt vid: tilltagande svullnad, ökande trismus, sväljsvårigheter, andningssvårigheter, ögonsvullnad, feber >39°C → sjukhus.

Uppföljning: Återbesök 2 dagar för dranborttagning + läkningskontroll. Sårkontroll 7 + 14 dagar. Vid utebliven förbättring eller försämring — akut remiss käkkirurg.`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (klindamycin vid allergi)',text:'Klindamycin 150 mg × 3 i 5–7 dagar vid pc-allergi.'},{id:'remiss',label:'Remiss — Käkkirurg (terapiresistent / spridning)',text:`AKUT REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Postoperativ sårinfektion regio [XX] med terapiresistens / fascialt engagemang / spridning.
Anamnes: Extraktion [datum]. Postoperativ infektion debut [datum]. I&D + PcV insatt [datum] — utebliven förbättring efter [48–72 h].
Status: BT [/], puls [/min], temp [°C], saturation [%]. Trismus [mm], sväljsvårigheter, [extra-/intraorala fynd]. Spridningstecken: [submandibulärt/sublingualt/laterofaryngealt/lateralt halsens utrymme].
Rtg: OPG bifogad. [Sekvester / rotrester / osteomyelit-misstanke].
Tidigare åtgärd: I&D, gummidrän, PcV/Klindamycin [duration].
Önskar bedömning av: Sjukhusvård, intravenös antibiotika, utvidgad dränering, ev. sekvesterotomi.
Prioritet: AKUT — telefonkontakt tagen [datum/tid].

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD], kl. [HH:MM]`}],
 lakemedel:'Kåvepenin 1,6 g × 3 i 5–7 dagar. Vid allergi: klindamycin 150 mg × 3.',remissSpec:'Käkkirurg'},

{id:'kir24',icd:'T81.8 / S03.2',name:'Dislocerad Tand / Rot',cat:'Kirurgi',scId:'KIR-24-DISLOC',
 symptom:['dislocerad rot','rot i sinus','munbotten','Valsalva'],
 behandling:['remiss','sutur','antibiotika','Nezeril'],
 varning:'⚠️ STOPP — söker ALDRIG i blindo. SNYTFÖRBUD. Akut remiss vid sinusdislokation.',
 mallar:[
  {id:'m1',label:'Mall — Dislokation till sinus/munbotten',behandlingTag:'remiss',followup:'Akut/snar remiss käkkirurg.',
   text:`Diagnos: Dislokation av rot/tand [nr] till [sinus maxillaris / munbotten].

Anamnes: Pågående extraktion av tand [XX]. Under luxation/elevatorrörelse dislocerades [palatinala / mesiala / distal] roten av tand [XX]. Allergi: [Nej/Ja]. Mediciner: [Antikoagulantia / Bisfosfonater].

Status:
- Rot ej längre synlig/palpabel i alveolen
- Inga rotrester i mjukvävnad runt alveol
- Buckal vävnad: [u.a. / perforation]
- Valsalva: [Positivt → sinus / Negativt]
- [Munbottensvällning / krepitation buckal]

Rtg (OPG + periapikal alt. CBCT): Rotfragment lokaliserat i [sinus maxillaris höger/vänster (storlek X mm) / submandibulär region / sublingual region]. Ingen samtidig fraktur.

Bedömning: Dislokation av rot tand [nr] till [sinus / munbotten] — akut remiss käkkirurg indicerad. **Söker ALDRIG i blindo.**

Samtycke: Pat. informerad om komplikationen, omedelbar avbrytning av extraktionen, akut remiss käkkirurg, risker vid kvarstående rot (kronisk sinuit, aspergillos, infektion), SNYTFÖRBUD (vid sinusdislokation), antibiotika + nasal avsvällande, samt vidare operativt avlägsnande hos specialist. Skriftligt samtycke inhämtat. Patient lugnad och informerad om att detta är en hanterbar komplikation.

Anestesi (välj alternativ — för alveolslutning):
[ ] Septocaine 4% med adrenalin 1:200 000 — buckal + palatinal infiltration, [ml]
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml, [ml]
[ ] Citanest Octapressin 30 mg/ml + felypressin, [ml]
[ ] Mepivakain 3% utan adrenalin

Material använt:
- Pincett anatomisk + sax
- Spongostan i koronala alveolen
- Vicryl 4-0 för kryssutur
- Receptblock: PcV 1,6 g, Nezeril nässpray
- Skriftlig efterinstruktion
- [Kliniska foton]
- Kopia av rtg/CBCT till remiss

Utförande:
- Extraktionen AVBRÖTS OMEDELBART — sökte ej vidare i blindo
- Lugnande information till patient
- Rtg-verifiering av rot-lokalisation
- Spongostan + Vicryl 4-0 kryssutur över alveolen (vid sinusdislokation)
- AKUT telefonkontakt med käkkirurgiska kliniken
- Skriftlig remiss + rtg-bilder bifogade

Antibiotika: Fenoximetylpenicillin (Kåvepenin) 1,6 g × 3 i 5–7 dagar. Nezeril nässpray × 3/dag i 7 dagar (vid sinusdislokation). Vid pc-allergi: Klindamycin 150 mg × 3.

Information om eventuella efterbesvär: Lätt sinustryck/blodig nässekretion vanligt vid sinusdislokation. SNYTFÖRBUD 14 dagar. Nysning med öppen mun. Inga sugrör/rökning/dykning/flygresor 2 veckor. Mjuk kost. Klorhexidin 0,2% sköljning × 2 i 7 dagar. Analgetika: Paracetamol 1 g + Ibuprofen 400 mg v.b. AKUT kontakt vid: feber, illaluktande sekretion, kraftig svullnad, andningssvårigheter, vätska från näsan vid drickande.

Uppföljning: Akut/snar remiss käkkirurg för operativt avlägsnande (vanligen inom 1–2 veckor). Lokal sårkontroll vid behov. Inget definitivt suturtag innan käkkirurg åtgärdat.`}],
 extraAtgard:[{id:'remiss',label:'Remiss — Käkkirurg (AKUT/SNAR)',text:`AKUT REMISS TILL KÄKKIRURG

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Operativt avlägsnande av rotfragment tand [nr] dislocerat till [sinus maxillaris / munbotten] under extraktion [datum].
Anamnes: Pågående extraktion tand [nr] [datum, tid]. Vid luxation dislocerades [palatinal/mesial/distal] rot. Extraktionen avbröts omedelbart. Patient opåverkad. Allergi: [Nej/Ja].
Status: Alveol [XX]: Spongostan + Vicryl-kryssutur applicerad. Valsalvas test [pos/neg]. [Buckal vävnad u.a. / hematom munbotten].
Rtg: OPG + periapikal + [CBCT] bifogad — rotfragment ca [mm] beläget i [sinus / munbottens muskulatur sublingualt / submandibulärt].
Mediciner: [Antikoagulantia / Bisfosfonater / Inga].
Tidigare åtgärd: Alveolslutning med Spongostan + sutur. PcV + Nezeril insatta [datum/tid].
Önskar bedömning av: Operativ extraktion av rotfragment (Caldwell-Luc / endoskopisk sinuskirurgi / submandibulär exploration).
Prioritet: AKUT — telefonkontakt tagen [datum/tid] med jourhavande käkkirurg.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD], kl. [HH:MM]`}],lakemedel:'Kåvepenin 1,6 g × 3 i 5–7 dagar. Nezeril 7 dagar.',remissSpec:'Käkkirurg'},

{id:'kir25',icd:'T81.8 / G50.1',name:'Nervpåverkan (Parestesi)',cat:'Kirurgi',scId:'KIR-25-NERV',
 symptom:['parestesi','hypestesi','känselbortfall','nervpåverkan','underläpp','haka'],
 behandling:['information','uppföljning','remiss'],
 varning:'Pat informeras om rätt till ersättning via Patientförsäkringen (LÖF). Invaliditetsbedömning sker 2 år efter.',
 mallar:[
  {id:'m1',label:'Mall — Postoperativ parestesi (n. alveolaris inf / n. lingualis)',behandlingTag:'information uppföljning',followup:'Telefonuppföljning om 1 vecka. Remiss käkkirurg vid utebliven bättring.',
   text:`Diagnos: Postoperativ parestesi/hypestesi n. alveolaris inferior alt. n. lingualis [hö/vä].

Anamnes: Sensibiliteten har inte återkommit i [höger underläpp / haka / tunga / lingual gingiva] efter operation av tand [38/48] för [2 dagar / 1 vecka] sedan. Karaktär: [Ingen känsel / Stickningar / Brännande / Smärtsamma "pirrningar" (dysestesi)]. Påverkar funktion: [Tal / Drickande / Bitskador läpp].

Status:
- Sensibilitetstest utfört (trubbig + vass sond, "two-point discrimination", lätt beröring):
  [Hypestesi / Anestesi / Hyperestesi] i [hela höger underläpp och haka — kartlagt och fotodokumenterat]
- Tunga: [Normal känsel — n. lingualis intakt / Påverkad smak och känsel — n. lingualis-engagemang]
- Smakprövning bilateralt (saltsött/surt): [u.a. / nedsatt]
- Ingen infektion eller svullnad
- Utbredningsområde kartlagt på diagram, sparat i journal med foto

Bedömning: Postoperativ parestesi [n. alveolaris inf / n. lingualis] efter extraktion av tand [38/48], sannolikt pga [kompression / hematom / mekaniskt trauma vid op / lokalanestesi-toxicitet]. Klassificering: [Neuropraxi (mild kompression — reversibel veckor) / Axonotmesis (delvis axonskada — månader till år) / Neurotmesis (komplett ruptur — kräver mikrokirurgi)].

Samtycke: Pat. informerad om diagnos, ofta reversibel natur (>85% återhämtas), tidsförlopp (veckor till 18 månader), behov av uppföljning, sensibilitetsdokumentation, varning för bitskador och brännskador, samt rätt till patientförsäkring (LÖF). Skriftligt samtycke inhämtat. LÖF-information utlämnad.

Anestesi: Ingen LA används vid detta besök (diagnostiskt).

Material använt:
- Trubbig + vass dental sond för two-point discrimination
- Bomullspellets dränkt i salt/sött för smakprövning
- Sensibilitetskartläggning på utskriven ansiktsmall
- Foto med datum + utbredning
- LÖF-blankett (Patientförsäkringen)
- Skriftlig efterinformation

Utförande:
- Detaljerad sensibilitetsmappning (trubbig vs vass, lätt beröring, two-point discrimination)
- Smakprövning bilat tunga (saltsött)
- Fotodokumentation av utbredning
- Patient lugnad — informerad om prognos och förlopp
- Varnad för bitskador (läpp) och brännskador (varmt kaffe/mat)
- LÖF-anmälan: Patientförsäkringen Sveriges (LÖF) — formulär utlämnat och skickat
- Plan för uppföljning enligt schema 1v → 1mån → 3mån → 6mån → 12mån → 24mån

Antibiotika: Ej indicerat.

Information om eventuella efterbesvär: De flesta postoperativa parestesier (>85%) återhämtas spontant inom 6 månader. Förbättring kan dock pågå upp till 18 månader. Tecken på återhämtning: pirrningar/stickningar tilltar initialt (gott tecken — Tinels tecken), sedan gradvis känselåterkomst. VARNINGAR:
- **Bitskador** — undvik att bita på underläppen omedvetet
- **Brännskador** — testa varm dryck/mat med fingret först
- Var noga med munhygien — patienten känner inte foderester
- Smakförändring (om n. lingualis) — vanligen återgår
AKUT kontakt vid: förvärrad parestesi, smärta som tilltar, tecken på infektion. Kontakt LÖF-handläggare på 08-551 010 00.

Uppföljning: Telefon­uppföljning 1 vecka. Återbesök 1, 3, 6, 12 mån med sensibilitets­kartläggning + foto. Vid utebliven förbättring efter 3 månader — AKUT remiss käkkirurg för ev. mikrokirurgisk nervsutur (bör ske inom 6 månader för bästa prognos). LÖF-invaliditetsbedömning utförs 2 år efter skadetillfället.`}],
 extraAtgard:[{id:'remiss_nerv',label:'Remiss käkkirurg (akut)',text:'Akutremiss utfärdad till käkkirurg för ev. mikrokirurgisk nervsutur.'},{id:'lof',label:'LÖF-info given',text:'Pat informerad om rätt till ersättning via Patientförsäkringen (LÖF). Skrift utlämnad.'},{id:'remiss',label:'Remiss — Käkkirurg (nervkirurgi)',text:`REMISS TILL KÄKKIRURG / OMFATTAR EV. SPECIALIST I NERVKIRURGI

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Bedömning för mikrokirurgisk nervsutur vid persisterande parestesi/anestesi [n. alveolaris inf / n. lingualis] efter extraktion tand [38/48].
Anamnes: Extraktion tand [38/48] [datum]. Postoperativ parestesi noterad [tid]. Kvarstående efter [3/6/12 månader] trots avvaktan. Tinels tecken: [pos/neg]. Påverkar livskvalitet — bitskador, brännskador, talförmåga, smakförändring.
Status: Sensibilitetstest [datum/datum]: [Anestesi / Hypestesi grad XX% / Dysestesi] i utbredningsområde [kartlagt på bifogad bild]. Smakprövning: [u.a. / nedsatt]. Two-point discrimination: [mm vs mm friska sidan].
Rtg: OPG bifogad. [CBCT vid behov].
Tidigare åtgärd: Avvaktan, sensibilitetsmappning [datum], LÖF-anmälan [datum].
Önskar bedömning av: Indikation och tidsplanering för mikrokirurgisk nervsutur. **OBS: Bör utföras inom 6 månader för bästa prognos.**
Prioritet: SNAR.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 lakemedel:'Ingen medicinering. Vid neuropatisk smärta: överväg remiss läkare för pregabalin/gabapentin.',remissSpec:'Käkkirurg'},

{id:'kir27',icd:'S02.4',name:'Tuberfraktur',cat:'Kirurgi',scId:'KIR-27-TUBER',
 symptom:['tuberfraktur','tuber maxillae','rörligt ben','benfragment'],
 behandling:['sutur','reponering','splint','extraktion'],
 varning:'Avbryt DIREKT extraktion vid misstanke. Remiss käkkirurg om kompetens saknas.',
 mallar:[
  {id:'m1',label:'Alt A — Liten fraktur: extraktion + sutur',behandlingTag:'extraktion sutur',followup:'Läkningskontroll om 2 veckor.',
   text:`Diagnos: Tuberfraktur vid extraktion av [28].

Status: Rörligt ben (tuber maxillae) noterades vid luxation av [28].

Samtycke: Patienten informerad om diagnos, behandlingsalternativ (extraktion + sutur vs reponering), risker (sinuskommunikation, infektion, försenad läkning, eventuell remiss käkkirurg) samt kostnad. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — bakre superior alveolarisblockad
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt

Åtgärd: Extraktionen avbröts DIREKT.

Alt A — Liten fraktur:
Tanden och fragmentet lossades varsamt via skalpell.
Extraherades. Alveol suturerades med Vicryl 4-0.

Material:
- Skalpell nr 15, raspatorium, peang
- Vicryl 4-0 (resorberbar sutur)
- Spongostan (vid behov för hemostas)
- Koksaltspolning steril 0,9%

Information om eventuella efterbesvär:
- Måttlig postoperativ smärta och svullnad 2–3 dygn
- Mycket mjuk kost 2–4 veckor — undvik tuggning på opsidan
- Undvik stora gaprörelser, nysning med stängd mun, dykning, flygresor första veckan
- Ingen sugning med sugrör, ingen rökning
- Spolning med Klorhexidin 0,2% × 2 i 1 vecka
- Kontakta kliniken vid feber >38°C, tilltagande svullnad, persisterande blödning eller näsblod

Uppföljning: Läkningskontroll om 2 veckor.`},
  {id:'m2',label:'Alt B — Stor fraktur: reponering + splint',behandlingTag:'reponering splint',followup:'Läkningskontroll 2 veckor. Operativt avlägsnande om 4–6 veckor.',
   text:`Diagnos: Tuberfraktur vid extraktion av [28].

Samtycke: Patienten informerad om diagnos, behandlingsalternativ (reponering + splint vs remiss käkkirurg för operativt avlägsnande), risker (utebliven läkning, sinuskommunikation, infektion, sekundär operation) samt kostnad. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — bakre superior alveolarisblockad
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt

Åtgärd: Extraktionen avbröts DIREKT.

Alt B — Stor fraktur:
Tand och benfragment reponerades på plats med digitalt tryck.
Ocklusion kontrollerad u.a.
Stabiliserad med kompositsplint mot tand [27].

Material:
- Etsgel Ultra Etch 37%
- Adhese Universal Vivapen
- Filtek Supreme (komposit för splint)
- Polishstrips
- Koksaltspolning steril 0,9%

Information om eventuella efterbesvär:
- Postoperativ smärta och lätt svullnad 2–3 dygn
- Mycket mjuk kost 2–4 veckor — undvik tuggning på splinten
- Undvik stora gaprörelser, nysning med stängd mun första veckan
- Försiktig munhygien runt splinten + Klorhexidin 0,2% × 2 i 1 vecka
- Kontakta kliniken om splinten lossnar, vid feber >38°C, tilltagande svullnad eller näsblod
- Operativt avlägsnande av benfragment planeras om 4–6 veckor [eller remiss käkkirurg]

Uppföljning: Läkningskontroll 2 veckor.
Operativt avlägsnande planerat om 4–6 veckor [eller remiss käkkirurg].`},
  {id:'remiss',label:'Remiss — Käkkirurg',behandlingTag:'remiss käkkirurg tuberfraktur',followup:'Specialistsvar tas in i journal när det kommer.',text:`REMISS TILL KÄKKIRURGISKA KLINIKEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Tuberfraktur vid extraktion tand [28] — bedömning och eventuell operativ åtgärd.
Anamnes: Tuberfraktur uppstod vid luxation av tand [28] den [datum]. Extraktionen avbröts direkt.
Status: [Beskrivning av fragment, rörlighet, sinuskommunikation, ocklusion].
Tidigare åtgärd: [Reponering + kompositsplint mot tand 27 / Provisorisk sutur Vicryl 4-0 / Klorhexidinspolning].
Röntgen: Periapikal/panorama bifogad — visar [omfattning av fraktur, sinusrelation].
Önskar bedömning av: Operativ åtgärd, eventuellt avlägsnande av lös bensekvester, kontroll av sinuskommunikation.
Prioritet: [Akut/Snar/Rutin]

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'remiss_kak',label:'Remiss käkkirurg',text:'Remiss utfärdad till käkkirurg.'}],
 lakemedel:'Ibuprofen 400 mg v.b. Skonkost.',remissSpec:'Käkkirurg'},
// ── ORALMEDICIN ──
{id:'oral35a',icd:'B00.2',name:'Primär Herpetisk Gingivostomatit',cat:'Oralmedicin',scId:'ORAL-35A-HERPES',
 symptom:['herpes','blåsor','vesiklar','gingivit','feber','smärta munnen'],
 behandling:['Valaciklovir','antiviralt','Xylocain','Paracetamol'],
 varning:'Dehydrering → sjukhusvård. Smittsam — hemstanning förskola under akut fas.',
 mallar:[
  {id:'m1',label:'Mall — Primär herpetisk gingivostomatit',behandlingTag:'antiviralt information',followup:'Kontakt vid dehydrering eller försämring. Läker spontant 10–14 dagar.',
   text:`Diagnos: Akut primär herpetisk gingivostomatit (HSV-1).

Anamnes: Sår och blåsor i munnen sedan [X] dagar.
Feber: [Ja: °C]. Svårt att äta/dricka: [Ja/Nej]. Tidigare episoder: [Nej].

Extraoralt:
- Lymfkörtlar: [Submandibulära svullna och ömma]
- [Blåsor/krustor på läpparna]

Intraoralt:
- Multipla vesiklar/ulcerationer på BÅDE fast och rörlig slemhinna
  (gingiva, gom, tunga, insida läppar)
- Gingivan intensivt röd och svullen

Bedömning: Primär herpetisk gingivostomatit (HSV-1).

Samtycke: Patienten/vårdnadshavare informerad om diagnos (virussjukdom), spontant läkningsförlopp 10–14 dagar, smittsamhet (kontaktsmitta, hemstanning förskola under akut fas) samt behandlingsalternativ. Samtycke inhämtat.

Åtgärd:
- Information: Virussjukdom. Läker spontant på 10–14 dagar. Smittsam.
- Kritiskt: Säkerställ adekvat vätskeintag. Svår dehydrering → sjukhusvård.
- Smärtlindring: Paracetamol + Xylocain gel 2% lokalt före måltid
- Munhygien: Klorhexidin 0,2% (Hexident) sköljning × 2
[- Antiviralt: Valaciklovir 1 g × 2 i 7–10 dagar (om debut <72 h)]

Material:
- Xylocain viskös 2% / Xylocain gel
- Klorhexidin 0,2% (Hexident)
- Kompresser och tungspatel för inspektion
- Kliniskt foto (efter samtycke)

Information om eventuella efterbesvär:
- Smärta och svårighet att äta/dricka 5–7 dagar
- Risk för dehydrering — bjud frekvent kall vätska, glass, smoothies
- Smittsamt — undvik kyssar, dela ej bestick/glas, ingen förskola/skola under akut fas
- Smärtlindring: Paracetamol enligt vikt, Xylocain gel före måltid
- Spontan läkning förväntad 10–14 dagar utan ärrbildning
- Kontakta vården vid: feber >39°C, vägrar dricka, slöhet, minskad urinering, försämring efter 5 dagar

Uppföljning: Kontakt vid försämring. [Barn: information om smittskydd.]`},
  {id:'remiss',label:'Remiss — Läkare/VC (dehydrering)',behandlingTag:'remiss vc dehydrering',followup:'Återkoppling om vätskestatus och eventuellt antiviralt.',text:`REMISS TILL VÅRDCENTRAL/BARNAKUT

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Akut primär herpetisk gingivostomatit med tecken på dehydrering — bedömning av vätskebalans och eventuellt antiviralt.
Anamnes: Symtomdebut [X] dagar sedan. Feber [°C]. Vägrar dricka/äta sedan [X] dagar. Minskad urinering: [Ja/Nej].
Status: Multipla vesiklar/ulcerationer i munhåla (gingiva, gom, tunga, läppar). Submandibulär lymfadenit. Tecken på dehydrering: [torra slemhinnor, nedsatt hudturgor, slöhet].
Tidigare åtgärd: Xylocain gel, Paracetamol, Klorhexidinsköljning ordinerat.
Önskar bedömning av: Vätskestatus, eventuell intravenös vätska, eventuellt antiviralt (Valaciklovir).
Prioritet: Akut

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'valaciklovir',label:'Valaciklovir (<72h)',text:'Valaciklovir 1 g × 2 i 7–10 dagar ordinerat — debut <72h.'},{id:'remiss_sjukhus',label:'Remiss sjukhus (dehydrering)',text:'Remiss/transport till sjukhus pga dehydrering.'}],
 lakemedel:'Paracetamol. Xylocain gel lokalt. Klorhexidin 0,2%. Valaciklovir vid tidig debut.',remissSpec:'Läkare/VC'},

{id:'oral35b',icd:'K12.0',name:'Recidiverande Aftös Stomatit (RAS/Afte)',cat:'Oralmedicin',scId:'ORAL-35B-AFTE',
 symptom:['afte','sår','aftöst','recidiverande','ulceration'],
 behandling:['Xylocain','klobetasol','SLS-fri tandkräm','Andolex'],varning:null,
 mallar:[
  {id:'m1',label:'Mall — Recidiverande afte',behandlingTag:'symtomlindring',followup:'Kontakta vid utebliven läkning >2 veckor.',
   text:`Diagnos: Recidiverande aftös stomatit (afte typ [Minor/Major/Herpetiforma]).

Anamnes: Återkommande munhålesår sedan [tid]. Debut [barndom/vuxen ålder].
Ingen feber. Liknande episoder: Ja. Frekvens [X ggr/år].

Status:
- Sår uteslutande på rörlig, icke-keratiniserad slemhinna
  ([insida läpp / kind / tungrygg]) regio [XX]
- Utseende: Välavgränsat, "utstansat" sår med gulvit fibrinbeläggning och röd halo
- Storlek: [<1 cm / >1 cm]

Bedömning: Klinisk bild förenlig med afte. Ingen feber — utesluter herpes.

Samtycke: Patienten informerad om diagnos (idiopatisk recidiverande åkomma), godartad natur, symtomlindrande behandling samt eventuell utredning för bakomliggande orsak (järn/B12/folsyra/celiaki). Samtycke inhämtat.

Åtgärd:
- Råd om SLS-fri tandkräm (t.ex. Zendium, Sensodyne ProNamel)
- Andolex (benzydamin) munskölj / Xylocain gel 2% vid behov
[- Klobetasol 0,05% (Dermovat) gel × 3 i [5–7] dagar — vid major afte]
[- Remiss läkare för blodprover (Hb, järn, ferritin, B12, folsyra, transglutaminas-IgA) vid behov]

Material:
- Xylocain gel 2% / Andolex munskölj
- Klobetasol 0,05% (Dermovat) gel — vid major afte
- Kliniskt foto för uppföljning (efter samtycke)

Information om eventuella efterbesvär:
- Smärta vid måltid och tandborstning 5–10 dagar
- Använd Xylocain gel före måltid, undvik sura/kryddstarka livsmedel
- Byte till SLS-fri tandkräm (Zendium) minskar recidivfrekvens hos vissa patienter
- Spontan läkning förväntad: minor afte 7–14 dagar, major afte upp till 4 veckor (kan ge ärr)
- Kontakta kliniken vid: sår >2 veckor utan läkning, feber, sår på handflator/fotsulor, ögonbesvär, genital påverkan (utredning Behçet/IBD)

Uppföljning: Kontakta vid utebliven läkning >2 veckor.`},
  {id:'remiss',label:'Remiss — Läkare/VC (utredning)',behandlingTag:'remiss vc utredning afte',followup:'Återkoppling om provsvar och eventuell systemisk diagnos.',text:`REMISS TILL VÅRDCENTRAL

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Recidiverande aftös stomatit — utredning av eventuell bakomliggande systemorsak (näringsbrist, malabsorption, IBD, Behçet).
Anamnes: Återkommande afte sedan [tid], frekvens [X gånger/år], typ [minor/major/herpetiforma]. [Viktnedgång/diarré/ledbesvär/ögonbesvär: Ja/Nej].
Status: Multipla/solitära aftösa sår på rörlig slemhinna. Storlek [<1 cm / >1 cm]. Ingen feber.
Tidigare åtgärd: SLS-fri tandkräm, Andolex, Xylocain gel, [Klobetasol gel] — otillräcklig effekt.
Önskar bedömning av: Blodprover (Hb, MCV, järn, ferritin, B12, folsyra, transglutaminas-IgA, CRP, zink), eventuell vidare utredning vid systemmisstanke.
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'klobetasol',label:'Klobetasol (major afte)',text:'Klobetasol 0,05% (Dermovat) gel × 3 i 5–7 dagar ordinerat.'},{id:'remiss_utredning',label:'Remiss läkare (blodprover)',text:'Remiss läkare för blodprover: järn, B12, folsyra, tarmsjukdom.'}],
 lakemedel:'Xylocain gel. Andolex munskölj. Klobetasol vid major afte. SLS-fri tandkräm.',remissSpec:'Läkare/VC'},

{id:'oral35c',icd:'K12.1',name:'Traumatiskt Sår (Decubitus)',cat:'Oralmedicin',scId:'ORAL-35C-TRAUMA',
 symptom:['decubitus','traumatiskt sår','protes','vass tand','slemhinnesår'],
 behandling:['kausal','slipning','klorhexidin','Xylocain'],
 varning:'Om såret ej läkt inom 2 veckor trots åtgärd → remiss för biopsi (utesluta malignitet).',
 mallar:[
  {id:'m1',label:'Mall — Traumatiskt sår / Decubitus',behandlingTag:'kausal slipning',followup:'Läkningskontroll om 10–14 dagar. Biopsi om ej läkt inom 2 veckor.',
   text:`Diagnos: Traumatiskt sår (decubitus) [lokalisation].

Anamnes: Sår i munnen uppkommet [vid/efter] [bettning / vass tand / protes].
Ingen feber. Duration: [X] dagar.

Status:
- Solitärt sår regio [XX], gulvit fibrinbotten och röd randzon
- Tydlig relation till [vass kusp [nr] / defekt fyllning / proteskant]
- [Utlösande trauma identifierat och åtgärdat]

Bedömning: Traumatiskt sår sekundärt till [orsak].

Samtycke: Patienten informerad om diagnos, kausal åtgärd (slipning/justering), risk för långsam läkning, samt vikten av återbesök inom 2 veckor för att utesluta malignitet vid utebliven läkning. Samtycke inhämtat.

Anestesi:
☐ Ytanestesi Xylocain salva 5% — vid slipning av kusp/fyllning
☐ Oraqix (lidokain/prilokain gel) — vid protesjustering, intraoral
☐ Septocaine 4% + adrenalin 1:200 000 — vid behov av infiltration
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Ingen anestesi krävdes

Åtgärd:
- Kausal behandling: [Slipning av vass kusp/fyllning [nr] / Justering av protes]
- Polering med polishstrips/Sof-Lex
- Klorhexidin 0,2% (Hexident) sköljning

Material:
- Diamantborr fin korn / polishstrips
- Sof-Lex polishskivor
- Klorhexidin 0,2% (Hexident)
- Xylocain salva 5% / Oraqix
- Kliniskt foto (efter samtycke)

Information om eventuella efterbesvär:
- Spontan läkning förväntad 7–14 dagar efter att orsaken är borttagen
- Klorhexidinsköljning × 2 i 1 vecka
- Xylocain gel före måltid vid smärta
- Undvik kryddstark/sur mat tills såret läkt
- KRITISKT: Återbesök inom 10–14 dagar — om sår kvarstår >2 veckor MÅSTE biopsi övervägas för att utesluta malignitet
- Kontakta kliniken omedelbart vid: tilltagande storlek, induration, hård knöl i underliggande vävnad, lymfkörtelförstoring på hals

OBS: Om ej läkt inom 2 veckor → Remiss för biopsi (utesluta malignitet).

Uppföljning: Återbesök [10–14 dagar]. Kliniskt foto sparat.`},
  {id:'remiss',label:'Remiss — Oralmedicin/Käkkirurg (biopsi)',behandlingTag:'remiss biopsi sår',followup:'Specialistsvar och histopatologisk diagnos tas in i journal.',text:`REMISS TILL ORALMEDICINSKA/KÄKKIRURGISKA KLINIKEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Persisterande slemhinnesår >2 veckor trots avlägsnande av utlösande trauma — biopsi för att utesluta malignitet.
Anamnes: Sår uppkommet [datum] sekundärt till [vass kusp/protes/bettning]. Utlösande orsak åtgärdad [datum]. Sår kvarstår trots adekvat behandling.
Riskfaktorer: [Rökning: Ja/Nej, Alkohol: Ja/Nej, Snus: Ja/Nej, Tidigare malignitet: Ja/Nej].
Status: Sår regio [XX], storlek [mm], [induration/vallartade kanter/lymfkörtlar hals]. Kliniska foton bifogade.
Tidigare åtgärd: Slipning av vass kusp/protesjustering, Klorhexidinsköljning, Xylocain gel.
Önskar bedömning av: Biopsi för histopatologisk diagnos.
Prioritet: Snar (inom 2 veckor) — vid stark malignitetsmisstanke: SVF-remiss istället.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'biopsi_remiss',label:'Remiss biopsi (>2 veckor)',text:'Remiss utfärdad till käkkirurg/oralmedicin för biopsi — sår >2 veckor utan läkning.'}],
 lakemedel:'Klorhexidin 0,2%. Xylocain gel v.b.',remissSpec:'Oral medicin'},

{id:'oral36',icd:'B37.0',name:'Akut Erytematös Candidos',cat:'Oralmedicin',scId:'ORAL-36-CANDIDA',
 symptom:['candida','sveda','tunga','gom','rodnad','xerostomi'],
 behandling:['Nystatin','Nystimex','Flukonazol'],
 varning:'Flukonazol — interaktion med Warfarin, kontrollera ALLTID via Janusmed.',
 mallar:[
  {id:'m1',label:'Mall — Erytematös candidos',behandlingTag:'Nystatin',followup:'Uppföljning om läkning uteblir.',
   text:`Diagnos: Akut erytematös candidos.

Anamnes: Sveda i [tunga/gom] sedan [tid].
[Antibiotikakur avslutad X veckor sedan / Pulmicort utan munsköljning / Xerostomi / Annat].
Diabetes: [Ja/Nej]. HIV: [Ej känt].

Status:
- Kraftig rodnad, oskarpt avgränsad i [hårda gommen / tungryggen]
- Papillatrofi på tungryggen
- Inga vita avskrapbara beläggningar (erytematös form)
- Munvinklar: [Bilaterala ragader → behandlas med Daktacort]

Bedömning: Erytematös candidos [antibiotika- / inhalationssteroid-]associerad.

Samtycke: Patienten informerad om diagnos (svampinfektion), bakomliggande orsak (antibiotika/inhalationssteroid/muntorrhet/diabetes), behandlingsalternativ (Nystatin lokalt vs Flukonazol systemiskt) samt vikten av lång behandlingstid (4 veckor + 1–2 v efter symtomfrihet). Samtycke inhämtat.

Åtgärd:
- Kausal: Instruktion om munsköljning med vatten efter inhalation av kortikosteroid
- Rengöring av eventuell avtagbar protes — nattvila ur munnen, blötläggning i Klorhexidin 0,2%
- Recept: Mixt Nystimex 100 000 IE/ml. 4 ml × 4 i 4 veckor (fortsätt 1–2 v efter symtomfrihet)
[- Flukonazol 50 mg × 1 i 7–14 dagar vid behov
  OBS: Warfarin-interaktion kontrollerad via Janusmed]
[- Daktacort kräm vid bilaterala ragader]

Material:
- Mixt Nystimex 100 000 IE/ml (recept)
- Klorhexidin 0,2% (Hexident) för protesblötläggning
- Daktacort kräm vid angulär cheilit
- Kliniskt foto (efter samtycke)

Information om eventuella efterbesvär:
- Symtom (sveda) avtar gradvis under 1–2 veckor
- KRITISKT: Fortsätt Nystimex hela 4 veckor + 1–2 veckor efter symtomfrihet för att undvika recidiv
- Skölj munnen med vatten efter varje inhalation av kortikosteroid (Pulmicort/Symbicort)
- Avtagbar protes ut nattetid, blötläggs i Klorhexidin 0,2%
- Optimera blodsockerkontroll (vid diabetes), behandla muntorrhet med saliversättning
- Kontakta kliniken vid: utebliven förbättring efter 2 veckor, försämring, ny lokalisation, sväljsvårigheter (esofageal candidos kräver remiss)

Uppföljning: Kontroll om läkning uteblir.`},
  {id:'remiss',label:'Remiss — Läkare/VC (underliggande orsak)',behandlingTag:'remiss vc candidos utredning',followup:'Återkoppling om predisponerande systemfaktor.',text:`REMISS TILL VÅRDCENTRAL

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Recidiverande oral candidos — utredning av eventuell predisponerande systemfaktor.
Anamnes: Erytematös candidos [primär/recidiv]. [Antibiotikakur/inhalationssteroid/xerostomi/oklar orsak].
Tidigare åtgärd: Nystimex 4 ml × 4 i 4 veckor [+ Flukonazol 50 mg × 1 i 7–14 dagar] — [god effekt / recidiv inom X veckor].
Status: [Aktuell status munhåla].
Önskar bedömning av: Blodprover (Hb, HbA1c, glukos, B12, järn), eventuell HIV-test vid kliniska skäl, översyn av inhalationsteknik och muntorrhetsorsaker (läkemedel/Sjögren).
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'flukonazol',label:'Flukonazol (andrahandsval)',text:'Flukonazol 50 mg × 1 i 7–14 dagar. OBS: Warfarin-interaktion kontrollerad via Janusmed.'}],
 lakemedel:'Nystimex 4 ml × 4 i 4 veckor. Flukonazol 50 mg andrahandsval.',remissSpec:'Läkare/VC'},

{id:'oral37',icd:'Z03.1 / K13.7',name:'Malignitetssuspekt Förändring',cat:'Oralmedicin',scId:'ORAL-37-MALIGN',
 symptom:['malignitet','cancer','ulceration','leukoplaki','erytroplaki','vallartade kanter'],
 behandling:['SVF-remiss','fotodokumentation'],
 varning:'⚠️ INGEN BIOPSI av allmäntandläkare. SVF-remiss OMGÅENDE. Ring mottagningen.',
 mallar:[
  {id:'m1',label:'Mall — Malignitetssuspekt förändring',behandlingTag:'SVF-remiss',followup:'AKUT SVF-remiss. Telefon till mottagning.',
   text:`Diagnos: Observation för misstänkt malign tumör i munhåla / förändring i munslemhinnan.

Anamnes: [Sår / Knöl / Fläck] i [lokalisation] >2 veckor utan läkning.
Riskfaktorer: [Rökning: Ja/Nej. Alkohol: Ja/Nej. Snus: Ja/Nej. HPV: okänt].

Status:
- [X] mm förändring regio [XX]
  Utseende: [Ulceration med vallartade kanter / Erytroplaki / Leukoplaki]
- Palpation: [Induration / Mjuk] [Fastvuxen / Rörlig]
- Lymfkörtlar hals: [u.a. / Asymmetrisk hård oöm knöl]
[- Känselbortfall i [läpp/haka/tunga]: Ja/Nej]

Bedömning: Malignitetssuspekt förändring utan läkning på [X] veckor.

Samtycke: Patienten informerad om misstanke om allvarlig diagnos, vikten av skyndsam vidareutredning via Standardiserat Vårdförlopp (SVF), att INGEN biopsi tas av allmäntandläkare samt att telefonkontakt tas med mottagningen. Samtycke till remiss och fotodokumentation inhämtat.

Åtgärd:
- INGEN BIOPSI av undertecknad
- Kliniska foton (intraorala) bifogade remissen
- Remiss OMGÅENDE till Käkkirurgiska / ÖNH för SVF-utredning
  Märkt: "SVF — Huvud-hals cancer, malignitetsmisstanke"
- Telefonkontakt med mottagning för prioriterad handläggning
- Patient informerad om kontaktväg och tidsram

Material:
- Kliniskt foto (intraorala, palpationsfynd)
- Eventuell tungspatel + spegel för dokumentation
- Spårning i journalsystemet för uppföljning av remissmottagande

Information om eventuella efterbesvär:
- Patienten kommer kallas till Käkkirurgi/ÖNH inom dagar (SVF — Standardiserat Vårdförlopp)
- Biopsi och fortsatt utredning sker på specialistklinik
- Ingen aktiv åtgärd från allmäntandläkare i nuläget — undvik manipulation av området
- Sluta röka/snusa om aktuellt (förbättrar prognos och behandlingstolerans)
- Kontakta kliniken om kallelse ej kommer inom 1–2 veckor — för uppföljning av remiss

Uppföljning: AKUT SVF-remiss.`},
  {id:'remiss',label:'Remiss — SVF Käkkirurg/ÖNH (Huvud-hals cancer)',behandlingTag:'remiss SVF malignitet',followup:'AKUT — säkerställ att patient anlänt och fått tid inom SVF-tidsram.',text:`REMISS — SVF HUVUD-HALS CANCER

Patient: [Namn], pers.nr [XXXXXX-XXXX]
MÄRKNING: "SVF — Huvud-hals cancer, malignitetsmisstanke"
Telefonkontakt med mottagning: [datum/tid, namn på mottagare]

Frågeställning: Malignitetssuspekt förändring i munhåla — utredning enligt Standardiserat Vårdförlopp (SVF).

Anamnes:
- Symtom debut: [datum / >2 veckor / >4 veckor]
- Riskfaktorer: Rökning [Ja/Nej, paket-år], Alkohol [Ja/Nej], Snus [Ja/Nej], Tidigare malignitet [Ja/Nej], HPV-status [okänt]
- Övriga symtom: Viktnedgång [Ja/Nej], Smärta [Ja/Nej], Sväljsvårighet [Ja/Nej], Heshet [Ja/Nej]

Status:
- Lokalisation: regio [XX]
- Storlek: [X] mm
- Utseende: [Ulceration med vallartade kanter / Erytroplaki / Leukoplaki / Blandad / Exofytisk växt]
- Palpation: [Induration / Mjuk] [Fastvuxen / Rörlig]
- Lymfkörtlar hals: [u.a. / Asymmetrisk hård oöm knöl regio]
- Känselbortfall: [Nej / Ja i läpp/haka/tunga]

Bilagor: Kliniska foton intraoralt + extraoralt. [Panorama/CBCT vid behov.]

Tidigare åtgärd: INGEN BIOPSI tagen. Ingen lokal behandling påbörjad.

Önskar bedömning av: Biopsi, eventuell stadieindelning, MDT-konferens.
Prioritet: AKUT (SVF — välgrundad misstanke)

Remittent: [namn], leg. tandl., [klinik], telefon [XXX]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[],lakemedel:'Ingen medicinering.',remissSpec:'Käkkirurg'},

{id:'oral38a',icd:'K06.1',name:'Läkemedelsinducerad Gingival Överväxt (DIGO)',cat:'Oralmedicin',scId:'ORAL-38A-DIGO',
 symptom:['gingival hyperplasi','svullet tandkött','DIGO','Amlodipin','Sandimmun','Fenytoin'],
 behandling:['depuration','munhygieninstruktion','gingivektomi'],
 varning:'Sätt ALDRIG ut medicin på eget initiativ — kontakta patientens läkare.',
 mallar:[
  {id:'m1',label:'Mall — Läkemedelsinducerad gingival överväxt',behandlingTag:'depuration',followup:'Uppföljning om 4–6 veckor. Remiss gingivektomi vid kvarstående.',
   text:`Diagnos: Gingival överväxt (läkemedelsinducerad — DIGO).

Anamnes: Medicinerar med [Amlodipin / Sandimmun (ciklosporin) / Fenytoin / Nifedipin] sedan [år].
Svullet tandkött, svårt att rengöra approximalt.

Status:
- [Generell / Lokal] gingival hyperplasi, framförallt [front / hela bett]
- Vävnaden fast och fibrös vid palpation
- Pseudofickor: [X–X] mm. Bennivå: [Intakt / Sänkt]

Bedömning: Klinisk bild förenlig med läkemedelsbiverkan (DIGO).

Samtycke: Patienten informerad om diagnos (läkemedelsbiverkan), behandlingsplan (mekanisk rengöring + optimerad munhygien), risk för kvarstående överväxt trots åtgärd samt eventuell remiss för gingivektomi. Information om att läkemedlet INTE sätts ut av tandläkare — kontakt med behandlande läkare för eventuellt preparatbyte. Samtycke inhämtat.

Anestesi:
☐ Ytanestesi Xylocain salva 5% — vid djup depuration
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration vid behov
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Ingen anestesi krävdes

Åtgärd:
- Professionell rengöring (ultraljud + handinstrument) och polering
- Instruktion i atraumatisk borstteknik (modifierad Bass) + mellanrumsborste/tandtråd
- Klorhexidin 0,2% (Hexident) sköljning kortvarigt 2 veckor
- [Behandlande läkare kontaktad ang. ev. preparatbyte — t.ex. Amlodipin → Felodipin]

Material:
- Ultraljud (EMS/Cavitron) + handinstrument (Gracey)
- Polishpasta + gummikopp
- Mellanrumsborstar (TePe storlek anpassad)
- Klorhexidin 0,2% (Hexident)
- Kliniskt foto + parodontalstatus för uppföljning

Information om eventuella efterbesvär:
- Lätt ömhet och blödning vid borstning 3–5 dagar postoperativt
- Förbättring av gingival kontur 4–6 veckor efter optimerad munhygien
- KRITISKT: Sluta INTE ta medicinen på eget initiativ — kontakt med behandlande läkare för eventuellt preparatbyte
- Optimal munhygien är avgörande — minimerar inflammation som förvärrar överväxten
- Kontakta kliniken vid: kvarstående överväxt efter 4–6 veckor (remiss gingivektomi), tilltagande blödning, smärta, abscess

OBS: Sätt ALDRIG ut medicin på eget initiativ.

Uppföljning: [4–6 veckor]. Vid kvarstående: remiss gingivektomi.`},
  {id:'remiss',label:'Remiss — Patientens läkare (preparatbyte)',behandlingTag:'remiss läkare preparatbyte DIGO',followup:'Återkoppling om eventuellt preparatbyte.',text:`KONTAKT/REMISS TILL BEHANDLANDE LÄKARE

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Läkemedelsinducerad gingival överväxt (DIGO) sekundärt till [Amlodipin/Ciklosporin/Fenytoin] — kan preparatbyte övervägas?
Anamnes: Patienten medicinerar med [preparat] [dos] sedan [år] för [indikation]. Gingival överväxt utvecklad gradvis.
Status: [Generell/Lokal] gingival hyperplasi, [front/hela bett]. Försämrar munhygien och oral hälsa.
Tidigare åtgärd: Professionell rengöring, munhygieninstruktion, Klorhexidin 0,2%. Optimerad munhygien har inte normaliserat gingivan.
Önskar bedömning av: Möjlighet att byta till alternativt preparat med lägre risk för gingival överväxt (t.ex. Amlodipin → Felodipin; Ciklosporin → Takrolimus).
Prioritet: Rutin

OBS: Tandläkaren sätter INTE ut läkemedlet — beslut om eventuellt byte ligger hos behandlande läkare.

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`},
  {id:'remiss_gingivektomi',label:'Remiss — Parodontolog (gingivektomi)',behandlingTag:'remiss parodontolog gingivektomi',followup:'Specialistsvar och planering av gingivektomi.',text:`REMISS TILL PARODONTOLOGISKA KLINIKEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Kvarstående läkemedelsinducerad gingival överväxt trots optimerad munhygien — bedömning för gingivektomi/gingivoplastik.
Anamnes: DIGO sekundärt till [Amlodipin/Ciklosporin/Fenytoin] sedan [år]. Kontakt tagen med behandlande läkare — [preparatbyte ej möjligt / utfört men otillräcklig effekt].
Status: [Generell/Lokal] fibrös gingival hyperplasi, regio [XX]. Pseudofickor [X mm]. Funktionellt/estetiskt problem.
Tidigare åtgärd: Upprepad mekanisk debridement, optimerad munhygien, Klorhexidin. Otillräcklig effekt.
Önskar bedömning av: Gingivektomi/gingivoplastik (konventionell skalpell / elektrokirurgi / laser).
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}
 ],
 extraAtgard:[
  {id:'remiss_lak',label:'Kontakt patientens läkare',text:'Behandlande läkare kontaktad angående eventuellt preparatbyte.'},
 ],
 lakemedel:'Ingen medicinering.',remissSpec:'Oral medicin'
},

{id:'oral38b',icd:'M87.18',name:'MRONJ (Läkemedelsrelaterad Käkbensnekros)',cat:'Oralmedicin',scId:'ORAL-38B-MRONJ',
 symptom:['MRONJ','käkbensnekros','antiresorptivt','bisfosfont','Prolia','blottat ben'],
 behandling:['spolning','antibiotika','remiss käkkirurg'],
 varning:'⚠️ Sätt INTE ut antiresorptivt läkemedel — ingen evidens för nytta. Remiss käkkirurg.',
 mallar:[
  {id:'m1',label:'Mall — MRONJ',behandlingTag:'spolning remiss',
   text:`Diagnos: Osteonekros i käkarna (läkemedelsrelaterad — MRONJ).

Anamnes: Medicinerar med [Alendronat/Zometa/Prolia (denosumab)/Xgeva/annat antiresorptivt/antiangiogent].
Indikation: [Osteoporos / Cancerbehandling]. Duration: [X år].
Kortikosteroider: [Ja/Nej]. Extraktion/ingrepp: [Ja, tand XX / Ingen känd orsak].

Status:
- Blottlagt gulvitt ben regio [XX], ca [X] mm
- Gingivan runtom: [Rodnad / Svullen / Pus]
- Lukt: [Foetor ex ore]
[- Känselbortfall läpp (Vincents symtom): Ja/Nej]

MRONJ-stadium: [0 / 1 / 2 / 3].

Bedömning: Läkemedelsrelaterad osteonekros i käkben, stadium [X].

Samtycke: Patienten informerad om diagnos, allvarlighetsgrad, att läkemedlet INTE sätts ut (ingen evidens för nytta), behandlingsplan (spolning, antibiotika vid infektion, remiss käkkirurg), risk för kroniskt förlopp samt vikten av regelbunden tandvård för att undvika ytterligare nekros. Samtycke inhämtat.

Anestesi:
☐ Ytanestesi Xylocain salva 5% — vid spolning/slipning
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet, undvik infiltration nära nekros
☐ Septocaine 4% + adrenalin 1:200 000 — endast vid behov, undvik intraosseös teknik
☐ Ingen anestesi krävdes

Åtgärd:
- Spolning med steril koksalt 0,9% / Klorhexidin 0,2% (Hexident)
[- PcV 1,6 g × 3 i 5–7 dagar vid aktiv infektion (alt. Klindamycin 150 mg × 3 vid pc-allergi)]
[- Metronidazol 400 mg × 3 vid blandflora]
- Slipning av vassa benkanter med diamantborr (undviker att blottlägga nytt ben)
- INGEN extraktion eller kirurgisk åtgärd av allmäntandläkare
- Förebyggande information om munhygien runt området

Material:
- Steril koksalt 0,9% spolning + spruta
- Klorhexidin 0,2% (Hexident) lösning
- Diamantborr fin korn (för slipning av vassa kanter)
- Kliniskt foto + panorama för uppföljning
- Sterilt kompresser

Information om eventuella efterbesvär:
- Kroniskt tillstånd — läkning kan ta månader till år, vissa lesioner kvarstår
- Symtomlindring (smärta, lukt, infektion) är huvudmål; full benregeneration ovanligt
- KRITISKT: Läkemedlet sätts INTE ut av tandläkaren — ingen evidens för "drug holiday"-nytta
- Daglig sköljning: Klorhexidin 0,2% × 2 i veckor (enligt käkkirurg)
- Ingen tandextraktion eller annat invasivt ingrepp utan käkkirurgisk bedömning
- Optimera munhygien — förebygg ytterligare exposition
- Kontakta vården vid: feber >38°C, tilltagande svullnad, känselbortfall i läpp (Vincents tecken), fistelbildning, ökad blottning

OBS: Läkemedlet SÄTTS INTE UT.

Remiss: Käkkirurgiska kliniken för MRONJ-bedömning.

Information: Patienten informerad om tillståndet och vikten av regelbunden tandvård.`,followup:'Remiss käkkirurg. Regelbunden uppföljning.'},
  {id:'remiss',label:'Remiss — Käkkirurg (MRONJ)',behandlingTag:'remiss käkkirurg MRONJ',followup:'Specialistsvar samt MRONJ-stadium och fortsatt handläggning.',text:`REMISS TILL KÄKKIRURGISKA KLINIKEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Läkemedelsrelaterad osteonekros i käkben (MRONJ) — bedömning, stadieindelning och fortsatt handläggning.
Anamnes:
- Antiresorptivt/antiangiogent läkemedel: [Alendronat/Zometa/Prolia/Xgeva/Avastin/annat]
- Indikation: [Osteoporos / Cancerbehandling (myelom/bröst/prostata/annan)]
- Duration: [X år/månader]
- Kortikosteroidbehandling: [Ja/Nej]
- Utlösande faktor: [Extraktion tand XX / Spontan / Protesirritation / Implantat]
- Tidigare/pågående onkologisk behandling: [Ja/Nej, specifikation]
Status:
- Lokalisation: regio [XX]
- Blottlagt ben: storlek [X mm], duration [veckor/månader]
- Gingiva: [rodnad/svullen/pus/fistel]
- Lukt: [foetor ex ore]
- Vincents tecken (känselbortfall läpp/haka): [Ja/Nej]
- MRONJ-stadium: [0/1/2/3]
Bilagor: Panorama, kliniska foton, läkemedelslista.
Tidigare åtgärd: Spolning Klorhexidin 0,2%, [PcV/Klindamycin/Metronidazol enligt indikation], slipning av vassa benkanter. Läkemedel ej utsatt.
Önskar bedömning av: MRONJ-stadium, konservativ vs kirurgisk handläggning, kontakt med behandlande onkolog/läkare, fortsatt uppföljning.
Prioritet: Snar

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}
 ],
 extraAtgard:[
  {id:'antibiotika',label:'Antibiotika (aktiv infektion)',text:'PcV 1,6 g × 3 i 5–7 dagar vid aktiv infektion.'},
 ],
 lakemedel:'Klorhexidin 0,2%. PcV vid infektion.',remissSpec:'Käkkirurg'
},

{id:'oral40a',icd:'G50.0',name:'Trigeminusneuralgi (Misstänkt)',cat:'Oralmedicin',scId:'ORAL-40A-TRIGEM',
 symptom:['trigeminusneuralgi','blixtsmärta','attacker','elektrisk smärta','ansiktssmärta'],
 behandling:['remiss neurolog','karbamazepin','ingen dental åtgärd'],
 varning:'⚠️ INGEN dental åtgärd. Rotbehandling och extraktion av friska tänder botar INTE neuralgi.',
 mallar:[
  {id:'m1',label:'Mall — Trigeminusneuralgi (misstänkt)',behandlingTag:'remiss neurolog',
   text:`Diagnos: Trigeminusneuralgi (misstänkt) — icke-odontogen smärta.

Anamnes: Attacker av extrem blixtrande smärta [höger/vänster] sida ansikte.
Duration: sekunder. Besvärsfri mellan attackerna.
Utlöses av: [beröring / tvätt / rakning / tuggning / tal].

Dentalt status:
- Tänder [XX–YX]: u.a. kliniskt och radiologiskt
- Kyla-test: Normal på alla tänder. Perkussion: u.a.

Neurologiskt:
- Ingen sensibilitetsnedsättning noterad
  [OBS: Hypoestesi/anestesi → misstänk tumör/MS → skyndsam utredning]

Bedömning: Klinisk bild talar för trigeminusneuralgi. Ingen dental orsak.

Samtycke: Patienten informerad om att smärtan INTE är odontogen, att ingen dental åtgärd (rotbehandling, extraktion) är indicerad och att utredning + behandling sker via neurolog (karbamazepin förstahand). Information om att rotbehandling/extraktion av friska tänder INTE botar neuralgi och kan förvärra besvären. Samtycke inhämtat.

Åtgärd:
- Information till patienten om diagnos och fortsatt vårdväg
- INGEN DENTAL ÅTGÄRD — ingen rotbehandling, ingen extraktion av friska tänder
- Vanliga analgetika (Alvedon/NSAID) har ej effekt vid neuralgi
- Remiss till läkare/neurolog för utredning

Material:
- Kyla-test (Endo-Frost / etylkloridspray)
- Perkussionsinstrument
- Periapikal/bitewing-röntgen för att utesluta dental orsak
- Klinisk dokumentation av smärtmönster + triggerzoner

Information om eventuella efterbesvär:
- Vanliga smärtstillande (Paracetamol/Ibuprofen) har ingen effekt — undvik onödig medicinering
- Triggerundvikande kan ge tillfällig lindring (undvik kall luft, varsam ansiktstvätt)
- Karbamazepin (Tegretol) är förstahandsbehandling — sätts in av läkare/neurolog
- KRITISKT: Acceptera INTE rotbehandling eller extraktion av friska tänder som "test" — det botar inte neuralgi
- MR-undersökning kan bli aktuellt för att utesluta tumör/MS
- Kontakta vården vid: tilltagande smärta, känselbortfall i ansikte (kan tyda på sekundär orsak), synrubbningar, motoriska symtom

Remiss: Läkare / Neurolog för utredning och ev. karbamazepin (Tegretol).`,followup:'Remiss neurolog/läkare. Ingen dental åtgärd.'},
  {id:'remiss',label:'Remiss — Neurolog/Läkare (trigeminusneuralgi)',behandlingTag:'remiss neurolog trigeminusneuralgi',followup:'Specialistsvar och eventuell farmakologisk behandling.',text:`REMISS TILL NEUROLOG / VÅRDCENTRAL

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Misstänkt trigeminusneuralgi — utredning och eventuell farmakologisk behandling (karbamazepin).
Anamnes:
- Symtomdebut: [datum]
- Smärtkaraktär: Attacker av extrem blixtrande/elektrisk smärta, sekunder lång, besvärsfri mellan attackerna
- Lokalisation: [V1/V2/V3] [höger/vänster]
- Triggerfaktorer: [beröring/tvätt/rakning/tuggning/tal/kall luft]
- Frekvens: [X attacker/dag]
- Tidigare neurologisk sjukdom: [Nej/MS/annat]
Dentalt status:
- Tänder i området kliniskt och radiologiskt u.a.
- Kyla-test, perkussion, palpation: u.a.
- Ingen odontogen orsak påvisad
Neurologiskt status (orienterande):
- Sensorik trigeminus: [u.a. / hypoestesi i V[X] — OBS sekundär orsak]
- Motorik: [u.a.]
Tidigare åtgärd: INGEN dental åtgärd. Patienten informerad om icke-odontogen orsak.
Önskar bedömning av: Diagnos, eventuell MR hjärna (utesluta tumör/MS/vaskulär kompression), insättning av karbamazepin (Tegretol) eller oxkarbazepin.
Prioritet: [Snar vid svåra attacker / Rutin]

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}
 ],
 extraAtgard:[],
 lakemedel:'Ingen dental medicinering. Karbamazepin via neurolog.',remissSpec:'Neurolog'
},

{id:'oral40b',icd:'K14.6',name:'Burning Mouth Syndrome (Munsveda)',cat:'Oralmedicin',scId:'ORAL-40B-BMS',
 symptom:['munsveda','tungsveda','brännande','BMS','sveda','crescendo'],
 behandling:['utredning','remiss läkare','blodprover','SLS-fri tandkräm'],
 varning:null,
 mallar:[
  {id:'m1',label:'Mall — Burning Mouth Syndrome',behandlingTag:'utredning remiss',
   text:`Diagnos: Burning Mouth Syndrome (Munsveda/Tungsveda).

Anamnes: Daglig sveda/brännande i [tunga / läppar / gom] sedan [tid].
>2 h/dag. Värre på kvällen (crescendo-mönster). Stör sällan nattsömnen.
Muntorrhet: [Ja/Nej]. Smakförändring: [Ja/Nej].

Status:
- Slemhinna: U.a. Normal färg och struktur. Ingen candida.
  (OBS: Röd slemhinna → troligen candidos, inte BMS)

Bedömning: Munsveda utan synliga kliniska fynd — primär BMS efter uteslutning av sekundära orsaker.

Samtycke: Patienten informerad om diagnos (godartad åkomma), kronisk natur, att lokala dentala fynd saknas och att utredning av bakomliggande systemorsak sker via läkare (blodprover). Information om symtomlindrande råd (SLS-fri tandkräm, salivstimulering) och att specifik kausal behandling ofta saknas. Samtycke inhämtat.

Åtgärd:
- Information: Godartad åkomma (lugnande besked). Ej malign. Ej cancer.
- SLS-fri tandkräm (t.ex. Zendium, Sensodyne ProNamel)
- Salivstimulerande medel vid xerostomi (t.ex. Xerodent, Salivin, sockerfria pastiller)
- Råd att undvika alkoholbaserade munsköljmedel
- Stresshantering, kostråd (undvik kanel, sura/kryddstarka livsmedel)

Material:
- Tungspatel + spegel för noggrann inspektion av slemhinna
- Kliniskt foto för dokumentation
- Sialometer vid misstanke xerostomi (vilo-/stimulerad salivmätning)

Information om eventuella efterbesvär:
- Kroniskt tillstånd — fluktuerande symtom under år är vanligt
- Lugnande besked: ingen malignitet, ingen smittsamhet
- Byte till SLS-fri tandkräm (Zendium) ger förbättring hos vissa patienter
- Undvik alkoholbaserade munsköljmedel, kryddstark mat, citrus
- Stress, depression och ångest kan förvärra — eventuell remiss för stresshantering/KBT
- Vid xerostomi: drick små klunkar vatten, sockerfria pastiller, Xerodent/Salivin
- Kontakta kliniken vid: nya kliniska fynd (rodnad, vit beläggning, sår), tilltagande smärta, viktnedgång, neurologiska symtom

Remiss: Läkare/VC för Hb, järn, ferritin, B12, folsyra, zink, HbA1c, TSH.

Uppföljning: Återbesök [4–6 veckor] för provsvar.`,followup:'Återbesök om 4–6 veckor för provsvar.'},
  {id:'remiss',label:'Remiss — Läkare/VC (utredning sekundär BMS)',behandlingTag:'remiss vc BMS utredning',followup:'Återkoppling om provsvar och eventuell systemisk orsak.',text:`REMISS TILL VÅRDCENTRAL

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Burning Mouth Syndrome — utredning av sekundära orsaker (näringsbrist, endokrint, diabetes, mediciner).
Anamnes: Daglig sveda/brännande i [tunga/läppar/gom] sedan [tid]. >2 h/dag, crescendo-mönster. [Muntorrhet/smakförändring].
Dentalt status: Slemhinna u.a., ingen candidos, ingen lokal orsak. Tänder/protes utan irriterande faktorer.
Aktuella mediciner: [SSRI/ACE-hämmare/diuretika/andra som kan ge muntorrhet — specificera].
Tidigare åtgärd: SLS-fri tandkräm, salivstimulering, kostråd.
Önskar bedömning av: Blodprover (Hb, MCV, järn, ferritin, B12, folsyra, zink, HbA1c, fasteblodglukos, TSH, T4-fritt), eventuell läkemedelsöversyn (xerogena preparat), eventuell remiss för stresshantering/depression.
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}
 ],
 extraAtgard:[],
 lakemedel:'SLS-fri tandkräm. Salivstimulerande medel v.b.',remissSpec:'Läkare/VC'
},

{id:'oral40c',icd:'B02.2',name:'Herpes Zoster (Bältros)',cat:'Oralmedicin',scId:'ORAL-40C-ZOSTER',
 symptom:['herpes zoster','bältros','Ramsay Hunt','ansiktssmärta','blåsor enkelsidigt'],
 behandling:['Valaciklovir','antiviralt','remiss läkare'],
 varning:'⚠️ Antiviralt MÅSTE sättas in inom 72h. Vesiklar i ytterörat + perifer facialispares → Ramsay Hunt → Akut ÖNH.',
 mallar:[
  {id:'m1',label:'Mall — Herpes Zoster (Bältros)',behandlingTag:'antiviralt remiss',
   text:`Diagnos: Herpes Zoster (V2 / V3) — Bältros.

Anamnes: Intensiv brännande smärta [höger/vänster] sida ök/uk sedan [X] dagar.
Nu debut av blåsor/sår.

Status:
- Enkelsidiga sår/blåsor i [gommen/kinden] som EJ överskriver medellinjen
  (följer V[2/3])
- Tänder u.a.

Bedömning: Klinisk bild förenlig med Herpes Zoster (Bältros).

Samtycke: Patienten informerad om diagnos (reaktivering av varicella-zoster), vikten av antiviralt INOM 72 h (minskar postherpetisk neuralgi), att INGEN dental åtgärd är indicerad samt att specifik diagnostik och behandling sker via läkare. Information om risk för Ramsay Hunt vid ytteröreengagemang. Samtycke inhämtat.

Åtgärd:
- Information om diagnos, orsak (reaktivering varicella-zoster) och förlopp
- INGEN DENTAL ÅTGÄRD
- Smärtlindring: Paracetamol 500–1000 mg × 4 + Ibuprofen 400 mg × 3 v.b.
- AKUT telefonkontakt med läkare/VC för antiviralt insättning
- Inspektion av ytteröra för att utesluta Ramsay Hunt

Material:
- Tungspatel + spegel + ficklampa
- Otoskop (om tillgängligt) eller visuell inspektion ytteröra
- Kliniskt foto för dokumentation
- Klinisk dokumentation av dermatomgräns (V1/V2/V3)

Information om eventuella efterbesvär:
- Smärta och blåsor varar 2–4 veckor — krustabildning, läkning utan ärr (om ej skrapas)
- KRITISKT: Postherpetisk neuralgi (PHN) kan kvarstå månader–år — antiviralt INOM 72 h minskar risken
- Smärtlindring: Paracetamol + Ibuprofen, eventuellt amitriptylin/gabapentin via läkare vid PHN
- Smittsamt mot personer utan vattkoppor/vaccinerad — undvik gravida, nyfödda, immunsuprimerade
- Undvik dental behandling under akut fas (smärtprovokation)
- Kontakta vården AKUT vid: vesiklar i ytterörat + ansiktsförlamning (Ramsay Hunt → ÖNH/neurolog), synpåverkan (V1 zoster ophthalmicus → ögonläkare), tilltagande neurologiska symtom

Remiss: Läkare/VC för Valaciklovir 1 g × 3 i 7 dagar — INOM 72 h.

[OBS: Vesiklar i ytterörat + perifer facialispares → Ramsay Hunt →
 Remiss AKUT ÖNH/neurolog]`,followup:'Akut remiss läkare för antiviralt inom 72h.'},
  {id:'remiss',label:'Remiss — Läkare/VC (antiviralt <72h)',behandlingTag:'remiss vc zoster antiviralt',followup:'AKUT — bekräfta insättning av antiviralt inom 72h.',text:`AKUT REMISS TILL VÅRDCENTRAL / ÖNH

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Herpes Zoster i [V2/V3]-utbredning — akut insättning av antiviralt inom 72 h.
Anamnes: Symtomdebut: Smärta sedan [X] dagar, blåsor sedan [X] dagar/timmar. Tidigare vattkoppor: [Ja/Okänt]. Immunsuppression: [Nej/Ja, specificera].
Status:
- Enkelsidiga sår/vesiklar/krustor i [gom/kind/läpp] som EJ överskriver medellinjen
- Följer dermatom V[2/3]
- Lymfkörtlar hals: [u.a. / Submandibulär lymfadenit]
- Ytteröra inspekterat: [u.a. / vesiklar — misstanke Ramsay Hunt]
- Ansiktsmotorik: [u.a. / facialispares — misstanke Ramsay Hunt]
- Öga (vid V1-engagemang): [Ej aktuellt / Rodnad/synpåverkan]
Tidigare åtgärd: Paracetamol + Ibuprofen ordinerat. Patient informerad.
Önskar bedömning av: Insättning av Valaciklovir 1 g × 3 i 7 dagar (alt. aciklovir/famciklovir), smärtlindring, vid Ramsay Hunt → AKUT ÖNH/neurolog, vid V1-engagemang → ögonläkare.
Prioritet: AKUT (inom 72 h från blåsdebut)

Remittent: [namn], leg. tandl., [klinik], telefon [XXX]
Datum: [YYYY-MM-DD]`}
 ],
 extraAtgard:[{id:'ramsay_hunt',label:'Ramsay Hunt → AKUT ÖNH',text:'AKUT remiss utfärdad till ÖNH/neurolog pga misstanke Ramsay Hunt syndrom.'}],
 lakemedel:'Valaciklovir 1 g × 3 i 7 dagar — via läkare. Paracetamol + Ibuprofen.',remissSpec:'Läkare/VC'},


// ── TRAUMA MJÖLKTÄNDER ──
{id:'pedo41',icd:'S03.2 / S02.5',name:'Luxationsskador mjölktand',cat:'Trauma — Mjölktänder',scId:'PEDO-41-LUX',
 symptom:['luxation','subluxation','trauma mjölktand','rörlig tand','apex','bettstörning'],
 behandling:['observation','extraktion','reponering'],varning:null,
 mallar:[
  {id:'m1',label:'A — Observation (subluxation / ingen bettstörning)',behandlingTag:'observation',followup:'Uppföljning om 1 vecka kliniskt.',
   text:`Diagnos: Luxationsskada mjölktand [nr] — subluxation/lateralluxation utan ocklusionspåverkan.

Trauma-anamnes: Olycka idag. Slag mot munnen. Ingen medvetslöshet/kräkning. Stelkrampsvaccination: OK.

Status:
- Extraoralt: [Skrubbsår överläpp / Hematom haka / u.a.]
- Intraoralt: Blödning gingivalrand regio [51/61]. [Sår frenulum / u.a.]
- Dental: Tand [nr] subluxerad/lateralluxerad, mobilitet grad [I/II]. Ingen ocklusionsstörning.

Rtg: Tand [nr] — [vidgad rothinnespalt / apex buckalt / inga rotfrakturer].
Permanent tandanlag bedöms intakt.

Bedömning: [Subluxation / Lateralluxation] tand [nr]. Ingen bettstörning. Apex buckalt — avvaktar.

Samtycke: Förälder informerad om diagnos, expektans-strategi, risk för senare komplikationer (missfärgning, pulpanekros, fistel, infektionsspridning till permanent tandanlag), uppföljningsplan samt försäkringsanmälan. Samtycke inhämtat.

Åtgärd:
- Lugnande besked och information till förälder
- Skonkost 1–2 v, klorhexidinbaddning 0,12% × 2/dag med kompress (ej skölj — barn kan svälja)
- Försäkringsanmälan upprättad
- Information om komplikationer (missfärgning, nekros, fistel)
- Kliniskt foto + rtg-kopia i journal

Material:
- Klorhexidin 0,12% lösning + kompresser för baddning
- Periapikal rtg / småbarnsfilm
- Kliniskt foto

Information om eventuella efterbesvär:
- Måttlig ömhet och svullnad 2–5 dagar — Paracetamol enligt vikt v.b.
- Skonkost 1–2 veckor, ingen tuggning på den traumatiska sidan
- Klorhexidinbaddning 2 ggr/dag med kompress i 1–2 veckor (barn ska INTE skölja och svälja)
- Tanden kan missfärgas (grå/gul/rosa) inom veckor till månader — kan tyda på pulpanekros
- Kontakta kliniken vid: feber >38°C, tilltagande svullnad, fistel ovanför tanden, kraftig smärta vid bett, blödning som ej stillas
- Långtidskontroll: permanent tandanlag följs upp vid eruption (6–7 år)`},
  {id:'m2',label:'B — Extraktion (bettstörning / apex mot anlag)',behandlingTag:'extraktion',followup:'Uppföljning om 1 vecka.',
   text:`Diagnos: Luxationsskada mjölktand [nr] med ocklusionspåverkan eller apex mot permanent anlag.

Trauma-anamnes: Olycka idag. [Traumabeskrivning]. Ingen medvetslöshet/kräkning. Stelkramp: OK.

Status:
- Tand [nr] [lateralluxerad/extruderad/intruderad]. Mobilitet grad [II/III].
- Interfererar i bettet — normalt bett ej möjligt.

Rtg: Apex displacerat [palatinalt mot anlaget / buckalt].

Bedömning: [Luxationsskada] tand [nr] med [ocklusionsstörning / apex mot anlag] — extraktion indicerad för att skydda permanent tandanlag.

Medicinsk kontroll: Allergi: [Nej/Ja], Vikt: [kg]

Samtycke: Förälder informerad om diagnos, behandlingsbeslut (extraktion av primär tand för att skydda underliggande permanenta tandanlag), risk för försenad eruption av permanent efterföljare, behov av framtida bettkontroll, samt försäkringsanmälan. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (barndos enligt vikt, max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan, lämpligt för barn

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Ytanestesi + LA: Artikain [ml] (barnvikt [kg], OBS max 7 mg/kg)
- Varsam extraktion tand [nr], inget apikalt tryck (skydda permanent anlag)
- Alveol inspekterad, inga fragment
- Hemostas. [Ev. sutur Vicryl 5-0]. Bettamponad 15 min.

Material:
- Ytanestesi Xylocain salva 5%
- LA enligt anestesi-checkbox (barndos)
- Pedodontiska extraktionstänger (mjölktangar)
- Vicryl 5-0 vid behov
- Bettamponad/koksalt 0,9%
- Klorhexidin 0,12% för baddning

Information om eventuella efterbesvär:
- Postoperativ smärta och svullnad 2–3 dygn — Paracetamol enligt vikt v.b.
- Mjuk/kall kost första veckan
- Bettamponad ligger kvar 15 min — föräldern ska INTE titta i munnen ofta första timmen
- Klorhexidinbaddning 0,12% × 2 i 1 vecka med kompress
- Permanent efterföljare kan eruptera försenat (3–6 månader) eller tidigare
- Eventuell platshållare övervägs vid tidig extraktion i bakre region
- Kontakta vården vid: kraftig blödning, feber >38°C, tilltagande svullnad, andningsbesvär

Försäkringsanmälan upprättad.`},
  {id:'m3',label:'C — Intrusionsluxation (apex buckalt, avvaktar)',behandlingTag:'observation reeruption',followup:'Uppföljning om 1 v, sedan var 4:e v tills reeruption.',
   text:`Diagnos: Intrusionsluxation mjölktand [nr] — apex buckalt, expektans för spontan reeruption.

Trauma-anamnes: [Traumabeskrivning]. Stelkramp: OK.

Status:
- Tand [nr] intruderad, klinisk krona förkortad/ej synlig. Låst i ben. Metalliskt perkussionsljud.

Rtg: Intruderad. Apex buckalt (bort från anlag). Inga rotfrakturer.

Bedömning: Intrusionsluxation tand [nr]. Apex buckalt — avvaktar spontan reeruption.

Samtycke: Förälder informerad om diagnos, expektans-strategi (spontan reeruption 1–6 månader), risk för utebliven reeruption, ankylos, pulpanekros samt skada på permanent anlag. Information om upprepade kontroller. Samtycke inhämtat.

Åtgärd:
- Information: tanden förväntas växa ner spontant 1–6 månader
- Ingen aktiv åtgärd (varken reponering eller extraktion)
- Skonkost, klorhexidinbaddning 0,12% × 2 med kompress
- Försäkringsanmälan upprättad
- Bild + rtg sparas i journal för jämförelse vid uppföljning

Material:
- Periapikal rtg / småbarnsfilm
- Kliniskt foto
- Klorhexidin 0,12% + kompresser

Information om eventuella efterbesvär:
- Tanden förväntas spontant eruptera ned igen inom 1–6 månader
- Skonkost 2–3 veckor, undvik bett mot den traumatiska sidan
- Klorhexidinbaddning × 2 med kompress i 1–2 veckor
- Kontakta vården vid: feber, fistel/abscess ovanför tanden, tilltagande smärta, missfärgning (grå/rosa)
- Om utebliven reeruption inom 6 månader: bedömning av extraktion vs fortsatt expektans
- Permanent tandanlag följs upp vid eruption (6–7 år)`},
  {id:'remiss',label:'Remiss — Pedodontist (komplicerad mjölktand-trauma)',behandlingTag:'remiss pedodontist trauma',followup:'Specialistsvar tas in i journal.',text:`REMISS TILL PEDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Komplicerat trauma mot mjölktand [nr] — bedömning av åtgärd och prognos för permanent efterföljare.
Trauma-anamnes: Trauma [datum]. Mekanism: [fall/slag/sport]. Förvaring tand: ej aktuellt (primär tand).
Status: Tand [nr] [intruderad/lateralluxerad/extruderad], apex riktning [buckal/palatinal mot anlag].
Bilagor: Periapikal rtg + kliniska foton.
Tidigare åtgärd: [Expektans / Försök till reponering / Klorhexidinbaddning]. Försäkringsanmälan upprättad.
Önskar bedömning av: Extraktion vs expektans, risk för skada på permanent anlag, eventuell platshållare, långtidsuppföljning.
Prioritet: Snar

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad och utlämnad till förälder.'},{id:'klorhex',label:'Klorhexidinbaddning',text:'Klorhexidinbaddning 0,12% ordinerad 2 ggr/dag i 1–2 veckor.'}],
 lakemedel:'Paracetamol barnform v.b. (viktsbaserat).',remissSpec:null},

{id:'pedo42',icd:'S03.2',name:'Exartikulation mjölktand (ALDRIG replantation)',cat:'Trauma — Mjölktänder',scId:'PEDO-42-EXART',
 symptom:['exartikulation','utslagen tand','mjölktand','tom alveol'],
 behandling:['sårvård','hemostas','information'],
 varning:'⚠️ REPLANTATION ABSOLUT KONTRAINDICERAT vid primär tand — risk för permanent tandanlag.',
 mallar:[
  {id:'m1',label:'Mall 1 — Tanden hittad',behandlingTag:'sårvård hemostas',followup:'Uppföljning om 1–4 veckor. Långtidskontroll permanent tandanlag.',
   text:`Diagnos: Exartikulation mjölktand [nr].

Trauma-anamnes: Olycka idag. Tanden hittad på [platsen].
Ingen medvetslöshet/kräkning. Stelkramp: OK.

Status:
- Extraoralt: [Skrubbsår / hematom / u.a.]
- Intraoralt: Tom alveol regio [51/61]. Blödning.
- Intilliggande tänder: [u.a. / luxerade / frakturerade]

Rtg: Tom alveol, inga rotfragment. Permanent tandanlag bedöms intakt.

Bedömning: Exartikulation tand [nr]. Replantation absolut kontraindicerad vid primär tand.

Samtycke: Förälder informerad om diagnos, varför primär tand ALDRIG replanteras (risk för skada på permanent anlag, infektion, ankylos), sårvård, uppföljning samt försäkringsanmälan. Information om långtidskontroll av permanent efterföljare. Samtycke inhämtat.

Åtgärd:
- Spolning av alveol med steril koksalt 0,9%
- Kompression med kompress — hemostas uppnådd
- Replantation EJ utförd (absolut kontraindicerat vid primär tand)
- Tanden förvaras EJ — kan kasseras eller sparas som minne enligt familjens önskemål

Material:
- Steril koksalt 0,9% för spolning
- Sterila kompresser
- Klorhexidin 0,12% för baddning
- Kliniskt foto + periapikal rtg

Information om eventuella efterbesvär:
- Måttlig postoperativ smärta och svullnad 2–3 dygn — Paracetamol enligt vikt v.b.
- Mjuk/kall kost 1–2 veckor
- Klorhexidinbaddning 0,12% × 2 med kompress i 1 vecka
- Permanent efterföljare kan eruptera försenat (vanligast vid trauma <3 års ålder)
- Tandgluggen syns tydligt — eventuell platshållare diskuteras
- Vid trauma mot frontområde: tonsillkontroll om barnet hostar — utesluta aspiration
- Kontakta vården vid: feber >38°C, tilltagande svullnad, andningsbesvär, infektion ovanför alveolen
- Långtidskontroll: permanent anlag kontrolleras vid eruption (6–7 år)

Försäkringsanmälan upprättad.`},
  {id:'m2',label:'Mall 2 — Tanden EJ hittad',behandlingTag:'aspirationskontroll',followup:'Uppföljning om 1–4 veckor. Långtidskontroll permanent tandanlag.',
   text:`Diagnos: Exartikulation mjölktand [nr] — tanden ej hittad.

Trauma-anamnes: [Traumabeskrivning]. Tanden ej hittad.
Ingen hosta eller andningsbesvär. Ingen medvetslöshet/kräkning.

Rtg: Tom alveol. Ingen totalintruserad tand. Aspiration bedömd som osannolik.

Bedömning: Exartikulation tand [nr]. Replantation EJ utförd. Tanden ej hittad — viktigt att utesluta aspiration/intrusion.

Samtycke: Förälder informerad om diagnos, varför primär tand ej replanteras, bedömning för att utesluta aspiration (lungröntgen vid kvarvarande misstanke), uppföljningsplan samt försäkringsanmälan. Samtycke inhämtat.

Åtgärd:
- Klinisk inspektion: läpp, kind, gom — utesluta inbäddat fragment
- Periapikal rtg + lateral huvudprojektion vid behov för att utesluta intrusion eller inbäddning
- Vid kvarvarande misstanke om aspiration: AKUT remiss för lungröntgen
- Spolning av alveol med koksalt 0,9%
- Klorhexidinbaddning ordinerad

Material:
- Periapikal rtg / lateralprojektion
- Kompresser + koksalt 0,9%
- Klorhexidin 0,12%
- Kliniskt foto

Information om eventuella efterbesvär:
- Måttlig smärta 2–3 dygn — Paracetamol v.b.
- Mjuk kost 1–2 veckor, klorhexidinbaddning × 2
- KRITISKT: Kontakta sjukvård OMEDELBART vid hosta, andnöd, väsande andning (kan tyda på aspiration)
- Tandgluggen syns tydligt — platshållare diskuteras vid behov
- Permanent efterföljare kan eruptera försenat
- Långtidskontroll: permanent anlag vid eruption (6–7 år)

Försäkringsanmälan upprättad.`},
  {id:'remiss',label:'Remiss — Akut vård (aspirationsmisstanke)',behandlingTag:'remiss akut aspiration',followup:'AKUT — säkerställ att patient anlänt till sjukhus.',text:`AKUT REMISS TILL BARNAKUT / RÖNTGEN

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Misstanke om aspiration efter dental trauma — primär tand exartikulerad och ej återfunnen, klinisk misstanke kvarstår efter dental röntgen.
Trauma-anamnes: Trauma [datum/tid]. Mekanism: [fall/slag]. Tand [nr] exartikulerad, ej hittad i munhåla eller på plats.
Symtom: [Hosta/andnöd/väsande andning: Ja/Nej]. [Hosthistorik efter trauma].
Status: Tom alveol regio [nr]. Dental rtg utesluter intrusion. Klinisk inspektion utesluter inbäddning i läpp/kind/gom.
Tidigare åtgärd: Hemostas, klorhexidinbaddning.
Önskar bedömning av: Lungröntgen för att utesluta aspiration, eventuell bronkoskopi.
Prioritet: AKUT

Remittent: [namn], leg. tandl., [klinik], telefon [XXX]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad och utlämnad till förälder.'}],
 lakemedel:'Paracetamol barnform v.b.',remissSpec:null},

{id:'pedo43',icd:'S02.5',name:'Kronfraktur mjölktand',cat:'Trauma — Mjölktänder',scId:'PEDO-43-KFRAK',
 symptom:['kronfraktur','pulpablotta','mjölktand','fraktur'],
 behandling:['slipning','GIC','extraktion','pulpotomi','Cvek'],varning:null,
 mallar:[
  {id:'m1',label:'A — Okomplicerad (ingen pulpablotta)',behandlingTag:'slipning GIC',followup:'Kontroll om 4 veckor.',
   text:`Diagnos: Okomplicerad kronfraktur mjölktand [nr] — emalj/dentinfraktur utan pulpablotta.

Trauma-anamnes: [Traumabeskrivning]. Ingen medvetslöshet/kräkning. Stelkramp: OK.

Status: Okomplicerad kronfraktur tand [nr]. Emalj/dentinfraktur, ingen pulpablotta.
Läppar palperade — inga inbäddade fragment. Rörlighet: u.a.

Rtg: Kroninfraktur synlig. Ingen rotfraktur. Permanent anlag intakt.

Samtycke: Förälder informerad om diagnos, behandling (slipning + GIC-förband), risk för senare pulpit eller nekros (missfärgning, fistel), uppföljningsbehov samt försäkringsanmälan. Samtycke inhämtat.

Åtgärd:
- Vassa kanter slipade/rundade med fin diamantborr
- [GIC-förband (Fuji IX) på dentinsår / Fluorlack Duraphat 22 600 ppm applicerat]
- Kliniskt foto + rtg-kopia
- Försäkringsanmälan upprättad

Material:
- Diamantborr fin korn
- Fuji IX GIC
- Duraphat fluorlack 22 600 ppm
- Periapikal rtg
- Kliniskt foto

Information om eventuella efterbesvär:
- Mild isning 1–2 veckor — avtar gradvis
- Mjuk kost 1–2 veckor, ingen tuggning på den traumatiska tanden
- GIC-förbandet kan slitas — eventuell omgöring vid behov
- Kontakta kliniken vid: missfärgning (grå/gul/rosa) — kan tyda på pulpanekros, spontansmärta, fistel, svullnad
- Långtidskontroll: pulpastatus följs vid eruption av permanent efterföljare`},
  {id:'m2',label:'B — Komplicerad, extraktion',behandlingTag:'extraktion',followup:'Skonkost, klorhexidinbaddning 1 v. Kontroll om 1 vecka.',
   text:`Diagnos: Komplicerad kronfraktur mjölktand [nr] med pulpablotta — extraktion indicerad pga otillräcklig kooperation.

Trauma-anamnes: [Traumabeskrivning]. Stelkramp: OK.

Status: Komplicerad kronfraktur tand [nr]. Pulpablotta synlig.
Barnets kooperation: Bedömd otillräcklig för vitalbevarande åtgärd.

Bedömning: Komplicerad kronfraktur mjölktand [nr] — extraktion förstahandsval vid otillräcklig kooperation.

Samtycke: Förälder informerad om diagnos, behandlingsval (extraktion vs Cvek-pulpotomi vid god kooperation), risk för försenad/tidig eruption av permanent efterföljare, eventuell platshållare, samt försäkringsanmälan. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Ytanestesi + LA enligt anestesi-checkbox (barnvikt [kg])
- Extraktion tand [nr] — pedodontisk extraktionstång
- Alveol inspekterad, hemostas uppnådd, bettamponad
- Försäkringsanmälan upprättad

Material:
- Ytanestesi Xylocain salva 5%
- LA enligt anestesi-checkbox
- Pedodontiska extraktionstänger
- Bettamponad/koksalt 0,9%
- Klorhexidin 0,12%

Information om eventuella efterbesvär:
- Postoperativ smärta 2–3 dygn — Paracetamol enligt vikt
- Mjuk/kall kost 1 vecka
- Bettamponad 15 min, ingen sköljning första dygnet
- Klorhexidinbaddning × 2 i 1 vecka
- Permanent efterföljare kan eruptera försenat eller tidigare
- Eventuell platshållare diskuteras vid tidig extraktion bakre region
- Kontakta vården vid: feber, tilltagande svullnad, kraftig blödning`},
  {id:'m3',label:'C — Komplicerad, Cvek-pulpotomi',behandlingTag:'Cvek pulpotomi',followup:'Röntgenkontroll om 3–4 v, 3 mån, 1 år.',
   text:`Diagnos: Komplicerad kronfraktur mjölktand [nr] med punktformig pulpablotta — Cvek-pulpotomi (vitalbevarande).

Status: Komplicerad kronfraktur tand [nr]. Punktformig pulpablotta. Kooperation: God. Tid sedan skada: [<24 h].

Bedömning: Komplicerad kronfraktur — partiell pulpotomi (Cvek) möjlig pga god kooperation, färsk skada och vital blödning.

Samtycke: Förälder informerad om diagnos, behandlingsbeslut (vitalbevarande Cvek-pulpotomi för att bevara primär tand), risk för senare pulpanekros (10–25%) med behov av framtida extraktion, behov av återbesök samt försäkringsanmälan. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- LA enligt anestesi-checkbox. Kofferdam om möjligt
- Partiell pulpotomi (Cvek) — ca 2 mm pulpa avlägsnad med roserande borr
- Spolning med koksalt 0,9%, hemostas med steril bomullspellet
- Täckning med [MTA (ProRoot) / Biodentine / Ca(OH)₂]
- Tät förslutning med [Fuji IX / komposit]
- Ocklusionskontroll
- Försäkringsanmälan upprättad

Material:
- Kofferdam (vid möjligt)
- Roserande borr / pulpotomi-instrument
- Steril koksalt 0,9% + sterila bomullspellets
- MTA (ProRoot) / Biodentine / Dycal (Ca(OH)₂)
- Fuji IX GIC eller Filtek Supreme komposit
- Adhese Universal Vivapen (vid komposit)
- Periapikal rtg + kliniskt foto

Information om eventuella efterbesvär:
- Mild postoperativ ömhet 2–3 dygn — Paracetamol v.b.
- Mjuk kost 1 vecka
- Försiktig munhygien runt fyllningen
- KRITISKT: Återkom vid spontansmärta, missfärgning, fistel ovanför tanden, svullnad — kan tyda på pulpanekros och behov av extraktion
- Rtg-kontroll om 3–4 veckor, 3 månader och 1 år
- Långtidskontroll: permanent efterföljare vid eruption`},
  {id:'remiss',label:'Remiss — Pedodontist (kronfraktur mjölktand)',behandlingTag:'remiss pedodontist mjölktand',followup:'Specialistsvar tas in i journal.',text:`REMISS TILL PEDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Kronfraktur mjölktand [nr] — bedömning för vitalbevarande behandling (Cvek-pulpotomi vs pulpektomi).
Trauma-anamnes: Trauma [datum]. Mekanism: [fall/slag]. Tid sedan skada: [timmar/dagar].
Status: Komplicerad kronfraktur tand [nr], pulpablotta storlek [mm]. Kooperation: [god/begränsad].
Bilagor: Periapikal rtg + kliniska foton.
Tidigare åtgärd: [Akut åtgärd, klorhexidinbaddning, försäkringsanmälan].
Önskar bedömning av: Cvek-pulpotomi, pulpektomi vs extraktion, eventuell narkos/sedering.
Prioritet: Snar

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad.'}],
 lakemedel:'Paracetamol barnform v.b.',remissSpec:null},

// ── TRAUMA PERMANENTA ──
{id:'pedo48',icd:'S03.2 + S02.8',name:'Exartikulation permanent tand (HYPERAKUT)',cat:'Trauma — Permanenta tänder',scId:'PEDO-48-EXALV',
 symptom:['exartikulation permanent','utslagen tand','replantation','avulsion'],
 behandling:['replantation','splint','PcV antibiotika'],
 varning:'⚠️ HYPERAKUT — Replantation <60 min. Förvara i mjölk/koksalt/saliv. PcV 7 dagar.',
 mallar:[
  {id:'m1',label:'Mall — Replantation permanent tand',behandlingTag:'replantation splint',followup:'Splintborttagning om 2 v. RCT om slutet apex.',
   text:`Diagnos: Exartikulation permanent tand [nr] — replantation utförd.

Trauma-anamnes: Tand [nr] exartikulerad idag. Förvarad i [mjölk/koksalt/saliv/Save-A-Tooth/torrt]
sedan [tid]. Extraoral tid: [X] min. Stelkramp: OK.

Status: Tom alveol regio [nr]. Rotutveckling: [Öppet/slutet apex].
Övrigt trauma: [Läpplaceration/kontusion/u.a.]

Bedömning: Exartikulation permanent tand [nr]. Replantation indicerad — prognos beror på extraoral torrtid och förvaringsmedium.

Samtycke: Förälder/patient informerad om diagnos, HYPERAKUT karaktär, prognos (beroende på torrtid <60 min och förvaringsmedium), risk för ankylos/resorption/pulpanekros, behov av framtida rotbehandling (vid slutet apex), splintbehandling 2 veckor, antibiotika 7 dagar samt försäkringsanmälan. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
☐ Intraligamentär komplettering vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Tanden sköljd skonsamt med steril koksalt 0,9% (rotytan EJ skrapad)
- Alveolen sköljd med steril koksalt 0,9% — koagel försiktigt avlägsnat
- LA enligt anestesi-checkbox
- Replantation med digitalt tryck — tanden positionerad i ursprungsläge
- Flexibel splint (ortodontisk tråd 0,4 mm + komposit) regio [nr–nr] — 2 grannar varje sida
- Kontrollröntgen u.a.
- Kåvepenin [barndos enligt vikt] × 3 i 7 dagar (eller Klindamycin vid pc-allergi)
- Klorhexidin 0,12% × 2 ordinerat
- Försäkringsanmälan upprättad

Material:
- Steril koksalt 0,9% (alveolspolning + tandspolning)
- Ortodontisk tråd 0,4 mm för splint
- Ultra Etch 37% + Adhese Universal Vivapen + Filtek Supreme för splint
- Vicryl 5-0 vid mjukvävnadsskada
- Klorhexidin 0,12%
- Periapikal rtg + kliniskt foto

Information om eventuella efterbesvär:
- Mjuk kost minst 2 veckor — undvik bett mot den replanterade tanden
- Klorhexidin 0,12% × 2 i 1–2 veckor
- Ej kontaktsport tills splint borttagen (2 veckor) + 2 veckor extra
- Försiktig munhygien runt splinten — mjuk borste, tandtråd försiktigt
- Kåvepenin × 3 i 7 dagar — fullfölj hela kuren
- KRITISKT: Återkom akut vid kraftig smärta, tilltagande svullnad, feber, fistel
- Vid slutet apex: rotbehandling planeras inom 2 veckor (innan splintborttagning)
- Vid öppet apex: avvaktas för revaskularisering — kontroll med rtg
- Risk för ankylos och resorption — långtidsuppföljning rtg 6 mån, 1 år, 5 år
- Försäkringsanmälan (Folksam/IF) upprättad`},
  {id:'remiss',label:'Remiss — Pedodontist/Endodontist (avulsion)',behandlingTag:'remiss pedodontist endodontist avulsion',followup:'Specialistsvar för fortsatt endodontisk plan.',text:`REMISS TILL PEDODONTIST / ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Replanterad permanent tand [nr] — bedömning för endodontisk behandling (RCT vid slutet apex / revaskularisering vid öppet apex), långtidsuppföljning.
Trauma-anamnes:
- Trauma [datum/tid]
- Extraoral tid: [X] min
- Förvaringsmedium: [mjölk/koksalt/saliv/Save-A-Tooth/torrt]
- Rotutveckling: [öppet/slutet apex]
Status: Tand [nr] replanterad och splintad regio [XX–XX]. Kontrollrtg: u.a. position. Mjukvävnad: [u.a./laceration].
Behandling utförd:
- Replantation med digitalt tryck
- Flexibel splint 2 veckor
- Kåvepenin [dos] × 3 i 7 dagar
- Klorhexidin 0,12% × 2
- Försäkringsanmälan upprättad
Bilagor: Periapikal rtg + kliniska foton.
Önskar bedömning av: Tidpunkt för rotbehandling (vid slutet apex) / revaskularisering (vid öppet apex), splintborttagning, långtidsuppföljning för ankylos/resorption.
Prioritet: Snar (inom 1–2 veckor)

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'pcv',label:'PcV 7 dagar',text:'Kåvepenin [barndos] × 3 i 7 dagar ordinerat.'},{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad och utlämnad.'}],
 lakemedel:'Kåvepenin [barndos] × 3 i 7 dagar. Paracetamol v.b.',remissSpec:'Pedodontist'},

{id:'pedo44',icd:'S02.5',name:'Rotfraktur mjölktand',cat:'Trauma — Permanenta tänder',scId:'PEDO-44-RFRAK',
 symptom:['rotfraktur','mjölktand','mobilitet','apikalt fragment'],
 behandling:['extraktion koronalt fragment'],
 varning:'Apikalt fragment lämnas kvar om djupt beläget — spontan resorption.',
 mallar:[{id:'m1',label:'Mall — Rotfraktur mjölktand',behandlingTag:'extraktion',followup:'Klinisk + rtg-kontroll om 1 mån. Ny kontroll om 1 år.',
   text:`Diagnos: Rotfraktur mjölktand [nr] — extraktion av koronalt fragment, apikalt fragment kvarlämnat.

Trauma-anamnes: Pat. [ålder] år. [Traumabeskrivning]. Stelkramp: OK.

Status: Tand [nr] kraftigt mobil (grad III). Blödning gingivalrand.

Rtg: Horisontell rotfraktur i [cervikala/mellersta/apikala] tredjedelen.
Apikalt fragment kvar. Permanent anlag bedöms intakt.

Bedömning: Rotfraktur mjölktand [nr] — koronalt fragment extraheras, djupt beläget apikalt fragment lämnas för spontan resorption (försök till extraktion riskerar skada permanent tandanlag).

Samtycke: Förälder informerad om diagnos, behandlingsbeslut (extraktion koronalt fragment + kvarlämnande av apikalt fragment), risk för försenad eruption av permanent efterföljare, fortsatt resorption av apikalt fragment under flera år, samt försäkringsanmälan. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- LA enligt anestesi-checkbox (barnvikt [kg])
- Varsam extraktion koronalt fragment tand [nr] — INGET apikalt tryck
- Apikalt fragment kvarlämnat (resorberas spontant 1–3 år)
- Alveol inspekterad — fragment ej manipulerat
- Hemostas uppnådd, bettamponad
- Kliniskt foto + rtg
- Försäkringsanmälan upprättad

Material:
- Ytanestesi Xylocain salva 5%
- LA enligt anestesi-checkbox
- Pedodontiska extraktionstänger (mjölktangar)
- Bettamponad/koksalt 0,9%
- Klorhexidin 0,12%
- Periapikal rtg + kliniskt foto

Information om eventuella efterbesvär:
- Postoperativ smärta 2–3 dygn — Paracetamol enligt vikt v.b.
- Mjuk/kall kost 1 vecka
- Bettamponad 15 min, ingen sköljning första dygnet
- Klorhexidinbaddning 0,12% × 2 i 1 vecka
- Apikalt fragment resorberas spontant under 1–3 år — uppföljning rtg
- Permanent efterföljare kan eruptera försenat
- Eventuell platshållare diskuteras vid behov
- Kontakta vården vid: feber, tilltagande svullnad, fistel, kraftig blödning`},
  {id:'remiss',label:'Remiss — Pedodontist (rotfraktur mjölktand)',behandlingTag:'remiss pedodontist rotfraktur',followup:'Specialistsvar tas in i journal.',text:`REMISS TILL PEDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Rotfraktur mjölktand [nr] — bedömning av kvarlämnat apikalt fragment och permanent tandanlag.
Trauma-anamnes: Trauma [datum]. [Fall/slag].
Status: Koronalt fragment extraherat [datum]. Apikalt fragment kvar i [cervikala/mellersta/apikala] tredjedel.
Bilagor: Periapikal rtg + kliniska foton.
Tidigare åtgärd: Extraktion koronalt fragment, hemostas, klorhexidinbaddning. Försäkringsanmälan upprättad.
Önskar bedömning av: Apikalt fragments resorption, permanent tandanlag, eventuell platshållare, långtidsuppföljning.
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad och utlämnad till förälder.'}],
 lakemedel:'Paracetamol barnform v.b.',remissSpec:null},

{id:'pedo45',icd:'S02.8',name:'Alveolarutskottsfraktur (Specialistfall)',cat:'Trauma — Permanenta tänder',scId:'PEDO-45-ALVFRAK',
 symptom:['alveolarfraktur','rörligt segment','bettstörning','krepitationer'],
 behandling:['reponering','flexibel splint'],
 varning:'Specialistfall — konsultation pedodontist/käkkirurg.',
 mallar:[{id:'m1',label:'Mall — Alveolarutskottsfraktur',behandlingTag:'reponering splint',followup:'Splintborttagning om 4 v. Kontroller: 1 v, 4 v, 3 mån, 1 år.',
   text:`Diagnos: Alveolarutskottsfraktur regio [tand nr–tand nr].

Trauma-anamnes: Pat. [ålder] år. [Traumabeskrivning]. Stelkramp: OK. Allergier: [—].

Status: Rörligt alveolarsegment regio [tand nr–tand nr]. Bettstörning. [Krepitationer: Ja/Nej]. Mjukdelsskador: [—].

Rtg: Frakturlinje i alveolarutskottet regio [område]. Permanenta anlag bedöms [intakta / ev. påverkade].

Samtycke: Förälder/vårdnadshavare informerad om diagnos, behandlingsalternativ, risker (skada på permanenta anlag, infektion, splintlossning) och prognos. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
Ev. sedering: [Midazolam oral / lustgas — enligt klinik-rutin].

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Reponering av alveolarsegmentet till ursprungsläge, okklusion kontrollerad
- Flexibel splint (ortodontisk tråd 0,3–0,4 mm + komposit) tand [nr]–[nr]
- Kontrollröntgen efter fixering
- Mjukdelssutur v.b. (Vicryl 5-0)

Material: Ortodontisk tråd 0,3–0,4 mm, Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme (komposit för splint), Vicryl 5-0, Klorhexidin 0,12% (barn).

Information om eventuella efterbesvär: Ömhet och svullnad första 2–3 dygnen är normalt. Skonkost (mjuk kost) 4 veckor. Klorhexidinbaddning 0,12% × 2/dag. Paracetamol v.b. enligt vikt. Sök akut vid: feber, ökad smärta, splintlossning eller bettstörning.

Konsultation [pedodontist/käkkirurg]: [Ja / Planerad]. Försäkringsanmälan upprättad.`},
  {id:'remiss',label:'Remiss — Käkkirurg/Pedodontist',behandlingTag:'remiss kakkirurg pedo',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL KÄKKIRURG / PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: S02.8 Alveolarutskottsfraktur regio [tand nr–tand nr]

Bakgrund: Akut trauma [datum]. Reponering + flexibel splint utförd [datum].
Status: [Aktuellt status]. Permanenta anlag: [intakta / påverkade].

Frågeställning: Bedömning av prognos, fortsatt handläggning, ev. kirurgisk åtgärd.

Bifogas: Rtg pre/post-reponering, traumajournal, försäkringsärende.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'konsultation',label:'Specialist kontaktad',text:'Konsultation med [pedodontist/käkkirurg] utförd.'}],
 lakemedel:'Paracetamol v.b. enligt vikt. Klorhexidin 0,12% × 2/dag i 7 d.',remissSpec:'Käkkirurg'},

{id:'pedo46',icd:'S02.5',name:'Kronfraktur permanent tand',cat:'Trauma — Permanenta tänder',scId:'PEDO-46-KFRAKPERM',
 symptom:['kronfraktur permanent','pulpablotta','infraktion','bonding'],
 behandling:['bonding','GIC','komposit','Cvek-pulpotomi'],varning:null,
 mallar:[
  {id:'m1',label:'A — Okomplicerad kronfraktur permanent tand',behandlingTag:'bonding komposit',followup:'Kontroll om 3–4 v, 3 mån, 1 år.',
   text:`Diagnos: Okomplicerad kronfraktur tand [11/21] — emalj/dentinfraktur utan pulpablotta.

Trauma-anamnes: Pat. [ålder] år. [Traumabeskrivning]. Stelkramp: OK. Allergier: [—].
[Fragment i koksalt/mjölk / Fragment saknas].

Status: Okomplicerad kronfraktur tand [11/21]. Emalj/dentinfraktur. Kyla-test: Positiv. Perkussion: u.a. Rörlighet: u.a.

Rtg: Avstånd till pulpa ca [X] mm. Ingen rotfraktur. Rotutveckling: [Öppet/slutet apex].

Samtycke: Patient/förälder informerad om diagnos, behandling, risker (pulpanekros, missfärgning, fragmentlossning) och prognos. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
☐ Ingen LA — endast ytlig emaljfraktur

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- [Bonding av fragment med adhesiv teknik / Direkt komposituppbyggnad / GIC-förband temporärt]
- Ocklusion kontrollerad
- Polering

Material: Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme (komposit), GC Fuji IX (temporärt GIC), polerskivor.

Information om eventuella efterbesvär: Lätt ömhet och köldkänslighet 1–2 v är vanligt. Försiktighet med hård kost. Sök vid: ihållande smärta, spontansmärta, missfärgning av tanden.

Försäkringsanmälan upprättad.`},
  {id:'m2',label:'C — Komplicerad, Cvek-pulpotomi (öppet apex)',behandlingTag:'Cvek-pulpotomi',followup:'Återbesök om 24–48 h för slutlig kompositfyllning.',
   text:`Diagnos: Komplicerad kronfraktur tand [11/21] med pulpablotta — öppet apex.

Trauma-anamnes: Pat. [ålder] år. [Traumabeskrivning]. Stelkramp: OK. Tid sedan skada: [<24 h].

Status: Komplicerad kronfraktur tand [11/21]. Pulpablotta, vital blödning. Öppet apex.

Rtg: Öppet apex bekräftat. Ingen rotfraktur.

Samtycke: Förälder informerad om diagnos, partiell pulpotomi (Cvek-teknik) för att bevara vital pulpa och möjliggöra rotutveckling. Risker (pulpanekros, behov av rotbehandling/MTA-apexifikation, missfärgning) förklarade. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Kofferdam
- Partiell pulpotomi (Cvek) — ca 2 mm avlägsnande av pulpavävnad med diamant- eller roserande borr i högvarv + vattenkylning
- Hemostas med steril koksaltpellet (ca 1–3 min)
- [MTA (ProRoot) / Biodentine] ca 1,5–2 mm direkt på pulpa
- Fuktad bomullspellet + temporär GIC (Fuji IX) eller Cavit
- Slutlig kompositfyllning vid återbesök 24–48 h

Material: Kofferdam, NaOCl 3% (kort spolning), steril koksalt, MTA (ProRoot) eller Biodentine, GC Fuji IX, Adhese Universal Vivapen, Filtek Supreme.

Information om eventuella efterbesvär: Ömhet 1–3 dagar är normalt. Försiktighet med hård kost. Sök akut vid: ihållande/spontansmärta, svullnad, fistel, missfärgning. Vitalitetskontroll och rotutveckling följs upp 3 v, 3 mån, 6 mån, 1 år.

Försäkringsanmälan upprättad.`},
  {id:'remiss',label:'Remiss — Endodontist/Pedodontist',behandlingTag:'remiss endo pedo',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL ENDODONTIST / PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: S02.5 Komplicerad kronfraktur tand [11/21] med pulpablotta. Öppet apex.

Bakgrund: Trauma [datum]. Cvek-pulpotomi/akut omhändertagande utfört [datum].
Status: [Aktuellt status]. Vitalitet: [—]. Rtg: [Öppet apex].

Frågeställning: Bedömning av fortsatt endodontisk handläggning, ev. apexogenes/apexifikation.

Bifogas: Rtg pre/post, traumajournal.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad.'}],
 lakemedel:'Ibuprofen + Paracetamol v.b. enligt vikt.',remissSpec:null},

{id:'pedo47',icd:'S03.2',name:'Konkussion permanent tand',cat:'Trauma — Permanenta tänder',scId:'PEDO-47-KONK',
 symptom:['konkussion','perkussionsöm','normal mobilitet','normal position'],
 behandling:['expektans','skonkost','observation'],
 varning:'Ingen operativ åtgärd. Skonkost 1–2 veckor.',
 mallar:[{id:'m1',label:'Mall — Konkussion permanent tand',behandlingTag:'expektans',followup:'Kontroll om 1 v, 3 v, 3 mån, 6 mån.',
   text:`Diagnos: Konkussion tand [nr] — perkussionsöm utan rörlighet eller positionsförändring.

Trauma-anamnes: Pat. [ålder] år. [Traumabeskrivning]. Stelkramp: OK. Allergier: [—].

Status: Tand [nr] perkussionsöm. Normal rörlighet. Normal position. Ingen kronfraktur. Ocklusion normal. Kyla-test: Positiv.

Rtg: Normalt utseende. Normal rothinnespalt. Ingen rotfraktur.

Samtycke: Patient/förälder informerad om diagnos, expektans som behandling och uppföljningsplan. Risk för fördröjd pulpanekros förklarad. Samtycke inhämtat.

Anestesi: Ingen lokalanestesi krävs.

Åtgärd:
- Ingen operativ åtgärd
- Skonkost (mjuk kost) 1–2 v
- Vitalitetskontroll planerad

Material: Inget operativt material.

Information om eventuella efterbesvär: Ömhet vid tuggning 1–2 v är normalt. Skonkost. Sök vid: ökad smärta, missfärgning, svullnad, fistel, ihållande perkussionsömhet. Vitalitetskontroll följs vid 1 v, 3 v, 3 mån, 6 mån.

Försäkringsanmälan upprättad.`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan upprättad.'}],
 lakemedel:'Paracetamol v.b. enligt vikt.',remissSpec:null},
// ── PROTETIK ──
{id:'prot15',icd:'Z46.3 / K08.5',name:'Lossnat provisorium / Temporär krona',cat:'Protetik',scId:'PROT-15-PROV',
 symptom:['provisorium','temporär krona','lossnat'],behandling:['recementering','TempBond'],varning:null,
 mallar:[{id:'m1',label:'Mall — Lossnat provisorium',behandlingTag:'recementering',followup:'Ordinarie tid för slutlig restauration [Datum].',
   text:`Diagnos: Lossnat provisorium regio [XX].

Anamnes: Lossnade vid måltid. Inga isningar. Allergier: [—]. Medicinering: [—].

Status: Prep u.a., inga frakturer. Provisoriet helt. Marginalt parodontalt status u.a.

Samtycke: Patient informerad om åtgärd (recementering temporärt), risk för förnyad lossning, kontaktorsak vid besvär. Samtycke inhämtat.

Anestesi:
☐ Ingen LA — provisorium på vital prep utan smärta
☐ Ytanestesi Xylocain salva 5% — vid känslig prep
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b.
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b.
☐ Intraligamentär komplettering — vid otillräcklig effekt

Åtgärd:
- Prep och provisorium rengörda (H₂O₂ + Tubulicid)
- Inprovning utan anmärkning
- Recementering med TempBond NE (eugenolfritt — påverkar ej slutlig adhesiv cementering)
- Överskott avlägsnat
- Ocklusion kontrollerad och justerad v.b.

Material: TempBond NE (eugenolfritt), H₂O₂ 3%, Tubulicid, tandtråd för överskottskontroll.

Information om eventuella efterbesvär: Lätt köldkänslighet och tuggömhet 1–3 dygn är normalt. Försiktighet med seg/hård mat (kola, nötter, hård kex). Använd kontralateral sida v.b. Sök vid: förnyad lossning, ihållande smärta, gingivit kring provisoriet.

Ordinarie tid för utlämning av slutlig restauration: [Datum].`},
  {id:'remiss',label:'Remiss — Protetiker',behandlingTag:'remiss protetiker',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PROTETIKER

Patient: [Namn], [pers.nr]
Diagnos: Z46.3 Återkommande lossning av provisorium regio [XX].

Bakgrund: Provisorium har lossnat [antal] gånger. Recementering [datum]. Slutlig restauration planerad [datum].

Frågeställning: Bedömning av prep, retentionsfaktorer, ev. omarbete av provisorium eller anpassning av slutlig konstruktion.

Bifogas: Aktuella rtg, behandlingsplan.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'okkontroll',label:'Ocklusionskontroll',text:'Ocklusionskontroll utförd — u.a.'}],
 lakemedel:'Ingen medicinering.',remissSpec:null},

{id:'prot21',icd:'K08.5',name:'Lossnad krona eller bro',cat:'Protetik',scId:'PROT-21-LOSS',
 symptom:['lossnad krona','lossnad bro','krona'],behandling:['recementering','rengöring'],
 varning:'OBS Zirkonia: Ivoclean 20 sek → Monobond Plus 60 sek. EJ fosforsyra.',
 mallar:[{id:'m1',label:'Mall — Lossnad krona/bro',behandlingTag:'recementering',followup:'Återbesök om 2 veckor.',
   text:`Diagnos: Ofullständig tandfunktion (Lossnad krona tand [XX]).

Anamnes: Kronan lossnade vid [Tuggning/Flossning]. Ingen smärta/isningar. Allergier: [—]. Medicinering: [—].

Status: Tand [XX] vital/rotfylld. Ingen karies. God retention. Kronan hel. Marginalt parod. status u.a.

Rtg: Ingen sekundärkaries, normalt periapikalt status, [vital/rotfylld].

Samtycke: Patient informerad om diagnos, recementering, alternativ (ny krona vid bristande retention), risker (förnyad lossning, sekundärkaries, sväljning vid framtida lossning) och prognos. Samtycke inhämtat.

Anestesi:
☐ Ingen LA — vital/rotfylld tand utan smärta
☐ Ytanestesi Xylocain salva 5% — vid känslig prep
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b.
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b.
☐ Intraligamentär komplettering — vid otillräcklig effekt

Åtgärd:
- Rengöring av prep (H₂O₂ 3% + Tubulicid)
- Rengöring av krona invändigt (sandblästring / Ivoclean beroende på material)
- Torrläggning (kofferdam v.b.)
- Adhesionsbehandling enligt material:
  • Metallkeram/PFM: Zinkfosfat eller resincement
  • Zirkonia: Ivoclean 20 s → Monobond Plus 60 s → Variolink Esthetic (EJ fosforsyra på Zirkonia)
  • IPS e.max/litiumdisilikat: HF-syra 5% 20 s → Monobond Plus 60 s → Variolink Esthetic
- Recementering, överskott avlägsnat med tandtråd
- Ocklusion kontrollerad och justerad v.b.

Material: H₂O₂ 3%, Tubulicid, Ivoclean (Zirkonia), HF-syra 5% (e.max), Monobond Plus, Variolink Esthetic / Zinkfosfat / Multilink Automix beroende på indikation, kofferdam.

Information om eventuella efterbesvär: Lätt ömhet och köldkänslighet 1–3 dygn är normalt. Försiktighet med seg/hård mat första veckan. Sök vid: förnyad lossning, smärta, gingivit, dålig smak (kan tyda på cementspalt).`},
  {id:'remiss',label:'Remiss — Protetiker',behandlingTag:'remiss protetiker',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PROTETIKER

Patient: [Namn], [pers.nr]
Diagnos: K08.5 Ofullständig tandfunktion — återkommande lossning av krona/bro tand [XX].

Bakgrund: Recementering [datum]. Tidigare lossning [antal] gånger. Materialtyp: [Zirkonia/e.max/PFM]. Tand [vital/rotfylld].

Frågeställning: Bedömning av prep-retention, behov av omkonstruktion (ny krona, stift+pelare, kronstegning), parodontal status.

Bifogas: Rtg, materialinformation, behandlingsplan.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'karies',label:'Karies behandlad',text:'Karies exkaverad och behandlad innan recementering.'}],
 lakemedel:'Ingen medicinering.',remissSpec:null},

// ── PEDODONTI ──
{id:'pedo53',icd:'K04.4 / K04.6',name:'Dentoalveolär abscess / Fistel mjölktand',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-53-ABSCESS',
 symptom:['fistel','abscess','mjölktand','rörlig tand','pus'],behandling:['extraktion','dränage'],
 varning:'Aldrig rotbehandling vid apikal parodontit primär tand. Antibiotika ENBART vid feber/allmänpåverkan.',
 mallar:[{id:'m1',label:'Mall — Abscess mjölktand',behandlingTag:'extraktion',followup:'Kontakta vid feber/ökad svullnad.',
   text:`Diagnos: Periapikalabscess med fistel tand [nr] — mjölktand.

Anamnes: Pat. [ålder] år. [Smärtanamnes, fisteltid]. Inga allergier. Inga systemiska symtom.

Status: Fistel buckalt tand [nr]. Rörlig och öm tand. Ingen feber. Normal gapförmåga. Lymfkörtelstatus u.a.

Rtg: Periapikal radiolucens tand [nr]. Permanent anlag [intakt / påverkat — bedöm avstånd].

Samtycke: Förälder informerad om diagnos, varför extraktion är förstahandsval (rotbehandling på mjölktand med apikal parodontit ej indicerat — risk för permanent anlag), risker (skada på permanent anlag, behov av platshållare) och prognos. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
☐ Intraligamentär komplettering — vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg. Försiktighet vid pus — undvik djupinjektion.

Åtgärd:
- Extraktion tand [nr] med pedodontisk extraktionstång
- Pus dränerat via alveol och fistel
- Inspektion av alveol — kontroll att rot komplett och att permanent anlag ej skadats
- Hemostas (kompression 10 min)
- Ingen antibiotika (följer Strama 2024 — endast vid feber/allmänpåverkan)

Material: Pedodontisk extraktionstång, steril koksaltspolning, Spongostan v.b., steril kompress.

Information om eventuella efterbesvär: Bedövningskänsla 2–3 h. Lätt blödning första timmen. Mjuk/kall kost första dygnet. Klorhexidin 0,12% × 2/dag i 5 d (skoldbarn). Paracetamol barnform v.b. Sök vid: feber >38,5°C, ökad svullnad, ihållande blödning, allmänpåverkan.`},
  {id:'remiss',label:'Remiss — Pedodontist',behandlingTag:'remiss pedodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K04.6 Periapikalabscess med fistel tand [nr] — mjölktand.

Bakgrund: Akut extraktion [datum]. [Beteendeproblematik / multipel infektion / platshållarbehov].

Frågeställning: Bedömning av platshållare, fortsatt karies-/infektionssanering, ev. övertagande.

Bifogas: Rtg pre/post, status, behandlingsplan.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'antibiotika',label:'Antibiotika (feber/allmänpåverkan)',text:'PcV barndos: 12,5 mg/kg × 3 (max 1g × 3) i 7 dagar.'}],
 lakemedel:'Paracetamol barnform v.b. Antibiotika vid feber/allmänpåverkan.',remissSpec:null},

{id:'pedo54',icd:'L03.2 / K04.6',name:'Cellulit / Spridd odontogen infektion (LIVSHOTANDE)',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-54-CELLULIT',
 symptom:['cellulit','spridd infektion','trismus','svullnad ansikte','feber'],
 behandling:['extraktion','akutremiss','IV-antibiotika','PcV'],
 varning:'⚠️ LIVSHOTANDE — AKUT remiss sjukhus vid trismus/ögon/svalgpåverkan.',
 mallar:[{id:'m1',label:'Mall — Cellulit / Spridd infektion',behandlingTag:'akutremiss extraktion',followup:'AKUT remiss sjukhus.',
   text:`Diagnos: Cellulit ansikte utgående från tand [XX] — spridd odontogen infektion.

Anamnes: Pat. [ålder] år. Snabb utveckling över [tid]. Feber [XX]°C. Sväljningsbesvär: [Ja/Nej]. Andningsbesvär: [Ja/Nej]. Allergier: [—]. Vaccinationsstatus: [—].

Status: Kraftig extraoral svullnad mot [ögat/halsen/submandibulärt]. Trismus [X] mm. Feber [XX]°C. Allmänpåverkat barn — slöhet, vätskerefuserande. Lymfkörtelstatus: förstorade, ömma. Andningsfunktion: [—]. Saturation: [—]%.

Samtycke: Akutsituation — förälder muntligen informerad om livshotande tillstånd, behov av akut sjukhustransport, IV-antibiotika och ev. akut extraktion/incision. Samtycke inhämtat (nödläge).

Anestesi (vid extraktion innan transport):
☐ Septocaine 4% + adrenalin 1:200 000 — om dränage utförs på klinik (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — alternativ (max 4,4 mg/kg)
☐ INGEN LA om transport sker direkt — sjukhus tar över

OBS: Vid trismus/svalgpåverkan/ögonpåverkan — INGEN behandling på klinik, transport omedelbart.

Åtgärd:
- ⚠️ AKUT telefonkontakt Käkkirurgen/Barnakuten kl [Tid]
- [Akut extraktion tand [XX] för dränage — endast om barnet är stabilt och transport är säker]
- Barnet remitterat AKUT till sjukhus för IV-antibiotika och ev. kirurgisk dränage
- Transport: [Egen bil + förälder / Ambulans]

Antibiotika (initiering på klinik om transport drar ut på tiden):
- PcV barndos: 12,5 mg/kg × 3 (max 1 g × 3) i 7–10 dagar
- Vid pc-allergi: Klindamycin 5–6 mg/kg × 3 (max 300 mg × 3) i 7 dagar
- Metronidazol som tillägg vid anaeroba inslag/svår infektion

Material: Akutmaterial endast — IV-tillgång på sjukhus.

Information om eventuella efterbesvär: Förälder informerad om allvarlig infektion, behov av sjukhusvård. Återkommer för uppföljning efter sjukhusvård. Kontroll av aktualiserande tand och behandlingsplan.`},
  {id:'remiss',label:'Remiss — AKUT Sjukhus/Käkkirurg',behandlingTag:'akutremiss sjukhus',followup:'Akut transport pågår.',
   text:`AKUT REMISS — SJUKHUS / KÄKKIRURGI

⚠️ LIVSHOTANDE ODONTOGEN INFEKTION ⚠️

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: L03.2 Cellulit ansikte / K04.6 Periapikalabscess utgående från tand [XX].

Akut status:
- Extraoral svullnad mot [ögat/halsen/submandibulärt]
- Trismus [X] mm
- Feber [XX]°C, allmänpåverkat barn
- [Sväljningsbesvär / Andningsbesvär / Saturation X%]

Åtgärd på klinik: [Inget / Akut extraktion + dränage]. PcV/Klindamycin initierad: [Ja/Nej].

Frågeställning: Akut IV-antibiotika, ev. kirurgisk dränage under narkos, övervakning av luftväg.

Telefonkontakt etablerad med [Käkkirurgi/Barnakut] kl [Tid], samtalspartner [Namn].

Bifogas: Status, rtg, ev. labb.

Hälsningar, [Tandläkare] · Tel: [—]`}],
 extraAtgard:[{id:'akutremiss',label:'AKUT remiss sjukhus',text:'AKUT remiss utfärdad till sjukhus/Barnakut. Patient omedelbart transporterad.'}],
 lakemedel:'PcV barndos: 12,5 mg/kg × 3. Vid pc-allergi: Klindamycin 5–6 mg/kg × 3.',remissSpec:'Sjukhus akut'},

{id:'pedo50',icd:'K02.1 / K04.00',name:'Djup karies mjölktand — Pulpit (tidig fas)',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-50-KARIESPULP',
 symptom:['djup karies','pulpit tidig fas','mjölktand','selektiv exkavering'],
 behandling:['selektiv exkavering','GIC','stålkrona'],
 varning:'Selektiv exkavering enligt Socialstyrelsen — förstahandsval.',
 mallar:[{id:'m1',label:'Mall — Djup karies mjölktand (selektiv exkavering)',behandlingTag:'selektiv exkavering',followup:'Kontroll om 3 månader.',
   text:`Diagnos: Karies i dentin, Pulpit (tidig fas) tand [nr].

Anamnes: Pat. [ålder] år. Tuggsvårigheter, men ingen spontansmärta eller nattsmärta. Allergier: [—].

Status: Djup karies tand [nr]. Ingen fistel/svullnad. Perkussion u.a. Kyla-test: kortvarig reaktion.

Rtg: Djup karieslesion utan radiologisk apikal patologi.

Samtycke: Förälder/vårdnadshavare informerad om diagnos, selektiv exkavering (medvetet kvarlämnande av kariös dentin nära pulpa för att undvika exponering), risker (progression till pulpit sen fas, behov av extraktion) och prognos. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Kofferdam v.b.
- Selektiv exkavering (perifert till hård dentin, pulpanära områden lämnas mjukt-läderartat för att undvika pulpaexponering)
- Tätslutande fyllning: [GIC (GC Fuji IX) / Komposit / Prefabricerad stålkrona SSC]
- Ocklusion kontrollerad

Material: GC Fuji IX (GIC), Vitrebond, Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme, prefabricerad stålkrona (SSC) v.b., Duraphat 22 600 ppm.

Information om eventuella efterbesvär: Lätt köldkänslighet 1–2 v är normalt. Sök vid: spontansmärta, nattsmärta, svullnad, fistel — kan tyda på progression till pulpit (sen fas) och behov av extraktion.`},
  {id:'remiss',label:'Remiss — Pedodontist',behandlingTag:'remiss pedodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K02.1 Karies i dentin / K04.00 Pulpit (tidig fas) tand [nr].

Bakgrund: Selektiv exkavering [datum]. Multipel karies / beteendeproblematik / komplex behandlingsplan.

Frågeställning: Bedömning och övertagande av fortsatt karies-/pulpasanering. Ev. behov av sedering/narkos.

Bifogas: Rtg, status, behandlingsplan.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'stalkreuna',label:'Stålkrona cementerad',text:'Prefabricerad stålkrona (SSC) cementerad tand [nr].'},{id:'fluorlack',label:'Fluorlackning',text:'Fluorlack (Duraphat) applicerat.'}],
 lakemedel:'Paracetamol barnform v.b.',remissSpec:null},

{id:'pedo51',icd:'K04.01',name:'Pulpit (sen fas) mjölktand',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-51-PULPITMJOLK',
 symptom:['pulpit sen fas','nattsmärta','mjölktand','spontansmärta'],behandling:['extraktion'],
 varning:'ALDRIG tvångsingrepp. Extraktion = enda alternativ.',
 mallar:[{id:'m1',label:'Mall — Akut pulpit (sen fas) mjölktand',behandlingTag:'extraktion',followup:'Återbesök vid behov.',
   text:`Diagnos: Pulpit (sen fas) tand [nr] — mjölktand.

Anamnes: Pat. [ålder] år. Nattlig spontansmärta, värmeprovokation. [Tid till smärta]. Allergier: [—].

Status: Spontansmärta tand [nr]. Djup karies i pulpa. Perkussion: [öm/u.a.]. Rörlighet: [—].

Rtg: Djup karieslesion in i pulpan. [Periapikal patologi: nej / begynnande].

Samtycke: Förälder informerad om diagnos, varför extraktion är enda alternativ (rotbehandling på primär tand med pulpit sen fas är ej indicerat), risk för platshållarbehov, prognos och alternativ. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
☐ Intraligamentär komplettering — vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Extraktion tand [nr] med pedodontisk extraktionstång
- Hemostas (kompression 10 min med fuktad steril kompress)
- Inspektion av alveol (kontroll att rot komplett, ev. inspektion permanent anlag)
- Bettamponad v.b.

Material: Pedodontisk extraktionstång, steril kompress, Spongostan v.b., bettamponad.

Information om eventuella efterbesvär: Bedövningskänsla 2–3 h — undvik biting av läpp/kind. Lätt blödning första timmen är normalt. Mjuk/kall kost första dygnet. Ingen sugning, ingen spottning. Paracetamol barnform v.b. Sök vid: ihållande/ökad blödning, feber, svullnad. Patienten smärtfri efter behandling.`},
  {id:'remiss',label:'Remiss — Pedodontist',behandlingTag:'remiss pedodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K04.01 Pulpit (sen fas) tand [nr] — primär tand.

Bakgrund: Beteendeproblematik / multipel pulpit / komplex behandling — kan ej genomföras vid akutbesök.

Frågeställning: Akut/snabb extraktion under sedering eller narkos. Bedömning av platshållarbehov.

Bifogas: Rtg, status, beteendebedömning.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'hemostas',label:'Hemostas kontrollerad',text:'Hemostas kontrollerad — kompression 10 min.'}],
 lakemedel:'Paracetamol barnform v.b.',remissSpec:null},

{id:'pedo52',icd:'K04.01',name:'Pulpit (sen fas) ung permanent tand — Apexogenes',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-52-APEXOGENES',
 symptom:['apexogenes','öppet apex','pulpotomi','ung permanent','MTA'],
 behandling:['pulpotomi','MTA','Biodentine','kofferdam'],
 varning:'Kofferdam OBLIGATORISK. Öppet apex — bevara vitalitet för rotutveckling.',
 mallar:[{id:'m1',label:'Mall — Pulpotomi / Apexogenes permanent tand',behandlingTag:'pulpotomi MTA',followup:'Återbesök om 24–48 h för slutlig kompositfyllning.',
   text:`Diagnos: Pulpit (sen fas) tand [nr] — ung permanent tand med öppet apex.

Anamnes: Pat. [ålder] år. Spontansmärta, nattsmärta. Tidsförlopp [—]. Allergier: [—].

Status: Spontansmärta tand [nr]. Djup karies/trauma med pulpaexponering. Perkussion [öm/u.a.]. Rörlighet u.a.

Rtg: Öppet apex bekräftat radiologiskt. Ingen apikal radiolucens.

Samtycke: Förälder informerad om diagnos, partiell/cervikal pulpotomi (apexogenes) som syftar till att bevara vital rotpulpa så rotutvecklingen kan slutföras, risker (pulpanekros med behov av apexifikation/MTA-plug, missfärgning) och alternativ. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan
☐ Intraligamentär komplettering — vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Kofferdam OBLIGATORISK
- Trepanation, åtkomst till kronpulpa
- Avlägsnande av kronpulpa till kanalmynningarna med skarp roterande diamantborr i högvarv + riklig vattenkylning
- Hemostas med steril koksaltspellet (vital blödning bekräftad inom 1–3 min)
- [MTA (ProRoot) / Biodentine] ca 2–3 mm direkt mot rotpulpan
- Fuktad bomullspellet + tätslutande temporär GIC (Fuji IX) eller Cavit
- Slutlig kompositfyllning vid återbesök 24–48 h

Material: Kofferdam, NaOCl 3% (kortvarig spolning), steril koksalt, MTA (ProRoot) eller Biodentine, GC Fuji IX / Cavit, Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme.

Information om eventuella efterbesvär: Lätt ömhet 1–3 dygn är normalt. Försiktighet med hård kost. Sök vid: ihållande/spontansmärta, svullnad, fistel, missfärgning av tandkronan. Vitalitetskontroll + rtg vid 3 v, 3 mån, 6 mån, 1 år för att verifiera rotutveckling.`},
  {id:'remiss',label:'Remiss — Endodontist/Pedodontist',behandlingTag:'remiss endo pedo',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL ENDODONTIST / PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K04.01 Pulpit (sen fas) tand [nr] — ung permanent tand med öppet apex. Apexogenes utförd.

Bakgrund: Pulpotomi/apexogenes med [MTA/Biodentine] [datum]. [Komplikation / Beteendeproblematik / Behov av övertagande].

Frågeställning: Bedömning av fortsatt endodontisk handläggning, vitalitetsuppföljning, ev. apexifikation om vitalitet förloras.

Bifogas: Rtg pre/post, traumajournal v.b., status.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'kofferdam',label:'Kofferdam applicerad',text:'Kofferdam applicerat och kontrollerat.'}],
 lakemedel:'Paracetamol + Ibuprofen v.b. enligt vikt.',remissSpec:'Endodontist'},

{id:'pedo55',icd:'K05.2',name:'Perikoronit hos barn (6:a eller 7:a erupterar)',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-55-PERIKO',
 symptom:['perikoronit barn','operculum','6-årstanden','7-årstanden'],behandling:['spolning','klorhexidin','antagonist slipning'],
 varning:'Antibiotika EJ vid okomplicerad perikoronit utan systemisk påverkan (Strama).',
 mallar:[{id:'m1',label:'Mall — Perikoronit',behandlingTag:'spolning',followup:'Kontakta vid försämring.',
   text:`Diagnos: Akut perikoronit regio [nr] — erupterande 6:a/7:a med operculum.

Anamnes: Pat. [ålder] år. Lokal ömhet vid tuggning, gradvis försämring. Allergier: [—]. Feber: [Nej/Ja XX°C].

Status: Svullet, rodnat operculum regio [nr]. Debris under fliken. Antagonist [biter / biter ej] på fliken. Gapförmåga u.a. Ingen feber. Lymfkörtelstatus u.a.

Samtycke: Patient/förälder informerad om diagnos, behandling (spolning + ev. antagonistjustering), förlopp och uppföljning. Samtycke inhämtat.

Anestesi (vid behov):
☐ Ytanestesi Xylocain salva 5% — vid spolning på känslig vävnad
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b. (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b. (max 4,4 mg/kg)
☐ Ingen LA — okomplicerad spolning räcker oftast

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Spolning under operculum med klorhexidin 0,12% (barn) / 0,2% (>12 år)
- Debris avlägsnat med trubbig kanyl/sond
- [Antagonist slipad ur okklusion om bett trauma föreligger]
- Klorhexidin-gel lokalt

Material: Klorhexidin 0,12% (Hexident barn) / 0,2%, trubbig spolningskanyl, Xylocain gel.

Information om eventuella efterbesvär: Lätt ömhet 1–3 dagar. Skonkost, undvik tuggning på fliken. Klorhexidin-baddning × 2/dag i 5–7 d. Paracetamol v.b. Sök vid: feber, ökad svullnad, allmänpåverkan, trismus.`},
  {id:'remiss',label:'Remiss — Käkkirurg/Pedodontist',behandlingTag:'remiss kakkirurg pedo',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL KÄKKIRURG / PEDODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K05.2 Recidiverande perikoronit regio [nr] — erupterande 6:a/7:a.

Bakgrund: Spolningar [antal gånger]. Persisterande/recidiverande operculum. Bettrauma från antagonist.

Frågeställning: Bedömning av operculektomi eller eruptionsfrämjande åtgärder. Tand-position bedömning.

Bifogas: Rtg, status, behandlingshistorik.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'antagonist',label:'Antagonist slipad',text:'Antagonist slipad ur okklusion.'},{id:'antibiotika',label:'Antibiotika (systemisk)',text:'PcV barndos ordinerat pga systemisk påverkan.'}],
 lakemedel:'Paracetamol v.b. Xylocain gel lokalt.',remissSpec:null},

{id:'pedo56',icd:'T81.0',name:'Postextraktionsblödning hos barn',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-56-POSTEXBLOD',
 symptom:['blödning','post-extraktion barn','leverkoagel'],behandling:['hemostas','Cyklokapron','sutur','Mepivakain'],
 varning:'EJ NSAID — ge Paracetamol. LA utan adrenalin (Mepivakain).',
 mallar:[{id:'m1',label:'Mall — Postextraktionsblödning',behandlingTag:'hemostas sutur',followup:'Kontakta omgående vid ny blödning.',
   text:`Diagnos: Postextraktionsblödning tand [nr] — komplikation till ingrepp.

Anamnes: Pat. [ålder] år. Tand [nr] extraherad kl [tid]. Kvarstående blödning trots kompression hemma. Allergier: [—]. Koagulationsanamnes: inga kända blödningssjukdomar. Aktuella läkemedel: [—].

Status: Sivande blödning / dåligt organiserat leverkoagel i alveol tand [nr]. Allmänpåverkan: [—]. Lokalt: [koagulum / aktiv blödning].

Samtycke: Förälder informerad om diagnos, åtgärd (hemostas + sutur), läkemedelsval (EJ NSAID — endast Paracetamol). Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Mepivakain 3% utan adrenalin — förstaval (LA utan vasokonstriktor undviker reboundblödning)
☐ Citanest Octapressin 30 mg/ml + felypressin — alternativ
☐ Septocaine 4% + adrenalin 1:200 000 — endast om Mepivakain otillräckligt
☐ Ytanestesi Xylocain salva 5% — pre-injektion

OBS: Adrenalininnehållande LA kan ge reboundblödning. Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Koagel utsugit/skrapat bort
- Spongostan + Cyklokapron (tranexamsyra) lokalt i alveol
- Vicryl 4-0 kryssutur över alveolen
- Kompression med fuktad steril kompress 20 min
- Blödning stillad — kontroll innan hemfärd

Material: Mepivakain 3% utan adrenalin, Spongostan, Cyklokapron 100 mg/ml lokalt, Vicryl 4-0, steril kompress, klorhexidinlösning v.b.

Information om eventuella efterbesvär: Hög huvudända vid vila. Kall, mjuk mat första dygnet. INGEN sugning, INGEN sportaktivitet 24 h. Paracetamol barnform v.b. — EJ Ibuprofen/NSAID (förlänger blödningstid). Klorhexidin-baddning från dag 2. Suturtagning om 1 vecka. Sök akut vid: ny blödning som ej stillas med 30 min kompression, blekhet, slöhet.`},
  {id:'remiss',label:'Remiss — Barnmedicin/Koagulationsmottagning',behandlingTag:'remiss barnmedicin',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL BARNMEDICIN / KOAGULATIONSMOTTAGNING

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: T81.0 Återkommande/förlängd postextraktionsblödning.

Bakgrund: Extraktion tand [nr] [datum]. Förlängd blödning kräver kirurgisk hemostas + sutur. Inga tidigare kända blödningssjukdomar i familjen.

Frågeställning: Misstanke om underliggande koagulopati (von Willebrand, hemofili, TPK-rubbning). Begäran om B-status, TPK, PK-INR, APTT, vWF-screening.

Bifogas: Status, läkemedel, behandlingsrapport.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'sutur',label:'Sutur lagd',text:'Vicryl 4-0 kryssutur lagd. Suturtagning om 1 vecka.'},{id:'cyklokapron',label:'Cyklokapron',text:'Cyklokapron applicerat lokalt i alveol.'}],
 lakemedel:'Paracetamol v.b. EJ NSAID.',remissSpec:null},

{id:'pedo57blod',icd:'Spontan blödning UNS',name:'Spontan gingival blödning (misstanke hematologi)',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-57-SPONTANBLOD',
 symptom:['spontanblödning','hematologi','oproportionerlig blödning'],behandling:['INGA ingrepp','Cyklokapron lokalt','akutremiss barnmedicin'],
 varning:'⚠️ INGA INGREPP — Akut remiss Barnmedicin för blodstatus (B-status, TPK, LPK).',
 mallar:[{id:'m1',label:'Mall — Spontan gingival blödning',behandlingTag:'akutremiss',followup:'AKUT remiss Barnmedicin.',
   text:`Diagnos: Spontan gingival blödning UNS — misstanke om hematologisk genes.

Anamnes: Pat. [ålder] år. Spontana blödningar [tidsförlopp]. Näsblödningar/blåmärken: [—]. Trötthet/allmänpåverkan: [—]. Allergier: [—]. Aktuella läkemedel: [—]. Familjeanamnes blödning: [—].

Status: Spontan gingival blödning, oproportionerlig till plackförekomst. Petekier slemhinna/hud: [—]. Blekhet: [—]. Lymfkörtelstatus: [—].

Samtycke: Förälder informerad om varför INGA orala ingrepp utförs — misstanke om underliggande blodsjukdom kräver utredning innan invasiv behandling. Akut remiss till barnmedicin. Samtycke inhämtat.

Anestesi: INGEN — inga ingrepp utförs.

Åtgärd:
- INGA orala ingrepp
- Lokalt tryck med Cyklokapron-impregnerad kompress
- Lokal hemostas följt upp tills blödning minskat
- AKUT telefonkontakt + remiss Barnmedicin

Material: Cyklokapron 100 mg/ml, steril kompress.

Information om eventuella efterbesvär: Förälder informerad om att tandvård avvaktas tills blodstatus klar. Lokal Cyklokapron-baddning vid förnyad blödning. Undvik tandborstning på blödande område. Sök akut vid: ökad blödning, allmänpåverkan, andra blödningstecken.`},
  {id:'remiss',label:'Remiss — AKUT Barnmedicin',behandlingTag:'akutremiss barnmedicin',followup:'AKUT — invänta blodstatus.',
   text:`AKUT REMISS — BARNMEDICIN

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Spontan gingival blödning UNS — misstanke hematologisk sjukdom.

Akut status:
- Spontan blödning oproportionerlig till lokal genes
- [Petekier / blåmärken / blekhet / trötthet]
- Inga tandvårdsingrepp utförda

Frågeställning: AKUT blodprovstagning — B-status, TPK, LPK diff, PK-INR, APTT, ev. vWF-screening. Bedömning innan tandvård kan återupptas.

Bifogas: Anamnes, status.

Hälsningar, [Tandläkare] · Tel: [—]`}],
 extraAtgard:[],lakemedel:'Inga ingrepp. Cyklokapron lokalt.',remissSpec:'Barnmedicin'},

{id:'pedo58',icd:'Gingivahyperplasi + Petekier',name:'Systemisk risk / Leukemimisstanke',cat:'Pedodonti — Smärta & Infektion',scId:'PEDO-58-LEUKEMI',
 symptom:['leukemi','petekier','gingivahyperplasi','blek','trött'],behandling:['INGA ingrepp','akutremiss barnakut'],
 varning:'⚠️ INGA INGREPP. AKUT telefonkontakt Barnmedicin/Barnakut.',
 mallar:[{id:'m1',label:'Mall — Leukemimisstanke',behandlingTag:'akutremiss',followup:'AKUT remiss. Tandvård avvaktas.',
   text:`Diagnos: Gingival hyperplasi + petekier — misstanke hematologisk malignitet (leukemi).

Anamnes: Pat. [ålder] år. Snabbt utvecklad gingivahyperplasi, spontana blödningar, blåmärken, trötthet, blekhet, ev. feber/viktnedgång. Allergier: [—]. Familjeanamnes: [—].

Status: Spontan gingival blödning och uttalad gingivahyperplasi (oproportionerlig till plack). Patienten trött och blek. Petekier synliga i [slemhinna/hud]. Lymfkörtelförstoring: [—]. Allmäntillstånd: påverkat.

Samtycke: Förälder muntligen informerad om mycket allvarlig misstanke, varför AKUT remiss krävs och varför inga tandvårdsingrepp utförs. Samtycke inhämtat (nödläge).

Anestesi: INGEN — inga ingrepp utförs.

Åtgärd:
- INGA orala ingrepp
- AKUT telefonkontakt Barnakut/Barnmedicin kl [tid], samtalspartner [Namn]
- Patient remitterad AKUT för blodstatus (B-status, TPK/LPK diff)
- Transport: [Egen bil + förälder / Ambulans]
- Cyklokapron lokalt vid aktiv blödning

Material: Cyklokapron 100 mg/ml, steril kompress.

Information om eventuella efterbesvär: Förälder informerad om akut medicinsk utredning. Tandvård avvaktas tills medicinsk diagnos är klar. Lokal Cyklokapron-baddning vid blödning. Försiktig munhygien.`},
  {id:'remiss',label:'Remiss — AKUT Barnakut/Barnmedicin',behandlingTag:'akutremiss barnakut',followup:'AKUT — tandvård avvaktas.',
   text:`AKUT REMISS — BARNAKUT / BARNMEDICIN

⚠️ STARK MISSTANKE OM HEMATOLOGISK MALIGNITET ⚠️

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Gingival hyperplasi + petekier — misstanke leukemi.

Akut status:
- Uttalad gingivahyperplasi
- Spontana blödningar, petekier, blåmärken
- Blekhet, trötthet, allmänpåverkan
- [Lymfkörtelförstoring, ev. feber, viktnedgång]
- Inga tandvårdsingrepp utförda

Frågeställning: AKUT blodstatus (B-status, TPK, LPK diff, blodutstryk). Bedömning av hematologisk genes.

Telefonkontakt etablerad med [Barnakut/Barnmedicin] kl [Tid], samtalspartner [Namn].

Bifogas: Anamnes, fotostatus, oralt status.

Hälsningar, [Tandläkare] · Tel: [—]`}],
 extraAtgard:[],lakemedel:'INGA ingrepp. Cyklokapron lokalt vid aktiv blödning.',remissSpec:'Barnakut'},
// ── PEDODONTI BETEENDE & SEDERING ──
{id:'pedo62',icd:'Z76.8',name:'Akut tandvårdsrädsla / Behandlingsvägran',cat:'Pedodonti — Beteende & Sedering',scId:'PEDO-62-RADSLA',
 symptom:['tandvårdsrädsla','vägrar','oroligt barn','TSD','behandlingsomognad'],behandling:['TSD','ZOE-förband','sedering','lustgas'],
 varning:'ALDRIG tvång. Livshotande infektion = undantag → sjukhus.',
 mallar:[{id:'m1',label:'Mall — Akut tandvårdsrädsla',behandlingTag:'TSD ZOE-förband',followup:'Nytt besök under sedering/lustgas / Remiss pedodontist/narkos.',
   text:`Diagnos: Tandvårdsrädsla / behandlingsomognad + [aktuell dental diagnos tand [nr]].

Anamnes: Pat. [ålder] år. Akut tandvärk tand [nr] [tid]. Barnet uttalat oroligt/rädd. Tidigare negativa tandvårdsupplevelser: [—]. Allergier: [—]. Medicinering: [—].

Status: Barnet gråter, värjer sig, vägrar gapa. Frankl-skala [1–2]. Inga fastevillkor klargjorda inför ev. sedering.

Samtycke: Förälder informerad om beteendeproblematik, att tvång ej tillämpas (PSL 2010:659), att akuta lindrande åtgärder utförs och att fortsatt behandling planeras under sedering/lustgas/narkos. Samtycke inhämtat.

Anestesi:
☐ Ingen LA — barnet tillåter ej injektion
☐ Ytanestesi Xylocain salva 5% — försök vid acceptans
☐ Septocaine 4% + adrenalin 1:200 000 — vid acceptans (max 7 mg/kg)

OBS: Artikain ej till barn <4 år eller <20 kg. ALDRIG tvångsinjektion.

Åtgärd:
- TSD (Tell-Show-Do) prövad utan framgång
- Behandlingen avbruten för att undvika tvång och smärta
- [Fluorlackning Duraphat 22 600 ppm / ZOE-förband (eugenol+IRM) som temporärt smärtstillande skydd]
- Plan: nytt besök med lustgas/oral sedering (Midazolam) / remiss pedodontist eller narkosenhet

Material: Duraphat 22 600 ppm, ZOE-cement (eugenol + IRM), Tell-Show-Do-tekniker.

Information om eventuella efterbesvär: ZOE-förbandet kan lossna — kontakta vid svår smärta eller ny tandvärk. Paracetamol [vikt-anpassad dos] + ev. Ibuprofen [vikt-anpassad dos] hemma. Skriftlig information om fasteprogram inför sederingsbesök (mat 6 h, klar dryck 2 h innan).`},
  {id:'remiss',label:'Remiss — Pedodontist / Narkosenhet',behandlingTag:'remiss pedo narkos',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PEDODONTIST / NARKOSENHET

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Z76.8 Tandvårdsrädsla + [aktuell dental diagnos tand [nr]].

Bakgrund: Akut tandvärk. TSD-tekniker otillräckliga. Frankl [1–2]. ZOE-förband insatt [datum].

Frågeställning: Bedömning av sederingsform (lustgas/oral Midazolam/IV-sedering) eller narkosbehandling. Multipel sanering kan behövas.

Bifogas: Rtg, status, beteendebedömning, medicinanamnes.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'zoe',label:'ZOE-förband inlagt',text:'ZOE-förband inlagt som temporärt smärtstillande skydd.'},{id:'remiss_pedo',label:'Remiss pedodontist',text:'Remiss utfärdad till pedodontist/narkos.'}],
 lakemedel:'Paracetamol [dos] + ev. Ibuprofen [dos] hemma.',remissSpec:'Pedodontist'},

{id:'pedo63',icd:'K04.01',name:'Bedövningssvikt vid inflammerad tand',cat:'Pedodonti — Beteende & Sedering',scId:'PEDO-63-BEDSVIKT',
 symptom:['bedövningssvikt','lågt pH','smärtgenombrott','intraligamentär'],behandling:['intraligamentär injektion','ZOE-förband','preoperativ NSAID'],
 varning:'Lågt pH i inflammerad vävnad → LA penetrerar ej nerven.',
 mallar:[{id:'m1',label:'Mall — Bedövningssvikt',behandlingTag:'intraligamentär ZOE',followup:'Åter om 2–3 dagar. Sedering/lustgas/narkos.',
   text:`Diagnos: Pulpit (sen fas) tand [nr] med bedövningssvikt — lågt pH i inflammerad vävnad försämrar LA-penetration.

Anamnes: Pat. [ålder] år. Akut tandvärk tand [nr]. Allergier: [—]. Tidigare bedövningssvikt: [—].

Preoperativ smärtlindring: [Paracetamol X mg + Ibuprofen X mg, given kl [tid] — minst 60 min innan ingrepp].

Status: Tand [nr] djup karies/trauma med pulpaengagemang. Spontansmärta, nattsmärta.

Samtycke: Förälder informerad om diagnos, plan A (lokalanestesi + behandling), plan B (vid bedövningssvikt — temporär försegling, åter med förbehandling och sedering/narkos), risker och prognos. Samtycke inhämtat.

Anestesi (försök till bedövning):
☐ Ytanestesi Xylocain salva 5% — pre-injektion (applicerad 3 min)
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration/blockad (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration/blockad (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — alternativ
☐ Intraligamentär komplettering — vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg.

Injektion: [Mandibularblockad / Infiltration] [preparat] [antal] amp. Väntetid [X] min. Effekt: [Full / Ofullständig].

Åtgärd:
- Vid inledande rensning: smärtgenombrott
- Kompletterande intraligamentär injektion
- Fortsatt smärtgenombrott trots adekvat anestesi
- Beslut: etiskt oförsvarbart att fortsätta — kaviteten förseglad med eugenol + IRM som temporärt smärtstillande förband
- Plan: åter om [2–3] dagar med preoperativ Paracetamol + NSAID (om ej kontraindicerat) + ev. lustgas/sedering/narkos

Material: Eugenol + IRM (ZOE-cement), kofferdam v.b., intraligamentärspruta.

Information om eventuella efterbesvär: ZOE-förbandet ger viss smärtlindring 2–7 dygn — kontakta vid förvärrad smärta. Preoperativ smärtlindring nästa besök (Paracetamol [vikt-dos] + Ibuprofen [vikt-dos] 60 min innan). Sök vid: ihållande/förvärrad smärta, svullnad, feber.`},
  {id:'remiss',label:'Remiss — Pedodontist / Narkosenhet',behandlingTag:'remiss pedo narkos',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL PEDODONTIST / NARKOSENHET

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K04.01 Pulpit (sen fas) tand [nr] + bedövningssvikt.

Bakgrund: Försök till mandibularblockad + infiltration + intraligamentär komplettering — otillräcklig effekt. ZOE-förband insatt [datum].

Frågeställning: Bedömning av lustgas/sedering/narkos. Multipel sanering kan behövas.

Bifogas: Rtg, status, anestesijournal.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'intralig',label:'Intraligamentär inj. utförd',text:'Kompletterande intraligamentär injektion utförd.'},{id:'zoe_forband',label:'ZOE-förband (eugenol)',text:'Kaviteten förseglad med eugenol + IRM temporärt.'}],
 lakemedel:'Paracetamol + NSAID preoperativt nästa besök.',remissSpec:null},

{id:'pedo64',icd:'T88.5',name:'Akut komplikation under sedering / lustgas',cat:'Pedodonti — Beteende & Sedering',scId:'PEDO-64-SEDKOMP',
 symptom:['sederingskomplikation','paradoxal reaktion','kräkning','desaturation','SpO2'],behandling:['avbryta','syrgas','sidoläge','112'],
 varning:'⚠️ Desaturation SpO2<92% → haklyft + 100% O2 + Rubens ballong + 112.',
 mallar:[{id:'m1',label:'Mall — Sederingskomplikation',behandlingTag:'avbryta syrgas',followup:'Behandling omplaneras till narkos.',
   text:`Diagnos: Komplikation till anestesi/sedering — [paradoxal reaktion / kräkning / desaturation].

Anamnes: Pat. [ålder] år. Sederad med [Midazolam oral X mg / Lustgas X% O2] kl [Tid]. Aktuell vikt [X kg]. Fasta uppfylld: [Ja/Nej]. Allergier: [—]. Tidigare sederingsreaktioner: [—].

Status: Under behandling uppstod [paradoxal reaktion (agitation, ostyrlighet) / kräkning / desaturation SpO2 X%]. Vitalparametrar: HR [X], BT [X], SpO2 [X]%, andningsfrekvens [X].

Samtycke: Akutsituation — förälder muntligen informerad om komplikation, akuta åtgärder och behov av sjukhusbedömning. Dokumentation görs i efterhand.

Anestesi: Pågående sedering avbryts.

Åtgärd:
- Behandlingen AVBRÖTS omedelbart
- [Syrgas 100% via mask / Haklyft / Sidoläge / Sugning av svalg / Rubens ballong vid otillräcklig egenandning]
- [Flumazenil 0,01 mg/kg IV vid Midazolam-överdos — endast om utbildad]
- [112 larmat kl [Tid]]
- Återhämtning på [X] min
- Övervakning till SpO2 >95%, vaken, orienterad
- Utskrivning kl [tid]: SpO2 [X]%, stabil. Skriftlig + muntlig info: vuxen tillsyn 4 h. Paracetamol v.b.

Material: Syrgas + mask, Rubens ballong, sug, Flumazenil 0,1 mg/ml (vid Midazolam), pulsoximeter, defibrillator/AED.

Information om eventuella efterbesvär: Vuxen tillsyn obligatorisk 4 h efter sedering. Vid förnyad slöhet, andningsbesvär, illamående — sök akut. Behandling omplaneras till narkosenhet.`},
  {id:'remiss',label:'Remiss — AKUT Sjukhus + Narkosenhet',behandlingTag:'akutremiss sjukhus narkos',followup:'AKUT — sjukhusbedömning + framtida narkos.',
   text:`AKUT REMISS — SJUKHUS / NARKOSENHET

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: T88.5 Komplikation till sedering / anestesi.

Akut händelse [datum, tid]:
- Sederingsmedel: [Midazolam X mg / Lustgas X%]
- Reaktion: [Paradoxal / Kräkning / Desaturation SpO2 X% / Annan]
- Åtgärder: [Syrgas, haklyft, sidoläge, sug, 112]
- Återhämtning: [X] min, slutligt SpO2 [X]%

Frågeställning: Akut medicinsk bedömning. Fortsatt tandvård planeras under narkos.

Bifogas: Sederingsjournal, vitalparametertabell, läkemedelsadministration.

Hälsningar, [Tandläkare] · Tel: [—]`}],
 extraAtgard:[{id:'larmad_112',label:'112 larmat',text:'112 larmat kl [tid]. Ambulans tillkallad.'}],
 lakemedel:'Paracetamol v.b.',remissSpec:'Sjukhus akut'},

// ── PEDODONTI SLEMHINNA & MEDICIN ──
{id:'pedo67',icd:'K05.10',name:'ANUG hos barn',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-67-ANUG',
 symptom:['ANUG barn','nekrotiserande gingivit','pseudomembran','papiller','foetor'],behandling:['debridering','Metronidazol','klorhexidin'],
 varning:'⚠️ Extremt sällsynt hos nordiska barn — ALLTID utred immunbrist (Leukemi, Neutropeni, HIV).',
 mallar:[{id:'m1',label:'Mall — ANUG hos barn',behandlingTag:'debridering Metronidazol',followup:'Återbesök om 2 dagar. AKUT remiss barnmedicin.',
   text:`Diagnos: Akut nekrotiserande gingivit (ANUG) hos barn — misstanke om underliggande systemsjukdom.

Anamnes: Pat. [ålder] år. Snabb debut. Foetor ex ore, spontanblödning, smärta. Allergier: [—]. Allmäntillstånd: [—]. Riskfaktorer: dålig munhygien, stress, malnutrition, immunbrist.

Status: Nekrotiserade inverterade papiller. Gråvitt pseudomembran. Kraftig spontanblödning. Foetor ex ore. Lymfkörtelförstoring [—]. Allmäntillstånd: [—].

Samtycke: Förälder informerad om diagnos, varför AKUT utredning av underliggande immunbrist (leukemi, neutropeni, HIV) krävs, behandlingsplan (debridering + Metronidazol). Samtycke inhämtat.

Anestesi (vid varsam debridering):
☐ Ytanestesi Xylocain salva 5% — pre-injektion / endast ytlig debridering
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b. (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b. (max 4,4 mg/kg)

OBS: Artikain ej till barn <4 år eller <20 kg. Försiktig injektion i nekrotisk vävnad.

Åtgärd:
- Varsam supragingival depuration (handinstrument)
- Klorhexidinsköljning 0,12% (barn)
- Metronidazol 10–12 mg/kg × 3 (max 400 mg × 3) i 5–7 dagar
- Återbesök om 2 dagar för fortsatt debridering

Material: Klorhexidin 0,12% (Hexident barn), handinstrument (Gracey), Metronidazol oral suspension.

Information om eventuella efterbesvär: Markant förbättring inom 1–2 dygn med Metronidazol. Klorhexidinbaddning × 2/dag. Mjuk kost. Paracetamol v.b. Sök vid: feber, ökade besvär, allmänpåverkan.`},
  {id:'remiss',label:'Remiss — AKUT Barnmedicin',behandlingTag:'akutremiss barnmedicin',followup:'AKUT — invänta blodstatus/immunutredning.',
   text:`AKUT REMISS — BARNMEDICIN

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K05.10 ANUG hos barn — misstanke immunbrist.

Bakgrund: ANUG är extremt sällsynt hos nordiska barn. Snabb debut [datum]. Debridering + Metronidazol initierad.

Frågeställning: AKUT immunutredning — B-status, TPK, LPK diff (neutrofila), HIV-test, ev. immunglobuliner. Bedömning av underliggande systemsjukdom.

Bifogas: Anamnes, oralt status, fotostatus.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'remiss_barnmed',label:'Remiss barnmedicin',text:'Akut remiss utfärdad till barnmedicin för blodstatus och immunutredning.'}],
 lakemedel:'Metronidazol 10–12 mg/kg × 3 (max 400 mg × 3) i 5–7 dagar.',remissSpec:'Barnmedicin'},

{id:'pedo72',icd:'Q21.3',name:'Medfött hjärtfel / Endokarditrisk',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-72-HJARTA',
 symptom:['hjärtfel','endokardit','profylax','Amoxicillin'],behandling:['endokarditprofylax','Amoxicillin','Klindamycin'],
 varning:'Profylax ENBART till högriskgrupp (barnkardiologs beslut).',
 mallar:[{id:'m1',label:'Mall — Endokarditprofylax',behandlingTag:'Amoxicillin profylax',followup:'Kontakta vid feber de kommande 2–3 veckorna.',
   text:`Diagnos: [Aktuell dental diagnos] tand [nr] + medfött hjärtfel (högriskgrupp endokardit per Barnkardiolog).

Anamnes: Pat. [ålder] år, vikt [X kg]. Medfött hjärtfel: [diagnos]. Klassificering högriskgrupp enligt Barnkardiolog dr [Namn] [datum]. Allergier: [—]. Aktuell medicinering: [—]. Senaste blodstatus: [—].

Status: [Aktuell dental status tand [nr]]. Allmänt: [—].

Samtycke: Förälder informerad om endokarditprofylax (ESC 2023), val av preparat, dosering 60 min före ingrepp, risk för feberreaktion 2–3 v efter ingrepp. Samtycke inhämtat.

Endokarditprofylax (60 min före ingrepp):
☐ Amoxicillin 50 mg/kg po (max 2 g) — förstaval
☐ Klindamycin 20 mg/kg po (max 600 mg) — vid pc-allergi
Given kl [Tid]. Klorhexidinsköljning 0,12% före ingrepp.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin

OBS: Aspirera alltid före injektion (vasokonstriktor-känslighet). Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- [Aktuell behandling]
- Hemostas kontrollerad — utan komplikationer
- Klorhexidin-baddning post-op

Material: Klorhexidin 0,12% (Hexident barn), [aktuellt behandlingsmaterial].

Information om eventuella efterbesvär: Kontakta vid oförklarlig feber, allmänpåverkan, hjärtklappning eller andra symtom de närmaste 2–3 veckorna — risk för endokardit. Skriftlig info given till förälder och Barnkardiolog.`},
  {id:'remiss',label:'Remiss — Barnkardiolog',behandlingTag:'remiss barnkardiolog',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / KONSULTATION — BARNKARDIOLOG

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: [Hjärtfeldiagnos] + planerad tandvårdsbehandling [datum].

Bakgrund: Pågående/planerad odontologisk behandling kräver bedömning av profylax-behov.

Frågeställning:
- Bekräftelse av högriskgruppsklassificering (ESC 2023)
- Profylaxregim (Amoxicillin vs Klindamycin) och dosering enligt vikt
- Ev. behov av samordnad behandling

Bifogas: Behandlingsplan, status, anamnes.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'klindamycin',label:'Klindamycin (pc-allergi)',text:'Klindamycin 15 mg/kg (max 600 mg) po vid pc-allergi.'}],
 lakemedel:'Amoxicillin [Dos] mg po 60 min före. Vid pc-allergi: Klindamycin 15 mg/kg.',remissSpec:null},

{id:'pedo65',icd:'B00.2',name:'Primär herpetisk gingivostomatit (barn)',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-65-HERPES',
 symptom:['herpes barn','blåsor','feber','vesiklar','gingivit barn'],behandling:['Xylocain','Paracetamol','Ibuprofen','klorhexidin'],
 varning:'EJ antibiotika (Strama). Dehydrering → barnakut (dropp).',
 mallar:[{id:'m1',label:'Mall — Herpetisk gingivostomatit (barn)',behandlingTag:'symtomlindring',followup:'Kontakta vid dehydrering. Läker spontant 10–14 dagar.',
   text:`Diagnos: Primär herpetisk gingivostomatit — virusinfektion.

Anamnes: Pat. [ålder] år. Feber [XX]°C, allmänpåverkan. Smärta, vägrar äta och dricka [tidsförlopp]. Allergier: [—]. Aktuell vätskeintag/urin: [—].

Status: Rodnad svullen gingiva. Multipla brustna blåsor/sår på gingiva, tunga, kinder, läppar. Foetor ex ore. Lymfkörtelförstoring submandibulärt. Allmäntillstånd: [—].

Samtycke: Förälder informerad om virusgenes (självbegränsande 10–14 d), varför antibiotika INTE är indicerat (Strama), symtomlindrande behandling och tecken på dehydrering. Samtycke inhämtat.

Anestesi: Lokal ytanestesi (smärtlindring inför måltid).

Åtgärd:
- Xylocain salva 5% applicerat lokalt före mat
- Information om symtomlindring + dehydreringsövervakning
- Kall vätska, glass, mjuk kost
- Klorhexidinbaddning 0,12% (barn) × 2/dag
- Inga antibiotika (Strama 2024)
- Vid svår dehydrering: akut remiss barnakut för IV-vätska

Material: Xylocain salva 5%, Klorhexidin 0,12% (Hexident barn).

Information om eventuella efterbesvär: Läker spontant 10–14 dagar. Smittsam — undvik delning av bestick/leksaker. Paracetamol + Ibuprofen (om ej kontraindicerat) dygnet runt enligt vikt. Sök barnakut omedelbart vid: minskad urin (slutar kissa), slöhet, oförmåga att dricka.`},
  {id:'remiss',label:'Remiss — Barnakut (dehydrering)',behandlingTag:'remiss barnakut',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / AKUTKONTAKT — BARNAKUT

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: B00.2 Primär herpetisk gingivostomatit + dehydrering.

Bakgrund: Vägrar dricka [tid]. Minskad urin / slöhet / minskad hudturgor. Feber [XX]°C.

Frågeställning: Bedömning av dehydreringsgrad, ev. IV-vätska, övervakning.

Bifogas: Anamnes, status, vätskeprotokoll.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'remiss_barnakut',label:'Remiss barnakut (dehydrering)',text:'Remiss utfärdad till barnakut pga dehydrering.'}],
 lakemedel:'Xylocain salva 5% lokalt. Paracetamol + Ibuprofen dygnet runt.',remissSpec:'Barnakut'},

{id:'pedo66',icd:'K12.0',name:'Aftös stomatit barn (Recidiverande afte)',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-66-AFTE',
 symptom:['afte barn','recidiverande sår','ingen feber','aftöst'],behandling:['Xylocain gel','Andolex','SLS-fri tandkräm','Klobetasol'],varning:null,
 mallar:[{id:'m1',label:'Mall — Aftös stomatit',behandlingTag:'symtomlindring',followup:'Kontakta vid major afte (>1 cm) eller om ej läkt inom 14 dagar.',
   text:`Diagnos: Recidiverande aftös stomatit — minor afte.

Anamnes: Pat. [ålder] år. Återkommande sår. Ingen feber. Triggrar: [stress/SLS/kost/menstruation]. Allergier: [—]. Familjeanamnes: [—].

Status: Ytligt sår, gulvit fibrin, röd halo (3–10 mm), insida [läpp/kind/tunga]. Gingiva frisk (skiljer från herpes). Lymfkörtlar u.a.

Samtycke: Förälder informerad om diagnos (självbegränsande), triggers (särskilt SLS i tandkräm), symtomlindrande behandling och när att söka (>1 cm, läker ej inom 14 d). Samtycke inhämtat.

Anestesi: Lokal ytanestesi (smärtlindring inför måltid).

Åtgärd:
- Diagnos afte ställd kliniskt
- Xylocain gel v.b. innan måltid
- SLS-fri tandkräm (Zendium / annan)
- Andolex (bensydamin) sköljning v.b.
- [Vid major afte >1 cm: Klobetasol salva 0,05% lokalt × 2/dag i 5–7 d]
- Läker spontant 7–14 dagar

Material: Xylocain gel, Andolex sköljning, Zendium tandkräm (SLS-fri), Klobetasol salva 0,05% v.b.

Information om eventuella efterbesvär: Läker 7–14 dagar. Undvik kryddstark/sur mat. SLS-fri tandkräm minskar recidiv. Sök vid: major afte >1 cm, läker ej inom 14 d, feber, mångfaldiga sår — då bör malignitet / immunbrist uteslutas.`},
  {id:'remiss',label:'Remiss — Oralmedicin',behandlingTag:'remiss oralmedicin',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — ORALMEDICIN / KÄKKIRURG

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K12.0 Recidiverande aftös stomatit — [major form / atypisk presentation].

Bakgrund: Frekvent recidiv. [Major afte >1 cm / Läker ej inom 14 d / Misstanke om systemsjukdom: Crohns, celiaki, Behçets].

Frågeställning: Bedömning, ev. utredning av underliggande sjukdom, biopsi vid behov, terapival.

Bifogas: Anamnes, fotostatus, behandlingshistorik.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'kortison',label:'Klobetasol (major afte)',text:'Klobetasol lokalt ordinerat pga major afte (>1 cm).'}],
 lakemedel:'Xylocain gel v.b. Zendium tandkräm. Vid major afte: Klobetasol lokalt.',remissSpec:null},

{id:'pedo68',icd:'K11.6',name:'Mucocele / Slemcysta',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-68-MUCOCELE',
 symptom:['mucocele','slemcysta','blåaktig kula','läpp'],behandling:['exspektans','extirpation remiss'],
 varning:'Överläpp → remiss (uteslut tumör). EJ enkel incision (recidiverar).',
 mallar:[{id:'m1',label:'Mall — Mucocele',behandlingTag:'exspektans',followup:'Om ej försvinner inom 1 mån → remiss till specialist.',
   text:`Diagnos: Mucocele (slemcysta) — godartad.

Anamnes: Pat. [ålder] år. Kula i [underläpp/överläpp/kind] sedan [tid]. Brustit och återkommit [antal gånger]. Lokal traumahistorik (bitvana). Allergier: [—].

Status: Mjuk, fluktuerande, blåskimrande bula ca [X] mm på insida [underläpp/överläpp]. Ingen ulceration. Inga andra patologiska fynd.

Samtycke: Förälder informerad om diagnos (godartad), exspektans 1 mån som första alternativ, recidivrisk vid enkel incision, varför mucocele i ÖVERLÄPP kräver remiss (uteslut tumör). Samtycke inhämtat.

Anestesi (vid kirurgisk extirpation av klinikern):
☐ Ingen LA — exspektans/observation
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b.
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b.

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Diagnos ställd kliniskt (mucocele underläpp = godartad)
- [Alt A: Exspektans 1 mån — många brister/återbildas]
- [Alt B: Remiss käkkirurg för kirurgisk extirpation (recidivfri behandling)]
- ⚠️ Mucocele i ÖVERLÄPP eller atypisk presentation → remiss för biopsi (uteslut salivary gland tumor)

Material: [Endast vid extirpation: blad nr 15, Vicryl 5-0, sond, kompress].

Information om eventuella efterbesvär: Vid exspektans — kan brista och återkomma flera gånger. Kontakta vid: snabb tillväxt, fast/hård konsistens, ulceration, mucocele i överläpp. Sök vid ej försvunnen inom 1 månad.`},
  {id:'remiss',label:'Remiss — Käkkirurg',behandlingTag:'remiss kakkirurg',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL KÄKKIRURG

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K11.6 Mucocele [underläpp/överläpp/kind].

Bakgrund: Recidiverande mucocele [tid/antal gånger]. [Atypisk lokalisation i överläpp / atypisk konsistens / snabb tillväxt].

Frågeställning: Kirurgisk extirpation eller marsupialisation. Vid överläpp eller atypiskt utseende — uteslut salivary gland tumor med biopsi.

Bifogas: Fotostatus, anamnes.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'remiss_kak',label:'Remiss käkkirurg',text:'Remiss utfärdad till käkkirurg för kirurgisk extirpation.'}],
 lakemedel:'Ingen medicinering.',remissSpec:'Käkkirurg'},

{id:'pedo69',icd:'S01.5 / T28.0',name:'Brännskada / Iatrogent bitsår (bedövad läpp)',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-69-BITSAR',
 symptom:['bitsår','iatrogent','bedövad läpp','fibrin','förälder orolig'],behandling:['information','klorhexidin','Xylocain gel','Vaselin'],varning:null,
 mallar:[{id:'m1',label:'Mall — Bitsår/Brännskada',behandlingTag:'information',followup:'Kontakta vid utebliven läkning >14 dagar eller infektionstecken.',
   text:`Diagnos: Bitsår läpp (iatrogent) — post-LA komplikation.

Anamnes: Pat. [ålder] år. LA underkäke [datum]. Barnet bet sig i [under-/överläpp] innan bedövning släppte. Allergier: [—].

Status: [X] mm sårarea med vitgult fibrinbeläggning. Mjukdelssvullnad. Ingen rodnad utanför sårkant, ingen pus, ingen feber. Lymfkörtelstatus u.a.

Samtycke: Förälder informerad om diagnos, prognos (självläkning 7–14 d), att fibrin är normalt läkningsstadium (INTE pus), åtgärder och varningstecken. Samtycke inhämtat.

Anestesi: Ingen — endast information och lokal omvårdnad.

Åtgärd:
- Rengöring av sår med koksalt
- Förälder informerad om att fibrin är normalt läkningsstadium, inte infektion
- Klorhexidinbaddning 0,12% × 2/dag i 5–7 d
- Xylocain gel före mat
- Vaselin på läpparna för att förhindra sprickbildning
- Förebyggande: information om att hålla barnet under uppsikt 2–3 h efter LA

Material: Klorhexidin 0,12% (Hexident barn), Xylocain gel, Vaselin.

Information om eventuella efterbesvär: Läker spontant 7–14 dagar. Försiktighet med tuggning på skadan. Sök vid: feber, ökad rodnad/svullnad utanför sårkant, pus (ej fibrin), läker ej inom 14 d.`}],
 extraAtgard:[],lakemedel:'Klorhexidinbaddning. Xylocain gel. Vaselin.',remissSpec:null},

{id:'pedo59',icd:'K09.8',name:'Eruptionscysta / Eruptionshematom',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-59-ERUPCYST',
 symptom:['eruptionscysta','blåaktig bula','eruptionshematom'],behandling:['exspektans','incision'],
 varning:'PUS = abscess → abscess-protokoll.',
 mallar:[{id:'m1',label:'Mall — Eruptionscysta',behandlingTag:'exspektans',followup:'Kontakta vid infektion (feber, pus, svullnad).',
   text:`Diagnos: Eruptionscysta / Eruptionshematom regio [tand nr] — godartad.

Anamnes: Pat. [ålder] år. Blåaktig bula på alveolaren [tid]. Barnet [opåverkat / gnälligt]. Ingen feber. Allergier: [—].

Status: Blåskimrande, fluktuerande bula regio [tand nr]. Ingen rodnad runt. Inget pus. Underliggande tand [erupterar / palperas].

Samtycke: Förälder informerad om diagnos (godartad), att tillståndet är självbegränsande (cystan brister vid eruption), åtgärder vid extrem smärta (kirurgisk incision under LA). Samtycke inhämtat.

Anestesi (vid kirurgisk incision):
☐ Ingen LA — exspektans
☐ Ytanestesi Xylocain salva 5% — vid lätt incision
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration v.b. (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration v.b. (max 4,4 mg/kg)

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Lugnande besked till förälder. Ofarligt tillstånd — förväntas spricka spontant vid eruption.
- Kyld, mjuk kost
- [Vid extrem smärta: Kirurgisk incision under ytanestesi/LA → cystans innehåll dräneras]
- Paracetamol v.b.
- ⚠️ PUS = abscess → abscess-protokoll, ej eruptionscysta

Material: [Vid incision: blad nr 15, klorhexidin, kompress].

Information om eventuella efterbesvär: Brister normalt vid eruption inom dagar–veckor. Sök vid: feber, ökad rodnad, pus, ökad smärta, allmänpåverkan (kan tyda på övergång till abscess).`}],
 extraAtgard:[{id:'incision',label:'Kirurgisk incision utförd',text:'Kirurgisk incision utförd under ytanestesi pga extrem smärta.'}],
 lakemedel:'Paracetamol v.b.',remissSpec:null},

{id:'pedo60',icd:'K00.6 + K03.3',name:'Ektopisk eruption av sexårsmolar',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-60-EKTOPISK',
 symptom:['ektopisk eruption','6-årstanden','resorption','hakning','premolaranlag'],behandling:['exspektans','separering','extraktion'],
 varning:'Kontrollera ALLTID premolaranlag — agenesi ändrar behandlingsplan.',
 mallar:[{id:'m1',label:'Mall — Ektopisk eruption 6-årsmolar',behandlingTag:'exspektans separering',followup:'Rtg-kontroll / Borttagning sep-gummi / Ortodontisk konsultation.',
   text:`Diagnos: Ektopisk eruption tand [16/26] + patologisk rotresorption tand [55/65].

Anamnes: Pat. [ålder] år. [Ingen smärta / Lokal ömhet]. Allergier: [—]. Familjeanamnes ektopi: [—].

Status: Tand [16/26] erupterar med [mesial/distal] hakning under tand [55/65]. Inga abscesstecken. Allmänt: [—].

Rtg: Ektopisk eruption tand [16/26]. Resorption distal rot [55/65]: [lindrig/grav]. Premolaranlag [15/25]: [Finns / Agenesi]. Bedömning: [reversibel/irreversibel] hakning.

Samtycke: Förälder informerad om diagnos, val mellan exspektans/separering/extraktion, betydelse av premolaranlag, ev. behov av luckhållare, risk för bettavvikelse. Samtycke inhämtat.

Anestesi (vid extraktion av tand 55/65):
☐ Ingen LA — vid exspektans/separering
☐ Ytanestesi Xylocain salva 5% — pre-injektion vid extraktion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- [Alt A: Avvaktar — reversibel hakning, rtg-kontroll 6 mån]
- [Alt B: Separering med sep-gummi/mässingstråd mellan 55/16. Kontroll om 2 v.]
- [Alt C: Extraktion 55 pga grav resorption/abscess. Bedömning av luckhållarbehov (beror på premolaranlag).]

Material: [Sep-gummi/mässingstråd 0,3 mm — vid separering] / [Pedodontisk extraktionstång — vid extraktion] / [Luckhållare — efter ortodontistbedömning].

Information om eventuella efterbesvär: Vid separering — ömhet 2–3 d, sep-gummi får ej tas bort hemma. Vid extraktion — kort blödning, mjuk kost. Skoldbarn: Klorhexidinbaddning 0,12% × 2/dag i 5 d. Sök vid: feber, svullnad, sep-gummi lossnar.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K00.6 Ektopisk eruption tand [16/26] + K03.3 Patologisk rotresorption tand [55/65].

Bakgrund: [Reversibel/irreversibel] hakning. Premolaranlag [Finns / Agenesi]. [Separering försökt utan effekt / Extraktion utförd].

Frågeställning: Bedömning av luckhållarbehov, framtida ortodontisk behandling, prognos.

Bifogas: Rtg, fotostatus, behandlingshistorik.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'remiss_ort',label:'Remiss ortodontist',text:'Remiss utfärdad till ortodontist för bedömning av luckhållare.'}],
 lakemedel:'Ingen medicinering.',remissSpec:'Ortodontist'},

{id:'pedo61',icd:'K00.6',name:'Natal / Neonatal tand',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-61-NATAL',
 symptom:['natal tand','neonatal tand','nyfödd','Riga-Fede'],behandling:['konservativ','slipning','extraktion'],
 varning:'K-vitamin kontroll hos neonati (0–10 dagar) OBLIGATORISK om extraktion.',
 mallar:[{id:'m1',label:'Mall — Natal/Neonatal tand',behandlingTag:'konservativ extraktion',followup:'Kontroll vid behov.',
   text:`Diagnos: Natal / Neonatal tand regio [tand nr].

Anamnes: Nyfödd [X dagar gammal]. [Amningssvårigheter / Riga-Fede-sår på tungans undersida / Aspirationsrisk vid extrem lös tand]. K-vitamin given vid födelse: [Ja/Nej]. Allergier: [—].

Status: [Central underkäksincisiv / annan position] erupterad. Tand: [måttligt rörlig / extremt lös — aspirationsrisk]. Riga-Fede-sår: [Ja/Nej]. Slemhinna: [—].

Samtycke: Förälder informerad om diagnos, alternativ (konservativ slipning vs extraktion), risker (vid extraktion: K-vitaminstatus måste säkerställas hos neonati 0–10 d för att undvika blödning, konsekvenser av att tappa primär incisiv för bett/tal). Samtycke inhämtat.

Anestesi:
☐ Ingen LA — putspolering
☐ Ytanestesi Xylocain salva 5% — vid extraktion av extremt lös tand

OBS: Vid neonati 0–10 d: K-vitamin-kontroll OBLIGATORISK före extraktion. Artikain EJ till nyfödd.

Åtgärd:
- [Alt A: Konservativ slipning av incisalkant + zinkfosfat/komposit-glättning för att undvika Riga-Fede-sår vid amning]
- [Alt B: Extraktion pga extrem aspirationsrisk eller massiv Riga-Fede. K-vitamin verifierad i status.]
- Föräldrar informerade om konsekvenser vid extraktion (luckhållarbehov ovanligt men kontroll rekommenderas)

Material: [Polerskiva / sandpapper / komposit för incisalkant-glättning] eller [pedodontisk pincett vid extraktion av extremt lös tand].

Information om eventuella efterbesvär: Konservativ åtgärd — inga särskilda. Vid extraktion: lätt blödning, kompression 5 min, kontakta vid förlängd blödning (K-vitamin-relaterat).`}],
 extraAtgard:[],lakemedel:'Ingen medicinering.',remissSpec:null},

{id:'pedo71',icd:'C91.0 / C92.0',name:'Onkologipatienten (barn under cancerbehandling)',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-71-ONKO',
 symptom:['onkologi','ALL','leukemi','neutropeni','cytostatika','febril neutropeni'],behandling:['INGA ingrepp','akutremiss barnakut'],
 varning:'⚠️ Neutrofila <0,5 + feber → Barnakut DIREKT. Inga invasiva ingrepp.',
 mallar:[{id:'m1',label:'Mall — Onkologipatient',behandlingTag:'akutremiss',followup:'AKUT remiss sjukhustandvård/Barnakut.',
   text:`Diagnos: [C91.0 ALL / C92.0 AML] + [aktuell dental diagnos tand [nr]].

Anamnes: Pat. [ålder] år, vikt [X kg]. Pågående cytostatikabehandling [protokoll, fas]. Behandlande läkare: [Barnonkolog dr Namn]. Senaste blodstatus [datum]: TPK [X], LPK [X], Neutrofila [X]. Senaste cytostatika: [datum]. Söker för [tandvärk/svullnad/mukosit]. Aktuella läkemedel: [—]. Allergier: [—]. Feber: [Ja/Nej XX°C].

Status: [Aktuell oral status]. Mukosit-grad [WHO 0–4]. Allmänpåverkan: [—]. Lymfkörtelstatus: [—].

Samtycke: Förälder informerad om diagnos, varför INGA invasiva ingrepp utförs (neutropenirisk → sepsis), behov av akut samråd med Barnonkolog och ev. remiss till sjukhustandvård. Samtycke inhämtat.

Anestesi: INGEN — inga invasiva ingrepp.

Åtgärd:
- INGA invasiva ingrepp på klinik pga neutropenirisk
- AKUT telefonkontakt med Barnonkolog dr [Namn] kl [Tid]
- Vid neutrofila <0,5 + feber: AKUT remiss Barnakut (febril neutropeni = sepsisrisk)
- Symtomlindrande åtgärder enligt onkologläkares ordination:
  • Mukosit: Bensydamin (Andolex), Caphosol, kall saltvattenspolning
  • Smärta: Paracetamol enligt vikt (EJ NSAID utan onkologläkares OK)
  • Candida: Flukonazol via läkare
- Remitteras akut till sjukhustandvård för bedömning

Material: Mjuk barntandborste, Caphosol-mineralsköljning, klorhexidin 0,12% (Hexident barn) med försiktighet.

Information om eventuella efterbesvär: Förälder informerad om att tandvårdsingrepp avvaktas tills neutrofila återhämtat sig (>1,0). Akut sök vid: feber, frossa, kraftig smärta, svullnad, blödning, allmänpåverkan.`},
  {id:'remiss',label:'Remiss — AKUT Barnonkolog / Sjukhustandvård',behandlingTag:'akutremiss barnonkolog',followup:'AKUT — invänta blodstatus + samråd.',
   text:`AKUT REMISS — BARNONKOLOG / SJUKHUSTANDVÅRD

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: [C91.0 ALL / C92.0 AML] + [aktuell dental diagnos tand [nr]].

Bakgrund: Pågående cytostatikabehandling [protokoll/fas]. Söker för [tandvärk/svullnad/mukosit].

Aktuell status:
- Senaste blodstatus [datum]: TPK [X], Neutrofila [X]
- Feber: [Ja XX°C / Nej]
- Allmäntillstånd: [—]
- Oralt: [mukosit-grad, lokalt fynd]

Inga invasiva ingrepp utförda på klinik.

Frågeställning: Akut samråd om handläggning. Vid neutrofila <0,5 + feber: febril neutropeni = sepsisrisk. Övervägs sjukhustandvård för säker behandling.

Telefonkontakt etablerad med Barnonkolog dr [Namn] kl [Tid].

Bifogas: Anamnes, status, läkemedellista.

Hälsningar, [Tandläkare] · Tel: [—]`}],
 extraAtgard:[],lakemedel:'Inga ingrepp. Flukonazol vid candida via läkare.',remissSpec:'Barnakut'},

{id:'pedo73',icd:'E10 / E16.2',name:'Diabetespatienten (Typ 1 / Akut hypoglykemi)',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-73-DIAB',
 symptom:['diabetes','hypoglykemi','kallsvett','frånvarande','blekhet'],behandling:['druvsocker','juice','avbryta','sidoläge','112'],
 varning:'⚠️ Medvetslöshet/koma: EJ oralt → sidoläge → 112 → Glukagon i.m./s.c.',
 mallar:[{id:'m1',label:'Mall — Akut hypoglykemi vid tandbehandling',behandlingTag:'druvsocker avbryta',followup:'Ny tid [Datum]. Bättre glukos-kontroll inför besök.',
   text:`Diagnos: Typ 1 Diabetes + akut hypoglykemi under tandbehandling.

Anamnes: Pat. [ålder] år, vikt [X kg]. Typ 1 Diabetes sedan [år]. Pågående insulinregim. Senaste måltid: [tid]. Senaste insulindos: [enhet/tid]. Senaste P-glukos: [X mmol/L]. Allergier: [—].

Status: Plötsligt [blek, frånvarande, kallsvettig, darrning, förvirring] vid [LA-insättning / mitt under behandling]. Vitalparametrar: HR [X], BT [X], P-glukos mätt: [X mmol/L]. Allmäntillstånd: [—].

Samtycke: Akutsituation — förälder informerad om akuta åtgärder (orala glukos vid bevarad medvetenhet, sidoläge + 112 + Glukagon vid medvetslöshet). Dokumentation i efterhand.

Anestesi: Pågående behandling avbryts.

Åtgärd:
- Behandlingen AVBRÖTS omedelbart, patienten upprätt med fötter upphöjda
- P-glukos kontrollerat: [X mmol/L]
- [Vid bevarad medvetenhet: 15 g snabba kolhydrater oralt — druvsocker, juice, sockervatten]
- [Vid medvetslöshet/koma: EJ oralt → sidoläge → 112 + Glukagon 0,5 mg (vikt <25 kg) / 1 mg (vikt ≥25 kg) i.m. eller s.c.]
- P-glukos kontroll efter 15 min — upprepa kolhydrater v.b.
- Komplettering med långverkande kolhydrater (mackor/banan) när stabil
- Temporärt förband på tanden vid avbruten behandling
- Information till förälder om händelseförlopp, dokumentation

Material: Glukagon 1 mg/ml (Glukagen Hypokit), druvsocker, juice, P-glukosmätare, syrgas, sidoläge.

Information om eventuella efterbesvär: Trötthet, huvudvärk efter hypoglykemi normalt. Ny tid bokas. Inför nästa besök: ät normal måltid + ev. justera insulin enligt diabetessjuksköterska, mät P-glukos före besök. Förälder informerad om varningstecken: nya hypoglykemier hemma kräver insulin-justering via diabetesteam.`},
  {id:'remiss',label:'Remiss — Barnmedicin / Diabetessjuksköterska',behandlingTag:'remiss barnmedicin diabetes',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / KONTAKT — BARNMEDICIN (DIABETESMOTTAGNING)

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: E10 Typ 1 Diabetes + E16.2 Hypoglykemi under tandbehandling.

Bakgrund: Akut hypoglykemi [datum, tid] under tandbehandling. P-glukos vid händelse [X mmol/L]. Åtgärd: [orala kolhydrater / Glukagon i.m. / 112]. Återhämtning [X] min.

Frågeställning: Bedömning av insulin-regim inför tandbehandling. Ev. behov av justering. Skriftliga riktlinjer för förebyggande.

Bifogas: Händelseförlopp, vitalparametertabell, P-glukosvärden.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'ambulans',label:'112 larmat',text:'112 larmat. Ambulans tillkallad pga medvetslöshet.'}],
 lakemedel:'Druvsocker/juice oralt. Glukagon i.m. vid medvetslöshet (via 112).',remissSpec:null},

{id:'pedo57lac',icd:'S01.5',name:'Traumatisk mjukdelsblödning / Laceration',cat:'Pedodonti — Slemhinna & Medicin',scId:'PEDO-57-LACERATION',
 symptom:['laceration','läpp','tunga','slemhinna','sutur'],behandling:['sutur','Vicryl','Ethilon','rengöring'],
 varning:'Sår vid vermillion border → remiss käkkirurg.',
 mallar:[{id:'m1',label:'Mall — Laceration läpp/tunga',behandlingTag:'sutur',followup:'Suturtagning 5–7 dagar (vid extraoral sutur).',
   text:`Diagnos: Öppet sår läpp/tunga/munhåla — laceration.

Anamnes: Pat. [ålder] år. Ramlat [var/hur, tid]. Inga commotiotecken (medvetslöshet/kräkning/glömska). Stelkramp: OK. Allergier: [—].

Status: Laceration [X] mm i [underläpp/överläpp/tunga/kind]. Tänder u.a. Ingen förhårdnad (inga tandfragment i sår — kontrollerat med palpation och rtg v.b.). Mjukdelssvullnad: [—]. Vermillion border [intakt / korsad — kräver remiss käkkirurg].

Samtycke: Förälder informerad om diagnos, åtgärd (rengöring + sutur), risker (ärrbildning, infektion), behov av remiss vid vermillion-engagemang. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration runt sårkant (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Noggrann rengöring (tvål + koksaltspolning, kontroll av främmande material/tandfragment)
- Sårinspektion — bestäm om sutur behövs
- [X] st Vicryl 4-0/5-0 intraoralt (resorberbar)
- [Ev. Ethilon 5-0/6-0 extraoralt — kräver suturtagning 5–7 d]
- Hemostas god — kompression v.b.
- Vid vermillion border-engagemang: omedelbar remiss käkkirurg för exakt rekonstruktion

Material: Koksaltspolning, Vicryl 4-0/5-0 intraoralt, Ethilon 5-0/6-0 extraoralt, kompress, klorhexidin 0,12% (barn).

Information om eventuella efterbesvär: Mjuk/kall kost första dygnet. Klorhexidinbaddning 0,12% × 2/dag i 5–7 d. Paracetamol v.b. Vermillion-sår — kontroll av ärrbildning. Sök vid: feber, ökad rodnad/svullnad, pus, suturlossning. Suturtagning bokad om 5–7 d (vid extraoral sutur).`},
  {id:'remiss',label:'Remiss — Käkkirurg (vermillion)',behandlingTag:'remiss kakkirurg vermillion',followup:'Specialistsvar tas in i journal.',
   text:`REMISS TILL KÄKKIRURG

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: S01.5 Öppet sår läpp med engagerad vermillion border.

Bakgrund: Trauma [datum]. Sårlängd [X] mm. Vermillion border korsad — kräver exakt rekonstruktion för att undvika ärr/asymmetri.

Frågeställning: Akut/skyndsam rekonstruktion av vermillion border. Bedömning av djup, ev. muskelengagemang.

Bifogas: Fotostatus, traumajournal, rtg v.b.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'suturtagning',label:'Suturtagning bokad',text:'Tid för suturtagning bokad om 5–7 dagar.'},{id:'remiss_kak',label:'Remiss käkkirurg (vermillion)',text:'Remiss utfärdad till käkkirurg — sår vid vermillion border.'}],
 lakemedel:'Paracetamol v.b.',remissSpec:'Käkkirurg'},
// ── ORTODONTI ──
{id:'ort10',icd:'Z46.4',name:'Lossnad bracket / band / ring',cat:'Ortodonti',scId:'ORT-10-BRACKET',
 symptom:['lossnad bracket','band','orthodontisk'],behandling:['avlägsnande','vax'],
 varning:'ALDRIG fixera bracket med komposit.',
 mallar:[{id:'m1',label:'Mall — Lossnad bracket/band',behandlingTag:'avlägsnande vax',followup:'Kontakta ortodontist för ny tid.',
   text:`Diagnos: Lossnad ortodontisk apparatur — bracket/band tand [nr].

Anamnes: Pat. [ålder] år. Lossnade vid [tuggning/borstning/okänt]. Allergier: [—]. Pågående ortodontisk behandling hos [ortodontist/klinik].

Status: Lossnad [bracket/band] tand [nr]. Bracket [hängande på båge / borttappat]. Slemhinna [u.a./irriterad där bracket gnuggar]. Inga slemhinneskador.

Samtycke: Patient/förälder informerad om temporär åtgärd (avlägsnande eller vax), att ALDRIG fixera bracket med komposit på allmän klinik, hänvisning till ortodontist. Samtycke inhämtat.

Anestesi: Ingen — endast temporär åtgärd.

Åtgärd:
- [Bracket avlägsnad om hängande/störande]
- [Vax applicerat som temporärt skydd över bracket/bågände]
- ⚠️ Bracket INTE limmad — det är ortodontistens ansvar (komposit-bonding kräver specifik adhesivteknik och positionering)
- Patient hänvisad till behandlande ortodontist [namn/klinik] för snar omkitning

Material: Ortodontiskt skyddsvax, ev. tång för att avlägsna bracket.

Information om eventuella efterbesvär: Vax kan behöva bytas efter måltid. Sök ortodontist inom 1–2 dagar för att undvika behandlingsfördröjning. Vid slemhinnesmärta — Klorhexidin 0,12% × 2/dag.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / KONTAKT — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Z46.4 Lossnad ortodontisk apparatur — bracket/band tand [nr].

Bakgrund: Pågående ortodontisk behandling. Bracket [avlägsnad / vax applicerat] på allmän klinik [datum].

Frågeställning: Snar omkitning av bracket/band för att undvika behandlingsfördröjning.

Bifogas: Anamnes, fotostatus v.b.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'vax',label:'Vax applicerat',text:'Vax applicerat som temporärt skydd.'}],
 lakemedel:'Ingen medicinering.',remissSpec:'Ortodontist'},

{id:'ort12',icd:'Z46.4',name:'Lossnad bondad lingual retainer',cat:'Ortodonti',scId:'ORT-12-RETLOSS',
 symptom:['retainer','lossnad retainer','recidiv'],behandling:['återlimning','bonding','avlägsnande'],
 varning:'Risk för recidiv — snarast till ortodontist.',
 mallar:[
  {id:'m1',label:'Mall 1 — Retainer återlimmad',behandlingTag:'återlimning bonding',followup:'Kontakta ortodontist för uppföljning.',
   text:`Diagnos: Lossnad bondad lingual retainer regio [33–43 / 13–23].

Anamnes: Pat. [ålder] år. Retainer lossnat från tand [nr] [tid]. Inga andra besvär. Allergier: [—].

Status: Bondad retainer [UK 33–43 / ÖK 13–23] lossnad från tand [nr]. Tråd intakt — ej deformerad. Övriga fästpunkter stabila. Inga tandförflyttningar synliga.

Samtycke: Patient/förälder informerad om åtgärd (återlimning med komposit), risker (förnyad lossning, rekommenderas snar uppföljning hos ortodontist). Samtycke inhämtat.

Anestesi: Ingen — adhesiv åtgärd på frisk emalj.

Åtgärd:
- Isolering med bomullsrullar/kofferdam v.b.
- Lingualyta rengörd (pimpsten/profylaxpasta)
- Etsning Ultra Etch 37% 20 s, sköljning, torkning
- Adhese Universal Vivapen applicerat
- Komposit (Filtek Supreme flytande) appliceras runt tråden, formas, ljushärdas 20 s
- Putsning. Ocklusion u.a.

Material: Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme (flytande), polerstrimlor.

Information om eventuella efterbesvär: Försiktighet med hård/seg mat första dygnet. Undvik tandtråd som drar i tråden — använd super-floss eller proxabrush. Sök ortodontist för bedömning. Vid förnyad lossning eller tandförflyttningar — kontakta omedelbart.`},
  {id:'m2',label:'Mall 2 — Retainer avlägsnad',behandlingTag:'avlägsnande',followup:'Hänvisad ortodontist snarast (risk recidiv).',
   text:`Diagnos: Lossnad lingual retainer — ej möjlig att återlimma.

Anamnes: Pat. [ålder] år. Tråd [deformerad/bruten/saknad]. Retainer ej tillförlitlig. Allergier: [—].

Status: Retainer [deformerad/bruten/saknar fäste]. Försök till återlimning ej meningsfullt. Tandposition: [u.a. / lätt recidiv UK-front].

Samtycke: Patient/förälder informerad om varför hela retainer avlägsnas, recidivrisk, behov av snar ortodontistkontakt för ny retainer eller Essix-skena. Samtycke inhämtat.

Anestesi: Ingen — endast borttagning.

Åtgärd:
- Retainer helt avlägsnad
- Komposit borttaget med diamantborr i högvarv + vattenkylning
- Ytor polerade (Sof-Lex)
- Patient med Essix-skena: instruerad att bära dygnet runt till ny retainer

Material: Diamantborr, polerstrimlor, Sof-Lex.

Information om eventuella efterbesvär: Lätt köldkänslighet 1–2 dagar är normalt. Recidivrisk om Essix ej bärs. Snabb kontakt med ortodontist för ny retainer.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Z46.4 Lossnad bondad lingual retainer regio [33–43 / 13–23].

Bakgrund: Retainer [återlimmad / helt avlägsnad] på allmän klinik [datum]. [Tandposition u.a. / lätt recidiv].

Frågeställning: Bedömning av retainerns kvalitet, ev. ny retainer eller komplettering med Essix-skena. Stabilitet av tandposition.

Bifogas: Status, fotostatus.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'essix',label:'Essix-skena',text:'Patient instruerad att bära Essix-skena dygnet runt till ny retainer.'}],
 lakemedel:'Ingen medicinering.',remissSpec:'Ortodontist'},

{id:'ort11',icd:'Z46.4 + S00.5',name:'Vass bågände sticker i kind/tunga',cat:'Ortodonti',scId:'ORT-11-BAGANDE',
 symptom:['vass bågände','slemhinneskada','ulceration','ortodontisk'],behandling:['klippa bågände','vax','klorhexidin'],varning:null,
 mallar:[{id:'m1',label:'Mall — Vass bågände / slemhinneskada',behandlingTag:'klippa bågände',followup:'Kontakta vid utebliven läkning >7 dagar.',
   text:`Diagnos: Slemhinneskada från ortodontisk apparatur — utskjutande bågände.

Anamnes: Pat. [ålder] år. Lokal ömhet/sårbildning [tid]. Allergier: [—]. Pågående ortodontisk behandling hos [ortodontist/klinik].

Status: Utskjutande bågände distalt om tand [nr]. Ulceration ca [X] mm på [kindslemhinna/tunga]. Inga andra slemhinneskador. Lymfkörtelstatus u.a.

Samtycke: Patient/förälder informerad om temporär åtgärd (klippa bågände), risker (kort bågände kan minska behandlingseffekt — ortodontist informeras). Samtycke inhämtat.

Anestesi:
☐ Ingen LA — endast klippning + lokal omvårdnad
☐ Ytanestesi Xylocain salva 5% — vid mycket öm slemhinna

Åtgärd:
- Bågände avklippt med distal end-cutter
- Kontroll — inga vassa kanter kvarstår
- Sår rengjort (koksaltspolning)
- Vax appliceras runt nya ändan v.b.

Material: Distal end-cutter, ortodontiskt skyddsvax, klorhexidin 0,12%.

Information om eventuella efterbesvär: Läkning 5–7 dagar. Klorhexidin 0,12% × 2/dag i 5–7 d. Xylocain gel före mat v.b. Sök vid: läker ej inom 7 d, feber, ökad svullnad. Sök ortodontist för uppföljning.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / KONTAKT — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Z46.4 + S00.5 Slemhinneskada från utskjutande bågände tand [nr].

Bakgrund: Akut omhändertagande på allmän klinik [datum] — bågände avklippt. Ulceration [X] mm.

Frågeställning: Bedömning av bågens längd, ev. justering av apparatur för att förhindra recidiv.

Bifogas: Status, fotostatus v.b.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'klorhex',label:'Klorhexidinsköljning',text:'Klorhexidin 0,12% sköljning 2 ggr/dag ordinerat.'}],
 lakemedel:'Klorhexidin 0,12%. Xylocain gel v.b.',remissSpec:'Ortodontist'},

{id:'ort13',icd:'Z46.4',name:'Trasig / Förlorad Essix-retainer',cat:'Ortodonti',scId:'ORT-13-ESSIX',
 symptom:['Essix','retainer trasig','förlorad retainer','recidiv'],behandling:['avtryck','ny skena','remiss ortodontist'],
 varning:'Utan bondad retainer = hög recidivrisk — snarast.',
 mallar:[{id:'m1',label:'Mall — Trasig/förlorad Essix-skena',behandlingTag:'avtryck ny skena',followup:'Ny skena levereras [datum].',
   text:`Diagnos: Förlorad/trasig Essix-retainer [ÖK/UK].

Anamnes: Pat. [ålder] år. Essix [trasig/förlorad/ej buren] sedan [tid]. Allergier: [—]. Pågående retentionsfas hos [ortodontist/klinik].

Status: Tänder [ej förflyttade / lätt recidiv UK-front / synlig position-ändring]. Bondad retainer: [finns/saknas]. Bett: [stabil/instabilt].

Samtycke: Patient/förälder informerad om recidivrisk, avtryck för ny skena eller direkt remiss till ortodontist. Samtycke inhämtat.

Anestesi: Ingen — endast avtryck.

Åtgärd:
- [Alt A: Avtryck för ny vakuumpressad skena på klinik]
- [Alt B: Hänvisad ortodontist för ny skena eller annan retentionsplan]
- Patient instruerad att bära befintliga delar/Essix dygnet runt till ny skena klar
- Vid synlig recidiv: snabb ortodontistkontakt

Material: Alginat-avtryck eller digital intraoral scanning, vakuumpressad PETG-folie (om klinik själv tillverkar).

Information om eventuella efterbesvär: Bär ny skena dygnet runt enligt ortodontistens instruktion. Sök ortodontist vid synliga tandförflyttningar — recidiv kan kräva ny ortodontisk behandling.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: Z46.4 Förlorad/trasig Essix-retainer [ÖK/UK].

Bakgrund: Retentionsfas. Skena [trasig/förlorad] sedan [tid]. [Tandposition u.a. / synlig recidiv].

Frågeställning: Bedömning av tandposition, ny skena eller annan retentionsplan. Stabilitet och behov av ev. korrigering vid recidiv.

Bifogas: Status, fotostatus, ev. avtryck.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'avtryck',label:'Avtryck taget',text:'Avtryck taget för ny vakuumpressad retentionsskena.'}],
 lakemedel:'Ingen medicinering.',remissSpec:'Ortodontist'},

{id:'ort14',icd:'S00.5 + Z46.4',name:'Slemhinneskada orsakad av ortodontisk apparatur',cat:'Ortodonti',scId:'ORT-14-SLEMSKADA',
 symptom:['slemhinneskada','ulceration','ortodontisk apparatur','bracket'],behandling:['kausal åtgärd','slipning','vax','klorhexidin'],
 varning:'Sår >3 veckor utan läkning → biopsi.',
 mallar:[{id:'m1',label:'Mall — Slemhinneskada ortodontisk',behandlingTag:'kausal åtgärd',followup:'Kontakta vid utebliven läkning >7 dagar. Sår >3 veckor → biopsi.',
   text:`Diagnos: Slemhinneskada orsakad av ortodontisk apparatur.

Anamnes: Pat. [ålder] år. Lokal ömhet/sårbildning sedan [tid]. Allergier: [—]. Pågående ortodontisk behandling.

Status: Ulceration ca [X] mm på [kindslemhinna/läpp/tunga], mittemot [bracket tand nr / bågände / band]. Inga andra slemhinneskador. Lymfkörtelstatus u.a.

Samtycke: Patient/förälder informerad om kausal åtgärd (slipning/klippning + skydd), läkningsförväntan 5–7 d, och varför sår >3 v kräver biopsi (uteslut malignitet/systemsjukdom). Samtycke inhämtat.

Anestesi:
☐ Ingen LA — endast lokal åtgärd
☐ Ytanestesi Xylocain salva 5% — vid mycket öm slemhinna

Åtgärd:
- Orsak åtgärdad: [bracket-kant slipad / bågände avklippt / band justerat / vax]
- Klorhexidin 0,12% × 2/dag i 5–7 d
- Xylocain gel (före mat) v.b.
- Paracetamol v.b.

Material: Polerstein / Sof-Lex / end-cutter, ortodontiskt skyddsvax, Klorhexidin 0,12%, Xylocain gel.

Information om eventuella efterbesvär: Läkning 5–7 dagar. Sök vid: utebliven läkning >7 d, ökad svullnad, feber. Sår >3 v utan läkning → biopsi för uteslutning av malignitet.`},
  {id:'remiss',label:'Remiss — Käkkirurg/Oralmedicin (biopsi)',behandlingTag:'remiss biopsi',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — KÄKKIRURG / ORALMEDICIN (BIOPSI)

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: S00.5 Persisterande mukosalt sår >3 veckor — initialt ortodontisk genes, ej läkt trots kausal åtgärd.

Bakgrund: Slemhinneskada [datum]. Kausal åtgärd [bracket-kant slipad / bågände klippad] [datum]. Trots åtgärd och lokal terapi har sår ej läkt på [X] veckor.

Frågeställning: Biopsi för uteslutning av malignitet eller systemsjukdom (lichen planus, autoimmun stomatit, plattepitelcancer hos ungdomar är extremt sällsynt men bör uteslutas vid persisterande sår).

Bifogas: Fotostatus, anamnes, behandlingshistorik.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'biopsi_remiss',label:'Remiss biopsi (>3 veckor)',text:'Remiss utfärdad för biopsi — sår >3 veckor utan läkning.'}],
 lakemedel:'Klorhexidin 0,12%. Xylocain gel. Paracetamol v.b.',remissSpec:'Ortodontist'},

{id:'ort15',icd:'K02.0 / K02.1',name:'White spots / Karies kring brackets',cat:'Ortodonti',scId:'ORT-15-ORTKARIES',
 symptom:['white spots','karies brackets','demineralisering','fluorlack'],behandling:['fluorlack','resininfiltration','komposit','munhygieninstruktion'],varning:null,
 mallar:[{id:'m1',label:'Mall — White spots / karies vid brackets',behandlingTag:'fluorlack',followup:'Ny fluorlackning om 3–6 månader.',
   text:`Diagnos: Initialkaries / Karies i dentin — kring ortodontiska brackets.

Anamnes: Pat. [ålder] år. Pågående ortodontisk behandling sedan [tid]. Munhygien: [god/bristfällig]. Fluortandkrämanvändning: [—]. Sukrosintag: [—]. Allergier: [—].

Status: Demineralisering labialt tand [nr] — vita opaka fläckar runt bracket-bas (klassisk WSL). Karies-grad: [initialt/in i dentin]. Plackdepåer: [—]. Gingivit: [—].

Samtycke: Patient/förälder informerad om diagnos, vikten av munhygien under ortodontisk behandling, behandlingsalternativ (fluorlack, resin-infiltration efter debonding, ev. fyllning vid djup karies), risk för permanenta synliga fläckar. Samtycke inhämtat.

Anestesi:
☐ Ingen LA — fluorlack/initialkaries
☐ Ytanestesi Xylocain salva 5% — vid känslig prep
☐ Septocaine 4% + adrenalin 1:200 000 — vid exkavering (max 7 mg/kg för barn)

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- [A. Initialkaries: Fluorlack Duraphat 22 600 ppm × 4/år. Intensifierad MHI. MI Paste Plus (CPP-ACP) hemma.]
- [B. Persisterande WSL: Fluorlack upprepat. Resin infiltration (ICON) planeras EFTER debonding.]
- [C. Karies i dentin: Bracket avlägsnad temporärt → exkavering + kompositfyllning tand [nr] → bracket återlimmas av ortodontist.]
- Kontakt ortodontist ang. fortsatt behandling / avbrytanderisk vid grav karies.

Material: Duraphat 22 600 ppm, MI Paste Plus, Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme, ICON (resin-infiltration efter debonding).

Information om eventuella efterbesvär: Ät inte/drick inte 30 min efter fluorlack. Intensifiera munhygien: elektrisk tandborste, tandtråd/mellanrumsborste runt brackets × 2/dag, fluortandkräm 1450 ppm × 2/dag. Sukrosbegränsning. Sök ortodontist vid grav karies som hotar behandling. Ny fluorlackning om 3 mån.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS / KONTAKT — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K02.0/K02.1 White spots / karies kring brackets.

Bakgrund: Pågående ortodontisk behandling. Demineralisering/karies runt bracket-bas tand [nr]. Fluorlack och MHI initierad.

Frågeställning: Bedömning av kariesrisk under fortsatt behandling. Vid grav karies — eventuell paus av ortodontisk behandling eller bracket-debonding för fyllning.

Bifogas: Fotostatus, status, behandlingshistorik.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'fluorlack',label:'Fluorlackning',text:'Fluorlack (Duraphat) applicerat.'},{id:'mhi',label:'Munhygieninstruktion',text:'Intensifierad munhygieninstruktion given. MI Paste rekommenderat.'}],
 lakemedel:'Fluorlack lokalt.',remissSpec:'Ortodontist'},

{id:'ort16',icd:'S02.5 / S03.2 + K07.2',name:'Akut trauma hos barn med stort överbett',cat:'Ortodonti',scId:'ORT-16-TRAUMAOVERB',
 symptom:['överbett','trauma barn','overjet','traumarisk'],behandling:['traumabehandling','remiss ortodontist'],
 varning:'Barn med överbett >6 mm: 2–3× traumarisk. Remiss ortodontist efter akutbehandling.',
 mallar:[{id:'m1',label:'Mall — Akut trauma + stort överbett',behandlingTag:'traumabehandling',followup:'Remiss ortodontist efter att traumat stabiliserats.',
   text:`Diagnos: [Tandfraktur / Luxation] tand [nr] + Bettavvikelse (stort överbett).

Anamnes: Pat. [ålder] år. Trauma [datum]. [Traumabeskrivning]. Stelkramp: OK. Allergier: [—].

Status: Akut trauma tand [nr]: [beskriv skada]. Overjet: [X] mm (≥6 mm = ökad traumarisk). Läppslutning: [ansträngd/möjlig]. Kyla-test, perkussion, rörlighet: [—].

Rtg: [Frakturlinje / Periapikal status / Rotutveckling].

Samtycke: Förälder informerad om akut traumabehandling, samband mellan stort överbett och ökad traumarisk (2–3× ökad), framtida ortodontisk korrigering (Nationella Riktlinjer Prio 4), risk för upprepat trauma. Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — kortare verkan

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- [Traumabehandling enligt Dental Trauma Guide-protokoll för aktuell skada]
- Ocklusion kontrollerad
- Försäkringsanmälan upprättad
- Remiss ortodontist efter traumastabilisering — överbett bör korrigeras för att minska framtida traumarisk

Material: [Material för aktuell traumabehandling — komposit/kofferdam/splint/MTA enligt protokoll].

Information om eventuella efterbesvär: Skonkost. Klorhexidinbaddning 0,12% × 2. Paracetamol + Ibuprofen v.b. enligt vikt. Vitalitetskontroll följs vid 3 v, 3 mån, 6 mån, 1 år. Ortodontisk behandling rekommenderas för att minska framtida traumarisk.`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — ORTODONTIST

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K07.2 Bettavvikelse (stort överbett ≥6 mm) efter genomgånget akut tandtrauma tand [nr].

Bakgrund: Akut trauma [datum]. Traumabehandling utförd. Overjet [X] mm — 2–3× ökad traumarisk. Ansträngd läppslutning.

Frågeställning: Bedömning av ortodontisk behandling enligt Nationella Riktlinjer Prio 4 — primärt syfte att minska framtida traumarisk + bettfunktion.

Bifogas: Rtg, fotostatus, traumajournal.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'remiss_ort',label:'Remiss ortodontist',text:'Remiss utfärdad till ortodontist för bedömning av bettavvikelse (NR Prio 4).'}],
 lakemedel:'Paracetamol + Ibuprofen v.b. enligt vikt.',remissSpec:'Ortodontist'},

{id:'ort01',icd:'K01.1',name:'Eruptionsstörning hörntänder ÖK (Retinerad/Ektopisk)',cat:'Ortodonti',scId:'ORT-01-HORNTAND',
 symptom:['retinerad horntand','ektopisk eruption','palatinalt förskjuten','guldkedja'],behandling:['interceptiv extraktion','kirurgisk friläggning','bondning guldkedja'],varning:null,
 mallar:[
  {id:'m1',label:'Mall A — Interceptiv extraktion primär hörntand',behandlingTag:'extraktion interceptiv',followup:'Uppföljning om 6 månader. Remiss Ortodonti om utebliven lägesförbättring.',
   text:`Diagnos: Retinerad tand (53/63 ektopisk eruption) ÖK.

Anamnes: Pat. [ålder] år (10–13 år optimal interceptiv ålder). [Symtomfri / lokal ömhet]. Allergier: [—]. Familjeanamnes ektopi/agenesi: [—].

Status: Buckal utbuktning saknas vid palpation (förvänta vid 10 år). Persisterande primär 53/63 [stabil/rörlig].

Rtg: Palatinalt förskjuten permanent 3:a. Ingen lateral resorption av 2:a/4:a. Permanent anlag bekräftat.

Samtycke: Förälder informerad om diagnos, interceptiv extraktion av primär hörntand som strategi (≈75% chans att permanent 3:a vandrar till normal position), uppföljning 6 mån, alternativ vid utebliven förbättring (kirurgisk friläggning + ortodontik). Samtycke inhämtat.

Anestesi (anpassad till barn):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Extraktion primär hörntand [53/63] utan komplikationer
- Hemostas kontrollerad (kompression 10 min)
- Inspektion alveol — kontroll permanent anlag

Material: Pedodontisk extraktionstång, steril kompress, Klorhexidin 0,12% (barn).

Information om eventuella efterbesvär: Bedövning 2–3 h — undvik biting av läpp. Mjuk/kall kost första dygnet. Klorhexidin 0,12% × 2/dag i 5 d. Paracetamol v.b. Uppföljning om 6 mån med rtg-kontroll av permanent 3:as position. Om utebliven förbättring → remiss ortodontist för kirurgisk friläggning.`},
  {id:'m2',label:'Mall B — Kirurgisk friläggning (Specialist)',behandlingTag:'kirurgisk friläggning guldkedja',followup:'Suturtagning om 7–10 dagar. Åter till ortodontist.',
   text:`Diagnos: Retinerad permanent hörntand ÖK — ortodontisk indikation för kirurgisk friläggning.

Anamnes: Pat. [ålder] år. Tidigare interceptiv extraktion av 53/63 [datum]. Utebliven spontan eruption. Pågående/planerad ortodontisk behandling hos [ortodontist/klinik]. Allergier: [—].

Status: Palpabel utbuktning palatinalt regio [13/23]. Allmänt: [—].

Rtg: Retinerad permanent 3:a [13/23]. CBCT bedömd för exakt position och relation till intilliggande tänder.

Samtycke: Patient/förälder informerad om diagnos, kirurgisk friläggning med bondning av guldkedja, samarbete med ortodontist, risker (infektion, blödning, skada på intilliggande tänder, ankylos, gingival recession), prognos. Samtycke inhämtat.

Anestesi (anpassad till barn/ungdom):
☐ Ytanestesi Xylocain salva 5% — pre-injektion
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt (max 7 mg/kg)
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — infiltration (max 4,4 mg/kg)
☐ Nasopalatinal blockad palatinalt
☐ Intraligamentär komplettering — vid otillräcklig effekt

OBS: Artikain ej till barn <4 år eller <20 kg.

Åtgärd:
- Incision palatinalt, palatinal lambå uppfälld
- Benskal avlägsnat under riklig koksaltspolning (vattenkylning)
- Krona frilagd till E-C-gränsen (cemento-enamel junction)
- Etsning Ultra Etch 37% 20 s, sköljning, torkning
- Adhese Universal Vivapen applicerat
- Guldkedja + bracket bondad på krona med komposit (Filtek Supreme), ljushärdas
- Lambå reponerad och suturerad (Vicryl 5-0, [antal] suturer)
- Ortodontist drar i guldkedjan via ortodontisk apparatur

Material: Blad nr 15, raspar, koksaltspolning, Ultra Etch 37%, Adhese Universal Vivapen, Filtek Supreme, ortodontisk guldkedja + bracket, Vicryl 5-0.

Antibiotika: Ingen antibiotika (Strama 2024 — okomplicerad oralkirurgi kräver ej profylax).

Information om eventuella efterbesvär: Måttlig svullnad 2–3 dygn, kall kompress utvändigt. Mjuk/kall kost första veckan. Klorhexidin 0,12% × 2/dag i 7 d. Paracetamol + Ibuprofen v.b. enligt vikt. Suturtagning om 7–10 dagar. Åter till ortodontist för fortsatt traktion. Sök vid: feber, ökad svullnad, pus, blödning.`},
  {id:'remiss',label:'Remiss — Ortodontist / Käkkirurg',behandlingTag:'remiss ortodontist kakkirurg',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — ORTODONTIST / KÄKKIRURG

Patient: [Namn], [ålder] år, [pers.nr]
Diagnos: K01.1 Retinerad permanent hörntand ÖK regio [13/23].

Bakgrund: [Interceptiv extraktion av 53/63 utförd [datum] / Spontan retention. Utebliven eruption efter [tid].]

Frågeställning: Bedömning av kirurgisk friläggning + bondning av guldkedja, samordnad ortodontisk traktion. CBCT för positionsbedömning.

Bifogas: Rtg/CBCT, behandlingshistorik, fotostatus.

Hälsningar, [Tandläkare]`}],
 extraAtgard:[{id:'suturtagning',label:'Suturtagning bokad',text:'Tid för suturtagning bokad om 7–10 dagar.'}],
 lakemedel:'Paracetamol + Ibuprofen v.b. Ingen antibiotika.',remissSpec:'Ortodontist'},

// ── SNABBA KLINISKA SCENARIER ──
{id:'isning01',icd:'K03.8',name:'Isning / Dentinöverkänslighet',cat:'Endodonti',scId:'ISNING-01-DENTHYP',
 symptom:['isning','ilning','kyla','luft','beröring','borströrelser','sött','surt'],
 behandling:['fluoridbehandling','fluorlack','desensitisering','dentin-bonding','komposit'],varning:null,
 mallar:[
  {id:'m1',label:'Alt A — Desensitiseringsbehandling',behandlingTag:'fluoridbehandling desensitisering',followup:'Kontroll om 4–6 veckor. Om fortsatta besvär: rtg + vitalitetsprövning.',
   text:`Diagnos: Dentinöverkänslighet (isning) tand [nr].

Anamnes: Isningssymtom vid kyla, luft och/eller borströrelser sedan [tidsperiod].
Provocerad, kortvarig isning. Spontansmärta saknas.
Lokaliserat till: [lokalisation: cervikalt / approximalt / ocklusalt].

Status:
- Tand [nr]: [Gingivaltillbakagång / Abraderbart dentin / Erosionsskada / u.a.]
- Kyla-test: Positiv reaktion, snabb regression (<10 sek)
- Perkussion: u.a.
- Palpation: u.a.
- Röntgen: u.a. / Approximal kariesmisstanke kontrollerad — [utan karies / kariesmisstanke]

Bedömning: Dentinöverkänslighet — pulpit ej indicerad, ingen endodontisk åtgärd nödvändig.

Samtycke: Patienten informerad om diagnos, godartad orsak (öppna dentintubuli), behandlingsplan (fluorlack + desensitiserande tandkräm), och att symtomlindring kan ta veckor. Information om bakomliggande faktorer (erosion, abrasion, gingival retraktion). Samtycke inhämtat.

Åtgärd:
- Professionell applicering av fluorlack Duraphat 22 600 ppm tand [nr]
- Patient informerad om desensitiserande tandkräm (Sensodyne Rapid Relief / Elmex Sensitive Professional)
- Teknikinstruktion: mjuk borste, modifierad Bass-teknik, ej borsta direkt efter sur dryck
- Kostråd: minska intag av sura drycker (citrusjuice, kolsyrad dryck), vänta 30 min innan tandborstning efter måltid

Material:
- Duraphat fluorlack 22 600 ppm
- Bomullsrullar + isolering
- Sof-Lex/polishstrips för polering av eventuell skarp emaljkant
- Munhygienpaket: mjuk tandborste + mellanrumsborste
- Sensodyne Rapid Relief / Elmex Sensitive (rekommendation till patient)

Information om eventuella efterbesvär:
- Symtomförbättring sker gradvis under 2–4 veckor av Sensodyne/Elmex Sensitive
- Använd desensitiserande tandkräm × 2 dagligen — gnid in lite på det känsliga området före nattning
- Ät inte/drick inte 30 min efter fluorlack
- Undvik kalla drycker, isvatten och sura livsmedel den första veckan
- Borstteknik: lätt tryck, mjuk borste, cirkulär rörelse — undvik horisontell skurning
- Kontakta kliniken vid: persistent isning >6 veckor, spontansmärta, smärta vid värme, nattlig smärta (kan indikera pulpit och kräver vitalitetsprövning)

Uppföljning: Om symtom kvarstår >4–6 veckor: ny undersökning inkl. rtg och vitalitetsprövning.`},
  {id:'m2',label:'Alt B — Fyllning (exponerat dentin/erosion)',behandlingTag:'komposit dentin-bonding',followup:'Kontroll om 6 månader.',
   text:`Diagnos: Dentinöverkänslighet — exponerat dentin tand [nr].

Anamnes: Isning vid kyla och beröring. Lokaliserat till cervikala defekten tand [nr].
Tidigare desensitiserande kräm utan tillräcklig effekt.

Status:
- Tand [nr]: Kileformad cervikal defekt / erosionsskada [mm × mm]
- Dentin exponerat
- Kyla-test: Positiv reaktion, kortvarig

Samtycke: Patienten informerad om diagnos, behandlingsplan (cervikal kompositrestaurering med adhesivteknik), risker (förlust av retention, sekundärkaries, ny isning) samt kostnad. Samtycke inhämtat.

Anestesi:
☐ Ytanestesi Xylocain salva 5% — vid liten, ytlig defekt
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — vid behov av djup anestesi
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt
☐ Ingen anestesi krävdes

Åtgärd:
- Tand [nr] isolerad, torkad
- Selektiv etsning emalj med Ultra Etch 37% (15 sek)
- Adhese Universal Vivapen applicerat enligt fabrikantanvisning
- Cervikal restauration Filtek Supreme nyans [A2/A3]
- Polering med Sof-Lex
- Ocklusionskontroll genomförd

Material:
- Ultra Etch 37% (etsgel)
- Adhese Universal Vivapen (universaladhesiv)
- Filtek Supreme komposit nyans [A2/A3]
- Sof-Lex polishstrips/skivor
- Bomullsrullar/retraktionsband
- Polerkopp + polishpasta

Information om eventuella efterbesvär:
- Mild postoperativ isning 1–3 dagar — avtar gradvis
- Använd Sensodyne/Elmex Sensitive de första 2 veckorna
- Undvik mycket kalla/varma drycker första veckan
- Försiktig munhygien — undvik aggressiv borstning av nya fyllningen
- Optimera teknik: mjuk borste, modifierad Bass — gingival retraktion förvärras av hård borstning
- Kontakta kliniken vid: persistent smärta >2 veckor, fyllning lossnar, spontansmärta, smärta vid värme (kan indikera pulpit)

Uppföljning: Kontroll om 6 månader.`},
  {id:'remiss',label:'Remiss — Endodontist (oklar pulpastatus)',behandlingTag:'remiss endodontist isning',followup:'Specialistsvar för pulpadiagnos.',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Persistent dentinöverkänslighet tand [nr] trots adekvat konservativ behandling — bedömning av eventuell underliggande pulpapatologi.
Anamnes: Isning sedan [tid]. Initial bild förenlig med dentinöverkänslighet. Trots fluorlack, Sensodyne/Elmex Sensitive och eventuell cervikal komposit kvarstår besvär.
Status: Tand [nr] — Kyla-test [normal/förlängd reaktion], perkussion [u.a./ömhet], palpation [u.a.], rtg periapikalt [u.a./reaktion].
Tidigare åtgärd: Fluorlack × [X], desensitiserande tandkräm × [tid], [cervikal komposit datum].
Önskar bedömning av: Vitalitetsprövning, eventuell pulpadiagnos, behov av endodontisk behandling.
Prioritet: Rutin

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'fluorlack',label:'Fluorlack applicerat',text:'Duraphat fluorlack (22 600 ppm) applicerat professionellt.'},{id:'munhygieninstr',label:'Munhygieninstruktion',text:'Munhygieninstruktion given: mjuk borste, cirkelteknik, Sensodyne/Elmex Sensitive.'}],
 lakemedel:'Sensodyne/Elmex Sensitive dagligen. Ibuprofen 400 mg v.b. vid akut isning.',remissSpec:null},

{id:'fraktur01',icd:'S02.5 / S02.52',name:'Tandfraktur (Kronfraktur permanent tand)',cat:'Trauma — Permanenta tänder',scId:'FRAKTUR-01-KRONF',
 symptom:['trauma','fraktur','avsaknad av tandsubstans','skarp kant','isning','smärta','chockad patient'],
 behandling:['kompositrestaurering','pulpaöverkapning','etreponering','RCT','provisorium','fragment-bonding'],
 varning:'⚠️ Fraktur med pulpaexponering kräver akut pulpabehandling samma dag.',
 mallar:[
  {id:'m1',label:'Alt A — Enkel kronfraktur (emalj/dentin, ingen exp.)',behandlingTag:'kompositrestaurering',followup:'Vitalitetsprövning om 4 och 12 veckor. Rtg om 6–12 månader.',
   text:`Diagnos: Kronfraktur tand [nr] — emalj/dentin utan pulpaexponering.

Traumaanamnese: Trauma [datum/tid]. Orsak: [cykelfall/slag/sport/annat].
Smärta: [Ja/Nej]. Isning: [Ja/Nej]. Fraktur vid incidenttillfället: [Ja/Nej].
Fragment bevarat: [Ja/Nej]. Medvetslöshet/amnesi: [Nej / Ja → remiss sjukhus].
Stelkrampsvaccination: [OK / behöver uppdateras → läkare].

Status:
- Tand [nr]: Kronfraktur, emalje- och dentinkomponent synlig
- Pulpaexponering: Nej
- Pulpabilden synlig vid rtg: [normal / lindrig kärlvidgning]
- Perkussion: [u.a. / Lätt ömhet]
- Luxation: [Nej / Ja: typ]
- Kyla-test: [Normal positiv / Försvagad]
- Slemhinna och läpp: [u.a. / Laceration noterad]

Rtg periapikalt: u.a. Rotutveckling: [komplett / inkomplett — öppen apex].

Samtycke: Patienten/vårdnadshavare informerad om diagnos, behandlingsplan (komposit/fragment-bonding), risk för senare pulpit/nekros, behovet av uppföljande vitalitetsprövning samt försäkringsanmälan. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt vid behov
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — vid djup dentinpreparation
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Ytanestesi Xylocain salva 5% — vid mycket ytlig defekt
☐ Ingen anestesi krävdes

Åtgärd:
- Skarp kant avjämnad
- Dentinöverkänslighet skyddad: glasjonomer liner (Fuji IX) / Ca(OH)₂ (Dycal)
- Etsning med Ultra Etch 37%, adhesiv Adhese Universal Vivapen
- Kompositrestaurering tand [nr] med Filtek Supreme, nyans [A2/A3]
- Alternativt: Fragment-bonding av bevarat fragment med adhesivteknik
- Polering med Sof-Lex
- Ocklusionskontroll

Material:
- Ultra Etch 37%, Adhese Universal Vivapen
- Filtek Supreme komposit, nyans [A2/A3]
- Fuji IX (glasjonomer liner) eller Dycal (Ca(OH)₂)
- Sof-Lex polishskivor
- Kofferdam (vid möjligt)
- Munskyddsform vid behov för senare beställning

Information om eventuella efterbesvär:
- Mild isning vid kyla/luft 1–2 veckor — avtar gradvis
- Mjuk kost 1–2 veckor — undvik tuggning på den traumatiska tanden
- Skydda tanden vid sport (individuellt munskydd ordineras)
- Försäkringsanmälan upprättad
- KRITISKT: Vitalitetsprövning obligatorisk om 4 och 12 veckor — pulpit/nekros kan utvecklas senare även utan exposition
- Kontakta kliniken vid: spontansmärta, nattlig värk, missfärgning av tand, fistel/abscess, ny smärta vid bett

Återbesök för vitalitetsprövning om 4 veckor och 12 veckor obligatoriskt.`},
  {id:'m2',label:'Alt B — Fraktur med pulpaexponering',behandlingTag:'pulpaöverkapning RCT',followup:'Återbesök om 1–2 veckor för definitiv behandling. Rtg om 6 och 12 månader.',
   text:`Diagnos: Kronfraktur tand [nr] — med pulpaexponering.

Traumaanamnes: Trauma [datum/tid]. Orsak: [fall/slag/sport/annan].
Tid sedan trauma till behandling: [timmar/dagar].
Fragment bevarat: [Ja/Nej]. Medvetslöshet: [Nej].
Stelkrampsvaccination: [OK / behöver uppdateras].

Status:
- Tand [nr]: Kronfraktur med klinisk pulpaexponering
- Exponeringens storlek: ca [mm] diameter
- Blödning från pulpa: [Ja — rodröd, livlig / Nej — nekrotisk]
- Perkussion: [u.a. / Ömhet]
- Kyla-test: [Positiv / Svag / Negativ]
- Rotutveckling rtg: [komplett / inkomplett — öppen apex]

Bedömning: [Direkt pulpaöverkapning — lämplig om <24h, ren blödning, exposition <1 mm] / [Partiell pulpotomi (Cvek)] / [Pulpektomi indicerad].

Samtycke: Patienten/vårdnadshavare informerad om diagnos, behandlingsval (pulpaöverkapning vs pulpotomi vs pulpektomi beroende på tidsfönster och exponeringsstorlek), risk för pulpanekros trots åtgärd, behovet av definitiv rotfyllning och krona, samt att antibiotika ej är indicerat (Strama). Försäkringsanmälan + uppföljningsplan klargjord. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt + palatinalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — mandibularblockad (uk)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt

Åtgärd:
- Kofferdam
- Vid direkt pulpaöverkapning: Hemostas med NaOCl 1–3% / koksalt, MTA (ProRoot) eller Biodentine applicerat direkt mot pulpa
- Vid partiell pulpotomi (Cvek): Pulpa avlägsnad 2 mm in, MTA/Biodentine, glasjonomer
- Vid pulpektomi: Exstirpation, NaOCl 3% spolning, UltraCal XS (Ca(OH)₂) inlägg, Cavit/IRM provisorium
- Tätning med glasjonomer (Fuji IX) eller komposit
- Eventuell fragment-bonding

Material:
- Kofferdam + klammer
- MTA (ProRoot) / Biodentine
- NaOCl 3% (spolning)
- UltraCal XS Ca(OH)₂
- Cavit / IRM (provisorium)
- Fuji IX glasjonomer
- Ultra Etch 37% + Adhese Universal Vivapen + Filtek Supreme (definitiv tätning)
- Endo-instrument (WaveOne Gold / ProTaper Gold vid pulpektomi)

Information om eventuella efterbesvär:
- Postoperativ smärta 2–5 dagar — Paracetamol 1 g × 4 + Ibuprofen 400 mg × 3 v.b.
- Mjuk kost 1–2 veckor, ingen tuggning på den traumatiska tanden
- Tanden kommer kräva definitiv rotfyllning + krona för långsiktig prognos
- Vid pulpotomi/öppen apex hos ung patient: tanden kan fortsätta apexogenes — undvik pulpektomi om möjligt
- Antibiotika är INTE indicerat (Strama 2024)
- Försäkringsanmälan (Folksam/IF) upprättad
- KRITISKT: Återkom vid spontansmärta, nattvärk, svullnad, missfärgning, fistel — kan indikera pulpanekros
- Obligatorisk uppföljning 1–2 veckor + rtg 6 och 12 månader

Uppföljning: Återbesök om 1–2 veckor för definitiv behandling.`},
  {id:'remiss',label:'Remiss — Endodontist/Specialisttandvård',behandlingTag:'remiss endodontist trauma',followup:'Specialistsvar för avancerad endodontisk behandling och prognos.',text:`REMISS TILL ENDODONTIST / SPECIALISTTANDVÅRD

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Komplicerad kronfraktur tand [nr] med [pulpaexponering / pulpanekros / öppen apex] — bedömning för avancerad endodontisk behandling (apexogenes/apexifikation/regenerativ endodonti).
Traumaanamnes: Trauma [datum]. [Cykelfall/sport/slag]. Tid till första åtgärd: [timmar/dagar].
Status:
- Tand [nr]: Kronfraktur [omfattning], pulpaexponering [storlek mm]
- Rotutveckling: [komplett / inkomplett — öppen apex (mätt på rtg)]
- Pulpastatus: Kyla-test [positiv/svag/negativ], perkussion, palpation
- Eventuella associerade luxationsskador: [Nej/lateralluxation/intrusion/extrusion]
- Mjukvävnad: [Laceration läpp / u.a.]
- Andra trauma-tänder: [specificera om aktuellt]
Bilagor: Periapikal/CBCT, kliniska foton.
Tidigare åtgärd: [Pulpaöverkapning MTA / partiell pulpotomi / pulpektomi med Ca(OH)₂ inlägg, Cavit-provisorium]. Försäkringsanmälan upprättad.
Önskar bedömning av: Definitiv endodontisk behandling, regenerativ endodonti vid öppen apex, kontroll av apexogenes, eventuell långsiktig prognosbedömning för krona/ersättning.
Prioritet: Snar

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'forsarkanm',label:'Försäkringsanmälan',text:'Försäkringsanmälan (Folksam/IF) upprättad och utlämnad.'},{id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under hela behandlingen.'},{id:'munskydd_info',label:'Munskydd ordinerat',text:'Munskydd ordinerat vid framtida kontaktsport.'}],
 lakemedel:'Paracetamol 500–1000 mg v.b. Ibuprofen 400 mg v.b. Ingen antibiotika (Strama).',remissSpec:null},

{id:'stegvisex01',icd:'K02.1 / K02.3',name:'Stegvis Excavering (Djup Karies)',cat:'Endodonti',scId:'STEGVIS-01-EXC',
 symptom:['ilning','kyla','djup karies','asymtomatisk','nära pulpa','röntgenologisk karies'],
 behandling:['stegvis excavering','Ca(OH)₂','glasjonomer','provisorium','kariesexcavering'],varning:null,
 mallar:[
  {id:'m1',label:'Steg 1 — Partiell excavering (1:a besöket)',behandlingTag:'stegvis excavering partiell Ca(OH)₂',followup:'Återbesök om 6–12 månader för steg 2 (definitiv restauration).',
   text:`Diagnos: Djupgående karies tand [nr] — stegvis exkavering, steg 1.

Anamnes: Karies röntgenologiskt noterad, approximal/ocklusalt tand [nr].
Symtom: [Ilning vid kyla / Asymtomatisk]. Spontansmärta: Nej.
Behandlingsval: Stegvis exkavering för att undvika pulpaexponering.

Status:
- Tand [nr]: Djupgående karies, rtg-avstånd till pulpa <1 mm / omöjligt bedöma
- Kyla-test: [Positiv, snabb regression / u.a.]
- Perkussion: u.a.

Rtg: Approximal/ocklusalt kariesskada nära pulpakavum. Periapikalt u.a.

Bedömning: Stegvis exkavering — pulpaavsöndring bevaras med Ca(OH)₂-liner för att undvika pulpaexponering och bevara vital pulpa.

Samtycke: Patienten informerad om diagnos (djup karies), behandlingsalternativ (stegvis exkavering vs direkt exkavering med risk för pulpaexponering), planen för 2-stegsförfarande över 6–12 månader, risk för senare pulpit (övergång till pulpit (sen fas)/pulpanekros vilket kräver rotbehandling), samt kostnad. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — mandibularblockad (uk) / infiltration (ök)
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt

Åtgärd (Steg 1):
- Kofferdam
- Partiell excavering av mjuk karies med rosenborr — hård karies mot pulpagolv lämnas
- Spolning med koksalt 0,9%
- Ca(OH)₂ (Dycal / Life) applicerat mot pulpanärmaste dentin
- Glasjonomer provisorium (Fuji IX) — tätande förband
- Ocklusionskontroll genomförd

Material:
- Kofferdam + klammer
- Rosenborr (excavering)
- Dycal (Ca(OH)₂) eller Life
- Fuji IX glasjonomer
- Bomullsrullar + sug
- Artikulationspapper

Information om eventuella efterbesvär:
- Mild postoperativ isning 1–3 dagar — Ibuprofen 400 mg v.b.
- Glasjonomer-provisoriet håller 6–12 månader — undvik tuggning på hård/seg mat på den sidan
- Mjuk-medel kost första veckan
- Försiktig munhygien runt fyllningen
- KRITISKT: Kontakta kliniken vid spontansmärta, nattlig värk, svullnad, fistel — kan indikera utveckling till pulpit (sen fas)/pulpanekros och behöver rotbehandling
- Återbesök för steg 2 (definitiv restauration) om [6–12 månader] — viktigt att hålla tiden

Uppföljning steg 2: Rtg-kontroll + definitiv restauration om [6–12 månader].`},
  {id:'m2',label:'Steg 2 — Definitiv restauration (uppföljning)',behandlingTag:'fyllning komposit definitiv',followup:'Kontroll om 6–12 månader (röntgen).',
   text:`Diagnos: Djup karies tand [nr] — stegvis exkavering steg 2 (definitiv restauration).

Tidigare behandling: Steg 1 utfört [datum]. Ca(OH)₂ + glasjonomer provisorium placerat.

Status vid detta besök:
- Tand [nr]: Symtomfri sedan steg 1. Ingen spontansmärta. Ilning: [Ja/Nej].
- Kyla-test: [Positiv, normal / Försvagad]. Perkussion: u.a.
- Provisoriet intakt: [Ja/Nej]
- Rtg-kontroll: Periapikalt u.a. Pulpakavum [oförändrat / reparativt dentin bildat].

Bedömning: Gynnsam pulpareaktion — definitiv restauration möjlig.

Samtycke: Patienten informerad om resultat av steg 1 (gynnsam pulpareaktion), planen för definitiv restauration med komposit, fortsatt uppföljningsbehov samt kostnad. Samtycke inhämtat.

Anestesi:
☐ Septocaine 4% + adrenalin 1:200 000 — infiltration buccalt
☐ Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — mandibularblockad / infiltration
☐ Citanest Octapressin 30 mg/ml + felypressin — vid kontraindikation mot adrenalin
☐ Mepivakain 3% utan adrenalin — vid kardiovaskulär komorbiditet
☐ Intraligamentär komplettering vid otillräcklig effekt
☐ Ingen anestesi krävdes (provisorium-byte utan smärtprovokation)

Åtgärd (Steg 2):
- Kofferdam
- Provisorium avlägsnat — kontroll av tidigare Ca(OH)₂-liner
- Ca(OH)₂-liner bevaras (alt. byts till nytt Vitrebond/glasjonomer-liner)
- Etsning Ultra Etch 37%, adhesiv Adhese Universal Vivapen
- Kompositrestaurering Filtek Supreme tand [nr], nyans [A2/A3]
- Polering med Sof-Lex
- Ocklusionskontroll genomförd

Material:
- Kofferdam + klammer
- Vitrebond (glasjonomer-liner)
- Ultra Etch 37%, Adhese Universal Vivapen
- Filtek Supreme komposit, nyans [A2/A3]
- Sof-Lex polishskivor + polerpasta
- Artikulationspapper

Information om eventuella efterbesvär:
- Mild postoperativ isning 1–2 veckor — avtar gradvis
- Använd Sensodyne/Elmex Sensitive vid behov
- Undvik mycket kalla/varma drycker första veckan
- Normal munhygien runt fyllningen
- KRITISKT: Återkom vid spontansmärta, nattlig värk, missfärgning av tand, svullnad — pulpit (sen fas) kan utvecklas även flera år senare
- Röntgenkontroll om 12 månader för att verifiera periapikalt status

Uppföljning: Rtg-kontroll om 12 månader för att verifiera periapikalt status.`},
  {id:'remiss',label:'Remiss — Endodontist (vid komplikation)',behandlingTag:'remiss endodontist stegvis komplikation',followup:'Specialistsvar för rotbehandlingsplan.',text:`REMISS TILL ENDODONTIST

Patient: [Namn], pers.nr [XXXXXX-XXXX]
Frågeställning: Komplikation efter stegvis exkavering tand [nr] — utveckling av pulpit (sen fas)/pulpanekros, behov av rotbehandling.
Anamnes: Stegvis exkavering steg 1 utfört [datum]. [Steg 2 utfört datum / Steg 2 ej hunnits till]. Nu utveckling av [spontansmärta / nattlig värk / fistel / svullnad].
Status:
- Tand [nr]: [Provisorium intakt / Provisorium frakturerat]
- Kyla-test: [Negativ / Förlängd reaktion >30 sek / Positiv]
- Perkussion: [Positiv / u.a.]
- Palpation: [Positiv / u.a.]
- Rtg: Periapikalt [u.a. / Apikal radiolusens]
Bilagor: Periapikal/CBCT, foton.
Tidigare åtgärd: Stegvis exkavering med Ca(OH)₂-liner + glasjonomer provisorium. [Komposit-fyllning utförd / ej hunnits].
Önskar bedömning av: Endodontisk behandling (vital pulpektomi vs nekrosbehandling), prognos, eventuell vidare restauration (krona).
Prioritet: Snar (vid spontansmärta/abscess: Akut)

Remittent: [namn], leg. tandl., [klinik]
Datum: [YYYY-MM-DD]`}],
 extraAtgard:[{id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under hela behandlingen.'},{id:'okkontroll',label:'Ocklusionskontroll',text:'Ocklusion kontrollerad och justerad — u.a.'}],
 lakemedel:'Ibuprofen 400 mg v.b. (kortvarigt postoperativt).',remissSpec:null},

// ══════════════════════════════════════════════════════════════════
// ── FAS 1 — VARDAGSMALLAR (#1–16) ──
// Konsoliderade mallar för dagliga undersökningar, röntgen, status,
// profylax, bettskena, depuration, suturborttagning och sedering.
// ICD-koder hålls i Scenario.icd (sökbar metadata) — INTE i mall-text.
// ══════════════════════════════════════════════════════════════════

{id:'vardag01',icd:'Z01.20',name:'Rutinundersökning vuxen',cat:'Vardag — Undersökning',scId:'VARDAG-01-RUT',
 symptom:['rutinkontroll','revisionsundersökning','årskontroll','tandhälsobedömning'],
 behandling:['anamnes','klinisk undersökning','rtg-bedömning','riskbedömning','egenvårdsråd'],varning:null,
 mallar:[
  {id:'m1',label:'Komplett basundersökning vuxen',behandlingTag:'undersökning rutin',followup:'Revisionsintervall enligt riskprofil — vanligen 12–24 mån.',
   text:`Diagnos: Tandhälsoundersökning utan akut anmärkning. Riskbedömning utförd.

Anamnes:
- Kontaktorsak: Revisionsundersökning enligt kallelseintervall.
- Allmäntillstånd: [Friskanamnes u.a. / specificera relevant sjukdom].
- Läkemedel: [Inga / lista preparat, dos, indikation].
- Allergier: [Inga kända / specificera].
- Tobak och nikotin: [Aldrig / fd / nuvarande — antal cig eller snus per dag].
- Alkohol: [Måttligt / specificera].
- Bruxism eller pressningsvanor: [Ja/Nej]. Snarkning/sömnapné: [Ja/Nej].
- Kostvanor: Sockerexponeringar per dag [antal]. Surt mellan måltider: [Ja/Nej]. Vätskeintag: [vatten/läsk/sportdryck].
- Egenvård: Tandborstning [1×/2×] dagligen, [el-/manuell] borste. Fluortandkräm 1450 ppm: [Ja/Nej]. Mellanrumsrengöring [tandtråd/mellanrumsborste/aldrig], frekvens.
- Tidigare odontologiska problem: [...].

Extraoralt status: Hud, läppar, regionala lymfkörtlar, käkleder och tuggmuskulatur palperade — u.a. [eller specificera fynd].

Intraoralt mjukvävnadsstatus: Slemhinnor, tunga, munbotten, gomvalv och tonsiller inspekterade — u.a. [eller specificera].

Tandstatus:
- Närvarande tänder noterade i odontogram.
- Befintliga restaurationer och rotfyllningar registrerade.
- Manifest karies: [Inga / specificera tand och yta].
- Initial karies (vita lesioner): [Inga / specificera].
- Erosion/attrition (BEWE per sextant): [0/1/2/3].

Parodontalt status:
- PSI-screening sextant 1–6: [kod 0–4 per sextant].
- Blödning vid sondering (BoP): [%].
- Plackindex (PI): [%].
- Recessioner: [Nej / specificera tand och mm].

Ocklusion: Angles klass [I/II/III]. Horisontellt överbett [mm]. Vertikalt överbett [mm]. Interferenser i lateroprotrusion: [Nej/Ja].

Röntgen: Bitewing höger och vänster [datum]. Periapikalbild tand [nr] vid klinisk indikation. Fynd: [u.a. / specificera].

Riskbedömning:
- Kariesrisk: [Låg / Måttlig / Hög] — motivering [...].
- Parodontrisk: [Låg / Måttlig / Hög] — motivering [...].
- Erosion-/sliterisk: [Låg / Hög].
- Allmänmedicinsk risk: [Ingen / specificera].

Bedömning: Sammantaget [god / måttlig / nedsatt] munhälsa. Behov av [förebyggande åtgärder / fyllning tand X / parodontal behandling / protetisk översyn].

Samtycke: Pat. informerad om fynd, föreslagen behandlingsplan, alternativ, risker samt kostnad enligt TLV. Samtycker till föreslagen plan och dokumentation.

Material använt vid undersökning: Spegel, sond, parodontalprobe (UNC-15 eller WHO), IDF-bitewing, intraoralkamera vid behov.

Information om egenvård och eventuella besvär: Pat. instruerad i Bass-teknik, fluortandkräm 1450 ppm × 2/dag och mellanrumsrengöring. Vid hög kariesrisk rekommenderas tandkräm 5000 ppm samt fluorlackning 2–4 ggr/år. Inga efterbesvär från själva undersökningen förväntas; lätt blödning vid sondering kan förekomma och avtar inom timmar.

Planering: [Inga åtgärder utöver revision / Lista av planerade behandlingar i prioritetsordning]. Revisionsintervall [12 / 18 / 24] månader baserat på riskprofil.`},
  {id:'remiss',label:'Remiss — Specialist (vid behov)',behandlingTag:'remiss specialist',followup:'Återkoppling när specialistutlåtande inkommer.',
   text:`REMISS — [Specialisttandvård område: ange]

Remittent: Tandläkare [namn], klinik [namn], tel [...].
Patient: [Initialer + födelseår — INGA personnummer].

Anamnes och status (sammanfattning):
- Kontaktorsak: [...].
- Relevant allmänanamnes och läkemedel: [...].
- Aktuella odontologiska fynd: [...].
- Röntgenfynd: [bifogat / hänvisning].

Frågeställning till specialist: [Tydlig frågeställning, t.ex. "Bedömning av retinerad 23 — kirurgisk friläggning vs extraktion?"].

Tidigare utförda åtgärder: [...].

Bifogat: Aktuella röntgenbilder, foton, tidigare journalanteckningar.

Kontakt: Återkoppling önskas via [post / digital remiss / telefon].`}
 ],
 extraAtgard:[
  {id:'fluorlack',label:'Fluorlackning vid besöket',text:'Duraphat 22 600 ppm NaF applicerat på riskytor efter rengöring och torrläggning.'},
  {id:'pliktinfo',label:'PSL-information',text:'Pat. informerad om att DentaGuide-Pro är beslutsstöd enligt PSL 2010:659 och att slutgiltigt kliniskt beslut tas av behandlande tandläkare.'},
  {id:'kostradgivning',label:'Kostrådgivning',text:'Kostsamtal genomfört: sockerexponeringar identifierade, råd om frekvens, syra-attacker och munhygien-timing.'}
 ],
 lakemedel:null,remissSpec:'Vid behov — endodontist, parodontolog, käkkirurg, ortodontist eller oralmedicinsk specialist'},

{id:'vardag02',icd:'Z01.20 + akut symptomspecifik ICD',name:'Akutundersökning',cat:'Vardag — Undersökning',scId:'VARDAG-02-AKUT',
 symptom:['akut smärta','akut svullnad','akut trauma','akut blödning','akut främmande föremål'],
 behandling:['triagering','akutanamnes','smärtlindring','akutbehandling','remiss vid behov'],varning:'Vid feber >38°C, snabb spridning av svullnad, andnings-/sväljningssvårigheter eller medvetandepåverkan — direkt till sjukhus.',
 mallar:[
  {id:'m1',label:'Akutbesök — generell mall',behandlingTag:'akut undersökning',followup:'Återbesök för definitiv behandling vid behov.',
   text:`Diagnos: [Symptombaserad diagnos — sätts efter akut bedömning]. Akutbesök.

Anamnes:
- Kontaktorsak: [Smärta / svullnad / blödning / trauma / annan akut anledning].
- Debut: Symtom uppstod [datum/tid]. Förlopp: [förbättring / oförändrat / försämring].
- Smärtkaraktär: [pulserande / ilning / molande / skarp]. VAS [0–10]. Provocerad/spontan.
- Tidigare åtgärder eller egenvård: [Paracetamol / Ibuprofen / dos och frekvens / ingen].
- Allmäntillstånd: Feber [Ja/Nej, °C]. Sjukdomskänsla [Ja/Nej]. Sömnstörning av symtom [Ja/Nej].
- Allmänanamnes: Sjukdomar [...]. Läkemedel inkl. antikoagulantia, bisfosfonater, immunosuppression [...]. Allergier [...].

Triagering: [Direkt åtgärd nu / Inom 24 h / Inom 1 vecka / Hänvisning till sjukhus].

Status:
- Extraoralt: Svullnad [Nej / Ja, lokalisation och utbredning]. Rodnad. Värmeökning. Lymfkörtlar [u.a./palp.förstorade]. Munöppning [mm].
- Intraoralt: Mjukvävnad [u.a. / fluktuation / fistel / sår]. Aktuell tand/region [nr]: [karies / fraktur / mobilitet grad I–III / fistel].
- Sensibilitetstest tand [nr]: [Positiv kortvarig / Positiv dröjande / Negativ / Ej testad].
- Perkussion vertikal/horisontell: [u.a. / ömhet].
- Palpation apikalt/buckalt: [u.a. / ömhet / fluktuation].

Röntgen: [Periapikalbild / bitewing / OPG] tagen — fynd: [...].

Bedömning: [Specifik diagnos — t.ex. akut apikal abscess tand 36 med vestibulär fluktuation].

Samtycke: Pat. informerad om akut diagnos, föreslagen akut åtgärd, alternativ, risker och kostnad. Samtycker till behandling.

Anestesi (om åtgärd planeras nu — välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml infiltration/ledning
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — [antal] ml
[ ] Citanest Octapressin 30 mg/ml + felypressin — [antal] ml (vid kardiovaskulär hänsyn)
[ ] Mepivakain 3% utan adrenalin — [antal] ml (vid blödningsrisk eller ekonomiska skäl)
[ ] Ytanestesi (Xylocain salva 5% / Oraqix)
[ ] Ingen anestesi behövs vid detta besök

Åtgärd vid akutbesöket: [Trepanering / dränage via incision / temporär fyllning / suturering / smärtkupering / antibiotika-recept / hänvisning].

Material använt: [Cavit / IRM / koppartrådsbandning / komposit / Vicryl 4-0 sutur / Spongostan / Cyklokapron — specificera].

Information om efterbesvär: Pat. informerad om förväntad postoperativ ömhet [12–48 h], möjlig svullnad och hematom samt om att smärtan oftast minskar inom 24 h efter dränage. Smärtlindring: Paracetamol 1 g × 4 + Ibuprofen 400 mg × 3 vid behov, alternativt enligt allmänmedicinsk hänsyn. Akutkontakt vid tilltagande svullnad, feber >38,5 °C, sväljnings- eller andningssvårigheter, kvarstående blödning >2 timmar eller utebliven symtomlindring inom 48 h.

Planering: Återbesök [datum/tid] för [definitiv endodontisk behandling / extraktion / suturkontroll]. Recept utskrivet: [...]. Sjukskrivning: [Nej / Ja, antal dagar].`},
  {id:'remiss',label:'Remiss — Akut sjukhus eller specialist',behandlingTag:'remiss akut',followup:'Säkerställ att patient anlänt till mottagande enhet.',
   text:`AKUT REMISS — [Käkkirurgisk klinik / Akutmottagning / Specialist]

Remittent: Tandläkare [namn], klinik [namn], tel [...].
Patient: [Initialer + födelseår].

Indikation för akut remiss:
[ ] Cellulit eller spridd odontogen infektion
[ ] Feber >38°C med systempåverkan
[ ] Andnings- eller sväljningssvårigheter
[ ] Maxillofacial fraktur eller misstanke om sådan
[ ] Massiv blödning som ej kontrolleras lokalt
[ ] Misstänkt malignitet
[ ] Annat: [specificera]

Akut status: [Sammanfattning av extra- och intraoralt status, vitala parametrar om mätta].

Vidtagna åtgärder före remiss: [Dränage / anestesi / antibiotika / smärtlindring — preparat, dos, tidpunkt].

Patient transporteras med: [Eget åk / taxi / ambulans — beställd kl. ...].

Kontakt vid frågor: [Telefonnummer].`}
 ],
 extraAtgard:[
  {id:'foto',label:'Klinisk fotodokumentation',text:'Extra- och intraorala foton tagna av aktuell region för dokumentation och uppföljning. Inga personuppgifter i filnamn.'},
  {id:'tempvitala',label:'Vitalparametrar',text:'Temperatur [°C], puls [/min], BT [mmHg], saturation [%] — uppmätta vid akutbesöket.'},
  {id:'tidskodning',label:'Akut tidskodning',text:'Akutbesök inom 2 h från första kontakt. Tidpunkter dokumenterade: kontakt [tid], ankomst [tid], åtgärd påbörjad [tid].'}
 ],
 lakemedel:'Smärtlindring enligt symtom: Paracetamol 1 g × 4 + Ibuprofen 400 mg × 3. Antibiotika endast vid systempåverkan/spridning enligt Strama 2024.',remissSpec:'Käkkirurg eller sjukhus vid livshotande förlopp'},

{id:'vardag03',icd:'Z01.20 ortodontisk bedömning',name:'Tandregleringsundersökning (TR-US)',cat:'Vardag — Undersökning',scId:'VARDAG-03-TRUS',
 symptom:['bettavvikelse','trångställning','glesställning','korsbett','överbett','underbett','retinerad tand'],
 behandling:['ortodontisk bedömning','riskanalys','remiss ortodontist'],varning:null,
 mallar:[
  {id:'m1',label:'TR-US — bedömning + dokumentation',behandlingTag:'TR-US tandreglering',followup:'Återkoppling efter remiss till ortodontist.',
   text:`Diagnos: Bedömning av tandställning och bettrelation inför eventuell ortodontisk behandling.

Anamnes:
- Kontaktorsak: [Förälder/patient önskar bedömning av tandställning / remiss från revisionstandvård].
- Tidigare ortodontisk behandling: [Nej / Ja, specificera].
- Trauma mot ansikte/tänder: [Nej / Ja, datum och utfall].
- Allmäntillstånd: [u.a. / specificera].
- Sug-/bitvanor: [Inga / tumsugning till ålder X / nappanvändning / nagelbitning].
- Andning: [Näsa / mun]. Snarkning/sömnapné: [Ja/Nej].

Status — extraoralt:
- Ansiktsprofil: [rak / konvex / konkav].
- Symmetri: [u.a. / asymmetri].
- Läpprelation i vila: [kompetent / inkompetent].
- TMD-screening: Käkledsljud [Nej/Ja], gapförmåga [mm], deviation vid gapning.

Status — intraoralt:
- Mjukvävnad: u.a.
- Hygien: PI [%], BoP [%].
- Tandstadium: [primärt / växelbett / permanent].
- Antal närvarande tänder: [...]. Persistens av mjölktänder: [Nej / Ja].
- Karies/restaurationer: [...].

Bettrelation:
- Angles klass molar: höger [I/II/III], vänster [I/II/III].
- Hörntandsklass: höger [...], vänster [...].
- Horisontellt överbett (overjet): [mm].
- Vertikalt överbett (overbite): [mm eller %].
- Mittlinjeavvikelse: ÖK [mm höger/vänster], UK [mm].
- Trångställning: ÖK [mm], UK [mm]. Glesställning: [...].
- Korsbett: [Nej / unilateralt höger eller vänster / bilateralt / anterior].
- Saxbett: [Nej / specificera tänder].
- Öppet bett: [Nej / anterior eller posterior, omfattning].

Funktion:
- Lateroprotrusion: [hörntandsstyrd / gruppstyrd].
- Interferenser: [Nej / specificera].
- Tungposition i vila: [...].

Röntgen: OPG [datum] — fynd: [...]. Cephalometri vid indikation [efter remiss].

Bedömning: [Behandlingsbehov enligt IOTN eller motsvarande]. [Indikation för ortodontisk behandling / observation / inget behandlingsbehov].

Samtycke: Pat./vårdnadshavare informerad om fynd, eventuellt behov av remiss till ortodontist, alternativa behandlingsupplägg samt finansieringsmöjligheter. Samtycker till remiss och informationsöverföring.

Material använt vid undersökning: Spegel, sond, parodontalprobe, intraoralkamera, IOTN-mall.

Information: Pat./vårdnadshavare informerad om att tandreglering är elektiv behandling, att slutbedömning görs av specialisttandläkare i ortodonti och att behandlingstid varierar [12–36 mån]. Inga efterbesvär från undersökningen.

Planering: [Remiss till ortodontist / Återkontakt om X månader / Observation utan åtgärd].`},
  {id:'remiss',label:'Remiss — Ortodontist',behandlingTag:'remiss ortodontist',followup:'Specialistsvar tas in i journal när det kommer.',
   text:`REMISS — Specialisttandläkare i ortodonti

Remittent: Tandläkare [namn], klinik [namn], tel [...].
Patient: [Initialer + födelseår].

Frågeställning: Bedömning av [trångställning / korsbett / klass II/III / retinerad tand / annan avvikelse] samt eventuell behandlingsplan.

Sammanfattning anamnes och status:
- Tandstadium: [...].
- Angles klass: [...].
- Overjet/overbite: [mm].
- Trångställning ÖK/UK: [mm].
- Korsbett/saxbett: [...].
- Funktionella avvikelser: [...].
- Hygien och kariesrisk: [...].
- Eventuella relevanta allmänsjukdomar/läkemedel: [...].

Bifogat: OPG, intraorala och extraorala foton, modellfoton (eller scan). Cephalometri tagen [Ja/Nej].

Tidigare ortodontisk behandling: [Nej / Ja, specificera].

Pat./vårdnadshavares motivation och förväntningar: [...].

Kontakt: Återkoppling önskas via [post / digital remiss / telefon].`}
 ],
 extraAtgard:[
  {id:'foton',label:'Ortodontiska foton',text:'Intraorala och extraorala foton tagna enligt standardprotokoll (frontal, sida, ocklusala vyer).'},
  {id:'modell',label:'Modellscan/avtryck',text:'Digital scan av ÖK och UK + bettregistrering — sparat och bifogat remissen.'},
  {id:'iotn',label:'IOTN-bedömning',text:'IOTN Dental Health Component grad [1–5]. Esthetic Component grad [1–10].'}
 ],
 lakemedel:null,remissSpec:'Specialisttandläkare i ortodonti'},

{id:'vardag04',icd:'Z01.20 bitewing',name:'Bitewing-röntgen',cat:'Vardag — Röntgen',scId:'VARDAG-04-BW',
 symptom:['kariesscreening','approximalkaries','marginalbensnivå'],
 behandling:['röntgenundersökning','dosbedömning','bildbedömning'],varning:'Graviditet kräver särskild motivering och blyförkläde.',
 mallar:[
  {id:'m1',label:'Bitewing höger + vänster',behandlingTag:'bitewing rtg',followup:'Förnyad bitewing enligt riskprofil (12–36 mån).',
   text:`Diagnos: Röntgenundersökning för karies- och bensnivåbedömning.

Anamnes/Indikation:
- Indikation: [Revisionsröntgen enligt riskprofil / nya symtom / uppföljning av tidigare karies / övrigt].
- Senaste bitewing: [datum].
- Graviditet: [Nej / Ja, trimester — undersökning utförs endast vid stark indikation och med blyförkläde].

Samtycke: Pat. informerad om syftet med röntgen, stråldosens storleksordning (motsvarar bakgrundsstrålning ca [1–2] dygn) och möjliga alternativ. Samtycker.

Material: Digitala sensorer (storlek [1/2]), bitewing-hållare, blyförkläde och tyreoideakrage.

Utförande:
- Två bitewing-bilder (höger och vänster premolar–molar-område).
- Rätt central stråle, ingen tippning, ingen överlappning.
- Bildkvalitet: [godkänd / behov av omtagning, motivering].
- Stråldos: [mGy om dokumenteras].

Fynd:
- Approximalkaries: [Inga / tand X yta Y — grad enligt ICDAS eller E1/E2/D1/D2/D3].
- Sekundärkaries vid restauration: [Nej / specificera].
- Marginal bensnivå: [u.a. / horisontell förlust X mm / vertikala defekter tand Y].
- Furkationsinvolvering: [Nej / grad I–III tand X].
- Pulpastenar, periapikala förändringar synliga inom bilden: [...].
- Tandsten: [Nej / supragingivalt / subgingivalt].
- Övriga fynd: [...].

Bedömning: [Inga åtgärder krävs / behandling planeras tand X yta Y / fördjupad undersökning med apikalbild tand Z].

Information: Pat. informerad om fynd, behandlingsbehov och stråldos. Inga efterbesvär från röntgenundersökningen.

Planering: [Förnyad bitewing om 12 / 18 / 24 / 36 mån enligt riskprofil].`},
  {id:'remiss',label:'Remiss — Käkröntgen vid komplicerad bedömning',behandlingTag:'remiss röntgen',followup:'Svar inkluderas i fortsatt utredning.',
   text:`REMISS — Käkröntgen / specialisttandvård

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Önskad undersökning: [CBCT region X / panorama / occlusalbild / annan].

Frågeställning: [t.ex. "Tredimensionell bedömning av periapikal lesion tand 36 inför endodontisk omrevision"].

Tidigare röntgen: Bitewing [datum], periapikal [datum], OPG [datum]. Bifogas.

Kliniska fynd som motiverar utökad bildgivning: [...].

Kontakt: Återkoppling önskas via [...].`}
 ],
 extraAtgard:[
  {id:'blyforkl',label:'Blyförkläde + tyreoideakrage',text:'Pat. utrustad med blyförkläde och tyreoideakrage under hela exponeringen.'},
  {id:'dosjournal',label:'Stråldosdokumentation',text:'Stråldos noterad i röntgenjournal enligt klinikens rutin.'}
 ],
 lakemedel:null,remissSpec:'Käkröntgen vid avancerade bedömningar'},

{id:'vardag05',icd:'Z01.20 periapikal',name:'Periapikal röntgen',cat:'Vardag — Röntgen',scId:'VARDAG-05-PA',
 symptom:['periapikal bedömning','endodontisk diagnostik','fraktur','rotresorption','postoperativ kontroll'],
 behandling:['röntgenundersökning','bildbedömning','dokumentation'],varning:null,
 mallar:[
  {id:'m1',label:'Apikalbild tand [nr] — diagnostik eller kontroll',behandlingTag:'apikal röntgen',followup:'Förnyad röntgen vid uppföljning enligt indikation.',
   text:`Diagnos: Periapikal röntgenundersökning tand [nr].

Anamnes/Indikation:
- Klinisk frågeställning: [Smärtutredning / sensibilitetstest negativ / fistel / fraktur-misstanke / preoperativ planering / postoperativ kontroll efter rotfyllning eller extraktion / uppföljning av apikal förändring].
- Senaste apikalbild tand [nr]: [datum / aldrig tidigare].

Samtycke: Pat. informerad om syfte, dos och behov. Samtycker.

Material: Digital sensor (storlek 1/2), filmhållare (paralelltekniken), blyförkläde, tyreoideakrage.

Utförande:
- Paralelltekniken (XCP-hållare) — central stråle vinkelrät mot bildreceptorn.
- Antal exponeringar: [1 / 2 vinklingar för rotseparation].
- Bildkvalitet: [godkänd / omtagning motiverad].

Fynd:
- Tandkronan: [karies / restauration / fraktur].
- Rotkanaler: [synliga / kalcifierade / tidigare rotfyllda till [mm] från apex].
- Periapikalt: [u.a. / vidgad rothinnespalt / radiolucens diameter ca X mm / sklerotisk reaktion].
- Marginalt ben: [u.a. / förlust].
- Rotresorption: [Nej / extern inflammatorisk / extern ersättning / intern].
- Främmande föremål: [Nej / specificera].

Bedömning: [Specifik diagnos t.ex. K04.4 apikal parodontit tand 36 / Postendodontisk läkning u.a. / Tand restaureringsbar].

Information: Pat. informerad om fynd och konsekvenser. Inga efterbesvär från röntgenundersökningen.

Planering: [Endodontisk behandling / omrotfyllning / extraktion / observation och kontroll om X månader].`},
  {id:'remiss',label:'Remiss — Endodontist vid komplex apikal patologi',behandlingTag:'remiss endodontist',followup:'Specialistsvar in i journal.',
   text:`REMISS — Specialisttandläkare i endodonti

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Frågeställning: [t.ex. "Bedömning av apikal lesion tand 36 efter tidigare rotfyllning — omrevision vs. apikal kirurgi vs. extraktion"].

Anamnes och status: [...].

Aktuell röntgen: Periapikal [datum], CBCT vid indikation.

Tidigare endodontisk behandling: [Nej / Ja, utförd [datum] av [...]].

Pat. preferens och allmänanamnes: [...].

Kontakt: Återkoppling önskas via [...].`}
 ],
 extraAtgard:[
  {id:'tvavinklar',label:'Två exponeringsvinklar',text:'Två vinklingar (rakt + excentriskt) för rotseparation och kanalbedömning.'},
  {id:'blyforkl',label:'Blyförkläde',text:'Blyförkläde och tyreoideakrage applicerade.'}
 ],
 lakemedel:null,remissSpec:'Endodontist eller käkröntgen vid komplex apikal patologi'},

{id:'vardag06',icd:'Z01.20 OPG',name:'Panoramaröntgen (OPG)',cat:'Vardag — Röntgen',scId:'VARDAG-06-OPG',
 symptom:['översiktsbild','impakterad tand','preoperativ planering','käkrelation','traumautredning'],
 behandling:['panoramaröntgen','bildbedömning'],varning:null,
 mallar:[
  {id:'m1',label:'OPG — översikt och planering',behandlingTag:'OPG panorama',followup:'Förnyad OPG vanligen vart 5:e år eller vid ny indikation.',
   text:`Diagnos: Panoramaröntgen för översiktsbedömning av käkar, tänder och käkleder.

Anamnes/Indikation:
- Frågeställning: [Översikt vid första besök / impakterade visdomständer / preoperativ planering inför extraktion eller implantat / käkledsbedömning / traumautredning / patologi-misstanke].
- Senaste OPG: [datum / aldrig].

Samtycke: Pat. informerad om syfte och dos (motsvarar 1–4 dagars bakgrundsstrålning). Samtycker.

Material: Digital OPG-apparat, blyförkläde (utan tyreoideakrage som kan skymma fältet om indikation finns för halsbedömning).

Utförande:
- Pat. positionerad med Frankforter-plan parallellt med golvet och mittlinje i fokus.
- Stillastående under exponering [ca 15 sek].
- Bildkvalitet: [godkänd / omtagning krävs — orsak].

Fynd:
- Tandstatus: [...].
- Impakterade tänder: [Nej / tand X — position och relation till n. alveolaris inferior].
- Karies, restaurationer, rotfyllningar: [översiktligt].
- Marginalbensnivå: [u.a. / horisontell förlust / fokala defekter].
- Käkleder: [u.a. / asymmetri / kondylförändring].
- Maxillarsinus: [u.a. / förtätning / cysta / slemhinneförtjockning].
- Mandibularkanal: [synlig och regelrätt / variation].
- Patologi: [Nej / cystiska förändringar / tumör-misstänkt / osteomyelit].
- Övrigt: [stenar i submandibulariskörtel, antrolit, främmande material].

Bedömning: [...].

Information: Pat. informerad om fynd. Inga efterbesvär.

Planering: [Kompletterande CBCT vid komplex anatomi / remiss käkkirurg / extraktion / implantatplanering / uppföljning].`},
  {id:'remiss',label:'Remiss — Käkröntgen för CBCT',behandlingTag:'remiss CBCT',followup:'Svar in i fortsatt planering.',
   text:`REMISS — Käkröntgen

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Önskad undersökning: CBCT region [maxilla / mandibel / region X], FOV [diameter cm], voxel [storlek].

Frågeställning: [t.ex. "3D-bedömning av 38 i förhållande till n. alveolaris inferior inför kirurgisk extraktion"].

Bifogat: OPG [datum], periapikal [datum], klinisk sammanfattning.

Allmänanamnes: [...].

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'blyforkl',label:'Blyförkläde',text:'Blyförkläde applicerat innan exponering.'},
  {id:'positionering',label:'Positioneringskontroll',text:'Frankforter-plan och mittlinje verifierade före exponering.'}
 ],
 lakemedel:null,remissSpec:'Käkröntgen vid CBCT-indikation'},

{id:'vardag07',icd:'K07.6 DC/TMD screening',name:'DC/TMD screening + utvidgad bettfysundersökning',cat:'Vardag — Bettfysiologi',scId:'VARDAG-07-DCTMD',
 symptom:['käksmärta','huvudvärk','knäppningar','låsningar','tuggsvårigheter','gapsvårigheter'],
 behandling:['DC/TMD-screening','utvidgad bettfysundersökning','egenvårdsråd','remiss bettfysiolog'],varning:null,
 mallar:[
  {id:'m1',label:'DC/TMD kort screening (vardag)',behandlingTag:'DC/TMD screening',followup:'Vid positiva screeningfynd — utvidgad bettfysundersökning.',
   text:`Diagnos: DC/TMD-screening enligt validerat protokoll.

Anamnes (3TQ-screeningfrågor):
1. Smärta i tinningar, ansikte, käkleder eller käkar senaste 30 dagarna: [Ja/Nej].
2. Förändring i smärta vid käkrörelser, tuggning eller funktion: [Ja/Nej].
3. Huvudvärk i tinningar senaste 30 dagarna: [Ja/Nej].

Övriga symtom:
- Käkledsljud (knäppning/krepitation): [Ja/Nej, ena eller bägge sidor].
- Episod av käklåsning: [Ja/Nej, kortvarig/långvarig].
- Tuggsvårigheter: [Ja/Nej].

Status — kort:
- Smärtfri maximal gapning: [mm].
- Maximal aktiv gapning: [mm].
- Lateroprotrusion: hö [mm], vä [mm].
- Protrusion: [mm].
- Käkledsljud: [Inga / knäppning hö-/vä-sida vid X mm / krepitation].
- Palpationsöm i tuggmuskulatur: [m. masseter / m. temporalis — höger/vänster, grad 0–3].
- Palpationsöm käklederna lateralt: [u.a. / öm].

Bedömning enligt DC/TMD: [Ingen TMD / Myalgi / Artralgi / Discusderangering med reduktion / Closed lock / Annan].

Samtycke: Pat. informerad om screeningens syfte och eventuellt behov av utvidgad bedömning eller remiss till bettfysiolog. Samtycker.

Material använt: Linjal, palpationsfinger, dokumentationsblankett DC/TMD.

Information om egenvård: Pat. instruerad i mjuk kost, värme/kyla, undvikande av tuggummi/hård kost, käkmotion enligt protokoll och stresshantering. Pat. informerad om att TMD oftast är godartat och självbegränsande men kan kvarstå längre vid kvarstående stress eller parafunktion. Vid förvärrad smärta, låsning eller plötsligt nedsatt gapning rekommenderas tidigarelagd kontakt.

Planering: [Egenvård + kontroll om 4–6 v / utvidgad bettfysundersökning / remiss bettfysiolog / bettskena se separat mall].`},
  {id:'m2',label:'Utvidgad bettfysundersökning (DC/TMD lång)',behandlingTag:'DC/TMD utvidgad',followup:'Behandlingsplan upprättas — egenvård, bettskena eller remiss.',
   text:`Diagnos: Utvidgad bettfysiologisk undersökning enligt DC/TMD-protokoll.

Anamnes:
- Smärtdebut: [datum]. Förlopp: [förbättring / oförändrat / försämring].
- Smärtkaraktär: [molande / pulserande / skarp / brännande]. VAS i vila [0–10], vid funktion [0–10].
- Smärtlokalisation: [tinning / käkled / kindmuskulatur / nacke / öra].
- Värsta tidpunkt på dygnet: [morgon / kväll / oberoende].
- Pressning/gnissling (känd): [Dagtid / nattetid / både].
- Faktorer som förvärrar/lindrar: [...].
- Tidigare TMD-behandling: [...].
- Psykosocialt: Sömnkvalitet, stress, depression-/ångestsymtom — screening med 2 frågor (PHQ-2, GAD-2).
- Allmänsjukdomar relevanta (reumatoid artrit, fibromyalgi, kronisk smärta): [...].

Status:
- Maximal aktiv gapning: [mm]. Smärtfri gapning: [mm]. Passiv gapning (assisterad): [mm].
- Lateroprotrusion hö/vä, protrusion: [mm].
- Smärta vid öppning/stängning: [Nej / Ja, lokalisation].
- Käkledsljud — öppning: [Nej / klick hö vid X mm / vä vid Y mm]. Stängning: [...]. Reciproka klick.
- Palpation:
  - m. temporalis (anterior/medial/posterior): grad 0–3 per sida.
  - m. masseter (superficiell/djup): grad 0–3 per sida.
  - m. pterygoideus lateralis (familiäri palpation): grad 0–3 per sida.
  - Käkled lateralt och bakre kondylpol: grad 0–3 per sida.
  - Nacke (m. sternocleidomastoideus, m. trapezius): grad 0–3.
- Provokationstest: Statisk belastning, dynamisk belastning, kompressionstest käkled.
- Bett: Slitsfasetter [Nej/Ja, omfattning]. Linea alba [Nej/Ja]. Tunginpressningar [Nej/Ja].

Bedömning enligt DC/TMD Axis I: [Specifik diagnos]. Axis II (psykosocialt): [Lågt / Måttligt / Högt behov].

Samtycke: Pat. informerad om diagnos, prognos, behandlingsalternativ (egenvård, bettskena, fysioterapi, farmaka, remiss till bettfysiolog) och kostnad. Samtycker till föreslagen plan.

Material använt: DC/TMD-mall, linjal, palpationsfinger, kalibreringsverktyg.

Anestesi: Ej aktuellt vid bettfysundersökning.

Information om egenvård och eventuella efterbesvär: Pat. instruerad i: mjuk kost 2–4 v, undvikande av tuggummi, käkmotion (öppna-stänga, lateroprotrusion enligt instruktion 3×/dag), värme 10–15 min, stresshantering och sömnhygien. Vid behov Paracetamol 1 g × 3 alt. Ibuprofen 400 mg × 3 i max 1–2 v. Efterbesvär från palpation kan ge kortvarig ömhet 1–2 dygn.

Planering: [Egenvård 4–6 v + kontroll / bettskena se separat mall / remiss bettfysiolog / fysioterapi].`},
  {id:'remiss',label:'Remiss — Bettfysiolog',behandlingTag:'remiss bettfysiolog',followup:'Specialistsvar in i fortsatt plan.',
   text:`REMISS — Specialisttandläkare i bettfysiologi

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Frågeställning: Bedömning av [TMD-myalgi / discusderangering / kronisk käksmärta / nedsatt gapning / annan] inkl. förslag till behandling.

Sammanfattning:
- Symtomdebut och förlopp: [...].
- VAS-smärta: vila [...], funktion [...].
- Maximal aktiv gapning: [mm]. Klick: [...].
- Palpationsfynd: [...].
- DC/TMD Axis I-diagnos: [...].
- Tidigare behandling (bettskena, fysio, farmaka): [...].
- Psykosocial belastning: [Låg / Måttlig / Hög].
- Relevant allmänanamnes: [...].

Bifogat: Foton, OPG (vid indikation), DC/TMD-mall ifylld.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'bettskenavardering',label:'Bettskena — indikation',text:'Pat. uppfyller kriterier för stabiliseringsskena ÖK enligt SBU. Se separat mall för avtryck.'},
  {id:'fysio',label:'Fysioterapi-rekommendation',text:'Rekommenderas remiss till fysioterapeut med TMD-inriktning för käkmotion och nackbehandling.'},
  {id:'phq',label:'Psykosocial screening',text:'PHQ-2 och GAD-2 utförd — vidare bedömning vid förhöjda värden.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3 i max 1–2 veckor. NSAID (Ibuprofen 400 mg × 3) endast korttidsbehandling vid akut artralgi.',remissSpec:'Specialisttandläkare i bettfysiologi'},

{id:'vardag08',icd:'K05.0 / K05.1 parodontalt status',name:'Parodontalt status — registrering',cat:'Vardag — Status',scId:'VARDAG-08-PAROD',
 symptom:['tandköttsblödning','fickfördjupningar','tandlossning','rörlighet'],
 behandling:['fickdjupsmätning','BoP','PI','fäste-/recessionsmätning','riskbedömning'],varning:null,
 mallar:[
  {id:'m1',label:'Komplett parodontalt status (6-punktsmätning)',behandlingTag:'parodontalt status',followup:'Förnyad mätning enligt riskprofil — vanligen 6–24 mån.',
   text:`Diagnos: Parodontal statusregistrering — sex punkter per tand.

Anamnes:
- Blödande tandkött vid borstning eller spontant: [Ja/Nej].
- Mobilitet eller tandvandring: [Nej / specificera].
- Tobak: [Aldrig / fd / nuvarande].
- Diabetes och HbA1c: [Nej / Ja, värde].
- Tidigare parodontal behandling: [Nej / Ja, år och utfall].
- Familjehistoria av tidig tandlossning: [Nej / Ja].

Status — registrerat per tand (mesiobuckalt, buckalt, distobuckalt, distolingualt, lingualt, mesiolingualt):
- Fickdjup (PPD) i mm.
- Blödning vid sondering (BoP): +/–.
- Pus/exsudat: +/–.
- Recession (gingivalkant till CEJ): mm.
- Kliniskt fäste (CAL) = PPD + recession.
- Furkationsinvolvering molarer: grad I (1–3 mm), II (>3 mm men ej genom), III (genomgående).
- Mobilitet: grad I (<1 mm), II (1–2 mm), III (>2 mm eller vertikal).

Sammanfattande mått:
- Antal tänder med PPD ≥ 4 mm: [...].
- Antal tänder med PPD ≥ 6 mm: [...].
- BoP%: [...].
- Plackindex (PI%): [...].
- Genomsnittlig fästförlust: [mm].
- Antal furkationer grad II–III: [...].

Röntgen: Bitewing + periapikalbild ÖK + UK [datum]. Bensnivå mätt från CEJ: [mm per tand]. Mönster: [horisontell / vertikal / blandad].

Bedömning enligt EFP/AAP 2018:
- Stadium: [I (<15% / 1–2 mm CAL) / II (15–33% / 3–4 mm) / III (>33% med tandförlust ≤4) / IV (>33% med tandförlust ≥5 eller komplex)].
- Grad: [A (långsam, <0,25 mm/år eller %ben/ålder <0,25) / B (måttlig, 0,25–1,0) / C (snabb, >1,0)].
- Utbredning: [Lokaliserad <30% / Generaliserad ≥30% / Molar-incisivmönster].

Samtycke: Pat. informerad om diagnos, prognos, behandlingsplan (initialbehandling, omvärdering, ev. parodontalkirurgi, stödbehandling) samt kostnad. Samtycker.

Material använt: Parodontalprobe UNC-15 eller WHO, spegel, exploraator.

Anestesi: Vid djup mätning eller känslighet — Xylocain salva 5% ytanestesi vid behov.

Information om eventuella efterbesvär: Pat. informerad om att lätt blödning och kortvarig ömhet kan förekomma efter sondering och avtar inom timmar. Vid kvarstående blödning eller smärta — kontakt.

Planering: [Egenvårdsinstruktion + depuration / initialbehandling i kvadranter / omvärdering efter 6–8 v / remiss parodontolog vid grad C eller stadium IV].`},
  {id:'remiss',label:'Remiss — Specialisttandläkare i parodontologi',behandlingTag:'remiss parodontolog',followup:'Specialistsvar styr fortsatt behandling.',
   text:`REMISS — Specialisttandläkare i parodontologi

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Frågeställning: Bedömning av [parodontit grad C / aggressiv form / kombinationsproblem perio-endo / preimplantitisk bedömning / kirurgisk behandling].

Sammanfattning:
- Stadium/Grad enligt EFP/AAP 2018: [...].
- BoP%: [...]. PI%: [...].
- Antal tänder med PPD ≥6 mm: [...].
- Furkationer grad II–III: [...].
- Genomgången initialbehandling: [Nej / Ja, datum och utfall].
- Tobak: [...]. Diabetes: [...]. Övrigt relevant: [...].

Bifogat: Helstatus parod, bitewing + apikalbilder, OPG.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'fotoregistrering',label:'Fotodokumentation',text:'Intraorala foton tagna för uppföljning av gingival hälsa.'},
  {id:'mikrobiologi',label:'Mikrobiologisk provtagning',text:'Subgingival mikrobiologisk provtagning vid grad C eller refraktär parodontit — analyseras hos ackrediterat lab.'},
  {id:'hba1c',label:'HbA1c-värde',text:'HbA1c efterfrågat från husläkare vid diabetesmisstanke — värde noterat.'}
 ],
 lakemedel:null,remissSpec:'Specialisttandläkare i parodontologi'},

{id:'vardag09',icd:'K02 kariesstatus',name:'Kariesstatus + riskbedömning',cat:'Vardag — Status',scId:'VARDAG-09-KARIES',
 symptom:['karies','initialkaries','sekundärkaries','approximalkaries','rotkaries'],
 behandling:['kariesregistrering','kariesriskbedömning','egenvårdsplan'],varning:null,
 mallar:[
  {id:'m1',label:'Kariesstatus + ICDAS-registrering',behandlingTag:'kariesstatus',followup:'Förnyad bedömning enligt riskprofil — 6–24 mån.',
   text:`Diagnos: Kariesstatus och riskbedömning.

Anamnes:
- Kostvanor: Sockerexponeringar/dag [antal], surt mellan måltider [Ja/Nej], frekvens av kolhydratrika snacks.
- Vätskeintag: [vatten / läsk / sportdryck — frekvens].
- Munhygien: Borstning [1×/2×/3× per dag], el-/manuell borste, fluortandkräm 1450 ppm [Ja/Nej], mellanrumsrengöring [tandtråd/mellanrumsborste].
- Munorrhet: Subjektiv [Ja/Nej]. Läkemedel som kan ge muntorrhet [...].
- Tidigare kariesfynd: [...].
- Allmäntillstånd: Reflux, ätstörning, kronisk sjukdom: [...].

Status:
- Plackindex (PI): [%].
- Stimulerad salivproduktion: [ml/min — om mätt].
- Buffrings­kapacitet: [adekvat / nedsatt — om mätt].
- Karieslesioner registrerade per tand och yta enligt ICDAS:
  - 0 = u.a.
  - 1 = första synliga ändring (vit lesion efter torrläggning).
  - 2 = tydlig vit/brun lesion utan torrläggning.
  - 3 = lokaliserad emaljmineralskada utan synligt dentin.
  - 4 = mörk skugga från dentinet utan kavitation.
  - 5 = synlig dentinkavitet < halva ytan.
  - 6 = omfattande dentinkavitet > halva ytan.
- Approximalkaries enligt bitewing: E1/E2/D1/D2/D3 per yta.
- Rotkaries: [Nej / specificera tand och omfattning].
- Sekundärkaries vid restauration: [Nej / specificera].

Riskbedömning (modifierad Cariogram eller motsv.):
- Antal aktiva lesioner: [...].
- Kostfaktor: [Låg / Hög].
- Munhygien: [God / Måttlig / Dålig].
- Fluorexponering: [Tillräcklig / Otillräcklig].
- Salivfaktor: [u.a. / nedsatt].
- Slutbedömning: Kariesrisk [Låg / Måttlig / Hög].

Bedömning: [Få aktiva lesioner — fokus förebyggande / multipla lesioner — operativt + förebyggande / muntorrhet med rotkaries — fluorintensivering].

Samtycke: Pat. informerad om fynd, riskprofil, alternativa behandlingar (förebyggande, infiltrationsbehandling, fyllning) samt kostnad. Samtycker.

Material använt vid undersökning: Spegel, sond (försiktig — ej sticka i emalj), bitewing, intraoralkamera, kariesdetekteringspenna vid behov.

Anestesi: Ej aktuellt vid statusregistrering — vid efterföljande operativ behandling se respektive mall.

Information om egenvård och eventuella efterbesvär: Pat. instruerad i fluortandkräm 1450 ppm × 2/dag (5000 ppm vid hög risk eller rotkaries), Bass-teknik, mellanrumsrengöring och kostbalansering. Vid muntorrhet rekommenderas saliversättning, sockerfria pastiller, fluorsköljning eller tuggummi. Inga efterbesvär från statusregistrering.

Planering: [Förebyggande program (fluorlackning 2–4 ggr/år, klorhexidinsköljning vid hög risk) / operativ behandling i prioriteringsordning / återkontroll om 3–12 mån].`},
  {id:'remiss',label:'Remiss — Sjukvård vid grundsjukdom som ger muntorrhet',behandlingTag:'remiss läkare',followup:'Återkoppling kring läkemedelsjustering.',
   text:`REMISS / KONTAKT — Husläkare

Remittent: Tandläkare [namn], klinik [namn].
Patient: [Initialer + födelseår].

Frågeställning: Patient med uttalad muntorrhet (xerostomi) och stigande kariesutveckling. Möjlig läkemedelsbiverkan eller systemsjukdom (Sjögren, strålbehandling, diabetes).

Aktuell läkemedelslista: [bifogad eller specificerad — antikolinerga, antidepressiva, antihistaminer m.fl.].

Önskemål: Bedömning av möjlighet att justera/byta läkemedel, eller utredning av bakomliggande orsak.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'salivmatning',label:'Stimulerad salivproduktion',text:'Stimulerad salivsekretion uppmätt under 5 min — [ml/min]. Buffringskapacitet: [...].'},
  {id:'fluorintensiv',label:'Fluorintensifiering',text:'Pat. ordinerad tandkräm 5000 ppm + fluorsköljning 0,2% NaF dagligen + lackning 4 ggr/år.'},
  {id:'kostfri',label:'Kostsamtal',text:'Kostfrekvensregistrering 4 dagar — diskussion om sockerexponeringar och syraattacker.'}
 ],
 lakemedel:'Tandkräm 5000 ppm vid hög risk. Fluorlack Duraphat 22 600 ppm. Vid muntorrhet — saliversättning (Xerostom, Bioxtra) eller pilokarpin via läkare.',remissSpec:'Husläkare vid xerostomi eller misstänkt systemsjukdom'},

{id:'vardag10',icd:'Z01.20 extra-/intraoralt',name:'Extra- och intraoralt status',cat:'Vardag — Status',scId:'VARDAG-10-EIO',
 symptom:['slemhinneförändring','lymfkörtelförstoring','spottkörtelproblem','muskel- eller käkledssymtom'],
 behandling:['extraoral inspektion','intraoral inspektion','palpation','dokumentation'],varning:'Misstänkt malignitet — se Oralmedicin-mall och remittera akut till käkkirurg.',
 mallar:[
  {id:'m1',label:'Komplett extra-/intraoralt status',behandlingTag:'extra/intraoralt status',followup:'Förändringar dokumenteras med foto och kontrolleras enligt riktlinje (2 v vid sår, 6 mån vid stabil förändring).',
   text:`Diagnos: Extra- och intraoralt status med screening för slemhinne- och spottkörtelpatologi.

Anamnes:
- Tobak: [Aldrig / fd / nuvarande, mängd och duration].
- Alkohol: [...].
- HPV-vaccin: [Ja/Nej, år].
- Tidigare slemhinneförändringar eller orala tumörer: [Nej / Ja].
- Aktuella besvär: Sår, blödning, klump, sveda, smakförändring, gomfaltsförändring, sväljnings­svårigheter: [...].
- Hudförändringar i ansikte/hals: [Nej / Ja].

Status — extraoralt:
- Hud (ansikte, hals, läppar): [u.a. / specificera fläck, sår, ärr, asymmetri].
- Läppar: rödfärg, vermilion border, mungipor: [u.a. / cheilit / anguläris cheilit].
- Lymfkörtlar: submentala, submandibulära, jugulodigastriska, cervikala, supraklavikulära: [u.a. / förstorade — storlek mm, konsistens, ömhet, fixering].
- Spottkörtlar: parotis, submandibularis: [u.a. / förstorad, öm, fluktuation].
- Käkleder: [u.a. / klick / krepitation / ömhet].
- Tuggmuskulatur (m. masseter, m. temporalis): [u.a. / ömhet grad 0–3].

Status — intraoralt:
- Vestibulum, bukkalt slemhinna: [u.a. / specificera].
- Tunga (dorsalt, ventralt, lateralt — vik upp och inspektera i sin helhet): [u.a. / vit/röd förändring, sår, asymmetri].
- Munbotten (palperat bimanuellt): [u.a. / klump, asymmetri].
- Mjuk och hård gom: [u.a. / specificera].
- Tonsillregion och bakre svalgvägg: [u.a. / asymmetri, beläggning].
- Gingiva: [se separat parodontalt status].
- Tänder: [se separat tandstatus].
- Spottkörtelutförsel — submandibulariskörtelns mynningar och parotis-mynningar: [klart sekret / minskat / pus].

Bedömning: [u.a. / Förändring tand X — specificera lokalisation, storlek (mm), färg, kontur, induration, ömhet, tid].

Samtycke: Pat. informerad om fynd och eventuell behov av uppföljning, biopsi eller remiss. Samtycker.

Material använt: Spegel, gasväv för tungmanipulation, ficklampa, palpationsfinger, intraoralkamera, blodtrycks-/temperatur-mätare vid behov.

Anestesi: Ej aktuellt vid statusregistrering. Vid biopsi eller incision — se respektive mall.

Information om eventuella efterbesvär: Inga från själva undersökningen. Vid identifierad förändring som följs upp — pat. informerad om att kontroll inom 2 veckor är standard vid kvarstående sår och att förändringar som kvarstår > 2 veckor MÅSTE remitteras för biopsi.

Planering: [u.a. — ny revision enligt plan / Klinisk kontroll om 2 veckor / Remiss käkkirurg eller oralmedicinsk specialist / Biopsi indicerat].`},
  {id:'remiss',label:'Remiss — Käkkirurg vid malignitetsmisstanke (akut)',behandlingTag:'remiss käkkirurg malignitet',followup:'AKUT — säkerställ kontakt och tid.',
   text:`AKUT REMISS — Käkkirurgisk klinik (malignitetsmisstanke)

Remittent: Tandläkare [namn], klinik [namn], tel [...].
Patient: [Initialer + födelseår].

Frågeställning: Misstänkt oral malignitet — begäran om akut bedömning och eventuell biopsi.

Status: Lokalisation [...], storlek [mm], duration [veckor], symptom (smärta, blödning, induration, fixerad, ulcererad), regionala lymfkörtlar [...].

Riskfaktorer: Tobak [...], alkohol [...], HPV-status [...], tidigare malignitet [...].

Bifogat: Klinisk fotodokumentation, eventuell OPG, anamnesblankett.

Pat. informerad om akut karaktär och behov av snabb bedömning. Tid bokad direkt med mottagande enhet [tid].

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'fotodok',label:'Klinisk fotodokumentation',text:'Foto av aktuell förändring tagen för uppföljning. Mätsticka inkluderad i bild.'},
  {id:'tva-veckor',label:'2-veckorskontroll',text:'Återbesök inom 2 v för bedömning av eventuell läkning. Vid kvarstående förändring — direkt remiss.'},
  {id:'biopsi',label:'Incisionsbiopsi (vid indikation)',text:'Biopsi planerad vid kvarstående förändring — se separat mall.'}
 ],
 lakemedel:null,remissSpec:'Käkkirurg eller oralmedicinsk specialist vid misstänkt malignitet eller långdragen slemhinneförändring'},

{id:'vardag11',icd:'K07.6 + Z46.4 bettskena',name:'Bettskena — avtryck och ordination',cat:'Vardag — Bettskena',scId:'VARDAG-11-BSAVT',
 symptom:['bruxism','myalgi','attritionsslitage','TMD','bettstörning'],
 behandling:['avtryck','bettregistrering','beställning skena'],varning:null,
 mallar:[
  {id:'m1',label:'Bettskena — avtryck + skicka order',behandlingTag:'bettskena avtryck',followup:'Utlämning bokad 1–2 v senare.',
   text:`Diagnos: Indikation för stabiliseringsskena (bettskena) — myalgi / bruxism / attritionsskydd / TMD.

Anamnes:
- Symtom: [pressning nattetid, morgonstelhet, slipningsvärk, tinninghuvudvärk vid uppvaknande].
- DC/TMD-diagnos: [se separat mall].
- Tidigare bettskena: [Nej / Ja, typ och utfall].
- Allergier mot akryl/akrylater: [Nej / Ja].
- Cardiovasculär hjärnstamspåverkan/sömnapné: [Nej / Ja — påverkar val av skena].

Status: [Slitsfasetter, linea alba, tunginpressningar, hypertrofi m. masseter, palpationsömhet — sammanfattning från DC/TMD-mall].

Bedömning: Indikation för [hård akrylatskena ÖK / mjuk skena ÖK / NTI / Michigan-skena] enligt klinisk bedömning.

Samtycke: Pat. informerad om syfte, förväntad effekt, kostnad, livslängd (3–5 år vid normal användning) och vikten av att bära skenan varje natt. Informerad om att bettskenan inte botar bruxism utan skyddar tänder och leder. Samtycker.

Material använt:
- Avtryck: Alginat (kromatfärgskift Kromopan / Algitec) i avtrycksskedar storlek [S/M/L]. Alternativt digital scan med iTero / Trios.
- Bettregistrering: Vax (Beauty Pink) eller bettsilikon i centrisk relation eller maximal interkuspitation enligt protokoll.
- Skedfixering: Adhesiv vid behov.

Anestesi: Ej aktuellt.

Utförande:
- Hygienkontroll och torrläggning.
- Avtryck ÖK och UK (eller digital scan).
- Bettregistrering med vax i lätt öppet läge för stabilisering enligt indikation.
- Beställningsblankett ifylld: Skenans typ [hård/mjuk], material, ÖK/UK, eventuell färgning, tjocklek, deadline.

Information om efterbesvär: Pat. informerad om att avtrycksmaterial kan ge kortvarig kväljningskänsla men inga efterbesvär förväntas. Vid utlämning kan tillvänjning ta 1–2 veckor med initial ömhet i muskulatur eller tänder. Vid kraftig smärta eller felpassning — återbesök.

Planering: Beställning till laboratorium [namn] — leveranstid [1–2 veckor]. Tid för utlämning bokad [datum/tid].`},
  {id:'remiss',label:'Remiss — Bettfysiolog vid komplex bettskenefråga',behandlingTag:'remiss bettfysiolog',followup:'Specialistsvar i fortsatt plan.',
   text:`REMISS — Specialisttandläkare i bettfysiologi

Frågeställning: Bedömning av bettskenedesign och behandlingsupplägg vid [komplex TMD / kombinationsproblem / återkommande misslyckande med tidigare skenor].

Sammanfattning: [...].

Bifogat: DC/TMD-mall, foton, ev. OPG.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'digitalscan',label:'Digital scan',text:'iTero/Trios-scan av ÖK och UK + bettregistrering — fil exporterad till lab.'},
  {id:'bettreg',label:'Bettregistrering centrisk relation',text:'Bett registrerat i centrisk relation enligt bimanuell teknik.'}
 ],
 lakemedel:null,remissSpec:'Bettfysiolog vid komplex behandling'},

{id:'vardag12',icd:'K07.6 + Z46.4 bettskena utlämning',name:'Bettskena — utlämning + instruktion',cat:'Vardag — Bettskena',scId:'VARDAG-12-BSUT',
 symptom:['utlämning skena','passning','justering'],
 behandling:['inprovning','ocklusionsjustering','instruktion'],varning:null,
 mallar:[
  {id:'m1',label:'Utlämning + inprovning + ocklusionsjustering',behandlingTag:'bettskena utlämning',followup:'Återbesök 2–4 v för justering och utvärdering.',
   text:`Diagnos: Utlämning av bettskena enligt tidigare ordination.

Anamnes:
- Symtomstatus sedan avtryckstillfället: [förbättring / oförändrat / försämring].
- Pat. förståelse av användning: [Adekvat / behöver uppfräschning].

Status:
- Skenans estetik och utformning: [godkänd / specificera].
- Passning på modell innan inprovning: [u.a. / behov av justering].

Bedömning: Skenan färdig för inprovning.

Samtycke: Pat. informerad om användning, skötsel, livslängd och kostnader vid ny skena vid förlust eller brott. Samtycker.

Material använt:
- Bettskena enligt beställning (hård akrylat ÖK / mjuk skena / NTI).
- Justeringsverktyg: Trippel-/dubbelvägs handinstrument, akrylatfräs, polerinstrument, ocklusionspapper 40 µm + 8 µm.
- Skenans skötselbox + instruktionsblad.

Anestesi: Ej aktuellt.

Utförande:
- Inprovning: Skenan placerad på avsedd käke, kontroll av passform — friktion lagom, ingen vipprörelse, ingen vävnadstryck.
- Ocklusionskontroll: Jämna kontaktpunkter i interkuspidation, fri lateroprotrusion på framtänder/hörntänder, ingen interferens i lateral och protrusiv rörelse.
- Justering med akrylatfräs och polering till blank yta.
- Pat. provar att tala, svälja och bita — komfortkontroll.

Instruktioner till patient:
- Bär skenan varje natt — börja med 1–2 nätter och utöka gradvis vid tillvänjning.
- Skölj med kallt vatten efter användning, borsta lätt med mjuk borste utan tandkräm (slipande effekt).
- Förvara torrt i sin box när den inte används.
- Rengör 1 gång/vecka i ljummen tvållösning eller speciell rengöringstablett.
- Vid sprickor, missfärgning eller felpassning — kontakta kliniken.

Information om efterbesvär: Pat. informerad om att tillvänjningstid är 1–2 veckor med eventuell muskelömhet eller tandkänslighet. Vid kvarstående smärta efter 2 v — återbesök. Salivproduktion kan öka under tillvänjning.

Planering: Återbesök för utvärdering och eventuell ny ocklusionsjustering om 2–4 v. Långsiktig uppföljning årligen.`},
  {id:'remiss',label:'Remiss — Bettfysiolog vid bristande resultat',behandlingTag:'remiss bettfysiolog',followup:'Specialistsvar.',
   text:`REMISS — Bettfysiolog

Frågeställning: Pat. med [diagnos] som ej svarat på initial stabiliseringsskena — begäran om bedömning.

Sammanfattning: [...].

Bifogat: DC/TMD-mall, foton av skena, behandlingsförlopp.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'ockpapp',label:'Ocklusionsjustering',text:'Ocklusion justerad med 40 µm-papper i max interkusp. och 8 µm-papper i lateroprotrusion.'},
  {id:'rengoring',label:'Rengöringsinstruktion',text:'Pat. visad rengöring med mjuk borste + ljummen tvållösning + veckovis rengöringstablett.'}
 ],
 lakemedel:null,remissSpec:'Bettfysiolog vid kvarstående symtom'},

{id:'vardag13',icd:'Z29.8 fluorbehandling',name:'Profylax / Fluorbehandling',cat:'Vardag — Profylax',scId:'VARDAG-13-PROF',
 symptom:['hög kariesrisk','initialkaries','rotkaries','ortodontisk apparatur','strålbehandling','muntorrhet'],
 behandling:['professionell rengöring','fluorlackning','klorhexidin','egenvårdsinstruktion'],varning:null,
 mallar:[
  {id:'m1',label:'Professionell rengöring + fluorlackning',behandlingTag:'profylax fluor',followup:'Förnyad fluorbehandling enligt riskprofil — 2–4 ggr/år vid hög risk.',
   text:`Diagnos: Förebyggande tandvård med professionell rengöring och fluorapplikation.

Anamnes:
- Indikation: [Hög kariesrisk / initial karies / rotkaries / fast ortodontisk apparatur / strålbehandling i huvud-/halsregion / muntorrhet / aktiv egenvårdsfas / generell prevention].
- Allergi mot kolofonium eller harts (Duraphat innehåller kolofonium): [Nej / Ja].
- Graviditet/amning: [Nej / Ja — Duraphat kan användas].

Status:
- Plackindex (PI): [%] före behandling.
- Aktiva lesioner: [...].
- Riskprofil: [...].

Samtycke: Pat. informerad om syfte, förväntad effekt och kostnad. Samtycker.

Material använt:
- Professionell rengöring: Polerpasta (Cleanic, Detartrine), polerkopp, profylaxborste, mellanrumsband.
- Fluorlack: Duraphat 22 600 ppm NaF (5%) eller motsv. Profluorid.
- Tandtråd, mellanrumsborstar för demonstration.
- Klorhexidingel 1% Corsodyl eller motsvarande vid behov.

Anestesi: Ej aktuellt.

Utförande:
- Inspektion och identifiering av plackzoner med disclosing-tablett vid behov.
- Munhygieninstruktion — Bass-teknik demonstrerad. Mellanrumsrengöring demonstrerad.
- Subgingival och supragingival depuration vid behov (ultraljud eller handinstrument) — se separat mall.
- Polering med polerpasta i polerkopp och profylaxborste på alla ytor.
- Torrläggning med bomullsrullar och luft.
- Fluorlack applicerat på riskytor (approximalt, gingivalt, fissurer) med pensel.
- Pat. instruerad att inte äta eller dricka i minst 30 min, inte borsta på 12 timmar.

Information om efterbesvär: Lätt missfärgning av tänder från fluorlack i 12–24 h är normalt. Vid hög kariesrisk rekommenderas hemmaprogram med tandkräm 5000 ppm + fluorsköljning 0,2% NaF dagligen. Inga efterbesvär förväntas. Vid allergiska reaktioner (mycket sällsynt) — direkt kontakt.

Planering: Förnyad fluorlackning om [3 / 4 / 6] mån. Egenvårdskontroll vid revision.`},
  {id:'m2',label:'Klorhexidin-intensifiering vid mycket hög risk',behandlingTag:'klorhexidin',followup:'Kortvarig behandling 1–2 v, ej kronisk.',
   text:`Diagnos: Mikrobiell kontroll med klorhexidin vid mycket hög kariesrisk eller postoperativt.

Indikation: [Strålbehandling pågående / postkirurgi / massiv plackbörda / akut ANUG / pat. som ej kan upprätthålla mekanisk hygien].

Material: Klorhexidin 0,12% eller 0,2% munsköljning (Corsodyl, Dentohexin). Alternativt klorhexidingel 1%.

Samtycke: Pat. informerad om effekten på plack, smakförändring (reversibel) och risk för missfärgning av tänder och tunga vid längre användning. Samtycker.

Utförande:
- Klorhexidinsköljning 10 ml × 1 min, 2 ggr/dag i 1–2 veckor.
- Alternativt klorhexidingel 1% applicerat med pensel eller mellanrumsborste i munhåla.

Information om efterbesvär: Reversibel smakförändring, missfärgning av tänder/tunga, ökad tandstensbildning vid längre användning. Använd inte i kombination med tandkräm samtidigt — vänta minst 30 min. Vid huvudbehov av annan medicinsk profylax (t.ex. orala dyssimorfiska reaktioner) — avbryt och kontakta kliniken.

Planering: Utvärdering efter 1–2 v. Övergång till saliversättning eller fortsatt fluorprogram vid behov.`},
  {id:'remiss',label:'Remiss — Profylaxtandhygienist (avancerade fall)',behandlingTag:'remiss tandhygienist',followup:'Profylaxprogram följs upp.',
   text:`KONSULTATION / HÄNVISNING — Tandhygienist

Frågeställning: Pat. med hög kariesrisk eller komplex parodontal hygien — begäran om strukturerat profylaxprogram med kontroller [var 3:e mån i 12 mån].

Sammanfattning: [...].

Bifogat: Status och riskbedömning.`}
 ],
 extraAtgard:[
  {id:'disclosing',label:'Plackfärgning',text:'Disclosing-tablett använd för demonstration av plackzoner.'},
  {id:'mellanrumsbiorste',label:'Mellanrumsborste-anpassning',text:'Storlek [0,4 / 0,5 / 0,6 mm] av mellanrumsborste vald för respektive interdental zon.'},
  {id:'pamflett',label:'Skriftlig egenvårdsinstruktion',text:'Pat. fått skriftlig instruktion och visuell guide.'}
 ],
 lakemedel:'Vid hög risk: tandkräm 5000 ppm fluor + fluorsköljning 0,2% NaF dagligen. Vid mycket hög risk: klorhexidin 0,12–0,2% i kortvarig kur 1–2 v.',remissSpec:'Tandhygienist för strukturerat profylaxprogram'},

{id:'vardag14',icd:'K05.30 depuration',name:'Depuration (supra- och subgingival)',cat:'Vardag — Parodontologi',scId:'VARDAG-14-DEPUR',
 symptom:['tandsten','plack','BoP','fickdjup ≥4 mm','marginal inflammation'],
 behandling:['supragingival rengöring','subgingival depuration','rotplaning'],varning:'Pat. med endokarditrisk — överväg antibiotikaprofylax enligt ESC 2023.',
 mallar:[
  {id:'m1',label:'Initialbehandling — kvadrant för kvadrant',behandlingTag:'depuration scaling',followup:'Omvärdering 6–8 v efter avslutad initialbehandling.',
   text:`Diagnos: Initialbehandling av parodontit / gingivit — mekanisk rengöring och rotplaning.

Anamnes:
- Parodontal diagnos: [se vardag08].
- Allmänsjukdomar: [diabetes / hjärt-kärl / blodförtunnande / endokarditrisk / immunosuppression].
- Tobak: [...]. Stress: [...]. Motivation: [...].

Status: Förbehandlingsstatus från vardag08 — PPD, BoP, PI, recessioner.

Bedömning: Behov av initialbehandling 1–4 kvadranter.

Samtycke: Pat. informerad om diagnos, behandlingsplan, förväntad gingival regression efter inflammationsläkning, kostnad och behov av god hemmavård. Samtycker.

Material använt:
- Ultraljudsspets (EMS, Cavitron) med jämn vattenkylning.
- Handinstrument: Universalkürettor (Columbia), Gracey-kürettor (1/2, 7/8, 11/12, 13/14) för subgingivalt arbete.
- Polerpasta (Cleanic) + polerkopp efter mekanisk rengöring.
- Ev. lokalanestesi vid känslighet eller djupa fickor.

Anestesi (vid behov — välj alternativ):
[ ] Ytanestesi Xylocain salva 5% / Oraqix för ytlig deparation
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltrationsanestesi per kvadrant, [antal] ml
[ ] Xylocain Dental adrenalin 2% — infiltration/ledning, [antal] ml
[ ] Mepivakain 3% utan adrenalin vid blödningsrisk
[ ] Ingen anestesi behövs

Utförande:
- Supragingival depuration av all tandsten med ultraljud.
- Subgingival rensning med Gracey-kürettor i systematiska överlappande drag tills rotytan är glatt och hård.
- Endpoint: Pat. komfortabel, blank rotyta vid prob, ingen tandsten kvar.
- Spolning med koksalt eller klorhexidin 0,2%.
- Slutpolering med polerkopp och pasta.

Information om eventuella efterbesvär: Pat. informerad om:
- Ilning vid kallt/varmt i 1–3 v är vanligt och avtar med tiden.
- Gingivan kan dra sig tillbaka 1–2 mm efter inflammationsläkning — "långa tänder".
- Lätt blödning vid borstning första dygnen är normalt.
- Möjlig ömhet 24–48 h — Paracetamol 1 g × 3 vid behov.
- Vid kvarstående smärta, svullnad eller pus — återbesök.
- Klorhexidinsköljning 0,12–0,2% kan användas 1–2 v vid hög plackbörda.

Planering: Nästa kvadrant om [1–2 veckor]. Total initialbehandling klar om [4–8 veckor]. Omvärdering 6–8 v efter sista kvadrant.`},
  {id:'remiss',label:'Remiss — Parodontolog (grad C, refraktär)',behandlingTag:'remiss parodontolog',followup:'Specialistsvar.',
   text:`REMISS — Specialisttandläkare i parodontologi

Frågeställning: Pat. med [grad C parodontit / refraktär respons / behov av kirurgisk korrigering / kombinationsproblem perio-endo].

Sammanfattning: Stadium/Grad, BoP, PI, antal djupa fickor, tidigare behandling och utfall.

Bifogat: Helstatus, bitewing + apikalbilder, OPG.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'ablprofy',label:'Endokarditprofylax',text:'Vid hjärtklaffprotes eller tidigare endokardit: Amoxicillin 2 g (barn 50 mg/kg) PO 30–60 min före. Vid PcV-allergi: Klindamycin 600 mg PO.'},
  {id:'klorh',label:'Klorhexidin-sköljning postoperativt',text:'Klorhexidin 0,12% × 2/dag i 1–2 v efter sista kvadrant.'},
  {id:'hba1c',label:'HbA1c-koppling',text:'Vid diabetes — HbA1c efterfrågat från husläkare för bedömning av riskprofil.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3. Klorhexidin 0,12% kortvarigt. Antibiotika endast vid spridd infektion eller agressiv parodontit enligt parodontologisk indikation.',remissSpec:'Parodontolog vid grad C, refraktär eller kirurgisk indikation'},

{id:'vardag15',icd:'Z48.0 suturborttagning',name:'Suturborttagning + sårkontroll',cat:'Vardag — Kirurgi',scId:'VARDAG-15-SUT',
 symptom:['postoperativ kontroll','sårläkning','suturborttagning'],
 behandling:['suturborttagning','sårinspektion','rengöring'],varning:'Vid tecken på infektion (rodnad, värme, pus, feber) — utvärdera enligt postop-infektionsprotokoll.',
 mallar:[
  {id:'m1',label:'Suturborttagning + sårinspektion',behandlingTag:'suturborttagning',followup:'Vid normal läkning — ingen ytterligare uppföljning. Vid kvarstående besvär — återbesök.',
   text:`Diagnos: Postoperativ kontroll och suturborttagning efter [extraktion / kirurgisk extraktion / lambåoperation / biopsi / implantatkirurgi tand/region X], utförd [datum].

Anamnes:
- Postoperativt förlopp: [u.a. / kortvarig svullnad och ömhet som avtagit / förvärrad smärta / blödning].
- Smärtlindring använd: [Paracetamol / Ibuprofen — dos och frekvens].
- Antibiotika tagit (vid förskrivning): [Ja / Nej / pågående].
- Feber, sjukdomskänsla: [Nej / Ja].
- Andra besvär: [...].

Status — extraoralt:
- Svullnad, rodnad: [u.a. / kvarstående].
- Hematom: [u.a. / regredierande].
- Lymfkörtlar: u.a.

Status — intraoralt:
- Slemhinna kring operationsområde: [u.a. / rodnad / pus / dehiscens].
- Suturer: [intakta antal X / luckra / saknas].
- Koagel/läkning: [normal granulationsvävnad / fibrinbelagt / pus].
- Eventuell exponering av ben: [Nej / Ja].
- Närliggande tänder: [u.a. / ömhet / mobilitet].

Bedömning: [Normal läkning / Lätt fördröjd läkning / Infektionstecken — se postop-infektionsmall].

Samtycke: Pat. informerad om procedur och inga ytterligare ingrepp planerade. Samtycker.

Material använt: Pincett (kirurgisk), sax (sutursax), spegel, koksaltspolning, klorhexidin 0,12% för slutspolning.

Anestesi: Ej aktuellt vid normal suturborttagning. Vid känslighet eller fast inväxt sutur — Xylocain salva 5% lokalt på området.

Utförande:
- Inspektion av operationsområdet under god belysning.
- Suturen lyfts med pincett, klipps under knuten nära slemhinnan, dras ut åt sidan av knutpunkten för att undvika kontamination.
- Antal borttagna suturer: [X].
- Sårkontroll och spolning med koksalt / klorhexidin.
- Vid dehiscens eller infektion — se separat åtgärdsmall.

Information om eventuella efterbesvär: Pat. informerad om att lätt ömhet kan kvarstå några dagar och att normal munhygien kan återupptas på operationsområdet. Vid plötslig blödning, värk, svullnad eller feber — kontakt. Skonkost ytterligare några dagar vid djup operation.

Planering: [Ingen ytterligare uppföljning / Återbesök vid kvarstående besvär / Protetisk uppföljning vid implantat].`},
  {id:'remiss',label:'Remiss — Käkkirurg vid postoperativ komplikation',behandlingTag:'remiss käkkirurg',followup:'Specialistsvar i fortsatt plan.',
   text:`REMISS — Käkkirurgisk klinik

Frågeställning: Pat. som [genomgått ingrepp datum X med Y diagnos] uppvisar [postoperativ komplikation — specificera infektion / parestesi / sinuskommunikation / kvarstående smärta] — begäran om bedömning.

Sammanfattning: [...].

Bifogat: Klinisk fotodokumentation, OPG om aktuellt, läkemedelsförteckning.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'rengoring',label:'Klorhexidinrengöring',text:'Klorhexidin 0,12% applicerat lokalt vid lätt belastad slemhinna.'},
  {id:'foto',label:'Postoperativ fotodokumentation',text:'Foto taget för uppföljning och journalering.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3.',remissSpec:'Käkkirurg vid komplikation'},

{id:'vardag16',icd:'Z51.4 / N05CD08 midazolam',name:'Sederingsanteckning — Midazolam oralt',cat:'Vardag — Sedering',scId:'VARDAG-16-SED',
 symptom:['tandvårdsrädsla','behandlingsmotstånd','kort komplex åtgärd'],
 behandling:['oral sedering','vitalparametermätning','övervakning'],varning:'KONTRAINDIKATIONER: Myastenia gravis, akut narkotikamissbruk, gravt nedsatt lever-/njurfunktion, sömnapné utan CPAP. Försiktighet vid ASA III–IV.',
 mallar:[
  {id:'m1',label:'Midazolam oralt — vuxen, lågdosprotokoll',behandlingTag:'sedering midazolam',followup:'Pat. övervakas tills helt vaken och åtföljs av vuxen hem. Bilkörning förbjuden 24 h.',
   text:`Diagnos: Oral sedering med Midazolam som tillägg till lokalanestesi vid tandbehandling.

Anamnes:
- Indikation: [Uttalad tandvårdsrädsla / behandlingsmotstånd / kort komplex åtgärd / kombinationsbehandling].
- Allmäntillstånd: [Friskanamnes u.a. / specificera].
- ASA-klassifikation: [I / II / III — sedering endast vid I–II utan specialistkonsult].
- Läkemedel: [Inga / specificera, särskilt CNS-dämpande, opioider, SSRI, antiepileptika, antihistaminer].
- Allergier: [Inga / specificera, särskilt bensodiazepiner].
- Alkohol/droger: [Aldrig / fd / nuvarande].
- Tidigare sedering: [Nej / Ja, utfall].
- Pat. har fastat 4 h (vätska 2 h): [Ja / Nej].
- Pat. åtföljd av vuxen som kör hem: [Ja / Nej — sedering avbryts om Nej].

Status — utförd före sedering:
- Vitala parametrar: BT [...], puls [...], saturation [...], temp [...].
- Munstatus: [...].
- Mentalt status: [Orienterad x3 / lätt orolig / mycket orolig].

Bedömning: Pat. lämplig för oral sedering enligt protokoll.

Samtycke: Pat. (och eventuell vårdnadshavare) informerad skriftligt och muntligt om: syfte, förväntad effekt, biverkningar (dåsighet, lätt minnesförlust, illamående), risker (paradoxal reaktion, andningsdepression mycket sällsynt), kontraindikationer mot bilkörning och beslutsfattande 24 h efter sedering. Samtycker.

Material använt:
- Midazolam oral lösning 2 mg/ml (Buccolam, Dormicum) eller tablett 7,5 mg.
- Saturationsmätare (SpO₂) påsatt — kontinuerlig övervakning.
- Pulsoximeter, blodtrycksmätare.
- Akutset: Flumazenil (Anexate) 0,5 mg/5 ml (antidot), syrgas, ambubag, larmnummer.

Dosering — Midazolam oralt:
- Vuxen frisk ASA I–II, <65 år: 7,5–15 mg PO 30–45 min före behandling.
- Vuxen >65 år eller känslig: 3,75–7,5 mg PO.
- Barn (om aktuellt — annars pedodontiskt specialprotokoll): 0,3–0,5 mg/kg PO, max 10 mg.
- Notera: Dos justerad efter vikt, ålder och annan medicinering.

Anestesi (lokal, utöver sedering — välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml

Utförande och övervakning:
- Midazolam givet kl. [tid], dos [mg].
- Behandling påbörjad kl. [tid] när sederingseffekt uppnådd (lätt dåsighet, samarbetsvillig).
- Vitalparametrar registrerade var 5:e minut: SpO₂ [%], puls [/min], BT [mmHg].
- Lokalanestesi enligt val ovan administrerad.
- Behandling utförd: [specificera åtgärd].
- Behandling avslutad kl. [tid].

Postoperativ övervakning:
- Pat. övervakad tills helt vaken, kan stå upp utan vinglighet och har stabila vitalparametrar — minst 1 h.
- Pat. åtföljd av vuxen [namn, relation].

Information om eventuella efterbesvär: Pat. informerad om att dåsighet kan kvarstå 4–6 h. Förbud mot bilkörning, alkohol, kraftiga maskiner och viktiga beslut i 24 h. Lätt minnesförlust från behandlingen är vanlig (amnesi). Illamående kan förekomma — ät lätt mat. Vid kvarstående yrsel, andningsbesvär eller annan ovanlig reaktion — direkt akut kontakt.

Planering: Återbesök för fortsatt behandling enligt plan. Eventuell ny sedering bedöms från fall till fall.`},
  {id:'remiss',label:'Remiss — Specialistsedering eller narkos',behandlingTag:'remiss narkos',followup:'Vid omfattande behandlingar eller ASA III–IV.',
   text:`REMISS — Tandvård i narkos / specialistsedering

Frågeställning: Pat. med [uttalad tandvårdsrädsla / utvecklingsstörning / komplexa medicinska tillstånd / barn med omfattande behandlingsbehov / ASA III–IV] — begäran om bedömning för tandvård i narkos eller djup sedering.

Sammanfattning anamnes och status: [...].

Tidigare sederingsförsök och utfall: [...].

Allmänmedicinsk bedömning: ASA-klass [...], relevant medicinering [...], specialistutlåtanden [...].

Behandlingsbehov: [...].

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'antidot',label:'Antidot tillgänglig',text:'Flumazenil (Anexate) 0,5 mg/5 ml finns omedelbart tillgänglig. Larmnummer noterat och team briefat.'},
  {id:'spo2',label:'Kontinuerlig SpO₂',text:'Saturation kontinuerligt övervakad under hela behandlingen — minimivärde [%].'},
  {id:'foljare',label:'Vuxen ledsagare',text:'Pat. åtföljd av [namn, relation] som ansvarar för hemresa och tillsyn 24 h.'},
  {id:'fastecheck',label:'Fastekontroll',text:'Pat. fastat 4 h från fast föda, 2 h från klar vätska — verifierat innan administration.'}
 ],
 lakemedel:'Midazolam oralt 7,5–15 mg vuxen / 0,3–0,5 mg/kg barn. Antidot: Flumazenil 0,2 mg iv vid behov, kan upprepas. Postop. Paracetamol enligt smärtbehov.',remissSpec:'Specialistsedering eller tandvård i narkos vid omfattande indikation'},

// ══════════════════════════════════════════════════════════════════
// ── FAS 2 — KONSERVERING + EXTRAKTION (#17–26) ──
// Standardiserade mallar för fyllningar (komposit + glasjonomer),
// selektiv exkavering, fraktur-lagning samt extraktioner (sedvanlig,
// komplicerad, operativ, blödningsrisk). Stegvis exkavering hanteras
// via befintlig scenario stegvisex01 (konsolideras i Fas 3).
// ══════════════════════════════════════════════════════════════════

{id:'vardag17',icd:'K02.1 / K02.2 / K02.3',name:'Fyllning komposit (Klass I–V)',cat:'Vardag — Konservering',scId:'VARDAG-17-FYLL',
 symptom:['karies','approximalkaries','rotkaries','estetisk defekt','sekundärkaries'],
 behandling:['kariesexkavering','adhesiv','komposit','polering','ocklusionsjustering'],varning:null,
 mallar:[
  {id:'m1',label:'Standardmall — kompositfyllning Klass I–V',behandlingTag:'fyllning komposit',followup:'Kontroll vid revision (bitewing) eller vid symtom.',
   text:`Diagnos: Karies tand [nr] yta [O/M/D/B/L/V — Klass I/II/III/IV/V].

Anamnes:
- Symtom: [Ilning vid kallt/sött / asymtomatisk / kosmetiskt önskemål].
- Senaste analgetika eller behandling tand [nr]: [...].
- Allmäntillstånd: [u.a. / specificera].
- Allergier mot bonding eller kompositmaterial: [Inga / specificera].

Status:
- Tand [nr]: Vital, [karies synlig kliniskt eller på bitewing].
- Lokalisation: [Klass I ocklusalt / Klass II MO eller DO / Klass III approximalt front / Klass IV inkluderar incisalkant / Klass V cervikalt].
- Närliggande tänder: u.a.
- Sensibilitet (kyla): Kraftig positiv kortvarig respons.
- Perkussion: u.a.
- Rtg: [Approximalkaries grad D1/D2 på bitewing / ingen periapikal patologi].

Bedömning: Operativ behandling med kompositfyllning.

Samtycke: Pat. informerad om diagnos, behandlingsalternativ (direkt komposit, indirekt onlay/inlay, observation), risker (postoperativ ilning, sekundärkaries vid sub-optimal teknik, fraktur vid stor preparation) samt kostnad enligt TLV. Samtycker till föreslagen behandling.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration buckalt, [antal] ml
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml (vid kardiovaskulär hänsyn)
[ ] Mepivakain 3% utan adrenalin — [antal] ml (vid blödningsrisk)
[ ] Mandibularblockad vid UK-molar — [preparat och ml]
[ ] Intraligamentär komplettering vid bedövningssvikt
[ ] Ingen LA — ytlig karies, ej känslig

Material använt:
- Kofferdam (Hygenic / OptraDam).
- Matrisband (Tofflemire, Palodent, V3, sektionsmatris) + kil vid Klass II.
- Etsning: Ultra Etch 37% fosforsyra (selektiv emaljetsning eller total etch enligt teknik).
- Bonding: Adhese Universal Vivapen / OptiBond eXTRa / Scotchbond Universal (selfetch eller etch-and-rinse).
- Pulpaskydd (vid djup preparation): Vitrebond glasjonomer / Dycal Ca(OH)₂ / Biodentine.
- Komposit: Filtek Supreme A2/A3/A3.5 (eller motsv. Tetric, Ceram.x, Estelite) — skiktteknik.
- Polering: Sof-Lex diskar (grov→fin), Astropol/Astrobrush, polerpasta.
- Ocklusionspapper 40 µm + 8 µm.

Utförande:
- LA enligt val ovan.
- Kofferdam applicerad isolerande tand [nr] och 1–2 grannar.
- Matrisband + kil (vid approximal preparation).
- Kariesexcavering med roterande hårdmetallborr + handinstrument tills hård dentin runt om. Pulpastatus bekräftad: [u.a. / nära expostion].
- Pulpaskydd vid behov: [Vitrebond / Dycal / Biodentine].
- Selektiv emaljetsning 15 sek (eller total-etch enligt teknik), spolning, lätt torkning.
- Bonding applicerad enligt tillverkare, ljushärdning 10–20 sek.
- Komposit lagd i skikt om max 2 mm, varje skikt ljushärdat 20 sek.
- Slutkontur och anatomi etablerad.
- Polering med diskar och gummi.
- Ocklusionskontroll i interkuspidation och lateroprotrusion — justerat till u.a.
- Approximalkontroll med tandtråd — passerar utan rivning men med kontakt.
- Kofferdam avlägsnad. Slutpolering.

Information om eventuella efterbesvär: Pat. informerad om att postoperativ ilning vid kallt/sött kan kvarstå 1–4 veckor, vilket är fysiologiskt. Bettkänsla vid första dygnet kan justeras vid behov. Smärtlindring vid behov: Paracetamol 1 g × 3 alt. Ibuprofen 400 mg × 3 i max 1–2 dygn. Vid spontansmärta, nattvärk eller smärta som inte avtar — kontakt för bedömning av pulpastatus och eventuell endodontisk åtgärd. Tandtråd och normal munhygien återupptas direkt.

Planering: Kontroll vid nästa revision. Vid ilning >4 v eller spontansmärta — sensibilitetstest + apikalbild.`},
  {id:'remiss',label:'Remiss — Specialistprotetik (komplexa fall)',behandlingTag:'remiss protetik',followup:'Specialistsvar styr fortsatt restauration.',
   text:`REMISS — Specialisttandläkare i protetik

Frågeställning: Pat. med [tand med mycket stor defekt / multipla frakturlinjer / behov av onlay/krona / kosmetiskt komplext fall] — begäran om bedömning av definitiv restauration.

Sammanfattning anamnes och status: [...].

Bifogat: Foton, bitewing + apikalbilder, modelldata vid behov.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under hela bondningsproceduren — torrt arbetsfält säkrat.'},
  {id:'okkontroll',label:'Ocklusionskontroll',text:'Ocklusion kontrollerad i max interkusp. och lateroprotrusion — justerat till u.a.'},
  {id:'approx',label:'Approximalkontroll',text:'Approximalkontakt verifierad med tandtråd och 8 µm papper.'},
  {id:'pulpaskydd',label:'Pulpaskydd vid djup preparation',text:'Vitrebond glasjonomer / Dycal Ca(OH)₂ / Biodentine applicerat över pulpanärmaste dentin.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3 alt. Ibuprofen 400 mg × 3 i max 1–2 dygn.',remissSpec:null},

{id:'vardag18',icd:'K02.5 sekundärkaries',name:'Sekundärkaries — lagning eller utbyte av restauration',cat:'Vardag — Konservering',scId:'VARDAG-18-SEKUND',
 symptom:['sekundärkaries','marginalt läckage','missfärgning kring fyllning','ilning'],
 behandling:['utbyte fyllning','reparation','adhesiv','komposit'],varning:null,
 mallar:[
  {id:'m1',label:'Sekundärkaries — reparation eller utbyte',behandlingTag:'sekundärkaries reparation',followup:'Bitewing-kontroll vid revision.',
   text:`Diagnos: Sekundärkaries i anslutning till befintlig fyllning tand [nr] yta [...].

Anamnes:
- Tidigare fyllning: [komposit / amalgam / glasjonomer / inlay], lagd [år].
- Symtom: [Ilning / missfärgning / kvarstående mat-impaktion / asymtomatisk fynd vid bitewing].
- Smärthistoria tand [nr]: [...].

Status:
- Tand [nr]: Vital. Befintlig fyllning [intakt / missfärgad kant / marginalt läckage / fraktur i fyllning].
- Sekundärkaries lokaliserad: [approximalt mesialt/distalt / gingivalt / ocklusalt vid fissur].
- Pulpa: Vital, sensibilitet u.a.
- Perkussion: u.a.
- Rtg: Sekundärkaries grad [...] på bitewing.

Bedömning: [Reparation av del av fyllning (om majoriteten intakt) / Komplett utbyte av fyllning (om omfattande läckage)].

Samtycke: Pat. informerad om att utbyte av fyllning innebär förlust av tandsubstans och ev. behov av större restauration på sikt, alternativ (observation om mycket liten, kron-/onlay vid stor defekt) samt kostnad. Samtycker.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Ingen LA — ytlig reparation

Material använt:
- Kofferdam.
- Matrisband + kil vid approximal lagning.
- Etsning Ultra Etch 37%, bonding Adhese Universal eller motsv.
- Pulpaskydd Vitrebond/Dycal vid djup preparation.
- Komposit Filtek Supreme nyans [A2/A3].
- Polering: Sof-Lex, Astropol.

Utförande:
- LA enligt val.
- Kofferdam.
- Defekt komposit/amalgam avlägsnad selektivt — bevara så mycket av befintlig fyllning som möjligt vid reparation.
- Excavering av kariesvävnad till hård dentin.
- Konditionering: emaljetsning, bonding.
- Pulpaskydd vid behov.
- Komposit i skikt, ljushärdning.
- Polering och ocklusionskontroll.
- Approximalkontroll vid Klass II.

Information om eventuella efterbesvär: Pat. informerad om att ilning vid kallt/sött kan kvarstå 1–4 veckor. Bettkontroll vid ev. justeringsbehov. Vid spontansmärta eller nattvärk — direkt kontakt. Smärtlindring vid behov: Paracetamol 1 g × 3.

Planering: Bitewing-kontroll om 12 mån för marginalbedömning.`},
  {id:'remiss',label:'Remiss — Protetik vid omfattande nedbrytning',behandlingTag:'remiss protetik',followup:'Specialistsvar för långsiktig plan.',
   text:`REMISS — Specialisttandläkare i protetik

Frågeställning: Pat. med tand [nr] som genomgått upprepade fyllningsutbyten och nu uppvisar [omfattande defekt / kuspfraktur / behov av onlay eller krona] — bedömning av definitiv restauration.

Sammanfattning: [...].

Bifogat: Foton, bitewing + apikalbilder.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat.'},
  {id:'okkontroll',label:'Ocklusionskontroll',text:'Ocklusion kontrollerad och justerad.'},
  {id:'caries',label:'Detekteringsindikator',text:'Kariesdetekteringsvätska (Caries Detector) använd för verifiering av komplett excavering.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3.',remissSpec:'Protetik vid omfattande nedbrytning'},

{id:'vardag19',icd:'S02.5 fraktur',name:'Fraktur-lagning (kron- eller fyllningsfraktur)',cat:'Vardag — Konservering',scId:'VARDAG-19-FRAK',
 symptom:['fraktur av fyllning','kron-/kuspfraktur','vasshet','tugg-svårighet','estetisk defekt'],
 behandling:['fraktur-reparation','direkt komposit','indirekt restauration vid stor defekt'],varning:'Vid djup fraktur in i pulpan — endodontisk åtgärd (se separat mall).',
 mallar:[
  {id:'m1',label:'Fraktur-lagning med direkt komposit',behandlingTag:'fraktur lagning komposit',followup:'Kontroll vid revision eller symtom.',
   text:`Diagnos: Kronfraktur eller fraktur av tidigare fyllning tand [nr].

Anamnes:
- Debut: Frakturen uppstod [datum / vid bett på hård mat / efter trauma — beskriv].
- Symtom: [Vass kant mot kind/tunga / ilning vid kallt / asymtomatisk].
- Smärtkaraktär: [Ingen / kortvarig provocerad / spontan].

Status:
- Tand [nr]: Vital, frakturlinje synlig [emalj-dentin / inkluderar fyllning / nära pulpa].
- Frakturfragment: [Bevarat hos pat / försvunnet].
- Sensibilitet (kyla): Positiv kortvarig.
- Perkussion: [u.a. / lätt ömhet].
- Pulpaexposition: [Nej / Ja, storlek mm].
- Rtg: Periapikalbild — frakturlinjen synlig, [pulpan ej involverad / nära pulpa].

Bedömning: [Direkt komposit-reparation / Indirekt onlay vid stor defekt / Endodontisk åtgärd om pulpaexpostion].

Samtycke: Pat. informerad om diagnos, behandlingsalternativ (direkt komposit, indirekt restauration, vid behov endodonti och krona), risker (sekundär fraktur, fortsatt fortskridande, behov av endodonti senare) samt kostnad. Samtycker.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Ingen LA — vid ytlig fraktur utan pulpasymtom

Material använt:
- Kofferdam.
- Frakturfragment återlimmas vid bevarat fragment: bonding + komposit-cement.
- Etsning: Ultra Etch 37%.
- Bonding: Adhese Universal Vivapen.
- Pulpaskydd: Biodentine eller Dycal vid djup defekt nära pulpa.
- Komposit: Filtek Supreme nyans [A2/A3 dentinmassa + transparent emaljmassa vid frontständ].
- Polering: Sof-Lex, polerpasta.
- Matrisband vid approximal involvering.

Utförande:
- LA enligt val.
- Kofferdam.
- Frakturytan inspekterad — bevarat fragment renat och torkat om aktuellt.
- Kariesexcavering vid sekundär karies under frakturlinjen.
- Pulpaskydd vid djup defekt.
- Konditionering: etsning, bonding.
- Komposit i skikt — anatomisk rekonstruktion med dentin- och emaljmassor (för front estetisk teknik).
- Polering till naturlig glansyta.
- Ocklusionskontroll i interkuspidation och i frontledning — justerat så ingen interferens uppstår.

Information om eventuella efterbesvär: Pat. informerad om att lätt ilning kan kvarstå 1–4 veckor och att postoperativ bettkänsla justeras vid behov. Vid spontansmärta eller progredierande symtom kan endodontisk åtgärd och krona behövas. Smärtlindring: Paracetamol 1 g × 3. Vid frontand med pulpanärmaste defekt — kontroll av sensibilitet 6 v + 6 mån + 12 mån.

Planering: Sensibilitetskontroll om 6 v + 6 mån. Kontrollrtg vid 12 mån vid djup defekt. Om kvarstående problem — bedömning för indirekt restauration eller krona.`},
  {id:'remiss',label:'Remiss — Protetik vid stor fraktur',behandlingTag:'remiss protetik',followup:'Specialistsvar för restaurationsplan.',
   text:`REMISS — Specialisttandläkare i protetik

Frågeställning: Pat. med tand [nr] som har omfattande frakturskada — bedömning av indirekt restauration (onlay, krona, eventuellt med tidigare endodonti).

Sammanfattning: [...].

Bifogat: Foton, rtg.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'fragment',label:'Återlimning av frakturfragment',text:'Bevarat frakturfragment återlimmat med bonding + komposit som biologiskt och estetiskt alternativ.'},
  {id:'sensibilitet',label:'Sensibilitetskontroll-protokoll',text:'Sensibilitetstest planerad 6 v, 6 mån, 12 mån för uppföljning av pulpastatus.'},
  {id:'kofferdam',label:'Kofferdam',text:'Kofferdam applicerat under bondning.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3.',remissSpec:'Protetik vid behov av indirekt restauration'},

{id:'vardag20',icd:'K02.1 / K02.3 selektiv exkavering',name:'Selektiv exkavering (djup karies — pulpaavsöndring bevaras)',cat:'Vardag — Konservering',scId:'VARDAG-20-SELEX',
 symptom:['djup karies','pulpanära karies','asymtomatisk djup karies'],
 behandling:['selektiv karieslagning','komposit','pulpaavsöndring bevaras'],varning:'Vid spontansmärta eller nattvärk — istället pulpektomi (irreversibel pulpit).',
 mallar:[
  {id:'m1',label:'Selektiv exkavering — engångsbehandling',behandlingTag:'selektiv exkavering',followup:'Sensibilitetskontroll 6 v + 6 mån + 12 mån.',
   text:`Diagnos: Djup karies tand [nr] yta [...] med risk för pulpaexposition vid total excavering.

Anamnes:
- Symtom: [Ilning vid kallt/sött / asymtomatisk]. Spontansmärta: Nej.
- Smärtkaraktär: Kortvarig provocerad, ej spontan.
- Tidigare problem tand [nr]: [...].

Status:
- Tand [nr]: Vital, djup karies kliniskt och radiologiskt.
- Sensibilitet (kyla): Kraftig positiv kortvarig respons.
- Perkussion: u.a.
- Palpation apikalt: u.a.
- Rtg: Djup kariesskada med <1 mm till pulpakavum, ingen periapikal patologi.

Bedömning: Reversibel pulpa — selektiv exkavering valt för att bevara pulpan och undvika endodontisk åtgärd.

Samtycke: Pat. informerad om diagnos, behandlingskoncept (mjuk karies närmast pulpa lämnas avsiktligt kvar för att undvika expostion, tätas hermetiskt med adhesiv och komposit), alternativ (stegvis exkavering med två besök, pulpektomi vid förvärrade symtom), risker (ev. progression till irreversibel pulpit som kräver rotbehandling, sekundärkaries vid otät tätning) samt kostnad. Samtycker.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml infiltration
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Mandibularblockad vid UK-molar

Material använt:
- Kofferdam (obligatorisk vid djup karies).
- Roterande hårdmetallborr + handexcavator för selektiv excavering.
- Pulpaskydd: Biodentine (förstahandsval vid pulpanärhet) / Vitrebond glasjonomer / Dycal Ca(OH)₂.
- Bonding: Selfetch-system (Adhese Universal, Scotchbond Universal) — fördelaktig vid djupa preparationer.
- Komposit: Filtek Supreme A2/A3 i skikt.
- Matrisband + kil vid Klass II.

Utförande:
- LA enligt val.
- Kofferdam.
- Perifer exkavering (DEJ och pulpogolv perifert) till hård dentin runt om — säkrar tätning vid kavitetskanten.
- Centralt över pulpan: Selektiv exkavering — mjuk eller läderlik karies närmast pulpa LÄMNAS avsiktligt kvar för att undvika expostion. Ingen aggressiv excavering nära pulpa.
- Pulpaskydd: Biodentine eller Vitrebond applicerat över pulpanärmaste dentin (ej Ca(OH)₂ i tunt skikt eftersom det löses upp).
- Selfetch konditionering enligt tillverkare.
- Bonding applicerad och ljushärdad.
- Komposit i skikt om max 2 mm, varje skikt ljushärdat 20 sek.
- Anatomisk rekonstruktion och polering.
- Ocklusionskontroll och approximalkontroll.

Information om eventuella efterbesvär: Pat. informerad om att ilning vid kallt/sött kan kvarstå 4–8 veckor och avtar successivt — detta är ett tecken på pulpaaktivering och bildning av reparativt dentin. Vid spontansmärta, nattvärk eller smärta som inte avtar inom 8 veckor — direkt kontakt för bedömning av pulpastatus. Smärtlindring: Paracetamol 1 g × 3 vid behov. Tandtråd och munhygien återupptas direkt.

Planering: Sensibilitetstest om 6 v, 6 mån, 12 mån. Vid kvarstående symtom eller negativ sensibilitet — pulpektomi (se endodontisk mall). Bitewing-kontroll om 12 mån.`},
  {id:'remiss',label:'Remiss — Endodontist vid komplex situation',behandlingTag:'remiss endodontist',followup:'Specialistsvar för fortsatt plan.',
   text:`REMISS — Endodontist

Frågeställning: Pat. med tand [nr] med mycket djup karies eller komplex anatomi där frågan är: bevara pulpa med selektiv exkavering eller initiera endodontisk behandling?

Sammanfattning: [...].

Bifogat: Apikalbild, bitewing, foton.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'biodentine',label:'Biodentine som pulpaskydd',text:'Biodentine applicerat enligt tillverkare över pulpanärmaste dentin — biomimetiskt och bioaktivt skydd.'},
  {id:'kofferdam',label:'Kofferdam',text:'Kofferdam obligatoriskt vid djup karies för att säkra steril/torr preparation.'},
  {id:'sensprotokoll',label:'Sensibilitetskontrollschema',text:'Pat. inbokad för sensibilitetskontroll 6 v, 6 mån, 12 mån.'}
 ],
 lakemedel:'Vid behov Paracetamol 1 g × 3 kortvarigt.',remissSpec:'Endodontist vid pulpasymtom som utvecklas under uppföljning'},

{id:'vardag22',icd:'K02.1 glasjonomer',name:'Glasjonomerfyllning (GC Fuji II / IX)',cat:'Vardag — Konservering',scId:'VARDAG-22-GIC',
 symptom:['rotkaries','barn-fyllning','provisorisk fyllning','högkariesriskpatient'],
 behandling:['kariesexkavering','glasjonomerfyllning'],varning:null,
 mallar:[
  {id:'m1',label:'Glasjonomerfyllning — rotkaries eller barn',behandlingTag:'glasjonomer fyllning',followup:'Kontroll vid revision; bedömning av övergång till komposit vid permanenta tänder.',
   text:`Diagnos: Karies tand [nr] yta [V/M/D/O] — indikation för glasjonomer.

Anamnes:
- Indikation för glasjonomer: [Rotkaries hos äldre / Hög kariesrisk / Barn med svår samarbetsförmåga / Provisorisk fyllning / Mellanrumstandskydd under bracket / ART-teknik].
- Symtom: [Ilning / asymtomatisk fynd].

Status:
- Tand [nr]: [Vital / mjölktand]. Lokalisation av karies: [...].
- Sensibilitet: [Positiv / ej testbar vid mjölktand].
- Perkussion: u.a.
- Munhygien: [PI% — relevant för materialval].

Bedömning: Glasjonomer indicerat pga fluoravgivande egenskaper, kemisk vidhäftning till dentin och tolerans för fuktig miljö (lämpligt vid rotkaries och hos barn).

Samtycke: Pat./vårdnadshavare informerad om materialet, dess egenskaper (fluoravgivande, mindre slitstark än komposit, kan behöva bytas till komposit senare) och kostnad. Samtycker.

Anestesi (välj alternativ — vid mjölktand kan ofta avstås):
[ ] Septocaine 4% med adrenalin 1:200 000 — [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Ytanestesi (Xylocain salva 5%) före infiltration hos barn
[ ] Ingen LA — ytlig karies eller "no-pain" ART-teknik

Material använt:
- GC Fuji IX GP Extra (kapselbaserad glasjonomer för posterior bärande fyllning).
- GC Fuji II LC (light-cured glasjonomer för front eller estetik).
- Ketac Molar Easymix / Ketac Universal vid alternativ.
- Konditioneringsvätska: GC Cavity Conditioner 20% polysyra.
- Vaselin eller GC Fuji Varnish som ytskydd efter härdning.
- Bomullsrullar (alternativ till kofferdam vid barn eller begränsad tillgång).

Utförande:
- LA enligt val (vid behov).
- Torrläggning med bomullsrullar eller kofferdam.
- Kariesexcavering med långsamtgående borr och handexcavator (ART-teknik vid barn — endast handinstrument).
- Konditionering med 20% polysyra i 10 sek, spolning, lätt torkning (dentinet ska vara fuktigt, ej uttorkat).
- Glasjonomer blandad i kapsel och applicerad i 1 portion (kemisk härdning för Fuji IX) eller ljushärdad (Fuji II LC).
- Ocklusionskontroll och justering med skarp instrument efter initial härdning (5 min).
- Skyddande vernissa (Fuji Varnish) applicerad över ytan.

Information om eventuella efterbesvär: Pat. informerad om att glasjonomern är känslig för uttorkning första 24 h — undvik hård/seg mat. Fluoravgivning skyddar mot återkommande karies under flera år. Vid behov av byte till komposit på sikt — kan göras enkelt. Smärtlindring vid behov: Paracetamol enligt dos och ålder.

Planering: Kontroll vid revision. Vid vuxen pat. med rotkaries — komposit-täckning vid behov om estetiken kräver. Vid mjölktand — uppföljning vid revision.`},
  {id:'remiss',label:'Remiss — Pedodontist vid komplex barnbehandling',behandlingTag:'remiss pedodontist',followup:'Specialistsvar i fortsatt plan.',
   text:`REMISS — Specialisttandläkare i pedodonti

Frågeställning: Barn med [omfattande karies / starkt motstånd mot behandling / komplex medicinsk anamnes] — bedömning av behandlingsupplägg.

Sammanfattning: [...].

Bifogat: Foton, rtg (om tagit), anamnesblankett.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'art',label:'ART-teknik',text:'Atraumatic Restorative Treatment — kariesexkavering endast med handinstrument, ingen rotation, ingen LA. Lämpligt för barn eller patienter med begränsad samarbetsförmåga.'},
  {id:'fluor',label:'Fluorlackning samma besök',text:'Duraphat 22 600 ppm applicerat på övriga ytor som komplement.'}
 ],
 lakemedel:'Vid behov Paracetamol enligt vikt/ålder.',remissSpec:'Pedodontist vid komplex barnbehandling'},

{id:'vardag23',icd:'K08.1 extraktion sedvanlig',name:'Sedvanlig extraktion',cat:'Vardag — Kirurgi',scId:'VARDAG-23-EXTSEDV',
 symptom:['ej restaureringsbar tand','perio-hopplös tand','endo-fraktur','ortodontisk indikation','retentionstand'],
 behandling:['LA','luxation','extraktion','hemostas','postop-instruktion'],varning:'Pat. på antikoagulantia, bisfosfonater eller med endokarditrisk — se separat blödningsrisk-mall och ev. läkar-konsult.',
 mallar:[
  {id:'m1',label:'Sedvanlig extraktion — vital eller avital tand',behandlingTag:'extraktion sedvanlig',followup:'Kontroll vid besvär. Suturborttagning om resorberbar sutur ej använts — 7–10 dagar.',
   text:`Diagnos: Tand [nr] ej restaureringsbar — indikation för extraktion. Bakomliggande tillstånd: [karies subgingival / fraktur till pulpa / endo-misslyckande / parodontalt hopplös / ortodontisk indikation / retention].

Anamnes:
- Allmäntillstånd: [Friskanamnes u.a. / specificera].
- Läkemedel: [Inga / specificera, särskilt antikoagulantia, antitrombotika (NOAK, Warfarin, ASA, Klopidogrel), bisfosfonater, denosumab, immunosuppressiva, kortison].
- Allergier: [Inga / specificera, särskilt antibiotika och lokalanestetika].
- Tidigare extraktion: [u.a. / komplikationer].
- Tobak: [...].
- Senaste måltid: [...].
- Symtom från aktuell tand: [smärta / svullnad / ingen].

Status:
- Extraoralt: u.a. [eller specificera].
- Intraoralt: Tand [nr] — [karies / fraktur / mobilitet grad I–III / fistel].
- Närliggande tänder och slemhinna: [u.a. / specificera].
- Rtg: Periapikalbild eller OPG visar [rotmorfologi, närhet till n. alveolaris inferior / sinus maxillaris / närliggande strukturer].

Bedömning: Tand [nr] ej bevarbar — extraktion indicerad.

Samtycke: Pat. informerad om diagnos, behandlingsalternativ (extraktion vs. fortsatt försök till tandbevaring), risker (smärta, blödning, infektion, alveolit, parestesi vid UK-molar, sinuskommunikation vid ÖK-molar, fraktur av rot, postop-svullnad och hematom), alternativ till ersättning (implantat, bro, partialprotes, lämna lucka), prognosen samt kostnad. Samtycker till extraktion.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — buckal infiltration + palatal/lingual komplettering, [antal] ml
[ ] Xylocain Dental adrenalin 20 mg/ml + 12,5 µg/ml — [antal] ml
[ ] Citanest Octapressin 30 mg/ml + felypressin — [antal] ml (vid kardiovaskulär hänsyn — ischemisk hjärtsjukdom, hypertoni)
[ ] Mepivakain 3% utan adrenalin — [antal] ml (vid hyperthyreos, vid blödningsrisk där adrenalin önskas undvikas)
[ ] Mandibularblockad vid UK-molar enligt val ovan
[ ] Intraligamentär komplettering vid otillräcklig bedövning

Material använt:
- LA-spruta med aspiration.
- Periotomer för atraumatisk lossning av desmodontalligament (vid behov).
- Elevator (luxator) — Bein, Couplands, eller Heidbrink för rotrester.
- Extraktionstång anpassad efter tand: ÖK incisiv/canin (tång #1), ÖK premolar (tång #5), ÖK molar (tång #18L/R), UK incisiv/canin (tång #2), UK premolar (tång #45), UK molar (tång #22/86).
- Spongostan (resorberbar gelatinsvamp) eller alternativt fibrillärt kollagen.
- Sutur: Vicryl 4-0 resorberbar (kräver ej borttagning) eller Ethilon 4-0 icke-resorberbar.
- Bomullskompress för bettamponad.
- Koksalt-spolning.

Utförande:
- LA enligt val.
- Aspirationskontroll — negativ.
- Vänta tills full anestesi nådd.
- Periotomi: Lossning av gingiva runt tanden med periotom eller skarp elevator.
- Luxation: Försiktig vidgning av alveolen med luxator buckalt och palatinalt/lingualt.
- Tång applicerad apikalt om möjligt — bukk-ling rörelse + rotation vid rotvänliga tänder + tractionkraft.
- Extraktion utförd. Tand inspekterad — komplett rot, ingen fraktur kvar.
- Alveolen inspekterad: granulom, cysta, frakturfragment — kürettering vid behov.
- Hemostas: Bettamponad 10–20 min. Vid behov Spongostan i alveolen + sutur.
- Sutur: [antal X-tags / kryssutur] vid kirurgisk åtgärd eller stor alveol.

Information om eventuella efterbesvär: Pat. informerad om:
- Bettamponad 30 min efter behandlingen — byt om kompressen blir genomblödd.
- INGEN spolning, INGEN sugning (rör inte alveolen), INGEN tobak, INGEN alkohol i minst 24 h — risk för utlösning av koagel (alveolit).
- Skonkost första dygnet — undvik varma drycker, hård eller seg mat.
- Smärtlindring: Paracetamol 1 g × 3–4 + Ibuprofen 400 mg × 3 vid behov. Undvik ASA första dygnet.
- Klorhexidin 0,12% sköljning från dag 2, 2 ggr/dag i 1 v.
- Normal munhygien återupptas runt operationsområdet från dag 2 — borsta försiktigt.
- Lätt svullnad och blåmärken är normalt 2–3 dagar och avtar.
- AKUT KONTAKT vid: kvarstående blödning >2 h trots bettamponad, kraftig smärta som ökar 3–5 dagar efter (alveolit), feber >38,5 °C, tilltagande svullnad, parestesi i läpp/tunga, blödning från näsan (sinuskommunikation).
- Suturborttagning [vid icke-resorberbar sutur] om 7–10 dagar.

Planering: Återbesök vid besvär. Vid plan för implantat/bro: bedömning efter 6–12 v läkning. Vid sutur som ej är resorberbar — suturborttagning 7–10 dagar (se vardag15).`},
  {id:'remiss',label:'Remiss — Käkkirurg vid postoperativ komplikation eller komplex tand',behandlingTag:'remiss käkkirurg',followup:'Specialistsvar tas in i journal.',
   text:`REMISS — Käkkirurgisk klinik

Frågeställning: Pat. med [tand som visar sig komplex vid pre-bedömning — närhet till n. alveolaris inferior eller sinus, fraktur av rot under extraktionsförsök, postoperativ komplikation] — bedömning och behandling.

Sammanfattning: [...].

Bifogat: OPG, periapikalbild, klinisk dokumentation.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'spongostan',label:'Spongostan i alveolen',text:'Spongostan applicerat för bättre koagelbildning vid lätt blödning.'},
  {id:'sutur',label:'Sutur vid behov',text:'Sutur [Vicryl 4-0 resorberbar / Ethilon 4-0 icke-resorberbar], [antal] X-tags eller kryssutur.'},
  {id:'cyklokapron',label:'Cyklokapron mun-spolning',text:'Vid lätt förhöjd blödningsrisk — Cyklokapron 100 mg/ml sköljning 10 ml × 4/dag i 1–2 dagar.'},
  {id:'instruktion',label:'Skriftliga postop-instruktioner',text:'Pat. fått skriftligt informationsblad om postoperativa råd och varningstecken.'}
 ],
 lakemedel:'Paracetamol 1 g × 3–4 + Ibuprofen 400 mg × 3 vid behov. Klorhexidin 0,12% sköljning från dag 2. Antibiotika ENDAST vid systempåverkan eller spridning enligt Strama 2024 — ej rutinmässigt.',remissSpec:'Käkkirurg vid komplikation'},

{id:'vardag24',icd:'K08.1 + K08.5 komplicerad extraktion',name:'Komplicerad extraktion (rotrester, kröka rötter)',cat:'Vardag — Kirurgi',scId:'VARDAG-24-EXTKOMP',
 symptom:['rotrest','dilacererad rot','kröka rötter','tidigare frakturerad extraktion'],
 behandling:['LA','sektionering','elevation av rotrester','hemostas','sutur'],varning:'Vid omfattande komplikation utan progress — överväg konvertering till operativ extraktion eller remiss.',
 mallar:[
  {id:'m1',label:'Komplicerad extraktion utan lambå',behandlingTag:'extraktion komplicerad',followup:'Suturborttagning 7–10 dagar (om icke-resorberbar). Kontroll vid besvär.',
   text:`Diagnos: Tand [nr] med komplicerad anatomi (dilacererad rot, krökta rötter, divergerande rötter, fast resorberat ankylos) eller tidigare frakturerad rotrest — indikation för komplicerad extraktion.

Anamnes:
- Tidigare extraktionsförsök: [Nej / Ja, [datum] — fraktur av rot, krona avslagen].
- Allmäntillstånd: [se sedvanlig extraktion].
- Läkemedel: [se sedvanlig extraktion].
- Allergier: [...].

Status:
- Tand/rot [nr]: [omfattande karies subgingivalt / fraktur till gingivanivå / endo-tand med rotrest].
- Slemhinna: [u.a. / lätt rodnad].
- Rtg: Periapikalbild eller OPG — rotmorfologi [krökt distalt / divergerande mesial-distal rot / dilacererad apikalspets / närhet till n. alveolaris inferior].

Bedömning: Komplicerad anatomi — kräver sektionering och stegvis elevation.

Samtycke: Pat. informerad om diagnos, behandlingsalternativ (komplicerad extraktion utan lambå vs. operativ extraktion med lambå), risker (rotfraktur ytterligare, behov av konvertering till lambåoperation, parestesi vid UK-molar, sinuskommunikation vid ÖK-molar) samt kostnad. Samtycker.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration buckalt + palatal/lingual, [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Mandibularblockad vid UK
[ ] Intraligamentär komplettering

Material använt:
- Skalpell #15 (vid behov för gingivamodifiering, mini-lambå).
- Roterande hårdmetallborr (cylindrisk eller flamma) för sektionering — kylvätska obligatorisk.
- Periotomer.
- Elevator (Bein, Couplands, Heidbrink för rotrester, root-tip pick).
- Extraktionstång (tång #45 root-tip eller Heidbrink för UK-rotrester).
- Spongostan, eventuellt fibrin-lim.
- Sutur Vicryl 4-0.
- Spolning med koksalt.

Utförande:
- LA enligt val.
- Periotomi och försök till sedvanlig extraktion enligt vardag23.
- Vid behov sektionering med roterande borr — separera multiroten i 2 (premolar) eller 3 (molar) sektioner.
- Sektionering riktning: ÖK-molar — mesiobuckal, distobuckal, palatinal; UK-molar — mesial och distal.
- Varje rotfragment elevreras separat med elevator i pivot-rörelse mot interradikulärt ben.
- Rotrester avlägsnas med Heidbrink eller root-tip pick — försiktig elevation utan att förlorat fragment in i sinus eller mandibularkanal.
- Alveolen inspekterad — kürettering av eventuella granulom.
- Hemostas: Bettamponad + Spongostan + sutur Vicryl 4-0 vid gapande alveol.

Information om eventuella efterbesvär: [se vardag23 — likadana postop-råd]. Pat. informerad även om att svullnad och hematom kan vara större än vid sedvanlig extraktion pga längre operationstid. Akutkontakt vid alla tecken på alveolit, infektion eller parestesi.

Planering: Kontroll vid 1 v vid betydande gapande sårhål. Suturborttagning 7–10 dagar om icke-resorberbar sutur. Implantatplanering tidigast 8–12 v.`},
  {id:'remiss',label:'Remiss — Käkkirurg vid extra komplexitet',behandlingTag:'remiss käkkirurg',followup:'Specialistsvar.',
   text:`REMISS — Käkkirurgisk klinik

Frågeställning: Pat. med [komplex anatomi nära n. alveolaris inferior / dislocerad rotrest in i sinus / mycket långa eller krökta rötter / multipla tidigare misslyckade försök] — begäran om kirurgisk extraktion.

Sammanfattning: [...].

Bifogat: OPG, CBCT (om aktuellt), periapikalbild.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'sektion',label:'Sektionering med roterande borr',text:'Multiroten sektionerad med långsamtgående hårdmetallborr under riklig kylning för att möjliggöra stegvis elevation.'},
  {id:'rontgen',label:'Kontroll-rtg vid kvarvarande rotrest',text:'Postoperativ periapikalbild tagen vid misstanke om kvarvarande rotrest.'}
 ],
 lakemedel:'Paracetamol 1 g × 3–4 + Ibuprofen 400 mg × 3 vid behov. Klorhexidin 0,12% sköljning från dag 2.',remissSpec:'Käkkirurg vid extra komplexitet'},

{id:'vardag25',icd:'K08.1 + S03.0 operativ extraktion',name:'Operativ extraktion (med lambå + benbortttagning)',cat:'Vardag — Kirurgi',scId:'VARDAG-25-EXTOP',
 symptom:['retinerad visdomstand','impakterad tand','rotrest djupt under ben','operativ indikation'],
 behandling:['LA','lambå','benbortttagning','sektionering','extraktion','sutur'],varning:'Vid närhet <2 mm till n. alveolaris inferior eller sinus maxillaris — överväg remiss till käkkirurg.',
 mallar:[
  {id:'m1',label:'Operativ extraktion med lambå (visdomstand eller djup rotrest)',behandlingTag:'operativ extraktion lambå',followup:'Suturborttagning 7–10 dagar. Kontroll vid besvär.',
   text:`Diagnos: Tand [nr] — operativ extraktion indicerad pga [retinerad visdomstand (impakterad / horisontellt / mesioangulär) / djupt belägen rotrest / behov av benbortttagning / cysta runt tand].

Anamnes:
- Indikation: [Perikoronit recidiverande / karies omöjlig att restaurera / ortodontisk indikation / prevention av framtida problem].
- Allmäntillstånd: [se vardag23].
- Läkemedel inkl. antikoagulantia, bisfosfonater, immunosuppression: [...].
- Allergier: [...].
- Tidigare käkkirurgiska ingrepp: [...].
- Pat. fastat enligt rutin om sedering planeras: [Ja/Nej].

Status:
- Extraoralt: u.a. eller specificera.
- Intraoralt: Tand [nr]: [helt täckt av slemhinna / delvis exponerad / horisontellt impakterad].
- Närliggande strukturer: nästa tand [...], slemhinna [...].
- Rtg: OPG — visdomstand klassificerad enligt Pell & Gregory (A/B/C, klass I/II/III), Winter (mesioangulär/distoangulär/horisontell/vertikal). Avstånd till n. alveolaris inferior: [mm]. Vid <2 mm — överväg CBCT eller remiss.

Bedömning: Operativ extraktion med lambå indicerad.

Samtycke: Pat. informerad om diagnos, behandlingsupplägg, risker (svullnad, hematom, trismus 1–2 v, alveolit, infektion, parestesi i läpp/tunga 5–10% temporärt och <1% permanent vid UK-molar, käkfraktur vid mycket djupt impakterad tand, sinuskommunikation vid ÖK-molar), alternativ (observation, coronektomi vid hög parestesirisk), tidsåtgång (30–60 min) samt kostnad. Samtycker. Skriftligt samtycke för operativ åtgärd inhämtat.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — mandibular- eller infraorbitalblockad + infiltration, [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Lustgas/sedering vid behov (se vardag16)
[ ] Iv-sedering eller narkos (specialistklinik)

Material använt:
- Skalpell #15 + skaft.
- Periostavlare (Howarth, Mead, Molt).
- Hårdmetallborr cylindrisk (#702 / Lindemann) för bensektion under kylning.
- Diamantborr fin för benkonturering.
- Elevator + tång (root-tip, Heidbrink).
- Skarp kürett för granulom-avlägsnande.
- Sutur: Vicryl 4-0 / 3-0 (vanligen för lambå) eller Ethilon 4-0.
- Spongostan, fibrillärt kollagen.
- Koksalt-spolning, klorhexidin 0,12% slutspolning.

Utförande:
- LA enligt val + ev. sedering.
- Aseptiska förhållanden, sterila instrument.
- Incision: Triangulär eller envelop-lambå beroende på lokalisation. Vanligen sulkulär incision från distalt av tand [nr+1] med vertikalt avlastningssnitt.
- Periostavlare lossar mukoperiostal lambå — exponering av crista alveolaris och tanden.
- Benbortttagning med roterande borr under riklig koksaltkylning — buckalt och vid behov ocklusalt över tandkronan.
- Sektionering av krona från rötter vid behov (vid horisontell impaktion).
- Stegvis elevation av krona och rötter med elevator i pivot-rörelse.
- Inspektion: Komplett extraktion verifierad. Granulom kürettat. Bensplitter avlägsnade.
- Skarpa benkanter slipade med diamantborr.
- Klorhexidin-spolning av kaviteten.
- Spongostan applicerat vid behov.
- Lambå reapproxmerad och suturerad med Vicryl 4-0 eller Ethilon 4-0, X-tags eller fortlöpande.

Information om eventuella efterbesvär: Pat. informerad om:
- Förväntad svullnad och hematom toppar vid 48–72 h, avtar 5–7 dagar. Kyla 15 min × varje timme första 6 h, sedan varmt från dag 3.
- Trismus (gapsvårighet) vanligt 1–2 v, mjuk kost.
- Smärtkontroll: Paracetamol 1 g × 4 + Ibuprofen 400 mg × 3, eventuellt Pinex Forte (paracetamol + kodein) vid behov i 1–2 dygn.
- INGEN spolning, sugning, tobak, alkohol första 24 h.
- Klorhexidin 0,12% × 2/dag från dag 2 i 1 v.
- Skonkost 3–5 dagar — undvik hård, seg, varm mat.
- Sömn med högt huvudläge första 2 nätterna.
- AKUTKONTAKT: kvarstående blödning >2 h, ökande smärta efter 3–5 dagar (alveolit), feber >38,5°C, kraftig svullnad som hindrar sväljning eller andning, parestesi i läpp/tunga som ej avtar, blödning från näsa eller smaklöshet (sinuskommunikation).
- Suturborttagning 7–10 dagar (om icke-resorberbar).

Planering: Återbesök för suturborttagning 7–10 dagar (se vardag15). Vid parestesi-misstanke — bedömning enligt nervpåverkan-protokoll och eventuell remiss käkkirurg.`},
  {id:'remiss',label:'Remiss — Käkkirurg för specialistnivå',behandlingTag:'remiss käkkirurg',followup:'Specialistsvar i fortsatt plan.',
   text:`REMISS — Käkkirurgisk klinik

Frågeställning: Pat. med [retinerad/impakterad 38/48 nära n. alveolaris inferior <2 mm enligt OPG / komplex impaktion / cysta kring tand / patient med komplicerad medicinsk anamnes] — begäran om operativ extraktion på specialistnivå.

Sammanfattning: [...].

Bifogat: OPG, CBCT, kliniska foton, anamnesblankett.

Pat. informerad om förlängd väntetid samt om syftet med specialistremiss.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'cbct',label:'CBCT vid närhet till n. alveolaris',text:'CBCT rekommenderad vid <2 mm avstånd till mandibularkanalen enligt OPG.'},
  {id:'coronek',label:'Coronektomi som alternativ',text:'Vid mycket hög parestesirisk — diskussion med pat. om coronektomi (avlägsna endast krona, lämna rötter) som alternativ.'},
  {id:'kyla',label:'Kylpåse-rutin',text:'Kallt på extraoralt 15 min × 1/timme första 6 h, sedan paus.'},
  {id:'samtycke',label:'Skriftligt informerat samtycke',text:'Skriftligt samtyckesformulär för operativ åtgärd undertecknat innan ingrepp.'}
 ],
 lakemedel:'Paracetamol 1 g × 4 + Ibuprofen 400 mg × 3 vid behov. Vid svår smärta Paracetamol + kodein (Pinex Forte 500/30 mg × 3 i 1–2 dygn). Klorhexidin 0,12% från dag 2. Antibiotika ENDAST vid systempåverkan eller perioperativ profylax enligt indikation (immunosupprimerad, hjärtklaffprotes).',remissSpec:'Käkkirurg vid extra komplexitet'},

{id:'vardag26',icd:'K08.1 + Z79.01 / Z79.02 extraktion blödningsrisk',name:'Extraktion vid ökad blödningsrisk (antikoagulantia / bisfosfonater)',cat:'Vardag — Kirurgi',scId:'VARDAG-26-EXTBLOD',
 symptom:['antikoagulantia','warfarin','NOAK','ASA','klopidogrel','bisfosfonater','denosumab','levercirros','trombocytopeni'],
 behandling:['preoperativ riskbedömning','läkarkonsult','lokalhemostas','extraktion'],varning:'⚠ MRONJ-risk: Bisfosfonater iv eller >3 år oralt, denosumab, anti-VEGF — överväg konservativ behandling eller remiss käkkirurg.',
 mallar:[
  {id:'m1',label:'Antikoagulantia / antitrombotika — extraktion med lokalhemostas',behandlingTag:'extraktion antikoagulantia',followup:'Återbesök 24–48 h för blödningskontroll. Suturborttagning 7–10 d.',
   text:`Diagnos: Tand [nr] — indikation för extraktion hos patient med ökad blödningsrisk pga [Warfarin / NOAK (Apixaban / Rivaroxaban / Dabigatran / Edoxaban) / ASA / Klopidogrel / dubbel trombocythämning / levercirros / trombocytopeni].

Anamnes:
- Aktuell läkemedelslista: [preparat, dos, indikation, behandlande läkare].
- Senaste INR (vid Warfarin): [datum, värde] — mål 2,0–3,0 för standardpat., 2,5–3,5 vid mekanisk hjärtklaff.
- Tidigare blödningar: [Nej / Ja].
- Tidigare extraktion under denna medicinering: [Nej / Ja, utfall].
- Allmäntillstånd: [...].
- Allergier: [...].

Status:
- Tand [nr]: [karies / fraktur / parodontalt hopplös].
- Slemhinna: [u.a. / lätt blödningstendens].
- Rtg: Periapikalbild eller OPG — rotmorfologi och närhet till strukturer.

Läkarkonsult: [Kontakt tagen med behandlande läkare datum [...] — rekommendation: bibehållen behandling under extraktion / dosjustering / tillfälligt uppehåll]. Aktuella rekommendationer från NICE och SoS 2022: NOAK och Warfarin med INR <3,5 ska EJ pausas inför enkel extraktion — risken för tromboembolism överväger risken för blödning.

Bedömning: Extraktion möjlig på vanlig klinik med lokala hemostasåtgärder. [Vid stor kirurgi eller mycket hög blödningsrisk — remiss till käkkirurg].

Samtycke: Pat. informerad om diagnos, behandlingsplan med lokalhemostas, risker (postoperativ blödning vanligt men hanterbar, sällsynt återbesök för rebleeding, akutkontakt vid massiv blödning) samt kostnad. Samtycker.

Anestesi (välj alternativ — undvik nervblockad om möjligt pga risk för hematom):
[ ] Septocaine 4% med adrenalin 1:200 000 — INFILTRATIONSANESTESI (undvik mandibularblockad), [antal] ml
[ ] Xylocain Dental adrenalin 2% — infiltration, [antal] ml
[ ] Mepivakain 3% utan adrenalin — ENDAST om adrenalin kontraindicerat
[ ] Intraligamentär komplettering (mindre vaskulärt trauma)
[ ] Citanest Octapressin 3% — infiltration

Material använt:
- Spongostan (gelatinsvamp) — applicerad i alveolen.
- Fibrillärt kollagen (CollaPlug / CollaTape) eller bensubstitut för tätning.
- Surgicel (oxiderad regenererad cellulosa) som tillägg.
- Cyklokapron 100 mg/ml — kompresser blötlagda + munsköljning.
- Sutur Vicryl 4-0 eller Ethilon 4-0 — täta interrupterade X-tags för approxmering.
- Lokal trombinpasta vid avancerad blödning (Floseal eller motsv.).
- Kallt extraoralt + bett-kompresser.

Utförande:
- LA enligt val — infiltration buckalt + palatal/lingual med fin nål, undvik blockad.
- Atraumatisk extraktion med minimal lambåreflektion.
- Alveolinspektion och kürettering av granulom.
- Alveolen fylls med Spongostan eller CollaPlug.
- Cyklokapron-impregnerad kompress för bettamponad 30 min.
- Suturering med X-tags så alveolen förs ihop.
- Slutkontroll: hemostas etablerad innan pat. lämnar kliniken.

Information om eventuella efterbesvär: Pat. informerad om:
- Bettamponad 30–60 min, vid behov längre. Byt vid genomblödning men håll alltid tryck.
- Cyklokapron 100 mg/ml munsköljning: 10 ml × 4/dag i 1–2 dygn — håll i munnen 2 min och spotta.
- INGEN ASA första dygnet om möjligt (samråd med läkare).
- Smärtlindring: Paracetamol 1 g × 3–4. Undvik NSAID om möjligt eller efter läkar-samråd.
- INGEN sugning, INGEN spolning, INGEN tobak första 24–48 h.
- Skonkost, kallt under första dygnet.
- AKUTKONTAKT vid: kvarstående blödning >2 h trots bettamponad och Cyklokapron, näsblödning, svullnad i halsen, andningssvårigheter.
- Återbesök 24–48 h för blödningskontroll vid risk eller stor kirurgi.

Planering: Återbesök 24–48 h för kontroll. Suturborttagning 7–10 d. Kontakt vid något ovanligt symtom.`},
  {id:'m2',label:'Bisfosfonat- eller denosumab-användning — MRONJ-prevention',behandlingTag:'extraktion bisfosfonat MRONJ',followup:'Återbesök 1 v, 4 v, 8 v för bedömning av läkning. Vid utebliven läkning — MRONJ-utredning.',
   text:`Diagnos: Tand [nr] — indikation för extraktion hos patient med bisfosfonat- eller antiresorptiv behandling (MRONJ-risk).

Anamnes:
- Aktuell antiresorptiv behandling: [Alendronat / Risedronat / Zoledronsyra iv / Pamidronat iv / Denosumab (Prolia/Xgeva)].
- Indikation för behandling: [Osteoporos / Cancer (multipelt myelom, skelettmetastas) / Pagets].
- Duration: [<3 år oralt = låg risk / >3 år oralt eller iv = hög risk].
- Senaste dos: [datum].
- Andra MRONJ-riskfaktorer: [Kortison / kemoterapi / strålbehandling / diabetes / tobak].
- Tidigare käkbensnekros eller långsam läkning: [Nej / Ja].

Status:
- Tand [nr]: [karies / parodontalt hopplös].
- Slemhinna: [u.a. / fistel / blottat ben].
- Rtg: Periapikalbild + OPG — apikal patologi, bensklerosering, sequestrum.

Riskklassifikation:
- Låg risk: Oral bisfosfonat <3 år, ingen kortison.
- Måttlig risk: Oral bisfosfonat >3 år, eller <3 år med kortison.
- Hög risk: Iv bisfosfonat (cancerindikation), denosumab vid cancer, tidigare ON av käke.

Läkarkonsult: Kontakt med behandlande läkare/onkolog/specialistklinik datum [...] — rekommendation: [...]. Vid hög risk — överväg "drug holiday" 2 mån före och 2 mån efter (kontroversiellt, individuell bedömning).

Bedömning: [Vid låg risk — extraktion möjlig på vanlig klinik med MRONJ-profylax. Vid måttlig/hög risk — remiss käkkirurg].

Samtycke: Pat. informerad om diagnos, MRONJ-risk (icke-läkande bensår, smärta, infektion), preventiva åtgärder, alternativ (konservativ rotbehandling om möjligt), prognos samt kostnad. Skriftligt samtycke. Pat. erbjuden möjligheten att avstå från extraktion.

Anestesi (välj alternativ):
[ ] Septocaine 4% med adrenalin 1:200 000 — infiltration, [antal] ml
[ ] Xylocain Dental adrenalin 2% — [antal] ml
[ ] Mepivakain 3% utan adrenalin — [antal] ml
[ ] Citanest Octapressin 3% — [antal] ml

Material använt:
- Som vid sedvanlig extraktion + extra fokus på primär förslutning.
- Klorhexidin 0,2% (Corsodyl) — preoperativ och postoperativ sköljning.
- Antibiotika preoperativt vid hög risk: Amoxicillin 1 g 1 h före + 1 g 8 h efter (eller enligt klinikens rutin), vid PcV-allergi Klindamycin 600 mg.
- Atraumatiska instrument — periotomer, fina elevatorer.
- Bonysmoothing-borr för slätning av skarpa benkanter.
- Sutur Vicryl 4-0 + extra X-tags för spänningsfri primär förslutning.

Utförande:
- Klorhexidinspolning preoperativt.
- Antibiotika preoperativt vid riskbedömning.
- LA enligt val — minimal trauma.
- Atraumatisk extraktion med periotomer — undvik lambå om möjligt.
- Kürettering av granulom.
- Skarpa benkanter slipade för spänningsfri slemhinneförslutning.
- Spongostan i alveolen.
- Tätsutur — spänningsfri primär förslutning över alveolen.
- Klorhexidinspolning slutligt.

Information om eventuella efterbesvär: Pat. informerad om:
- Förlängd läkningstid — slemhinnan ska sluta sig inom 2–4 v.
- Klorhexidin 0,2% sköljning × 2/dag i 2 v.
- Antibiotika postoperativt 7 dagar vid risk (Amoxicillin 1 g × 3 eller Klindamycin 300 mg × 3).
- AKUTKONTAKT vid: blottat ben (vit/gulaktig benblotta) i alveolen, fistel, kvarstående smärta efter 1 v, illaluktande, missfärgning.
- Återbesök 1 v, 4 v, 8 v för bedömning av läkning.
- Vid misstänkt MRONJ efter läkningstid — definitionskriterier (icke-läkt sår med blottat ben i >8 v utan strålbehandling) — direkt remiss käkkirurg.

Planering: Återbesök 1 v / 4 v / 8 v. Kontakt vid varningstecken.`},
  {id:'remiss',label:'Remiss — Käkkirurg vid hög blödningsrisk eller MRONJ-risk',behandlingTag:'remiss käkkirurg blödning MRONJ',followup:'Specialistsvar.',
   text:`REMISS — Käkkirurgisk klinik

Frågeställning: Pat. med [Warfarin INR >3,5 / dubbel trombocythämning efter STEMI senaste 12 mån / iv bisfosfonat eller denosumab vid cancer / tidigare MRONJ / hemofili eller annan koagulationssjukdom] — begäran om extraktion på specialistnivå.

Aktuell medicinering: [...].
Senaste INR eller koagulationsprover: [...].
Kontakt med behandlande läkare/onkolog: [...].

Sammanfattning: [...].

Bifogat: OPG, periapikalbild, läkemedelslista, läkarbedömning.

Kontakt: [...].`}
 ],
 extraAtgard:[
  {id:'inr',label:'INR kontrollerat',text:'INR mätt [datum] — värde [...]. Inom acceptabelt intervall (2,0–3,5).'},
  {id:'cyklokapron',label:'Cyklokapron-sköljning',text:'Tranexamsyra 100 mg/ml lokalt: 10 ml munsköljning × 4/dag i 1–2 dygn.'},
  {id:'lakarsamtal',label:'Läkarkontakt dokumenterad',text:'Behandlande läkare kontaktad datum [...] för bekräftelse av perioperativ medicinering.'},
  {id:'mronjprof',label:'MRONJ-profylax-paket',text:'Klorhexidin 0,2% preoperativt + atraumatisk teknik + primär förslutning + antibiotikaprofylax + tät uppföljning enligt riskstratifiering.'},
  {id:'antib',label:'Antibiotikaprofylax preoperativt',text:'Vid hög risk: Amoxicillin 1 g PO 1 h preoperativt; vid PcV-allergi Klindamycin 600 mg.'}
 ],
 lakemedel:'Lokalhemostas: Spongostan, CollaPlug, Cyklokapron 100 mg/ml sköljning. Smärtlindring: Paracetamol (undvik NSAID när möjligt). Antibiotika ENDAST på indikation enligt Strama 2024 + MRONJ-profylax vid riskpatient.',remissSpec:'Käkkirurg vid hög blödningsrisk eller MRONJ-risk'},

]; // END DB
