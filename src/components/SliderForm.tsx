import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const TaskCategoryMapping = {
  'Highly Concentrated Private Task': -128,
  'Concentrated Private Task': -85,
  'Focus Work Task': -42,
  'Learning/Development Task': 0,
  'Collaborative Task': 42,
  'Interactive Task': 85,
  'Social Task': 127,
} as const;

const ValueToTaskCategory: { [key: number]: string } = {
  [-128]: 'Highly Concentrated Private Task',
  [-85]: 'Concentrated Private Task',
  [-42]: 'Focus Work Task',
  [0]: 'Learning/Development Task',
  [42]: 'Collaborative Task',
  [85]: 'Interactive Task',
  [127]: 'Social Task',
};

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [squareMeters, setSquareMeters] = React.useState([30]);
  const [users, setUsers] = React.useState([10]);
  const [taskValue, setTaskValue] = React.useState([-128]);

  const calculateFacilityScore = (facility: Facility) => {
    let score = 0;
    
    // Square meters score (weighted 30%)
    if (facility["Sq M Min"] !== null && facility["Sq M Max"] !== null) {
      const targetSqM = squareMeters[0];
      const facilityMidPoint = (facility["Sq M Min"] + facility["Sq M Max"]) / 2;
      const sqmDiff = Math.abs(targetSqM - facilityMidPoint);
      score += (1 - sqmDiff / 200) * 30; // Normalize by max possible difference
    }
    
    // Users score (weighted 30%)
    if (facility["Users Min"] !== null && facility["Users Max"] !== null) {
      const targetUsers = users[0];
      const facilityMidPoint = (facility["Users Min"] + facility["Users Max"]) / 2;
      const usersDiff = Math.abs(targetUsers - facilityMidPoint);
      score += (1 - usersDiff / 50) * 30; // Normalize by max possible difference
    }
    
    // Task category score (weighted 40%)
    const facilityTaskValue = facility["Task Category"] ? 
      TaskCategoryMapping[facility["Task Category"] as keyof typeof TaskCategoryMapping] : null;
    if (facilityTaskValue !== null) {
      const taskDiff = Math.abs(taskValue[0] - facilityTaskValue);
      score += (1 - taskDiff / 255) * 40; // Normalize by max possible difference
    }
    
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => ({
      facility,
      score: calculateFacilityScore(facility)
    }));
    
    // Sort by score (highest first)
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .map(item => item.facility);
    
    // Take top 4 results
    const topResults = sortedFacilities.slice(0, 4);
    
    if (topResults.length === 0) {
      toast.error("No facilities found");
      return;
    }

    // Store whether this is an exact match or approximate results
    const exactMatch = topResults.some(facility => {
      const meetsSquareMeters = facility["Sq M Min"] !== null && 
                               facility["Sq M Max"] !== null && 
                               squareMeters[0] >= facility["Sq M Min"] && 
                               squareMeters[0] <= facility["Sq M Max"];
      
      const meetsUsers = facility["Users Min"] !== null && 
                        facility["Users Max"] !== null && 
                        users[0] >= facility["Users Min"] && 
                        users[0] <= facility["Users Max"];
      
      const facilityTaskValue = facility["Task Category"] ? 
        TaskCategoryMapping[facility["Task Category"] as keyof typeof TaskCategoryMapping] : null;
      const meetsTaskCategory = facilityTaskValue === taskValue[0];
      
      return meetsSquareMeters && meetsUsers && meetsTaskCategory;
    });

    sessionStorage.setItem('searchResults', JSON.stringify(topResults));
    sessionStorage.setItem('isExactMatch', JSON.stringify(exactMatch));
    navigate('/search-results');
  };

  const getCurrentTaskCategory = (value: number) => {
    return ValueToTaskCategory[value] || 'Unknown Category';
  };

  const handleTaskValueChange = (value: number[]) => {
    // Snap to the nearest valid value
    const validValues = Object.values(TaskCategoryMapping);
    const nearestValue = validValues.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    setTaskValue([nearestValue]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-xl mx-auto">
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Square Meters
        </label>
        <div className="flex items-center space-x-2 w-full">
          <span className="text-sm text-gray-500 min-w-[2rem]">10</span>
          <div className="w-full">
            <Slider
              defaultValue={[30]}
              max={200}
              min={10}
              step={5}
              value={squareMeters}
              onValueChange={setSquareMeters}
            />
          </div>
          <span className="text-sm text-gray-500 min-w-[2rem]">200</span>
        </div>
        <div className="text-sm text-gray-500 text-center">
          Target square meters: {squareMeters}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Number of Users
        </label>
        <div className="flex items-center space-x-2 w-full">
          <span className="text-sm text-gray-500 min-w-[2rem]">1</span>
          <div className="w-full">
            <Slider
              defaultValue={[10]}
              max={50}
              min={1}
              step={1}
              value={users}
              onValueChange={setUsers}
            />
          </div>
          <span className="text-sm text-gray-500 min-w-[2rem]">50</span>
        </div>
        <div className="text-sm text-gray-500 text-center">
          Target number of users: {users}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium leading-none">
          Task Category
        </label>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Highly Concentrated</span>
          <span>Social</span>
        </div>
        <div className="w-full">
          <Slider
            defaultValue={[-128]}
            min={-128}
            max={127}
            step={1}
            value={taskValue}
            onValueChange={handleTaskValueChange}
          />
        </div>
        <div className="text-sm text-gray-500 text-center">
          Selected category: {getCurrentTaskCategory(taskValue[0])}
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Search Facilities
      </Button>
    </form>
  );
};

export default SliderForm;