import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import SliderLabels from '../SliderLabels';

interface UsersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const UsersSlider = ({ value, onChange }: UsersSliderProps) => (
  <div className="space-y-1 sm:space-y-2">
    <SliderLabels label="Number of Users" />
    <Card className="p-2 sm:p-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-4 w-full">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground min-w-[1.5rem] sm:min-w-[2rem] text-center">1</span>
          <Slider
            defaultValue={[10]}
            max={50}
            min={1}
            step={1}
            value={value}
            onValueChange={onChange}
            className="w-full"
          />
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground min-w-[1.5rem] sm:min-w-[2rem] text-center">50</span>
        </div>
        <div className="flex justify-end">
          <div className="px-2 py-0.5 sm:px-3 sm:py-1 border rounded-md bg-secondary/20">
            <p className="text-xs sm:text-sm font-bold text-primary">{value[0]}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default UsersSlider;