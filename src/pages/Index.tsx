import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import TitleContainer from '@/components/containers/TitleContainer';
import SlidersContainer from '@/components/containers/SlidersContainer';
import { calculateFacilityScore } from '../utils/facilityScoring';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const Index = () => {
  const navigate = useNavigate();
  
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*');
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      console.log('Fetched facilities:', data);
      return data as Facility[];
    }
  });

  const handleSearch = () => {
    // Get search parameters from session storage
    const searchParamsString = sessionStorage.getItem('searchParams');
    if (!searchParamsString) {
      console.log('No search parameters found');
      toast.error("Please adjust the sliders before searching");
      return;
    }

    const searchParams = JSON.parse(searchParamsString);
    console.log('Search parameters:', searchParams);

    if (!facilities || facilities.length === 0) {
      console.log('No facilities available');
      toast.error("No facilities available");
      return;
    }

    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => ({
      facility,
      score: calculateFacilityScore(facility, searchParams.squareMeters, searchParams.users, searchParams.taskValue)
    }));
    
    console.log('Facilities with scores:', facilitiesWithScores);
    
    // Sort by score and take top 6
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.facility);
    
    console.log('Top sorted facilities:', sortedFacilities);

    if (sortedFacilities.length === 0) {
      toast.error("No matching facilities found");
      return;
    }
    
    // Store results and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(sortedFacilities));
    navigate('/search-results');
  };

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <SlidersContainer 
        isLoading={isLoading}
        error={error}
        facilities={facilities}
        onSearch={handleSearch}
      />
      {/* Bottom Container - Navigation */}
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default Index;