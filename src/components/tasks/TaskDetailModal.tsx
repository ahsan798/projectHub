'use client';

import { Modal } from '@/components/ui/Modal';
import { PriorityBadge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Calendar, Clock, AlignLeft, User, Folder, Activity } from 'lucide-react';
import type { Task, Project } from '@/types';
import { mockUsers } from '@/lib/mockData';
import { formatDate } from '@/utils/date';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  project?: Project;
}

export function TaskDetailModal({ isOpen, onClose, task, project }: TaskDetailModalProps) {
  const assignee = task.assignedUserId ? mockUsers.find(u => u.id === task.assignedUserId) : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="lg">
      <div className="space-y-6">
        {/* Header section */}
        <div>
          <h3 className="text-xl font-semibold text-[hsl(var(--color-text))] mb-2">{task.title}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            {project && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))]">
                <Folder size={12} />
                {project.name}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-text))] mb-2">
            <AlignLeft size={16} className="text-[hsl(var(--color-text-muted))]" />
            Description
          </div>
          <div className="bg-[hsl(var(--color-surface-2))] p-4 rounded-[var(--radius-md)] text-sm text-[hsl(var(--color-text-muted))] min-h-[100px] whitespace-pre-wrap">
            {task.description || 'No description provided.'}
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-[hsl(var(--color-text-muted))] flex items-center gap-1">
              <User size={12} /> Assignee
            </div>
            <div className="flex items-center gap-2">
              {assignee ? (
                <>
                  <Avatar name={assignee.name} size="sm" />
                  <span className="text-sm font-medium">{assignee.name}</span>
                </>
              ) : (
                <span className="text-sm text-[hsl(var(--color-text-muted))]">Unassigned</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[hsl(var(--color-text-muted))] flex items-center gap-1">
              <Calendar size={12} /> Due Date
            </div>
            <div className="text-sm font-medium">
              {formatDate(task.dueDate)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[hsl(var(--color-text-muted))] flex items-center gap-1">
              <Clock size={12} /> Created
            </div>
            <div className="text-sm font-medium">
              {formatDate(task.createdAt)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-[hsl(var(--color-text-muted))] flex items-center gap-1">
              <Activity size={12} /> Last Updated
            </div>
            <div className="text-sm font-medium">
              {formatDate(task.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
