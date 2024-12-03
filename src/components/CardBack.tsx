import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle, FoldHorizontal } from "lucide-react";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardBackProps extends Pick<
  Facility,
  | 'Facility'
  | 'Task Category'
  | 'Notes'
  | 'Purpose of the Facility'
  | 'Types of Activities Supported'
  | 'Amenities & Features'
  | 'Etiquette and Guidelines'
  | 'Technology Integration'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageId?: string;
}

interface CategoryPopoverProps {
  title: string;
  content?: string | null;
}

const CategoryPopover: React.FC<CategoryPopoverProps> = ({ title, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Circle className="h-12 w-12 p-2 bg-gray-100 rounded-full" />
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <FoldHorizontal className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>
        <p className="text-gray-600">{content || 'Not specified'}</p>
      </PopoverContent>
    </Popover>
  );
};

const CardBack: React.FC<CardBackProps> = ({
  Facility: facility,
  'Task Category': taskCategory,
  Notes: notes,
  'Purpose of the Facility': purpose,
  'Types of Activities Supported': activities,
  'Amenities & Features': amenities,
  'Etiquette and Guidelines': etiquette,
  'Technology Integration': technology,
  onFlip,
  imageId
}) => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    if (onFlip) {
      onFlip(e);
    } else {
      navigate('/card-front');
    }
  };

  const categories = [
    { title: 'Purpose', content: purpose },
    { title: 'Activities', content: activities },
    { title: 'Amenities', content: amenities },
    { title: 'Guidelines', content: etiquette },
    { title: 'Technology', content: technology },
  ];

  return (
    <Card className="w-full h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{facility}</h1>
        {imageId && (
          <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
            <img 
              src={`/images/${imageId}`} 
              alt={facility} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryPopover 
              key={category.title} 
              title={category.title} 
              content={category.content} 
            />
          ))}
        </div>

        <div className="space-y-4 mt-6">
          <InfoSection title="Task Category" content={taskCategory} />
          <InfoSection title="Notes" content={notes} />
        </div>

        <button
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-6"
          onClick={handleBack}
        >
          Back to Front
        </button>
      </CardContent>
    </Card>
  );
};

const InfoSection: React.FC<{ title: string; content?: string | null }> = ({ title, content }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-600">{content || 'Not specified'}</p>
  </div>
);

export default CardBack;