import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface BettfysiologiScenarioData {
  id: string;
  scId: string;
  slug: string;
  title: string;
  icdCode: string;
  patientUtsaga: string;
  isAcute: boolean;
  category: "Bettfysiologi";
  
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

export const bettfysiologiScenarier: Record<string, BettfysiologiScenarioData> = {
  "luxation": {
    scId: "26",
    id: "KIR-26-LUX",
    slug: "luxation",
    title: "Käkledsluxation",
    icdCode: "S03.0",
    patientUtsaga: "Patienten kan inte stänga munnen efter behandlingen / gäspningen.",
    isAcute: true,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Anatomi", text: "Kondylen har passerat tuberculum articulare och fastnat i ett läge framför p.g.a. muskelspasm." },
      { label: "Bilateral", text: "Hakan pekar rakt fram, underbett. Kontakt endast på sista molarerna." },
      { label: "Unilateral", text: "Hakan devierar mot den friska sidan." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När inträffade låsningen?", a: "Ofta vid gäspning eller tandbehandling." },
        { q: "Kan du bita ihop alls?", a: "Nej, låst i öppet läge." }
      ],
      kompletterande: [
        "Tidigare luxationer?",
        "Smärtnivå? (Ofta hög pga spasm)"
      ]
    },
    status: {
      inspektion: [
        "Tomma ledskålar palperas framför tragus.",
        "Öppet bett (underbett vid bilateral).",
        "Oförmåga att stänga munnen."
      ]
    },
    behandling: {
      varning: "Skydda dina tummar! Linda dem tjockt i kompresser innan reponering (risk för allvarliga bitskador).",
      alternativ: [
        {
          title: "Manuell Reponering (Hippokrates)",
          metod: [
            "Patienten sitter lågt. Stå framför och placera tummarna på molarerna i UK.",
            "Pressa kraftigt NEDÅT för att få kondylen under tuberculum.",
            "För sedan käken BAKÅT och släpp uppåt in i fossa."
          ]
        },
        {
          title: "Premedicinering (vid kraftig spasm)",
          metod: [
            "Diazepam 5 mg p.o. 30-60 min innan reponering (screena kontraindikationer!).",
            "Eventuellt LA i m. masseter bilat."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Käkledsluxation",
        text: "Diagnos: S03.0 Käkledsluxation (bilateral).\nAnamnes: I samband med [gäspning/tandbehandling] låste sig käken i öppet läge. Smärta och oförmåga att stänga munnen.\nStatus: Tomma ledskålar palperas framför tragus. Öppet bett. Hakan central.\nÅtgärd: Manuell reponering enligt Hippokrates u.a. Ocklusion kontrollerad och normal efter reponering.\nInfo: Pat informerad om skonkost 1 vecka, undvika stora gaprörelser samt stödja hakan vid gäspning."
      }
    ],
    diffDiagnoser: [
      { namn: "Käkledsfraktur", kod: "S02.6", skillnad: "Traumahistorik, ofta hematom, avvikande bett men ej fixerat öppet." }
    ],
    redFlags: [
      { id: "bett-26-1", title: "Andningsdepression", description: "Risk vid Diazepam hos äldre/KOL/sömnapné.", severity: "critical" },
      { id: "bett-26-2", title: "Recidiverande luxation", description: "Remiss till käkkirurg för eminektomi.", severity: "warning" }
    ],
    kliniskAnteckning: "Mjuk kost 1-2 veckor. Undvik extrem gapning."
  },
  "myalgi": {
    scId: "28",
    id: "BETT-28-MYALGI",
    slug: "myalgi",
    title: "Akut Myalgi & Artralgi",
    icdCode: "M79.1",
    patientUtsaga: "Jag kan inte gapa / Det gör ont i kinden och örat när jag tuggar.",
    isAcute: false,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Diagnos", text: "Muskulär smärta (Myalgi) och/eller ledsmärta (Artralgi)." },
      { label: "Etiologi", text: "Stress, bruxism, trauma eller långvarig gapning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var sitter smärtan?", a: "Kind, tinning, framför örat." },
        { q: "Förvärras det av rörelse?", a: "Ja, vid tuggning eller gapning." }
      ],
      kompletterande: [
        "Stressnivå?",
        "Huvudvärk?",
        "Vaknar med trötthetskänsla i käkarna?"
      ]
    },
    status: {
      inspektion: [
        "Maxgap < 40-50 mm pga smärta.",
        "Palpationsömhet m. masseter / m. temporalis (Familiar pain).",
        "Ömhet laterala polen käkled."
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Konservativ behandling",
          metod: [
            "Information & Lugnande besked (Prio 3).",
            "Skonkost & Käkvila (undvik seg/hård mat).",
            "Instruktion i rörelseträning (töjning/avslappning)."
          ]
        },
        {
          title: "Bettfysiologisk skena",
          metod: [
            "Mjuk bettskena (akut) eller hård stabiliseringsskena (långsiktigt) (Prio 4)."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Myalgi/Artralgi",
        text: "Diagnos: M79.1 Myalgi tuggmuskulatur + M25.5 Artralgi käkled.\nAnamnes: Smärta i [sida] käke sedan [tid]. Förvärras vid tuggning.\nStatus: Maxgap [XX] mm med smärta. Palpation: Kraftig ömhet m. masseter och m. temporalis [sida], familiar pain. Ömhet laterala polen käkled.\nÅtgärd: Info om god prognos. Instruerad i rörelseträning. Råd om skonkost och NSAID [screenat ua]."
      }
    ],
    diffDiagnoser: [
      { namn: "Odontogen smärta", kod: "K04.0", skillnad: "Tandvärk, kyla/värmekänslighet, perkussionömhet." }
    ],
    redFlags: [],
    kliniskAnteckning: "Rörelseträning är kostnadseffektiv förstahandsåtgärd."
  },
  "closed-lock": {
    scId: "29",
    id: "BETT-29-CLOSED",
    slug: "closed-lock",
    title: "Akut Käkledslåsning (Closed Lock)",
    icdCode: "K07.6",
    patientUtsaga: "Käken har låst sig, jag får inte upp munnen.",
    isAcute: true,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Patologi", text: "Diskförskjutning utan återgång. Disken ligger framför kondylen och hindrar translation." },
      { label: "Maxgap", text: "Ofta begränsat till 25-30 mm (endast rotation möjlig)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Haft knäppningar tidigare?", a: "Ja, som nu plötsligt upphört." },
        { q: "När inträffade låsningen?", a: "Ofta efter uppvaknande eller tuggning." }
      ],
      kompletterande: [
        "Smärta vid gapningsförsök?"
      ]
    },
    status: {
      inspektion: [
        "Maxgap ≤ 25–30 mm (Hård end-feel).",
        "Deflektion åt den låsta (sjuka) sidan vid gapning."
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Manuell Distraktion (Upplåsning)",
          metod: [
            "Dra underkäken försiktigt nedåt/framåt för att få kondylen under disken.",
            "Föregås ofta av smärtlindring/LA."
          ]
        },
        {
          title: "Farmakologi & Träning",
          metod: [
            "NSAID för att dämpa inflammation i retrodiskala vävnader.",
            "Rörelseträning för att tänja ut ligament."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Closed Lock",
        text: "Diagnos: K07.6 Diskförskjutning u. återgång [sida].\nAnamnes: Vaknade imorse och kunde ej gapa stort. Haft knäppningar tidigare som nu upphört.\nStatus: Deflektion åt [hö/vä] vid gapning. Maxgap [25] mm (Hård end-feel). Palpationsöm laterala polen käkled.\nÅtgärd: Manuell distraktion prövades. Instruktion i rörelseträning. Rp NSAID [screenat ua]."
      }
    ],
    diffDiagnoser: [
      { namn: "Muskelspasm", kod: "M79.1", skillnad: "Mjukare end-feel, ingen deflektion, ofta utlöst av stress/trauma." }
    ],
    redFlags: [
      { id: "bett-29-1", title: "Handikappande besvär", description: "Remiss för artrocentes (lavage) vid utebliven effekt av konservativ behandling.", severity: "warning" }
    ],
    kliniskAnteckning: "God långtidsprognos — ligament anpassar sig ofta över tid."
  },
  "trauma-artrit": {
    scId: "30",
    id: "BETT-30-TRAUMA",
    slug: "trauma-artrit",
    title: "Traumatisk Artrit",
    icdCode: "M26.6",
    patientUtsaga: "Fick ett slag mot käken / Bet på ett stenhårt bröd - nu stämmer inte bettet.",
    isAcute: true,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Orsak", text: "Makrotrauma (slag) eller mikrotrauma (plötslig hård bitning)." },
      { label: "Bettändring", text: "Ödem i leden trycker ner kondylen." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När inträffade traumat?", a: "Nyligen (timmar/dagar)." },
        { q: "Känns bettet annorlunda?", a: "Ja, tänderna 'passar inte'." }
      ],
      kompletterande: [
        "Andra skador (tänder/slemhinna)?"
      ]
    },
    status: {
      inspektion: [
        "Ipsilateral molarprematurkontakt (samma sida).",
        "Kontralateralt öppet bett (motsatt sida).",
        "Palpationsömhet lateralt/posteriort över käkleden."
      ]
    },
    behandling: {
      varning: "SLIPA ALDRIG på tänderna! Bettet återgår när svullnaden lägger sig.",
      alternativ: [
        {
          title: "Avlastning & NSAID",
          metod: [
            "Strikt skonkost (flytande/mosad mat).",
            "NSAID (t.ex. Naproxen 500mg x 2) i 7-10 dagar (screena kontraindikationer!).",
            "Kyla lokalt (max 15 min) för att minska svullnad."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Traumatisk Artrit",
        text: "Diagnos: M26.6 Traumatisk käkledsartrit [Sin/Dx].\nAnamnes: [Slag/Bet hårt] igår. Upplever att tänderna inte passar ihop.\nStatus: Gapförmåga inskränkt [XX] mm. Ipsilateral molarprematurkontakt och kontralateralt öppet bett. Inga tecken på fraktur.\nBedömning: Akut traumatisk artrit med ödem.\nÅtgärd: Info om tillstånd. EJ SLIPA. Ordinerat skonkost och NSAID [screenat ua]."
      }
    ],
    diffDiagnoser: [
      { namn: "Collumfraktur", kod: "S02.61", skillnad: "Kraftig deviation, oförmåga att föra käken åt motsatt sida -> Remiss!" }
    ],
    redFlags: [
      { id: "bett-30-1", title: "Frakturmisstanke", description: "Vid våld mot käken och kraftig deviation -> Remiss Käkkirurg.", severity: "critical" }
    ],
    kliniskAnteckning: "Bettet normaliseras när inflammationen lägger sig."
  },
  "spasm-tendinit": {
    scId: "32",
    id: "BETT-32-MUSKEL",
    slug: "spasm-tendinit",
    title: "Muskelspasm & Temporalistendinit",
    icdCode: "M79.1",
    patientUtsaga: "Kramplåsning i käken / En diffus och pulserande tandvärk i hela överkäken.",
    isAcute: false,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Spasm", text: "Ofrivillig tonisk kontraktion (ofta m. pterygoideus lat). Orsakar låsning." },
      { label: "Tendinit", text: "Inflammation i temporalissenans fäste (proc. coronoideus). Liknar pulpit i ÖK-molarer." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Var sitter värken?", a: "Tinning, tinning/kind, eller diffust över ÖK-tänder." },
        { q: "När började det?", a: "Ofta efter långvarig behandling eller bruxism." }
      ],
      kompletterande: [
        "Gör det ont att gapa?"
      ]
    },
    status: {
      inspektion: [
        "Tänder 14-17 ua kliniskt/rtg (perk/sens ua).",
        "Kraftig ömhet vid palpation av processus coronoideus."
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Diagnostisk Blockad",
          metod: [
            "1 ml LA vid processus coronoideus. Om 'falsk tandvärk' försvinner är diagnosen klar."
          ]
        },
        {
          title: "Konservativ åtgärd",
          metod: [
            "Skonkost, avslappning och NSAID."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Muskelspasm/Tendinit",
        text: "Diagnos: M79.1 Myalgi (Temporalistendinit).\nAnamnes: Intensiv värk tinning och diffust över tänderna i ÖK [sida].\nStatus: Tänder 14-17 u.a. Sens o Perk u.a. Kraftig ömhet vid palpation av processus coronoideus.\nÅtgärd: Diagnostisk blockad med 1 ml Xylocain lagd vid fästet. Smärtan försvann helt inom 2 minuter. Bedömning: Tendinit. Ej dentalt ursprung. Info om skonkost/NSAID."
      }
    ],
    diffDiagnoser: [
      { namn: "Pulpit", kod: "K04.0", skillnad: "Lokaliserbar tand, patologiska sens/perk-test." }
    ],
    redFlags: [],
    kliniskAnteckning: "Skilj 'falsk tandvärk' från 'äkta tandvärk' via blockad."
  },
  "artrit": {
    scId: "34",
    id: "BETT-34-ARTRIT",
    slug: "artrit",
    title: "Käkledsartrit & Artralgi",
    icdCode: "K07.6",
    patientUtsaga: "Det gör ont framför örat, svårt att gapa och bettet känns konstigt.",
    isAcute: true,
    category: "Bettfysiologi",
    snabbOversikt: [
      { label: "Artrit", text: "Inflammation i synovialmembran/kapsel. Ger svullnad och smärta." },
      { label: "Artralgi", text: "Smärta utan kliniska tecken på inflammation (ofta överbelastning)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Värker det framför örat?", a: "Ja, ofta vid rörelse." },
        { q: "Haft morgonstelhet?", a: "Can tyda på systemisk artrit (RA)." }
      ],
      kompletterande: [
        "Känd reumatisk sjukdom?",
        "Stress?"
      ]
    },
    status: {
      inspektion: [
        "Ipsilateral molarprematurkontakt.",
        "Kontralateralt öppet bett (VIKTIGT: Kontrollera alltid båda sidor).",
        "Palpationsömhet laterala polen."
      ]
    },
    behandling: {
      varning: "SLIPA ALDRIG! Inflammationen orsakar bettförändringen genom ödem i leden.",
      alternativ: [
        {
          title: "NSAID & Rörelseträning",
          metod: [
            "NSAID i 10 dagar (STRIKT screening: Astma, Ulcus, Hjärtsvikt, Njurar!).",
            "Rörelseträning (motståndsövningar) bryter muskelspänning via reciprok hämning."
          ]
        },
        {
          title: "Avlastning",
          metod: [
            "Skonkost och käkvila."
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Artrit/Artralgi",
        text: "Diagnos: K07.6 Käkledsbesvär (Artrit/Artralgi).\nAnamnes: Smärta framför örat [sida] efter [överbelastning].\nStatus: Palpationsöm laterala polen. Ödem i leden: ipsilateral molarprematurkontakt och kontralateralt öppet bett.\nÅtgärd: Info om reversibilitet. EJ SLIPA. Ordinerat skonkost och NSAID [screenat ua: tål NSAID].\nPlan: Uppföljning 2 veckor."
      }
    ],
    diffDiagnoser: [
      { namn: "Artralgi", kod: "M25.5", skillnad: "Ingen bettpåverkan, endast smärta." }
    ],
    redFlags: [
      { id: "bett-34-1", title: "NSAID-kontraindikation", description: "Astma, Ulcus, Hjärtsvikt, Njurar/Waran -> Ge Paracetamol istället.", severity: "critical" },
      { id: "bett-34-2", title: "Kontralateralt öppet bett", description: "Detta är ett tecken på ledödem. Slipa INTE.", severity: "warning" }
    ],
    kliniskAnteckning: "Ipsilateral kontakt + KONTRALATERALT öppet bett = Artrit/Ödem."
  }
};
