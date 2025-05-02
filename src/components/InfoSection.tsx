
import React from 'react';

interface InfoSectionProps {
  title: string;
  content?: string | null;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div className="flex flex-col">
    <h3 className="text-sm font-display font-medium uppercase tracking-wide text-gray-500 h-5 mb-3">{title}</h3>
    <div className="bg-gray-50 p-4 rounded-lg flex-1">
      <p className="text-xs font-sans font-semibold text-gray-600">{content || 'Not specified'}</p>
    </div>
  </div>
);

export default InfoSection;
