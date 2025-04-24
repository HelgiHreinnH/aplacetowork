
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { ValueToTaskCategory } from '../../utils/facilityScoring';

interface TaskCategorySliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  showInfo?: boolean;
}

const TaskCategorySlider = ({ value, onChange, showInfo = false }: TaskCategorySliderProps) => {
  const handleTaskValueChange = (value: number[]) => {
    const validValues = Object.keys(ValueToTaskCategory).map(Number);
    const nearestValue = validValues.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    onChange([nearestValue]);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium flex-grow">Task Category</span>
      </div>
      <div className="flex">
        <div className="flex-grow">
          <Slider
            defaultValue={[-128]}
            min={-128}
            max={127}
            step={1}
            value={value}
            onValueChange={handleTaskValueChange}
            className="w-full"
          />
        </div>
      </div>
      {showInfo && (
        <div className="absolute left-full ml-4 px-2 text-[10px] text-gray-500 w-60 bottom-0 pb-1">
          <p>Just slide the bars to choose whether the space is better for focused work or team collaboration!</p>
        </div>
      )}
    </div>
  );
};

export default TaskCategorySlider;
