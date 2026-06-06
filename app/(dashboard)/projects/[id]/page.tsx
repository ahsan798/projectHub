'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { mockUsers } from '@/lib/mockData';
import { formatDate } from '@/utils/date';

import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { items: projects } = useAppSelector((s) => s.projects);
  const { items: tasks } = useAppSelector((s) => s.tasks);

  const project = useMemo(() => projects.find((p) => p.id === id), [projects, id]);

  const projectTasks = useMemo(() => tasks.filter((t) => t.projectId === id), [tasks, id]);

  if (!project) {
    return notFound();
  }

  const owner = mockUsers.find((u) => u.id === project.ownerId);

  return (
    <div className="space-y-6">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-primary))] transition-colors">
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[hsl(var(--color-text))]">
              {project.name}
            </h1>
            <p className="mt-3 text-[hsl(var(--color-text-muted))] leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 bg-[hsl(var(--color-surface-2))] px-4 py-2 rounded-[var(--radius-lg)]">
            <StatusBadge status={project.status} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-[hsl(var(--color-border))]">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[hsl(var(--color-text-muted))]" />
            <span className="text-sm text-[hsl(var(--color-text-muted))]">Owner:</span>
            <div className="flex items-center gap-1.5 ml-1">
              <Avatar name={owner?.name ?? 'Unknown'} size="sm" />
              <span className="text-sm font-medium text-[hsl(var(--color-text))]">{owner?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[hsl(var(--color-text-muted))]" />
            <span className="text-sm text-[hsl(var(--color-text-muted))]">Created:</span>
            <span className="text-sm font-medium text-[hsl(var(--color-text))] ml-1">
              {formatDate(project.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[hsl(var(--color-text-muted))]" />
            <span className="text-sm text-[hsl(var(--color-text-muted))]">Total Tasks:</span>
            <span className="text-sm font-medium text-[hsl(var(--color-text))] ml-1">
              {projectTasks.length}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-[hsl(var(--color-text))] mb-4">Project Tasks</h2>
        {projectTasks.length === 0 ? (
          <div className="card p-8 text-center text-[hsl(var(--color-text-muted))]">
            No tasks assigned to this project yet.
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))] uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Due Date</th>
                    <th className="px-4 py-3 font-medium">Assignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--color-border))]">
                  {projectTasks.map((task) => {
                    const assignee = mockUsers.find(u => u.id === task.assignedUserId);
                    return (
                      <tr key={task.id} className="hover:bg-[hsl(var(--color-surface-2))] transition-colors">
                        <td className="px-4 py-3 font-medium text-[hsl(var(--color-text))]">
                          {task.title}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-4 py-3">
                          <PriorityBadge priority={task.priority} />
                        </td>
                        <td className="px-4 py-3 text-[hsl(var(--color-text-muted))]">
                          {formatDate(task.dueDate)}
                        </td>
                        <td className="px-4 py-3">
                          {assignee ? (
                            <div className="flex items-center gap-2">
                              <Avatar name={assignee.name} size="sm" />
                              <span className="text-[hsl(var(--color-text-muted))]">{assignee.name}</span>
                            </div>
                          ) : (
                            <span className="text-[hsl(var(--color-text-muted))] italic">Unassigned</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
