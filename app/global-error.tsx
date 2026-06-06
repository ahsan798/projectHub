'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', color: '#0f172a' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Critical Application Error</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '500px' }}>
            A critical error occurred at the root layout level.
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500 }}
          >
            Try to recover
          </button>
        </div>
      </body>
    </html>
  );
}
