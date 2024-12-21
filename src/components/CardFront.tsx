import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardFrontProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'display_title'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageUrl: string;
}

const CardFront: React.FC<CardFrontProps> = ({
  Facility: facility,
  display_title,
  Subtitle: subtitle,
  Description: description,
  'Task Category': taskCategory,
  'Approx. Square Meters': sqmApprox,
  'Approx. Users': usersApprox,
  onFlip,
  imageUrl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card className="w-full h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-[32px] overflow-hidden">
      <div className="relative h-[200px] flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={display_title || facility} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent">
          <h1 className="text-[22px] font-bold tracking-tight text-black line-clamp-1">
            {display_title || facility}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-1 mt-1">{subtitle}</p>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-6">
        <div className="relative">
          <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-24 overflow-hidden'}`}>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              {isExpanded ? description : truncateDescription(description || '', 100)}
            </p>
          </div>
          {(description?.length || 0) > 100 && (
            <button
              onClick={toggleDescription}
              className="w-full text-blue-500 hover:text-blue-600 flex items-center justify-center gap-1 py-2 mt-1"
            >
              <span className="text-sm font-medium">
                {isExpanded ? 'Show less' : 'Read more'}
              </span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of m²</span>
            <span className="text-[15px] font-medium text-[#FEC6A1]">{sqmApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Amount of employees</span>
            <span className="text-[15px] font-medium text-black">{usersApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-gray-600">Collab or concentrated</span>
            <span className="text-[15px] font-medium text-[#FEC6A1]">{taskCategory}</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={onFlip}
            className="w-full bg-[#D3E4FD] text-[#1A1F2C] py-4 px-6 rounded-full hover:bg-[#B3D4FD] transition-colors text-[15px] font-medium uppercase"
          >
            Show More Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFront;