
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';
import { Loader2 } from 'lucide-react';

interface FacilityOverlayCardProps {
  facilityId: string;
}

const FacilityOverlayCard = ({ facilityId }: FacilityOverlayCardProps) => {
  const { data: facility, isLoading, error } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => {
      console.log('Fetching facility data for ID:', facilityId);
      
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching facility:', error);
        toast.error("Failed to load facility details");
        throw error;
      }

      if (!data) {
        console.error('No facility found for ID:', facilityId);
        toast.error("Facility not found");
        return null;
      }
      
      console.log('Fetched facility data:', data);
      return data;
    },
  });

  if (error) {
    console.error('Error in query:', error);
    return (
      <div className="w-full flex items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className="text-red-500">Error loading facility. Please try again.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-foreground">Loading facility details...</div>
        </div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="w-full flex items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className="text-foreground">No facility found</div>
      </div>
    );
  }

  return <Card {...facility} />;
};

export default FacilityOverlayCard;
