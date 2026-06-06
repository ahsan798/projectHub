'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { useToast } from '@/components/ui/Toast';

const navItems = [
  { label: 'Dashboard',  href: '/dashboard',  icon: LayoutDashboard },
  { label: 'Projects',   href: '/projects',   icon: FolderKanban },
  { label: 'Tasks',      href: '/tasks',       icon: CheckSquare },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const user = useAppSelector((s) => s.auth.user);

  async function handleLogout() {
    await dispatch(logout());
    document.cookie = 'ph_token=; path=/; max-age=0';
    toast('Signed out successfully', 'info');
    router.push('/login');
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full z-40 flex flex-col w-64',
          'bg-[hsl(var(--color-surface))] border-r border-[hsl(var(--color-border))]',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[hsl(var(--color-border))] shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 rounded-[var(--radius-sm)] gradient-primary flex items-center justify-center shrink-0">
              <LayoutDashboard size={15} className="text-white" />
            </div>
            <span className="font-bold text-[hsl(var(--color-text))] text-sm">ProjectHub</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--color-text-muted))]">
            Menu
          </p>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium',
                  'transition-all duration-150 group',
                  active
                    ? 'gradient-primary text-white shadow-sm'
                    : 'text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]',
                )}
              >
                <Icon size={17} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-[hsl(var(--color-border))] shrink-0">
          {user && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-[var(--radius-md)] mb-1">
              <Avatar name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--color-text))] truncate">{user.name}</p>
                <p className="text-xs text-[hsl(var(--color-text-muted))] capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-[var(--radius-md)] text-sm text-[hsl(var(--color-text-muted))] hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
