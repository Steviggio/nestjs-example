// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../models/users.models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) { }


  async createUser(email: string, password: string, role: string): Promise<User> {
    const user = new this.userModel({ email, password, role });
    return user.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}



