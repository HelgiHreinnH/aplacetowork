
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
      'custom_roles': {
        Row: {
          id: string;
          role_name: string;
          created_at: string;
          created_by: string | null;
          usage_count: number;
        };
        Insert: {
          id?: string;
          role_name: string;
          created_at?: string;
          created_by?: string | null;
          usage_count?: number;
        };
        Update: {
          id?: string;
          role_name?: string;
          created_at?: string;
          created_by?: string | null;
          usage_count?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
