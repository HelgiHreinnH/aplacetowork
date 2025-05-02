
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CardFront from './CardFront';
import CardBack from './CardBack';
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface CardProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Task Category'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'Notes'
  | 'Purpose of the Facility'
  | 'Types of Activities Supported'
  | 'Amenities & Features'
  | 'Etiquette and Guidelines'
  | 'Technology Integration'
  | 'display_title'
  | 'Facility Image URL'
> {
  imageId?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Using the fixed image URL provided instead of the dynamic one
  const fixedImageUrl = "https://klcfyohkhmhmuisiawjz.supabase.co/storage/v1/object/public/facilitytempimage//facilitytemp.png";
  
  console.log("Card component using fixed image URL:", fixedImageUrl);

  return (
    <div className="relative w-full h-[600px] max-w-[400px] mx-auto bg-transparent" style={{ perspective: '1000px' }}>
      <motion.div
        className="absolute w-full h-full preserve-3d"
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 80,
          damping: 12
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFront 
            {...props} 
            onFlip={handleFlip} 
            imageUrl={fixedImageUrl} 
          />
        </div>

        <div 
          className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardBack 
            {...props} 
            onFlip={handleFlip} 
            imageUrl={fixedImageUrl} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
