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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((facility) => (
          <Card 
            key={facility.facility_id} 
            className="flex flex-col h-full transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
              <img
                src={`https://source.unsplash.com/random/800x600?workspace`}
                alt={facility.Facility}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <CardHeader className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                {facility.Facility}
              </h3>
              {facility.Subtitle && (
                <p className="text-sm text-gray-600 line-clamp-1">
                  {facility.Subtitle}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-700 line-clamp-2">
                {facility.Description || 'No description available'}
              </p>
              <Button 
                className="w-full mt-auto"
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