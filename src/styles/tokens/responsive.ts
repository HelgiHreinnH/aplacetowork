
/**
 * Responsive utilities for getting appropriate values based on screen size
 */
import { breakpoints } from './breakpoints';

// Helper function to get responsive values based on current screen size
export const getResponsiveValue = <T,>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}, defaultValue?: T): () => T => {
  // Returns a function that can be called to get the current value
  return () => {
    // Default implementation with basic window check
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= parseInt(breakpoints.desktop)) return values.desktop ?? values.tablet ?? values.mobile ?? defaultValue;
      if (width >= parseInt(breakpoints.tablet)) return values.tablet ?? values.mobile ?? defaultValue;
    }
    return values.mobile ?? defaultValue;
  };
};
