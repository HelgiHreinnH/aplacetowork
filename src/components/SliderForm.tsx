import React, { useState } from 'react';
import type { Database } from '@/integrations/supabase/types';
import { type TaskValue } from '../utils/facilityScoring';
import SquareMetersSlider from './sliders/SquareMetersSlider';
import UsersSlider from './sliders/UsersSlider';
import TaskCategorySlider from './sliders/TaskCategorySlider';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
  onSearch: () => void;
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const [squareMeters, setSquareMeters] = useState([30]);
  const [users, setUsers] = useState([10]);
  const [taskValue, setTaskValue] = useState<[TaskValue]>([-128]);

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

    // Store facilities in sessionStorage for search
    if (facilities && facilities.length > 0) {
      sessionStorage.setItem('facilities', JSON.stringify(facilities));
    }
  }, [squareMeters, users, taskValue, facilities]);

  // Create a wrapper function to handle the type conversion
  const handleTaskValueChange = (value: number[]) => {
    const taskVal = value[0] as TaskValue;
    setTaskValue([taskVal]);
  };

  return (
    <div className="space-y-12">
      <SquareMetersSlider value={squareMeters} onChange={setSquareMeters} />
      <UsersSlider value={users} onChange={setUsers} />
      <TaskCategorySlider value={taskValue} onChange={handleTaskValueChange} />
    </div>
  );
};

export default SliderForm;