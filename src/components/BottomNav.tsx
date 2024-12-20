import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowLeft, Menu } from 'lucide-react';
import { Button } from './ui/button';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    navigate('/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSearch}
          className="text-gray-600 hover:text-gray-900"
        >
          <Search className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-600 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default BottomNav;