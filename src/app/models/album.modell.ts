import { Photo } from "./photo.mode";

export interface Album {
  id: number;
  name: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  photos: Photo[];
}