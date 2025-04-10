
import React from 'react';
import CardFront from '@/components/CardFront';
import TitleContainer from '@/components/containers/TitleContainer';
import type { Database } from '@/integrations/supabase/types';

const CardFrontPage = () => {
  const temporaryImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";

  const sampleData: Database['public']['Tables']['Facilities']['Row'] = {
    "Facility": "Meeting Room A",
    "Subtitle": "Collaborative Space",
    "Description": "A modern meeting room designed for team collaboration and presentations",
    "Task Category": "Group Work",
    "Approx. Square Meters": "30",
    "Approx. Users": "8-12",
    "Notes": null,
    "Priority": null,
    "Purpose of the Facility": null,
    "Types of Activities Supported": null,
    "Amenities & Features": null,
    "Etiquette and Guidelines": null,
    "Technology Integration": null,
    "Sq M Min": null,
    "Sq M Max": null,
    "Users Min": null,
    "Users Max": null,
    "display_title": "Modern Collaboration Room",
    "facility_id": "sample-facility-id-2",
    "Facility Image URL": temporaryImageUrl
  };

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Card Front Component</h1>
          <div className="max-w-md mx-auto">
            <CardFront 
              {...sampleData} 
              onFlip={() => console.log("Flip clicked")}
            />
          </div>
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default CardFrontPage;
