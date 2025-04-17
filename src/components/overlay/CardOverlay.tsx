
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, Circle, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

const CardOverlay = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const fixedImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  // Get the background location from state, if available
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  const { data, isLoading, error } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => {
      if (!facilityId) return null;

      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching facility:", error);
        toast.error("Failed to load facility details");
        throw error;
      }
      
      console.log("Facility data loaded:", data);
      return data;
    },
    enabled: !!facilityId,
  });

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
      const facilityWithFixedImage = {
        ...data,
        'Facility Image URL': fixedImageUrl
      };
      setFacility(facilityWithFixedImage);
      console.log("Facility data processed with fixed image:", facilityWithFixedImage);
    }
  }, [data]);

  useEffect(() => {
    if (favorites && facilityId) {
      setIsFavorite(favorites.includes(facilityId));
    }
  }, [favorites, facilityId]);

  const handleClose = () => {
    // Navigate back to the background location if available, otherwise go to overview
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      navigate('/overview');
    }
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
        const { error } = await supabase
          .from('facility_favorites')
          .delete()
          .eq('facility_id', facilityId);

        if (error) throw error;
        setIsFavorite(false);
        
        // Invalidate queries to refresh data across components
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
        
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase
          .from('facility_favorites')
          .insert([{ facility_id: facilityId }]);

        if (error) throw error;
        setIsFavorite(true);
        
        // Invalidate queries to refresh data across components
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorited_facilities'] });
        
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Failed to update favorites");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !facility) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-500">Error loading facility</h2>
          <p className="mt-2 text-gray-600">Could not load the facility details. Please try again.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleClose}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        ></div>
        
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 flex items-center gap-4">
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
          
          <button 
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm shadow-md"
            onClick={handleClose}
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <motion.div
          className="relative z-50 w-full max-w-2xl mx-auto px-4 sm:px-0 pt-12 pb-12"
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
