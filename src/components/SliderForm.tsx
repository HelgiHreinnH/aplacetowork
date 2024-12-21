import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import { calculateFacilityScore, ValueToTaskCategory, type TaskValue } from '../utils/facilityScoring';
import SquareMetersSlider from './sliders/SquareMetersSlider';
import UsersSlider from './sliders/UsersSlider';
import TaskCategorySlider from './sliders/TaskCategorySlider';
import { Button } from './ui/button';
import { toast } from 'sonner';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
  onSearch: () => void;
}

const SliderForm = ({ facilities = [], onSearch }: SliderFormProps) => {
  const [squareMeters, setSquareMeters] = useState([30]);
  const [users, setUsers] = useState([10]);
  const [taskValue, setTaskValue] = useState([-128] as [TaskValue]);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Search triggered with params:', {
      squareMeters: squareMeters[0],
      users: users[0],
      taskValue: taskValue[0]
    });
    
    sessionStorage.setItem('searchParams', JSON.stringify({
      squareMeters: squareMeters[0],
      users: users[0],
      taskValue: taskValue[0]
    }));

    if (!facilities || facilities.length === 0) {
      console.log('No facilities available');
      toast.error("No facilities available");
      return;
    }

    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => {
      const score = calculateFacilityScore(
        facility, 
        squareMeters[0], 
        users[0], 
        taskValue[0]
      );
      console.log(`Score for ${facility.Facility}:`, score);
      return { facility, score };
    });
    
    console.log('All facilities with scores:', facilitiesWithScores);
    
    // Sort by score and take top 6
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.facility);
    
    console.log('Final sorted facilities:', sortedFacilities);

    if (sortedFacilities.length === 0) {
      toast.error("No matching facilities found");
      return;
    }
    
    // Store results and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(sortedFacilities));
    sessionStorage.setItem('isExactMatch', JSON.stringify(true));
    navigate('/search-results');
  };

  React.useEffect(() => {
    console.log('Storing search params:', {
      squareMeters: squareMeters[0],
      users: users[0],
      taskValue: taskValue[0]
    });
    
    sessionStorage.setItem('searchParams', JSON.stringify({
      squareMeters: squareMeters[0],
      users: users[0],
      taskValue: taskValue[0]
    }));
  }, [squareMeters, users, taskValue]);

  return (
    <div className="space-y-8">
      <SquareMetersSlider value={squareMeters} onChange={setSquareMeters} />
      <UsersSlider value={users} onChange={setUsers} />
      <TaskCategorySlider value={taskValue} onChange={setTaskValue} />
      <Button 
        onClick={handleSearch}
        className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white"
      >
        Search Facilities
      </Button>
    </div>
  );
};

export default SliderForm;