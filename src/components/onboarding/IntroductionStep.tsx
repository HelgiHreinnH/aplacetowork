
import React from 'react';
import { H2, H3 } from "@/components/ui/typography";
import { Inbox, ArrowDownToLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const IntroductionStep = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <H2 className="mb-2 text-center text-[#3f00ff]">Welcome to A Place to Work</H2>
      <p className="text-[#8E9196] mb-6 text-center">
        Your guide to discovering the perfect workplace setting
      </p>
      
      <Card className="w-full mb-6 overflow-hidden border-[#3f00ff]/20">
        <div className="p-6 bg-white">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-[#F1F0FB] rounded-full shadow-md">
              <Inbox size={32} className="text-[#3f00ff]" />
            </div>
          </div>
          
          <H3 className="text-center mb-4">How It Works</H3>
          
          <CardContent className="p-0">
            <div className="bg-[#F8F8FA] rounded-lg p-6 mb-4 shadow-sm border border-[#3f00ff]/10">
              <p className="text-center text-[#474562] mb-2">
                "This tool helps you discover and plan effective work environments by considering key factors like space, user capacity, and task types."
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <ArrowDownToLine size={24} className="text-[#3f00ff]" />
            </div>
            
            <div className="bg-[#F8F8FA] rounded-lg p-6 shadow-sm border border-[#3f00ff]/10">
              <p className="text-center text-[#474562]">
                "Whether you're designing a new office or optimizing an existing one, we provide inspiration and data-driven suggestions."
              </p>
            </div>
          </CardContent>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Explore workplace possibilities based on your specific needs
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntroductionStep;
