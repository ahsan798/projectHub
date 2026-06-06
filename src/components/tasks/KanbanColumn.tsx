'use client';

import { Droppable } from '@hello-pangea/dnd';
import type { Task, Project, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/utils/cn';
import { StatusBadge } from '@/components/ui/Badge';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  projects: Project[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function KanbanColumn({ id, title, tasks, projects, onEditTask, onDeleteTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col flex-1 min-w-[280px] max-w-[350px] bg-[hsl(var(--color-surface-2))] rounded-[var(--radius-lg)] p-3 h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-3 mb-2">
        <h3 className="font-semibold text-[hsl(var(--color-text))] flex items-center gap-2">
          {title}
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[hsl(var(--color-surface))] text-[10px] font-medium text-[hsl(var(--color-text-muted))] shadow-sm">
            {tasks.length}
          </span>
        </h3>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 flex flex-col gap-3 min-h-[150px] transition-colors rounded-[var(--radius-md)] overflow-y-auto overflow-x-hidden p-1',
              snapshot.isDraggingOver && 'bg-[hsl(var(--color-primary)/0.05)]'
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                project={projects.find(p => p.id === task.projectId)}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
