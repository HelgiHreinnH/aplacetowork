
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useResponsive } from '@/hooks/use-responsive';
import { componentTokens } from '@/styles/design-tokens';

interface SettingCardProps {
  title: string;
  description: string;
  type: 'work-table' | 'lounge-area' | 'meeting-room' | 'open-area';
  capacity: string;
  area: string;
  features: string[];
  imageUrl?: string;
  onClick?: () => void;
}

export const SettingCard: React.FC<SettingCardProps> = ({ 
  title, 
  description, 
  type, 
  capacity, 
  area, 
  features,
  imageUrl,
  onClick
}) => {
  const { getValue, isMobile, isTablet } = useResponsive();
  const defaultImage = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  // Type badges with styling
  const typeBadges = {
    'work-table': { label: 'Work Table', color: 'bg-[#F1F0FB] text-[#9b87f5]' },
    'lounge-area': { label: 'Lounge Area', color: 'bg-[#F2FCE2] text-green-700' },
    'meeting-room': { label: 'Meeting Room', color: 'bg-[#D3E4FD] text-blue-700' },
    'open-area': { label: 'Open Area', color: 'bg-[#FDE1D3] text-orange-700' }
  };
  
  const badge = typeBadges[type];
  
  // Get responsive card styling
  const imageHeight = getValue(componentTokens.card.imageHeight);
  const cardPadding = getValue(componentTokens.card.padding);

  // Determine if the whole card is clickable (mobile/tablet) or just the button (desktop)
  const isWholeCardClickable = isMobile || isTablet;

  const handleCardClick = () => {
    if (isWholeCardClickable && onClick) {
      onClick();
    }
  };

  // Mobile layout with horizontal orientation (no image, tag on right)
  if (isMobile) {
    return (
      <Card 
        className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        {/* Header with title and badge */}
        <div className="flex justify-between items-start p-3">
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
          </div>
          
          <div>
            <Badge className={`${badge.color} text-[10px] px-1.5 py-0.5 whitespace-nowrap`}>
              {badge.label}
            </Badge>
          </div>
        </div>
        
        {/* Card content */}
        <div className="px-3 pb-3">          
          <div className="mt-1 flex justify-between items-center">
            <div className="border border-gray-200 rounded-md p-1.5 shadow-sm text-center w-[30%]">
              <p className="text-[10px] text-muted-foreground mb-0.5">Area</p>
              <p className="font-medium text-sm text-[#ff8600]">{area}</p>
              <p className="text-[10px]">m²</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-1.5 shadow-sm text-center w-[30%]">
              <p className="text-[10px] text-muted-foreground mb-0.5">Capacity</p>
              <p className="font-medium text-sm text-[#ff8600]">{capacity}</p>
              <p className="text-[10px]">colleagues</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-1.5 shadow-sm text-center w-[30%]">
              <p className="text-[10px] text-muted-foreground mb-0.5">Type</p>
              <div className="flex justify-center pb-1">
                <div className="h-5 w-5 bg-[#F1F0FB] rounded-full flex items-center justify-center">
                  <span className="text-[#9b87f5] text-[10px]">W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Original desktop/tablet card layout
  return (
    <Card 
      className={`overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 ${isTablet && isWholeCardClickable ? 'cursor-pointer' : ''}`}
      onClick={isTablet ? handleCardClick : undefined}
    >
      <div className="relative" style={{ height: imageHeight }}>
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
      
      <CardHeader style={{ padding: cardPadding }}>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow" style={{ padding: cardPadding, paddingTop: 0 }}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="border border-gray-200 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Area</p>
              <p className="font-medium text-lg text-[#ff8600] w-full">{area}</p>
              <p className="text-xs">m²</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-200 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="font-medium text-lg text-[#ff8600] w-full">{capacity}</p>
              <p className="text-xs">colleagues</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-200 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Type</p>
              <div className="flex justify-center pt-1">
                <div className="h-6 w-6 bg-[#F1F0FB] rounded-full flex items-center justify-center">
                  <span className="text-[#9b87f5] text-xs">W</span>
                </div>
              </div>
              <p className="text-xs">work</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      {!isTablet && !isWholeCardClickable && (
        <CardFooter style={{ padding: cardPadding }}>
          <Button 
            variant="main" 
            className="w-full rounded-full" 
            onClick={onClick}
          >
            Learn more
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
