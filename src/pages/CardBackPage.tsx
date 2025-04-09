
import React from 'react';
import CardBack from '@/components/CardBack';
import TitleContainer from '@/components/containers/TitleContainer';
import type { Database } from '@/integrations/supabase/types';

const CardBackPage = () => {
  const sampleData: Database['public']['Tables']['Facilities']['Row'] = {
    "Facility": "Meeting Room A",
    "Task Category": "Group Work",
    "Notes": "Booking required for sessions longer than 1 hour",
    "Purpose of the Facility": "Designed for team meetings, presentations, and collaborative sessions",
    "Types of Activities Supported": "Team meetings, client presentations, video conferences, workshops",
    "Amenities & Features": "75-inch display, video conferencing system, whiteboard wall, adjustable lighting",
    "Etiquette and Guidelines": "Clean after use, no food allowed, maintain quiet in surrounding areas",
    "Technology Integration": "Built-in AV system, wireless presentation capabilities, high-speed internet",
    "Subtitle": null,
    "Description": null,
    "Priority": null,
    "Approx. Square Meters": null,
    "Approx. Users": null,
    "Sq M Min": null,
    "Sq M Max": null,
    "Users Min": null,
    "Users Max": null,
    "display_title": "Collaborative Meeting Space",
    "facility_id": "sample-facility-id-1",
    "Facility Image URL": null
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <TitleContainer />
      <h1 className="text-3xl font-bold mb-8">Card Back Component</h1>
      <div className="max-w-md mx-auto">
        <CardBack 
          {...sampleData} 
          onFlip={() => console.log("Flip clicked")}
          imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
        />
      </div>
    </div>
  );
};

export default CardBackPage;
