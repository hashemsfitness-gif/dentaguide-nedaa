import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TraumaGuidePermanenta } from '@/components/tools/TraumaGuide';

export const metadata = {
  title: "Traumaguiden - Permanenta tänder | DentaGuide Pro",
  description: "Interaktivt diagnostiskt flödesschema för akut tandtrauma - Permanenta tänder",
};

export default function PermanentaTraumaPage() {
  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-[#f7f2ee]">
      {/* Header */}
      <header className="header-gradient flex items-center px-6">
        <Link href="/dashboard" className="logo text-white italic font-serif text-2xl hover:opacity-80 transition-opacity">
          DentaGuide Pro
        </Link>
        <div className="ml-8 font-mono text-sm uppercase tracking-wider opacity-80 text-white flex items-center">
          <Link href="/tools/traumaguide" className="hover:underline">Traumaguiden</Link>
          <span className="mx-2">/</span>
          Permanenta tänder
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-[1200px] mx-auto p-8 layout-grid">
        <div className="col-span-full mb-6">
          <Link href="/tools/traumaguide" className="inline-flex items-center text-[#CC5833] font-semibold hover:opacity-80">
            <ArrowLeft className="w-4 h-4 mr-2" /> Tillbaka till översikten
          </Link>
        </div>
        
        <div className="col-span-full">
          <TraumaGuidePermanenta />
        </div>
      </main>

      <footer className="text-center py-12 text-sm text-[#0E3B52] opacity-70 flex flex-col items-center gap-2">
        <span>PSL 2010:659 — Ersätter inte kliniskt omdöme</span>
        <span className="text-xs opacity-80">Källor: IADT 2020, Dental Trauma Guide</span>
      </footer>
    </div>
  );
}
