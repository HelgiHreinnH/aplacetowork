
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

interface CardFrontProps extends Pick<
  Database['public']['Tables']['Facilities']['Row'],
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'display_title'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageUrl?: string;
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
  imageUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultImageUrl = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  const fixedImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Use the fixed image URL or the provided imageUrl (which should now be the fixed URL)
  const displayImageUrl = imageUrl || fixedImageUrl;

  return (
    <Card className="w-full h-full bg-card shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col rounded-lg overflow-hidden">
      <div className="relative h-[280px] flex-shrink-0 flex items-center justify-center">
        <img 
          src={displayImageUrl} 
          alt={display_title || facility} 
          className="w-full h-full object-cover bg-neutral-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log("Image error, falling back to default:", target.src);
            target.src = defaultImageUrl;
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent">
          <CardTitle className="text-xl font-bold font-display tracking-tight text-foreground line-clamp-1">
            {display_title || facility}
          </CardTitle>
          <CardDescription className="text-sm font-sans text-muted-foreground line-clamp-1 mt-1">
            Inspiration for the ideal Workspace
          </CardDescription>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-4 pt-6">
        <div className="relative mb-3">
          <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-16 overflow-hidden'}`}>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              {isExpanded ? description : truncateDescription(description || '', 100)}
            </p>
          </div>
          {(description?.length || 0) > 100 && (
            <button
              onClick={toggleDescription}
              className="w-full text-primary hover:text-primary/80 flex items-center justify-center gap-1 py-1"
            >
              <span className="text-xs font-medium">
                {isExpanded ? 'Show less' : 'Read more'}
              </span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount of m²</span>
            <span className="text-sm font-medium text-[var(--alert-color)]">{sqmApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount of employees</span>
            <span className="text-sm font-medium text-foreground">{usersApprox}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Collab or concentrated</span>
            <span className="text-sm font-medium text-[var(--alert-color)]">{taskCategory}</span>
          </div>
        </div>

        <CardFooter className="mt-auto pt-3 p-0 flex justify-center">
          <Button
            onClick={onFlip}
            variant="main"
            className="rounded-full py-3 px-6"
          >
            Show More Details
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardFront;
