import type { Database } from '@/integrations/supabase/types';
import FacilityCard from './FacilityCard';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface FacilitiesListProps {
  facilities: Facility[];
  selectedFacilities: string[];
  onFacilitySelect: (facilityId: string, event: React.MouseEvent) => void;
}

const FacilitiesList = ({ 
  facilities, 
  selectedFacilities, 
  onFacilitySelect 
}: FacilitiesListProps) => {
  return (
    <div className="space-y-6">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.facility_id}
          facility={facility}
          isSelected={selectedFacilities.includes(facility.facility_id)}
          onSelect={onFacilitySelect}
        />
      ))}
    </div>
  );
};

export default FacilitiesList;