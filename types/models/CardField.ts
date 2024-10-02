import type { CardFieldType } from "~/types/models/CardFieldType";

export interface CardField {
  id: number;
  card_id: number;
  label: string | null;
  value: string;
  type_id: number;
  created_at: string;
  updated_at: string;
  type: CardFieldType;
}
