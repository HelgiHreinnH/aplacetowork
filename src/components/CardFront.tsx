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
  imageId?: string;
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
  imageId = 'photo-1488590528505-98d2b5aba04b'
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="space-y-1 pb-4 px-4 sm:px-6">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
          {display_title || facility}
        </h1>
        <p className="text-sm font-medium text-gray-500 line-clamp-1">{subtitle}</p>
      </CardHeader>

      <div className="w-full px-4 sm:px-6 mb-4">
        <div className="aspect-video w-full">
          <img 
            src={`https://images.unsplash.com/${imageId}`} 
            alt={display_title || facility} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col space-y-4 px-4 sm:px-6">
        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">{description}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Workspace</h3>
            <div className="bg-gray-50 p-3 rounded-lg flex-1">
              <div className="space-y-1">
                <p className="text-sm"><span className="font-medium">Area:</span> <span className="text-gray-600">{sqmApprox} m²</span></p>
                <p className="text-sm"><span className="font-medium">Users:</span> <span className="text-gray-600">{usersApprox}</span></p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Primary Use</h3>
            <div className="bg-gray-50 p-3 rounded-lg flex-1">
              <p className="text-sm text-gray-900 line-clamp-2">{taskCategory}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={onFlip}
            className="w-full bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm"
          >
            Show More Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFront;