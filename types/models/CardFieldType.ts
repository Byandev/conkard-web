export enum Category {
  PERSONAL = 'PERSONAL',
  GENERAL = 'GENERAL',
  SOCIAL = 'SOCIAL',
  MESSAGING = 'MESSAGING',
  BUSINESS = 'BUSINESS',
  OTHERS = 'OTHERS'
}

export interface CardFieldType {
  id: number;
  name: string;
  suggested_labels: string | null;
  display_icon: boolean;
  category: Category;
  icon_url: string;
  order: number;
}