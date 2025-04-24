
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Grid, Heart, Settings, MessageSquare, Info } from "lucide-react";

const MenuSheet = () => {
  return (
    <Sheet modal={false}>
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
        className="fixed inset-x-0 bottom-0 w-[90%] max-w-md mx-auto h-[35vh] rounded-t-3xl border-t-0 pb-4 origin-bottom animate-slide-up z-40 bg-white"
      >
        <nav className="flex flex-col gap-1.5 mt-2">
          <Link to="/overview" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Grid className="h-5 w-5" />
            <span>All Facilities</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Heart className="h-5 w-5" />
            <span>Favourites</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span>What are you missing?</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link to="/about" className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-accent/10 transition-colors">
            <Info className="h-5 w-5" />
            <span>About</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
