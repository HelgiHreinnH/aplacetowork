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
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageId?: string;
}

const CardFront: React.FC<CardFrontProps> = ({
  Facility: facility,
  Subtitle: subtitle,
  Description: description,
  'Task Category': taskCategory,
  'Approx. Square Meters': sqmApprox,
  'Approx. Users': usersApprox,
  onFlip,
  imageId = 'photo-1488590528505-98d2b5aba04b'
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="space-y-1 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
        <p className="text-base font-medium text-gray-500">{subtitle}</p>
      </CardHeader>

      <div className="w-full h-48 px-6 mb-6">
        <img 
          src={`https://images.unsplash.com/${imageId}`} 
          alt={facility || 'Facility image'} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <CardContent className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-base">{description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Workspace Characteristics</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">Area: <span className="text-gray-600 font-normal">{sqmApprox} m²</span></p>
                <p className="text-gray-900 font-medium">Capacity: <span className="text-gray-600 font-normal">{usersApprox} users</span></p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Primary Use</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-medium">{taskCategory}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onFlip}
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
        >
          Show More Details
        </button>
      </CardContent>
    </Card>
  );
};

export default CardFront;