import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const getImageUrl = (index: number) => {
  const imageUrls = [
    'photo-1488590528505-98d2b5aba04b',
    'photo-1649972904349-6e44c42644a7',
    'photo-1518770660439-4636190af475',
    'photo-1461749280684-dccba630e2f6',
    'photo-1486312338219-ce68d2c6f44d'
  ];
  return `https://images.unsplash.com/${imageUrls[index % imageUrls.length]}`;
};

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
    console.log('Navigating with facility:', facility);
    sessionStorage.setItem('selectedFacility', JSON.stringify(facility));
    navigate('/design/interactive', { state: facility });
  };

  const handleBack = () => {
    navigate('/');
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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-8 flex items-center text-[#F97316] hover:text-[#EA580C] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>
        
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold text-foreground mb-4">Search Results</h2>
          {!isExactMatch && (
            <p className="text-lg text-muted-foreground">
              There is no exact match to your desired scenario, but here are our closest results
            </p>
          )}
          <p className="mt-2 text-lg text-[#F97316]">
            Found {searchResults.length} {isExactMatch ? 'matching' : 'relevant'} facilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((facility, index) => (
            <Card 
              key={facility.facility_id} 
              className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer rounded-[32px] border-0"
              onClick={() => handleCardClick(facility)}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-t-[32px]">
                <img
                  src={facility['Facility Image URL'] || getImageUrl(index)}
                  alt={facility.display_title || facility.Facility}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-[22px] font-bold text-foreground line-clamp-2 mb-2">
                  {facility.display_title || facility.Facility}
                </h3>
                {facility.Subtitle && (
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                    {facility.Subtitle}
                  </p>
                )}
                <p className="text-[15px] text-muted-foreground line-clamp-2 mb-4">
                  {facility.Description || 'No description available'}
                </p>
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-full py-2 text-xs"
                    variant="default"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;