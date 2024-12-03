import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';

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
  onFlip
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
    <Card className="w-full h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <InfoSection title="Task Category" content={taskCategory} />
          <InfoSection title="Notes" content={notes} />
          <InfoSection title="Purpose of the Facility" content={purpose} />
          <InfoSection title="Types of Activities Supported" content={activities} />
          <InfoSection title="Amenities & Features" content={amenities} />
          <InfoSection title="Etiquette and Guidelines" content={etiquette} />
          <InfoSection title="Technology Integration" content={technology} />
        </div>

        <button
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
          onClick={handleBack}
        >
          Back to Front
        </button>
      </CardContent>
    </Card>
  );
};

const InfoSection: React.FC<{ title: string; content?: string | null }> = ({ title, content }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-600">{content || 'Not specified'}</p>
  </div>
);

export default CardBack;