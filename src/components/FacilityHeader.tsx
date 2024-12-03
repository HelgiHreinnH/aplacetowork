import React from 'react';
import { CardHeader } from "@/components/ui/card";

interface FacilityHeaderProps {
  facility: string;
  imageId?: string;
}

const FacilityHeader: React.FC<FacilityHeaderProps> = ({ facility, imageId = 'photo-1488590528505-98d2b5aba04b' }) => {
  return (
    <>
      <CardHeader className="flex-none">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
      </CardHeader>
      
      <div className="flex-none w-full h-48 px-6">
        <img 
          src={`https://images.unsplash.com/${imageId}`} 
          alt={facility} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </>
  );
};

export default FacilityHeader;