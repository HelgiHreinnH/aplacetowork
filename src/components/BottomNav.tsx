import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowLeft, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Star, Home, HelpCircle, Info, MessageSquare } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  const handleBack = () => {
    if (!isIndexPage) {
      navigate(-1);
    }
  };

  const handleSearch = () => {
    if (!isIndexPage) {
      navigate('/');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          className={`${isIndexPage ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
          disabled={isIndexPage}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSearch}
          className={`${isIndexPage ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
          disabled={isIndexPage}
        >
          <Search className="h-6 w-6" />
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
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
    </div>
  );
};

export default BottomNav;