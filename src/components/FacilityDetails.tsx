import React from 'react';
import CategoryPopover from './CategoryPopover';

interface FacilityDetailsProps {
  purpose?: string | null;
  activities?: string | null;
  amenities?: string | null;
  etiquette?: string | null;
  technology?: string | null;
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({
  purpose,
  activities,
  amenities,
  etiquette,
  technology,
}) => {
  const categories = [
    { title: 'Purpose', content: purpose },
    { title: 'Activities', content: activities },
    { title: 'Amenities', content: amenities },
    { title: 'Guidelines', content: etiquette },
    { title: 'Technology', content: technology },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Facility Details</h2>
        <p className="text-gray-600">
          Explore the key aspects of this facility to understand how to best utilize and implement it in your workplace environment.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryPopover 
            key={category.title} 
            title={category.title} 
            content={category.content} 
          />
        ))}
      </div>
    </div>
  );
};

export default FacilityDetails;