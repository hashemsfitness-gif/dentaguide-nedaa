import { createServerSupabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import GrowthChart from "@/components/admin/GrowthChart";
import ScenarioViewsArea from "@/components/admin/ScenarioViewsArea";
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default async function AnalyticsPage() {
  const supabase = await createServerSupabase();

  // Mock data for analytics trends
  const data = [
    { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 }, { name: 'Maj', value: 500 }, { name: 'Jun', value: 900 }
  ];

  const viewData = [
    { date: 'Mån', views: 2400 }, { date: 'Tis', views: 1398 }, { date: 'Ons', views: 9800 },
    { date: 'Tor', views: 3908 }, { date: 'Fre', views: 4800 }, { date: 'Lör', views: 3800 },
    { date: 'Sön', views: 4300 }
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">Analytics & KPI</h2>
          <p className="text-[var(--text-muted)] mt-2 font-medium">Djupdykning i plattformens användning och tillväxttrender.</p>
        </div>
        
        <div className="bg-white p-2 rounded-2xl border border-[var(--border-light)] flex gap-2">
          {['7d', '30d', '90d', '1y'].map(p => (
            <button key={p} className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[var(--neutral)] transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GrowthChart data={data} />
        <ScenarioViewsArea data={viewData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <KPICard icon={Users} label="Daily Active Users" value="142" delta="+5.2%" color="text-[var(--primary)]" />
        <KPICard icon={Eye} label="Session Time (avg)" value="8m 24s" delta="+1m" color="text-[var(--sidebar-text-active)]" />
        <KPICard icon={TrendingUp} label="Conversion Rate" value="3.8%" delta="+0.4%" color="text-[var(--status-online)]" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[var(--border-light)] p-12">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Top 10 Scenarier (Mest visade)</h3>
        <div className="space-y-4">
          {[
            { title: 'Akut pulpit', views: 1240, category: 'Endodonti' },
            { title: 'Parodontit Stadium III', views: 980, category: 'Parodontologi' },
            { title: 'Postoperativ blödning', views: 850, category: 'Käkkirurgi' },
            { title: 'Tandfraktur (permanent)', views: 720, category: 'Pedodonti' },
            { title: 'Slemhinneförändring (leukoplaki)', views: 640, category: 'Oralmedicin' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--neutral)] transition-colors group">
              <div className="flex items-center gap-4">
                <span className="w-8 text-sm font-mono font-bold text-[var(--text-muted)]">0{i+1}</span>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{s.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono mt-0.5">{s.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-bold text-[var(--text-primary)]">{s.views}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono">Visningar</p>
                </div>
                <div className="w-32 h-2 bg-[var(--neutral)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--sidebar-text-active)]" style={{ width: `${(s.views / 1240) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, delta, color }: any) {
  return (
    <div className="bg-white rounded-[2rem] border border-[var(--border-light)] p-8">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[var(--neutral)]/50", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-end gap-3">
        <h4 className="text-3xl font-bold text-[var(--text-primary)]">{value}</h4>
        <span className="text-xs font-bold text-[var(--status-online)] mb-1">{delta}</span>
      </div>
    </div>
  );
}
