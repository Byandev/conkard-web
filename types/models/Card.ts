export interface Type {
  id: number;
  name: string;
  suggested_labels: string | null;
  display_icon: boolean;
  category: string;
  icon_url: string;
  order: number;
}

export interface Field {
  title: string;
  url: string;
  id: number;
  card_id: number;
  label: string | null;
  value: string;
  type_id: number;
  created_at: string;
  updated_at: string;
  type: Type;
}

export interface Card {
  id: number;
  user_id: number;
  label: string;
  fields: Field[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
