import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const Card: React.FC<CardProps> = ({
  facility,
  subtitle,
  description,
  taskCategory,
  sqmApprox,
  usersApprox,
  notes,
  purpose,
  activities,
  amenities,
  etiquette,
  technology
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${isFlipped ? 'hidden' : 'flex flex-col h-full'}`}>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2">{facility}</h2>
          <h3 className="text-lg mb-2">{subtitle}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="space-y-2 flex-grow">
            <p><span className="font-semibold">Task Category:</span> {taskCategory}</p>
            <p><span className="font-semibold">Approximate Area:</span> {sqmApprox} m²</p>
            <p><span className="font-semibold">Approximate Users:</span> {usersApprox}</p>
          </div>
        </div>
        <div className="mt-auto p-4">
          <button
            className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={handleFlip}
          >
            Show More Details
          </button>
        </div>
      </div>
      <div 
        className={`${isFlipped ? 'block' : 'hidden'} p-4 h-full flex flex-col bg-gray-100`}
        style={{ transform: 'rotateY(180deg)' }}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">{facility}</h2>
          <p><span className="font-semibold">Task Category:</span> {taskCategory}</p>
          <p><span className="font-semibold">Notes:</span> {notes}</p>
          <div>
            <h3 className="font-semibold mb-2">Purpose of the Facility</h3>
            <p>{purpose}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Types of Activities Supported</h3>
            <p>{activities}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Amenities & Features</h3>
            <p>{amenities}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Etiquette and Guidelines</h3>
            <p>{etiquette}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technology Integration</h3>
            <p>{technology}</p>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <button
            className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={handleFlip}
          >
            Back to Front
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;