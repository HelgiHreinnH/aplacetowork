import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
}

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workplace Facilities</h1>
        <p className="text-lg text-gray-600">Explore our diverse range of workspace settings</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((facility) => (
          <Card 
            key={facility.facility_id} 
            className="flex flex-col h-full transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {facility.display_title || facility.Facility}
              </h3>
              {facility.Subtitle && (
                <p className="text-sm text-gray-600 line-clamp-1">
                  {facility.Subtitle}
                </p>
              )}
            </CardHeader>
            
            <div className="relative aspect-[3/2] w-full">
              <img
                src={`https://source.unsplash.com/random/800x600?workspace`}
                alt={facility.display_title || facility.Facility}
                className="object-cover w-full h-full"
              />
            </div>
            
            <CardContent className="flex flex-col gap-3 pt-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {facility.Description || 'No description available'}
              </p>
              <Button 
                className="w-full mt-auto text-sm"
                variant="outline"
                onClick={() => navigate('/design/card-front')}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardOverview;