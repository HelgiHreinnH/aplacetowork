
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface FacilityCardProps {
  facility: Facility;
  isSelected: boolean;
  onSelect: (facilityId: string, event: React.MouseEvent) => void;
  onClick?: (facilityId: string) => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility, 
  isSelected,
  onSelect,
  onClick
}) => {
  const navigate = useNavigate();
  const defaultImageUrl = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  const fixedImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(facility.facility_id);
    } else {
      navigate(`/card-overlay/${facility.facility_id}`);
    }
  };

  return (
    <Card 
      className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer rounded-[32px] border-0 transform scale-80 origin-center"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => onSelect(facility.facility_id, e)}
            className="p-1 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          >
            {isSelected ? (
              <CircleCheck className="h-6 w-6 text-[var(--alert-color)]" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300 hover:text-[#FEC6A1]" />
            )}
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-t-[32px]">
          <img
            src={fixedImageUrl}
            alt={facility.display_title || facility.Facility}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-gray-50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.log("Image error, falling back to default:", target.src);
              target.src = defaultImageUrl;
            }}
          />
        </div>

        <div className="flex flex-col flex-grow p-6">
          <h3 className="font-playfair text-[22px] font-bold text-foreground line-clamp-2 mb-2">
            {facility.display_title || facility.Facility}
          </h3>
          <p className="font-inter text-sm text-muted-foreground line-clamp-1 mb-2">
            Inspiration for the ideal Workspace
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-muted-foreground">Amount of m²</span>
              <span className="text-[15px] font-medium text-[var(--alert-color)]">
                {facility['Approx. Square Meters']}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-muted-foreground">Amount of employees</span>
              <span className="text-[15px] font-medium text-foreground">
                {facility['Approx. Users']}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-muted-foreground">Collab or concentrated</span>
              <span className="text-[15px] font-medium text-[var(--alert-color)]">
                {facility['Task Category']}
              </span>
            </div>
          </div>

          {facility.Description && (
            <p className="font-inter text-[15px] text-muted-foreground line-clamp-2 mb-4">
              {facility.Description}
            </p>
          )}

          <div className="mt-auto">
            <Button 
              className="w-full rounded-xl py-2 text-xs"
              variant="main"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/card-overlay/${facility.facility_id}`);
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FacilityCard;
