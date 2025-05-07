
import React from 'react';
import { motion } from 'framer-motion';
import SpaceParametersDemo from './SpaceParametersDemo';

interface TourStep {
  title: string;
  description: string;
  image?: string;
  footer?: string;
  customComponent?: string;
}

interface AppTourStepProps {
  step: TourStep;
}

const AppTourStep: React.FC<AppTourStepProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center h-full w-full mx-auto">
      {step.customComponent === 'SpaceParametersDemo' ? (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SpaceParametersDemo />
        </motion.div>
      ) : (
        <motion.div className="flex flex-col items-center max-w-lg">
          <motion.div 
            className="mb-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#3f00ff] mb-2">{step.title}</h2>
          </motion.div>
          
          {step.image && (
            <motion.div 
              className="w-full max-w-md mb-6 rounded-lg overflow-hidden bg-white shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-center">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '280px' }}
                  onError={(e) => {
                    // Fallback image if the provided one fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640";
                  }}
                />
              </div>
            </motion.div>
          )}
          
          {step.description && (
            <motion.p 
              className="text-[#8E9196] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {step.description}
            </motion.p>
          )}
          
          {step.footer && (
            <motion.div
              className="mt-auto pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-sm italic text-center text-[#474562] font-medium px-4 border-t border-gray-100 pt-4">
                {step.footer}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AppTourStep;
