
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';

interface FacilityOverlayCardProps {
  facilityId: string;
}

const FacilityOverlayCard = ({ facilityId }: FacilityOverlayCardProps) => {
  const { data: facility, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-foreground">Loading facility details...</div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-foreground">No facility found</div>
      </div>
    );
  }

  return <Card {...facility} />;
};

export default FacilityOverlayCard;
