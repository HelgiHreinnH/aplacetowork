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
      icon: <Target className="h-5 w-5" />
    },
    { 
      title: 'Activities', 
      content: activities,
      icon: <Activity className="h-5 w-5" />
    },
    { 
      title: 'Amenities', 
      content: amenities,
      icon: <Package className="h-5 w-5" />
    },
    { 
      title: 'Guidelines', 
      content: etiquette,
      icon: <FileText className="h-5 w-5" />
    },
    { 
      title: 'Technology', 
      content: technology,
      icon: <Laptop className="h-5 w-5" />
    },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Facility Details</h2>
        <p className="text-sm text-gray-600">
          Explore the key aspects of this facility
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category, index) => (
          <AccordionItem key={category.title} value={`item-${index}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                {category.icon}
                <span>{category.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 pt-2 max-h-40 overflow-y-auto">
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