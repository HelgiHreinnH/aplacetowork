import React from 'react';
import Card from '@/components/Card';

const CardDesignPage = () => {
  // Sample facility data for demonstration
  const sampleFacility = {
    "Facility": "Meeting Room A",
    "display_title": "Meeting Room A",
    "Subtitle": "Collaborative Space",
    "Description": "A modern meeting room designed for team collaboration and presentations. The space features state-of-the-art technology and flexible furniture arrangements to accommodate various meeting styles and group sizes. Natural lighting and acoustic treatments create an optimal environment for productive discussions.",
    "Task Category": "Group Work",
    "Approx. Square Meters": "30",
    "Approx. Users": "8-12",
    "Notes": "Booking required for sessions longer than 1 hour",
    "Purpose of the Facility": "Designed for team meetings, presentations, and collaborative sessions",
    "Types of Activities Supported": "Team meetings, client presentations, video conferences, workshops",
    "Amenities & Features": "75-inch display, video conferencing system, whiteboard wall, adjustable lighting",
    "Etiquette and Guidelines": "Clean after use, no food allowed, maintain quiet in surrounding areas",
    "Technology Integration": "Built-in AV system, wireless presentation capabilities, high-speed internet",
    "Facility Image URL": null,
    "facility_id": "sample-id",
    "Priority": null,
    "Sq M Min": null,
    "Sq M Max": null,
    "Users Min": null,
    "Users Max": null
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-lg mx-auto">
          <Card {...sampleFacility} />
          <div className="mt-6 text-center text-sm text-gray-500">
            Click the card to flip between front and back views
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesignPage;