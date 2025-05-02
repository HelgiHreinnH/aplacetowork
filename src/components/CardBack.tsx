
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <CardTitle className="text-[22px] font-bold tracking-tight text-foreground line-clamp-1">
          {display_title || facility}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 p-6">
        <div className="bg-[#F1F0FB] p-3 rounded-md">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Task Category</h3>
          <p className="text-[15px] text-primary line-clamp-1">{taskCategory}</p>
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
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Notes</h3>
          <p className="text-[15px] text-muted-foreground line-clamp-2">{notes || 'Not specified'}</p>
        </div>

        <CardFooter className="mt-auto p-0">
          <Button
            variant="main"
            className="w-full py-4 px-6 rounded-md text-[15px] font-medium uppercase"
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
