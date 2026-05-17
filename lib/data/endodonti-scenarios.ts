import type { RedFlag } from "@/components/scenario/ScenarioLayout";

export interface EndoScenarioData {
  id: string;
  slug: string;
  title: string;
  patientUtsaga: string;
  icdCode: string;
  isAcute: boolean;
  category: string;
  snabbOversikt: Array<{ icon: string; label: string; value: string }>;
  anamnes: {
    obligatoriska: Array<{ fraga: string; forvantatSvar: string }>;
    kompletterande: string[];
  };
  status: {
    sensibilitet: string[];
    perkussion: string[];
    palpation: string[];
    inspektion: string[];
  };
  diagnostik: {
    scenarioId: string;
    ickKriteria: string[];
    rtgFynd: string[];
    uteslutningar: string[];
  };
  behandling: {
    alternativ: Array<{
      titel: string;
      indikation: string;
      material?: string[];
      metod: string[];
      tid?: string;
      tlvKoder?: string;
    }>;
    checklista?: string[];
  };
  journal: Array<{ rubrik: string; mall: string }>;
  uppfoljning: {
    tidpunkt: string[];
    lyckadKriteria: string[];
    omvardering: string[];
  };
  redFlags: Array<{ id: string; title: string; description: string; severity: "critical" | "warning" }>;
  diffDiagnoser: Array<{ titel: string; icd: string; skillnader: string[]; behandling: string }>;
}

export const endodontiScenarier: Record<string, EndoScenarioData> = {
  "sc1-pulpit-tidig-fas": {
    id: "VARK-01-REV",
    slug: "pulpit-tidig-fas",
    title: "Pulpit (tidig fas)",
    patientUtsaga: "Det ilar/hugger vid kyla & sött",
    icdCode: "K04.00",
    isAcute: false,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "💧", label: "Smärta", value: "Kortvarig, kyla-utlöst (<15 sek)" },
      { icon: "⏱️", label: "Duration", value: "Sekunder, snabbt övergående" },
      { icon: "🔨", label: "Perkussion", value: "Utan anmärkning (u.a.)" },
      { icon: "🌡️", label: "Sensibilitet", value: "Positiv kyla, kraftig reaktion" },
      { icon: "📊", label: "Prognos", value: "90-95% lyckat vid korrekt behandling" },
      { icon: "✅", label: "Primär behandling", value: "Permanent fyllning" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "Hur länge har besvären funnits?",
          forvantatSvar: "Dagar till veckor"
        },
        {
          fraga: "Vad utlöser smärtan?",
          forvantatSvar: "Kyla, sött, surt – INTE spontan"
        },
        {
          fraga: "Hur länge varar smärtan efter stimulus?",
          forvantatSvar: "Sekunder, max 10-15 sekunder"
        },
        {
          fraga: "Förekommer spontansmärta (särskilt nattetid)?",
          forvantatSvar: "NEJ"
        }
      ],
      kompletterande: [
        "Tidigare fyllning i tanden?",
        "Känd traumahistoria?",
        "Senaste värktablett? (tidpunkt och effekt)",
        "Tidigare rotfyllning i tanden?"
      ]
    },
    status: {
      sensibilitet: [
        "Kyla (CO₂ / kylspray): Positiv reaktion",
        "Kyla: Kraftig/skarp smärta",
        "Kyla: AVGÅR SNABBT (inom 10-15 sek)",
        "Värme: Kan ge reaktion men mindre specifik"
      ],
      perkussion: [
        "Utan anmärkning (u.a.) eller lätt obehag",
        "Om tydlig perkussionsömhet → INTE pulpit"
      ],
      palpation: [
        "Utan anmärkning (u.a.)",
        "Ömhet apikalt → misstänk pulpanekros/apikal påverkan"
      ],
      inspektion: [
        "Synlig karies?",
        "Fraktur eller spricka?",
        "Defekt fyllning/läckage?",
        "Blottad tandhals?"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-01-REV",
      ickKriteria: [
        "Spontansmärta (särskilt nattetid)",
        "Smärta kvarstår >15 sekunder efter stimulus",
        "Smärtan förvärras av värme",
        "Perkussionsömhet",
        "Apikal palpationsömhet",
        "Periapikal radioluceens"
      ],
      rtgFynd: [
        "Karies närmar sig pulpa men ej exponering",
        "Normal periapikal vävnad (ingen radioluceens)",
        "Normal rotspalt (jämn tjocklek)",
        "Eventuell sekundär karies vid gammal fyllning"
      ],
      uteslutningar: [
        "Synlig pulpaexponering",
        "Periapikal radioluceens",
        "Feber eller allmänpåverkan"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Permanent Fyllning (Primärt val)",
          indikation: "Karies >2 mm från pulpa, Stabil pulpastatus, Patient samtycker.",
          material: [
            "Adhesiv: Universal Bond (t.ex. Scotchbond Universal)",
            "Bas: SDR eller Essentia Posterior (bulk-fill komposit)",
            "Liner: Ca(OH)₂ vid djup kavitet (nära pulpa)",
            "Täckning: Nanohybridkomposit"
          ],
          metod: [
            "1. Lokalbedövning (artikain 40 mg/ml + adrenalin)",
            "2. Kofferdam (rekommenderas starkt)",
            "3. Kariesexcavering (roserande borre → excavator)",
            "4. Ca(OH)₂-liner lokalt vid behov (0.5-1 mm)",
            "5. Adhesiv enligt tillverkarens instruktion",
            "6. Bulk-fill bas (SDR)",
            "7. Täckskikt komposit",
            "8. Justering av ocklusion"
          ],
          tid: "45-60 minuter",
          tlvKoder: "401 – Fyllning 1 yta | 402 – Fyllning 2 ytor | 403 – Fyllning 3+ ytor | 001 – Undersökning | 011 – Röntgen (periapical)"
        },
        {
          titel: "Stegvis Excavering",
          indikation: "Mycket djup karies (>75% dentintjocklek), Risk för pulpaexponering, Patient vill undvika endodonti.",
          material: [
            "Ca(OH)₂-pasta (Dycal, Life)",
            "Glasjonomer: Fuji IX (provisorisk tätning)"
          ],
          metod: [
            "1. Lokalbedövning",
            "2. Delvis kariesexcavering (lämna karies vid pulpagolv)",
            "3. Desinficera kavitet (Klorhexidin 0,2–2%)",
            "4. Ca(OH)₂-inlägg",
            "5. Täta med glasjonomer (Fuji IX)",
            "6. Återbesök om 6-12 månader för definitiv fyllning"
          ],
          tlvKoder: "704 – Provisorisk fyllning | 401-403 – Definitiv fyllning (vid återbesök)"
        }
      ],
      checklista: [
        "Kontrollera approximala kontakter",
        "Bedöm bitförhållanden (parafunktion?)",
        "Uteslut sprickor/frakturer (transilluminering)",
        "Informera patient om prognos (90-95% lyckat)",
        "Informera om risk för förändrad status → endodonti",
        "Dokumentera preoperativ sensibilitet"
      ]
    },
    journal: [
      {
        rubrik: "Mall 1: Permanent fyllning",
        mall: `Anamnes: Pat. anger ilningar vid kyla och sött sedan [tidsperiod]. 
Smärtan är kortvarig och provocerad. Ingen spontansmärta. 
Senaste analgetika: [datum/tid].

Status: 
- Tand [nr]: Synlig karies [lokalisation]
- Sensibilitet kyla: Positiv, kraftig, snabbt övergående
- Perkussion: u.a.
- Palpation: u.a.

Rtg: Approximal karies tand [nr], ca [mm] från pulpa. 
Periapikal status u.a.

Bedömning: pulpit tand [nr].

Behandling: 
- LA: Artikain 40 mg/ml + adrenalin, [ml]
- Kofferdam
- Kariesexcavering tand [nr]
- Ca(OH)₂-liner lokalt vid pulpagolv
- Adhesiv: [produkt]
- Komposit: [produkt], färg [A2/...]
- Ocklusion justerad
- Kontroll: Perkussion u.a., sensibilitet kvarstår

Planering: Kontroll om behov. Kontakta vid kvarstående/försämrade symtom.`
      },
      {
        rubrik: "Mall 2: Stegvis excavering",
        mall: `Anamnes: [Som ovan]
Status: [Som ovan] + mycket djup karies.
Bedömning: symptomatisk pulpit, mycket djup karies. Risk för pulpaexponering.
Behandling: LA, Delvis kariesexcavering, Ca(OH)₂, försegling med temporär fyllning.
Planering: Återbesök om 6-12 månader för definitiv fyllning. Kontakta vid symtomförändring.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Rutinuppföljning: 2-4 veckor (telefonkontakt eller kliniskt)",
        "Akut kontakt: Vid symtomförändring"
      ],
      lyckadKriteria: [
        "Symtomfrihet eller avtagande ilningar",
        "Perkussion u.a.",
        "Normal sensibilitet",
        "Ingen spontansmärta"
      ],
      omvardering: [
        "Kvarstående eller ökad smärta",
        "Perkussionsömhet utvecklas",
        "Spontansmärta uppkommer",
        "→ Överväg Symtomatisk pulpit eller apikalparodontit"
      ]
    },
    redFlags: [
      {
        id: "rf-fever",
        title: "Systemiska tecken",
        description: "Feber >38.5°C, Trismus, Svullnad som påverkar andning/sväljning, Allmänpåverkan, Svullnad över mandibula/orbital region",
        severity: "critical"
      },
      {
        id: "rf-local",
        title: "Lokala tecken",
        description: "Snabbt progredierande smärta (timmar, ej dagar), Spontan blödning från gingiva, Uttalad perkussionsömhet utvecklas akut, Fluktuation (varbildning)",
        severity: "warning"
      },
      {
        id: "rf-patient",
        title: "Patientspecifika riskfaktorer",
        description: "Immunosuppression (diabetes okontrollerad, kemoterapi, HIV), Antikoagulantia (Warfarin, NOAK) vid planerad extraktion, Graviditet, Bisfosfonatbehandling",
        severity: "warning"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Blottade tandhalsar / Dentinhypersensitivitet",
        icd: "K03.1",
        skillnader: [
          "Smärta mer ytlig, snabbt övergående",
          "Synlig gingivarecession",
          "Normal röntgenbild",
          "Perkussion u.a."
        ],
        behandling: "Desensibilisering, fluorlack, eventuell täckning"
      },
      {
        titel: "Infraktion / Spricka (Cracked tooth syndrome)",
        icd: "S02.5",
        skillnader: [
          "Smärta vid bitning/frigörande av bett",
          "Intermittent smärta",
          "Svår att lokalisera för patient",
          "Kan visualiseras med metylenblått"
        ],
        behandling: "Kusptäckning (onlay/krona)"
      },
      {
        titel: "Symtomatisk pulpit (tidig fas)",
        icd: "K04.0",
        skillnader: [
          "Dröjande smärta (>15 sek)",
          "Kan ha sporadisk spontansmärta",
          "Värre på natten",
          "Perkussion kan vara lätt öm"
        ],
        behandling: "Endodonti eller extraktion"
      }
    ]
  },

  "sc2-pulpit-sen-fas": {
    id: "VARK-02-IRR",
    slug: "pulpit-sen-fas",
    title: "Pulpit (sen fas) / Pulpanekros",
    patientUtsaga: "Bultande spontanvärk / Nattsmärta",
    icdCode: "K04.01",
    isAcute: true,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "💥", label: "Smärta", value: "Spontan, bultande/pulserande" },
      { icon: "🌙", label: "Nattetid", value: "Ofta värre, väcker patienten" },
      { icon: "🔨", label: "Perkussion", value: "Dunköm eller bitöm (apikal påverkan)" },
      { icon: "❄️", label: "Sensibilitet", value: "Dröjande/kraftig ELLER negativ (pulpanekros)" },
      { icon: "⚠️", label: "Prognos", value: "Kräver endodonti eller extraktion" },
      { icon: "🚨", label: "Primär åtgärd", value: "Akutrensning eller extraktion" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "Beskriver du smärtan som bultande/pulserande?",
          forvantatSvar: "Ja"
        },
        {
          fraga: "Förekommer smärtan spontant (utan stimuli)?",
          forvantatSvar: "Ja, särskilt nattetid"
        },
        {
          fraga: "Håller smärtan i sig flera minuter till timmar?",
          forvantatSvar: "Ja"
        },
        {
          fraga: "Försämras smärtan av värme eller lindras av kyla?",
          forvantatSvar: "Ofta ja vid pulpanekros"
        },
        {
          fraga: "Strålar smärtan ut (öra, tinning, käke)?",
          forvantatSvar: "Vanligt"
        }
      ],
      kompletterande: [
        "Smärtan väckt dig nattetid? (klassiskt för senare fas Symtomatisk pulpit)",
        "Vilka analgetika har du tagit? Effekt?",
        "Tidigare rotfyllning i tanden?",
        "Trauma mot tanden?"
      ]
    },
    status: {
      sensibilitet: [
        "Symtomatisk pulpit (tidig): Kyla positiv, KRAFTIG reaktion, dröjer >15-30 sekunder",
        "Symtomatisk pulpit (tidig): Värme kan provocera smärta",
        "Pulpanekros (sen fas): Kyla negativ eller mycket försvagad",
        "Pulpanekros (sen fas): Värme negativ"
      ],
      perkussion: [
        "Positiv (dunköm eller bitöm)",
        "Tyder på apikal påverkan (parodontit apikalis)"
      ],
      palpation: [
        "Ofta ömt apikalt (tryckömhet i omslagsveck)"
      ],
      inspektion: [
        "Djup karies (ofta)",
        "Stor fyllning eller kronkaraktär",
        "Missfärgning (grå/brun vid pulpanekros)",
        "Eventuell fistel/svullnad"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-02-IRR",
      ickKriteria: [
        "Smärta endast vid kyla, <10 sek → pulpit",
        "Smärta endast vid bitning utan spontansmärta → spricka/apikalparodontit",
        "Svullnad + feber + trismus → abscess",
        "Smärta i flera tänder bilateral → sinuit"
      ],
      rtgFynd: [
        "Djup karies/fyllning med pulpanära kontakt",
        "Vidgad rothinnespalt (tidigt tecken på apikal parodontit)",
        "Periapikal radioluceens (vid etablerad apikalparodontit)",
        "Tidigare rotfyllning (eventuellt otillräcklig)"
      ],
      uteslutningar: [
        "Extern resorption",
        "Parodontal abscess (fickdjup, radioluceens lateralt)"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Akutrensning / Pulpektomi",
          indikation: "Tanden har strategiskt värde, Tillräcklig tandsubstans kvar, Patient samtycker till endodonti.",
          material: [
            "Kofferdam (obligatorisk)",
            "NaOCl 3% (natriumhypoklorit för spolning)",
            "Ca(OH)₂-pasta (Calasept, Metapex)",
            "Provisorisk tätning: Cavit, IRM"
          ],
          metod: [
            "1. Lokalbedövning (artikain 40 mg/ml + adrenalin)",
            "2. Kofferdam (absolut krav för endodonti)",
            "3. Trepanation (access cavity)",
            "4. Exstirpation av pulpavävnad (barbed broaches)",
            "5. Arbetslängdsbestämning (apex locator/rtg)",
            "6. Rensning med K-filar till apex",
            "7. Riklig spolning NaOCl 3% (minst 20 ml)",
            "8. Torkning med paperspetsar",
            "9. Ca(OH)₂-inlägg (till apex)",
            "10. Provisorisk tätning (Cavit/IRM)"
          ],
          tid: "60-90 minuter (beroende på antalet kanaler)",
          tlvKoder: "501 – Rotfyllning 1 kanal | 502 – Rotfyllning 2 kanaler | 503 – Rotfyllning 3+ kanaler | 011 – Röntgen (flera under behandling) | 704 – Provisorisk tätning"
        },
        {
          titel: "Extraktion",
          indikation: "Tanden ej restaurerbar (omfattande karies/fraktur), Patient avböjer endodonti, Ekonomiska skäl, Akut smärtlindring när endodonti ej kan utföras omgående.",
          material: [
            "Hävlar (raka, vinkelade)",
            "Extraktionstång (anpassad till tand)",
            "Sutur: Vicryl 4-0 (resorberbar)",
            "Kompresser (gasbinda)"
          ],
          metod: [
            "1. Lokalbedövning (dubbel dos om inflammation)",
            "2. Kontrollera anestesi (perkussion, palpation)",
            "3. Lossa gingivaattachment (periotom)",
            "4. Lyftning med hävlar (försiktig)",
            "5. Extraktion med tång (rotation/traktion)",
            "6. Kontrollera alveol (granulomstyning?)",
            "7. Bettamponad (gasbinda, 30 min)",
            "8. Eventuell sutur vid stor alveol",
            "9. Postoperativa instruktioner (muntligt + skriftligt)"
          ],
          tid: "20-40 minuter",
          tlvKoder: "701 – Enkel extraktion | 702 – Komplicerad extraktion | 703 – Kirurgisk extraktion | 011 – Röntgen | 706 – Sutur"
        }
      ],
      checklista: [
        "Antikoagulantia (Warfarin, NOAK, ASA) → blödningsrisk vid extraktion",
        "Bisfosfonater (alendronat, risedronat) → risk för osteonekros vid extraktion",
        "Immunosuppression (kortison, kemoterapi) → infektionsrisk",
        "Graviditet → begränsade läkemedel",
        "Allergi (lokalanestesi, latex)"
      ]
    },
    journal: [
      {
        rubrik: "Mall 1: Akutrensning",
        mall: `Anamnes: Pat. anger spontan, bultande smärta tand [nr] sedan [tid]. 
Smärtan värst nattetid, strålar till [lokalisation]. 
Analgetika: Ibuprofen 400 mg x 3, måttlig effekt.

Status:
- Tand [nr]: Djup karies/stor fyllning
- Sensibilitet kyla: Dröjande/kraftig ELLER negativ
- Perkussion: Positiv (dunköm/bitöm)
- Palpation: Öm apikalt
- Ingen svullnad synlig

Rtg: Djup karies tand [nr], vidgad rothinnespalt/periapikal radioluceens.

Bedömning: symptomatisk pulpit / Pulpanekros tand [nr].

Behandling:
- LA: Artikain 40 mg/ml + adrenalin [ml]
- Kofferdam
- Trepanation tand [nr]
- Exstirpation av pulpa
- Rensning till apex, kanaler [1/2/3/4]
- Arbetsläng: [mm] från referenspunkt
- Spolning NaOCl 3%, riklig
- Torkning
- Ca(OH)₂-inlägg till apex
- Provisorisk tätning (Cavit)

Planering: 
Återbesök för definitiv rotfyllning om [1-2 veckor]. 
Kontakta vid försämring. Analgetika: Ibuprofen 400 mg vid behov.`
      },
      {
        rubrik: "Mall 2: Extraktion",
        mall: `Anamnes: [Som ovan]

Status: [Som ovan] + Tand [nr] omfattande destruktion, ej restaurerbar.

Bedömning: symptomatisk pulpit/nekros tand [nr]. Tanden ej restaurerbar.

Medicinsk kontroll:
- Antikoagulantia: Nej / Ja [specificera, INR-värde]
- Bisfosfonater: Nej / Ja [specificera]
- Allergi: Nej

Behandling:
- LA: Artikain 40 mg/ml + adrenalin [ml]
- Extraktion tand [nr] med hävlar och tång
- Alveol inspekterad, inga retinerade fragment
- Hemostas uppnådd
- [Eventuell sutur: Vicryl 4-0]
- Bettamponad 30 min

Information given:
- Undvik spolning/sugning i såret 24 h
- Mjuk kost 2-3 dagar
- Kontakta vid kraftig blödning/svullnad/feber
- Analgetika: Ibuprofen 400-600 mg x 3 i 2-3 dagar

Planering: Kontroll vid behov. Protetisk planering senare.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Efter akutrensning: Återbesök 7-14 dagar för definitiv rotfyllning",
        "Efter akutrensning: Symtomkontroll 24-48 timmar (telefonkontakt)",
        "Efter extraktion: Kontroll 7 dagar (endast vid komplikationer annars vid behov)",
        "Efter extraktion: Symtomkontroll 24 timmar (telefonkontakt)"
      ],
      lyckadKriteria: [
        "Smärtfrihet eller kraftigt reducerad smärta",
        "Ingen svullnad",
        "Perkussion förbättrad"
      ],
      omvardering: [
        "Ökad smärta/svullnad → akut återbesök",
        "Feber → överväg antibiotika",
        "Provisorium loss → nytt provisorium omgående"
      ]
    },
    redFlags: [
      {
        id: "rf-systemic",
        title: "Systemiska tecken",
        description: "Feber >38.5°C + frossa, Trismus (<20 mm), Dysfagi, Dyspné, Svullnad över mandibelvinkeln eller orbital region, Allmänpåverkan (konfusion, takykardi, hypotension)",
        severity: "critical"
      },
      {
        id: "rf-local",
        title: "Lokala tecken",
        description: "Snabbt progredierande svullnad (timmar), Fluktuation + cellulitförändringar, Svullnad i golvet/tungan (Ludwig's angina-risk), Ensidig trismus + svullnad (pterygomandibulär abscess)",
        severity: "critical"
      },
      {
        id: "rf-patient",
        title: "Patientspecifika riskfaktorer",
        description: "Okontrollerad diabetes (blodsocker >15 mmol/L), Neutropeni (kemoterapi, immunosuppression), IV-bisfosfonater (zoledronsyra) vid extraktion, Warfarin med INR >4.0",
        severity: "warning"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Sinuit (maxillär)",
        icd: "J32.0",
        skillnader: [
          "Smärta i flera tänder (ofta premolar/molar överkäke)",
          "Förvärras vid framåtlutning",
          "Näskorrelat (täppt näsa, sekretion)",
          "Perkussion kan ge smärta i flera tänder",
          "Sensibilitet ofta normal"
        ],
        behandling: "Remiss ÖNH, avsvällande, eventuellt antibiotika"
      },
      {
        titel: "Parodontal abscess",
        icd: "K05.2",
        skillnader: [
          "Djup parodontal ficka (>6 mm)",
          "Svullnad i laterala omslagsvecket (ej apikalt)",
          "Röntgen: vertikal benförlust eller lateral radioluceens",
          "Sensibilitet ofta normal"
        ],
        behandling: "Dränage via ficka, antibiotika, parodontal terapi"
      },
      {
        titel: "Cracked tooth (med pulpaengagemang)",
        icd: "S02.5",
        skillnader: [
          "Smärta vid bitning/frigörande",
          "Kan ha intermittent spontansmärta",
          "Svår att lokalisera för patient",
          "Spricka kan vara djup → pulpaengagemang"
        ],
        behandling: "Ofta endodonti + krona"
      }
    ]
  },

  "sc3-apikal-parodontit": {
    id: "VARK-03-AAP",
    slug: "apikal-parodontit",
    title: "Akut apikal parodontit",
    patientUtsaga: "Det gör ont att bita ihop",
    icdCode: "K04.4",
    isAcute: true,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "VARK-03-AAP" },
      { icon: "🗣️", label: "Citat", value: "Ont vid bitning / kan inte tugga" },
      { icon: "🤕", label: "Symtomprofil", value: "Perkussionssmärta, bitömhet, ej spontansmärta" },
      { icon: "📖", label: "ICD-10", value: "K04.4 (Akut apikal parodontit)" },
      { icon: "📊", label: "Prevalens", value: "Vanligt (~20% av akuta fall)" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "Är smärtan värst vid bitning/tuggning?",
          forvantatSvar: "Ja, smärta vid occlusion"
        },
        {
          fraga: "Känns tanden \"förhöjd\" eller \"längre\" än andra tänder?",
          forvantatSvar: "Ja, klassiskt symtom"
        },
        {
          fraga: "Förekommer spontansmärta (utan bitning)?",
          forvantatSvar: "Nej eller mycket mild"
        },
        {
          fraga: "Reagerar tanden på kyla/värme?",
          forvantatSvar: "Nej (nekrotisk pulpa)"
        }
      ],
      kompletterande: [
        "Tidigare rotfyllning i tanden?",
        "Nyligen genomförd tandbehandling? (inom 1-7 dagar)",
        "Trauma mot tanden?",
        "Tagit analgetika? Effekt?"
      ]
    },
    status: {
      sensibilitet: [
        "Negativ (nekrotisk pulpa)"
      ],
      perkussion: [
        "Tydligt positiv (dunköm och bitöm)",
        "Detta är det mest tillförlitliga tecknet"
      ],
      palpation: [
        "Ofta ömt apikalt i omslagsveck",
        "Ingen eller mycket liten svullnad (om stor svullnad → abscess)"
      ],
      inspektion: [
        "Ofta tidigare fyllning eller krona",
        "Kan vara intakt yttre",
        "Ingen synlig svullnad (vid ren apikal parodontit)",
        "Kan ha missfärgning (grå/brun)"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-03-AAP",
      ickKriteria: [
        "Spontan pulserande smärta → Symtomatisk pulpit",
        "Positiv sensibilitet → pulpit, ej ren apikal parodontit",
        "Synlig svullnad + fluktuation → abscess (VARK-04)",
        "Feber + allmänpåverkan → spridd infektion"
      ],
      rtgFynd: [
        "Vidgad rothinnespalt (karakteristiskt tidigt tecken)",
        "Periapikal radioluceens (vid kronisk komponent)",
        "Ofta tidigare rotfyllning (otillräcklig eller frakturerad)",
        "Djup karies eller restauration nära pulpa"
      ],
      uteslutningar: [
        "Normal rothinnespalt OCH normal sensibilitet → annan orsak",
        "Omfattande radiolucens + svullnad → abscess"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Akutrensning (om pulpanekros)",
          indikation: "Tanden har inte tidigare rotfyllning, Pulpanekros bekräftad (negativ sensibilitet), Tanden är restaurerbar.",
          material: [
            "Kofferdam (obligatorisk)",
            "NaOCl 3%",
            "Ca(OH)₂-pasta",
            "Provisorium (Cavit/IRM)"
          ],
          metod: [
            "1. LA (kan behövas trots nekros för komfort)",
            "2. Kofferdam",
            "3. Trepanation",
            "4. Exstirpation av nekrotisk pulpa",
            "5. Försiktig rensning (undvik överinstrumentering!)",
            "6. Riklig spolning NaOCl 3%",
            "7. Ca(OH)₂-inlägg",
            "8. Provisorisk tätning"
          ],
          tid: "60-90 minuter",
          tlvKoder: "501-503 – Rotfyllning (kanaler) | 704 – Provisorisk tätning | 011 – Röntgen"
        },
        {
          titel: "Revision av rotfyllning",
          indikation: "Tanden har tidigare otillräcklig rotfyllning, Periapikalt besvär kvarstår efter primär endodonti, Ingen fraktur/perforering.",
          material: [
            "Kofferdam",
            "Lösningsmedel (Endosolv, kloroform)",
            "NaOCl 3%",
            "Nya filer",
            "Ca(OH)₂"
          ],
          metod: [
            "1. LA + kofferdam",
            "2. Avlägsna tidigare fyllning/krona",
            "3. Lokalisera kanaler",
            "4. Ta bort gammalt rotfyllningsmaterial (lösningsmedel + filer)",
            "5. Rensa kanalsystem",
            "6. Spolning",
            "7. Ca(OH)₂-inlägg",
            "8. Provisorium"
          ],
          tid: "90-120 minuter",
          tlvKoder: "511-513 – Omrotfyllning (kanaler) | 011 – Röntgen (flera)"
        },
        {
          titel: "Ocklusionsjustering (vid traumatisk ocklusionsetiologi)",
          indikation: "Tydlig traumatisk ocklusion (facetter, kontaktyta för hög), Nyligen genomförd fyllning/krona, Symtom <48 timmar, Ingen nekros (sensibilitet positiv).",
          metod: [
            "1. Identifiera prematur kontakt (artikuleringspapper)",
            "2. Slipa försiktigt bort kontakt",
            "3. Polera",
            "4. Instruera patient: mjuk kost 2-3 dagar",
            "5. Analgetika vid behov (Ibuprofen 400 mg)"
          ],
          tid: "15-20 minuter",
          tlvKoder: "431 – Ocklusionsjustering"
        },
        {
          titel: "Extraktion",
          indikation: "Tanden ej restaurerbar, Vertikal rotfraktur bekräftad, Omfattande benförlust, Patient avböjer endodonti.",
          metod: [
            "Se Scenario 02 metodbeskrivning"
          ],
          tlvKoder: "701-703 – Extraktion"
        }
      ],
      checklista: [
        "Bekräfta diagnos (sensibilitet negativ + perkussion positiv)",
        "Uteslut vertikal rotfraktur (kliniskt + rtg)",
        "Bedöm restaurerbarhet (kronsubstans, ferrule-effekt)",
        "Informera om prognos (85-90% lyckat vid AAP utan abscess)",
        "Vid revision: bedöm komplexitet → remiss specialist?",
        "Dokumentera preoperativ perkussion och palpation"
      ]
    },
    journal: [
      {
        rubrik: "Mall: AAP med akutrensning",
        mall: `Mall: AAP med akutrensning

Anamnes: Pat. anger smärta tand [nr] vid bitning sedan [tid]. Tanden känns "förhöjd". Ingen spontansmärta. Ingen tidigare endodonti i tanden.

Status:
- Tand [nr]: [Gammal fyllning / Karies / Intakt]
- Sensibilitet kyla: Negativ
- Perkussion: Tydligt positiv (bitöm)
- Palpation: Öm apikalt
- Ingen synlig svullnad

Rtg: Vidgad rothinnespalt tand [nr], periapikal radioluceens [storlek].

Bedömning: Akut apikal parodontit tand [nr], sekundär till pulpanekros.

Behandling:
- LA: Artikain 40 mg/ml + adrenalin [ml]
- Kofferdam
- Trepanation tand [nr]
- Exstirpation nekrotisk pulpa
- Försiktig rensning kanaler [1/2/3], UNDVIKER överinstrumentering
- Arbetsläng: [mm]
- Riklig spolning NaOCl 3%
- Ca(OH)₂-inlägg
- Provisorisk tätning (Cavit)

Information: Tanden kan vara öm ytterligare 2-3 dagar (normal läkning).
Analgetika: Ibuprofen 400 mg vid behov. Undvik tugga på tanden.

Planering: Återbesök om 7-14 dagar för definitiv rotfyllning.
Kontakta vid försämring (ökad svullnad/smärta).`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Symtomkontroll: 24-48 timmar (telefonkontakt)",
        "Återbesök: 7-14 dagar för definitiv rotfyllning"
      ],
      lyckadKriteria: [
        "Dag 1-2: Måttlig perkussionsömhet kvarstår (normalt)",
        "Dag 3-5: Tydlig förbättring",
        "Dag 7: Perkussion nästan normal eller u.a."
      ],
      omvardering: [
        "Ökad perkussionsömhet efter dag 3",
        "Utveckling av svullnad",
        "Feber",
        "→ Akut återbesök, överväg antibiotika"
      ]
    },
    redFlags: [
      {
        id: "rf-progression",
        title: "Indikerar övergång till abscess/spridd infektion",
        description: "Synlig svullnad utvecklas (extaoral eller intraoral), Feber >38°C, Trismus, Allmänpåverkan, Fluktuation vid palpation",
        severity: "critical"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Parodontal abscess",
        icd: "K05.2",
        skillnader: [
          "Djup parodontal ficka (>6 mm)",
          "Svullnad lateralt på roten (ej apikalt)",
          "Sensibilitet ofta normal",
          "Röntgen: vertikal benförlust"
        ],
        behandling: "Dränage via ficka, parodontal terapi"
      },
      {
        titel: "Lateral parodontal abscess (rotsårsrelaterad)",
        icd: "K05.2",
        skillnader: [
          "Svullnad längs rotens sida (ej apex)",
          "Ofta accessorisk kanal eller perforering",
          "Sensibilitet kan vara variabel",
          "Röntgen: lateral radioluceens"
        ],
        behandling: "Endodonti eller extraktion"
      },
      {
        titel: "Sinuit (överkäke)",
        icd: "J32.0",
        skillnader: [
          "Flera tänder överkäke perkussionsömma",
          "Sensibilitet normal på alla tänder",
          "Näskorrelat (sekretion, täppa)",
          "Smärta vid framåtlutning"
        ],
        behandling: "ÖNH-remiss, avsvällande"
      },
      {
        titel: "Cracked tooth (djup spricka)",
        icd: "S02.5",
        skillnader: [
          "Smärta vid bitning OCH frigörande av bett",
          "Ofta sensibilitet kvarstår (dröjande)",
          "Spricka kan visualiseras",
          "Intermittent symtomatologi"
        ],
        behandling: "Kusptäckning eller endodonti + krona"
      }
    ]
  },

  "sc4-akut-abscess": {
    id: "VARK-04-ABS",
    slug: "akut-apikal-abscess",
    title: "Akut apikal abscess / Odontogen abscess",
    patientUtsaga: "Svullnad, ömt och varmt",
    icdCode: "K04.7",
    isAcute: true,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "VARK-04-ABS" },
      { icon: "🗣️", label: "Citat", value: "Svullnad, ömt och varmt" },
      { icon: "🤕", label: "Symtomprofil", value: "Svullnad, smärta, eventuell fluktuation och feber" },
      { icon: "📖", label: "ICD-10", value: "K04.6 (Periapikal abscess med fistel), K04.7 (utan fistel)" },
      { icon: "📊", label: "Prevalens", value: "Vanligt akutfall (~15-20%)" },
      { icon: "⚠️", label: "Allvarlighetsgrad", value: "Hög – risk för spridning" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "Har du märkt svullnad i ansiktet/munnen?",
          forvantatSvar: "Ja"
        },
        {
          fraga: "När började svullnaden? Utveckling (timmar/dagar)?",
          forvantatSvar: "Viktigt: Snabb utveckling (timmar) = högre risk"
        },
        {
          fraga: "Har du feber eller frossa?",
          forvantatSvar: "Ofta ja (38-39°C)"
        },
        {
          fraga: "Kan du öppna munnen normalt?",
          forvantatSvar: "Trismus = spridning till tuggmuskulatur"
        },
        {
          fraga: "Har du svårt att svälja?",
          forvantatSvar: "Dysfagi = varning för djup halsinfektion"
        }
      ],
      kompletterande: [
        "Tidigare tandvärk i området?",
        "Spontan dränering (dålig smak, pus i munnen)?",
        "Tagit antibiotika? Vilken sort? Effekt?",
        "Immunosuppression, diabetes?"
      ]
    },
    status: {
      sensibilitet: [
        "Vanligen negativ (nekros)"
      ],
      perkussion: [
        "Ofta kraftigt positiv"
      ],
      palpation: [
        "Fluktuation: Mjuk, varfylld?",
        "Känn i omslagsvecket"
      ],
      inspektion: [
        "Extraoral: Svullnad, lokalisation, storlek, konsistens",
        "Extraoral: Hudförändring röd, varm, spänd?",
        "Extraoral: Lymfkörtlar förstorrade, ömma?",
        "Intraoral: Svullnad vestibulär, palatinal, lingual?",
        "Intraoral: Fistel dränerar spontant?",
        "Intraoral: Kausal tand identifierad?",
        "Vitalparametrar: Temperatur >38.5°C = systemisk infektion",
        "Vitalparametrar: Puls takykardi (>100/min) = systemisk reaktion"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-04-ABS",
      ickKriteria: [
        "Ingen svullnad → Inte abscess (överväg apikal parodontit)",
        "Svullnad enbart i gingiva runt tand med ficka → Parodontal abscess",
        "Svullnad i glandula parotis/submandibularis → Sialadenit",
        "Bilateral svullnad golvet + trismus + dysfagi → Ludwig's angina (AKUT SJUKHUS)"
      ],
      rtgFynd: [
        "Periapikal radioluceens (ofta stor, >5 mm)",
        "Vidgad rothinnespalt",
        "Eventuell bendestruktion",
        "Kausal tand ofta med djup karies, stor fyllning eller rotfyllning"
      ],
      uteslutningar: [
        "Konventionell röntgen visar INTE mjukvävnadsabscess väl"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Incision & Dränage (I&D) + Kausal behandling",
          indikation: "Fluktuerande abscess (pus bekräftad), Intraoral lokalisering, Patient stabil.",
          material: [
            "Skalpell #15 eller #11",
            "Kirurgisk sug",
            "Krontång",
            "Kompress/tupfer",
            "Eventuell drain (gummiband/Penrose)"
          ],
          metod: [
            "1. Bedövning: Ytbedövning (Xylocain gel). Infiltration: UNDVIK direkt i abscess. Ledningsbedövning bortom området.",
            "2. Incision: Identifiera mest fluktuerande punkt. Incision djupt (minst 1-1.5 cm). Riktning parallellt med viktiga strukturer.",
            "3. Dränage: Uttöm pus (sug + kompression). Öppna loger med sond/krontång. Spola med NaCl.",
            "4. Drain: Sätt in gummiband/Penrose om stor abscess. Fixera med sutur.",
            "5. Kausal behandling: Extraktion eller Trepanation (samma besök om möjligt)."
          ],
          tid: "20-40 min (I&D) + 20-60 min (kausal)",
          tlvKoder: "801 – Incision abscess | 701-703 – Extraktion (om utförd) | 501-503 – Trepanation/akutrensning (om utförd) | 011 – Röntgen"
        },
        {
          titel: "Antibiotika (tillägg till I&D)",
          indikation: "Systemisk påverkan (feber >38°C, frossa, allmänpåverkan), Cellulitiska tecken, Spridning till flera anatomiska rum, Immunosupprimerad patient, Trismus, Kausal tand kan ej behandlas omedelbart.",
          metod: [
            "Förstahandsval: Fenoximetylpenicillin (Kåvepenin) 1,6 g x 3 i 5–7 dagar",
            "Vid penicillinallergi: Klindamycin (Dalacin) 150 mg x 3 i 5–7 dagar",
            "Vid svår infektion/terapisvikt: PcV 1,6 g x 3 + Metronidazol 400 mg x 3 i 5–7 dagar ALT Klindamycin 150 mg x 3 + Metronidazol 400 mg x 3",
            "Vid sepsis/sjukhus: IV-antibiotika (Benzylpenicillin + Metronidazol)"
          ],
          tlvKoder: "Framgår ej av kodexempel — räknas under sjukdomsbehandling"
        },
        {
          titel: "Trepanation (dränage via rotkanalen)",
          indikation: "Tanden ska bevaras, Abscess är huvudsakligen intraossär, Kompletterar I&D.",
          metod: [
            "1. LA + kofferdam",
            "2. Trepanation",
            "3. Exstirpation",
            "4. LÄMNA kanalen öppen 24-48 timmar (dränage)",
            "5. Patient spolar med klorhexidin",
            "6. Återbesök: Ca(OH)₂-inlägg + provisorium"
          ],
          tlvKoder: "501-503 – Trepanation/rotbehandling"
        }
      ],
      checklista: [
        "Bedöm allvarlighetsgrad (KRITISKT): Liten intraoral svullnad, ingen trismus, ingen feber → Tandklinik",
        "Måttlig svullnad, lätt trismus, låg feber → Tandklinik (I&D + antibiotika + observation)",
        "Stor svullnad, trismus >10 mm, feber >38.5°C → Remiss käkkirurg samma dag",
        "Trismus <20 mm, dysfagi, bilateral svullnad golvet → AKUT SJUKHUS"
      ]
    },
    journal: [
      {
        rubrik: "Mall 1: I&D + Extraktion + Antibiotika",
        mall: `Anamnes: Pat. anger svullnad [lokalisation] sedan [tid].
Smärta, feber (mätt: [°C]), svårt att tugga.
Ingen dysfagi. Ingen andningspåverkan.
Mediciner: [Antikoagulation? Immunosuppression?]
Allergi: Nej / Ja [specificera]

Status:
Extraoralt:
- Svullnad [lokalisation], storlek ca [cm]
- Hud: Rodnad, varm, fluktuation [ja/nej]
- Lymfkörtlar: Förstorrade submandibulära bilat/unilat, ömma
- Gapförmåga: [mm] (normal >35 mm)
- Temp: [°C], Puls: [/min]
Intraoralt:
- Svullnad vestibulär/palatinal/lingual tand [nr]
- Fluktuation: Ja
- Perkussion tand [nr]: Kraftigt positiv
- Sensibilitet: Negativ
- Fistel: Nej / Ja [lokalisation]

Rtg: Periapikal radioluceens tand [nr], ca [mm].
Tanden omfattande karies/destruktion.

Bedömning: Odontogen periapikaler abscess tand [nr].
Systemisk påverkan (feber). Tanden ej restaurerbar.

Behandling:
1. Information om diagnos, behandling, risker
2. Incision & dränage:
- Ytbedövning Xylocain gel
- Ledningsbedövning [typ] med artikain + adrenalin
- Incision [lokalisation], djup ca [cm]
- Purulent dränage, ca [ml]
- Spolning NaCl
- [Drain insatt: gummiband, fixerad med sutur]
3. Extraktion:
- LA: Artikain 40 mg/ml + adrenalin [ml]
- Extraktion tand [nr] med hävlar och tång
- Alveol inspekterad, inget retinerat
- Hemostas uppnådd
- Bettamponad
4. Antibiotika ordinerat:
- Fenoximetylpenicillin (Kåvepenin) 1,6 g x 3 i 5–7 dagar
- [ALT Klindamycin 150 mg x 3 i 7 dagar vid Pc-allergi]

Information given:
- Drain tas bort om 2-3 dagar (återbesök)
- Fortsätt antibiotika hela kuren (viktigt!)
- Mjuk kost, god munhygien
- Analgetika: Ibuprofen 400-600 mg x 3
- Feber ska gå ner inom 24-48 h
- Kontakta AKUT vid: försämrad svullnad, andningssvårigheter, ökad feber, allmänpåverkan

Planering: Återbesök om 2-3 dagar (ta bort drain, kontrollera läkning). Kontakta akut vid försämring.`
      },
      {
        rubrik: "Mall 2: I&D + Trepanation (tanden bevaras)",
        mall: `[Anamnes och status som ovan]

Bedömning: Odontogen abscess tand [nr].
Tanden restaurerbar, patient önskar bevara.

Behandling:
1. I&D [som ovan]
2. Trepanation tand [nr]:
- Kofferdam
- Trepanation
- Exstirpation nekrotisk pulpa
- Kanaler [antal] rensade försiktigt
- Riklig spolning NaOCl 3%
- Kanal lämnad öppen för dränage 24-48h
- [ALT: Ca(OH)₂-inlägg + provisorium direkt]
3. Antibiotika ordinerat: [som ovan]

Information:
- Spola munnen med klorhexidin 0.2% x 2
- Undvik tugga på tanden
- Återbesök om 2 dagar för provisorisk tätning

Planering:
Återbesök 48h: Ca(OH)₂-inlägg + provisorium.
Definitiv rotfyllning om 7-14 dagar.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "24 timmar: Telefonkontakt (obligatorisk vid antibiotika)",
        "2-3 dagar: Klinisk kontroll (ta bort drain)",
        "7 dagar: Antibiotikakur avslutad, bedöm läkning"
      ],
      lyckadKriteria: [
        "24h: Feber ska gå ner, smärta minska",
        "48h: Svullnad börjar avta",
        "3-5 dagar: Tydlig förbättring, drain tas bort",
        "7 dagar: Minimal restsymtom"
      ],
      omvardering: [
        "Feber kvarstår >48h trots antibiotika",
        "Svullnad ökar",
        "Trismus utvecklas eller förvärras",
        "Dysfagi uppkommer",
        "Allmänpåverkan ökar",
        "→ Akut återbesök, överväg byte av antibiotika (terapisvikt), remiss käkkirurg/sjukhus"
      ]
    },
    redFlags: [
      {
        id: "rf-spreading",
        title: "OMEDELBAR SJUKHUSREMISS vid:",
        description: "Ludwig's angina (Bilateral svullnad golvet + trismus + dysfagi), Submandibulär abscess (Svullnad under mandibula, medial spridning), Pterygomandibulär abscess (Svår trismus + svullnad tonsillfossa), Retropharyngeal abscess (Dysfagi + nacksmärta + stelhet)",
        severity: "critical"
      },
      {
        id: "rf-sepsis",
        title: "Systemisk påverkan",
        description: "Sepsis-tecken: Temp >39°C ELLER <36°C + takykardi + hypotension, Medvetandepåverkan (Konfusion, somnolens), Kraftig allmänpåverkan",
        severity: "critical"
      },
      {
        id: "rf-complications",
        title: "Komplikationer",
        description: "Luftvägsobstruktion (Stridor, cyanös), Mediastinit (Bröstsmärta, dyspné), Kavernös sinustrombos (Orbital svullnad, synpåverkan, huvudvärk)",
        severity: "critical"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Parodontal abscess",
        icd: "K05.2",
        skillnader: [
          "Djup parodontal ficka (>6 mm)",
          "Svullnad lateralt på roten (inte apex)",
          "Sensibilitet ofta positiv",
          "Röntgen: vertikal benförlust"
        ],
        behandling: "Dränage via ficka + parodontal terapi"
      },
      {
        titel: "Perikoronit (med abscessbildning)",
        icd: "K05.3",
        skillnader: [
          "Kring delvis frambruten tand (ofta visdomstand)",
          "Inflammation i operkuläret (gingivaflikk)",
          "Ofta trismus om nederkäke",
          "Röntgen: tand delvis erupterad"
        ],
        behandling: "Spolning, antibiotika, senare extraktion"
      },
      {
        titel: "Sialadenit (körtinflammation)",
        icd: "K11.2",
        skillnader: [
          "Svullnad över glandula submandibularis/parotis",
          "Pus från körtelmynning vid massage",
          "Tänder sensibilitet normal",
          "Eventuell sialolith på röntgen"
        ],
        behandling: "Antibiotika, spolning, ÖNH-remiss"
      },
      {
        titel: "Lymfadenit (körtelinflammation)",
        icd: "L04",
        skillnader: [
          "Förstorrade lymfkörtlar utan intraoral abscess",
          "Ofta sekundärt till faryngit/tonsillit",
          "Tänder utan fynd"
        ],
        behandling: "Antibiotika, ÖNH-remiss"
      }
    ]
  },

  "sc5-cracked-tooth": {
    id: "VARK-05-CTS",
    slug: "cracked-tooth",
    title: "Cracked tooth syndrome",
    patientUtsaga: "Det ilar till när jag biter",
    icdCode: "K03.8",
    isAcute: false,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "VARK-05-CTS" },
      { icon: "🗣️", label: "Citat", value: "Det ilar till när jag biter – och gör ont precis när jag släpper" },
      { icon: "🤕", label: "Symtomprofil", value: "Skarp smärta vid tuggning/belastning, särskilt vid specifika punkter eller när bitkraften släpps" },
      { icon: "📖", label: "ICD-10", value: "K03.8 (Infraktion/Fraktur)" },
      { icon: "🦷", label: "Drabbade tänder", value: "Oftast molarer (speciellt UK första molar) och premolarer i ÖK" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "Gör det ont när du biter ihop eller när du släpper?",
          forvantatSvar: "Ofta värst precis när man släpper (release pain)"
        },
        {
          fraga: "Är smärtan skarp och kortvarig?",
          forvantatSvar: "Ja, som en elektrisk stöt vid tuggning"
        },
        {
          fraga: "Kan du peka ut tanden?",
          forvantatSvar: "Ofta svårt för patienten att lokalisera exakt vilken tand det är"
        },
        {
          fraga: "Har du bitit på något hårt nyligen?",
          forvantatSvar: "Kanske (nöt, kärna)"
        }
      ],
      kompletterande: [
        "Gnisslar/pressar du tänder? (Bruxism ökar risken)",
        "Har tanden en stor fyllning? (Försvagar tanden)"
      ]
    },
    status: {
      sensibilitet: [
        "Ofta positiv (vital pulpa)",
        "Om kraftig/dröjande reaktion kan pulpan ha tagit skada (Symtomatisk pulpit)"
      ],
      perkussion: [
        "Ska inte vara öm att knacka på. Om den är det → Misstänk spricka eller pulpit"
      ],
      palpation: [
        "Sondera noggrant runt hela tanden",
        "Normal ficka: Talar för spricka som kan behandlas",
        "Isolerad djup, smal ficka: Talar för vertikal rotfraktur"
      ],
      inspektion: [
        "Transillumination: Lys med härdljuslampa/fiberoptik. En spricka bryter ljusstrålen",
        "Färgning: Metylenblått kan penslas i kaviteten efter att fyllningen avlägsnats",
        "Fyllning: Ofta finns en stor amalgam- eller kompositfyllning (MOD)",
        "Fracfinder/Bitpinne: Låt patienten bita på en hård bomullsrulle, kusp för kusp. Positivt svar: Smärta vid belastning av en specifik kusp"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-05-CTS",
      ickKriteria: [
        "Isolerad djup ficka (>6 mm): Talar för vertikal rotfraktur (ej behandlingsbart med fyllning)",
        "Negativ sensibilitet + Apikal radiolucens: Talar för nekros (Endodonti krävs först)",
        "Tanden delad i två rörliga delar (Split tooth): Extraktion"
      ],
      rtgFynd: [
        "Obligatorisk bilddiagnostik: Apikalröntgen och Bitewing",
        "Normalt fynd: Sprickor syns sällan på vanlig röntgen om inte delarna separerat",
        "Indirekta tecken: Djupa fyllningar, Vidgning av periodontalspalten kan ses vid långvarig belastning eller pulpit"
      ],
      uteslutningar: [
        "CBCT kan ibland visualisera sprickor men används främst vid utredning av rotfrakturer"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Kusptäckande kompositfyllning (Direkt)",
          indikation: "Förstahandsval vid vital tand och mindre/medelstor spricka.",
          material: [
            "Adhesiv",
            "Komposit"
          ],
          metod: [
            "1. Anestesi & Kofferdam",
            "2. Avlägsna gammal fyllning: Inspektera botten",
            "3. Preparera: Borra ner (reducera) de belastade/sprickdrabbade kusparna med minst 2 mm",
            "4. Exkavera: Följ sprickan. Om sprickan går in i pulpan → Endodonti",
            "5. Fyllning: Bondad komposit som täcker kusparna och binder ihop väggarna"
          ],
          tlvKoder: "704-706 – Fyllning | 101/103 – Undersökning"
        },
        {
          titel: "Krona (Indirekt)",
          indikation: "Vid omfattande sprickor eller tidigare stor substansförlust.",
          metod: [
            "1. Preparation: Cirkulär preparation för krona",
            "2. Provisorium: Ett välgjort provisorium (akrylkrona) fungerar som diagnostiskt test",
            "3. Permanent krona: Cementeras om tanden är symptomfri efter en period med provisorium"
          ],
          tlvKoder: "801/804 – Krona"
        },
        {
          titel: "Endodonti + Krona",
          indikation: "Om sprickan nått pulpan eller om tanden har pulpit/nekros.",
          metod: [
            "1. Rensning: Se scenario 02",
            "2. Kusptäckning: Tanden måste förses med kusptäckande förband omedelbart"
          ],
          tlvKoder: "501-503 – Rotbehandling"
        },
        {
          titel: "Extraktion",
          indikation: "Vid vertikal rotfraktur (sprickan går ner i roten/isolerad djup ficka) eller Split tooth.",
          metod: [
            "Se Scenario 02 metodbeskrivning"
          ],
          tlvKoder: "401 – Tandextraktion"
        }
      ],
      checklista: [
        "Prognos: Informera patienten om att prognosen är osäker",
        "Kostnad: Informera om kostnad för krona vs fyllning"
      ]
    },
    journal: [
      {
        rubrik: "Mall 1 för Karies/Sprickutredning",
        mall: `Diagnos: K03.8 Misstänkt tandfraktur/Infraktion. 
Anamnes: Värk vid påbitning/release. [Ev. nattlig värk noterad -> Pulpitmisstanke]. 
Status: Fracfinder pos kusp [vilken]. Transillumination visar spricka [position]. Ingen djup ficka. 
Behandling: Avlägsnande av fyllning. 
Inspektion: Spricka synlig i kavum, ej ner i kanal. Kuspsänkning utförd. Fluorid applicerad. 
Åtgärd: Fyllning med Glasjonomer (Fuji IX) för stabilisering. 
Info: Pat informerad om att om besvär fortsätter krävs rotbehandling eller ex. Om besvär upphör planeras permanent krona/onlay.`
      },
      {
        rubrik: "Mall 2 för Kusptäckande fyllning",
        mall: `Diagnos: K03.8 Infraktion/Spricka tand XX. 
Symtom: Smärta vid påbitning/frikoppling. 
Status: Positiv Fracfinder vid belastning av mesiobuckala kuspen. Transillumination visar spricka mesialt. Sensibilitet pos. Ingen djup ficka. 
Behandling: Infiltrationsanestesi. Avlägsnande av gammal fyllning. Spricka identifierad i kavum, ej till pulpa. Kuspreducering av MB och DB kusp. 
Åtgärd: Bondad kompositfyllning med kusptäckning (Onlay-typ). Ocklusionsjustering. 
Info: Pat informerad om att tanden kan behöva rotfyllas eller krona om besvär kvarstår.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Utvärdera symtom efter 2-4 veckor"
      ],
      lyckadKriteria: [
        "Om smärtfri → Klar / Permanent krona"
      ],
      omvardering: [
        "Om kvarstående smärta → Endodonti eller Extraktion"
      ]
    },
    redFlags: [
      {
        id: "rf-deep-crack",
        title: "Djup smal ficka",
        description: "Tecken på vertikal rotfraktur",
        severity: "warning"
      },
      {
        id: "rf-pulp-symptoms",
        title: "Pulpasymtom",
        description: "Om smärtan blir spontan och molande har pulpan tagit skada",
        severity: "warning"
      },
      {
        id: "rf-vertical-fracture",
        title: "Isolerad djup ficka",
        description: "= Vertikal rotfraktur = Extraktion",
        severity: "critical"
      },
      {
        id: "rf-bleeding",
        title: "Profus blödning vid sondering",
        description: "Kan tyda på spricka ner i furkation/rot",
        severity: "warning"
      },
      {
        id: "rf-persistent-pain",
        title: "Kvarstående nattvärk efter stabilisering",
        description: "= Symtomatisk pulpit/Nekros",
        severity: "warning"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Blottade tandhalsar / Dentinhypersensitivitet",
        icd: "K03.1",
        skillnader: [
          "Smärta mer ytlig, snabbt övergående",
          "Synlig gingivarecession",
          "Normal röntgenbild",
          "Perkussion u.a."
        ],
        behandling: "Desensibilisering, fluorlack, eventuell täckning"
      },
      {
        titel: "Symtomatisk pulpit",
        icd: "K04.0",
        skillnader: [
          "Dröjande smärta (>15 sek)",
          "Kan ha sporadisk spontansmärta",
          "Värre på natten",
          "Perkussion kan vara lätt öm"
        ],
        behandling: "Endodonti eller extraktion"
      },
      {
        titel: "Symtomatisk apikal parodontit",
        icd: "K04.4",
        skillnader: [
          "Smärta vid bitning utan spontansmärta",
          "Ofta perkussionsömhet",
          "Negativ sensibilitet"
        ],
        behandling: "Endodonti eller extraktion"
      }
    ]
  },

  "sc6-postoperativ-kontakt": {
    id: "BETT-6-OCCL",
    slug: "postoperativ-kontakt",
    title: "Postoperativ kontakt / Traumatisk ocklusion",
    patientUtsaga: "Tanden känns för hög",
    icdCode: "K03.81",
    isAcute: false,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "BETT-6-OCCL" },
      { icon: "🗣️", label: "Citat", value: "Tanden känns för hög, öm att bita på och ilar vid kyla" },
      { icon: "🤕", label: "Etiologi", value: "Vanligast iatrogen orsak (för hög ny fyllning/krona)" },
      { icon: "📖", label: "Diagnos", value: "Traumatisk ocklusion. K03.81" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "När började besvären?",
          forvantatSvar: "Ofta tydligt samband med nyligen utförd fyllningsterapi eller krona"
        },
        {
          fraga: "Gör det ont när du biter ihop?",
          forvantatSvar: "Ja"
        },
        {
          fraga: "Känns tanden för hög?",
          forvantatSvar: "Ja"
        },
        {
          fraga: "Ilar det vid kyla?",
          forvantatSvar: "Ja, pulpan kan bli hypersensibel av traumat"
        }
      ],
      kompletterande: [
        "Lokalisation: Patienten kan ofta peka ut exakt vilken tand",
        "Parafunktioner: Pressar eller gnisslar patienten tänder?"
      ]
    },
    status: {
      sensibilitet: [
        "Kyla/Värme: Tanden reagerar ofta positivt och ibland hypersensibelt (ilning)",
        "Om tanden inte reagerar kan traumat ha lett till pulpanekros"
      ],
      perkussion: [
        "Tanden är ofta öm vid perkussion och tuggning"
      ],
      palpation: [
        "Tanden kan uppvisa ökad mobilitet (rörlighet) på grund av vidgad parodontalspalt"
      ],
      inspektion: [
        "Artikulationspapper: Leta efter bulls-eye eller kraftigare färgmarkeringar på den aktuella tanden",
        "Fremitus: Känn med ett finger på tanden medan patienten biter ihop. Tydlig rörlighet indikerar traumatiserande ocklusion"
      ]
    },
    diagnostik: {
      scenarioId: "BETT-6-OCCL",
      ickKriteria: [
        "Dysocklusion som inte kan verifieras kliniskt"
      ],
      rtgFynd: [
        "Apikalbild: Kan visa en vidgad parodontalspalt (rothinnespalt), särskilt apikalt och marginalt"
      ],
      uteslutningar: [
        "Ofta ses ingen apikal destruktion i det akuta skedet"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "Ocklusionsjustering",
          indikation: "Tydlig traumatisk ocklusion, Nyligen genomförd fyllning/krona, Symtom <48 timmar, Ingen nekros",
          metod: [
            "1. Identifiering: Lokalisera den prematura kontakten (höga punkten) med artikulationspapper",
            "2. Bettslipning: Slipa försiktigt bort kontakt",
            "3. Polering",
            "4. Fluorlackning: De slipade ytorna ska poleras och lackas med fluor (t.ex. Duraphat)",
            "5. Information: Informera patienten om att tanden kan vara öm i några dagar",
            "6. Avlastning: Rekommendera mjuk kost i 2–3 dagar och analgetika (NSAID, t.ex. Ibuprofen 400 mg)"
          ],
          tid: "15-30 minuter",
          tlvKoder: "431 – Ocklusionsjustering"
        }
      ],
      checklista: [
        "Dysocklusion som inte kan verifieras kliniskt: INTE slipa",
        "Kvarstående symtom: Ny bedömning krävs (kan kräva rotbehandling om pulpan tagit permanent skada)"
      ]
    },
    journal: [
      {
        rubrik: "Dokumentationsmall",
        mall: `Diagnos: K03.81 Traumatisk ocklusion. 
Anamnes: Pat söker för ömhet vid tuggning och ilningar tand [XX] efter fyllningsterapi utförd [datum]. 
Status:
Ocklusion: Prematurkontakt noterad på [kusp/fyllning] tand [XX] med artikulationspapper. Fremitus pos.
Perkussion: Öm.
Sensibilitet: Positiv kyla (hypersensibel). 
Åtgärd: Selektiv bettslipning av fyllning/tand [XX] i IP och artikulation. Kontroll att kontakten är jämn med granntänder. Polering. Fluorlack applicerat. 
Info: Pat informerad om att undvika belastning närmaste dagarna. Om ej bättre inom 1 vecka -> åter.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Återbesök vid behov (1 vecka om symtom kvarstår)"
      ],
      lyckadKriteria: [
        "Symtomfrihet efter justering",
        "Normal perkussion"
      ],
      omvardering: [
        "Symtom kvarstår efter justering",
        "Negativ sensibilitet utvecklas"
      ]
    },
    redFlags: [
      {
        id: "rf-phantom-bite",
        title: "Dysocklusion som inte kan verifieras",
        description: "Om patienten upplever att bettet är fel men du inte kan se kliniska tecken: INTE slipa",
        severity: "warning"
      },
      {
        id: "rf-persistent",
        title: "Kvarstående symtom",
        description: "Kan kräva rotbehandling om pulpan tagit permanent skada/nekrotiserat",
        severity: "warning"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Symtomatisk apikal parodontit",
        icd: "K04.4",
        skillnader: [
          "Om tanden är nekrotisk (negativ sensibilitet) är smärtan orsakad av infektion"
        ],
        behandling: "Endodonti eller extraktion"
      },
      {
        titel: "Symtomatisk pulpit",
        icd: "K04.0",
        skillnader: [
          "Om smärtan är spontan och bultande, snarare än enbart vid belastning"
        ],
        behandling: "Endodonti eller extraktion"
      },
      {
        titel: "Cracked Tooth Syndrome",
        icd: "K03.8",
        skillnader: [
          "Smärta vid frigörande av bett (rebound pain)",
          "Svårigheter att lokalisera tanden"
        ],
        behandling: "Kusptäckning eller endodonti + krona"
      },
      {
        titel: "Perikoronit",
        icd: "K05.3",
        skillnader: [
          "Kan ge liknande smärta om en antagonist biter ner i tandköttet över en visdomstand"
        ],
        behandling: "Spolning, antibiotika, senare extraktion"
      }
    ]
  },

  "sc7-dentinhypersensibilitet": {
    id: "VARK-07-SENS",
    slug: "dentinhypersensibilitet",
    title: "Dentinhypersensibilitet",
    patientUtsaga: "Ilar vid kyla & borstning",
    icdCode: "K03.1",
    isAcute: false,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "VARK-07-SENS" },
      { icon: "🗣️", label: "Citat", value: "Det ilar till skarpt vid kyla och tandborstning" },
      { icon: "🤕", label: "Symtomprofil", value: "Skarp, kortvarig smärta (ilning) vid provokation. Smärtan försvinner omedelbar (<10 sek)" },
      { icon: "📖", label: "Diagnos (ICD-10)", value: "K03.1 (Abrasion/Hypersensitivitet), K03.2 (Erosion), K03.8 (Dentinhypersensitivitet)" },
      { icon: "🦷", label: "Drabbade tänder", value: "Oftast buckala tandhalsar på premolarer och hörntänder" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "När gör det ont?",
          forvantatSvar: "När jag dricker kallt, andas in luft eller borstar tänderna"
        },
        {
          fraga: "Hur länge sitter smärtan i?",
          forvantatSvar: "Kritiskt: Det går över direkt = Hypersensitivitet. Det molvärker efteråt = Pulpit"
        },
        {
          fraga: "Har du bytt tandkräm eller borstteknik nyligen?",
          forvantatSvar: "Whitening-tandkräm kan öka besvär"
        }
      ],
      kompletterande: [
        "Konsumerar du mycket sura drycker/frukt? (Erosion)",
        "Har du sura uppstötningar/reflux? (Erosion)",
        "Borstar du hårt? Använder du eltandborste? (Abrasion)",
        "Pressar/gnisslar du tänder? (Abfraktion)"
      ]
    },
    status: {
      sensibilitet: [
        "Luftblästring: Blästra på tandhalsen. Positivt svar: Skarp smärta",
        "Sond: Skrapa försiktigt på tandhalsen (i sidled). Positivt svar: Ilning",
        "Kyla: Is/Kylspray. Ska ge snabb reaktion som klingar av direkt"
      ],
      perkussion: [
        "U.a. (Tanden ska inte vara öm att knacka på. Om den är det → Misstänk spricka eller pulpit)"
      ],
      palpation: [
        "Gingivarecession: Är rotytan blottad? (Miller klass I–IV)"
      ],
      inspektion: [
        "Erosion: Matt/glansig yta, smälta former, cupping på kuspar",
        "Abrasion: Kilformade defekter vid tandhalsen, hårda kanter",
        "Abfraktion: Djupa, smala kilformiga defekter, ofta subgingivalt",
        "Karies: Uteslut kavitet med mjukt dentin"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-07-SENS",
      ickKriteria: [
        "Kvarstående värk >15 sekunder → Pulpit",
        "Perkussionsömhet → Periapikal retning/spricka",
        "Karies → Mjukt dentin ska behandlas som karies"
      ],
      rtgFynd: [
        "Ofta ej nödvändigt om kliniska fynd är tydliga",
        "Indikation: Vid tveksamhet om karies, eller diffusa symtom för att utesluta apikal parodontit"
      ],
      uteslutningar: [
        "Bilddiagnostik ofta ej nödvändig"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "STEG 1: Icke-invasiv behandling (Desensibilisering)",
          indikation: "Förstahandsval vid måttliga besvär och grunda defekter.",
          material: [
            "Duraphat (22,6 mg/ml) eller liknande fluoridlack",
            "Gluma (glutaraldehyd-baserat medel)",
            "Tandkräm mot ilningar (innehåller ofta kaliumnitrat eller arginin)"
          ],
          metod: [
            "1. Rengöring: Putsa ytan försiktigt (pumice/pasta)",
            "2. Fluoridlackning: Applicera Duraphat på de blottade ytorna",
            "3. Desensibiliserande medel: Applicera Gluma om tillgängligt",
            "4. Instruktion: Byt till mjuk tandborste",
            "5. Instruktion: Använd tandkräm mot ilningar",
            "6. Instruktion: Massera in tandkräm på halsen till natten",
            "7. Instruktion: Undvik sura drycker"
          ],
          tlvKoder: "301 – Sjukdomsbehandling (för lackning/desensibilisering) | 111 – Information/Instruktion"
        },
        {
          titel: "STEG 2: Invasiv behandling (Fyllning)",
          indikation: "Vid djupa defekter (kilformade), risk för pulpa, eller om Steg 1 inte hjälper.",
          material: [
            "Glasjonomer (Klass V): Fuji II LC. Bra vid svår torrläggning och frisätter fluor",
            "Komposit: Flow eller vanlig. Kräver god torrläggning (kofferdam/tråd)"
          ],
          metod: [
            "1. Anestesi: Ofta nödvändigt då ytan är extremt känslig",
            "2. Preparation: Rengör ytan. Vid kilformade defekter sällan borrning",
            "3. Etsa (emalj), bonda, fyll",
            "4. Var noga med att inte lägga överskott mot gingivan"
          ],
          tlvKoder: "701-703 – Fyllning (enl. Nationella Riktlinjer prioriterad åtgärd)"
        }
      ],
      checklista: [
        "Materialval styrs av möjlighet till torrläggning och estetiska krav",
        "Torrläggning svår: Glasjonomer (RMGIC) ger bättre prognos",
        "Höga estetiska krav eller slitage: Komposit bättre långsiktig estetik"
      ]
    },
    journal: [
      {
        rubrik: "Mall för Hypersensitivitet",
        mall: `Diagnos: K03.1 Dentinhypersensitivitet (p.g.a. abrasion/retraktion) 13, 14, 23. 
Anamnes: Ilningar vid kyla/borstning. Kortvarig smärta. 
Status: Blottade tandhalsar buckalt 13, 14, 23. Ingen karies. Sonderingsöm/Luftblästeröm. Perkussion u.a. 
Behandling: Rengöring. Applicering av Duraphat-lack på tandhalsar. 
Info: Instr. mjuk borstteknik (gnuggmetod). Rek. tandkräm mot ilningar (t.ex. Sensodyne). Undvika surt. Åter om ej bättre för ev. fyllning.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Utvärdera vid nästa revision"
      ],
      lyckadKriteria: [
        "God prognos. Ilningar brukar minska med tiden (sclerosering av dentin)"
      ],
      omvardering: [
        "Om fyllning gjorts, kontrollera retention och gingival hälsa"
      ]
    },
    redFlags: [
      {
        id: "rf-pain-character",
        title: "Smärtan ändrar karaktär",
        description: "Om ilningarna övergår till molande värk eller spontan smärta har pulpan tagit skada (pulpit)",
        severity: "warning"
      },
      {
        id: "rf-erosion",
        title: "Generella erosioner",
        description: "Om generella erosioner upptäcks (t.ex. palatinalt ÖK) måste orsak (reflux/ätstörning) utredas. Remiss till läkare kan vara aktuellt",
        severity: "warning"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Erosion vs Abrasion",
        icd: "K03.2 vs K03.1",
        skillnader: [
          "Erosion: Kemisk upplösning av syror. Avrundade, mjuka former. Palatinalt ofta.",
          "Abrasion: Mekanisk nötning. Skarpa, tydliga kanter. Kilformade defekter vid tandhalsen.",
          "Erosion: Fyllningar stiger upp (stand proud). Abrasion: Fyllningen slits ned tillsammans med tanden.",
          "Erosion: Ofta intakt emaljzon (krage) vid tandköttskanten. Abrasion: Går ofta ner under tandköttskanten."
        ],
        behandling: "Båda behandlas likvärdigt med desensibilisering/fyllning"
      }
    ]
  },

  "sc8-postendo-flare-up": {
    id: "VARK-8-FLARE",
    slug: "postendo-flare-up",
    title: "Postendodontisk smärta / Flare-up",
    patientUtsaga: "Det gör ondare nu än innan ni rotfyllde!",
    icdCode: "K04.4",
    isAcute: true,
    category: "Endodonti",
    snabbOversikt: [
      { icon: "🆔", label: "Scenario-ID", value: "VARK-8-FLARE" },
      { icon: "🗣️", label: "Citat", value: "Det gör ondare nu än innan ni rotfyllde!" },
      { icon: "📈", label: "Prevalens", value: "Drabbar ca 2–20% av endodontiska behandlingar" },
      { icon: "📖", label: "Diagnos", value: "K04.4 (Akut apikal parodontit) eller K04.6 (Periapikal abscess)" }
    ],
    anamnes: {
      obligatoriska: [
        {
          fraga: "När gjordes behandlingen?",
          forvantatSvar: "0-12h förväntat, 1-3 dygn klassisk flare-up"
        },
        {
          fraga: "Har du haft ont hela tiden eller kom det plötsligt?",
          forvantatSvar: "Gradvis = inflammation, Plötslig/intensiv = abscess"
        },
        {
          fraga: "Känns tanden för lång när du biter ihop?",
          forvantatSvar: "Klassiskt tecken på periapikalt ödem"
        },
        {
          fraga: "Har du feber (>38°C) eller känner dig sjuk?",
          forvantatSvar: "Indikerar systemisk spridning"
        },
        {
          fraga: "Har du svårt att gapa?",
          forvantatSvar: "<25 mm tyder på spridning till tuggmuskulatur - Allvarligt!"
        },
        {
          fraga: "Har du svårt att svälja?",
          forvantatSvar: "Hot mot luftväg/svalg"
        }
      ],
      kompletterande: [
        "Har du svullnad någonstans? (Bukkal/lingual/extraoral?)",
        "Känns fyllningen hög när du biter?",
        "Har den tillfälliga fyllningen lossnat?"
      ]
    },
    status: {
      sensibilitet: [
        "Ofta inte testad (tanden redan behandlad)"
      ],
      perkussion: [
        "Oftast kraftigt öm vid flare-up"
      ],
      palpation: [
        "Känn i omslagsvecket. Ömhet är förväntat",
        "Fluktuation: Mjuk, rörlig, vätskefylld = Pus som MÅSTE dräneras",
        "Hård svullnad: Ödem/cellulitis. Inget att dränera via incision"
      ],
      inspektion: [
        "Provisorium/Fyllning: Sitter det kvar? Är det tätt? Är det högt?",
        "Svullnad (Avgörande!): Titta i omslagsvecket (utplånat/spänt?). Asymmetri i ansiktet?",
        "Fistulering: Finns spontan dränageöppning?",
        "Lymfkörtlar: Palpera submandibulärt/cervikalt för spridningstecken"
      ]
    },
    diagnostik: {
      scenarioId: "VARK-8-FLARE",
      ickKriteria: [
        "Rensdjup: Är det 1 mm från apex? (Överrensning orsakar mekanisk smärta)",
        "Kvalitet: Välfyllt? Finns överskott periapikalt (kemisk retning)?",
        "Missad kanal: Syns anatomi som inte bearbetats?",
        "Kvarvarande fil/separation: Tandfraktur?"
      ],
      rtgFynd: [
        "Obligatorisk: Apikalbild",
        "Kontrollera: Rensdjup, Kvalitet, Missad kanal, Periapikal lesion, Komplikation"
      ],
      uteslutningar: [
        "Normal postoperativ smärta"
      ]
    },
    behandling: {
      alternativ: [
        {
          titel: "ALT A: Smärta UTAN svullnad (Mekanisk/Kemisk retning)",
          indikation: "Finns ingen pus. Öppna INTE tanden om röntgen är OK.",
          metod: [
            "1. Information: Lugnande besked (avtar över 2-5 dagar)",
            "2. Ocklusal justering (Primär åtgärd): Slipa ner så tanden INGEN kontakt har",
            "3. Analgetika: Ibuprofen 400–600 mg + Paracetamol 1 g (3 ggr/dag i 3-5 dgr)"
          ],
          tlvKoder: "301 – Sjukdomsbehandling | 701 – Bettkorrigering"
        },
        {
          titel: "ALT B: Smärta MED lokal svullnad (Abscess)",
          indikation: "Pusansamling måste dräneras för att minska trycket.",
          metod: [
            "1. Incision: Om fluktuerande/mjuk. Snitt 1-1.5cm i omslagsveck. Skölj med saltvatten.",
            "2. Dränage via rotkanal: Om hård/diffus ELLER om tanden ej är färdigrotfylld. Kofferdam -> Öppna -> Spola (NaOCl) -> Nytt Ca(OH)2 -> FÖRSLUT",
            "3. KONTRAINDIKATION: Lämna ALDRIG tanden öppen. Closed dressing gäller alltid"
          ],
          tlvKoder: "404 – Incision av abscess | 520/521 – Akut endodontisk åtgärd"
        }
      ],
      checklista: [
        "Finns svullnad? → ALT B (Dränage)",
        "Ingen svullnad? → ALT A (Avlastning)",
        "Antibiotika INTE smärtlindring. Ges ALDRIG vid enbart lokal smärta",
        "Ja antibiotika vid: Feber >38°C + sjukdomskänsla, Trikus (<25mm), Svollna lymfkörtlar, Snabbt progressiv svullnad",
        "Antibiotika förstahandsval: PcV 1,6 g × 3 i 5–7 dagar",
        "Vid PC-allergi: Klindamycin 150 mg × 3 i 5–7 dagar (källa: Tandvårdens Läkemedel 2024–2025 / Strama)"
      ]
    },
    journal: [
      {
        rubrik: "Dokumentationsmall",
        mall: `Diagnos: K04.4 Akut apikal parodontit (Flare-up) tand [XX].
Anamnes: Rotbehandling utförd för [X] dgr sedan. Nu kraftig värk och tuggömhet. Upplever tanden som för lång. Ingen feber. Ingen svullnad. 
Status: Ingen synlig/palperbar svullnad. Kraftigt perkussionsöm (VAS 8/10). Provisoriet högt i ocklusion.
Röntgen: Apikalbild [XX]: Rotfyllning/inlägg ser adekvat ut. Vidgad perspalt.
Bedömning: Flare-up, mekanisk retning. Ej tecken på abscess.
Åtgärd: Info om förlopp. Ocklusal justering (tagen ur ocklusion). Ordinerat Ibuprofen 400mg + Alvedon 1g. 
Plan: Telefonuppföljning om 3 dagar. Åter vid försämring.`
      }
    ],
    uppfoljning: {
      tidpunkt: [
        "Utan svullnad: Klingar av över 2-5 dagar",
        "Med svullnad: Bör minska 24-48h efter dränage",
        "Med antibiotika: Förbättring förväntas inom 48-72h"
      ],
      lyckadKriteria: [
        "Smärtan reduceras",
        "Svullnad minskar",
        "Inga systemiska tecken"
      ],
      omvardering: [
        "Tilltagande svullnad",
        "Feber",
        "Gap- eller sväljsvårigheter",
        "→ Hör av dig direkt"
      ]
    },
    redFlags: [
      {
        id: "rf-fever",
        title: "Allmänpåverkan & Feber",
        description: ">38°C, sjukdomskänsla, frossa, sepsis-tecken (takykardi). Antibiotika + dränage. Ev remiss.",
        severity: "critical"
      },
      {
        id: "rf-trismus",
        title: "Trismus",
        description: "Gapförmåga <20–25 mm. Infektionen har nått tuggmuskulaturen. Akut remiss käkkirurg.",
        severity: "critical"
      },
      {
        id: "rf-dysphagia",
        title: "Dysfagi (Sväljsvårigheter)",
        description: "Smärta vid sväljning. Hot mot svalg/luftväg. Akut remiss sjukhus.",
        severity: "critical"
      },
      {
        id: "rf-respiratory",
        title: "Andningspåverkan",
        description: "Stridor, grötigt tal, måste sitta upp. LIVSHOTANDE. Larma 112!",
        severity: "critical"
      },
      {
        id: "rf-anatomic",
        title: "Anatomisk spridning",
        description: "Munbotten (Ludwig's Angina), svullnad mot ögat (Sinus cavernosus). Akut remiss sjukhus.",
        severity: "critical"
      }
    ],
    diffDiagnoser: [
      {
        titel: "Normal postoperativ smärta",
        icd: "K04.4",
        skillnader: [
          "Mild till måttlig smärta",
          "Ingen svullnad",
          "Ingen feber",
          "Klingar av över 2-5 dagar med avlastning"
        ],
        behandling: "Analgetika, ocklusal justering, observation"
      },
      {
        titel: "Fel röntgen/Överrensning",
        icd: "K04.4",
        skillnader: [
          "Röntgen visar överrensning eller kemiskt irriterande överskott",
          "Ingen svullnad eller abscess"
        ],
        behandling: "Ocklusal justering, avlastning"
      }
    ]
  }
};
