import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderLabels from '../SliderLabels';

interface UsersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const UsersSlider = ({ value, onChange }: UsersSliderProps) => {
  const valueDisplayClasses = "text-xs font-medium text-muted-foreground min-w-[2rem] text-center";
  const sliderWrapperClasses = "flex items-center space-x-4 w-full";

  return (
    <div className="space-y-4">
      <SliderLabels 
        label="Number of Users"
        min={1}
        max={50}
        currentValue={value[0]}
      />
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
    </div>
  );
};

export default UsersSlider;