import React from 'react';
import CardFront from '@/components/CardFront';
import type { Database } from '@/integrations/supabase/types';

const CardFrontPage = () => {
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
    "Facility Image URL": "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/sign/facilities_images/Table%20settings%20coworking.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmYWNpbGl0aWVzX2ltYWdlcy9UYWJsZSBzZXR0aW5ncyBjb3dvcmtpbmcucG5nIiwiaWF0IjoxNzM0NjkzNzI1LCJleHAiOjE3MzcyODU3MjV9.lOprascu1tXHY_UEooMRBXdaW0ks5y_AK8f_5nGY-cc"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Front Component</h1>
      <div className="max-w-md mx-auto">
        <CardFront 
          {...sampleData} 
          imageUrl={sampleData['Facility Image URL'] || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"}
          onFlip={() => console.log("Flip clicked")}
        />
      </div>
    </div>
  );
};

export default CardFrontPage;