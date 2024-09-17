export interface Type {
  id: number;
  name: string;
  suggested_labels: string;
  display_icon: boolean;
  category: string;
  icon_url: string;
  order: number;
}

export interface Card {
  url: string;
  title: string;
  id: number;
  card_id: number;
  label: string;
  value: string;
  type_id: number;
  created_at: string;
  updated_at: string;
  type: Type;
}
