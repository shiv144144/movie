
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface DetectedObject {
  name: string;
  box_2d: [number, number, number, number]; // [ymin, xmin, ymax, xmax] 0-1000
  confidence: number;
  amazonUrl: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  userId: string;
  createdAt: number;
}
