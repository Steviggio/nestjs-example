import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from 'src/models/users.models';

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserModel }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
