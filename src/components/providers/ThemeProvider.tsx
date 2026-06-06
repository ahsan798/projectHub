'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Theme } from '@/types';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ph_theme') as Theme | null;
    const preferred = stored ?? 'dark';
    setTheme(preferred);
    applyTheme(preferred);
    setMounted(true);
  }, []);

  function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ph_theme', next);
      applyTheme(next);
      return next;
    });
  }

  // Prevent flash before theme is applied
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
