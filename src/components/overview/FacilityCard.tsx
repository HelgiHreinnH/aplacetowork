import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
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
    <div 
      className="bg-white rounded-[32px] shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate(`/design/card-front`)}
    >
      <div className="relative">
        {/* Header with favorite button */}
        <div className="flex justify-between items-start p-6">
          <div>
            <h3 className="text-[22px] font-bold text-foreground line-clamp-2 mb-2">
              {facility.display_title || facility.Facility}
            </h3>
            {facility.Subtitle && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {facility.Subtitle}
              </p>
            )}
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
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={facility['Facility Image URL'] || '/placeholder-facility.jpg'}
            alt={facility.display_title || facility.Facility}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-facility.jpg';
            }}
          />
        </div>

        {/* Specifications */}
        <div className="p-6 space-y-4">
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

          {/* Description */}
          {facility.Description && (
            <p className="text-[15px] text-gray-600 leading-relaxed mt-4">
              {facility.Description}
            </p>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
          className="w-full bg-[#0EA5E9] text-white py-4 px-6 rounded-b-[32px] font-medium hover:bg-[#0284C7] transition-colors uppercase text-center"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;