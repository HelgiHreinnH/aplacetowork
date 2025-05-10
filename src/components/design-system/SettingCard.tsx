
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SettingCardProps {
  title: string;
  description: string;
  type: 'work-table' | 'lounge-area' | 'meeting-room' | 'open-area';
  capacity: string;
  area: string;
  features: string[];
  imageUrl?: string;
}

export const SettingCard: React.FC<SettingCardProps> = ({ 
  title, 
  description, 
  type, 
  capacity, 
  area, 
  features,
  imageUrl 
}) => {
  const defaultImage = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  // Type badges with styling
  const typeBadges = {
    'work-table': { label: 'Work Table', color: 'bg-[#F1F0FB] text-[#9b87f5]' },
    'lounge-area': { label: 'Lounge Area', color: 'bg-[#F2FCE2] text-green-700' },
    'meeting-room': { label: 'Meeting Room', color: 'bg-[#D3E4FD] text-blue-700' },
    'open-area': { label: 'Open Area', color: 'bg-[#FDE1D3] text-orange-700' }
  };
  
  const badge = typeBadges[type];

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={badge.color}>
            {badge.label}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p className="font-medium">{capacity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-medium">{area}</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-[#F1F0FB] rounded-full">
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="text-xs px-2 py-1 bg-[#F1F0FB] rounded-full">
                +{features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="main" className="w-full rounded-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};
