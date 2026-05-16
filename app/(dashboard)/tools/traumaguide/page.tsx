import Link from 'next/link';
import { ArrowRight, Baby, UserRound } from 'lucide-react';

export const metadata = {
  title: "Traumaguiden | DentaGuide-Pro",
  description: "Interaktivt diagnostiskt flödesschema för akut tandtrauma",
};

export default function TraumaGuidePage() {
  return (
    <div data-theme="stitch-pro" className="min-h-screen bg-[#f7f2ee]">
      {/* Editorial Header Section */}
      <div className="bg-[#0E3B52] pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-mono text-[10px] tracking-[0.22em] uppercase mb-8 backdrop-blur-sm border border-white/10">
              Kliniska Beslutsstöd
            </span>
            <h1 className="font-display text-white text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Trauma<span className="italic font-medium">guiden</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-body font-medium leading-relaxed">
              Interaktivt beslutsstöd baserat på <span className="text-white">IADT 2020</span> och <span className="text-white">Dental Trauma Guide</span>. 
              Gå från symtom till åtgärd på sekunder.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <main className="max-w-[1200px] mx-auto px-6 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mjölktänder Card */}
          <Link href="/tools/traumaguide/primara" className="bg-white border border-[var(--border-light)] rounded-[32px] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group block text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E3028]/5 rounded-bl-[100px] group-hover:scale-110 transition-transform" />
            
            <div className="bg-[#1E3028]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Baby className="w-10 h-10 text-[#1E3028]" />
            </div>
            
            <h3 className="font-display text-3xl font-bold text-[#0E3B52] mb-4">Primära tänder</h3>
            <p className="text-[#0E3B52]/60 font-medium text-lg mb-8 leading-relaxed">
              Patienter 0–6 år. Fokus på att skydda det permanenta anlaget. 
              <span className="block mt-2 font-bold text-red-600/70 uppercase text-xs tracking-wider">⚠️ Replanteras aldrig</span>
            </p>
            
            <div className="flex items-center text-[#CC5833] font-bold text-lg">
              Starta guiden 
              <div className="ml-3 w-10 h-10 rounded-full border-2 border-[#CC5833]/20 flex items-center justify-center group-hover:bg-[#CC5833] group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Permanenta tänder Card */}
          <Link href="/tools/traumaguide/permanenta" className="bg-white border border-[var(--border-light)] rounded-[32px] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group block text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0E3B52]/5 rounded-bl-[100px] group-hover:scale-110 transition-transform" />
            
            <div className="bg-[#0E3B52]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <UserRound className="w-10 h-10 text-[#0E3B52]" />
            </div>
            
            <h3 className="font-display text-3xl font-bold text-[#0E3B52] mb-4">Permanenta tänder</h3>
            <p className="text-[#0E3B52]/60 font-medium text-lg mb-8 leading-relaxed">
              Vuxna och barn 6+ år. Akuta åtgärder vid exartikulation och frakturer.
              <span className="block mt-2 font-bold text-[#0E3B52]/70 uppercase text-xs tracking-wider">⚡ Hyperakut vid utslagen tand</span>
            </p>
            
            <div className="flex items-center text-[#CC5833] font-bold text-lg">
              Starta guiden 
              <div className="ml-3 w-10 h-10 rounded-full border-2 border-[#CC5833]/20 flex items-center justify-center group-hover:bg-[#CC5833] group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#0E3B52]/50 text-sm font-medium flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#0E3B52]/10"></span>
            PSL 2010:659 — Ersätter inte kliniskt omdöme
            <span className="w-8 h-px bg-[#0E3B52]/10"></span>
          </p>
        </div>
      </main>
    </div>
  );
}
