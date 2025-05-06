
import React from 'react';
import { CardHeader } from "@/components/ui/card";

interface FacilityHeaderProps {
  facility: string;
  imageId?: string;
}

const FacilityHeader: React.FC<FacilityHeaderProps> = ({ facility }) => {
  return (
    <CardHeader className="flex-none text-left">
      <h1 className="text-2xl font-bold tracking-tight text-[#8eb8e5]">{facility}</h1>
      <p className="text-sm tracking-[0.2em] text-[#8E9196] uppercase">Inspiration for the ideal Workspace</p>
    </CardHeader>
  );
};

export default FacilityHeader;
