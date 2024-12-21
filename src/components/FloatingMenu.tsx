import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Star, Home, HelpCircle, Info, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface FloatingMenuProps {
  trigger?: React.ReactNode;
}

const FloatingMenu = ({ trigger }: FloatingMenuProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          {trigger || (
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full bg-primary shadow-lg hover:bg-primary/90"
              aria-label="Open menu"
            >
              <span className="sr-only">Open menu</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          )}
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