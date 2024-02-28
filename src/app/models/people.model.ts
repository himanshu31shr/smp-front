export interface People {
  id: number;
  album_id: number;
  representation?: any;
  image_path: string;
  createdAt: string;
  updatedAt: string;
  photo_has_people?: PhotoHasPeople[];
  isSelected?: boolean;
}

export interface PhotoHasPeople {
  id: number;
  photo_id: number;
  people_id: number;
  photoId: number;
}