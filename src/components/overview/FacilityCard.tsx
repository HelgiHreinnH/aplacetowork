import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';
import FacilityDetail from './FacilityDetail';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface FacilityCardProps {
  facility: Facility;
  isSelected: boolean;
  onSelect: (facilityId: string, event: React.MouseEvent) => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility, 
  isSelected,
  onSelect 
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={() => navigate(`/design/card-front`)}
    >
      <div className="flex">
        <div 
          className="absolute right-4 top-4 cursor-pointer"
          onClick={(e) => onSelect(facility.facility_id, e)}
        >
          {isSelected ? (
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
            <FacilityDetail 
              label="Amount of m2" 
              value={facility['Approx. Square Meters']} 
            />
            <FacilityDetail 
              label="Amount of employees" 
              value={facility['Approx. Users']} 
            />
            <FacilityDetail 
              label="Collab or concentrated" 
              value={facility['Task Category']} 
            />
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
  );
};

export default FacilityCard;