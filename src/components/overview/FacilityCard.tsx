import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';

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
    <div className="bg-white rounded-[32px] shadow-sm hover:shadow-md transition-shadow relative">
      <div 
        className="p-6 pb-20 cursor-pointer"
        onClick={() => navigate(`/design/card-front`)}
      >
        {/* Header with favorite button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-[22px] font-bold text-black leading-tight">
              {facility.display_title || facility.Facility}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {facility.Subtitle}
            </p>
          </div>
          <button
            onClick={(e) => onSelect(facility.facility_id, e)}
            className="p-1 rounded-full hover:bg-gray-50 transition-colors"
          >
            {isSelected ? (
              <CircleCheck className="h-6 w-6 text-[#F97316]" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300 hover:text-[#FEC6A1]" />
            )}
          </button>
        </div>

        {/* Facility Image */}
        {facility['Facility Image URL'] && (
          <div className="mb-8">
            <img
              src={facility['Facility Image URL']}
              alt={facility.Facility}
              className="w-full h-48 object-contain"
            />
          </div>
        )}

        {/* Specifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of m²</span>
            <span className="text-[15px] font-medium text-[#F97316]">
              {facility['Approx. Square Meters']}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of employees</span>
            <span className="text-[15px] font-medium text-black">
              {facility['Approx. Users']}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Collab or concentrated</span>
            <span className="text-[15px] font-medium text-[#F97316]">
              {facility['Task Category']}
            </span>
          </div>
        </div>

        {/* Description */}
        {facility.Description && (
          <div className="mt-6 text-[15px] text-gray-600 leading-relaxed">
            {facility.Description}
          </div>
        )}

        {/* Notes */}
        {facility.Notes && (
          <div className="mt-4 text-sm text-gray-500">
            {facility.Notes}
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute bottom-0 left-0 right-0 bg-[#0EA5E9] text-white py-4 px-6 rounded-b-[32px] font-medium hover:bg-[#0284C7] transition-colors uppercase text-center w-full"
      >
        Back
      </button>
    </div>
  );
};

export default FacilityCard;