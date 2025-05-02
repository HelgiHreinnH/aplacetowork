
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "font-display text-2xl sm:text-3xl lg:text-h1 text-[#1A1F2C] mb-3 sm:mb-4 font-normal",
      className
    )}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "font-display text-xl sm:text-2xl lg:text-h2 text-[#1A1F2C] mb-2 sm:mb-3 font-normal",
      className
    )}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      "font-display text-lg sm:text-xl lg:text-h3 text-[#1A1F2C] mb-2 font-normal",
      className
    )}>
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn(
      "font-display text-base sm:text-lg lg:text-h4 text-[#1A1F2C] mb-2 font-normal",
      className
    )}>
      {children}
    </h4>
  );
}

export function H5({ children, className }: TypographyProps) {
  return (
    <h5 className={cn(
      "font-display text-xs lg:text-[0.85rem] text-[#1A1F2C] mb-1 font-normal",
      className
    )}>
      {children}
    </h5>
  );
}

export function Note({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "font-sans text-sm sm:text-base lg:text-body bg-[#F1F0FB] border-l-4 border-[#9b87f5] p-3 sm:p-4 rounded-r-lg my-3 sm:my-4 text-[#8E9196] font-semibold",
      className
    )}>
      {children}
    </div>
  );
}

export function Bulletin({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "font-sans text-sm sm:text-base lg:text-body-lg flex items-start gap-2 mb-2 font-semibold",
      className
    )}>
      <span className="text-[#9b87f5] mt-1">•</span>
      <span>{children}</span>
    </div>
  );
}
