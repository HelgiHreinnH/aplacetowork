import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Database } from '@/integrations/supabase/types';

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
  
  return data;
};

const CardOverview: React.FC<CardOverviewProps> = ({ facilities }) => {
  const navigate = useNavigate();

  const { data: supabaseFacilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading facilities
      </div>
    );
  }

  const displayFacilities = supabaseFacilities || facilities;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Workplace Settings</h1>
        <p className="text-gray-500 mt-2">SUB LINE</p>
      </div>
      
      <div className="space-y-4">
        {displayFacilities.map((facility) => (
          <div
            key={facility.facility_id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/design/card-front`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {facility.display_title || facility.Facility}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {facility.Subtitle}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-orange-400" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Amount of m2</div>
                <div className="text-sm font-medium text-orange-500">
                  {facility['Approx. Square Meters']}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Amount of employees</div>
                <div className="text-sm font-medium text-orange-500">
                  {facility['Approx. Users']}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Collab or concentrated</div>
                <div className="text-sm font-medium text-orange-500">
                  {facility['Task Category']}
                </div>
              </div>
            </div>

            {facility['Facility Image URL'] && (
              <div className="mt-6">
                <img
                  src={facility['Facility Image URL']}
                  alt={facility.Facility}
                  className="w-32 h-32 object-contain ml-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        BACK
      </button>
    </div>
  );
};

export default CardOverview;