import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Book, BookRating } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book';

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

  async getBestRatings(): Promise<Book[]> {
    return this.bookModel.find().sort({ averageRating: -1 }).limit(3).exec();
  }

  async findBookByID(_id: string): Promise<Book> {
    return this.bookModel.findOne({ _id }).exec();
  }

  async delete(_id: string): Promise<string> {
    const deletedBook = await this.bookModel.findOneAndDelete({ _id }).exec();
    if (!deletedBook) {
      throw new NotFoundException("Book not found")
    }
    return "Book deleted successfully"
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


  async updateABook(_id: string, updateBookDto: UpdateBookDto, req): Promise<Book> {
    const book = await this.bookModel.findById(_id);
    if (!book) {
      throw new NotFoundException('Book not Found')
    }

    // Update fields if they are provided in the DTO
    const { title, author, imageUrl, year, genre } = updateBookDto;
    if (title !== undefined) {
      book.title = title;
    }
    if (author !== undefined) {
      book.author = author;
    }
    if (imageUrl !== undefined) {
      book.imageUrl = imageUrl;
    }
    if (year !== undefined) {
      book.year = year;
    }
    if (genre !== undefined) {
      book.genre = genre;
    }

    // Save the updated book
    return book.save();
  }

}
