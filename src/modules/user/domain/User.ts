export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  images?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}
