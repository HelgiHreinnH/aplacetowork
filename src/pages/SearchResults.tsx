import React, { useEffect, useState } from 'react';
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";
import SearchHeader from '@/components/search/SearchHeader';
import FacilityCard from '@/components/overview/FacilityCard';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<Facility[]>([]);
  const [isExactMatch, setIsExactMatch] = useState(true);
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(new Set());

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

  const handleSelect = (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedFacilities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(facilityId)) {
        newSet.delete(facilityId);
      } else {
        newSet.add(facilityId);
      }
      return newSet;
    });
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
              isSelected={selectedFacilities.has(facility.facility_id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;