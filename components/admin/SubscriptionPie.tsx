'use client';

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

interface PieData {
  name: string;
  value: number;
}

const COLORS = ['#B6CBC0', '#FF7E55', '#C9A84C']; // Matching StatCard variants

export default function SubscriptionPie({ data }: { data: PieData[] }) {
  return (
    <div className="w-full h-[300px] bg-white rounded-[2rem] border border-[var(--border-light)] p-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">Abonnemangsmix</h3>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1">Fördelning av tiers</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-[var(--border-light)] px-4 py-2 rounded-xl shadow-xl text-xs font-bold">
                    <span className="text-[var(--text-muted)]">{payload[0].name}: </span>
                    <span className="text-[var(--text-primary)]">{payload[0].value}</span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
