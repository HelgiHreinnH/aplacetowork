
import React from 'react';
import { CardHeader } from "@/components/ui/card";

interface FacilityHeaderProps {
  facility: string;
  imageId?: string;
}

const FacilityHeader: React.FC<FacilityHeaderProps> = ({ facility }) => {
  return (
    <CardHeader className="flex-none">
      <h1 className="text-2xl font-bold tracking-tight text-[#9b87f5]">{facility}</h1>
    </CardHeader>
  );
};

export default FacilityHeader;
