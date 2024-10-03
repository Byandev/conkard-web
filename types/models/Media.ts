export enum MediaType {
    CARD_COVER_PHOTO = 'CARD_COVER_PHOTO',
    CARD_COMPANY_LOGO = 'CARD_COMPANY_LOGO',
    CARD_PROFILE_PICTURE = 'CARD_PROFILE_PICTURE',
}

export interface Media {
    id: number;
    uuid: string;
    name: string;
    size: number;
    type: string;
    file_name: string;
    mime_type: string;
    extension: string;
    preview_url: string;
    original_url: string;
    order_column: number;
    manipulations: string[];
    collection_name: string;
    custom_properties: string[];
    responsive_images: string[];
    human_readable_size: string;
    generated_conversions: string[];
    created_at: string;
    updated_at: string;
}

export interface UploadImage {
    type: MediaType;
    image: File | null;
}