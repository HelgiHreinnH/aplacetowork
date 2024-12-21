import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from '@/components/overview/LoadingSpinner';
import CardNavigation from '@/components/CardNavigation';

const DesignOverview = () => {
  const { data: facility, isLoading, error } = useQuery({
    queryKey: ['sample-facility'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading facility data</p>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No facility data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Card Design Preview</h1>
        <CardNavigation {...facility} />
      </div>
    </div>
  );
};

export default DesignOverview;