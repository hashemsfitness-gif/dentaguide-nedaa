export type RedFlagSeverity = "critical" | "warning" | "info";

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: RedFlagSeverity;
}

export interface BillingCode {
  code: string;
  description: string;
}

export interface OrtScenario {
  id: string;
  slug: string;
  title: string;
  category: "Akut Ortodonti" | "Interceptiv Ortodonti" | "Retention" | "Karies & Slemhinna";
  patientQuote: string;
  icdCode: string;
  isAcute: boolean;
  priority?: string;
  prevalence?: string;
  ageGroup?: string;
  clinicalIndication?: string;
  
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
    sections: Array<{
      title: string;
      steps: string[];
    }>;
    warning?: string;
    decisionPath?: string;
  };

  journal: string;
  
  redFlags: RedFlag[];
  
  billingCodes: BillingCode[];
  
  kallor: string[];
}

export const ortodontiScenarios: Record<string, OrtScenario> = {
  "los-bracket": {
    id: "ORT-10",
    slug: "los-bracket",
    title: "Lös/lossnad bracket",
    category: "Akut Ortodonti",
    patientQuote: "En metallbit har lossnat från tandställningen",
    icdCode: "Z46.4",
    isAcute: false,
    prevalence: "Mycket vanligt (vanligaste akuta komplikationen). Ca 5-10% av patienter upplever detta under behandling.",
    ageGroup: "Barn/ungdomar med fast apparatur",
    clinicalIndication: "Patient med fast ortodontisk apparatur söker akut p.g.a. att en bracket, ett band eller en ring har lossnat. Kan skava mot kind/läpp/tunga. I sig ej akut — men obehagligt och kan fördröja behandlingen.",
    snabbOversikt: [
      { label: "Symptom", text: "Lös bracket, band eller ring. Skaver, irriterar." },
      { label: "Hantering", text: "Avlägsna helt lösa delar eller vaxa över om de sitter kvar på tråden." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vad har lossnat?", a: "Bracket, band, ring eller ligatur?" },
        { q: "Skaver det? Har du ont?", a: "Bedöm om slemhinneskada föreligger." },
        { q: "Har du svalt eller andats in något?", a: "RÖD FLAGGA om ja! Risk aspiration/ingestion." },
        { q: "Vem utför din ortodontiska behandling?", a: "Kontaktuppgifter till ortodontisten." }
      ],
      kompletterande: ["När lossnade den?", "Är det första gången?"]
    },
    status: {
      inspektion: [
        "Identifiera vilken del som lossnat.",
        "Kontrollera slemhinna för tecken på irritation eller ulceration.",
        "Kontrollera om bracketen hänger på tråden eller är helt lös."
      ]
    },
    behandling: {
      title: "Behandlingsalternativ",
      sections: [
        {
          title: "A. Avlägsna lös bracket",
          steps: [
            "Om bracketen är helt lös: Avlägsna och spara (ge till pat).",
            "Om bracketen hänger på tråden: Låt sitta om den ej skaver, annars vaxa.",
            "Klipp ev. av ligaturtråd om den sticker ut."
          ]
        },
        {
          title: "B. Vaxa över",
          steps: [
            "Applicera ortodontiskt vax på den lösa delen för att fixera temporärt och skydda slemhinnan."
          ]
        },
        {
          title: "C. Hänvisa till ortodontist",
          steps: [
            "Patienten kontaktar sin ordinarie ortodontist nästa vardag för återmontering."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Lös bracket tand [nr]. Slemhinna u.a.\nÅtgärd: Avlägsnat lös bracket / Vax applicerat. \nHänvisad till ortodontist [namn] för återmontering.",
    redFlags: [
      { id: "ort10-rf1", title: "Aspiration", description: "Andnöd eller hosta -> Omedelbar remiss sjukhus.", severity: "critical" },
      { id: "ort10-rf2", title: "Oönskad tandförflyttning", description: "Vid längre tid utan fixering kan tänderna flytta sig felaktigt.", severity: "warning" }
    ],
    billingCodes: [
      { code: "107", description: "Kompletterande undersökning" },
      { code: "301", description: "Sjukdoms- eller smärtbehandling, mindre omfattande" }
    ],
    kallor: ["Internetodontologi", "Nationella Riktlinjer 2022"]
  },
  "vass-trad": {
    id: "ORT-11",
    slug: "vass-trad",
    title: "Vass/stickig tråd",
    category: "Akut Ortodonti",
    patientQuote: "Metalltråden sticker ut och skär i kinden",
    icdCode: "Z46.4",
    isAcute: true,
    clinicalIndication: "Vass bågände orsakar ulceration och akut smärta. Ofta pga att bågen glidit distalt i fästena.",
    snabbOversikt: [
      { label: "Handling", text: "Klipp av eller böj in tråden. Täck med vax." },
      { label: "Sår", text: "Ofta orsakat av bågände som glidit distalt." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var sticker det?", a: "Ofta längst bak i över- eller underkäken." },
        { q: "När började det?", a: "Ofta efter tuggning av hård kost." },
        { q: "Har du försökt vaxa?", a: "Hjälper det temporärt?" },
        { q: "Har det slutat sticka?", a: "Kan tyda på att bågen glidit vidare eller sår bildats." }
      ],
      kompletterande: ["Finns det ett sår?"]
    },
    status: {
      inspektion: [
        "Utskjutande bågände distalt om sista fästet.",
        "Sår (ulceration) i slemhinnan.",
        "Kontrollera om tråden har glidit åt ena sidan."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Alt 1 — Klippning",
          steps: [
            "Identifiera den vasst utskjutande bågänden distalt.",
            "Håll fast änden med tång/fingrar (aspirationsrisk).",
            "Klipp av med distalkap eller tång.",
            "Tryck tillbaka änden mot tanden med Mathieu-tång.",
            "Kontrollera att inga vassa kanter kvarstår.",
            "Skölj med koksalt. Täck med vax."
          ]
        },
        {
          title: "Alt 2 — Inböjning",
          steps: [
            "Böj tillbaka bågänden mot tandens distala yta med Mathieu-tång.",
            "Täck med vax."
          ]
        },
        {
          title: "Alt 3 — Temporärt skydd",
          steps: [
            "Om klippning/inböjning ej möjligt: applicera vax direkt.",
            "Planera omgående ortodontistkontakt."
          ]
        },
        {
          title: "Sårbehandling",
          steps: [
            "Badda med Klorhexidin 0,12%.",
            "Rekommendera Xylocain gel vid smärta."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Vass bågände distalt [nr]. Ulceration i kinden.\nÅtgärd: Bågände avklippt / inböjd. Vax applicerat.\nPlanering: Kontakta vid utebliven läkning.",
    redFlags: [
      { id: "ort11-rf1", title: "Aspirationsrisk", description: "Viktigt att hålla fast trådänden vid klippning.", severity: "critical" }
    ],
    billingCodes: [
      { code: "107", description: "Kompletterande undersökning" },
      { code: "301", description: "Smärtbehandling" }
    ],
    kallor: ["Internetodontologi"]
  },
  "losnad-retainer": {
    id: "ORT-12",
    slug: "losnad-retainer",
    title: "Lossnad/lös retainer (fast)",
    category: "Retention",
    patientQuote: "Tråden bakom tänderna har lossnat",
    icdCode: "Z46.4",
    isAcute: false,
    clinicalIndication: "Bondad retainer lossnad — risk för recidiv (tänder flyttar sig) inom bara några dagar.",
    snabbOversikt: [
      { label: "Tid", text: "Bör åtgärdas inom 24–48h för att undvika recidiv." },
      { label: "Risk", text: "Delvis lossnad retainer kan bli AKTIV och flytta tänder felaktigt." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När lossnade den?", a: "Tänder kan flytta sig inom dagar." },
        { q: "Skaver den?", a: "Bedöm risk för sår på tungan." },
        { q: "Har tänderna flyttat sig?", a: "Kolla alignment." },
        { q: "Har du en avtagbar retainer (nattskena)?", a: "Ska användas 24/7 nu tills fast retainer är lagad." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: [
        "Lossnad bondingpunkt på retainer.",
        "Kontrollera om tänderna redan flyttat sig.",
        "Kontrollera om tråden är deformerad."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Temporär åtgärd",
          steps: [
            "Om den skaver: Klipp av den lösa delen eller avlägsna hela om den är deformerad.",
            "Informera om att använda nattskena dygnet runt."
          ]
        },
        {
          title: "Definitiv åtgärd",
          steps: [
            "Återlimning kan göras i allmäntandvården om kompetens finns (ets+bond+komposit).",
            "Hänvisa till ortodontist vid osäkerhet."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Bondad retainer lossnad från tand [nr]. Ingen synlig recidiv.\nÅtgärd: Avlägsnat lös del / Återlimmad. Info om snar kontakt med ortodontist.",
    redFlags: [
      { id: "ort12-rf1", title: "Aktiv retainer", description: "En delvis lossnad retainer kan fungera som en fjäder och flytta tänder oönskat. Avlägsna vid osäkerhet.", severity: "warning" }
    ],
    billingCodes: [
      { code: "107", description: "Undersökning" },
      { code: "302", description: "Sjukdomsbehandling" }
    ],
    kallor: ["Socialstyrelsen NR 2022"]
  },
  "apparatbrott": {
    id: "ORT-13",
    slug: "apparatbrott",
    title: "Apparatbrott (avtagbar)",
    category: "Akut Ortodonti",
    patientQuote: "Min plastskena har gått sönder",
    icdCode: "Z46.4",
    isAcute: false,
    clinicalIndication: "Avtagbar retainer (Essix/vakuumpressad skena) trasig, förlorad eller fungerar ej.",
    snabbOversikt: [
      { label: "Handling", text: "Slipa vassa kanter om möjligt, annars nyframställning." },
      { label: "Prio", text: "Ny skena snarast för att undvika recidiv." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Passar skenan fortfarande?", a: "Om ej -> tänderna har redan flyttat sig." }
      ],
      kompletterande: ["Hur gick den sönder?"]
    },
    status: {
      inspektion: [
        "Spricka eller brott i plasten.",
        "Vassa kanter.",
        "Kontrollera passform."
      ]
    },
    behandling: {
      title: "Åtgärder",
      sections: [
        {
          title: "Reparation/Justering",
          steps: [
            "Slipa vassa kanter med akrylborr.",
            "Om skenan är i två delar: Krävs nyframställning."
          ]
        },
        {
          title: "Nyframställning",
          steps: [
            "Ta nya avtryck/scanning för ny skena.",
            "Hänvisa till ortodontist för beställning."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Avtagbar retainer (Essix) sprucken. Passar ej.\nÅtgärd: Slipat vassa kanter. Avtryck tagna för ny skena. \nHänvisad till ortodontist.",
    redFlags: [],
    billingCodes: [
      { code: "107", description: "Undersökning" },
      { code: "301", description: "Justering" }
    ],
    kallor: ["Internetodontologi"]
  },
  "smarta-ortodonti": {
    id: "ORT-13-SYNTH",
    slug: "smarta-ortodonti",
    title: "Smärta vid ortodontisk behandling",
    category: "Akut Ortodonti",
    patientQuote: "Det gör så ont i tänderna efter att de spände tandställningen",
    icdCode: "Z46.4",
    isAcute: false,
    snabbOversikt: [
      { label: "Normalt", text: "Smärta 3–5 dagar efter aktivering är normalt." },
      { label: "Behandling", text: "Analgetika (Paracetamol) vid behov." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När spändes tandställningen senast?", a: "Ska korrelera med tidsaxeln." },
        { q: "Var gör det ont?", a: "Generell ömhet vs lokaliserad smärta." }
      ],
      kompletterande: ["Kan du äta normalt?"]
    },
    status: {
      inspektion: [
        "Ingen rodnad eller svullnad.",
        "Ömhet vid tuggning och perkussion."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Info & Analgetika",
          steps: [
            "Informera om att smärta är normalt.",
            "Rekommendera Paracetamol v.b.",
            "Råd om mjuk kost."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Generell ömhet i tänder efter aktivering för 2 dagar sedan. Ingen svullnad.\nÅtgärd: Info om normalt förlopp. Råd om analgetika givna.",
    redFlags: [
      { id: "ort13s-rf1", title: "Patologisk smärta", description: "Ihållande smärta >1 vecka eller svullnad -> Uteslut pulpit.", severity: "warning" }
    ],
    billingCodes: [
      { code: "103", description: "Akut undersökning" }
    ],
    kallor: ["Klinisk praxis"]
  },
  "sar-apparat": {
    id: "ORT-14",
    slug: "sar-apparat",
    title: "Sår från ortodontisk apparat",
    category: "Karies & Slemhinna",
    patientQuote: "Tandställningen har gjort ett sår i kinden som inte läker",
    icdCode: "S00.5",
    isAcute: false,
    clinicalIndication: "Ulceration, traumatiskt sår eller irritation orsakad av ortodontisk apparatur.",
    snabbOversikt: [
      { label: "Klinik", text: "Traumatiskt sår p.g.a. mekanisk irritation." },
      { label: "3-veckorsregeln", text: "Sår som ej läker på 3 veckor trots åtgärdad orsak -> BIOPSI." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur länge har du haft såret?", a: "Viktigt för 3-veckorsregeln." },
        { q: "Vad i tandställningen är det som skaver?", a: "Identifiera exakt punkt." },
        { q: "Gör det ont när du äter?", a: "Bedöm påverkan på funktion." },
        { q: "Har du haft sår förut?", a: "Uteslut afte." }
      ],
      kompletterande: ["Använder du vax?"]
    },
    status: {
      inspektion: [
        "Ulceration i slemhinnan matchande en del av apparaturen.",
        "Rodnad, ibland fibrinbeläggning."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Steg 1 — Identifiera & åtgärda orsak",
          steps: [
            "Klipp utskjutande tråd eller slipa vass kant på bracket/band.",
            "Applicera vax över apparaten som irriterar."
          ]
        },
        {
          title: "Steg 2 — Skydda slemhinnan",
          steps: [
            "Applicera Xylocain gel lokalt vid smärta.",
            "Kontrollera att vaxet sitter och täcker ordentligt."
          ]
        },
        {
          title: "Steg 3 — Sårbehandling",
          steps: [
            "Badda med Klorhexidin 0,12%.",
            "Instruera patient om daglig sköljning med Klorhexidin 0,12% i 1 vecka."
          ]
        }
      ]
    },
    journal: "Diagnos: Ytlig skada i munhålan.\nStatus: Decubitus ca 5mm i kinden mitt emot bracket tand [nr].\nÅtgärd: Orsak åtgärdad. Vax applicerat. Info om hygien.\nPlanering: Kontroll 1v.",
    redFlags: [
      { id: "ort14-rf1", title: "Malignitetsmisstanke", description: "Icke-läkande sår > 3 veckor trots åtgärd -> Remiss för biopsi.", severity: "critical" }
    ],
    billingCodes: [
      { code: "107", description: "Undersökning" },
      { code: "301", description: "Behandling" }
    ],
    kallor: ["Internetodontologi"]
  },
  "hypersensibilitet-ortodonti": {
    id: "ORT-15",
    slug: "hypersensibilitet-ortodonti",
    title: "Vita fläckar / Karies vid brackets",
    category: "Karies & Slemhinna",
    patientQuote: "Vita fläckar har uppstått runt brackets — är det karies?",
    icdCode: "K02.0",
    isAcute: false,
    prevalence: "Vanligt — white spots uppstår hos ca 50–60 % av patienter med fast apparatur.",
    clinicalIndication: "Fast ortodontisk apparatur försvårar munhygien -> plackackumulation -> snabb demineralisering -> vita fläckar -> ev. manifest karies.",
    snabbOversikt: [
      { label: "White spots", text: "Vita, opaka, kritvita fläckar runt/under bracket-bas." },
      { label: "Fluor", text: "Intensifierad fluorbehandling är grunden." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var ser du fläckarna?", a: "Ofta vid tandhalsarna kring brackets." },
        { q: "Hur sköter du hygienen?", a: "Användning av mellanrumsborstar?" }
      ],
      kompletterande: ["Använder du fluorskölj?"]
    },
    status: {
      inspektion: [
        "White spots: Vita opaka fläckar.",
        "Manifest karies: Mjukt, missfärgat dentin.",
        "Munhygien: Synligt plack, gingivit."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Förebyggande",
          steps: [
            "Intensifierad MHI.",
            "Fluorlack (Duraphat) 2–4 ggr/år.",
            "Daglig fluoridskölj 0,2 % NaF."
          ]
        },
        {
          title: "Behandling av white spots",
          steps: [
            "MI Paste / Tooth Mousse.",
            "Resin infiltration (Icon) efter debonding."
          ]
        },
        {
          title: "Manifest karies",
          steps: [
            "Exkavering + fyllning.",
            "Samråd med ortodontist om ev. debonding."
          ]
        }
      ]
    },
    journal: "Diagnos: Initialkaries (demineralisering).\nStatus: White spots/karies vid bracket [tand nr]. Munhygien bristfällig.\nÅtgärd: MHI. Fluorlackat. Info om daglig fluorskölj.",
    redFlags: [
      { id: "ort15-rf1", title: "Avbrytande av behandling", description: "Vid grav kariesrisk kan ortodontisten behöva avbryta behandlingen.", severity: "warning" }
    ],
    billingCodes: [
      { code: "107", description: "Undersökning" },
      { code: "302", description: "Sjukdomsförebyggande åtgärd" }
    ],
    kallor: ["Lucchese & Gherlone 2013"]
  },
  "retention-problem": {
    id: "ORT-09-SYNTH",
    slug: "retention-problem",
    title: "Retentionsproblem / Recidivrisk",
    category: "Retention",
    patientQuote: "Jag har tappat min nattskena och är rädd att tänderna flyttar sig",
    icdCode: "Z46.4",
    isAcute: false,
    clinicalIndication: "Behov av retention efter ortodontisk behandling för att motverka recidiv pga parodontala fibrer, läpptryck eller käktillväxt.",
    snabbOversikt: [
      { label: "Prio", text: "Bondad retention (Prio 4), Avtagbar (Prio 6)." },
      { label: "Risk", text: "Tänder flyttar sig snabbt utan retention." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur länge har du varit utan retention?", a: "Dagar vs veckor avgör risk." },
        { q: "Upplever du att tänderna flyttat sig?", a: "Subjektiv bedömning av recidiv." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: [
        "Kontrollera alignment.",
        "Kontrollera rotationsändringar.",
        "Kontrollera diastema."
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Åtgärd",
          steps: [
            "Ta avtryck för ny retainer om tänderna ej flyttat sig.",
            "Vid recidiv: Hänvisa till ortodontist."
          ]
        }
      ]
    },
    journal: "Diagnos: Anpassning av ortodontisk apparatur.\nStatus: Patient förlorat retainer. Ingen synlig recidiv.\nÅtgärd: Avtryck för ny retainer.\nPlanering: Utlämning snarast.",
    redFlags: [],
    billingCodes: [
      { code: "107", description: "Undersökning" }
    ],
    kallor: ["Socialstyrelsen NR 2022"]
  },
  "trauma-overbett": {
    id: "ORT-16",
    slug: "trauma-overbett",
    title: "Akut trauma p.g.a. stort överbett",
    category: "Akut Ortodonti",
    patientQuote: "Barnet slog ut framtanden — hade redan stort överbett",
    icdCode: "S02.5",
    isAcute: true,
    prevalence: "Barn med överbett >6 mm har 2–3 gånger ökad risk för framtandstrauma.",
    clinicalIndication: "Barn som söker för akut tandtrauma OCH vid undersökning visar sig ha stort horisontellt överbett (overjet >5–6 mm).",
    snabbOversikt: [
      { label: "Prio", text: "Tidig behandling i växelbettet minskar trauma (Prio 4)." },
      { label: "Viktigt", text: "Behandla traumat först, remittera sen." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur skedde traumat?", a: "Fall, slag, idrott?" },
        { q: "Har barnet slagit i framtänderna förut?", a: "Recidivtrauma vanligt vid överbett." },
        { q: "Har barnet svårt att stänga läpparna?", a: "Ansträngd läppslutning = riskfaktor." },
        { q: "Pågår ortodontisk behandling?", a: "Viktigt för framtida planering." }
      ],
      kompletterande: []
    },
    status: {
      inspektion: [
        "Hantera traumat enligt protokoll (41-48).",
        "Mät horisontellt overjet (mm) — >5 mm = signifikant.",
        "Läppslutning: Ansträngd? Inadekvat?",
        "Bettrelation: Postnormal? Angle klass II?"
      ]
    },
    behandling: {
      title: "Handläggning",
      sections: [
        {
          title: "Steg 1: Traumabehandling",
          steps: [
            "Prioritera akut tandbehandling enligt traumascenario."
          ]
        },
        {
          title: "Steg 2: Identifiering",
          steps: [
            "Dokumentera overjet.",
            "Informera förälder om samband överbett/traumarisk."
          ]
        },
        {
          title: "Steg 3: Remiss",
          steps: [
            "Snar remiss efter att traumat stabiliserats."
          ]
        }
      ],
      decisionPath: "Overjet >5mm + Ansträngd läppslutning -> REMISS (Prio 4)."
    },
    journal: "Diagnos: Tandfraktur/Luxation + Bettavvikelse.\nStatus: Akut trauma tand [nr]. Overjet [X] mm. Ansträngd läppslutning.\nÅtgärd: Traumabehandling utförd. Info om överbett/traumarisk.\nPlanering: Remiss ortodontist efter stabilisering.",
    redFlags: [
      { id: "ort16-rf1", title: "Recidivtrauma", description: "Slagit i framtänderna förut -> Stärkt indikation för remiss.", severity: "warning" },
      { id: "ort16-rf2", title: "Prioritering", description: "Behandla traumat FÖRST. Ortodonti kommer sen.", severity: "info" }
    ],
    billingCodes: [
      { code: "107", description: "Undersökning" }
    ],
    kallor: ["Socialstyrelsen NR 2022", "Cochrane 2013"]
  }
};

export const ortodontiRiktlinjer = {
  title: "Interceptiva Ortodontiska Riktlinjer (Agent 09)",
  sections: [
    {
      id: "eruptionsstorning",
      title: "Eruptionsstörning hörntand (ORT-01)",
      prio: "3",
      icd: "K00.6",
      description: "Retinerad/ektopisk hörntand. 1–3 %. Prio 3.",
      background: "Vanligast hos flickor 10-11 år. Mjölkhörntand sitter fast. Risk för rotresorption på permanenta framtänder.",
      diagnostics: [
        "Palpation 9-10 år: Saknas buckal utbuktning?",
        "Röntgen 10-11 år: Parallaxmetoden (SLOB) obligatorisk om ej palpabel.",
        "Varning: Om tanden ligger buckalt, patienten >14 år eller rotresorption finns -> Remiss!"
      ],
      action: "Extraktion av primär hörntand (03) ger spontankorrigering i 70-90% av fallen om permanenta 3:ans krona ej passerat lateralens mittlinje.",
      followUp: "Klinisk + rtg kontroll efter 6 + 6 månader.",
      journal: "Diagnos: Retinerad tand. Status: Ej palpabel buckalt. Rtg visar palatinalt läge. Inga resorptioner. Åtgärd: Extr av primär 03. Uppföljning 6 mån."
    },
    {
      id: "agenesi-lateraler",
      title: "Agenesi av lateraler (ORT-02)",
      prio: "3",
      icd: "K00.0",
      description: "Medfödd avsaknad av sidoframtänder i ÖK.",
      background: "Prevalens 1.5-2%. Prio 3.",
      diagnostics: [
        "Panorama/Apikalbilder för att bekräfta avsaknad av anlag.",
        "Bedöm bettrelation (neutral/postnormal)."
      ],
      action: "Förstahandsval: Ortodontisk luckslutning (Prio 3). Bättre långtidsresultat och lägre komplikationsrisk än protetik.",
      journal: "Diagnos: Agenesi. Status: Saknar anlag 12/22. Åtgärd: Remiss ortodontist för luckslutning."
    },
    {
      id: "korsbett-barn",
      title: "Korsbett prepubertala (ORT-04)",
      prio: "5",
      icd: "K07.2",
      description: "Unilateralt eller bilateralt korsbett hos barn.",
      background: "Underkäken tvångsförs åt sidan vid sammanbitning. Prio 5.",
      diagnostics: [
        "Bedöm sidoglidning mellan RP och IP.",
        "Bedöm asymmetri i ansiktet."
      ],
      action: "Tidig behandling med ortodontisk apparatur för att undvika asymmetrisk tillväxt.",
      journal: "Diagnos: Bettavvikelse. Status: Unilateralt tvångsförande korsbett höger sida. Åtgärd: Remiss ortodontist."
    },
    {
      id: "overbett-barn",
      title: "Stort överbett (ORT-06)",
      prio: "4",
      icd: "K07.2",
      description: "Postnormalt bett med stor overjet (>6mm).",
      background: "Ökad risk för framtandstrauma. Prio 4.",
      diagnostics: [
        "Mät horisontellt överbett (overjet).",
        "Bedöm läppslutning (ansträngd/ofullständig)."
      ],
      action: "Tidig behandling i växelbettet minskar incidensen av trauma.",
      journal: "Diagnos: Malocklusion. Status: Overjet 8mm. Ansträngd läppslutning. Åtgärd: Remiss ortodontist."
    }
  ]
};
