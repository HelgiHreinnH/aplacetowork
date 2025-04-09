
import { Info } from "lucide-react";
import LoadingSpinner from "@/components/overview/LoadingSpinner";
import SliderForm from "@/components/SliderForm";
import type { Database } from '@/integrations/supabase/types';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SlidersContainerProps {
  isLoading: boolean;
  error: Error | null;
  facilities: Facility[] | undefined;
  onSearch: () => void;
}

const SlidersContainer = ({ isLoading, error, facilities, onSearch }: SlidersContainerProps) => {
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
    <div className="flex-1 px-4 flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6 w-full max-w-md">
        {/* Info container */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6 border-b pb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#9b87f5] mb-2">A Place to Work</h1>
              <p className="text-sm tracking-[0.2em] text-[#8E9196] uppercase">Inspiration for the ideal Workspace</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4 mt-4">
            <p className="text-sm text-gray-700">
              Want to learn more about the way to find the correct facility
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              just push the info button
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="p-0 h-8 w-8 rounded-full" size="icon">
                    <Info className="h-6 w-6 text-gray-800" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Adjust the sliders to find the perfect workspace for your team's needs. 
                    The values affect the search results for an ideal facility.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          facilities && <SliderForm facilities={facilities} onSearch={onSearch} />
        )}
      </div>
    </div>
  );
};

export default SlidersContainer;
