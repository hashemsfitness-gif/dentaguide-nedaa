import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase';

export const metadata = {
  title: 'Översikt | DentaGuide-Pro',
};

const kliniskaScenarier = [
  { href: '/endodonti', label: 'Endodonti', icon: '🦷', desc: '8 scenarier — pulpit, abscess, cracked tooth' },
  { href: '/parodontologi', label: 'Parodontologi', icon: '🩸', desc: '6 scenarier — gingivit, NUG, perimplantit' },
  { href: '/bettfysiologi', label: 'Bettfysiologi / TMD', icon: '🦴', desc: '6 scenarier — DC/TMD 2014' },
  { href: '/protetik', label: 'Protetik', icon: '👑', desc: '7 scenarier — krona, implantat, protes' },
  { href: '/kakkirurgi', label: 'Käkkirurgi', icon: '⚕️', desc: '7 scenarier — alveolit, blödning, parestesi' },
  { href: '/oralmedicin', label: 'Oralmedicin', icon: '💊', desc: '6 scenarier — afte, candidos, MRONJ' },
  { href: '/pedodonti', label: 'Pedodonti', icon: '🧒', desc: '34 scenarier — trauma, akut, beteende' },
  { href: '/ortodonti', label: 'Ortodonti', icon: '🔧', desc: '8 scenarier — bracket, retainer, tråd' },
];

const verktyg = [
  { href: '/tools/lakemedel', label: 'Läkemedelsreferens', icon: '📋' },
  { href: '/tools/antibiotika', label: 'Antibiotikastöd', icon: '🧬' },
  { href: '/tools/dosering', label: 'Doseringskalkylatorn', icon: '⚖️' },
  { href: '/tools/parod-klassificering', label: 'Parod-klassificering', icon: '📊' },
  { href: '/tools/journalmall', label: 'Journalmall', icon: '📝' },
  { href: '/tools/traumaguide', label: 'Traumaguiden', icon: '🚨' },
  { href: '/tools/debitering', label: 'Debiteringsstöd', icon: '🧾' },
];

export default async function DashboardHomePage({
  searchParams,
}: {
  searchParams: Promise<{ onboarding?: string }>;
}) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, tier, role')
    .eq('id', user.id)
    .single();

  const params = await searchParams;
  const showOnboarding = params.onboarding === 'true';
  const displayName = profile?.full_name || user.email?.split('@')[0] || 'tandläkare';
  const tierLabel = profile?.tier === 'klinik' ? 'Klinik' : profile?.tier === 'kliniker' ? 'Kliniker' : 'Gratis';

  return (
    <div className="max-w-6xl mx-auto">
      {showOnboarding && (
        <div className="mb-6 p-4 rounded-2xl border" style={{ background: 'rgba(45,106,79,0.08)', borderColor: 'rgba(45,106,79,0.25)' }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--status-success, #2D6A4F)' }}>
            🎉 Välkommen till DentaGuide-Pro, {displayName}!
          </h2>
          <p className="text-sm text-muted-foreground">
            Ditt konto är skapat. Börja med att utforska ett kliniskt område nedan eller testa ett av de kliniska verktygen.
          </p>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Översikt</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inloggad som <strong>{displayName}</strong> · Tier: <strong>{tierLabel}</strong>
          {profile?.role === 'admin' && ' · '}
          {profile?.role === 'admin' && (
            <Link href="/admin/dashboard" className="font-medium underline" style={{ color: 'var(--secondary)' }}>
              Admin-panel
            </Link>
          )}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Kliniska områden
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {kliniskaScenarier.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{s.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Kliniska verktyg
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {verktyg.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-2"
            >
              <span className="text-xl" aria-hidden="true">{v.icon}</span>
              <span className="text-sm font-medium">{v.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
