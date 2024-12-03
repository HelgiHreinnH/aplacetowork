import React from 'react';
import CardFront from '@/components/CardFront';

const CardFrontPage = () => {
  const sampleData = {
    facility: "Meeting Room A",
    subtitle: "Collaborative Space",
    description: "A modern meeting room designed for team collaboration and presentations",
    taskCategory: "Group Work",
    sqmApprox: "30",
    usersApprox: "8-12",
    onFlip: () => console.log("Flip clicked")
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Card Front Component</h1>
      <div className="max-w-md mx-auto">
        <CardFront {...sampleData} />
      </div>
    </div>
  );
};

export default CardFrontPage;