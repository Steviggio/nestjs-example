import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  Req,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, BookRating } from './books.model';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Request } from 'express';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }


  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get("bestrating")
  async getBestRating(): Promise<Book[]> {
    return this.booksService.getBestRatings();
  }

  @Get(":id")
  async findOne(@Param("id") _id: string): Promise<Book> {
    return this.booksService.findBookByID(_id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request): Promise<Book> {
    const newBook = await this.booksService.create(createBookDto, req);
    return newBook;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(":id/rating")
  async rateABook(@Param("id") _id: string, @Body() rating: BookRating, @Req() req): Promise<BookRating> {
    try {
      rating.userId = req.user.userId;
      return this.booksService.addRating(_id, rating);
    } catch (error) {
      console.error("Error in rateABook():", error);
      throw new InternalServerErrorException("Failed to rate the book.", req.user.userId)
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":id")
  async deleteABook(@Param("id") _id: string): Promise<string> {
    return this.booksService.delete(_id)
  }

  @UseGuards(AuthenticatedGuard)
  @Put(":id")
  async updateABook(@Param("id") _id: string, @Body() updateBookDto: UpdateBookDto, @Req() req): Promise<Book> {
    const existingBook = await this.booksService.findBookByID(_id)

    if (!existingBook) {
      throw new NotFoundException("Book not found")
    }

    if (existingBook.userId.toString() !== req.user.userId) {
      throw new BadRequestException("You are not authorized to update this book! ")
    }

    const updatedBook = await this.booksService.updateABook(_id, updateBookDto, req)
    return updatedBook
  }


}
