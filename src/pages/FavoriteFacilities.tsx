
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import FacilityCard from '@/components/overview/FacilityCard';

const FavoriteFacilities = () => {
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(new Set());
  
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });
  
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites', session?.user?.id],
    enabled: !!session?.user?.id,
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
  
  const { data: facilities, isLoading: isLoadingFacilities } = useQuery({
    queryKey: ['favorited_facilities', favorites],
    enabled: !!favorites && favorites.length > 0,
    queryFn: async () => {
      if (!favorites || favorites.length === 0) return [];
      
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .in('facility_id', favorites);
      
      if (error) {
        toast.error("Failed to load facility details");
        throw error;
      }
      
      return data;
    },
  });

  const handleSelect = async (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!session?.user?.id) {
      toast.error("Please log in to manage favorites");
      return;
    }
    
    try {
      if (selectedFacilities.has(facilityId)) {
        // Remove from favorites
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;

        setSelectedFacilities(prev => {
          const newSet = new Set(prev);
          newSet.delete(facilityId);
          return newSet;
        });
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;

        setSelectedFacilities(prev => {
          const newSet = new Set(prev);
          newSet.add(facilityId);
          return newSet;
        });
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  if (isLoadingFavorites || isLoadingFacilities) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!facilities || facilities.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-8">My Favorites</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">You don't have any favorite facilities yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Browse the catalog and click on the heart icon to add facilities to your favorites.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.facility_id}
            facility={facility}
            isSelected={favorites?.includes(facility.facility_id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteFacilities;
