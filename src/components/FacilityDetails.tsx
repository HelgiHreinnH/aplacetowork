import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Target, 
  Activity, 
  Package, 
  FileText, 
  Laptop 
} from 'lucide-react';

interface FacilityDetailsProps {
  purpose?: string | null;
  activities?: string | null;
  amenities?: string | null;
  etiquette?: string | null;
  technology?: string | null;
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({
  purpose,
  activities,
  amenities,
  etiquette,
  technology,
}) => {
  const categories = [
    { 
      title: 'Purpose', 
      content: purpose,
      icon: <Target className="h-4 w-4" />
    },
    { 
      title: 'Activities', 
      content: activities,
      icon: <Activity className="h-4 w-4" />
    },
    { 
      title: 'Amenities', 
      content: amenities,
      icon: <Package className="h-4 w-4" />
    },
    { 
      title: 'Guidelines', 
      content: etiquette,
      icon: <FileText className="h-4 w-4" />
    },
    { 
      title: 'Technology', 
      content: technology,
      icon: <Laptop className="h-4 w-4" />
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-2">
      <div className="text-center mb-1">
        <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">Facility Details</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-1">
        {categories.map((category, index) => (
          <AccordionItem key={category.title} value={`item-${index}`} className="border-0 bg-white rounded-lg">
            <AccordionTrigger className="hover:no-underline py-2 px-3">
              <div className="flex items-center gap-2">
                {category.icon}
                <span className="text-xs font-medium">{category.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-gray-600 px-3 pb-2 leading-relaxed">
                {category.content || 'Not specified'}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FacilityDetails;