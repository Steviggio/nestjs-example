import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.providers';


@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
