
import { useLocation, useNavigate } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';
import FacilityCard from './FacilityCard';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface FacilitiesListProps {
  facilities: Facility[];
  selectedFacilities: string[];
  onFacilitySelect: (facilityId: string, event: React.MouseEvent) => void;
  onCardClick?: (facilityId: string) => void;
}

const FacilitiesList = ({ 
  facilities, 
  selectedFacilities, 
  onFacilitySelect,
  onCardClick
}: FacilitiesListProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (facilityId: string) => {
    if (onCardClick) {
      onCardClick(facilityId);
    } else {
      // Default behavior is to navigate to the card overlay
      navigate(`/card-overlay/${facilityId}`, {
        state: { backgroundLocation: location }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.facility_id}
          facility={facility}
          isSelected={selectedFacilities.includes(facility.facility_id)}
          onSelect={onFacilitySelect}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default FacilitiesList;
