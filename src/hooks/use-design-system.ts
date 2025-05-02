
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
    const baseStyle = styles[component].base;
    const variantStyle = variant && styles[component].variant ? 
      styles[component].variant[variant as keyof (typeof styles[typeof component]['variant'] || {})] : '';
    
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
