'use client';

import { timeAgo } from '@/utils/date';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/Badge';
import { useAppSelector } from '@/store/hooks';
import type { Task } from '@/types';
import { mockUsers } from '@/lib/mockData';

export function RecentActivity() {
  const { items: tasks, isLoading } = useAppSelector((s) => s.tasks);

  // Get 5 most recently updated tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="card p-5 h-full flex flex-col gap-4">
        <h3 className="font-semibold text-[hsl(var(--color-text))]">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full skeleton shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 skeleton" />
                <div className="h-3 w-1/2 skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5 h-full">
      <h3 className="font-semibold text-[hsl(var(--color-text))] mb-4">Recent Activity</h3>
      
      {recentTasks.length === 0 ? (
        <p className="text-sm text-[hsl(var(--color-text-muted))]">No recent activity.</p>
      ) : (
        <div className="space-y-4">
          {recentTasks.map((task) => {
            const user = task.assignedUserId
              ? mockUsers.find((u) => u.id === task.assignedUserId)
              : null;

            return (
              <div key={task.id} className="flex gap-3 items-start group">
                <Avatar name={user?.name ?? 'System'} size="sm" className="mt-0.5 shadow-sm" />
                
                <div className="flex-1 min-w-0 border-b border-[hsl(var(--color-border))] pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-sm text-[hsl(var(--color-text))] leading-snug">
                    <span className="font-medium">{user?.name ?? 'Someone'}</span> updated{' '}
                    <span className="font-medium text-[hsl(var(--color-primary))]">{task.title}</span>
                  </p>
                  
                  <div className="mt-1.5 flex items-center justify-between flex-wrap gap-2">
                    <StatusBadge status={task.status} />
                    <span className="text-xs text-[hsl(var(--color-text-muted))]">
                      {timeAgo(task.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
