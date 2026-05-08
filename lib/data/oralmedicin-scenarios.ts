import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface OralScenarioData {
  id: string;
  slug: string;
  title: string;
  icdCode: string;
  patientUtsaga: string;
  isAcute: boolean;
  category: "Oralmedicin";
  
  snabbOversikt: Array<{ label: string; text: string }>;
  
  anamnes: {
    obligatoriska: Array<{ q: string; a: string }>;
    kompletterande: string[];
  };

  status: {
    inspektion: string[];
    kliniskaFynd?: string[];
  };

  diagnostik: {
    kriterier: string;
    uteslut: string[];
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

  journal: Array<{ titel: string; text: string }>;

  diffDiagnoser: Array<{ namn: string; kod: string; skillnad: string }>;

  redFlags: RedFlag[];
  
  kliniskAnteckning?: string;
  varningssignal?: string;
}

export const oralmedicinScenarier: Record<string, OralScenarioData> = {
  "sar-och-blasor": {
    id: "ORAL-35-SÅRBLÅS",
    slug: "sar-och-blasor",
    title: "Sår & Blåsor",
    icdCode: "K12.0 / B00.2 / K13.1",
    patientUtsaga: "Det svider och jag har fått blåsor/sår i munnen",
    isAcute: false,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "Differentialdiagnos", text: "Viktigt att skilja på Herpes (fast slemhinna, feber), Afte (rörlig slemhinna, ingen feber) och Traumatiska sår (mekanisk orsak)." },
      { label: "2-veckorsregeln", text: "Alla sår som kvarstår >2 veckor utan tydlig orsak → malignt tills motsatsen är bevisad." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Har du feber eller sjukdomskänsla?", a: "Ja (talar för Herpes) / Nej (talar för Afte/Trauma)" },
        { q: "När dök såren upp?", a: "Bedöm duration (akut < 2v)" },
        { q: "Gör det ont att äta/dricka?", a: "Viktigt för smärtlindring och nutrition" }
      ],
      kompletterande: [
        "Tidigare liknande besvär?",
        "Nära kontakt med person med herpes?",
        "Nya mediciner eller tandvårdsprodukter?"
      ]
    },
    status: {
      inspektion: [
        "Herpes: Multipla små vesikler som spricker till sår. Finns på både rörlig och fast slemhinna (gom/gingiva).",
        "Afte: Runda/ovala sår med gulvit botten och röd halo. Endast på rörlig slemhinna.",
        "Trauma: Sår med oregelbunden form, ofta matchande en vass kusp eller proteskant.",
        "Lymfknutor: Palpera submandibulärt (ofta ömma vid Herpes)."
      ]
    },
    diagnostik: {
      kriterier: "Baseras på klinisk bild och lokalisation. K12.0 (Afte) ≠ K13.1 (Trauma).",
      uteslut: [
        "Cancer (om sår > 2-3 veckor)",
        "Erythema Multiforme (om sår även på hud/läppar)",
        "Slemhinnepemfigoid (om deskvamativ gingivit)"
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Symtomlindring",
          metod: [
            "Xylocain viskös eller gel (före måltid)",
            "Andolex munskölj (antiinflammatorisk/smärtstillande)",
            "Klorhexidin 0,1-0,2% (för att undvika sekundärinfektion)"
          ]
        },
        {
          title: "Specifik behandling (Herpes)",
          metod: [
            "Antivirala medel (Valaciklovir) om insatt tidigt (<72h)",
            "Zovirax/Anti-kräm (vid läppherpes)"
          ]
        },
        {
          title: "Specifik behandling (Afte)",
          metod: [
            "Lokala steroider (Kenacort-T i Orabase / Dermovat)",
            "Aftamed (skyddande hinna)"
          ]
        }
      ]
    },
    uppfoljning: { text: "Läkning sker normalt på 7-14 dagar. Vid utebliven läkning > 2-3 veckor → Remiss för biopsi." },
    journal: [
      {
        titel: "Mall: Akut slemhinneförändring",
        text: "Anamnes: Pat söker för sår i [lokalisation] sedan [X] dagar. [Har/Har ej] feber. [Kan/Kan ej] äta.\nStatus: Intraoralt: [Storlek] mm stort sår regio [XX]. [Beskriv utseende: fibrinbotten/röd halo/vesikler]. Sitter på [fast/rörlig] slemhinna.\nBedömning: Klinisk bild talar för [Herpes / Afte / Traumatisk decubitus].\nÅtgärd: Info om duration. Slipning av [vass tand]. Recept: [Xylocain/Andolex].\nPlan: [Återbesök om 2 veckor för kontroll / Avslutas]."
      }
    ],
    diffDiagnoser: [
      { namn: "Herpetisk gingivostomatit", kod: "B00.2", skillnad: "Feber, vesiklar på fast slemhinna (gom)." },
      { namn: "Afte", kod: "K12.0", skillnad: "Ingen feber, endast rörlig slemhinna." },
      { namn: "Traumatisk decubitus", kod: "K13.1", skillnad: "Tydlig orsak (vass kusp/protes)." }
    ],
    redFlags: [
      { id: "oral-35-1", title: "Sår > 2-3 veckor", description: "Måste utredas för malignitet. Remiss för biopsi.", severity: "critical" },
      { id: "oral-35-2", title: "Dehydrering", description: "Särskilt hos barn med svår smärta vid herpes.", severity: "warning" }
    ],
    kliniskAnteckning: "K12.0 = aftösa sår. K13.1 = traumatisk decubitus (OLIKA!)",
    varningssignal: "Sår som inte läker på 2 veckor efter orsak åtgärdats måste utredas."
  },
  "candida": {
    id: "ORAL-36-CANDIDA-ERYT",
    slug: "candida",
    title: "Candida",
    icdCode: "B37.0",
    patientUtsaga: "Det svider i gommen och tungan är röd",
    isAcute: false,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "Definition", text: "Opportunistisk infektion orsakad av jästsvampen Candida albicans." },
      { label: "Orsaker", text: "Antibiotika, inhalationssteroider, muntorrhet, diabetes, rökning." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Använder du astmaspray?", a: "Viktigt att skölja munnen efteråt för att undvika svamp" },
        { q: "Har du nyligen ätit antibiotika?", a: "Rubbar floran och ger svamptillväxt" },
        { q: "Svider det i munnen?", a: "Sveda är det vanligaste symtomet" }
      ],
      kompletterande: [
        "Diabetes?",
        "Rökning?",
        "Muntorrhet?"
      ]
    },
    status: {
      inspektion: [
        "Erytematös candidos: Kraftigt rodnad, svider. Ofta i gommen eller på tungan.",
        "Pseudomembranös: Vita avskrapbara beläggningar.",
        "Angulär cheilit: Sprickor/rodnad i munvinklar."
      ]
    },
    diagnostik: {
      kriterier: "Klinisk bild i kombination med anamnes (riskfaktorer).",
      uteslut: [
        "Erytroplaki (röd fläck, malignt)",
        "BMS (sveda utan kliniska fynd)",
        "Glossitis atroficans (bristtillstånd)"
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Lokal behandling",
          metod: [
            "Mixtur Nystimex (Nystatin) 100 000 IE/ml. Skölj 1-4 ml x 4 dagligen i 4-6 veckor.",
            "Fortsätt behandlingen 2 veckor efter symtomfrihet."
          ]
        },
        {
          title: "Systemisk behandling",
          indikation: "Vid omfattande infektion eller terapisvikt.",
          metod: [
            "Flukonazol (Diflucan) kapslar 50-100 mg x 1 i 7-14 dagar.",
            "VARNING: Interaktion med Warfarin (Waran)!"
          ]
        }
      ]
    },
    uppfoljning: { text: "Kontroll efter avslutad behandling. Vid terapisvikt → Odling (resistensbestämning) eller biopsi (utesluta malignitet)." },
    journal: [
      {
        titel: "Mall: Erytematös candidos",
        text: "Anamnes: Pat söker för sveda i tunga/gom sedan [tid]. Använder [Pulmicort/Antibiotika].\nStatus: Kraftig rodnad i hårda gommen och på tungryggen. Papillatrofi.\nBedömning: Klinisk bild talar för erytematös candidos.\nÅtgärd: Info om orsak. Recept: Mixt Nystimex 100 000 IE/ml. 4ml x 4 i 4v.\nPlan: Kontroll om 4 veckor."
      }
    ],
    diffDiagnoser: [
      { namn: "Erytroplaki", kod: "K13.2", skillnad: "Välavgränsad röd förändring, svarar ej på svampbehandling. Malignt!" },
      { namn: "BMS", kod: "DA0F.0", skillnad: "Sveda utan synliga förändringar." }
    ],
    redFlags: [
      { id: "oral-36-1", title: "Flukonazol + Waran", description: "Interagerar kraftigt! Risk för livshotande blödning.", severity: "critical" },
      { id: "oral-36-2", title: "Erytroplaki", description: "Misstänk alltid malignitet vid röd fläck som ej svarar på behandling.", severity: "critical" }
    ]
  },
  "malignitet": {
    id: "ORAL-37-MALIGN",
    slug: "malignitet",
    title: "Malignitet",
    icdCode: "K13.2 / C00-C14",
    patientUtsaga: "Ett sår som inte läker, en knöl som växer",
    isAcute: true,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "Varning", text: "Vänta ALDRIG. Tidig diagnos räddar liv." },
      { label: "SVF", text: "Standardiserat Vårdförlopp huvud-halscancer. Remiss enligt specifika kriterier." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur länge har förändringen funnits?", a: "> 3 veckor = SVF-indikation" },
        { q: "Har den vuxit snabbt?", a: "Snabb tillväxt indikerar aggressivitet" },
        { q: "Känner du domningar i läpp eller tunga?", a: "Parestesi tyder på nervinväxt" }
      ],
      kompletterande: [
        "Rökning/Snusning?",
        "Alkohol?",
        "Tidigare cancer?"
      ]
    },
    status: {
      inspektion: [
        "Sår med vallartade kanter (induration).",
        "Erytroplaki (röd sammetsliknande fläck).",
        "Leukoplaki (vit icke-skrapbar fläck).",
        "Hård, fixerad knöl."
      ],
      kliniskaFynd: [
        "Induration (hårdhet vid palpation)",
        "Fixering mot underlaget",
        "Hårda, oömma lymfknutor på halsen"
      ]
    },
    diagnostik: {
      kriterier: "Icke-läkande sår > 3v, röd eller röd-vit förändring som ej kan förklaras av trauma.",
      uteslut: [
        "Trauma (om sår läker inom 2v efter slipning)",
        "Leukoplaki / Lichen (ska dock ofta biopseras)"
      ]
    },
    behandling: {
      varning: "Ta ALDRIG biopsi själv vid stark malignitetsmisstanke — skicka remiss omedelbart för att inte störa SVF.",
      alternativ: [
        {
          title: "SVF-remiss",
          metod: [
            "Skicka akut remiss till Käkkirurg/ÖNH enligt SVF-rutin.",
            "Märk: 'MISSTÄNKT MALIGNITET - SVF'.",
            "Bifoga kliniska foton."
          ]
        }
      ]
    },
    uppfoljning: { text: "Patienten följs upp inom ramen för SVF (Standardiserat Vårdförlopp)." },
    journal: [
      {
        titel: "Mall: Misstänkt malignitet",
        text: "Anamnes: Pat söker för sår/knöl i [lokalisation] sedan [X] veckor. Ingen läkning trots slipning av tand.\nStatus: Sår regio [XX], [X] mm stort. Vallartade kanter. Palpatoriskt hårt (indurerat) och fixerat mot underlaget.\nBedömning: Malignitetssuspekt förändring som ej läkt på 3 veckor.\nÅtgärd: Remiss skickad omgående enligt SVF till Käkkirurgiska kliniken. Pat informerad."
      }
    ],
    diffDiagnoser: [
      { namn: "Traumatisk decubitus", kod: "K13.1", skillnad: "Läker på 2 veckor efter orsak åtgärdats." },
      { namn: "Major Afte", kod: "K12.0", skillnad: "Extremt smärtsamt, ofta återkommande." }
    ],
    redFlags: [
      { id: "oral-37-1", title: "Induration", description: "Hårdhet vid palpation är ett starkt tecken på cancer.", severity: "critical" },
      { id: "oral-37-2", title: "Parestesi", description: "Domningar indikerar djup växt och nervpåverkan.", severity: "critical" },
      { id: "oral-37-3", title: "Halsmetastas", description: "Hård, fixerad lymfknut på halsen.", severity: "critical" }
    ],
    kliniskAnteckning: "🚨 SVF-remiss — Standardiserat Vårdförlopp huvud-halscancer",
    varningssignal: "⚠️ Icke-läkande sår > 3v = BIOPSI OBLIGATORISK"
  },
  "lakemedel": {
    id: "ORAL-38-LAKEMEDEL",
    slug: "lakemedel",
    title: "Läkemedel",
    icdCode: "K05.1 / M87.1",
    patientUtsaga: "Svullet tandkött eller blottlagt ben",
    isAcute: true,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "DIGO", text: "Drug Induced Gingival Overgrowth (Gingival hyperplasi)." },
      { label: "MRONJ", text: "Medicinrelaterad osteonekros i käken. Blottlagt ben > 8 veckor." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Vilka mediciner tar du?", a: "Kolla efter bisfosfonater (Prolia/Xgeva/Zometa) eller immunsuppressiva/blodtrycksmediciner" },
        { q: "När drogs tanden ut?", a: "MRONJ uppstår ofta efter kirurgi hos riskpatienter" },
        { q: "Har du ont eller smakar det illa?", a: "Tecken på infektion i nekrotiskt ben" }
      ],
      kompletterande: [
        "Hur länge har du tagit medicinen?",
        "Har du fått medicinen intravenöst (cancerbehandling)?"
      ]
    },
    status: {
      inspektion: [
        "DIGO: Kraftig svullnad/tillväxt av gingivan. Ofta fast och blek eller röd vid inflammation.",
        "MRONJ: Synligt blottlagt ben (gulvitt). Eventuellt pus eller fistelgång."
      ]
    },
    diagnostik: {
      kriterier: "DIGO: Koppling till medicinering. MRONJ: Blottlagt ben > 8v + medicinering (antiresorptiva).",
      uteslut: [
        "Osteomyelit",
        "Malignitet i käkbenet"
      ]
    },
    behandling: {
      varning: "Kontakta ALLTID behandlande läkare (onkolog) innan kirurgiska ingrepp på högriskpatienter.",
      alternativ: [
        {
          title: "Behandling DIGO",
          metod: [
            "Noggrann munhygien.",
            "Eventuellt byte av medicin (i samråd med läkare).",
            "Gingivektomi (vid stora besvär)."
          ]
        },
        {
          title: "Behandling MRONJ",
          metod: [
            "Konservativ: NaCl-spolning, klorhexidinsköljning.",
            "Antibiotika vid infektion.",
            "Remiss till Käkkirurg för specialistvård."
          ]
        }
      ]
    },
    uppfoljning: { text: "Tät kontroll för att undvika infektion och progress." },
    journal: [
      {
        titel: "Mall: Misstänkt MRONJ",
        text: "Anamnes: Pat medicinerar med [Prolia/Zometa]. Söker för blottlagt ben regio [XX].\nStatus: Synligt nekrotiskt ben regio [XX]. Gingiva rodnad. Pus vid palpation.\nÅtgärd: Spolning NaCl. Info. Remiss skickad till Käkkirurg."
      }
    ],
    diffDiagnoser: [
      { namn: "Osteomyelit", kod: "M86.0", skillnad: "Ofta mer smärta/feber." }
    ],
    redFlags: [
      { id: "oral-38-1", title: "MRONJ-risk", description: "Kirurgi på patient med IV-bisfosfonater kräver specialistvård.", severity: "critical" },
      { id: "oral-38-2", title: "Blottlagt ben", description: "Remittera alltid vid misstänkt MRONJ.", severity: "critical" }
    ],
    kliniskAnteckning: "Kontakta ALLTID förskrivare innan ingrepp vid bisfosfonat",
    varningssignal: "⚠️ Kontakta onkolog INNAN ingrepp"
  },
  "ng-np": {
    id: "ORAL-39-NGNP",
    slug: "ng-np",
    title: "NG/NP (ANUG)",
    icdCode: "A69.1",
    patientUtsaga: "Akut smärta, blödning och 'avhuggna' papiller",
    isAcute: true,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "Klinik", text: "Akut smärta, blödning, papillnekros, fetor ex ore." },
      { label: "Orsaker", text: "Stress, rökning, immunosuppression (HIV-koppling!)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Kom smärtan plötsligt?", a: "Typiskt akut debut" },
        { q: "Röker du eller är du stressad?", a: "Viktigaste utlösande faktorerna" },
        { q: "Har du feber?", a: "Indikerar systempåverkan" }
      ],
      kompletterande: [
        "Tidigare liknande besvär?",
        "HIV-status? (Vid NUP/snabb progress)"
      ]
    },
    status: {
      inspektion: [
        "Nekrotiska, utstansade papiller ('punched out').",
        "Gråvita pseudomembran.",
        "Spontanblödning.",
        "Uttalad fetor ex ore (metallisk lukt)."
      ]
    },
    diagnostik: {
      kriterier: "Klinisk triad: Smärta + Blödning + Papillnekros.",
      uteslut: [
        "Herpesgingivostomatit",
        "Leukemi"
      ]
    },
    behandling: {
      alternativ: [
        {
          title: "Lokal sanering",
          metod: [
            "Varsam rengöring med väteperoxid (H2O2) 3%.",
            "Depuration (ultraljud) i akuta skedet.",
            "Klorhexidinsköljning 0,2% x 2."
          ]
        },
        {
          title: "Systemisk behandling",
          indikation: "Vid feber eller allmänpåverkan.",
          metod: [
            "Metronidazol 400mg x 3 i 5-7 dagar.",
            "Info: Ingen alkohol under behandlingen!"
          ]
        }
      ]
    },
    uppfoljning: { text: "Kontroll efter 48h. Utred bakomliggande faktorer." },
    journal: [
      {
        titel: "Mall: NUG",
        text: "Anamnes: Akut smärta och blödning regio [XX]. Kraftig rökare. Stress.\nStatus: Utstansade papiller regio [XX]. Grå pseudomembran. Fetor ex ore.\nÅtgärd: Rengöring med H2O2. Depuration. Recept: Metronidazol 400mg x 3."
      }
    ],
    diffDiagnoser: [
      { namn: "Herpes", kod: "B00.2", skillnad: "Vesiklar, feber, fast slemhinna." }
    ],
    redFlags: [
      { id: "oral-39-1", title: "HIV/Immunstatus", description: "Misstänk HIV vid snabb progress eller dåligt svar på behandling.", severity: "critical" },
      { id: "oral-39-2", title: "NOMA", description: "Extrem nekrosutveckling utanför gingivan.", severity: "critical" }
    ]
  },
  "neurogent": {
    id: "ORAL-40-NEURO",
    slug: "neurogent",
    title: "Neurogent",
    icdCode: "8B82.0 / DA0F.0 / 1E91",
    patientUtsaga: "Det bränner eller hugger – men tanden ser frisk ut",
    isAcute: false,
    category: "Oralmedicin",
    snabbOversikt: [
      { label: "BMS", text: "Munsveda. Slemhinna u.a. Bilateralt." },
      { label: "Trigeminus", text: "Elektriska stötar. Enkelsidigt. Triggers." },
      { label: "Zoster", text: "Bältros. Strikt enkelsidigt. Blåsor/sår." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Hur känns smärtan?", a: "Blixtrande (Trigeminus) vs Brännande (BMS/Zoster)" },
        { q: "Utlöses den av beröring?", a: "Ja (talar för Trigeminus-trigger)" },
        { q: "Sitter den på ena eller båda sidorna?", a: "Enkelsidigt (Trigeminus/Zoster) vs Bilateralt (BMS)" }
      ],
      kompletterande: [
        "Smakförändringar?",
        "Muntorrhet?"
      ]
    },
    status: {
      inspektion: [
        "BMS: Slemhinna ser helt normal ut.",
        "Trigeminus: Inga kliniska fynd intraoralt.",
        "Zoster: Enkelsidiga blåsor/sår som stannar vid medellinjen."
      ]
    },
    diagnostik: {
      kriterier: "Klinisk diagnostik. Uteslut dental orsak.",
      uteslut: [
        "Pulpit (dental orsak)",
        "Candida (röd slemhinna)"
      ]
    },
    behandling: {
      varning: "Gör ALDRIG invasiv tandvård vid misstänkt neurogen smärta.",
      alternativ: [
        {
          title: "Åtgärd Trigeminus",
          metod: [
            "Remiss till läkare/neurolog för medicinering (Karbamazepin).",
            "Info: Vanliga analgetika hjälper inte."
          ]
        },
        {
          title: "Åtgärd BMS",
          metod: [
            "Information & Lugnande besked (cancerofobi vanligt).",
            "Remiss för blodprover (Järn, B12, Zink, Glukos).",
            "SLS-fri tandkräm."
          ]
        },
        {
          title: "Åtgärd Zoster",
          metod: [
            "Antiviral behandling inom 72h.",
            "Remiss till läkare."
          ]
        }
      ]
    },
    uppfoljning: { text: "Samverkan med läkare/neurolog." },
    journal: [
      {
        titel: "Mall: Trigeminusneuralgi",
        text: "Diagnos: Trigeminusneuralgi (Misstänkt).\nAnamnes: Akuta attacker av elektrisk smärta vid beröring. Sekundduration.\nStatus: Dental: U.a. Inga kliniska fynd.\nÅtgärd: Remiss neurolog."
      },
      {
        titel: "Mall: BMS",
        text: "Diagnos: Burning Mouth Syndrome.\nAnamnes: Daglig sveda tunga/läppar. Värre på kvällen.\nStatus: Slemhinna u.a.\nÅtgärd: Info. Remiss VC för prover."
      }
    ],
    diffDiagnoser: [
      { namn: "Pulpit", kod: "K04.0", skillnad: "Dental orsak, temperaturkänslig." }
    ],
    redFlags: [
      { id: "oral-40-1", title: "Känselnedsättning", description: "Vid nedsatt känsel i ansiktet → Misstänk tumör. Akut remiss neurolog.", severity: "critical" },
      { id: "oral-40-2", title: "Zoster-risk", description: "Bältros i ansiktet riskerar ögonskador om V1 drabbas.", severity: "critical" }
    ]
  }
};
