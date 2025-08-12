import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Device theme detection only
  useEffect(() => {
    const detectDeviceTheme = () => {
      if (window.matchMedia) {
        // Check if device prefers dark mode
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);
        
        // Listen for changes in device theme
        const handleThemeChange = (e) => {
          setIsDarkMode(e.matches);
        };
        
        // Use the newer addEventListener method
        darkModeQuery.addEventListener('change', handleThemeChange);
        
        // Cleanup listener
        return () => darkModeQuery.removeEventListener('change', handleThemeChange);
      } else {
        // Fallback to light mode if matchMedia is not supported
        setIsDarkMode(false);
      }
    };

    const cleanup = detectDeviceTheme();
    return cleanup;
  }, []);

  // Theme configuration
  const getTheme = () => {
    if (isDarkMode) {
      return {
        // Dark Theme
        primary: '#3b82f6',
        primaryLight: '#60a5fa',
        primaryDark: '#1d4ed8',
        secondary: '#8b5cf6',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        backgroundAlt: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        surface: 'rgba(255,255,255,0.1)',
        surfaceHover: 'rgba(255,255,255,0.15)',
        text: '#f8fafc',
        textSecondary: '#cbd5e1',
        textMuted: '#94a3b8',
        border: 'rgba(255,255,255,0.2)',
        borderHover: 'rgba(59,130,246,0.4)',
        shadow: '0 10px 30px rgba(0,0,0,0.3)',
        shadowHover: '0 20px 40px rgba(0,0,0,0.4)',
        glass: 'rgba(255,255,255,0.1)',
        glassStrong: 'rgba(255,255,255,0.15)',
        gradient: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
        mode: 'dark'
      };
    } else {
      return {
        // Light Theme
        primary: '#3b82f6',
        primaryLight: '#60a5fa',
        primaryDark: '#1d4ed8',
        secondary: '#8b5cf6',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
        backgroundAlt: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        surface: '#ffffff',
        surfaceHover: '#f8fafc',
        text: '#1e293b',
        textSecondary: '#475569',
        textMuted: '#64748b',
        border: '#e2e8f0',
        borderHover: '#3b82f6',
        shadow: '0 10px 30px rgba(0,0,0,0.1)',
        shadowHover: '0 20px 40px rgba(0,0,0,0.15)',
        glass: 'rgba(255,255,255,0.8)',
        glassStrong: 'rgba(255,255,255,0.95)',
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        mode: 'light'
      };
    }
  };

  const theme = getTheme();

  const value = {
    isDarkMode,
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
