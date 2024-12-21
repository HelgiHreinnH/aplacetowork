import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const DesignLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default DesignLayout;