export interface SaveCardResponse {
  data: {
    id: string;
    user_id: number;
    label: string;
    fields: [
      {
        id: number;
        card_id: string;
        label: string | null;
        value: string;
        type_id: number;
        created_at: string;
        updated_at: string;
      },
    ];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
}
