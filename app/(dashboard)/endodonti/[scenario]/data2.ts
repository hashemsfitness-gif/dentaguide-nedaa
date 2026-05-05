import { ScenarioData } from "./data1";

export const endodontiScenarios2: Record<string, ScenarioData> = {
  "cracked-tooth": {
    id: "VARK-05-CTS",
    slug: "cracked-tooth",
    title: "Cracked tooth syndrome",
    icdCode: "K03.8 (Infraktion/Fraktur)",
    isAcute: false,
    snabbOversikt: [
      { label: "Smärta", text: "Skarp smärta vid tuggning/belastning, särskilt när bitkraften släpps (rebound pain)." },
      { label: "Lokalisation", text: "Svårlokaliserat. Känslighet för kyla kan förekomma." },
      { label: "Drabbade tänder", text: "Oftast molarer (speciellt UK 1:a molar) och premolarer ÖK." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "Gör det ont när du biter ihop eller när du släpper?", a: "Ofta värst precis när man släpper (release pain)" },
        { q: "Är smärtan skarp och kortvarig?", a: "Ja, som en elektrisk stöt" },
        { q: "Kan du peka ut tanden?", a: "Ofta svårt att lokalisera" },
        { q: "Har du bitit på något hårt nyligen?", a: "Kanske" }
      ],
      kompletterande: [
        "Gnisslar/pressar du tänder?",
        "Har tanden en stor fyllning?"
      ]
    },
    status: {
      sensibilitet: "Kyla: Ofta positiv (vital). Om kraftig/dröjande = pulpaskada.",
      perkussion: "Belastningstest (Fracfinder): Smärta vid belastning av specifik kusp eller vid frikoppling.",
      palpation: "U.a. Parodontal status: Isolerad djup, smal ficka = vertikal rotfraktur (extraktion).",
      inspektion: [
        "Transillumination: Spricka bryter ljusstrålen",
        "Stor amalgam/komposit",
        "Metylenblått färgning i kavitet"
      ]
    },
    diagnostik: {
      kriterier: "Ofullständig spricka i dentinet som rör sig vid belastning. Mål: immobilisera sprickan.",
      rtg: [
        "Normalt fynd (sprickor syns sällan)",
        "Vidgning av perspalt vid långvarig belastning"
      ],
      uteslut: [
        "Isolerad djup ficka >6mm -> Vertikal rotfraktur",
        "Negativ sens + Apikal radiolucens -> Nekros (endodonti)",
        "Tanden delad i två rörliga delar -> Split tooth (extraktion)"
      ]
    },
    behandling: {
      varning: "Informera pat om osäker prognos. Sprickan kan progrediera trots krona.",
      alternativ: [
        {
          title: "Alternativ A: Kusptäckande kompositfyllning (Direkt)",
          indikation: "Vital tand, mindre/medelstor spricka.",
          metod: [
            "Avlägsna gammal fyllning, inspektera",
            "Reducera belastade kuspar minst 2 mm",
            "Bondad komposit som täcker kusparna"
          ],
          tid: "45-60 min",
          koder: "704-706"
        },
        {
          title: "Alternativ B: Krona (Indirekt)",
          indikation: "Omfattande sprickor, stor substansförlust.",
          metod: [
            "Cirkulär preparation",
            "Provisorium som diagnostiskt test",
            "Permanent krona om symtomfri"
          ],
          koder: "801, 804"
        },
        {
          title: "Alternativ C: Endodonti + Krona",
          indikation: "Sprickan nått pulpan (pulpit/nekros).",
          metod: [
            "Rensning (Se scenario 02)",
            "Kusptäckande förband omedelbart (kopparring/band)"
          ],
          koder: "501-503"
        },
        {
          title: "Alternativ D: Extraktion",
          indikation: "Vertikal rotfraktur (sprickan i roten/isolerad ficka).",
          metod: ["Extraktion"],
          koder: "401"
        }
      ]
    },
    journal: [
      {
        titel: "Mall 1: Sprickutredning (Diagnostisk exkavering)",
        text: `Diagnos: K03.8 Misstänkt tandfraktur.
Anamnes: Värk vid påbitning/release.
Status: Fracfinder pos kusp [vilken]. Transillumination visar spricka. Ingen djup ficka.
Behandling: Avlägsnande av fyllning. Spricka synlig, ej till pulpa. Kuspsänkning utförd.
Åtgärd: Fyllning med Glasjonomer (Fuji IX) för stabilisering.
Info: Pat inf om osäker prognos.`
      },
      {
        titel: "Mall 2: Kusptäckande fyllning",
        text: `Diagnos: K03.8 Infraktion.
Symtom: Smärta vid påbitning/frikoppling.
Status: Pos Fracfinder. Transillumination pos. Sens pos. Ingen djup ficka.
Behandling: LA. Avlägsna fyllning. Kuspreducering. Bondad kompositfyllning med kusptäckning. Ocklusionsjustering.`
      }
    ],
    uppfoljning: {
      text: "Utvärdera symtom efter 2-4 veckor. Smärtfri -> Permanent krona. Kvarstående smärta -> Endodonti/Extraktion."
    },
    redFlags: [
      { title: "Risk för rotfraktur", description: "Djup smal ficka, profus blödning vid sondering", type: "local" },
      { title: "Pulpaskada", description: "Pulpasymtom, kvarstående nattvärk efter stabilisering", type: "risk" }
    ],
    diffDiagnoser: [
      { namn: "Symtomatisk apikal parodontit", kod: "K04.4", skillnad: "Nekrotisk tand, spontan eller ihållande värk vid belastning." },
      { namn: "Symtomatisk pulpit", kod: "K04.0", skillnad: "Spontan och bultande, ej bara vid belastning." }
    ]
  },
  "postoperativ-kontakt": {
    id: "BETT-6-OCCL",
    slug: "postoperativ-kontakt",
    title: "Postoperativ kontakt / Traumatisk ocklusion",
    icdCode: "K07.24 (Traumatisk ocklusion)",
    isAcute: false,
    snabbOversikt: [
      { label: "Smärta", text: "Tanden känns för hög, öm att bita på och ilar vid kyla" },
      { label: "Etiologi", text: "Ofta iatrogen orsak (för hög ny fyllning/krona)" },
      { label: "Patofysiologi", text: "Överbelastning skapar inflammation i rothinnan (ödem pressar upp tanden)." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När började besvären?", a: "Ofta tydligt samband med nyligen utförd fyllning/krona" },
        { q: "Gör det ont när du biter ihop?", a: "Ja" },
        { q: "Känns tanden för hög?", a: "Ja" },
        { q: "Ilar det vid kyla?", a: "Ja (pulpan hypersensibel av traumat)" }
      ],
      kompletterande: [
        "Kan du peka ut tanden? ('Finger-pointing sign')",
        "Pressar/gnisslar du tänder?"
      ]
    },
    status: {
      sensibilitet: "Kyla/Värme: Positiv och ibland hypersensibel.",
      perkussion: "Öm vid perkussion och tuggning.",
      palpation: "Ökad mobilitet på grund av vidgad perspalt.",
      inspektion: [
        "Ocklusionsanalys (Artikulationspapper): Prematurkontakt, bulls-eye.",
        "Fremitus: Rörlighet/vibration vid hopbitning."
      ]
    },
    diagnostik: {
      kriterier: "Onormalt hög belastning. Tanden känns hög och är öm.",
      rtg: [
        "Kan visa vidgad parodontalspalt apikalt/marginalt.",
        "Ingen apikal destruktion i akut skede."
      ],
      uteslut: [
        "Om tanden är nekrotisk -> Akut apikal parodontit.",
        "Smärta spontan -> Pulpit."
      ]
    },
    behandling: {
      varning: "Om ingen dysocklusion kan verifieras kliniskt (fantom-bett), SLIPA INTE.",
      alternativ: [
        {
          title: "Bettslipning (Ocklusal justering)",
          indikation: "Prematurkontakt verifierad.",
          metod: [
            "Identifiera hög punkt med artikulationspapper",
            "Slipa försiktigt (fyllning/tand)",
            "Polera och applicera fluorlack",
            "Avlastning: mjuk kost 2-3 dgr"
          ],
          tid: "15 min",
          koder: "301"
        }
      ]
    },
    journal: [
      {
        titel: "Mall: Ocklusal justering",
        text: `Diagnos: K07.24 Traumatisk ocklusion.
Anamnes: Ömhet vid tuggning tand [XX] efter fyllningsterapi [datum].
Status: Prematurkontakt noterad på fyllning tand [XX] med artikulationspapper. Fremitus pos. Perk öm. Sens pos kyla (hypersensibel).
Åtgärd: Selektiv bettslipning av fyllning/tand i IP och artikulation. Kontroll. Polering. Fluorlack.
Info: Undvik belastning närmaste dagarna. Om ej bättre -> åter.`
      }
    ],
    uppfoljning: {
      text: "Om symtom inte försvinner efter 1-2 veckor -> ny bedömning (rotbehandling om pulpan tagit permanent skada)."
    },
    redFlags: [
      { title: "Icke-göra", description: "Dysocklusion som inte kan verifieras kliniskt ska EJ slipas (Socialstyrelsen).", type: "risk" }
    ],
    diffDiagnoser: [
      { namn: "Symtomatisk apikal parodontit", kod: "K04.4", skillnad: "Tanden nekrotisk." },
      { namn: "Cracked Tooth Syndrome", kod: "S02.5", skillnad: "Rebound pain, svårare att lokalisera." }
    ]
  },
  "dentinhypersensibilitet": {
    id: "VARK-07-SENS",
    slug: "dentinhypersensibilitet",
    title: "Dentinhypersensibilitet",
    icdCode: "K03.1 (Abrasion/Hypersensitivitet), K03.8",
    isAcute: false,
    snabbOversikt: [
      { label: "Smärta", text: "Skarp, kortvarig smärta (ilning) vid provokation (kyla, luft, beröring, sött)." },
      { label: "Tid", text: "Försvinner omedelbart (<10 sek) när retningen upphör." },
      { label: "Lokalisation", text: "Oftast buckala tandhalsar på premolarer och hörntänder." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När gör det ont?", a: "När jag dricker kallt, andas in luft, borstar tänder" },
        { q: "Hur länge sitter smärtan i?", a: "Går över direkt (<10s)" },
        { q: "Har du bytt tandkräm/borstteknik?", a: "Kanske (whitening-tandkräm)" }
      ],
      kompletterande: [
        "Sura drycker? (Erosion)",
        "Sura uppstötningar? (Erosion)",
        "Borstar hårt? (Abrasion)",
        "Gnisslar tänder? (Abfraktion)"
      ]
    },
    status: {
      sensibilitet: "Luftblästring/Sond/Kyla: Skarp smärta som klingar av direkt.",
      perkussion: "U.a. (Om öm -> misstänk spricka/pulpit).",
      palpation: "U.a.",
      inspektion: [
        "Gingivarecession (blottad rotyta)",
        "Erosion (matt/glansig, cupping)",
        "Abrasion (kilformade defekter, hårda kanter)",
        "Abfraktion (djupa, smala kildefekter)"
      ]
    },
    diagnostik: {
      kriterier: "Öppet dentin på grund av recession, erosion eller abrasion.",
      rtg: [
        "Ofta ej nödvändigt om tydlig klinisk bild."
      ],
      uteslut: [
        "Kvarstående värk >15s -> Pulpit",
        "Perkussionsömhet -> Periapikal retning/spricka",
        "Mjukt dentin -> Karies"
      ]
    },
    behandling: {
      varning: "Skilj på erosion (kemisk, smält yta) och abrasion (mekanisk, vassa kanter).",
      alternativ: [
        {
          title: "STEG 1: Icke-invasiv (Desensibilisering)",
          indikation: "Måttliga besvär, grunda defekter.",
          metod: [
            "Fluoridlackning (Duraphat)",
            "Desensibiliserande medel (Gluma)",
            "Instruktion: Mjuk borste, tandkräm mot ilningar (masseras in), undvik surt."
          ],
          koder: "301, 111"
        },
        {
          title: "STEG 2: Invasiv (Fyllning)",
          indikation: "Djupa defekter (kilformade), risk för pulpa.",
          metod: [
            "Glasjonomer (Klass V) - Bra vid svår torrläggning",
            "Komposit - Vid god torrläggning, bättre estetik"
          ],
          koder: "701-703"
        }
      ]
    },
    journal: [
      {
        titel: "Mall för Hypersensitivitet",
        text: `Diagnos: K03.1 Dentinhypersensitivitet (p.g.a. abrasion/retraktion).
Anamnes: Ilningar vid kyla/borstning. Kortvarig smärta.
Status: Blottade tandhalsar buckalt 13,14,23. Ingen karies. Sonderingsöm/Luftblästeröm. Perk u.a.
Behandling: Rengöring. Applicering av Duraphat-lack.
Info: Instr. mjuk borstteknik. Rek tandkräm mot ilningar. Undvik surt. Åter om ej bättre för ev. fyllning.`
      }
    ],
    uppfoljning: {
      text: "God prognos. Ilningar minskar med tiden (sclerosering). Uppföljning vid nästa revision."
    },
    redFlags: [
      { title: "Smärtan ändrar karaktär", description: "Övergår till molande/spontan värk = Pulpit.", type: "risk" },
      { title: "Erosionsskador", description: "Generella erosioner -> Utred orsak (reflux/ätstörning), läkarremiss.", type: "systemic" }
    ]
  },
  "postendo-smarta": {
    id: "VARK-08-FLA",
    slug: "postendo-smarta",
    title: "Postendo-smärta / flare-up",
    icdCode: "K04.4 (AAP) eller K04.6",
    isAcute: true,
    snabbOversikt: [
      { label: "Smärta", text: "Gör ondare nu än innan rotbehandlingen." },
      { label: "Tidsfönster", text: "12-48 timmar efter endodonti = flare-up." },
      { label: "Frekvens", text: "Drabbar ca 2-20% av behandlingar." }
    ],
    anamnes: {
      obligatoriska: [
        { q: "När gjordes behandlingen?", a: "0-12h förväntat, 1-3 dygn klassisk flare-up" },
        { q: "Kom smärtan plötsligt eller gradvis?", a: "Gradvis=inflammation, plötslig=abscess" },
        { q: "Känns tanden för lång vid hopbitning?", a: "Klassiskt för periapikalt ödem" }
      ],
      kompletterande: [
        "Har du feber/sjukdomskänsla?",
        "Svårt att gapa/svälja?",
        "Svullnad i ansikte/mun?"
      ]
    },
    status: {
      sensibilitet: "Ej relevant (tanden rotbehandlad).",
      perkussion: "Oftast kraftigt öm. Ocklusionskontroll: rider på provisoriet?",
      palpation: "Omslagsveck: Ömhet förväntat. Fluktuation = Pus! Hård svullnad = Ödem.",
      inspektion: [
        "Sitter provisoriet kvar och är tätt?",
        "Svullnad extra/intraoralt?",
        "Fistulering?"
      ]
    },
    diagnostik: {
      kriterier: "Infektionsexacerbation vs normal postop smärta.",
      rtg: [
        "Apikalbild: Kontrollera rensdjup (1mm från apex?), kvalitet på fyllning/inlägg, missad kanal, komplikation (filbrott)."
      ],
      uteslut: [
        "Systemisk spridning -> Feber/trismus/dysfagi (Akut sjukhus)"
      ]
    },
    behandling: {
      varning: "Kritisk beslutspunkt: Finns svullnad? Lämna ALDRIG tanden öppen ('Closed dressing').",
      alternativ: [
        {
          title: "ALT A: Smärta UTAN svullnad (Mekanisk retning)",
          indikation: "Ingen pus. Öppna INTE tanden om rtg OK.",
          metod: [
            "Information (lugnande)",
            "Ocklusal justering (Primär åtgärd) - ta ur ocklusion",
            "Analgetika (Ibuprofen + Paracetamol)"
          ],
          koder: "301, 701"
        },
        {
          title: "ALT B: Smärta MED lokal svullnad (Abscess)",
          indikation: "Pusansamling.",
          metod: [
            "Incision i omslagsveck om fluktuerande.",
            "Dränage via rotkanal om hård/tanden ej färdigrotfylld. Öppna, spola NaOCl, nytt Ca(OH)2, förslut."
          ],
          koder: "404, 520"
        }
      ],
      antibiotika: "Endast vid systemiska tecken (feber >38, trismus <25mm, svullna lymfkörtlar). PcV 1,6g x3."
    },
    journal: [
      {
        titel: "Mall: Flare-up",
        text: `Diagnos: K04.4 Akut apikal parodontit (Flare-up).
Anamnes: Rotbehandling [X] dgr sen. Kraftig värk, tuggömhet. Tanden för lång. Ingen feber/svullnad.
Status: Ingen svullnad. Kraftigt perkussionsöm. Provisoriet högt.
Rtg: Rotfyllning/inlägg adekvat. Vidgad perspalt.
Bedömning: Flare-up, mekanisk retning.
Åtgärd: Info. Ocklusal justering (tagen ur ocklusion). Ord Ibuprofen 400mg + Alvedon 1g.
Plan: Telefon 3 dgr.`
      }
    ],
    uppfoljning: {
      text: "Utan svullnad klingar av 2-5 dgr. Med svullnad minskar 24-48h efter dränage. Varning: Hör av dig vid andnings/sväljsvårigheter."
    },
    redFlags: [
      { title: "Systemisk Spridning", description: "Feber >38°C, sepsis-tecken. -> Ab + dränage", type: "systemic" },
      { title: "Trismus", description: "Gap <20-25 mm -> Käkkirurg", type: "systemic" },
      { title: "Dysfagi/Dyspné", description: "Svårt att svälja/andas -> 112 / SJUKHUS", type: "systemic" },
      { title: "Anatomisk spridning", description: "Munbotten (Ludwigs Angina), svullnad mot ögat -> Sjukhus", type: "local" }
    ]
  }
};
