import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

type Facility = Database['public']['Tables']['Facilities']['Row'];

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<Facility[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const results = sessionStorage.getItem('searchResults');
    if (!results) {
      toast.error("No search results found");
      navigate('/');
      return;
    }

    try {
      const parsedResults = JSON.parse(results);
      setSearchResults(parsedResults);
    } catch (error) {
      toast.error("Error loading search results");
      navigate('/');
    }
  }, [navigate]);

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Search Results</h2>
          <p className="mt-4 text-lg text-gray-600">
            Found {searchResults.length} matching facilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((facility) => (
            <div key={facility.Facility} className="h-[600px]">
              <Card {...facility} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;