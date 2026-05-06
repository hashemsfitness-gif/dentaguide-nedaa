import Link from "next/link";

const scenarios = [
  {
    slug: "reversibel-pulpit",
    title: "Reversibel pulpit",
    icdCode: "K04.00",
    isAcute: false,
    summary: "Kortvarig smärta vid retning, försvinner <30s. Vital, behandlingsbar tand.",
  },
  {
    slug: "irreversibel-pulpit",
    title: "Irreversibel pulpit",
    icdCode: "K04.01",
    isAcute: true,
    summary: "Spontan, bultande värk >30s. Kräver rotbehandling eller extraktion.",
  },
  {
    slug: "apikal-parodontit",
    title: "Apikal parodontit",
    icdCode: "K04.4/K04.5",
    isAcute: false,
    summary: "Perkussionsöm tand med periapikalt fynd. Nekrotisk pulpa.",
  },
  {
    slug: "akut-apikal-abscess",
    title: "Akut apikal abscess",
    icdCode: "K04.7",
    isAcute: true,
    summary: "Svullnad, feber, fluktuation. Dränage + Ab vid systemtecken.",
  },
  {
    slug: "cracked-tooth",
    title: "Cracked tooth syndrome",
    icdCode: "K03.8",
    isAcute: false,
    summary: "Skarp smärta vid bitupp/bitfrån. Transillumination, Fracfinder.",
  },
  {
    slug: "postoperativ-kontakt",
    title: "Postoperativ kontakt",
    icdCode: "K07.24",
    isAcute: false,
    summary: "Tanden för hög efter fyllning/krona. Ocklusal justering.",
  },
  {
    slug: "dentinhypersensibilitet",
    title: "Dentinhypersensibilitet",
    icdCode: "K03.1",
    isAcute: false,
    summary: "Kortvarig ilning vid kyla/luft/sött. Blottat dentin, fluoridlackning.",
  },
  {
    slug: "postendo-smarta",
    title: "Postendo-smärta / Flare-up",
    icdCode: "K04.4",
    isAcute: true,
    summary: "Ökad smärta 12–48h efter rotbehandling. Ocklusal justering, dränage vid abscess.",
  },
];

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
          <Link key={s.slug} href={`/endodonti/${s.slug}`} className="block">
            <div className="glass-bento hover-lift p-6 h-full flex flex-col gap-3 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display italic text-xl text-primary leading-tight">{s.title}</h2>
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="badge badge-icd">{s.icdCode}</span>
                  {s.isAcute && <span className="badge badge-acute">AKUT</span>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1">{s.summary}</p>
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
