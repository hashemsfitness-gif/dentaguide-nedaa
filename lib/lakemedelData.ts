export type TreatTyp = 'ok' | 'caution' | 'avoid';

export interface Behandling {
  typ: TreatTyp;
  label: string;
  text: string;
}

export interface Viktigt {
  typ: 'red' | 'yellow' | 'green' | 'blue';
  text: string;
}

export interface Interaktion {
  klass: 'C' | 'D';
  lm: string;
  text: string;
}

export interface DrugData {
  id: string;
  name: string;
  examples: string;
  cat: string;
  catColor: string;
  risk: string;
  tags: string[];
  summary: string[];
  indikation: string;
  behandlingar: Behandling[];
  viktigt: Viktigt[];
  interaktioner: Interaktion[];
  kalla: string;
}

export const lakemedelData: DrugData[] = [
  {
    id: 'waran',
    name: 'Warfarin (Waran)',
    examples: 'Waran — Vitamin K-antagonist',
    cat: 'antikoagulantia',
    catColor: 'badge-red',
    risk: 'HÖG',
    tags: ['antikoagulantia', 'blödningsrisk', 'INR', 'waran', 'warfarin', 'extraktion'],
    summary: ['⚠️ Sätt ALDRIG ut utan läkarkontakt', '✓ Extraktion möjlig vid INR ≤3 ', '❌ Mät INR senaste 24h(dygnsfärsk värde)'],
    indikation: 'Förmaksflimmer, mekanisk hjärtklaff, DVT/LE, trombofili',
    behandlingar: [
      { typ: 'ok', label: 'Extraktion enkel', text: 'Möjlig vid INR ≤3 utan utsättning. Lokal hemostas: Spongostan + Cyklokapron-kompress + tät sutur. Undvik NSAID.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert. Undvik mandibularblockad om INR >3,0 (hematom → luftvägskompression). Infiltration/intraligamentär föredras.' },
      { typ: 'ok', label: 'Parodontal behandling', text: 'Möjlig. Undvik djup subgingival scaling vid INR >3 . Lokal hemostas.' },
      { typ: 'caution', label: 'Kirurgi (flerfaldiga extr.)', text: 'INR <2,5 rekommenderas. Samordna med antikoagulationsmottagning vid komplicerad kirurgi.' },
      { typ: 'caution', label: 'Implantat', text: 'Individuell bedömning. Konsultera behandlande läkare. INR bör vara stabil.' },
      { typ: 'avoid', label: 'Sätt ut Waran', text: 'ALDRIG sätt ut utan läkarbeslut — trombosrisk kan vara livshotande.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Sätt ALDRIG ut Waran utan kontakt med behandlande läkare — trombosrisk' },
      { typ: 'red', text: 'Kontrollera INR inom 24h före ingrepp' },
      { typ: 'yellow', text: 'INR >3: skjut upp elektiv kirurgi, kontakta läkare' },
      { typ: 'yellow', text: 'Vid INR mellan 1,3 och 2,0 har patienten även påverkad koagulation' },
      { typ: 'yellow', text: 'UNDVIK NSAID (ibuprofen, naproxen) — förstärker antikoagulativ effekt' },
      { typ: 'green', text: 'Paracetamol = säkert smärtstillande val' },
      { typ: 'blue', text: 'Lokal hemostas: Spongostan + Cyklokapron + oxiderad cellulosa + tät sutur' },
      { typ: 'blue', text: 'Kompression 20–30 min. Skriftlig hemgångsinstruktion om blödning' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Metronidazol (Flagyl)', text: 'Hämmar Waran-metabolism → kraftigt förhöjt INR. Undvik kombination. Kontrollera INR.' },
      { klass: 'D', lm: 'Flukonazol (Diflucan)', text: 'Hämmar CYP2C9 → förhöjt INR. Undvik om möjligt.' },
      { klass: 'C', lm: 'Paracetamol (höga doser)', text: 'Vid >2g/dag kan INR stiga. Ok vid normala doser (≤3g/dag).' },
      { klass: 'C', lm: 'NSAID (Ibuprofen/Naproxen)', text: 'Ökad blödningsrisk via trombocythämning. Undvik.' },
      { klass: 'C', lm: 'Klindamycin', text: 'Kan påverka tarmfloran → minskad K-vitaminproduktion → stigande INR.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 4; SSTH; Janusmed; FASS Waran'
  },
  {
    id: 'noak',
    name: 'NOAK (Direkta orala antikoagulantia)',
    examples: 'Apixaban (Eliquis) · Rivaroxaban (Xarelto) · Dabigatran (Pradaxa) · Edoxaban (Lixiana)',
    cat: 'antikoagulantia',
    catColor: 'badge-red',
    risk: 'HÖG',
    tags: ['noak', 'antikoagulantia', 'eliquis', 'xarelto', 'pradaxa', 'apixaban', 'rivaroxaban', 'dabigatran', 'blödningsrisk', 'extraktion'],
    summary: ['⚠️ Inget INR-mätvärde — standardlabtest otillförlitliga', '✓ Enkla extraktioner utan utsättning möjliga', '⚠️ Tajma ingrepp: operera på dalvärde'],
    indikation: 'Förmaksflimmer, DVT/LE-profylax och behandling',
    behandlingar: [
      { typ: 'ok', label: 'Enkel extraktion (1–3 tänder)', text: 'Patienten står kvar på sin medicinering, utsättning behövs EJ. (Genomför gärna ingreppet på läkemedelsdal(6–12h efter sista dos beroende på preparat) som extra försiktighet). Lokal hemostas obligatorisk – behandlas som vid Waran-medicinering.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert. Infiltration/intraligamentär föredras. Mandibularblockad med försiktighet (hematom).' },
      { typ: 'caution', label: 'Komplicerad kirurgi (>3 tänder, benkirurgi)', text: 'Kontakta behandlande läkare om tillfällig utsättning. Vanligen 24–48h uppehåll. Individuell bedömning.' },
      { typ: 'caution', label: 'Implantat / Parodontalkirurgi', text: 'Planera med läkare. Tajmning kring dalvärde viktigt.' },
      { typ: 'avoid', label: 'NSAID', text: 'Undvik NSAID — adderar blödningsrisk via trombocythämning.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Standardlabb (INR, APTT) otillförlitliga för NOAK — undvik att förlita sig på dessa' },
      { typ: 'red', text: 'Sätt ALDRIG ut utan läkarkontakt — trombosrisk' },
      { typ: 'yellow', text: 'Tajma ingrepp vid dalvärde: Apixaban/Rivaroxaban 12h, Dabigatran 12–24h efter sista dos' },
      { typ: 'yellow', text: 'Njurfunktion avgörande: Dabigatran utsöndras 80% renalt — vid njursvikt ackumulering' },
      { typ: 'green', text: 'Paracetamol = förstahandsval smärtlindring' },
      { typ: 'green', text: 'Lokal hemostas: Spongostan + Cyklokapron-kompress + sutur' },
      { typ: 'blue', text: 'Källa: Tandvårdens Läkemedel 2024, kap. 4; SSTH; Janusmed' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'Klaritromycin', text: 'Hämmar P-gp och CYP3A4 → ökad NOAK-koncentration. Undvik.' },
      { klass: 'C', lm: 'Flukonazol', text: 'Ökad NOAK-exposition. Välj nystatin i tandvård om möjligt.' },
      { klass: 'C', lm: 'NSAID', text: 'Additiv blödningsrisk. Undvik.' },
      { klass: 'D', lm: 'Rifampicin', text: 'Kraftigt induces CYP → sänkt NOAK-effekt. Ej relevant i tandvård men observera.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 4; SSTH Riktlinje NOAK Tandvård; Janusmed'
  },
  {
    id: 'trombocythammning',
    name: 'Trombocythämmande (ASA, Klopidogrel, Tikagelor)',
    examples: 'Trombyl (ASA 75 mg) · Plavix (klopidogrel) · Brilique (tikagelor) · Dubbel trombocythämning',
    cat: 'antikoagulantia',
    catColor: 'badge-yellow',
    risk: 'MEDEL',
    tags: ['trombyl', 'klopidogrel', 'plavix', 'brilique', 'tikagelor', 'ASA', 'trombocythämmande', 'hjärt', 'blödningsrisk', 'stent'],
    summary: ['❌ Sätt ALDRIG ut DAPT under minimitiden efter stent', '✓ Enkel extraktion möjlig utan utsättning', '⚠️ Dubbel hämning: lokal hemostas extra viktigt'],
    indikation: 'Koronarsjukdom, TIA/stroke, perifer kärlsjukdom, stent',
    behandlingar: [
      { typ: 'ok', label: 'Enkel extraktion', text: 'Genomförbar utan utsättning. Lokal hemostas. Blödningen är oftast hanterbar.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert. Undvik mandibularblockad vid dubbel trombocythämning.' },
      { typ: 'caution', label: 'Dubbel trombocythämning (ASA+klopidogrel)', text: 'Ökad blödningsrisk. Lokal hemostas extra viktig. Kontakta läkare vid komplicerad kirurgi.' },
      { typ: 'avoid', label: 'Utsättning under pågående DAPT efter stent', text: 'LIVSFARA — stenttrombos. Sätt ALDRIG ut utan kardiologbeslut. ESC 2023 differentierar DAPT-duration (vanligen 1–6 mån DES vid stabil kranskärlssjukdom, 6–12 mån efter ACS, individualiserat utifrån blödnings-/ischemirisk). Vänta om möjligt med elektiv tandvård tills DAPT trappats ned.' },
      { typ: 'avoid', label: 'NSAID parallellt', text: 'Additiv trombocythämning → ökad blödningsrisk. Välj paracetamol.' },
    ],
    viktigt: [
      { typ: 'red', text: 'ALDRIG sätta ut ASA/klopidogrel under pågående DAPT efter PCI/stent — livshotande stenttrombos' },
      { typ: 'red', text: 'Informera läkare om planerad kirurgi — gemensamt beslut om utsättning' },
      { typ: 'yellow', text: 'DAPT-duration (ESC 2023): vanligen 1–6 mån DES vid stabil sjukdom, 6–12 mån efter ACS — individualiserat. Fråga kardiolog om aktuell plan.' },
      { typ: 'yellow', text: 'Dubbel trombocythämning: extra noggrann lokal hemostas, sutur, Cyklokapron' },
      { typ: 'yellow', text: 'Nyinsatt stent: skjut upp elektiv tandvård tills DAPT trappats ned om möjligt' },
      { typ: 'green', text: 'Enkel extraktion: genomförbar utan utsättning med lokal hemostas' },
      { typ: 'green', text: 'ASA-monoterapi 75 mg: ska INTE sättas ut för rutinextraktion' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID (Ibuprofen)', text: 'Additiv trombocythämning + ökad GI-blödningsrisk. Undvik.' },
      { klass: 'C', lm: 'Omeprazol', text: 'Klopidogrel: omeprazol minskar klopidogrelaktivering (CYP2C19). Välj pantoprazol.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 4; ESC 2023; Janusmed; SSTH'
  },
  {
    id: 'bisfosfonat',
    name: 'Bisfosfonater / Antiresorptiva läkemedel',
    examples: 'Alendronat (Fosamax) · Zoledronsyra (Zometa, Aclasta) · Denosumab (Prolia, Xgeva) · Ibandronsyra (Bonviva)',
    cat: 'bisfosfonat',
    catColor: 'badge-red',
    risk: 'HÖG — MRONJ-risk',
    tags: ['bisfosfonat', 'alendronat', 'zometa', 'denosumab', 'prolia', 'osteoporos', 'MRONJ', 'käkbensnekros', 'antiresorptiv', 'cancer'],
    summary: ['❌ HÖG risk MRONJ vid hög dos (cancer)', '⚠️ LÅG risk vid peroral osteoporos-dos', '⚠️ Sätt EJ ut läkemedlet — ingen evidens'],
    indikation: 'Osteoporos (låg dos peroral), skelettmetastaser/multipelt myelom (hög dos IV)',
    behandlingar: [
      { typ: 'ok', label: 'Parodontal behandling (supragingival)', text: 'Säkert. Undvik djup subgingival behandling vid hög-dos intravenös behandling.' },
      { typ: 'ok', label: 'Konservativ tandvård', text: 'Fyllningar, rotbehandling — säkert alla grupper.' },
      { typ: 'caution', label: 'Extraktion (peroral osteoporos-dos)', text: 'LÅG MRONJ-risk (<1%). Genomförbar. Atraumatisk teknik. Primär sårslutning. Enligt Tandvårdens Läkemedel 2024–2025 rekommenderas generellt ingen antibiotikaprofylax. Men beroende på patientens helhetsbild och eventuella riskfaktorer kan lokalt beslut diskuteras med kollega' },
      { typ: 'avoid', label: 'Extraktion (hög-dos IV, cancer)', text: 'HÖG MRONJ-risk (1–12%). Undvik om möjligt. Konservativ behandling. Om nödvändigt: atraumatisk teknik + antibiotikaprofylax + tät sårslutning + specialistkontakt.' },
      { typ: 'avoid', label: 'Implantat (hög-dos IV)', text: 'Kontraindicerat vid pågående IV-bisfosfonatbehandling mot cancer. Peroral osteoporos: individuell bedömning.' },
    ],
    viktigt: [
      { typ: 'red', text: 'MRONJ (Medication-Related Osteonecrosis of the Jaw) — nekrotiskt ben som ej läker' },
      { typ: 'red', text: 'Hög-risk: IV-bisfosfonat/denosumab vid cancer — MRONJ-risk 1–12%' },
      { typ: 'yellow', text: 'Låg-risk: peroral bisfosfonat vid osteoporos — MRONJ-risk <0,1%' },
      { typ: 'yellow', text: 'Behandlingsduration >3 år ökar risken ytterligare' },
      { typ: 'red', text: 'SÄTT INTE UT läkemedlet — ingen evidens att utsättning minskar MRONJ-risk' },
      { typ: 'yellow', text: 'Kortikosteroider parallellt = kraftigt ökad MRONJ-risk' },
      { typ: 'green', text: 'Förebygg: Sanera munnen INNAN start av Intravenös-behandling (2–3 veckor buffert)' },
      { typ: 'blue', text: 'MRONJ-stadier: 0 (symptom utan synligt ben) → 1 (blottat ben, ej infekt) → 2 (infekterat) → 3 (fraktur/fistel)' },
      { typ: 'blue', text: 'Källa: Tandvårdens Läkemedel 2024, kap. 16; VGR Riktlinje antiresorptiva 2024; Skånelistan 2025' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID', text: 'Additiv njurpåverkan vid IV-bisfosfonater. Välj paracetamol.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 16; VGR Regional Riktlinje antiresorptiva okt 2024; Skånelistan 2025'
  },
  {
    id: 'cytostatika',
    name: 'Cytostatika / Cancerbehandling',
    examples: 'Metotreksat · Cyklofosfamid · Docetaxel · 5-FU · Kapecitabin (Xeloda) · Platinumföreningar (Cisplatin, Karboplatin)',
    cat: 'cancer',
    catColor: 'badge-red',
    risk: 'HÖG',
    tags: ['cytostatika', 'kemoterapi', 'cancer', 'metotreksat', 'neutropeni', 'mucosit', 'immunsuppression', 'trombocytopeni'],
    summary: ['❌ INGA invasiva ingrepp vid neutropeni', '⚠️ Kontrollera blodstatus ALLTID', '❌ Mucosit — ingen irriterande behandling'],
    indikation: 'Malign sjukdom — solida tumörer, leukemi, lymfom, multipelt myelom',
    behandlingar: [
      { typ: 'ok', label: 'Konservativ tandvård (stabil period)', text: 'Möjlig när neutrofila >1,0 × 10⁹/L och TPK >50 × 10⁹/L. Planera med onkologteam.' },
      { typ: 'ok', label: 'Klorhexidin / fluorlack', text: 'Säkert. Rekommenderas för mukositprevention och kariesprofylax.' },
      { typ: 'caution', label: 'Extraktion (stabil period)', text: 'Neutrofila >1,0 och TPK >50: möjlig med antibiotikaprofylax. Kontakta onkolog/hematolog.' },
      { typ: 'avoid', label: 'Invasiva ingrepp vid neutropeni', text: 'Neutrofila <0,5 (febril neutropeni) eller TPK <50: INGA invasiva ingrepp. Remiss akut onkologteam.' },
      { typ: 'avoid', label: 'NSAID', text: 'Förstärker trombocytopeni. Njurtoxicitet (platinumföreningar). Välj paracetamol.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Neutrofila <0,5 + feber = MEDICINSK AKUT — remiss barnakut/onkolog DIREKT' },
      { typ: 'red', text: 'ALLTID kontrollera blodstatus (neutrofila, TPK) med aktuella svar (<48h) före ingrepp' },
      { typ: 'red', text: 'Mucosit (slemhinneinflammation): ingen irriterande behandling, ingen alkohol-munskölj' },
      { typ: 'yellow', text: 'Metotreksat: interaktion med NSAID och penicillin (hämmar njurutsöndring → toxicitet)' },
      { typ: 'yellow', text: '5-FU: oralmukosit vanligt — förebygg med kyling (iskubar) under infusion' },
      { typ: 'yellow', text: 'Platinumföreningar (cisplatin): nefrotoxisk — kontrollera njurfunktion, undvik NSAID' },
      { typ: 'green', text: 'Sanera munnen INNAN cytostatikastart — eliminera infektionsfoci' },
      { typ: 'blue', text: 'Munvård under behandling: klorhexidin, fluorlack, saltvatten-sköljning × 4-6/dag' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'NSAID + Metotreksat', text: 'NSAID hämmar renal utsöndring av metotreksat → allvarlig toxicitet. Kontraindicerat.' },
      { klass: 'D', lm: 'Penicillin + Metotreksat', text: 'Penicillin hämmar metotreksat-elimination. Välj klindamycin vid pc-allergi eller undvik vid höga MTX-doser.' },
      { klass: 'C', lm: 'Fluorlack (topikalt)', text: 'Säkert. Rekommenderas aktivt.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 3+16; Cancerfonden; Onkologiska kliniker riktlinjer'
  },
  {
    id: 'immunosuppressiva',
    name: 'Immunsuppressiva / Transplantation',
    examples: 'Ciklosporin (Sandimmun) · Takrolimus (Prograf) · Azatioprin (Imurel) · Mykofenolat (CellCept) · Kortikosteroider',
    cat: 'immunsuppression',
    catColor: 'badge-red',
    risk: 'HÖG',
    tags: ['immunsuppression', 'ciklosporin', 'sandimmun', 'takrolimus', 'transplantation', 'kortikosteroid', 'gingival hyperplasi', 'infektionsrisk'],
    summary: ['⚠️ Ökad infektionsrisk', '⚠️ Gingival hyperplasi (ciklosporin)', '❌ Interaktion: makrolidantibiotika'],
    indikation: 'Organtransplantation, autoimmuna sjukdomar, inflammatoriska tillstånd',
    behandlingar: [
      { typ: 'ok', label: 'Konservativ tandvård', text: 'Säkert. Noggrann munhygieninstruktion extra viktig.' },
      { typ: 'ok', label: 'Parodontal behandling', text: 'Möjlig. Antibiotika-profylax vid invasiv parodontalbehandling diskuteras med transplantationsläkare.' },
      { typ: 'caution', label: 'Extraktion', text: 'Möjlig. Antibiotikaprofylax bör diskuteras med transplantationsläkare. Atraumatisk teknik.' },
      { typ: 'caution', label: 'Gingival hyperplasi (ciklosporin)', text: 'Intensiv munhygieninstruktion. Kontakta läkare om preparatbyte möjligt (switch till takrolimus minskar hyperplasi). Gingivektomi vid behov.' },
      { typ: 'avoid', label: 'Klaritromycin/Erytromycin', text: 'Hämmar CYP3A4 → toxiska ciklosporin/takrolimus-nivåer. KONTRAINDICERAT.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Ciklosporin + Klaritromycin/Erytromycin: KONTRAINDICERAT — toxiska läkemedelsnivåer' },
      { typ: 'yellow', text: 'Ökad infektionsrisk — läkning kan vara fördröjd, infektioner kan vara allvarligare' },
      { typ: 'yellow', text: 'Kortikosteroider: binjurebarksuppression — stress-dos kan behövas vid stor kirurgi' },
      { typ: 'yellow', text: 'Gingival hyperplasi (ciklosporin, nifedipin, fenytoin) — motivera munhygien intensivt' },
      { typ: 'green', text: 'Amoxicillin/PcV säkert vid transplantation — föredra framför bredspektrumantibiotika' },
      { typ: 'blue', text: 'Kontakta alltid transplantationsläkare vid planerad kirurgi' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Klaritromycin / Erytromycin', text: 'Hämmar CYP3A4 → toxiska ciklosporin- och takrolimus-nivåer. KONTRAINDICERAT i tandvård.' },
      { klass: 'C', lm: 'Flukonazol', text: 'Hämmar CYP3A4 → ökade immunsuppressiva nivåer. Välj nystatin.' },
      { klass: 'C', lm: 'Metronidazol', text: 'Kan öka ciklosporinnivåerna. Monitora.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 3; Janusmed; Transplantationscentra riktlinjer'
  },
  {
    id: 'immunterapi',
    name: 'Immunterapi / Checkpointhämmare',
    examples: 'Nivolumab (Opdivo) · Pembrolizumab (Keytruda) · Ipilimumab (Yervoy) · Atezolizumab · Durvalumab',
    cat: 'cancer',
    catColor: 'badge-red',
    risk: 'HÖG — irAE-risk',
    tags: ['immunterapi', 'checkpoint', 'nivolumab', 'pembrolizumab', 'PD-1', 'PD-L1', 'CTLA-4', 'cancer', 'irAE', 'immunorelaterade biverkningar'],
    summary: ['⚠️ Immunrelaterade biverkningar (irAE)', '⚠️ Inte immunsupprimerade — HAR immunsystem', '❌ Kortikosteroider kan interferera med terapi'],
    indikation: 'Melanom, lungcancer, njurcancer, urotelcancer, lymfom, huvud-halscancer m.fl.',
    behandlingar: [
      { typ: 'ok', label: 'Konservativ tandvård', text: 'Säkert. Rutintandvård möjlig.' },
      { typ: 'ok', label: 'Extraktion (mellan behandlingscykler)', text: 'Genomförbar. Planera helst 1–2 veckor mellan cykel och ingrepp.' },
      { typ: 'caution', label: 'Antibiotika vid infektion', text: 'PcV/amoxicillin säkert. Forskning pågår om mikrobiom och immunterapi-respons.' },
      { typ: 'caution', label: 'Kortikosteroider (lokalt)', text: 'Triamcinolon lokalt vid oral lichen — diskutera med onkolog. Systemiska steroider kan dämpa immunterapi-effekten.' },
      { typ: 'avoid', label: 'Immunsuppressiva läkemedel utan onkologkontakt', text: 'Systemiska kortikosteroider ges vid svåra irAE av onkolog — tandläkaren ska inte initiera.' },
    ],
    viktigt: [
      { typ: 'red', text: 'irAE (immunrelaterade biverkningar): oral lichen-liknande reaktioner, ulcerationer, xerostomi' },
      { typ: 'yellow', text: 'Oral mucosit och lichenoida reaktioner är vanliga biverkningar — dokumentera i journal' },
      { typ: 'yellow', text: 'Patienten är INTE immunsupprimerad på samma sätt som transplanterade — de har ett aktivt immunsystem' },
      { typ: 'yellow', text: 'Systemiska kortikosteroider kan minska immunterapi-effekten — aldrig initiera utan onkologkontakt' },
      { typ: 'green', text: 'Klorhexidin, fluorlack och god munhygien viktigt — dessa patienter är cancersjuka' },
      { typ: 'blue', text: 'Allt ovanligt i munnen hos immunterapi-patient: informera onkolog' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'Systemiska kortikosteroider', text: 'Kan dämpa immunterapi-effekt. Initieras enbart av onkolog vid irAE.' },
    ],
    kalla: 'ESMO Riktlinjer immunterapi 2023; Cancerfonden; Janusmed'
  },
  {
    id: 'straling',
    name: 'Strålbehandling huvud-hals (Radioterapi)',
    examples: 'Strålning mot huvud-hals-regionen — tandvård kräver speciellt omhändertagande',
    cat: 'cancer',
    catColor: 'badge-red',
    risk: 'HÖG — osteoradionekros-risk',
    tags: ['strålning', 'radioterapi', 'huvud-hals', 'osteoradionekros', 'ORN', 'xerostomi', 'caries', 'mucosit', 'trismus'],
    summary: ['❌ Extraktion riskerar osteoradionekros (ORN)', '⚠️ Sanera munnen INNAN strålstart', '⚠️ Livslång ökad kariesrisk'],
    indikation: 'Orofarynxcancer, munhålecancer, salivkörtelcancer, sköldkörtelcancer m.fl.',
    behandlingar: [
      { typ: 'ok', label: 'Konservativ tandvård (efter strålning)', text: 'Säkert. Noggrann fluorprofylax. Regelbundna kontroller.' },
      { typ: 'ok', label: 'Kariesprofylax / fluorlack', text: 'Obligatorisk. Duraphat 4 × per år. Dagliga fluorskenor vid xerostomi.' },
      { typ: 'caution', label: 'Extraktion (>30 Gy mot kärlärea)', text: 'STARK ORN-risk. Hellre rotbehandla och kronamputation. Om extraktion oundviklig: atraumatisk, antibiotikaprofylax, konsult käkkirurg.' },
      { typ: 'avoid', label: 'Extraktion i bestrålat område (>50 Gy)', text: 'Undvik om möjligt — osteoradionekros-risk mycket hög. Specialistkonsult obligatorisk.' },
      { typ: 'avoid', label: 'Implantat i bestrålad käke', text: 'Kraftigt ökad implantatlossningsrisk och ORN-risk. Kontraindicerat i högdoserat område.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Osteoradionekros (ORN): käkben som ej läker efter extraktion i bestrålat område' },
      { typ: 'red', text: 'Tröskel: >30 Gy mot käkben ökar ORN-risk. >60 Gy: risk >10%' },
      { typ: 'red', text: 'SANERA MUNNEN INNAN strålstart — alla tänder med tveksam prognos extraheras med 2–3 v buffert' },
      { typ: 'yellow', text: 'Xerostomi (torr mun): permanent hos många — kariesrisk extrem livslång' },
      { typ: 'yellow', text: 'Trismus (gapsvårigheter): gäspövningar dagligen från start av strålning' },
      { typ: 'green', text: 'Fluorskena dagligen vid xerostomi. Saliversättning. Regelbundna tandvårdsbesök 3–4 × per år' },
      { typ: 'blue', text: 'Hyperbar oxygen (HBO): kan minska ORN-risk vid nödvändig kirurgi — specialistbeslut' },
    ],
    interaktioner: [],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 3; Onkologiska kliniker riktlinjer; SBU strålning'
  },
  {
    id: 'kortikosteroid',
    name: 'Kortikosteroider (systemiska)',
    examples: 'Prednisolon · Betametason (Betapred) · Dexametason · Hydrokortison · Budesonid (höga doser)',
    cat: 'immunsuppression',
    catColor: 'badge-yellow',
    risk: 'MEDEL–HÖG',
    tags: ['kortikosteroid', 'prednisolon', 'betapred', 'steroid', 'immunsupprimerad', 'binjurebark', 'astma', 'reumatoid', 'RA'],
    summary: ['⚠️ Binjurebarksuppression vid >10mg >3 veckor', '⚠️ Försenad läkning, ökad infektionsrisk', '⚠️ Stress-dos vid stor kirurgi'],
    indikation: 'Reumatoid artrit, astma, IBD, SLE, transplantation, allergireaktioner',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert vid stabil dos.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert.' },
      { typ: 'caution', label: 'Extraktion / Kirurgi', text: 'Kontrollera dos och duration. Fråga om patienten haft binjurebarkssuppression. Vid stor kirurgi — stress-dos kan behövas (kontakt med läkare).' },
      { typ: 'caution', label: 'Infektionsrisk', text: 'Ökad. Antibiotikaprofylax kan vara motiverad vid invasiva ingrepp om hög dos (>20mg prednisolon/dag).' },
      { typ: 'avoid', label: 'NSAID', text: 'Additiv GI-ulkusrisk + försämrad sårläkning. Välj paracetamol.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Binjurebarksuppression: >10 mg prednisolon/dag i >3 veckor → HPA-axeln supprimerad' },
      { typ: 'red', text: 'Risk: binjurebarkkris vid kirurgisk stress om endogen kortisol-respons uteblir' },
      { typ: 'yellow', text: 'Stress-dos: kontakta läkare vid planerad stor kirurgi (>3 extraktioner, benkirurgi)' },
      { typ: 'yellow', text: 'Försenad sårläkning och ökad infektionsrisk — observera noga postoperativt' },
      { typ: 'yellow', text: 'Inhalationssteroider (höga doser Pulmicort): oral candidos vanligt — instruera sköljning med vatten' },
      { typ: 'green', text: 'Paracetamol är säkert smärtstillande val' },
      { typ: 'blue', text: 'Oral candidos vid steroidinhalator: Nystimex 4 ml × 4 i 4 veckor' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID', text: 'Additiv GI-ulkusrisk. Undvik.' },
      { klass: 'C', lm: 'Flukonazol', text: 'Hämmar CYP3A4 → ökade kortikosteroidnivåer.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 3; FASS Prednisolon; Janusmed'
  },
  {
    id: 'betablockerare',
    name: 'Betablockerare',
    examples: 'Metoprolol (Seloken, Metoprolol) · Atenolol · Bisoprolol (Emconcor) · Karvedilol · Propranolol (icke-selektiv)',
    cat: 'hjarta',
    catColor: 'badge-yellow',
    risk: 'LÅG–MEDEL',
    tags: ['betablockerare', 'metoprolol', 'atenolol', 'bisoprolol', 'hjärtsvikt', 'hypertoni', 'hjärtrytm', 'adrenalin', 'lokalanestesi'],
    summary: ['⚠️ Icke-selektiva: undvik adrenalin', '✓ Selektiva (β1): artikain med adrenalin ok', '⚠️ Karvedilol/Propranolol: non-selektiva'],
    indikation: 'Hypertoni, hjärtsvikt, angina, arytmi, thyreoidea',
    behandlingar: [
      { typ: 'ok', label: 'Selektiva β1-blockerare (metoprolol, atenolol, bisoprolol) + artikain', text: 'Artikain med adrenalin (1:100 000) säkert vid selektiva β1-blockerare. Max 2–3 cylinderampuller åt gången.' },
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert. Tandläkartress kan utlösa reflexbradykardi — lugn miljö.' },
      { typ: 'caution', label: 'Icke-selektiva (propranolol, karvedilol) + adrenalin', text: 'Risk: obalans α/β-stimulering → hypertensiv reaktion. Begränsa adrenalin. Max 1 cylinderampull.' },
      { typ: 'caution', label: 'Synkope-risk', text: 'Betablockerare dämpar kompensatorisk hjärtrespons. Behandla i halvliggande/liggande läge.' },
      { typ: 'avoid', label: 'Gingival retraktion med adrenalinimpregnerad tråd', text: 'Signifikant systemisk adrenalinabsorption — undvik vid betablockerare.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'Icke-selektiva betablockerare (propranolol, karvedilol) + adrenalin → risk hypertensiv reaktion' },
      { typ: 'green', text: 'Selektiva β1 (metoprolol, atenolol, bisoprolol): artikain med adrenalin säkert i normala doser' },
      { typ: 'yellow', text: 'Adrenalinimpregnerad retraktion: undvik — signifikant systemisk absorption' },
      { typ: 'blue', text: 'Max adrenalin-dos: 100 µg per behandlingstillfälle (Tandvårdens Läkemedel 2024, kap. 11)' },
      { typ: 'green', text: 'Mepivakain utan adrenalin: alltid ett alternativ vid tveksamhet' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'Adrenalin (icke-selektiv β-blockad)', text: 'Reflexiv hypertension och bradykardi pga obalansad α-stimulering. Begränsa adrenalin.' },
      { klass: 'C', lm: 'NSAID', text: 'Kan motverka antihypertensiv effekt av betablockerare.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 11; Janusmed; FASS Seloken'
  },
  {
    id: 'antidepressiva',
    name: 'SSRI / Antidepressiva',
    examples: 'Sertralin (Zoloft) · Citalopram (Cipramil) · Escitalopram (Lexapro) · Fluoxetin (Fontex) · Venlafaxin (Efexor) · Duloxetin',
    cat: 'psykiatri',
    catColor: 'badge-yellow',
    risk: 'LÅG–MEDEL',
    tags: ['SSRI', 'sertralin', 'citalopram', 'antidepressiva', 'depression', 'blödningsrisk', 'xerostomi', 'bruxism'],
    summary: ['⚠️ Ökad blödningsrisk via trombocythämning', '⚠️ Xerostomi och bruxism vanligt', '✓ NSAID ej kontraindicerat men extra försiktigt'],
    indikation: 'Depression, ångestsyndrom, OCD, PTSD, panikstörning',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert.' },
      { typ: 'caution', label: 'Extraktion + NSAID', text: 'SSRI + NSAID: additiv blödningsrisk (båda hämmar trombocytaggregation). Kortast möjliga NSAID-kur. Informera om ökad blödningsrisk.' },
      { typ: 'caution', label: 'Xerostomi-hantering', text: 'Salivstimulerande, fluorprofylax, undvik alkoholbaserade munskölj. Nystimex vid candidos.' },
      { typ: 'caution', label: 'Bruxism', text: 'SSRI ger bruxism hos ~8% av patienter. Betaskena kan vara indicerat.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'SSRI hämmar trombocytaggregation via 5-HT-hämning → ökad blödningsrisk' },
      { typ: 'yellow', text: 'SSRI + NSAID + antikoagulantia = trippelkombination med hög blödningsrisk' },
      { typ: 'yellow', text: 'Xerostomi: kraftigt ökad kariesrisk — intensifierad fluor och egenvård' },
      { typ: 'yellow', text: 'Bruxism: kan orsaka tändslitage, frakturer, TMD — fråga aktivt' },
      { typ: 'blue', text: 'Fluoxetin/Fluvoxamin: hämmar CYP2D6/CYP3A4 — kan påverka artikainnivåer marginellt (ej kliniskt relevant vid normala doser)' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID', text: 'Additiv blödningsrisk via trombocythämning. Kortast möjliga kur.' },
      { klass: 'D', lm: 'Tramadol', text: 'Risk för serotonergt syndrom vid kombination med SSRI. Undvik tramadol.' },
      { klass: 'C', lm: 'Kodein (svag opioid)', text: 'Fluoxetin/Paroxetin hämmar CYP2D6 → utebliven effekt av kodein (konverteras ej till morfin). Välj morfin direkt.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS Sertralin; Strama'
  },
  {
    id: 'litium',
    name: 'Litium',
    examples: 'Lithionit, Litium · Används vid bipolär sjukdom',
    cat: 'psykiatri',
    catColor: 'badge-red',
    risk: 'HÖG — smalt terapeutiskt fönster',
    tags: ['litium', 'bipolär', 'psykiatri', 'NSAID', 'interaktion', 'smalt terapeutiskt fönster'],
    summary: ['❌ NSAID kan ge litiumtoxicitet', '✓ Paracetamol säkert', '⚠️ Smalt terapeutiskt fönster'],
    indikation: 'Bipolär affektiv störning, recidiverande depression',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert.' },
      { typ: 'ok', label: 'PcV / Amoxicillin', text: 'Säkert.' },
      { typ: 'caution', label: 'Extraktion', text: 'Möjlig. Välj paracetamol postoperativt.' },
      { typ: 'avoid', label: 'NSAID (ibuprofen, naproxen)', text: 'KONTRAINDICERAT — NSAID minskar renal litiumutsöndring → litiumtoxicitet. Risk allvarlig.' },
      { typ: 'avoid', label: 'Metronidazol', text: 'Kan öka litiumkoncentration. Undvik om möjligt.' },
    ],
    viktigt: [
      { typ: 'red', text: 'NSAID + Litium = litiumtoxicitet — KONTRAINDICERAT' },
      { typ: 'red', text: 'Smalt terapeutiskt fönster: terapeutisk nivå 0,6–1,0 mmol/L, toxisk >1,5 mmol/L' },
      { typ: 'red', text: 'Litiumtoxicitet: tremor, konfusion, njurpåverkan — kan bli allvarligt' },
      { typ: 'green', text: 'Paracetamol = ENDA säkra smärtlindring vid litiumbehandling' },
      { typ: 'yellow', text: 'Torra tabletter: xerostomi vanlig biverkan — fluorprofylax viktig' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'NSAID (Ibuprofen/Naproxen)', text: 'Minskar renal litiumutsöndring → toxiska nivåer. KONTRAINDICERAT.' },
      { klass: 'C', lm: 'Metronidazol', text: 'Kan öka litiumkoncentration. Undvik.' },
      { klass: 'C', lm: 'Tetracyklin', text: 'Kan öka litiumkoncentration.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS Lithionit'
  },
  {
    id: 'maoi',
    name: 'MAO-hämmare Monoaminoxidashämmare (MAOI), depression & parkinsson',
    examples: 'Fenelzin · Tranylcypromin · Moklobemid (Aurorix) · Selegilin (Parkinsons)',
    cat: 'psykiatri',
    catColor: 'badge-red',
    risk: 'HÖG — interaktionsrisk',
    tags: ['MAOI', 'MAO-hämmare', 'adrenalin', 'lokalanestesi', 'moklobemid', 'selegilin', 'parkinson', 'depression'],
    summary: ['❌ Icke-selektiva MAOI + adrenalin: krävs försiktighet och dosanpassning ', '⚠️ Moklobemid (reversibel): försiktighet', '✓ Mepivakain utan adrenalin: säkert'],
    indikation: 'Atypisk depression, Parkinsons (selegilin)',
    behandlingar: [
      { typ: 'ok', label: 'Mepivakain utan adrenalin', text: 'Säkert alternativ. Välj alltid vid MAOI-behandling.' },
      { typ: 'caution', label: 'Moklobemid (reversibel MAOI) + artikain', text: 'Teoretisk risk. Begränsa adrenalin. Aspirera noggrant. Konsultera vid tveksamhet.' },
      { typ: 'avoid', label: 'Icke-selektiv MAOI + adrenalin/efedrin', text: 'dosanpassning kan krävas — risk för hypertensiv kris, arytmi. Välj mepivakain utan adrenalin.' },
      { typ: 'avoid', label: 'Tramadol + MAOI', text: 'Risk för serotonergt syndrom. Livshotande. Kräver dosanpassning/stor försiktighet.' },
      { typ: 'avoid', label: 'Kodein / Opioider + MAOI', text: 'Serotonergt syndrom risk. Undvik.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Icke-selektiv MAOI + vasokonstriktor (adrenalin, efedrin): dosanpassning kan krävas— hypertensiv kris' },
      { typ: 'red', text: 'Tramadol + MAOI = serotonergt syndrom — livshotande' },
      { typ: 'yellow', text: 'Moklobemid (reversibel, selektiv): lägre risk — begränsa adrenalin, aspirera' },
      { typ: 'green', text: 'Mepivakain 30 mg/ml utan adrenalin: alltid säkert alternativ' },
      { typ: 'blue', text: 'Selegilin vid låg dos (Parkinson-dos): selektiv MAO-B-hämmare — lägre risk' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'Adrenalin + icke-selektiv MAOI', text: 'Hypertensiv kris. Kräver dosanpassning/stor försiktighet.' },
      { klass: 'D', lm: 'Tramadol + MAOI', text: 'Serotonergt syndrom. KONTRAINDICERAT.' },
      { klass: 'C', lm: 'Petidin + MAOI', text: 'Livshotande reaktion. Välj morfin (med försiktighet).' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 11; Janusmed; FASS'
  },
  {
    id: 'diabetes',
    name: 'Diabetesläkemedel',
    examples: 'Insulin · Metformin · SGLT-2-hämmare (Jardiance, Forxiga) · GLP-1 (Ozempic, Victoza) · Sulfonylureider (Glibenklamid)',
    cat: 'diabetes',
    catColor: 'badge-yellow',
    risk: 'MEDEL',
    tags: ['diabetes', 'insulin', 'metformin', 'SGLT2', 'ozempic', 'hypoglykemi', 'sårläkning', 'parodontit'],
    summary: ['⚠️ Hypoglykemi-risk vid fasta + tandbehandling', '⚠️ Försämrad sårläkning vid dålig glukoskontroll', '✓ NSAID försiktighet vid metformin + njurpåverkan'],
    indikation: 'Typ 1 och typ 2 diabetes mellitus',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert. Planera helst på förmiddagen när blodsockret är stabilt.' },
      { typ: 'ok', label: 'Extraktion / Kirurgi (välkontrollerad DM)', text: 'Genomförbar. HbA1c <53 mmol/mol = välkontrollerad (Socialstyrelsen NR Diabetes 2018 behandlingsmål). HbA1c 53–70 = acceptabelt för rutinkirurgi. Normal läkning förväntas.' },
      { typ: 'caution', label: 'Kirurgi (dålig glukoskontroll)', text: 'HbA1c >70 mmol/mol: ökad infektionsrisk och fördröjd läkning. Planera med läkare. Antibiotikaprofylax kan vara motiverat vid >80 mmol/mol eller invasiv kirurgi.' },
      { typ: 'caution', label: 'Fasta inför sedering', text: 'Insulin + fasta = hypoglykemirisk. Informera läkare/patient. Justera insulindos. Ha druvsocker/juice redo.' },
      { typ: 'avoid', label: 'NSAID + SGLT-2-hämmare (Jardiance)', text: 'NSAID kan försämra njurfunktion och öka DKA-risk. Välj paracetamol.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Akut hypoglykemi under behandling: AVBRYT — ge druvsocker/juice om vaken, 112 om medvetslös' },
      { typ: 'yellow', text: 'SGLT-2-hämmare (Jardiance, Forxiga): risk för DKA vid stress/fasta/ingrepp — kontakta läkare' },
      { typ: 'yellow', text: 'Dålig glukoskontroll: försämrad neutrofilfunktion → ökad infektionsrisk, fördröjd läkning' },
      { typ: 'yellow', text: 'Parodontit och diabetes: bidirektionellt samband — behandla parodontit aktivt' },
      { typ: 'green', text: 'Välkontrollerad DM (HbA1c <53 mmol/mol): normal tandvård utan extra åtgärder. HbA1c 53–70: rutintandvård OK, dokumentera.' },
      { typ: 'blue', text: 'SGLT-2-hämmare: pausa 3–5 dagar före stor kirurgi (DKA-risk) — kontakta läkare' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID + Metformin', text: 'NSAID kan minska renal metforminutsöndring vid njurpåverkan. Välj paracetamol.' },
      { klass: 'C', lm: 'NSAID + SGLT-2-hämmare', text: 'Additiv njurpåverkan + DKA-risk. Välj paracetamol.' },
      { klass: 'C', lm: 'Kortikosteroider', text: 'Höjer blodsockret — informera diabetespatient.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; Diabetesförbundet; SBU Diabetes'
  },
  {
    id: 'fenytoin',
    name: 'Fenytoin (Antiepileptika)',
    examples: 'Fenytoin (Leponex, Dilantin) · Karbamazepin (Tegretol) · Valproat (Ergenyl, Depakine) · Lamotrigin',
    cat: 'psykiatri',
    catColor: 'badge-yellow',
    risk: 'MEDEL',
    tags: ['fenytoin', 'antiepileptika', 'karbamazepin', 'valproat', 'epilepsi', 'gingival hyperplasi', 'anfall'],
    summary: ['⚠️ Fenytoin: gingival hyperplasi', '⚠️ Valproat: trombocytopeni', '⚠️ Karbamazepin: interaktioner'],
    indikation: 'Epilepsi, neuralgier (karbamazepin vid trigeminusneuralgi), bipolär (valproat)',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert. Intensiv munhygien extra viktig vid fenytoin.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert.' },
      { typ: 'caution', label: 'Kirurgi + valproat', text: 'Valproat kan ge trombocytopeni och koagulationspåverkan — kontrollera TPK och koagulation.' },
      { typ: 'caution', label: 'Gingival hyperplasi (fenytoin)', text: 'Gingivektomi kan behövas. Kontakta läkare om preparatbyte möjligt. Intensiv munhygien minskar graden av hyperplasi.' },
      { typ: 'avoid', label: 'Makrolidantibiotika + karbamazepin', text: 'Klaritromycin/erytromycin hämmar CYP3A4 → toxiska karbamazepinnivåer. Kontraindicerat.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'Fenytoin: gingival hyperplasi hos ~50% — motivera munhygien intensivt, gingivektomi vid behov' },
      { typ: 'yellow', text: 'Valproat: påverkar trombocytfunktion och kan ge trombocytopeni — kontrollera TPK' },
      { typ: 'red', text: 'Karbamazepin + Klaritromycin/Erytromycin: KONTRAINDICERAT — toxiska nivåer' },
      { typ: 'blue', text: 'Karbamazepin är förstahandsval vid trigeminusneuralgi — tandläkaren ska INTE starta' },
      { typ: 'green', text: 'PcV/amoxicillin: säkert. Metronidazol: interaktion med karbamazepin — undvik.' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Klaritromycin + Karbamazepin', text: 'Toxiska karbamazepinnivåer. KONTRAINDICERAT.' },
      { klass: 'C', lm: 'Metronidazol + Karbamazepin', text: 'Kan öka karbamazepinnivåer. Undvik.' },
      { klass: 'C', lm: 'Metronidazol + Fenytoin', text: 'Kan öka fenytoin-nivåer. Undvik.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS Tegretol'
  },
  {
    id: 'nifedipin',
    name: 'Kalciumantagonister (Nifedipin, Amlodipin)',
    examples: 'Nifedipin (Adalat) · Amlodipin (Norvasc) · Felodipin (Plendil) · Verapamil · Diltiazem',
    cat: 'hjarta',
    catColor: 'badge-yellow',
    risk: 'LÅG–MEDEL',
    tags: ['nifedipin', 'amlodipin', 'kalciumantagonist', 'hypertoni', 'gingival hyperplasi', 'hjärt', 'adrenalin'],
    summary: ['⚠️ Nifedipin/amlodipin: gingival hyperplasi', '✓ Lokalanestesi säkert', '⚠️ Verapamil/Diltiazem: interaktioner'],
    indikation: 'Hypertoni, angina pectoris, hjärtrytmstörningar (verapamil, diltiazem)',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert.' },
      { typ: 'ok', label: 'Lokalanestesi med adrenalin', text: 'Säkert vid normala doser. Ingen kliniskt relevant interaktion.' },
      { typ: 'caution', label: 'Gingival hyperplasi (nifedipin/amlodipin)', text: 'Förekommer hos ~10–15%. Intensiv munhygien. Kontakta läkare om byte till annat antihypertensivum (ACE-hämmare, ARB) är möjligt.' },
      { typ: 'caution', label: 'Verapamil/Diltiazem + Klaritromycin', text: 'Hämmar CYP3A4 → förhöjda verapamil/diltiazemdoser → bradykardi, hypotension. Undvik kombination.' },
      { typ: 'avoid', label: 'Gingival retraktion med adrenalinsnöre', text: 'Undvik vid okontrollerad hypertoni.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'Nifedipin och amlodipin: gingival hyperplasi — ofta underdiagnostiserad. Kontrollera alltid patienter på dessa läkemedel' },
      { typ: 'red', text: 'Verapamil/Diltiazem + Klaritromycin: UNDVIK — bradykardi och hypotension' },
      { typ: 'green', text: 'Amlodipin är nu vanligaste orsaken till läkemedelsinducerad gingival överväxt' },
      { typ: 'blue', text: 'Gingivektomi vid behov — men förebygg med intensiv munhygien' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Verapamil + Klaritromycin', text: 'Bradykardi och hypotension. Undvik.' },
      { klass: 'C', lm: 'Amlodipin + Flukonazol', text: 'Ökade amlodipinnivåer. Välj nystatin.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS Adalat/Norvasc'
  },
  {
    id: 'bisfosfonat_iv',
    name: 'Denosumab (Prolia / Xgeva)',
    examples: 'Prolia (osteoporos) · Xgeva (cancerrelaterad bensjukdom)',
    cat: 'bisfosfonat',
    catColor: 'badge-red',
    risk: 'HÖG (Xgeva) / MEDEL (Prolia)',
    tags: ['denosumab', 'prolia', 'xgeva', 'antiresorptiv', 'MRONJ', 'osteoporos', 'cancer', 'RANKL'],
    summary: ['❌ Xgeva: HÖG MRONJ-risk (jämförbar med IV-bisfosfonat)', '⚠️ Prolia: LÅG-MEDEL MRONJ-risk', '⚠️ Reversibel — effekt klingar av efter utsättning'],
    indikation: 'Prolia: osteoporos. Xgeva: skelettmetastaser, jättecellstumör',
    behandlingar: [
      { typ: 'ok', label: 'Konservativ tandvård', text: 'Säkert alla grupper.' },
      { typ: 'caution', label: 'Extraktion (Prolia/osteoporos)', text: 'LÅG–MEDEL MRONJ-risk. Möjlig med atraumatisk teknik. Diskutera timing med förskrivande läkare (halvår-intervall subkutana injektioner).' },
      { typ: 'avoid', label: 'Extraktion (Xgeva/cancer)', text: 'HÖG MRONJ-risk jämförbar med IV-bisfosfonat. Undvik om möjligt. Specialistkonsult. Antibiotikaprofylax + primär sårslutning obligatorisk.' },
      { typ: 'avoid', label: 'Implantat (Xgeva)', text: 'Kontraindicerat.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Xgeva (RANKL-hämmare vid cancer): MRONJ-risk 0,7–1,9% — behandla som IV-bisfosfonat' },
      { typ: 'yellow', text: 'Prolia (osteoporos): MRONJ-risk <0,1% — behandla med försiktighet men genomförbar tandvård' },
      { typ: 'yellow', text: 'Denosumab är reversibelt — effekt klingar av 6 månader efter sista dos (till skillnad från bisfosfonater som är permanenta)' },
      { typ: 'green', text: 'Sanera munnen INNAN start av Xgeva-behandling' },
      { typ: 'blue', text: 'Källa: VGR Riktlinje antiresorptiva 2024; Skånelistan 2025; Tandvårdens Läkemedel 2024, kap. 16' },
    ],
    interaktioner: [],
    kalla: 'Tandvårdens Läkemedel 2024–2025, kap. 16; VGR Regional Riktlinje antiresorptiva okt 2024; Skånelistan 2025'
  },
  {
    id: 'ace',
    name: 'ACE-hämmare / ARB',
    examples: 'Enalapril (Renitec) · Ramipril (Triatec) · Losartan (Cozaar) · Valsartan (Diovan) · Candesartan (Atacand)',
    cat: 'hjarta',
    catColor: 'badge-green',
    risk: 'LÅG',
    tags: ['ACE-hämmare', 'ARB', 'enalapril', 'ramipril', 'losartan', 'hypertoni', 'hjärtsvikt', 'hosta', 'angioödem'],
    summary: ['✓ Lokal anestesi säkert', '⚠️ NSAID motverkar blodtryckssänkning', '⚠️ Angioödem (sällsynt men allvarligt)'],
    indikation: 'Hypertoni, hjärtsvikt, diabetesnefropati, post-MI',
    behandlingar: [
      { typ: 'ok', label: 'All rutintandvård', text: 'Säkert. Ingen specifik anpassning krävs.' },
      { typ: 'ok', label: 'Lokalanestesi med adrenalin', text: 'Säkert.' },
      { typ: 'ok', label: 'Extraktion / Kirurgi', text: 'Säkert. Normal hantering.' },
      { typ: 'caution', label: 'NSAID-ordination', text: 'NSAID kan motverka blodtryckssänkande effekten och försämra njurfunktionen vid ACE+ARB. Kortast möjliga NSAID-kur.' },
      { typ: 'caution', label: 'Angioödem', text: 'Sällsynt men allvarlig biverkan av ACE-hämmare. Vid svullnad av läppar/tunga/svalg: AVBRYT tandvård, ring 112, ge adrenalin om anafylaksi-bild.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'Angioödem: sällsynt men allvarligt — ACE-hämmare är vanligaste läkemedelsorsaken' },
      { typ: 'yellow', text: 'NSAID: motverkar antihypertensiv effekt + nephrotoxicitet vid ACE+diuretika (triple whammy)' },
      { typ: 'green', text: 'I övrigt: ACE-hämmare/ARB ger ingen specifik tandvårdsrisk' },
      { typ: 'blue', text: 'Hosta (torr, irriterande) är vanlig biverkan av ACE-hämmare — fråga patienten' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'NSAID + ACE-hämmare + Diuretika', text: '"Triple whammy" — additiv njurpåverkan. Undvik kombination. Välj paracetamol.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS'
  },
  {
    id: 'hiv',
    name: 'HIV-läkemedel (ART)',
    examples: 'Tenofovir · Emtricitabin · Dolutegravir (Tivicay) · Atazanavir · Ritonavir · Biktarvy · Truvada',
    cat: 'immunsuppression',
    catColor: 'badge-yellow',
    risk: 'MEDEL',
    tags: ['HIV', 'AIDS', 'ART', 'antiretroviral', 'dolutegravir', 'ritonavir', 'CD4', 'immunsupprimerad'],
    summary: ['⚠️ CD4 <200: ökad infektionsrisk', '⚠️ Ritonavir: kraftiga läkemedelsinteraktioner', '✓ Välkontrollerad HIV: normal tandvård'],
    indikation: 'HIV-infektion',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård (CD4 >200)', text: 'Normal tandvård. Välkontrollerad HIV = låg risk.' },
      { typ: 'ok', label: 'Extraktion (CD4 >200, viral load <50)', text: 'Möjlig. Normal hantering.' },
      { typ: 'caution', label: 'CD4 <200 / Immunsupprimerad', text: 'Ökad infektionsrisk. Antibiotikaprofylax diskuteras. Kontakta HIV-läkare.' },
      { typ: 'caution', label: 'Oral candidos', text: 'Vanligare vid HIV. Nystimex. Screeningsfråga om candidos.' },
      { typ: 'avoid', label: 'Ritonavir + Klaritromycin i hög dos', text: 'Ritonavir är kraftig CYP-inhibitor — klaritromycin-nivåerna kan stiga. Välj amoxicillin/PcV.' },
    ],
    viktigt: [
      { typ: 'yellow', text: 'Kontrollera senaste CD4-tal och viral load (journalkopia) vid planerad kirurgi' },
      { typ: 'red', text: 'Ritonavir: KRAFTIG CYP3A4-inhibitor — interagerar med många läkemedel' },
      { typ: 'yellow', text: 'Candida, aphthösa ulcera och parodontit: vanligare vid HIV — screeningsfråga aktivt' },
      { typ: 'green', text: 'Välkontrollerad HIV (viral load <50, CD4 >500): ingen extra tandvårdsrisk' },
      { typ: 'blue', text: 'PcV och amoxicillin: säkert och föredras framför klaritromycin' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Ritonavir + Klaritromycin (hög dos)', text: 'Kraftigt förhöjda klaritromycin-nivåer. Välj amoxicillin/PcV.' },
      { klass: 'C', lm: 'Ritonavir + Flukonazol', text: 'Ökad flukonazol-exposition. Välj nystatin.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; Infektionsläkarföreningens riktlinjer'
  },
  {
    id: 'osteoporos_hormon',
    name: 'Östrogen / Hormonbehandling',
    examples: 'Klimakteriehormon (Activelle, Divina) · P-piller · Tamoxifen · Letrozol · Anastrozol',
    cat: 'ovrigt',
    catColor: 'badge-yellow',
    risk: 'LÅG–MEDEL',
    tags: ['östrogen', 'hormon', 'p-piller', 'tamoxifen', 'letrozol', 'anastrozol', 'bröstcancer', 'trombosrisk'],
    summary: ['⚠️ P-piller: antibiotika påverkar EJ effektiviteten (modern forskning)', '⚠️ Tamoxifen/Letrozol: xerostomi', '✓ Normal tandvård för de flesta'],
    indikation: 'Klimakteriebesvär, antikonception, bröstcancer-hormonterapi',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert för alla grupper.' },
      { typ: 'ok', label: 'Extraktion', text: 'Normal hantering.' },
      { typ: 'caution', label: 'Antibiotika + p-piller', text: 'Modern forskning: antibiotika i tandvårdsdoser påverkar INTE p-pillereffektiviteten. Rutinrådgivning ej längre motiverad (Tandvårdens Läkemedel 2024).' },
      { typ: 'caution', label: 'Tamoxifen/Letrozol (bröstcancer)', text: 'Xerostomi vanlig biverkan. Intensifierad fluorprofylax. Salivstimulerande medel.' },
    ],
    viktigt: [
      { typ: 'green', text: 'Ny evidens: antibiotika i vanliga doser påverkar INTE p-pillereffektiviteten — rutinrådgivning ej nödvändig (Tandvårdens Läkemedel 2024)' },
      { typ: 'yellow', text: 'Tamoxifen/Letrozol vid bröstcancer: xerostomi vanlig — kariesprevention viktig' },
      { typ: 'blue', text: 'Letrozol/Anastrozol (aromatashämmare): kan minska benmineraltäthet — ökad frakturisk inkl. käkben' },
    ],
    interaktioner: [],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS'
  },
  {
    id: 'opioidsubstitution',
    name: 'Opioidsubstitution (Methadon, Buprenorfin)',
    examples: 'Metadon (Methadone) · Buprenorfin (Subutex, Suboxone) · Buprenorfin/Naloxon (Suboxone)',
    cat: 'psykiatri',
    catColor: 'badge-red',
    risk: 'HÖG',
    tags: ['opioidsubstitution', 'methadon', 'metadon', 'buprenorfin', 'subutex', 'suboxone', 'LARO', 'beroende', 'QT-förlängning', 'xerostomi'],
    summary: ['⚠️ Standardopioiddoser otillräckliga p.g.a. tolerans', '⚠️ Methadon: QT-förlängning — undvik QT-förlängande antibiotika', '⚠️ Buprenorfin (partiell agonist): blockerar effekt av andra opioider'],
    indikation: 'Substitutionsbehandling vid opioidberoende (LARO), kronisk smärta (off-label)',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert. Patienterna har ofta gravt försämrad munstatus — kariesprevention och parodontal behandling extra viktig.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert. Adrenalin OK i normala doser.' },
      { typ: 'caution', label: 'Postoperativ smärtlindring', text: 'Tolerans → standarddoser otillräckliga. Maximera icke-opioid: paracetamol 1g × 4 + NSAID (om ej kontraindicerat). Vid behov: korta kurer (1–3 dagar) av extra opioid i samråd med LARO-mottagning — ALDRIG på recept utan kontakt.' },
      { typ: 'caution', label: 'Methadon + QT-förlängande antibiotika', text: 'Methadon förlänger QT — undvik klaritromycin/erytromycin (additiv effekt, torsades de pointes-risk). Välj PcV eller amoxicillin.' },
      { typ: 'avoid', label: 'Receptförskrivning av opioider utan LARO-kontakt', text: 'Återfallsrisk + ansvarsproblem. Kontakta alltid LARO-mottagning vid eventuellt opioidbehov.' },
      { typ: 'avoid', label: 'Buprenorfin + full opioidagonist', text: 'Buprenorfin är partiell agonist med hög receptoraffinitet — blockerar effekt av morfin/oxikodon och kan utlösa abstinens.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Methadon förlänger QT-intervallet — undvik kombinationer med klaritromycin/erytromycin (risk torsades de pointes)' },
      { typ: 'red', text: 'Förskriv ALDRIG opioider på recept utan kontakt med LARO-mottagning — återfallsrisk + dubbelt uttag' },
      { typ: 'yellow', text: 'Tolerans: standarddoser (t.ex. kodein 30 mg) ger ingen smärtlindring. Maximera paracetamol + NSAID.' },
      { typ: 'yellow', text: 'Buprenorfin (partiell agonist): blockerar full agonist (morfin, oxikodon). Inget värde att kombinera.' },
      { typ: 'yellow', text: 'Xerostomi och bruxism vanligt — kraftigt ökad kariesrisk. Intensiv fluorprofylax (Duraphat × 4/år).' },
      { typ: 'green', text: 'Paracetamol 1g × 4 + ibuprofen 400 mg × 3 = effektiv multimodal smärtlindring även hos toleranta patienter' },
      { typ: 'blue', text: 'LARO = Läkemedelsassisterad Rehabilitering vid Opioidberoende. Kontaktuppgifter i journalkopia eller via Beroendecentrum.' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Methadon + Klaritromycin/Erytromycin', text: 'Additiv QT-förlängning + CYP3A4-hämning → torsades de pointes-risk. Välj PcV/amoxicillin.' },
      { klass: 'C', lm: 'Methadon + Flukonazol', text: 'CYP3A4-hämning → höjda metadonnivåer. Välj nystatin.' },
      { klass: 'C', lm: 'Buprenorfin + Bensodiazepiner', text: 'Andningsdepression. Undvik sedering med midazolam utan anestesiolog.' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; Socialstyrelsen LARO-föreskrifter; FASS Metadon/Subutex'
  },
  {
    id: 'glp1',
    name: 'GLP-1-agonister (Ozempic, Wegovy, Mounjaro)',
    examples: 'Semaglutid (Ozempic, Wegovy, Rybelsus) · Liraglutid (Victoza, Saxenda) · Tirzepatid (Mounjaro) · Dulaglutid (Trulicity)',
    cat: 'diabetes',
    catColor: 'badge-yellow',
    risk: 'MEDEL — sederingsrisk',
    tags: ['GLP-1', 'semaglutid', 'ozempic', 'wegovy', 'liraglutid', 'tirzepatid', 'mounjaro', 'sedering', 'aspirationsrisk', 'fasta', 'obesitas', 'diabetes'],
    summary: ['⚠️ Fördröjd magsäckstömning → aspirationsrisk vid sedering', '✓ Rutintandvård utan sedering: säkert', '⚠️ ASA 2023: pausa ≥1 vecka före elektiv sedering'],
    indikation: 'Typ 2-diabetes (Ozempic, Mounjaro), obesitas/viktreduktion (Wegovy, Saxenda)',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård utan sedering', text: 'Säkert. Ingen särskild anpassning krävs.' },
      { typ: 'ok', label: 'Lokalanestesi', text: 'Säkert.' },
      { typ: 'ok', label: 'Extraktion / Kirurgi utan sedering', text: 'Säkert i lokalanestesi. Inga särskilda hänsyn.' },
      { typ: 'caution', label: 'Planerad sedering eller generell anestesi', text: 'Fördröjd ventrikeltömning → aspirationsrisk. ASA Practice Advisory 2023: överväg att pausa GLP-1 ≥1 vecka före elektivt ingrepp med sedering. Kontakta sederingsläkare/anestesiolog för individuell bedömning.' },
      { typ: 'caution', label: 'Akut sedering (ej planerat ingrepp)', text: 'Behandla som "full stomach" — RSI-strategi om anestesiolog. För tandvård: överväg uppskjuten elektiv sedering till nästa vecka.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Fördröjd magsäckstömning kvarstår även efter standardfasta (8h) — aspirationsrisk vid sedering' },
      { typ: 'yellow', text: 'ASA Practice Advisory 2023: pausa GLP-1 minst 1 vecka (veckodos) eller 1 dag (dagsdos) före elektivt ingrepp med sedering/anestesi' },
      { typ: 'yellow', text: 'Endoskopiska studier visar retention av föda upp till 24h efter standardfasta' },
      { typ: 'yellow', text: 'Hypoglykemirisk är låg vid GLP-1 monoterapi (glukosberoende insulinfrisättning), men ökar i kombination med insulin/SU' },
      { typ: 'green', text: 'Lokalanestesi utan sedering: ingen anpassning krävs' },
      { typ: 'blue', text: 'Fråga aktivt om GLP-1 vid anamnes — många patienter uppger inte detta som "diabetesläkemedel" (särskilt vid obesitas-indikation)' },
    ],
    interaktioner: [
      { klass: 'C', lm: 'GLP-1 + Sederingsläkemedel (midazolam, propofol)', text: 'Aspirationsrisk vid fördröjd ventrikeltömning. Pausa GLP-1 inför elektiv sedering eller välj lokalanestesi.' },
    ],
    kalla: 'ASA Practice Advisory on Preoperative GLP-1 RA Management 2023; Janusmed; FASS Ozempic/Wegovy; Tandvårdens Läkemedel 2024–2025'
  },
  {
    id: 'statin',
    name: 'Statiner (Kolesterolsänkare)',
    examples: 'Simvastatin · Atorvastatin (Lipitor) · Rosuvastatin (Crestor) · Pravastatin (Pravachol) · Fluvastatin (Lescol)',
    cat: 'hjarta',
    catColor: 'badge-yellow',
    risk: 'LÅG–MEDEL',
    tags: ['statin', 'simvastatin', 'atorvastatin', 'rosuvastatin', 'kolesterol', 'rabdomyolys', 'CYP3A4', 'flukonazol', 'klaritromycin'],
    summary: ['⚠️ Simvastatin/atorvastatin + flukonazol/klaritromycin = rabdomyolysrisk', '✓ Pravastatin/rosuvastatin: mindre CYP-beroende', '✓ Rutintandvård utan anpassning'],
    indikation: 'Hyperkolesterolemi, primär/sekundär kardiovaskulär prevention',
    behandlingar: [
      { typ: 'ok', label: 'Rutintandvård', text: 'Säkert. Ingen anpassning krävs.' },
      { typ: 'ok', label: 'Lokalanestesi / Extraktion', text: 'Säkert.' },
      { typ: 'ok', label: 'PcV / Amoxicillin', text: 'Säkert — interagerar ej med statiner.' },
      { typ: 'avoid', label: 'Simvastatin/Atorvastatin + Klaritromycin/Erytromycin', text: 'Kraftig CYP3A4-hämning → 10–20-faldigt höjda statinnivåer → rabdomyolysrisk (muskelnedbrytning, akut njursvikt). KONTRAINDICERAT. Välj PcV/amoxicillin.' },
      { typ: 'avoid', label: 'Simvastatin/Atorvastatin + Flukonazol', text: 'CYP3A4-hämning → höjda statinnivåer → rabdomyolysrisk. Välj nystatin (topikalt) eller pausa statin i samråd med läkare.' },
    ],
    viktigt: [
      { typ: 'red', text: 'Rabdomyolys: muskelsmärta + mörk urin + förhöjt CK → akut njursvikt. Sätt ut statin omedelbart vid misstanke.' },
      { typ: 'yellow', text: 'Simvastatin och atorvastatin metaboliseras via CYP3A4 — interaktion med klaritromycin/erytromycin/flukonazol' },
      { typ: 'green', text: 'Pravastatin och rosuvastatin: mindre CYP3A4-beroende — säkrare vid behov av makrolid' },
      { typ: 'green', text: 'PcV, amoxicillin, metronidazol: säkert med alla statiner' },
      { typ: 'blue', text: 'Lovastatin har ovanlig biverkning: gingival hyperplasi (sällsynt rapportering)' },
    ],
    interaktioner: [
      { klass: 'D', lm: 'Simvastatin + Klaritromycin', text: 'Rabdomyolysrisk. KONTRAINDICERAT. Välj PcV/amoxicillin.' },
      { klass: 'D', lm: 'Atorvastatin + Klaritromycin', text: 'Rabdomyolysrisk. Undvik. Välj PcV/amoxicillin.' },
      { klass: 'C', lm: 'Simvastatin/Atorvastatin + Flukonazol', text: 'Höjda statinnivåer. Välj nystatin topikalt.' },
      { klass: 'C', lm: 'Rosuvastatin + Erytromycin', text: 'Marginell interaktion (rosuvastatin metaboliseras minimalt via CYP3A4).' },
    ],
    kalla: 'Tandvårdens Läkemedel 2024–2025; Janusmed; FASS Simvastatin/Atorvastatin'
  }
];
