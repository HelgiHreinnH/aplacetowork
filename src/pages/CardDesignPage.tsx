import React from 'react';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardDesignPage = () => {
  const navigate = useNavigate();
  
  // Sample facility data for demonstration
  const sampleFacility = {
    "Facility": "Meeting Room A",
    "display_title": "Meeting Room A",
    "Subtitle": "Collaborative Space",
    "Description": "A modern meeting room designed for team collaboration and presentations",
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
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="aspect-[3/4] w-full">
          <Card {...sampleFacility} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 px-4">
          Click the card to flip between front and back views
        </div>
      </div>
    </div>
  );
};

export default CardDesignPage;