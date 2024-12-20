import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={() => navigate(`/design/card-front`)}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-left">
              {facility.display_title || facility.Facility}
            </h2>
            <p className="text-sm text-gray-600 mt-1 text-left">
              {facility.Subtitle}
            </p>
          </div>
          <button
            onClick={(e) => onSelect(facility.facility_id, e)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isSelected ? (
              <CircleCheck className="h-6 w-6 text-orange-400" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300 hover:text-orange-300" />
            )}
          </button>
        </div>

        {facility['Facility Image URL'] && (
          <div className="mb-6">
            <img
              src={facility['Facility Image URL']}
              alt={facility.Facility}
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        )}

        <div className="space-y-3 text-left">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount of m²</span>
            <span className="text-sm font-medium text-orange-400">
              {facility['Approx. Square Meters']}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount of employees</span>
            <span className="text-sm font-medium text-gray-900">
              {facility['Approx. Users']}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Collab or concentrated</span>
            <span className="text-sm font-medium text-orange-400">
              {facility['Task Category']}
            </span>
          </div>
        </div>

        {facility.Description && (
          <div className="mt-6 text-sm text-gray-600 text-left">
            {facility.Description}
          </div>
        )}

        {facility.Notes && (
          <div className="mt-4 text-sm text-gray-500 text-left">
            {facility.Notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityCard;