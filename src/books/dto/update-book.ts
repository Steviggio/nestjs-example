import { Document, ObjectId } from "mongoose";

export class UpdateBookDto {
  title?: string;
  author?: string;
  imageUrl?: string;
  year?: number;
  genre?: string;
  ratings?: { userId: string, grade: number }[];
  averageRating?: number;
}
