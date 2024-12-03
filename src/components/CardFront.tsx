import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card as ShadcnCard, CardHeader, CardContent } from "@/components/ui/card";

interface CardFrontProps {
  facility: string;
  subtitle: string;
  description: string;
  taskCategory: string;
  sqmApprox: string;
  usersApprox: string;
  onFlip?: (e: React.MouseEvent) => void;
  imageId?: string;
}

const CardFront: React.FC<CardFrontProps> = ({
  facility,
  subtitle,
  description,
  taskCategory,
  sqmApprox,
  usersApprox,
  onFlip,
  imageId = 'photo-1488590528505-98d2b5aba04b' // Default image
}) => {
  const navigate = useNavigate();

  const handleShowMore = (e: React.MouseEvent) => {
    if (onFlip) {
      onFlip(e);
    } else {
      navigate('/card-back');
    }
  };

  return (
    <ShadcnCard className="w-full hover:shadow-lg transition-shadow duration-300">
      {/* Image template */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-${imageId}`} 
          alt={facility} 
          className="w-full h-full object-cover"
        />
      </div>

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
          onClick={handleShowMore}
          className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 mt-4"
        >
          Show More Details
        </button>
      </CardContent>
    </ShadcnCard>
  );
};

export default CardFront;