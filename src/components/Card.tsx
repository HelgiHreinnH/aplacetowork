import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  setting_title: string;
  setting_subtitle: string;
  setting_description: string;
  image: string;
  sqm_min: number;
  sqm_max: number;
  employees_min: number;
  employees_max: number;
  workplace_setting: string;
}

const Card: React.FC<CardProps> = ({ 
  setting_title, 
  setting_subtitle,
  setting_description, 
  image, 
  sqm_min,
  sqm_max,
  employees_min,
  employees_max,
  workplace_setting 
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
        <img src={image} alt={setting_title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2">{setting_title}</h2>
          <h3 className="text-lg mb-2">{setting_subtitle}</h3>
          <p className="text-sm text-gray-600 mb-4">{setting_description}</p>
          <div className="space-y-2 flex-grow">
            <p><span className="font-semibold">Square Meters:</span> {sqm_min} - {sqm_max} m²</p>
            <p><span className="font-semibold">Employees:</span> {employees_min} - {employees_max}</p>
            <p><span className="font-semibold">Setting:</span> {workplace_setting}</p>
          </div>
        </div>
        <div className="mt-auto p-4">
          <button
            className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={handleFlip}
          >
            Show More
          </button>
        </div>
      </div>
      <div 
        className={`${isFlipped ? 'block' : 'hidden'} p-4 h-full flex flex-col bg-gray-100`}
        style={{ transform: 'rotateY(180deg)' }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-4">{setting_title} - Detailed Information</h2>
          <p className="text-lg mb-4">
            {setting_title} is a crucial component of modern workplace design, offering a space that balances functionality with comfort.
          </p>
          <p className="mb-4">
            This {sqm_min} - {sqm_max} m² area is designed to accommodate {employees_min} to {employees_max} employees, making it ideal for {workplace_setting.toLowerCase()} work environments.
            The space is equipped with ergonomic furniture and state-of-the-art technology to enhance productivity and collaboration.
          </p>
          <p className="mb-4">
            Key features of this {setting_title.toLowerCase()} include:
            <ul className="list-disc list-inside mt-2">
              <li>Adjustable lighting for different work scenarios</li>
              <li>Sound-absorbing materials for improved acoustics</li>
              <li>Flexible furniture arrangements to support various activities</li>
              <li>Integrated power and data connectivity</li>
            </ul>
          </p>
          <p>
            Whether used for focused individual work, team collaborations, or casual interactions, this {setting_title.toLowerCase()} 
            is designed to adapt to the evolving needs of a dynamic workplace.
          </p>
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