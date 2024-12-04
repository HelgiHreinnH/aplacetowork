import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import SliderLabels from '../SliderLabels';
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
    <div className="space-y-2">
      <SliderLabels label="Task Category" />
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-4 w-full">
            <span className="text-xs font-medium text-muted-foreground min-w-[2rem] text-center text-[10px]">Concentrated Work</span>
            <Slider
              defaultValue={[-128]}
              min={-128}
              max={127}
              step={1}
              value={value}
              onValueChange={handleTaskValueChange}
              className="w-full"
            />
            <span className="text-xs font-medium text-muted-foreground min-w-[2rem] text-center text-[10px]">Collaborative Work</span>
          </div>
          <div className="flex justify-center">
            <div className="px-3 py-1 border rounded-md bg-secondary/20">
              <p className="text-sm font-bold text-primary">{ValueToTaskCategory[value[0]]}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCategorySlider;