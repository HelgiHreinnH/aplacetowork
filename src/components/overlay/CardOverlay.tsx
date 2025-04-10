
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Circle, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const CardOverlay = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const fixedImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";

  const { data, isLoading } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle();
      
      if (error) throw error;
      console.log("Supabase query result:", data);
      return data;
    },
    enabled: !!facilityId,
  });

  // Fetch favorite status
  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_favorites')
        .select('facility_id');
      
      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }
      
      return data.map(fav => fav.facility_id);
    },
  });

  useEffect(() => {
    if (data) {
      // Override the image URL with our fixed one
      const facilityWithFixedImage = {
        ...data,
        'Facility Image URL': fixedImageUrl
      };
      setFacility(facilityWithFixedImage);
      console.log("Facility data loaded with fixed image:", facilityWithFixedImage);
    }
  }, [data]);

  useEffect(() => {
    if (favorites && facilityId) {
      setIsFavorite(favorites.includes(facilityId));
    }
  }, [favorites, facilityId]);

  const handleClose = () => {
    navigate('/overview');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!facilityId) return;

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  if (isLoading || !facility) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("Using fixed image URL in overlay:", fixedImageUrl);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-40 flex items-center justify-center bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop with glassmorphism effect */}
        <div 
          className="absolute inset-0 bg-[#9b87f5]/30 backdrop-blur-[3px]"
          onClick={handleBackdropClick}
        ></div>
        
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 flex items-center gap-4">
          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm shadow-md"
          >
            {isFavorite ? (
              <CircleCheck className="h-6 w-6 text-[#F97316]" />
            ) : (
              <Circle className="h-6 w-6 text-white hover:text-[#FEC6A1]" />
            )}
          </button>
          
          {/* Close button */}
          <button 
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm shadow-md"
            onClick={handleClose}
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <motion.div
          className="relative z-50 w-full max-w-md mx-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        >
          <Card {...facility} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardOverlay;
