
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";
import SearchHeader from '@/components/search/SearchHeader';
import FacilityCard from '@/components/overview/FacilityCard';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const SearchResults = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchResults, setSearchResults] = useState<Facility[]>([]);
  const [isExactMatch, setIsExactMatch] = useState(true);
  
  // Fetch favorites to show correct selection state
  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_favorites')
        .select('facility_id');
      
      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }
      
      return data.map(fav => fav.facility_id);
    },
  });

  useEffect(() => {
    const results = sessionStorage.getItem('searchResults');
    const exactMatch = sessionStorage.getItem('isExactMatch');
    
    if (!results) {
      toast.error("No search results found");
      return;
    }

    try {
      const parsedResults = JSON.parse(results);
      setSearchResults(parsedResults);
      setIsExactMatch(exactMatch ? JSON.parse(exactMatch) : true);
    } catch (error) {
      toast.error("Error loading search results");
    }
  }, []);

  const handleSelect = async (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      const isFavorite = favorites?.includes(facilityId);
      
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;
        
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
    navigate(`/card-overlay/${facilityId}`);
  };

  if (searchResults.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground">Loading results...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 pb-24 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <SearchHeader 
          resultsCount={searchResults.length}
          isExactMatch={isExactMatch}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((facility) => (
            <FacilityCard
              key={facility.facility_id}
              facility={facility}
              isSelected={favorites?.includes(facility.facility_id) || false}
              onSelect={handleSelect}
              onClick={() => handleCardClick(facility.facility_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
