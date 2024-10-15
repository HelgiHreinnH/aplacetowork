import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const SliderForm = () => {
  const [squareMeters, setSquareMeters] = useState(8);
  const [employees, setEmployees] = useState(1);
  const [usage, setUsage] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { squareMeters, employees, usage });
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount of square meters
        </label>
        <div className="relative pt-1">
          <Slider
            min={8}
            max={40}
            step={2}
            value={[squareMeters]}
            onValueChange={(value) => setSquareMeters(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 px-2 mt-1">
            <span>8</span>
            <span>40</span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-lg font-bold text-gray-700">{squareMeters} m²</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount of employees
        </label>
        <div className="relative pt-1">
          <Slider
            min={1}
            max={10}
            step={1}
            value={[employees]}
            onValueChange={(value) => setEmployees(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 px-2 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-lg font-bold text-gray-700">{employees}</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Usage of area
        </label>
        <div className="relative pt-1">
          <Slider
            min={0}
            max={1}
            step={1}
            value={[usage]}
            onValueChange={(value) => setUsage(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 px-2 mt-1">
            <span>Active</span>
            <span>Passive</span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-lg font-bold text-gray-700">
            {usage === 0 ? 'Active' : 'Passive'}
          </span>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Search
      </Button>
    </form>
  );
};

export default SliderForm;