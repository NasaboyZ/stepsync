export interface ImageData {
  id: number;
  pathname: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ImageResponse {
  images: ImageData[];
}

export interface UploadResponse {
  message: string;
  pathname: string;
  image: ImageData;
  url: string;
}
