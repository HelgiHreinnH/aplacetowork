import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Card from './Card';

const CardOverview = () => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select(`
          Facility,
          Subtitle,
          Description,
          "Task Category",
          "Approx. Square Meters",
          "Approx. Users",
          Notes,
          "Purpose of the Facility",
          "Types of Activities Supported",
          "Amenities & Features",
          "Etiquette and Guidelines",
          "Technology Integration"
        `);
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-lg text-gray-600">Loading facility...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-lg text-red-500">Error loading facility</div>
      </div>
    );
  }

  const facility = facilities?.[0];

  if (!facility) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-lg text-gray-600">No facility found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Facility Overview</h1>
        </div>
        <div className="aspect-[3/4] w-full max-w-2xl mx-auto">
          <Card {...facility} />
        </div>
      </div>
    </div>
  );
};

export default CardOverview;