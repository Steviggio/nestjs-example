import { ObjectId } from "mongoose";

export class CreateBookDto {
  userId: ObjectId;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  ratings: { userId: string, grade: number }[];
  averageRating: number
}

export interface BookRating {
  userId: ObjectId, 
  grade: number
}