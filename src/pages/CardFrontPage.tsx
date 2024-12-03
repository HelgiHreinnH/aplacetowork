import React from 'react';
import CardFront from '@/components/CardFront';
import type { Database } from '@/integrations/supabase/types';

const CardFrontPage = () => {
  const sampleData: Partial<Database['public']['Tables']['Facilities']['Row']> = {
    "Facility": "Meeting Room A",
    "Subtitle": "Collaborative Space",
    "Description": "A modern meeting room designed for team collaboration and presentations",
    "Task Category": "Group Work",
    "Approx. Square Meters": "30",
    "Approx. Users": "8-12"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Front Component</h1>
      <div className="max-w-md mx-auto">
        <CardFront 
          {...sampleData} 
          imageId="photo-1486312338219-ce68d2c6f44d"
          onFlip={() => console.log("Flip clicked")}
        />
      </div>
    </div>
  );
};

export default CardFrontPage;