import Link from "next/link";

const scenarios = [
  {
    slug: "sar-och-blasor",
    id: "ORAL-35-SÅRBLÅS",
    title: "Sår & Blåsor",
    icdCode: "K12.0 / B00.2 / K13.1",
    isAcute: false,
    summary: "Differentialdiagnostik av Herpes, Afte och Traumatiska sår. 2-veckorsregeln för malignitetsmisstanke.",
  },
  {
    slug: "candida",
    id: "ORAL-36-CANDIDA-ERYT",
    title: "Candida",
    icdCode: "B37.0",
    isAcute: false,
    summary: "Erytematös och pseudomembranös candidos. Riskfaktorer som astmaspray och antibiotika. Flukonazol-varning.",
  },
  {
    slug: "malignitet",
    id: "ORAL-37-MALIGN",
    title: "Malignitet",
    icdCode: "K13.2 / C00-C14",
    isAcute: true,
    summary: "MISSTÄNKT MALIGNITET. Icke-läkande sår > 3 veckor, induration, SVF-remiss och varningssignaler.",
  },
  {
    slug: "lakemedel",
    id: "ORAL-38-LAKEMEDEL",
    title: "Läkemedel",
    icdCode: "K05.1 / M87.1",
    isAcute: true,
    summary: "Medicinrelaterade tillstånd: MRONJ (osteonekros) och DIGO (gingival hyperplasi). Onkologkontakt vid hög risk.",
  },
  {
    slug: "ng-np",
    id: "ORAL-39-NGNP",
    title: "NG/NP (ANUG)",
    icdCode: "A69.1",
    isAcute: true,
    summary: "Nekrotiserande gingivit/parodontit. Papillnekros, fetor ex ore och HIV-misstanke vid snabb progress.",
  },
  {
    slug: "neurogent",
    id: "ORAL-40-NEURO",
    title: "Neurogent",
    icdCode: "8B82.0 / DA0F.0 / 1E91",
    isAcute: false,
    summary: "Munsveda (BMS), Trigeminusneuralgi och Herpes Zoster. Handläggning och neurologisk utredning.",
  },
];

export default function OralmedicinPage() {
  return (
    <div 
      data-theme="stitch-pro" 
      className="max-w-4xl mx-auto px-4 py-10"
      style={{ "--accent-primary": "#5B21B6", "--accent-light": "#7C3AED" } as React.CSSProperties}
    >
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">🔬</span>
          <h1 className="font-display italic text-4xl text-primary">Oralmedicin</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl">
          Slemhinneförändringar och orofacial smärta — 6 kliniska scenarier.
          Baserat på Internetodontologi, Strama 2024 och SVF Huvud-halscancer.
          Fokus på malignitets-screenning och medicinrelaterade biverkningar.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/oralmedicin/${s.slug}`} className="block">
            <div className="glass-bento hover-lift p-6 h-full flex flex-col gap-3 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                    {s.id}
                  </span>
                  <h2 className="font-display italic text-xl text-primary leading-tight">{s.title}</h2>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 flex-col items-end">
                  <span className="badge badge-icd">{s.icdCode}</span>
                  {s.isAcute && <span className="badge badge-acute">AKUT</span>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1">{s.summary}</p>
              <div className="flex items-center gap-1 text-xs font-mono text-secondary font-semibold uppercase tracking-wide mt-auto pt-2 border-t border-black/5">
                <span>Visa scenario</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <span className="psl-footer">
          PSL 2010:659 — Ersätter inte kliniskt omdöme. Baserat på Internetodontologi & SVF.
        </span>
      </div>
    </div>
  );
}
