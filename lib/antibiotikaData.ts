export interface StramaStep {
  id: string;
  stepNum: number;
  question: string;
  hint: string;
  yesText: string;
  noText: string;
  isRedFlagYes?: boolean;
  isRedFlagNo?: boolean;
}

export const stramaDecisionTree: StramaStep[] = [
  {
    id: 'step-1',
    stepNum: 1,
    question: 'Föreligger allmänpåverkan?',
    hint: 'Feber (>38°C), uttalad sjukdomskänsla, frossa, takykardi.',
    yesText: '✅ Ja — patienten är allmänpåverkad',
    noText: '⛔ Nej — ingen allmänpåverkan',
  },
  {
    id: 'step-2',
    stepNum: 2,
    question: 'Finns tecken på infektionsspridning?',
    hint: 'Trismus, dysfagi, lymfadenit, svullnad mot munbotten/hals/pterygomandibulär region.',
    yesText: '✅ Ja — spridningstecken föreligger',
    noText: '⛔ Nej — lokal infektion utan spridning',
  },
  {
    id: 'step-3',
    stepNum: 3,
    question: 'Är patienten immunsupprimerad eller medicinskt riskpatient?',
    hint: 'Neutropeni, pågående immunsuppressiv behandling, okontrollerad diabetes, strålbehandlat käkben, IV-bisfosfonater.',
    yesText: '✅ Ja — riskpatient',
    noText: '⛔ Nej — frisk patient i övrigt',
  },
  {
    id: 'step-4',
    stepNum: 4,
    question: 'Har kirurgisk/mekanisk åtgärd utförts eller planeras?',
    hint: 'Dränage, extraktion, incision, rotbehandling (mekanisk rensning). Antibiotika är alltid ett tillägg — aldrig en ersättning.',
    yesText: '✅ Ja — kirurgisk åtgärd utförd/planerad',
    noText: '⚠️ Nej — ej möjligt just nu',
  },
  {
    id: 'step-5',
    stepNum: 5,
    question: 'Har patienten penicillinallergi (äkta Typ 1)?',
    hint: 'Äkta allergi = urtikaria, anafylaxi, andningssvårigheter. Magbesvär = INTE allergi.',
    yesText: '⚠️ Ja — dokumenterad penicillinallergi',
    noText: '✅ Nej — ingen penicillinallergi',
  }
];
