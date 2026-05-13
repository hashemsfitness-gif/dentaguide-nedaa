import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * <ScenarioPage> — delad editorial-layout för alla kliniska scenario-sidor
 * (gäller alla områden utom Pedodonti & Ortodonti som har egna teman).
 *
 * Varje områdes [slug]/page.tsx normaliserar sin data till denna form
 * och passar in. Resultat: identisk struktur, färgskala, knappfördelning.
 */

export type NormalizedScenario = {
  areaHref: string;          // t.ex. /endodonti
  areaLabel: string;         // t.ex. Endodonti
  title: string;             // scenariots titel
  patientUtsaga?: string;    // citationsfras
  icdCode?: string;
  isAcute?: boolean;
  category?: string;
  snabbOversikt: Array<{ icon?: string; label: string; value: string }>;
  redFlags?: Array<{ id: string; title: string; description: string; severity: 'critical' | 'warning' }>;
  anamnes?: {
    obligatoriska?: Array<{ fraga: string; forvantatSvar?: string }>;
    kompletterande?: string[];
    riskfaktorer?: string[];
  };
  status?: {
    inspektion?: string[];
    palpation?: string[] | string;
    perkussion?: string[] | string;
    sensibilitet?: string[] | string;
    kliniskaFynd?: string[];
  };
  diagnostik?: {
    kriterier?: string;
    rtgFynd?: string[];
    uteslutningar?: string[];
    klassifikation?: string;
  };
  behandling?: {
    varning?: string;
    alternativ: Array<{ titel: string; indikation?: string; material?: string[]; metod?: string[]; tid?: string; tlvKoder?: string }>;
    checklista?: string[];
  };
  journal?: Array<{ rubrik: string; mall: string; tlvKoder?: string }>;
  uppfoljning?: {
    tidpunkt?: string[];
    lyckadKriteria?: string[];
    omvardering?: string[];
    text?: string;
  };
  diffDiagnoser?: Array<{ titel: string; icd?: string; skillnader?: string[]; behandling?: string }>;
  kliniskAnteckning?: string;
};

function Section({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <section className="bg-white rounded-[22px] border border-border-light p-7 md:p-9 mb-5 shadow-clay">
      {eyebrow && (
        <div className="font-mono text-[10px] tracking-widest2 uppercase text-secondary mb-2">{eyebrow}</div>
      )}
      <h2 className="font-display text-[26px] md:text-[30px] leading-tight mb-5 text-ink">
        <span className="ed-italic text-secondary">{title.split(' ')[0]}</span>{' '}
        {title.split(' ').slice(1).join(' ')}
      </h2>
      {children}
    </section>
  );
}

