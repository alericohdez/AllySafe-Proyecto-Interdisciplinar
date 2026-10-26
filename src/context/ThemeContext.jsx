import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'small') root.style.fontSize = '14px';
    if (fontSize === 'normal') root.style.fontSize = '16px';
    if (fontSize === 'large') root.style.fontSize = '18px';
  }, [fontSize]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, fontSize, setFontSize, isOnline, setIsOnline }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);