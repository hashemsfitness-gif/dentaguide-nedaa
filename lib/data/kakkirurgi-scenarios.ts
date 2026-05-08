import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface KakkirurgiScenarioData {
  id: string;
  scId: string;
  slug: string;
  title: string;
  icdCode: string;
  patientUtsaga: string;
  isAcute: boolean;
  category: "Käkkirurgi";

  snabbOversikt: Array<{ label: string; text: string }>;

  anamnes: {
    obligatoriska: Array<{ q: string; a: string }>;
    kompletterande: string[];
  };

  status: {
    inspektion: string[];
    kliniskaFynd?: string[];
  };

  behandling: {
    varning?: string;
    alternativ: Array<{
      title: string;
      indikation?: string;
      metod: string[];
    }>;
  };

  uppfoljning: { text: string };

  journal: Array<{ titel: string; text: string; tlvKoder?: string }>;

  diffDiagnoser: Array<{ namn: string; kod: string; skillnad: string }>;

  redFlags: RedFlag[];

  kliniskAnteckning: string;
  varningssignal?: string;
}

export const kakkirurgiScenarier: Record<string, KakkirurgiScenarioData> = {
  "alveolit": {
    id: "KIR-07-ALV",
    scId: "07",
    slug: "alveolit",
    title: "Alveolit (Dry Socket)",
    icdCode: "K10.3",
    patientUtsaga: "Värken kom tillbaka efter 3 dagar och smakar illa",
    isAcute: false,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Patofysiologi", text: "Fibrinolys — blodkoaglet löses upp för tidigt. INTE en primär bakteriell infektion i vävnaden, utan en läkningsstörning." },
      { label: "Tidsförlopp", text: "Dag 2–4 är det klassiska fönstret. Smärta dag 1 = normal op-smärta. Svullnad dag 4+ = troligen infektion." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När utfördes extraktionen?", a: "Dag 2–4 efter extraktion = klassiskt alveolit-fönster" },
        { q: "Är det bultande värk som tilltagit?", a: "Ja — progressiv bultande smärta typisk för alveolit" },
        { q: "Har du feber eller domningar?", a: "Feber + domning i läpp = misstänk osteomyelit omedelbart" }
      ],
      kompletterande: [
        "Dålig smak i munnen?",
        "Röker du? (Rökning ökar risken avsevärt)",
        "Hur länge har du haft smärta?"
      ]
    },
    status: {
      inspektion: [
        "Alveolen saknar koagel — blottat ben synligt i botten.",
        "Matrester och debris i alveolen.",
        "Rodnad gingivalkant utan svullnad eller pus.",
        "Ingen parestesi i underläppen (utesluter osteomyelit)."
      ]
    },
    behandling: {
      varning: "ALDRIG skrapa i alveolen (excochleation)! Förvärrar smärtan enormt och ökar risken att sprida bakterier djupt i benet.",
      alternativ: [
        {
          title: "Lokalsanering (Klinik)",
          metod: [
            "Skonsam spolning med koksalt eller 3% väteperoxid — avlägsna matrester.",
            "Applicera tamponad/kompress indränkt i Terracortril-Polymyxin B + Xylocain-salva (alt. Alvogyl).",
            "Byts varannan/var tredje dag tills smärtan vänder (ofta 1–3 byten)."
          ]
        },
        {
          title: "Smärtlindring hemma",
          metod: [
            "Paracetamol + Ibuprofen (kombination) vid behov.",
            "Undvik rökning under läkningsperioden."
          ]
        }
      ]
    },
    uppfoljning: { text: "Återbesök var 2–3 dag för byte av tamponad. Kontroll tills smärtan vänder." },
    journal: [
      {
        titel: "Mall: Alveolit",
        text: "Anamnes: Extraktion utförd för [3] dagar sedan. Tilltagande, bultande värk sedan igår. Dålig smak i munnen. Ingen feber.\nStatus: Alveol [XX] saknar koagel, blottat ben synligt i botten. Rodnad gingivalkant. Matrester i alveolen.\nIngen svullnad, ingen pus, ingen parestesi (utesluter osteomyelit).\nÅtgärd: Alveolen försiktigt renspolad med koksalt. (Ej skrapat!).\nApplicerat tamponad indränkt i Terracortril + Xylocain-salva. Omedelbar smärtlindring.\nPlanering: Återbesök om 2–3 dagar för byte av tamponad. Pat rekommenderas Paracetamol+Ibuprofen v.b.",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling (Spolning och tamponad)"
      }
    ],
    diffDiagnoser: [
      { namn: "Osteomyelit", kod: "M86.0", skillnad: "Feber + djup smärta + domning i läpp (Numb Chin). Kräver omedelbar remiss." },
      { namn: "Postoperativ infektion", kod: "T81.4", skillnad: "Svullnad + pus + feber. Behandla med incision och dränage." }
    ],
    redFlags: [
      { id: "kir-07-1", title: "Osteomyelit-misstanke", description: "Feber + djup smärta + domning i läpp (Numb Chin) = kräver omedelbar remiss.", severity: "critical" },
      { id: "kir-07-2", title: "Utebliven förbättring", description: "Om smärtan inte minskar efter 3 tamponadbyten → remiss käkkirurg.", severity: "warning" }
    ],
    kliniskAnteckning: "Packa tamponad — SKRAPA ALDRIG. Ingen antibiotika rutinmässigt vid ren alveolit.",
    varningssignal: "Numb Chin + feber = uteslut osteomyelit omedelbart"
  },

  "postoperativ-blodning": {
    id: "KIR-21-BLOD",
    scId: "21",
    slug: "postoperativ-blodning",
    title: "Postoperativ blödning",
    icdCode: "T81.0",
    patientUtsaga: "Det slutar inte blöda efter tandutdragningen",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Riskfaktorer", text: "Antikoagulantia (Waran INR ≤3.5–4.0 OK med lokala åtgärder), NOAK (Eliquis, Xarelto), Trombyl." },
      { label: "OBS NSAID", text: "Ibuprofen/Ipren hämmar trombocytaggregationen — ökar blödningsrisken!" }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vilka mediciner tar du?", a: "Antikoagulantia = ökad risk. Fråga specifikt om Waran, Eliquis, Xarelto, Trombyl" },
        { q: "Har du tagit Ipren/Ibuprofen?", a: "NSAID hämmar trombocytaggregation — undvika vid blödning" },
        { q: "Är du allmänpåverkad?", a: "Svaghet/yrsel kan tyda på signifikant blodförlust" }
      ],
      kompletterande: [
        "Leversjukdom eller koagulationsstörning?",
        "Har du bitit på kompressen kontinuerligt?"
      ]
    },
    status: {
      inspektion: [
        "Riklig blödning från mjukvävnadskant eller alveol.",
        "Leverkoagel: mörkt, geléliknande, hänger över alveolen men läcker underifrån.",
        "Identifiera blödningskälla: ben vs mjukvävnad."
      ]
    },
    behandling: {
      varning: "Använd lokalanestesi UTAN adrenalin (t.ex. Mepivakain). Adrenalin ger vasokonstriktion som maskerar blödningen tillfälligt — börjar blöda igen hemma!",
      alternativ: [
        {
          title: "Hemostas-protokoll (Klinik)",
          metod: [
            "Sug ut allt leverkoagel — du måste se blödningskällan.",
            "Applicera Surgicel (oxiderad cellulosa) eller Spongostan dränkt i Cyklokapron (Tranexamsyra) i alveolen.",
            "Lägg tät kryssutur (Vicryl 4-0) över alveolen.",
            "Låt patienten bita hårt på kompress (dränkt i Cyklokapron) i 20–30 min på kliniken.",
            "Skicka EJ hem förrän blödningen är torr!"
          ]
        },
        {
          title: "Hemgångsinstruktion",
          metod: [
            "Hög huvudända i natt.",
            "Undvik fysisk ansträngning i 24 timmar.",
            "Recept Cyklokapron munskölj vid behov."
          ]
        }
      ]
    },
    uppfoljning: { text: "Pat stannar på kliniken tills torrt. Uppföljning vid behov." },
    journal: [
      {
        titel: "Mall: Postoperativ blödning",
        text: "Anamnes: Extraktion utförd [datum]. Blött ihållande sedan dess. Pat tar [Waran/Eliquis / Inga lm]. Ej allmänpåverkad.\nStatus: Riklig blödning från mjukvävnadskanten/alveol [XX]. Stort leverkoagel avlägsnat.\nÅtgärd: Sugning. Infiltration Mepivakain (u. adrenalin). Hemostas: Applicerat [Surgicel/Spongostan] i alveol. Suturerat [1] st Vicryl 4-0 kryssutur. Kompression med kompress dränkt i Cyklokapron 20 min.\nResultat: Blödning stillad (torrt) vid hemgång.\nInfo: Hög huvudända i natt. Undvik fysisk ansträngning. [Recept Cyklokapron munskölj utfärdat].",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling (Stillande av blödning / Suturering)"
      }
    ],
    diffDiagnoser: [
      { namn: "Koagulationsrubbning", kod: "D68.9", skillnad: "Blödning trots adekvata åtgärder → lab-prover och läkarkontakt." }
    ],
    redFlags: [
      { id: "kir-21-1", title: "Allmänpåverkan vid blödning", description: "Svimningskänsla/yrsel = signifikant blodförlust. Ring 112.", severity: "critical" },
      { id: "kir-21-2", title: "NSAID-interaktion", description: "Ibuprofen/Ipren hämmar trombocyter — aldrig ge till blödande patient.", severity: "critical" }
    ],
    kliniskAnteckning: "LA utan adrenalin (Mepivakain). Sug ut koaglet. Cyklokapron + kryssutur.",
    varningssignal: "⚠️ LA UTAN adrenalin — adrenalin maskerar blödning och återkommer hemma!"
  },

  "sinuskommunikation": {
    id: "KIR-22-SINUS",
    scId: "22",
    slug: "sinuskommunikation",
    title: "Sinuskommunikation",
    icdCode: "T81.8",
    patientUtsaga: "Det bubblar i såret när jag andas / Vatten kommer ut genom näsan",
    isAcute: false,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Valsalvas test", text: "Håll för näsan, be patienten blåsa ut. Bubblor ur alveolen = positiv kommunikation!" },
      { label: "SONDERA ALDRIG", text: "Sondera aldrig djupt i en alveol om sinuskommunikation misstänks — du kan iatrogent spräcka schneiderianmembranet." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Bubblar det i såret vid andning?", a: "Klassiskt tecken på oroantral kommunikation" },
        { q: "Rinner det vatten/vätska ut ur näsan?", a: "Bekräftar direkt kommunikation med sinusgolvet" },
        { q: "Vilken tand drogs ut?", a: "ÖK-premolarer/molarer har nära relation till sinus maxillaris" }
      ],
      kompletterande: [
        "Tidigare sinusproblem?",
        "Feber eller smärta i kinden?"
      ]
    },
    status: {
      inspektion: [
        "Valsalva: Håll för näsan, be patienten 'blåsa ut'. Bubblor i blodet = positivt test.",
        "Kontrollera röntgen (periapikalt/OPG) för sinusrelation och ev. rotfragment.",
        "Bedöm kommunikationens storlek: < 2 mm (liten) vs > 2 mm (stor)."
      ]
    },
    behandling: {
      varning: "Snytförbud i 10–14 dagar. Nysning MÅSTE ske med ÖPPEN mun. Sätt in nässpray (Nezeril) i 7 dagar.",
      alternativ: [
        {
          title: "Alt A: Liten kommunikation (< 2 mm)",
          indikation: "Läker ofta spontant om koaglet får vara ifred.",
          metod: [
            "Säkerställ bra blodkoagel i alveolen (ev. Spongostan).",
            "Kryssutur för att hålla koaglet på plats.",
            "Amoxicillin 500 mg x 3 i 7 dagar som profylax."
          ]
        },
        {
          title: "Alt B: Stor kommunikation (> 2 mm)",
          indikation: "Kräver kirurgisk slutning.",
          metod: [
            "Rehrmann-plastik: Periostsnitt för att mobilisera buckal lambå.",
            "Slut lambån spänningsfritt mot palatinal vävnad.",
            "Om kompetens saknas: Lägg tamponad, suturera tillfälligt och remittera akut till käkkirurg."
          ]
        }
      ]
    },
    uppfoljning: { text: "Suturtagning och kontroll om 1–2 veckor. Kontrollera att sinus är fri." },
    journal: [
      {
        titel: "Mall: Sinuskommunikation",
        text: "Status: Efter extraktion av [XX] noterades bubblor i alveolen.\nTest: Valsalva positivt (luftpassage bekräftad). Kommunikation bedöms som [liten/stor]. Ingen rot i sinus (rtg ua).\nÅtgärd: [Alt A: Suturering av alveol med kryssutur Vicryl 4-0].\n[Alt B: Rehrmann-plastik utförd. Mobilisering av buckal lambå genom periostsnitt. Spänningsfri slutning mot palatinal vävnad].\nFarmaka: Amoxicillin 500 mg x 3 i 7 dgr + Nezeril nässpray.\nInfo: Snytförbud i 14 dagar. Nysa med öppen mun.\nPlanering: Suturtagning och kontroll om 1–2 veckor.",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling | 404 Mjukdelsplastik/Lambå (vid Rehrmann)"
      }
    ],
    diffDiagnoser: [
      { namn: "Sinuit (sekundär)", kod: "J32.0", skillnad: "Om kommunikation förblir öppen → kronisk sinuit riskerar uppstå." }
    ],
    redFlags: [
      { id: "kir-22-1", title: "Rot i sinus", description: "En rot lämnas aldrig i sinus — risk för kronisk aspergillosis/sinuit. Remiss käkkirurg.", severity: "critical" },
      { id: "kir-22-2", title: "Nysförbud ignoreras", description: "Nysning med stängd mun kan spräcka suturerna och skapa oroantral fistel.", severity: "warning" }
    ],
    kliniskAnteckning: "Valsalva ALLTID vid ÖK-molar. Snytförbud 14 dagar. Nezeril 7 dagar. Amoxicillin.",
    varningssignal: "⚠️ Rot kvar i sinus = Remiss käkkirurg omedelbart"
  },

  "postoperativ-infektion": {
    id: "KIR-23-INFEK",
    scId: "23",
    slug: "postoperativ-infektion",
    title: "Postoperativ infektion",
    icdCode: "T81.4",
    patientUtsaga: "Det har svullnat upp igen och jag har fått feber",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Infektion vs Alveolit", text: "Infektion: svullnad + pus + feber. Håll ÖPPET för dränage. Alveolit: blottat ben utan svullnad. Packa tamponad." },
      { label: "Antibiotika Strama", text: "Pus = Incision ALLTID. Antibiotika är komplement vid feber, trismus eller snabb spridning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Har du feber och allmänpåverkan?", a: "Feber + trismus + spridning = indikation för antibiotika" },
        { q: "Tilltar svullnaden?", a: "Snabb progredierande svullnad = risk för luftvägsengagemang" },
        { q: "Kan du gapa normalt?", a: "Trismus indikerar muskelengagemang / djup infektion" }
      ],
      kompletterande: [
        "Nedsatt immunförsvar (diabetes, kortison)?",
        "Svullnad mot halsen eller halsregionen?"
      ]
    },
    status: {
      inspektion: [
        "Svullnad och rodnad i omslagsvecket — identifiera fluktuation.",
        "Pus sipprar från alveolen eller suturlinjen.",
        "Trismus (begränsad gapförmåga) = muskelinvolvement.",
        "Lymfkörtlar palperas submandibulärt."
      ],
      kliniskaFynd: [
        "Fluktuation = abscess redo för incision",
        "Trismus = djupare utbredning",
        "Feber > 38°C = systemisk reaktion"
      ]
    },
    behandling: {
      varning: "Den primära åtgärden vid infektion är DRÄNAGE. Antibiotika ersätter ALDRIG mekaniskt dränage.",
      alternativ: [
        {
          title: "Incision och Dränage",
          metod: [
            "Lokalanestesi (ofta blockad — infiltration i infektion tar dåligt pga lågt pH).",
            "Identifiera fluktuation. Incidera abscessen.",
            "Vidga försiktigt med peang. Låt pus tömmas.",
            "Håll såret ÖPPET (gummidrän/laska) — TILL SKILLNAD FRÅN ALVEOLIT."
          ]
        },
        {
          title: "Antibiotika (Strama 2024)",
          indikation: "Feber + allmänpåverkan, trismus, snabb spridning eller immunsuppression.",
          metod: [
            "Förstahandsval: PcV (Fenoximetylpenicillin) 1,6 g x 3 i 5–7 dagar.",
            "Vid allergi: Klindamycin.",
            "Antibiotika är KOMPLEMENT till dränage, inte alternativ."
          ]
        }
      ]
    },
    uppfoljning: { text: "Återbesök om 2 dagar för avlägsnande av drän och kontroll av förlopp." },
    journal: [
      {
        titel: "Mall: Postoperativ infektion",
        text: "Anamnes: Extraktion utförd för 4 dgr sedan. Tilltagande svullnad, feber (38.2) och allmänpåverkan.\nStatus: Svullnad och rodnad i omslagsvecket regio [XX]. Fluktuerande abscess. Pus sipprar från alveolen. Lätt trismus.\nÅtgärd: LA [Mandibularblockad]. Incision utförd i omslagsvecket. Rikligt med pus dränerat. Sköljning med koksalt. Gummidrän (laska) inlagt och suturerat för att hålla öppet.\nFarmaka: Kåvepenin 1,6 g x 3 i 5–7 dagar (Strama).\nPlanering: Återbesök om 2 dgr för avlägsnande av drän och kontroll.",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling | 402 Incision/Abscessdränage"
      }
    ],
    diffDiagnoser: [
      { namn: "Alveolit", kod: "K10.3", skillnad: "Blottat ben, ingen svullnad, ingen pus. Packa tamponad." },
      { namn: "Osteomyelit", kod: "M86.0", skillnad: "Djupare, mer diffus, drabbar ben. Domning i läpp." }
    ],
    redFlags: [
      { id: "kir-23-1", title: "Luftvägsengagemang", description: "Svullnad mot munbotten eller hals = Ludwig's angina. Ring 112 omedelbart.", severity: "critical" },
      { id: "kir-23-2", title: "Ingen förbättring 48h", description: "Utebliven förbättring trots dränage + antibiotika → remiss akutklinik.", severity: "warning" }
    ],
    kliniskAnteckning: "Incision ALLTID. PcV 1,6g x 3 (ej 1g — underdos!). Håll ÖPPET med drän.",
    varningssignal: "⚠️ Ludwig's angina: Svullnad mot munbotten = Ring 112"
  },

  "dislocerad-rot": {
    id: "KIR-24-DISLOC",
    scId: "24",
    slug: "dislocerad-rot",
    title: "Dislocerad tand/rot",
    icdCode: "T81.8 / S03.2",
    patientUtsaga: "Roten försvann plötsligt / Tanden åkte upp i bihålan",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Grundregel", text: "Rota ALDRIG i blindo! Att söka utan direktsyn trycker roten djupare in i sinus eller ner i munbotten." },
      { label: "Typer", text: "Sinusdislokation (vanligast, ÖK-molarer), Munbottendislokation (UK-molarer, lingualt), Fossa infratemporalis (sällsynt)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vilken tand extraherades?", a: "ÖK-premolarer/molarer = sinusrisk. UK-molarer = munbottenrisk" },
        { q: "Försvann roten/tanden utan motstånd?", a: "Plötsligt försvinnande utan utdragning = sannolikt dislokation" },
        { q: "Bubblar det eller rinner vätska ur näsan?", a: "Bekräftar sinuskommunikation" }
      ],
      kompletterande: [
        "Röntgenbild tagen?",
        "Kan patienten gapa normalt?"
      ]
    },
    status: {
      inspektion: [
        "Rot/tand ej synlig i alveolen.",
        "Valsalva-test för sinuskommunikation.",
        "Röntgen (OPG/periapikalt) obligatorisk för att bekräfta lokalisation.",
        "Bedöm om rot är i sinus, munbotten eller fossa infratemporalis."
      ]
    },
    behandling: {
      varning: "Rota ALDRIG i blindo! Avbryt extraktionen. Ta röntgen. Remittera till käkkirurg.",
      alternativ: [
        {
          title: "Dislokation till sinus maxillaris",
          metod: [
            "Bekräfta med Valsalva-test och röntgenbild (periapikalt/OPG).",
            "Suturera över alveolen (kryssutur/lambå) för att stänga kommunikationen akut.",
            "Antibiotika (Amoxicillin 500 mg x 3 i 7 dagar) + nässpray (Nezeril) + snytförbud.",
            "Akut remiss till käkkirurg — roten tas ut via Caldwell-Luc. En rot lämnas ALDRIG i sinus (risk för kronisk sinuit/aspergillosis)."
          ]
        },
        {
          title: "Dislokation till munbotten/sublingualt",
          metod: [
            "Försök EJ avlägsna utan direktsikt — risk för skada på n. lingualis och kärlstrukturer.",
            "Suturera slemhinnan, ge antibiotika, remittera käkkirurg."
          ]
        }
      ]
    },
    uppfoljning: { text: "Käkkirurg planerar definitiv åtgärd (Caldwell-Luc eller annan teknik)." },
    journal: [
      {
        titel: "Mall: Dislocerad rot",
        text: "Under extraktion dislocerades [palatinala] roten. Rot ej längre synlig i alveolen.\nRtg bekräftar rotfragment beläget i [sinus maxillaris].\nTest: Valsalva positivt (luftpassage bekräftad).\nÅtgärd: Extraktionen avbröts. Alveolen suturerades med kryssutur för att initialt stänga kommunikationen.\nFarmaka: Amoxicillin 500 mg x 3 i 7 dgr + Nezeril. Snytförbud 14 dagar.\nRemiss: Akut/snar remiss utfärdad till Käkkirurg.",
        tlvKoder: "103/107 Akut bedömning | 011/130 Röntgen | 301 Sjukdomsbehandling / Suturering / Remisshantering"
      }
    ],
    diffDiagnoser: [
      { namn: "Rotfraktur kvar i alveolen", kod: "S02.5", skillnad: "Rot i alveolbotten, ej tryckt in i sinus. Kan ev. lämnas om ofarlig lokalisation." }
    ],
    redFlags: [
      { id: "kir-24-1", title: "Rot i sinus", description: "LÄMNAS ALDRIG. Risk för kronisk sinuit och aspergillosis. Remiss käkkirurg omedelbart.", severity: "critical" },
      { id: "kir-24-2", title: "Rot i munbotten", description: "Rota aldrig i blindo — risk för kärlskada och nervskada (n. lingualis).", severity: "critical" }
    ],
    kliniskAnteckning: "Avbryt extraktion. Röntgen obligatorisk. Remiss käkkirurg. Aldrig leta i blindo.",
    varningssignal: "⚠️ Rot i sinus: Remiss käkkirurg — rot lämnas ALDRIG kvar"
  },

  "nervpavverkan": {
    id: "KIR-25-NERV",
    scId: "25",
    slug: "nervpavverkan",
    title: "Nervpåverkan (Parestesi)",
    icdCode: "T81.8 / G50.1",
    patientUtsaga: "Bedövningen har fortfarande inte släppt / Det sticker i läppen",
    isAcute: false,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Berörda nerver", text: "N. alveolaris inferior (underläpp/haka), N. lingualis (tunga/smak), N. mentalis (haka/läpp vid foramen mentale)." },
      { label: "Tidslinje", text: "Aldrig: Mekaniskt trauma vid ingrepp. Timmar: Kompression av hematom (reversibel). Dagar: Infektion." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kom domningen direkt under ingreppet?", a: "Direkt = mekanisk skada (värre prognos). Senare = hematom eller infektion (bättre prognos)" },
        { q: "Var det en elektrisk stöt under injektionen?", a: "Elektrisk stöt vid mandibularblockad = intraneuralt läge! Dra omedelbart tillbaka kanylen" },
        { q: "Känner du beröring/smärta i läpp/tunga?", a: "Bedöm grad: total anestesi (sämst) vs parestesi/hypestesi (bättre prognos)" }
      ],
      kompletterande: [
        "Infektion/svullnad kvar?",
        "Finns kliniska fynd intraoralt?"
      ]
    },
    status: {
      inspektion: [
        "Sensibilitetstest med trubbig sond: Beröring? Vasst vs trubbigt?",
        "Dokumentera utbredning — rita en karta i journalen.",
        "Kontrollera att infektion eller svullnad som kan komprimera nerven är åtgärdad."
      ],
      kliniskaFynd: [
        "Total anestesi = nervavslitning (värre)",
        "Parestesi/stickningar = nerven håller på att återhämta sig",
        "Hypoestesi = delvis skada"
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Akut handläggning",
          metod: [
            "Kartlägg utbredningen med trubbig sond. Dokumentera noggrant.",
            "Info: Parestesi (stickningar) = god prognos, nerven 'hittar tillbaka'.",
            "Varna för bitskador och brännskador (varmt kaffe) — skyddsreflexen saknas.",
            "Vid total nervavslitning (nerven syntes trasig): Remiss käkkirurg inom 24–48h för mikrokirurgisk nervsutur."
          ]
        },
        {
          title: "Uppföljning",
          metod: [
            "Telefonuppföljning 1 vecka.",
            "Om utebliven bättring → röntgen och remiss.",
            "Invaliditetsbedömning görs 2 år efter skadetillfället (Patientförsäkringen LÖF)."
          ]
        }
      ]
    },
    uppfoljning: { text: "Kontroll var 4:e vecka. Vid utebliven bättring → remiss käkkirurg och utred (MRI)." },
    journal: [
      {
        titel: "Mall: Postoperativ parestesi",
        text: "Anamnes: Efter op av [48] för [2 dgr] sedan har känseln ej återkommit i höger underläpp/haka. Ingen smärta.\nStatus: Sensibilitetstest utfört. Hypestesi (nedsatt känsel) i hela höger underläpp och haka (N. alveolaris inf). Tungan normal känsel (N. lingualis intakt). Känner djupt tryck men ej vasst. Ingen infektion/svullnad.\nBedömning: Postoperativ parestesi, sannolikt pga [kärlkramp/hematom/trauma under op].\nÅtgärd: Utbredning kartlagd och inritad. Pat lugnad (oftast reversibelt). Varnad för bitskador/brännskador.\nPlanering: Telefonuppföljning 1 vecka. Rtg/Remiss vid utebliven bättring.",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling / Kartläggning"
      }
    ],
    diffDiagnoser: [
      { namn: "Numb Chin Syndrome", kod: "G50.1", skillnad: "Domning utan föregående tandvård = uteslut malignitet/metastas. Omedelbar medicinsk utredning!" }
    ],
    redFlags: [
      { id: "kir-25-1", title: "Elektrisk stöt vid injektion", description: "Dra tillbaka kanylen OMEDELBART! Injicera ej mer — intraneuralt läge spräcker nervfibrer.", severity: "critical" },
      { id: "kir-25-2", title: "Numb Chin Syndrome", description: "Domning utan tandvårdsorsak = uteslut malignitet/metastas akut.", severity: "critical" }
    ],
    kliniskAnteckning: "Elektrisk stöt = dra tillbaka kanylen direkt. Numb Chin utan tandvård = remiss omedelbart.",
    varningssignal: "⚠️ Numb Chin utan tandvårdsorsak = Uteslut malignitet"
  },

  "tuberfraktur": {
    id: "KIR-27-TUBER",
    scId: "27",
    slug: "tuberfraktur",
    title: "Tuberfraktur",
    icdCode: "S02.4 / T81.8",
    patientUtsaga: "Benfragment lossnar vid extraktion av sista molaren i överkäken",
    isAcute: false,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Etiologi", text: "Tuber maxillae frakturerar när benet är tunt (stor sinusutbredning) och molaren sitter hårt fast (divergerande rötter, ankylos)." },
      { label: "STOPP-regel", text: "Om benet rör sig med tanden — BRYT INTE MER! Fortsatt kraft = massiv blödning + sinuskommunikation." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kände du att benet rörde sig med tanden?", a: "Benet som rör sig = tuberfraktur, avbryt omedelbart" },
        { q: "Stör tanden bettet nu?", a: "Viktigt för att avgöra om reponering lyckades" },
        { q: "Bubblar det vid andning?", a: "Sinuskommunikation som komplikation" }
      ],
      kompletterande: [
        "Röntgenbild tagen preoperativt?",
        "Visdomstand med nära sinusrelation?"
      ]
    },
    status: {
      inspektion: [
        "Benfragment synligt fäst på tandens rötter.",
        "Bedöm storlek: Liten (ej in i sinus) vs Stor (involverar sinus).",
        "Kontrollera ocklusionen efter reponering.",
        "Valsalva-test om sinusengagemang misstänks."
      ]
    },
    behandling: {
      varning: "STOPP! Fortsätt inte bryta om benet rör sig — massiv blödning (a. palatina) och sinuskommunikation riskeras.",
      alternativ: [
        {
          title: "Liten fraktur (Ej in i sinus)",
          metod: [
            "Lossa tanden försiktigt från mjukvävnaden med skalpell/raspartorium.",
            "Ta ut tanden med benfragmentet fäst på rötterna.",
            "Suturera mjukvävnaden tätt."
          ]
        },
        {
          title: "Stor fraktur (Involverar sinus)",
          metod: [
            "Reponera: Tryck tillbaka tanden och benfragmentet in i alveolen.",
            "Stabilisera: Låt pat bita ihop (ev. kompositsplint mot granntand).",
            "Avvakta 4–6 veckor för läkning.",
            "Definitiv åtgärd: Operativ extraktion (friläggning + borrning) eller remiss käkkirurg."
          ]
        }
      ]
    },
    uppfoljning: { text: "Läkningskontroll om 2 veckor. Operativ extraktion planeras om 4–6 veckor." },
    journal: [
      {
        titel: "Mall: Tuberfraktur",
        text: "Vid luxation av [28] noterades att benet (tuber maxillae) rörde sig med tanden. Kraftigt bendebris/motstånd.\nÅtgärd: Extraktionen avbröts direkt. Tanden och benfragmentet reponerades på plats med digitalt tryck. Ocklusion kontrollerad u.a.\n[Alt: Liten fraktur: Tanden och fragmentet lossades från gingivan och extraherades. Alveol suturerades].\nInfo: Skonkost i 2–4 veckor. Undvik att gapa stort.\nPlanering: Läkningskontroll 2 veckor. Operativt avlägsnande (borrning) om 4–6 veckor [eller remiss].",
        tlvKoder: "103/107 Akut bedömning | 301 Sjukdomsbehandling (Reponering) | 401 Extraktion (om utförd)"
      }
    ],
    diffDiagnoser: [
      { namn: "Alveolär benfraktur", kod: "S02.4", skillnad: "Fraktur av alveolärt ben utan tuber-engagemang. Ofta vid frontalt trauma." }
    ],
    redFlags: [
      { id: "kir-27-1", title: "Massiv blödning a. palatina", description: "Att riva ut stort tuberfragment kan ge massiv blödning. Avbryt och reponera.", severity: "critical" },
      { id: "kir-27-2", title: "Sinuskommunikation", description: "Stor tuberfraktur öppnar ofta mot sinus — Valsalva-test obligatoriskt.", severity: "warning" }
    ],
    kliniskAnteckning: "STOPP om benet rör sig. Liten fraktur: extr. direkt. Stor fraktur: reponera + vänta 4–6v.",
    varningssignal: "⚠️ STOPP vid rörligt ben — fortsatt kraft ger massiv blödning"
  }
};
