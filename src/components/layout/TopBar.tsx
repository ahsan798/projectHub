'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { Avatar } from '@/components/ui/Avatar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects':  'Projects',
  '/tasks':     'Task Board',
};

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const user = useAppSelector((s) => s.auth.user);

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith('/projects/') ? 'Project Details' : 'ProjectHub');

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] shrink-0 sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-semibold text-[hsl(var(--color-text))] leading-none">{title}</h1>
          <p className="text-xs text-[hsl(var(--color-text-muted))] mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        {user && (
          <div className="ml-1 pl-3 border-l border-[hsl(var(--color-border))]">
            <Avatar name={user.name} size="sm" />
          </div>
        )}
      </div>
    </header>
  );
}
