
/**
 * Design Tokens
 * 
 * This file consolidates all design tokens from separate files.
 * Use these tokens instead of hard-coded values to ensure
 * consistency across the application.
 */

// Import tokens from separate files
import { breakpoints } from './tokens/breakpoints';
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';
import { layout } from './tokens/layout';
import { spacing } from './tokens/spacing';
import { borderRadius } from './tokens/radius';
import { shadows, transitions, zIndex } from './tokens/effects';
import { componentTokens } from './tokens/components';
import { getResponsiveValue } from './tokens/responsive';

// Combine all design tokens
export const designTokens = {
  colors,
  typography,
  layout,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex
};

// Re-export everything for backwards compatibility
export {
  breakpoints,
  colors,
  typography,
  layout,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  componentTokens,
  getResponsiveValue
};
