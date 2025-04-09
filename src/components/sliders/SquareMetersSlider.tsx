
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface SquareMetersSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  showInfo?: boolean;
}

const SquareMetersSlider = ({ value, onChange, showInfo = false }: SquareMetersSliderProps) => (
  <div className="space-y-4 relative">
    <div className="flex justify-between items-center mb-4">
      <label className="text-sm font-medium">Amount of square meters</label>
      <span className="text-2xl font-bold">{value[0]}</span>
    </div>
    <div className="flex items-end">
      <div className="flex-grow">
        <Slider
          defaultValue={[84]}
          max={84}
          min={4}
          step={5}
          value={value}
          onValueChange={onChange}
          className="w-full"
        />
      </div>
      {showInfo && (
        <div className="ml-4 text-xs text-gray-500 w-60 animate-fade-in pb-1">
          <p>Just slide to pick how many square meters you want inspiration for!</p>
        </div>
      )}
    </div>
  </div>
);

export default SquareMetersSlider;
