export type RedFlagSeverity = "critical" | "warning" | "info";

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: RedFlagSeverity;
}

export type PedCategory = 
  | "Trauma - Primära" 
  | "Trauma - Permanenta" 
  | "Akut - Smärta & Infektion" 
  | "Munslemhinna & System" 
  | "Beteende & Sedering" 
  | "Akut Ortodonti";

export interface PedScenario {
  id: string;
  slug: string;
  title: string;
  category: PedCategory;
  patientQuote: string;
  icdCode: string;
  isAcute: boolean;
  
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
    title: string;
    steps: string[];
    warning?: string;
  };

  journal: string;
  
  redFlags: RedFlag[];
  
  kallor: string[];
}

export const pedodontiScenarios: Record<string, PedScenario> = {
  // --- TRAUMA PRIMÄRA (41-44) -  "sc41": {
    id: "PEDO-41",
    slug: "luxation-mjolktand",
    title: "Luxation (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "Barnet har slagit i tänderna - tanden sitter snett eller är lös",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "REPONERA ALDRIG med kraft. Risk för skada på permanent anlag." },
      { label: "IADT 2020", text: "Spontan re-eruption kan ske oavsett apex-riktning vid intrusion." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Huvudvärk/Vila/Kräkning?", a: "Uteslut hjärnskakning först." },
        { q: "När och hur skedde olyckan?", a: "Viktigt för försäkring och handläggning." },
        { q: "Kan barnet bita ihop?", a: "Bettstörning avgör behandlingsval." }
      ],
      kompletterande: ["Stelkrampsskydd?", "Barnmisshandel-screening."]
    },
    status: {
      inspektion: ["Tand i fel läge (displaced).", "Sulcusblödning.", "Lacerationer."],
      kliniskaFynd: ["Subluxation: Ökad rörlighet.", "Lateral/Extrusion: Displaced tand.", "Intrusion: Tand 'kortare' eller osynlig."]
    },
    behandling: {
      title: "Handläggning (IADT 2020)",
      steps: [
        "Observation: Vid subluxation eller luxation utan bettstörning -> Avvakta.",
        "Intrusion: Avvakta spontan re-eruption (1-6 mån). Tidigare råd om extraktion vid apex mot anlag är borttaget.",
        "Extraktion: Vid kraftig bettstörning, ankylos eller tecken på infektion.",
        "Instruktion: Skonkost 1-2 veckor. Badda med Klorhexidin 0,1% på tops."
      ]
    },
    journal: "Diagnos: S03.2 Luxationsskada tand [nr].\nAnamnes: Fallolycka kl [tid]. Ingen medvetslöshet/kräkning.\nStatus: Tand [X] intruderad/lateralluxerad. Ingen bettstörning.\nÅtgärd: Röntgen (2 projektioner). Expektans. Info om risk för missfärgning/skada på permanent efterföljare. Uppföljning planerad.",
    redFlags: [
      { id: "p41-1", title: "Hjärnskakning", description: "Kräkning/slöhet -> Akut remiss sjukhus.", severity: "critical" },
      { id: "p41-2", title: "Infektion", description: "Feber/svullnad efter trauma -> Extraktion.", severity: "warning" }
    ],
    kallor: ["IADT 2020", "Dental Traumatology 2020;36(4)", "Internetodontologi"]
  },
  "sc42": {
    id: "PEDO-42",
    slug: "utslagen-mjolktand",
    title: "Utslagen mjölktand (Exartikulation)",
    category: "Trauma - Primära",
    patientQuote: "Tanden har slagits ut helt och hållet",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Viktigt", text: "REPLANTERA ALDRIG en utslagen mjölktand." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var är tanden nu?", a: "Uteslut aspiration/intrusion om tanden saknas." }
      ],
      kompletterande: ["Stelkrampsskydd?"]
    },
    status: {
      inspektion: ["Tom alveol. Blödning."],
      kliniskaFynd: ["Röntgen för att utesluta intrusion eller rotfragment."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Information: Förklara varför replantation ej görs (skydda anlaget).",
        "Sårvård: Rengör alveolen försiktigt. Hemostas via bitkompress.",
        "Röntgen: Måste göras om tanden ej hittats (uteslut intrusion/aspiration)."
      ]
    },
    journal: "Diagnos: S03.24 Exartikulation av tand [nr].\nÅtgärd: Röntgen utförd. Ingen tand i alveolen. Info: Ingen replantation. Kontroll av permanent efterföljare vid eruption.",
    redFlags: [
      { id: "p42-1", title: "Saknad tand", description: "Om tanden ej hittas -> Röntgen lungor vid andningsbesvär (aspiration).", severity: "critical" }
    ],
    kallor: ["IADT 2020"]
  },
  "sc43": {
    id: "PEDO-43",
    slug: "kronfraktur-mjolktand",
    title: "Kronfraktur (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "En bit av tanden har gått av",
    icdCode: "S02.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Typ", text: "Okomplicerad (endast emalj/dentin) eller komplicerad (pulpaexponerad)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Ilningar?", a: "Blottat dentin." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Frakturlinje.", "Eventuell röd punkt (pulpaexponering)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Okomplicerad: Slipa vassa kanter. Täck dentin med GIC/Komposit.",
        "Komplicerad: Extraktion är förstahandsval. Vid hög kooperation kan partiell pulpotomi (Cvek) övervägas."
      ]
    },
    journal: "Diagnos: S02.5 Kronfraktur tand [nr].\nStatus: Blottat dentin/pulpa.\nÅtgärd: Slipat/Täckt/Extraherat. Info till förälder.",
    redFlags: [],
    kallor: ["IADT 2020"]
  },
  "sc44": {
    id: "PEDO-44",
    slug: "rotfraktur-mjolktand",
    title: "Rotfraktur (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "Tanden är väldigt lös efter slaget",
    icdCode: "S02.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Princip", text: "Extrahera det lösa kronfragmentet. Lämna rotfragmentet." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Går tanden att vicka på extremt mycket?", a: "Tecken på rotfraktur." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Tanden rörlig. Blödning från sulcus."],
      kliniskaFynd: ["Röntgen visar frakturlinje på roten."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extraktion: Avlägsna endast det koronala fragmentet.",
        "Rotfragment: LÄMNA det apikala rotfragmentet (det resorberas oftast normalt). Att försöka ta ut det riskerar skada på det permanenta anlaget."
      ]
    },
    journal: "Diagnos: S02.5 Rotfraktur tand [nr].\nÅtgärd: LA. Extraherat koronalt fragment. Rotspets lämna  "sc45": {
    id: "PEDO-45",
    slug: "alveolarfraktur-barn",
    title: "Alveolarfraktur",
    category: "Trauma - Permanenta",
    patientQuote: "Hela tandköttspartiet och flera tänder rör sig tillsammans",
    icdCode: "S02.8",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "Ett block av ben och tänder rör sig som en enhet. Oftast specialistfall." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Går det att röra flera tänder samtidigt?", a: "Ja -> Alveolarfraktur." }
      ],
      kompletterande: ["Hjärnskakning?"]
    },
    status: {
      inspektion: ["Gingival blödning över flera tänder.", "Bensegment rörligt vid palpation."],
      kliniskaFynd: ["Bettstörning (segmentet är oftast displacerat)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Reponering: Reponera segmentet till ursprungsläget (kräver ofta LA).",
        "Fixering: Flexibel splint (t.ex. TTS eller ortodontitråd + komposit) i 4 veckor.",
        "Remiss: ALLTID remiss till specialist (Käkkirurg/Pedodontist) för uppföljning."
      ]
    },
    journal: "Diagnos: S02.8 Alveolarfraktur i regio [nr].\nÅtgärd: LA. Manuellt reponerat segment. Fixerat med flexibel splint. Remiss skickad.",
    redFlags: [
      { id: "p45-1", title: "Nerver/Kärl", description: "Hög risk för nekros i alla tänder i segmentet.", severity: "warning" }
    ],
    kallor: ["IADT 2020"]
  },
  "sc46": {
    id: "PEDO-46",
    slug: "kronfraktur-permanent",
    title: "Kronfraktur (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Barnet har slagit av en bit av den nya framtanden",
    icdCode: "S02.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Prio", text: "Bevara vitalitet för rotutveckling (Apexogenes)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Finns fragmentet kvar?", a: "Kan limmas tillbaka med utmärkt estetik." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Blottat dentin eller pulpaexponering."],
      kliniskaFynd: ["Vidöppen apex på röntgen? -> Vitalitetsbevarande extra viktigt."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Okomplicerad: Täck dentin eller limma fragment.",
        "Komplicerad (pulpa): Partiell pulpotomi (Cvek) med MTA/Biodentine. Bevara vitalitet till varje pris vid öppet apex."
      ]
    },
    journal: "Diagnos: S02.5 Kronfraktur tand [nr].\nÅtgärd: [Limmat fragment / Cvek-pulpotomi]. Info om kontroller.",
    redFlags: [],
    kallor: ["IADT 2020"]
  },
  "sc47": {
    id: "PEDO-47",
    slug: "luxation-permanent",
    title: "Luxation (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Tanden sitter snett eller är lös efter slaget",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Viktigt", text: "Permanenta tänder ska REPONERAS och SPLINTAS snarast." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När skedde olyckan?", a: "Prognosen försämras med tiden." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Displaced tand (lateral/extrusion/intrusion)."],
      kliniskaFynd: ["Röntgen för att utesluta rotfraktur."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Reponering: Reponera tanden varsamt till rätt plats (u LA).",
        "Fixering: Flexibel splint i 2 veckor (sublux/extrus/lateral).",
        "Intrusion (Permanent): Vid öppet apex -> avvakta spontan re-eruption. Vid stängt apex -> ortodontisk eller kirurgisk reponering."
      ]
    },
    journal: "Diagnos: S03.2 Luxationsskada tand [nr].\nÅtgärd: LA. Reponering. Flexibel splint 2v. Planerad endodontisk bedömning om 1-2v.",
    redFlags: [
      { id: "p47-1", title: "Resorption", description: "Hög risk för rotresorption vid kraftiga luxationer.", severity: "warning" }
    ],
    kallor: ["IADT 2020"]
  },
  "sc48": {
    id: "PEDO-48",
    slug: "exartikulation-permanent",
    title: "Exartikulation (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Hela tanden har slagits ut",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Prio", text: "HYPERAKUT. Tid är avgörande." },
      { label: "Förvaring", text: "Mjölk, saliv eller koksalt. ALDRIG kranvatten/torrt." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Torrtid?", a: "Över 60 minuter torr tid = dålig prognos." }
      ],
      kompletterande: ["Förvaringsmedium?"]
    },
    status: {
      inspektion: ["Tom alveol.", "Tandens kondition (smutsig/intakt)."]
    },
    behandling: {
      title: "Handläggning (Akut)",
      steps: [
        "Replantation: Sätt tillbaka tanden omedelbart (håll endast i kronan!).",
        "Fixering: Flexibel splint i 2 veckor.",
        "Antibiotika: Överväg PcV i 7 dagar. Doxycyklin om >12 år.",
        "Uppföljning: Endodonti-start inom 7-10 dagar om stängt apex."
      ]
    },
    journal: "Diagnos: S03.24 Exartikulation permanent tand [nr].\nÅtgärd: Replantering efter [X] min. Splintning. Recept [PcV/Doxycyklin]. Remiss Endodonti.",
    redFlags: [
      { id: "p48-1", title: "Ankylos", description: "Hög risk för ersättningsresorption vid lång tid ute.", severity: "warning" }
    ],
    kallor: ["IADT 2020"]
  },

  // --- AKUT - SMÄRTA & INFEKTION (39, 50-58) ---
  "sc39": {
    id: "PEDO-39",
    slug: "mih-hypomineralisering",
    title: "MIH (Hypomineralisering)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Det ilar och gör ont när jag tuggar, och den nya kindtanden ser gul och trasig ut",
    icdCode: "K00.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Fakta", text: "Drabbar ca 18% av barn. Kvalitativ mineraliseringsstörning i 6-årsmolarer/incisiver." },
      { label: "Prio", text: "Desensibilisering och prevention. Extraktion i samråd med ortodontist." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Isar det vid tandborstning eller kall dryck?", a: "Typiskt för MIH-molarer." },
        { q: "Har bitar av tanden lossnat nyligen?", a: "Indikerar PEB (Post-eruptivt emaljsönderfall)." }
      ],
      kompletterande: ["Problem med bedövning tidigare? (MIH-tänder är svårbedövade)"]
    },
    status: {
      inspektion: ["Opaka fläckar (vita/gula/bruna).", "Emaljsönderfall ocklusalt."],
      kliniskaFynd: ["Kraftig hypersensibilitet (blästra försiktigt!)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Prevention: Fluorlack (Duraphat) var 3:e månad. Högdos fluortandkräm (>12 år).",
        "Restaurering: GIC-förband om ej helt frambruten. Stålkrona vid omfattande skada.",
        "Extraktion: Optimal tidpunkt när 7:ans bifurkation mineraliseras (ca 8-9 år). Kräver ortodonti-remiss!"
      ]
    },
    journal: "Diagnos: K00.4 MIH. \nStatus: Tand [nr] med gula fläckar och emaljsönderfall. Kraftig sensibilitet.\nÅtgärd: Fluorlackning. Info om prognos. Planerad remiss ortodontist för bedömning av ev. extraktion.",
    redFlags: [
      { id: "p39-1", title: "Svårbedövad", description: "MIH-tänder kräver ofta mer anestesi (Artikain + ev. lustgas).", severity: "warning" }
    ],
    kallor: ["Jälevik et al. 2001", "Socialstyrelsen NR 2022", "Internetodontologi"]
  },
  "sc50": {
    id: "PEDO-50",
    slug: "djup-karies-mjolktand",
    title: "Djup karies (Mjölktand)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnet vägrar äta och sover dåligt - djup karies",
    icdCode: "K02.1",
    isAcute: false,
    snabbOversikt: [
      { label: "Princip", text: "Selektiv exkavering - lämna mjuk karies vid pulpalväggen för att undvika exponering." },
      { label: "Mål", text: "Undvika pulpaexponering och bevara tanden vital." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Har barnet ont spontant (utan att äta)?", a: "Nej = Reversibel pulpit. Ja -> Irreversibel pulpit (Se SC51)." },
        { q: "Vaknar barnet på natten?", a: "Nej = Reversibel. Ja = Irreversibel." },
        { q: "Finns 'finne' eller svullnad på tandköttet?", a: "Nej = Karies. Ja = Abscess (Se SC53)." }
      ],
      kompletterande: ["Bettstörning?", "Kostvanor?"]
    },
    status: {
      inspektion: ["Djup karies.", "Ingen fistel/svullnad."],
      kliniskaFynd: ["Reversibel pulpit - smärtan upphör när stimuli tas bort."]
    },
    behandling: {
      title: "Handläggning (Selektiv Exkavering)",
      steps: [
        "Smärtkontroll: LA (Citanest Dental Octapressin förstahandsval). Ytanestesi 5 min.",
        "Exkavering: Avlägsna karies perifert till hårt dentin (använd keramborr). LÄMNA mjuk karies i pulpalväggen.",
        "Fyllning: Tätslutande fyllning (GIC, Komposit eller Stålkrona) är avgörande.",
        "Hall Technique: Placering av prefabricerad stålkrona (SSC) utan kariesborttagning vid låg kooperation."
      ]
    },
    journal: "Diagnos: K02.1 Karies i dentin, K04.0 Reversibel pulpit.\nAnamnes: Svårt att äta, men ingen spontansmärta/nattsmärta.\nStatus: Djup karies tand [nr]. Ingen fistel/svullnad.\nÅtgärd: LA. Selektiv exkavering utförd för att undvika pulpaexponering. Tätslutande fyllning med [GIC/Komposit/Stålkrona].\nPlanering: Kontroll om 3 mån. Info till förälder att kontakta omedelbart vid feber, svullnad eller spontansmärta.",
    redFlags: [
      { id: "p50-1", title: "Spontansmärta", description: "Betyder irreversibel pulpit -> EXTRAKTION.", severity: "warning" },
      { id: "p50-2", title: "Fistel/Svullnad", description: "Betyder abscess -> EXTRAKTION.", severity: "warning" }
    ],
    kallor: ["SBU", "Socialstyrelsen NR 2022", "Maltz et al. 2018"]
  },
  "sc51": {
    id: "PEDO-51",
    slug: "akut-pulpit-mjolktand",
    title: "Akut pulpit (Mjölktand)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnet har våldsam tandvärk - skriker, kan inte sova",
    icdCode: "K04.01",
    isAcute: true,
    snabbOversikt: [
      { label: "Prio", text: "Smärtlindring via extraktion. Vitalbehandling har dålig prognos vid irreversibel pulpit i primära tänder." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Spontansmärta (utan provokation)?", a: "Typiskt för irreversibel pulpit." },
        { q: "Nattlig smärta?", a: "Barnet vaknar gråtande -> Irreversibel." }
      ],
      kompletterande: ["Smärtstillande effekt?"]
    },
    status: {
      inspektion: ["Djupt kariesangrepp/fraktur.", "Ingen svullnad (ännu)."],
      kliniskaFynd: ["Extrem smärta vid palpation/perkussion."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Anestesi: God lokalanestesi är ett krav. Tvinga ALDRIG fram ingreppet.",
        "Extraktion: Förstahandsval för att snabbt göra barnet smärtfritt.",
        "Info: Mjuk/kall kost resten av dagen. Paracetamol v.b."
      ],
      warning: "Tvinga ALDRIG fram smärtsam behandling. Vid bristande kooperation -> Överväg sedering/remiss."
    },
    journal: "Diagnos: K04.01 Irreversibel pulpit.\nAnamnes: Nattlig spontansmärta tand [nr].\nStatus: Djup karies i pulpa.\nÅtgärd: LA. Extraktion av tand [nr]. Hemostas kontrollerad. Patient smärtfri efter behandling.",
    redFlags: [],
    kallor: ["Internetodontologi", "PSL 2010:659"]
  },
  "sc52": {
    id: "PEDO-52",
    slug: "pulpit-ung-permanent-tand",
    title: "Pulpit i ung permanent tand",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Den nya tanden värker och pulserar",
    icdCode: "K04.01",
    isAcute: true,
    snabbOversikt: [
      { label: "Mål", text: "Apexogenes: bevara rotens tillväxtpotential genom vital pulpotomi." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Spontansmärta?", a: "Ja -> Irreversibel pulpit." },
        { q: "Ålder?", a: "6-12 år (viktigt för att bedöma rotutveckling)." }
      ],
      kompletterande: ["Traumahistorik?"]
    },
    status: {
      inspektion: ["Djup karies eller trauma.", "Röntgen visar öppet apex."],
      kliniskaFynd: ["Hemostas med NaCl-pellet bekräftar vitalitet."]
    },
    behandling: {
      title: "Pulpotomi (Apexogenes)",
      steps: [
        "Isolering: KOFFERDAM ÄR OBLIGATORISKT.",
        "Trepanation: Avlägsna inflammerad kronpulpa till kanalmynning med steril borr.",
        "Hemostas: Tryck med steril koksaltpellet 1-5 min. Måste bli ljust rött blod.",
        "MTA/Biodentine: Applicera direkt mot rotpulpan.",
        "Förslutning: Vid MTA -> Fuktad pellet + återbesök 24-48h för slutlig fyllning. Biodentine kan täckas direkt."
      ],
      warning: "Om blödning ej upphör efter 5 min tryck -> inflammationen går djupare -> Apexifikation krävs (Specialistfall)."
    },
    journal: "Diagnos: K04.01 Irreversibel pulpit tand [nr].\nÅtgärd: LA (Artikain). Kofferdam. Partiell pulpotomi med MTA. Hemostas uppnådd (vital blödning). Tätslutande fyllning.",
    redFlags: [
      { id: "p52-1", title: "Ofullständig hemostas", description: "Blödning upphör ej -> Inflammation djupare (Apexifikation).", severity: "warning" }
    ],
    kallor: ["IADT 2020", "MTA-protokoll Dentsply"]
  },
  "sc53": {
    id: "PEDO-53",
    slug: "abscess-mjolktand",
    title: "Abscess (Mjölktand)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Det har kommit en finne på tandköttet / öm att tugga på",
    icdCode: "K04.6",
    isAcute: true,
    snabbOversikt: [
      { label: "Princip", text: "Extrahera mjölktand för att skydda permanent anlag och få dränage." },
      { label: "STRAMA", text: "Antibiotika ges ENDAST vid systemisk påverkan (feber/allmänpåverkan)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Feber (>38C) eller allmänpåverkan?", a: "Ja -> Systemisk spridning (Se SC54)." },
        { q: "Svårt att gapa?", a: "Trismus indikerar spridning." }
      ],
      kompletterande: ["Bettstörning?"]
    },
    status: {
      inspektion: ["Fistel ('finne') buckalt.", "Lokal fluktuerande svullnad."],
      kliniskaFynd: ["Tanden rörlig och perkussionsöm."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extraktion: Primär behandling för att eliminera infektionskällan.",
        "Dränage: Säkra att pus töms vid extraktionen. Incision vid behov.",
        "Smärtlindring: Paracetamol 15 mg/kg x 4. EJ Ibuprofen vid blödningsrisk.",
        "Platsbevarare: Överväg remiss till ortodontist om >1 år kvar till eruption."
      ]
    },
    journal: "Diagnos: K04.6 Periapikalabscess med fistel.\nStatus: Fistel buckalt tand [nr]. Ingen feber/trismus.\nÅtgärd: LA. Extraktion tand [nr]. Pus dränerat. Ingen antibiotika (Strama).",
    redFlags: [
      { id: "p53-1", title: "Systemisk påverkan", description: "Feber/trismus -> Risk för cellulit (Se SC54).", severity: "critical" }
    ],
    kallor: ["Läkemedelsverket 2014", "Strama", "FASS"]
  },
  "sc54": {
    id: "PEDO-54",
    slug: "cellulit-spridd-infektion",
    title: "Cellulit / Spridd Infektion",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnets ansikte/kind har svullnat upp enormt och hen har feber",
    icdCode: "L03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "LIVSHOTANDE. Kan sprida sig extremt snabbt hos barn." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Feber?", a: ">38C indikerar systemisk påverkan." },
        { q: "Svårt att svälja?", a: "Tecken på hotad luftväg -> AKUT REMISS." },
        { q: "Trismus?", a: "Infektionen har nått tuggmuskulaturen." }
      ],
      kompletterande: ["Allmänpåverkan (slöhet/dehydrering)?"]
    },
    status: {
      inspektion: ["Extraoral svullnad/asymmetri.", "Svullnad mot öga eller hals."],
      kliniskaFynd: ["Trismus.", "Hög feber."]
    },
    behandling: {
      title: "Handläggning (Akut)",
      steps: [
        "Eliminera orsak: Extrahera tanden direkt för dränage om möjligt.",
        "Antibiotika: PcV 12,5 mg/kg x 3 (max 1g x 3) i 7 dagar. Vid allergi: Klindamycin 5-6 mg/kg x 3.",
        "AKUT REMISS: Vid sväljningssvårigheter, ögonengagemang eller uttalad trismus -> Barnakut/Käkkirurg för IV-antibiotika.",
        "Telefonkontakt: RING in remissen!"
      ]
    },
    journal: "Diagnos: L03.2 Cellulit ansikte utgående från tand [nr].\nStatus: Kraftig extraoral svullnad, feber [X], trismus. Allmänpåverkad.\nÅtgärd: Akut extraktion. Akut telefonkontakt med [Sjukhus]. Barnet remitterat för inläggning/IV-antibiotika.",
    redFlags: [
      { id: "p54-1", title: "Luftvägshinder", description: "Sväljningssvårigheter/andningspåverkan -> AKUT SJUKHUSVÅRD.", severity: "critical" },
      { id: "p54-2", title: "Ögonengagemang", description: "Svullnad mot nedre ögonlocket -> Risk för orbital cellulit.", severity: "critical" }
    ],
    kallor: ["Läkemedelsverket 2014", "FASS"]
  },
  "sc55": {
    id: "PEDO-55",
    slug: "perikoronit-barn",
    title: "Perikoronit",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Det gör ont längst bak vid den nya tanden",
    icdCode: "K05.2",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Inflammation runt delvis frambruten 6:a eller 7:a." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont att tugga?", a: "Antagonist kan bita på svullen flik." }
      ],
      kompletterande: ["Feber? (Ovanligt vid perikoronit)"]
    },
    status: {
      inspektion: ["Svullet operculum.", "Debris/plack under fliken."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Spolning: Rensa under operculum med fysiologisk koksaltlösning.",
        "Avlastning: Slipa ev. antagonist ur ocklusion om den traumatiserar fliken.",
        "Hygien: Baddning med klorhexidin (tops för små barn).",
        "Info: Antibiotika ges EJ vid okomplicerad perikoronit."
      ]
    },
    journal: "Diagnos: K05.2 Perikoronit.\nStatus: Svullet operculum regio [nr].\nÅtgärd: Spolning. [Inslipning antagonist]. Info om hygien.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc56": {
    id: "PEDO-56",
    slug: "postexblodning-barn",
    title: "Postextraktionsblödning",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Vi drog ut en tand i morse, och nu är kudden full av blod",
    icdCode: "T81.0",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "GE ALDRIG NSAID (Ipren) vid blödning. Använd Paracetamol." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Has barnet pillat på såret?", a: "Sugande skapar undertryck." },
        { q: "Tagit Ipren?", a: "Ipren hämmar hemostasen." }
      ],
      kompletterande: ["Kända blödningssjukdomar i släkten?"]
    },
    status: {
      inspektion: ["Sivande blödning.", "Stort leverkoagel (geléaktigt) ovanpå alveolen."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Anestesi: LA UTAN adrenalin (Mepivakain) för att se den faktiska blödningen.",
        "Rensning: Avlägsna leverkoagel (måste göras för att hemostas ska starta om).",
        "Lokal hemostas: Spongostan dränkt i Cyklokapron (Tranexamsyra).",
        "Fixering: Kryssutur (Vicryl 4-0 resorb).",
        "Kompression: Bita på fuktad kompress 30 min på kliniken."
      ]
    },
    journal: "Diagnos: T81.0 Blödning efter ingrepp.\nÅtgärd: LA. Rensat koagel. Spongostan + Cyklokapron. Kryssutur. Blödning stillad. Info: Paracetamol (EJ Ipren!).",
    redFlags: [
      { id: "p56-1", title: "Ostillbar blödning", description: "Vid misstanke om koagulationsrubbning -> Sjukhusvård.", severity: "warning" }
    ],
    kallor: ["FASS - Cyklokapron", "Läkemedelsverket"]
  },
  "sc57": {
    id: "PEDO-57",
    slug: "spontan-blodning",
    title: "Spontan Gingival Blödning",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnets tandkött blöder utan anledning",
    icdCode: "K05.3",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "INGA INGREPP. Kan vara tecken på leukemi eller svår koagulationsrubbning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Blöder det utan att barnet borstar?", a: "Spontanitet är varningstecken." },
        { q: "Blåmärken utan orsak?", a: "Indikerar trombocytopeni." }
      ],
      kompletterande: ["Näsblod ofta?"]
    },
    status: {
      inspektion: ["Blödning oproportionerlig till plackmängd.", "Petekier (små röda prickar) i slemhinnan."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Inga ingrepp: Ingen sondering/depuration (risk för ostillbar blödning).",
        "Hemostas: Endast lokalt tryck med Cyklokapron-kompress.",
        "Utredning: Remiss för akut blodprovstagning (B-status, TPK, LPK diff)."
      ]
    },
    journal: "Diagnos: Spontan gingival blödning (misstanke hematologi).\nStatus: Spontan blödning utan trauma/karies. Petekier synliga.\nÅtgärd: Inga ingrepp. Cyklokapron-tryck. Remiss Barnmedicin.",
    redFlags: [
      { id: "p57-1", title: "Malignitetsmisstanke", description: "Spontan blödning + petekier -> Måste utredas omedelbart.", severity: "critical" }
    ],
    kallor: ["Internetodontologi", "Sfhem"]
  },
  "sc58": {
    id: "PEDO-58",
    slug: "systemisk-risk-leukemi",
    title: "Systemisk risk / Leukemi",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Gingivahyperplasi, blårött tandkött, blekhet, oförklarliga blåmärken",
    icdCode: "C95.9",
    isAcute: true,
    snabbOversikt: [
      { label: "Prio", text: "AKUT MEDICINREMISS. Livshotande tillstånd." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Är barnet ovanligt trött/blekt?", a: "Anemi är vanligt vid leukemi." },
        { q: "Feber utan känd orsak?", a: "Neutropeni ger infektionskänslighet." }
      ],
      kompletterande: ["Svullna lymfkörtlar?"]
    },
    status: {
      inspektion: ["Gingivahyperplasi (blåröd, 'rullgardinsliknande').", "Petekier i gom/hud.", "Blekhet."],
      kliniskaFynd: ["Spontan blödning."]
    },
    behandling: {
      title: "Akut Handläggning",
      steps: [
        "INGA INGREPP i munnen (livsfarligt pga infektions/blödningsrisk).",
        "Akut telefonkontakt: Ring Barnakut/Barnmedicin direkt.",
        "Remiss: Akut blodprov (B-status, TPK, LPK diff).",
        "Info: Föräldrar ska åka direkt till akuten."
      ]
    },
    journal: "Diagnos: Gingival hyperplasi + Petekier (Misstanke Leukemi).\nStatus: Uttalad hyperplasi, blekhet, petekier. \nÅtgärd: Inga ingrepp. Telefonkontakt med Barnakut kl [Tid]. Akut remiss.",
    redFlags: [
      { id: "p58-1", title: "Livshotande", description: "Leukemimisstanke kräver utredning INOM TIMMAR.", severity: "critical" }
    ],
    kallor: ["Internetodontologi", "Svenska Barnläkarföreningen"]
  },

  // --- MUNSLEMHINNA & SYSTEM (57, 59-61, 65-73) ---
  "sc59": {
    id: "PEDO-59",
    slug: "eruptionscysta-hematom",
    title: "Eruptionscysta / Hematom",
    category: "Munslemhinna & System",
    patientQuote: "En blå/mörk bula där tanden ska komma",
    icdCode: "K09.8",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Mjuk, blåskimrande svullnad över en frambrytande tand." },
      { label: "Prognos", text: "Oftast helt ofarligt. Läker när tanden bryter fram." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont när barnet tuggar?", a: "Sällan smärtfritt om det ej är sekundärinfekterat." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Blåaktig, fluktuerande cysta på alveolarutskottet."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Expektans: Majoriteten resolvar spontant vid tanderuption.",
        "Incision: Rekommenderas EJ (risk för infektion och återfyllning).",
        "Info: Lugnande besked till föräldrar."
      ]
    },
    journal: "Diagnos: K09.8 Eruptionscysta. \nStatus: Blåskimrande bula regio [nr]. Smärtfri.\nÅtgärd: Expektans. Info till förälder.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc60": {
    id: "PEDO-60",
    slug: "ektopisk-6ar-molar",
    title: "Ektopisk eruption av 6-molar",
    category: "Munslemhinna & System",
    patientQuote: "Sexårsmolaren har fastnat - mjölktanden framför är lös och öm",
    icdCode: "K00.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Varning", text: "MÅSTE kontrolleras med röntgen (risk för resorption på 05:an)." },
      { label: "Prio", text: "Kontrollera om premolaranlag finns (UK 5:or)!" }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Är 05:an öm vid tuggning?", a: "Indikerar pågående rotresorption." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["6:an hakar fast under 05:ans krona.", "05:an rörlig."],
      kliniskaFynd: ["Röntgen: Resorption av 05:ans distala rot."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Expektans: Upp till 60% släpper spontant (reversibla).",
        "Separering: Sep-gummi eller mässingstråd (brass wire).",
        "Extraktion: Om grav resorption eller misslyckad separering. Obs! Platsförlustrisk."
      ]
    },
    journal: "Diagnos: K00.6 Ektopisk eruption + K03.3 Patologisk rotresorption.\nStatus: Tand [16/26] hakar under [55/65]. Resorption synlig på rtg.\nÅtgärd: [Sep-gummi / Exspektans / Extraktion].",
    redFlags: [
      { id: "p60-1", title: "Agenesi", description: "Vid agenesi av 5:or -> Konsultera ortodontist innan 05:an tas bort.", severity: "warning" }
    ],
    kallor: ["Bjerklin 1994", "Internetodontologi"]
  },
  "sc61": {
    id: "PEDO-61",
    slug: "natal-tand-bebis",
    title: "Natal / Neonatal Tand",
    category: "Munslemhinna & System",
    patientQuote: "Bebisen är född med en tand / mamman har ont vid amning",
    icdCode: "K00.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Fakta", text: "90% är ordinarie mjölktänder som kommit tidigt." },
      { label: "Varning", text: "Kontrollera K-vitaminstatus före ev. extraktion!" }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Sår på tungan (Riga-Fede)?", a: "Tanden skaver hål på barnets tunga." },
        { q: "Problem vid amning?", a: "Sår på mammans bröstvårta." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Tand synlig hos nyfödd.", "Rörlighet (ofta saknas rotutveckling)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Bevara: Slipa incisalkanten rund för att minska skav.",
        "Extrahera: Endast vid extrem löshet (aspirationsrisk) eller oläkbara sår.",
        "Medicinskt: Kontrollera med barnläkare att K-vitamin getts."
      ]
    },
    journal: "Diagnos: K00.6 Natal tand. \nStatus: [71/81] erupterad vid födsel. [Rörlig / Fast].\nÅtgärd: [Slipat kant / Extraktion].",
    redFlags: [
      { id: "p61-1", title: "Aspirationsrisk", description: "Mycket lös tand kan hamna i luftvägarna.", severity: "warning" }
    ],
    kallor: ["Koch & Poulsen", "FASS"]
  },
  "sc65": {
    id: "PEDO-65",
    slug: "primar-herpes-gingivostomatit",
    title: "Primär Herpes (Gingivostomatit)",
    category: "Munslemhinna & System",
    patientQuote: "Småbarn med hög feber och ilsket rött tandkött fullt med blåsor",
    icdCode: "B00.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "INGEN ANTIBIOTIKA (Virus). Prio är vätska och smärtlindring." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kissar barnet normalt?", a: "Viktigt för att utesluta uttorkning." },
        { q: "Feber?", a: "Hög feber (38-40C) är typiskt." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Generell ilsken gingivit.", "Multipla små blåsor/sår i hela munnen (även gom)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Vätska: Kall dryck, glass, isglass. Viktigt att undvika uttorkning.",
        "Smärtlindring: Xylocain salva 5% före mat. Paracetamol systemiskt.",
        "Hygien: Klorhexidinbaddning 0,12% (med tops) vid behov."
      ]
    },
    journal: "Diagnos: B00.2 Herpetisk gingivostomatit. \nStatus: Feber, multipla sår, foetor ex ore.\nÅtgärd: Info om virus. Ordinerat Xylocain salva + Paracetamol. Info om vätska.",
    redFlags: [
      { id: "p65-1", title: "Uttorkning", description: "Om barnet ej kissar -> Barnakut för dropp.", severity: "critical" }
    ],
    kallor: ["Internetodontologi", "Strama"]
  },
  "sc66": {
    id: "PEDO-66",
    slug: "afte-barn",
    title: "Aftös stomatit (Afte)",
    category: "Munslemhinna & System",
    patientQuote: "Smärtsamma ljusa sår på insidan av läppen",
    icdCode: "K12.0",
    isAcute: false,
    snabbOversikt: [
      { label: "Diff", text: "Ingen feber (skiljer från herpes). Drabbar endast rörlig slemhinna." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Återkommande?", a: "Afte är ofta recidiverande." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Välavgränsat sår med gulvit fibrintäcke och röd halo."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Lindring: Xylocain gel v.b. Andolex munskölj.",
        "Prevention: Byt till SLS-fri tandkräm (t.ex. Zendium).",
        "Info: Självläker på 7-14 dagar."
      ]
    },
    journal: "Diagnos: K12.0 Afte. \nStatus: Sår på insida läpp. Ingen feber.\nÅtgärd: Info. Rekommenderar Zendium.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc67": {
    id: "PEDO-67",
    slug: "anug-barn-varning",
    title: "ANUG hos barn (Varning!)",
    category: "Munslemhinna & System",
    patientQuote: "Tandköttet mellan tänderna har ruttnat bort och det luktar illa",
    icdCode: "K05.1",
    isAcute: true,
    snabbOversikt: [
      { label: "Viktigt", text: "Extremt sällsynt hos barn i Sverige. Misstänk ALLVARLIG systemsjukdom (Leukemi/HIV)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Andra symtom (trötthet/blåmärken)?", a: "Viktigt för leukemimisstanke." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Utstansade papiller.", "Nekrotiska beläggningar.", "Kraftig spontanblödning."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Lokal: Försiktig rengöring med väteperoxid/klorhexidin under ytanestesi.",
        "Medicinsk: Metronidazol 10-12 mg/kg x 3 vid allmänpåverkan.",
        "REMISS: ALLTID akut remiss till barnläkare för immunutredning/blodstatus."
      ]
    },
    journal: "Diagnos: K05.10 ANUG. \nStatus: Nekrotiserade papiller, extrem smärta.\nÅtgärd: Lokalvård. Metronidazol. Akut remiss Barnläkare.",
    redFlags: [
      { id: "p67-1", title: "Systemsjukdom", description: "ANUG hos barn = röd flagga för immunbrist.", severity: "critical" }
    ],
    kallor: ["Strama", "Internetodontologi"]
  },
  "sc68": {
    id: "PEDO-68",
    slug: "mucocele-slemcysta",
    title: "Mucocele (Slemcysta)",
    category: "Munslemhinna & System",
    patientQuote: "En mjuk, blåaktig kula på underläppen",
    icdCode: "K11.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Varning", text: "Överläpp = Remiss (uteslut tumör). Underläpp = Oftast ofarlig mucocele." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Has barnet bitit sig?", a: "Trauma är vanligaste orsaken." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Mjuk, fluktuerande, blåskimrande bula på underläppens insida."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Expektans: Många läker spontant. Avvakta 1 månad.",
        "Remiss: Till specialist för kirurgisk extirpation vid ständiga recidiv.",
        "Stick ej hål själv (fylls direkt på igen)."
      ]
    },
    journal: "Diagnos: K11.6 Mucocele. \nStatus: Fluktuerande bula [X] mm i underläpp.\nÅtgärd: Exspektans / Remiss.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc69": {
    id: "PEDO-69",
    slug: "bitsar-brannskada",
    title: "Brännskada & Iatrogent bitsår",
    category: "Munslemhinna & System",
    patientQuote: "Ett stort vitt sår på läppen efter bedövningen igår",
    icdCode: "S01.5",
    isAcute: false,
    snabbOversikt: [
      { label: "Info", text: "Vitt sår (fibrin) är normalt läkningsstadium, ej infektion." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Fått bedövning nyligen?", a: "Vanlig orsak till att barnet biter sig." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Sår med gulvit fibrintäckning.", "Ofta betydande svullnad i läppen."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Info: Lugnande besked om fibrinbeläggning.",
        "Lindring: Xylocain gel före mat. Vaselin för att skydda läppen.",
        "Profylax: Alltid info om bitrisk efter bedövning (bomullsrulle med hem)."
      ]
    },
    journal: "Diagnos: S01.5 Iatrogent bitsår. \nStatus: Fibrinbelagt sår efter LA.\nÅtgärd: Info. Xylocain gel.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc70": {
    id: "PEDO-70",
    slug: "blodarsjuka-koagulation",
    title: "Koagulationsrubbning",
    category: "Munslemhinna & System",
    patientQuote: "Barn med blödarsjuka som har akut tandvärk eller sår",
    icdCode: "D66",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "Ge ALDRIG NSAID (Ipren/Ibuprofen). Hämmar trombocyter." },
      { label: "Varning", text: "Ingen mandibularblockad (risk för kvävande hematom)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vilken typ av blödarsjuka?", a: "Hemofili A/B, von Willebrand?" }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Tandvärk/Infektion."]
    },
    behandling: {
      title: "Akut handläggning",
      steps: [
        "Konsultera alltid koagulationscentrum/onkolog.",
        "Extraktioner kräver faktorersättning IV på sjukhus.",
        "I allmäntandvård: Endast icke-invasiv nödhjälp (IRM-fyllning).",
        "Smärtlindring: Endast Paracetamol."
      ]
    },
    journal: "Diagnos: D66 Hemofili A. \nÅtgärd: Kontakt med koagulationsjour. Remiss sjukhustandvård.",
    redFlags: [
      { id: "p70-1", title: "NSAID", description: "Ipren är livsfarligt vid blödarsjuka.", severity: "critical" }
    ],
    kallor: ["Janusmed"]
  },
  "sc71": {
    id: "PEDO-71",
    slug: "onkologipatienten",
    title: "Onkologipatienten",
    category: "Munslemhinna & System",
    patientQuote: "Barn under cancerbehandling med tandvärk",
    icdCode: "C91.0",
    isAcute: true,
    snabbOversikt: [
      { label: "Neutropeni", text: "Låga vita blodkroppar -> Extrem infektionsrisk." },
      { label: "Trombocytopeni", text: "Låga plättar -> Extrem blödningsrisk." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Aktuellt blodstatus?", a: "Neutrofila < 0.5 = Akut risk för sepsis." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Mukosit.", "Candida.", "Dental infektion."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "RÖR EJ patienten utan dagsfärsk lab-lista and kontakt med onkolog.",
        "All tandbehandling under pågående cytostatika sker på sjukhustandvård.",
        "Vid feber + neutropeni -> AKUTEN (Sepsisrisk)."
      ]
    },
    journal: "Diagnos: Onkologipatient. \nÅtgärd: Kontakt med barnonkologen. Remiss sjukhustandvård.",
    redFlags: [
      { id: "p71-1", title: "Febril neutropeni", description: "Feber + cancerbehandling -> Livshotande.", severity: "critical" }
    ],
    kallor: ["Internetodontologi"]
  },
  "sc72": {
    id: "PEDO-72",
    slug: "hjartfel-endokarditrisk",
    title: "Medfött hjärtfel (Endokarditrisk)",
    category: "Munslemhinna & System",
    patientQuote: "Barnet har ett opererat hjärtfel",
    icdCode: "Q21.3",
    isAcute: false,
    snabbOversikt: [
      { label: "Profylax", text: "Ges vid 'Hög risk' (klaffprotes, tidigare endokardit, komplexa hjärtfel)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vilket hjärtfel?", a: "Kolla med barnkardiolog om profylax behövs." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Planerat blodigt ingrepp (Extraktion)."]
    },
    behandling: {
      title: "Antibiotikaprofylax",
      steps: [
        "Standard: Amoxicillin 50mg/kg (max 2g) 60 min före.",
        "Vid PC-allergi: Klindamycin 15mg/kg (max 600mg) 60 min före."
      ]
    },
    journal: "Diagnos: Hjärtfel. \nÅtgärd: Endokarditprofylax given [Tid]. Ingrepp utfört.",
    redFlags: [],
    kallor: ["Läkemedelsverket"]
  },
  "sc73": {
    id: "PEDO-73",
    slug: "diabetes-hypoglykemi",
    title: "Diabetes (Hypoglykemi)",
    category: "Munslemhinna & System",
    patientQuote: "Barnet blir blekt och kallsvettigt i stolen",
    icdCode: "E10",
    isAcute: true,
    snabbOversikt: [
      { label: "Hypo", text: "Lågt blodsocker. Akut situation." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Has barnet ätit frukost?", a: "Viktigt om de tagit sitt insulin." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Blekhet.", "Kallsvett.", "Frånvaro.", "Darrningar."]
    },
    behandling: {
      title: "Akut åtgärd",
      steps: [
        "Vaken: Ge snabba kolhydrater (Druvsocker, juice, mjölk). EJ light/zero.",
        "Medvetslös: Ge inget i munnen! Stabilt sidoläge. Ring 112. Ge Glukagon im/sc om kompetens finns."
      ]
    },
    journal: "Diagnos: Hypoglykemi i stolen. \nÅtgärd: Avbröt beh. Gav juice. Återställd.",
    redFlags: [
      { id: "p73-1", title: "Medvetslöshet", description: "Koma-risk -> Ring 112.", severity: "critical" }
    ],
    kallor: ["Diabetesförbundet"]
  },

  // --- BETEENDE & SEDERING (62-64) ---
  "sc62": {
    id: "PEDO-62",
    slug: "tandvardsradsla",
    title: "Akut tandvårdsrädsla",
    category: "Beteende & Sedering",
    patientQuote: "Barnet gråter och vägrar öppna munnen",
    icdCode: "Z76.8",
    isAcute: false,
    snabbOversikt: [
      { label: "Etik", text: "TVÅNG ÄR FÖRBJUDET. Skapa förtroende istället." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Tidigare erfarenheter?", a: "Hitta orsaken till rädslan." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Gråt.", "Vägran.", "Panik."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Tell-Show-Do (TSD).",
        "Avbryt om det inte går. Lägg temporärt förband (IRM) med finger.",
        "Planera för sedering (Midazolam) eller lustgas vid nästa besök.",
        "Remiss till Pedodontist vid grav odontofobi."
      ]
    },
    journal: "Diagnos: Z76.8 Tandvårdsrädsla. \nÅtgärd: TSD prövad. Avbröt beh för att undvika trauma.",
    redFlags: [],
    kallor: ["Klingberg & Broberg"]
  },
  "sc63": {
    id: "PEDO-63",
    slug: "bedovningssvikt",
    title: "Bedövningssvikt",
    category: "Beteende & Sedering",
    patientQuote: "Barnet känner borren trots bedövning",
    icdCode: "K04.0",
    isAcute: true,
    snabbOversikt: [
      { label: "Fysiologi", text: "Inflammerad vävnad har lågt pH -> Bedövningen biter ej." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Bultande värk?", a: "Tecken på kraftig inflammation." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Irreversibel pulpit."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Vänta längre (10-15 min).",
        "Intraligamentär bedövning.",
        "Om det ej tar: Avbryt! Lägg eugenol + IRM.",
        "Ordinera NSAID + Paracetamol 1h före nästa besök (höjer pH)."
      ]
    },
    journal: "Diagnos: Pulpit. \nÅtgärd: Bedövningssvikt trots adekvat teknik. Beh avbruten.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc64": {
    id: "PEDO-64",
    slug: "sederingskomplikation",
    title: "Sederingskomplikation",
    category: "Beteende & Sedering",
    patientQuote: "Barnet börjar kräkas eller blir blå om läpparna under sedering",
    icdCode: "T88.5",
    isAcute: true,
    snabbOversikt: [
      { label: "ABCDE", text: "Fria luftvägar är prio 1." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Fasta?", a: "Has barnet ätit? (Aspirationsrisk vid kräkning)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Desaturation (SpO2 < 92%).", "Paradoxal reaktion (barnet blir vilt).", "Andningsdepression."]
    },
    behandling: {
      title: "Akut ABCDE",
      steps: [
        "Avbryt behandlingen.",
        "Fria luftvägar (Käklyft).",
        "100% Syrgas på mask.",
        "Sidoläge vid kräkning.",
        "Ring 112 vid desaturation som ej vänder."
      ]
    },
    journal: "Diagnos: T88.5 Sederingskomplikation. \nÅtgärd: Syrgas. Beh avbruten. Återställd.",
    redFlags: [
      { id: "p64-1", title: "Låg SpO2", description: "< 92% -> Ge syrgas direkt.", severity: "critical" }
    ],
    kallor: ["Socialstyrelsen"]
  },

  // --- AKUT ORTODONTI (ORT-01, ORT-10 till ORT-14) ---
  "scort01": {
    id: "PEDO-ORT01",
    slug: "eruptionsstorning-horntand",
    title: "Eruptionsstörning hörntand",
    category: "Akut Ortodonti",
    patientQuote: "Hörntanden kommer inte fram och mjölktanden sitter stenhårt",
    icdCode: "K00.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Prio 3", text: "Risk för rotresorption på permanenta incisiver." },
      { label: "Diagnostik", text: "Palpationskontroll 9-10 år. Röntgen 11 år om ej kännbar." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Är barnet 10-13 år?", a: "Kritisk ålder för upptäckt." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Buckal utbuktning saknas.", "Asymmetrisk eruption."],
      kliniskaFynd: ["Röntgen: Palatinalt läge (parallax-metod)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extraktion 03: Ger spontan korrektion i 70-80% av fallen om tanden ej passerat mittlinjen på 2:an.",
        "Remiss: Till ortodontist vid utebliven effekt eller grav felställning."
      ]
    },
    journal: "Diagnos: K00.6 Eruptionsstörning 13/23. \nStatus: Ej palpabel buckalt. Rtg visar palatinalt läge.\nÅtgärd: Ex av 03. Uppföljning 6 mån.",
    redFlags: [],
    kallor: ["Socialstyrelsen", "Internetodontologi"]
  },
  "scort10": {
    id: "PEDO-ORT10",
    slug: "lossnad-bracket",
    title: "Lossnad bracket/band",
    category: "Akut Ortodonti",
    patientQuote: "En metallbit har lossnat från tandställningen",
    icdCode: "Z46.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Handling", text: "Ta bort den lösa delen eller vaxa över om den sitter kvar på tråden." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Svalt eller andats in något?", a: "JA -> RÖD FLAGGA (Aspiration)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Lös bracket/ring.", "Slemhinna u.a."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Avlägsna helt lösa delar.",
        "Om delen hänger på tråden: Låt sitta, vaxa över om det skaver.",
        "Boka tid hos ortodontist för fastsättning (fixera aldrig själv med komposit!)."
      ]
    },
    journal: "Diagnos: Z46.4. \nÅtgärd: Avlägsnat lös bracket. Hänvisad till ortodontist.",
    redFlags: [
      { id: "o10-1", title: "Aspiration", description: "Hosta/andnöd efter att del lossnat -> Sjukhus.", severity: "critical" }
    ],
    kallor: ["Internetodontologi"]
  },
  "scort11": {
    id: "PEDO-ORT11",
    slug: "vass-bagande",
    title: "Vass bågände",
    category: "Akut Ortodonti",
    patientQuote: "Metalltråden sticker ut och skär i kinden",
    icdCode: "Z46.4",
    isAcute: true,
    snabbOversikt: [
      { label: "Handling", text: "Klipp av eller böj in tråden." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var sticker det?", a: "Hitta exakt punkt." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Utskjutande bågände.", "Ulceration i kinden."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Klipp av tråden med distalkap.",
        "Alternativt: Böj in änden med tång.",
        "Täck med vax.",
        "Andolex/Xylocain för såret."
      ]
    },
    journal: "Diagnos: Z46.4. \nÅtgärd: Klippt bågände.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "scort12": {
    id: "PEDO-ORT12",
    slug: "lossnad-retainer",
    title: "Lossnad retainer",
    category: "Akut Ortodonti",
    patientQuote: "Tråden bakom tänderna har lossnat",
    icdCode: "Z46.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Risk", text: "Tänderna flyttar sig snabbt (recidiv)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När lossnade den?", a: "Recidiv kan ske inom dagar." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Lossnad bondingpunkt på 3-3 retainer."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Om den skaver: Klipp av den lösa biten.",
        "Prio: Snabb tid till ortodontist för ombondning.",
        "Använd ev. gamla nattskenor extra mycket tills dess."
      ]
    },
    journal: "Diagnos: Z46.4. \nÅtgärd: Klippt lös trådände. Remiss ortodontist.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "scort13": {
    id: "PEDO-ORT13",
    slug: "trasig-skena",
    title: "Trasig/förlorad skena",
    category: "Akut Ortodonti",
    patientQuote: "Min plastskena har gått sönder",
    icdCode: "Z46.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Prio", text: "Ny skena snarast för att undvika recidiv." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Passar den fortfarande?", a: "Om ej -> tänderna har redan flyttat sig." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Skenan trasig."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Ta nya avtryck/scanning för ny skena.",
        "Kontakta ortodontist."
      ]
    },
    journal: "Diagnos: Z46.4. \nÅtgärd: Nya avtryck tagna för retainer.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "scort14": {
    id: "PEDO-ORT14",
    slug: "sar-av-tandstallning",
    title: "Sår av tandställning",
    category: "Akut Ortodonti",
    patientQuote: "Tandställningen har gjort ett sår som inte läker",
    icdCode: "S00.5",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Decubitus (traumatiskt sår) pga mekanisk irritation." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur länge?", a: "Sår > 2v ska kontrolleras noga." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Sår matchande bracket/båge."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Identifiera och åtgärda orsaken (vax/klippning).",
        "Klorhexidinbaddning.",
        "Kontroll om 1v."
      ]
    },
    journal: "Diagnos: S00.5. \nÅtgärd: Vax applicerat. Info.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  }
};
