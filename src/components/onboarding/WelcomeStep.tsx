
import React from 'react';
import { motion } from 'framer-motion';
import { H1 } from '@/components/ui/typography';

const WelcomeStep = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 max-w-md mx-auto">
      <motion.img
        src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//Icon.png"
        alt="App logo"
        className="w-32 h-32 drop-shadow-xl"
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
          Discover and get inspired by different workplace settings for your office.
        </motion.p>
        <motion.p 
          className="text-sm text-[#8E9196]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Let us guide you through the app's features and help you find your ideal workspace.
        </motion.p>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-3 justify-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 w-[100px]">
          <span className="text-[#3f00ff] font-bold">Work Table</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 w-[100px]">
          <span className="text-[#3f00ff] font-bold">Lounge</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 w-[100px]">
          <span className="text-[#3f00ff] font-bold">Meeting</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 w-[100px]">
          <span className="text-[#3f00ff] font-bold">Open Area</span>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
