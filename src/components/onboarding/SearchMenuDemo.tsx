
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, Heart, X, Grid, MessageSquare, Settings, Info } from 'lucide-react';

const SearchMenuDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto space-y-12 pt-6">
      <motion.h2 
        className="text-2xl font-bold text-[#3f00ff] text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Search and Menu Features
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full flex flex-col items-center"
      >
        <p className="text-sm text-gray-500 text-center mb-4">
          Use the search and menu for quick access to all features
        </p>
        
        {/* Added image under the title */}
        <img
          src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/userguide//Menu_Open.png"
          alt="Menu Open Screenshot"
          className="w-full max-w-xs rounded-lg shadow-md mb-8"
        />
      </motion.div>

      {/* Description for "Access All Features" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="px-4"
      >
        <p className="text-center text-gray-600 mb-8">
          Open the menu to access your favorites, profile settings, and additional resources about workplace design.
        </p>
      </motion.div>

      {/* Search Bar Demo */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="bg-white rounded-full shadow-md p-3 flex justify-between items-center">
          <div className="flex items-center">
            <Menu size={20} className="text-gray-400 ml-1" />
          </div>
          <div className="flex items-center bg-[#FF8C00] bg-opacity-20 rounded-full p-1">
            <Search size={20} className="text-[#FF8C00]" />
          </div>
          <div className="flex items-center">
            <Heart size={20} className="text-gray-400 mr-1" />
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">Use search to find workplace settings</div>
      </motion.div>

      {/* Menu Demo */}
      <motion.div
        className="w-full max-w-md" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 py-1">
              <Grid size={18} className="text-gray-700" />
              <span className="text-sm font-medium">All Facilities</span>
              <X size={18} className="text-gray-700 ml-auto" />
            </div>
            <div className="flex items-center space-x-3 py-1">
              <Heart size={18} className="text-gray-700" />
              <span className="text-sm font-medium">Favourites</span>
            </div>
            <div className="flex items-center space-x-3 py-1">
              <MessageSquare size={18} className="text-gray-700" />
              <span className="text-sm font-medium">What are you missing?</span>
            </div>
            <div className="flex items-center space-x-3 py-1">
              <Settings size={18} className="text-gray-700" />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <div className="flex items-center space-x-3 py-1">
              <Info size={18} className="text-gray-700" />
              <span className="text-sm font-medium">About</span>
            </div>
          </div>
          
          {/* Bottom search bar in menu */}
          <div className="mt-5 mb-1">
            <div className="bg-white border border-gray-200 rounded-full shadow-sm p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Menu size={20} className="text-gray-400 ml-1" />
              </div>
              <div className="flex items-center bg-[#5526F9] bg-opacity-20 rounded-full p-1">
                <Search size={20} className="text-[#5526F9]" />
              </div>
              <div className="flex items-center">
                <Heart size={20} className="text-gray-400 mr-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">Access all features through the menu</div>
      </motion.div>
    </div>
  );
};

export default SearchMenuDemo;
