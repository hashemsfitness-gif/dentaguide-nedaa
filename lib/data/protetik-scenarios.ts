// lib/data/protetik-scenarios.ts
// All clinical data extracted from protetik_och_bettfunktion_html_JUSTERAD.html
// ICD-koder visas BARA i scenario-header — ALDRIG i journal-malltext (PSL 2010:659)

export interface ProtetikRedFlag {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning";
}

export interface ProtetikBehandling {
  alt: string;
  title: string;
  indikation?: string;
  steg: string[];
  koder?: string;
  specialist?: boolean;
}

export interface ProtetikMaterialval {
  intro?: string;
  alternativ: Array<{
    kategori: string;
    material: string;
    cement: string;
    notering?: string;
  }>;
  eugenolRegel?: string;
}

export interface ProtetikScenario {
  slug: string;
  scId: string;
  icd: string;
  name: string;
  patientUtsaga: string;
  isAcute: boolean;
  category: "Protetik & Bettfunktion";

  snabbOversikt: Array<{ label: string; text: string }>;

  anamnes: {
    obligatoriska: Array<{ q: string; a: string }>;
    kompletterande: string[];
    varning?: string;
  };

  status: {
    inspektion: string[];
    extra?: Array<{ title: string; items: string[] }>;
    ferrule?: { kravet: string; kontraindikation: string };
  };

  behandling: ProtetikBehandling[];
  materialval?: ProtetikMaterialval;

  uppfoljning: string[];

  journal: {
    malltext: string;
    tlvKoder: Array<{ kod: string; beskrivning: string }>;
    tlvNotering?: string;
  };

  diffDiagnoser: Array<{ namn: string; kod: string; skillnad: string }>;
  kliniskaAnteckningar: string;
  verktyg: Array<"implantat-torque" | "ferrule-kalkylator">;
  redFlags: ProtetikRedFlag[];
}

