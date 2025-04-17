import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import TitleContainer from '@/components/containers/TitleContainer';
import InfoContainer from '@/components/containers/InfoContainer';
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
    const searchParamsString = sessionStorage.getItem('searchParams');
    if (!searchParamsString) {
      console.log('No search parameters found');
      toast.error("Please adjust the sliders before searching");
      return;
    }

    const searchParams = JSON.parse(searchParamsString);
    console.log('Using search parameters:', searchParams);

    if (!facilities || facilities.length === 0) {
      console.log('No facilities available');
      toast.error("No facilities available");
      return;
    }

    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => {
      // If users slider is at maximum (16), include all facilities with Users Min >= 16
      if (searchParams.users === 16 && facility["Users Min"] && facility["Users Min"] >= 16) {
        return { facility, score: 100 }; // Give maximum score to match the criteria
      }
      
      const score = calculateFacilityScore(
        facility, 
        searchParams.squareMeters, 
        searchParams.users, 
        searchParams.taskValue
      );
      console.log(`Score for ${facility.Facility}:`, score);
      return { facility, score };
    });
    
    console.log('All facilities with scores:', facilitiesWithScores);
    
    // Sort by score and take top 6
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.facility);
    
    console.log('Final sorted facilities:', sortedFacilities);

    if (sortedFacilities.length === 0) {
      toast.error("No matching facilities found");
      return;
    }
    
    // Store results and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(sortedFacilities));
    sessionStorage.setItem('isExactMatch', JSON.stringify(true));
    navigate('/search-results');
  };

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <InfoContainer 
        isLoading={isLoading}
        error={error}
        facilities={facilities}
        onSearch={handleSearch}
      />
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default Index;
