import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-8 h-8 border-3' };

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block rounded-full animate-spin',
        'border-[hsl(var(--color-border))] border-t-[hsl(var(--color-primary))]',
        sizeMap[size],
        className,
      )}
    />
  );
}
