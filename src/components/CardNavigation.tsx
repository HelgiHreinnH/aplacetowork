import React from 'react';
import Card from './Card';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardNavigationProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'Notes'
  | 'Purpose of the Facility'
  | 'Types of Activities Supported'
  | 'Amenities & Features'
  | 'Etiquette and Guidelines'
  | 'Technology Integration'
  | 'display_title'
  | 'Facility Image URL'
> {
  imageId?: string;
}

const CardNavigation: React.FC<CardNavigationProps> = (props) => {
  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-0">
      <div className="aspect-[3/4] w-full">
        <Card {...props} />
      </div>
    </div>
  );
};

export default CardNavigation;