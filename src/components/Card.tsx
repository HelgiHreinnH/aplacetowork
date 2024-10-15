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
        <h2 className="text-2xl font-bold mb-4">{title} - Detailed Information</h2>
        <p className="text-lg mb-4">
          {title} is a crucial component of modern workplace design, offering a space that balances functionality with comfort.
        </p>
        <p className="mb-4">
          This {squareMeters} m² area is designed to accommodate up to {employees} employees, making it ideal for {usage.toLowerCase()} work environments.
          The space is equipped with ergonomic furniture and state-of-the-art technology to enhance productivity and collaboration.
        </p>
        <p className="mb-4">
          Key features of this {title.toLowerCase()} include:
          <ul className="list-disc list-inside mt-2">
            <li>Adjustable lighting for different work scenarios</li>
            <li>Sound-absorbing materials for improved acoustics</li>
            <li>Flexible furniture arrangements to support various activities</li>
            <li>Integrated power and data connectivity</li>
          </ul>
        </p>
        <p>
          Whether used for focused individual work, team collaborations, or casual interactions, this {title.toLowerCase()} 
          is designed to adapt to the evolving needs of a dynamic workplace.
        </p>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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