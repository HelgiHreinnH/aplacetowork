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
          "Etiquette and Guidelines": string | null
          Facility: string
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
          "Etiquette and Guidelines"?: string | null
          Facility: string
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
          "Etiquette and Guidelines"?: string | null
          Facility?: string
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
          Priority: number | null
          "Sq M Max": number | null
          "Sq M Min": number | null
          "Task Category": string | null
          "Users Max": number | null
          "Users Min": number | null
        }
        Insert: {
          Facility: string
          Priority?: number | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          "Task Category"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Update: {
          Facility?: string
          Priority?: number | null
          "Sq M Max"?: number | null
          "Sq M Min"?: number | null
          "Task Category"?: string | null
          "Users Max"?: number | null
          "Users Min"?: number | null
        }
        Relationships: []
      }
      "Facility task values": {
        Row: {
          Facility: string
          "INT8 Task Value": number
          "Task Category": string | null
        }
        Insert: {
          Facility: string
          "INT8 Task Value": number
          "Task Category"?: string | null
        }
        Update: {
          Facility?: string
          "INT8 Task Value"?: number
          "Task Category"?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
