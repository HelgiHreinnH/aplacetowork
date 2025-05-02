
import React from 'react';
import { H4 } from '@/components/ui/typography';

interface InfoSectionProps {
  title: string;
  content?: string | null;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <div className="flex flex-col">
    <H4 className="text-xs uppercase tracking-wide text-gray-500 h-5 mb-3 font-normal">
      {title}
    </H4>
    <div className="bg-gray-50 p-4 rounded-lg flex-1">
      <p className="text-sm font-sans font-semibold text-gray-600">
        {content || 'Not specified'}
      </p>
    </div>
  </div>
);

export default InfoSection;
