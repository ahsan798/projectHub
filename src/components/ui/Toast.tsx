'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { X, CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-green-400 shrink-0" />,
  error:   <XCircle     size={18} className="text-red-400 shrink-0" />,
  info:    <Info        size={18} className="text-blue-400 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-400 shrink-0" />,
};

const borderColors: Record<ToastType, string> = {
  success: 'border-l-green-500',
  error:   'border-l-red-500',
  info:    'border-l-blue-500',
  warning: 'border-l-amber-500',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]',
              'bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] border-l-4',
              'shadow-[var(--shadow-lg)] pointer-events-auto min-w-[260px] max-w-[360px]',
              'animate-fade-in-up',
              borderColors[t.type],
            )}
            role="alert"
          >
            {icons[t.type]}
            <span className="flex-1 text-sm text-[hsl(var(--color-text))]">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
