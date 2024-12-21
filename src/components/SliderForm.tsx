import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import { calculateFacilityScore, ValueToTaskCategory } from '../utils/facilityScoring';
import SquareMetersSlider from './sliders/SquareMetersSlider';
import UsersSlider from './sliders/UsersSlider';
import TaskCategorySlider from './sliders/TaskCategorySlider';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
  onSearch: () => void;
}

const SliderForm = ({ facilities = [], onSearch }: SliderFormProps) => {
  const [squareMeters, setSquareMeters] = useState([30]);
  const [users, setUsers] = useState([10]);
  const [taskValue, setTaskValue] = useState([-128]);

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
    </div>
  );
};

export default SliderForm;