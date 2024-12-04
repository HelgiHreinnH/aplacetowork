import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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

  if (isLoading || error || !facilities?.length) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-lg text-gray-600">
          {isLoading ? 'Loading facility...' : 
           error ? 'Error loading facility' : 
           'No facility found'}
        </div>
      </div>
    );
  }

  const facility = facilities[0];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Facility Overview</h1>
      <div className="aspect-[3/4] w-full max-w-2xl mx-auto">
        <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-2 pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility.Facility}</h1>
          </CardHeader>

          <div className="w-full h-48 px-6 mb-6">
            <img 
              src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b`}
              alt={facility.Facility || 'Facility image'} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">{facility.Subtitle}</h2>
              <p className="text-gray-600 leading-relaxed">{facility.Description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Task Category</h3>
                <p className="text-gray-600">{facility['Task Category']}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Space Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Area: {facility['Approx. Square Meters']} m²</p>
                  <p className="text-gray-600">Capacity: {facility['Approx. Users']} users</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardOverview;