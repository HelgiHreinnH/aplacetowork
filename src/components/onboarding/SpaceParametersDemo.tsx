
import React, { useState } from 'react';
import { SquareMetersSlider } from '@/components/sliders/SquareMetersSlider';
import { UsersSlider } from '@/components/sliders/UsersSlider';
import { TaskCategorySlider } from '@/components/sliders/TaskCategorySlider';
import { Info } from 'lucide-react';

const SpaceParametersDemo: React.FC = () => {
  const [squareMeters, setSquareMeters] = useState<number[]>([30]);
  const [users, setUsers] = useState<number[]>([10]);
  const [taskValue, setTaskValue] = useState<number[]>([-128]); // Default to concentrated task

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-[#3f00ff] text-2xl font-bold text-center mb-6">How to use the app</h2>
      <p className="text-center text-gray-500 mb-8">
        Use these sliders to find the perfect workplace setting
      </p>
      
      <div className="space-y-8">
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
      
      <div className="mt-10 border-t pt-6">
        <div className="flex items-start gap-3 text-left">
          <Info size={20} className="text-[#3f00ff] mt-0.5" />
          <p className="text-sm text-gray-600">
            Want to learn more about the way to find the correct facility? Just push the Info button
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpaceParametersDemo;
