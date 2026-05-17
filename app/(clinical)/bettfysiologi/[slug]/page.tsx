"use client";

/**
 * Bettfysiologi scenario-sida — DELADE <ScenarioPage>-layouten (samma
 * som parodontologi). REN PRESENTATION: normaliseringen är enbart
 * fältnamns-byten + array-genomsläpp. Ingen medicinsk text slås ihop,
 * kortas, etiketteras om eller tappas. Noll dataförlust.
 */

import { use } from "react";
import { notFound } from "next/navigation";
import { Bone } from "lucide-react";
import { bettfysiologiScenarier } from "@/lib/data/bettfysiologi-scenarios";
import ScenarioPage, {
  type NormalizedScenario,
} from "@/components/scenario/ScenarioPage";

const SCENARIOS = Object.values(bettfysiologiScenarier);

const SCENARIO_NAV = SCENARIOS.map((x) => ({
  slug: x.slug,
  id: x.id,
  quote: x.patientUtsaga,
  title: x.title,
}));

const VERKTYG: NonNullable<NormalizedScenario["verktyg"]> = [
  { label: "Antibiotikastöd", href: "/tools/antibiotika" },
  { label: "Farmaka", href: "/tools/lakemedel" },
  { label: "Journalmall", href: "/tools/journalmall" },
];

export default function BettfysiologiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const s = SCENARIOS.find((x) => x.slug === slug);
  if (!s) notFound();

  const scenario: NormalizedScenario = {
    areaHref: "/bettfysiologi",
    areaLabel: "Bettfysiologi",
    areaIcon: <Bone size={16} aria-hidden />,

    id: s.id,
    title: s.title,
    patientUtsaga: s.patientUtsaga,
    icdCode: s.icdCode,
    isAcute: s.isAcute,
    category: s.category,

    nav: SCENARIO_NAV,

    snabbOversikt: s.snabbOversikt.map((o) => ({
      label: o.label,
      value: o.text,
    })),

    anamnes: {
      obligatoriska: s.anamnes.obligatoriska.map((q) => ({
        fraga: q.q,
        forvantatSvar: q.a,
      })),
      kompletterande: s.anamnes.kompletterande,
    },

    status: {
      inspektion: s.status.inspektion,
      kliniskaFynd: s.status.kliniskaFynd,
    },

    redFlags: s.redFlags,

    behandling: {
      varning: s.behandling.varning,
      alternativ: s.behandling.alternativ.map((a) => ({
        title: a.title,
        indikation: a.indikation,
        metod: a.metod,
      })),
    },

    diffDiagnoser: s.diffDiagnoser.map((d) => ({
      namn: d.namn,
      kod: d.kod,
      skillnad: d.skillnad,
    })),

    journal: s.journal.map((j) => ({ titel: j.titel, text: j.text })),

    kliniskAnteckning: s.kliniskAnteckning,
    varningssignal: s.varningssignal,

    verktyg: VERKTYG,
  };

  return <ScenarioPage scenario={scenario} />;
}
