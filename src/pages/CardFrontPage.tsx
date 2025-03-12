import React, { useState, useEffect } from 'react';
import CardFront from '@/components/CardFront';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

const CardFrontPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await supabase
          .storage
          .from('scenarios')
          .getPublicUrl('Dump.pdf');

        setImageUrl(data.publicUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Error in fetchImage:', err);
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

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
    "Facility Image URL": imageUrl || "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/sign/facilities_images/Table%20settings%20coworking.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmYWNpbGl0aWVzX2ltYWdlcy9UYWJsZSBzZXR0aW5ncyBjb3dvcmtpbmcucG5nIiwiaWF0IjoxNzM0NjkzNzI1LCJleHAiOjE3MzcyODU3MjV9.lOprascu1tXHY_UEooMRBXdaW0ks5y_AK8f_5nGY-cc"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Front Component</h1>
      <div className="max-w-md mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading image...</p>
          </div>
        ) : (
          <CardFront 
            {...sampleData} 
            imageUrl={imageUrl || sampleData['Facility Image URL']}
            onFlip={() => console.log("Flip clicked")}
          />
        )}
      </div>
    </div>
  );
};

export default CardFrontPage;
