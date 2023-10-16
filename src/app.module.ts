import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongo://127.0.0.1:27017/Steviggio_db'), MongooseModule.forFeature([{name: "User", schema: UserSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
