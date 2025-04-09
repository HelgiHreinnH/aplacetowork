
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

  const getValidImageUrl = (facilityImageUrl: string | null) => {
    if (facilityImageUrl) {
      // If it's a Supabase URL with a token, use it
      if (facilityImageUrl.includes('supabase.co/storage') && facilityImageUrl.includes('token=')) {
        console.log("Using Supabase image URL:", facilityImageUrl);
        return facilityImageUrl;
      }
    }
    
    // Fallback to Unsplash images
    const defaultImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
    console.log("Using default image URL:", defaultImage);
    return defaultImage;
  };

  // Generate the image URL once to ensure consistency
  const imageUrl = getValidImageUrl(props['Facility Image URL']);
  console.log("Card component image URL:", imageUrl);

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
          className="absolute w-full h-full backface-hidden rounded-[32px] overflow-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFront 
            {...props} 
            onFlip={handleFlip} 
            imageUrl={imageUrl} 
          />
        </div>

        <div 
          className="absolute w-full h-full backface-hidden rounded-[32px] overflow-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardBack 
            {...props} 
            onFlip={handleFlip} 
            imageUrl={imageUrl} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
