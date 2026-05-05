import { RedFlag } from "@/components/scenario/RodaFlaggor";

export interface ScenarioData {
  id: string;
  slug: string;
  title: string;
  icdCode: string;
  isAcute: boolean;
  snabbOversikt: any;
  anamnes: any;
  status: any;
  diagnostik: any;
  behandling: any;
  journal: any;
  uppfoljning: any;
  diffDiagnoser?: any;
  redFlags: RedFlag[];
}

export const endodontiScenarios: Record<string, ScenarioData> = {
  "reversibel-pulpit": {
    id: "VARK-01-REV",
    slug: "reversibel-pulpit",
    title: "Reversibel pulpit",
    icdCode: "K04.0 (Reversibel pulpit), K02.1 (Dentin-karies)",
    isAcute: false,
    snabbOversikt: [
      { label: "Smärta", text: "Kortvarig ilning vid provokation (kyla, sött), klingar av snabbt (< 10-15 sek)." },
      { label: "Spontansmärta", text: "Nej." },
      { label: "Sensibilitet", text: "Positiv (ibland hypersensibel)." },
      { label: "Perkussion", text: "U.a. (ej öm)." },
      { label: "Prognos", text: "God för pulpaöverlevnad om orsak åtgärdas." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont när du dricker kallt eller äter sött?", a: "Ja (kyla > värme)" },
        { q: "Hur länge sitter smärtan i efteråt?", a: "Försvinner snabbt (< 15 sek)" },
        { q: "Har du värk när du inte äter eller dricker (spontansmärta)?", a: "Nej" },
        { q: "Har smärtan väckt dig på natten?", a: "Nej" }
      ],
      kompletterande: [
        "När började besvären?",
        "Tidigare lagad tand?",
        "Tidigare ilningar i samma tand?"
      ]
    },
    status: {
      sensibilitet: "Positiv (is/kylspray). Kan vara kraftigare än granntänder men smärtan försvinner direkt när stimulus tas bort.",
      perkussion: "Negativ (ej öm).",
      palpation: "Negativ apikalt.",
      inspektion: [
        "Karies (primär eller sekundär)",
        "Defekt fyllning / mikroläckage",
        "Blottad tandhals (se diff. diagnos)"
      ]
    },
    diagnostik: {
      kriterier: "Scenario används vid misstanke om ytlig/måttlig pulpal inflammation orsakad av karies, fyllningsläckage eller blottat dentin. Skadan är reversibel om retningen avlägsnas.",
      rtg: [
        "Apikalröntgen + Bitewing",
        "Kariesskada (i dentin men ej in i pulpa)",
        "Tät/otät fyllning",
        "Normal rothinnespalt",
        "Ingen periapikal radiolucens"
      ],
      uteslut: [
        "Kvarstående smärta >15 sek (Indikerar irreversibel pulpit)",
        "Spontansmärta / Nattvärk",
        "Perkussionsömhet (Indikerar apikal parodontit eller spricka)"
      ]
    },
    behandling: {
      varning: "Inget generellt förbud mot anestesi, men tänk på att vasokonstriktor kan minska blödning vid pulpaexponering, vilket försvårar bedömning av pulpans status (viktigt vid stegvis exkavering).",
      alternativ: [
        {
          title: "Alternativ A: Fyllningsterapi (Direkt exkavering)",
          indikation: "Karies som ej bedöms nå pulpan.",
          metod: [
            "LA (vid behov)",
            "Kofferdam (rekommenderas)",
            "Avlägsna karies / defekt fyllning",
            "Inspektera kavumgolv",
            "Applicera fyllning (Komposit / Glasjonomer)"
          ],
          tid: "30-45 minuter",
          koder: "101 (Akut undersökning), 701-706 (Fyllning), 011 (Röntgen)"
        },
        {
          title: "Alternativ B: Stegvis exkavering (Step-wise excavation)",
          indikation: "Mycket djup karies, risk för pulpaexponering (på vital tand med reversibla symtom).",
          metod: [
            "LA + Kofferdam",
            "Exkavera perifer karies helt rent (viktigt för tät förslutning!)",
            "Lämna ljust/mjukt dentin pulpanära för att undvika lesion",
            "Applicera kalciumhydroxid (Ca(OH)₂) eller MTA över djupaste partiet",
            "Tät temporär fyllning (t.ex. Glasjonomer/IRM)",
            "Vänta 6-8 veckor (låter tertiärdentin bildas)",
            "Återbesök: Ta bort temp, exkavera restkaries, permanent fyllning"
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall 1: Fyllningsterapi",
        text: `Anamnes: Pat. söker för ilningar i tand [nr] vid kyla/sött. Ingen spontansmärta. Klingar av direkt.
Status:
- Tand [nr]: Karies / defekt fyllning [yta]
- Sens kyla: Pos, klingar av direkt
- Perk: Neg
- Palp: Neg apikalt
Rtg: Karies [yta] tand [nr]. Normal perspalt.
Bedömning: Reversibel pulpit tand [nr].
Behandling:
- LA: [typ, ml]
- Exkavering av karies
- [Ev. Ca(OH)₂ som pulpasnäll isolering]
- Fyllning [material, ytor]
Info: Om smärtan övergår till ihållande värk -> åter för ev. rotbehandling.`
      }
    ],
    uppfoljning: {
      text: "Normal läkning: Ilningar kan kvarstå några dagar till veckor efter fyllning (särskilt komposit) men ska gradvis minska.\nVid försämring (spontansmärta, nattvärk): Övergått till irreversibel pulpit. Kräver endodonti."
    },
    redFlags: [
      { title: "Systemiska tecken", description: "Feber >38.5°C, Trismus, Svullnad som påverkar andning/sväljning", type: "systemic" },
      { title: "Lokala tecken", description: "Snabbt progredierande smärta (timmar), spontan blödning, uttalad perkussionsömhet, fluktuation", type: "local" },
      { title: "Riskfaktorer", description: "Immunosuppression, antikoagulantia, graviditet, bisfosfonater", type: "risk" }
    ],
    diffDiagnoser: [
      { namn: "Blottade tandhalsar / Dentinhypersensitivitet", kod: "K03.1", skillnad: "Mer ytlig, synlig recession, normal rtg, perkussion u.a." },
      { namn: "Infraktion / Spricka", kod: "S02.5", skillnad: "Smärta vid bitning/frigörande av bett. Intermittent." },
      { namn: "Symtomatisk pulpit (tidig)", kod: "K04.0", skillnad: "Dröjande smärta (>15 sek), spontansmärta, värre på natten." }
    ]
  },
  "irreversibel-pulpit": {
    id: "VARK-02-IRR",
    slug: "irreversibel-pulpit",
    title: "Irreversibel pulpit / Pulpanekros",
    icdCode: "K04.0 (Symtomatisk pulpit), K04.1 (Pulpanekros)",
    isAcute: true,
    snabbOversikt: [
      { label: "Smärta", text: "Spontan, bultande/pulserande" },
      { label: "Nattetid", text: "Ofta värre, väcker patienten" },
      { label: "Perkussion", text: "Dunköm eller bitöm (apikal påverkan)" },
      { label: "Sensibilitet", text: "Dröjande/kraftig ELLER negativ (pulpanekros)" },
      { label: "Prognos", text: "Kräver endodonti eller extraktion" },
      { label: "Primär åtgärd", text: "Akutrensning eller extraktion" }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Beskriver du smärtan som bultande/pulserande?", a: "Ja" },
        { q: "Förekommer smärtan spontant?", a: "Ja, särskilt nattetid" },
        { q: "Håller smärtan i sig flera minuter till timmar?", a: "Ja" },
        { q: "Försämras smärtan av värme eller lindras av kyla?", a: "Ofta ja vid pulpanekros" }
      ],
      kompletterande: [
        "Har smärtan väckt dig nattetid?",
        "Analgetika och effekt?",
        "Tidigare trauma/rotfyllning?"
      ]
    },
    status: {
      sensibilitet: "Symtomatisk pulpit (tidig): Positiv, KRAFTIG reaktion, dröjer >15-30 sekunder. Värme kan provocera.\nPulpanekros: Negativ eller mycket försvagad (Kyla), Negativ (Värme)",
      perkussion: "Positiv (dunköm eller bitöm). Tyder på apikal påverkan.",
      palpation: "Ofta ömt apikalt (omslagsveck).",
      inspektion: [
        "Djup karies (ofta)",
        "Stor fyllning",
        "Missfärgning (grå/brun vid nekros)",
        "Ev. fistel/svullnad"
      ]
    },
    diagnostik: {
      kriterier: "Symtomatisk pulpal inflammation eller pulpanekros. Prognosen för vitalbevarande är dålig.",
      rtg: [
        "Djup karies/fyllning med pulpanära kontakt",
        "Vidgad rothinnespalt (tidigt tecken)",
        "Periapikal radiolucens (vid etablerad)",
        "Tidigare rf"
      ],
      uteslut: [
        "Smärta endast vid kyla <10s -> reversibel",
        "Smärta endast vid bitning utan spontansmärta -> spricka/AAP",
        "Svullnad + feber + trismus -> abscess"
      ]
    },
    behandling: {
      varning: "Kontrollera medicinlista (Antikoagulantia, Bisfosfonater, Immunosuppression).",
      alternativ: [
        {
          title: "Alternativ A: Akutrensning / Pulpektomi",
          indikation: "Tanden har strategiskt värde, pat samtycker till endodonti.",
          metod: [
            "LA (Artikain 40 mg/ml + adr)",
            "Kofferdam (Obligatorisk)",
            "Trepanation",
            "Exstirpation av pulpa",
            "Rensning, riklig spolning NaOCl 3%",
            "Ca(OH)₂-inlägg till apex",
            "Provisorisk tätning (Cavit/IRM)"
          ],
          tid: "60-90 min",
          koder: "501-503, 011, 704"
        },
        {
          title: "Alternativ B: Extraktion",
          indikation: "Ej restaurerbar, pat avböjer endodonti, ekonomiska skäl.",
          metod: [
            "LA",
            "Lossa gingiva",
            "Extraktion (hävlar, tång)",
            "Kontroll alveol, bettamponad"
          ],
          tid: "20-40 min",
          koder: "701-703, 011, 706"
        }
      ],
      antibiotika: "Antibiotika ska INTE ges rutinmässigt vid pulpit/nekros. Indikationer: Feber >38C, spridningstendens, immunosupprimerad."
    },
    journal: [
      {
        titel: "Mall 1: Akutrensning",
        text: `Anamnes: Pat. anger spontan, bultande smärta tand [nr] sedan [tid]. Smärtan värst nattetid, strålar till [lokalisation]. Analgetika: Ibuprofen 400 mg x 3, måttlig effekt.
Status: Tand [nr]: Djup karies/stor fyllning. Sens kyla: Dröjande/kraftig/negativ. Perk: Positiv. Palp: Öm apikalt. Ingen svullnad.
Rtg: Djup karies tand [nr], vidgad rothinnespalt.
Bedömning: Symtomatisk pulpit / Pulpanekros tand [nr].
Behandling:
- LA: Artikain 40 mg/ml + adr [ml]
- Kofferdam, Trepanation
- Exstirpation av pulpa, Rensning till apex (kanaler [X])
- Spolning NaOCl 3%
- Ca(OH)₂-inlägg, Provisorisk tätning (Cavit)
Planering: Återbesök def rotfyllning 1-2 veckor. Ibuprofen 400 mg v.b.`
      },
      {
        titel: "Mall 2: Extraktion",
        text: `Anamnes & Status: [Som ovan] + Tand [nr] omfattande destruktion, ej restaurerbar.
Bedömning: Symtomatisk pulpit/nekros. Ej restaurerbar.
Med kontroll: Antikoagulantia/Bisfosfonater/Allergi: Nej.
Behandling:
- LA: Artikain 40 mg/ml + adr [ml]
- Extraktion tand [nr] med hävlar och tång
- Hemostas, Bettamponad 30 min
Info: Undvik spolning/sugning i såret 24 h. Ibuprofen 400-600 mg x 3 i 2-3 dgr.`
      }
    ],
    uppfoljning: {
      text: "Efter akutrensning: Återbesök 7-14 dgr. Vid försämring (ökad smärta/svullnad) -> akut åter.\nEfter extraktion: Kontroll 7 dgr v.b. Varning för alveolit (dry socket)."
    },
    redFlags: [
      { title: "Systemiska tecken", description: "Feber >38.5°C + frossa, Trismus (<20 mm), Dysfagi, Dyspné", type: "systemic" },
      { title: "Lokala tecken", description: "Snabbt progredierande svullnad, fluktuation, cellulit", type: "local" },
      { title: "Riskfaktorer", description: "Okontrollerad diabetes, Neutropeni, IV-bisfosfonater, Warfarin INR>4.0", type: "risk" }
    ],
    diffDiagnoser: [
      { namn: "Sinuit (maxillär)", kod: "J32.0", skillnad: "Smärta flera tänder, förvärras framåtlutning, sens normal." },
      { namn: "Parodontal abscess", kod: "K05.2", skillnad: "Djup ficka, svullnad lateralt, sens ofta normal." },
      { namn: "Cracked tooth", kod: "S02.5", skillnad: "Smärta vid bitning/frigörande, svårlokaliserad." }
    ]
  },
  "apikal-parodontit": {
    id: "VARK-03-AAP",
    slug: "apikal-parodontit",
    title: "Apikal parodontit",
    icdCode: "K04.4 (Akut apikal parodontit)",
    isAcute: false,
    snabbOversikt: [
      { label: "Smärta", text: "Ont vid bitning / kan inte tugga" },
      { label: "Symtom", text: "Perkussionssmärta, bitömhet, ej spontansmärta" },
      { label: "Klinisk indikation", text: "Akut inflammation periapikalt utan primär pulpal smärta (nekros)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Är smärtan värst vid bitning/tuggning?", a: "Ja" },
        { q: "Känns tanden 'förhöjd' eller längre?", a: "Ja" },
        { q: "Förekommer spontansmärta?", a: "Nej eller mycket mild" },
        { q: "Reagerar tanden på kyla/värme?", a: "Nej (nekrotisk pulpa)" }
      ],
      kompletterande: [
        "Tidigare rotfyllning?",
        "Nyligen utförd behandling?",
        "Trauma?"
      ]
    },
    status: {
      sensibilitet: "Negativ (nekrotisk pulpa).",
      perkussion: "Tydligt positiv (dunköm/bitöm). Mest tillförlitliga tecknet.",
      palpation: "Ofta ömt apikalt i omslagsveck.",
      inspektion: [
        "Tidigare fyllning/krona",
        "Kan ha missfärgning (grå/brun)"
      ]
    },
    diagnostik: {
      kriterier: "Sekundärt till pulpanekros eller iatrogen orsak.",
      rtg: [
        "Vidgad rothinnespalt (karakteristiskt tidigt tecken)",
        "Periapikal radiolucens",
        "Ofta tidigare rotfyllning/karies"
      ],
      uteslut: [
        "Spontan pulserande smärta -> Symtomatisk pulpit",
        "Synlig svullnad/fluktuation -> Abscess"
      ]
    },
    behandling: {
      varning: "Bekräfta diagnos (sens negativ + perk positiv). Uteslut vertikal rotfraktur.",
      alternativ: [
        {
          title: "Alternativ A: Akutrensning (om pulpanekros)",
          indikation: "Ej tidigare rf, nekros, restaurerbar.",
          metod: [
            "Kofferdam, Trepanation, Exstirpation",
            "Försiktig rensning (undvik överinstrumentering!)",
            "Riklig spolning NaOCl 3%",
            "Ca(OH)₂-inlägg, Provisorium"
          ],
          tid: "60-90 min",
          koder: "501-503, 704, 011"
        },
        {
          title: "Alternativ B: Revision av rotfyllning",
          indikation: "Tidigare otillräcklig rf, besvär kvarstår.",
          metod: [
            "Kofferdam, Avlägsna rf-material (lösningsmedel)",
            "Rensa, spola, Ca(OH)₂, Provisorium"
          ],
          tid: "90-120 min",
          koder: "511-513, 011"
        },
        {
          title: "Alternativ C: Ocklusionsjustering",
          indikation: "Traumatisk ocklusion, nyligen fylld/krona, sens pos.",
          metod: ["Slipa prematur kontakt", "Polera"],
          tid: "15-20 min",
          koder: "431"
        },
        {
          title: "Alternativ D: Extraktion",
          indikation: "Ej restaurerbar, vertikal rotfraktur.",
          metod: ["(Som Scenario 02)"],
          koder: "701-703"
        }
      ]
    },
    journal: [
      {
        titel: "Mall: AAP med akutrensning",
        text: `Anamnes: Smärta vid bitning tand [nr]. Tanden känns förhöjd. Ingen spontansmärta.
Status: Sens kyla: Neg. Perk: Tydligt pos. Palp: Öm apikalt.
Rtg: Vidgad rothinnespalt / periapikal radiolucens.
Bedömning: Akut apikal parodontit tand [nr].
Behandling:
- LA, Kofferdam
- Trepanation, exstirpation
- Försiktig rensning (undviker överinstrumentering)
- NaOCl 3%, Ca(OH)₂
- Provisorisk tätning (Cavit)
Plan: Åter 7-14 dgr def rf.`
      }
    ],
    uppfoljning: {
      text: "Symtomkontroll 24-48h. Dag 1-2 kan perkussionsömhet kvarstå. Dag 3-5 tydlig förbättring. Komplikationer: Svullnad/Feber -> Abscess."
    },
    redFlags: [
      { title: "Indikerar abscess/spridd", description: "Synlig svullnad utvecklas, Feber >38°C, Trismus, Allmänpåverkan, Fluktuation", type: "systemic" }
    ],
    diffDiagnoser: [
      { namn: "Parodontal abscess", kod: "K05.2", skillnad: "Djup ficka, svullnad lateralt, sens ofta normal." },
      { namn: "Lateral parodontal abscess", kod: "-", skillnad: "Ofta accessorisk kanal, lateral radiolucens." }
    ]
  },
  "akut-apikal-abscess": {
    id: "VARK-04-ABS",
    slug: "akut-apikal-abscess",
    title: "Akut apikal abscess",
    icdCode: "K04.6 (Periapikal abscess med fistel), K04.7 (utan fistel)",
    isAcute: true,
    snabbOversikt: [
      { label: "Symtom", text: "Svullnad, smärta, eventuell fluktuation och feber" },
      { label: "Allvarlighet", text: "Hög – risk för spridning" },
      { label: "Åtgärd", text: "Kräver ofta omedelbar åtgärd (incision/dränage och/eller antibiotika)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Märkt svullnad?", a: "Ja" },
        { q: "Utveckling?", a: "Snabb utveckling (timmar) = högre risk" },
        { q: "Feber/frossa?", a: "Ofta ja (38-39°C)" },
        { q: "Trismus (svårt att gapa)?", a: "Spridning till tuggmuskler" },
        { q: "Svårt att svälja (dysfagi)?", a: "Varning för djup halsinfektion" }
      ],
      kompletterande: [
        "Spontan dränering (dålig smak)?",
        "Antibiotika tagits?"
      ]
    },
    status: {
      sensibilitet: "Vanligen negativ (nekros)",
      perkussion: "Ofta kraftigt positiv",
      palpation: "Extraoralt/Intraoralt: Svullnad, fluktuation, hudförändring (röd/varm).",
      inspektion: [
        "Gapförmåga (Trismus)",
        "Svullnad i golv/mandibelvinkel = VARNING"
      ]
    },
    diagnostik: {
      kriterier: "Avgränsad varansamling sekundär till odontogen infektion.",
      rtg: [
        "Periapikal radiolucens (ofta >5 mm)",
        "Vidgad rothinnespalt",
        "Kausal tand ofta djup karies/rf"
      ],
      uteslut: [
        "Ingen svullnad -> AAP",
        "Svullnad glandula -> Sialadenit",
        "Bilateral svullnad golvet + dysfagi -> Ludwig's angina (SJUKHUS)"
      ]
    },
    behandling: {
      varning: "Kausal behandling är ALLTID prioritet. Antibiotika utan dränage = otillräckligt. \nLiten svullnad: Tandklinik. Stor svullnad/Trismus/Feber: Remiss käkkirurg. Trismus <20mm/Dysfagi: SJUKHUS.",
      alternativ: [
        {
          title: "Alternativ A: Incision & Dränage (I&D) + Kausal behandling",
          indikation: "Fluktuerande abscess, intraoral.",
          metod: [
            "Incision djupt i mest fluktuerande punkt",
            "Uttöm pus, spola",
            "Sätt in drain (gummiband/Penrose)",
            "Kausal: Extraktion eller Trepanation"
          ],
          tid: "40-100 min",
          koder: "801, 701-703, 501-503"
        },
        {
          title: "Alternativ B: Antibiotika (tillägg till I&D)",
          indikation: "Feber >38C, cellulit, spridning, immunosupprimerad, trismus.",
          metod: [
            "Förstahandsval: PcV 1,6 g x 3 i 5-7 dgr",
            "Vid pc-allergi: Klindamycin 150 mg x 3 i 5-7 dgr"
          ],
          tid: "Recept",
          koder: "-"
        },
        {
          title: "Alternativ C: Trepanation (dränage via rotkanal)",
          indikation: "Tanden ska bevaras, kompletterar I&D.",
          metod: [
            "Trepanation, exstirpation",
            "Lämna kanalen öppen 24-48 timmar (kontroversiellt)",
            "Återbesök: Ca(OH)2"
          ]
        }
      ]
    },
    journal: [
      {
        titel: "Mall 1: I&D + Extraktion + Antibiotika",
        text: `Anamnes: Svullnad [lok], Feber [C]. Gapförmåga [mm].
Status: Extraoralt: Svullnad, rodnad, fluktuation. Intraoralt: Svullnad, fluktuation, perk kraftigt pos.
Bedömning: Odontogen periapikaler abscess.
Behandling:
- I&D: Ytbedövning + Ledningsbedövning. Incision [lok], purulent dränage. Drain insatt.
- Extraktion: Tand [nr].
- Antibiotika: PcV 1,6 g x 3.
Plan: Åter om 2-3 dgr (ta bort drain). Akut v.b.`
      }
    ],
    uppfoljning: {
      text: "Telefon 24h. Återbesök 2-3 dagar (ta bort drain). Feber ska ner på 24h, svullnad avta på 48h. Om försämrad -> Remiss."
    },
    redFlags: [
      { title: "OMEDELBAR SJUKHUSREMISS", description: "Ludwig's angina (bilateral golvsvullnad+trismus+dysfagi), Pterygomandibulär abscess, Retropharyngeal abscess, Sepsis, Luftvägsobstruktion", type: "systemic" }
    ],
    diffDiagnoser: [
      { namn: "Parodontal abscess", kod: "K05.2", skillnad: "Lateral svullnad, djup ficka" },
      { namn: "Perikoronit", kod: "-", skillnad: "Kring delvis erupterad visdomstand" },
      { namn: "Sialadenit", kod: "-", skillnad: "Pus från körtelmynning, tänder u.a." }
    ]
  }
};
