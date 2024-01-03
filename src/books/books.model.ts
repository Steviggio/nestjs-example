import * as mongoose from "mongoose";

export const BooksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    grade: { type: Number, required: true, min: 0, max: 5 }
  }],
  averageRating: { type: Number }
}, { timestamps: true, versionKey: false })

export interface Book extends mongoose.Document {
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number | string;
  genre: string;
  ratings: { userId: string, grade: number }[];
  averageRating: number;
}

export interface BookRating extends mongoose.Document {
  userId?: string;
  grade?: number;
}