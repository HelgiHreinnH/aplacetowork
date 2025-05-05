
import React, { useState } from 'react';
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
import { Skeleton } from "@/components/ui/skeleton";

type Facility = Database['public']['Tables']['Facilities']['Row'];

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

  // Format the area info from square meters data
  const formatAreaInfo = (facility: Facility | null | undefined) => {
    if (!facility) return "Not available";
    
    if (facility["Approx. Square Meters"]) {
      return `${facility["Approx. Square Meters"]}`;
    } else if (facility["Sq M Min"] && facility["Sq M Max"]) {
      return `${facility["Sq M Min"]}-${facility["Sq M Max"]} m²`;
    } else {
      return "Not specified";
    }
  };

  // Format the capacity info from users data
  const formatCapacityInfo = (facility: Facility | null | undefined) => {
    if (!facility) return "Not available";
    
    if (facility["Approx. Users"]) {
      return facility["Approx. Users"];
    } else if (facility["Users Min"] && facility["Users Max"]) {
      return `${facility["Users Min"]}-${facility["Users Max"]} users`;
    } else {
      return "Not specified";
    }
  };

  // Extract features from amenities text
  const getFeaturesList = (facility: Facility | null | undefined) => {
    if (!facility || !facility["Amenities & Features"]) return [];
    
    // Try to split by commas, semicolons, or line breaks
    const features = facility["Amenities & Features"]
      .split(/[,;\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    return features.length > 0 ? features : ["Standard amenities"];
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex-shrink-0">
          <div className="flex mb-4 space-x-2 flex-wrap">
            <Button 
              variant={selectedArea === "workTable" ? "main" : "outline"}
              className="rounded-full text-xs mb-2"
              onClick={() => handleAreaClick("workTable")}
            >
              Work Table
            </Button>
            <Button 
              variant={selectedArea === "lounge" ? "main" : "outline"}
              className="rounded-full text-xs mb-2"
              onClick={() => handleAreaClick("lounge")}
            >
              Lounge Area
            </Button>
            <Button 
              variant={selectedArea === "meeting" ? "main" : "outline"}
              className="rounded-full text-xs mb-2"
              onClick={() => handleAreaClick("meeting")}
            >
              Meeting Room
            </Button>
            <Button 
              variant={selectedArea === "open" ? "main" : "outline"}
              className="rounded-full text-xs mb-2"
              onClick={() => handleAreaClick("open")}
            >
              Open Area
            </Button>
          </div>
        </div>
        
        <div className="flex-1 bg-[#F1F0FB] p-4 rounded-lg">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="mt-6">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3 mt-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error loading facility data</p>
              <p className="text-sm mt-1">Please try again later</p>
            </div>
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
                        Typical space: {formatAreaInfo(selectedFacility)}
                      </li>
                      <li>
                        Typical capacity: {formatCapacityInfo(selectedFacility)}
                      </li>
                      <li>
                        Best for: {selectedFacility["Purpose of the Facility"] || "Various activities"}
                      </li>
                    </ul>
                    
                    {getFeaturesList(selectedFacility).length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-1">Key features:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {getFeaturesList(selectedFacility).map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : !selectedArea ? (
                  <p>Click on any button above to learn more about different workplace settings.</p>
                ) : (
                  <p>No information available for the selected area. Please check the database for complete details.</p>
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
