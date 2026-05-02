import ParodKlassificerare from "@/components/tools/ParodKlassificerare";

export const metadata = {
  title: "Parodontologi-klassificerare | DentaGuide Pro",
  description: "EFP/AAP 2018 klassificering av parodontit",
};

export default function ParodKlassificeringPage() {
  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-[#f7f2ee]">
      {/* Header */}
      <header className="header-gradient flex items-center px-6">
        <h1 className="logo text-white italic font-serif text-2xl">
          DentaGuide Pro
        </h1>
        <div className="ml-8 font-mono text-sm uppercase tracking-wider opacity-80">
          Kliniska Verktyg / Parodontologi-klassificerare
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-[1400px] mx-auto p-8 layout-grid">
        <ParodKlassificerare />
      </main>

      <footer className="text-center py-8 text-sm text-[#0E3B52] opacity-70 flex flex-col items-center gap-2">
        <span>PSL 2010:659 — Ersätter inte kliniskt omdöme</span>
        <span className="text-xs opacity-80">Källa: EFP/AAP 2018 — Tonetti et al. J Clin Periodontol.</span>
      </footer>
    </div>
  );
}
