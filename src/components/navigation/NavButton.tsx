import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "ghost" | "default";
  className?: string;
}

const NavButton = ({ to, icon: Icon, label, onClick, variant = "ghost", className }: NavButtonProps) => {
  const buttonContent = (
    <>
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </>
  );

  if (to) {
    return (
      <Button 
        variant={variant} 
        size="icon"
        asChild
        className={className}
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
      className={className}
    >
      {buttonContent}
    </Button>
  );
};

export default NavButton;