
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { H2 } from '@/components/ui/typography';

interface WorkplaceSettingProps {
  title: string;
  description: string;
  imageUrl?: string;
  features: string[];
  capacity?: string;
  area?: string;
  type: 'work-table' | 'lounge-area' | 'meeting-room' | 'open-area';
}

const WorkplaceSetting: React.FC<WorkplaceSettingProps> = ({
  title,
  description,
  imageUrl,
  features,
  capacity,
  area,
  type
}) => {
  const typeColorMap = {
    'work-table': 'bg-blue-100 text-blue-800',
    'lounge-area': 'bg-purple-100 text-purple-800',
    'meeting-room': 'bg-green-100 text-green-800',
    'open-area': 'bg-amber-100 text-amber-800'
  };

  const typeColor = typeColorMap[type];
  
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-sans">No image available</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={typeColor}>
            {type.replace('-', ' ')}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <h3 className="text-xl font-display font-semibold">{title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="mb-4 text-gray-600 font-sans">{description}</p>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {capacity && (
            <div>
              <p className="text-xs text-gray-500 font-sans">Capacity</p>
              <p className="font-sans">{capacity}</p>
            </div>
          )}
          {area && (
            <div>
              <p className="text-xs text-gray-500 font-sans">Area</p>
              <p className="font-sans">{area}</p>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2 font-sans">Features:</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm flex items-start gap-2 font-sans">
                <span className="text-[#9b87f5] mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <p className="text-sm text-gray-500 font-sans">
          See more details for complete specifications
        </p>
      </CardFooter>
    </Card>
  );
};

export default function WorkplaceSettings() {
  const settings = [
    {
      type: 'work-table' as const,
      title: 'Individual Work Station',
      description: 'Ergonomic desk setup for focused individual work with adjustable components.',
      features: [
        'Height-adjustable desk',
        'Ergonomic chair',
        'Task lighting',
        'Cable management',
        'Monitor arm'
      ],
      capacity: '1 person',
      area: '4-6 sq meters'
    },
    {
      type: 'lounge-area' as const,
      title: 'Casual Collaboration Zone',
      description: 'Comfortable seating arrangement for informal meetings and relaxed work.',
      features: [
        'Comfortable sofas',
        'Coffee tables',
        'Power outlets',
        'Acoustic paneling',
        'Ambient lighting'
      ],
      capacity: '4-8 people',
      area: '15-20 sq meters'
    },
    {
      type: 'meeting-room' as const,
      title: 'Conference Room',
      description: 'Formal meeting space with presentation equipment for team discussions.',
      features: [
        'Conference table',
        'Ergonomic chairs',
        'Video conferencing system',
        'Digital whiteboard',
        'Sound insulation'
      ],
      capacity: '8-12 people',
      area: '25-30 sq meters'
    },
    {
      type: 'open-area' as const,
      title: 'Collaborative Space',
      description: 'Multi-purpose open area for team activities and collaborative projects.',
      features: [
        'Modular furniture',
        'Whiteboard walls',
        'Flexible power solutions',
        'Mobile partitions',
        'Storage units'
      ],
      capacity: '10-20 people',
      area: '40-60 sq meters'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <H2 className="mb-6">Workplace Interior Settings</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settings.map((setting, index) => (
          <WorkplaceSetting 
            key={index}
            {...setting}
          />
        ))}
      </div>
    </div>
  );
}
