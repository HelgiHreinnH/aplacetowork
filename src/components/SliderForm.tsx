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
        <Slider
          min={8}
          max={40}
          step={2}
          value={[squareMeters]}
          onValueChange={(value) => setSquareMeters(value[0])}
          className="w-full"
        />
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">{squareMeters} m²</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount of employees
        </label>
        <Slider
          min={1}
          max={10}
          step={1}
          value={[employees]}
          onValueChange={(value) => setEmployees(value[0])}
          className="w-full"
        />
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">{employees}</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Usage of area
        </label>
        <Slider
          min={0}
          max={1}
          step={1}
          value={[usage]}
          onValueChange={(value) => setUsage(value[0])}
          className="w-full"
        />
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">
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