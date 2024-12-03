import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import Card from '../components/Card';
import { toast } from "sonner";

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CardOverview = () => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*');
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading facilities...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error loading facilities</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Workplace Settings</h1>
      <div className="grid grid-cols-1 gap-8">
        {facilities?.map((facility) => (
          <Card
            key={facility.id}
            facility={facility.facility}
            subtitle={facility.subtitle}
            description={facility.description}
            taskCategory={facility.task_category}
            sqmApprox={facility.sqm_approx}
            usersApprox={facility.users_approx}
            notes={facility.notes}
            purpose={facility.purpose}
            activities={facility.activities}
            amenities={facility.amenities}
            etiquette={facility.etiquette}
            technology={facility.technology}
          />
        ))}
      </div>
    </div>
  );
};

export default CardOverview;