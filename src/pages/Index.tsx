import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import SliderForm from '../components/SliderForm';
import { toast } from "sonner";
import type { Database } from '@/integrations/supabase/types';

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
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="container mx-auto max-w-sm">
        <header className="text-center space-y-6 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">
            logo
          </h1>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            SUB LINE
          </p>
        </header>
        
        <div className="bg-white rounded-lg">
          {isLoading ? <LoadingState /> : error ? <ErrorState /> : facilities && <SliderForm facilities={facilities} />}
        </div>
      </div>
    </div>
  );
};

export default Index;