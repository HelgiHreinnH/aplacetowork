
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import IndexBottomNav from '../components/navigation/IndexBottomNav';
import StandardBottomNav from '../components/navigation/StandardBottomNav';

const SearchLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <div className="min-h-screen bg-[#F6F6F7] pb-16">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
      {isHomePage ? <IndexBottomNav /> : <StandardBottomNav />}
    </div>
  );
};

export default SearchLayout;
