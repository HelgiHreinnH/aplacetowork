import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SliderFormProps {
  facilities?: Facility[];
}

const SliderForm = ({ facilities = [] }: SliderFormProps) => {
  const navigate = useNavigate();
  const [priority, setPriority] = React.useState([3]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredFacilities = facilities.filter(
      facility => facility["Priority (1-5)"] === priority[0]
    );
    
    // Store filtered results in session storage
    sessionStorage.setItem('searchResults', JSON.stringify(filteredFacilities));
    
    // Navigate to results page
    navigate('/search-output');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Priority Level (1-5)
        </label>
        <Slider
          defaultValue={[3]}
          max={5}
          min={1}
          step={1}
          value={priority}
          onValueChange={setPriority}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-center">
          Current value: {priority}
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Search Facilities
      </Button>
    </form>
  );
};

export default SliderForm;