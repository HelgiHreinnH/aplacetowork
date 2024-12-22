import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Star, Home, HelpCircle, Info, MessageSquare } from "lucide-react";

const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-500 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="fixed inset-x-0 bottom-0 w-[90%] max-w-md mx-auto h-[80vh] rounded-t-3xl border-t-0 pb-24 origin-bottom animate-slide-up z-40 bg-white"
        hideBackdrop={true}
      >
        <nav className="flex flex-col gap-4 mt-8">
          <Link to="/favorites" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Star className="h-5 w-5" />
            <span>Favourites</span>
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Home className="h-5 w-5" />
            <span>All facilities</span>
          </Link>
          <Link to="/help" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>
          <Link to="/about" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Info className="h-5 w-5" />
            <span>About us</span>
          </Link>
          <Link to="/feedback" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span>Feedback</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;