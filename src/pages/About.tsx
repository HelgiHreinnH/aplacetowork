
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TitleContainer from '@/components/containers/TitleContainer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H1, H2, H3, Bulletin, Note } from "@/components/ui/typography";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import SquareMetersSlider from '@/components/sliders/SquareMetersSlider';
import UsersSlider from '@/components/sliders/UsersSlider';
import TaskCategorySlider from '@/components/sliders/TaskCategorySlider';
import OfficeDiagram from '@/components/about/OfficeDiagram';
import { Info, CheckCircle, CirclePlus, CircleHelp, SlidersHorizontal } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const [sqmValue, setSqmValue] = useState([40]);
  const [usersValue, setUsersValue] = useState([8]);
  const [taskValue, setTaskValue] = useState([0]);
  const [openParam, setOpenParam] = useState<string | null>(null);
  
  const toggleParam = (param: string) => {
    setOpenParam(openParam === param ? null : param);
  };

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <H1 className="mb-2">About Workplace Interiors</H1>
            <p className="text-gray-600 text-lg">
              Your guide to creating optimal workspaces that inspire productivity and collaboration.
            </p>
          </div>
          
          {/* Interactive Introduction with Tabs */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription className="text-gray-600">
                Helping you find the perfect workplace setting for your team's needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Our mission is to inspire organizations to create optimal workspaces that foster productivity, collaboration, and employee wellbeing with our comprehensive database.
              </p>
              
              <Tabs defaultValue="productivity" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
                  <TabsTrigger value="size">Find the Right Size</TabsTrigger>
                  <TabsTrigger value="productivity">Boost Productivity</TabsTrigger>
                  <TabsTrigger value="collaboration">Support Collaboration</TabsTrigger>
                </TabsList>
                <TabsContent value="size" className="mt-4 p-4 bg-[#E3F0FF] rounded-md">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 flex items-center justify-center bg-[#D3E4FD] rounded-full">
                      <SlidersHorizontal size={36} className="text-[#3185fc] md:text-6xl" />
                    </div>
                    <div>
                      <H3>Find the Perfect Space Dimensions</H3>
                      <p className="text-gray-700 mt-2">
                        Our tool matches your spatial requirements with optimal workplace settings. Whether you have a compact area or a spacious floor, we'll help you make the most efficient use of every square meter.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="productivity" className="mt-4 p-4 bg-[#E3F0FF] rounded-md">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 flex items-center justify-center bg-[#CCEAFF] rounded-full">
                      <CheckCircle size={36} className="text-[#3f00ff] md:text-6xl" />
                    </div>
                    <div>
                      <H3>Optimize for Maximum Productivity</H3>
                      <p className="text-gray-700 mt-2">
                        Different tasks require different environments. Our database helps you create spaces specifically designed to enhance focus, minimize distractions, and boost individual and team productivity.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="collaboration" className="mt-4 p-4 bg-[#E3F0FF] rounded-md">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 flex items-center justify-center bg-[#D3E4FD] rounded-full">
                      <CirclePlus size={36} className="text-[#0EA5E9] md:text-6xl" />
                    </div>
                    <div>
                      <H3>Foster Team Collaboration</H3>
                      <p className="text-gray-700 mt-2">
                        Create spaces where teams can come together effectively. Our recommendations help you design collaborative environments that encourage creativity, communication, and innovation among team members.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Interactive Office Diagram */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>Explore Workplace Settings</CardTitle>
              <CardDescription className="text-gray-600">
                Click on different areas to learn about each workplace setting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OfficeDiagram />
            </CardContent>
          </Card>
          
          {/* Parameters Section with Interactive Buttons */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>How We Match You with the Perfect Space</CardTitle>
              <CardDescription className="text-gray-600">
                Explore the three key parameters that drive our recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Collapsible
                  open={openParam === 'space'}
                  onOpenChange={() => toggleParam('space')}
                  className="border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between rounded-none border-b p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#E3F0FF] flex items-center justify-center">
                          <span className="text-[#3185fc] font-bold">1</span>
                        </div>
                        <span className="text-lg font-semibold">Available Space (Square Meters)</span>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-6 bg-[#F6F6F7]">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="mb-4">
                          The amount of space available significantly impacts what workplace settings are possible. Our tool helps you find options that maximize your available square meters.
                        </p>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <SquareMetersSlider
                            value={sqmValue}
                            onChange={setSqmValue}
                            showInfo={true}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-[#D3E4FD] rounded-lg flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-3xl md:text-4xl font-bold text-[#3185fc]">{sqmValue[0]}m²</p>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute bottom-2 right-2"
                                >
                                  <Info size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[200px] md:max-w-none">
                                <p className="max-w-56">Each workplace setting has minimum space requirements to function effectively.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible
                  open={openParam === 'users'}
                  onOpenChange={() => toggleParam('users')}
                  className="border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between rounded-none border-b p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#E3F0FF] flex items-center justify-center">
                          <span className="text-[#3185fc] font-bold">2</span>
                        </div>
                        <span className="text-lg font-semibold">Number of Employees</span>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-6 bg-[#F6F6F7]">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="mb-4">
                          The number of people using a space determines capacity needs and layout options. We'll help you find settings that accommodate your team comfortably.
                        </p>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <UsersSlider
                            value={usersValue}
                            onChange={setUsersValue}
                            showInfo={true}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-[#CCEAFF] rounded-lg flex items-center justify-center">
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-3xl md:text-4xl font-bold text-[#3f00ff]">{usersValue[0]}</p>
                            <p className="text-md md:text-lg text-[#3f00ff]">Users</p>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute bottom-2 right-2"
                                >
                                  <Info size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[200px] md:max-w-none">
                                <p className="max-w-56">Different workplace settings support different numbers of users effectively.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible
                  open={openParam === 'tasks'}
                  onOpenChange={() => toggleParam('tasks')}
                  className="border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between rounded-none border-b p-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#E3F0FF] flex items-center justify-center">
                          <span className="text-[#3185fc] font-bold">3</span>
                        </div>
                        <span className="text-lg font-semibold">Task Type (Focused vs. Collaborative)</span>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-6 bg-[#F6F6F7]">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="mb-4">
                          Different tasks require different environments. We help you balance between quiet, focused work areas and interactive collaborative spaces.
                        </p>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <TaskCategorySlider
                            value={taskValue}
                            onChange={setTaskValue}
                            showInfo={true}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-[#D3E4FD] rounded-lg flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-sm md:text-xl font-bold text-[#3185fc] text-center max-w-24 md:max-w-40 px-2">
                              {taskValue[0] < -50 ? "Focused Individual Work" : 
                               taskValue[0] > 50 ? "Team Collaboration" : 
                               "Balanced Activities"}
                            </p>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute bottom-2 right-2"
                                >
                                  <Info size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[200px] md:max-w-none">
                                <p className="max-w-56">The type of work activity determines the optimal environmental conditions.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
          
          {/* Step-by-Step Guide */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>How to Use This Library</CardTitle>
              <CardDescription className="text-gray-600">
                A simple step-by-step guide to finding your perfect workplace setup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative p-5 bg-[#E3F0FF] rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3185fc] flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div>
                      <H3>Search for Facilities</H3>
                      <p className="mt-2">Use the search feature to find workplace settings based on your specific requirements:</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-md shadow-sm flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#3185fc] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">m²</span>
                          </div>
                          <span className="text-sm">Square meters</span>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#3f00ff] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">#</span>
                          </div>
                          <span className="text-sm">Number of users</span>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#3185fc] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-sm">Activity type</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                        >
                          <CircleHelp size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-[200px] md:max-w-none">
                        <p>Use the sliders to specify your exact requirements</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="relative p-5 bg-[#E3F0FF] rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3185fc] flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <div>
                      <H3>Browse Recommended Settings</H3>
                      <p className="mt-2">Explore the list of settings that match your criteria. Each setting includes:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Images of the setting</li>
                        <li>Space requirements</li>
                        <li>Capacity information</li>
                        <li>Recommended activities</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-5 bg-[#E3F0FF] rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3185fc] flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                    <div>
                      <H3>Save & Compare Favorites</H3>
                      <p className="mt-2">Click the save button on settings you like. Access your favorites later to compare different options.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-5 bg-[#E3F0FF] rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3185fc] flex items-center justify-center text-white font-bold text-xl">
                      4
                    </div>
                    <div>
                      <H3>Get Detailed Specifications</H3>
                      <p className="mt-2">Click on any setting to view comprehensive details, implementation guidelines, and best practices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Example Use Cases */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>Example Scenarios</CardTitle>
              <CardDescription className="text-gray-600">
                See how different teams have used our tool to optimize their workspaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-4 sm:p-6 bg-[#E3F0FF] rounded-lg">
                      <H3>Creative Agency Team</H3>
                      <div className="mt-3 flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-[#D3E4FD] rounded-lg flex items-center justify-center mx-auto md:mx-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0EA5E9] flex items-center justify-center">
                            <span className="text-white font-bold">CASE 1</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Problem:</p>
                          <p className="text-gray-700 mb-2">A 15-person creative team needed a space that balanced focused design work with collaborative brainstorming.</p>
                          
                          <p className="font-semibold">Solution:</p>
                          <p className="text-gray-700 mb-2">Using our tool, they identified a combination of work tables and a flexible lounge area that fit their 80m² space.</p>
                          
                          <p className="font-semibold">Result:</p>
                          <p className="text-gray-700">Productivity improved by 30% and team members reported higher satisfaction with their workspace.</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 sm:p-6 bg-[#E3F0FF] rounded-lg">
                      <H3>Software Development Startup</H3>
                      <div className="mt-3 flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-[#CCEAFF] rounded-lg flex items-center justify-center mx-auto md:mx-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3f00ff] flex items-center justify-center">
                            <span className="text-white font-bold">CASE 2</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Problem:</p>
                          <p className="text-gray-700 mb-2">A growing startup with 8 developers needed to maximize their limited 40m² office for coding and daily standups.</p>
                          
                          <p className="font-semibold">Solution:</p>
                          <p className="text-gray-700 mb-2">Our tool recommended an open area with movable furniture and acoustic solutions for focused work.</p>
                          
                          <p className="font-semibold">Result:</p>
                          <p className="text-gray-700">The team was able to accommodate growth while maintaining productivity in their limited space.</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-4 sm:p-6 bg-[#E3F0FF] rounded-lg">
                      <H3>Financial Services Team</H3>
                      <div className="mt-3 flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-[#D3E4FD] rounded-lg flex items-center justify-center mx-auto md:mx-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3185fc] flex items-center justify-center">
                            <span className="text-white font-bold">CASE 3</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Problem:</p>
                          <p className="text-gray-700 mb-2">A team of 12 financial analysts needed a space that prioritized focused work with occasional client meetings.</p>
                          
                          <p className="font-semibold">Solution:</p>
                          <p className="text-gray-700 mb-2">The tool suggested work tables with privacy screens and a separate meeting room in their 65m² space.</p>
                          
                          <p className="font-semibold">Result:</p>
                          <p className="text-gray-700">Increased concentration and client satisfaction with the professional meeting environment.</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
                  <CarouselNext className="relative static translate-y-0 right-0" />
                </div>
              </Carousel>
            </CardContent>
          </Card>
          
          {/* FAQ Accordion */}
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate are the space recommendations?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Our recommendations are based on industry standards and best practices in workplace design. 
                      We source data from published research and workplace design reports to ensure accuracy. 
                      However, specific needs may vary based on your unique organizational culture and work styles.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I combine different workplace settings?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Absolutely! In fact, most modern workplaces benefit from a mix of different settings. 
                      Our tool can help you determine the optimal ratio of focused work areas to collaborative 
                      spaces based on your team's needs and available square footage.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How often is the database updated?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      We continuously update our database with the latest research and workplace design insights. 
                      Our team regularly reviews new publications and incorporates emerging trends in workplace 
                      optimization to ensure our recommendations reflect current best practices.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What if my space doesn't match any recommendations?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      If you have unique requirements or constraints, please use our feedback form to 
                      request a custom consultation. Our team can provide tailored recommendations for 
                      special cases not fully covered by our automated matching system.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          {/* Contact and CTA */}
          <Card className="shadow-md mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 bg-[#E3F0FF]">
                <CardTitle className="mb-4">Get In Touch</CardTitle>
                <p className="text-gray-700 mb-4">
                  Have questions or need help with your workplace design project?
                </p>
                <div className="space-y-4">
                  <p className="text-gray-700 flex items-center gap-2">
                    <span className="font-semibold">Email:</span> 
                    <span>support@aplacetowork.dk</span>
                  </p>
                  <Note>
                    Our team typically responds within 24 business hours.
                  </Note>
                </div>
              </div>
              <div className="flex-1 p-6 bg-white flex flex-col justify-center">
                <CardTitle className="mb-4">Ready to Find Your Ideal Workspace?</CardTitle>
                <p className="text-gray-700 mb-6">
                  Start exploring our extensive database of workplace settings tailored to your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/search')}
                    variant="main"
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Start searching now
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Send us feedback
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                At A Place to Work, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our workplace interior library service.
              </p>
              
              <h3 className="font-semibold mb-2">Information We Collect</h3>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li>Email address and authentication data for account creation and management</li>
                <li>Profile information such as username and company name</li>
                <li>Usage data including facility preferences and favorites</li>
                <li>Application interaction data to improve user experience</li>
                <li>Device information and browser type for service optimization</li>
              </ul>
              
              <h3 className="font-semibold mb-2">How We Use Your Information</h3>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li>To provide and maintain our workplace interior library service</li>
                <li>To personalize your experience with saved preferences and favorites</li>
                <li>To authenticate and secure your account</li>
                <li>To communicate important updates about our service</li>
                <li>To analyze usage patterns and improve our features</li>
              </ul>
              
              <p className="text-gray-700">
                <strong>Last Updated:</strong> April 21, 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default About;
