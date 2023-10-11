import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  country: string;
}
