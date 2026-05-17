import type { RedFlag } from "@/components/scenario/ScenarioLayout";

/**
 * Parodontologi — scenariodata.
 *
 * KÄLLA (enda sanningskälla): html-sources/akut-parod_html_JUSTERAD.html
 * Granskad: Mars 2026, ansvarig granskare Nedaa Abujazar.
 * Underlag: Socialstyrelsen NR Tandvård 2022 + ICD-10-SE, Internetodontologi
 * (EFP/AAP 2018, parodontal undersökning, antibiotika, perikoronit, ANUG,
 * parodontal abscess, periimplantit), VGR regional antibiotikariktlinje,
 * EFP/AAP 2017 (periimplantit), Papapanou et al. JCP 2018, FASS, TLV, SBU.
 *
 * Innehållet är troget överfört från den granskade HTML:en — inga kliniska
 * påståenden skapas, ändras eller tas bort här. JUSTERAT-markerade
 * korrigeringar i källan är inkluderade. Presentationen sker via
 * components/scenario/ScenarioPage.tsx (ren layout, noll dataförlust).
 */

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
    palpation?: string | string[];
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

  /** Klinisk infografik (höger-rail). Presentation — ej medicinsk data. */
  infografik?: { src: string; alt: string; title: string; caption: string };

  redFlags: RedFlag[];
}

