import { notFound } from "next/navigation";
import Link from "next/link";
import { endodontiScenarier } from "@/lib/data/endodonti-scenarios";

const SCENARIOS = Object.values(endodontiScenarier);

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const scenario = SCENARIOS.find((s) => s.slug === params.slug);
  if (!scenario) return {};
  return { title: `${scenario.title} | DentaGuide-Pro` };
}

export default function EndodontiScenarioPage({ params }: Props) {
  const scenario = SCENARIOS.find((s) => s.slug === params.slug);
  if (!scenario) notFound();

  return (
    <div data-theme="stitch-pro" className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-mono">
        <Link href="/endodonti" className="hover:text-primary transition-colors">Endodonti</Link>
        <span>/</span>
        <span className="text-foreground">{scenario.title}</span>
      </nav>

      {/* Hero */}
      <div className="glass-bento p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display italic text-3xl text-primary mb-1">{scenario.title}</h1>
            <p className="text-muted-foreground italic">"{scenario.patientUtsaga}"</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="badge badge-icd">{scenario.icdCode}</span>
            {scenario.isAcute && <span className="badge badge-acute">AKUT</span>}
            <span className="badge badge-category">{scenario.category}</span>
          </div>
        </div>

        {/* Snabböversikt */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
          {scenario.snabbOversikt.map((item) => (
            <div key={item.label} className="bg-primary/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-0.5">{item.icon} {item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Röda Flaggor — alltid synliga */}
      {scenario.redFlags.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display italic text-xl text-red-600 mb-3 flex items-center gap-2">
            🚨 Röda Flaggor
          </h2>
          <div className="space-y-2">
            {scenario.redFlags.map((flag) => (
              <div key={flag.id} className={`p-4 rounded-lg border-l-4 ${flag.severity === "critical" ? "bg-red-50 border-red-500" : "bg-amber-50 border-amber-400"}`}>
                <p className="font-semibold text-sm text-red-800">{flag.title}</p>
                <p className="text-sm text-red-700 mt-0.5">{flag.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anamnes */}
      <div className="glass-bento p-6 mb-4">
        <h2 className="font-display italic text-xl text-primary mb-4">❓ Anamnes</h2>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">🔴 Obligatoriska frågor</h3>
          <div className="space-y-3">
            {scenario.anamnes.obligatoriska.map((q, i) => (
              <div key={i} className="bg-red-50/60 rounded-lg p-3">
                <p className="text-sm font-semibold text-foreground">{q.fraga}</p>
                <p className="text-xs text-muted-foreground mt-1 italic">Förväntat svar: {q.forvantatSvar}</p>
              </div>
            ))}
          </div>
        </div>
        {scenario.anamnes.kompletterande.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">🔵 Kompletterande frågor</h3>
            <ul className="space-y-1">
              {scenario.anamnes.kompletterande.map((q, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>{q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Klinisk Status */}
      <div className="glass-bento p-6 mb-4">
        <h2 className="font-display italic text-xl text-primary mb-4">🔬 Klinisk Status</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {scenario.status.sensibilitet.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">🧪 Sensibilitet</h3>
              <ul className="space-y-1">{scenario.status.sensibilitet.map((s, i) => <li key={i} className="text-sm">{s}</li>)}</ul>
            </div>
          )}
          {scenario.status.perkussion.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">🔨 Perkussion</h3>
              <ul className="space-y-1">{scenario.status.perkussion.map((s, i) => <li key={i} className="text-sm">{s}</li>)}</ul>
            </div>
          )}
          {scenario.status.palpation.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">👆 Palpation</h3>
              <ul className="space-y-1">{scenario.status.palpation.map((s, i) => <li key={i} className="text-sm">{s}</li>)}</ul>
            </div>
          )}
          {scenario.status.inspektion.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">🔍 Inspektion</h3>
              <ul className="space-y-1">{scenario.status.inspektion.map((s, i) => <li key={i} className="text-sm">{s}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      {/* Diagnostik */}
      <div className="glass-bento p-6 mb-4">
        <h2 className="font-display italic text-xl text-primary mb-4">📋 Diagnostik</h2>
        {scenario.diagnostik.rtgFynd.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">📷 Röntgenfynd</h3>
            <ul className="space-y-1">{scenario.diagnostik.rtgFynd.map((r, i) => <li key={i} className="text-sm flex gap-2"><span className="text-green-500">✅</span>{r}</li>)}</ul>
          </div>
        )}
        {scenario.diagnostik.uteslutningar.length > 0 && (
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">⛔ Uteslutningskriterier</h3>
            <ul className="space-y-1">{scenario.diagnostik.uteslutningar.map((u, i) => <li key={i} className="text-sm text-red-700 flex gap-2"><span>❌</span>{u}</li>)}</ul>
          </div>
        )}
      </div>

      {/* Behandling */}
      <div className="glass-bento p-6 mb-4">
        <h2 className="font-display italic text-xl text-primary mb-4">🔧 Behandling</h2>
        <div className="space-y-4">
          {scenario.behandling.alternativ.map((alt, i) => (
            <div key={i} className={`rounded-lg border p-4 ${i === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"}`}>
              <h3 className="font-semibold text-sm mb-2">{alt.titel}</h3>
              <p className="text-xs text-muted-foreground mb-3"><span className="font-semibold">Indikation:</span> {alt.indikation}</p>
              {alt.material && alt.material.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Material</p>
                  <ul className="space-y-0.5">{alt.material.map((m, j) => <li key={j} className="text-sm">🔹 {m}</li>)}</ul>
                </div>
              )}
              {alt.metod && alt.metod.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Metod</p>
                  <ol className="space-y-1">{alt.metod.map((step, j) => <li key={j} className="text-sm flex gap-2"><span className="font-mono text-primary text-xs mt-0.5">{j+1}.</span>{step}</li>)}</ol>
                </div>
              )}
              {alt.tid && <p className="text-xs text-muted-foreground">⏱️ {alt.tid}</p>}
              {alt.tlvKoder && (
                <div className="mt-3 bg-muted rounded p-2">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">💳 Debiteringskoder</p>
                  <p className="text-xs font-mono">{alt.tlvKoder}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {scenario.behandling.checklista && scenario.behandling.checklista.length > 0 && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">✋ Checklista före behandling</h3>
            <ul className="space-y-1">{scenario.behandling.checklista.map((c, i) => <li key={i} className="text-sm text-amber-800">☑️ {c}</li>)}</ul>
          </div>
        )}
      </div>

      {/* Journalmallar */}
      {scenario.journal.length > 0 && (
        <div className="glass-bento p-6 mb-4">
          <h2 className="font-display italic text-xl text-primary mb-4">📝 Journalmallar</h2>
          <div className="space-y-4">
            {scenario.journal.map((j, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold mb-2">{j.rubrik}</h3>
                <div className="bg-slate-900 rounded-lg p-4 relative">
                  <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap leading-relaxed">{j.mall}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uppföljning */}
      <div className="glass-bento p-6 mb-4">
        <h2 className="font-display italic text-xl text-primary mb-4">📊 Uppföljning</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">⏰ Tidpunkt</h3>
            <ul className="space-y-1">{scenario.uppfoljning.tidpunkt.map((t, i) => <li key={i} className="text-sm">{t}</li>)}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green-600 mb-2">✅ Lyckat resultat</h3>
            <ul className="space-y-1">{scenario.uppfoljning.lyckadKriteria.map((k, i) => <li key={i} className="text-sm text-green-700">• {k}</li>)}</ul>
          </div>
        </div>
        {scenario.uppfoljning.omvardering.length > 0 && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">⚠️ Kräver omvärdering</h3>
            <ul className="space-y-1">{scenario.uppfoljning.omvardering.map((o, i) => <li key={i} className="text-sm text-amber-800">• {o}</li>)}</ul>
          </div>
        )}
      </div>

      {/* Differentialdiagnoser */}
      {scenario.diffDiagnoser.length > 0 && (
        <div className="glass-bento p-6 mb-6">
          <h2 className="font-display italic text-xl text-primary mb-4">🔍 Differentialdiagnoser</h2>
          <div className="space-y-3">
            {scenario.diffDiagnoser.map((d, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{d.titel}</h3>
                  <span className="badge badge-icd text-xs">{d.icd}</span>
                </div>
                <ul className="space-y-0.5 mb-2">{d.skillnader.map((s, j) => <li key={j} className="text-xs text-muted-foreground">• {s}</li>)}</ul>
                <p className="text-xs text-primary font-medium">Behandling: {d.behandling}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <span className="psl-footer">PSL 2010:659 — Ersätter inte kliniskt omdöme.</span>
      </div>
    </div>
  );
}
