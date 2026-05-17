"use client";

/**
 * Endodonti scenario-sida — använder den DELADE <ScenarioPage>-layouten
 * (samma som parodontologi).
 *
 * REN PRESENTATION. Normaliseringen nedan är ENBART fältnamns-byten
 * (EndoScenarioData-nyckel → NormalizedScenario-nyckel) och rakt
 * genomsläpp av arrayer. Ingen medicinsk text slås ihop, kortas,
 * etiketteras om eller tappas. Sektionsrubriker kommer från den
 * delade layouten (precis som för parodontologi). Noll dataförlust.
 */

import { use } from "react";
import { notFound } from "next/navigation";
import { Activity } from "lucide-react";
import { endodontiScenarier } from "@/lib/data/endodonti-scenarios";
import ScenarioPage, {
  type NormalizedScenario,
} from "@/components/scenario/ScenarioPage";

const SCENARIOS = Object.values(endodontiScenarier);

/* Vänster scenario-nav byggs ur datan (ingen hårdkodning). */
const SCENARIO_NAV = SCENARIOS.map((x) => ({
  slug: x.slug,
  id: x.id,
  quote: x.patientUtsaga,
  title: x.title,
}));

/* Höger-railens kliniska verktyg (gemensamma för vuxenområden). */
const VERKTYG: NonNullable<NormalizedScenario["verktyg"]> = [
  { label: "Antibiotikastöd", href: "/tools/antibiotika" },
  { label: "Farmaka", href: "/tools/lakemedel" },
  { label: "Journalmall", href: "/tools/journalmall" },
];

export default function EndodontiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const s = SCENARIOS.find((x) => x.slug === slug);
  if (!s) notFound();

  /* Normalisering — enbart fältnamns-byten + array-genomsläpp. */
  const scenario: NormalizedScenario = {
    areaHref: "/endodonti",
    areaLabel: "Endodonti",
    areaIcon: <Activity size={16} aria-hidden />,

    id: s.id,
    title: s.title,
    patientUtsaga: s.patientUtsaga,
    icdCode: s.icdCode,
    isAcute: s.isAcute,
    category: s.category,

    nav: SCENARIO_NAV,

    snabbOversikt: s.snabbOversikt.map((o) => ({
      label: o.label,
      value: o.value,
    })),

    anamnes: {
      obligatoriska: s.anamnes.obligatoriska,
      kompletterande: s.anamnes.kompletterande,
    },

    status: {
      inspektion: s.status.inspektion,
      palpation: s.status.palpation,
      perkussion: s.status.perkussion,
      sensibilitet: s.status.sensibilitet,
    },

    diagnostik: {
      kriterier: s.diagnostik.ickKriteria,
      rtg: s.diagnostik.rtgFynd,
      uteslut: s.diagnostik.uteslutningar,
    },

    redFlags: s.redFlags,

    behandling: {
      alternativ: s.behandling.alternativ.map((a) => ({
        title: a.titel,
        indikation: a.indikation,
        material: a.material,
        metod: a.metod,
        tid: a.tid,
        koder: a.tlvKoder,
      })),
      checklista: s.behandling.checklista,
    },

    uppfoljning: {
      tidpunkt: s.uppfoljning.tidpunkt,
      lyckadKriteria: s.uppfoljning.lyckadKriteria,
      omvardering: s.uppfoljning.omvardering,
    },

    diffDiagnoser: s.diffDiagnoser.map((d) => ({
      namn: d.titel,
      kod: d.icd,
      skillnader: d.skillnader,
      behandling: d.behandling,
    })),

    journal: s.journal.map((j) => ({ titel: j.rubrik, text: j.mall })),

    verktyg: VERKTYG,
  };

  return <ScenarioPage scenario={scenario} />;
}
