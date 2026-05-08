import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface KirurgiScenarioData {
  id: string;
  scId: string; // Exact numbering: 07, 21, 22, 23, 24, 25, 27
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

  journal: Array<{ titel: string; text: string }>;

  diffDiagnoser: Array<{ namn: string; kod: string; skillnad: string }>;

  redFlags: RedFlag[];
  
  kliniskAnteckning: string;
  varningssignal?: string;
}

export const kirurgiScenarier: Record<string, KirurgiScenarioData> = {
  "alveolit": {
    scId: "07",
    id: "KIR-07-ALV",
    slug: "alveolit",
    title: "Alveolit (Torr alveol)",
    icdCode: "K10.3",
    patientUtsaga: "Värken kom tillbaka efter 3 dagar och smakar illa.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Definition", text: "Läkningsstörning (fibrinolys) där koaglet löses upp för tidigt." },
      { label: "Tidsfönster", text: "Debut klassiskt dag 2–5 postoperativt." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När utfördes extraktionen?", a: "Typiskt 2–5 dagar sedan." },
        { q: "Hur känns smärtan?", a: "Intensiv, bultande, strålande." },
        { q: "Dålig smak/lukt?", a: "Ja, fetor ex ore är vanligt." }
      ],
      kompletterande: [
        "Feber? (Uteslut infektion)",
        "Domningar? (Uteslut osteomyelit)",
        "Rökning? (Ökad risk)"
      ]
    },
    status: {
      inspektion: [
        "Tom alveol utan koagel.",
        "Gråaktiga väggar, blottat ben.",
        "Fetor ex ore.",
        "Ingen extraoral svullnad."
      ]
    },
    behandling: {
      varning: "SKRAPA ALDRIG i alveolen för att framkalla ny blödning — det förvärrar smärtan.",
      alternativ: [
        {
          title: "Lokalsanering",
          metod: [
            "Försiktig spolning med koksalt/väteperoxid (3%) för att avlägsna debris.",
            "Applicera Alvogyl-förband eller tamponad med Terracortril + Xylocain."
          ]
        },
        {
          title: "Farmakologi",
          metod: [
            "Analgetika: Paracetamol + Ibuprofen i kombination.",
            "EJ antibiotika rutinmässigt (lokal behandling räcker)."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Alveolit",
        text: "Anamnes: Extraktion [XX] utförd för [3] dagar sedan. Tilltagande bultande värk sedan igår. Dålig smak. Ingen feber.\nStatus: Alveol [XX] saknar koagel, blottat ben i botten. Ingen pus eller extraoral svullnad. Ingen parestesi.\nBedömning: Alveolit (Dry socket).\nÅtgärd: Alveolen försiktigt renspolad. Applicerat Alvogyl-förband. Omedelbar smärtlindring.\nPlan: Återbesök om 2-3 dagar för byte vb. Rek. analgetika."
      }
    ],
    diffDiagnoser: [
      { namn: "Postoperativ infektion", kod: "T81.4", skillnad: "Feber, svullnad, pus." },
      { namn: "Osteomyelit", kod: "M86.0", skillnad: "Djup smärta, domningar (Numb chin)." }
    ],
    redFlags: [
      { id: "kir-07-1", title: "Osteomyelit-misstanke", description: "Feber, djup smärta och domningar (Numb chin) -> Remiss.", severity: "critical" }
    ],
    kliniskAnteckning: "EJ antibiotika rutinmässigt — lokal spolning + förband"
  },
  "postop-bloedning": {
    scId: "21",
    id: "KIR-21-BLOD",
    slug: "postop-bloedning",
    title: "Postoperativ blödning",
    icdCode: "T81.0",
    patientUtsaga: "Det slutar inte blöda efter tandutdragningen.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Akut", text: "AKUT handläggning vid kraftig blödning." },
      { label: "Risk", text: "Antikoagulantia (Waran/NOAK) och leverkoagel." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Tar du blodförtunnande mediciner?", a: "Waran (kontrollera INR), NOAK (Eliquis/Xarelto), Trombyl." },
        { q: "Hur länge har du komprimerat?", a: "> 30 min krävs oftast." },
        { q: "Varifrån blöder det?", a: "Svalgblödning är livshotande." }
      ],
      kompletterande: [
        "Nyligen tagit NSAID (Ipren)?",
        "Känd koagulationssjukdom?",
        "Lever- eller njursvikt?"
      ]
    },
    status: {
      inspektion: [
        "Riklig blödning från mjukvävnad eller ben.",
        "Stort, mörkt leverkoagel som läcker underifrån.",
        "Tecken på cirkulationspåverkan? (Blekhet, yrsel)."
      ]
    },
    behandling: {
      varning: "Svalgblödning = 112 direkt! Använd LA UTAN adrenalin (adrenalin maskerar blödningen tillfälligt).",
      alternativ: [
        {
          title: "Hemostas (Steg-för-steg)",
          metod: [
            "Sug ut allt leverkoagel för att se källan.",
            "Komprimera med gaskompresser i 20 minuter.",
            "Vid svikt: Applicera Surgicel eller Spongostan dränkt i Cyklokapron.",
            "Suturera tätt (kryssutur)."
          ]
        },
        {
          title: "Farmakologi",
          metod: [
            "Cyklokapron 500mg lokalt (Tranexamsyra).",
            "Eventuellt recept på Cyklokapron munskölj."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Postop blödning",
        text: "Anamnes: Extraktion [XX] utförd [datum]. Blött ihållande sedan dess. Pat tar [Waran/Eliquis].\nStatus: Riklig blödning från alveol [XX]. Stort leverkoagel avlägsnat.\nÅtgärd: Sugning. Infiltration Mepivakain (u. adrenalin). Hemostas via Surgicel och tät kryssutur Vicryl 4-0. Kompression 20 min.\nResultat: Blödning stillad vid hemgång. Info om hög huvudända och snytförbud."
      }
    ],
    diffDiagnoser: [
      { namn: "Sekundär blödning (infektion)", kod: "T81.0", skillnad: "Debuterar ofta efter några dagar, luktar illa." }
    ],
    redFlags: [
      { id: "kir-21-1", title: "Svalgblödning", description: "Ring 112 OMGÅENDE vid blödning mot svalget.", severity: "critical" },
      { id: "kir-21-2", title: "Kraftig blödning > 30 min", description: "Om kompression ej hjälper -> Läkare/sjukhus.", severity: "critical" },
      { id: "kir-21-3", title: "Antikoagulantia", description: "Waran/NOAK -> Kontrollera INR/koagulationsstatus.", severity: "warning" }
    ],
    kliniskAnteckning: "Cyklokapron 500mg lokalt vid utebliven effekt av kompression"
  },
  "sinuskommunikation": {
    scId: "22",
    id: "KIR-22-SINUS",
    slug: "sinuskommunikation",
    title: "Sinuskommunikation",
    icdCode: "J34.8",
    patientUtsaga: "Det bubblar i såret när jag andas / vatten i näsan.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Diagnos", text: "Oroantral kommunikation efter extraktion i ÖK." },
      { label: "Test", text: "Valsalvas test (positivt vid luftpassage)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Bubblar det när du andas?", a: "Ja, typiskt tecken." },
        { q: "Vatten i näsan vid dryck?", a: "Ja, indikerar passage." }
      ],
      kompletterande: [
        "Sinuit-symtom tidigare?",
        "Tidigare rökare? (Tunnare slemhinna)"
      ]
    },
    status: {
      inspektion: [
        "Öppning i alveolbotten.",
        "Bubblor i blodet vid utandning genom näsan.",
        "Positivt Valsalvas test."
      ]
    },
    behandling: {
      varning: "Sondera ALDRIG djupt i alveolen (kan spräcka membranet iatrogent). Snytförbud 14 dagar!",
      alternativ: [
        {
          title: "Storleksbaserad handläggning",
          metod: [
            "< 2mm: Koagel + sutur av gingiva + instruktioner.",
            "2-5mm: Suturering av gingiva + koagel/spongostan.",
            "> 5mm: Kollagen-förband + remiss till käkkirurg (Rehrmann-plastik)."
          ]
        },
        {
          title: "Farmakologi",
          metod: [
            "Avsvällande näsdroppar (Nezeril) 7-10 dagar.",
            "Amoxicillin (500mg x 3 i 7d) vid säkerställd kommunikation."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Sinuskommunikation",
        text: "Anamnes: Efter extraktion av [XX] noterades bubblor i alveolen. Vatten i näsan.\nStatus: Valsalvas test positivt. Kommunikation bedöms vara [X] mm.\nÅtgärd: Alveol suturerad. Recept: Amoxicillin 500mg x 3 i 7 dgr samt Nezeril.\nInfo: Snytförbud 14 dagar. Nysa med öppen mun."
      }
    ],
    diffDiagnoser: [
      { namn: "Akut sinuit", kod: "J01.0", skillnad: "Smärta vid framåtlutning, ingen extraktion." }
    ],
    redFlags: [
      { id: "kir-22-1", title: "Kommunikation > 2mm", description: "Kräver plastik akut/snarast.", severity: "warning" },
      { id: "kir-22-2", title: "Kronisk fistel > 2v", description: "Remiss till specialist.", severity: "warning" }
    ],
    kliniskAnteckning: "Röntgenverifiering ALLTID vid misstänkt sinuskommunikation"
  },
  "postop-infektion": {
    scId: "23",
    id: "KIR-23-INFEK",
    slug: "postop-infektion",
    title: "Postoperativ infektion",
    icdCode: "T81.4",
    patientUtsaga: "Svullnat upp igen och feber 3-4 dagar efter ingrepp.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Status", text: "Extraoral svullnad, trismus, pus och feber." },
      { label: "Åtgärd", text: "Dränage är primär behandling." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Har du feber?", a: "> 38.5°C tyder på systemisk spridning." },
        { q: "Kan du gapa normalt?", a: "Trismus indikerar spridning mot tuggmuskler/spatia." },
        { q: "Svårt att svälja/andas?", a: "Varningssignal för luftvägspåverkan." }
      ],
      kompletterande: [
        "När kom svullnaden? (Typiskt dag 3-5)",
        "Dåligt immunförsvar/Diabetes?"
      ]
    },
    status: {
      inspektion: [
        "Extraoral svullnad (rodnad, värmeökad).",
        "Intraoral abscess (fluktuerande).",
        "Pus-tömning från alveol.",
        "Trismus (gapförmåga < 20mm)."
      ]
    },
    behandling: {
      varning: "Trismus + extraoral svullnad = Sjukhus AKUT (risk för spridning till djupa spatia).",
      alternativ: [
        {
          title: "Dränage (Incision)",
          metod: [
            "Identifiera fluktuation. Incidera abscessen.",
            "Spola rent. Lägg in laska/drän för att hålla öppet."
          ]
        },
        {
          title: "Farmakologi (Strama)",
          metod: [
            "PcV 1.6g x 3 i 5-7d (vid feber/allmänpåverkan).",
            "Klindamycin 150mg x 3 vid penicillinallergi."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Postop infektion",
        text: "Anamnes: Extraktion [XX] utförd 4 dgr sedan. Tilltagande svullnad och feber (38.4).\nStatus: Fluktuerande abscess regio [XX]. Pus tömmer vid tryck. Lätt trismus.\nÅtgärd: Incision och dränage. Spolning NaCl. Recept: PcV 1.6g x 3 i 7 dgr.\nPlan: Kontroll om 2 dagar för drändragning."
      }
    ],
    diffDiagnoser: [
      { namn: "Alveolit", kod: "K10.3", skillnad: "Ingen feber eller extraoral svullnad." }
    ],
    redFlags: [
      { id: "kir-23-1", title: "Trismus + Svullnad", description: "Risk för luftvägshinder -> Sjukhus AKUT.", severity: "critical" },
      { id: "kir-23-2", title: "Feber > 38.5°C", description: "Systempåverkan.", severity: "warning" }
    ],
    kliniskAnteckning: "PcV 1.6g × 3 i 5-7d (vid feber/allmänpåverkan). Dränage primärt."
  },
  "dislocerad-rot": {
    scId: "24",
    id: "KIR-24-DISLOC",
    slug: "dislocerad-rot",
    title: "Dislocerad rot/rotsegment",
    icdCode: "T81.8",
    patientUtsaga: "Roten försvann plötsligt upp i bihålan eller munbotten.",
    isAcute: false,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Lokalisation", text: "Sinus maxillaris (ÖK) eller Spatium submandibulare (UK)." },
      { label: "Regel", text: "Rota aldrig i blindo — det trycker roten djupare." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När försvann roten?", a: "Under pågående extraktion." },
        { q: "Kände du ett 'släpp'?", a: "Indikerar passage genom benplatta/membran." }
      ],
      kompletterande: [
        "Bubblar det vid andning? (Sinus-koppling)"
      ]
    },
    status: {
      inspektion: [
        "Tom alveol där rot nyss fanns.",
        "Röntgenverifiering (obligatoriskt) — ta 2 vinklar eller OPG."
      ]
    },
    behandling: {
      varning: "Rot i sinus = Remiss Käkkirurg (risk för sinuit). Rot i munbotten = Remiss Käkkirurg (risk för abscess).",
      alternativ: [
        {
          title: "Beslutsträd",
          metod: [
            "Verifiera position med rtg.",
            "Om rot är synlig och lättåtkomlig: Försök retrieval.",
            "Om ej synlig: Sluta rota. Suturera alveol. Remittera."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Dislocerad rot",
        text: "Anamnes: Under extraktion av [XX] dislocerades palatinala roten.\nStatus: Rot ej synlig. Rtg bekräftar position i [sinus maxillaris].\nÅtgärd: Alveol suturerad. Recept: Amoxicillin 500mg x 3. Remiss Käkkirurg utfärdad.\nInfo: Pat informerad om position och snytförbud."
      }
    ],
    diffDiagnoser: [],
    redFlags: [
      { id: "kir-24-1", title: "Rot i sinus", description: "Remiss till specialist.", severity: "warning" },
      { id: "kir-24-2", title: "Rot nära n.alveolaris", description: "Neurologisk risk.", severity: "warning" }
    ],
    kliniskAnteckning: "Röntgenverifiering ALLTID vid misstänkt dislokation"
  },
  "parestesi-dysestesi": {
    scId: "25",
    id: "KIR-25-NERV",
    slug: "parestesi-dysestesi",
    title: "Postoperativ parestesi/dysestesi",
    icdCode: "G54.2",
    patientUtsaga: "Bedövningen släpper inte / Det sticker i läppen.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Nerv", text: "N. alveolaris inferior eller N. lingualis." },
      { label: "Duration", text: "Bedöm om skadan är mekanisk eller beror på ödem." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var sitter domningen?", a: "Läpp/haka (Alveolaris) vs Tunga (Lingualis)." },
        { q: "Släppte bedövningen aldrig?", a: "Indikerar skada vid injektion eller ingrepp." },
        { q: "Gör det ont (smärtsam domning)?", a: "Dysestesi — mer besvärande." }
      ],
      kompletterande: [
        "Smakförändringar?",
        "Biter du dig i läppen?"
      ]
    },
    status: {
      inspektion: [
        "Sensibilitetstest: Touch (vadd), Smärta (sond), Temperatur.",
        "Kartlägg utbredningen (rita på patienten).",
        "Dokumentera exakt område."
      ]
    },
    behandling: {
      varning: "Total anestesi direkt postop = Misstänk nervavslitning -> Akut remiss specialist.",
      alternativ: [
        {
          title: "Observation",
          metod: [
            "Följ upp var 4:e vecka i 3 månader.",
            "Dokumentera förbättring/regress."
          ]
        },
        {
          title: "Farmakologi (Diskutabelt)",
          metod: [
            "Vitamin B6 (Pyridoxin) kan prövas.",
            "Neurolog vid utebliven förbättring efter 3-6 mån."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Nervpåverkan",
        text: "Anamnes: Efter extraktion av [XX] kvarstår domning i [höger underläpp]. Ingen smärta.\nStatus: Nedsatt känsel för beröring i område [X x Y cm]. Smärta intakt.\nBedömning: Postoperativ parestesi, sannolikt pga [ödem/trauma].\nPlan: Uppföljning om 4 veckor. Pat varnad för bitskador."
      }
    ],
    diffDiagnoser: [],
    redFlags: [
      { id: "kir-25-1", title: "Total anestesi", description: "Nervskada misstänkt -> Neurolog/Käkkirurg snarast.", severity: "critical" }
    ],
    kliniskAnteckning: "Neurolog vid total anestesi direkt postoperativt"
  },
  "tuberfraktur": {
    scId: "27",
    id: "KIR-27-TUBER",
    slug: "tuberfraktur",
    title: "Tuberfraktur",
    icdCode: "S02.8",
    patientUtsaga: "Benfragment lossnar vid extraktion av sista molar i ÖK.",
    isAcute: true,
    category: "Käkkirurgi",
    snabbOversikt: [
      { label: "Anatomi", text: "Tuber maxillae knäcks vid kraftig luxation." },
      { label: "Risk", text: "Stor sinusutbredning eller divergerande rötter." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kände du ett 'knäck'?", a: "Typiskt vid fraktur." },
        { q: "Rör sig hela benet?", a: "Indikerar stor fraktur." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: [
        "Mobilt bensegment inkl. tand.",
        "Eventuellt synlig sinuskommunikation."
      ]
    },
    behandling: {
      varning: "Fortsätt ALDRIG bryta om benet följer med — reponera direkt!",
      alternativ: [
        {
          title: "Handläggning",
          metod: [
            "Liten fraktur: Lossa mjukvävnad, ta ut fragmentet, suturera.",
            "Stor fraktur: Reponera fragmentet. Fixera (ev. splint). Avvakta extraktion (läkning 4-6v).",
            "Remiss vid osäkerhet."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Tuberfraktur",
        text: "Anamnes: Vid luxation av [18] noterades att hela tuber-segmentet rörde sig.\nStatus: Mobilt benfragment ca [1x1 cm].\nÅtgärd: Reponering av segmentet. Fixering via suturer. Extraktion avbruten.\nPlan: Läkning 6 veckor innan ny op-extraktion. Skonkost."
      }
    ],
    diffDiagnoser: [],
    redFlags: [
      { id: "kir-27-1", title: "Stort bensegment rörligt", description: "Lägg tillbaka + sutur. Bryt ej mer!", severity: "critical" },
      { id: "kir-27-2", title: "Sinusskada", description: "Risk för stor kommunikation.", severity: "warning" }
    ],
    kliniskAnteckning: "Reponera direkt om benet rör sig — bryt ALDRIG mer."
  }
};
