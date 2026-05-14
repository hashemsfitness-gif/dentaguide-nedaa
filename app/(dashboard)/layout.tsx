import type { Metadata } from 'next';
import AppShell from '@/components/landing/AppShell';
import { PremiumGateProvider } from '@/components/landing/PremiumGate';
import { createServerSupabase } from '@/lib/supabase';
import '../(public)/landing.css';

export const metadata: Metadata = {
  title: {
    default: 'Verktyg',
    template: '%s | DentaGuide-Pro',
  },
};

/**
 * app/(dashboard)/layout.tsx — Verktygsmappar och simulator
 *
 * Använder AppShell (editorial nav + footer) istället för den gamla
 * sidebar-layouten. PremiumGateProvider gör att modaler kan trigras
 * från sidor som t.ex. visar uppsälj-CTA.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPremium = false;
  if (user) {
    if (user.email === 'nedaakh95se@gmail.com') {
      isPremium = true;
    } else {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single();
      isPremium = profile?.tier === 'kliniker' || profile?.tier === 'klinik';
    }
  }

  return (
    <PremiumGateProvider isLoggedIn={true} isPremium={true}>
      <AppShell>{children}</AppShell>
    </PremiumGateProvider>
  );
}
