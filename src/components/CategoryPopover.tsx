import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Circle, X } from "lucide-react";

interface CategoryPopoverProps {
  title: string;
  content?: string | null;
}

const CategoryPopover: React.FC<CategoryPopoverProps> = ({ title, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Circle className="h-12 w-12 p-2.5 bg-gray-100 rounded-full" />
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-6" 
        align="center"
        side="top"
        sideOffset={20}
        alignOffset={0}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{title}</h3>
            <PopoverPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </PopoverPrimitive.Close>
          </div>
          <p className="text-gray-600">{content || 'Not specified'}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPopover;