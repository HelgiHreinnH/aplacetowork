import React from 'react';
import { Slider } from "@/components/ui/slider";

interface UsersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const UsersSlider = ({ value, onChange }: UsersSliderProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium">Amount of Employees</label>
      <span className="text-2xl font-bold">{value[0]}</span>
    </div>
    <Slider
      defaultValue={[10]}
      max={50}
      min={1}
      step={1}
      value={value}
      onValueChange={onChange}
      className="w-full"
    />
  </div>
);

export default UsersSlider;