function asArray(v: string[] | string | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export default function ScenarioPage({ scenario }: { scenario: NormalizedScenario }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-ink/50 mb-6 font-mono uppercase tracking-widest2">
        <Link href={scenario.areaHref} className="hover:text-secondary transition-colors">
          {scenario.areaLabel}
        </Link>
        <span className="text-ink/30">/</span>
        <span className="text-ink/70">{scenario.title}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-header-from to-header-to text-white rounded-[28px] p-8 md:p-12 mb-7 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-secondary/15 blur-3xl pointer-events-none" aria-hidden />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {scenario.icdCode && (
              <span className="font-mono text-[10px] tracking-widest2 uppercase border border-white/20 bg-white/10 text-white/90 rounded-full px-3 py-1">
                {scenario.icdCode}
              </span>
            )}
            {scenario.isAcute && (
              <span className="font-mono text-[10px] tracking-widest2 uppercase border border-status-danger/40 bg-status-danger/20 text-white rounded-full px-3 py-1">
                AKUT
              </span>
            )}
            {scenario.category && (
              <span className="font-mono text-[10px] tracking-widest2 uppercase text-white/55">
                {scenario.category}
              </span>
            )}
          </div>
          <h1 className="font-display text-[40px] md:text-[56px] leading-[1.02]">
            <span className="ed-italic text-secondary-container">{scenario.title}</span>
          </h1>
          {scenario.patientUtsaga && (
            <p className="mt-5 text-white/72 text-[17px] italic max-w-[640px] leading-relaxed">
              &ldquo;{scenario.patientUtsaga}&rdquo;
            </p>
          )}

          {/* Snabböversikt — sober editorial grid inom hero */}
          {scenario.snabbOversikt?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-7 pt-6 border-t border-white/15">
              {scenario.snabbOversikt.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <p className="font-mono text-[9px] tracking-widest2 uppercase text-white/55 mb-1">
                    {item.icon ? `${item.icon} ` : ''}
                    {item.label}
                  </p>
                  <p className="text-[13px] font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Röda Flaggor */}
      {scenario.redFlags && scenario.redFlags.length > 0 && (
        <section className="mb-7 rounded-[22px] border border-status-danger/25 bg-status-danger/5 p-7 md:p-9">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-status-danger text-xl">🚨</span>
            <h2 className="font-display text-[22px] text-status-danger">
              <span className="ed-italic">Röda</span> flaggor
            </h2>
          </div>
          <div className="space-y-3">
            {scenario.redFlags.map((flag) => (
              <div
                key={flag.id}
                className={`rounded-xl p-4 border-l-[4px] ${
                  flag.severity === 'critical'
                    ? 'bg-status-danger/10 border-status-danger'
                    : 'bg-status-warning/10 border-status-warning'
                }`}
              >
                <p className="font-semibold text-[14px] text-ink">{flag.title}</p>
                <p className="text-[13px] text-ink/70 mt-1">{flag.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Klinisk anteckning */}
      {scenario.kliniskAnteckning && (
        <section className="mb-7 rounded-[22px] border border-tertiary-gold/30 bg-tertiary-gold/5 p-6">
          <div className="flex items-start gap-3">
            <span className="text-[20px]">📌</span>
            <p className="text-[14px] text-ink/85 leading-relaxed">{scenario.kliniskAnteckning}</p>
          </div>
        </section>
      )}

      {/* Anamnes */}
      {scenario.anamnes && (
        <Section title="Anamnes" eyebrow="01 · Frågor">
          {scenario.anamnes.obligatoriska && scenario.anamnes.obligatoriska.length > 0 && (
            <div className="mb-5">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-status-danger mb-3">
                Obligatoriska frågor
              </p>
              <div className="space-y-3">
                {scenario.anamnes.obligatoriska.map((q, i) => (
                  <div key={i} className="rounded-xl bg-status-danger/5 border border-status-danger/15 p-4">
                    <p className="font-semibold text-[14px] text-ink mb-1">{q.fraga}</p>
                    {q.forvantatSvar && (
                      <p className="text-[12px] text-ink/60 italic">Förväntat svar: {q.forvantatSvar}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {scenario.anamnes.kompletterande && scenario.anamnes.kompletterande.length > 0 && (
            <div className="mb-3">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-primary mb-3">
                Kompletterande
              </p>
              <ul className="space-y-1.5">
                {scenario.anamnes.kompletterande.map((q, i) => (
                  <li key={i} className="text-[14px] text-ink/80 flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {scenario.anamnes.riskfaktorer && scenario.anamnes.riskfaktorer.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-status-warning mb-3">
                Riskfaktorer
              </p>
              <ul className="space-y-1.5">
                {scenario.anamnes.riskfaktorer.map((r, i) => (
                  <li key={i} className="text-[14px] text-ink/80 flex gap-2">
                    <span className="text-status-warning mt-0.5">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* Status */}
      {scenario.status && (
        <Section title="Klinisk status" eyebrow="02 · Status">
          <div className="grid sm:grid-cols-2 gap-5">
            {asArray(scenario.status.sensibilitet).length > 0 && (
              <StatusGroup title="Sensibilitet" items={asArray(scenario.status.sensibilitet)} />
            )}
            {asArray(scenario.status.perkussion).length > 0 && (
              <StatusGroup title="Perkussion" items={asArray(scenario.status.perkussion)} />
            )}
            {asArray(scenario.status.palpation).length > 0 && (
              <StatusGroup title="Palpation" items={asArray(scenario.status.palpation)} />
            )}
            {scenario.status.inspektion && scenario.status.inspektion.length > 0 && (
              <StatusGroup title="Inspektion" items={scenario.status.inspektion} />
            )}
            {scenario.status.kliniskaFynd && scenario.status.kliniskaFynd.length > 0 && (
              <StatusGroup title="Kliniska fynd" items={scenario.status.kliniskaFynd} />
            )}
          </div>
        </Section>
      )}

      {/* Diagnostik */}
      {scenario.diagnostik && (
        <Section title="Diagnostik" eyebrow="03 · Diagnos">
          {scenario.diagnostik.kriterier && (
            <p className="text-[14px] text-ink/80 mb-4 leading-relaxed">{scenario.diagnostik.kriterier}</p>
          )}
          {scenario.diagnostik.klassifikation && (
            <p className="text-[14px] text-ink/80 mb-4 leading-relaxed">
              <strong>Klassifikation:</strong> {scenario.diagnostik.klassifikation}
            </p>
          )}
          {scenario.diagnostik.rtgFynd && scenario.diagnostik.rtgFynd.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink/55 mb-2">Röntgenfynd</p>
              <ul className="space-y-1.5">
                {scenario.diagnostik.rtgFynd.map((r, i) => (
                  <li key={i} className="text-[14px] flex gap-2">
                    <span className="text-status-ok">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {scenario.diagnostik.uteslutningar && scenario.diagnostik.uteslutningar.length > 0 && (
            <div className="rounded-xl bg-status-danger/5 border border-status-danger/15 p-4">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-status-danger mb-2">
                Uteslutningskriterier
              </p>
              <ul className="space-y-1.5">
                {scenario.diagnostik.uteslutningar.map((u, i) => (
                  <li key={i} className="text-[13px] text-ink/80 flex gap-2">
                    <span className="text-status-danger">✗</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* Behandling */}
      {scenario.behandling && (
        <Section title="Behandling" eyebrow="04 · Plan">
          {scenario.behandling.varning && (
            <div className="rounded-xl bg-status-warning/10 border border-status-warning/30 p-4 mb-5">
              <p className="text-[13px] text-ink font-medium">⚠️ {scenario.behandling.varning}</p>
            </div>
          )}
          <div className="space-y-4">
            {scenario.behandling.alternativ.map((alt, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 border ${
                  i === 0
                    ? 'border-secondary/30 bg-secondary/5'
                    : 'border-border-light bg-neutral'
                }`}
              >
                <h3 className="font-display text-[18px] mb-2 text-ink">{alt.titel}</h3>
                {alt.indikation && (
                  <p className="text-[12px] text-ink/60 mb-3">
                    <span className="font-mono uppercase tracking-widest2 text-[10px] text-ink/45">Indikation: </span>
                    {alt.indikation}
                  </p>
                )}
                {alt.material && alt.material.length > 0 && (
                  <div className="mb-3">
                    <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink/55 mb-1">Material</p>
                    <ul className="space-y-0.5">
                      {alt.material.map((m, j) => (
                        <li key={j} className="text-[13px] text-ink/80">• {m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {alt.metod && alt.metod.length > 0 && (
                  <div className="mb-3">
                    <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink/55 mb-1">Metod</p>
                    <ol className="space-y-1">
                      {alt.metod.map((step, j) => (
                        <li key={j} className="text-[13px] text-ink/80 flex gap-2">
                          <span className="font-mono text-secondary text-[11px] mt-0.5">{j + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {alt.tid && <p className="text-[12px] text-ink/55">⏱ {alt.tid}</p>}
                {alt.tlvKoder && (
                  <div className="mt-3 bg-white rounded-lg px-3 py-2 border border-border-light">
                    <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink/55 mb-0.5">
                      Debiteringskoder
                    </p>
                    <p className="font-mono text-[12px] text-ink">{alt.tlvKoder}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {scenario.behandling.checklista && scenario.behandling.checklista.length > 0 && (
            <div className="mt-5 rounded-xl bg-status-warning/10 border border-status-warning/30 p-4">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-status-warning mb-2">
                Checklista före behandling
              </p>
              <ul className="space-y-1">
                {scenario.behandling.checklista.map((c, i) => (
                  <li key={i} className="text-[13px] text-ink/80">☐ {c}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* Journalmallar */}
      {scenario.journal && scenario.journal.length > 0 && (
        <Section title="Journalmallar" eyebrow="05 · Dokumentation">
          <div className="space-y-4">
            {scenario.journal.map((j, i) => (
              <div key={i}>
                <h3 className="font-semibold text-[13px] mb-2 text-ink">{j.rubrik}</h3>
                <div className="bg-[#0a1019] text-[#c9f5d9] rounded-xl p-5 font-mono text-[12px] leading-relaxed whitespace-pre-wrap border border-emerald-900/30">
                  {j.mall}
                </div>
                {j.tlvKoder && (
                  <p className="mt-2 font-mono text-[10px] tracking-widest2 uppercase text-ink/45">
                    Koder: <span className="text-ink/70">{j.tlvKoder}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Uppföljning */}
      {scenario.uppfoljning && (
        <Section title="Uppföljning" eyebrow="06 · Tidsplan">
          {scenario.uppfoljning.text && (
            <p className="text-[14px] text-ink/80 leading-relaxed mb-4">{scenario.uppfoljning.text}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-5">
            {scenario.uppfoljning.tidpunkt && scenario.uppfoljning.tidpunkt.length > 0 && (
              <StatusGroup title="Tidpunkt" items={scenario.uppfoljning.tidpunkt} />
            )}
            {scenario.uppfoljning.lyckadKriteria && scenario.uppfoljning.lyckadKriteria.length > 0 && (
              <StatusGroup title="Lyckat resultat" items={scenario.uppfoljning.lyckadKriteria} accent="ok" />
            )}
          </div>
          {scenario.uppfoljning.omvardering && scenario.uppfoljning.omvardering.length > 0 && (
            <div className="mt-4 rounded-xl bg-status-warning/10 border border-status-warning/30 p-4">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-status-warning mb-2">
                Kräver omvärdering
              </p>
              <ul className="space-y-1">
                {scenario.uppfoljning.omvardering.map((o, i) => (
                  <li key={i} className="text-[13px] text-ink/80">• {o}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {/* Differentialdiagnoser */}
      {scenario.diffDiagnoser && scenario.diffDiagnoser.length > 0 && (
        <Section title="Differentialdiagnoser" eyebrow="07 · Alternativ">
          <div className="space-y-3">
            {scenario.diffDiagnoser.map((d, i) => (
              <div key={i} className="rounded-xl border border-border-light bg-neutral p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[14px] text-ink">{d.titel}</h3>
                  {d.icd && (
                    <span className="font-mono text-[10px] tracking-widest2 uppercase border border-border-light bg-white text-ink/70 rounded-full px-2.5 py-0.5">
                      {d.icd}
                    </span>
                  )}
                </div>
                {d.skillnader && d.skillnader.length > 0 && (
                  <ul className="space-y-0.5 mb-2">
                    {d.skillnader.map((s, j) => (
                      <li key={j} className="text-[12px] text-ink/60">• {s}</li>
                    ))}
                  </ul>
                )}
                {d.behandling && (
                  <p className="text-[12px] text-secondary font-medium">Behandling: {d.behandling}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* PSL-footer */}
      <p className="mt-10 text-center font-mono text-[10px] tracking-widest2 uppercase text-ink/45">
        PSL 2010:659 — Ersätter inte kliniskt omdöme
      </p>
    </div>
  );
}

function StatusGroup({ title, items, accent = 'primary' }: { title: string; items: string[]; accent?: 'primary' | 'ok' }) {
  const accentText = accent === 'ok' ? 'text-status-ok' : 'text-primary';
  return (
    <div>
      <p className={`font-mono text-[10px] tracking-widest2 uppercase ${accentText} mb-2`}>{title}</p>
      <ul className="space-y-1.5">
        {items.map((s, i) => (
          <li key={i} className="text-[13px] text-ink/80">• {s}</li>
        ))}
      </ul>
    </div>
  );
}
