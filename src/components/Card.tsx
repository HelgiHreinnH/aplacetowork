import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card as ShadcnCard, CardHeader, CardContent } from "@/components/ui/card";

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
      className="w-full"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${isFlipped ? 'hidden' : 'block'}`}>
        <ShadcnCard className="w-full hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">{facility}</h2>
              <p className="text-lg text-gray-600 italic">{subtitle}</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Task Category</h3>
                <p className="text-gray-600">{taskCategory}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Space Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Area: {sqmApprox} m²</p>
                  <p className="text-gray-600">Capacity: {usersApprox} users</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleFlip}
              className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-4"
            >
              Show More Details
            </button>
          </CardContent>
        </ShadcnCard>
      </div>

      <div 
        className={`${isFlipped ? 'block' : 'hidden'}`}
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