import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  const applyTheme = useCallback((mode: ThemeMode) => {
    if (mode === 'system') {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      setIsDark(mode === 'dark');
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    localStorage.setItem('theme', mode);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    const initialTheme = storedTheme || 'system';
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [applyTheme, theme]); // Include theme in dependencies

  const setCurrentTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, setTheme: setCurrentTheme, isDark };
}
