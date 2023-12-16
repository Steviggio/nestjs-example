import { Mongoose } from "mongoose";
import { UserSchema } from "./users.model";

export const userProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model("user", UserSchema),
    inject: ["DATABASE_CONNECTION"],
  }
]