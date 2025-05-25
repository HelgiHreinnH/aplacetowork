
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the workplace library page (search parameters)
    navigate('/workplace-library');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to Workplace Library...</p>
    </div>
  );
};

export default Index;
