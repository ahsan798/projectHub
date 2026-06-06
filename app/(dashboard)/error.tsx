'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service here
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] max-w-md mx-auto text-center animate-fade-in-up">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle className="text-red-500" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-[hsl(var(--color-text))] mb-2">Something went wrong!</h2>
      <p className="text-[hsl(var(--color-text-muted))] mb-8">
        We encountered an unexpected error loading this page. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={() => reset()} leftIcon={<RefreshCcw size={16} />}>
        Try again
      </Button>
    </div>
  );
}
