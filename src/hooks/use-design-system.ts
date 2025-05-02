
import { useTheme } from '@/providers/ThemeProvider';
import { designTokens, componentTokens } from '@/styles/design-tokens';
import { styles, cn } from '@/styles/style-utilities';

/**
 * Hook that provides access to the design system tokens, styles, and utilities
 */
export function useDesignSystem() {
  const theme = useTheme();
  
  /**
   * Combines Tailwind classes with our defined styles
   */
  const getStyles = (component: keyof typeof styles, variant?: string, additionalClasses?: string) => {
    // Check if the component has a base style
    const baseStyle = styles[component] && 'base' in styles[component] 
      ? styles[component].base as string
      : '';
    
    // Check if the component has variants
    const hasVariants = styles[component] && 'variant' in styles[component];
    
    // Get variant style if it exists
    const variantStyle = variant && hasVariants
      ? ((styles[component] as any).variant?.[variant] as string) || ''
      : '';
    
    return cn(baseStyle, variantStyle, additionalClasses);
  };
  
  /**
   * Gets a specific token value from our design tokens
   */
  const getToken = (tokenPath: string) => {
    const keys = tokenPath.split('.');
    return keys.reduce((obj: any, key) => obj?.[key], designTokens);
  };
  
  /**
   * Gets the current theme values
   */
  const getThemeValues = () => {
    return {
      colorMode: theme.colorMode,
      colors: theme.colors
    };
  };

  return {
    theme,
    tokens: {
      ...designTokens,
      components: componentTokens
    },
    styles,
    getStyles,
    getToken,
    getThemeValues,
    cn
  };
}
