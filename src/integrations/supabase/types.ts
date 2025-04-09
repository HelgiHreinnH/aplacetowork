export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Facilities: {
        Row: {
          "Amenities & Features": string | null
          "Approx. Square Meters": string | null
          "Approx. Users": string | null
          Description: string | null
          display_title: string | null
          "Etiquette and Guidelines": string | null
          Facility: string
          "Facility Image URL": string | null
          facility_id: string
          Notes: string | null
          Priority: number | null
          "Purpose of the Facility": string | null
          "Sq M Max": number | null
          "Sq M Min": number | null
          Subtitle: string | null
          "Task Category": string | null
          "Technology Integration": string | null
          "Types of Activities Supported": string | null
          "Users Max": number | null
          "Users Min": number | null
        }
        Insert: {
          "Amenities & Features"?: string | null
          "Approx. Square Meters"?: string | null
          "Approx. Users"?: string | null
          Description?: string | null
          display_title?: string | null
          "Etiquette and Guidelines"?: string | null
          Facility: string
          "Facility Image URL"?: string | null
          facility_id?: string
          Notes?: string | null
          Priority?: number | null
          "Purpose of the Facility"?: string | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          Subtitle?: string | null
          "Task Category"?: string | null
          "Technology Integration"?: string | null
          "Types of Activities Supported"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Update: {
          "Amenities & Features"?: string | null
          "Approx. Square Meters"?: string | null
          "Approx. Users"?: string | null
          Description?: string | null
          display_title?: string | null
          "Etiquette and Guidelines"?: string | null
          Facility?: string
          "Facility Image URL"?: string | null
          facility_id?: string
          Notes?: string | null
          Priority?: number | null
          "Purpose of the Facility"?: string | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          Subtitle?: string | null
          "Task Category"?: string | null
          "Technology Integration"?: string | null
          "Types of Activities Supported"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Relationships: []
      }
      "Facilities index values": {
        Row: {
          Facility: string
          facility_id: string
          Priority: number | null
          "Sq M Max": number | null
          "Sq M Min": number | null
          "Task Category": string | null
          "Users Max": number | null
          "Users Min": number | null
        }
        Insert: {
          Facility: string
          facility_id: string
          Priority?: number | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          "Task Category"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Update: {
          Facility?: string
          facility_id?: string
          Priority?: number | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          "Task Category"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_facility_index_id"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "Facilities"
            referencedColumns: ["facility_id"]
          },
        ]
      }
      "Facility task values": {
        Row: {
          Facility: string
          facility_id: string
          "INT8 Task Value": number
          "Task Category": string | null
        }
        Insert: {
          Facility: string
          facility_id: string
          "INT8 Task Value": number
          "Task Category"?: string | null
        }
        Update: {
          Facility?: string
          facility_id?: string
          "INT8 Task Value"?: number
          "Task Category"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_facility_task_id"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "Facilities"
            referencedColumns: ["facility_id"]
          },
        ]
      }
      facility_favorites: {
        Row: {
          created_at: string
          facility_id: string
          id: string
        }
        Insert: {
          created_at?: string
          facility_id: string
          id?: string
        }
        Update: {
          created_at?: string
          facility_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_favorites_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "Facilities"
            referencedColumns: ["facility_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
