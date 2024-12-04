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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Facility Overview</h1>
      <div className="aspect-[3/4] w-full max-w-2xl mx-auto">
        <Card {...facilities[0]} />
      </div>
    </div>
  );
};

export default CardOverview;