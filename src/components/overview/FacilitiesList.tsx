
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.facility_id}
          facility={facility}
          isSelected={selectedFacilities.includes(facility.facility_id)}
          onSelect={onFacilitySelect}
          onClick={onCardClick ? (facilityId) => onCardClick(facilityId) : undefined}
        />
      ))}
    </div>
  );
};

export default FacilitiesList;
