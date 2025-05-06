
import React, { useState } from 'react';
import LoadingSpinner from "@/components/overview/LoadingSpinner";
import SliderForm from "@/components/SliderForm";
import type { Database } from '@/integrations/supabase/types';
import { Info } from "lucide-react";
import { H5 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface InfoContainerProps {
  isLoading: boolean;
  error: Error | null;
  facilities: Facility[] | undefined;
  onSearch: () => void;
}

const InfoContainer = ({ isLoading, error, facilities, onSearch }: InfoContainerProps) => {
  const [showInfoText, setShowInfoText] = useState(false);
  
  const toggleInfoText = () => {
    setShowInfoText(prev => !prev);
  };

  const LoadingState = () => (
    <div className="w-full animate-pulse space-y-2">
      <div className="h-6 bg-muted rounded" />
      <div className="h-24 bg-muted rounded" />
    </div>
  );

  const ErrorState = () => (
    <div className="text-center">
      <p className="text-destructive">Unable to load facilities</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm text-muted-foreground hover:text-primary"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="flex-1 px-4 flex flex-col items-center pt-0 mt-0">
      <div className="w-full max-w-5xl flex justify-center mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium mr-2">
            Want to learn more about the way to find the correct facility just push the Info button
          </p>
          <Button 
            variant="invisible"
            className={`p-1 ${showInfoText ? 'text-primary' : 'text-gray-800'}`}
            onClick={toggleInfoText}
            aria-pressed={showInfoText}
          >
            <Info className="h-5 w-5" />
            <span className="sr-only">Information about finding the correct facility</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6 w-full max-w-md relative">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          facilities && <SliderForm facilities={facilities} onSearch={onSearch} showInfo={showInfoText} />
        )}
      </div>
    </div>
  );
};

export default InfoContainer;
