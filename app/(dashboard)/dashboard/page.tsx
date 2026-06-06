'use client';

import { useMemo } from 'react';
import { LayoutDashboard, CheckSquare, Clock, FolderKanban } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TaskAreaChart, TaskPieChart, TaskBarChart } from '@/components/dashboard/Charts';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  const { items: projects } = useAppSelector((s) => s.projects);
  const { items: tasks } = useAppSelector((s) => s.tasks);

  // Computed stats
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'done').length;

    return { totalProjects, totalTasks, completedTasks, pendingTasks };
  }, [projects, tasks]);

  // Chart data formatting
  const pieData = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, value]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
      value,
      status,
    }));
  }, [tasks]);

  const barData = useMemo(() => {
    return projects.map((p) => {
      const pTasks = tasks.filter((t) => t.projectId === p.id);
      return {
        name: p.name,
        tasks: pTasks.length,
        completed: pTasks.filter((t) => t.status === 'done').length,
      };
    });
  }, [projects, tasks]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[hsl(var(--color-text))]">Dashboard Overview</h2>
        <p className="text-sm text-[hsl(var(--color-text-muted))] mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={<FolderKanban size={24} />}
          color="primary"
          trend={{ value: 12, label: 'vs last month' }}
        />
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<LayoutDashboard size={24} />}
          color="info"
          trend={{ value: 5, label: 'vs last month' }}
        />
        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={<CheckSquare size={24} />}
          color="success"
          trend={{ value: 18, label: 'vs last month' }}
        />
        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={<Clock size={24} />}
          color="warning"
          trend={{ value: -2, label: 'vs last month' }}
        />
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-semibold text-[hsl(var(--color-text))]">Tasks Completed Over Time</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Last 7 days activity</p>
          </div>
          <TaskAreaChart />
        </div>

        <div className="card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-[hsl(var(--color-text))]">Tasks by Status</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Current distribution</p>
          </div>
          <TaskPieChart data={pieData} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-semibold text-[hsl(var(--color-text))]">Project Progress</h3>
            <p className="text-xs text-[hsl(var(--color-text-muted))]">Total vs Completed tasks per project</p>
          </div>
          <TaskBarChart data={barData} />
        </div>

        <div className="lg:col-span-1 h-full">
          <RecentActivity />
        </div>

      </div>
    </div>
  );
}
