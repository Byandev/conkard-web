export interface ImageDataResponse {
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
    manipulations: any[];
    collection_name: string;
    custom_properties: any[];
    responsive_images: any[];
    human_readable_size: string;
    generated_conversions: any[];
    created_at: string;
    updated_at: string;
}