import React from 'react';

interface SliderLabelsProps {
  label: string;
  min: number;
  max: number;
  currentValue?: string | number;
}

const SliderLabels: React.FC<SliderLabelsProps> = ({ label, min, max, currentValue }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      {currentValue && (
        <div className="text-sm text-gray-500 text-center">
          Target {label.toLowerCase()}: {currentValue}
        </div>
      )}
    </div>
  );
};

export default SliderLabels;