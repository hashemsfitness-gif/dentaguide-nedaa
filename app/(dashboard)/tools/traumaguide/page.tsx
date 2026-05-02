import Link from 'next/link';
import { ArrowRight, Baby, UserRound } from 'lucide-react';

export const metadata = {
  title: "Traumaguiden | DentaGuide Pro",
  description: "Interaktivt diagnostiskt flödesschema för akut tandtrauma",
};

export default function TraumaGuidePage() {
  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-[#f7f2ee]">
      {/* Header */}
      <header className="header-gradient flex items-center px-6">
        <Link href="/dashboard" className="logo text-white italic font-serif text-2xl hover:opacity-80 transition-opacity">
          DentaGuide Pro
        </Link>
        <div className="ml-8 font-mono text-sm uppercase tracking-wider opacity-80 text-white">
          Kliniska Verktyg / Traumaguiden
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-[1000px] mx-auto p-8">
        <div className="text-center mb-12 mt-8">
          <h2 className="editorial-header text-5xl text-[#0E3B52] mb-4">Traumaguiden</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto text-[#0E3B52]">
            Interaktivt diagnostiskt flödesschema för akut tandtrauma baserat på IADT 2020 och Dental Trauma Guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mjölktänder */}
          <Link href="/tools/traumaguide/primara" className="glass-bento hover-lift group block text-left">
            <div className="bg-[#1E3028]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Baby className="w-8 h-8 text-[#1E3028]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0E3B52] mb-3">Primära tänder (mjölktänder)</h3>
            <p className="opacity-70 mb-6 text-[#0E3B52]">Barn 0–6 år. Grundprincip: Mjölktänder ska ALDRIG reponeras med kraft eller replanteras.</p>
            <div className="flex items-center text-[#CC5833] font-semibold">
              Starta guide <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Permanenta tänder */}
          <Link href="/tools/traumaguide/permanenta" className="glass-bento hover-lift group block text-left">
            <div className="bg-[#0E3B52]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <UserRound className="w-8 h-8 text-[#0E3B52]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0E3B52] mb-3">Permanenta tänder</h3>
            <p className="opacity-70 mb-6 text-[#0E3B52]">Barn 6+ år och vuxna. Grundprincip: Utslagen permanent tand = HYPERAKUT replantation.</p>
            <div className="flex items-center text-[#CC5833] font-semibold">
              Starta guide <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>

      <footer className="text-center py-12 text-sm text-[#0E3B52] opacity-70 flex flex-col items-center gap-2">
        <span>PSL 2010:659 — Ersätter inte kliniskt omdöme</span>
        <span className="text-xs opacity-80">Källor: IADT 2020, Dental Trauma Guide</span>
      </footer>
    </div>
  );
}
