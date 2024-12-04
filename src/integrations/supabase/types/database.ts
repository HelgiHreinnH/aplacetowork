import type { Facility, FacilityIndexValues, FacilityTaskValues } from './facility';

export type Database = {
  public: {
    Tables: {
      Facilities: {
        Row: Facility;
        Insert: Omit<Facility, 'facility_id'> & { facility_id?: string };
        Update: Partial<Facility>;
      };
      'Facilities index values': {
        Row: FacilityIndexValues;
        Insert: Omit<FacilityIndexValues, 'facility_id'> & { facility_id?: string };
        Update: Partial<FacilityIndexValues>;
      };
      'Facility task values': {
        Row: FacilityTaskValues;
        Insert: Omit<FacilityTaskValues, 'facility_id'> & { facility_id?: string };
        Update: Partial<FacilityTaskValues>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;