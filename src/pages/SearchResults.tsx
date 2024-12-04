import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import Card from '@/components/Card';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type Facility = Database['public']['Tables']['Facilities']['Row'];

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<Facility[]>([]);
  const [isExactMatch, setIsExactMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const results = sessionStorage.getItem('searchResults');
    const exactMatch = sessionStorage.getItem('isExactMatch');
    
    if (!results) {
      toast.error("No search results found");
      navigate('/');
      return;
    }

    try {
      const parsedResults = JSON.parse(results);
      setSearchResults(parsedResults);
      setIsExactMatch(exactMatch ? JSON.parse(exactMatch) : true);
    } catch (error) {
      toast.error("Error loading search results");
      navigate('/');
    }
  }, [navigate]);

  const handleCardClick = (facility: Facility) => {
    navigate('/design/card', { state: facility });
  };

  const handleBack = () => {
    navigate('/');
  };

  if (searchResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loading results...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Search Results</h2>
          {!isExactMatch && (
            <p className="mt-4 text-lg text-gray-600">
              There is no exact match to your desired scenario, but here are our closest results
            </p>
          )}
          <p className="mt-2 text-lg text-gray-600">
            Found {searchResults.length} {isExactMatch ? 'matching' : 'relevant'} facilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((facility) => (
            <div 
              key={facility.Facility} 
              className="h-[600px] cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              onClick={() => handleCardClick(facility)}
            >
              <Card {...facility} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;