export const parodontoloiScenarier: Record<string, ParodScenarioData> = {
  "gingivit-parodontit": {
    id: "VARK-11-PAROD",
    slug: "gingivit-parodontit",
    title: "Gingivit / Parodontit",
    icdCode:
      "K05.0 (Akut gingivit), K05.1 (Kronisk gingivit), K05.3 (Kronisk parodontit)",
    patientUtsaga: "Det blöder när jag borstar och tandköttet ömmar",
    isAcute: false,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtomprofil",
        text: "Blödning vid tandborstning eller spontant, ömt/svullet tandkött, dålig andedräkt, eventuellt rörliga tänder. Smärtan är ofta molande eller ”kliande”.",
      },
      {
        label: "Diagnos ICD-10 (JUSTERAT)",
        text: "K05.0 (akut gingivit), K05.1 (kronisk gingivit) eller K05.3 (kronisk parodontit). OBS: K05.2 = perikoronit (separat subkod). Använd K05.3 för parodontit.",
      },
      {
        label: "Prevalens",
        text: "Gingivit drabbar ca 90 % av befolkningen vid bristande hygien. Parodontit drabbar ca 40 % av vuxna över 40 år; ca 10 % utvecklar grav parodontit.",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "När blöder det? Vid borstning eller spontant?",
          a: "Spontan blödning indikerar grav gingivit eller ANUG.",
        },
        {
          q: "Upplever du att tänderna känns lösa eller har flyttat på sig?",
          a: "Tyder på parodontal benförlust (parodontit).",
        },
        {
          q: "Röker eller snusar du?",
          a: "Nikotin döljer blödning (vasokonstriktion) — maskerar inflammation [JUSTERAT].",
        },
        {
          q: "Har du diabetes eller andra systemsjukdomar?",
          a: "Diabetes ökar risken för parodontit ×3 och försämrar läkning.",
        },
        {
          q: "Har du nära släktingar med tandlossning?",
          a: "Ärftlig predisposition (särskilt aggressiv/snabb form).",
        },
      ],
      kompletterande: [
        "Muntorrhet (ökar plackackumulering)",
        "Stress / immunhämmande mediciner",
      ],
      riskfaktorer: ["Rökning", "Diabetes mellitus", "Dålig munhygien"],
    },

    status: {
      inspektion: [
        "Färg & form: gingivan röd/blåröd och svullen (ödematös). Frisk gingiva är blekrosa/stram.",
        "Plack/tandsten: supragingival biofilm bekräftar bakteriell etiologi.",
        "Pus: indikerar abscess eller aktiv parodontit vid tryck på gingivan.",
      ],
      palpation: [
        "Parodontalundersökning (avgörande): BoP (Bleeding on Probing) är viktigaste tecknet på pågående inflammation.",
        "BoP hos rökare: Frånvaro av BoP är ett starkt tecken på parodontal stabilitet — men utesluter inte sjukdom hos rökare (falsk-negativt pga vasokonstriktion) [JUSTERAT].",
        "PPD (fickdjup): ≤3 mm normalt/gingivit, ≥4 mm patologiskt om BoP finns.",
        "CAL (fästenivå): sondering förbi emaljcementgränsen (ECG) — primärt mått för parodontal destruktion enligt EFP/AAP 2018.",
      ],
    },

    diagnostik: {
      kriterier:
        "Vid fickor ≥4 mm krävs röntgen för bennivå. Sänkt bennivå (>2 mm från ECG) bekräftar parodontit. Intakt bennivå bekräftar gingivit (om inflammation finns).",
      rtg: [
        "Sänkt bennivå (>2 mm från ECG): bekräftar parodontit",
        "Intakt bennivå: bekräftar gingivit (om inflammation finns)",
      ],
      uteslut: [
        "Blödning UTAN röntgenverifierad bennedbrytning → gingivit (reversibel), ej parodontit",
        "Atypiskt kraftig blödning eller nekros → överväg bakomliggande blodsjukdom (systempåverkan)",
      ],
      klassifikation:
        "EFP/AAP 2018 (Stadium × Grad). Stadium (svårighetsgrad): I Initial parodontit, II Måttlig parodontit, III/IV Grav/Komplicerad. Grad (progression): A Låg risk/långsam, B Måttlig risk, C Hög risk/snabb progression. OBS: ICD-10 och EFP/AAP är separata system — blanda dem ej.",
    },

    behandling: {
      varning:
        "Systemisk antibiotika vid parodontit stadium I–IV är rangordnad Prio 10 (lägst prioritet) — ges inte rutinmässigt. Detta är INTE samma sak som kategorin ”Icke-göra” (en separat rekommendationskategori i Socialstyrelsens system). Kan övervägas som tillägg vid specifik indikation efter specialistkonsult [JUSTERAT].",
      alternativ: [
        {
          title: "Alternativ A: Gingivit (K05.0/K05.1)",
          koder: "101/111, 201",
          metod: [
            "Info & instruktion (Prio 5): borstteknik och approximal rengöring",
            "Depuration: avlägsna plack och tandsten supragingivalt",
            "Prognos: reversibelt — utläkning inom 1–2 veckor vid god munhygien",
            "Farmaka: klorhexidin kortvarigt (Prio 8) — mekanisk rengöring är överlägsen",
          ],
        },
        {
          title: "Alternativ B: Parodontit (K05.3)",
          koder: "114, 341/342",
          metod: [
            "Munhygien (Prio 3): kritiskt moment, mellanrumsborstar nödvändigt",
            "Mekanisk infektionsbehandling (Prio 3): scaling/depuration för subgingival biofilm",
            "Systemisk antibiotika (Prio 10): rangordnad lägst — ges ej rutinmässigt, ej ”Icke-göra”, kan övervägas vid specifik indikation efter specialistkonsult [JUSTERAT]",
          ],
        },
        {
          title: "Alternativ C: Parodontal abscess (akut exacerbation)",
          metod: [
            "Dränage (Prio 2): dränera via fickan, spola med koksalt/vatten",
            "Antibiotika: endast vid feber eller allmänpåverkan",
          ],
        },
      ],
    },

    uppfoljning: {
      text: "Gingivit: utvärdera BoP och plackindex efter 2–4 veckor. Mål: <10–20 % blödning. Parodontit: utvärdering av fickdjup och blödning 3–6 månader efter avslutad scaling.",
    },

    journal: [
      {
        titel: "Mall: Gingivit / Parodontit",
        text: `Diagnos: K05.1 Kronisk gingivit (alt. K05.3 Kronisk parodontit Stadium II Grad B).
Anamnes: Söker för blödande tandkött vid borstning. Ingen akut smärta. Röker ej.
Status:
Gingiva: Generellt rodnad och ödematös.
BoP: Generell blödning (>30%).
PPD: Generellt 2-3 mm, enstaka 4 mm (pseudofickor).
Röntgen: Intakt bennivå.
Bedömning: Plackinducerad gingivit orsakad av bristande approximal rengöring.
Behandling: Info om biofilm. Instr munhygien (Bass + mellanrumsborste). Depuration helkäke supragingivalt.
Plan: Återbesök för läkningkontroll 2 veckor.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Parodontal abscess",
        kod: "K05.20",
        skillnad: "Lokaliserad svullnad, intensiv smärta, pus.",
      },
      {
        namn: "Nekrotiserande gingivit (NG)",
        kod: "A69.1",
        skillnad:
          "Intensiv smärta, nekrotiserade papiller, spontan blödning, foetor ex ore.",
      },
      {
        namn: "Systempåverkan / blodsjukdom",
        kod: "-",
        skillnad:
          "Vid atypiskt kraftig blödning eller nekros — överväg bakomliggande blodsjukdom.",
      },
    ],

    kliniskaAnteckningar:
      "Nationella riktlinjer (Socialstyrelsen): förbättrad munhygien vid parodontit Prio 3, mekanisk infektionsbehandling Prio 3, stödbehandling Prio 3. Systemisk antibiotika vid parodontit stadium I–IV: Prio 10 (lägst — ej ”Icke-göra”) [JUSTERAT]. ”Icke-göra” är en separat kategori och ska ej sammanblandas med Prio 10. ICD-10 och EFP/AAP 2018 är två separata klassifikationssystem. Debiteringskoder (TLV — verifiera mot kusp.tlv.se): 101/111 basundersökning, 114 fullständig parodontal undersökning, 201 rådgivande samtal (gingivit), 341/342 behandling av parodontal sjukdom.",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/infografik parodontit.jpg",
      alt: "Infografik: gingivit och kronisk parodontit — patogenes, klassifikation (EFP/AAP 2018) och behandlingssteg.",
      title: "Gingivit & parodontit",
      caption: "EFP/AAP 2018 — Stadium I–IV × Grad A–C, kausal terapi i steg.",
    },

    redFlags: [
      {
        id: "parod-1",
        title: "Snabb / oproportionerlig bennedbrytning",
        description:
          "Bennedbrytning oproportionerlig mot plackbörda, särskilt ung patient → misstänk Grad C, systemsjukdom eller aggressiv parodontit.",
        severity: "critical",
      },
      {
        id: "parod-2",
        title: "Atypisk blödning / nekros",
        description:
          "Vid atypiskt kraftig blödning eller nekros — överväg bakomliggande blodsjukdom (leukemi). Remiss för utredning.",
        severity: "critical",
      },
      {
        id: "parod-3",
        title: "Abscessbildning",
        description:
          "Akut parodontal abscess → dränage. Antibiotika endast vid feber/allmänpåverkan. Se scenario Parodontal Abscess.",
        severity: "warning",
      },
    ],
  },

  perikoronit: {
    id: "VARK-05-PERI",
    slug: "perikoronit",
    title: "Perikoronit",
    icdCode: "K05.22 (Akut perikoronit)",
    patientUtsaga:
      "Ont längst bak i käken / svårt att gapa / svullet tandkött över tanden",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtomprofil",
        text: "Smärta, rodnad, svullnad i operculum runt delvis frambruten tand (oftast UK). Dålig smak/lukt. Eventuellt trismus.",
      },
      {
        label: "Diagnos ICD-10 (JUSTERAT)",
        text: "K05.22 (Akut perikoronit). OBS: Det saknas en separat ICD-10-kod för ”kronisk perikoronit” — K05.3 avser kronisk parodontit och ska ej användas för perikoronit.",
      },
      {
        label: "Prevalens",
        text: "Vanligt hos unga vuxna (20–25 år).",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "Har du svårt att gapa?",
          a: "Trismus indikerar spridning mot tuggmuskulatur — varningssignal.",
        },
        {
          q: "Har du svårt att svälja (dysfagi)?",
          a: "Allvarligt tecken på spridning mot svalget.",
        },
        { q: "Har du feber?", a: "Indikerar systemisk påverkan." },
        {
          q: "Känns det som att du biter på tandköttet?",
          a: "Indikerar antagonisttrauma.",
        },
        {
          q: "Har du haft besvär här tidigare?",
          a: "Indikation för extraktion i lugnt skede.",
        },
        {
          q: "Smakar det illa i munnen?",
          a: "Pus/varbildning.",
        },
      ],
      kompletterande: [],
    },

    status: {
      inspektion: [
        "Operculum: rött, svullet tandkött över tanden?",
        "Antagonist: biter ÖK-tand ner i det svullna tandköttet? (traumatisk ocklusion)",
        "Pus: varbildning vid tryck på fliken?",
        "Svullnad: ansiktsasymmetri eller svullnad vid käkvinkeln?",
        "Gapförmåga: mät i mm. Normalt >35–40 mm. Röd flagga: kraftigt nedsatt gapförmåga (<20 mm).",
      ],
    },

    diagnostik: {
      kriterier:
        "Radiologi (apikal/OPG): bedöm tandens läge (vertikal, mesioangulär, horisontell), om plats finns för eruption (oftast inte vid perikoronit), benkanten distalt om 7:an samt relation till mandibularkanalen.",
      rtg: [
        "Tandens läge: vertikal, mesioangulär eller horisontell",
        "Finns plats för eruption? (oftast inte vid perikoronit)",
        "Benkanten distalt om 7:an",
        "Relation till mandibularkanalen",
      ],
      uteslut: [
        "Karies/pulpit: uteslut smärta från djupt hål i 8:an eller 7:an",
        "Fullt erupterad tand: om helt framme är det ej perikoronit",
      ],
    },

    behandling: {
      varning:
        "Antibiotika ska inte ges rutinmässigt utan enbart vid tecken på spridning (feber, trismus, svullna lymfkörtlar, svullnad mot svalget). Extraktion av visdomstand i akut skede rekommenderas EJ av allmäntandläkare (risk för spridning och anestesisvårigheter).",
      alternativ: [
        {
          title: "Alt A: Akut rengöring & spolning (standard)",
          koder: "103, 301",
          metod: [
            "Anestesi: ofta nödvändigt (Xylocain/Citanest)",
            "Rengöring: lyft försiktigt på operculum",
            "Spolning: rikligt med NaCl eller 3 % väteperoxid",
            "Instruktion: skölj med klorhexidin 0,1–0,2 % i 5–7 dagar",
          ],
        },
        {
          title: "Alt B: Extraktion av antagonist (överkäkstand)",
          indikation: "ÖK-tand biter på infekterat område.",
          koder: "401",
          metod: ["Extrahera ÖK-tanden för omedelbar avlastning"],
        },
        {
          title: "Alt C: Extraktion av visdomstand (akut skede)",
          koder: "401",
          metod: [
            "Varning: rekommenderas ej av allmäntandläkare vid akut infektion (risk för spridning och anestesisvårigheter)",
            "Planering: görs i lugnt/kallt skede (2–6 veckor efter akut episod)",
          ],
          specialist: true,
        },
        {
          title: "Alt D: Operkulektomi/gingivektomi (icke-rekommenderat)",
          metod: [
            "Görs sällan då vävnaden ofta växer tillbaka (recidiv). Ej standardbehandling vid perikoronit.",
          ],
        },
      ],
      antibiotika:
        "Analgetika: NSAID (Ibuprofen 400 mg) + Paracetamol (1 g).\n" +
        "Antibiotika ej indicerat: vid enbart lokal smärta och svullnad.\n" +
        "Indicerat vid: feber, allmänpåverkan, trismus eller spridning (svullna ömma lymfkörtlar, svullnad mot svalget).\n" +
        "Förstahandsval: PcV 1,6 g × 3 i 5–7 dagar.\n" +
        "Vid penicillinallergi: Klindamycin 600 mg × 3 i 5–7 dagar (VGR-riktlinje). OBS: regionala riktlinjer varierar — verifiera alltid mot aktuell regional riktlinje [JUSTERAT].\n" +
        "Vid terapisvikt: tillägg av Metronidazol 400 mg × 3. OBS: alkohol strikt kontraindicerat under och 48 h efter avslutad behandling med Metronidazol (disulfiramliknande reaktion — illamående, kräkningar, takykardi). Källa: FASS.",
    },

    uppfoljning: {
      text: "Huvudregel: undvik extraktion under akut infektion (spridningsrisk). Extraktion i kallt skede: när symtomfri i 2–6 veckor. Indikationer för extraktion: återkommande episoder (ingen fastställd frekvens i svenska riktlinjer) [JUSTERAT], karies (8:an el. distalt 7:an), parodontal benförlust, cystor (>1 cm) eller resorption.",
    },

    journal: [
      {
        titel: "Mall: Akut perikoronit",
        text: `Diagnos: Akut perikoronit tand 38 (K05.22). Orsak: Partiell eruption, trauma från 28.
Status: Svullnad/rodnad operculum 38. Pus vid palpation. Gapförmåga 30 mm. Ingen feber. 28 biter på operculum.
Behandling: Infiltrationsanestesi. Riklig spolning NaCl + väteperoxid. Mekanisk rengöring. Extraktion 28.
Info: Sköljning Klorhexidin. Extraktion 38 planeras i kallt skede. Analgetika rek. Avstår antibiotika pga saknad systemisk påverkan.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Karies / pulpit (8:an eller 7:an)",
        kod: "K04.0",
        skillnad: "Smärta från djupt hål i tanden — ej operculuminflammation.",
      },
      {
        namn: "Fullt erupterad tand",
        kod: "-",
        skillnad: "Om tanden är helt framme är det per definition ej perikoronit.",
      },
    ],

    kliniskaAnteckningar:
      "ICD-10: K05.22 = akut perikoronit. Det finns INGEN separat ICD-10-kod för ”kronisk perikoronit” — K05.3 (kronisk parodontit) ska ej användas för perikoronit [JUSTERAT]. PcV 1,6 g × 3 i 5–7 dagar; Pc-allergi Klindamycin 600 mg × 3 i 5–7 dagar (VGR — verifiera regionalt) [JUSTERAT]. Mät gapförmåga i mm. Trismus <20 mm = akut remiss käkkirurg. Debiteringskoder (TLV — verifiera mot kusp.tlv.se): 3043 tillståndskod perikoronit, 103 akut undersökning, 301 sjukdomsbehandling mindre, 401 tandextraktion (antagonist), 121 röntgen.",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/Infografik perikoronit.png",
      alt: "Infografik: perikoronit — operculuminflammation kring delvis erupterad visdomstand, varningstecken och handläggning.",
      title: "Perikoronit",
      caption: "Operculum 38/48 — spolning först, trismus <20mm = remiss akut.",
    },

    redFlags: [
      {
        id: "peri-1",
        title: "Trismus — gapförmåga <20 mm",
        description:
          "Allvarlig spridning mot tuggmuskulatur. Akut remiss till käkkirurg/sjukhus.",
        severity: "critical",
      },
      {
        id: "peri-2",
        title: "Dysfagi / Ludwig's angina / dyspné",
        description:
          "Sväljningssvårigheter, bilateral munbottensvullnad (livshotande) eller andningssvårigheter/stridor → akut remiss sjukhus.",
        severity: "critical",
      },
      {
        id: "peri-3",
        title: "Extraoral svullnad / talpåverkan",
        description:
          "Synlig svullnad utanpå kinden eller ner mot halsen, ”grötigt tal” → akut remiss käkkirurg/sjukhus.",
        severity: "critical",
      },
      {
        id: "peri-4",
        title: "Feber >38°C + sjukdomskänsla",
        description:
          "Systemisk påverkan → antibiotika + remiss käkkirurg.",
        severity: "warning",
      },
    ],
  },

  "parodontal-abscess": {
    id: "VARK-12-PARAB",
    slug: "parodontal-abscess",
    title: "Parodontal Abscess",
    icdCode:
      "K05.20 (Parodontal abscess utan fistelgång) / K05.21 (med fistelgång)",
    patientUtsaga:
      "Det bultar i tandköttet, tanden känns lös/hög och det smakar illa",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtomprofil",
        text: "Lokaliserad svullnad i tandköttet (ofta lateralt längs roten), molande smärta, ömhet vid beröring, tanden kan kännas ”för lång” eller rörlig. Ofta pus vid sondering/tryck.",
      },
      {
        label: "Diagnos ICD-10 (JUSTERAT)",
        text: "K05.20 (parodontal abscess utan fistelgång) eller K05.21 (med fistelgång). OBS: K05.22 = perikoronit (separat subkod). Använd K05.20/K05.21 för parodontal abscess.",
      },
      {
        label: "Prevalens",
        text: "Vanlig orsak till akutbesök (7–14 %), särskilt hos patienter med obehandlad parodontit eller efter parodontal behandling där fickmynningen läkt ihop för tidigt.",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "Har tanden lagats djupt eller rotfyllts nyligen?",
          a: "Talar mer för endodontiskt ursprung (apikal abscess).",
        },
        {
          q: "Har du tandlossning sedan tidigare?",
          a: "Stark riskfaktor — 60 % av abscesser sker hos obehandlade parodpatienter.",
        },
        {
          q: "Har något fastnat mellan tänderna?",
          a: "T.ex. popcornskal, fiskben — ”foreign body abscess”.",
        },
        {
          q: "Känns tanden ”hög” eller lös?",
          a: "Vanligt vid abscess då ödem lyfter tanden.",
        },
        {
          q: "Smakar det illa i munnen?",
          a: "Pus-tömning, dålig andedräkt.",
        },
        {
          q: "Har du feber (>38°C) eller känner dig sjuk?",
          a: "Indikation för antibiotika.",
        },
      ],
      kompletterande: [],
    },

    status: {
      inspektion: [
        "Svullnad: ofta lokaliserad mer coronalt/lateralt på tandköttet jämfört med apikala abscesser.",
        "Pus: kommer det var ur fickan vid tryck på svullnaden?",
        "Sondering: en djup, smal ficka (>6 mm) mot abscessen bekräftar diagnosen. Känn efter främmande kropp (t.ex. popcornskal).",
        "Röntgen: bennivå visar oftast marginal benförlust (vertikal/angulär defekt). Uteslut rotfraktur eller periapikal destruktion (tyder på endo-orsak).",
      ],
      sensibilitet:
        "Avgörande steg. Testa vitalitet med kyla/el. Positivt svar (tanden lever) indikerar parodontal abscess. Negativt svar (tanden död) indikerar sannolikt apikal abscess (endo) eller kombinerad endo-parodontal lesion.",
    },

    diagnostik: {
      kriterier:
        "Syftet är att differentiera från endodontisk (apikal) abscess och etablera dränage. Alternativ A: lokaliserad abscess, blockering av fickmynning eller främmande kropp, vital tand. Alternativ B: abscess med systemisk påverkan — feber (>38°C), lymfadenit, utbredd svullnad. Alternativ C: endo-parodontal lesion — djup ficka till apex + negativ vitalitet.",
      rtg: [
        "Bennivå: oftast marginal benförlust (vertikal/angulär defekt)",
        "Roten: uteslut rotfraktur eller periapikal destruktion (tyder på endo-orsak)",
      ],
      uteslut: [
        "Negativ vitalitet + periapikal destruktion → apikal abscess (endo), ej parodontal",
        "Djup ficka till apex + negativ vitalitet → endo-parodontal lesion (kombinerad)",
        "Terapisvikt inom 48 h → ompröva: rotfraktur? cysta? malignitet?",
      ],
    },

    behandling: {
      varning:
        "Enbart systemisk antibiotika är ”Icke-göra” om dränage är möjligt. Undvik aggressiv djupscaling i det akuta skedet.",
      alternativ: [
        {
          title: "Alternativ A: Parodontal abscess (lokaliserad)",
          koder: "103, 301",
          metod: [
            "Dränage (Prio 1): dränera via tandköttsfickan med sond/kyrett. Om fluktuerande och ej tömmer sig via fickan: lägg snitt (incision) i svullnaden.",
            "Rengöring: avlägsna försiktigt tandsten eller främmande kropp i fickmynningen. Undvik aggressiv djupscaling akut.",
            "Spolning: spola fickan rikligt med fysiologisk koksalt eller 3 % väteperoxid.",
            "Ocklusal justering: om tanden känns hög och smärtar vid bitning, slipa ur ocklusion.",
            "Antibiotika: EJ indicerat vid enbart lokal svullnad/smärta.",
          ],
        },
        {
          title: "Alternativ B: Systemisk påverkan",
          indikation: "Feber (>38°C), lymfadenit, utbredd svullnad.",
          koder: "301, 404",
          metod: [
            "Dränage & rengöring enligt Alternativ A",
            "Antibiotika (tillägg) — se Antibiotikastöd",
          ],
        },
        {
          title: "Alternativ C: Endo-parodontal lesion",
          indikation: "Djup ficka till apex + negativ vitalitet.",
          metod: [
            "Kräver både endodontisk behandling (rensning) och parodontal behandling. Endodontin prioriteras ofta först.",
          ],
        },
      ],
      antibiotika:
        "Antibiotika ges som TILLÄGG till dränage vid systemisk påverkan — aldrig istället för dränage.\n" +
        "Förstahandsval: PcV 1,6 g × 3 i 5–7 dagar.\n" +
        "Vid penicillinallergi: Klindamycin 600 mg × 3 i 5–7 dagar (VGR-riktlinje). Verifiera mot aktuell regional riktlinje [JUSTERAT].\n" +
        "Vid terapisvikt: Metronidazol 400 mg × 3. Alkohol strikt kontraindicerat under och 48 h efter avslutad behandling (disulfiramliknande reaktion). Källa: FASS.\n" +
        "Dränage + antibiotika vid systemisk påverkan: Prio 2 (Hög). Enbart systemisk antibiotika: ”Icke-göra” om dränage är möjligt.",
    },

    uppfoljning: {
      text: "Kort sikt: återbesök efter 3–5 dagar för att kontrollera att svullnaden lagt sig. Lång sikt: parodontal sanering av tanden när akutfasen lagt sig. Prognos: en tand med upprepade abscesser har tveksam prognos; extraktion kan behöva övervägas.",
    },

    journal: [
      {
        titel: "Mall: Akut parodontal abscess",
        text: `Diagnos: K05.20 Akut parodontal abscess utan fistelgång, tand [XX]. (JUSTERAT från K05.2)
Anamnes: Söker för svullnad och värk tand [XX] sedan 2 dagar. Tanden känns hög. Ingen feber.
Status:
- Sensibilitet: Positiv (vital).
- Svullnad: Lokal fluktuerande svullnad buckalt, pus tömmer sig vid sondering.
- Fickdjup: 8 mm ficka buckalt.
Röntgen: Marginal benförlust ca 50 %. Ingen apikal destruktion.
Behandling: Dränage via fickan med kyrett. Spolning med koksalt. Lätt ocklusal justering.
Info: Rekommenderar Alvedon/Ibuprofen. Återbesök för uppföljning om 1 vecka.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Apikal abscess (endodontisk)",
        kod: "K04.7",
        skillnad:
          "Negativ vitalitet, periapikal destruktion, smärta apikalt — ej lateralt.",
      },
      {
        namn: "Endo-parodontal lesion",
        kod: "-",
        skillnad: "Djup ficka till apex + negativ vitalitet (kombinerad orsak).",
      },
      {
        namn: "Rotfraktur / cysta / malignitet",
        kod: "-",
        skillnad:
          "Övervägs vid terapisvikt (ingen förbättring inom 48 h trots behandling).",
      },
    ],

    kliniskaAnteckningar:
      "ICD-10: K05.20 utan fistelgång / K05.21 med fistelgång. K05.22 = perikoronit (separat subkod) — vanligt kodningsfel, använd ej för abscess [JUSTERAT]. Sensibilitetstest är avgörande för att skilja från apikal abscess (endo). Antibiotika är TILLÄGG till dränage, aldrig substitut. Debiteringskoder (TLV — verifiera mot kusp.tlv.se): 103 akut undersökning, 301 sjukdomsbehandling (dränage via ficka, spolning), 404 incision av abscess (om kirurgiskt snitt krävs).",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/infografik parodontit.png",
      alt: "Infografik: parodontal abscess — lokaliserad pusansamling, differentiering mot apikal abscess och dränage.",
      title: "Parodontal abscess",
      caption: "Vital tand + lateral ficka → dränage. Negativ vitalitet → endo.",
    },

    redFlags: [
      {
        id: "parab-1",
        title: "Spridning mot munbotten/hals",
        description:
          "Svullnad som sprider sig mot munbotten (risk för andningsvägar) eller hals → akutremiss/sjukhus.",
        severity: "critical",
      },
      {
        id: "parab-2",
        title: "Trismus",
        description:
          "Svårigheter att gapa tyder på spridning till muskelloger → antibiotika och ev. remiss.",
        severity: "critical",
      },
      {
        id: "parab-3",
        title: "Terapisvikt inom 48 h",
        description:
          "Ingen förbättring trots behandling → ompröva diagnos (rotfraktur? cysta? malignitet?).",
        severity: "warning",
      },
    ],
  },

  "anug-herpes": {
    id: "VARK-11-GING",
    slug: "anug-herpes",
    title: "ANUG / Herpes",
    icdCode:
      "A69.1 (ANUG / nekrotiserande gingivit), B00.2 (Herpetisk gingivostomatit)",
    patientUtsaga: "Det svider, blöder och luktar illa i munnen",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtomprofil",
        text: "Intensiv ytlig smärta i tandköttet, spontan blödning eller blödning vid minsta beröring, dålig andedräkt (foetor ex ore).",
      },
      {
        label: "Huvuddiagnoser",
        text: "A69.1 (ANUG/NG), B00.2 (Herpetisk gingivostomatit).",
      },
      {
        label: "Prevalens",
        text: "NG är sällsynt (ca 0,001–0,01 %) men vanligare hos rökare och stressade unga vuxna. Herpes är vanligt hos barn och unga vuxna.",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "Blöder tandköttet spontant (utan att du borstar)?",
          a: "Ja: starkt tecken på nekrotiserande gingivit.",
        },
        {
          q: "Har du blåsor eller sår i munnen?",
          a: "Ja, blåsor: tyder på herpes eller annan virusinfektion. Nej, ”gropar” mellan tänderna: tyder på NG (utstansade papiller).",
        },
        {
          q: "Känner du en metallisk eller dålig smak/lukt?",
          a: "Foetor ex ore — karakteristiskt vid NG.",
        },
      ],
      kompletterande: [],
      riskfaktorer: [
        "Rökning (stark riskfaktor för NG)",
        "Stress / sömnbrist",
        "Feber eller sjukdomskänsla (allmänpåverkan)",
      ],
    },

    status: {
      inspektion: [
        "Papiller: är de ”utstansade” (toppen borta, kraterformade)? Täcks de av en gråvit hinna (pseudomembran)? → NG.",
        "Slemhinna: spridda blåsor eller sår på både fast och rörlig slemhinna? → herpes (engagemang av fast slemhinna är diagnostiskt viktigt).",
        "Blödning: blöder det vid lätt beröring/sondering?",
      ],
      palpation:
        "Lymfkörtlar: lymfadenit (svullnad) submandibulärt/hals är vanligt vid både NG och primär herpes. Feber: mät temp vid allmänpåverkan (>38°C är indikation för systemisk behandling).",
    },

    diagnostik: {
      kriterier:
        "Nekrotiserande gingivit (NG): bakteriell opportunistisk infektion (spiroketer, fusobakterier, Prevotella intermedia), stress/rökning, utstansade papiller + foetor ex ore. Herpetisk gingivostomatit: virus (HSV-1), blåsor/sår på fast OCH rörlig slemhinna (engagemang av fast slemhinna skiljer herpes från afte), vanligast hos barn/unga.",
      uteslut: [
        "Blåsor/sår endast på rörlig slemhinna utan engagemang av fast slemhinna → talar emot primär herpes (jfr afte)",
        "Ingen läkning trots behandling → misstänk systemsjukdom (leukemi, HIV) eller malignitet",
      ],
    },

    behandling: {
      varning:
        "Antibiotika vid herpetisk gingivostomatit är ”Icke-göra” (det är ett virus). Vid NG ges antibiotika endast vid feber/lymfadenit.",
      alternativ: [
        {
          title: "Alternativ A: Nekrotiserande gingivit (NG)",
          koder: "103, 301",
          metod: [
            "Akut rengöring (Prio 1): vävnaden är extremt öm — ytbedövning (Xylocain gel) krävs",
            "Debridering: avlägsna nekros, plack och den gråvita hinnan (pseudomembran) varsamt med ultraljud/handinstrument",
            "Kemisk rengöring: spola med väteperoxid 3 % (syresätter, hämmar anaerober) eller klorhexidin",
            "Hemvård: klorhexidin 0,12–0,2 % 2 ggr/dag i 10–14 dagar, mjuk tandborste",
          ],
        },
        {
          title: "Alternativ B: Herpetisk gingivostomatit",
          koder: "311/312",
          metod: [
            "Symtomatisk behandling: läker ut spontant på 10–14 dagar",
            "Smärtlindring: lidokain gel eller bensydamin (Andolex) för att underlätta intag av vätska/mat",
            "Hydrering: kritiskt (särskilt barn)",
            "Antibiotika: ”Icke-göra” (det är ett virus)",
            "Antiviraler (Aciklovir/Valaciklovir): indicerat vid immunosuppression, men kan även övervägas vid svår primär infektion hos vuxna om insatt tidigt (inom 72 timmar). Handläggning via läkare [JUSTERAT]",
          ],
        },
      ],
      antibiotika:
        "ANUG/NG — antibiotika endast vid feber/lymfadenit.\n" +
        "Förstahandsval: Metronidazol (Flagyl) 400 mg × 3 i 5–7 dagar (bäst täckning mot anaerober) [JUSTERAT].\n" +
        "OBS: PcV har sämre täckning mot anaerober vid NG och är inte förstahandsalternativ — väljs vid kontraindikation mot metronidazol.\n" +
        "Alkohol strikt kontraindicerat under och 48 h efter avslutad behandling med Metronidazol (disulfiramliknande reaktion). Aldrig till gravid trimester 1 utan läkarordination. Källa: FASS.\n" +
        "Nationella riktlinjer: infektionskontroll vid NG Prio 2 (god effekt på smärta/läkning). Systemisk antibiotika vid parodontal sjukdom generellt Prio 10, men vid NG med allmänpåverkan motiverat.",
    },

    uppfoljning: {
      text: "NG: återbesök efter 2–5 dagar — ny rengöring behövs ofta, kontrollera läkning. Senare: fullständig parodontal sanering när akutfasen lagt sig. Herpes: vid behov, annars exspektans.",
    },

    journal: [
      {
        titel: "Mall: ANUG / Herpes",
        text: `Diagnos: K05.10 Akut nekrotiserande ulcerös gingivit (alt. B00.2 Herpes).
Anamnes: Söker akut för smärta i tandköttet och spontanblödning sedan 3 dagar. Röker 10 cig/dag. Ingen feber.
Status:
- Gingiva: Generellt rodnad. Nekrotiska papiller (utstansade) i regio 33-43. Pseudomembran synligt.
- Lukt: Tydlig foetor ex ore.
- Lymfkörtlar: Palpöm submandibulärt.
Behandling: Ytbedövning Xylocain gel. Varsam depuration av nekroser med ultraljud och H2O2-spolning.
Ordination: Klorhexidin 0,12% 2 ggr/dag i 10 dagar.
Plan: Återbesök om 3 dagar för kontroll. Rökstopp rekommenderas starkt.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Nekrotiserande gingivit (NG)",
        kod: "A69.1",
        skillnad:
          "Bakteriell. Utstansade papiller + pseudomembran + foetor ex ore. Stress/rökning.",
      },
      {
        namn: "Herpetisk gingivostomatit",
        kod: "B00.2",
        skillnad:
          "Virus (HSV-1). Blåsor/sår på fast OCH rörlig slemhinna. Vanligast barn/unga.",
      },
      {
        namn: "Afte",
        kod: "K12.0",
        skillnad:
          "Sår endast på rörlig slemhinna (ej fast slemhinna) — skiljer afte från herpes.",
      },
    ],

    kliniskaAnteckningar:
      "ANUG/NG förstahandsantibiotika = Metronidazol 400 mg × 3 i 5–7 dagar (bäst anaerob täckning); PcV har sämre täckning vid NG och är ej förstahandsval [JUSTERAT]. Alkohol kontraindicerat under + 48 h efter Metronidazol; aldrig gravid trimester 1 utan läkarordination (FASS). Aciklovir/Valaciklovir vid herpes: immunosuppression, eller svår primär infektion hos vuxna <72 h — via läkare [JUSTERAT]. Engagemang av fast slemhinna skiljer herpes från afte. Debiteringskoder (TLV — verifiera mot kusp.tlv.se): 103 kompletterande/akut undersökning, 301 sjukdomsbehandling mindre (rengöring/debridering), 311/312 information/instruktion.",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/infografik ANUG.png",
      alt: "Infografik: ANUG — papillnekros, pseudomembran och fetor; differentiering mot herpes.",
      title: "ANUG / Herpes",
      caption: "NG: utstansade papiller + fetor. Herpes: blåsor, fast slemhinna.",
    },

    redFlags: [
      {
        id: "ng-1",
        title: "Ingen läkning trots behandling",
        description:
          "Om sår/nekroser ej läker trots behandling → misstänk bakomliggande systemsjukdom (leukemi, HIV) eller malignitet. Remiss krävs.",
        severity: "critical",
      },
      {
        id: "ng-2",
        title: "Noma (cancrum oris)",
        description:
          "Mycket sällsynt. Om nekros sprider sig i mjukvävnad/kind hos immunsupprimerade → akutremiss sjukhus.",
        severity: "critical",
      },
      {
        id: "ng-3",
        title: "Dehydrering (barn)",
        description:
          "Om barnet ej dricker pga smärta → remiss barnmedicin.",
        severity: "warning",
      },
    ],
  },

  periimplantit: {
    id: "VARK-13-IMPL",
    slug: "periimplantit",
    title: "Periimplantit",
    icdCode: "K05.6 (Periimplantit / periimplantär mukosit)",
    patientUtsaga: "Det blöder och varar runt implantatet",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtomprofil",
        text: "Blödning vid borstning/sondering (BoP), rodnad, svullnad och ibland varbildning (pus) runt ett tandimplantat. Smärta är ovanligt i tidiga skeden men kan förekomma vid akut abscessbildning.",
      },
      {
        label: "Huvuddiagnoser",
        text: "Periimplantär mukosit (inflammation utan benförlust), periimplantit (inflammation med benförlust).",
      },
      {
        label: "Prevalens",
        text: "Mukosit drabbar ca 40–50 % av patienter med implantat. Periimplantit drabbar ca 15–20 %.",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "Blöder det eller kommer det var?",
          a: "Pus är vanligare vid periimplantit än vid parodontit.",
        },
        {
          q: "Känns implantatet löst?",
          a: "Nej: normalt vid både mukosit och periimplantit. Ja: alarmerande — totalförlust av osseointegrering eller teknisk komplikation (lossnad skruv).",
        },
        {
          q: "Har du haft tandlossning tidigare?",
          a: "Patienter med parodontithistorik har högre risk för periimplantit.",
        },
      ],
      kompletterande: [],
      riskfaktorer: ["Rökning (stark riskfaktor för benförlust)"],
    },

    status: {
      inspektion: [
        "Mjukvävnad: rodnad, svullnad?",
        "Pus: tryck på vävnaden — tömmer sig var?",
        "Suprakonstruktion: sitter kronan/bron fast? Går det att göra rent? (dålig utformning är en riskfaktor)",
        "Röntgen: jämför aktuell bild med referensbild (helst 1-årskontroll eller installation). Ingen benförlust → periimplantär mukosit. Benförlust >2 mm jämfört med referensbild → periimplantit (EFP/AAP 2017-konsensus) [JUSTERAT].",
      ],
      palpation:
        "Sondering (avgörande): mät runt hela implantatet (4–6 ytor) med plastsond (ej metallsond — kan repa titanytan och skapa retention för plack). Lätt tryck (0,25 N). Obs: sonden går ofta djupare vid implantat än vid tänder även vid hälsa. Notera BoP och var (pus).",
    },

    diagnostik: {
      kriterier:
        "Skillnad mukosit vs periimplantit — Benförlust: mukosit ingen (endast mjukvävnad), periimplantit ja >2 mm (progressiv). BoP: obligatoriskt fynd vid båda. Pus: mindre vanligt vid mukosit, vanligt vid periimplantit (aktiv lesion). Fickdjup (PPD): mukosit normalt/pseudofickor, periimplantit ofta ≥6 mm. Reversibilitet: mukosit läker ut vid behandling, periimplantit nej (kräver ofta kirurgi). Mobilitet: nej vid båda (endast i slutstadiet av periimplantit).",
      rtg: [
        "Jämför aktuell bild med referensbild (1-årskontroll eller installation)",
        "Ingen benförlust: periimplantär mukosit",
        "Benförlust >2 mm jämfört med referensbild: periimplantit (EFP/AAP 2017-konsensus) [JUSTERAT]",
      ],
      uteslut: [
        "Ingen benförlust på röntgen → periimplantär mukosit (reversibel), ej periimplantit",
        "Rörligt implantat → förlorad osseointegrering — kan ej räddas, måste explanteras",
        "Lossad distans/skruv → teknisk komplikation, verifiera torque mot tillverkarens IFU",
      ],
    },

    behandling: {
      varning:
        "Antiseptisk spolning som enda behandling har låg prioritet — är ett komplement, ej primär behandling. Verifiera ALLTID korrekt åtdragningsmoment (torque) mot tillverkarens IFU — torque-toleransen varierar per implantatsystem/fabrikat.",
      alternativ: [
        {
          title: "Alternativ A: Akut periimplantit (infektion/pus)",
          indikation: "Mål: minska bakteriebördan och häva akut inflammation.",
          koder: "103, 301, 341/342",
          metod: [
            "Mekanisk rengöring: rengör ytan med titan-, kolfiber- eller plastinstrument. Icke-kirurgisk behandling har begränsad effekt vid djup periimplantit men behövs i akutskedet.",
            "Spolning: spola fickan med NaCl eller väteperoxid 3 % (komplement, ej primär behandling)",
            "Uppföljning: om inflammation kvarstår krävs kirurgi (lambå). Vid lämplig defektmorfologi (kontainerande benförlust) kan GBR (Guided Bone Regeneration) övervägas i samband med lambåkirurgi. Källa: EFP/AAP 2018-konsensus.",
          ],
        },
        {
          title: "Alternativ B: Mukosit (inflammation utan benförlust)",
          indikation: "Mål: återställa hälsan genom plackkontroll.",
          koder: "301",
          metod: [
            "Munhygien (Prio 1): patientens egenvård är avgörande — anpassa mellanrumsborstar",
            "Professionell rengöring: avlägsna plack, tandsten och cementöverskott",
            "Farmaka: klorhexidin kortvarigt (sköljning/gel) — komplement, ej primär behandling",
          ],
        },
      ],
      antibiotika:
        "Indikation för antibiotika: systemisk påverkan (feber, sjukdomskänsla); spridning (svullnad mot munbotten/hals); inför kirurgi om pus föreligger.\n" +
        "”Icke-göra” (ej indicerat): mukosit (endast lokal rengöring krävs); lokal periimplantit utan allmänpåverkan.",
    },

    uppfoljning: {
      text: "Om utläkning ej sker efter akutbehandling krävs kirurgisk åtgärd (lambå, ev. GBR vid lämplig defekt). Återbesök ca 2 veckor. Anteckna implantatets fabrikat och installationsår vid första besöket.",
    },

    journal: [
      {
        titel: "Mall: Periimplantit / mukosit",
        text: `Diagnos: K05.6 Periimplantit vid implantat [XX]. (OBS: K05.1 avser kronisk gingivit — ej specifikt för mukosit)
Alt. för periimplantär mukosit: Använd K05.6 eller regionalt vedertagen kod.
Status:
- Mjukvävnad: Rodnad, svullen.
- BoP/Pus: Kraftig blödning och pus vid sondering.
- PPD: [X] mm.
- Mobilitet: Ingen.
- Röntgen: Jmf med bild från [ÅÅ-MM-DD] ses benförlust ca [X] mm.
Åtgärd: Ytbedövning. Mekanisk rengöring med titankyrett/ultraljud. Spolning med väteperoxid och koksalt.
Info: Noggrann instr. med mellanrumsborste. Info om att kirurgisk åtgärd troligen krävs om ej utläkning sker.
Plan: Återbesök 2 veckor.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Periimplantär mukosit",
        kod: "K05.6",
        skillnad:
          "Ingen benförlust (endast mjukvävnad), BoP obligatoriskt, reversibel — läker ut vid behandling.",
      },
      {
        namn: "Periimplantit",
        kod: "K05.6",
        skillnad:
          "Benförlust >2 mm (progressiv), pus vanligt, PPD ofta ≥6 mm, ej reversibel (kräver ofta kirurgi).",
      },
      {
        namn: "Teknisk komplikation (lossad skruv/distans)",
        kod: "-",
        skillnad:
          "Implantatet kan kännas löst utan biologisk infektion — verifiera torque mot tillverkarens IFU.",
      },
    ],

    kliniskaAnteckningar:
      "Diagnostisk tröskel: benförlust >2 mm jämfört med referensbild = periimplantit (EFP/AAP 2017-konsensus) [JUSTERAT]. Sondera med plastsond (ej metall). Rörligt implantat = förlorad osseointegrering, kan ej räddas — explanteras. Cementöverskott är vanlig orsak till akut mukosit efter installation. Verifiera torque mot tillverkarens IFU; anteckna fabrikat + installationsår. Debiteringskoder (TLV — verifiera mot kusp.tlv.se): 103 akut undersökning, 301 sjukdomsbehandling mindre, 341/342 behandling av periimplantit, 429 kirurgiskt avlägsnande av implantat (om mobilt — verifiera kod).",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/infografik periimplantit.png",
      alt: "Infografik: periimplantit vs mukosit — benförlust runt implantat och behandlingsstege.",
      title: "Periimplantit",
      caption: "Mukosit (reversibel) → periimplantit (>2 mm benförlust).",
    },

    redFlags: [
      {
        id: "impl-1",
        title: "Implantatmobilitet",
        description:
          "Om rörligt har osseointegreringen förlorats. Implantatet måste avlägsnas (explanteras) — kan ej räddas.",
        severity: "critical",
      },
      {
        id: "impl-2",
        title: "Snabb benförlust",
        description:
          "Periimplantit progredierar ofta snabbare än parodontit pga saknad bindvävskapsel.",
        severity: "critical",
      },
      {
        id: "impl-3",
        title: "Cementöverskott",
        description:
          "Vanlig orsak till akut mukosit efter installation. Måste avlägsnas fullständigt.",
        severity: "warning",
      },
      {
        id: "impl-4",
        title: "Lossad distans/skruv",
        description:
          "Verifiera ALLTID korrekt torque mot tillverkarens IFU — varierar per system/fabrikat. Felaktigt moment kan ge skruvfraktur eller mikroläckage.",
        severity: "warning",
      },
    ],
  },

  "frammande-kropp": {
    id: "PARO-26-FK",
    slug: "frammande-kropp",
    title: "Gingivit pga Främmande Kropp",
    icdCode: "K05.0 (Akut gingivit) / K05.1 (Kronisk gingivit)",
    patientUtsaga:
      "Det gör ont i tandköttet / Något sitter fast mellan tänderna",
    isAcute: true,
    category: "Parodontologi",
    showBPE: false,

    snabbOversikt: [
      {
        label: "Symtom",
        text: "Lokaliserad inflammation, plötslig debut, smärta vid tuggning/borstning, ofta efter måltid (t.ex. popcorn).",
      },
      {
        label: "Huvuddiagnoser",
        text: "K05.0 (akut gingivit) eller K05.1 (kronisk gingivit).",
      },
      {
        label: "Vanliga föremål",
        text: "Matfibrer (popcorn, kött), tandsticksbitar, flossrester, fyllningsöverskott eller sekvester efter extraktion.",
      },
    ],

    anamnes: {
      obligatoriska: [
        {
          q: "Var exakt gör det ont?",
          a: "Patienten pekar ofta ut ett specifikt mellanrum.",
        },
        {
          q: "Vad åt du innan det började?",
          a: "Ledtrådar: popcorn, majs, segt kött, nötter.",
        },
        {
          q: "Har du petat själv?",
          a: "Varning för avbrutna tandpetare djupt i fickan.",
        },
        {
          q: "Behandling nyligen?",
          a: "Risk för fyllningsöverskott, cementrester eller suturer.",
        },
      ],
      kompletterande: [],
    },

    status: {
      inspektion: [
        "Inspektion & palpation: lokaliserad rodnad och ödem (svullnad). Palpera försiktigt — känns något vasst under slemhinnan?",
        "Sondering (försiktigt!): för sonden i sulcus. Finns motstånd eller hårt objekt? BoP (blödning) är nästan alltid positivt.",
        "Tandtrådstest: går tråden igenom? Revor i tråden tyder på skarpa kanter (överskott/fragment). Kontrollera lukt.",
        "Sensibilitet & perkussion: uteslut endodontiskt ursprung (pulpit/apikal parodontit) vid tveksamhet.",
      ],
    },

    diagnostik: {
      kriterier:
        "Oftast en klinisk diagnos. Röntgen (BW/apikal) krävs främst vid misstanke om subgingival tandsten eller radiopaka fragment (metall/sekvester) samt djupt liggande fyllningsöverskott. Varning: organiska material (popcorn, trä, tråd) syns INTE på röntgen.",
      rtg: [
        "Subgingival tandsten eller radiopaka fragment (metall/sekvester)",
        "Djupt liggande fyllningsöverskott",
        "OBS: organiska material (popcorn, trä, tråd) syns INTE på röntgen",
      ],
      uteslut: [
        "Matimpaktation: ingen främmande kropp kvar, men defekt kontakt (öppet mellanrum) — återkommande efter varje måltid",
        "Parodontal abscess: fluktuerande svullnad, pus, djupa fickor (>6 mm), ev. feber",
        "NUG/ANUG: nekrotiska papiller (kraterformade), pseudomembran, kraftig fetor ex ore",
        "Läkemedelsgingivit: generaliserad hyperplasi (t.ex. Nifedipin), fast konsistens, ej lokaliserad",
      ],
    },

    behandling: {
      varning:
        "Antibiotika endast vid abscess/feber. Vid djupa fragment kan lokalanestesi krävas för varsam mobilisering.",
      alternativ: [
        {
          title: "Avlägsnande",
          metod: [
            "Använd tandtråd (ovaxad), interdentalborste eller pincett",
            "Vid djupa fragment kan LA krävas för varsam mobilisering",
          ],
        },
        {
          title: "Korrektion (iatrogen)",
          metod: [
            "Polera bort fyllningsöverskott med diamant/polerskiva",
            "Vid cementrester — varsam scaling",
          ],
        },
        {
          title: "Eftervård",
          metod: [
            "Spola rent med NaCl eller klorhexidin",
            "Instruera patienten i korrekt ”C-formad” tandtrådsteknik",
          ],
        },
      ],
      antibiotika:
        "Klorhexidin 0,2 % sköljning 2 ggr/dag i 5–7 dagar. Ibuprofen 400 mg vid behov. Antibiotika endast vid abscess/feber.",
    },

    uppfoljning: {
      text: "Information om läkning inom ca 48 h efter att främmande kropp avlägsnats. Återbesök vid utebliven förbättring eller vid tecken på spridning/abscess.",
    },

    journal: [
      {
        titel: "Mall: Gingivit (matfiber / främmande kropp)",
        text: `Diagnos: K05.0 Akut lokaliserad gingivit (FK-orsakad).
Anamnes: Smärta och blödning regio [14-15] sedan igår efter popcornintag.
Status: Papill 14-15 rodnad, ödematös, BOP+. Synlig matfiber interdentalt.
Behandling: FK avlägsnad med tandtråd/pincett. Spolning NaCl.
Ordination: Klorhexidin 0,2 % 10ml x 2 i 5 dagar. Information om läkning 48h.`,
      },
    ],

    diffDiagnoser: [
      {
        namn: "Matimpaktation",
        kod: "-",
        skillnad:
          "Ingen FK kvar, men defekt kontakt (öppet mellanrum). Återkommande efter varje måltid.",
      },
      {
        namn: "Parodontal abscess",
        kod: "K05.20",
        skillnad: "Fluktuerande svullnad, pus, djupa fickor (>6 mm), ev. feber.",
      },
      {
        namn: "NUG / ANUG",
        kod: "A69.1",
        skillnad:
          "Nekrotiska papiller (kraterformade), pseudomembran, kraftig fetor ex ore.",
      },
      {
        namn: "Läkemedelsgingivit",
        kod: "-",
        skillnad:
          "Generaliserad hyperplasi (t.ex. vid Nifedipin). Fast konsistens, ej lokaliserad.",
      },
    ],

    kliniskaAnteckningar:
      "Oftast klinisk diagnos. Organiska främmande kroppar (popcorn, trä, tråd) syns INTE på röntgen — radiologi främst vid radiopaka fragment/fyllningsöverskott. Uteslut endodontiskt ursprung vid tveksamhet (sensibilitet/perkussion). Källor: Socialstyrelsen NR Tandvård 2022, ICD-10-SE, Internetodontologi.",

    infografik: {
      src: "/infografik bilder/infografik parodontala sjukdomar/infografik främmandekropp i gingivan.png",
      alt: "Infografik: gingivit orsakad av främmande kropp (matfiber, popcornskal) i gingivalfickan — diagnostik och handläggning.",
      title: "Främmande kropp i gingivan",
      caption: "Organiskt material syns ej på rtg. Läker ~48 h efter borttagning.",
    },

    redFlags: [
      {
        id: "fk-1",
        title: "Feber >38,5°C",
        description: "Misstänk systemisk spridning eller sepsis.",
        severity: "critical",
      },
      {
        id: "fk-2",
        title: "Extraoral svullnad",
        description: "Risk för abscessspridning i loger.",
        severity: "critical",
      },
      {
        id: "fk-3",
        title: "Dysfagi",
        description: "Svårighet att svälja/andas kräver omedelbar remiss.",
        severity: "critical",
      },
      {
        id: "fk-4",
        title: "Nekros",
        description: "Gråsvarta papiller indikerar nekrotiserande sjukdom.",
        severity: "warning",
      },
    ],
  },
};
