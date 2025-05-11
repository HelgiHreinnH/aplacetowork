
/**
 * Component-specific design tokens
 */
import { spacing } from './spacing';
import { borderRadius } from './radius';
import { shadows, transitions } from './effects';
import { colors } from './colors';
import { typography } from './typography';

export const componentTokens = {
  card: {
    borderRadius: borderRadius.md,
    padding: {
      mobile: spacing[3],
      tablet: spacing[4],
      desktop: spacing[6],
    },
    shadow: shadows.sm,
    backgroundColor: colors.background.DEFAULT,
    headerSpacing: {
      mobile: spacing[3],
      tablet: spacing[3],
      desktop: spacing[4],
    },
    footerSpacing: {
      mobile: spacing[3],
      tablet: spacing[3],
      desktop: spacing[4],
    },
    imageHeight: {
      mobile: '120px',
      tablet: '160px',
      desktop: '200px',
    },
  },
  button: {
    borderRadius: borderRadius.full,
    paddingX: {
      mobile: spacing[3],
      tablet: spacing[4],
      desktop: spacing[4],
    },
    paddingY: {
      mobile: spacing[1],
      tablet: spacing[1.5],
      desktop: spacing[2],
    },
    fontSize: {
      mobile: typography.fontSize.xs.mobile,
      tablet: typography.fontSize.xs.tablet,
      desktop: typography.fontSize.xs.desktop,
    },
    fontWeight: typography.fontWeight.bold,
    transition: transitions.DEFAULT,
    invisible: {
      background: 'transparent',
      hover: 'transparent',
      focusRing: 'none',
    }
  },
  input: {
    borderRadius: borderRadius.md,
    paddingX: {
      mobile: spacing[3],
      tablet: spacing[4],
      desktop: spacing[4],
    },
    paddingY: {
      mobile: spacing[1.5],
      tablet: spacing[2],
      desktop: spacing[2],
    },
    borderColor: colors.neutral[400],
    focusBorderColor: colors.primary.DEFAULT,
    backgroundColor: colors.background.DEFAULT,
  }
};
