
import React from 'react';
import { H2, H3 } from "@/components/ui/typography";
import { Inbox, ArrowDownToLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { designTokens } from '@/styles/design-tokens';

const IntroductionStep = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <H2 className="mb-8 text-center">Welcome to A Place to Work</H2>
      
      <Card className="w-full mb-8 overflow-hidden border-[#3f00ff]/20">
        <div className="bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF] p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white rounded-full shadow-md">
              <Inbox size={32} className="text-[#3f00ff]" />
            </div>
          </div>
          
          <H3 className="text-center mb-4">How It Works</H3>
          
          <CardContent className="p-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-4 shadow-sm border border-[#3f00ff]/10">
              <p className="text-center text-[#474562] mb-2">
                "This tool helps you discover and plan effective work environments by considering key factors like space, user capacity, and task types."
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <ArrowDownToLine size={24} className="text-[#3f00ff]" />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-[#3f00ff]/10">
              <p className="text-center text-[#474562]">
                "Whether you're designing a new office or optimizing an existing one, we provide inspiration and data-driven suggestions."
              </p>
            </div>
          </CardContent>
        </div>
        
        <div className="p-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-[#F1F0FB]">
              <p className="font-semibold text-[#3f00ff]">Work Tables</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F1F0FB]">
              <p className="font-semibold text-[#3f00ff]">Lounge Areas</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F1F0FB]">
              <p className="font-semibold text-[#3f00ff]">Meeting Rooms</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F1F0FB]">
              <p className="font-semibold text-[#3f00ff]">Open Areas</p>
            </div>
          </div>
        </div>
      </Card>
      
      <p className="text-sm text-center text-[#8E9196]">
        Continue to explore our app tour to learn more about the features
      </p>
    </div>
  );
};

export default IntroductionStep;
