import React from 'react';

interface FacilityDetailProps {
  label: string;
  value?: string | null;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ label, value }) => {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-sm font-medium text-orange-500">
        {value || 'N/A'}
      </div>
    </div>
  );
};

export default FacilityDetail;