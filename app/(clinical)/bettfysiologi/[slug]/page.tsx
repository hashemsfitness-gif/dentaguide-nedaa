import { notFound } from "next/navigation";
import Link from "next/link";
import { bettfysiologiScenarier } from "@/lib/data/bettfysiologi-scenarios";
import { 
  ArrowLeft, 
  ChevronRight, 
  ClipboardCheck, 
  Stethoscope, 
  Wrench, 
  AlertCircle, 
  AlertTriangle,
  BookOpen,
  History,
  FileText,
  Info
} from "lucide-react";
import VASSkala from "@/components/tools/VASSkala";
import DCTMDScreening from "@/components/tools/DCTMDScreening";

export async function generateStaticParams() {
  return Object.values(bettfysiologiScenarier).map((s) => ({
    slug: s.slug,
  }));
}

export default async function BettfysiologiScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = bettfysiologiScenarier[slug];

  if (!scenario) {
    notFound();
  }

  const allScenarios = Object.values(bettfysiologiScenarier);

  return (
    <div 
      data-theme="stitch-pro"
      className="flex flex-col lg:flex-row min-h-screen bg-[#F7F2EE]"
    >
      <div className="noise-overlay" />

      {/* LEFT SIDEBAR: NAVIGATION */}
      <aside className="w-full lg:w-72 border-r border-black/5 bg-[#F7F2EE]/80 backdrop-blur-xl flex flex-col sticky top-0 lg:h-screen overflow-y-auto">
        <div className="p-6 border-b border-black/5">
          <Link 
            href="/bettfysiologi"
            className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-[#0D9488] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3" />
            Tillbaka till översikt
          </Link>
          <div className="mt-6">
            <h2 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">
              Agent 07
            </h2>
            <h1 className="font-display italic text-2xl text-primary">Bettfysiologi</h1>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {allScenarios.map((s) => (
            <Link
              key={s.slug}
              href={`/bettfysiologi/${s.slug}`}
              className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                s.slug === slug 
                  ? "bg-[#0D9488]/5 border border-[#0D9488]/20 shadow-sm" 
                  : "hover:bg-black/5 border border-transparent"
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                  s.slug === slug ? "text-[#0D9488]" : "text-muted-foreground"
                }`}>
                  SCENARIO {s.scId}
                </span>
                <span className={`text-sm font-medium leading-tight ${
                  s.slug === slug ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                }`}>
                  {s.title}
                </span>
              </div>
              {s.slug === slug && <ChevronRight className="w-4 h-4 text-[#0D9488]" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-black/5 bg-[#F8FAFC]/50">
          <div className="text-[9px] font-mono text-muted-foreground leading-relaxed uppercase tracking-widest text-center">
            Standard: DC/TMD 2014 & Internetodontologi
          </div>
        </div>
      </aside>

      {/* MIDDLE SECTION: MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-white/40">
        <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-2xl border-b border-black/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center border border-[#0D9488]/20 shadow-sm backdrop-blur-md">
              <span className="text-xl" aria-hidden="true">🦷</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-bold text-[#0D9488] bg-[#0D9488]/10 px-1.5 py-0.5 rounded border border-[#0D9488]/20 uppercase">
                  {scenario.icdCode}
                </span>
                {scenario.isAcute && (
                  <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase animate-pulse">
                    AKUT PROTOKOLL
                  </span>
                )}
              </div>
              <h2 className="font-display italic text-2xl text-primary leading-none">{scenario.title}</h2>
            </div>
          </div>
          
          <div className="hidden sm:flex gap-2">
             <div className="flex flex-col items-end">
               <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Senast uppdaterad</span>
               <span className="text-[10px] font-medium">Maj 2024</span>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-4xl mx-auto p-6 space-y-12 pb-24">
            
            {/* SNABBÖVERSIKT */}
            <section id="overview" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <ClipboardCheck className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Snabböversikt</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {scenario.snabbOversikt.map((item, idx) => (
                  <div key={idx} className="glass-bento p-5 border-l-2 border-l-[#0D9488] shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-widest block mb-2">{item.label}</span>
                    <p className="text-sm font-medium leading-relaxed text-primary">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ANAMNES */}
            <section id="anamnes" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Anamnes (Klinisk Historik)</h3>
              </div>
              <div className="space-y-4">
                {scenario.anamnes.obligatoriska.map((item, idx) => (
                  <div key={idx} className="glass-bento p-5 border-l-2 border-l-[#0D9488]/40 shadow-sm">
                    <p className="text-sm font-bold text-primary mb-2 flex items-start gap-2">
                      <span className="text-[#0D9488] font-mono">Q.</span> {item.q}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground italic pl-6 border-l border-[#0D9488]/20 py-1 bg-[#F8FAFC]/30 rounded-r">
                      <span className="text-[10px] font-mono font-bold text-[#0D9488]/60 uppercase mr-2 tracking-widest">Svar:</span>
                      {item.a}
                    </p>
                  </div>
                ))}
                <div className="p-5 rounded-2xl bg-[#0D9488]/5 border border-[#0D9488]/10">
                  <h4 className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-widest mb-3">Kompletterande frågor</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {scenario.anamnes.kompletterande.map((q, idx) => (
                      <li key={idx} className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#0D9488]" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* STATUS */}
            <section id="status" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <Stethoscope className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Status & Undersökning</h3>
              </div>

              {/* SPECIAL WARNING FOR BETT-34 */}
              {slug === "artrit" && (
                <div className="mb-6 p-5 rounded-2xl bg-[#0D9488]/5 border-2 border-[#0D9488]/20 flex gap-4 items-start shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0 border border-[#0D9488]/20">
                    <AlertCircle className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-widest">Klinisk Logik: Käkledsartrit</h4>
                    <p className="text-sm font-bold text-primary leading-snug">
                      Ipsilateral molarprematurkontakt + <span className="underline decoration-[#0D9488] decoration-2 underline-offset-2">KONTRALATERALT</span> öppet bett.
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      Varning: Ipsilateralt öppet bett är FELVÄNT — kontrollera diagnos.
                    </p>
                  </div>
                </div>
              )}

              <div className="glass-bento p-6 shadow-sm border-t-4 border-t-[#0D9488]">
                <ul className="space-y-4">
                  {scenario.status.inspektion.map((item, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/40 transition-colors group">
                      <div className="w-6 h-6 rounded-lg bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0D9488]/20 transition-colors shadow-inner">
                        <span className="text-xs font-mono font-bold text-[#0D9488]">{idx + 1}</span>
                      </div>
                      <p className="text-sm font-medium leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* BEHANDLING */}
            <section id="behandling" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Behandlingsprotokoll</h3>
              </div>
              
              {scenario.behandling.varning && (
                <div className="mb-8 p-6 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm flex gap-4 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 animate-bounce" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-[0.2em] mb-1">Kritiskt medskick</h4>
                    <p className="text-sm font-bold text-red-900 leading-relaxed">{scenario.behandling.varning}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-6">
                {scenario.behandling.alternativ.map((alt, idx) => (
                  <div key={idx} className="glass-bento overflow-hidden shadow-md border-l-4 border-l-[#0D9488]">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-display italic text-xl text-primary">{alt.title}</h4>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground bg-black/5 px-2 py-0.5 rounded uppercase">Alt {idx + 1}</span>
                      </div>
                      {alt.indikation && (
                        <div className="mb-6 p-4 rounded-xl bg-white/20 border border-black/5">
                          <span className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-widest block mb-1">Indikation</span>
                          <p className="text-xs font-medium text-muted-foreground italic leading-relaxed">{alt.indikation}</p>
                        </div>
                      )}
                      <div className="space-y-3">
                         <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest block mb-2">Metod & Utförande</span>
                         {alt.metod.map((step, sIdx) => (
                           <div key={sIdx} className="flex gap-3 items-start group">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(13,148,136,0.4)] group-hover:scale-125 transition-transform" />
                             <p className="text-sm font-medium leading-relaxed text-muted-foreground group-hover:text-primary transition-colors">{step}</p>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* JOURNALMALL */}
            <section id="journal" className="scroll-mt-32">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">Journalmallar</h3>
              </div>
              <div className="space-y-6">
                {scenario.journal.map((j, idx) => (
                  <div key={idx} className="glass-bento bg-[#0D9488]/5 border-[#0D9488]/10 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-[#0D9488]/10 bg-white/40 flex justify-between items-center">
                      <h4 className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-widest">{j.titel}</h4>
                      <button className="text-[10px] font-mono font-bold text-[#0D9488] bg-[#0D9488]/10 px-2 py-1 rounded hover:bg-[#0D9488]/20 transition-colors uppercase">
                        Kopiera text
                      </button>
                    </div>
                    <div className="p-6">
                      <pre className="text-xs font-medium leading-relaxed whitespace-pre-wrap font-sans text-muted-foreground">
                        {j.text}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
          
          <footer className="p-8 border-t border-black/5 bg-white text-center">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
              DENTAGUIDE PRO — AGENT 07: BETTFYSIOLOGI<br />
              ANSVARIG UTGIVARE: DENTAGUIDE SVERIGE AB<br />
              LAGLIG REFERENS: PSL 2010:659 (PATIENTSÄKERHETSLAGEN)
            </p>
          </footer>
        </div>
      </main>

      {/* RIGHT SIDEBAR: TOOLS & CLINICAL NOTES */}
      <aside className="w-full lg:w-80 border-l border-black/5 bg-[#F7F2EE]/80 backdrop-blur-xl p-6 space-y-6 sticky top-0 lg:h-screen overflow-y-auto">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4">Kliniska Verktyg</h3>
        
        {/* DC/TMD SCREENING TOOL */}
        <DCTMDScreening />

        {/* VAS SCALE TOOL */}
        <VASSkala />

        {/* RED FLAGS */}
        <div className="glass-bento p-4 space-y-4 border-l-4 border-l-red-500 bg-white/20">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Röda Flaggor</h3>
          </div>
          <div className="space-y-3">
            {scenario.redFlags.map((flag) => (
              <div key={flag.id} className="p-3 rounded-lg bg-red-50/50 border border-red-100 backdrop-blur-sm">
                <span className="text-[9px] font-mono font-bold text-red-600 uppercase block mb-1">
                  {flag.severity === "critical" ? "BRÅDSKANDE" : "VARNING"}
                </span>
                <p className="text-[11px] font-bold text-red-900 leading-tight mb-1">{flag.title}</p>
                <p className="text-[10px] text-red-700 leading-tight italic">{flag.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DIFFERENTIAL DIAGNOSES */}
        <div className="glass-bento p-4 space-y-4 border-l-4 border-l-amber-500 bg-white/20">
          <div className="flex items-center gap-2 text-amber-600">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Diff. Diagnoser</h3>
          </div>
          <div className="space-y-4">
            {scenario.diffDiagnoser.map((diff, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-primary group-hover:text-amber-600 transition-colors">{diff.namn}</span>
                  <span className="text-[9px] font-mono font-bold text-muted-foreground">{diff.kod}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed italic border-l border-amber-200 pl-2">
                  {diff.skillnad}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CLINICAL NOTE */}
        <div className="p-4 rounded-2xl bg-[#0D9488]/5 border border-[#0D9488]/20 border-dashed">
          <div className="flex items-center gap-2 text-[#0D9488] mb-2">
            <Info className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Kliniskt tips</span>
          </div>
          <p className="text-[11px] font-medium text-[#0D9488] leading-relaxed italic">
            {scenario.kliniskAnteckning}
          </p>
        </div>

      </aside>
    </div>
  );
}
