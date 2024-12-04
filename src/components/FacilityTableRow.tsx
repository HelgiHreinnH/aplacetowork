import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface FacilityTableRowProps extends Pick<
  Facility,
  | 'Facility'
  | 'Subtitle'
  | 'Description'
  | 'Approx. Square Meters'
  | 'Approx. Users'
  | 'Notes'
> {}

const FacilityTableRow: React.FC<FacilityTableRowProps> = ({
  Facility: facility,
  Subtitle: subtitle,
  Description: description,
  'Approx. Square Meters': sqMeters,
  'Approx. Users': users,
  Notes: notes,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{facility}</TableCell>
      <TableCell>{subtitle}</TableCell>
      <TableCell className="max-w-md">{description}</TableCell>
      <TableCell>{sqMeters}</TableCell>
      <TableCell>{users}</TableCell>
      <TableCell>{notes}</TableCell>
    </TableRow>
  );
};

export default FacilityTableRow;