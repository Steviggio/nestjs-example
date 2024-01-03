import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  Req,
  InternalServerErrorException
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, BookRating } from './books.model';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Request } from 'express';
import { CreateBookDto } from './dto/create-book.dto';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(AuthenticatedGuard)
  @Post("new")
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request): Promise<Book> {
    const newBook = await this.booksService.create(createBookDto, req);
    return newBook;
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") _id: string): Promise<Book> {
    return this.booksService.findBookByID(_id);
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


}
