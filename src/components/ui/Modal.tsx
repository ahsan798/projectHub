'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  sm:  'max-w-sm',
  md:  'max-w-md',
  lg:  'max-w-lg',
  xl:  'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md', footer, className }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={cn(
          'relative z-10 w-full rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]',
          'bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))]',
          'animate-scale-in',
          sizeStyles[size],
          className,
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--color-border))]">
            <h2 id="modal-title" className="text-lg font-semibold text-[hsl(var(--color-text))]">
              {title}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
              <X size={16} />
            </Button>
          </div>
        )}

        {/* Body */}
        <div className="p-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-[hsl(var(--color-border))]">
            {footer}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
