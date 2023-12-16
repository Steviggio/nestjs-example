import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) { }
  async insertUser(eMail: string, password: string) {
    const email = eMail.toLowerCase();
    const newUser = new this.userModel({
      email,
      password,
    });
    await newUser.save();
    return newUser;
  }

  // async getUser(eMail: string) {
  //   const email = eMail.toLowerCase();
  //   const user = await this.userModel.findOne({ email });
  //   return user;
  // }

}