export const protetikScenarier: Record<string, ProtetikScenario> = {
  "lossnad-tillfallig-krona": {
    slug: "lossnad-tillfallig-krona",
    scId: "PROT-15-PROV",
    icd: "Z46.3 (Justering tandprotes) / K08.5 (Otillfredsställande tandersättning)",
    name: "Lossnad tillfällig krona (provisorium)",
    patientUtsaga: "Min tillfälliga krona har trillat loss",
    isAcute: false,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Lossnat provisorium — behöver skyddas akut för att förhindra tandvandring och pulpit." },
      { label: "Risker", text: "Tandvandring (elongation/tippning) inom dagar → permanent krona passar inte. Pulpit vid öppen dentinyta." },
      { label: "Klinisk indikation", text: "Skydda preparerad tand och säkra utrymmet för kommande permanenta konstruktion." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "När lossnade den?", a: "Nyligen (timmar/1 dygn): God prognos. Länge sedan (>3–4 dagar): Risk för tandvandring — permanent krona kanske inte passar." },
        { q: "Har du kvar provisoriet?", a: "Ja: Be patienten ta med det. Nej/Trasigt: Nytt måste framställas." },
        { q: "Ilar det i tanden?", a: "Öppen dentinyta eller risk för pulpit." },
        { q: "Kan du bita ihop som vanligt?", a: "Om nej kan tanden ha elongerat." },
      ],
      kompletterande: [
        "Vilken typ av permanent konstruktion är planerad? (Avgör val av temporärt cement)",
        "Vilken typ av cement användes ursprungligen?",
        "Hur länge sitter patienten kvar i behandlingen?",
      ],
    },

    status: {
      inspektion: [
        "Inspektion av tand (preparerade): Karies? Hel preparation? Gamla cementrester (avlägsna med ultraljud/sond).",
        "Gingiva: Svullet/hyperplastiskt som täcker preparationsgränsen? (Kan kräva gingivektomi).",
        "Inspektion av provisorium: Passar det? Glipar det? Är det helt eller spräckt?",
        "Ocklusionskontroll: Kontrollera höjd — om provisoriet känns högt kan tanden ha elongerat.",
      ],
    },

    behandling: [
      {
        alt: "ALT A",
        title: "Recementera (Om provisoriet passar)",
        indikation: "Provisoriet är helt och tanden har ej vandrat.",
        steg: [
          "Rengöring: Avlägsna gamla cementrester från tand och provisorium. Tvätta med klorhexidin/sprit.",
          "Inprovning: Kontrollera att det går ner helt. Justera approximala kontakter om trångt.",
          "Val av cement: Standard: ZOE (TempBond). Om permanent ska bondas (helkeram): Eugenolfritt (TempBond NE) — eugenol hämmar komposithärdning.",
          "Cementering: Fyll kronan, tryck på plats, bettamponad. Avlägsna överskott noga (särskilt approximalt).",
        ],
        koder: "103, 811",
      },
      {
        alt: "ALT B",
        title: "Nyframställning (Klinikframställd)",
        indikation: "Provisoriet är borta, trasigt eller passar inte längre.",
        steg: [
          "Avtryck: Använd befintligt 'före-avtryck' (putty/alginat) om sparat. Annars prefabricerad kronform (Directa/Frasaco).",
          "Material: Bis-akrylat (Luxatemp/Protemp).",
          "Anpassning: Fyll formen, placera på tanden (pensla vaselin på tanden). Låt stelna, trimma kanter. Polera.",
          "Cementering: Enligt ALT A.",
        ],
        koder: "103, 811",
      },
      {
        alt: "ALT C",
        title: "Långtidsprovisorium (Tandtekniker)",
        indikation: "Vid större broar eller förlängd behandlingstid (parodontal sanering/läkning). Kräver avtryck och återbesök.",
        steg: [
          "Ta alginatavtryck.",
          "Skicka till tandtekniker för labframställt provisorium.",
          "Temporärt cement: TempBond NE eller GIC (för >6 månader).",
        ],
        koder: "103, 809, 811",
      },
    ],

    materialval: {
      intro: "Valet styrs av den planerade permanenta terapin. Kontrollera journalen: Ska konstruktionen bondas eller cementeras konventionellt?",
      eugenolRegel: "Bondad protetik (helkeram, fasad, zirkonia med bonding): ALDRIG eugenol — hämmar kompositcementets härdning. Använd TempBond NE (utan modifier) eller TempBond Clear.",
      alternativ: [
        {
          kategori: "Helkeram / Fasad (Bondas)",
          material: "Bis-akrylat (Luxatemp, Protemp) eller Clip",
          cement: "TempBond NE (utan modifier), TempBond Clear eller Temposil",
          notering: "ALDRIG EUGENOL — inkl. TempBond NE Modifier",
        },
        {
          kategori: "MK-krona / Guld (Cementeras)",
          material: "Bis-akrylat, Directakrona (polykarbonat), Aluminiumhätta",
          cement: "Nobetec (bra vid dålig retention), TempBond (original)",
          notering: "Eugenol tillåts",
        },
        {
          kategori: "Zirkonia (Bondas)",
          material: "Bis-akrylat",
          cement: "TempBond NE",
          notering: "Undvik eugenol om bondning planeras",
        },
        {
          kategori: "Långtidsprovisorium (>6 månader)",
          material: "Labframställd akrylat",
          cement: "TempBond NE eller GIC",
          notering: "Ska sitta >6 månader",
        },
      ],
    },

    uppfoljning: [
      "Kontrollera retention och ocklusion vid nästa besök.",
      "Informera patienten att vara försiktig med seg/hård mat.",
      "Om provisoriet lossnar igen — se över retention eller accelerera permanent konstruktion.",
      "Ordinarie tid för utlämning av permanent konstruktion kvarstår.",
    ],

    journal: {
      malltext: `Orsak: Lossnat provisorium regio [XX].
Anamnes: Lossnade igår i samband med måltid. Inga isningar.
Status: Prep ua, inga frakturer. Provisorium helt.
Åtgärd: Rengöring av prep och provisorium. Inprovning ok.
Recementering med TempBond NE (eugenolfritt).
Ocklusionskontroll ua.
Info: Pat uppmanad att vara försiktig med seg/hård mat.
Ordinarie tid för utlämning [Datum].`,
      tlvKoder: [
        { kod: "103", beskrivning: "Kompletterande undersökning / akutbesök" },
        { kod: "809", beskrivning: "Långtidstemporär laboratorieframställd krona (om >6 mån)" },
        { kod: "811", beskrivning: "Cementering av lossnad protetisk konstruktion, per stöd" },
      ],
      tlvNotering: "Åtgärder för temporära ersättningar under pågående protetisk behandling ingår ofta i arvodet för den permanenta konstruktionen (800-koder) och debiteras ej separat.",
    },

    diffDiagnoser: [
      { namn: "Lossnad permanent krona", kod: "K08.5", skillnad: "Permanent ersättning — annan cementtyp och prognosbedömning." },
      { namn: "Karies under kanten", kod: "K02.1", skillnad: "Mjukt dentin på stödtanden — kan hindra recementering, kräver sanering." },
    ],

    kliniskaAnteckningar:
      "Temp-cement ALLTID — aldrig permanent cement för provisorium. Om permanent ska bondas (helkeram, fasad): eugenolfritt cement obligatoriskt. TempBond NE Modifier innehåller eugenol — undvik. Provisorium skyddar preparationen och håller plats.",

    verktyg: [],

    redFlags: [
      {
        id: "prot15-1",
        title: "Tandvandring",
        description: "Om provisoriet suttit löst >3–4 dagar kan tanden ha elongerat. Den permanenta kronan kanske inte passar — kräver nytt avtryck och ny konstruktion.",
        severity: "warning",
      },
      {
        id: "prot15-2",
        title: "Pulpit / Isningar",
        description: "Öppen dentinyta utan provisorium = risk för pulpit. Skynda med recementering. Om pulpit utvecklas → endodonti krävs.",
        severity: "warning",
      },
    ],
  },

  "implantat-komplikation": {
    slug: "implantat-komplikation",
    scId: "PROT-16-IMPKOMP",
    icd: "T85.6 (Mekanisk komplikation av tandimplantat)",
    name: "Implantat-komplikation (lossnad/glappar)",
    patientUtsaga: "Min implantattand sitter löst / glappar",
    isAcute: true,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Implantatkronan känns lös, glappar eller har trillat av." },
      { label: "Risker", text: "Aspiration av komponenter (kronan/skruven). Skruvfraktur eller implantatfraktur vid fortsatt belastning." },
      { label: "Differentiering", text: "Protetisk komplikation (lossnad skruv) vs biologisk (periimplantit) vs totalförlust (lossnad fixtur)." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Rör sig tanden eller har den trillat ut?", a: "Avgör om det är kronan eller hela implantatet som rör sig." },
        { q: "Gör det ont?", a: "Smärta vid belastning → periimplantit eller förlust av osseointegration. Ingen smärta → lossnad skruv (teknisk komplikation)." },
        { q: "När installerades implantatet?", a: "Lossnade skruvar vanligare det första året ('settling in')." },
        { q: "Vet du vilket implantatsystem det är?", a: "Utan rätt skruvmejsel kan behandling ej utföras. Kontrollera journalen noggrant." },
      ],
      kompletterande: [
        "Har detta hänt tidigare?",
        "Tandgnissling / parafunktioner?",
        "Regelbundna implantatkontroller utförda?",
      ],
      varning: "⚠️ Implantatdata är kritisk — verifiera alltid implantatsystem i journalen innan åtgärd.",
    },

    status: {
      inspektion: [
        "Mobilitet: Vicka på konstruktionen. Glappar bara kronan → sannolikt lossnad skruv/cementering. Rör sig hela implantatet → fixturförlust.",
        "Rotation: Kan kronan roteras? Tyder på lossnad skruv/distans.",
        "Perkussion: Stumt/hårt ljud = implantatet sitter fast (bra). Dovt ljud/smärta = kan vara löst eller skadat.",
        "Röntgen (obligatoriskt): Spalt mellan implantat och distans bekräftar lossnad skruv. Bennivå (uteslut periimplantit). Frakturlinje på skruv eller implantatkropp.",
      ],
    },

    behandling: [
      {
        alt: "ALT A",
        title: "Lossnad skruv (Screw Loosening)",
        indikation: "Kronan rör sig, ingen smärta, implantatet sitter fast. Spalt syns på röntgen.",
        steg: [
          "Avlägsna fyllning: Borra försiktigt upp kompositen som täcker skruvhålet (access hole).",
          "Kontrollera skruven: Om hel — dra åt. Om deformerad/sträckt — byt till ny originalskruv.",
          "Momentdragning (Torque): Dra åt med just detta systems tillverkarspecifikation — kontrollera IFU/journal. ALDRIG generella värden utan verifiering.",
          "Försegling: Teflontejp/bomullspellet över skruvhuvudet → komposit. Putsa och kontrollera ocklusion.",
        ],
        koder: "103, 897, 301",
      },
      {
        alt: "ALT B",
        title: "Lossnad cementerad krona",
        indikation: "Kronan lossnar från distansen, distansen sitter kvar på implantatet.",
        steg: [
          "Rengöring: Avlägsna gammalt cement från krona och distans.",
          "Kontroll: Sitter distansen fast? Om distansskruven lös → dra åt först.",
          "Recementering: Var extremt noga med att ta bort cementöverskott subgingivalt (undvik periimplantit).",
        ],
        koder: "881, 103",
      },
      {
        alt: "ALT C",
        title: "Frakturerad skruv",
        indikation: "Kronan har trillat av eller är mycket lös. Skruven har gått av inuti implantatet.",
        steg: [
          "Försök rotera ut kvarvarande skruvbiten med sondspets eller ultraljud (moturs).",
          "Varning: Borra inte ner i skruven om risk att skada implantatets inre gängor — då blir implantatet obrukbart.",
          "Om fragmentet sitter hårt: Remittera till specialist med skruvutdragningskit.",
        ],
        koder: "Remiss specialist",
        specialist: true,
      },
      {
        alt: "ALT D",
        title: "Porslinsfraktur (Chip-off)",
        indikation: "Porslin har lossnat från implantatkronan — implantatet sitter fast.",
        steg: [
          "Liten fraktur: Putsa vasst/rått porslin. Polera.",
          "Större fraktur: Reparera med komposit (sandblästra, silanisera, bonda).",
          "Omfattande: Kronan måste göras om (kräver avtryck).",
        ],
        koder: "881",
      },
    ],

    uppfoljning: [
      "Kontrollera ocklusion efter åtdragning.",
      "Informera patienten: Om det lossnar igen bör skruven bytas.",
      "Ny röntgen vid behov för att verifiera bennivå.",
      "Vid recidiverande lossning → utredning av parafunktioner (bettskena?).",
    ],

    journal: {
      malltext: `Lossnad implantatskruv [Tandposition].
Anamnes: Söker för att implantatkronan känns lös/glappar sedan [Tid].
Ingen smärta.
Status: Kronan [nr] rörlig, implantatfixtur stabil (stumt ljud,
ingen perk-ömhet). Rtg visar spalt mellan fixtur och distans.
Inga tecken på fraktur.
Åtgärd: Avlägsnat fyllning i skruvhål. Skruv hel men lös.
Dragit åt skruv med moment [XX] Ncm (enligt tillverkarens IFU).
Återfyllt med teflon och komposit.
Ocklusionsjustering (lättat i artikulation).
Info: Om det lossnar igen bör skruven bytas.`,
      tlvKoder: [
        { kod: "103", beskrivning: "Akut undersökning" },
        { kod: "897", beskrivning: "Åtgärdande av tekniska implantatkomplikationer" },
        { kod: "881", beskrivning: "Reparation av fast implantatstödd konstruktion, mindre" },
        { kod: "301", beskrivning: "Sjukdomsbehandling (ocklusionsjustering/puts)" },
      ],
    },

    diffDiagnoser: [
      { namn: "Periimplantit (M27.62)", kod: "M27.62", skillnad: "Bennedbrytning + inflammation runt implantatet — biologisk komplikation, ej teknisk." },
      { namn: "Implantatfraktur", kod: "T85.6", skillnad: "Hela implantatkroppen frakturerad — synlig frakturlinje på RTG." },
      { namn: "Förlorad osseointegration", kod: "T85.6", skillnad: "Hela implantatet rörligt — ej att rädda, explantation krävs." },
    ],

    kliniskaAnteckningar:
      "⚠️ Verifiera torque mot tillverkarens IFU — ALDRIG generella värden utan verifiering. Vanliga system: Nobel ca 35 Ncm, Straumann BLT 35 Ncm, Astra EV 25 Ncm — MEN kontrollera alltid IFU. Svalgskydd vid arbete med lösa komponenter.",

    verktyg: ["implantat-torque"],

    redFlags: [
      {
        id: "prot16-1",
        title: "Implantatmobilitet — Fixturförlust",
        description: "Om hela implantatet rör sig (inte bara kronan) = förlust av osseointegration. Det går inte att skruva fast. Implantatet måste explanteras.",
        severity: "critical",
      },
      {
        id: "prot16-2",
        title: "Aspirationsrisk",
        description: "Implantatkomponenter är små och hala. Använd alltid svalgskydd eller säkra verktyg/kronor med tandtråd när du arbetar i munnen.",
        severity: "critical",
      },
      {
        id: "prot16-3",
        title: "Smärta vid åtdragning",
        description: "Om det gör ont när du drar åt skruven kan det finnas mjukvävnad i kläm eller en spricka i implantatet.",
        severity: "warning",
      },
    ],
  },

  "fraktur-stodtand": {
    slug: "fraktur-stodtand",
    scId: "PROT-17-FRAKPEL",
    icd: "S02.5 (Kron-rotfraktur) / K08.5 (Otillfredsställande tandersättning)",
    name: "Fraktur av stödtand (tanden sitter inuti kronan)",
    patientUtsaga: "Kronan har lossnat och tanden sitter kvar inuti",
    isAcute: true,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Permanent konstruktion lossnad — del av tanden/pelaren sitter kvar inuti kronan. I munnen syns en rotrest." },
      { label: "Klinisk indikation", text: "Avgör om roten kan sparas (ferrule ≥ 2mm, supragingivalt frakturplan) eller måste extraheras." },
      { label: "Kritisk regel", text: "Ferrule-effekt ≥ 2mm supragingivalt frisk tandsubstans — ALDRIG acceptera 1,5mm som tillräckligt." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Har du haft ont i tanden innan den lossnade?", a: "Ja: Kan tyda på vertikal rotfraktur, abscess eller karies som försvagat tanden. Nej: Talar för utmattningsbrott i materialet eller stiftet." },
        { q: "Är tanden rotfylld?", a: "Nästan alltid ja vid denna typ av fraktur." },
        { q: "Hur gammal är kronan?", a: "Äldre konstruktioner kan ha sekundärkaries som orsakat frakturen." },
      ],
      kompletterande: [
        "Har tanden haft besvär tidigare (ömhet, fistel)?",
        "Kände du till sprickor eller rörlighet i tanden?",
        "Finns röntgenbilder från tidigare besök för jämförelse?",
      ],
    },

    status: {
      inspektion: [
        "Innehåll i kronan: Bara cement → Se Lossnad krona (sc21). Tandsubstans/fyllning → Fraktur av stödtand. Metallstift/pelare → Fraktur av rotstift.",
        "Frakturnivå: Supragingivalt (ovan tandkött) eller subgingivalt? Avgörande för prognos.",
        "Karies: Finns mjukt dentin kvar på rotytan?",
        "Ferrule (Omkramning): Finns minst 2mm frisk tandsubstans kvar vertikalt runt omkretsen? Avgörande för prognosen.",
        "Sondering: Fickdjup runt hela roten — djup smal ficka → vertikal rotfraktur (prognoslös).",
        "Röntgen (periapikal): Rotfyllningskvalitet, apikal status, benstöd, avbrutet stift i kanalen.",
      ],
      ferrule: {
        kravet: "≥ 2mm supragingivalt frisk tandsubstans",
        kontraindikation: "Ferrule < 2mm eller subgingival fraktur → kontraindicerat att cementera ny krona. Kräver kronförlängning eller extraktion.",
      },
    },

    behandling: [
      {
        alt: "ALT A",
        title: "Roten sparbar — Akut åtgärd",
        indikation: "Supragingivalt frakturplan, ferrule ≥ 2mm möjlig, ingen rotfraktur, stabil rotfyllning.",
        steg: [
          "Rengöring: Avlägsna mjuk karies och gamla cementrester.",
          "Försegling: Om kanalen är öppen, applicera täckförband (IRM eller Cavit).",
          "Temporär lösning: Enstaka krona — svårt att fästa provisorium på rotrest, hellre lämna täckt. Bro — kan ibland fästas provisoriskt vid övriga stödtänder.",
          "Planering: Tid för pelarprep och avtryck (ev. remiss för rotfyllningsrevision och kronförlängning).",
        ],
        koder: "103, 301/302",
      },
      {
        alt: "ALT B",
        title: "Extraktion — Akut åtgärd",
        indikation: "Djupt subgingival fraktur, ferrule < 2mm, vertikal rotfraktur, hopeless prognos.",
        steg: [
          "Extraktion: Avlägsna roten (ofta lambå eller separation nödvändig — inget grepp för tång).",
          "Temporär ersättning fronttand: Etsbro (komposit) eller skedprotes (avtagbar) akut.",
          "Spara den gamla kronan! Den kan ibland användas som 'pontic' i temporär etsbro.",
        ],
        koder: "103, 701/702",
      },
      {
        alt: "ALT C",
        title: "Reparation av befintlig bro (Temporärt)",
        indikation: "Stödtand i större bro frakturerat men bron måste sitta kvar — nödlösning för att köpa tid.",
        steg: [
          "Ta bort frakturerade fragment ur kronan och från roten.",
          "Bygg upp pelare direkt i munnen med komposit (ev. med prefabricerat stift).",
          "Cementera tillbaka den gamla bron provisoriskt.",
        ],
        koder: "103, 812",
      },
    ],

    uppfoljning: [
      "Planera kronförlängning/gingivektomi om ferrule otillräcklig men roten sparbar.",
      "Ny pelarprep och avtryck när slemhinnan läkt och ferrule säkrad.",
      "Rotfyllningsrevision vid behov innan ny konstruktion.",
      "Informera patienten om prognos och behandlingsgång.",
    ],

    journal: {
      malltext: `Kronrotfraktur tand [XX].
Anamnes: Kronan lossnade i samband med tuggning. Ingen smärta.
Status: Kronan [nr] lossnat. I kronan sitter gjuten pelare och
tandsubstans. Roten [nr] sitter kvar, fraktur i nivå med gingivan.
Ingen karies. Sondering ua, ingen vertikal fraktur misstänks.
Rtg visar god rotfyllning apikalt.
Bedömning: Tanden bedöms möjlig att spara med ny pelare och krona,
men kräver gingivektomi/kronförlängning för ferrule.
Åtgärd: Rensning av kanalöppning. Täckförband IRM.
Info om kostnad och behandlingsgång.
Planering: Tid för pelarprep [Datum].`,
      tlvKoder: [
        { kod: "103", beskrivning: "Akut undersökning" },
        { kod: "301/302", beskrivning: "Sjukdomsbehandling (täckförband, enklare uppbyggnad)" },
        { kod: "812", beskrivning: "Reparation av krona/bro (provisorisk recementering)" },
        { kod: "404", beskrivning: "Incision / Gingivektomi (friläggning av rot)" },
        { kod: "701/702", beskrivning: "Extraktion (om roten inte går att rädda)" },
      ],
    },

    diffDiagnoser: [
      { namn: "Lossnad krona (K08.5)", kod: "K08.5", skillnad: "Kronan lossnad men stödtanden intakt — cementet har brustit, ingen fraktur." },
      { namn: "Vertikal rotfraktur", kod: "S02.5", skillnad: "Smal djup ficka + diffus smärta + J-formad radiolucens. Extraktion obligatorisk." },
      { namn: "Lossnad pelare (prefabricerat stift)", kod: "K08.5", skillnad: "Stiftet har lossnat ur kanalen — prognos beror på resterande retention." },
    ],

    kliniskaAnteckningar:
      "Ferrule-effekt ≥ 2mm. Subgingival fraktur = extraktion. ALDRIG acceptera 1,5mm — risk för ny fraktur är 100% utan tillräcklig ferrule. Vertikal rotfraktur = smal djup ficka + J-formad radiolucens → extraktion.",

    verktyg: ["ferrule-kalkylator"],

    redFlags: [
      {
        id: "prot17-1",
        title: "Vertikal rotfraktur",
        description: "Smal, djup ficka + diffus smärta + radiolucens längs rotytan (J-formad). Tanden måste extraheras — ingen behandling hjälper.",
        severity: "critical",
      },
      {
        id: "prot17-2",
        title: "Ferrule < 2mm",
        description: "Otillräcklig ferrule (<2mm) kontraindicerar cementering av ny krona. Kronförlängning eller extraktion krävs.",
        severity: "critical",
      },
      {
        id: "prot17-3",
        title: "Sinuskommunikation",
        description: "Vid extraktion av premolarer/molarer i överkäken — kontrollera att inte sinus öppnats (Valsalva-test).",
        severity: "warning",
      },
    ],
  },

  "tryckssar-protesstomatit": {
    slug: "tryckssar-protesstomatit",
    scId: "PROT-18-DECUB",
    icd: "K12.0 (Recidiverande sår i munhålan) / Z46.3 (Justering tandprotes)",
    name: "Trycksår / Protesstomatit",
    patientUtsaga: "Protesen skaver och det gör ont när jag äter",
    isAcute: false,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Smärta och sår i slemhinnan p.g.a. protes — vanligast i omslagsveck, vid frenula eller på cristan." },
      { label: "Orsaker", text: "Överextension av proteskanter, ojämnheter i protesbasen, instabilitet (vickning) eller traumatiserande ocklusion." },
      { label: "Klinisk indikation", text: "Avlägsna irritamentet, låta såret läka och förhindra sekundärinfektion. Sår ska vara utläkt inom 2 veckor." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Är protesen ny eller gammal?", a: "Ny: Behöver ofta justeras ('inslipning'). Gammal: Kan ha blivit instabil p.g.a. käkbensresorption (kräver rebasering)." },
        { q: "När gör det ont?", a: "Hela tiden: Tyder på överextension. Vid tuggning: Tyder på instabilitet eller ocklusionsfel (protesen tippar)." },
        { q: "Hur länge har du haft såret?", a: "Viktigt för att utesluta malignitet — sår ska läka inom 2 veckor efter åtgärd." },
      ],
      kompletterande: [
        "Har patienten testat att ta ur protesen? (Vilar såret?)",
        "Har patienten haft liknande besvär tidigare?",
        "Använder patienten protesvård regelbundet?",
      ],
      varning: "⚠️ Sår som ej läker efter 14 dagar trots justering → Remiss käkkirurg/oralmedicin. Malignitet kan se ut som skavsår!",
    },

    status: {
      inspektion: [
        "Inspektion slemhinna (utan protes): Lokalisation, utseende (fibrintäckt = decubitus), palpation (mjukt = ok, hårt/indurerat = varning malignitet).",
        "Inspektion protes: Vassa eller för långa kanter? Ojämnheter i akrylat på insidan? Vickar protesen?",
        "Identifiering tryckställe: Applicera zinkpasta/tryckindikatorpasta på såret i munnen. Sätt in protesen försiktigt. Färgen markerar exakt var slipning krävs.",
      ],
      extra: [
        {
          title: "Protesinspektion — checklista",
          items: [
            "Kanterna: Vassa eller för långa?",
            "Insidan: Pärlor/ojämnheter i akrylatet?",
            "Stabilitet: Vickar protesen vid palpation i munnen?",
            "Ocklusion: Tryck med ocklusionsfolie — jämn fördelning?",
          ],
        },
      ],
    },

    behandling: [
      {
        alt: "STEG 1",
        title: "Justering av protes (Slipning)",
        steg: [
          "Slipning: Använd fräs (akrylborr) vid markeringen från tryckindikering.",
          "Vid kantskav: Korta av kanten eller gör plats för frenulum.",
          "Vid skav på cristan: Slipa ur insidan (lätta).",
          "Polering: Obligatoriskt — polerak ytan slät efter slipning så den inte skaver igen.",
        ],
        koder: "103, 831",
      },
      {
        alt: "STEG 2",
        title: "Ocklusionskontroll",
        steg: [
          "Kontrollera med ocklusionsfolie — protesen 'rider' eller tippar vid bitning.",
          "Slipa in ocklusion: Jämn belastning (gruppkontakt, ingen hörntandslyftning på helprotser).",
        ],
        koder: "301",
      },
      {
        alt: "STEG 3",
        title: "Mjukbasning (Vid behov)",
        steg: [
          "Om protesen är instabil eller slemhinnan kraftigt inflammerad: Temporär mjukbasning (Visco-gel eller Coe-Soft).",
          "Rugga upp insidan med fräs för fäste. Applicera adhesiv. Applicera mjukbasningsmaterial.",
          "Låt patienten bita ihop (rätt ocklusion) ca 1 minut, sedan rörelser 5 min.",
          "Skär bort överskott med skalpell (inte fräs — materialet är segt).",
          "OBS: Temporär lösning. Permanent rebasering görs när såret läkt.",
        ],
        koder: "833",
      },
      {
        alt: "STEG 4",
        title: "Farmakologisk stödbehandling",
        steg: [
          "Klorhexidin: Om sekundärinfekterat — sköljning eller gel (0,1–0,2%) på protesen.",
          "Benzydamin (Andolex): Smärtlindring vid uttalade besvär (antiinflammatorisk munsköljning).",
          "Råd: Protesvila nattetid, noggrann rengöring av protes och slemhinna, mjuk mat.",
        ],
        koder: "301",
      },
    ],

    uppfoljning: [
      "Återbesök 2–3 dagar för kontroll av läkning.",
      "Traumatiskt sår ska vara utläkt inom 2 veckor efter justering.",
      "Om ej läkt efter 14 dagar → Remiss käkkirurg/oralmedicin (uteslut malignitet).",
      "Permanent rebasering planeras när såret läkt.",
    ],

    journal: {
      malltext: `Traumatiskt sår (Decubitus) p.g.a. protes.
Anamnes: Söker för smärta i omslagsvecket regio [XX].
Smärtar vid tuggning. Haft besvär i 3 dagar.
Status:
- Slemhinna: Fibrintäckt sår ca 3x3 mm i omslagsvecket regio [XX].
  Omgivande rodnad. Mjukt vid palpation.
- Protes: Överextenderad kant vid [XX]. Instabil vid palpation.
Åtgärd: Markering av öm punkt med zinkpasta.
Urslipning av proteskant med fräs. Polering.
Ocklusionskontroll och lätt inslipning.
Info: Pat uppmanad att vila munnen från protes nattetid.
Åb om ej bra om 1 vecka.`,
      tlvKoder: [
        { kod: "103", beskrivning: "Akut/kompletterande undersökning" },
        { kod: "831", beskrivning: "Justering av avtagbar protes (inkl. slipning)" },
        { kod: "301", beskrivning: "Sjukdomsbehandling, mindre omfattande" },
        { kod: "833", beskrivning: "Rebasering" },
      ],
    },

    diffDiagnoser: [
      { namn: "Traumatisk ulceration", kod: "K12.0", skillnad: "Akut sår från bett eller skarp kant — kortare duration, tydlig traumaorsak." },
      { namn: "Lichen planus (L43)", kod: "L43", skillnad: "Vit nätverksstruktur, ofta bilateralt, utan tydlig protesskav." },
      { namn: "Candidos (B37.0)", kod: "B37.0", skillnad: "Vita beläggningar som kan avlägsnas, pseudomembranöst utseende." },
      { namn: "Skivepitelcancer (C06)", kod: "C06", skillnad: "Sår som ej läker, indurerat, fixerat. REMISS OMEDELBART." },
    ],

    kliniskaAnteckningar:
      "Sår ska läka inom 14 dagar efter protesjustering. Induration = malignitetssignal → remiss. Traumatiskt sår ≠ candidos (även om candida kan uppstå sekundärt). Kontrollera alltid protesens passform och ocklusion.",

    verktyg: [],

    redFlags: [
      {
        id: "prot18-1",
        title: "Sår som inte läker — Misstänk malignitet",
        description: "Om såret kvarstår efter 14 dagar trots justering → Remiss till käkkirurg/oralmedicin för utredning/biopsi. Skivepitelcancer kan se ut som skavsår!",
        severity: "critical",
      },
      {
        id: "prot18-2",
        title: "Induration — Hårt sår",
        description: "Om såret känns hårt i kanterna eller är fixerat vid underlaget → Misstänk malignitet. Remiss omedelbart.",
        severity: "critical",
      },
    ],
  },

  "fraktur-protes": {
    slug: "fraktur-protes",
    scId: "PROT-19-PROFRAK",
    icd: "K08.5 (Otillfredsställande tandersättning) / Z46.3 (Justering tandprotes)",
    name: "Fraktur av avtagbar protes",
    patientUtsaga: "Min protes har gått sönder",
    isAcute: false,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Typer", text: "Protesbasfraktur (splittrad bas), klammerfraktur (avbruten retentionsklammer) eller lossnad protestand." },
      { label: "Prognos", text: "God om alla fragment finns kvar och protesen passar väl. Sämre om protesen vickade → rebasering krävs i samband med lagning." },
      { label: "Klinisk indikation", text: "Reparera protesen eller beställ nyframställning. Akutlagning med kallakrylat om tekniker ej tillgänglig." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Hur gick det till?", a: "Tappad i golvet (slagfraktur — god prognos). Gick sönder vid tuggning (utmattningsfraktur — risk att spricker igen om passform ej åtgärdas)." },
        { q: "Finns alla bitar kvar?", a: "Kritiskt för att kunna laga utan nytt avtryck. Saknas delar → nyframställning." },
        { q: "Hur gammal är protesen och satt den bra?", a: "Vickade den innan fraktur → rebasering krävs. Annars håller lagningen inte länge." },
      ],
      kompletterande: [
        "Försökte patienten laga med superlim? (Superlim försvårar teknisk lagning — limrester måste fräsas bort.)",
        "Finns trycksår eller slemhinneförändringar som kan ha orsakat spänningar?",
        "Hur gammal är protesen? (Gammal protes + dålig passform = nyframställning mer lämpligt.)",
      ],
    },

    status: {
      inspektion: [
        "Passform av fragment: Pussla ihop delarna — passar de exakt? → Kan lagas. Glipar det? → Avtryck/nyproduktion.",
        "Klammer: Är metallen avmattad eller deformerad?",
        "Slemhinna: Finns trycksår eller hyperplasier som orsakat spänningar i protesen?",
        "Restbett (delprotes): Är stödtanden där klammern satt intakt?",
      ],
    },

    behandling: [
      {
        alt: "VAR A",
        title: "Protesbasfraktur — Delar passar ihop",
        indikation: "Ren fraktur, alla delar finns, god passform.",
        steg: [
          "Fixering: Sätt ihop delarna exakt. Fixera med sticky-wax på utsidan. OBS: Superlim (cyanoakrylat) rekommenderas INTE — limrester försvårar riktig reparation.",
          "Lab: Skicka till tandtekniker för sammanfogning med varmpolymerisat (starkast).",
          "Akut (om tekniker ej finns): Temporär lagning med kallakrylat — svagare lösning (se nedan).",
        ],
        koder: "832, 834",
      },
      {
        alt: "VAR B",
        title: "Lossnad protestand",
        steg: [
          "Borra retention (underskär/gropar) i protesbasen och i tanden.",
          "Blästra eller rugga ytorna.",
          "Vät med monomer. Blanda kallakrylat (PMMA). Applicera och tryck dit tanden.",
          "Håll på plats tills stelnat. Justera ocklusion och polera skarven.",
        ],
        koder: "832",
      },
      {
        alt: "VAR C",
        title: "Frakturerad klammer",
        steg: [
          "Placera protesen i munnen.",
          "Ta alginatavtryck över protesen (pick-up/'utlyftning').",
          "Lab: Teknikern böjer/gjuter ny klammer.",
          "Akut: Slipa bort vassa stubbe så patienten kan använda protesen (sämre retention) tills reparation.",
        ],
        koder: "836, 839",
      },
      {
        alt: "VAR D",
        title: "Dålig passform / Delar saknas",
        indikation: "Om protesen vickade (utmattningsfraktur) eller delar saknas.",
        steg: [
          "Laga frakturen, sedan rebasering.",
          "Om frakturen komplex eller protesen gammal → Nyframställning mer kostnadseffektivt.",
        ],
        koder: "833, 836",
      },
    ],

    uppfoljning: [
      "Kontrollera passform efter lagning — vickar protesen? Rebasering indicerat.",
      "Informera patienten att alltid ha vatten i handfatet vid rengöring.",
      "Kontrollera slemhinna för trycksår.",
    ],

    journal: {
      malltext: `Ofullständig tandfunktion (Frakturerad protes).
Anamnes: Tappade protesen i handfatet i morse.
Spruckit i två delar mitt i.
Status: Ren fraktur regio 31-41. Delarna passar exakt ihop.
Ingen materialförlust.
Åtgärd: Delarna desinficerade och fixerade med sticky wax.
Skickas till tandtekniker för lagning.
Utlämning planerad [Datum].
Info: Pat informerad om att vara försiktig vid rengöring
(ha vatten i handfatet eller handduk under för att dämpa fall).`,
      tlvKoder: [
        { kod: "103", beskrivning: "Akut undersökning" },
        { kod: "832", beskrivning: "Lagning protes / tillsättning tand (enklare)" },
        { kod: "834", beskrivning: "Lagning protes där avtryck krävs" },
        { kod: "836", beskrivning: "Komplicerad lagning av protes" },
        { kod: "839", beskrivning: "Inmontering av förankringselement" },
      ],
    },

    diffDiagnoser: [
      { namn: "Trycksår / Decubitus", kod: "K12.0", skillnad: "Skaver men hel — slipning indicerat, ej lagning." },
      { namn: "Dålig passform (resorption)", kod: "Z46.3", skillnad: "Protes hel men passform dålig p.g.a. käkbensresorption — rebasering, ej enbart lagning." },
    ],

    kliniskaAnteckningar:
      "Superlim (cyanoakrylat) = INTE rekommmenderat — patienter försöker ofta laga själva. Limrester måste fräsas bort. Sticky-wax för temporär fixering inför lab. Om protesen vickade → rebasering krävs annars bryts den snart igen.",

    verktyg: [],

    redFlags: [
      {
        id: "prot19-1",
        title: "Passform — Rebasering krävs",
        description: "Laga en protes som passar dåligt (vickar) och den bryts snart igen. Kontrollera alltid behovet av rebasering efter lagning.",
        severity: "warning",
      },
      {
        id: "prot19-2",
        title: "Sväljningsrisk",
        description: "En protes med lös tand eller klammer utgör aspirationsrisk. Åtgärda akut eller ta protesen ur bruk.",
        severity: "critical",
      },
      {
        id: "prot19-3",
        title: "Superlim (Cyanoakrylat)",
        description: "Patienter lagar ofta själva med superlim. Limrester är giftiga och försvårar riktig reparation — limrester måste fräsas bort innan teknikern kan laga.",
        severity: "warning",
      },
    ],
  },

  "porslinsfraktur": {
    slug: "porslinsfraktur",
    scId: "PROT-20-CHIP",
    icd: "K08.5 (Otillfredsställande tandersättning) / T85.6 (Mekanisk komplikation — implantat)",
    name: "Porslinsfraktur (krona/bro)",
    patientUtsaga: "En bit av porslinet har lossnat",
    isAcute: false,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Vassa kanter, estetisk störning — konstruktionen sitter fast men ytskiktet är skadat." },
      { label: "Klinisk indikation", text: "Återställ form, funktion och estetik. Förhindra mjukvävnadsskada från vassa kanter." },
      { label: "Anamnes", text: "Fråga om tandgnissling (bruxism) — om frakturen beror på överbelastning, laga utan bettskena = ny fraktur snart." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Hur hände det?", a: "Tuggade på något hårt, trauma eller spontant? Spontant + ung patient → bruxism." },
        { q: "Har du tandgnissling / pressning?", a: "Parafunktioner = vanlig orsak till materialutmattning. Reparation utan bettskena ger recidiv." },
        { q: "Hur gammal är kronan?", a: "Garanti? Äldre kronan → materialutmattning naturlig." },
        { q: "Ilar det?", a: "Kan tyda på blottat dentin eller läckage under kronan." },
        { q: "Skaver det mot tunga/kind?", a: "Viktigt att åtgärda snabbt — ger sår." },
      ],
      kompletterande: [
        "Estetisk zon eller lateral sektor? (Prioritering av åtgärd)",
        "Patientens förväntningar? (Putsning vs reparation vs omgörning)",
      ],
    },

    status: {
      inspektion: [
        "Omfattning: Estetisk zon? Stor eller liten fraktur?",
        "Djup: Syns metallen eller innerkärnan (oxidkeram)?",
        "Yta: Ren brottsyta eller karies under? (Karies kan ha orsakat frakturen).",
        "Ocklusionsanalys: Ligger frakturen i en kontaktpunkt? Utsätts reparationen för tunga skjuvkrafter?",
        "Röntgen (vid behov): Om misstanke om karies, apikal parodontit eller för att bedöma stödtandens status.",
      ],
    },

    behandling: [
      {
        alt: "ALT A",
        title: "Putsning (Liten fraktur / Icke-estetisk zon)",
        indikation: "Liten flisa, vassa kanter, ej estetiskt störande.",
        steg: [
          "Avrunda vassa kanter med diamant.",
          "Polera ytan noga.",
          "Ofta den hållbaraste lösningen — eliminerar brottanvisningar utan svaga skarvar.",
        ],
        koder: "301",
      },
      {
        alt: "ALT B",
        title: "Reparation med komposit",
        indikation: "Estetiskt störande. Patient informerad om 'halvpermanent' lösning med risk för missfärgning.",
        steg: [
          "Mekanisk retention: Borra retentionshål/underskär i metall och porslin om metall blottad. Rugga ytan med diamant.",
          "Isolering: Torrlägg noga (kofferdam eller bomullsrullar).",
          "Ets: Applicera 37% fosforsyra.",
          "Silan/Primer: Applicera primer/silan (kopplingsvätska) på porslin- och metallytor. Luftblästra.",
          "Bonding: Applicera adhesiv/bonding och ljushärda.",
          "Komposit: Applicera (opaker först om metall lyser igenom). Ljushärda.",
          "Puts & Polering: Justera ocklusion (undvik hård belastning på lagningen). Polera med diamanter (fina) + polersystem.",
        ],
        koder: "812, 881",
      },
      {
        alt: "ALT C",
        title: "Omgörning (Omfattande fraktur)",
        indikation: "Stor del av porslinet borta, kontaktpunkter förlorade, estetiskt oacceptabelt.",
        steg: [
          "Avlägsna gammal krona (slitsa med diamant / Burings hammare).",
          "Preparering, avtryck och ny krona.",
        ],
        koder: "803, 812",
      },
    ],

    uppfoljning: [
      "Kontrollera ocklusion vid nästa besök — belastning på reparationen?",
      "Vid bruxism: Bettskena indicerad för att skydda kronan.",
      "Informera patienten: Reparation med komposit har begränsad livslängd — risk för missfärgning och loss.",
    ],

    journal: {
      malltext: `Porslinsfraktur (Chip-off) tand [XX].
Anamnes: Bitit på [Hårt föremål/Okänt].
Vass kant mot tungan. Ingen smärta.
Status: Chip-off mesio-incisalt ca 2x2 mm.
Metall ej blottad. Ingen karies.
Åtgärd: Putsning av vassa kanter med trissa. Polering.
(Eller: Reparation med komposit efter uppruggning,
ets, silanisering, bonding och ljushärdning).
Info: Pat informerad om att reparationen har begränsad
hållfasthet och kan lossna igen.
Vid recidiv rekommenderas ny krona.`,
      tlvKoder: [
        { kod: "301", beskrivning: "Sjukdomsbehandling (vid enbart putsning)" },
        { kod: "812", beskrivning: "Reparation krona/bro utan tandteknisk insats" },
        { kod: "881", beskrivning: "Reparation implantatstödd konstruktion (mindre)" },
      ],
    },

    diffDiagnoser: [
      { namn: "Lossnad implantatskruv", kod: "T85.6", skillnad: "Chip-off på implantatkrona kan dölja lossnad skruv — kontrollera alltid rörlighet INNAN lagning." },
      { namn: "Sekundärkaries under kronan", kod: "K02.1", skillnad: "Karies kan ha försvagat tanden inifrån och orsakat frakturen — kräver röntgen." },
    ],

    kliniskaAnteckningar:
      "Kontrollera alltid om implantatkronan rör sig innan lagning av chip-off — lossnad skruv kan ha orsakat frakturen. Bruxism = bettskena indicerad, annars recidiv. Silanisering av porslin är nyckelsteget för hållbar kompositreparation.",

    verktyg: [],

    redFlags: [
      {
        id: "prot20-1",
        title: "Bruxism — Recidivrisk",
        description: "Om patienten gnisslar tänder och frakturen beror på överbelastning, kommer reparationen att gå sönder igen utan bettskena.",
        severity: "warning",
      },
      {
        id: "prot20-2",
        title: "Implantat — Dold skruvlossning",
        description: "En 'chip-off' på implantatkrona kan dölja en lossnad skruv. Kontrollera alltid om kronan rör sig INNAN reparation av porslinet.",
        severity: "critical",
      },
    ],
  },

  "lossnad-krona": {
    slug: "lossnad-krona",
    scId: "PROT-21-LOSSKR",
    icd: "K08.5 (Otillfredsställande tandersättning)",
    name: "Lossnad permanent krona / bro",
    patientUtsaga: "Min krona har trillat loss",
    isAcute: true,
    category: "Protetik & Bettfunktion",

    snabbOversikt: [
      { label: "Symtom", text: "Permanent ersättning lossnad — potentiellt möjlig att recementera." },
      { label: "Orsaker", text: "Sekundärkaries, retentionsbrist, cementutmattning, traumatisk ocklusion eller rotfraktur." },
      { label: "Mål", text: "Återställ funktion och skydda kvarvarande tandsubstans. ALLTID aspirationsanamnes FÖRST." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "ASPIRATIONSANAMNES — Har du svalt eller snört in kronan?", a: "Obligatorisk FÖRSTA fråga. Aspirerad krona → akut sjukhusremiss." },
        { q: "När och hur lossnade den?", a: "Vid måltid, trauma eller spontant?" },
        { q: "Gör det ont / Ilar det?", a: "Ilningar: Tanden vital (bråttom att skydda). Ingen smärta: Tanden kan vara rotfylld." },
        { q: "Hur gammal är kronan?", a: "Äldre kronor → oftare karies eller cementutmattning." },
        { q: "Har den lossnat tidigare?", a: "Indikerar dålig retention eller ocklusala problem." },
      ],
      kompletterande: [
        "Har patienten kronan kvar? (Om inte — aspirationsrisk!)",
        "Är kronan hel?",
        "Finns karies på stödtanden?",
      ],
      varning: "⚠️ ASPIRATIONSRISK — Ställ aspirationsanamnes ALLTID FÖRE allt annat. En lossnad krona är hal och liten.",
    },

    status: {
      inspektion: [
        "Inspektion av tanden (stödtanden): Karies? Mjukt dentin? Fraktur? Preparationens retention (höjd och parallellitet).",
        "Inspektion av kronan/bron: Insidan — cementrester kvar? (Cementet sitter i kronan = adhesivt brott = dålig retention). Porslinet helt?",
        "Inprovning: Passform — går kronan att sätta tillbaka helt utan glipor? Ocklusion — för hög (tandvandring)? Bro — vickar (lossnat på ett stöd)?",
        "Vitalitetstest om tanden ej rotfylld.",
      ],
    },

    behandling: [
      {
        alt: "ALT A",
        title: "Recementera (Enkel)",
        indikation: "Ingen karies, god passform, ingen fraktur på stödtand.",
        steg: [
          "Rengöring (kritiskt): Avlägsna allt gammalt cement från tand och krona (ultraljud/handinstrument). Putsa med pimpsten.",
          "Kemisk tvätt: Tand: 3% H₂O₂ + Tubulicid (blå). Krona: Blästra insidan eller ultraljud + Ivoclean/fosforsyra beroende på material.",
          "Torrlägning och cementering (se Cementval-sektion).",
          "Avlägsna överskott noga. Kontrollera ocklusion.",
        ],
        koder: "811",
      },
      {
        alt: "ALT B",
        title: "Recementera efter åtgärd",
        indikation: "Mindre kariesangrepp eller retentionsbrist.",
        steg: [
          "Kariesexkavering och fyllning (ev. uppbyggnad).",
          "Vid dålig retention: Byt cementtyp (bondingcement) eller gör om preparationen.",
          "Permanent cementering enligt SOP.",
        ],
        koder: "301, 811",
      },
      {
        alt: "ALT C",
        title: "Ej möjlig att recementera",
        indikation: "Omfattande karies, tandfraktur (se sc17), eller kronan passar ej längre.",
        steg: [
          "Ny terapiplanering (ny krona, stiftpelare eller extraktion).",
          "Temporär lösning akut: Täckförband / provisorisk krona.",
        ],
        koder: "103, 301",
      },
    ],

    materialval: {
      intro: "Val av cement och förbehandling styrs av kronans material och möjligheten att torrlägga.",
      eugenolRegel: "Om permanent konstruktion ska bondas i framtiden: Eugenolfritt temporärt cement obligatoriskt (TempBond NE utan modifier).",
      alternativ: [
        {
          kategori: "Metallkeramik (MK) / Guld",
          material: "Zinkfosfatcement (förstahandsval) eller Glasjonomer",
          cement: "Tvätta insidan med 35–40% fosforsyra. Skölj, blästra torrt.",
          notering: "Eugenol OK",
        },
        {
          kategori: "Zirkonia (Oxidkeram)",
          material: "Dualhärdande kompositcement (Variolink) — förstahandsval. Alt: Zinkfosfat om god retention.",
          cement: "Ivoclean 20 sek → skölj → Monobond Plus 60 sek → luftblästra. EJ fosforsyra!",
          notering: "Fosforsyra blockerar ytan för bindning vid bonding",
        },
        {
          kategori: "Glaskeram (E-max / Porslin)",
          material: "Dualhärdande kompositcement (Variolink) + emalj-dentinbonding",
          cement: "HF-etsad av labb → fosforsyra 20 sek (rengöring) → Monobond Plus 60 sek",
          notering: "Måste bondas för styrka — fosfatcement rekommenderas ej",
        },
      ],
    },

    uppfoljning: [
      "Informera patienten att undvika belastning 1 timme.",
      "Kontrollera ocklusion vid nästa besök.",
      "Vid recidiverande lossnad krona → utred retention och ocklusion.",
    ],

    journal: {
      malltext: `Ofullständig tandfunktion (Lossnad krona tand [XX]).
Anamnes: Kronan lossnade i samband med [Tuggning/Flossning].
Ingen smärta/Ilningar.
Status: Tand [XX] vital/rotfylld. Ingen karies
(eller: karies exkaverad). Preparationen har god retention.
Kronan hel.
Åtgärd: Rengöring av preparation och krona (H₂O₂ + Tubulicid).
Torrläggning. Recementering med [Zinkfosfat/Variolink].
Överskott avlägsnat. Ocklusion kontrollerad och ua.
Info: Pat informerad om att undvika belastning 1 timme.`,
      tlvKoder: [
        { kod: "103", beskrivning: "Akut undersökning" },
        { kod: "811", beskrivning: "Cementering av lossnad konstruktion, per stöd" },
        { kod: "301", beskrivning: "Sjukdomsbehandling (om kariesåtgärd samtidigt)" },
      ],
    },

    diffDiagnoser: [
      { namn: "Lossnad tillfällig krona", kod: "Z46.3", skillnad: "Provisorium — alltid temporärt cement, aldrig permanent cement." },
      { namn: "Fraktur av stödtand (sc17)", kod: "S02.5", skillnad: "Del av tanden sitter kvar i kronan — se Scenario 17." },
      { namn: "Periimplantit", kod: "M27.62", skillnad: "Implantatstödd konstruktion med biologisk komplikation — annan utredning." },
    ],

    kliniskaAnteckningar:
      "⚠️ Aspirationsanamnes ALLTID FÖRST vid lossnad krona. Cementval: MK → Zinkfosfat. Zirkonia (bondas) → Ivoclean + Monobond Plus + Variolink. E-max → HF-etsad + silan + Variolink. Partiellt lossnad bro (vickar) = stor kariesrisk på löst stöd — måste avlägsnas.",

    verktyg: [],

    redFlags: [
      {
        id: "prot21-1",
        title: "ASPIRATIONSRISK",
        description: "En lös krona är hal och liten. Säkra alltid luftvägarna. Om patienten kan ha aspirerat kronan → akut sjukhusremiss (rtg thorax).",
        severity: "critical",
      },
      {
        id: "prot21-2",
        title: "Rotfraktur",
        description: "Om tanden är rotfylld med stift och kronan lossnat med stiftet — kontrollera noga att roten inte är sprucken. Djup smal ficka = vertikal rotfraktur = extraktion.",
        severity: "critical",
      },
      {
        id: "prot21-3",
        title: "Partiellt lossnad bro",
        description: "Om bro lossnat på ett stöd men sitter fast på ett annat ('sviktar') — måste avlägsnas. Stor kariesrisk på det lösa stödet.",
        severity: "critical",
      },
    ],
  },
};
