import React from 'react';

interface SliderLabelsProps {
  label: string;
}

const SliderLabels = ({ label }: SliderLabelsProps) => (
  <div className="space-y-1 sm:space-y-2">
    <h3 className="text-sm sm:text-base font-semibold leading-none tracking-tight">
      {label}
    </h3>
  </div>
);

export default SliderLabels;