import React from 'react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '900'],
});

export default function OrtodontiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-transparent ${nunito.variable} font-sans`} data-theme="stitch-pediatric">
      {/* Background Atmosphere */}
      <div className="atmospheric-bg fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="bg-pattern opacity-10" />
      </div>

      <main className="h-full w-full">
        {children}
      </main>
    </div>
  );
}
