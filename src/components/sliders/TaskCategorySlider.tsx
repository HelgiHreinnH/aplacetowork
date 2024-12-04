import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderLabels from '../SliderLabels';
import { ValueToTaskCategory } from '../../utils/facilityScoring';

interface TaskCategorySliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const TaskCategorySlider = ({ value, onChange }: TaskCategorySliderProps) => {
  const valueDisplayClasses = "text-xs font-medium text-muted-foreground min-w-[2rem] text-center";
  const sliderWrapperClasses = "flex items-center space-x-4 w-full";

  const handleTaskValueChange = (value: number[]) => {
    const validValues = Object.keys(ValueToTaskCategory).map(Number);
    const nearestValue = validValues.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    onChange([nearestValue]);
  };

  return (
    <div className="space-y-4">
      <SliderLabels 
        label="Task Category"
        min={-128}
        max={127}
        currentValue={ValueToTaskCategory[value[0]]}
      />
      <div className={sliderWrapperClasses}>
        <span className={`${valueDisplayClasses} text-[10px]`}>Concentrated Work</span>
        <Slider
          defaultValue={[-128]}
          min={-128}
          max={127}
          step={1}
          value={value}
          onValueChange={handleTaskValueChange}
          className="w-full"
        />
        <span className={`${valueDisplayClasses} text-[10px]`}>Collaborative Work</span>
      </div>
    </div>
  );
};

export default TaskCategorySlider;