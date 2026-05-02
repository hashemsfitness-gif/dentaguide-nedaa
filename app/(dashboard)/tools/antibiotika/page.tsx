import { AntibiotikaTool } from '@/components/tools/AntibiotikaTool';

export default function AntibiotikaPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#0E3B52]">Antibiotikastöd (Strama)</h1>
        <p className="text-muted-foreground text-lg text-slate-600">
          Evidensbaserat beslutsstöd för antibiotikaförskrivning inom tandvården enligt Strama 2024.
        </p>
      </div>
      <AntibiotikaTool />
      <p className="text-xs text-slate-400 text-center mt-12">
        PSL 2010:659 — Ersätter inte kliniskt omdöme. Baserat på Strama och Regionala Riktlinjer.
      </p>
    </div>
  );
}
