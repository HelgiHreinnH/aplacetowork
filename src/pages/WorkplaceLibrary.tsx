
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { H1, H3 } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import TitleContainer from '@/components/containers/TitleContainer';

interface SettingCardProps {
  title: string;
  description: string;
  type: 'work-table' | 'lounge-area' | 'meeting-room' | 'open-area';
  capacity: string;
  area: string;
  features: string[];
  imageUrl?: string;
}

const SettingCard: React.FC<SettingCardProps> = ({ 
  title, 
  description, 
  type, 
  capacity, 
  area, 
  features,
  imageUrl 
}) => {
  const defaultImage = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  // Type badges with styling
  const typeBadges = {
    'work-table': { label: 'Work Table', color: 'bg-[#F1F0FB] text-[#9b87f5]' },
    'lounge-area': { label: 'Lounge Area', color: 'bg-[#F2FCE2] text-green-700' },
    'meeting-room': { label: 'Meeting Room', color: 'bg-[#D3E4FD] text-blue-700' },
    'open-area': { label: 'Open Area', color: 'bg-[#FDE1D3] text-orange-700' }
  };
  
  const badge = typeBadges[type];

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={badge.color}>
            {badge.label}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p className="font-medium">{capacity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-medium">{area}</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-[#F1F0FB] rounded-full">
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="text-xs px-2 py-1 bg-[#F1F0FB] rounded-full">
                +{features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="main" className="w-full rounded-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const WorkplaceLibrary = () => {
  const navigate = useNavigate();
  
  // Sample workplace settings data
  const settings: SettingCardProps[] = [
    {
      type: 'work-table',
      title: 'Individual Work Station',
      description: 'Ergonomic desk setup for focused individual work with adjustable components.',
      features: [
        'Height-adjustable desk',
        'Ergonomic chair',
        'Task lighting',
        'Cable management'
      ],
      capacity: '1 person',
      area: '4-6 sq meters'
    },
    {
      type: 'lounge-area',
      title: 'Casual Collaboration Zone',
      description: 'Comfortable seating arrangement for informal meetings and relaxed work.',
      features: [
        'Comfortable sofas',
        'Coffee tables',
        'Power outlets',
        'Acoustic paneling'
      ],
      capacity: '4-8 people',
      area: '15-20 sq meters'
    },
    {
      type: 'meeting-room',
      title: 'Conference Room',
      description: 'Formal meeting space with presentation equipment for team discussions.',
      features: [
        'Conference table',
        'Ergonomic chairs',
        'Video conferencing system',
        'Digital whiteboard'
      ],
      capacity: '8-12 people',
      area: '25-30 sq meters'
    },
    {
      type: 'open-area',
      title: 'Collaborative Space',
      description: 'Multi-purpose open area for team activities and collaborative projects.',
      features: [
        'Modular furniture',
        'Whiteboard walls',
        'Flexible power solutions',
        'Mobile partitions'
      ],
      capacity: '10-20 people',
      area: '40-60 sq meters'
    }
  ];

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto bg-[#F6F6F7] px-4 py-8">
        <div className="container mx-auto">
          <H1 className="mb-8">Workplace Settings Library</H1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.map((setting, index) => (
              <SettingCard key={index} {...setting} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceLibrary;
