import { cn } from '@/utils/cn';
import type { ProjectStatus, TaskStatus, TaskPriority } from '@/types';

type BadgeVariant = 'default' | ProjectStatus | TaskStatus | TaskPriority;

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<string, string> = {
  default:      'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))]',
  // Project status
  active:       'bg-green-500/10 text-green-500 border border-green-500/20',
  'on-hold':    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  completed:    'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  // Task status
  todo:         'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))] border border-[hsl(var(--color-border))]',
  'in-progress':'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'in-review':  'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  done:         'bg-green-500/10 text-green-400 border border-green-500/20',
  // Priority
  low:          'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  medium:       'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  high:         'bg-red-500/10 text-red-400 border border-red-500/20',
};

const dotStyles: Record<string, string> = {
  active:       'bg-green-500',
  'on-hold':    'bg-yellow-500',
  completed:    'bg-blue-500',
  todo:         'bg-slate-400',
  'in-progress':'bg-blue-400',
  'in-review':  'bg-violet-400',
  done:         'bg-green-400',
  low:          'bg-slate-400',
  medium:       'bg-amber-400',
  high:         'bg-red-400',
  default:      'bg-slate-400',
};

const labelMap: Record<string, string> = {
  'on-hold':    'On Hold',
  'in-progress':'In Progress',
  'in-review':  'In Review',
  todo:         'To Do',
  done:         'Done',
};

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant] ?? variantStyles.default,
        className,
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotStyles[variant] ?? dotStyles.default)}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus | TaskStatus }) {
  return (
    <Badge variant={status} dot>
      {labelMap[status] ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge variant={priority} dot>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
