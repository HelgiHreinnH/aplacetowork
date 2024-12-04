import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';

const DesignLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4">
            <Link 
              to="/design/card-front" 
              className="text-gray-600 hover:text-gray-900"
            >
              Card Front
            </Link>
            <Link 
              to="/design/card-back" 
              className="text-gray-600 hover:text-gray-900"
            >
              Card Back
            </Link>
            <Link 
              to="/design/card" 
              className="text-gray-600 hover:text-gray-900"
            >
              Full Card
            </Link>
            <Link 
              to="/design/card-overview" 
              className="text-gray-600 hover:text-gray-900"
            >
              Card Overview
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DesignLayout;