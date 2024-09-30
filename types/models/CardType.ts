export interface CardType {
  id: number;
  name: string;
  suggested_labels: string | null;
  display_icon: boolean;
  category: string;
  icon_url: string;
  order: number;
}