'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar,
} from 'recharts';
import { weeklyCompletedData } from '@/lib/mockData';
import { useTheme } from '@/components/providers/ThemeProvider';

// ─── Shared chart colors ──────────────────────────────────────────────────────
const STATUS_COLORS = {
  done:        '#22c55e',
  'in-progress':'#60a5fa',
  'in-review': '#a78bfa',
  todo:        '#94a3b8',
};

// ─── Task Area Chart ──────────────────────────────────────────────────────────
export function TaskAreaChart() {
  const { theme } = useTheme();
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={weeklyCompletedData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: theme === 'dark' ? 'hsl(222 25% 12%)' : '#fff',
            border: '1px solid hsl(220 13% 88%)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#6366f1"
          strokeWidth={2.5}
          fill="url(#areaGrad)"
          dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Task Pie Chart ───────────────────────────────────────────────────────────
interface PieChartProps {
  data: { name: string; value: number; status: string }[];
}

export function TaskPieChart({ data }: PieChartProps) {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] ?? '#94a3b8'}
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: theme === 'dark' ? 'hsl(222 25% 12%)' : '#fff',
            border: '1px solid hsl(220 13% 88%)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '11px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Tasks per Project Bar Chart ──────────────────────────────────────────────
interface BarChartProps {
  data: { name: string; tasks: number; completed: number }[];
}

export function TaskBarChart({ data }: BarChartProps) {
  const { theme } = useTheme();
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={36}
        />
        <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: theme === 'dark' ? 'hsl(222 25% 12%)' : '#fff',
            border: '1px solid hsl(220 13% 88%)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey="tasks"     fill="#6366f1" radius={[4,4,0,0]} name="Total" />
        <Bar dataKey="completed" fill="#22c55e" radius={[4,4,0,0]} name="Done" />
      </BarChart>
    </ResponsiveContainer>
  );
}
