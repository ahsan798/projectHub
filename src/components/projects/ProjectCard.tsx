'use client';

import Link from 'next/link';
import { Calendar, CheckSquare, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/date';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { mockUsers } from '@/lib/mockData';
import type { Project } from '@/types';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = user?.role === 'admin';

  const owner = mockUsers.find((u) => u.id === project.ownerId);

  const tasks = useAppSelector((s) => s.tasks.items);
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  
  // Compute progress percentage dynamically
  const total = projectTasks.length;
  const completed = projectTasks.filter((t) => t.status === 'done').length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="card p-5 group flex flex-col h-full animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3 relative">
        <Link href={`/projects/${project.id}`} className="block flex-1 min-w-0 group-hover:text-[hsl(var(--color-primary))] transition-colors">
          <h3 className="text-lg font-semibold text-[hsl(var(--color-text))] truncate" title={project.name}>
            {project.name}
          </h3>
        </Link>
        
        {isAdmin && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              onBlur={() => setTimeout(() => setShowMenu(false), 200)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))] transition-colors -mr-2"
            >
              <MoreVertical size={16} />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-9 w-36 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] py-1 z-10 animate-scale-in origin-top-right">
                <button
                  onClick={() => onEdit(project)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => onDelete(project)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <StatusBadge status={project.status} />

      {/* Description */}
      <p className="mt-4 text-sm text-[hsl(var(--color-text-muted))] line-clamp-2 flex-1">
        {project.description}
      </p>

      {/* Footer Info */}
      <div className="mt-6 space-y-4">
        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-[hsl(var(--color-text-muted))]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[hsl(var(--color-surface-2))] overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--color-primary))] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between border-t border-[hsl(var(--color-border))] pt-4">
          <div className="flex items-center gap-3 text-xs text-[hsl(var(--color-text-muted))]">
            <div className="flex items-center gap-1.5" title="Tasks">
              <CheckSquare size={14} />
              <span>{completed}/{total}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Created">
              <Calendar size={14} />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
          
          <div title={`Owner: ${owner?.name}`}>
            <Avatar name={owner?.name ?? 'Unknown'} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
