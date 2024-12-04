import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Card from '@/components/Card';

const CardList = () => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      console.log('Fetching facilities...');
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
        console.error('Error fetching facilities:', error);
        toast.error("Failed to load facilities");
        throw error;
      }
      
      console.log('Fetched facilities:', data);
      return data;
    }
  });

  console.log('Current facilities state:', facilities);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loading facilities...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading facilities</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">All Facilities</h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse through our collection of {facilities?.length || 0} workplace settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities?.map((facility) => (
            <div key={facility.Facility} className="h-[600px]">
              <Card {...facility} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;