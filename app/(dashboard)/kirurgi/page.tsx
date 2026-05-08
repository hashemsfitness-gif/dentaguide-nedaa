import Link from "next/link";
import { kirurgiScenarier } from "@/lib/data/kirurgi-scenarios";

export default function KirurgiPage() {
  const scenarios = Object.values(kirurgiScenarier);

  return (
    <div 
      data-theme="stitch-pro" 
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">🔪</span>
          <h1 className="font-display italic text-4xl text-primary">Käkkirurgi</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl border-l-[#B45309]">
          Kliniskt beslutsstöd för kirurgiska ingrepp och komplikationer.
          Baserat på Internetodontologi, Strama 2024 och nationella riktlinjer.
          Fokus på hemostas, sinuskommunikation och postoperativa infektioner.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/kirurgi/${s.slug}`} className="block">
            <div className="glass-bento hover-lift p-6 h-full flex flex-col gap-3 cursor-pointer group">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1 group-hover:text-[#B45309] transition-colors">
                    SCENARIO {s.scId}
                  </span>
                  <h2 className="font-display italic text-xl text-primary leading-tight">{s.title}</h2>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 flex-col items-end">
                  <span className="badge badge-icd" style={{ background: "rgba(180, 83, 9, 0.1)", color: "#B45309" }}>{s.icdCode}</span>
                  {s.isAcute && <span className="badge badge-acute">AKUT</span>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1">
                {s.patientUtsaga}
              </p>
              <div className="flex items-center gap-1 text-xs font-mono text-[#B45309] font-semibold uppercase tracking-wide mt-auto pt-2 border-t border-black/5">
                <span>Visa protokoll</span>
                <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-black/5">
          PSL 2010:659 — Ersätter inte kliniskt omdöme.
        </span>
      </div>
    </div>
  );
}
