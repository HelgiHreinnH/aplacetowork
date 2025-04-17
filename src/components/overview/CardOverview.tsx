
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';
import LoadingSpinner from './LoadingSpinner';
import FacilitiesList from './FacilitiesList';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
  currentLocation?: Location;
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

const CardOverview: React.FC<CardOverviewProps> = ({ 
  facilities,
  currentLocation
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
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
        // Remove from favorites
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;

        // Update local state
        setSelectedFacilities(prev => prev.filter(id => id !== facilityId));
        
        // Invalidate queries to refresh data across components
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
        
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;

        // Update local state
        setSelectedFacilities(prev => [...prev, facilityId]);
        
        // Invalidate queries to refresh data across components
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
        
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  const handleCardClick = (facilityId: string) => {
    navigate(`/card-overlay/${facilityId}`, { 
      state: { backgroundLocation: currentLocation || location }
    });
  };

  if (isLoadingFacilities || isLoadingFavorites) {
    return <LoadingSpinner />;
  }

  const displayFacilities = supabaseFacilities || facilities;

  return (
    <div className="mx-auto px-4 py-8">
      <FacilitiesList 
        facilities={displayFacilities}
        selectedFacilities={selectedFacilities}
        onFacilitySelect={handleFacilitySelect}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default CardOverview;
