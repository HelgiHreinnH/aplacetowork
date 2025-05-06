
import React from 'react';
import { motion } from 'framer-motion';
import { H1 } from '@/components/ui/typography';

const WelcomeStep = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 max-w-md mx-auto">
      <motion.img
        src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage/Icon_blue.png"
        alt="App logo"
        className="w-24 h-24 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      
      <div className="space-y-3">
        <H1 className="!text-[#3f00ff] !text-3xl !mb-2">Welcome to A Place to Work</H1>
        <motion.p 
          className="text-lg text-[#8E9196]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your guide to discovering the perfect workplace setting for any task
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4 w-full mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-[#3f00ff] transition-colors">
          <h3 className="font-bold text-[#3f00ff] mb-1">Work Table</h3>
          <p className="text-xs text-gray-600">Focused individual work spaces</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-[#3f00ff] transition-colors">
          <h3 className="font-bold text-[#3f00ff] mb-1">Lounge Area</h3>
          <p className="text-xs text-gray-600">Comfortable collaborative spaces</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-[#3f00ff] transition-colors">
          <h3 className="font-bold text-[#3f00ff] mb-1">Meeting Room</h3>
          <p className="text-xs text-gray-600">Formal discussion spaces</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-[#3f00ff] transition-colors">
          <h3 className="font-bold text-[#3f00ff] mb-1">Open Area</h3>
          <p className="text-xs text-gray-600">Multi-purpose flexible spaces</p>
        </div>
      </motion.div>
      
      <motion.p 
        className="text-sm text-[#8E9196] mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Swipe through to personalize your experience
      </motion.p>
    </div>
  );
};

export default WelcomeStep;
