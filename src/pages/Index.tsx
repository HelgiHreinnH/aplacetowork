import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import SliderForm from '../components/SliderForm';
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';
import Header from '@/components/overview/Header';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const Index = () => {
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
      
      return data as Facility[];
    }
  });

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
    <div className="min-h-screen flex flex-col">
      {/* Top Container - Title and Subtitle */}
      <div className="flex-none p-8 bg-white">
        <Header />
      </div>

      {/* Middle Container - Sliders */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          facilities && <SliderForm facilities={facilities} />
        )}
      </div>

      {/* Bottom Container is handled by the layout */}
      <div className="flex-none h-20">
        {/* This space is reserved for the bottom navigation */}
      </div>
    </div>
  );
};

export default Index;