import Link from "next/link";

const scenarios = [
  {
    slug: "gingivit-parodontit",
    id: "VARK-11-PAROD",
    title: "Gingivit / Kronisk Parodontit",
    icdCode: "K05.1 / K05.3",
    isAcute: false,
    summary: "Blödning vid borstning, fickbildning, bennedbrytning. EFP/AAP 2018 Stadium I–IV.",
  },
  {
    slug: "perikoronit",
    id: "VARK-05-PERI",
    title: "Perikoronit",
    icdCode: "K05.2",
    isAcute: true,
    summary: "Inflammation kring operculum på visdomstand. Trismus <20mm = remiss akut.",
  },
  {
    slug: "parodontal-abscess",
    id: "VARK-12-PARAB",
    title: "Parodontal Abscess",
    icdCode: "K05.20 / K05.21",
    isAcute: true,
    summary: "Akut bultande smärta, lös tand. Dränage + PcV 1,6g × 3 vid feber.",
  },
  {
    slug: "anug-herpes",
    id: "VARK-11-GING",
    title: "ANUG / Herpes / Akut Gingivit",
    icdCode: "A69.1 / B00.2 / K05.0",
    isAcute: true,
    summary: "Papillnekros + fetor (ANUG) eller vesikler + feber (Herpes). Metronidazol / Aciklovir.",
  },
  {
    slug: "periimplantit",
    id: "VARK-13-IMPL",
    title: "Periimplantit",
    icdCode: "M27.62",
    isAcute: false,
    summary: "Bennedbrytning kring implantat. BOP + fickdjup. Verifiera torque mot tillverkarens IFU.",
  },
  {
    slug: "furkationsdiagnostik",
    id: "PARO-26-FK",
    title: "Furkationspåverkan — Diagnostik",
    icdCode: "K05.31",
    isAcute: false,
    summary: "Nabers-sond. Klass I–III. Klass III = hopeless prognosis → specialist.",
  },
];

export default function ParodontologiPage() {
  return (
    <div data-theme="stitch-pro" className="max-w-4xl mx-auto px-4 py-10">
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">🦷</span>
          <h1 className="font-display italic text-4xl text-primary">Parodontologi</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl">
          Tandköttssjukdomar — 6 evidensbaserade kliniska scenarier.
          EFP/AAP 2018-klassifikation, BPE-screening, Strama 2024-antibiotika.
          Alla doseringar från NAG/SKR Tandvårdens Läkemedel 2024–2025.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/parodontologi/${s.slug}`} className="block">
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
                <span>Öppna scenario</span>
                <span aria-hidden="true">→</span>
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
