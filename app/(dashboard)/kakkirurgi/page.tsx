import Link from "next/link";
import { kakkirurgiScenarier } from "@/lib/data/kakkirurgi-scenarios";

export default function KakkirurgiPage() {
  const scenarios = Object.values(kakkirurgiScenarier);

  return (
    <div data-theme="stitch-pro" className="max-w-4xl mx-auto px-4 py-10">
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">🔪</span>
          <h1 className="font-display italic text-4xl text-primary">Kirurgi &amp; Komplikationer</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl">
          Postoperativa komplikationer — 7 evidensbaserade kliniska scenarier.
          Alveolit, blödning, sinuskommunikation, infektion, dislokation, nervpåverkan och tuberfraktur.
          Baserat på Strama 2024, FASS och Internetodontologi.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/kakkirurgi/${s.slug}`} className="block">
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
                  {s.isAcute && (
                    <span className="badge badge-acute" aria-label="Akut scenario">
                      AKUT
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1 italic">
                &ldquo;{s.patientUtsaga}&rdquo;
              </p>
              <div className="flex items-center gap-1 text-xs font-mono text-secondary font-semibold uppercase tracking-wide mt-auto pt-2 border-t border-black/5">
                <span>Öppna scenario</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <span className="psl-footer">
          PSL 2010:659 — Ersätter inte kliniskt omdöme. Baserat på Strama 2024 &amp; Internetodontologi.
        </span>
      </div>
    </div>
  );
}
