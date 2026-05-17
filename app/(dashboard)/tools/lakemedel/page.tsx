import { LakemedelSearch } from '@/components/tools/LakemedelSearch';

export default function LakemedelPage() {
  return (
    <div className="flex flex-col space-y-8 max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-3 items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#062f40' }}>
          Läkemedelsreferens
        </h1>
        <p className="text-muted-foreground text-lg text-slate-600 max-w-2xl">
          Sök och filtrera läkemedel för att se odontologiska rekommendationer, risker och interaktioner.
        </p>
      </div>
      <LakemedelSearch />
      <p className="text-xs text-slate-400 text-center mt-12">
        PSL 2010:659 — Ersätter inte kliniskt omdöme
      </p>
    </div>
  );
}
