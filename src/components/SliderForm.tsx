import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import type { Database } from '@/integrations/supabase/types';
import { calculateFacilityScore, ValueToTaskCategory } from '../utils/facilityScoring';
import SquareMetersSlider from './sliders/SquareMetersSlider';
import UsersSlider from './sliders/UsersSlider';
import TaskCategorySlider from './sliders/TaskCategorySlider';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [squareMeters, setSquareMeters] = useState([30]);
  const [users, setUsers] = useState([10]);
  const [taskValue, setTaskValue] = useState([-128]);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-10">
        <SquareMetersSlider value={squareMeters} onChange={setSquareMeters} />
        <UsersSlider value={users} onChange={setUsers} />
        <TaskCategorySlider value={taskValue} onChange={setTaskValue} />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-md text-base font-medium"
      >
        SEARCH
      </Button>
    </form>
  );
};

export default SliderForm;