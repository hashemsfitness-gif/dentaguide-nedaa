import React from 'react';
import AIJournalmallAgent from '@/components/tools/AIJournalmallAgent';

export const metadata = {
  title: 'AI-assisterad Journalmall | DentaGuide-Pro',
  description: 'AI-strukturerad journalanteckning för tandvård.',
};

export default function AIJournalPage() {
  return <AIJournalmallAgent />;
}
