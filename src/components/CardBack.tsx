import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardBackProps {
  facility: string;
  taskCategory: string;
  notes: string;
  purpose: string;
  activities: string;
  amenities: string;
  etiquette: string;
  technology: string;
  onFlip: (e: React.MouseEvent) => void;
}

const CardBack: React.FC<CardBackProps> = ({
  facility,
  taskCategory,
  notes,
  purpose,
  activities,
  amenities,
  etiquette,
  technology,
  onFlip
}) => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    if (onFlip) {
      onFlip(e);
    } else {
      navigate('/card-front');
    }
  };

  return (
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
      <div className="mt-auto pt-4">
        <button
          className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          onClick={handleBack}
        >
          Back to Front
        </button>
      </div>
    </div>
  );
};

export default CardBack;