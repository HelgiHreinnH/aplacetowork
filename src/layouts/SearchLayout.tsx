import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';

const SearchLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SearchLayout;