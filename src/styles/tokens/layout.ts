
/**
 * Layout definitions for responsive design
 */
import { breakpoints } from './breakpoints';

export const layout = {
  container: {
    mobile: '100%',
    tablet: '90%',
    desktop: '1200px',
  },
  spacing: {
    mobile: {
      page: '16px',
      section: '24px',
      component: '12px',
    },
    tablet: {
      page: '24px',
      section: '32px',
      component: '16px',
    },
    desktop: {
      page: '32px',
      section: '48px',
      component: '24px',
    },
  },
  cardGrid: {
    mobile: 'repeat(1, 1fr)',
    tablet: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)',
  },
};
