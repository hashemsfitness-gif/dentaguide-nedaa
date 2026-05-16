import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface ParodScenarioData {
  id: string;
  slug: string;
  title: string;
  icdCode: string;
  patientUtsaga: string;
  isAcute: boolean;
  category: "Parodontologi";
  showBPE: boolean;

  snabbOversikt: Array<{ label: string; text: string }>;

  anamnes: {
    obligatoriska: Array<{ q: string; a: string }>;
    kompletterande: string[];
    riskfaktorer?: string[];
  };

  status: {
    inspektion: string[];
    palpation?: string;
    perkussion?: string;
    sensibilitet?: string;
    bpe?: {
      description: string;
      normalt: string;
      patologiskt: string;
    };
  };

  diagnostik: {
    kriterier: string;
    rtg?: string[];
    uteslut: string[];
    klassifikation?: string;
  };

  behandling: {
    varning?: string;
    alternativ: Array<{
      title: string;
      indikation?: string;
      metod: string[];
      tid?: string;
      koder?: string;
      specialist?: boolean;
    }>;
    antibiotika?: string;
    lokalbehandling?: string;
  };

  uppfoljning: { text: string };

  journal: Array<{ titel: string; text: string }>;

  diffDiagnoser: Array<{ namn: string; kod: string; skillnad: string }>;

  kliniskaAnteckningar: string;

  redFlags: RedFlag[];
}

