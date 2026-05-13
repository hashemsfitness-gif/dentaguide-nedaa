'use client';

const INSTITUTIONS = [
  'Socialstyrelsen',
  'Nationella riktlinjer',
  'Folkhälsomyndigheten',
  'Strama 2024',
  'SBU',
  'EFP / AAP 2018',
  'Läkemedelsverket',
  'FASS',
  'Janusmed',
  'VGR Riktlinjer',
  'KUSP TLV',
  'Tandvårdsläkemedel 2024–2025',
  'Tandvårdens Kunskapscentrum',
];

export default function InstitutionsMarquee() {
  const items = (
    <>
      {INSTITUTIONS.map((name, i) => (
        <span key={`a-${i}`} className="flex items-center gap-7 whitespace-nowrap">
          <span className="font-display text-[22px] text-ink/70">{name}</span>
          <span className="text-ink/20 text-2xl">·</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="bg-neutral border-y border-border-light">
      <div className="max-w-[1280px] mx-auto px-8 py-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div className="font-mono text-[10px] tracking-widest2 uppercase text-ink/55 max-w-[180px]">
          Synkroniserat med riktlinjer från
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral to-transparent z-10 pointer-events-none" />
          <div className="marq inline-flex items-center gap-16">
            {items}
            {items}
          </div>
        </div>
      </div>
    </section>
  );
}
