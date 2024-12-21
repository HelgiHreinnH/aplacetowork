import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Star, Home, HelpCircle, Info, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingMenu = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full bg-accent shadow-lg hover:bg-accent/90">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
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
    </div>
  );
};

export default FloatingMenu;