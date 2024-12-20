import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Circle, CircleCheck } from "lucide-react";
import { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

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
  const [selectedFacility, setSelectedFacility] = React.useState<string | null>(null);

  const { data: supabaseFacilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  });

  const handleFacilitySelect = (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedFacility(facilityId);
    toast.success("Facility selected");
  };

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
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-bold">Workplace Settings</h1>
        <p className="text-gray-500 mt-2">SUB LINE</p>
      </div>
      
      <div className="space-y-4">
        {displayFacilities.map((facility) => (
          <div
            key={facility.facility_id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
            onClick={() => navigate(`/design/card-front`)}
          >
            <div className="flex">
              <div 
                className="absolute right-4 top-4 cursor-pointer"
                onClick={(e) => handleFacilitySelect(facility.facility_id, e)}
              >
                {selectedFacility === facility.facility_id ? (
                  <CircleCheck className="h-6 w-6 text-blue-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400 hover:text-blue-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-left">
                    {facility.display_title || facility.Facility}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 text-left">
                    {facility.Subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
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
              </div>

              {facility['Facility Image URL'] && (
                <div className="ml-6 flex items-center justify-center w-32">
                  <img
                    src={facility['Facility Image URL']}
                    alt={facility.Facility}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
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