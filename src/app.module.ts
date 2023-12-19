import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule,
    AuthModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/passport'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
