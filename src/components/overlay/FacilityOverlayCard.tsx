
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
      if (!facilityId) return null;
      
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle();
      
      if (error) {
        toast.error("Failed to load facility details");
        throw error;
      }
      
      return data;
    },
  });

  if (!facility && !isLoading) {
    return null;
  }

  return facility ? <Card {...facility} /> : null;
};

export default FacilityOverlayCard;
