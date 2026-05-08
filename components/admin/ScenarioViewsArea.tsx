'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ViewTrend {
  date: string;
  views: number;
}

export default function ScenarioViewsArea({ data }: { data: ViewTrend[] }) {
  return (
    <div className="w-full h-[300px] bg-white rounded-[2rem] border border-[var(--border-light)] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">Klinisk Aktivitet</h3>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1">Scenario-visningar (7d)</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-secondary)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--chart-secondary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[var(--chart-secondary)] text-white px-4 py-2 rounded-xl shadow-xl text-xs font-bold">
                    {payload[0].value} visningar
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="views" 
            stroke="var(--chart-secondary)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorViews)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
