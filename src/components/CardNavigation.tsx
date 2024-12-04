import React from 'react';
import { useNavigate } from 'react-router-dom';
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
> {
  imageId?: string;
}

const CardNavigation: React.FC<CardNavigationProps> = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    sessionStorage.setItem('selectedFacility', JSON.stringify(props));
    navigate('/design/card', { state: props });
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card {...props} />
    </div>
  );
};

export default CardNavigation;