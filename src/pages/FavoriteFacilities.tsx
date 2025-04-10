
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import FacilityCard from '@/components/overview/FacilityCard';
import TitleContainer from '@/components/containers/TitleContainer';

const FavoriteFacilities = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Fetch favorite IDs
  const { data: favoriteIds, isLoading: isLoadingFavoriteIds } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_favorites')
        .select('facility_id');
      
      if (error) {
        toast.error("Failed to load favorites");
        throw error;
      }
      
      return data.map(item => item.facility_id);
    },
  });
  
  // Fetch facilities that are in favorites
  const { data: facilities, isLoading: isLoadingFacilities } = useQuery({
    queryKey: ['favorited_facilities', favoriteIds],
    enabled: !!favoriteIds && favoriteIds.length > 0,
    queryFn: async () => {
      if (!favoriteIds || favoriteIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .in('facility_id', favoriteIds);
      
      if (error) {
        toast.error("Failed to load facility details");
        throw error;
      }
      
      return data;
    },
  });

  const handleSelect = async (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      // We're in favorites page, so clicking will always remove from favorites
      const { error } = await supabase
        .from('facility_favorites')
        .delete()
        .eq('facility_id', facilityId);

      if (error) throw error;
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
      
      toast.success("Removed from favorites");
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  const handleCardClick = (facilityId: string) => {
    navigate(`/card-overlay/${facilityId}`);
  };

  if (isLoadingFavoriteIds || isLoadingFacilities) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!facilities || facilities.length === 0) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8 max-w-md text-center">
            <h1 className="text-2xl font-bold mb-8">My Favorites</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600">You don't have any favorite facilities yet.</p>
              <p className="mt-2 text-sm text-gray-500">
                Browse the catalog and click on the heart icon to add facilities to your favorites.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 pb-24">
          <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.facility_id}
                facility={facility}
                isSelected={true} // Always true in favorites page
                onSelect={handleSelect}
                onClick={() => handleCardClick(facility.facility_id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default FavoriteFacilities;
