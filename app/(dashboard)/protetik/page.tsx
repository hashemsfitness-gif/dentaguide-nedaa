import Link from "next/link";

const scenarios = [
  {
    slug: "lossnad-tillfallig-krona",
    id: "PROT-15-PROV",
    name: "Lossnad tillfällig krona",
    icd: "Z46.3 / K08.5",
    isAcute: false,
    summary: "Provisorium lossnat — risk tandvandring och pulpit. Temp-cement ALLTID, aldrig permanent cement.",
  },
  {
    slug: "implantat-komplikation",
    id: "PROT-16-IMPKOMP",
    name: "Implantat-komplikation",
    icd: "T85.6",
    isAcute: true,
    summary: "Lossnad skruv, porslinschip eller fixturförlust. Verifiera torque mot tillverkarens IFU — ALDRIG generella värden.",
  },
  {
    slug: "fraktur-stodtand",
    id: "PROT-17-FRAKPEL",
    name: "Fraktur av stödtand",
    icd: "S02.5 / K08.5",
    isAcute: true,
    summary: "Tanden sitter inuti kronan. Ferrule ≥ 2mm = spara. Subgingival fraktur eller < 2mm = extraktion.",
  },
  {
    slug: "tryckssar-protesstomatit",
    id: "PROT-18-DECUB",
    name: "Trycksår / Protesstomatit",
    icd: "K12.0 / Z46.3",
    isAcute: false,
    summary: "Protes skaver — slipning + ocklusionskontroll. Sår ej läkt på 14 dagar → remiss malignitet.",
  },
  {
    slug: "fraktur-protes",
    id: "PROT-19-PROFRAK",
    name: "Fraktur av avtagbar protes",
    icd: "K08.5 / Z46.3",
    isAcute: false,
    summary: "Basfraktur, lossnad tand eller klammerfraktur. Sticky-wax, ej superlim. Rebasering om protesen vickade.",
  },
  {
    slug: "porslinsfraktur",
    id: "PROT-20-CHIP",
    name: "Porslinsfraktur (chip-off)",
    icd: "K08.5 / T85.6",
    isAcute: false,
    summary: "Vassa kanter, estetisk störning. Putsning / kompositreparation / omgörning. Kontrollera bruxism.",
  },
  {
    slug: "lossnad-krona",
    id: "PROT-21-LOSSKR",
    name: "Lossnad permanent krona / bro",
    icd: "K08.5",
    isAcute: true,
    summary: "ASPIRATIONSANAMNES ALLTID FÖRST. Cementval per material: MK → Zinkfosfat, Zirkonia → Variolink.",
  },
];

export default function ProtetikPage() {
  return (
    <div data-theme="stitch-pro" className="max-w-4xl mx-auto px-4 py-10">
      <div className="noise-overlay" />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">👑</span>
          <h1 className="font-display italic text-4xl text-primary">Protetik &amp; Bettfunktion</h1>
        </div>
        <p className="accent-line text-muted-foreground font-medium mt-4 max-w-2xl">
          Akuta protetiska komplikationer — 7 evidensbaserade kliniska scenarier.
          Cementval, ferrule-effekt, implantat-torque och materialprotokoll.
          Alla rekommendationer från Internetodontologi.se, FASS och tillverkar-IFU.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {scenarios.map((s) => (
          <Link key={s.slug} href={`/protetik/${s.slug}`} className="block">
            <div className="glass-bento hover-lift p-6 h-full flex flex-col gap-3 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                    {s.id}
                  </span>
                  <h2 className="font-display italic text-xl text-primary leading-tight">{s.name}</h2>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 flex-col items-end">
                  <span className="badge badge-icd">{s.icd}</span>
                  {s.isAcute && (
                    <span className="badge badge-acute" aria-label="Akut scenario">
                      AKUT
                    </span>
                  )}
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
