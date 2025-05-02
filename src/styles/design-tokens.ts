
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
      DEFAULT: '#9b87f5',
      light: '#b0a2f8',
      dark: '#8B5CF6',
    },
    secondary: {
      DEFAULT: '#7E69AB',
      light: '#9980c7',
      dark: '#6E59A5',
    },
    alert: {
      DEFAULT: '#F97316',
      light: '#fb8c3b',
      dark: '#ea6a0e',
    },
    background: {
      DEFAULT: '#FFFFFF',
      light: '#F6F6F7',
      dark: '#F1F0FB',
    },
    text: {
      DEFAULT: '#1A1F2C',
      light: '#8E9196',
      dark: '#222222',
    },
    neutral: {
      100: '#FFFFFF',
      200: '#F6F6F7',
      300: '#F1F0FB',
      400: '#C8C8C9',
      500: '#9F9EA1',
      600: '#8E9196',
      700: '#555555',
      800: '#333333',
      900: '#222222',
    }
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
    fontSize: designTokens.typography.fontSize.body,
    transition: designTokens.transitions.DEFAULT,
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
