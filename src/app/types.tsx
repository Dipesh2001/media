interface common {
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
