import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardOverviewProps {
  facilities: Facility[];
}

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Workplace Facilities Overview</h2>
        <p className="text-sm text-gray-500">A comprehensive look at our workspace settings</p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilities.map((facility) => (
            <div 
              key={facility.facility_id} 
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {facility.Facility}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {facility.Description || 'No description available'}
              </p>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Category: {facility['Task Category'] || 'Unspecified'}</span>
                <span>Users: {facility['Approx. Users'] || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOverview;