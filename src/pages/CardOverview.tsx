import React from 'react';
import Card from '../components/Card';

const CardOverview = () => {
  // Mock data for 6 test cards with updated property names
  const cardData = [
    { 
      setting_title: 'Work Table',
      setting_subtitle: 'Individual Workspace',
      setting_description: 'Ergonomic work table setup',
      image: '/images/work-table.jpg',
      sqm_min: 8,
      sqm_max: 12,
      employees_min: 1,
      employees_max: 1,
      workplace_setting: 'Active'
    },
    {
      setting_title: 'Lounge Area',
      setting_subtitle: 'Relaxation Zone',
      setting_description: 'Comfortable lounge for relaxation',
      image: '/images/lounge-area.jpg',
      sqm_min: 15,
      sqm_max: 25,
      employees_min: 4,
      employees_max: 6,
      workplace_setting: 'Passive'
    },
    {
      setting_title: 'Meeting Room',
      setting_subtitle: 'Collaboration Space',
      setting_description: 'Spacious meeting room for team discussions',
      image: '/images/meeting-room.jpg',
      sqm_min: 25,
      sqm_max: 35,
      employees_min: 6,
      employees_max: 10,
      workplace_setting: 'Active'
    },
    {
      setting_title: 'Open Area',
      setting_subtitle: 'Collaborative Workspace',
      setting_description: 'Collaborative open workspace',
      image: '/images/open-area.jpg',
      sqm_min: 35,
      sqm_max: 50,
      employees_min: 8,
      employees_max: 12,
      workplace_setting: 'Active'
    },
    {
      setting_title: 'Phone Booth',
      setting_subtitle: 'Private Communication',
      setting_description: 'Private space for calls',
      image: '/images/phone-booth.jpg',
      sqm_min: 2,
      sqm_max: 4,
      employees_min: 1,
      employees_max: 1,
      workplace_setting: 'Active'
    },
    {
      setting_title: 'Breakout Space',
      setting_subtitle: 'Informal Meeting Area',
      setting_description: 'Informal meeting and brainstorming area',
      image: '/images/breakout-space.jpg',
      sqm_min: 20,
      sqm_max: 30,
      employees_min: 4,
      employees_max: 8,
      workplace_setting: 'Passive'
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Workplace Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card) => (
          <Card key={card.setting_title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CardOverview;