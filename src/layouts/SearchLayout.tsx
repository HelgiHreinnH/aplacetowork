import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const SearchLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default SearchLayout;