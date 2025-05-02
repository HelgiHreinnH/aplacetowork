
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Database } from '@/integrations/supabase/types';
import { useDesignSystem } from '@/hooks/use-design-system';

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
      className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer rounded-lg border bg-card"
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
              <Circle className="h-6 w-6 text-gray-300 hover:text-[var(--alert-color)]" />
            )}
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={fixedImageUrl}
            alt={facility.display_title || facility.Facility}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-neutral-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.log("Image error, falling back to default:", target.src);
              target.src = defaultImageUrl;
            }}
          />
        </div>

        <CardContent className="flex flex-col flex-grow p-6">
          <CardHeader className="p-0 mb-2 space-y-1">
            <CardTitle className="font-display text-[22px] font-bold text-foreground line-clamp-2">
              {facility.display_title || facility.Facility}
            </CardTitle>
            <CardDescription className="font-sans text-sm text-muted-foreground line-clamp-1">
              Inspiration for the ideal Workspace
            </CardDescription>
          </CardHeader>
          
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
            <p className="font-sans text-[15px] text-muted-foreground line-clamp-2 mb-4">
              {facility.Description}
            </p>
          )}

          <CardFooter className="mt-auto p-0">
            <Button 
              className="w-full rounded-md py-2 text-xs"
              variant="main"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/card-overlay/${facility.facility_id}`);
              }}
            >
              View Details
            </Button>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};

export default FacilityCard;
