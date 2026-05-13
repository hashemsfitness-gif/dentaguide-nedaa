import React from 'react';
import ManuellJournalmall from '@/components/tools/ManuellJournalmall';
import ManuellQuotaBanner from '@/components/tools/ManuellQuotaBanner';

export const metadata = {
  title: 'Manuell Journalmall | DentaGuide-Pro',
  description: 'Klassisk journalmall för tandvård.',
};

export default function ManuellPage() {
  return (
    <div className="px-4 py-6 lg:px-6">
      <ManuellQuotaBanner />
      <ManuellJournalmall />
    </div>
  );
}