export const parodontoloiScenarier: Record<string, ParodScenarioData> = {
  "gingivit-parodontit": {
    id: "VARK-11-PAROD",
    slug: "gingivit-parodontit",
    title: "Gingivit / Kronisk Parodontit",
    icdCode: "K05.1 (Kronisk gingivit) / K05.3 (Kronisk parodontit)",
    patientUtsaga: "Det blöder när jag borstar och tandköttet ömmar.",
    isAcute: false,
    category: "Parodontologi",
    showBPE: true,

    snabbOversikt: [
      { label: "Symtom", text: "Blödning vid borstning, eventuell svullnad, ömhet i tandköttet." },
      { label: "Diagnos", text: "Gingivit = reversibel inflammation. Parodontit = irreversibel bennedbrytning med fickbildning." },
      { label: "Klassifikation", text: "EFP/AAP 2018 — Stadium I–IV + Grad A–C." },
      { label: "Prevalens", text: "Parodontit drabbar ca 50% av vuxna i Sverige. Svår parodontit ca 10–15%." },
      { label: "Prognos", text: "God vid tidig diagnos och adekvat behandling + god munhygien." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Blöder tandköttet vid borstning?", a: "Ja — tecken på aktiv gingivit/parodontit" },
        { q: "Har du känt att tänder blivit längre eller att tandköttet dragit sig tillbaka?", a: "Ja — tecken på attachmentförlust (CAL)" },
        { q: "Röker du eller snusar?", a: "Rökning är den starkaste modifierbara riskfaktorn — ökar risk och döljer BOP" },
        { q: "Har du diabetes eller annan systemsjukdom?", a: "Diabetes ökar parodontitrisk — okontrollerad = Grad C" },
        { q: "Har du känt av lösa tänder eller förändrat bett?", a: "Tandrörighet = Stadium III–IV" },
      ],
      kompletterande: [
        "Senaste tandläkarbesök och tandstenssanering?",
        "Ärftlighet för parodontit (föräldrar förlorat tänder tidigt)?",
        "Stress eller immunosupprimerande medicinering?",
        "Kost och munhygienrutiner (mellanrumsrengöring)?",
      ],
      riskfaktorer: [
        "Rökning / snusning",
        "Diabetes mellitus (okontrollerad)",
        "Stress / psykosociala faktorer",
        "Osteoporos / hormonella faktorer",
        "Genetisk predisposition",
      ],
    },

    status: {
      inspektion: [
        "Tandköttets färg och konsistens (rodnad, svullnad, spongiositet)",
        "Plack- och tandstensmängd (supragingivalt / subgingivalt)",
        "Gingivarecession — mät från cementemalj-gränsen (CEJ)",
        "Furkationsengagemang (Nabers-sond för molarer)",
        "Tandrörighet (Miller-skala 0–3)",
      ],
      palpation: "Palpera längs alveolarkanten. Ömt = aktiv inflammation eller abscess. Hård svullnad = fibros.",
      bpe: {
        description: "Basic Periodontal Examination — screening av 6 sextanter med WHO-sond (0.5mm kula, 3.5mm/5.5mm markering).",
        normalt: "BPE 0–1: Frisk eller blödning vid sondering utan ficka. Fickdjup <3.5mm.",
        patologiskt: "BPE 3: Ficka 3.5–5.5mm — komplex behandling. BPE 4: Ficka >5.5mm — specialistremiss.",
      },
    },

    diagnostik: {
      kriterier: "Parodontit kräver radiologiskt verifierad bennedbrytning + klinisk attachmentförlust (CAL ≥2mm). Gingivit = inflammation utan bennedbrytning (reversibel).",
      rtg: [
        "Bitewing (BW): Interproximalt benNivå — krona/rot-kvot",
        "Panorama: Översikt — identifiera engagerade tänder",
        "Periapikal RTG: Detaljerad bennivå vid enskild tand",
        "Fynd: Horisontell/vertikal bendefekt, furkationspåverkan",
      ],
      uteslut: [
        "Blödning UTAN bennedbrytning → Gingivit (K05.1) — ej parodontit",
        "Djup ficka vid enstaka tand med normal benmarginal → Pseudoficka",
        "Snabb bennedbrytning hos ung patient → Misstänk aggressiv parodontit (Grad C)",
      ],
      klassifikation: "EFP/AAP 2018: Stadium (I–IV) baserat på CAL, RTG-bennedbrytning, tandrörighet, tandbortfall. Grad (A–C) baserat på progressionshastighet, rökning, diabetes.",
    },

    behandling: {
      varning: "Behandla i rätt ordning — kausal terapi FÖRST, korrektiv/kirurgisk behandling EFTER re-evaluering. Antibiotika är sällan indicerat i steg 1–2.",
      alternativ: [
        {
          title: "Steg 1: Motivering + Hygieninstruktion",
          indikation: "Alla parodontitpatienter — obligatoriskt första steg.",
          metod: [
            "Motiverande samtal (MI) — patientens förståelse och vilja",
            "Individuell munhygieninstruktion (tandborste + mellanrumsrengöring)",
            "Kostråd (sura drycker, socker)",
            "Rökstopp-råd (störst effekt på prognos)",
            "Justera/avlägsna retention (överhängande fyllningar, dåligt anpassade kronor)",
          ],
          tid: "30–45 min",
          koder: "311, 312",
        },
        {
          title: "Steg 2: Tandstenssanering / SRP (Scaling & Root Planing)",
          indikation: "BPE 3–4, parodontit Stadium I–IV.",
          metod: [
            "Supragingivalt: Ultraljud + handinstrument",
            "Subgingivalt (SRP): Kyrettar — avlägsna calculus och biofilm från rotytan",
            "Lokalbedövning vid djupa fickor (>5mm)",
            "Ev. lokalt antiseptikum (klorhexidingelé 0.2% subgingivalt)",
            "Behandla en kvadrant/sextant per besök eller full-mouth inom 24h",
          ],
          tid: "45–90 min per kvadrant",
          koder: "341, 342",
        },
        {
          title: "Steg 3: Re-evaluering (6–8 veckor efter SRP)",
          indikation: "Obligatorisk — bedöm effekt av steg 1–2 innan beslut om kirurgi.",
          metod: [
            "Ny BPE + fullständig fickmätning",
            "Ny RTG vid kvarstående aktivitet",
            "Bedöm: Kirurgibehov? Specialistremiss? Underhållsprogram?",
          ],
          tid: "30–45 min",
          koder: "301, 311",
        },
        {
          title: "Steg 4: Korrektiv behandling / Specialistremiss",
          indikation: "Kvarstående fickor >5mm, furkation klass II–III, komplext fall.",
          metod: [
            "Parodontalkirurgi (specialist): Lappkirurgi, ossösa defekter",
            "Resektion (Tunnelpreparering, rotresektion)",
            "Extraktion av hopelessly compromised tänder",
          ],
          specialist: true,
          koder: "Remiss specialist",
        },
      ],
      lokalbehandling: "Klorhexidingelé 0.2% subgingivalt (Chlosite / Corsodyl gelé) kan användas som adjuvans vid SRP. Klorhexidinsköljning 0.2% × 2 vid aktiv inflammation.",
    },

    uppfoljning: {
      text: "Re-evaluering: 6–8 veckor efter SRP. Underhållsprogram: Var 3:e–6:e månad beroende på Grad. Ny BPE vid varje underhållsbesök. Röntgen: Var 2–3 år vid stabil parodontit. Vid försämring → Re-SRP eller specialistremiss.",
    },

    journal: [
      {
        titel: "Mall: Parodontologisk undersökning",
        text: `Anamnes: Pat. anger blödning vid borstning sedan [tid]. Röker [ja/nej]. Diabetes [ja/nej]. Senaste tandstenssanering [datum/aldrig].
Status:
- BPE: ÖH [X X X] / UH [X X X]
- Fickdjup max: [mm] vid tand [nr]
- Attachmentförlust (CAL): [mm]
- Tandrörighet: Grad [0-3] vid tand [nr]
- Gingivarecession: Synlig vid [tänder]
- Plackindex: [%] Blödningsindex: [%]
RTG: [Bitewing/Panorama] — [Horisontell/Vertikal] bennedbrytning. Furkationspåverkan [ja/nej].
Bedömning: [Gingivit / Kronisk parodontit] Stadium [I/II/III/IV] Grad [A/B/C].
Behandling:
- Munhygieninstruktion: Tandborste + [mellanrumsborstet/tandtråd]
- Motiverande samtal: Rökstopp [rekommenderat]
- Tandstenssanering supra- och subgingivalt utförd [kvadrant/sextant]
Plan: Återbesök SRP [nästa kvadrant/datum]. Re-evaluering [6–8 veckor].`,
      },
    ],

    diffDiagnoser: [
      { namn: "Gingivit (K05.1)", kod: "K05.1", skillnad: "Blödning + inflammation UTAN röntgenverifierad bennedbrytning. Reversibel." },
      { namn: "Aggressiv parodontit (Grad C)", kod: "K05.3", skillnad: "Snabb bennedbrytning hos ung patient. Ej proporionell mot plackbörda." },
      { namn: "Periimplantit (K05.6)", kod: "K05.6", skillnad: "Bennedbrytning runt implantat. Specifik diagnostik krävs." },
      { namn: "Nekrotiserande gingivit (ANUG)", kod: "A69.1", skillnad: "Papillnekros + fetor + akut debut. Ofta unga vuxna + stress/immunosuppression." },
    ],

    kliniskaAnteckningar:
      "EFP/AAP 2018: Stadium I–IV (svårighetsgrad) × Grad A–C (progressionshastighet). Grad C = snabb progression, rökning >10 cig/dag, HbA1c >7%. Komplettera alltid BPE med fullständig fickmätning vid BPE 3–4. SRP: Subgingivalt med LA vid ficka >5mm.",

    redFlags: [
      {
        id: "parod-1",
        title: "Snabb bennedbrytning",
        description: "Bennedbrytning oproportionerlig mot plackbörda — särskilt ung patient → Misstänk Grad C, systemsjukdom (HIV, leukemi), aggressiv parodontit.",
        severity: "critical",
      },
      {
        id: "parod-2",
        title: "Abscessbildning",
        description: "Akut parodontal abscess → dränage omedelbart. Se scenario Parodontal Abscess.",
        severity: "critical",
      },
      {
        id: "parod-3",
        title: "Systemsjukdom",
        description: "Okontrollerad diabetes (HbA1c >10%), immunosuppression, neutropeni → Koordinera med läkare. Antibiotika kan vara indicerat.",
        severity: "warning",
      },
      {
        id: "parod-4",
        title: "Tandrörlighet grad 3",
        description: "Tand rörlig i vertikalled eller spontant rörlig → Hopeless prognosis. Diskutera extraktion.",
        severity: "warning",
      },
    ],
  },

  perikoronit: {
    id: "VARK-05-PERI",
    slug: "perikoronit",
    title: "Perikoronit",
    icdCode: "K05.22 (Perikoronit)",
    patientUtsaga: "Det gör ont längst bak i käken och det är svårt att gapa.",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      { label: "Definition", text: "Akut inflammation runt kronglassen (operculum) till en delvis erupterad tand — vanligast vis dom tand 38/48." },
      { label: "Symtom", text: "Smärta, svullnad, trismus, eventuell dysfagi och feber." },
      { label: "Allvarlighet", text: "Kan progrediera till cellulit/abscess och käkkirurgisk akut." },
      { label: "Primär åtgärd", text: "Spolning + rengöring under operculum. Extraktion i kallt skede." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Hur svårt är det att gapa? Kan du öppna mer än tre fingrar?", a: "Trismus < 20mm = REMISS AKUT käkkirurg" },
        { q: "Är det svårt att svälja?", a: "Dysfagi = risk för djup halsinfektion → REMISS AKUT" },
        { q: "Har du feber?", a: "Feber > 38°C = systemisk påverkan → antibiotika" },
        { q: "Har du svullnad i ansiktet eller utanför munnen?", a: "Extraoral svullnad = SJUKHUSREMISS" },
        { q: "Hur länge har du haft besvären?", a: "Kronisk/återkommande = indikation för visdomstandsextraktion" },
      ],
      kompletterande: [
        "Har du haft liknande besvär tidigare? (Recidiverande perikoronit = extraktion indicerat)",
        "Antibiotika tagits? (Effekt? Resistens?)",
        "Antagonist i OK biter på operculum? (Indikation för antagonistextraktion)",
      ],
    },

    status: {
      inspektion: [
        "Gapförmåga (mät i mm — normalt >40mm)",
        "Operculum: Svullnad, rodnad, purulent exsudat under flik",
        "Antagonisttand: Bitmärke på operukulumtanden?",
        "Extraoral inspektion: Svullnad, rodnad, lymfknutor",
        "Svalg: Rodnad, tonsillsvullnad (uteslut angina)",
      ],
      palpation: "Palpera masseterporten och pterygomandibulärregionen. Fluktuation = abscess → incision. Hård svullnad = cellulit → antibiotika.",
    },

    diagnostik: {
      kriterier: "Klinisk diagnos baserad på inflamed operculum kring delvis erupterad tand (vanligast 38/48). Röntgen för att bedöma tändernas angulering och roteruptionsstatus.",
      rtg: [
        "Panorama: Visdomstandens position, angulering, rotlängd",
        "Periapikal RTG: Bennivå kring visdomstanden",
        "OPG: Bedömning om extraktion är möjlig i tandläkarstol eller kräver kirurg",
      ],
      uteslut: [
        "Trismus <20mm → REMISS AKUT käkkirurg (uteslut pterygomandibulär abscess)",
        "Dysfagi → REMISS AKUT (risk Ludwig's angina / parapharyngeal abscess)",
        "Extraoral svullnad → SJUKHUS akut",
        "Feber + frossa + allmänpåverkan → Antibiotika + REMISS",
      ],
    },

    behandling: {
      varning: "Trismus <20mm eller dysfagi = omedelbar remiss till käkkirurg/sjukhus. Ge ALDRIG bara antibiotika utan lokal åtgärd — kausal behandling är prioritet.",
      alternativ: [
        {
          title: "Alternativ A: Rengöring + Spolning (akut besök)",
          indikation: "Lindrig–måttlig perikoronit utan systemisk påverkan.",
          metod: [
            "Ytanestesi (Xylocain spray/gelé) under operculum",
            "Spola noggrant under operculum med NaCl 0.9% eller Klorhexidin 0.2%",
            "Avlägsna matrester/debris under flik med kurett",
            "Instruera spolning med Klorhexidin 0.2% × 2 hemma",
            "Analgetika: Paracetamol 1g + Ibuprofen 400mg v.b.",
          ],
          tid: "15–20 min",
          koder: "101, 011",
        },
        {
          title: "Alternativ B: Extraktion av antagonist (om bitmärke)",
          indikation: "OK-visdomstand biter på operculum och är utan strategiskt värde.",
          metod: [
            "Lokalbedövning OK posteriort",
            "Extraktion av antagonisttanden (28/18)",
            "Avlastar betttrauma mot operculum",
          ],
          tid: "20–30 min",
          koder: "401, 402",
        },
        {
          title: "Alternativ C: Extraktion visdomstand (kallt skede)",
          indikation: "Recidiverande perikoronit eller kronisk perikoronit. Sker när inflammationen svunnit.",
          metod: [
            "Vänta tills akut inflammation avklingat (1–2 veckor)",
            "Bedöm RTG: Möjlig i tandläkarstol eller remiss oral kirurg?",
            "Lokalbedövning (LA) eller generell anestesi (specialist)",
            "Extraktion av visdomstand 38/48",
          ],
          tid: "30–60 min",
          koder: "401, 402, 801",
        },
        {
          title: "Alternativ D: Operkulektomi",
          indikation: "Tanden är i god position, vill bevara visdomstanden. Begränsad evidens.",
          metod: [
            "Lokal anestesi",
            "Excision av operkulumvävnad med skalpell/elektrokirurgi",
            "Hemostas, sköljning",
            "Blottlägger kronans ytterligare en yta",
          ],
          koder: "801",
        },
      ],
      antibiotika:
        "Indikation: Feber >38°C, trismus, extraoral svullnad, allmänpåverkan, immunosuppression.\n" +
        "Förstahandsval: PcV 1,6g × 3 i 5–7 dagar (ALDRIG 1g eller 2g).\n" +
        "Pc-allergi: Klindamycin 600mg × 3 i 5–7 dagar (VGR-riktlinje — verifiera mot aktuell regional riktlinje).\n" +
        "Vid terapisvikt: Metronidazol 400mg × 3 i 5–7 dagar.",
    },

    uppfoljning: {
      text: "Akut: Återbesök 2–3 dagar om antibiotikabehandling startad. Kontrollera trismus och svullnad. Kallt skede: Planera extraktion 2–4 veckor efter avklingad akutfas. Om recidiv utan extraktion planerad → ny diskussion om kirurgi.",
    },

    journal: [
      {
        titel: "Mall: Perikoronit — rengöring",
        text: `Anamnes: Pat. anger smärta och svullnad vid tand [38/48] sedan [tid]. Gapförmåga ca [XX] mm. Feber [ja/nej, temp]. Dysfagi [ja/nej].
Status: Operculum över tand [38/48]: Svullet, rodnat. Purulent exsudat [ja/nej]. Lymfknutor: [u.a. / förstorade]. Extraoral svullnad: [nej].
Behandling:
- Ytanestesi under operculum
- Spolning med NaCl subgingivalt under operculum. Debris avlägsnat.
- Instruktion: Klorhexidin 0.2% sköljning × 2 dagligen
- Analgetika: Paracetamol 1g + Ibuprofen 400mg v.b.
[Vid indikation: Antibiotika PcV 1,6g × 3 i [5/7] dagar]
Plan: Återbesök [X] dgr. Planering för extraktion tand [38/48] i kallt skede.`,
      },
    ],

    diffDiagnoser: [
      { namn: "Parodontal abscess (K05.20)", kod: "K05.20", skillnad: "Djup ficka kring befintlig tand, ingen operculum, erupterad tand." },
      { namn: "Dentio difficilis", kod: "K01.1", skillnad: "Impakterad tand utan klinisk inflammation." },
      { namn: "Karies profunda / apikal abscess", kod: "K04.7", skillnad: "Karies i tanden, periapikal radiolucens på RTG." },
      { namn: "Sialadenit (gl. parotis)", kod: "K11.2", skillnad: "Pus från Stensens mynning, tänder u.a." },
    ],

    kliniskaAnteckningar:
      "PcV-dos = 1,6g × 3 i 5–7 dagar (ALDRIG 1g eller 2g). Pc-allergi: Klindamycin 600mg × 3 i 5–7 dagar (VGR-riktlinje). Mät gapförmåga i mm — dokumentera. Trismus <20mm = REMISS AKUT.",

    redFlags: [
      {
        id: "peri-1",
        title: "REMISS AKUT — Trismus <20mm",
        description: "Gapförmåga under 20mm indikerar djup infektion (pterygomandibulär abscess). Remittera omedelbart till käkkirurg.",
        severity: "critical",
      },
      {
        id: "peri-2",
        title: "REMISS AKUT — Dysfagi",
        description: "Svårigheter att svälja = risk för parapharyngeal/Ludwig's angina. SJUKHUS OMEDELBART.",
        severity: "critical",
      },
      {
        id: "peri-3",
        title: "SJUKHUS — Extraoral svullnad",
        description: "Svullnad utanför munnen (käkvinkel, hals, golv) = spridning till fascialrum. Ring 112 / skicka med ambulans.",
        severity: "critical",
      },
      {
        id: "peri-4",
        title: "Feber + Allmänpåverkan",
        description: "Temp >38°C med frossa/sjukdomskänsla = systemisk spridning → Antibiotika + remiss käkkirurg.",
        severity: "warning",
      },
    ],
  },

  "parodontal-abscess": {
    id: "VARK-12-PARAB",
    slug: "parodontal-abscess",
    title: "Parodontal Abscess",
    icdCode: "K05.20 (utan fistelgång) / K05.21 (med fistelgång)",
    patientUtsaga: "Det bultar i tandköttet, tanden känns lös och förhöjd.",
    isAcute: true,
    category: "Parodontologi",
    showBPE: true,

    snabbOversikt: [
      { label: "Definition", text: "Akut purulent inflammation i parodontala fickan — lokaliserad pusansamling." },
      { label: "Symtom", text: "Akut smärta, svullnad, rörlig tand, tanden känns förhöjd i bett, eventuell feber." },
      { label: "ICD", text: "K05.20 = utan fistelgång (sluten abscess). K05.21 = med fistelgång (spontant dränerad)." },
      { label: "Primär åtgärd", text: "Dränage via ficka eller incision. Kausal behandling." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Kom smärtan plötsligt?", a: "Ja — akut debut typisk för abscess" },
        { q: "Känns tanden förhöjd eller lös?", a: "Ja — ödem och pusansamling tränger upp tanden" },
        { q: "Har du haft parodontit eller djupa fickor sedan tidigare?", a: "Känd parodontit = vanlig orsak till parodontal abscess" },
        { q: "Har du tagit antibiotika nyligen?", a: "Antibiotika kan maskera symtom och ge resistens" },
        { q: "Har du feber eller sjukdomskänsla?", a: "Systemtecken = behov av antibiotika" },
      ],
      kompletterande: [
        "Förändring i munhygienrutiner (SRP nyligen utfört)?",
        "Mediciner som påverkar immunförsvar?",
        "Diabetes?",
      ],
    },

    status: {
      inspektion: [
        "Lokaliserad svullnad längs rotens laterala yta (NOT apikalt — då apikal abscess)",
        "Rodnad, glansig mukosa vid abscesslokalisation",
        "Fistelgång? (Stick med gutaperkapinne → RTG för att spåra)",
        "Tandrörighet grad 1–3",
        "Tanden förhöjd i bett (ödem)",
      ],
      palpation: "Fluktuation = pus → Incision indicerad. Hård svullnad = cellulär inflammation → Antibiotika. Perkussion: Öm (positiv). Palpation apikalt: Ej ömt (skiljer från apikal abscess).",
      perkussion: "Positiv (bitöm/dunköm). Palpation LATERALT om tanden ömt — INTE apikalt (skilje från apikal abscess).",
    },

    diagnostik: {
      kriterier: "Lokaliserad pusansamling i parodontala fickan. Djup ficka (>5mm) + akut smärta + svullnad lateralt om tanden. Sensibilitet ofta NORMAL (skild pulpa från infektionen).",
      rtg: [
        "Periapikal RTG: Lateral bennedbrytning — ej periapikal radiolucens (vid ren parodontal abscess)",
        "Fistelspårning: Gutaperkapinne i fistelgång + RTG",
        "Differentiering från apikal abscess: Periapikal vs lateral radiolucens",
      ],
      uteslut: [
        "Apikal radiolucens + negativ sensibilitet → Apikal abscess (K04.7) — ej parodontal",
        "Operculum runt visdomstand → Perikoronit (K05.22)",
        "Lateral cysta → Röntgenverifiering (väl avgränsad radiolucens)",
        "Endo-paro-lesion → Komplex orsak, specialist",
      ],
    },

    behandling: {
      varning: "Kausal behandling är ALLTID prioritet — antibiotika UTAN dränage är otillräckligt. Antibiotika ges UTÖVER lokal åtgärd, ej istället för.",
      alternativ: [
        {
          title: "Alternativ A: Dränage via fickan",
          indikation: "Tillgänglig ficka, ingen uttalad fluktuation.",
          metod: [
            "Lokalbedövning (infiltration längs gingivan)",
            "Sondera fickan — identifiera djupaste punkt",
            "Kyrett/sond in i fickan för att öppna och dränera pus",
            "Spola med NaCl 0.9% eller klorhexidin 0.2% via spola-kanyl",
            "Ocklusal justering (tand förhöjd i bett)",
            "Instruera patienten att massera ur mer pus",
          ],
          tid: "20–30 min",
          koder: "801, 301",
        },
        {
          title: "Alternativ B: Incision vid fluktuation",
          indikation: "Tydlig fluktuation — pus ej dränerar via ficka.",
          metod: [
            "Ytbedövning + infiltration",
            "Incision med skalpell (nr 15) i most fluctuant point",
            "Tömning av pus, spolning NaCl",
            "Ev. drain (gummiband) 24–48h",
            "Kausal behandling: SRP / extraktion vid hopeless prognosis",
          ],
          tid: "30–45 min",
          koder: "801",
        },
        {
          title: "Alternativ C: Extraktion (hopeless prognosis)",
          indikation: "Mycket djup ficka, furkation klass III, minimal benförankring — ej restaurerbar.",
          metod: [
            "Lokalbedövning",
            "Extraktion av tanden",
            "Noggrant kuretera alveolen",
            "Hemostas, bettamponad",
          ],
          tid: "20–40 min",
          koder: "401, 402",
        },
      ],
      antibiotika:
        "Indikation: Feber >38°C, cellulit, spridning, immunosupprimerad.\n" +
        "Förstahandsval: PcV 1,6g × 3 i 5–7 dagar.\n" +
        "Pc-allergi: Klindamycin 600mg × 3 i 5–7 dagar (VGR-riktlinje — verifiera mot aktuell regional riktlinje).\n" +
        "Vid terapisvikt: Metronidazol 400mg × 3 i 5–7 dagar.\n" +
        "OBS: Antibiotika är TILLÄGG till dränage — aldrig substitutet.",
    },

    uppfoljning: {
      text: "Återbesök 2–3 dagar (kontroll av dränage, borttagning av drain). Smärta ska minska 24–48h efter dränage. Vid utebliven förbättring → Ny RTG, uteslut endo-paro-lesion, specialist. SRP i kallt skede 2–4 veckor efter akutfas.",
    },

    journal: [
      {
        titel: "Mall: Parodontal abscess — dränage",
        text: `Anamnes: Pat. anger akut insättande smärta tand [nr] sedan [tid]. Tanden känns lös och förhöjd. Feber [temp/nej].
Status:
- Tand [nr]: Rörlighet grad [0-3]. Förhöjd i bett.
- Intraoralt: Svullnad/rodnad buckalt/lingualt om tand [nr]. Fluktuation [ja/nej].
- Sondering: Fickdjup [mm], purulent exsudat vid sondering.
- Perkussion: Pos. Sensibilitet kyla: [pos/neg].
RTG: Lateral bennedbrytning tand [nr]. Ingen periapikal radiolucens.
Bedömning: Parodontal abscess tand [nr].
Behandling:
- LA: [typ, mängd]
- Dränage via ficka/Incision: Purulent exsudat evakuerat. Spolning NaCl.
- [Ev. drain insatt]
- Ocklusal justering: Tand urtagen ur ocklusion.
[Antibiotika: PcV 1,6g × 3 i [5/7] dagar vid systemisk påverkan]
Plan: Återbesök [X] dgr. SRP i kallt skede planerat.`,
      },
    ],

    diffDiagnoser: [
      { namn: "Apikal abscess (K04.7)", kod: "K04.7", skillnad: "Periapikal radiolucens, negativ sensibilitet, smärta apikalt — ej lateralt." },
      { namn: "Perikoronit (K05.22)", kod: "K05.22", skillnad: "Operculum runt visdomstand, ej djup ficka i befintlig tand." },
      { namn: "Lateral parodontal cysta", kod: "K09.0", skillnad: "Väl avgränsad radiolucens lateralt, ingen akut smärta, normal pulpa." },
      { namn: "Endo-paro-lesion", kod: "K04.7", skillnad: "Kombinerad endodontisk + parodontal infektion — komplex diagnostik, specialist." },
    ],

    kliniskaAnteckningar:
      "K05.20 = Parodontal abscess UTAN fistelgång (sluten). K05.21 = MED fistelgång. K05.22 = Perikoronit — INTE parodontal abscess (vanligt kodningsfel!). Skilj från apikal abscess: Lateral vs periapikal radiolucens + sensibilitetstestning.",

    redFlags: [
      {
        id: "parab-1",
        title: "Feber + Systemisk påverkan",
        description: "Temp >38°C, frossa, sjukdomskänsla → Antibiotika obligatoriskt. Kontrollera immunstatus.",
        severity: "critical",
      },
      {
        id: "parab-2",
        title: "Snabb bennedbrytning",
        description: "Lateral bennedbrytning till apex på kort tid → Prognos mycket dålig → Extraktion + specialistremiss.",
        severity: "critical",
      },
      {
        id: "parab-3",
        title: "Furkationspåverkan klass III",
        description: "Genomgående furkation + djupa fickor → Hopeless prognosis. Diskutera extraktion tidigt.",
        severity: "warning",
      },
    ],
  },

  "anug-herpes": {
    id: "VARK-11-GING",
    slug: "anug-herpes",
    title: "ANUG / Herpes / Akut Gingivit",
    icdCode: "A69.1 (ANUG) / B00.2 (Herpes gingivostomatit) / K05.0 (Akut gingivit)",
    patientUtsaga: "Det svider, blöder och luktar illa i munnen.",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      { label: "ANUG", text: "Akut Nekrotiserande Ulcerös Gingivit — papillnekros, fetor ex ore, unga vuxna, stress/immunsuppression." },
      { label: "Herpes", text: "Herpes simplex gingivostomatit — primärinfektion, blåsor + feber + barn/unga vuxna." },
      { label: "Akut gingivit", text: "Plack-associerad akut gingivit (K05.0) — utan nekros, utan blåsor." },
      { label: "Differentiering", text: "ANUG: Papillnekros + fetor. Herpes: Blåsor/vesikler + feber. Gingivit: Rodnad + blödning utan nekros." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Har du feber?", a: "Feber vanlig vid herpes (38–40°C). ANUG: Sub-feber. Gingivit: Sällan feber." },
        { q: "Ser du sår, blåsor eller vita beläggningar i munnen?", a: "Blåsor/vesikler → Herpes. Vita pseudomembran + nekros → ANUG." },
        { q: "Luktar det illa ur munnen? (Fetor ex ore)", a: "Uttalad fetor = karakteristiskt för ANUG" },
        { q: "Har du haft stressiga perioder, sömnbrist eller immunosuppression?", a: "Stress + rökning + immunsuppression = ANUG-riskprofil" },
        { q: "Är du HIV-positiv eller tar immunosupprimerande läkemedel?", a: "ANUG kan vara första manifestation av HIV" },
      ],
      kompletterande: [
        "Tidigare liknande episod? (Herpes: recidiv vid stress, UV, feber)",
        "Nära kontakt med person med herpesinfekton (smittorisk)?",
        "Kostintag? (Dehydrering vid herpes)",
        "Lymfknutor? (Cervikala lymfknutor vid herpes)",
      ],
    },

    status: {
      inspektion: [
        "ANUG: Nekrotiserade papiller ('punched out'), grågula pseudomembran, intensiv rodnad, uttalad fetor",
        "Herpes: Multiple vesikler/ulcerationer på gingiva, hårda gommen, läppar — INTE bara tonsiller",
        "Gingivit (K05.0): Generell rodnad + blödning utan nekros och utan vesikler",
        "Lymfknutor: Palpera cervikalt — förstorade vid herpes",
        "Dehydrering: Bedöm allmäntillstånd — barn kan behöva sjukhusvård",
      ],
      palpation: "Palpera lymfknutor submandibulärt och cervikalt. Förstorade och ömma = herpes (eller ANUG). Palpera extraoralt för cellulit.",
    },

    diagnostik: {
      kriterier: "Klinisk diagnos. ANUG: Papillnekros + pseudomembran + fetor + unga vuxna + stress. Herpes: Vesikler + feber + primärinfektion (barn/unga). Bekräftelse: PCR-svabb (herpes) om osäker.",
      rtg: ["Sällan indicerat. Vid ANUG med bennedbrytning → RTG för att utesluta NUP (nekrotiserande ulcerös parodontit)."],
      uteslut: [
        "Immunsuppression (HIV/AIDS, leukemi, neutropeni) → ANUG kan vara debutsymtom → Remiss läkare",
        "Barn med hög feber + ulcerationer som ej svarar på behandling → Sjukhusremiss",
        "NOMA (cancrum oris) — sällsynt i Sverige men vid immunsuppression + ANUG → OMEDELBAR REMISS",
        "Dysfagi → Remiss (risk för djup halsinfektion)",
      ],
    },

    behandling: {
      varning: "Immunsuppression (HIV, leukemi, neutropeni) måste uteslutas vid ANUG som ej svarar på behandling. Herpes är smittsamt — informera patient om smittrisk.",
      alternativ: [
        {
          title: "ANUG — Alt A: Débridement + Klorhexidin",
          indikation: "ANUG utan systemisk påverkan.",
          metod: [
            "Försiktig débridement med ultraljud + handkyrett (LA om nödvändigt)",
            "Spola med klorhexidin 0.2% under behandling",
            "Instruera daglig sköljning med Klorhexidin 0.2% × 2 i 2 veckor",
            "Mjuk tandborste — varsam borstning",
            "Analgetika: Paracetamol 1g × 4",
          ],
          tid: "30–45 min",
          koder: "311, 341",
        },
        {
          title: "ANUG — Alt B: Metronidazol (vid systemisk påverkan)",
          indikation: "ANUG med feber, utbredd nekros, immunsuppression.",
          metod: [
            "Metronidazol 400mg × 3 i 5 dagar",
            "OBS: Alkohol strikt kontraindicerat under och 48h efter Metronidazol",
            "Kombination med débridement",
          ],
          koder: "Recept",
        },
        {
          title: "Herpes — Alt A: Aciklovir (tidig diagnos)",
          indikation: "Primär herpesgingivostomatit — start inom 72h från debut.",
          metod: [
            "Aciklovir 200mg × 5 i 5 dagar (vuxna)",
            "Barn: Aciklovir 200mg × 5 i 5 dagar, reducera vid nedsatt njurfunktion",
            "Symtomatisk behandling: Paracetamol + vätska (undvik dehydrering)",
            "Lokalt: Lidokain gelé innan mat (smärtstillande)",
          ],
          koder: "Recept",
        },
        {
          title: "Herpes — Alt B: Symtomatisk behandling",
          indikation: "Om >72h sedan debut eller mild form.",
          metod: [
            "Analgetika: Paracetamol 0.5–1g × 4",
            "Vätska: Kalla drycker, smoothies (undvikande av surt/skarpt)",
            "Lokalt bedövningsgelé (Xylocain) innan mat",
            "Klorhexidinsköljning 0.2% för sekundärinfektionsprofylax",
          ],
          koder: "101",
        },
      ],
    },

    uppfoljning: {
      text: "ANUG: Återbesök 1–2 veckor. Komplettera débridement. Bedöm om bennedbrytning (NUP). Herpes: Förloppet 10–14 dagar. Barnet bör dricka väl — vid dehydrering → sjukhusvård. Immunsuppression → Remiss infektionsmedicin.",
    },

    journal: [
      {
        titel: "Mall: ANUG",
        text: `Anamnes: Pat. anger svidande, blödande tandkött + uttalad fetor sedan [tid]. Stress [ja/nej]. Rökning [ja/nej]. Immunstatus [känt/okänt].
Status:
- Nekrotiserade interdentala papiller [regioner]
- Grågula pseudomembran på gingivan
- Uttalad fetor ex ore
- Lymfknutor: [u.a. / förstorade submandibulärt]
- Feber: [temp / ingen]
Bedömning: Akut nekrotiserande ulcerös gingivit.
Behandling:
- Débridement med ultraljud, försiktig kyrettage
- Sköljning Klorhexidin 0.2% under behandling
- [Metronidazol 400mg × 3 i 5 dagar vid systemisk påverkan]
Info: Klorhexidinsköljning 0.2% × 2 hemma. Mjuk kost. Paracetamol v.b. Alkohol kontraindicerat vid Metronidazol.
Plan: Återbesök [X] dagar.`,
      },
      {
        titel: "Mall: Herpesgingivostomatit",
        text: `Anamnes: Pat. [ålder] anger svidande sår och blåsor i munnen sedan [tid]. Feber [temp]. Svårt att äta/dricka.
Status:
- Multiple vesikler/ulcerationer på gingiva, hårda gommen, läppar
- Lymfknutor: Förstorade och ömma submandibulärt
- Allmäntillstånd: [gott / påverkat]
Bedömning: Primär herpesgingivostomatit.
Behandling:
- [Aciklovir 200mg × 5 i 5 dagar vid debut <72h]
- Paracetamol [dos] × 4 för smärtlindring
- Klorhexidin 0.2% sköljning × 2 (sekundärinfektionsprofylax)
- Lidokaingelé lokalt innan mat
Info: Smittsamt! Undvik kyss och delning av bestick. Kall, mjuk kost. Vätska viktigt.
Plan: Återbesök om ej bättre [X] dagar.`,
      },
    ],

    diffDiagnoser: [
      { namn: "Plack-associerad gingivit (K05.0)", kod: "K05.0", skillnad: "Rodnad + blödning utan nekros, utan blåsor, utan fetor." },
      { namn: "Aftöst sår (K12.0)", kod: "K12.0", skillnad: "Enstaka, väl avgränsade runda sår — ej epidemisk bild, ej feber vid minor aftae." },
      { namn: "Hand-Foot-Mouth disease (B08.4)", kod: "B08.4", skillnad: "Blåsor även på händer och fötter. Enterovirus. Barn." },
      { namn: "Erythema multiforme (L51)", kod: "L51", skillnad: "Utbredd mukosit + hudlesioner (targetlesioner). Läkemedelsreaktion/HSV-utlöst." },
    ],

    kliniskaAnteckningar:
      "ANUG: Metronidazol 400mg × 3 (ALDRIG till gravida trimester 1 utan läkarordination). Alkohol strikt kontraindicerat vid Metronidazol. Herpes: Aciklovir effektivt bara om start <72h. Smittorisk — informera patient.",

    redFlags: [
      {
        id: "anug-1",
        title: "Immunsuppression / HIV",
        description: "ANUG som debuterar utan uppenbar orsak (ingen stress, god munhygien) → Misstänk HIV/immundefekt → Remiss läkare för utredning.",
        severity: "critical",
      },
      {
        id: "anug-2",
        title: "NOMA (Cancrum oris)",
        description: "Snabbt progredierande vävnadsnekros utöver gingivan → OMEDELBAR REMISS. Extremt sällsynt i Sverige men livshotande.",
        severity: "critical",
      },
      {
        id: "anug-3",
        title: "Herpes — Dehydrering (barn)",
        description: "Barn som inte kan dricka på grund av smärta → Risk dehydrering → Sjukhus för iv-vätska.",
        severity: "warning",
      },
      {
        id: "anug-4",
        title: "Dysfagi",
        description: "Svårigheter att svälja saliv/vätska = djup engagemang → Sjukhusremiss.",
        severity: "warning",
      },
    ],
  },

  periimplantit: {
    id: "VARK-13-IMPL",
    slug: "periimplantit",
    title: "Periimplantit",
    icdCode: "K05.6 (Periimplantit)",
    patientUtsaga: "Det gör ont runt implantatet, det blöder och gungar.",
    isAcute: false,
    category: "Parodontologi",
    showBPE: true,

    snabbOversikt: [
      { label: "Definition", text: "Periimplantit = bennedbrytning + inflammation runt osseointegrerat implantat. Periimplantar mukosit = reversibel mjukvävnadsinflammation (ej bennedbrytning)." },
      { label: "ICD", text: "K05.6 (Periimplantit)." },
      { label: "Symtom", text: "BOP (blödning vid sondering), ökad fickdjup, bennedbrytning RTG, eventuell rörlighet." },
      { label: "Klassifikation", text: "Periimplantar mukosit (reversibel) → Periimplantit (irreversibel bennedbrytning)." },
      { label: "Prognos", text: "Periimplantar mukosit: God. Periimplantit: Sämre — tidig intervention viktigt." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Hur gammalt är implantatet och av vilket märke?", a: "Ålder och fabrikat viktigt — torque-tolerans varierar per tillverkare" },
        { q: "Röker du?", a: "Rökning = starkaste riskfaktorn för periimplantit (>3x ökad risk)" },
        { q: "Har du diabetes?", a: "Okontrollerad diabetes försämrar osseointegration och sårläkning" },
        { q: "Har du haft parodontit kring naturliga tänder?", a: "Historia av parodontit = ökad risk för periimplantit" },
        { q: "Gör det ont? Gungar implantatet?", a: "Rörlighet = förlorad osseointegration → extraktion" },
      ],
      kompletterande: [
        "Implantatprotokoll: Enkelfas eller tvåfas? Belastningstyp?",
        "Senaste röntgenkontroll av implantatet?",
        "Munhygien runt implantat (mellanrumsborstet, Waterpik)?",
        "Bettfunktion: Bruxism, hög belastning?",
      ],
      riskfaktorer: [
        "Rökning (>3x ökad risk)",
        "Diabetes (dålig glykemisk kontroll)",
        "Historia av parodontit",
        "Otillräcklig munhygien",
        "Bruxism / parafunktion",
        "Otillräcklig keratiniserad gingiva",
      ],
    },

    status: {
      inspektion: [
        "BOP (Blödning vid sondering) — positiv vid periimplantar mukosit och periimplantit",
        "Fickdjup runt implantat (normalt ≤4mm, patologiskt >5mm med BOP + bennedbrytning)",
        "Suppuration (pus) vid sondering",
        "Rörlighet: Testa manuellt — rörlighet = förlorad osseointegration",
        "Mjukvävnadsnivå: Recession runt implantat?",
        "Protesen: Löst skruvsäte? Lös protetisk komponent?",
      ],
      palpation: "Palpera omgivande alveolarkanten. Krepitation = gasbubblor i abscesshåla. Fluktuation = abscess → dränage.",
      perkussion: "Klangt metallljud vid perkussion = adekvat osseointegration. Dovt ljud = förlorad integration.",
      bpe: {
        description: "BPE-sondering runt implantat med plastsond (ej metallsond som kan skada implantatytan).",
        normalt: "Fickdjup ≤4mm + ingen BOP + ingen bennedbrytning = periimplantar hälsa.",
        patologiskt: "Fickdjup >5mm + BOP + bennedbrytning på RTG = periimplantit.",
      },
    },

    diagnostik: {
      kriterier: "Periimplantit: BOP (och/eller suppuration) + fickdjup >5mm + RTG-verifierad bennedbrytning jämfört med baseline-RTG. Periimplantar mukosit: BOP utan bennedbrytning (reversibel).",
      rtg: [
        "Periapikal RTG: Bennivå runt implantat — jämför med baseline (insättnings-RTG)",
        "Bennedbrytning: Kraterformad/cirkumferent (typisk för periimplantit)",
        "Spongiosatät: Försämrad osseointegration?",
        "Kontrollera implantatpositionering (korrekt angulering, avstånd till naturliga tänder)",
      ],
      uteslut: [
        "Rörlighet → Förlorad osseointegration — extraktion indicerad",
        "Ingen bennedbrytning på RTG → Periimplantar mukosit (reversibel) — ej periimplantit",
        "Fraktur av implantat eller protetisk komponent → Specialist",
      ],
      klassifikation:
        "Periimplantar mukosit: BOP + inflammation utan bennedbrytning.\n" +
        "Periimplantit steg 1: BOP + ≤2mm bennedbrytning.\n" +
        "Periimplantit steg 2: BOP + >2mm bennedbrytning.\n" +
        "Periimplantit steg 3: BOP + >2mm bennedbrytning + rörlighet (extraktion).",
    },

    behandling: {
      varning: "Verifiera ALLTID torque-tolerans och rekommendationer mot tillverkarens IFU (Instructions for Use) — varierar per implantatsystem. Använd plastsond, ej metallsond.",
      alternativ: [
        {
          title: "Alternativ A: Icke-kirurgisk behandling (mukosit + tidig periimplantit)",
          indikation: "Periimplantar mukosit eller periimplantit steg 1–2 utan djupa fickor.",
          metod: [
            "Munhygieninstruktion: Specialborste för implantat, mellanrumsborstet, Waterpik",
            "Professionell rengöring: Plastkuretter/karboninstrument (ej metall mot implantatytan)",
            "Ultarljud med plastskafter",
            "Lokal klorhexidinapplikation (Chlorhexidingel 0.2%)",
            "Rökstopp-råd",
            "Re-evaluering: 4–6 veckor",
          ],
          tid: "45–60 min",
          koder: "323, 301",
        },
        {
          title: "Alternativ B: Kirurgisk behandling (specialist)",
          indikation: "Periimplantit steg 2–3 som ej svarat på icke-kirurgisk terapi. Fickdjup >6mm kvarstående.",
          metod: [
            "Lappkirurgi: Tillgång till implantatytan",
            "Implantatytebehandling (mekanisk + kemisk dekontaminering)",
            "Benfyllnadsmaterial (vid kraterdefekt)",
            "GBR (Guided Bone Regeneration) vid lämplig defektmorfologi",
          ],
          specialist: true,
          koder: "Remiss specialist oral kirurgi/parodontist",
        },
        {
          title: "Alternativ C: Extraktion av implantat",
          indikation: "Rörlighet (förlorad osseointegration), periimplantit steg 3, hopeless prognosis.",
          metod: [
            "Trephine bur eller manuell extraktion",
            "Debridering av området",
            "Bedöm möjlighet till reimplantering (minimum 6 månaders läkning)",
          ],
          koder: "Remiss oral kirurg",
        },
      ],
      antibiotika:
        "Antibiotika vid periimplantit: Begränsad evidens för rutinmässig användning.\n" +
        "Vid abscess/akut fas: PcV 1,6g × 3 i 5–7 dagar.\n" +
        "Pc-allergi: Klindamycin 150mg × 3 i 5–7 dagar.",
    },

    uppfoljning: {
      text: "Mukosit: Re-evaluering 4–6 veckor. God prognos vid god compliance. Periimplantit: Livslångt underhållsprogram var 3:e månad. Ny RTG var 6–12 månad vid aktiv sjukdom. Om försämring → Specialist omgående.",
    },

    journal: [
      {
        titel: "Mall: Periimplantit — undersökning och behandling",
        text: `Anamnes: Pat. anger besvär runt implantat tand [nr] sedan [tid]. Implantat insatt [datum/år], fabrikat [märke]. Röker [ja/nej]. Diabetes [ja/nej].
Status:
- Implantat tand [nr]: BOP [pos/neg]. Fickdjup [mm] runt implantat (mesialt/distalt/buckalt/lingualt).
- Suppuration [ja/nej]. Rörlighet [pos/neg].
- Mjukvävnad: Recession [mm]. Keratiniserad gingiva [mm].
RTG (periapikal): Bennedbrytning [mm] jämfört med baseline [datum]. [Kraterformad/cirkumferent].
Bedömning: [Periimplantar mukosit / Periimplantit steg 1/2/3].
Behandling:
- Plastkurett/ultraljud plastskal: Rengöring implantatyta
- Lokal klorhexidingelé applicerad
- Munhygieninstruktion: Implantatborste + mellanrumsborstet
[Antibiotika: PcV 1,6g × 3 i [5/7] dagar vid indikation]
Plan: Re-evaluering [4/6] veckor. [Remiss specialist vid kvarstående aktivitet].`,
      },
    ],

    diffDiagnoser: [
      { namn: "Periimplantar mukosit", kod: "M27.61", skillnad: "BOP utan bennedbrytning. Reversibel. Behandlas icke-kirurgiskt." },
      { namn: "Parodontit kring naturlig tand", kod: "K05.3", skillnad: "Naturlig tand — annan sonderings- och behandlingsstrategi." },
      { namn: "Implantatfraktur", kod: "T85.6", skillnad: "Rörligt implantat med fraktur synlig på RTG. Extraktion." },
      { namn: "Körtelinfektion (sialadenit)", kod: "K11.2", skillnad: "Smärta från spottkörtel, ej från implantat. Pus från körtelutförsgång." },
    ],

    kliniskaAnteckningar:
      "K05.6 = Periimplantit. Verifiera torque mot tillverkarens IFU — ALLTID. Använd plastsond (ej metall) vid sondering. Jämför alltid med baseline-RTG för att kvantifiera bennedbrytning.",

    redFlags: [
      {
        id: "impl-1",
        title: "Rörlighet — Förlorad osseointegration",
        description: "Rörligt implantat = förlorad osseointegration. Extraktion indicerad — ingen behandling kan återställa osseointegration.",
        severity: "critical",
      },
      {
        id: "impl-2",
        title: "Snabb bennedbrytning",
        description: ">2mm bennedbrytning sedan senaste RTG inom 12 månader → Specialistremiss OMGÅENDE.",
        severity: "critical",
      },
      {
        id: "impl-3",
        title: "Abscess runt implantat",
        description: "Fluktuation + pus → Akut dränage. Antibiotika vid feber.",
        severity: "warning",
      },
      {
        id: "impl-4",
        title: "Cementöverskott",
        description: "Vanlig orsak till akut periimplantar mukosit efter kroninstallation. Cement under mjukvävnaden måste avlägsnas fullständigt — annars kvarstående inflammation.",
        severity: "warning",
      },
    ],
  },

  furkationsdiagnostik: {
    id: "PARO-26-FK",
    slug: "furkationsdiagnostik",
    title: "Furkationspåverkan — Diagnostik",
    icdCode: "K05.31 (Kronisk parodontit med furkationspåverkan)",
    patientUtsaga: "Tandläkaren hittade ett djupt hål under molaren.",
    isAcute: false,
    category: "Parodontologi",
    showBPE: true,

    snabbOversikt: [
      { label: "Definition", text: "Furkationspåverkan = bennedbrytning in i furkationsområdet (bifurkation/trifurkation) på flertandiga tänder." },
      { label: "Instrument", text: "Nabers-sond (krokig sond) för att diagnosticera och klassificera furkationspåverkan." },
      { label: "Klassifikation", text: "Klass I: Horisontell påverkan <3mm. Klass II: >3mm, ej genomgående. Klass III: Genomgående (tunnel)." },
      { label: "Drabbade tänder", text: "Vanligast: Molarer — 6:or och 7:or. Trefurkation på maxillära molarer (3 rötter)." },
      { label: "Prognos", text: "Klass I–II: Behandlingsbar. Klass III: Svårbehandlad, ofta hopeless prognosis." },
    ],

    anamnes: {
      obligatoriska: [
        { q: "Har du känd parodontit eller djupa fickor sedan tidigare?", a: "Furkationspåverkan är komplikation till avancerad parodontit" },
        { q: "Röker du?", a: "Rökning döljer BOP och accelererar bennedbrytning" },
        { q: "Har tanden behandlats tidigare (krons, rotbehandling)?", a: "Krona kan dölja furkationsingång — sondering under kronranden" },
        { q: "Hur länge har du vetat om parodontitbehandling?", a: "Längre obehandlad tid = mer bennedbrytning = sämre prognos" },
      ],
      kompletterande: [
        "Käkar och bettfunktion (bruxism ökar belastning)?",
        "Tidigare SRP och effekt?",
        "Systemsjukdomar (diabetes, osteoporos)?",
      ],
    },

    status: {
      inspektion: [
        "Nabers-sond: För in horisontellt i furkationsöppningen — mät horisontellt djup",
        "Klass I: Sonden penetrerar <3mm horisontellt",
        "Klass II: Sonden penetrerar >3mm men ej genomgående",
        "Klass III (tunnel): Sonden passerar igenom — genomgående furkation",
        "Molarer: Sond från buckalt, lingualt/palatinalt och mesialt/distalt",
        "Bendefektmorfologi: Horisontell vs vertikal bennedbrytning",
      ],
      palpation: "Palpera bukalt och lingualt mot furkationsregionen. Ömt = aktiv inflammation. Mät fickdjup mesio-buckalt, mid-buckalt, disto-buckalt, mesio-lingualt etc.",
      bpe: {
        description: "BPE screening detekterar djupa fickor men ej furkationspåverkan specifikt. Nabers-sond krävs för furkationsdiagnostik.",
        normalt: "Ingen sondpenetration i furkationsöppningen = ingen furkationspåverkan.",
        patologiskt: "Sondpenetration >1mm horisontellt = Klass I. >3mm = Klass II. Genomgående = Klass III.",
      },
    },

    diagnostik: {
      kriterier: "Furkationspåverkan kräver klinisk diagnostik med Nabers-sond kombinerat med RTG. RTG underestimerar ofta furkationspåverkan — klinisk sondering är gold standard.",
      rtg: [
        "Bitewing: Bifurkation synlig om bennedbrytning ≥30–40% av furkationsdjupet",
        "Periapikal RTG: Detaljerad bild — furkationspåverkan syns som radiolucens interradikulärt",
        "OBS: RTG underestimerar — klinisk sondering är mer sensitiv",
      ],
      uteslut: [
        "Djup ficka vid tand med en rot → Ej furkationspåverkan — klassisk parodontit",
        "Pulpanekros med lateral perforation → Endo-paro-lesion — specialist",
        "Klass III furkation + djupa fickor → Hopeless prognosis → Diskutera extraktion tidigt",
      ],
    },

    behandling: {
      varning: "Klass III-furkation kombinerat med fickdjup >6mm = mycket svårbehandlat. Bedöm prognos ärligt och tidigt. Extraktion kan vara bättre alternativ för långtidsstabilitet.",
      alternativ: [
        {
          title: "Alternativ A: SRP + hygienoptimering (Klass I–II)",
          indikation: "Furkation Klass I–II, adekvat munhygien möjlig, god systemhälsa.",
          metod: [
            "Subgingivalt SRP med Nabers-formade kyrettar in i furkationen",
            "Minikyrettar (Gracey mini 5-6, 7-8) för furkationsaccess",
            "Ultarljud med kurved insats för furkation",
            "Individuell munhygieninstruktion: Furkationsborste (Curaprox CPS 06/07/08)",
            "Re-evaluering 6–8 veckor",
          ],
          tid: "45–90 min",
          koder: "324, 323",
        },
        {
          title: "Alternativ B: Tunnelpreparering (Klass III — specialist)",
          indikation: "Klass III-furkation på underkäksmolarer — genomgående furkation.",
          metod: [
            "Odontoplastik: Vidgar furkationsöppningen för hygientillgång",
            "Tunnelpreparation: Skapar rengorbart utrymme",
            "Patient instrueras i rengöring med furkationsborste",
            "OBS: Kariesrisk ökar i furkationsöppningen",
          ],
          specialist: true,
          koder: "Remiss parodontist",
        },
        {
          title: "Alternativ C: Rotresektion / Hemisection (specialist)",
          indikation: "En rot har hopeless prognosis, övriga rötter bevaransvärda.",
          metod: [
            "Endodonti på kvarvarande rötter",
            "Kirurgisk resektion av problematisk rot",
            "Protetisk rekonstruktion av tanden utan avsagd rot",
          ],
          specialist: true,
          koder: "Remiss specialist",
        },
        {
          title: "Alternativ D: Extraktion",
          indikation: "Furkation Klass III + djupa fickor + dålig prognos. Hopeless compromised.",
          metod: [
            "Extraktion av tanden",
            "Bedömning av ersättningsmöjligheter (implantat, brygga, protes)",
          ],
          koder: "401, 402",
        },
      ],
    },

    uppfoljning: {
      text: "Re-evaluering: 6–8 veckor efter SRP. Furkationspåverkan kan sällan elimineras — målet är att göra den rengöringsbar. Underhållsprogram: Var 3:e månad med furkationsinstrument. Ny RTG var 2:e år.",
    },

    journal: [
      {
        titel: "Mall: Furkationsdiagnostik",
        text: `Anamnes: Känd parodontit sedan [tid]. Röker [ja/nej]. Senaste SRP [datum].
Status:
- Tand [nr]: Fickdjup mesio-buckalt [mm] / mid-buckalt [mm] / disto-buckalt [mm]
- Furkation: Nabers-sond — Klass [I/II/III] buckalt [ja/nej] / lingualt [ja/nej]
- BOP: [pos/neg]. Suppuration [ja/nej].
- Tandrörighet: Grad [0-3].
RTG (periapikal tand [nr]): Interradikulär radiolucens [ja/nej]. Bennedbrytning [mm].
Bedömning: Kronisk parodontit med furkationspåverkan Klass [I/II/III], tand [nr].
Behandling:
- SRP subgingivalt inkl furkation med Gracey mini + ultraljud
- Furkationsborste instruktion (Curaprox CPS [storlek])
Plan: Re-evaluering [6/8] veckor. [Remiss parodontist vid Klass III med kvarstående aktivitet].`,
      },
    ],

    diffDiagnoser: [
      { namn: "Kronisk parodontit utan furkationspåverkan", kod: "K05.3", skillnad: "Inga rötter i beröring med patologisk bennedbrytning interradikulärt." },
      { namn: "Endo-paro-lesion", kod: "K04.7", skillnad: "Kombinerad endodontisk + parodontal orsak. Negativ sensibilitet + lateral radiolucens." },
      { namn: "Lateral parodontal cysta", kod: "K09.0", skillnad: "Väl avgränsad radiolucens, ej inflammatorisk, normal parodontal status." },
    ],

    kliniskaAnteckningar:
      "Nabers-sond: Håll parallellt med rotens angulering in i furkationen. Klass III = genomgående — tunnelpreparering eller extraktion. Curaprox CPS 06 (grön) eller 07/08 för furkationshygien. Kariesrisk ökar vid öppen furkation — fluoridprofylax.",

    redFlags: [
      {
        id: "furk-1",
        title: "Furkation Klass III",
        description: "Genomgående furkation + fickdjup >6mm + mobilitet → Hopeless prognosis. Diskutera extraktion med patienten tidigt.",
        severity: "critical",
      },
      {
        id: "furk-2",
        title: "Kombination av faktorer",
        description: "Furkation Klass II–III + mobilitet grad 2–3 + benförlust >50% → Specialistremiss OMGÅENDE.",
        severity: "critical",
      },
      {
        id: "furk-3",
        title: "Endo-paro-misstanke",
        description: "Negativ sensibilitet + lateral/interradikulär radiolucens → Uteslut endo-paro-lesion — specialist.",
        severity: "warning",
      },
    ],
  },
};
