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
        <p className="text-lg font-bold text-center text-primary mt-2">
          {currentValue}
        </p>
      )}
    </div>
  );
};

export default SliderLabels;