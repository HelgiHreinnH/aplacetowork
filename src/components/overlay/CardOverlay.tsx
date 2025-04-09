
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const CardOverlay = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<Facility | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle(); // Use maybeSingle to handle cases where no facility is found
      
      if (error) throw error;
      return data;
    },
    enabled: !!facilityId,
  });

  useEffect(() => {
    if (data) {
      setFacility(data);
      console.log("Facility data loaded:", data);
    }
  }, [data]);

  const handleClose = () => {
    navigate('/overview');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Function to get a fallback image URL if no specific image is provided
  const getImageUrl = (facilityImageUrl: string | null) => {
    if (facilityImageUrl) return facilityImageUrl;
    
    const imageUrls = {
      'photo-1': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'photo-2': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'photo-3': 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      'photo-4': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    };
    return imageUrls['photo-1'];
  };

  if (isLoading || !facility) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Enhance the facility object with an image URL
  const facilityWithImage = {
    ...facility,
    'Facility Image URL': facility['Facility Image URL'] || getImageUrl(null),
    imageId: 'photo-1' // Add a default imageId if needed
  };

  console.log("Image URL in overlay:", facilityWithImage['Facility Image URL']);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
      >
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
          <button 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            onClick={handleClose}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
          <button 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            onClick={handleClose}
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <motion.div
          className="relative z-10 w-full max-w-md mx-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        >
          <Card {...facilityWithImage} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardOverlay;
