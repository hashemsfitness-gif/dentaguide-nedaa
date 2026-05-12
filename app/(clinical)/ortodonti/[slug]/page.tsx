"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import { ortodontiScenarios } from '@/lib/data/ortodonti-scenarios';
import OrtScenarioSidebar from '@/components/ortodonti/OrtScenarioSidebar';
import OrtScenarioContent from '@/components/ortodonti/OrtScenarioContent';
import OrtRightPanel from '@/components/ortodonti/OrtRightPanel';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OrtScenarioPage({ params }: Props) {
  const { slug } = await params;
  const scenario = ortodontiScenarios[slug];

  if (!scenario) {
    notFound();
  }

  return (
    <div className="min-h-screen font-nunito p-8">
      {/* Top Breadcrumb / Navigation */}
      <div className="max-w-[1800px] mx-auto flex justify-between items-center mb-12 px-4">
        <div className="flex items-center gap-4">
           <Link href="/ortodonti" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
             ←
           </Link>
           <h1 className="text-3xl font-display italic text-slate-800">Ortodonti Workspace</h1>
        </div>
        <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
           <Link href="/ortodonti" className="hover:text-slate-600">Dashboard</Link>
           <span className="text-slate-800 border-b-2 border-blue-500 pb-1 cursor-pointer">Clinical Engine</span>
           <Link href="/ortodonti/riktlinjer" className="hover:text-slate-600">Guidelines</Link>
        </div>
        <div className="flex items-center gap-6 text-slate-400">
           <span className="cursor-pointer">🔍</span>
           <span className="cursor-pointer">🔔</span>
           <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://placehold.co/100x100/slate/white?text=A9" alt="Agent 09" />
           </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-10">
        
        {/* COLUMN 1: Scenario List (3/12) */}
        <div className="col-span-3 sticky top-8 h-fit">
          <OrtScenarioSidebar />
        </div>

        {/* COLUMN 2: Scenario Content (6/12) */}
        <div className="col-span-6">
           <OrtScenarioContent scenario={scenario} />
        </div>

        {/* COLUMN 3: Clinical Tools (3/12) */}
        <div className="col-span-3 sticky top-8 h-fit">
          <OrtRightPanel 
            redFlags={scenario.redFlags} 
            billingCodes={scenario.billingCodes}
          />
        </div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .shadow-clay {
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(255, 255, 255, 1) inset;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
