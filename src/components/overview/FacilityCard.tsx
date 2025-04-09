
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
  const defaultImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";

  return (
    <Card 
      className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer rounded-[32px] border-0 transform scale-80 origin-center"
      onClick={() => navigate(`/design/interactive`)}
    >
      <div className="relative">
        {/* Header with favorite button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => onSelect(facility.facility_id, e)}
            className="p-1 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          >
            {isSelected ? (
              <CircleCheck className="h-6 w-6 text-[#F97316]" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300 hover:text-[#FEC6A1]" />
            )}
          </button>
        </div>

        {/* Facility Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-[32px]">
          <img
            src={defaultImageUrl}
            alt={facility.display_title || facility.Facility}
            className="object-contain w-full h-full transition-transform duration-300 hover:scale-105 bg-gray-50"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-[22px] font-bold text-foreground line-clamp-2 mb-2">
            {facility.display_title || facility.Facility}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            Inspiration for the ideal Workspace
          </p>
          
          {/* Specifications */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[15px] text-muted-foreground">Amount of m²</span>
              <span className="text-[15px] font-medium text-[#F97316]">
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
              <span className="text-[15px] font-medium text-[#F97316]">
                {facility['Task Category']}
              </span>
            </div>
          </div>

          {/* Description */}
          {facility.Description && (
            <p className="text-[15px] text-muted-foreground line-clamp-2 mb-4">
              {facility.Description}
            </p>
          )}

          {/* Actions */}
          <div className="mt-auto">
            <Button 
              className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-full py-2 text-xs"
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/design/interactive');
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
