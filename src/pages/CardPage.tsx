import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Database } from '@/integrations/supabase/types';
import { toast } from "sonner";

type Facility = Database['public']['Tables']['Facilities']['Row'];

const CardPage = () => {
  const location = useLocation();
  const [facility, setFacility] = useState<Facility | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const facilityData = location.state;
    if (!facilityData) {
      toast.error("No facility selected");
      navigate('/search-results');
      return;
    }

    setFacility(facilityData);
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate('/search-results');
  };

  if (!facility) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading facility...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
        </div>
        <div className="aspect-[3/4] w-full max-w-2xl mx-auto">
          <Card {...facility} />
        </div>
      </div>
    </div>
  );
};

export default CardPage;