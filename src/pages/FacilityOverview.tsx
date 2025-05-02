
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import CardOverview from '@/components/overview/CardOverview';
import TitleContainer from '@/components/containers/TitleContainer';
import { useLocation, Location } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient();

const FacilityOverviewContent = () => {
  const location = useLocation();

  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*');
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error loading facilities</p>
        </div>
      </div>
    );
  }

  if (!facilities || facilities.length === 0) {
    return (
      <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
        <TitleContainer />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No facilities found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full fixed inset-0 flex flex-col overflow-hidden">
      <TitleContainer />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 pb-24">
          <CardOverview 
            facilities={facilities} 
            currentLocation={location} 
          />
        </div>
      </div>
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

// Wrapper component that provides the QueryClient
const FacilityOverview = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FacilityOverviewContent />
    </QueryClientProvider>
  );
};

export default FacilityOverview;
