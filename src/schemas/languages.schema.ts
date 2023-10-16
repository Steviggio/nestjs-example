import { Document, HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type LanguageDocument = Language & Document;

@Schema({ versionKey: false })
export class Language {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  capital: string;
  @Prop({ required: true })
  citiesNumber: number;
  @Prop()
  flagUrl: string;
  @Prop([{ name: { type: String, required: true } }])
  officiaLanguage: { name: string }[];

}

export const LanguageSchema = SchemaFactory.createForClass(Language);