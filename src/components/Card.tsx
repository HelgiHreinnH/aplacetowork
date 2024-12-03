import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CardFront from './CardFront';
import CardBack from './CardBack';

interface CardProps {
  facility: string;
  subtitle: string;
  description: string;
  taskCategory: string;
  sqmApprox: string;
  usersApprox: string;
  notes: string;
  purpose: string;
  activities: string;
  amenities: string;
  etiquette: string;
  technology: string;
}

const Card: React.FC<CardProps> = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="w-full"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${isFlipped ? 'hidden' : 'block'}`}>
        <CardFront {...props} onFlip={handleFlip} />
      </div>

      <div 
        className={`${isFlipped ? 'block' : 'hidden'}`}
        style={{ transform: 'rotateY(180deg)' }}
      >
        <CardBack {...props} onFlip={handleFlip} />
      </div>
    </motion.div>
  );
};

export default Card;