import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import FloatingMenu from '../components/FloatingMenu';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const DesignLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Outlet />
      </div>
      <BottomNav />
      <FloatingMenu trigger={
        <Button size="icon" className="h-12 w-12 rounded-full bg-accent shadow-lg hover:bg-accent/90">
          <Menu className="h-6 w-6" />
        </Button>
      } />
    </div>
  );
};

export default DesignLayout;