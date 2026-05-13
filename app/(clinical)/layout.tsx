import AppShell from '@/components/landing/AppShell';
import { PremiumGateProvider } from '@/components/landing/PremiumGate';
import { createServerSupabase } from '@/lib/supabase';
import '../(public)/landing.css';

/**
 * app/(clinical)/layout.tsx — Kliniska områden (endodonti, parodontologi, etc.)
 *
 * Wrappar alla kliniska sidor med editorial AppShell. Pedodonti och
 * ortodonti har egna sub-layouts som nestlar inuti detta shell.
 */
export default async function ClinicalLayout({
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
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();
    isPremium = profile?.tier === 'kliniker' || profile?.tier === 'klinik';
  }

  return (
    <PremiumGateProvider isLoggedIn={!!user} isPremium={isPremium}>
      <AppShell>{children}</AppShell>
    </PremiumGateProvider>
  );
}
