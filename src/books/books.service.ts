import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel("book") private readonly bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto, req): Promise<Book> {
    const book = new this.bookModel({
      ...createBookDto,
      userId: req.user.userId
    }
    );
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
