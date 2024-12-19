import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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
        <button
          onClick={handleBack}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Search
        </button>
        
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((facility, index) => (
            <Card 
              key={facility.facility_id} 
              className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(facility)}
            >
              <CardHeader className="pb-3 space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {facility.display_title || facility.Facility}
                </h3>
                {facility.Subtitle && (
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {facility.Subtitle}
                  </p>
                )}
              </CardHeader>
              
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={getImageUrl(index)}
                  alt={facility.display_title || facility.Facility}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardContent className="flex flex-col gap-3 pt-4">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {facility.Description || 'No description available'}
                </p>
                <div className="mt-auto pt-2">
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;