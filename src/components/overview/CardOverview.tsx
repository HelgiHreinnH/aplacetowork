import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
}

const fetchFacilities = async () => {
  const { data, error } = await supabase
    .from('Facilities')
    .select('*');
  
  if (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
  
  console.log('Fetched facilities:', data);
  return data;
};

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();

  const { data: supabaseFacilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  });

  if (isLoading) {
    return <div>Loading facilities...</div>;
  }

  if (error) {
    return <div>Error loading facilities</div>;
  }

  const displayFacilities = supabaseFacilities || facilities;

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Workplace Facilities</h1>
        <p className="text-sm text-gray-600 mb-4">Explore our diverse range of workspace settings</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayFacilities.map((facility, index) => (
          <Card 
            key={facility.facility_id} 
            className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <CardHeader className="flex-none">
              <h2 className="text-xl font-semibold line-clamp-1">
                {facility.display_title || facility.Facility}
              </h2>
              {facility.Subtitle && (
                <p className="text-sm text-gray-500 line-clamp-1">{facility.Subtitle}</p>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {facility.Description}
              </p>
              <div className="mt-auto">
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/design/card-front`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardOverview;