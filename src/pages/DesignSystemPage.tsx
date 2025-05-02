
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { H1, H2, H3, H4, H5, Note, Bulletin } from "@/components/ui/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FontDemo } from '@/components/design/FontDemo';
import { DesignSystem } from '@/components/design/DesignSystem';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacilityDetails from "@/components/FacilityDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Activity, Package, FileText, Laptop, Check, AlertCircle, Info } from 'lucide-react';
import InfoSection from "@/components/InfoSection";

const DesignSystemPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <H1>Workspace Interior Design System</H1>
        <p className="text-muted-foreground">
          A comprehensive guide to our UI components, styles, and design patterns.
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="colors">Colors & Typography</TabsTrigger>
          <TabsTrigger value="info">Info Containers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <DesignSystem />
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-10">
          <section>
            <H2>Typography</H2>
            <div className="space-y-4 mt-4">
              <H1>Heading 1</H1>
              <H2>Heading 2</H2>
              <H3>Heading 3</H3>
              <H4>Heading 4</H4>
              <H5>Heading 5</H5>
              <p className="text-base">Regular paragraph text</p>
              <p className="text-sm text-muted-foreground">Small text with muted color</p>
              <Note>This is a note component used for important information</Note>
              <div className="space-y-2">
                <Bulletin>This is a bulletin point with custom styling</Bulletin>
                <Bulletin>Another bulletin point example</Bulletin>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <H2>Buttons</H2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-2">
                <Button variant="main">Main Button</Button>
                <p className="text-xs text-muted-foreground">variant="main"</p>
              </div>
              <div className="space-y-2">
                <Button variant="secondary">Secondary</Button>
                <p className="text-xs text-muted-foreground">variant="secondary"</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline">Outline</Button>
                <p className="text-xs text-muted-foreground">variant="outline"</p>
              </div>
              <div className="space-y-2">
                <Button variant="ghost">Ghost</Button>
                <p className="text-xs text-muted-foreground">variant="ghost"</p>
              </div>
              <div className="space-y-2">
                <Button variant="link">Link</Button>
                <p className="text-xs text-muted-foreground">variant="link"</p>
              </div>
              <div className="space-y-2">
                <Button variant="alert">Alert</Button>
                <p className="text-xs text-muted-foreground">variant="alert"</p>
              </div>
              <div className="space-y-2">
                <Button variant="destructive">Destructive</Button>
                <p className="text-xs text-muted-foreground">variant="destructive"</p>
              </div>
              <div className="space-y-2">
                <Button disabled>Disabled</Button>
                <p className="text-xs text-muted-foreground">disabled</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="space-y-2">
                <Button size="sm">Small</Button>
                <p className="text-xs text-muted-foreground">size="sm"</p>
              </div>
              <div className="space-y-2">
                <Button>Default</Button>
                <p className="text-xs text-muted-foreground">default size</p>
              </div>
              <div className="space-y-2">
                <Button size="lg">Large</Button>
                <p className="text-xs text-muted-foreground">size="lg"</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <Button className="w-full">Full Width Button</Button>
                <p className="text-xs text-muted-foreground mt-2">className="w-full"</p>
              </div>
              <div>
                <Button variant="main" className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Button with Icon</span>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">With leading icon</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <H2>Information Blocks</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-[#F1F0FB] p-4 rounded-md">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Task Category</h3>
                <p className="text-[15px] text-primary">Collaborative</p>
              </div>
              
              <div className="bg-[#F1F0FB] p-4 rounded-md">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Notes</h3>
                <p className="text-[15px] text-muted-foreground">Ideal for group discussions and brainstorming sessions</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Information Section Title</h3>
                <p className="text-gray-600">Content for information section displayed in facility details</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <H2>Alerts</H2>
            <div className="space-y-4 mt-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an information alert to notify users about something important.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is an error alert to warn users about a problem.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <Separator />

          <section>
            <H2>Accordion Components</H2>
            <div className="mt-4">
              <FacilityDetails 
                purpose="Example purpose text to demonstrate the accordion component"
                activities="Example activities text"
                amenities="Example amenities information"
                etiquette="Example guidelines text"
                technology="Example technology specifications"
              />
            </div>
          </section>

          <Separator />

          <section>
            <H2>Avatars</H2>
            <div className="flex items-center gap-4 mt-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarFallback className="bg-primary text-white">WI</AvatarFallback>
              </Avatar>
              
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </section>
        </TabsContent>

        {/* Cards Tab */}
        <TabsContent value="cards" className="space-y-8">
          <section>
            <H2>Card Styles</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>Simple card with title and description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the standard card component with basic styling.</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">Action</Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="bg-[#F1F0FB] border-b">
                  <CardTitle>Styled Header Card</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p>Card with a styled header and custom background.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="main">Submit</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src="https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png"
                    alt="Facility"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Card with Image</CardTitle>
                  <CardDescription>Card with image and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] text-muted-foreground">Square Meters</span>
                      <span className="text-[15px] font-medium text-[#F97316]">30 m²</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] text-muted-foreground">Users</span>
                      <span className="text-[15px] font-medium">4-6</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="main" className="w-full">View Details</Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader className="flex-none py-4 px-6 border-b bg-[#F1F0FB]">
                  <CardTitle className="text-[22px] font-bold tracking-tight line-clamp-1">
                    Card Back Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4 p-6">
                  <div className="bg-[#F1F0FB] p-3 rounded-md">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Category</h3>
                    <p className="text-[15px] text-primary line-clamp-1">Example Category</p>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 rounded-xl p-2">
                    <div className="text-center mb-1">
                      <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">Details Section</h2>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm">Details content would appear here</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F1F0FB] p-3 rounded-md">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Notes</h3>
                    <p className="text-[15px] text-muted-foreground line-clamp-2">Additional notes about this item</p>
                  </div>
                  
                  <CardFooter className="mt-auto p-0">
                    <Button variant="main" className="w-full py-4 px-6 rounded-md text-[15px] font-medium uppercase">
                      Back to Front
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        {/* Colors & Typography Tab */}
        <TabsContent value="colors">
          <FontDemo />
        </TabsContent>

        {/* New Info Containers Tab */}
        <TabsContent value="info" className="space-y-8">
          <section>
            <H2>Info Section Components</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <H3>Standard Info Section</H3>
                <InfoSection 
                  title="Category" 
                  content="Collaborative Space"
                />
                <InfoSection 
                  title="Notes" 
                  content="Ideal for team meetings and collaborative sessions"
                />
                <InfoSection 
                  title="Square Meters" 
                  content="35 m²"
                />
              </div>
              
              <div className="space-y-4">
                <H3>Info Container Examples</H3>
                <div className="bg-[#F1F0FB] p-3 rounded-md">
                  <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">
                    Task Category
                  </H5>
                  <p className="text-sm font-sans font-semibold text-primary line-clamp-1">
                    Collaborative Work
                  </p>
                </div>
                
                <div className="bg-[#F1F0FB] p-3 rounded-md">
                  <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">
                    Room Capacity
                  </H5>
                  <p className="text-sm font-sans font-semibold text-gray-600 line-clamp-1">
                    8-12 people
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <Separator />
          
          <section>
            <H2>Card Back Information Layout</H2>
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto">
              <div className="space-y-4">
                <div className="bg-[#F1F0FB] p-3 rounded-md">
                  <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">
                    Category
                  </H5>
                  <p className="text-sm font-sans font-semibold text-primary">
                    Meeting Room
                  </p>
                </div>
                
                <div className="flex-1">
                  <FacilityDetails
                    purpose="Designed for team meetings, presentations, and collaborative sessions"
                    activities="Team meetings, client presentations, video conferences, workshops"
                    amenities="75-inch display, video conferencing system, whiteboard wall, adjustable lighting"
                    etiquette="Clean after use, no food allowed, maintain quiet in surrounding areas"
                    technology="Built-in AV system, wireless presentation capabilities, high-speed internet"
                  />
                </div>
                
                <div className="bg-[#F1F0FB] p-3 rounded-md">
                  <H5 className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-normal">
                    Notes
                  </H5>
                  <p className="text-sm font-sans font-semibold text-muted-foreground line-clamp-2">
                    Booking required for sessions longer than 1 hour. Available Monday-Friday, 8am-6pm.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignSystemPage;
