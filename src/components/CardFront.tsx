import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardFrontProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'display_title'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageUrl: string;
}

const CardFront: React.FC<CardFrontProps> = ({
  Facility: facility,
  display_title,
  Subtitle: subtitle,
  Description: description,
  'Task Category': taskCategory,
  'Approx. Square Meters': sqmApprox,
  'Approx. Users': usersApprox,
  onFlip,
  imageUrl
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-none hover:shadow-none transition-shadow duration-300 flex flex-col rounded-[32px]">
      <CardHeader className="space-y-1 pb-4 px-6">
        <h1 className="text-[22px] font-bold tracking-tight text-black line-clamp-1">
          {display_title || facility}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-1">{subtitle}</p>
      </CardHeader>

      <div className="w-full px-6 mb-4">
        <div className="aspect-video w-full">
          <img 
            src={imageUrl} 
            alt={display_title || facility} 
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col space-y-4 px-6">
        <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-3">{description}</p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of m²</span>
            <span className="text-[15px] font-medium text-[#F97316]">{sqmApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of employees</span>
            <span className="text-[15px] font-medium text-black">{usersApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Collab or concentrated</span>
            <span className="text-[15px] font-medium text-[#F97316]">{taskCategory}</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={onFlip}
            className="w-full bg-[#0EA5E9] text-white py-4 px-6 rounded-full hover:bg-[#0284C7] transition-colors text-[15px] font-medium uppercase"
          >
            Show More Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFront;