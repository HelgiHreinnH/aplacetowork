import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TitleContainer from '@/components/containers/TitleContainer';

const About = () => {
  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">About Workplace Interiors</h1>
          
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our mission is to help organizations create optimal workspaces that foster productivity, collaboration, and employee wellbeing. 
                  We believe that the right workplace environment can significantly impact how people work and interact with each other.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>The Workplace Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This application serves as a comprehensive library of different workplace interior settings typically found in modern office buildings. 
                  Each setting is carefully documented with images, specifications, and usage guidelines to help facility managers and HR professionals 
                  make informed decisions about their workspace designs.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F1F0FB] p-4 rounded-lg">
                    <h3 className="font-medium text-[#1A1F2C] mb-2">Work Tables</h3>
                    <p className="text-sm text-gray-600">Individual and shared work surfaces designed for focused tasks.</p>
                  </div>
                  <div className="bg-[#F1F0FB] p-4 rounded-lg">
                    <h3 className="font-medium text-[#1A1F2C] mb-2">Lounge Areas</h3>
                    <p className="text-sm text-gray-600">Comfortable spaces for relaxation, casual meetings, and breaks.</p>
                  </div>
                  <div className="bg-[#F1F0FB] p-4 rounded-lg">
                    <h3 className="font-medium text-[#1A1F2C] mb-2">Meeting Rooms</h3>
                    <p className="text-sm text-gray-600">Formal and informal spaces designed for group discussions and presentations.</p>
                  </div>
                  <div className="bg-[#F1F0FB] p-4 rounded-lg">
                    <h3 className="font-medium text-[#1A1F2C] mb-2">Open Areas</h3>
                    <p className="text-sm text-gray-600">Multi-purpose spaces that can be reconfigured for various activities and events.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>How to Use This Library</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Use the search feature to find facilities based on square meters, number of users, and activity type</li>
                  <li>Browse the complete catalog in the Overview section</li>
                  <li>Save your favorite facilities for quick access later</li>
                  <li>Click on facility cards to see detailed specifications and guidelines</li>
                  <li>Submit feedback if you can't find what you're looking for</li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> support@workplaceinteriors.com</p>
                  <p><strong>Phone:</strong> +45 12 34 56 78</p>
                  <p><strong>Address:</strong> Work Space Innovation Center, Copenhagen, Denmark</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default About;
