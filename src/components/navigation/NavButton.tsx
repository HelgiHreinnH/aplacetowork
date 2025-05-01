
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "ghost" | "default" | "main" | "secondary" | "alert";
  className?: string;
}

const NavButton = ({ 
  to, 
  icon: Icon, 
  label, 
  onClick, 
  variant = "ghost", 
  className 
}: NavButtonProps) => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  
  const buttonContent = (
    <>
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </>
  );

  const searchButtonClassName = cn(
    className,
    label === 'Search' && isIndexPage ? 'animate-bounce' : ''
  );

  if (to) {
    return (
      <Button 
        variant={variant} 
        size="icon"
        asChild
        className={searchButtonClassName}
      >
        <Link to={to}>
          {buttonContent}
        </Link>
      </Button>
    );
  }

  return (
    <Button 
      variant={variant} 
      size="icon"
      onClick={onClick}
      className={searchButtonClassName}
    >
      {buttonContent}
    </Button>
  );
};

export default NavButton;
