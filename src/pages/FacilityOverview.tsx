import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import CardOverview from '@/components/overview/CardOverview';

const FacilityOverview = () => {
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
    return (
      <div className="flex items-center justify-center min-h-screen pb-24">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 pb-24">
        <p className="text-red-500">Error loading facilities</p>
      </div>
    );
  }

  if (!facilities || facilities.length === 0) {
    return (
      <div className="text-center py-12 pb-24">
        <p className="text-gray-500">No facilities found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <CardOverview facilities={facilities} />
    </div>
  );
};

export default FacilityOverview;