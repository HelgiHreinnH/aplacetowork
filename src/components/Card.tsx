import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  image: string;
  description: string;
  squareMeters: number;
  employees: number;
  usage: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, squareMeters, employees, usage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleFlip}
    >
      <div className={`${isFlipped ? 'hidden' : 'block'}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="space-y-2">
            <p><span className="font-semibold">Square Meters:</span> {squareMeters} m²</p>
            <p><span className="font-semibold">Employees:</span> {employees}</p>
            <p><span className="font-semibold">Usage:</span> {usage}</p>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
          >
            Show More
          </button>
        </div>
      </div>
      <div className={`${isFlipped ? 'block' : 'hidden'} p-4 transform rotate-y-180`}>
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <p className="mb-4">
          This is the back of the card where you can add more detailed information about the {title.toLowerCase()}.
          You can include specifics about the layout, equipment, or best practices for using this space.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleFlip();
          }}
        >
          Back to Front
        </button>
      </div>
    </motion.div>
  );
};

export default Card;