import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';
import { calculateFacilityScore, ValueToTaskCategory } from '../utils/facilityScoring';
import SliderLabels from './SliderLabels';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [squareMeters, setSquareMeters] = useState([30]);
  const [users, setUsers] = useState([10]);
  const [taskValue, setTaskValue] = useState([-128]);

  const handleTaskValueChange = (value: number[]) => {
    const validValues = Object.keys(ValueToTaskCategory).map(Number);
    const nearestValue = validValues.reduce((prev, curr) => {
      return Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev;
    });
    setTaskValue([nearestValue]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => ({
      facility,
      score: calculateFacilityScore(facility, squareMeters[0], users[0], taskValue[0])
    }));
    
    // Sort by score (highest first)
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .map(item => item.facility);
    
    // Take top 4 results
    const topResults = sortedFacilities.slice(0, 4);
    
    if (topResults.length === 0) {
      return; // Don't navigate if no results
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
      
      const meetsTaskCategory = facility["Task Category"] === ValueToTaskCategory[taskValue[0]];
      
      return meetsSquareMeters && meetsUsers && meetsTaskCategory;
    });

    // Store results in sessionStorage and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(topResults));
    sessionStorage.setItem('isExactMatch', JSON.stringify(exactMatch));
    navigate('/search-results');
  };

  const sliderContainerClasses = "space-y-4";
  const sliderWrapperClasses = "flex items-center space-x-4 w-full";
  const valueDisplayClasses = "text-sm font-medium text-muted-foreground min-w-[3rem] text-center";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-xl mx-auto">
      <Card className="p-6 space-y-8">
        <div className={sliderContainerClasses}>
          <SliderLabels 
            label="Square Meters"
            min={10}
            max={200}
            currentValue={squareMeters[0]}
          />
          <div className={sliderWrapperClasses}>
            <span className={valueDisplayClasses}>10</span>
            <Slider
              defaultValue={[30]}
              max={200}
              min={10}
              step={5}
              value={squareMeters}
              onValueChange={setSquareMeters}
              className="w-full"
            />
            <span className={valueDisplayClasses}>200</span>
          </div>
        </div>

        <div className={sliderContainerClasses}>
          <SliderLabels 
            label="Number of Users"
            min={1}
            max={50}
            currentValue={users[0]}
          />
          <div className={sliderWrapperClasses}>
            <span className={valueDisplayClasses}>1</span>
            <Slider
              defaultValue={[10]}
              max={50}
              min={1}
              step={1}
              value={users}
              onValueChange={setUsers}
              className="w-full"
            />
            <span className={valueDisplayClasses}>50</span>
          </div>
        </div>

        <div className={sliderContainerClasses}>
          <SliderLabels 
            label="Task Category"
            min={-128}
            max={127}
            currentValue={ValueToTaskCategory[taskValue[0]]}
          />
          <div className={sliderWrapperClasses}>
            <span className={valueDisplayClasses}>-128</span>
            <Slider
              defaultValue={[-128]}
              min={-128}
              max={127}
              step={1}
              value={taskValue}
              onValueChange={handleTaskValueChange}
              className="w-full"
            />
            <span className={valueDisplayClasses}>127</span>
          </div>
        </div>
      </Card>
      
      <Button type="submit" className="w-full">
        Search Facilities
      </Button>
    </form>
  );
};

export default SliderForm;
