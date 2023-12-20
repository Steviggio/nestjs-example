import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema } from './books.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: "book", schema: BooksSchema }])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule { }
