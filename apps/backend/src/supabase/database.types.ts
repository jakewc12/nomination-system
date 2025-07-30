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
      applications: {
        Row: {
          college: string
          constituency: string
          created_at: string
          email: string
          fullName: string
          id: number
          major: string
          minors: string
          nickname: string
          nuid: string
          phoneNumber: string
          phoneticPronunciation: string
          preferredFullName: string
          pronouns: string
          year: number
          semester: string
        }
        Insert: {
          college: string
          constituency: string
          created_at?: string
          email: string
          fullName: string
          id?: number
          major: string
          minors: string
          nickname: string
          nuid: string
          phoneNumber: string
          phoneticPronunciation: string
          preferredFullName: string
          pronouns: string
          year: number
          semester?: string
        }
        Update: {
          college?: string
          constituency?: string
          created_at?: string
          email?: string
          fullName?: string
          id?: number
          major?: string
          minors?: string
          nickname?: string
          nuid?: string
          phoneNumber?: string
          phoneticPronunciation?: string
          preferredFullName?: string
          pronouns?: string
          year?: number
          semester?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          college: string | null
          constituency: string | null
          created_at: string
          email: string | null
          fullName: string | null
          graduationYear: number | null
          id: number
          major: string | null
          nominee: string | null
          receiveSenatorInfo: boolean | null
          status: string
        }
        Insert: {
          college?: string | null
          constituency?: string | null
          created_at?: string
          email?: string | null
          fullName?: string | null
          graduationYear?: number | null
          id?: number
          major?: string | null
          nominee?: string | null
          receiveSenatorInfo?: boolean | null
          status: string
        }
        Update: {
          college?: string | null
          constituency?: string | null
          created_at?: string
          email?: string | null
          fullName?: string | null
          graduationYear?: number | null
          id?: number
          major?: string | null
          nominee?: string | null
          receiveSenatorInfo?: boolean | null
          status?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          firstName: string
          id: number
          lastName: string
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          firstName: string
          id?: number
          lastName: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          firstName?: string
          id?: number
          lastName?: string
          role?: Database["public"]["Enums"]["Role"]
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
      Role: "ADMIN" | "APPLICANT" | "STANDARD"
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