"use client";

/**
 * Protetik & Bettfunktion scenario-sida — DELADE <ScenarioPage>-
 * layouten (samma som parodontologi). REN PRESENTATION.
 *
 * Standardfält mappas som rena fältnamns-byten. Protetik-specifik
 * strukturerad data (status.extra/ferrule, materialval, journalens
 * TLV-koder) renderas ORDAGRANT via customSections — ingen medicinsk
 * text slås ihop, kortas, etiketteras om eller tappas. Noll dataförlust.
 */

import { use } from "react";
import { notFound } from "next/navigation";
import { Crown } from "lucide-react";
import { protetikScenarier } from "@/lib/data/protetik-scenarios";
import ScenarioPage, {
  type NormalizedScenario,
} from "@/components/scenario/ScenarioPage";

const SCENARIOS = Object.values(protetikScenarier);

const SCENARIO_NAV = SCENARIOS.map((x) => ({
  slug: x.slug,
  id: x.scId,
  quote: x.patientUtsaga,
  title: x.name,
}));

const VERKTYG: NonNullable<NormalizedScenario["verktyg"]> = [
  { label: "Antibiotikastöd", href: "/tools/antibiotika" },
  { label: "Farmaka", href: "/tools/lakemedel" },
  { label: "Journalmall", href: "/tools/journalmall" },
];

const labelStyle = {
  color: "var(--secondary, #CC5833)",
  fontWeight: 700,
} as const;

export default function ProtetikScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const s = SCENARIOS.find((x) => x.slug === slug);
  if (!s) notFound();

  const customSections: NonNullable<NormalizedScenario["customSections"]> = [];

  if (
    (s.status.extra && s.status.extra.length > 0) ||
    s.status.ferrule
  ) {
    customSections.push({
      id: "s-status-extra",
      label: "Status – kompletterande",
      title: "Status – kompletterande",
      content: (
        <>
          {s.status.extra?.map((e) => (
            <div key={e.title} style={{ marginBottom: 16 }}>
              <p
                className="font-mono"
                style={{
                  fontSize: 14.5,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  color: "var(--secondary, #CC5833)",
                  margin: "0 0 10px 0",
                }}
              >
                {e.title}
              </p>
              <ul
                role="list"
                style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}
              >
                {e.items.map((it, i) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 12,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "var(--text-primary, #201A18)",
                      fontWeight: 550,
                    }}
                  >
                    <span aria-hidden style={{ color: "var(--secondary, #CC5833)" }}>·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {s.status.ferrule && (
            <div
              style={{
                background: "var(--surface, #FCF9F8)",
                border: "1px solid var(--border-medium, #E2DDD9)",
                borderRadius: 22,
                padding: 16,
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontSize: 16, lineHeight: 1.55, color: "var(--text-primary, #201A18)", fontWeight: 550 }}>
                <strong style={labelStyle}>Ferrule-krav: </strong>
                {s.status.ferrule.kravet}
              </p>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--text-primary, #201A18)", fontWeight: 550 }}>
                <strong style={labelStyle}>Kontraindikation: </strong>
                {s.status.ferrule.kontraindikation}
              </p>
            </div>
          )}
        </>
      ),
    });
  }

  if (s.materialval) {
    const mv = s.materialval;
    customSections.push({
      id: "s-materialval",
      label: "Materialval",
      title: "Materialval",
      content: (
        <>
          {mv.intro && (
            <p style={{ margin: "0 0 14px 0", fontSize: 16, lineHeight: 1.6, color: "var(--text-primary, #201A18)", fontWeight: 550 }}>
              {mv.intro}
            </p>
          )}
          <div style={{ display: "grid", gap: 10 }}>
            {mv.alternativ.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface, #FCF9F8)",
                  border: "1px solid var(--border-medium, #E2DDD9)",
                  borderRadius: 22,
                  padding: 16,
                }}
              >
                <p style={{ margin: "0 0 6px 0", fontWeight: 700, fontSize: 16.5, color: "var(--text-primary, #201A18)" }}>
                  {m.kategori}
                </p>
                <p style={{ margin: "0 0 4px 0", fontSize: 15.5, color: "var(--text-primary, #201A18)", fontWeight: 550 }}>
                  <strong style={labelStyle}>Material: </strong>
                  {m.material}
                </p>
                <p style={{ margin: 0, fontSize: 15.5, color: "var(--text-primary, #201A18)", fontWeight: 550 }}>
                  <strong style={labelStyle}>Cement: </strong>
                  {m.cement}
                </p>
                {m.notering && (
                  <p style={{ margin: "6px 0 0 0", fontSize: 14.5, color: "var(--text-secondary, #544F4C)", fontWeight: 550 }}>
                    {m.notering}
                  </p>
                )}
              </div>
            ))}
          </div>
          {mv.eugenolRegel && (
            <p
              style={{
                margin: "14px 0 0 0",
                fontSize: 15.5,
                lineHeight: 1.55,
                color: "var(--text-primary, #201A18)",
                fontWeight: 600,
                background: "rgba(224,123,57,0.10)",
                border: "1px solid rgba(224,123,57,0.35)",
                borderRadius: 18,
                padding: 14,
              }}
            >
              {mv.eugenolRegel}
            </p>
          )}
        </>
      ),
    });
  }

  if (s.journal.tlvKoder && s.journal.tlvKoder.length > 0) {
    customSections.push({
      id: "s-tlv",
      label: "Debiteringskoder",
      title: "Debiteringskoder (TLV)",
      content: (
        <>
          <div style={{ display: "grid", gap: 8 }}>
            {s.journal.tlvKoder.map((k, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 12,
                  fontSize: 15.5,
                  color: "var(--text-primary, #201A18)",
                  fontWeight: 550,
                }}
              >
                <span className="font-mono" style={{ fontWeight: 800, color: "var(--secondary, #CC5833)" }}>
                  {k.kod}
                </span>
                <span>{k.beskrivning}</span>
              </div>
            ))}
          </div>
          {s.journal.tlvNotering && (
            <p style={{ margin: "12px 0 0 0", fontSize: 14.5, color: "var(--text-secondary, #544F4C)", fontWeight: 550 }}>
              {s.journal.tlvNotering}
            </p>
          )}
        </>
      ),
    });
  }

  const scenario: NormalizedScenario = {
    areaHref: "/protetik",
    areaLabel: "Protetik & Bettfunktion",
    areaIcon: <Crown size={16} aria-hidden />,

    id: s.scId,
    title: s.name,
    patientUtsaga: s.patientUtsaga,
    icdCode: s.icd,
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
      varning: s.anamnes.varning,
    },

    status: {
      inspektion: s.status.inspektion,
    },

    redFlags: s.redFlags,

    behandling: {
      alternativ: s.behandling.map((b) => ({
        alt: b.alt,
        title: b.title,
        indikation: b.indikation,
        metod: b.steg,
        koder: b.koder,
        specialist: b.specialist,
      })),
    },

    uppfoljning: { text: s.uppfoljning },

    diffDiagnoser: s.diffDiagnoser.map((d) => ({
      namn: d.namn,
      kod: d.kod,
      skillnad: d.skillnad,
    })),

    journal: [{ titel: s.name, text: s.journal.malltext }],

    kliniskAnteckning: s.kliniskaAnteckningar,

    customSections,

    verktyg: VERKTYG,
  };

  return <ScenarioPage scenario={scenario} />;
}
