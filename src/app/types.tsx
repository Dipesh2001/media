export interface common {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin extends common {
  name: string;
  email: string;
  password: string;
}

export interface QueryResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
}

export interface Album extends common {
  name: string;
  coverImage: string;
  artists: string[];
  genre: string;
  language: string;
  description?: string;
  releaseDate: Date;
  status: boolean;
  likes: number;
}
