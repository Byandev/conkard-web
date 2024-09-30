import type { CardField } from "@/types/models/CardField";

export interface Card {
  id: number;
  user_id: number;
  label: string;
  fields: CardField[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
