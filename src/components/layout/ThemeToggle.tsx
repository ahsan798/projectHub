'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)]',
        'text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]',
        'hover:bg-[hsl(var(--color-surface-2))] transition-all duration-200',
        className,
      )}
    >
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)' }}>
        <Moon size={16} />
      </span>
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(90deg)' }}>
        <Sun size={16} />
      </span>
    </button>
  );
}
