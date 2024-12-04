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
      <CardHeader className="space-y-2 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
      </CardHeader>

      <div className="w-full h-48 px-6 mb-6">
        <img 
          src={`https://images.unsplash.com/${imageId}`} 
          alt={facility || 'Facility image'} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">{subtitle}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Workspace Characteristics</h3>
            <div className="bg-gray-50 p-4 rounded-lg h-24 flex flex-col justify-center">
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">Area: {sqmApprox} m²</p>
                <p className="text-gray-600 text-sm">Capacity: {usersApprox} users</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Primary Use</h3>
            <div className="bg-gray-50 p-4 rounded-lg h-24 flex items-center justify-center">
              <p className="text-gray-600 text-sm">{taskCategory}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onFlip}
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
        >
          Show More Details
        </button>
      </CardContent>
    </Card>
  );
};

export default CardFront;