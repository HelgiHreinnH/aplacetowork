
/**
 * Typography definitions for the design system
 */

export const typography = {
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
  // Base font sizes with responsive variants
  fontSize: {
    display: {
      mobile: ['2.5rem', { lineHeight: '1.2' }],
      tablet: ['3rem', { lineHeight: '1.2' }],
      desktop: ['4rem', { lineHeight: '1.2' }],
    },
    h1: {
      mobile: ['1.875rem', { lineHeight: '1.3' }],
      tablet: ['2.25rem', { lineHeight: '1.3' }],
      desktop: ['2.5rem', { lineHeight: '1.3' }],
    },
    h2: {
      mobile: ['1.5rem', { lineHeight: '1.35' }],
      tablet: ['1.75rem', { lineHeight: '1.35' }],
      desktop: ['2rem', { lineHeight: '1.35' }],
    },
    h3: {
      mobile: ['1.25rem', { lineHeight: '1.4' }],
      tablet: ['1.375rem', { lineHeight: '1.4' }],
      desktop: ['1.5rem', { lineHeight: '1.4' }],
    },
    h4: {
      mobile: ['1.125rem', { lineHeight: '1.4' }],
      tablet: ['1.25rem', { lineHeight: '1.4' }],
      desktop: ['1.25rem', { lineHeight: '1.4' }],
    },
    'body-lg': {
      mobile: ['1rem', { lineHeight: '1.5' }],
      tablet: ['1.125rem', { lineHeight: '1.5' }],
      desktop: ['1.125rem', { lineHeight: '1.5' }],
    },
    body: {
      mobile: ['0.9375rem', { lineHeight: '1.5' }],
      tablet: ['1rem', { lineHeight: '1.5' }],
      desktop: ['1rem', { lineHeight: '1.5' }],
    },
    small: {
      mobile: ['0.8125rem', { lineHeight: '1.5' }],
      tablet: ['0.875rem', { lineHeight: '1.5' }],
      desktop: ['0.875rem', { lineHeight: '1.5' }],
    },
    xs: {
      mobile: ['0.6875rem', { lineHeight: '1.5' }],
      tablet: ['0.75rem', { lineHeight: '1.5' }],
      desktop: ['0.75rem', { lineHeight: '1.5' }],
    },
  }
};
