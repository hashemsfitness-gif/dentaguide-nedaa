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
  // --- TRAUMA PRIMÄRA (41-44) ---
  "sc41": {
    id: "PEDO-41",
    slug: "luxationsskador-primara",
    title: "Luxationsskador (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "Tanden sitter snett / är lös / har försvunnit upp",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Grundprincip", text: "ALDRIG reponera med kraft, ALDRIG replantera primära tänder." },
      { label: "Varning", text: "IADT 2020: Intrusion kräver rtg för att se apexriktning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Slog barnet i huvudet? Medvetslöshet? Kräkning?", a: "Vid ja -> misstänk hjärnskakning -> remiss barnakut direkt." },
        { q: "Kan barnet bita ihop normalt?", a: "Bettstörning avgör om tanden måste tas bort." }
      ],
      kompletterande: ["Stelkrampsskydd?", "Barnmisshandel-screening (stämmer storyn med skadan?)"]
    },
    status: {
      inspektion: ["Lacerationer i läpp?", "Tandlägesändring?", "Rörlighet?"],
      kliniskaFynd: [
        "Subluxation: Blödning från sulcus, ökad rörlighet.", 
        "Intrusion: Tanden slagen uppåt. Apex palatinalt (mot anlaget) -> avvakta spontan reeruption."
      ]
    },
    behandling: {
      title: "Handläggning (IADT 2020)",
      steps: [
        "Subluxation: Mjuk kost 1v, god hygien (Klorhexidinbaddning).",
        "Lateral/Extrusion: Om kraftig bettstörning -> Extraktion. Annars expektans.",
        "Intrusion: Avvakta spontan re-eruption (1-6 mån). Extrahera vid ankylering eller infektion."
      ]
    },
    journal: "Diagnos: S03.2 Luxation av tand. \nAnamnes: Trauma mot munnen [Tid]. Ingen medvetslöshet. \nStatus: Tand [nr] [beskriv läge/rörlighet]. Ingen bettstörning. \nÅtgärd: Info om mjuk kost. Kontroll om 1v.",
    redFlags: [
      { id: "p41-1", title: "Hjärnskakning", description: "Medvetslöshet/kräkning -> Barnakut direkt.", severity: "critical" },
      { id: "p41-2", title: "Apex mot anlag", description: "Vid intrusion: Om apex slagit in i anlaget -> Extraktion.", severity: "warning" }
    ],
    kallor: ["IADT Guidelines 2020", "Internetodontologi: Trauma primära tänder"]
  },
  "sc42": {
    id: "PEDO-42",
    slug: "exartikulation-primara",
    title: "Exartikulation (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "Tanden har slagits ut helt och hållet",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "Replantera ALDRIG en mjölktand pga risk för skada på permanent anlag." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var är tanden?", a: "Viktigt att veta om den är svald, aspirerad eller hittad." }
      ],
      kompletterande: ["Vakna nätter?", "Andningsbesvär? (Aspiration?)"]
    },
    status: {
      inspektion: ["Tom alveol.", "Röntgen för att utesluta intrusion (om tanden ej hittats)."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Snygga till sårkanter.",
        "Bit i kompress vid blödning.",
        "Information: Tanden sätts ej tillbaka. Ingen luckhållare behövs normalt i fronten."
      ]
    },
    journal: "Diagnos: S03.24 Exartikulation tand [nr]. \nÅtgärd: Ingen replantation utförd. Info om skaderisk på permanent anlag.",
    redFlags: [
      { id: "p42-1", title: "Aspiration", description: "Om tanden saknas och barnet hostar -> Akut lungröntgen.", severity: "critical" }
    ],
    kallor: ["Internetodontologi"]
  },
  "sc43": {
    id: "PEDO-43",
    slug: "kronfraktur-primara",
    title: "Kronfraktur (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "En bit av tanden har gått av",
    icdCode: "S02.5",
    isAcute: false,
    snabbOversikt: [
      { label: "Mål", text: "Skydda pulpan och undvika smärta." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Ilar det?", a: "Tyder på dentinblotta." },
        { q: "Blöder det från tanden?", a: "Pulpablotta (komplicerad fraktur)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Frakturlinje.", "Färg (gulaktig=dentin, röd punkt=pulpa)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Okomplicerad: Slipa vassa kanter. Ev. komposit om barnet koopererar.",
        "Komplicerad: Hos små barn ofta extraktion. Vid god kooperation: Pulpotomi (Cvek) eller partiell pulpotomi."
      ]
    },
    journal: "Diagnos: S02.51 Okomplicerad kronfraktur. \nÅtgärd: Slipning av vassa kanter.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc44": {
    id: "PEDO-44",
    slug: "rotfraktur-primara",
    title: "Rotfraktur (Mjölktand)",
    category: "Trauma - Primära",
    patientQuote: "Tanden är väldigt lös och går av under tandköttet",
    icdCode: "S02.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Princip", text: "Extrahera det lösa kronsegmentet. Lämna rotspetsen om den sitter djupt." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Är tanden lös?", a: "Rotfrakturer ger ofta extrem rörlighet." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Patologisk rörlighet.", "Röntgen (visar frakturlinje på roten)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extrahera det koronala fragmentet.",
        "Lämna rotspetsfragmentet om det sitter djupt och riskerar anlaget vid borttagning (resorberas normalt bort)."
      ]
    },
    journal: "Diagnos: S02.54 Rotfraktur tand [nr]. \nÅtgärd: Koronalt fragment extraherat u LA. Rotspets kvarlämnas.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },

  // --- TRAUMA PERMANENTA (45-48) ---
  "sc45": {
    id: "PEDO-45",
    slug: "alveolarfraktur-permanenta",
    title: "Alveolarfraktur",
    category: "Trauma - Permanenta",
    patientQuote: "Hela tandköttspartiet och flera tänder rör sig tillsammans",
    icdCode: "S02.8",
    isAcute: true,
    snabbOversikt: [
      { label: "Definition", text: "Ett block av ben och tänder rör sig som en enhet." },
      { label: "Prio", text: "SPECIALISTFALL (Käkkirurg/Pedodontist)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Huvudskada?", a: "Kraftigt våld -> hög risk för hjärnskada." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Bensegment rörligt vid palpation.", "Bettstörning."]
    },
    behandling: {
      title: "Akut handläggning",
      steps: [
        "Reponera segmentet med fingertryck (u LA).",
        "Fixera med flexibel splint 4 veckor.",
        "Remittera omedelbart till specialist."
      ]
    },
    journal: "Diagnos: S02.8 Fraktur av alveolarutskottet. \nÅtgärd: Reponering och splintning.",
    redFlags: [
      { id: "p45-1", title: "Segmentrörlighet", description: "Hela blocket rör sig -> Kräver fixering.", severity: "critical" }
    ],
    kallor: ["IADT Guidelines 2020"]
  },
  "sc46": {
    id: "PEDO-46",
    slug: "kronfraktur-permanenta",
    title: "Kronfraktur (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Barnet har slagit av en bit av den nya framtanden",
    icdCode: "S02.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Cvek-pulpotomi", text: "Guldstandard vid pulpablotta på unga tänder. Bevarar vitalitet för rotutveckling." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Finns fragmentet kvar?", a: "Kan limmas tillbaka med utmärkt estetik." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Pulpaexponering (röd punkt)?", "Dentinblotta?"]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Okomplicerad: Täck med komposit eller limma fragment.",
        "Komplicerad (< 2mm blotta, < 24h): Partiell pulpotomi (Cvek) med MTA/Bioceramer.",
        "Viktigt: Vidöppen apex -> bevara vitalitet till varje pris (Apexogenes)."
      ]
    },
    journal: "Diagnos: S02.52 Komplicerad kronfraktur tand [nr]. \nÅtgärd: Cvek-pulpotomi med MTA. Kompositfyllning.",
    redFlags: [],
    kallor: ["IADT Guidelines"]
  },
  "sc47": {
    id: "PEDO-47",
    slug: "konkussion-permanenta",
    title: "Konkussion (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Tanden fick en smäll och är jätteöm, men sitter fast",
    icdCode: "S03.2",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Ömhet vid perkussion, ingen ökad rörlighet, ingen lägesändring." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont att tugga?", a: "Ömhet är huvudsymtomet." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Inga synliga tecken.", "Ömhet vid horisontell/vertikal perkussion."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Expektans.",
        "Mjuk kost 1 vecka.",
        "Uppföljning av vitalitet efter 4v."
      ]
    },
    journal: "Diagnos: S03.20 Konkussion. \nÅtgärd: Information om mjuk kost.",
    redFlags: [],
    kallor: ["IADT"]
  },
  "sc48": {
    id: "PEDO-48",
    slug: "exartikulation-permanenta",
    title: "Exartikulation (Permanent)",
    category: "Trauma - Permanenta",
    patientQuote: "Hela tanden har slagits ut",
    icdCode: "S03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Tid är ALLT", text: "< 60 minuter torr tid är gränsen för god prognos." },
      { label: "Förvaring", text: "Mjölk, saliv eller koksalt. ALDRIG torrt eller i kranvatten." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur länge har tanden varit ute?", a: "Över 60 min torr tid = dålig prognos." },
        { q: "Var har tanden varit?", a: "Förvaring i mjölk bevarar PDL-celler." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Tom alveol.", "Kontrollera tanden: Roten intakt? Smuts?"]
    },
    behandling: {
      title: "HYPERAKUT ÅTGÄRD",
      steps: [
        "Rör ej roten! Håll i kronan.",
        "Skölj varsamt med NaCl om smutsig.",
        "Replantera direkt.",
        "Fixera med flexibel splint 2 veckor.",
        "Antibiotika (PcV eller Doxycyklin >12 år).",
        "Remiss för endo inom 7-10 dagar (om stängd apex)."
      ]
    },
    journal: "Diagnos: S03.24 Exartikulation permanent tand. \nÅtgärd: Replanterad efter [X] min. Splintad.",
    redFlags: [
      { id: "p48-1", title: "Tidskritisk", description: "> 60 min ute -> Mycket hög risk för ersättningsresorption.", severity: "warning" }
    ],
    kallor: ["IADT Guidelines 2020"]
  },

  // --- AKUT - SMÄRTA & INFEKTION (39, 50-58) ---
  "sc39": {
    id: "PEDO-39",
    slug: "mih",
    title: "MIH (Molar Incisor Hypomineralization)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Det ilar och gör ont när jag tuggar, och den nya kindtanden ser gul och trasig ut",
    icdCode: "K00.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Prevalens", text: "Ca 18% av barn. Ålder: 6–11 år." },
      { label: "Klinik", text: "Opaka fläckar, post-eruptivt emaljsönderfall (PEB)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hypersensibilitet vid tandborstning/kyla?", a: "Typiskt för MIH." }
      ],
      kompletterande: ["Problem vid tuggning?"]
    },
    status: {
      inspektion: ["Opaka vita/gula/bruna fläckar.", "PEB - tanden spricker kort efter frambrott."],
      kliniskaFynd: ["Kraftig sensibilitet - blästra försiktigt!"]
    },
    behandling: {
      title: "Handläggning (Steg för Steg)",
      steps: [
        "Prevention: Fluorlack (Duraphat) regelbundet.",
        "Restorativt: GIC-förband om ej helt frambruten. Komposit vid karies/fraktur.",
        "Stålkrona (SSC): Vid omfattande sönderfall. Mycket bra långtidsprognos.",
        "Extraktion: Optimalt när 7:ans bifurkation precis börjar mineraliseras (8-9 år)."
      ]
    },
    journal: "Diagnos: K00.4 MIH. \nStatus: Tand [nr] frambruten med opaka gul/bruna fläckar. \nÅtgärd: Fluorlackning / [Stålkrona]. Remiss ortodontist vid behov.",
    redFlags: [],
    kallor: ["Internetodontologi", "Socialstyrelsen NR 2022"]
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
      { label: "Princip", text: "Selektiv exkavering - lämna mjuk karies vid pulpalväggen för att undvika exponering." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Spontansmärta eller nattsmärta?", a: "Nej = Reversibel pulpit. Ja = Irreversibel (se SC51)." }
      ],
      kompletterande: ["Fistel/svullnad? (se SC53)"]
    },
    status: {
      inspektion: ["Djup karies.", "Ingen fistel/svullnad."]
    },
    behandling: {
      title: "Selektiv Exkavering",
      steps: [
        "LA (Citanest Dental Octapressin).",
        "Ta rent perifert till hårt dentin.",
        "Lämna mjuk karies pulpalvägg.",
        "Tätslutande fyllning (GIC/Komposit/Stålkrona).",
        "Hall Technique: SSC direkt utan kariesborttagning (vid låg kooperation)."
      ]
    },
    journal: "Diagnos: K02.1 Karies i dentin. \nÅtgärd: Selektiv exkavering utförd. Tätslutande fyllning placerad.",
    redFlags: [
      { id: "p50-1", title: "Spontansmärta", description: "Betyder irreversibel pulpit -> EXTRAKTION.", severity: "warning" }
    ],
    kallor: ["SBU", "Socialstyrelsen NR 2022"]
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
      { label: "Prio", text: "Smärtlindring via extraktion." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Nattlig spontansmärta?", a: "Kriterium för irreversibel pulpit." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Djupt kariesangrepp i pulpa."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extraktion är FÖRSTAHANDSVAL.",
        "Undvik tvångsingrepp (PSL 2010:659).",
        "Pulpektomi utförs sällan i primära tänder."
      ]
    },
    journal: "Diagnos: K04.01 Irreversibel pulpit. \nÅtgärd: LA. Extraktion av tand [nr]. Hemostas kontrollerad.",
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
      { label: "Mål", text: "Apexogenes: bevara rotens tillväxtpotential." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Spontansmärta?", a: "Ja -> Irreversibel pulpit." }
      ],
      kompletterande: ["Öppet apex radiologiskt?"]
    },
    status: {
      inspektion: ["Djup karies / Trauma.", "Öppet apex på rtg."],
      kliniskaFynd: ["Hemostas med NaCl (vitalitetstecken)."]
    },
    behandling: {
      title: "Pulpotomi (Apexogenes)",
      steps: [
        "Kofferdam OBLIGATORISKT.",
        "Trepanation till kanalmynning.",
        "Hemostas med steril koksaltpellet (1-5 min).",
        "Applicera MTA eller Biodentine mot rotpulpan.",
        "MTA kräver fuktad pellet + återbesök 24-48h för slutlig fyllning."
      ]
    },
    journal: "Diagnos: K04.01 Irreversibel pulpit tand [nr]. \nÅtgärd: Partiell pulpotomi med MTA. Kofferdam använd.",
    redFlags: [
      { id: "p52-1", title: "Ofullständig hemostas", description: "Blödning upphör ej -> Nekros/inflammation djupare (Apexifikation).", severity: "warning" }
    ],
    kallor: ["IADT 2020", "Internetodontologi", "MTA-protokoll Dentsply"]
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
      { label: "Princip", text: "Extrahera mjölktand för att skydda permanent anlag." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Feber eller allmänpåverkan?", a: "Indikerar systemisk spridning (se SC54)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Fistel ('finne') eller lokal svullnad.", "Perkussionsömhet."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Extraktion = Primär behandling.",
        "Ingen antibiotika vid lokal fistel (Strama).",
        "Incision om fluktuerande svullnad.",
        "Platsbevarare övervägs om >1 år till eruption."
      ]
    },
    journal: "Diagnos: K04.6 Periapikalabscess med fistel. \nÅtgärd: LA. Extraktion tand [nr]. Pus dränerat. Ingen antibiotika (Strama).",
    redFlags: [],
    kallor: ["Strama", "Läkemedelsverket 2014"]
  },
  "sc54": {
    id: "PEDO-54",
    slug: "cellulit-spridd-infektion",
    title: "Cellulit / Spridd infektion",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnets ansikte/kind har svullnat upp enormt och hen har feber",
    icdCode: "L03.2",
    isAcute: true,
    snabbOversikt: [
      { label: "VARNING", text: "Livshotande tillstånd. Sprider sig snabbt hos barn." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Svårt att svälja eller andas?", a: "JA -> Akut remiss sjukhus direkt." },
        { q: "Trismus (svårt att gapa)?", a: "Tecken på spridning till tuggmuskler." }
      ],
      kompletterande: ["Feber > 38C?"]
    },
    status: {
      inspektion: ["Extraoral svullnad.", "Feber.", "Slött/allmänpåverkat barn."]
    },
    behandling: {
      title: "Handläggning (Akut)",
      steps: [
        "Eliminera orsak (Extraktion/Incision) om möjligt.",
        "Antibiotika (Strama): PcV 12.5 mg/kg x 3 (max 1g x 3) 7 dgr.",
        "AKUT REMISS vid sväljningsbesvär, ögonsvullnad eller trismus."
      ]
    },
    journal: "Diagnos: L03.2 Cellulit i ansiktet. \nÅtgärd: Akut extraktion för dränage. Telefonkontakt Käkkirurg/Barnakut. Remitterad.",
    redFlags: [
      { id: "p54-1", title: "Luftvägar", description: "Svårighet att svälja/andas -> Livshotande.", severity: "critical" },
      { id: "p54-2", title: "Ögonengagemang", description: "Svullnad mot ögat -> Risk för intrakraniell spridning.", severity: "critical" }
    ],
    kallor: ["Strama", "Läkemedelsverket 2014"]
  },
  "sc55": {
    id: "PEDO-55",
    slug: "perikoronit-barn",
    title: "Perikoronit (Barn/Ungdom)",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Det gör ont längst bak vid den nya tanden",
    icdCode: "K05.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Klinik", text: "Inflammation runt frambrytande 6:a eller 7:a." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont att gapa?", a: "Trismus indikerar spridning." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Rodnat/svullet operculum.", "Debris under fliken."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Spolning med NaCl eller Klorhexidin.",
        "Inslipning av antagonist om den traumatiserar fliken.",
        "Xylocain gel lokalt.",
        "Antibiotika ges EJ vid okomplicerad perikoronit."
      ]
    },
    journal: "Diagnos: K05.2 Akut perikoronit. \nÅtgärd: Spolning under operculum. [Antagonist slipad]. Info.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc56": {
    id: "PEDO-56",
    slug: "postextraktionsblodning-barn",
    title: "Postextraktionsblödning",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Vi drog ut en tand i morse, och nu är kudden full av blod",
    icdCode: "T81.0",
    isAcute: true,
    snabbOversikt: [
      { label: "Orsak", text: "Ofta pga 'pillande' eller sugande på såret. Uteslut koagulationsrubbning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Lätt för blåmärken/näsblod?", a: "Snabbkoagulationsanamnes." }
      ],
      kompletterande: ["Ibuprofen-intag?"]
    },
    status: {
      inspektion: ["Leverkoagel (geléaktigt koagel).", "Läckage från alveol."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Rengör alveolen (ta bort lösa koagel).",
        "Tryckförband (kompress med Cyklokapron) 30 min.",
        "Suturering vid behov.",
        "EJ NSAID (Ipren) vid blödning."
      ]
    },
    journal: "Diagnos: T81.0 Blödning efter ingrepp. \nÅtgärd: Tryckförband 30 min. Hemostas uppnådd.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc57-akut": {
    id: "PEDO-57A",
    slug: "spontan-gingival-blodning",
    title: "Spontan gingival blödning",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Tandköttet börjar blöda helt utan anledning",
    icdCode: "K05.1",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "Kan vara första tecknet på Leukemi." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Ovanligt trött / Blåmärken?", a: "JA -> Misstänk malignitet." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Generaliserad svullnad.", "Spontanblödning från papiller.", "Blek slemhinna."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "INGA invasiva ingrepp.",
        "AKUT REMISS barnläkare för blodstatus (diff).",
        "Märk remiss: 'Misstänkt malignitet'."
      ]
    },
    journal: "Diagnos: Gingivit (diff diagnos leukemi). \nÅtgärd: Akut remiss barnläkare.",
    redFlags: [
      { id: "p57-1", title: "Leukemi", description: "Trötthet + blåmärken + blödning -> Akut utredning.", severity: "critical" }
    ],
    kallor: ["Internetodontologi"]
  },
  "sc58": {
    id: "PEDO-58",
    slug: "systemisk-risk-leukemi",
    title: "Systemisk risk / Leukemi",
    category: "Akut - Smärta & Infektion",
    patientQuote: "Barnet är blekt och har svullet tandkött",
    icdCode: "C91.0",
    isAcute: true,
    snabbOversikt: [
      { label: "Klinik", text: "Gingivahyperplasi, blekhet, petekier, feber." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Nattliga svettningar?", a: "JA -> Tecken på malignitet." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Peteckier i gommen.", "Svullna lymfkörtlar."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Omedelbar remiss barnläkare.",
        "Undvik alla ingrepp (neutropenirisk)."
      ]
    },
    journal: "Diagnos: Misstänkt hematologisk sjukdom. \nÅtgärd: Akut remiss.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },

  // --- MUNSLEMHINNA & SYSTEM (57, 59-61, 65-73) ---
  "sc57-laceration": {
    id: "PEDO-57B",
    slug: "traumatisk-mjukdelsblodning",
    title: "Traumatisk mjukdelsblödning (Laceration)",
    category: "Munslemhinna & System",
    patientQuote: "Barnet har skurit sig i läppen/tungan",
    icdCode: "S01.5",
    isAcute: true,
    snabbOversikt: [
      { label: "Klinik", text: "Sårskada i läpp, tunga eller slemhinna." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Finns tandfragment i såret?", a: "Viktigt vid läppsår efter tandfraktur -> Palpera noga." }
      ],
      kompletterande: ["Stelkrampsskydd?"]
    },
    status: {
      inspektion: ["Sårskadans djup.", "Går det genom läppröda gränsen? (Specialistfall för estetik)."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Rengör noga ( NaCl).",
        "Suturera vid behov (absorberbar tråd hos barn).",
        "Viktigt: Genomgående sår eller sår i läppröda gränsen bör sys av kirurg/plastikkirurg för optimal estetik."
      ]
    },
    journal: "Diagnos: S01.5 Laceration läpp. \nÅtgärd: Rengöring. Suturering 2 stygn.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc59": {
    id: "PEDO-59",
    slug: "eruptionscysta",
    title: "Eruptionscysta / Hematom",
    category: "Munslemhinna & System",
    patientQuote: "En blå/mörk bula där tanden ska komma",
    icdCode: "K09.8",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Mjuk, blåskimrande svullnad över en frambrytande tand." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont?", a: "Oftast helt smärtfritt." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Blåaktig cysta på alveolarutskottet."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Expektans. Cystan spricker när tanden bryter igenom.",
        "Info: Ofarligt. Inget ingrepp behövs."
      ]
    },
    journal: "Diagnos: K09.8 Eruptionscysta. \nÅtgärd: Information till föräldrar.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc60": {
    id: "PEDO-60",
    slug: "ektopisk-eruption-6a",
    title: "Ektopisk eruption av 6-årsmolar",
    category: "Munslemhinna & System",
    patientQuote: "6-årsmolaren verkar sitta fast under mjölktanden",
    icdCode: "K01.1",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "6:an resorberar distala roten på 5:an och fastnar." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Ont eller rörlig 5:a?", a: "Vanliga symtom." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Resorption av 05:ans distala rot på rtg.", "Lutning av 6:an."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Lindriga fall: Expektans (många rätar upp sig spontant).",
        "Uttalad resorption: Mässingstråd eller separationsgummiring för att 'knuffa' tanden distalt.",
        "Svåra fall: Extraktion av 05:an -> remiss ortodonti för platsbevarande."
      ]
    },
    journal: "Diagnos: K01.1 Ektopisk eruption 16. \nÅtgärd: Expektans 6 mån.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc61": {
    id: "PEDO-61",
    slug: "natal-tand",
    title: "Natal / Neonatal tand",
    category: "Munslemhinna & System",
    patientQuote: "Barnet föddes med en tand eller fick en direkt efter födseln",
    icdCode: "K00.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Natal", text: "Finns vid födseln." },
      { label: "Neonatal", text: "Kommer inom 30 dagar." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Problem vid amning?", a: "Vass tand kan ge sår på barnets tunga eller mammans bröstvårta." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Ofta rörlig tand (saknar rot).", "Sår på tungans undersida (Rigafede)."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Om tanden sitter fast och ej stör: Låt sitta.",
        "Om tanden är extremt rörlig (aspirationsrisk) eller stör amning kraftigt: Extraktion.",
        "Viktigt: Oftast en del av det normala mjölktandssetet (extraktion = glugg tills 7 år)."
      ]
    },
    journal: "Diagnos: K00.6 Nataltand. \nÅtgärd: Information. Slipning av vass kant.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc65": {
    id: "PEDO-65",
    slug: "herpes-gingivostomatit",
    title: "Primär herpetisk gingivostomatit",
    category: "Munslemhinna & System",
    patientQuote: "Hela munnen är full av blåsor och barnet vill inte äta/dricka",
    icdCode: "B00.2",
    isAcute: true,
    snabbOversikt: [
      { label: "Klinik", text: "Hög feber, dregling, extremt rött/svullet tandkött, multipla vesikler/sår." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kissar barnet?", a: "Viktigt för att utesluta dehydrering (uttorkning)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Generaliserad rodnad gingiva.", "Vesikler på både fast och rörlig slemhinna.", "Lymfadenopati."]
    },
    behandling: {
      title: "Handläggning",
      steps: [
        "Symtomlindring: Paracetamol + Ibuprofen.",
        "Nutrition: Kall, mjuk mat. Sugrör. Glass.",
        "Xylocain viskös före mat (penslas varsamt).",
        "Antivirala medel (Zovirax): Endast vid mycket svåra fall och insatt tidigt (< 72h).",
        "Varning: Vid dehydrering -> Akut remiss för dropp."
      ]
    },
    journal: "Diagnos: B00.2 Herpetisk gingivostomatit. \nÅtgärd: Info om nutrition. Smärtlindring ordinerad.",
    redFlags: [
      { id: "p65-1", title: "Dehydrering", description: "Barnet slutar dricka pga smärta -> Risk för uttorkning.", severity: "critical" }
    ],
    kallor: ["Internetodontologi"]
  },
  "sc66": {
    id: "PEDO-66",
    slug: "afte-barn",
    title: "Aftös stomatit (Afte)",
    category: "Munslemhinna & System",
    patientQuote: "Enstaka vita sår som svider",
    icdCode: "K12.0",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Runda sår med röd halo. Endast på rörlig slemhinna." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Feber?", a: "Nej vid afte (skiljer från herpes)." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Välavgränsade fibrinbelagda sår."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Aftamed (skyddande hinna).",
        "Vid stora besvär: Lokala steroider (Kenacort i Orabase) - kräver kooperation.",
        "Info: Självläker på 7-10 dagar."
      ]
    },
    journal: "Diagnos: K12.0 Afte. \nÅtgärd: Info.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc67": {
    id: "PEDO-67",
    slug: "anug-barn",
    title: "ANUG hos barn (Varning)",
    category: "Munslemhinna & System",
    patientQuote: "Extrem smärta och det luktar väldigt illa ur munnen",
    icdCode: "A69.1",
    isAcute: true,
    snabbOversikt: [
      { label: "Varning", text: "Mycket ovanligt hos barn i I-länder. Kan tyda på grav immunosuppression eller undernäring." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Andra sjukdomar?", a: "Kolla immunstatus." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Utstansade papiller.", "Nekrotiska grå beläggningar.", "Kraftig fetor ex ore."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Försiktig rengöring med H2O2.",
        "Antibiotika: Metronidazol.",
        "UTREDNING: Remiss till barnläkare för immunutredning."
      ]
    },
    journal: "Diagnos: A69.1 ANUG. \nÅtgärd: Rengöring. Remiss barnläkare.",
    redFlags: [
      { id: "p67-1", title: "Immunstatus", description: "ANUG hos barn kräver medicinsk utredning.", severity: "warning" }
    ],
    kallor: ["Internetodontologi"]
  },
  "sc68": {
    id: "PEDO-68",
    slug: "mucocele",
    title: "Mucocele (Slemcysta)",
    category: "Munslemhinna & System",
    patientQuote: "En kula i läppen som kommer och går",
    icdCode: "K11.6",
    isAcute: false,
    snabbOversikt: [
      { label: "Klinik", text: "Blåaktig mjuk bula, oftast i underläppen." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Har barnet bitit sig?", a: "Trauma mot spottkörtelutförsgång är orsaken." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Mjuk fluktuerande svullnad."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Expektans (många brister och försvinner).",
        "Vid recidiv: Kirurgisk extirpation (Specialistfall för barn)."
      ]
    },
    journal: "Diagnos: K11.6 Mucocele. \nÅtgärd: Info.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc69": {
    id: "PEDO-69",
    slug: "brannskada-bitsar",
    title: "Brännskada & Iatrogent bitsår",
    category: "Munslemhinna & System",
    patientQuote: "Vitt sår på läppen dagen efter bedövning",
    icdCode: "S00.5",
    isAcute: false,
    snabbOversikt: [
      { label: "Diagnostisk fälla", text: "Vitt fibrinbelagt sår efter bedövning är NÄSTAN ALLTID ett bitsår, inte en infektion/var." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Fick barnet bedövning igår?", a: "Klassisk orsak: Barnet biter i bedövad läpp." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: ["Stort sår med vit fibrinbeläggning.", "Kraftig mjukdelssvullnad."]
    },
    behandling: {
      title: "Åtgärd",
      steps: [
        "Information: Det är inte var, det är fibrin. Självläker på 7-14 dagar.",
        "Xylocain gel före mat.",
        "Vaselin för att skydda läppen."
      ]
    },
    journal: "Diagnos: S00.5 Bitsår i underläpp. \nÅtgärd: Info om läkningsförlopp.",
    redFlags: [],
    kallor: ["Internetodontologi"]
  },
  "sc70": {
    id: "PEDO-70",
    slug: "koagulationsrubbning",
    title: "Koagulationsrubbning",
    category: "Munslemhinna & System",
    patientQuote: "Barnet har hemofili/blödarsjuka",
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
        { q: "Har barnet ätit frukost?", a: "Viktigt om de tagit sitt insulin." }
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
        { q: "Fasta?", a: "Har barnet ätit? (Aspirationsrisk vid kräkning)." }
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

  // --- AKUT ORTODONTI (ORT-10 till ORT-14) ---
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
