import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';
import FacilityHeader from './FacilityHeader';
import InfoSection from './InfoSection';
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
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageId?: string;
}

const CardBack: React.FC<CardBackProps> = ({
  Facility: facility,
  'Task Category': taskCategory,
  Notes: notes,
  'Purpose of the Facility': purpose,
  'Types of Activities Supported': activities,
  'Amenities & Features': amenities,
  'Etiquette and Guidelines': etiquette,
  'Technology Integration': technology,
  onFlip,
  imageId,
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="flex-none">
        <FacilityHeader facility={facility} imageId={imageId} />
      </div>

      <CardContent className="flex-grow overflow-y-auto space-y-4 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 h-5 mb-3">Task Category</h3>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-gray-900 font-medium">{taskCategory}</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 h-5 mb-3">Notes</h3>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-gray-600">{notes || 'Not specified'}</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <FacilityDetails
            purpose={purpose}
            activities={activities}
            amenities={amenities}
            etiquette={etiquette}
            technology={technology}
          />

          <button
            className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
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