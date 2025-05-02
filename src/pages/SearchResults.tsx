
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";
import SearchHeader from '@/components/search/SearchHeader';
import FacilityCard from '@/components/overview/FacilityCard';
import TitleContainer from '@/components/containers/TitleContainer';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [searchResults, setSearchResults] = useState<Facility[]>([]);
  const [isExactMatch, setIsExactMatch] = useState(true);
  
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
      console.log("Loaded search results:", parsedResults);
      setSearchResults(parsedResults);
      setIsExactMatch(exactMatch ? JSON.parse(exactMatch) : true);
    } catch (error) {
      console.error("Error parsing search results:", error);
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
        
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
        
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;
        
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
    console.log("Navigating to facility:", facilityId, "with background location:", location);
    // Pre-fetch the facility data to improve load time in the overlay
    queryClient.prefetchQuery({
      queryKey: ['facility', facilityId],
      queryFn: async () => {
        const { data } = await supabase
          .from('Facilities')
          .select('*')
          .eq('facility_id', facilityId)
          .maybeSingle();
        return data;
      }
    });
    
    // Navigate to the card overlay with the background location preserved
    navigate(`/card-overlay/${facilityId}`, { 
      state: { backgroundLocation: location }
    });
  };

  if (searchResults.length === 0) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="max-w-7xl mx-auto text-center mt-8">
          <h2 className="text-xl font-semibold text-foreground">Loading results...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 pb-32">
          <SearchHeader 
            resultsCount={searchResults.length}
            isExactMatch={isExactMatch}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {searchResults.map((facility) => (
              <div key={facility.facility_id} className="flex justify-center transform scale-90">
                <FacilityCard
                  facility={facility}
                  isSelected={favorites?.includes(facility.facility_id) || false}
                  onSelect={handleSelect}
                  onClick={handleCardClick}
                />
              </div>
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

export default SearchResults;
