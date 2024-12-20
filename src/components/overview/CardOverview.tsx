import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';
import FacilityCard from './FacilityCard';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
}

const fetchFacilities = async () => {
  const { data, error } = await supabase
    .from('Facilities')
    .select('*');
  
  if (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
  
  return data;
};

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = React.useState<string | null>(null);

  const { data: supabaseFacilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  });

  const handleFacilitySelect = (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedFacility(facilityId);
    toast.success("Facility selected");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading facilities
      </div>
    );
  }

  const displayFacilities = supabaseFacilities || facilities;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-bold">Workplace Settings</h1>
        <p className="text-gray-500 mt-2">SUB LINE</p>
      </div>
      
      <div className="space-y-4">
        {displayFacilities.map((facility) => (
          <FacilityCard
            key={facility.facility_id}
            facility={facility}
            isSelected={selectedFacility === facility.facility_id}
            onSelect={handleFacilitySelect}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        BACK
      </button>
    </div>
  );
};

export default CardOverview;