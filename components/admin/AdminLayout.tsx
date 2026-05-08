'use client';

import Sidebar from './Sidebar';
import TopAppBar from './TopAppBar';
import SystemStatusFooter from './SystemStatusFooter';
import AdminCommandPalette from './AdminCommandPalette';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div data-theme="stitch-admin" className="min-h-screen flex bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopAppBar />
        <main className="flex-1 p-8 pb-20 overflow-y-auto relative">
          {/* Dot pattern background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
               style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
        <SystemStatusFooter />
        <AdminCommandPalette />
      </div>
    </div>
  );
}
