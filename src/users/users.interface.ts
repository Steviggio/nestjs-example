export interface User extends Document {
  email: string;
  password: string;
  role: string;
}