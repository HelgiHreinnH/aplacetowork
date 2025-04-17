
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Card from '@/components/Card';

const CardOverlay = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { data: facility, isLoading } = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => {
      if (!facilityId) return null;
      
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('facility_id', facilityId)
        .maybeSingle();
      
      if (error) {
        toast.error("Failed to load facility details");
        throw error;
      }
      
      return data;
    },
  });

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(state.backgroundLocation.pathname);
    } else {
      navigate('/overview');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!facility && !isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
      >
        <button 
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm shadow-md"
          onClick={handleClose}
        >
          <X className="h-6 w-6 text-white" />
        </button>
        
        <motion.div
          className="relative z-50 w-full max-w-2xl mx-auto px-4 sm:px-0 pt-12 pb-12"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        >
          {facility && <Card {...facility} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardOverlay;
