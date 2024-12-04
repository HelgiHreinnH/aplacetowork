import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CardNavigation from '@/components/CardNavigation';

const CardList = () => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      console.log('Fetching facilities with related data...');
      
      const { data, error } = await supabase
        .from('Facilities')
        .select(`
          *,
          Facilities_index_values:Facilities index values!inner(
            Priority,
            "Task Category",
            "Sq M Min",
            "Sq M Max",
            "Users Min",
            "Users Max"
          ),
          Facility_task_values:Facility task values!inner(
            "INT8 Task Value"
          )
        `);
      
      if (error) {
        console.error('Supabase error:', error);
        toast.error("Failed to load facilities");
        throw error;
      }

      console.log('Combined facilities data:', data);
      return data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[600px] bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Query error:', error);
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading facilities</h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workplace Facilities</h1>
          <p className="text-xl text-gray-600">
            Explore our collection of {facilities?.length || 0} workplace settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities?.map((facility, index) => {
            const combinedFacility = {
              ...facility,
              Priority: facility['Facilities index values']?.[0]?.Priority,
              'Task Category': facility['Facilities index values']?.[0]?.['Task Category'],
              'Sq M Min': facility['Facilities index values']?.[0]?.['Sq M Min'],
              'Sq M Max': facility['Facilities index values']?.[0]?.['Sq M Max'],
              'Users Min': facility['Facilities index values']?.[0]?.['Users Min'],
              'Users Max': facility['Facilities index values']?.[0]?.['Users Max'],
              'INT8 Task Value': facility['Facility task values']?.[0]?.['INT8 Task Value'],
            };

            return (
              <div key={facility.Facility} className="h-[600px] transform hover:scale-[1.02] transition-transform duration-300">
                <CardNavigation 
                  {...combinedFacility} 
                  imageId={`photo-${(index % 4) + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardList;