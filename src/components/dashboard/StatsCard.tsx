'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  description?: string;
  trend?: { value: number; label: string };
}

const colorMap = {
  primary: 'from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))]',
  success: 'from-green-500 to-emerald-400',
  warning: 'from-amber-500 to-orange-400',
  danger:  'from-red-500 to-rose-400',
  info:    'from-[hsl(var(--color-accent))] to-[hsl(var(--color-primary))]',
};

const bgMap = {
  primary: 'bg-[hsl(var(--color-primary)/0.12)]',
  success: 'bg-green-500/10',
  warning: 'bg-amber-500/10',
  danger:  'bg-red-500/10',
  info:    'bg-[hsl(var(--color-accent)/0.12)]',
};

/** Animated count-up hook */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export function StatsCard({ title, value, icon, color, description, trend }: StatsCardProps) {
  const displayValue = useCountUp(value);

  return (
    <div className="card p-5 flex flex-col gap-4 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[hsl(var(--color-text-muted))] uppercase tracking-wide">
            {title}
          </p>
          <p className="mt-1.5 text-3xl font-bold text-[hsl(var(--color-text))]">
            {displayValue}
          </p>
          {description && (
            <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">{description}</p>
          )}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5">
          <span className={cn('text-xs font-semibold', trend.value >= 0 ? 'text-green-400' : 'text-red-400')}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-[hsl(var(--color-text-muted))]">{trend.label}</span>
        </div>
      )}

      {/* Mini progress bar */}
      <div className="h-1 rounded-full bg-[hsl(var(--color-surface-2))] overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-1000', colorMap[color])}
          style={{ width: `${Math.min((value / 20) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
