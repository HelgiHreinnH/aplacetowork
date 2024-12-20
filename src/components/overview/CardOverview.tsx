import React, { useEffect } from 'react';
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

const fetchFavorites = async () => {
  const { data, error } = await supabase
    .from('facility_favorites')
    .select('facility_id');
  
  if (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
  
  return data.map(fav => fav.facility_id);
};

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();
  const [selectedFacilities, setSelectedFacilities] = React.useState<string[]>([]);

  const { data: supabaseFacilities, isLoading: isLoadingFacilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  });

  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  useEffect(() => {
    if (favorites) {
      setSelectedFacilities(favorites);
    }
  }, [favorites]);

  const handleFacilitySelect = async (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      if (selectedFacilities.includes(facilityId)) {
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;

        setSelectedFacilities(prev => prev.filter(id => id !== facilityId));
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;

        setSelectedFacilities(prev => [...prev, facilityId]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  if (isLoadingFacilities || isLoadingFavorites) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const displayFacilities = supabaseFacilities || facilities;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="text-3xl font-bold mb-2">logo</div>
        <p className="text-gray-500 uppercase text-sm tracking-wide">SUB LINE</p>
      </div>
      
      <div className="space-y-4">
        {displayFacilities.map((facility) => (
          <FacilityCard
            key={facility.facility_id}
            facility={facility}
            isSelected={selectedFacilities.includes(facility.facility_id)}
            onSelect={handleFacilitySelect}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors uppercase"
      >
        Back
      </button>
    </div>
  );
};

export default CardOverview;