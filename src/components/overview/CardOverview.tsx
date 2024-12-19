import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
}

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

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();
  const [functionFilter, setFunctionFilter] = useState<string>('all');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<string>('all');

  const facilityFunctions = useMemo(() => {
    const functions = new Set<string>();
    facilities.forEach(facility => {
      if (facility['Task Category']) {
        functions.add(facility['Task Category']);
      }
    });
    return Array.from(functions);
  }, [facilities]);

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const matchesFunction = functionFilter === 'all' || facility['Task Category'] === functionFilter;
      const matchesSpaceType = spaceTypeFilter === 'all' || 
        (spaceTypeFilter === 'open' ? facility.Description?.toLowerCase().includes('open') : 
         spaceTypeFilter === 'closed' ? !facility.Description?.toLowerCase().includes('open') : true);
      return matchesFunction && matchesSpaceType;
    });
  }, [facilities, functionFilter, spaceTypeFilter]);

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Workplace Facilities</h1>
        <p className="text-sm text-gray-600 mb-4">Explore our diverse range of workspace settings</p>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Select value={functionFilter} onValueChange={setFunctionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Facility Function" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Functions</SelectItem>
              {facilityFunctions.map((func) => (
                <SelectItem key={func} value={func}>
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={spaceTypeFilter} onValueChange={setSpaceTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Space Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Spaces</SelectItem>
              <SelectItem value="open">Open Space</SelectItem>
              <SelectItem value="closed">Closed Space</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredFacilities.map((facility, index) => (
          <Card 
            key={facility.facility_id} 
            className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <CardHeader className="pb-2 space-y-1">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                {facility.display_title || facility.Facility}
              </h3>
              {facility.Subtitle && (
                <p className="text-xs text-gray-600 line-clamp-1">
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
            
            <CardContent className="flex flex-col gap-2 pt-2">
              <p className="text-xs text-gray-700 line-clamp-2">
                {facility.Description || 'No description available'}
              </p>
              <div className="mt-auto pt-2">
                <Button 
                  className="w-full text-sm py-1"
                  variant="outline"
                  onClick={() => navigate('/design/card-front')}
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