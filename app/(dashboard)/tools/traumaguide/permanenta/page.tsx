import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TraumaGuidePermanenta } from '@/components/tools/TraumaGuide';

export const metadata = {
  title: "Traumaguiden - Permanenta tänder | DentaGuide-Pro",
  description: "Interaktivt diagnostiskt flödesschema för akut tandtrauma - Permanenta tänder",
};

export default function PermanentaTraumaPage() {
  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-[#f7f2ee] pb-20">
      {/* Soft Hero Header (Restored) */}
      <div className="bg-[#0E3B52] pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <Link href="/tools/traumaguide" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Tillbaka till översikten
          </Link>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold tracking-tight">
            Permanenta <span className="italic font-medium text-white/80">tänder</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1000px] mx-auto px-6 -mt-12 relative z-20">
        <TraumaGuidePermanenta />
      </main>

      <footer className="mt-20 text-center text-[#0E3B52]/40 text-xs font-medium uppercase tracking-widest pb-12">
        PSL 2010:659 — Ersätter inte kliniskt omdöme
      </footer>
    </div>
  );
}
