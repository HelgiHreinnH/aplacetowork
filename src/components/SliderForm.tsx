import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [squareMeters, setSquareMeters] = React.useState([30]);
  const [users, setUsers] = React.useState([10]);
  const [taskSearch, setTaskSearch] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredFacilities = facilities.filter(facility => {
      // Square meters filter (using the min/max range)
      const meetsSquareMeters = facility["Sq M Min"] !== null && 
                               facility["Sq M Max"] !== null && 
                               squareMeters[0] >= facility["Sq M Min"] && 
                               squareMeters[0] <= facility["Sq M Max"];
      
      // Users filter (using the min/max range)
      const meetsUsers = facility["Users Min"] !== null && 
                        facility["Users Max"] !== null && 
                        users[0] >= facility["Users Min"] && 
                        users[0] <= facility["Users Max"];
      
      // Task category filter (string search)
      const meetsTaskCategory = taskSearch === '' || 
                              (facility["Task Category"] && 
                               facility["Task Category"].toLowerCase().includes(taskSearch.toLowerCase()));
      
      return meetsSquareMeters && meetsUsers && meetsTaskCategory;
    });
    
    // Store filtered results in session storage
    sessionStorage.setItem('searchResults', JSON.stringify(filteredFacilities));
    
    // Navigate to results page
    navigate('/search-output');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Square Meters
        </label>
        <Slider
          defaultValue={[30]}
          max={200}
          min={10}
          step={5}
          value={squareMeters}
          onValueChange={setSquareMeters}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-center">
          Target square meters: {squareMeters}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Number of Users
        </label>
        <Slider
          defaultValue={[10]}
          max={50}
          min={1}
          step={1}
          value={users}
          onValueChange={setUsers}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-center">
          Target number of users: {users}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Task Category
        </label>
        <Input
          type="text"
          placeholder="Search task categories..."
          value={taskSearch}
          onChange={(e) => setTaskSearch(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="w-full">
        Search Facilities
      </Button>
    </form>
  );
};

export default SliderForm;