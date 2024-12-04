import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Search Journey
          </Link>
          <Link 
            to="/design/card-front" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/design') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Design
          </Link>
          <Link 
            to="/list" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/list') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Card List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;