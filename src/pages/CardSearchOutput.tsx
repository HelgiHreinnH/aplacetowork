import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import Card from '../components/Card';
import { toast } from "sonner";

const CardSearchOutput = () => {
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
            key={facility["Facility ID"]}
            facility={facility["Facility"]}
            subtitle={facility["Subtitle"]}
            description={facility["Description"]}
            taskCategory={facility["Task Category"]}
            sqmApprox={facility["Approx. Square Meters"]}
            usersApprox={facility["Approx. Users"]}
            notes={facility["Notes"]}
            purpose={facility["Purpose of the Facility"]}
            activities={facility["Types of Activities Supported"]}
            amenities={facility["Amenities & Features"]}
            etiquette={facility["Etiquette and Guidelines"]}
            technology={facility["Technology Integration"]}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSearchOutput;