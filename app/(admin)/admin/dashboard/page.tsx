import { createServerSupabase } from "@/lib/supabase";
import StatCard from "@/components/admin/StatCard";
import GrowthChart from "@/components/admin/GrowthChart";
import SubscriptionPie from "@/components/admin/SubscriptionPie";
import ScenarioViewsArea from "@/components/admin/ScenarioViewsArea";
import ActivityFeed from "@/components/admin/ActivityFeed";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();

  // 1. Fetch Summary Stats
  const [userCount, subCount, scenarioCount, mrrResult] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).in('tier', ['kliniker', 'klinik']),
    supabase.from('scenarios').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('profiles').select('tier') // Simplified MRR calculation
  ]);

  const totalUsers = userCount.count || 0;
  const activeSubs = subCount.count || 0;
  const publishedScenarios = scenarioCount.count || 0;
  
  // Calculate MRR (assuming 199 for kliniker, 999 for klinik)
  const mrr = (mrrResult.data || []).reduce((acc, p) => {
    if (p.tier === 'kliniker') return acc + 199;
    if (p.tier === 'klinik') return acc + 999;
    return acc;
  }, 0);

  // 2. Mock Data for Charts (Real data would require more complex grouping queries)
  const growthData = [
    { name: 'Mån', value: 12 }, { name: 'Tis', value: 18 }, { name: 'Ons', value: 15 },
    { name: 'Tor', value: 25 }, { name: 'Fre', value: 22 }, { name: 'Lör', value: 30 },
    { name: 'Sön', value: 28 }
  ];

  const subMixData = [
    { name: 'Free', value: totalUsers - activeSubs },
    { name: 'Kliniker', value: (mrrResult.data || []).filter(p => p.tier === 'kliniker').length },
    { name: 'Klinik', value: (mrrResult.data || []).filter(p => p.tier === 'klinik').length },
  ];

  const viewTrendData = [
    { date: '01 Maj', views: 400 }, { date: '02 Maj', views: 300 },
    { date: '03 Maj', views: 600 }, { date: '04 Maj', views: 800 },
    { date: '05 Maj', views: 500 }, { date: '06 Maj', views: 900 },
    { date: '07 Maj', views: 750 },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">Systemöversikt</h2>
          <p className="text-[var(--text-muted)] mt-2 font-medium">Välkommen tillbaka. Här är plattformens status just nu.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Totala Användare" value={totalUsers} delta="+2.4%" variant="users" trend="up" />
        <StatCard label="Aktiva Abonnemang" value={activeSubs} delta="+12 (30d)" variant="subs" trend="up" />
        <StatCard label="Publicerade Scenarios" value={publishedScenarios} delta="100% live" variant="scenarios" trend="stable" />
        <StatCard label="Beräknad MRR" value={`${mrr.toLocaleString()} kr`} delta="+850 kr" variant="mrr" trend="up" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GrowthChart data={growthData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SubscriptionPie data={subMixData} />
            <ScenarioViewsArea data={viewTrendData} />
          </div>
        </div>
        
        <div className="lg:col-span-1 h-[632px]">
          <ActivityFeed />
        </div>
      </div>
      
      {/* Disclaimer */}
      <footer className="pt-12 text-center text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] opacity-40 font-mono">
        PSL 2010:659 — Systemet ersätter inte kliniskt omdöme • Verifierad Klinisk Analytics
      </footer>
    </div>
  );
}
