import React from 'react';

interface InfoSectionProps {
  title: string;
  content?: string | null;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-600">{content || 'Not specified'}</p>
  </div>
);

export default InfoSection;