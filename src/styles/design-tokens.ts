/**
 * Design Tokens
 * 
 * This file contains centralized design tokens that define the visual language
 * of the application. Use these tokens instead of hard-coded values to ensure
 * consistency across the application.
 */

export const designTokens = {
  colors: {
    primary: {
      DEFAULT: '#3f00ff',
      light: '#6633ff',
      dark: '#1a0066',
    },
    secondary: {
      DEFAULT: '#3185fc',
      light: '#5a9efc',
      dark: '#023277',
    },
    alert: {
      DEFAULT: '#ff8600',
      light: '#ffa033',
      dark: '#cc6d00',
    },
    background: {
      DEFAULT: '#FFFFFF',
      light: '#F6F6F7',
      dark: '#F1F0FB',
    },
    text: {
      DEFAULT: '#242331',
      light: '#474562',
      dark: '#15141d',
    },
    neutral: {
      100: '#FFFFFF',
      200: '#F6F6F7',
      300: '#F1F0FB',
      400: '#C8C8C9',
      500: '#9F9EA1',
      600: '#8eb8e5',
      700: '#474562',
      800: '#15141d',
      900: '#07070a',
    },
    blue: {
      DEFAULT: '#3f00ff',
      100: '#0d0033',
      200: '#1a0066',
      300: '#260099',
      400: '#3300cc',
      500: '#3f00ff',
      600: '#6633ff',
      700: '#8c66ff',
      800: '#b399ff',
      900: '#d9ccff',
    },
    jordyBlue: {
      DEFAULT: '#8eb8e5',
      100: '#0e243d',
      200: '#1c4979',
      300: '#296db6',
      400: '#5293d8',
      500: '#8eb8e5',
      600: '#a5c7eb',
      700: '#bcd5f0',
      800: '#d2e3f5',
      900: '#e9f1fa',
    },
    raisinBlack: {
      DEFAULT: '#242331',
      100: '#07070a',
      200: '#0e0e13',
      300: '#15141d',
      400: '#1c1b26',
      500: '#242331',
      600: '#474562',
      700: '#6c6994',
      800: '#9d9bb8',
      900: '#cecddb',
    },
    utOrange: {
      DEFAULT: '#ff8600',
      100: '#331b00',
      200: '#663600',
      300: '#995200',
      400: '#cc6d00',
      500: '#ff8600',
      600: '#ffa033',
      700: '#ffb866',
      800: '#ffcf99',
      900: '#ffe7cc',
    },
    azure: {
      DEFAULT: '#3185fc',
      100: '#01193b',
      200: '#023277',
      300: '#034cb2',
      400: '#0465ed',
      500: '#3185fc',
      600: '#5a9efc',
      700: '#83b6fd',
      800: '#adcefe',
      900: '#d6e7fe',
    },
  },
  typography: {
    fontFamily: {
      heading: '"Noto Sans Display", sans-serif',
      body: '"Noto Sans", sans-serif',
      mono: '"Noto Sans Mono", monospace',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    fontSize: {
      display: ['4rem', { lineHeight: '1.2' }],
      h1: ['2.5rem', { lineHeight: '1.3' }],
      h2: ['2rem', { lineHeight: '1.35' }],
      h3: ['1.5rem', { lineHeight: '1.4' }],
      h4: ['1.25rem', { lineHeight: '1.4' }],
      'body-lg': ['1.125rem', { lineHeight: '1.5' }],
      body: ['1rem', { lineHeight: '1.5' }],
      small: ['0.875rem', { lineHeight: '1.5' }],
      xs: ['0.75rem', { lineHeight: '1.5' }],
    }
  },
  spacing: {
    // Matches Tailwind default spacing but exposed here for reference
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    DEFAULT: '0.5rem', 
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    fast: '150ms',
    DEFAULT: '300ms',
    slow: '500ms',
  },
  zIndex: {
    behind: -1,
    default: 0,
    above: 1,
    dropdown: 10,
    sticky: 100,
    overlay: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
  }
};

/**
 * Component-specific design tokens
 * Use these for consistent styling of specific components
 */
export const componentTokens = {
  card: {
    borderRadius: designTokens.borderRadius.md,
    padding: designTokens.spacing[6],
    shadow: designTokens.shadows.sm,
    backgroundColor: designTokens.colors.background.DEFAULT,
    headerSpacing: designTokens.spacing[4],
    footerSpacing: designTokens.spacing[4],
  },
  button: {
    borderRadius: designTokens.borderRadius.full,
    paddingX: designTokens.spacing[4],
    paddingY: designTokens.spacing[2],
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.bold,
    transition: designTokens.transitions.DEFAULT,
    invisible: {
      background: 'transparent',
      hover: 'transparent',
      focusRing: 'none',
    }
  },
  input: {
    borderRadius: designTokens.borderRadius.md,
    paddingX: designTokens.spacing[4],
    paddingY: designTokens.spacing[2],
    borderColor: designTokens.colors.neutral[400],
    focusBorderColor: designTokens.colors.primary.DEFAULT,
    backgroundColor: designTokens.colors.background.DEFAULT,
  }
};
