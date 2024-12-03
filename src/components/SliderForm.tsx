import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [squareMeters, setSquareMeters] = React.useState([30]);
  const [users, setUsers] = React.useState([10]);
  const [selectedTasks, setSelectedTasks] = React.useState<string[]>([]);

  // Extract unique task categories
  const uniqueTaskCategories = React.useMemo(() => {
    const categories = facilities
      .map(f => f["Task Category"])
      .filter((category): category is string => category !== null);
    return Array.from(new Set(categories));
  }, [facilities]);

  const handleTaskToggle = (task: string) => {
    setSelectedTasks(prev => {
      if (prev.includes(task)) {
        return prev.filter(t => t !== task);
      } else {
        return [...prev, task];
      }
    });
  };

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
      
      // Task category filter (multiple selection)
      const meetsTaskCategory = selectedTasks.length === 0 || 
                              (facility["Task Category"] && 
                               selectedTasks.includes(facility["Task Category"]));
      
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
        <label className="text-sm font-medium leading-none mb-4">
          Task Categories
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueTaskCategories.map((task) => (
            <div key={task} className="flex items-center space-x-2">
              <Checkbox
                id={task}
                checked={selectedTasks.includes(task)}
                onCheckedChange={() => handleTaskToggle(task)}
              />
              <label
                htmlFor={task}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Search Facilities
      </Button>
    </form>
  );
};

export default SliderForm;