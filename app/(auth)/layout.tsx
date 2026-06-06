import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, hsl(221 83% 63% / 0.25) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 50% at 80% 100%, hsl(262 80% 65% / 0.15) 0%, transparent 70%),' +
            'hsl(var(--color-bg))',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--color-text)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-text)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {children}
    </div>
  );
}
