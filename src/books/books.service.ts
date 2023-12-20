import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Book } from './books.model';


@Injectable()
export class BooksService {
  constructor(@InjectModel("book") private readonly bookModel: Model<Book>) { }

  async create(book: Partial<Book>, userId: string) {
    const newBook = new this.bookModel({ ...book, userId })
    try {
      await newBook.validate();
      await newBook.save();
      return {
        msg: "Book has been successfully created",
        book: newBook
      }
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
