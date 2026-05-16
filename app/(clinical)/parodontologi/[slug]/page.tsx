"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Layers } from "lucide-react";
import { parodontoloiScenarier } from "@/lib/data/parodontologi-scenarios";
import BPEKarta from "@/components/tools/BPEKarta";
import ScenarioPage, {
  type NormalizedScenario,
} from "@/components/scenario/ScenarioPage";

/* Vänster scenario-nav (parodontologi). */
const SCENARIO_NAV = [
  { slug: "gingivit-parodontit", id: "VARK-11-PAROD", quote: "Det blöder när jag borstar och tandköttet ömmar", title: "Gingivit / Parodontit" },
  { slug: "perikoronit", id: "VARK-05-PERI", quote: "Ont längst bak i käken / svårt att gapa", title: "Perikoronit" },
  { slug: "parodontal-abscess", id: "VARK-12-PARAB", quote: "Det bultar i tandköttet, tanden känns lös/hög", title: "Parodontal Abscess" },
  { slug: "anug-herpes", id: "VARK-11-GING", quote: "Det svider, blöder och luktar illa i munnen", title: "ANUG / Herpes" },
  { slug: "periimplantit", id: "VARK-13-IMPL", quote: "Det gör ont runt implantatet, det blöder och gungar", title: "Periimplantit" },
  { slug: "furkationsdiagnostik", id: "PARO-26-FK", quote: "Tandläkaren hittade ett djupt hål under molaren", title: "Furkationspåverkan" },
];

/* Höger-railens kliniska verktyg (parodontologi). */
const VERKTYG: NonNullable<NormalizedScenario["verktyg"]> = [
  { label: "Antibiotikastöd", href: "/tools/antibiotika" },
  { label: "Farmaka", href: "/tools/lakemedel" },
  { label: "Journalmall", href: "/tools/journalmall" },
  { label: "Parod-klassificerare", href: "/tools/parod-klassificering" },
];

export default function ParodontoloiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const s = parodontoloiScenarier[slug];
  if (!s) notFound();

  /* Normalisering — varje fält i ParodScenarioData mappas, noll dataförlust. */
  const scenario: NormalizedScenario = {
    areaHref: "/parodontologi",
    areaLabel: "Parodontologi",
    areaIcon: <Layers size={16} aria-hidden />,

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
      riskfaktorer: s.anamnes.riskfaktorer,
    },

    status: {
      inspektion: s.status.inspektion,
      palpation: s.status.palpation,
      perkussion: s.status.perkussion,
      sensibilitet: s.status.sensibilitet,
      bpe: s.status.bpe,
      bpeWidget: s.showBPE && s.status.bpe ? <BPEKarta /> : undefined,
    },

    diagnostik: {
      kriterier: s.diagnostik.kriterier,
      rtg: s.diagnostik.rtg,
      klassifikation: s.diagnostik.klassifikation,
      uteslut: s.diagnostik.uteslut,
    },

    redFlags: s.redFlags,

    behandling: {
      varning: s.behandling.varning,
      alternativ: s.behandling.alternativ,
      antibiotika: s.behandling.antibiotika,
      lokalbehandling: s.behandling.lokalbehandling,
    },

    uppfoljning: { text: s.uppfoljning.text },

    diffDiagnoser: s.diffDiagnoser.map((d) => ({
      namn: d.namn,
      kod: d.kod,
      skillnad: d.skillnad,
    })),

    journal: s.journal,

    kliniskaAnteckningar: s.kliniskaAnteckningar,

    verktyg: VERKTYG,
  };

  return <ScenarioPage scenario={scenario} />;
}
