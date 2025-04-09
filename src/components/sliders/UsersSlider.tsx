
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface UsersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  showInfo?: boolean;
}

const UsersSlider = ({ value, onChange, showInfo = false }: UsersSliderProps) => (
  <div className="space-y-4 relative">
    <div className="flex justify-between items-center mb-4">
      <label className="text-sm font-medium">Amount of Employees</label>
      <span className="text-2xl font-bold">{value[0]}</span>
    </div>
    <Slider
      defaultValue={[10]}
      max={16}
      min={1}
      step={1}
      value={value}
      onValueChange={onChange}
      className="w-full"
    />
    {showInfo && (
      <div className="absolute right-0 mt-2 w-60 text-sm text-gray-500 animate-fade-in">
        <p>Slide to choose how many users will be using the facility!</p>
      </div>
    )}
  </div>
);

export default UsersSlider;
