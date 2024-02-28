import { People } from "./people.model";

export interface Photo {
    id: number;
    image_path: string;
    album_id: number;
    createdAt: string;
    updatedAt: string;
    albumId: number;
    signed_image: string;
    thumb: string;
    people?: People[];
}