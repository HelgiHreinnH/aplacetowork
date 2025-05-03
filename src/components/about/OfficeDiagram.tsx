
import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface HotspotProps {
  x: string;
  y: string;
  label: string;
  description: string;
}

const Hotspot: React.FC<HotspotProps> = ({ x, y, label, description }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="absolute w-6 h-6 rounded-full bg-[#9b87f5] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
            style={{ left: x, top: y }}
          >
            <span className="text-xs font-bold">i</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-56">
            <h4 className="font-semibold mb-1">{label}</h4>
            <p className="text-xs">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OfficeDiagram = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  const handleAreaClick = (area: string) => {
    setSelectedArea(area === selectedArea ? null : area);
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex-shrink-0">
          <div className="flex mb-4 space-x-2">
            <Button 
              variant={selectedArea === "workTable" ? "main" : "outline"}
              className="rounded-full text-xs"
              onClick={() => handleAreaClick("workTable")}
            >
              Work Table
            </Button>
            <Button 
              variant={selectedArea === "lounge" ? "main" : "outline"}
              className="rounded-full text-xs"
              onClick={() => handleAreaClick("lounge")}
            >
              Lounge Area
            </Button>
            <Button 
              variant={selectedArea === "meeting" ? "main" : "outline"}
              className="rounded-full text-xs"
              onClick={() => handleAreaClick("meeting")}
            >
              Meeting Room
            </Button>
            <Button 
              variant={selectedArea === "open" ? "main" : "outline"}
              className="rounded-full text-xs"
              onClick={() => handleAreaClick("open")}
            >
              Open Area
            </Button>
          </div>
          
          <div className="relative w-full bg-[#F6F6F7] h-64 md:h-80 rounded-lg overflow-hidden border border-gray-200">
            {/* Simple office layout diagram */}
            <div className="absolute inset-0 p-4">
              {/* Base layout */}
              <div className="relative w-full h-full border border-gray-300 bg-white rounded">
                {/* Work Table Area */}
                <div 
                  className={`absolute left-[5%] top-[5%] w-[40%] h-[40%] border-2 rounded ${
                    selectedArea === "workTable" ? "border-[#9b87f5] bg-[#F1F0FB]" : "border-gray-300 bg-white"
                  } cursor-pointer transition-colors`}
                  onClick={() => handleAreaClick("workTable")}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">Work Tables</span>
                  </div>
                </div>
                
                {/* Lounge Area */}
                <div 
                  className={`absolute right-[5%] top-[5%] w-[25%] h-[25%] border-2 rounded ${
                    selectedArea === "lounge" ? "border-[#9b87f5] bg-[#F1F0FB]" : "border-gray-300 bg-white"
                  } cursor-pointer transition-colors`}
                  onClick={() => handleAreaClick("lounge")}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">Lounge</span>
                  </div>
                </div>
                
                {/* Meeting Room */}
                <div 
                  className={`absolute left-[5%] bottom-[5%] w-[30%] h-[30%] border-2 rounded ${
                    selectedArea === "meeting" ? "border-[#9b87f5] bg-[#F1F0FB]" : "border-gray-300 bg-white"
                  } cursor-pointer transition-colors`}
                  onClick={() => handleAreaClick("meeting")}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">Meeting Room</span>
                  </div>
                </div>
                
                {/* Open Area */}
                <div 
                  className={`absolute right-[5%] bottom-[5%] w-[40%] h-[50%] border-2 rounded ${
                    selectedArea === "open" ? "border-[#9b87f5] bg-[#F1F0FB]" : "border-gray-300 bg-white"
                  } cursor-pointer transition-colors`}
                  onClick={() => handleAreaClick("open")}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">Open Area</span>
                  </div>
                </div>
                
                {/* Information hotspots */}
                <Hotspot 
                  x="25%" 
                  y="25%" 
                  label="Work Tables" 
                  description="Individual or shared desks optimized for focused work." 
                />
                
                <Hotspot 
                  x="80%" 
                  y="15%" 
                  label="Lounge Area" 
                  description="Comfortable seating for informal meetings and breaks." 
                />
                
                <Hotspot 
                  x="20%" 
                  y="75%" 
                  label="Meeting Room" 
                  description="Enclosed space for presentations and discussions." 
                />
                
                <Hotspot 
                  x="75%" 
                  y="65%" 
                  label="Open Area" 
                  description="Flexible space for collaboration and events." 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-[#F1F0FB] p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {selectedArea === "workTable" && "Work Tables"}
            {selectedArea === "lounge" && "Lounge Area"}
            {selectedArea === "meeting" && "Meeting Room"}
            {selectedArea === "open" && "Open Area"}
            {!selectedArea && "Select an Area"}
          </h3>
          
          <div className="text-sm text-gray-700">
            {selectedArea === "workTable" && (
              <>
                <p className="mb-2">Work tables provide dedicated spaces for employees to focus on individual tasks.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Typical space: 4-8 m² per person</li>
                  <li>Best for: Concentrated work, detailed tasks</li>
                  <li>Features: Good lighting, ergonomic seating</li>
                </ul>
              </>
            )}
            
            {selectedArea === "lounge" && (
              <>
                <p className="mb-2">Lounge areas create comfortable spaces for relaxation, casual meetings, and breaks.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Typical space: 10-15 m² total</li>
                  <li>Best for: Informal discussions, breaks</li>
                  <li>Features: Comfortable seating, coffee tables</li>
                </ul>
              </>
            )}
            
            {selectedArea === "meeting" && (
              <>
                <p className="mb-2">Meeting rooms provide enclosed spaces for formal discussions and presentations.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Typical space: 2-3 m² per person</li>
                  <li>Best for: Team meetings, client presentations</li>
                  <li>Features: Conference table, display screen</li>
                </ul>
              </>
            )}
            
            {selectedArea === "open" && (
              <>
                <p className="mb-2">Open areas offer flexible multi-purpose spaces for various activities and events.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Typical space: 3-5 m² per person</li>
                  <li>Best for: Collaboration, workshops, events</li>
                  <li>Features: Movable furniture, whiteboard walls</li>
                </ul>
              </>
            )}
            
            {!selectedArea && (
              <p>Click on any area of the office diagram to learn more about different workplace settings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeDiagram;
