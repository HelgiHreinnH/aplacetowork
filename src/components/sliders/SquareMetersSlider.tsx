import React from 'react';
import { Slider } from "@/components/ui/slider";

interface SquareMetersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const SquareMetersSlider = ({ value, onChange }: SquareMetersSliderProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium">Amount of square meters</label>
      <span className="text-2xl font-bold">{value[0]}</span>
    </div>
    <Slider
      defaultValue={[30]}
      max={200}
      min={10}
      step={5}
      value={value}
      onValueChange={onChange}
      className="w-full"
    />
  </div>
);

export default SquareMetersSlider;