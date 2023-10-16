import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);