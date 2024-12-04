import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Card from '@/components/Card';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select(`
          Facility,
          Subtitle,
          Description,
          "Task Category",
          "Approx. Square Meters",
          "Approx. Users",
          Notes,
          "Purpose of the Facility",
          "Types of Activities Supported",
          "Amenities & Features",
          "Etiquette and Guidelines",
          "Technology Integration"
        `);
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      return data;
    }
  });

  const filteredFacilities = facilities?.filter(facility => {
    const matchesSearch = facility.Facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || facility['Task Category'] === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Focus Work', 'Collaborative Work', 'Break', 'Meetings'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-[600px] bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading facilities</h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workplace Facilities</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our collection of {facilities?.length || 0} workplace settings
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <Input
              type="search"
              placeholder="Search facilities..."
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities?.map((facility, index) => (
            <div key={facility.Facility} className="h-[600px] transform hover:scale-[1.02] transition-transform duration-300">
              <Card 
                {...facility} 
                imageId={`photo-${(index % 4) + 1}`}
              />
            </div>
          ))}
        </div>

        {filteredFacilities?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">No facilities found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;