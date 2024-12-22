import React from 'react';
import { Slider } from "@/components/ui/slider";
import { ValueToTaskCategory } from '../../utils/facilityScoring';

interface TaskCategorySliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const TaskCategorySlider = ({ value, onChange }: TaskCategorySliderProps) => {
  const handleTaskValueChange = (value: number[]) => {
    const validValues = Object.keys(ValueToTaskCategory).map(Number);
    const nearestValue = validValues.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    onChange([nearestValue]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Concentrated Task</span>
        <span className="text-sm font-medium text-gray-400">Collaborative Task</span>
      </div>
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
  );
};

export default TaskCategorySlider;