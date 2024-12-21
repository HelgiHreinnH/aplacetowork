import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import SliderForm from '../components/SliderForm';
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';
import Header from '@/components/overview/Header';
import { useNavigate } from 'react-router-dom';
import { calculateFacilityScore, ValueToTaskCategory } from '../utils/facilityScoring';

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

    // Calculate scores for all facilities
    const facilitiesWithScores = facilities.map(facility => ({
      facility,
      score: calculateFacilityScore(facility, squareMeters, users, taskValue)
    }));
    
    // Sort by score (highest first)
    const sortedFacilities = facilitiesWithScores
      .sort((a, b) => b.score - a.score)
      .map(item => item.facility);
    
    // Take top 4 results
    const topResults = sortedFacilities.slice(0, 4);
    
    if (topResults.length === 0) {
      return; // Don't navigate if no results
    }

    // Store whether this is an exact match or approximate results
    const exactMatch = topResults.some(facility => {
      const meetsSquareMeters = facility["Sq M Min"] !== null && 
                               facility["Sq M Max"] !== null && 
                               squareMeters >= facility["Sq M Min"] && 
                               squareMeters <= facility["Sq M Max"];
      
      const meetsUsers = facility["Users Min"] !== null && 
                        facility["Users Max"] !== null && 
                        users >= facility["Users Min"] && 
                        users <= facility["Users Max"];
      
      const meetsTaskCategory = facility["Task Category"] === ValueToTaskCategory[taskValue];
      
      return meetsSquareMeters && meetsUsers && meetsTaskCategory;
    });

    // Store results in sessionStorage and navigate
    sessionStorage.setItem('searchResults', JSON.stringify(topResults));
    sessionStorage.setItem('isExactMatch', JSON.stringify(exactMatch));
    navigate('/search-results');
  };

  const LoadingState = () => (
    <div className="w-full animate-pulse space-y-2">
      <div className="h-6 bg-muted rounded" />
      <div className="h-24 bg-muted rounded" />
    </div>
  );

  const ErrorState = () => (
    <div className="text-center">
      <p className="text-destructive">Unable to load facilities</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm text-muted-foreground hover:text-primary"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Container - Title and Subtitle */}
      <div className="flex-none p-8 bg-white">
        <Header />
      </div>

      {/* Middle Container - Sliders */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          facilities && <SliderForm facilities={facilities} onSearch={handleSearch} />
        )}
      </div>

      {/* Bottom Container is handled by the layout */}
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default Index;