import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"]
    }
  }, { timestamps: true, versionKey: false }
)

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  role?: string;
}