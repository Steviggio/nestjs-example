import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Document, model } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role: string;
}

// @Schema({ versionKey: false })
// export class User {
//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ enum: ['admin', 'user'], default: 'user' })
//   role: string;
// }

const usersSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
})

usersSchema.plugin(uniqueValidator);;
export const UserModel = mongoose.model<User>("User", usersSchema);

// export const UserSchema = SchemaFactory.createForClass(UserSchema);
// UserSchema.plugin(uniqueValidator);