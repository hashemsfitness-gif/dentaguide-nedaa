'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface GrowthData {
  name: string;
  value: number;
}

export default function GrowthChart({ data }: { data: GrowthData[] }) {
  return (
    <div className="w-full h-[300px] bg-white rounded-[2rem] border border-[var(--border-light)] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">Tillväxtdynamik</h3>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-mono mt-1">Registreringar (30d)</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
          <XAxis 
            dataKey="name" 
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
            cursor={{ fill: 'var(--neutral)', radius: 8 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[var(--text-primary)] text-white px-4 py-2 rounded-xl shadow-xl text-xs font-bold border border-white/10">
                    {payload[0].value} nya användare
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="var(--chart-primary)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
