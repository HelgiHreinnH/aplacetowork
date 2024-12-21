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
      
      return data as Facility[];
    }
  });

  const handleSearch = () => {
    const searchParamsString = sessionStorage.getItem('searchParams');
    if (!searchParamsString) return;

    const { squareMeters, users, taskValue } = JSON.parse(searchParamsString);
    
    if (!facilities) return;

    const facilitiesWithScores = facilities.map(facility => ({
      facility,
      score: calculateFacilityScore(facility, squareMeters, users, taskValue)
    }));
    
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .map(item => item.facility);
    
    const topResults = sortedFacilities.slice(0, 4);
    
    if (topResults.length === 0) {
      return;
    }

    sessionStorage.setItem('searchResults', JSON.stringify(topResults));
    sessionStorage.setItem('isExactMatch', JSON.stringify(false));
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
