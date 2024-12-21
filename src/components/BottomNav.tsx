import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Home, Heart, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Star, HelpCircle, Info, MessageSquare } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  const handleSearch = () => {
    if (!isIndexPage) {
      navigate('/');
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-4 z-50 w-[90%] max-w-md">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          asChild
          className="text-gray-500 hover:text-gray-900"
        >
          <Link to="/">
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSearch}
          className="text-gray-500 hover:text-gray-900"
        >
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
        
        <div className="relative -mt-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                size="icon"
                className="bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full w-14 h-14 shadow-lg"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
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

        <Button 
          variant="ghost" 
          size="icon"
          asChild
          className="text-gray-500 hover:text-gray-900"
        >
          <Link to="/favorites">
            <Heart className="h-6 w-6" />
            <span className="sr-only">Favorites</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          asChild
          className="text-gray-500 hover:text-gray-900"
        >
          <Link to="/profile">
            <User className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BottomNav;