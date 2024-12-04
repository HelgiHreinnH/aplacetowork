import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Card from '@/components/Card';
import { toast } from "sonner";

const CardDesignPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  // Sample facility data for demonstration
  const sampleFacility = {
    "Facility": "Meeting Room A",
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
    "Technology Integration": "Built-in AV system, wireless presentation capabilities, high-speed internet"
  };

  const handleBack = () => {
    navigate('/search-results');
  };

  const handleViewToggle = () => {
    setCurrentView(currentView === 'front' ? 'back' : 'front');
    toast.success(`Showing card ${currentView === 'front' ? 'back' : 'front'}`);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
          <Button onClick={handleViewToggle}>
            Show Card {currentView === 'front' ? 'Back' : 'Front'}
          </Button>
        </div>

        <div className="aspect-[3/4] w-full max-w-2xl mx-auto">
          <Card {...sampleFacility} />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Click the card or use the button above to flip between front and back views
        </div>
      </div>
    </div>
  );
};

export default CardDesignPage;