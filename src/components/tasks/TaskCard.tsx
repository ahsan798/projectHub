'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Calendar, MessageSquare, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import type { Task, Project } from '@/types';
import { mockUsers } from '@/lib/mockData';
import { formatDate, isOverdue } from '@/utils/date';
import { cn } from '@/utils/cn';

import { PriorityBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { TaskDetailModal } from './TaskDetailModal';

interface TaskCardProps {
  task: Task;
  project?: Project;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, project, index, onEdit, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = user?.role === 'admin';
  const assignee = task.assignedUserId ? mockUsers.find(u => u.id === task.assignedUserId) : null;
  const overdue = task.status !== 'done' && isOverdue(task.dueDate);

  return (
    <>
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setShowDetail(true)}
          className={cn(
            'card p-4 flex flex-col gap-3 group relative bg-[hsl(var(--color-surface))] cursor-pointer',
            snapshot.isDragging && 'shadow-[var(--shadow-lg)] rotate-2 z-50 ring-2 ring-[hsl(var(--color-primary))]',
            overdue && 'border-red-500/50',
          )}
          style={provided.draggableProps.style}
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <PriorityBadge priority={task.priority} />
              {project && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))] max-w-[120px] truncate" title={project.name}>
                  {project.name}
                </span>
              )}
            </div>

            {isAdmin && (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                  onBlur={() => setTimeout(() => setShowMenu(false), 200)}
                  className={cn(
                    'w-6 h-6 rounded-md flex items-center justify-center text-[hsl(var(--color-text-muted))] transition-colors',
                    showMenu ? 'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))]' : 'opacity-0 group-hover:opacity-100 hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]'
                  )}
                >
                  <MoreVertical size={14} />
                </button>
                
                {showMenu && (
                  <div 
                    className="absolute right-0 top-7 w-32 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] py-1 z-10 animate-scale-in origin-top-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={(e) => { e.stopPropagation(); setShowMenu(false); onEdit(task); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(task); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <p className="font-medium text-sm text-[hsl(var(--color-text))] leading-snug">
            {task.title}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center gap-3 text-xs text-[hsl(var(--color-text-muted))]">
              <div className={cn('flex items-center gap-1', overdue && 'text-red-500 font-medium')} title={overdue ? 'Overdue' : 'Due date'}>
                <Calendar size={13} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              <div className="flex items-center gap-1" title="Comments">
                <MessageSquare size={13} />
                <span>0</span>
              </div>
            </div>
            
            <div title={assignee?.name ?? 'Unassigned'}>
              {assignee ? (
                <Avatar name={assignee.name} size="sm" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--color-surface-2))] border border-dashed border-[hsl(var(--color-border))] flex items-center justify-center text-[10px] text-[hsl(var(--color-text-muted))]">
                  ?
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
    <TaskDetailModal 
      isOpen={showDetail} 
      onClose={() => setShowDetail(false)} 
      task={task} 
      project={project} 
    />
    </>
  );
}
