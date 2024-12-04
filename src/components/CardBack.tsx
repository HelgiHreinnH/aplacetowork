import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    if (onFlip) {
      onFlip(e);
    } else {
      navigate('/card-front');
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <FacilityHeader facility={facility} imageId={imageId} />

      <CardContent className="space-y-6 pt-6">
        <div className="space-y-6">
          <InfoSection title="Task Category" content={taskCategory} />
          <InfoSection title="Notes" content={notes} />
        </div>

        <div className="pt-6 border-t border-gray-200">
          <FacilityDetails
            purpose={purpose}
            activities={activities}
            amenities={amenities}
            etiquette={etiquette}
            technology={technology}
          />

          <button
            className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
            onClick={handleBack}
          >
            Back to Front
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBack;