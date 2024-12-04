import React from 'react';

interface SliderLabelsProps {
  label: string;
  min: number;
  max: number;
  currentValue?: string | number;
}

const SliderLabels: React.FC<SliderLabelsProps> = ({ label, min, max, currentValue }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold leading-none tracking-tight">
        {label}
      </h3>
      {currentValue && (
        <div className="flex justify-center mt-2">
          <div className="px-3 py-1 border rounded-md bg-secondary/20">
            <p className="text-sm font-bold text-primary">
              {currentValue}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderLabels;