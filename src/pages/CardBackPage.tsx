import React from 'react';
import CardBack from '@/components/CardBack';

const CardBackPage = () => {
  const sampleData = {
    facility: "Meeting Room A",
    taskCategory: "Group Work",
    notes: "Booking required for sessions longer than 1 hour",
    purpose: "Designed for team meetings, presentations, and collaborative sessions",
    activities: "Team meetings, client presentations, video conferences, workshops",
    amenities: "75-inch display, video conferencing system, whiteboard wall, adjustable lighting",
    etiquette: "Clean after use, no food allowed, maintain quiet in surrounding areas",
    technology: "Built-in AV system, wireless presentation capabilities, high-speed internet",
    onFlip: () => console.log("Flip clicked")
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Back Component</h1>
      <div className="max-w-md mx-auto">
        <CardBack {...sampleData} />
      </div>
    </div>
  );
};

export default CardBackPage;