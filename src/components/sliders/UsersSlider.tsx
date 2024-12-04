import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import SliderLabels from '../SliderLabels';

interface UsersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const UsersSlider = ({ value, onChange }: UsersSliderProps) => {
  const valueDisplayClasses = "text-xs font-medium text-muted-foreground min-w-[2rem] text-center";
  const sliderWrapperClasses = "flex items-center space-x-4 w-full";

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <SliderLabels 
          label="Number of Users"
          min={1}
          max={50}
        />
        <div className="space-y-2">
          <div className={sliderWrapperClasses}>
            <span className={valueDisplayClasses}>1</span>
            <Slider
              defaultValue={[10]}
              max={50}
              min={1}
              step={1}
              value={value}
              onValueChange={onChange}
              className="w-full"
            />
            <span className={valueDisplayClasses}>50</span>
          </div>
          <div className="flex justify-end">
            <div className="px-3 py-1 border rounded-md bg-secondary/20">
              <p className="text-sm font-bold text-primary">{value[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UsersSlider;