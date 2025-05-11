
import { useState, useEffect } from 'react';
import { breakpoints } from '@/styles/design-tokens';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('mobile');
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= parseInt(breakpoints.desktop)) {
        setCurrentBreakpoint('desktop');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width >= parseInt(breakpoints.tablet)) {
        setCurrentBreakpoint('tablet');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setCurrentBreakpoint('mobile');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      }
    };

    // Initial check
    checkBreakpoint();

    // Add event listener to update on resize
    window.addEventListener('resize', checkBreakpoint);

    // Clean up listener
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  /**
   * Get the appropriate value for the current breakpoint
   * Falls back to the closest available value if a specific breakpoint value isn't provided
   */
  const getValue = <T,>(values: { mobile: T; tablet?: T; desktop?: T }): T => {
    if (currentBreakpoint === 'desktop') return values.desktop ?? values.tablet ?? values.mobile;
    if (currentBreakpoint === 'tablet') return values.tablet ?? values.mobile;
    return values.mobile;
  };

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    getValue,
  };
}
