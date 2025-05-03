
import React, { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

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
  
  // Map workplace types to facility search terms
  const facilityTypeMap: Record<string, string> = {
    "workTable": "Work Table",
    "lounge": "Lounge",
    "meeting": "Meeting Room",
    "open": "Open Area"
  };
  
  // Fetch facilities data from Supabase
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*');
      
      if (error) {
        console.error("Error fetching facilities:", error);
        throw error;
      }
      
      return data as Facility[];
    }
  });
  
  // Get facility data for the selected area
  const getSelectedFacilityData = () => {
    if (!selectedArea || !facilities) return null;
    
    const searchTerm = facilityTypeMap[selectedArea];
    return facilities.find(facility => 
      facility.Facility && facility.Facility.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const selectedFacility = getSelectedFacilityData();
  
  const handleAreaClick = (area: string) => {
    setSelectedArea(area === selectedArea ? null : area);
  };

  // Create hotspot descriptions from facilities data
  const getHotspotDescription = (type: string): string => {
    if (!facilities) return "Loading...";
    
    const searchTerm = facilityTypeMap[type];
    const facility = facilities.find(f => 
      f.Facility && f.Facility.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return facility?.Description || `Information about ${searchTerm}`;
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
                  description={getHotspotDescription("workTable")} 
                />
                
                <Hotspot 
                  x="80%" 
                  y="15%" 
                  label="Lounge Area" 
                  description={getHotspotDescription("lounge")} 
                />
                
                <Hotspot 
                  x="20%" 
                  y="75%" 
                  label="Meeting Room" 
                  description={getHotspotDescription("meeting")} 
                />
                
                <Hotspot 
                  x="75%" 
                  y="65%" 
                  label="Open Area" 
                  description={getHotspotDescription("open")} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-[#F1F0FB] p-4 rounded-lg">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading facility information...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error loading facility data</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">
                {selectedArea === "workTable" && "Work Tables"}
                {selectedArea === "lounge" && "Lounge Area"}
                {selectedArea === "meeting" && "Meeting Room"}
                {selectedArea === "open" && "Open Area"}
                {!selectedArea && "Select an Area"}
              </h3>
              
              <div className="text-sm text-gray-700">
                {selectedFacility ? (
                  <>
                    <p className="mb-2">{selectedFacility.Description || "No description available."}</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Typical space: {selectedFacility["Approx. Square Meters"] || 
                        `${selectedFacility["Sq M Min"] || '?'}-${selectedFacility["Sq M Max"] || '?'} m²`}
                      </li>
                      <li>
                        Best for: {selectedFacility["Purpose of the Facility"] || "Various activities"}
                      </li>
                      <li>
                        Features: {selectedFacility["Amenities & Features"] || "Standard workplace amenities"}
                      </li>
                    </ul>
                  </>
                ) : !selectedArea ? (
                  <p>Click on any area of the office diagram to learn more about different workplace settings.</p>
                ) : (
                  <p>No information available for the selected area.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeDiagram;
