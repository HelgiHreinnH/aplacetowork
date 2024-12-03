import React from 'react';
import Card from '@/components/Card';

const CardPage = () => {
  const sampleData = {
    facility: "Meeting Room A",
    subtitle: "Collaborative Space",
    description: "A modern meeting room designed for team collaboration and presentations",
    taskCategory: "Group Work",
    sqmApprox: "30",
    usersApprox: "8-12",
    notes: "Booking required for sessions longer than 1 hour",
    purpose: "Designed for team meetings, presentations, and collaborative sessions",
    activities: "Team meetings, client presentations, video conferences, workshops",
    amenities: "75-inch display, video conferencing system, whiteboard wall, adjustable lighting",
    etiquette: "Clean after use, no food allowed, maintain quiet in surrounding areas",
    technology: "Built-in AV system, wireless presentation capabilities, high-speed internet"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Complete Card Component</h1>
      <div className="max-w-md mx-auto">
        <Card {...sampleData} />
      </div>
    </div>
  );
};

export default CardPage;