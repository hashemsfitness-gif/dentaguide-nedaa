'use client';

import React from 'react';
import { SimulatorFooter } from './SimulatorFooter';

interface SimulatorLayoutProps {
  children: React.ReactNode;
}

export function SimulatorLayout({ children }: SimulatorLayoutProps) {
  return (
    <div data-theme="stitch-pro" className="min-h-screen simulator-multi-accent flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
      <SimulatorFooter />
      <div className="noise-overlay" />
    </div>
  );
}
