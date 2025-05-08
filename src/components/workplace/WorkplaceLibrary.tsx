
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H2 } from "@/components/ui/typography";

interface WorkplaceSettingCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  values: {
    squareMeters?: string;
    users?: string;
    taskCategory?: string;
  };
}

const WorkplaceSettingCard: React.FC<WorkplaceSettingCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  values
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-[#3f00ff]">{title}</CardTitle>
        <CardDescription className="font-medium text-neutral-600">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {values.squareMeters && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {values.squareMeters} m²
            </Badge>
          )}
          {values.users && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {values.users} users
            </Badge>
          )}
          {values.taskCategory && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {values.taskCategory}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const WorkplaceLibrary: React.FC = () => {
  const workplaceSettings = [
    {
      title: "Work Table",
      subtitle: "Focused individual workspace",
      description: "Ergonomic desk setup designed for focused individual work, featuring adjustable furniture and personalized lighting to enhance productivity and comfort.",
      imageUrl: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//worktable.jpg",
      values: {
        squareMeters: "4-6",
        users: "1",
        taskCategory: "Focus Work"
      }
    },
    {
      title: "Lounge Area",
      subtitle: "Comfortable collaborative space",
      description: "Casual and comfortable seating arrangements designed for informal meetings, brainstorming sessions, and relaxed collaborative work in a welcoming environment.",
      imageUrl: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//lounge.jpg",
      values: {
        squareMeters: "15-25",
        users: "4-8",
        taskCategory: "Collaboration"
      }
    },
    {
      title: "Meeting Room",
      subtitle: "Formal discussion space",
      description: "Professional environment equipped with presentation technology and comfortable seating for structured meetings, client presentations, and team discussions.",
      imageUrl: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//meetingroom.jpg",
      values: {
        squareMeters: "20-40",
        users: "6-12",
        taskCategory: "Meetings"
      }
    },
    {
      title: "Open Area",
      subtitle: "Versatile multi-purpose space",
      description: "Flexible open space that can be reconfigured for various activities, from team gatherings and events to temporary project work requiring larger collaborative areas.",
      imageUrl: "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//openarea.jpg",
      values: {
        squareMeters: "40-100",
        users: "10-30",
        taskCategory: "Multi-purpose"
      }
    }
  ];

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <H2 className="text-center text-[#3f00ff] mb-2">Workplace Settings Library</H2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Explore different workplace interior settings for your office building. Find the perfect environment for various work activities and team needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workplaceSettings.map((setting, index) => (
          <WorkplaceSettingCard 
            key={index}
            title={setting.title}
            subtitle={setting.subtitle}
            description={setting.description}
            imageUrl={setting.imageUrl}
            values={setting.values}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkplaceLibrary;
