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
> {
  imageId?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const getImageUrl = (imageId: string) => {
    const imageUrls = {
      'photo-1': 'photo-1488590528505-98d2b5aba04b',
      'photo-2': 'photo-1649972904349-6e44c42644a7',
      'photo-3': 'photo-1518770660439-4636190af475',
      'photo-4': 'photo-1461749280684-dccba630e2f6'
    };
    return imageUrls[imageId as keyof typeof imageUrls] || imageUrls['photo-1'];
  };

  return (
    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full preserve-3d"
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
          className="absolute w-full h-full backface-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFront {...props} onFlip={handleFlip} imageId={getImageUrl(props.imageId || 'photo-1')} />
        </div>

        <div 
          className="absolute w-full h-full backface-hidden" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardBack {...props} onFlip={handleFlip} imageId={getImageUrl(props.imageId || 'photo-1')} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;