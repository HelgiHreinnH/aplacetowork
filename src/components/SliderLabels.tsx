import React from 'react';

interface SliderLabelsProps {
  label: string;
}

const SliderLabels = ({ label }: SliderLabelsProps) => (
  <div className="space-y-2">
    <h3 className="text-base font-semibold leading-none tracking-tight">
      {label}
    </h3>
  </div>
);

export default SliderLabels;