
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Card Design System page
    navigate('/design/cards');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to Card Design System...</p>
    </div>
  );
};

export default Index;
