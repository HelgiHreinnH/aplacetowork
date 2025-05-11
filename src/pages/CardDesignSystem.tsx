
import React, { useState } from 'react';
import { H1, H2, H3, H4 } from '@/components/ui/typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardFront from '@/components/CardFront';
import CardBack from '@/components/CardBack';
import FlippableCard from '@/components/Card';
import { SettingCard } from '@/components/design-system/SettingCard';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import TitleContainer from '@/components/containers/TitleContainer';
import ColorPalette from '@/components/design-system/ColorPalette';
import CardVariants from '@/components/design-system/CardVariants';

const CardDesignSystem = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample facility data for demonstration
  const sampleFacility = {
    "Facility": "Meeting Room A",
    "display_title": "Meeting Room A",
    "Subtitle": "Collaborative Space",
    "Description": "A modern meeting room designed for team collaboration and presentations. The space features state-of-the-art technology and flexible furniture arrangements to accommodate various meeting styles and group sizes.",
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
  };

  const workplaceSettings = [
    {
      type: 'work-table' as const,
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
      type: 'lounge-area' as const,
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
    }
  ];

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto bg-[#F6F6F7] p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <H1>Card Design System</H1>
            <p className="text-muted-foreground mt-2">
              A comprehensive overview of all card components used in the application
            </p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="base">Base Cards</TabsTrigger>
              <TabsTrigger value="settings">Setting Cards</TabsTrigger>
              <TabsTrigger value="flippable">Flippable Cards</TabsTrigger>
              <TabsTrigger value="variants">Card Variants</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <section>
                <H2 className="mb-4">Card Design System Overview</H2>
                <p className="max-w-3xl mb-6">
                  Our card system provides consistent, reusable components for displaying workplace settings
                  and facility information. The design system includes various card types optimized for
                  different use cases while maintaining a cohesive visual language.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Base Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Core card components with consistent styling
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveTab("base")} 
                        className="w-full"
                      >
                        View Base Cards
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Setting Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cards displaying workplace setting information
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveTab("settings")} 
                        className="w-full"
                      >
                        View Setting Cards
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Flippable Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Interactive cards with front and back views
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveTab("flippable")} 
                        className="w-full"
                      >
                        View Flippable Cards
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Card Variants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Different card styles for specific contexts
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveTab("variants")} 
                        className="w-full"
                      >
                        View Card Variants
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="mt-8">
                  <H3 className="mb-4">Color Palette</H3>
                  <ColorPalette />
                </div>
              </section>
            </TabsContent>
            
            {/* Base Cards Tab */}
            <TabsContent value="base" className="space-y-8">
              <section>
                <H2 className="mb-4">Base Cards</H2>
                <p className="max-w-3xl mb-6">
                  These are the foundational card components from shadcn/ui that serve as building blocks for our 
                  more specialized card types.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <H4 className="mb-4">Standard Card</H4>
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description providing additional context</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>This is the main content area of the card where most information is displayed.</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Submit</Button>
                      </CardFooter>
                    </Card>
                    
                    <div className="mt-4 text-sm">
                      <p className="font-mono bg-slate-100 p-2 rounded-md">
                        {'<Card>'}<br />
                        {'  <CardHeader>'}<br />
                        {'    <CardTitle>Card Title</CardTitle>'}<br />
                        {'    <CardDescription>Card description...</CardDescription>'}<br />
                        {'  </CardHeader>'}<br />
                        {'  <CardContent>Content...</CardContent>'}<br />
                        {'  <CardFooter>Footer...</CardFooter>'}<br />
                        {'</Card>'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <H4 className="mb-4">Compact Card</H4>
                    <Card className="overflow-hidden">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Compact Card</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm">A more compact card layout with less padding and smaller text.</p>
                      </CardContent>
                      <CardFooter className="p-4 flex justify-end">
                        <Button size="sm">Action</Button>
                      </CardFooter>
                    </Card>
                    
                    <div className="mt-4 text-sm">
                      <p className="font-mono bg-slate-100 p-2 rounded-md">
                        {'<Card className="overflow-hidden">'}<br />
                        {'  <CardHeader className="p-4">'}<br />
                        {'    <CardTitle className="text-lg">Compact Card</CardTitle>'}<br />
                        {'  </CardHeader>'}<br />
                        {'  <CardContent className="p-4 pt-0">Content...</CardContent>'}<br />
                        {'  <CardFooter className="p-4">Footer...</CardFooter>'}<br />
                        {'</Card>'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            {/* Setting Cards Tab */}
            <TabsContent value="settings" className="space-y-8">
              <section>
                <H2 className="mb-4">Setting Cards</H2>
                <p className="max-w-3xl mb-6">
                  Cards designed specifically for displaying workplace settings in the library. 
                  These feature type badges, capacity information, and key features.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workplaceSettings.map((setting, index) => (
                    <div key={index} className="flex flex-col">
                      <SettingCard {...setting} />
                      <div className="mt-4 text-sm">
                        <p className="font-semibold">Component: SettingCard</p>
                        <p className="text-muted-foreground">Type: {setting.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>
            
            {/* Flippable Cards Tab */}
            <TabsContent value="flippable" className="space-y-8">
              <section>
                <H2 className="mb-4">Flippable Cards</H2>
                <p className="max-w-3xl mb-6">
                  Interactive cards featuring front and back views. These cards provide a compact initial 
                  presentation with the ability to reveal more detailed information.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <H4 className="mb-4">Front View</H4>
                    <div className="h-[500px]">
                      <CardFront {...sampleFacility} />
                    </div>
                  </div>
                  
                  <div>
                    <H4 className="mb-4">Back View</H4>
                    <div className="h-[500px]">
                      <CardBack 
                        {...sampleFacility}
                        imageUrl="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <H4 className="mb-4">Flippable Card</H4>
                    <p className="text-sm text-muted-foreground mb-4">Click the card to flip between views</p>
                    <div className="h-[500px]">
                      <FlippableCard {...sampleFacility} />
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            {/* Card Variants Tab */}
            <TabsContent value="variants" className="space-y-8">
              <CardVariants />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CardDesignSystem;
