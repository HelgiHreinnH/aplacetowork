
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H3, H5 } from '@/components/ui/typography';
import type { Database } from '@/integrations/supabase/types';
import FacilityDetails from './FacilityDetails';

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
  | 'display_title'
> {
  onFlip?: (e: React.MouseEvent) => void;
  imageUrl: string;
}

const CardBack: React.FC<CardBackProps> = ({
  Facility: facility,
  display_title,
  'Task Category': taskCategory,
  Notes: notes,
  'Purpose of the Facility': purpose,
  'Types of Activities Supported': activities,
  'Amenities & Features': amenities,
  'Etiquette and Guidelines': etiquette,
  'Technology Integration': technology,
  onFlip,
}) => {
  return (
    <Card className="w-full h-full bg-card shadow-none hover:shadow-none transition-shadow duration-300 flex flex-col rounded-lg overflow-hidden">
      <CardHeader className="flex-none py-4 px-6 border-b bg-[#F1F0FB]">
        <H3 className="text-[22px] tracking-tight text-foreground line-clamp-1 font-normal">
          {display_title || facility}
        </H3>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 p-6">
        <div className="bg-[#F1F0FB] p-3 rounded-md">
          <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">Task Category</H5>
          <p className="text-sm font-sans font-semibold text-primary line-clamp-1">{taskCategory}</p>
        </div>
        
        <div className="flex-1">
          <FacilityDetails
            purpose={purpose}
            activities={activities}
            amenities={amenities}
            etiquette={etiquette}
            technology={technology}
          />
        </div>
        
        <div className="bg-[#F1F0FB] p-3 rounded-md">
          <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">Notes</H5>
          <p className="text-sm font-sans font-semibold text-muted-foreground line-clamp-2">{notes || 'Not specified'}</p>
        </div>

        <CardFooter className="mt-auto p-0 flex justify-center">
          <Button
            variant="main"
            className="rounded-full py-4 px-6"
            onClick={onFlip}
          >
            Back to Front
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardBack;
