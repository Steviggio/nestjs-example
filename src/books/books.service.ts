import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Book, BookRating } from './books.model';
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

  async findBookByID(_id: string): Promise<Book> {
    return this.bookModel.findOne({ _id }).exec();
  }

  async addRating(_id: string, rating: BookRating): Promise<Book | null> {
    const book = await this.bookModel.findById(_id);

    const { userId, grade } = rating;

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Check if the userId already exists in ratings
    const existingRatingIndex = book.ratings.findIndex((r) => r.userId.toString() === userId.toString());

    if (existingRatingIndex === -1) {
      // Add a new rating
      book.ratings.push({ userId, grade });
    } else {
      // Update existing rating
      book.ratings[existingRatingIndex].grade = grade;
    }

    // Calculate average rating
    const totalRatings = book.ratings.reduce((acc, cur) => acc + cur.grade, 0);
    book.averageRating = totalRatings / book.ratings.length;

    // Save the updated book
    return book.save();
  }
}
