import Link from "next/link";
import { endodontiScenarier } from "@/lib/data/endodonti-scenarios";

const scenarios = Object.values(endodontiScenarier);

export const metadata = {
  title: "Endodonti | DentaGuide-Pro",
  description: "8 evidensbaserade kliniska scenarier för pulpa- och rotdiagnostik.",
};

export default function EndodontiPage() {
  return (
    <div data-theme="stitch-pro" className="max-w-4xl mx-auto px-4 py-10">
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🦷</span>
          <h1 className="font-display italic text-4xl text-primary">Endodonti</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl">
          Värk & smärta — 8 evidensbaserade kliniska scenarier för pulpa- och rotdiagnostik.
          Alla rekommendationer baserade på Socialstyrelsen NR Tandvård 2022 och Internetodontologi.se.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/dashboard/endodonti/${s.slug}`} className="block">
            <div className="glass-bento hover-lift p-6 h-full flex flex-col gap-3 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display italic text-xl text-primary leading-tight">{s.title}</h2>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="badge badge-icd">{s.icdCode}</span>
                  {s.isAcute && <span className="badge badge-acute">AKUT</span>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1">
                {s.patientUtsaga}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {s.snabbOversikt.slice(0, 2).map((item) => (
                  <span key={item.label} className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full">
                    {item.icon} {item.label}: {item.value}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-secondary font-semibold uppercase tracking-wide mt-auto pt-2 border-t border-black/5">
                <span>Öppna scenario</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <span className="psl-footer">
          PSL 2010:659 — Ersätter inte kliniskt omdöme. Granskas av legitimerad tandläkare.
        </span>
      </div>
    </div>
  );
}
