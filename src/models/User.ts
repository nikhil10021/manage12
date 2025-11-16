import { Role } from './Role';

export interface User {
  id: string;
  name: string;
  role: Role;
  borrowedBooks: string[]; // array of Book IDs
}
