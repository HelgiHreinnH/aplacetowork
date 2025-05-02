
import React, { createContext, useContext, useEffect, useState } from 'react';
import { designTokens } from '@/styles/design-tokens';

type ColorMode = 'standard' | 'dynamic';
type ThemeContextType = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  updateColors: (newColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  }) => void;
};

const standardColors = {
  primary: designTokens.colors.text.dark,    // Dark Gray
  secondary: designTokens.colors.neutral[600],  // Neutral Gray
  background: designTokens.colors.neutral[100], // White
  text: designTokens.colors.neutral[900],      // Black
};

const dynamicColors = {
  primary: designTokens.colors.primary.DEFAULT,
  secondary: designTokens.colors.secondary.DEFAULT,
  background: designTokens.colors.background.DEFAULT,
  text: designTokens.colors.text.DEFAULT,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorMode, setColorModeState] = useState<ColorMode>('dynamic');
  const [colors, setColors] = useState(dynamicColors);

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    const newColors = mode === 'standard' ? standardColors : dynamicColors;
    updateColors(newColors);
    localStorage.setItem('colorMode', mode);
  };

  const updateColors = (newColors: typeof colors) => {
    document.documentElement.style.setProperty('--primary-color', newColors.primary);
    document.documentElement.style.setProperty('--secondary-color', newColors.secondary);
    document.documentElement.style.setProperty('--background-color', newColors.background);
    document.documentElement.style.setProperty('--text-color', newColors.text);
    setColors(newColors);
    localStorage.setItem('colorSettings', JSON.stringify(newColors));
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') as ColorMode | null;
    const savedColors = localStorage.getItem('colorSettings');
    
    if (savedMode) {
      setColorModeState(savedMode);
      if (savedColors) {
        updateColors(JSON.parse(savedColors));
      } else {
        updateColors(savedMode === 'standard' ? standardColors : dynamicColors);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        setColorMode,
        colors,
        updateColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
