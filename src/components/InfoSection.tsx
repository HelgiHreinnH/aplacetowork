
import React from 'react';
import { H5 } from '@/components/ui/typography';

interface InfoSectionProps {
  title: string;
  content?: string | null;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div className="flex flex-col">
    <H5 className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-normal">
      {title}
    </H5>
    <div className="bg-gray-50 p-4 rounded-lg flex-1">
      <p className="text-sm font-sans font-semibold text-gray-600">
        {content || 'Not specified'}
      </p>
    </div>
  </div>
);

export default InfoSection;

