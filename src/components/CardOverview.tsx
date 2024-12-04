import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FacilityTableRow from './FacilityTableRow';

const CardOverview = () => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Facilities')
        .select(`
          Facility,
          Subtitle,
          Description,
          "Approx. Square Meters",
          "Approx. Users",
          Notes
        `);
      
      if (error) {
        toast.error("Failed to load facilities");
        throw error;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading facilities...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center p-8 text-red-500">Error loading facilities</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Facilities Overview</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Facility</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Square Meters</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities?.map((facility) => (
              <FacilityTableRow
                key={facility.Facility}
                {...facility}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CardOverview;