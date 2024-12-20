import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';
import FacilityDetails from './FacilityDetails';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardBackProps extends Pick<
  Facility,
  | 'Facility'
  | 'Task Category'
  | 'Notes'
  | 'Purpose of the Facility'
  | 'Types of Activities Supported'
  | 'Amenities & Features'
  | 'Etiquette and Guidelines'
  | 'Technology Integration'
  | 'display_title'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageUrl: string;
}

const CardBack: React.FC<CardBackProps> = ({
  Facility: facility,
  display_title,
  'Task Category': taskCategory,
  Notes: notes,
  'Purpose of the Facility': purpose,
  'Types of Activities Supported': activities,
  'Amenities & Features': amenities,
  'Etiquette and Guidelines': etiquette,
  'Technology Integration': technology,
  onFlip,
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex-none py-3 px-4 sm:px-6 border-b">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
          {display_title || facility}
        </h1>
      </div>

      <CardContent className="flex-1 flex flex-col space-y-4 p-4 sm:p-6">
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Task Category</h3>
            <p className="text-sm text-gray-900 line-clamp-1">{taskCategory}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Notes</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{notes || 'Not specified'}</p>
          </div>
        </div>

        <div className="flex-1">
          <FacilityDetails
            purpose={purpose}
            activities={activities}
            amenities={amenities}
            etiquette={etiquette}
            technology={technology}
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            className="w-full bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm"
            onClick={onFlip}
          >
            Back to Front
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBack;