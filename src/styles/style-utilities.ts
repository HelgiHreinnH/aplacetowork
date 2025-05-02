
import { designTokens, componentTokens } from './design-tokens';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names with Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Component-specific style utilities
 */
export const styles = {
  /**
   * Card styles
   */
  card: {
    base: "rounded-md border bg-card text-card-foreground shadow-sm",
    header: "flex flex-col space-y-1.5 p-6",
    title: "text-2xl font-display font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground font-sans",
    content: "p-6 pt-0",
    footer: "flex items-center p-6 pt-0",
  },
  /**
   * Button styles
   */
  button: {
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variant: {
      main: "bg-[var(--primary-color)] text-white hover:bg-opacity-90",
      secondary: "bg-[var(--secondary-color)] text-white hover:bg-opacity-90",
      alert: "bg-[#F97316] text-white hover:bg-opacity-90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-6",
      icon: "h-10 w-10",
    },
  },
  /**
   * Input styles
   */
  input: {
    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  /**
   * Typography styles
   */
  typography: {
    h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl font-display",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 font-display",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight font-display",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight font-display",
    p: "leading-7 font-sans",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    list: "my-6 ml-6 list-disc [&>li]:mt-2 font-sans",
    code: "font-mono text-sm font-medium",
  },
  /**
   * Layout styles
   */
  layout: {
    container: "container mx-auto px-4 md:px-6",
    section: "py-8 md:py-12",
    grid: "grid gap-4",
    flexRow: "flex flex-row items-center",
    flexCol: "flex flex-col",
  }
};

/**
 * Get the value of a token from the designTokens object
 */
export function getToken(path: string): any {
  const keys = path.split('.');
  return keys.reduce((obj, key) => {
    return obj?.[key];
  }, designTokens as any);
}
