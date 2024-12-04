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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 bg-muted rounded mb-4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md text-center">
          <p className="text-destructive">Unable to load facilities</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-sm text-muted-foreground hover:text-primary"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:py-12 mx-auto max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Find Your Ideal Workspace
            </h1>
            <p className="text-sm text-muted-foreground">
              Discover the perfect workplace setting tailored to your needs
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-sm p-4 md:p-6">
            {facilities && <SliderForm facilities={facilities} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;