import { DoseringKalkylator } from '@/components/tools/DoseringKalkylator';

export default function DoseringPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#0E3B52]">Doseringskalkylator</h1>
        <p className="text-muted-foreground text-lg text-slate-600">
          Klinisk kalkylator för analgetika och antibiotika med TDD-validerade säkerhetsspärrar.
        </p>
      </div>
      <DoseringKalkylator />
      <p className="text-xs text-slate-400 text-center mt-12">
        PSL 2010:659 — Ersätter inte kliniskt omdöme. Maxdoser enligt FASS och Tandvårdens Läkemedel.
      </p>
    </div>
  );
}
