
import React, { useState } from 'react';
import SquareMetersSlider from '@/components/sliders/SquareMetersSlider';
import UsersSlider from '@/components/sliders/UsersSlider';
import TaskCategorySlider from '@/components/sliders/TaskCategorySlider';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpaceParametersDemo: React.FC = () => {
  const [squareMeters, setSquareMeters] = useState<number[]>([30]);
  const [users, setUsers] = useState<number[]>([10]);
  const [taskValue, setTaskValue] = useState<number[]>([-128]); // Default to concentrated task

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[#3f00ff] text-3xl font-bold mb-2">How to use the app</h2>
        <p className="text-gray-500">
          Use these sliders to find the perfect workplace setting
        </p>
      </div>
      
      {/* Single column for sliders */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        <SquareMetersSlider 
          value={squareMeters} 
          onChange={setSquareMeters} 
        />
        
        <UsersSlider 
          value={users} 
          onChange={setUsers} 
        />
        
        <TaskCategorySlider 
          value={taskValue} 
          onChange={setTaskValue} 
        />
      </div>
      
      <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-3 text-left">
          <Info size={20} className="text-[#3f00ff] mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">
              Want to learn more about the way to find the correct facility?
            </p>
            <p className="text-sm text-gray-600">
              Just push the Info button
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <img 
            src="public/lovable-uploads/78d1b00b-c6e7-4a33-bac5-42984b73ef8b.png"
            alt="Info button demonstration" 
            className="w-full max-w-md mx-auto h-auto object-contain"
          />
          <p className="text-sm text-center text-gray-500 mt-2">Text on info button</p>
        </div>
      </div>
    </div>
  );
};

export default SpaceParametersDemo;
