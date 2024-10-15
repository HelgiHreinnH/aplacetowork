import React from 'react';
import Card from '../components/Card';

const CardOverview = () => {
  // Mock data for 6 test cards
  const cardData = [
    { id: 1, title: 'Work Table', image: '/images/work-table.jpg', description: 'Ergonomic work table setup', squareMeters: 10, employees: 1, usage: 'Active' },
    { id: 2, title: 'Lounge Area', image: '/images/lounge-area.jpg', description: 'Comfortable lounge for relaxation', squareMeters: 20, employees: 5, usage: 'Passive' },
    { id: 3, title: 'Meeting Room', image: '/images/meeting-room.jpg', description: 'Spacious meeting room for team discussions', squareMeters: 30, employees: 8, usage: 'Active' },
    { id: 4, title: 'Open Area', image: '/images/open-area.jpg', description: 'Collaborative open workspace', squareMeters: 40, employees: 10, usage: 'Active' },
    { id: 5, title: 'Phone Booth', image: '/images/phone-booth.jpg', description: 'Private space for calls', squareMeters: 8, employees: 1, usage: 'Active' },
    { id: 6, title: 'Breakout Space', image: '/images/breakout-space.jpg', description: 'Informal meeting and brainstorming area', squareMeters: 25, employees: 6, usage: 'Passive' },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Workplace Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CardOverview;