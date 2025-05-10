
import React from 'react';
import SliderForm from '@/components/SliderForm';
import { useNavigate } from 'react-router-dom';
import InfoContainer from '@/components/containers/InfoContainer';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const Index = () => {
  const navigate = useNavigate();
  
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*');
        
      if (error) throw error;
      return data as Facility[];
    }
  });

  const handleSearch = () => {
    navigate('/search-results');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#3f00ff]">Welcome to A Place to Work</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore different workplace interior settings for your office building. Find the perfect environment 
            for various work activities and team needs.
          </p>
          
          {/* Slider section */}
          <div className="mt-8 mb-8">
            <InfoContainer
              isLoading={isLoading}
              error={error as Error}
              facilities={facilities}
              onSearch={handleSearch}
            />
          </div>

          {/* Library shortcut */}
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Browse Our Workplace Settings Library</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                variant="main" 
                className="rounded-full"
                onClick={() => navigate('/workplace-library')}
              >
                View Workplace Settings Library
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => navigate('/card-design-system')}
              >
                Explore Card Design System
              </Button>
            </div>
          </div>

          {/* Additional content placeholder */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Adjust the sliders above to find your ideal workplace setting
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
